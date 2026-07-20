// Proxies Google Drive uploads for the ERP Kontraktor portfolio demo.
// Holds the Drive OAuth refresh token as a server-side secret so it never
// ships to the browser (unlike the original client-side implementation).
// Supabase verifies the caller's JWT before this runs (function deployed
// without --no-verify-jwt), so only signed-in demo sessions (anonymous or
// not) can reach it.
//
// NOTE: GDRIVE_CLIENT_ID/SECRET/REFRESH_TOKEN below are the same credentials
// that were previously hardcoded in public client JS. Moving them server-side
// stops new leakage, but the token itself was exposed in git/CDN history and
// has not been rotated — rotate it in Google Cloud Console when practical.

const CLIENT_ID     = Deno.env.get('GDRIVE_CLIENT_ID')!;
const CLIENT_SECRET = Deno.env.get('GDRIVE_CLIENT_SECRET')!;
const REFRESH_TOKEN = Deno.env.get('GDRIVE_REFRESH_TOKEN')!;
const ROOT_FOLDER_ID = Deno.env.get('GDRIVE_FOLDER_ID')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DRIVE_SHARED_PARAMS = 'supportsAllDrives=true&includeItemsFromAllDrives=true';

let cachedToken: { token: string; expiry: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiry - 60_000) return cachedToken.token;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  if (!r.ok) throw new Error('Gagal autentikasi Google Drive: ' + (await r.text()));
  const d = await r.json();
  if (d.error) throw new Error(d.error_description || d.error);
  cachedToken = { token: d.access_token, expiry: Date.now() + d.expires_in * 1000 };
  return cachedToken.token;
}

async function getOrCreateFolder(name: string, parentId: string, token: string): Promise<string> {
  const safeName = name.replace(/'/g, "\\'");
  const q = encodeURIComponent(
    `name='${safeName}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`
  );
  const r = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)&${DRIVE_SHARED_PARAMS}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const d = await r.json();
  if (d.files?.length > 0) return d.files[0].id;

  const cr = await fetch(`https://www.googleapis.com/drive/v3/files?fields=id&${DRIVE_SHARED_PARAMS}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, mimeType: 'application/vnd.google-apps.folder', parents: [parentId] }),
  });
  const f = await cr.json();
  return f.id;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    const projectLabel = String(form.get('projectLabel') || 'Unfiled');
    const stageLabel = String(form.get('stageLabel') || 'Unfiled');
    if (!file) return new Response(JSON.stringify({ error: 'file is required' }), { status: 400, headers: corsHeaders });

    const token = await getAccessToken();
    const projFolderId = await getOrCreateFolder(projectLabel.substring(0, 100), ROOT_FOLDER_ID, token);
    const stageFolderId = await getOrCreateFolder(stageLabel.substring(0, 100), projFolderId, token);

    const ts = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').substring(0, 60);
    const fileName = `${ts}_${safeName}`;

    const metadata = { name: fileName, parents: [stageFolderId] };
    const uploadForm = new FormData();
    uploadForm.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    uploadForm.append('file', file);

    const ur = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink&${DRIVE_SHARED_PARAMS}`,
      { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: uploadForm }
    );
    if (!ur.ok) throw new Error('Upload gagal: ' + (await ur.text()));
    const fileData = await ur.json();

    await fetch(`https://www.googleapis.com/drive/v3/files/${fileData.id}/permissions?${DRIVE_SHARED_PARAMS}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'reader', type: 'anyone' }),
    });

    return new Response(JSON.stringify(fileData), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
