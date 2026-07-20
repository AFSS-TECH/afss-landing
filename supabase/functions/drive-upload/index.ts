// Proxies Google Drive uploads for the ERP Kontraktor portfolio demo.
// Authenticates as a Google service account (JWT bearer flow) so no OAuth
// client secret / refresh token ever exists — the private key is a
// server-side secret that never ships to the browser. Supabase verifies the
// caller's JWT before this runs (function deployed without --no-verify-jwt),
// so only signed-in demo sessions (anonymous or not) can reach it.
//
// NOTE: service accounts have no personal Drive storage quota. GDRIVE_FOLDER_ID
// must live inside a Shared Drive that the service account (GDRIVE_SERVICE_ACCOUNT_EMAIL)
// has been added to as a member — a plain "My Drive" folder will fail with a
// storage quota error on upload.

const SA_EMAIL = Deno.env.get('GDRIVE_SERVICE_ACCOUNT_EMAIL')!;
const SA_PRIVATE_KEY = Deno.env.get('GDRIVE_SERVICE_ACCOUNT_PRIVATE_KEY')!.replace(/\\n/g, '\n');
const ROOT_FOLDER_ID = Deno.env.get('GDRIVE_FOLDER_ID')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DRIVE_SHARED_PARAMS = 'supportsAllDrives=true&includeItemsFromAllDrives=true';

function base64url(bytes: ArrayBuffer | Uint8Array): string {
  const b = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = '';
  for (const byte of b) str += String.fromCharCode(byte);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const der = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s+/g, '');
  const bin = atob(der);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return crypto.subtle.importKey(
    'pkcs8',
    bytes,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

let cachedToken: { token: string; expiry: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiry - 60_000) return cachedToken.token;

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claims = {
    iss: SA_EMAIL,
    scope: 'https://www.googleapis.com/auth/drive',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${base64url(new TextEncoder().encode(JSON.stringify(header)))}.${base64url(new TextEncoder().encode(JSON.stringify(claims)))}`;

  const key = await importPrivateKey(SA_PRIVATE_KEY);
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(unsigned));
  const jwt = `${unsigned}.${base64url(signature)}`;

  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
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
