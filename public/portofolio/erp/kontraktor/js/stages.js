/* ===================================================
   STAGES & DOCUMENTATION GALLERY
   =================================================== */

// ── Lightbox state ────────────────────────────────────
let _lbDocs = [];
let _lbIdx  = 0;

// ── Helpers ───────────────────────────────────────────
function docPlaceholder(type, idx) {
  const colors = ['#2563eb','#16a34a','#d97706','#7c3aed','#0d9488','#dc2626','#0369a1','#be185d'];
  const bg = colors[(idx || 0) % colors.length];
  const icon = type === 'video' ? '▶' : '🖼';
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280">
      <rect width="400" height="280" fill="${bg}18"/>
      <text x="200" y="155" text-anchor="middle" font-size="72" fill="${bg}45">${icon}</text>
    </svg>`
  )}`;
}

function docThumbUrl(doc, idx) {
  if (doc.drive_id) return gdriveThumb(doc.drive_id);
  if (doc.thumb_url) return doc.thumb_url;
  return docPlaceholder(doc.type, idx);
}

function stageBadge(status) {
  const map = {
    done:          ['badge-green', 'Selesai'],
    'in-progress': ['badge-blue',  'Sedang Berjalan'],
    pending:       ['badge-gray',  'Belum Dimulai'],
  };
  const [cls, label] = map[status] || ['badge-gray', status];
  return `<span class="${cls}">${label}</span>`;
}

function stageColor(status) {
  return { done: '#16a34a', 'in-progress': '#2563eb', pending: '#94a3b8' }[status] || '#94a3b8';
}

