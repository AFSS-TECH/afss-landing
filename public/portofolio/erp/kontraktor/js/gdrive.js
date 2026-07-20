/* ===================================================
   GOOGLE DRIVE INTEGRATION — via Supabase Edge Function proxy
   No credentials live in this file: the browser sends the file to the
   `drive-upload` Edge Function (authenticated with the visitor's Supabase
   session), and the function talks to Google Drive using secrets that only
   exist server-side.
   =================================================== */

async function gdriveUpload(file, stage, project, onProgress) {
  const form = new FormData();
  form.append('file', file);
  form.append('projectLabel', `${project.id} — ${project.name}`);
  form.append('stageLabel', `${String(stage.order).padStart(2, '0')}. ${stage.name}`);

  if (onProgress) onProgress(30);

  const r = await fetch(`${SUPA_URL}/functions/v1/drive-upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${SUPA_ANON_KEY}` },
    body: form,
  });

  if (onProgress) onProgress(80);

  const fileData = await r.json();
  if (!r.ok) throw new Error(fileData.error || 'Upload gagal');

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
