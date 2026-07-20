/* ===================================================
   PROJECT REPORT — Laporan Proyek PDF
   =================================================== */

function getProjectRAB(projId) {
  const rab = {
    'PRJ-001': [
      { cat:'A. Pekerjaan Persiapan', items:[
        { no:'A.1', ket:'Mobilisasi & Demobilisasi',       vol:1,      sat:'ls',    harga:5000000,    aktual:4800000 },
        { no:'A.2', ket:'Pengukuran & Bouwplank',          vol:1,      sat:'ls',    harga:2500000,    aktual:2500000 },
        { no:'A.3', ket:'Pagar Proyek & Direksi Keet',     vol:1,      sat:'ls',    harga:8000000,    aktual:7500000 },
      ]},
      { cat:'B. Pekerjaan Tanah & Pondasi', items:[
        { no:'B.1', ket:'Galian Tanah',                    vol:850,    sat:'m³',    harga:45000,      aktual:38250000 },
        { no:'B.2', ket:'Bored Pile D60cm — 48 titik',    vol:48,     sat:'titik', harga:8500000,    aktual:408000000 },
        { no:'B.3', ket:'Pile Cap Beton K-350',            vol:280,    sat:'m³',    harga:1100000,    aktual:308000000 },
        { no:'B.4', ket:'Raft Slab Basement',              vol:840,    sat:'m³',    harga:1250000,    aktual:1050000000 },
      ]},
      { cat:'C. Pekerjaan Struktur', items:[
        { no:'C.1', ket:'Cor Kolom K-400',                 vol:320,    sat:'m³',    harga:1350000,    aktual:432000000 },
        { no:'C.2', ket:'Cor Balok Induk K-400',           vol:480,    sat:'m³',    harga:1280000,    aktual:614400000 },
        { no:'C.3', ket:'Cor Plat Lantai K-400',           vol:1200,   sat:'m³',    harga:1100000,    aktual:1320000000 },
        { no:'C.4', ket:'Pembesian D25 & D19',             vol:180000, sat:'kg',    harga:12800,      aktual:2304000000 },
        { no:'C.5', ket:'Bekisting Plywood',               vol:4800,   sat:'m²',    harga:85000,      aktual:408000000 },
      ]},
      { cat:'D. Pekerjaan Arsitektur', items:[
        { no:'D.1', ket:'Pasangan Bata Ringan AAC',        vol:2400,   sat:'m²',    harga:120000,     aktual:null },
        { no:'D.2', ket:'Plester & Acian',                 vol:4800,   sat:'m²',    harga:55000,      aktual:null },
        { no:'D.3', ket:'Keramik Lantai 60×60',            vol:3600,   sat:'m²',    harga:280000,     aktual:null },
        { no:'D.4', ket:'Curtain Wall Kaca',               vol:2200,   sat:'m²',    harga:1800000,    aktual:null },
        { no:'D.5', ket:'Cat Interior & Eksterior',        vol:6000,   sat:'m²',    harga:45000,      aktual:null },
      ]},
      { cat:'E. Pekerjaan MEP', items:[
        { no:'E.1', ket:'Instalasi Listrik Lengkap',       vol:1,      sat:'ls',    harga:850000000,  aktual:null },
        { no:'E.2', ket:'Instalasi Plumbing',              vol:1,      sat:'ls',    harga:420000000,  aktual:null },
        { no:'E.3', ket:'AC Split & Cassette',             vol:80,     sat:'unit',  harga:15000000,   aktual:null },
      ]},
    ],
    'PRJ-004': [
      { cat:'A. Pekerjaan Persiapan', items:[
        { no:'A.1', ket:'Mobilisasi & Land Clearing',      vol:1,      sat:'ls',    harga:15000000,   aktual:15000000 },
        { no:'A.2', ket:'Pagar Proyek 600m',               vol:600,    sat:'m',     harga:120000,     aktual:72000000 },
      ]},
      { cat:'B. Pekerjaan Pondasi', items:[
        { no:'B.1', ket:'Tiang Pancang Spun Ø40 — 120 titik', vol:120, sat:'titik', harga:18500000,  aktual:2220000000 },
        { no:'B.2', ket:'Pile Cap & Tie Beam',             vol:380,    sat:'m³',    harga:1150000,    aktual:437000000 },
      ]},
      { cat:'C. Pekerjaan Baja', items:[
        { no:'C.1', ket:'Kolom Baja WF 400×200 — 48 kol', vol:48,     sat:'kolom', harga:32000000,   aktual:1536000000 },
        { no:'C.2', ket:'Balok Induk WF 350×175',         vol:185000, sat:'kg',    harga:13500,      aktual:2497500000 },
        { no:'C.3', ket:'Gording & Bracing',               vol:65000,  sat:'kg',    harga:13000,      aktual:845000000 },
      ]},
      { cat:'D. Atap & Dinding', items:[
        { no:'D.1', ket:'Atap Spandek 0.5mm',             vol:12000,  sat:'m²',    harga:95000,      aktual:1140000000 },
        { no:'D.2', ket:'Wall Cladding Galvalum',          vol:8500,   sat:'m²',    harga:120000,     aktual:1020000000 },
        { no:'D.3', ket:'Skylight Polycarbonate',          vol:850,    sat:'m²',    harga:320000,     aktual:272000000 },
      ]},
      { cat:'E. Finishing & MEP', items:[
        { no:'E.1', ket:'Floor Hardener',                  vol:9800,   sat:'m²',    harga:85000,      aktual:null },
        { no:'E.2', ket:'Instalasi Listrik',               vol:1,      sat:'ls',    harga:280000000,  aktual:null },
        { no:'E.3', ket:'Cat Kolom & Dinding',             vol:2200,   sat:'m²',    harga:45000,      aktual:null },
      ]},
    ],
    'PRJ-002': [
      { cat:'A. Pekerjaan Persiapan', items:[
        { no:'A.1', ket:'Mobilisasi & Bouwplank',          vol:1,      sat:'ls',    harga:3500000,    aktual:3500000 },
      ]},
      { cat:'B. Pekerjaan Pondasi', items:[
        { no:'B.1', ket:'Galian & Urugan',                 vol:180,    sat:'m³',    harga:42000,      aktual:7560000 },
        { no:'B.2', ket:'Pondasi Footplate — 24 titik',    vol:24,     sat:'titik', harga:4200000,    aktual:100800000 },
      ]},
      { cat:'C. Pekerjaan Struktur', items:[
        { no:'C.1', ket:'Kolom & Balok Beton K-250',       vol:120,    sat:'m³',    harga:1050000,    aktual:75600000 },
        { no:'C.2', ket:'Plat Lantai 1 & 2',               vol:480,    sat:'m²',    harga:420000,     aktual:null },
        { no:'C.3', ket:'Tangga Beton',                    vol:1,      sat:'ls',    harga:28000000,   aktual:null },
      ]},
      { cat:'D. Arsitektur & Finishing', items:[
        { no:'D.1', ket:'Dinding Bata & Plester',          vol:1200,   sat:'m²',    harga:110000,     aktual:null },
        { no:'D.2', ket:'Keramik & Granit',                vol:960,    sat:'m²',    harga:250000,     aktual:null },
        { no:'D.3', ket:'Cat Interior & Fasad',            vol:2400,   sat:'m²',    harga:40000,      aktual:null },
      ]},
      { cat:'E. MEP & Luar', items:[
        { no:'E.1', ket:'Instalasi Listrik',               vol:1,      sat:'ls',    harga:180000000,  aktual:null },
        { no:'E.2', ket:'Pagar & Parkir',                  vol:1,      sat:'ls',    harga:95000000,   aktual:null },
      ]},
    ],
  };
  if (rab[projId]) return rab[projId];
  const proj = DB.projects.find(p => p.id === projId);
  const base = proj ? proj.kontrak : 5000000000;
  return [
    { cat:'A. Pekerjaan Persiapan', items:[{ no:'A.1', ket:'Mobilisasi & Persiapan Lapangan', vol:1, sat:'ls', harga:Math.round(base*0.01), aktual:null }]},
    { cat:'B. Pekerjaan Utama',     items:[{ no:'B.1', ket:'Pekerjaan Struktur & Arsitektur',  vol:1, sat:'ls', harga:Math.round(base*0.75), aktual:null }]},
    { cat:'C. MEP & Finishing',     items:[{ no:'C.1', ket:'Instalasi MEP & Finishing',         vol:1, sat:'ls', harga:Math.round(base*0.24), aktual:null }]},
  ];
}