function docCardHTML(d, i, allDocs, showProject) {
  const stage = (DB.stages || []).find(s => s.id === d.stage_id);
  const proj  = DB.projects.find(p => p.id === d.project_id);
  const isVideo = d.type === 'video';
  const thumb   = docThumbUrl(d, i);
  const idsJson = JSON.stringify(allDocs.map(x => x.id)).replace(/"/g, '&quot;');

  return `
<div class="doc-card" data-type="${d.type}" data-id="${d.id}" onclick="openLightbox('${d.id}','${idsJson}')">
  <div class="doc-thumb">
    <img src="${thumb}" alt="${d.title}" loading="lazy" onerror="this.src='${docPlaceholder(d.type, i)}'">
    ${isVideo ? `<div class="doc-play-overlay"><div class="doc-play-btn"><i class="ti ti-player-play-filled"></i></div></div>` : ''}
    <span class="doc-type-badge ${isVideo ? 'video' : 'image'}">
      <i class="ti ${isVideo ? 'ti-video' : 'ti-camera'}"></i>${isVideo ? 'Video' : 'Foto'}
    </span>
    <div class="doc-hover-overlay">
      <div class="doc-hover-title">${d.title}</div>
      <div class="doc-hover-cap">${(d.caption || '').substring(0, 90)}${(d.caption || '').length > 90 ? '…' : ''}</div>
    </div>
  </div>
  <div class="doc-card-body">
    <div class="doc-card-title">${d.title}</div>
    ${showProject ? `<div class="doc-card-stage"><i class="ti ti-folder-open me-1 text-primary"></i>${(proj?.name || '—').substring(0, 24)}</div>` : ''}
    <div class="doc-card-stage"><i class="ti ti-list-check me-1 text-muted"></i>${stage ? `${stage.order}. ${stage.name.substring(0, 28)}` : '—'}</div>
    <div class="doc-card-meta">
      <span><i class="ti ti-user me-1"></i>${d.uploaded_by}</span>
      <span>${d.uploaded_at}</span>
    </div>
    ${d.kinerja_note ? `<div class="doc-kinerja-note"><i class="ti ti-notes me-1"></i>${d.kinerja_note}</div>` : ''}
  </div>
</div>`;
}

// ══════════════════════════════════════════════════════
// PAGE: PROJECT STAGES (tahapan per proyek)
// ══════════════════════════════════════════════════════
function renderProjectStages() {
  const proj = DB.projects.find(p => p.id === window.currentProjId);
  if (!proj) return pw(`<div class="alert alert-warning">Proyek tidak ditemukan.
    <button class="btn btn-link" onclick="navigate('projects')">Kembali ke Daftar Proyek</button></div>`);

  const stages  = (DB.stages || []).filter(s => s.project_id === proj.id).sort((a, b) => a.order - b.order);
  const allDocs = (DB.docUploads || []).filter(d => d.project_id === proj.id);
  const done    = stages.filter(s => s.status === 'done').length;
  const active  = stages.filter(s => s.status === 'in-progress').length;
  const overallPct = stages.length
    ? Math.round(stages.reduce((a, s) => a + (s.actual_pct || 0), 0))
    : proj.progress;

  return pw(`
<div class="page-header">
  <div>
    <div class="breadcrumb-nav">
      <span class="bc-link" onclick="navigate('projects')">Proyek</span>
      <i class="ti ti-chevron-right bc-sep"></i>
      <span class="bc-link" onclick="viewProject('${proj.id}')">${proj.name.substring(0, 30)}</span>
      <i class="ti ti-chevron-right bc-sep"></i>
      <span class="bc-cur">Tahapan Pekerjaan</span>
    </div>
    <h2 class="page-title mt-1">Tahapan — ${proj.name}</h2>
    <p class="page-sub">${stages.length} tahapan · ${allDocs.length} dokumentasi</p>
  </div>
  <div class="d-flex gap-2 flex-wrap">
    <button class="btn btn-outline-secondary btn-sm" onclick="navigate('doc-gallery')">
      <i class="ti ti-photo-album me-1"></i>Galeri Semua Dok.
    </button>
    <button class="btn btn-primary btn-sm" onclick="openStageModal()">
      <i class="ti ti-plus me-1"></i>Tambah Tahapan
    </button>
  </div>
</div>

<!-- Project summary bar -->
<div class="card mb-4 border-0" style="background:linear-gradient(135deg,var(--navy) 0%,#163b6a 100%)">
  <div class="card-body py-3">
    <div class="row align-items-center g-3">
      <div class="col-12 col-md-4">
        <div class="text-white fw-bold">${proj.name}</div>
        <div class="small mt-1" style="color:rgba(255,255,255,.5)">${proj.client} · PM: ${proj.pm}</div>
      </div>
      <div class="col-12 col-md-4">
        <div class="d-flex justify-content-between mb-1">
          <span class="small" style="color:rgba(255,255,255,.6)">Progress Keseluruhan</span>
          <span class="small fw-bold text-white">${overallPct}%</span>
        </div>
        <div class="prg" style="height:8px;background:rgba(255,255,255,.15)">
          <div class="prg-fill ${overallPct >= 80 ? 'prg-green' : overallPct >= 50 ? 'prg-blue' : 'prg-amber'}" style="width:${overallPct}%;height:8px"></div>
        </div>
      </div>
      <div class="col-4 col-md-2 text-center">
        <div class="fw-black text-white" style="font-size:22px">${done}</div>
        <div class="small" style="color:rgba(255,255,255,.5)">Selesai</div>
      </div>
      <div class="col-4 col-md-1 text-center">
        <div class="fw-black" style="font-size:22px;color:#60a5fa">${active}</div>
        <div class="small" style="color:rgba(255,255,255,.5)">Berjalan</div>
      </div>
      <div class="col-4 col-md-1 text-center">
        <div class="fw-black" style="font-size:22px;color:#fbbf24">${stages.length - done - active}</div>
        <div class="small" style="color:rgba(255,255,255,.5)">Pending</div>
      </div>
    </div>
  </div>
</div>

<!-- Stages list -->
${stages.length === 0
  ? `<div class="empty-state">
      <i class="ti ti-list-check"></i>
      <div class="fw-bold mt-3 mb-1">Belum ada tahapan</div>
      <div class="text-muted small mb-3">Buat tahapan pekerjaan untuk mulai mendokumentasikan progress proyek</div>
      <button class="btn btn-primary" onclick="openStageModal()"><i class="ti ti-plus me-1"></i>Tambah Tahapan Pertama</button>
    </div>`
  : stages.map((s, i) => {
      const sDocs = allDocs.filter(d => d.stage_id === s.id);
      const c     = stageColor(s.status);
      const pct   = s.actual_pct || 0;
      const tgt   = s.target_pct || 0;
      const isLast = i === stages.length - 1;

      return `
<div class="stage-row" onclick="openStageGallery('${s.id}')">
  <div class="stage-timeline-col">
    <div class="stage-dot" style="background:${c};box-shadow:0 0 0 5px ${c}22">
      ${s.status === 'done'
        ? `<i class="ti ti-check" style="font-size:11px;color:#fff"></i>`
        : s.status === 'in-progress'
        ? `<div style="width:8px;height:8px;background:#fff;border-radius:50%;opacity:.9"></div>`
        : ''}
    </div>
    ${!isLast ? `<div class="stage-line" style="background:${stages[i+1]?.status==='pending'?'#e2e8f0':c}40"></div>` : ''}
  </div>
  <div class="stage-card">
    <div class="stage-card-top">
      <div class="stage-order-num" style="background:${c}18;color:${c};border:1.5px solid ${c}30">${s.order}</div>
      <div class="flex-grow-1 min-w-0">
        <div class="fw-bold text-truncate" style="font-size:14px">${s.name}</div>
        <div class="text-muted small text-truncate">${s.desc || '—'}</div>
      </div>
      <div class="d-flex align-items-center gap-2 flex-shrink-0">
        ${stageBadge(s.status)}
        <div class="d-flex gap-1" onclick="event.stopPropagation()">
          <button class="btn btn-outline-secondary btn-sm" onclick="openStageModal('${s.id}')"><i class="ti ti-edit"></i></button>
          <button class="btn btn-outline-danger btn-sm" onclick="deleteStage('${s.id}')"><i class="ti ti-trash"></i></button>
        </div>
      </div>
    </div>
    <div class="stage-card-body">
      <div class="row g-3 align-items-center">
        <div class="col-12 col-md-4">
          <div class="d-flex justify-content-between mb-1">
            <span class="small text-muted">Realisasi <strong class="${pct < tgt ? 'text-danger' : 'text-success'}">${pct}%</strong></span>
            <span class="small text-muted">Target ${tgt}%</span>
          </div>
          <div class="prg" style="height:6px">
            <div class="prg-fill ${pct >= tgt ? 'prg-green' : 'prg-amber'}" style="width:${Math.min(pct, 100)}%;height:6px"></div>
          </div>
          ${pct < tgt ? `<div class="small text-danger mt-1"><i class="ti ti-alert-triangle me-1"></i>Deviasi −${tgt - pct}%</div>` : ''}
        </div>
        <div class="col-12 col-md-3 small text-muted">
          <i class="ti ti-calendar me-1"></i>${fmtDate(s.start)} — ${fmtDate(s.deadline)}
        </div>
        <div class="col-8 col-md-3">
          <div class="d-flex align-items-center gap-1">
            ${sDocs.slice(0, 4).map((d, di) => `
              <div class="stage-thumb-mini" style="background-image:url('${docThumbUrl(d, di)}')" title="${d.title}" onclick="event.stopPropagation();openStageGallery('${s.id}')">
                ${d.type === 'video' ? `<i class="ti ti-player-play-filled" style="font-size:9px;color:#fff"></i>` : ''}
              </div>`).join('')}
            ${sDocs.length > 4 ? `<div class="stage-thumb-more">+${sDocs.length - 4}</div>` : ''}
            ${sDocs.length === 0 ? `<span class="small text-muted fst-italic">Belum ada foto</span>` : ''}
          </div>
        </div>
        <div class="col-4 col-md-2 d-flex justify-content-end" onclick="event.stopPropagation()">
          <button class="btn btn-primary btn-sm" onclick="openStageGallery('${s.id}')">
            <i class="ti ti-camera me-1"></i>${sDocs.length} Dok
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
    }).join('')}

