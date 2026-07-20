/* ===================================================
   GOOGLE DRIVE INTEGRATION — OAuth2 Upload
   =================================================== */
const GDRIVE = {
  CLIENT_ID:     '880960862958-hgadtfpfs8cguk8u987v5femogjkvlmg.apps.googleusercontent.com',
  CLIENT_SECRET: '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',
  REFRESH_TOKEN: '1//0gbnY-zCoA9F4CgYIARAAGBASNwF-L9Ir_rjb_NZvB78j3TFkgZqIQ9CFv2zmKAJP1rPfrlqk63I-KE7PD8Kz9YEQAY1XwHRZtk0',
  FOLDER_ID:     '1rTH7RnE35GVSBfJEWKRSnpb5VagXGQHp',
  _token:        null,
  _tokenExpiry:  0,
};

async function gdriveGetToken() {
  if (GDRIVE._token && Date.now() < GDRIVE._tokenExpiry - 60000) return GDRIVE._token;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id:     GDRIVE.CLIENT_ID,
      client_secret: GDRIVE.CLIENT_SECRET,
      refresh_token: GDRIVE.REFRESH_TOKEN,
      grant_type:    'refresh_token',
    }),
  });
  if (!r.ok) throw new Error('Gagal autentikasi Google Drive: ' + (await r.text()));
  const d = await r.json();
  if (d.error) throw new Error(d.error_description || d.error);
  GDRIVE._token      = d.access_token;
  GDRIVE._tokenExpiry = Date.now() + d.expires_in * 1000;
  return GDRIVE._token;
}

async function gdriveGetOrCreateFolder(name, parentId, token) {
  const safeName = name.replace(/'/g, "\\'");
  const q = encodeURIComponent(`name='${safeName}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`);
  const r = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const d = await r.json();
  if (d.files && d.files.length > 0) return d.files[0].id;

  const cr = await fetch('https://www.googleapis.com/drive/v3/files?fields=id', {
    method:  'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body:    JSON.stringify({ name, mimeType: 'application/vnd.google-apps.folder', parents: [parentId] }),
  });
  const f = await cr.json();
  return f.id;
}

async function gdriveUpload(file, stage, project, onProgress) {
  const token = await gdriveGetToken();

  const projFolderName  = `${project.id} — ${project.name}`.substring(0, 100);
  const stageFolderName = `${String(stage.order).padStart(2,'0')}. ${stage.name}`.substring(0, 100);

  const projFolderId  = await gdriveGetOrCreateFolder(projFolderName,  GDRIVE.FOLDER_ID, token);
  const stageFolderId = await gdriveGetOrCreateFolder(stageFolderName, projFolderId,      token);

  const ts       = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
  const safeName = file.name.replace(/[^a-zA-Z0-9._\-]/g, '_').substring(0, 60);
  const fileName = `${ts}_${safeName}`;

  const metadata = { name: fileName, parents: [stageFolderId] };
  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  if (onProgress) onProgress(30);

  const r = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink',
    { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form }
  );
  if (!r.ok) throw new Error('Upload gagal: ' + (await r.text()));
  const fileData = await r.json();

  if (onProgress) onProgress(80);

  await fetch(`https://www.googleapis.com/drive/v3/files/${fileData.id}/permissions`, {
    method:  'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body:    JSON.stringify({ role: 'reader', type: 'anyone' }),
  });

  if (onProgress) onProgress(100);
  return fileData;
}

function gdriveThumb(fileId, size = 400) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}
function gdriveEmbed(fileId) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}
function gdriveView(fileId) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}