function renderProjectReport() {
  const proj = DB.projects.find(p => p.id === window.currentProjId);
  if (!proj) return `<div style="text-align:center;padding:80px;color:#94a3b8">Proyek tidak ditemukan</div>`;

  const today = new Date().toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
  const stages = (DB.stages||[]).filter(s => s.project_id === proj.id).sort((a,b) => a.order - b.order);
  const docs   = (DB.docUploads||[]).filter(d => d.project_id === proj.id);
  const emps   = DB.employees.filter(e => e.project === proj.id);
  const att    = DB.attendance.filter(a => a.project_id === proj.id);
  const eqs    = DB.equipment.filter(e => e.project === proj.id);
  const pos    = DB.purchaseOrders.filter(po => po.project === proj.id);
  const pays   = (DB.payroll||[]).filter(p => p.project_id === proj.id);
  const rab    = getProjectRAB(proj.id);

  const oh     = Math.round(proj.hpp * 0.08);
  const profit = proj.kontrak - proj.hpp - oh;
  const margin = (profit / proj.kontrak * 100).toFixed(1);
  const statusMap = { 'on-track':['#16a34a','On Track'], late:['#dc2626','Terlambat'], finishing:['#2563eb','Finishing'], done:['#0d9488','Selesai'], paused:['#d97706','Ditunda'] };
  const [stColor, stLabel] = statusMap[proj.status] || ['#64748b', proj.status];
  const progColor = proj.progress >= 80 ? '#16a34a' : proj.progress >= 50 ? '#2563eb' : proj.progress >= 30 ? '#d97706' : '#dc2626';

  let rabTotal = 0, rabAktual = 0;
  rab.forEach(cat => cat.items.forEach(i => {
    rabTotal += i.vol * i.harga;
    if (i.aktual) rabAktual += i.aktual;
  }));

  const doneStages = stages.filter(s => s.status === 'done').length;
  const totalDocs  = docs.length;
  const attApproved = att.filter(a => a.status === 'approved').length;
  const totalPO    = pos.reduce((a,p) => a + p.total, 0);
  const totalPayroll = pays.reduce((a,p) => a + (p.days*(p.upah||0)) + (p.lembur||0) + (p.makan||0) + (p.transport||0) - (p.kasbon||0), 0);

  // ── Stage summary rows ──
  const stStatusMap   = { done:'Selesai', 'in-progress':'Berjalan', pending:'Belum' };
  const stStatusColor = { done:'#16a34a', 'in-progress':'#2563eb', pending:'#94a3b8' };
  const stageRows = stages.map(s => {
    const dev = s.actual_pct - s.target_pct;
    return `<tr>
      <td style="text-align:center;font-weight:700;color:#64748b;font-size:12px">${s.order}</td>
      <td><div style="font-weight:600;font-size:12px">${s.name}</div><div style="font-size:10px;color:#64748b">${s.desc||''}</div></td>
      <td style="text-align:center"><span style="background:${stStatusColor[s.status]}18;color:${stStatusColor[s.status]};padding:2px 7px;border-radius:10px;font-size:10px;font-weight:600;white-space:nowrap">${stStatusMap[s.status]||s.status}</span></td>
      <td style="text-align:center;font-size:12px">${s.target_pct}%</td>
      <td style="text-align:center;font-weight:700;font-size:12px;color:${s.actual_pct>=s.target_pct?'#16a34a':'#dc2626'}">${s.actual_pct}%</td>
      <td style="text-align:center;font-weight:600;font-size:12px;color:${dev>=0?'#16a34a':'#dc2626'}">${dev>=0?'+':''}${dev}%</td>
      <td style="text-align:center;font-size:10px;color:#64748b">${fmtDate(s.start)}<br>${fmtDate(s.deadline)}</td>
      <td style="text-align:center;font-size:12px">${docs.filter(d=>d.stage_id===s.id).length}</td>
    </tr>`;
  }).join('');

  // ── Per-stage doc photos ──
  const stageDocs = stages.map(s => {
    const stDocs = docs.filter(d => d.stage_id === s.id);
    if (!stDocs.length) return '';
    const photos = stDocs.map((d, di) => {
      const isVideo = d.type === 'video';
      const thumb   = d.drive_id ? gdriveThumb(d.drive_id, 240) : (d.thumb_url || '');
      const iconSVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect width="240" height="160" fill="#e2e8f0"/><text x="120" y="95" text-anchor="middle" font-size="48" fill="#94a3b8">${isVideo?'▶':'🖼'}</text></svg>`)}`;
      return `<div class="rpt-photo-cell">
        <div class="rpt-photo-wrap${isVideo?' rpt-video-cell':''}">
          <img src="${thumb||iconSVG}" alt="${d.title}" onerror="this.src='${iconSVG}'">
          ${isVideo?'<div class="rpt-video-badge">▶ Video</div>':''}
        </div>
        <div class="rpt-photo-title">${d.title}</div>
        <div class="rpt-photo-meta">${d.uploaded_by} · ${d.uploaded_at}</div>
        ${d.kinerja_note?`<div class="rpt-photo-kinerja">${d.kinerja_note}</div>`:''}
      </div>`;
    }).join('');
    return `<div class="rpt-stage-section">
      <div class="rpt-stage-head">
        <div class="rpt-stage-num-big">${s.order}</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:13px">${s.name}</div>
          <div style="font-size:10px;color:#64748b;margin-top:2px">${s.desc||''}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <span style="background:${stStatusColor[s.status]}18;color:${stStatusColor[s.status]};padding:3px 10px;border-radius:10px;font-size:10px;font-weight:600">${stStatusMap[s.status]||s.status}</span>
          <div style="font-size:10px;color:#64748b;margin-top:4px">${s.actual_pct}% realisasi · ${fmtDate(s.start)} – ${fmtDate(s.deadline)}</div>
        </div>
      </div>
      <div class="rpt-photo-grid">${photos}</div>
    </div>`;
  }).join('');

  // ── RAB rows ──
  const rabRows = rab.map(cat => {
    const catRows = cat.items.map(i => {
      const sub = i.vol * i.harga;
      const sel = i.aktual != null ? i.aktual - sub : null;
      return `<tr>
        <td style="padding-left:20px;font-size:11px;color:#64748b;font-family:monospace">${i.no}</td>
        <td style="font-size:11px">${i.ket}</td>
        <td style="text-align:center;font-size:11px">${(i.vol).toLocaleString('id')}</td>
        <td style="text-align:center;font-size:11px;color:#64748b">${i.sat}</td>
        <td style="text-align:right;font-size:11px">${fmtFull(i.harga)}</td>
        <td style="text-align:right;font-size:11px;font-weight:600">${fmtFull(sub)}</td>
        <td style="text-align:right;font-size:11px;color:${i.aktual?'#16a34a':'#94a3b8'}">${i.aktual!=null?fmtFull(i.aktual):'—'}</td>
        <td style="text-align:right;font-size:11px;color:${sel!==null&&sel>0?'#dc2626':sel!==null?'#16a34a':'#94a3b8'}">${sel!==null?(sel>0?'+':'')+fmtFull(sel):'—'}</td>
      </tr>`;
    }).join('');
    const catTotal  = cat.items.reduce((a,i) => a + i.vol*i.harga, 0);
    const catAktual = cat.items.filter(i=>i.aktual).reduce((a,i) => a + i.aktual, 0);
    return `<tr style="background:#f1f5f9">
        <td colspan="5" style="font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#475569;padding:6px 8px">${cat.cat}</td>
        <td style="text-align:right;font-weight:700;font-size:11px;padding:6px 8px">${fmtFull(catTotal)}</td>
        <td style="text-align:right;font-weight:600;font-size:11px;color:#16a34a;padding:6px 8px">${catAktual?fmtFull(catAktual):'—'}</td>
        <td></td>
      </tr>${catRows}`;
  }).join('');

  // ── Employee rows ──
  const empRows = emps.length ? emps.map(e =>
    `<tr>
      <td style="font-size:11px">${e.name}</td>
      <td style="font-size:11px">${e.role}</td>
      <td style="text-align:right;font-size:11px">${fmt(e.upah)}/hari</td>
      <td style="text-align:center"><span style="background:${e.status==='active'?'#dcfce7':'#f1f5f9'};color:${e.status==='active'?'#16a34a':'#64748b'};padding:2px 8px;border-radius:8px;font-size:10px">${e.status==='active'?'Aktif':'Nonaktif'}</span></td>
    </tr>`).join('')
  : '<tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:16px;font-size:11px">Belum ada karyawan yang terdaftar di proyek ini</td></tr>';

  // ── Equipment rows ──
  const eqRows = eqs.length ? eqs.map(e =>
    `<tr>
      <td style="font-size:11px">${e.name}</td>
      <td style="text-align:center;font-size:11px">${e.dipinjam} unit</td>
      <td style="text-align:center;font-size:11px">${e.kondisi}</td>
      <td style="text-align:right;font-size:11px">${fmt(e.biaya_hari)}/hari</td>
    </tr>`).join('')
  : '<tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:16px;font-size:11px">Belum ada peralatan yang ditugaskan</td></tr>';

  // ── PO rows ──
  const poStatusMap   = { pending_approval:'Menunggu Approval', ordered:'Sudah Dipesan', received:'Diterima', paid:'Lunas' };
  const poStatusColor = { pending_approval:'#d97706', ordered:'#2563eb', received:'#16a34a', paid:'#0d9488' };
  const poRows = pos.length ? pos.map(po =>
    `<tr>
      <td style="font-size:10px;color:#64748b;font-family:monospace">${po.id}</td>
      <td style="font-size:11px">${po.item}</td>
      <td style="font-size:11px">${po.vendor}</td>
      <td style="text-align:right;font-size:11px;font-weight:600">${fmt(po.total)}</td>
      <td style="text-align:center;font-size:10px">${fmtDate(po.date)}</td>
      <td style="text-align:center"><span style="background:${(poStatusColor[po.status]||'#64748b')}18;color:${poStatusColor[po.status]||'#64748b'};padding:2px 7px;border-radius:8px;font-size:10px;white-space:nowrap">${poStatusMap[po.status]||po.status}</span></td>
    </tr>`).join('')
  : '<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:16px;font-size:11px">Belum ada Purchase Order</td></tr>';

  return `<div class="rpt-wrap">

  <!-- TOP BAR (hidden on print) -->
  <div class="rpt-topbar no-print">
    <div class="d-flex align-items-center gap-3">
      <button class="btn btn-outline-secondary btn-sm" onclick="navigate('project-detail')">
        <i class="ti ti-arrow-left me-1"></i>Kembali ke Proyek
      </button>
      <div>
        <div class="fw-bold">${proj.name}</div>
        <small class="text-muted">Laporan dibuat: ${today}</small>
      </div>
    </div>
    <button class="btn btn-danger px-4" onclick="window.print()">
      <i class="ti ti-printer me-1"></i>Download PDF
    </button>
  </div>

  <!-- ═══ HALAMAN 1: COVER ═══ -->
  <div class="rpt-page rpt-cover-page">
    <div class="rpt-cover-header">
      <div class="rpt-co-logo"><i class="ti ti-building-skyscraper" style="font-size:28px"></i></div>
      <div>
        <div class="rpt-co-name">PT AFSS CONTRACTOR INDONESIA</div>
        <div class="rpt-co-sub">Enterprise Construction Management · v2.5</div>
      </div>
    </div>

    <div class="rpt-cover-center">
      <div class="rpt-cover-label">LAPORAN KEMAJUAN PROYEK</div>
      <h1 class="rpt-cover-title">${proj.name}</h1>
      <div class="rpt-cover-id">${proj.id}</div>
      <div class="rpt-status-pill" style="background:${stColor}22;color:${stColor};border:1px solid ${stColor}55">${stLabel}</div>
    </div>

    <div class="rpt-cover-info-grid">
      <div class="rpt-ci-row"><span class="rpt-ci-label">Klien / Owner</span><span class="rpt-ci-val">${proj.client}</span></div>
      <div class="rpt-ci-row"><span class="rpt-ci-label">Project Manager</span><span class="rpt-ci-val">${proj.pm||'—'}</span></div>
      <div class="rpt-ci-row"><span class="rpt-ci-label">Lokasi Proyek</span><span class="rpt-ci-val">${proj.lokasi||'—'}</span></div>
      <div class="rpt-ci-row"><span class="rpt-ci-label">Nilai Kontrak</span><span class="rpt-ci-val" style="font-weight:700;color:${stColor}">${fmtFull(proj.kontrak)}</span></div>
      <div class="rpt-ci-row"><span class="rpt-ci-label">HPP Aktual</span><span class="rpt-ci-val">${fmtFull(proj.hpp)}</span></div>
      <div class="rpt-ci-row"><span class="rpt-ci-label">Tanggal Mulai</span><span class="rpt-ci-val">${fmtDate(proj.start)}</span></div>
      <div class="rpt-ci-row"><span class="rpt-ci-label">Batas Selesai</span><span class="rpt-ci-val">${fmtDate(proj.deadline)}</span></div>
      <div class="rpt-ci-row"><span class="rpt-ci-label">Tanggal Laporan</span><span class="rpt-ci-val" style="font-weight:700">${today}</span></div>
    </div>

    <div class="rpt-cover-progress">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span style="font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.5px">Progress Keseluruhan</span>
        <span style="font-size:28px;font-weight:800;color:${progColor}">${proj.progress}%</span>
      </div>
      <div style="background:#e2e8f0;border-radius:6px;height:12px;overflow:hidden">
        <div style="background:${progColor};height:12px;width:${proj.progress}%;border-radius:6px"></div>
      </div>
      <div class="d-flex justify-content-between mt-2" style="font-size:10px;color:#64748b">
        <span>Mulai: ${fmtDate(proj.start)}</span>
        <span>${doneStages} dari ${stages.length} tahapan selesai</span>
        <span>Target: ${fmtDate(proj.deadline)}</span>
      </div>
    </div>

    <div class="rpt-cover-stats">
      <div class="rpt-cs-item">
        <div class="rpt-cs-val">${fmt(proj.kontrak)}</div>
        <div class="rpt-cs-label">Nilai Kontrak</div>
      </div>
      <div class="rpt-cs-item">
        <div class="rpt-cs-val" style="color:#d97706">${fmt(proj.hpp)}</div>
        <div class="rpt-cs-label">HPP Aktual</div>
      </div>
      <div class="rpt-cs-item">
        <div class="rpt-cs-val" style="color:${profit>0?'#16a34a':'#dc2626'}">${fmt(Math.abs(profit))}</div>
        <div class="rpt-cs-label">Est. Profit (${margin}%)</div>
      </div>
      <div class="rpt-cs-item">
        <div class="rpt-cs-val">${totalDocs}</div>
        <div class="rpt-cs-label">Total Dokumentasi</div>
      </div>
    </div>
  </div>

  <!-- ═══ HALAMAN 2: TAHAPAN + RAB ═══ -->
  <div class="rpt-page">
    <div class="rpt-page-hd"><span class="rpt-sec-num">1</span>Progress Tahapan Pekerjaan</div>

    <div class="rpt-summary-strip">
      <div class="rpt-ss-item"><div class="rpt-ss-val">${stages.filter(s=>s.status==='done').length}</div><div class="rpt-ss-label">Selesai</div></div>
      <div class="rpt-ss-item rpt-ss-blue"><div class="rpt-ss-val">${stages.filter(s=>s.status==='in-progress').length}</div><div class="rpt-ss-label">Berjalan</div></div>
      <div class="rpt-ss-item rpt-ss-gray"><div class="rpt-ss-val">${stages.filter(s=>s.status==='pending').length}</div><div class="rpt-ss-label">Pending</div></div>
      <div class="rpt-ss-item rpt-ss-green"><div class="rpt-ss-val">${totalDocs}</div><div class="rpt-ss-label">Total Dok.</div></div>
      <div class="rpt-ss-item rpt-ss-amber"><div class="rpt-ss-val">${emps.length}</div><div class="rpt-ss-label">Karyawan</div></div>
      <div class="rpt-ss-item"><div class="rpt-ss-val">${eqs.length}</div><div class="rpt-ss-label">Alat</div></div>
    </div>

    <table class="rpt-table w-100">
      <thead><tr>
        <th style="width:28px">#</th>
        <th>Nama Tahapan</th>
        <th style="text-align:center">Status</th>
        <th style="text-align:center">Target</th>
        <th style="text-align:center">Realisasi</th>
        <th style="text-align:center">Deviasi</th>
        <th style="text-align:center">Periode</th>
        <th style="text-align:center">Dok.</th>
      </tr></thead>
      <tbody>${stageRows||'<tr><td colspan="8" style="text-align:center;color:#94a3b8;padding:20px">Belum ada tahapan</td></tr>'}</tbody>
    </table>

    <div class="rpt-page-hd" style="margin-top:24px"><span class="rpt-sec-num">2</span>Rencana Anggaran Biaya (RAB)</div>
    <table class="rpt-table w-100">
      <thead><tr>
        <th style="width:40px">No</th>
        <th>Uraian Pekerjaan</th>
        <th style="text-align:center">Vol</th>
        <th style="text-align:center">Sat</th>
        <th style="text-align:right">Harga/Sat</th>
        <th style="text-align:right">Sub Total</th>
        <th style="text-align:right">Aktual</th>
        <th style="text-align:right">Selisih</th>
      </tr></thead>
      <tbody>${rabRows}</tbody>
      <tfoot><tr style="background:#1e3a5f;color:#fff">
        <td colspan="5" style="font-weight:700;font-size:12px;padding:8px">TOTAL RAB</td>
        <td style="text-align:right;font-weight:700;font-size:12px;padding:8px">${fmtFull(rabTotal)}</td>
        <td style="text-align:right;font-weight:700;font-size:12px;padding:8px;color:#86efac">${fmtFull(rabAktual)}</td>
        <td style="text-align:right;font-weight:700;font-size:12px;padding:8px;color:${rabAktual<=rabTotal?'#86efac':'#fca5a5'}">${rabAktual<=rabTotal?'Hemat ':'Over '}${fmtFull(Math.abs(rabAktual-rabTotal))}</td>
      </tr></tfoot>
    </table>
  </div>

  <!-- ═══ HALAMAN 3: DOKUMENTASI FOTO PER TAHAPAN ═══ -->
  <div class="rpt-page">
    <div class="rpt-page-hd"><span class="rpt-sec-num">3</span>Dokumentasi Foto & Video per Tahapan</div>
    ${stageDocs||'<p style="color:#94a3b8;text-align:center;padding:40px;font-size:12px">Belum ada dokumentasi foto/video untuk proyek ini.</p>'}
  </div>

  <!-- ═══ HALAMAN 4: SDM, ALAT, PO ═══ -->
  <div class="rpt-page">
    <div class="rpt-page-hd"><span class="rpt-sec-num">4</span>Tenaga Kerja</div>
    <div class="rpt-info-strip">
      ${emps.length} karyawan
      ${attApproved ? `· ${attApproved} kehadiran terverifikasi` : ''}
      ${pays.length ? `· Total payroll: <strong>${fmt(totalPayroll)}</strong>` : ''}
    </div>
    <table class="rpt-table w-100">
      <thead><tr>
        <th>Nama Karyawan</th>
        <th>Jabatan / Keahlian</th>
        <th style="text-align:right">Upah Harian</th>
        <th style="text-align:center">Status</th>
      </tr></thead>
      <tbody>${empRows}</tbody>
    </table>

    <div class="rpt-page-hd" style="margin-top:20px"><span class="rpt-sec-num">5</span>Peralatan & Alat Kerja</div>
    <table class="rpt-table w-100">
      <thead><tr>
        <th>Nama Alat</th>
        <th style="text-align:center">Dipinjam</th>
        <th style="text-align:center">Kondisi</th>
        <th style="text-align:right">Biaya/Hari</th>
      </tr></thead>
      <tbody>${eqRows}</tbody>
    </table>

    <div class="rpt-page-hd" style="margin-top:20px"><span class="rpt-sec-num">6</span>Purchase Order</div>
    <div class="rpt-info-strip">Total nilai pembelian: <strong>${fmt(totalPO)}</strong></div>
    <table class="rpt-table w-100">
      <thead><tr>
        <th style="width:100px">No. PO</th>
        <th>Item</th>
        <th>Vendor</th>
        <th style="text-align:right">Total</th>
        <th style="text-align:center">Tanggal</th>
        <th style="text-align:center">Status</th>
      </tr></thead>
      <tbody>${poRows}</tbody>
    </table>
  </div>

  <!-- ═══ HALAMAN 5: PENUTUP & TANDA TANGAN ═══ -->
  <div class="rpt-page rpt-sign-page">
    <div class="rpt-page-hd"><span class="rpt-sec-num">7</span>Penutup & Pengesahan</div>

    <div class="rpt-closing-note">
      Laporan ini dibuat berdasarkan data aktual yang tercatat dalam sistem <strong>AFSS Contractor ERP</strong>
      per tanggal <strong>${today}</strong>. Laporan mencakup progress tahapan pekerjaan, realisasi anggaran RAB,
      dokumentasi foto & video, data tenaga kerja, peralatan, dan purchase order untuk proyek
      <strong>${proj.name}</strong> (${proj.id}) dengan klien <strong>${proj.client}</strong>.
    </div>

    <div style="margin:24px 0;padding:14px 18px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:11px">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;text-align:center">
        <div><div style="font-weight:700;font-size:18px;color:${progColor}">${proj.progress}%</div><div style="color:#64748b;font-size:10px">Progress</div></div>
        <div><div style="font-weight:700;font-size:18px;color:#16a34a">${doneStages}/${stages.length}</div><div style="color:#64748b;font-size:10px">Tahapan Selesai</div></div>
        <div><div style="font-weight:700;font-size:18px;color:#2563eb">${totalDocs}</div><div style="color:#64748b;font-size:10px">Dokumentasi</div></div>
        <div><div style="font-weight:700;font-size:18px;color:${profit>0?'#16a34a':'#dc2626'}">${margin}%</div><div style="color:#64748b;font-size:10px">Est. Margin</div></div>
      </div>
    </div>

    <div class="rpt-sign-grid">
      <div class="rpt-sign-box">
        <div class="rpt-sign-title">Dibuat Oleh</div>
        <div class="rpt-sign-area"></div>
        <div class="rpt-sign-name">${proj.pm||'Project Manager'}</div>
        <div class="rpt-sign-role">Project Manager</div>
      </div>
      <div class="rpt-sign-box">
        <div class="rpt-sign-title">Diperiksa Oleh</div>
        <div class="rpt-sign-area"></div>
        <div class="rpt-sign-name">Pengawas MK</div>
        <div class="rpt-sign-role">Manajemen Konstruksi</div>
      </div>
      <div class="rpt-sign-box">
        <div class="rpt-sign-title">Disetujui Oleh</div>
        <div class="rpt-sign-area"></div>
        <div class="rpt-sign-name">Direktur Utama</div>
        <div class="rpt-sign-role">PT AFSS Contractor Indonesia</div>
      </div>
    </div>

    <div class="rpt-watermark">
      AFSS Contractor ERP · ${proj.id} · ${proj.name} · Laporan ${today}
    </div>
  </div>

</div>`;
}