${stages.length > 0 ? `
<div class="text-center mt-4 pb-2">
  <button class="btn btn-outline-primary btn-sm" onclick="openStageModal()">
    <i class="ti ti-plus me-1"></i>Tambah Tahapan Baru
  </button>
</div>` : ''}
`);
}

// ══════════════════════════════════════════════════════
// PAGE: STAGE GALLERY (dokumentasi per tahapan)
// ══════════════════════════════════════════════════════
function renderStageGallery() {
  const stage = (DB.stages || []).find(s => s.id === window.currentStageId);
  if (!stage) return pw(`<div class="alert alert-warning">Tahapan tidak ditemukan.
    <button class="btn btn-link" onclick="openProjectStages('${window.currentProjId}')">Kembali</button></div>`);

  const proj   = DB.projects.find(p => p.id === stage.project_id);
  const docs   = (DB.docUploads || []).filter(d => d.stage_id === stage.id);
  const images = docs.filter(d => d.type === 'image');
  const videos = docs.filter(d => d.type === 'video');
  const c      = stageColor(stage.status);

  return pw(`
<div class="page-header">
  <div>
    <div class="breadcrumb-nav">
      <span class="bc-link" onclick="navigate('projects')">Proyek</span>
      <i class="ti ti-chevron-right bc-sep"></i>
      <span class="bc-link" onclick="openProjectStages('${proj?.id}')">${(proj?.name || '').substring(0, 22)}…</span>
      <i class="ti ti-chevron-right bc-sep"></i>
      <span class="bc-link" onclick="openProjectStages('${proj?.id}')">Tahapan</span>
      <i class="ti ti-chevron-right bc-sep"></i>
      <span class="bc-cur">${stage.order}. ${stage.name}</span>
    </div>
    <h2 class="page-title mt-1">${stage.name}</h2>
    <p class="page-sub">${images.length} foto · ${videos.length} video</p>
  </div>
  <div class="d-flex gap-2 flex-wrap">
    <button class="btn btn-outline-secondary btn-sm" onclick="openProjectStages('${proj?.id}')">
      <i class="ti ti-arrow-left me-1"></i>Kembali
    </button>
    <button class="btn btn-primary btn-sm" onclick="openUploadDoc('${stage.id}')">
      <i class="ti ti-cloud-upload me-1"></i>Upload Dokumentasi
    </button>
  </div>
</div>

<!-- Stage info card -->
<div class="card mb-4">
  <div class="card-body py-3">
    <div class="row g-3 align-items-center">
      <div class="col-12 col-md-4">
        <div class="d-flex align-items-center gap-3">
          <div class="stage-order-lg" style="background:${c}15;color:${c};border:2px solid ${c}30">${stage.order}</div>
          <div>
            <div class="fw-bold">${stage.name}</div>
            <div class="text-muted small">${stage.desc || '—'}</div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="d-flex justify-content-between mb-1">
          <span class="small text-muted">Realisasi vs Target</span>
          <span class="small fw-bold">${stage.actual_pct || 0}% / ${stage.target_pct || 0}%</span>
        </div>
        <div class="prg" style="height:8px">
          <div class="prg-fill ${(stage.actual_pct || 0) >= (stage.target_pct || 0) ? 'prg-green' : 'prg-amber'}" style="width:${Math.min(stage.actual_pct || 0, 100)}%;height:8px"></div>
        </div>
        <div class="small text-muted mt-1"><i class="ti ti-calendar me-1"></i>${fmtDate(stage.start)} — ${fmtDate(stage.deadline)}</div>
      </div>
      <div class="col-4 col-md-2 text-center">
        <div class="fw-black fs-4 text-primary">${docs.length}</div>
        <div class="small text-muted">Total Dok.</div>
      </div>
      <div class="col-4 col-md-1 text-center">
        ${stageBadge(stage.status)}
      </div>
      <div class="col-4 col-md-1 text-end">
        <button class="btn btn-outline-secondary btn-sm" onclick="openStageModal('${stage.id}')">
          <i class="ti ti-edit me-1"></i>Edit
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Filter bar -->
<div class="d-flex gap-2 mb-3 flex-wrap align-items-center">
  <div class="doc-filter-tabs" id="doc-type-tabs">
    <button class="doc-tab active" onclick="filterDocType('all',this)">Semua (${docs.length})</button>
    <button class="doc-tab" onclick="filterDocType('image',this)">📷 Foto (${images.length})</button>
    <button class="doc-tab" onclick="filterDocType('video',this)">🎬 Video (${videos.length})</button>
  </div>
  <div class="flex-grow-1"></div>
  <div class="input-group" style="max-width:240px">
    <span class="input-group-text bg-white border-end-0"><i class="ti ti-search text-muted"></i></span>
    <input type="text" class="form-control border-start-0 ps-0" placeholder="Cari dokumentasi…" oninput="filterDocSearch(this.value)">
  </div>
</div>

<!-- Gallery -->
<div class="doc-gallery-grid" id="doc-gallery-grid">
  ${docs.length === 0
    ? `<div style="grid-column:1/-1">
        <div class="empty-state">
          <i class="ti ti-camera" style="font-size:52px;color:#94a3b8"></i>
          <div class="fw-bold mt-3 mb-1">Belum ada dokumentasi</div>
          <div class="text-muted small mb-3">Upload foto atau video progress untuk tahapan ini</div>
          <button class="btn btn-primary" onclick="openUploadDoc('${stage.id}')">
            <i class="ti ti-cloud-upload me-1"></i>Upload Sekarang
          </button>
        </div>
      </div>`
    : docs.map((d, i) => docCardHTML(d, i, docs, false)).join('')}
</div>
`);
}

// ══════════════════════════════════════════════════════
// PAGE: ALL DOCS GALLERY (semua proyek)
// ══════════════════════════════════════════════════════
function renderAllDocs() {
  const allDocs   = DB.docUploads || [];
  const allStages = DB.stages || [];
  const images    = allDocs.filter(d => d.type === 'image');
  const videos    = allDocs.filter(d => d.type === 'video');
  const onDrive   = allDocs.filter(d => d.drive_id).length;

  return pw(`
${ph('Galeri Dokumentasi', 'Semua foto & video kinerja dari seluruh proyek',
  `<button class="btn btn-outline-secondary btn-sm" onclick="exportPage()">
    <i class="ti ti-download me-1"></i>Export
  </button>`
)}

<!-- Stats -->
<div class="row g-3 mb-4">
  <div class="col-6 col-lg-3">${sc('Total Dokumen', allDocs.length, `${images.length} foto · ${videos.length} video`, '', 'ti-files')}</div>
  <div class="col-6 col-lg-3">${sc('Proyek Aktif', DB.projects.length, 'Semua proyek', 'sc-green', 'ti-folder-open')}</div>
  <div class="col-6 col-lg-3">${sc('Total Tahapan', allStages.length, `${allStages.filter(s => s.status === 'done').length} selesai`, 'sc-amber', 'ti-list-check')}</div>
  <div class="col-6 col-lg-3">${sc('Di Google Drive', onDrive, onDrive < allDocs.length ? `${allDocs.length - onDrive} belum upload` : 'Semua tersimpan', 'sc-navy', 'ti-brand-google-drive')}</div>
</div>

<!-- Filter bar -->
<div class="card mb-3">
  <div class="card-body py-3">
    <div class="row g-2 align-items-center">
      <div class="col-12 col-sm-6 col-md-3">
        <select class="form-select form-select-sm" id="gal-proj" onchange="filterGallery()">
          <option value="">Semua Proyek</option>
          ${DB.projects.map(p => `<option value="${p.id}">${p.name.substring(0, 38)}</option>`).join('')}
        </select>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <select class="form-select form-select-sm" id="gal-stage" onchange="filterGallery()">
          <option value="">Semua Tahapan</option>
          ${allStages.map(s => `<option value="${s.id}">${s.order}. ${s.name.substring(0, 38)}</option>`).join('')}
        </select>
      </div>
      <div class="col-6 col-md-2">
        <select class="form-select form-select-sm" id="gal-type" onchange="filterGallery()">
          <option value="">Foto & Video</option>
          <option value="image">📷 Foto Saja</option>
          <option value="video">🎬 Video Saja</option>
        </select>
      </div>
      <div class="col-6 col-md-4">
        <div class="input-group input-group-sm">
          <span class="input-group-text"><i class="ti ti-search"></i></span>
          <input type="text" class="form-control" placeholder="Cari judul, caption, uploader…" id="gal-search" oninput="filterGallery()">
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Gallery -->
<div class="doc-gallery-grid" id="doc-gallery-grid">
  ${allDocs.length === 0
    ? `<div style="grid-column:1/-1">
        <div class="empty-state">
          <i class="ti ti-photo-album" style="font-size:56px;color:#94a3b8"></i>
          <div class="fw-bold mt-3 mb-1">Belum ada dokumentasi</div>
          <div class="text-muted small mb-3">Upload foto & video dari halaman tahapan proyek</div>
          <button class="btn btn-primary" onclick="navigate('projects')">
            <i class="ti ti-folder me-1"></i>Buka Proyek
          </button>
        </div>
      </div>`
    : allDocs.map((d, i) => docCardHTML(d, i, allDocs, true)).join('')}
</div>
`);
}

// ══════════════════════════════════════════════════════
// FILTER FUNCTIONS
// ══════════════════════════════════════════════════════
function filterDocType(type, btn) {
  document.querySelectorAll('.doc-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.doc-card').forEach(c => {
    c.style.display = (type === 'all' || c.dataset.type === type) ? '' : 'none';
  });
}

function filterDocSearch(q) {
  const lower = q.toLowerCase();
  document.querySelectorAll('.doc-card').forEach(c => {
    const doc = (DB.docUploads || []).find(d => d.id === c.dataset.id);
    if (!doc) return;
    const match = !q || [doc.title, doc.caption, doc.kinerja_note, doc.uploaded_by]
      .some(t => (t || '').toLowerCase().includes(lower));
    c.style.display = match ? '' : 'none';
  });
}

function filterGallery() {
  const projF  = document.getElementById('gal-proj')?.value  || '';
  const stageF = document.getElementById('gal-stage')?.value || '';
  const typeF  = document.getElementById('gal-type')?.value  || '';
  const q      = (document.getElementById('gal-search')?.value || '').toLowerCase();

  // Update stage dropdown when project changes
  if (projF) {
    const stageEl = document.getElementById('gal-stage');
    if (stageEl) {
      const stages = (DB.stages || []).filter(s => s.project_id === projF);
      stageEl.innerHTML = `<option value="">Semua Tahapan</option>${stages.map(s =>
        `<option value="${s.id}" ${s.id === stageF ? 'selected' : ''}>${s.order}. ${s.name.substring(0, 38)}</option>`
      ).join('')}`;
    }
  }

  document.querySelectorAll('.doc-card').forEach(c => {
    const doc = (DB.docUploads || []).find(d => d.id === c.dataset.id);
    if (!doc) return;
    let show = true;
    if (projF  && doc.project_id !== projF)  show = false;
    if (stageF && doc.stage_id   !== stageF) show = false;
    if (typeF  && doc.type       !== typeF)   show = false;
    if (q && ![doc.title, doc.caption, doc.kinerja_note, doc.uploaded_by]
      .some(t => (t || '').toLowerCase().includes(q))) show = false;
    c.style.display = show ? '' : 'none';
  });
}

// ══════════════════════════════════════════════════════
// LIGHTBOX
// ══════════════════════════════════════════════════════
function openLightbox(docId, idsRaw) {
  try {
    const ids = typeof idsRaw === 'string' ? JSON.parse(idsRaw.replace(/&quot;/g, '"')) : idsRaw;
    _lbDocs = ids || [];
  } catch(e) {
    _lbDocs = [docId];
  }
  _lbIdx = _lbDocs.indexOf(docId);
  if (_lbIdx < 0) _lbIdx = 0;
  _renderLightbox();
  const lb = document.getElementById('lightbox');
  if (lb) { lb.classList.remove('d-none'); document.body.style.overflow = 'hidden'; }
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.add('d-none');
  document.body.style.overflow = '';
  const media = document.getElementById('lb-media');
  if (media) media.innerHTML = '';
}

function lbPrev() { if (_lbIdx > 0) { _lbIdx--; _renderLightbox(); } }
function lbNext() { if (_lbIdx < _lbDocs.length - 1) { _lbIdx++; _renderLightbox(); } }

function _renderLightbox() {
  const docId = _lbDocs[_lbIdx];
  const doc   = (DB.docUploads || []).find(d => d.id === docId);
  if (!doc) return;

  const stage = (DB.stages || []).find(s => s.id === doc.stage_id);
  const proj  = DB.projects.find(p => p.id === doc.project_id);

  // Counter
  const ctr = document.getElementById('lb-counter');
  if (ctr) ctr.textContent = `${_lbIdx + 1} / ${_lbDocs.length}`;

  // Prev/Next buttons
  const prevBtn = document.getElementById('lb-prev');
  const nextBtn = document.getElementById('lb-next');
  if (prevBtn) prevBtn.disabled = _lbIdx === 0;
  if (nextBtn) nextBtn.disabled = _lbIdx === _lbDocs.length - 1;

  // Media
  const mediaEl = document.getElementById('lb-media');
  if (mediaEl) {
    if (doc.drive_id && doc.type === 'video') {
      mediaEl.innerHTML = `<div class="lb-video-wrap">
        <iframe src="${gdriveEmbed(doc.drive_id)}" allowfullscreen allow="autoplay" class="lb-video-frame"></iframe>
      </div>`;
    } else if (doc.drive_id) {
      mediaEl.innerHTML = `<img src="${gdriveThumb(doc.drive_id, 1200)}" class="lb-img" alt="${doc.title}"
        onclick="window.open('${gdriveView(doc.drive_id)}','_blank')" title="Klik untuk buka di Drive">`;
    } else {
      mediaEl.innerHTML = `<div class="lb-no-file">
        <i class="ti ti-${doc.type === 'video' ? 'video' : 'photo'}" style="font-size:64px;color:rgba(255,255,255,.2)"></i>
        <div style="color:rgba(255,255,255,.45);margin-top:14px;font-size:13px">File belum diunggah ke Google Drive</div>
        <button class="btn btn-sm btn-outline-light mt-3" onclick="closeLightbox();openUploadDoc('${doc.stage_id}')">
          <i class="ti ti-cloud-upload me-1"></i>Upload Sekarang
        </button>
      </div>`;
    }
  }

  // Info panel
  const infoEl = document.getElementById('lb-info');
  if (infoEl) {
    infoEl.innerHTML = `
      <div class="lb-info-scroll">
        <div class="lb-info-title">${doc.title}</div>
        ${doc.caption ? `<div class="lb-info-caption">${doc.caption}</div>` : ''}
        <div class="lb-info-tags mb-3">
          ${stageBadge(stage?.status || 'pending')}
          <span class="badge-gray">${doc.type === 'video' ? '🎬 Video' : '📷 Foto'}</span>
        </div>
        <div class="lb-info-row"><i class="ti ti-folder-open text-primary me-2"></i>${proj?.name || '—'}</div>
        <div class="lb-info-row"><i class="ti ti-list-check text-muted me-2"></i>${stage ? `${stage.order}. ${stage.name}` : '—'}</div>
        <div class="lb-info-row"><i class="ti ti-user text-muted me-2"></i>${doc.uploaded_by}</div>
        <div class="lb-info-row"><i class="ti ti-calendar text-muted me-2"></i>${doc.uploaded_at}</div>
        ${doc.kinerja_note ? `<div class="lb-kinerja-box"><i class="ti ti-notes me-1"></i><strong>Catatan Kinerja</strong><div class="mt-1">${doc.kinerja_note}</div></div>` : ''}
        <div class="mt-auto pt-3">
          ${doc.drive_id ? `<a href="${gdriveView(doc.drive_id)}" target="_blank" class="btn btn-outline-light btn-sm w-100 mb-2">
            <i class="ti ti-external-link me-1"></i>Buka di Google Drive
          </a>` : ''}
          <button class="btn btn-outline-danger btn-sm w-100" onclick="closeLightbox();deleteDoc('${doc.id}')">
            <i class="ti ti-trash me-1"></i>Hapus Dokumentasi
          </button>
        </div>
      </div>`;
  }
}

// Keyboard navigation
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb || lb.classList.contains('d-none')) return;
  if (e.key === 'ArrowLeft')  { e.preventDefault(); lbPrev(); }
  if (e.key === 'ArrowRight') { e.preventDefault(); lbNext(); }
  if (e.key === 'Escape')     closeLightbox();
});
