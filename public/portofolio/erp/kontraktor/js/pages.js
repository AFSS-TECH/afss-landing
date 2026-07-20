/* =====================================================
   PAGES — Bootstrap 5.3 | All buttons functional
   ===================================================== */

// ── Shared Helpers ────────────────────────────────────
function pw(h){ return `<div class="page-wrap">${h}</div>`; }

function ph(title, sub, acts=''){
  return `<div class="page-header"><div><h2 class="page-title">${title}</h2><p class="page-sub">${sub}</p></div>
    <div class="d-flex gap-2 flex-wrap">${acts}</div></div>`;
}

function sc(label, val, sub, color='', icon='ti-chart-bar'){
  return `<div class="stat-card ${color} h-100">
    <div class="sc-label"><i class="ti ${icon}"></i>${label}</div>
    <div class="sc-val">${val}</div>
    ${sub?`<div class="sc-sub ${sub.startsWith('+')?'up':sub.startsWith('-')?'down':''}">${sub}</div>`:''}
  </div>`;
}

function prg(pct){
  const c=pct>=80?'prg-green':pct>=50?'prg-blue':pct>=30?'prg-amber':'prg-red';
  return `<div class="prg" style="height:5px"><div class="prg-fill ${c}" style="height:5px;width:${pct}%"></div></div>`;
}

// ── Global Row Helpers (used by filter functions in app.js) ──

function projRowHTML(p, dest='detail'){
  const oh=Math.round(p.hpp*.08), pr=p.kontrak-p.hpp-oh, mg=p.kontrak>0?((pr/p.kontrak)*100).toFixed(1):'0';
  const action = dest==='detail' ? `viewProject('${p.id}')` : "navigate('hpp')";
  return `<tr style="cursor:pointer" onclick="${action}">
    <td><div class="fw-bold">${p.name}</div><small class="text-muted">${p.id} · ${p.client} · PM: ${p.pm||'—'}</small></td>
    <td class="fw-bold">${fmt(p.kontrak)}</td>
    <td><div class="fw-bold ${p.status==='late'?'text-danger':'text-warning'}">${fmt(p.hpp)}</div><small class="text-muted">Margin ~${mg}%</small></td>
    <td style="min-width:130px"><div class="d-flex align-items-center gap-2">
      <div class="flex-grow-1">${prg(p.progress)}</div>
      <span class="small fw-bold text-muted">${p.progress}%</span></div></td>
    <td class="small ${p.status==='late'?'text-danger fw-bold':'text-muted'}">${fmtDate(p.deadline)}</td>
    <td>${statusBadge(p.status)}</td>
  </tr>`;
}

function attRowHTML(a){
  const init=a.name.split(' ').map(w=>w[0]).join('').substring(0,2);
  return `<tr>
    <td><div class="d-flex align-items-center gap-2">
      <div class="emp-av" style="background:${empColor({id:a.emp_id})}">${init}</div>
      <div><div class="fw-semibold">${a.name}</div><small class="text-muted">${a.role}</small></div>
    </div></td>
    <td class="small">${a.project} ${a.gps?'<i class="ti ti-map-pin text-success" style="font-size:11px"></i>':''}</td>
    <td class="fw-semibold">${a.checkin}</td>
    <td class="${a.checkout==='--:--'?'text-muted':''}">${a.checkout}</td>
    <td>${a.hours>0?a.hours.toFixed(1)+'j':'—'}</td>
    <td class="fw-semibold">${fmt(a.upah)}</td>
    <td>${statusBadge(a.status)}</td>
    <td><div class="d-flex gap-1">
      ${a.status==='pending'
        ?`<button class="btn btn-success btn-sm" onclick="approveAtt('${a.id}')"><i class="ti ti-check me-1"></i>OK</button>
           <button class="btn btn-danger btn-sm" onclick="rejectAtt('${a.id}')"><i class="ti ti-x"></i></button>`
        :`<span class="text-muted small">—</span>`}
    </div></td>
  </tr>`;
}

function glRowHTML(r){
  return `<tr>
    <td class="text-muted">${r.date}</td>
    <td class="fw-bold text-primary font-monospace small">${r.kode}</td>
    <td class="fw-medium">${r.akun}</td>
    <td class="text-muted small">${r.ket}</td>
    <td class="text-muted font-monospace small">${r.project}</td>
    <td class="text-end fw-semibold text-primary">${r.debit?fmtFull(r.debit):'—'}</td>
    <td class="text-end fw-semibold text-success">${r.kredit?fmtFull(r.kredit):'—'}</td>
  </tr>`;
}

// ── DASHBOARD ─────────────────────────────────────────
function renderDashboard(){
  const totalK=DB.projects.reduce((a,p)=>a+p.kontrak,0);
  const totalH=DB.projects.reduce((a,p)=>a+p.hpp,0);
  const profit=totalK-totalH-Math.round(totalH*.08);
  const late=DB.projects.filter(p=>p.status==='late').length;
  const active=DB.projects.filter(p=>p.status!=='done').length;
  const pendAtt=DB.attendance.filter(a=>a.status==='pending').length;
  const pendPO=DB.purchaseOrders.filter(p=>p.status==='pending_approval').length;
  const maxCF=Math.max(...DB.cashflow.map(c=>c.masuk));
  const margin=totalK>0?((profit/totalK)*100).toFixed(1):'0';

  return pw(`
${ph('Dashboard Owner','Ringkasan proyek & keuangan · '+new Date().toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'}),
  `<button class="btn btn-outline-secondary btn-sm" onclick="exportPage()"><i class="ti ti-download me-1"></i>Export</button>
   <button class="btn btn-primary btn-sm" onclick="openModal('newProject')"><i class="ti ti-plus me-1"></i>Proyek Baru</button>`)}

<div class="alert alert-warning d-flex gap-2 align-items-start">
  <i class="ti ti-alert-triangle flex-shrink-0 mt-1"></i>
  <div class="small"><strong>${pendPO} PO menunggu approval</strong> · ${pendAtt} absensi pending · ${late} proyek terlambat · Stok Semen kritis (45 sak)</div>
</div>

<div class="row g-3 mb-4">
  <div class="col-6 col-lg-3">${sc('Proyek Aktif',active,'+2 bulan ini','','ti-folder-open')}</div>
  <div class="col-6 col-lg-3">${sc('Nilai Kontrak',fmt(totalK),'+12% vs lalu','sc-green','ti-currency-dollar')}</div>
  <div class="col-6 col-lg-3">${sc('Estimasi Profit',fmt(profit),'Margin '+margin+'%',profit>0?'sc-amber':'sc-red','ti-trending-up')}</div>
  <div class="col-6 col-lg-3">${sc('Proyek Terlambat',late,late>0?'Perlu tindakan':'Semua on track',late>0?'sc-red':'sc-green','ti-alert-circle')}</div>
</div>

<div class="row g-3 mb-3">
  <div class="col-12 col-lg-7">
    <div class="card h-100">
      <div class="card-header d-flex align-items-center justify-content-between">
        <div class="fw-bold small d-flex align-items-center gap-2"><i class="ti ti-folder-open text-primary"></i>Status Proyek</div>
        <button class="btn btn-outline-secondary btn-sm" onclick="navigate('projects')">Lihat Semua <i class="ti ti-arrow-right ms-1"></i></button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead><tr><th>Proyek</th><th>Kontrak</th><th>Progress</th><th>Deadline</th><th>Status</th></tr></thead>
          <tbody>
            ${DB.projects.map(p=>`<tr style="cursor:pointer" onclick="navigate('hpp')">
              <td><div class="fw-bold">${p.name}</div><small class="text-muted">${p.id} · ${p.client}</small></td>
              <td class="fw-bold">${fmt(p.kontrak)}</td>
              <td style="min-width:120px"><div class="d-flex align-items-center gap-2"><div class="flex-grow-1">${prg(p.progress)}</div><span class="small fw-bold text-muted">${p.progress}%</span></div></td>
              <td class="small ${p.status==='late'?'text-danger fw-bold':'text-muted'}">${fmtDate(p.deadline)}</td>
              <td>${statusBadge(p.status)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="col-12 col-lg-5">
    <div class="card h-100">
      <div class="card-header"><div class="fw-bold small d-flex align-items-center gap-2"><i class="ti ti-chart-bar text-primary"></i>Cashflow 6 Bulan</div></div>
      <div class="card-body">
        <div class="d-flex align-items-end gap-2" style="height:90px">
          ${DB.cashflow.map(c=>{const mh=Math.round(c.masuk/maxCF*100),kh=Math.round(c.keluar/maxCF*100);
            return `<div class="chart-col"><div class="chart-bars" style="height:80px">
              <div style="flex:1;background:#2563eb;border-radius:2px 2px 0 0;height:${mh}%;align-self:flex-end" title="${fmt(c.masuk)}"></div>
              <div style="flex:1;background:#fca5a5;border-radius:2px 2px 0 0;height:${kh}%;align-self:flex-end" title="${fmt(c.keluar)}"></div>
            </div><div class="chart-lbl">${c.month}</div></div>`;}).join('')}
        </div>
        <hr class="my-2">
        <div class="d-flex gap-3 small text-muted">
          <span class="d-flex align-items-center gap-1"><span style="width:10px;height:10px;background:#2563eb;border-radius:2px;display:inline-block"></span>Pemasukan</span>
          <span class="d-flex align-items-center gap-1"><span style="width:10px;height:10px;background:#fca5a5;border-radius:2px;display:inline-block"></span>Pengeluaran</span>
          <span class="ms-auto fw-semibold text-dark">${fmt(DB.cashflow[5].masuk)}</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row g-3 mb-3">
  <div class="col-12 col-lg-6">
    <div class="card h-100">
      <div class="card-header d-flex align-items-center justify-content-between">
        <div class="fw-bold small d-flex align-items-center gap-2"><i class="ti ti-clock text-primary"></i>Absensi Hari Ini</div>
        <button class="btn btn-outline-secondary btn-sm" onclick="navigate('attendance')">Kelola</button>
      </div>
      <div class="card-body pb-0">
        <div class="row g-2 mb-3">
          <div class="col-4"><div class="text-center py-2 rounded-3" style="background:#f0fdf4;border:1px solid #bbf7d0">
            <div class="fw-black fs-4 text-success">${DB.attendance.filter(a=>a.status==='approved').length}</div>
            <div class="small fw-semibold text-success" style="font-size:10px">HADIR</div></div></div>
          <div class="col-4"><div class="text-center py-2 rounded-3" style="background:#fffbeb;border:1px solid #fde68a">
            <div class="fw-black fs-4 text-warning">${pendAtt}</div>
            <div class="small fw-semibold text-warning" style="font-size:10px">PENDING</div></div></div>
          <div class="col-4"><div class="text-center py-2 rounded-3" style="background:#fef2f2;border:1px solid #fecaca">
            <div class="fw-black fs-4 text-danger">3</div>
            <div class="small fw-semibold text-danger" style="font-size:10px">ABSEN</div></div></div>
        </div>
        ${DB.attendance.slice(0,3).map(a=>`
        <div class="d-flex align-items-center gap-2 py-2 border-bottom">
          <div class="emp-av" style="background:${empColor({id:a.emp_id})}">${a.name.split(' ').map(w=>w[0]).join('').substring(0,2)}</div>
          <div class="flex-grow-1 min-w-0"><div class="fw-semibold text-truncate" style="font-size:13px">${a.name}</div><small class="text-muted">${a.project}</small></div>
          <div class="text-end flex-shrink-0"><small class="text-muted d-block">${a.checkin}–${a.checkout}</small>${statusBadge(a.status)}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
  <div class="col-12 col-lg-6">
    <div class="card h-100">
      <div class="card-header"><div class="fw-bold small d-flex align-items-center gap-2"><i class="ti ti-checks text-primary"></i>Antrian Approval</div></div>
      <div>
        <div class="appr-row"><div class="appr-icon" style="background:#eff6ff;color:#2563eb"><i class="ti ti-shopping-cart"></i></div>
          <div class="flex-grow-1"><div class="fw-semibold small">PO Besi WF 200 — 25 batang</div><small class="text-muted">Rp 21.000.000 · Toko Baja Jaya</small></div>
          <div class="d-flex gap-1">
            <button class="btn btn-success btn-sm" onclick="approvePO('PO-2025-087')"><i class="ti ti-check"></i></button>
            <button class="btn btn-danger btn-sm" onclick="rejectPO('PO-2025-087')"><i class="ti ti-x"></i></button>
          </div></div>
        <div class="appr-row"><div class="appr-icon" style="background:#f0fdf4;color:#16a34a"><i class="ti ti-cash"></i></div>
          <div class="flex-grow-1"><div class="fw-semibold small">Payroll Minggu ke-4 Juni</div><small class="text-muted">Rp 14.200.000 · 18 karyawan</small></div>
          <button class="btn btn-success btn-sm" onclick="approvePayrollAll()"><i class="ti ti-check me-1"></i>Setujui</button></div>
        <div class="appr-row"><div class="appr-icon" style="background:#fffbeb;color:#d97706"><i class="ti ti-transfer"></i></div>
          <div class="flex-grow-1"><div class="fw-semibold small">Transfer Stock → Sudirman</div><small class="text-muted">Semen 60 sak · Cat 40 galon</small></div>
          <div class="d-flex gap-1">
            <button class="btn btn-success btn-sm" onclick="approveTransfer('TRF-042')"><i class="ti ti-check"></i></button>
            <button class="btn btn-danger btn-sm" onclick="showToast('Transfer ditolak','danger')"><i class="ti ti-x"></i></button>
          </div></div>
        <div class="appr-row"><div class="appr-icon" style="background:#eff6ff;color:#2563eb"><i class="ti ti-file-invoice"></i></div>
          <div class="flex-grow-1"><div class="fw-semibold small">Invoice Termin 2 · Sudirman</div><small class="text-muted">Rp 18.500.000 · PT Maju Bersama</small></div>
          <button class="btn btn-primary btn-sm" onclick="sendInvoiceToClient('INV-2025-018')"><i class="ti ti-send me-1"></i>Kirim</button></div>
      </div>
    </div>
  </div>
</div>

<div class="row g-3">
  <div class="col-12 col-lg-6">
    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between">
        <div class="fw-bold small d-flex align-items-center gap-2"><i class="ti ti-package text-primary"></i>Stok Kritis</div>
        <button class="btn btn-outline-secondary btn-sm" onclick="navigate('stock-general')">Semua Stock</button>
      </div>
      ${DB.stock.filter(s=>s.qty<=s.min).map(s=>{const[qcls,,bl]=stockStatus(s);return `
      <div class="d-flex align-items-center gap-3 px-3 py-2 border-bottom">
        <i class="ti ti-package text-muted fs-5"></i>
        <div class="flex-grow-1 min-w-0"><div class="fw-semibold text-truncate small">${s.nama}</div><small class="text-muted">${s.id} · ${s.lokasi}</small></div>
        <div class="text-end flex-shrink-0"><div class="${qcls} small">${s.qty} ${s.satuan}</div><small class="text-muted">min ${s.min}</small></div>
        <span class="${stockStatus(s)[1]}">${bl}</span>
      </div>`;}).join('')}
    </div>
  </div>
  <div class="col-12 col-lg-6">
    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between">
        <div class="fw-bold small d-flex align-items-center gap-2"><i class="ti ti-report-money text-primary"></i>Posisi Keuangan</div>
        <button class="btn btn-outline-secondary btn-sm" onclick="navigate('finance')">Detail</button>
      </div>
      <div class="card-body"><div class="row g-2">
        <div class="col-6"><div class="p-3 rounded-3" style="background:#eff6ff;border:1px solid #bfdbfe"><div class="fw-bold" style="color:#1d4ed8;font-size:10px;text-transform:uppercase">KAS & BANK</div><div class="fw-black" style="font-size:18px;color:#1d4ed8">Rp 18,4M</div></div></div>
        <div class="col-6"><div class="p-3 rounded-3" style="background:#f0fdf4;border:1px solid #bbf7d0"><div class="fw-bold" style="color:#15803d;font-size:10px;text-transform:uppercase">PIUTANG</div><div class="fw-black" style="font-size:18px;color:#15803d">Rp 24,2M</div></div></div>
        <div class="col-6"><div class="p-3 rounded-3" style="background:#fef2f2;border:1px solid #fecaca"><div class="fw-bold" style="color:#991b1b;font-size:10px;text-transform:uppercase">HUTANG</div><div class="fw-black" style="font-size:18px;color:#dc2626">Rp 8,7M</div></div></div>
        <div class="col-6"><div class="p-3 rounded-3" style="background:#fffbeb;border:1px solid #fde68a"><div class="fw-bold" style="color:#92400e;font-size:10px;text-transform:uppercase">RETENSI</div><div class="fw-black" style="font-size:18px;color:#d97706">Rp 3,8M</div></div></div>
      </div></div>
    </div>
  </div>
</div>`);
}

// ── PETA SISTEM ───────────────────────────────────────
function renderMap(){
  const totalK=DB.projects.reduce((a,p)=>a+p.kontrak,0);
  const active=DB.projects.filter(p=>p.status!=='done').length;

  function hubMod(icon,name,sub,page,bg,ic,isOut=false){
    return `<div class="hub-module ${isOut?'out':''}" onclick="navigate('${page}')">
      <div class="hub-mod-icon" style="background:${bg};color:${ic}"><i class="ti ${icon}"></i></div>
      <div class="flex-grow-1 min-w-0"><div class="hub-mod-name">${name}</div><div class="hub-mod-sub">${sub}</div></div>
      <i class="ti ti-chevron-right hub-mod-arr"></i>
    </div>`;
  }
  function step(num,icon,title,sub,page,color='blue'){
    const cols={blue:'#2563eb',green:'#16a34a',amber:'#d97706',red:'#dc2626',purple:'#7c3aed',navy:'#0d2137',teal:'#0d9488'};
    const c=cols[color]||'#2563eb';
    return `<div class="flow-step clr-${color}" onclick="navigate('${page}')">
      <div class="fs-num" style="background:${c}">${num}</div>
      <div class="fs-icon" style="color:${c}"><i class="ti ${icon}"></i></div>
      <div class="fs-title">${title}</div><div class="fs-sub">${sub}</div>
      <div class="fs-link"><i class="ti ti-arrow-right"></i> Buka Modul</div>
    </div>`;
  }
  function arr(){ return `<div class="flow-arr">›</div>`; }
  function deptFlow(bg,icon,title,sub,steps){
    return `<div class="flow-header" style="background:${bg}18;border:1px solid ${bg}30">
      <div class="flow-header-icon" style="background:${bg}18;color:${bg}"><i class="ti ${icon}"></i></div>
      <div><div class="fw-bold" style="font-size:14px">${title}</div><div class="small text-muted mt-1">${sub}</div></div>
    </div><div class="flow-steps">${steps}</div>`;
  }

  return pw(`
${ph('Peta Sistem ERP','Alur bisnis terintegrasi — klik setiap modul untuk membuka halaman terkait')}
<ul class="nav nav-pills mb-4 flex-nowrap overflow-auto" id="map-tabs" style="background:#f1f5f9;padding:3px;border-radius:10px;gap:2px">
  <li class="nav-item"><button class="nav-link active tab-btn" onclick="switchMapTab('overview',this)">🏗 Gambaran Umum</button></li>
  <li class="nav-item"><button class="nav-link tab-btn" onclick="switchMapTab('flow-project',this)">📋 Alur Proyek</button></li>
  <li class="nav-item"><button class="nav-link tab-btn" onclick="switchMapTab('flow-hr',this)">👷 SDM & Gaji</button></li>
  <li class="nav-item"><button class="nav-link tab-btn" onclick="switchMapTab('flow-inv',this)">📦 Inventory</button></li>
  <li class="nav-item"><button class="nav-link tab-btn" onclick="switchMapTab('flow-beli',this)">🛒 Pembelian</button></li>
  <li class="nav-item"><button class="nav-link tab-btn" onclick="switchMapTab('flow-fin',this)">💰 Finance</button></li>
</ul>

<div id="map-overview" class="map-panel">
  <div class="alert alert-info d-flex gap-2 small mb-4"><i class="ti ti-info-circle flex-shrink-0 mt-1"></i>
    <div><strong>Project ID = pusat integrasi.</strong> Setiap transaksi terhubung ke Project ID — HPP & profit terhitung real-time.</div></div>
  <div class="hub-layout">
    <div class="hub-inputs">
      ${hubMod('ti-database','Master Data','Klien, vendor, material','master','#eff6ff','#2563eb')}
      ${hubMod('ti-users','Karyawan & Mandor','SDM & upah harian','employees','#f0fdf4','#16a34a')}
      ${hubMod('ti-package','Stock & Material','Gudang & perlengkapan','stock-general','#fffbeb','#d97706')}
      ${hubMod('ti-tool','Alat & Equipment','Peminjaman ke proyek','equipment','#faf5ff','#7c3aed')}
    </div>
    <div class="hub-arrows">
      <i class="ti ti-arrow-right hub-arrow" style="color:#2563eb"></i>
      <i class="ti ti-arrow-right hub-arrow" style="color:#16a34a"></i>
      <i class="ti ti-arrow-right hub-arrow" style="color:#d97706"></i>
      <i class="ti ti-arrow-right hub-arrow" style="color:#7c3aed"></i>
    </div>
    <div class="hub-center-card">
      <div class="hub-ring"><i class="ti ti-building-skyscraper"></i></div>
      <div class="hub-center-label">PROYEK</div>
      <div class="hub-center-sub">Pusat semua transaksi ERP</div>
      <div class="hub-kpi-grid">
        <div class="hub-kpi"><div class="hub-kpi-val">${active}</div><div class="hub-kpi-label">Aktif</div></div>
        <div class="hub-kpi"><div class="hub-kpi-val">${fmt(totalK)}</div><div class="hub-kpi-label">Kontrak</div></div>
        <div class="hub-kpi"><div class="hub-kpi-val">HPP</div><div class="hub-kpi-label">Real-time</div></div>
        <div class="hub-kpi"><div class="hub-kpi-val">GL Auto</div><div class="hub-kpi-label">Jurnal</div></div>
      </div>
      <div class="hub-badge"><i class="ti ti-refresh"></i> Update Real-time</div>
      <button class="hub-btn" onclick="navigate('projects')">Buka Daftar Proyek <i class="ti ti-arrow-right ms-1"></i></button>
    </div>
    <div class="hub-arrows">
      <i class="ti ti-arrow-right hub-arrow" style="color:#2563eb"></i>
      <i class="ti ti-arrow-right hub-arrow" style="color:#7c3aed"></i>
      <i class="ti ti-arrow-right hub-arrow" style="color:#0d9488"></i>
      <i class="ti ti-arrow-right hub-arrow" style="color:#16a34a"></i>
    </div>
    <div class="hub-outputs">
      ${hubMod('ti-chart-pie','HPP & Profit','Biaya & margin proyek','hpp','#eff6ff','#2563eb',true)}
      ${hubMod('ti-book','General Ledger','Jurnal otomatis','gl','#faf5ff','#7c3aed',true)}
      ${hubMod('ti-report-money','Finance','Kas, piutang, hutang','finance','#f0fdfa','#0d9488',true)}
      ${hubMod('ti-file-analytics','Laporan','L/R proyek & cashflow','reports','#f0fdf4','#16a34a',true)}
    </div>
  </div>
  <div class="row g-3 mt-2">
    <div class="col-md-4"><div class="flow-info-box" style="background:#eff6ff;border:1px solid #bfdbfe">
      <div class="fw-bold small mb-2" style="color:#1d4ed8"><i class="ti ti-clock me-1"></i>Absensi & Gaji</div>
      <div class="small text-secondary mb-2">GPS check-in → Mandor approve → Gaji harian → <strong>HPP otomatis</strong></div>
      <button onclick="navigate('attendance')" class="btn btn-sm btn-primary">Lihat Absensi <i class="ti ti-arrow-right ms-1"></i></button>
    </div></div>
    <div class="col-md-4"><div class="flow-info-box" style="background:#fffbeb;border:1px solid #fde68a">
      <div class="fw-bold small mb-2" style="color:#92400e"><i class="ti ti-package me-1"></i>Inventory & Stock</div>
      <div class="small text-secondary mb-2">Gudang → Transfer → Proyek → Pakai → <strong>HPP otomatis</strong></div>
      <button onclick="navigate('stock-general')" class="btn btn-sm btn-warning text-white">Kelola Stock <i class="ti ti-arrow-right ms-1"></i></button>
    </div></div>
    <div class="col-md-4"><div class="flow-info-box" style="background:#fef2f2;border:1px solid #fecaca">
      <div class="fw-bold small mb-2" style="color:#991b1b"><i class="ti ti-shopping-cart me-1"></i>Pembelian</div>
      <div class="small text-secondary mb-2">PR → Approve → PO → Terima → Invoice → Bayar → <strong>HPP otomatis</strong></div>
      <button onclick="navigate('purchase-request')" class="btn btn-sm btn-danger">Purchase Request <i class="ti ti-arrow-right ms-1"></i></button>
    </div></div>
  </div>
</div>

<div id="map-flow-project" class="map-panel d-none">
  ${deptFlow('#2563eb','ti-folder-open','Alur Manajemen Proyek','Dari kontrak hingga closing dan laporan final profit',`
    ${step(1,'ti-database','Master Data','Klien, vendor, material','master','navy')}${arr()}
    ${step(2,'ti-file-description','Kontrak & RAB','Nilai kontrak & anggaran','rab','blue')}${arr()}
    ${step(3,'ti-users','Assign Tim','PM, mandor & karyawan','employees','blue')}${arr()}
    ${step(4,'ti-tool','Assign Alat','Alat & perlengkapan','equipment','purple')}${arr()}
    ${step(5,'ti-clock','Absensi GPS','Check-in selfie lapangan','attendance','green')}${arr()}
    ${step(6,'ti-chart-pie','Monitor HPP','HPP real-time','hpp','amber')}${arr()}
    ${step(7,'ti-file-invoice','Invoice Termin','Tagih per termin','finance','teal')}${arr()}
    ${step(8,'ti-package','Closing','Return alat & material','stock-transfer','red')}${arr()}
    ${step(9,'ti-file-analytics','Laporan Final','Profit & dokumentasi','reports','green')}
  `)}
</div>
<div id="map-flow-hr" class="map-panel d-none">
  ${deptFlow('#16a34a','ti-users','Alur SDM & Penggajian Harian','Dari pendaftaran karyawan hingga gaji masuk HPP',`
    ${step(1,'ti-user-plus','Daftar Karyawan','Input data & upah','employees','green')}${arr()}
    ${step(2,'ti-folder-open','Assign Proyek','Tugaskan ke proyek','projects','blue')}${arr()}
    ${step(3,'ti-map-pin','Check-in GPS','Selfie + validasi lokasi','attendance','green')}${arr()}
    ${step(4,'ti-clock','Check-out','Rekap jam & lembur','attendance','green')}${arr()}
    ${step(5,'ti-user-check','Mandor Approve','Verifikasi absensi','attendance','amber')}${arr()}
    ${step(6,'ti-calculator','Hitung Gaji','Upah + tunjangan','payroll','blue')}${arr()}
    ${step(7,'ti-user-dollar','Approve Owner','Finance setujui','payroll','purple')}${arr()}
    ${step(8,'ti-cash','Bayar Gaji','Transfer karyawan','payroll','green')}${arr()}
    ${step(9,'ti-chart-pie','HPP Update','Biaya TK → HPP','hpp','red')}
  `)}
</div>
<div id="map-flow-inv" class="map-panel d-none">
  ${deptFlow('#d97706','ti-package','Alur Inventory & Material','Dari gudang umum hingga pemakaian & sisa kembali',`
    ${step(1,'ti-building-warehouse','Stock Umum','Gudang pusat material','stock-general','blue')}${arr()}
    ${step(2,'ti-clipboard-list','Request Transfer','Mandor ajukan','stock-transfer','amber')}${arr()}
    ${step(3,'ti-user-check','Owner Approve','Setujui transfer','stock-transfer','purple')}${arr()}
    ${step(4,'ti-truck','Kirim Proyek','Material ke lapangan','stock-transfer','navy')}${arr()}
    ${step(5,'ti-building-warehouse','Stock Proyek','Di gudang proyek','stock-project','green')}${arr()}
    ${step(6,'ti-tools','Pemakaian','Catat material terpakai','stock-project','amber')}${arr()}
    ${step(7,'ti-chart-pie','HPP Update','Nilai material → HPP','hpp','red')}${arr()}
    ${step(8,'ti-arrow-back-up','Return Sisa','Sisa kembali ke gudang','stock-transfer','navy')}
  `)}
</div>
<div id="map-flow-beli" class="map-panel d-none">
  ${deptFlow('#dc2626','ti-shopping-cart','Alur Procurement','Dari PR lapangan hingga pembayaran vendor & HPP',`
    ${step(1,'ti-clipboard-list','PR dari Proyek','Mandor/PM ajukan','purchase-request','red')}${arr()}
    ${step(2,'ti-user-check','Approve Owner','Verifikasi & harga','purchase-request','purple')}${arr()}
    ${step(3,'ti-shopping-cart','Buat PO','Purchase order','purchase-order','blue')}${arr()}
    ${step(4,'ti-send','Kirim Vendor','PO ke vendor','purchase-order','navy')}${arr()}
    ${step(5,'ti-package','Terima Barang','Cek qty & kualitas','purchase-order','green')}${arr()}
    ${step(6,'ti-file-invoice','Invoice Vendor','Input tagihan','finance','amber')}${arr()}
    ${step(7,'ti-cash','Bayar Vendor','Transfer ke vendor','finance','green')}${arr()}
    ${step(8,'ti-chart-pie','HPP Update','Biaya → HPP proyek','hpp','red')}
  `)}
</div>
<div id="map-flow-fin" class="map-panel d-none">
  ${deptFlow('#7c3aed','ti-report-money','Alur Finance & Akuntansi','Dari kontrak hingga laporan L/R — semua jurnal dibuat otomatis',`
    ${step(1,'ti-file-description','Kontrak','Nilai & termin','projects','navy')}${arr()}
    ${step(2,'ti-chart-pie','Monitor HPP','Biaya real-time','hpp','red')}${arr()}
    ${step(3,'ti-file-invoice','Invoice Termin','Tagih per termin','finance','blue')}${arr()}
    ${step(4,'ti-building-bank','Piutang','Tagihan outstanding','finance','amber')}${arr()}
    ${step(5,'ti-transfer','Terima Bayar','Masuk ke kas','finance','green')}${arr()}
    ${step(6,'ti-credit-card','Bayar Vendor','Lunasi hutang','finance','red')}${arr()}
    ${step(7,'ti-book','GL Auto','Jurnal otomatis','gl','purple')}${arr()}
    ${step(8,'ti-trending-up','Laporan L/R','Profit & cashflow','reports','green')}
  `)}
  <div class="fin-hero mt-3"><div class="row g-4">
    <div class="col-6 col-md-3"><div class="fin-hero-label">Kas & Bank</div><div class="fin-hero-val">Rp 18,4M</div><small style="color:rgba(255,255,255,.4)">Saldo hari ini</small></div>
    <div class="col-6 col-md-3"><div class="fin-hero-label">Piutang</div><div class="fin-hero-val" style="color:#93c5fd">Rp 24,2M</div><small style="color:rgba(255,255,255,.4)">3 invoice</small></div>
    <div class="col-6 col-md-3"><div class="fin-hero-label">Hutang</div><div class="fin-hero-val" style="color:#fca5a5">Rp 8,7M</div><small style="color:rgba(255,255,255,.4)">2 jatuh tempo</small></div>
    <div class="col-6 col-md-3"><div class="fin-hero-label">Profit Bulan Ini</div><div class="fin-hero-val" style="color:#86efac">Rp 5,9M</div><small style="color:rgba(255,255,255,.4)">+14% vs lalu</small></div>
  </div></div>
</div>`);
}

// ── PROJECTS ──────────────────────────────────────────
function renderProjects(){
  const active = DB.projects.filter(p=>p.status!=='done');
  return pw(`
${ph('Manajemen Proyek',`${DB.projects.length} aktif · 3 selesai · 2 pipeline`,
  `<button class="btn btn-outline-secondary btn-sm" onclick="openModal('filterProjects')"><i class="ti ti-filter me-1"></i>Filter</button>
   <button class="btn btn-primary btn-sm" onclick="openModal('newProject')"><i class="ti ti-plus me-1"></i>Proyek Baru</button>`)}
<ul class="nav nav-pills mb-3" style="background:#f1f5f9;padding:3px;border-radius:10px;gap:2px">
  <li class="nav-item"><button class="nav-link active tab-btn" onclick="filterProjects('active',this)">Aktif (<span data-count>${active.length}</span>)</button></li>
  <li class="nav-item"><button class="nav-link tab-btn" onclick="filterProjects('done',this)">Selesai (3)</button></li>
  <li class="nav-item"><button class="nav-link tab-btn" onclick="filterProjects('pipeline',this)">Pipeline (2)</button></li>
  <li class="nav-item"><button class="nav-link tab-btn" onclick="filterProjects('late',this)">Terlambat (${DB.projects.filter(p=>p.status==='late').length})</button></li>
  <li class="nav-item"><button class="nav-link tab-btn" onclick="filterProjects('all',this)">Semua</button></li>
</ul>
<div class="card mb-4">
  <div class="table-responsive">
    <table class="table table-hover mb-0">
      <thead><tr><th>Proyek</th><th>Nilai Kontrak</th><th>HPP Aktual</th><th>Progress</th><th>Deadline</th><th>Status</th></tr></thead>
      <tbody id="proj-tbody">${active.map(p=>projRowHTML(p,'detail')).join('')}</tbody>
    </table>
  </div>
</div>
<div class="row g-3">
  <div class="col-md-6">
    <div class="card"><div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-chart-donut text-primary"></i>HPP vs Kontrak</div>
      <div class="card-body">${DB.projects.map(p=>{const pct=Math.round(p.hpp/p.kontrak*100);return `
        <div class="mb-3"><div class="d-flex justify-content-between small mb-1"><span class="fw-semibold text-truncate" style="max-width:240px">${p.name}</span><span class="text-muted ms-2">HPP ${pct}%</span></div>
        <div class="prg" style="height:8px"><div class="prg-fill ${pct>85?'prg-red':pct>70?'prg-amber':'prg-blue'}" style="height:8px;width:${pct}%"></div></div></div>`;}).join('')}</div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card"><div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-users text-primary"></i>Tim Per Proyek</div>
      ${DB.projects.map(p=>`<div class="d-flex align-items-center gap-3 px-4 py-3 border-bottom">
        <div class="d-flex align-items-center justify-content-center rounded-3 text-white fw-black flex-shrink-0" style="width:36px;height:36px;background:#0d2137;font-size:12px">${p.workers}</div>
        <div class="flex-grow-1 min-w-0"><div class="fw-semibold text-truncate small">${p.name}</div><small class="text-muted">${p.pm}</small></div>
        ${statusBadge(p.status)}
      </div>`).join('')}
    </div>
  </div>
</div>`);
}

// ── RAB ───────────────────────────────────────────────
function renderRAB(){
  const items=[
    {no:'A.1',ket:'Mobilisasi & Demobilisasi',vol:1,sat:'ls',harga:5000000,aktual:4800000},
    {no:'A.2',ket:'Pengukuran & Bouwplank',vol:1,sat:'ls',harga:2500000,aktual:2500000},
    {no:'B.1',ket:'Cor beton K-300 pondasi',vol:24,sat:'m³',harga:950000,aktual:22800000},
    {no:'B.2',ket:'Pembesian kolom D19 & D13',vol:1200,sat:'kg',harga:14500,aktual:18100000},
    {no:'B.3',ket:'Bekisting plat lantai',vol:180,sat:'m²',harga:85000,aktual:14800000},
    {no:'B.4',ket:'Cor beton K-300 balok',vol:48,sat:'m³',harga:980000,aktual:null},
    {no:'C.1',ket:'Pasangan bata ringan AAC',vol:320,sat:'m²',harga:120000,aktual:null},
    {no:'C.2',ket:'Plesteran + acian dinding',vol:640,sat:'m²',harga:55000,aktual:null},
  ];
  const totalRAB=items.reduce((a,i)=>a+(i.vol*i.harga),0);
  const totalAkt=items.filter(i=>i.aktual).reduce((a,i)=>a+i.aktual,0);
  return pw(`
${ph('RAB / BOQ','Rencana Anggaran Biaya & Bill of Quantity',
  `<select class="form-select form-select-sm" style="width:220px" onchange="showToast('Menampilkan RAB: '+this.options[this.selectedIndex].text,'info')">${DB.projects.map(p=>`<option>${p.name}</option>`).join('')}</select>
   <button class="btn btn-outline-secondary btn-sm" onclick="exportPDF()"><i class="ti ti-printer me-1"></i>Print</button>
   <button class="btn btn-primary btn-sm" onclick="exportExcel()"><i class="ti ti-download me-1"></i>Export Excel</button>`)}
<div class="row g-3 mb-4">
  <div class="col-6 col-md-3">${sc('Total RAB',fmt(totalRAB),'','','ti-file-description')}</div>
  <div class="col-6 col-md-3">${sc('Terpakai',fmt(totalAkt),Math.round(totalAkt/totalRAB*100)+'% dari RAB','sc-amber','ti-coin')}</div>
  <div class="col-6 col-md-3">${sc('Sisa Budget',fmt(totalRAB-totalAkt),'Progress 72%','sc-green','ti-alert-triangle')}</div>
  <div class="col-6 col-md-3">${sc('Margin Est.',fmt(12500000000-10500000000),'Kontrak Rp 12,5M','sc-green','ti-trending-up')}</div>
</div>
<div class="card">
  <div class="card-header d-flex align-items-center justify-content-between">
    <div class="fw-bold small d-flex align-items-center gap-2"><i class="ti ti-table text-primary"></i>RAB/BOQ — Gedung Perkantoran Sudirman</div>
    <button class="btn btn-primary btn-sm" onclick="openModal('addBOQ')"><i class="ti ti-plus me-1"></i>Tambah Item</button>
  </div>
  <div class="table-responsive">
    <table class="table mb-0">
      <thead><tr><th>No</th><th>Uraian Pekerjaan</th><th>Vol</th><th>Sat</th><th>Harga/Sat</th><th>Sub Total</th><th>Aktual</th><th>Selisih</th></tr></thead>
      <tbody>
        <tr class="table-light"><td colspan="8" class="fw-bold small text-uppercase" style="letter-spacing:.5px;color:#475569">A. Pekerjaan Persiapan</td></tr>
        ${items.slice(0,2).map(i=>{const sel=i.aktual?i.aktual-i.vol*i.harga:null;return `<tr><td class="text-muted small font-monospace">${i.no}</td><td class="fw-medium">${i.ket}</td><td>${i.vol}</td><td class="text-muted">${i.sat}</td><td>${fmtFull(i.harga)}</td><td class="fw-bold">${fmtFull(i.vol*i.harga)}</td><td class="${i.aktual?'fw-semibold text-success':''}">${i.aktual?fmtFull(i.aktual):'—'}</td><td class="fw-semibold ${sel!==null&&sel>0?'text-danger':'text-success'}">${sel!==null?(sel>0?'+':'')+fmtFull(sel):'—'}</td></tr>`;}).join('')}
        <tr class="table-light"><td colspan="8" class="fw-bold small text-uppercase" style="letter-spacing:.5px;color:#475569">B. Pekerjaan Struktur</td></tr>
        ${items.slice(2,6).map(i=>{const sel=i.aktual?i.aktual-i.vol*i.harga:null;return `<tr><td class="text-muted small font-monospace">${i.no}</td><td class="fw-medium">${i.ket}</td><td>${i.vol.toLocaleString()}</td><td class="text-muted">${i.sat}</td><td>${fmtFull(i.harga)}</td><td class="fw-bold">${fmtFull(i.vol*i.harga)}</td><td class="${i.aktual?'fw-semibold '+(sel>0?'text-warning':'text-success'):''}">${i.aktual?fmtFull(i.aktual):'Proses'}</td><td class="fw-semibold ${sel!==null&&sel>0?'text-danger':sel!==null?'text-success':'text-muted'}">${sel!==null?(sel>0?'+':'')+fmtFull(sel):'—'}</td></tr>`;}).join('')}
        <tr class="table-light"><td colspan="8" class="fw-bold small text-uppercase" style="letter-spacing:.5px;color:#475569">C. Pekerjaan Arsitektur</td></tr>
        ${items.slice(6).map(i=>`<tr class="text-muted"><td class="font-monospace small">${i.no}</td><td>${i.ket}</td><td>${i.vol}</td><td>${i.sat}</td><td>${fmtFull(i.harga)}</td><td class="fw-semibold">${fmtFull(i.vol*i.harga)}</td><td>Belum</td><td>—</td></tr>`).join('')}
        <tr class="table-primary fw-bold"><td colspan="5">TOTAL RAB</td><td>${fmtFull(totalRAB)}</td><td class="text-success">${fmtFull(totalAkt)}</td><td class="text-success">-${fmtFull(totalRAB-totalAkt)}</td></tr>
      </tbody>
    </table>
  </div>
</div>`);
}

// ── HPP ───────────────────────────────────────────────
function renderHPP(){
  const p=DB.projects[0];
  const oh=Math.round(p.hpp*.08),profit=p.kontrak-p.hpp-oh,margin=(profit/p.kontrak*100).toFixed(1);
  const comps=[
    {l:'Material Terpakai',b:3200000000,a:3201000000,c:'#2563eb',src:'Stock → Proyek'},
    {l:'Gaji Harian TK',b:2400000000,a:2358000000,c:'#16a34a',src:'Absensi→Payroll'},
    {l:'Pembelian Proyek',b:1600000000,a:1516000000,c:'#d97706',src:'Purchase Order'},
    {l:'Biaya Alat',b:900000000,a:842000000,c:'#7c3aed',src:'Pinjam Alat'},
    {l:'Subkontraktor',b:600000000,a:503000000,c:'#dc2626',src:'SPK Sub'},
    {l:'Operasional',b:400000000,a:0,c:'#94a3b8',src:'Manual'},
  ];
  return pw(`
${ph('HPP & Keuntungan Proyek','Project Costing Real-time',
  `<select class="form-select form-select-sm" style="width:240px" onchange="showToast('Memuat HPP: '+this.options[this.selectedIndex].text,'info')">${DB.projects.map(pp=>`<option ${pp.id===p.id?'selected':''}>${pp.name}</option>`).join('')}</select>
   <button class="btn btn-primary btn-sm" onclick="exportPDF()"><i class="ti ti-download me-1"></i>Export PDF</button>`)}
<div class="row g-3 mb-4">
  <div class="col-6 col-md-3">${sc('Nilai Kontrak',fmt(p.kontrak),'Progress '+p.progress+'%','','ti-contract')}</div>
  <div class="col-6 col-md-3">${sc('Total HPP',fmt(p.hpp),Math.round(p.hpp/p.kontrak*100)+'% dari kontrak','sc-amber','ti-coins')}</div>
  <div class="col-6 col-md-3">${sc('Overhead 8%',fmt(oh),'','sc-red','ti-percentage')}</div>
  <div class="col-6 col-md-3">${sc('Profit Bersih',fmt(profit),'Margin '+margin+'%',profit>0?'sc-green':'sc-red','ti-trending-up')}</div>
</div>
<div class="row g-3 mb-3">
  <div class="col-md-6">
    <div class="card h-100"><div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-chart-donut text-primary"></i>Komposisi HPP</div>
      <div class="card-body">
        <div class="hpp-bar mb-4">
          <div class="hpp-seg" style="width:38%;background:#2563eb">38%</div>
          <div class="hpp-seg" style="width:28%;background:#16a34a">28%</div>
          <div class="hpp-seg" style="width:18%;background:#d97706">18%</div>
          <div class="hpp-seg" style="width:10%;background:#7c3aed">10%</div>
          <div class="hpp-seg" style="width:6%;background:#dc2626">6%</div>
        </div>
        <div class="row g-2">${comps.map(c=>`<div class="col-6"><div class="d-flex align-items-center gap-2 p-2 rounded-3 border bg-light">
          <div style="width:10px;height:10px;border-radius:2px;background:${c.c};flex-shrink:0"></div>
          <div class="min-w-0 flex-grow-1"><div class="fw-semibold text-truncate" style="font-size:11px">${c.l}</div><div class="text-muted" style="font-size:11px">${fmt(c.a||c.b)}</div></div>
        </div></div>`).join('')}</div>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card h-100"><div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-calculator text-primary"></i>Kalkulasi Profit</div>
      <div class="card-body">
        <div class="sum-row sub"><span>Nilai Kontrak</span><span>${fmtFull(p.kontrak)}</span></div>
        <div class="sum-row"><span class="text-danger">(-) Total HPP</span><span class="fw-bold text-danger">${fmtFull(p.hpp)}</span></div>
        <div class="sum-row"><span class="text-danger">(-) Overhead 8%</span><span class="fw-bold text-danger">${fmtFull(oh)}</span></div>
        <hr class="my-2">
        <div class="sum-row ${profit>0?'total':'loss'}"><span>${profit>0?'Keuntungan Bersih':'Kerugian'}</span><span>${fmtFull(profit)}</span></div>
        <div class="sum-row"><span class="text-muted">Margin</span><span class="fw-bold ${profit>0?'text-success':'text-danger'}">${margin}%</span></div>
        <div class="alert alert-light border mt-3 small p-2"><strong>Formula:</strong> Profit = Kontrak − (Material + Gaji + Alat + Pembelian + Subkon) − Overhead</div>
      </div>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-table text-primary"></i>Detail Komponen HPP vs Budget</div>
  <div class="table-responsive">
    <table class="table table-hover mb-0">
      <thead><tr><th>Komponen</th><th>Budget RAB</th><th>Aktual</th><th>Selisih</th><th>Realisasi</th><th>Sumber Data</th></tr></thead>
      <tbody>${comps.map(r=>{const sel=r.a-r.b,pct=Math.round(r.a/r.b*100);return `<tr>
        <td class="fw-semibold">${r.l}</td><td>${fmt(r.b)}</td>
        <td class="fw-bold ${sel>0?'text-warning':'text-success'}">${r.a?fmt(r.a):'—'}</td>
        <td class="fw-bold ${sel>0?'text-danger':'text-success'}">${r.a?(sel>0?'+':'')+fmt(sel):'—'}</td>
        <td style="min-width:120px"><div class="d-flex align-items-center gap-2"><div class="flex-grow-1 prg" style="height:5px"><div class="prg-fill prg-blue" style="height:5px;width:${Math.min(pct,100)}%"></div></div><small>${pct}%</small></div></td>
        <td class="text-muted small font-monospace">${r.src}</td>
      </tr>`;}).join('')}
        <tr class="table-primary fw-bold"><td>TOTAL HPP</td><td>${fmt(8700000000)}</td><td class="text-warning">${fmt(p.hpp)}</td><td class="text-success">-Rp 280Jt</td><td>96.8%</td><td></td></tr>
      </tbody>
    </table>
  </div>
</div>`);
}

// ── ATTENDANCE ────────────────────────────────────────
function renderAttendance(){
  const apprd=DB.attendance.filter(a=>a.status==='approved');
  const pend=DB.attendance.filter(a=>a.status==='pending');
  return pw(`
${ph('Absensi Karyawan Lapangan','GPS & Selfie Verification · '+new Date().toLocaleDateString('id-ID'),
  `<input type="date" class="form-control form-control-sm" value="${today()}" style="width:160px" onchange="filterAttendance(this.value)">
   <button class="btn btn-outline-secondary btn-sm" onclick="openModal('filterAttendance')"><i class="ti ti-filter me-1"></i>Filter</button>
   <button class="btn btn-outline-secondary btn-sm" onclick="exportPDF()"><i class="ti ti-download me-1"></i>Export</button>
   <button class="btn btn-success btn-sm" onclick="approveAllAtt()"><i class="ti ti-checks me-1"></i>Setujui Semua Pending</button>`)}
<div class="row g-3 mb-4">
  <div class="col-6 col-md">${sc('Hadir','<span id="att-stat-hadir">'+apprd.length+' org</span>','GPS terverifikasi','sc-green','ti-check-circle')}</div>
  <div class="col-6 col-md">${sc('Pending','<span id="att-stat-pend">'+pend.length+' org</span>','Menunggu mandor','','ti-clock')}</div>
  <div class="col-6 col-md">${sc('Absen','3 org','Tidak check-in','sc-red','ti-x-circle')}</div>
  <div class="col-6 col-md">${sc('Lembur','5 org','>8 jam kerja','','ti-moon')}</div>
  <div class="col-6 col-md">${sc('Belum Checkout','2 org','Masih di lapangan','sc-amber','ti-clock-off')}</div>
</div>
<div class="card">
  <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-list text-primary"></i>Daftar Absensi</div>
  <div class="table-responsive">
    <table class="table table-hover mb-0">
      <thead><tr><th>Karyawan</th><th>Proyek</th><th>Check-in</th><th>Check-out</th><th>Jam</th><th>Upah</th><th>Status</th><th>Aksi</th></tr></thead>
      <tbody id="att-tbody">${DB.attendance.map(a=>attRowHTML(a)).join('')}</tbody>
    </table>
  </div>
</div>`);
}

// ── PAYROLL ───────────────────────────────────────────
function renderPayroll(){
  const total=DB.payroll.reduce((a,p)=>a+payrollNet(p),0);
  const pending=DB.payroll.filter(p=>p.status==='pending');
  return pw(`
${ph('Payroll Harian Karyawan','Periode: Minggu ke-4 Juni 2025 · Total: '+fmtFull(total),
  `<select class="form-select form-select-sm" style="width:180px" onchange="showToast('Filter periode: '+this.value,'info')">
    <option>Minggu ke-4 Juni 2025</option><option>Minggu ke-3 Juni 2025</option><option>Minggu ke-2 Juni 2025</option><option>Minggu ke-1 Juni 2025</option>
   </select>
   <button class="btn btn-outline-secondary btn-sm" onclick="exportPDF()"><i class="ti ti-download me-1"></i>Export</button>
   <button class="btn btn-primary btn-sm" onclick="approvePayrollAll()"><i class="ti ti-cash me-1"></i>Proses Semua Pending (${pending.length})</button>`)}
<div class="row g-3 mb-4">
  <div class="col-6 col-md-3">${sc('Total Karyawan',DB.payroll.length,'Periode ini','','ti-users')}</div>
  <div class="col-6 col-md-3">${sc('Pending',pending.length,'Menunggu approval','sc-amber','ti-clock')}</div>
  <div class="col-6 col-md-3">${sc('Total Dibayar',fmt(total),'','sc-green','ti-currency-dollar')}</div>
  <div class="col-6 col-md-3">${sc('HPP Tenaga Kerja',fmt(total),'Otomatis ke proyek','','ti-chart-pie')}</div>
</div>
${DB.payroll.map(p=>{const net=payrollNet(p);return `
<div class="pay-card">
  <div class="pay-head">
    <div class="d-flex align-items-center gap-3"><div class="pay-av" style="background:${p.color||'#2563eb'}">${p.initials}</div><div><div class="fw-bold">${p.name}</div><small class="text-muted">${p.role} · ${p.project}</small></div></div>
    <div class="d-flex align-items-center gap-2">${statusBadge(p.status)}<button class="btn btn-outline-secondary btn-sm" onclick="printSlip('${p.id}')"><i class="ti ti-printer me-1"></i>Slip Gaji</button></div>
  </div>
  <div class="pay-items">
    <div class="pay-item"><div class="pay-item-label">Hari Kerja</div><div class="pay-item-val">${p.days} hari</div></div>
    <div class="pay-item"><div class="pay-item-label">Upah/Hari</div><div class="pay-item-val">${fmt(p.upah)}</div></div>
    <div class="pay-item"><div class="pay-item-label">Gaji Pokok</div><div class="pay-item-val">${fmt(p.days*p.upah)}</div></div>
    <div class="pay-item"><div class="pay-item-label">Lembur</div><div class="pay-item-val pos">+${fmt(p.lembur||0)}</div></div>
    <div class="pay-item"><div class="pay-item-label">Uang Makan</div><div class="pay-item-val pos">+${fmt(p.makan||0)}</div></div>
    <div class="pay-item"><div class="pay-item-label">Transport</div><div class="pay-item-val pos">+${fmt(p.transport||0)}</div></div>
    <div class="pay-item"><div class="pay-item-label">Kasbon</div><div class="pay-item-val neg">-${fmt(p.kasbon||0)}</div></div>
    <div class="pay-item"><div class="pay-item-label">Potongan</div><div class="pay-item-val neg">-${fmt(p.potongan||0)}</div></div>
  </div>
  <div class="pay-foot">
    <div><div class="small text-muted fw-semibold">Total Diterima</div><div class="small text-muted mt-1"><i class="ti ti-arrow-right" style="font-size:11px"></i> HPP: ${p.project}</div></div>
    <div class="text-end">
      <div class="pay-total">${fmtFull(net)}</div>
      <div class="d-flex gap-2 mt-2 justify-content-end">
        ${p.status==='pending'
          ?`<button class="btn btn-success btn-sm" onclick="approvePayroll('${p.id}')"><i class="ti ti-check me-1"></i>Setujui & Bayar</button>
             <button class="btn btn-outline-secondary btn-sm" onclick="showToast('Pembayaran ${p.name} ditunda','warning')">Tunda</button>`
          :p.status==='approved'
          ?`<button class="btn btn-primary btn-sm" onclick="processPayrollPayment('${p.id}')"><i class="ti ti-cash me-1"></i>Proses Bayar</button>`
          :`<span class="text-success fw-semibold small d-flex align-items-center gap-1"><i class="ti ti-check-circle"></i> Sudah Dibayarkan</span>`}
      </div>
    </div>
  </div>
</div>`;}).join('')}`);
}

// ── STOCK GENERAL ─────────────────────────────────────
function renderStockGeneral(){
  const crit=DB.stock.filter(s=>s.qty<=s.min*.5).length;
  const warn=DB.stock.filter(s=>s.qty>s.min*.5&&s.qty<=s.min).length;
  return pw(`
${ph('Stock Umum — Gudang Depok',`${DB.stock.length} item · ${crit} kritis · ${warn} hampir habis`,
  `<button class="btn btn-outline-secondary btn-sm" onclick="exportExcel()"><i class="ti ti-download me-1"></i>Export</button>
   <button class="btn btn-primary btn-sm" onclick="openModal('addStock')"><i class="ti ti-plus me-1"></i>Tambah Item</button>`)}
${crit?`<div class="alert alert-danger d-flex gap-2 small"><i class="ti ti-alert-triangle flex-shrink-0 mt-1"></i><div><strong>${crit} item di bawah minimum stok</strong> — Buat purchase request segera.</div></div>`:''}
<div class="row g-3 mb-4">
  <div class="col-6 col-md-3">${sc('Total Item',DB.stock.length,'','','ti-package')}</div>
  <div class="col-6 col-md-3">${sc('Kritis',crit,'Di bawah minimum','sc-red','ti-alert-circle')}</div>
  <div class="col-6 col-md-3">${sc('Hampir Habis',warn,'50–100% minimum','sc-amber','ti-alert-triangle')}</div>
  <div class="col-6 col-md-3">${sc('Nilai Total',fmt(DB.stock.reduce((a,s)=>a+s.qty*s.harga,0)),'','sc-green','ti-coin')}</div>
</div>
<div class="card">
  <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-list text-primary"></i>Daftar Stock</div>
  <div class="table-responsive">
    <table class="table table-hover mb-0">
      <thead><tr><th>Kode</th><th>Nama Item</th><th>Kategori</th><th>Stok</th><th>Min</th><th>Sat</th><th>Harga/Sat</th><th>Nilai</th><th>Lokasi</th><th>Status</th><th>Aksi</th></tr></thead>
      <tbody>${DB.stock.map(s=>{const[qc,bc,lb]=stockStatus(s);return `<tr>
        <td class="text-muted font-monospace small">${s.id}</td><td class="fw-semibold">${s.nama}</td>
        <td><span class="badge bg-light text-dark border">${s.kategori}</span></td>
        <td class="${qc} fw-bold">${s.qty.toLocaleString()}</td>
        <td class="text-muted">${s.min}</td><td class="text-muted">${s.satuan}</td>
        <td>${fmtFull(s.harga)}</td><td class="fw-semibold">${fmt(s.qty*s.harga)}</td>
        <td class="text-muted small">${s.lokasi}</td>
        <td><span class="${bc}">${lb}</span></td>
        <td><div class="d-flex gap-1">
          <button class="btn btn-outline-secondary btn-sm" onclick="openModal('newTransfer')" title="Transfer ke Proyek"><i class="ti ti-transfer"></i></button>
          <button class="btn btn-outline-primary btn-sm" onclick="navigate('purchase-request')" title="Buat PR"><i class="ti ti-shopping-cart"></i></button>
        </div></td>
      </tr>`;}).join('')}</tbody>
    </table>
  </div>
</div>`);
}

// ── STOCK PROJECT ─────────────────────────────────────
function renderStockProject(){
  return pw(`
${ph('Stock Proyek','Material yang ditransfer ke masing-masing proyek',
  `<select class="form-select form-select-sm" style="width:220px" onchange="showToast('Filter proyek: '+this.options[this.selectedIndex].text,'info')"><option>Semua Proyek</option>${DB.projects.map(p=>`<option>${p.name}</option>`).join('')}</select>`)}
<div class="row g-3">
  ${DB.projects.slice(0,4).map(p=>`
  <div class="col-md-6"><div class="card h-100">
    <div class="card-header d-flex align-items-center justify-content-between">
      <div class="fw-bold small d-flex align-items-center gap-2"><i class="ti ti-building-warehouse text-primary"></i>${p.name.substring(0,24)}...</div>
      ${statusBadge(p.status)}
    </div>
    <div class="table-responsive">
      <table class="table table-sm mb-0">
        <thead><tr><th>Material</th><th>Qty</th><th>Sat</th><th>Terpakai</th><th>Sisa</th></tr></thead>
        <tbody>
          <tr><td class="fw-medium">Semen Portland</td><td class="fw-bold">45</td><td class="text-muted">sak</td><td><div class="prg" style="width:60px;height:5px;display:inline-block"><div class="prg-fill prg-blue" style="height:5px;width:65%"></div></div></td><td class="fw-bold text-success">16</td></tr>
          <tr><td class="fw-medium">Besi Beton D13</td><td class="fw-bold">80</td><td class="text-muted">btg</td><td><div class="prg" style="width:60px;height:5px;display:inline-block"><div class="prg-fill prg-green" style="height:5px;width:40%"></div></div></td><td class="fw-bold text-success">48</td></tr>
          <tr><td class="fw-medium">Bata Ringan</td><td class="fw-bold">200</td><td class="text-muted">buah</td><td><div class="prg" style="width:60px;height:5px;display:inline-block"><div class="prg-fill prg-amber" style="height:5px;width:78%"></div></div></td><td class="fw-bold text-warning">44</td></tr>
        </tbody>
      </table>
    </div>
    <div class="p-3 border-top d-flex gap-2">
      <button class="btn btn-primary btn-sm" onclick="openModal('newTransfer')"><i class="ti ti-plus me-1"></i>Request Material</button>
      <button class="btn btn-outline-secondary btn-sm" onclick="openReturnStockModal('${p.id}')"><i class="ti ti-arrow-back-up me-1"></i>Return Sisa</button>
    </div>
  </div></div>`).join('')}
</div>`);
}

// ── STOCK TRANSFER ────────────────────────────────────
function renderStockTransfer(){
  return pw(`
${ph('Transfer Stock','Pindahkan material dari gudang umum ke proyek',
  `<button class="btn btn-primary btn-sm" onclick="openModal('newTransfer')"><i class="ti ti-plus me-1"></i>Buat Transfer</button>`)}
<div class="row g-4">
  <div class="col-lg-7">
    <div class="card">
      <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-list text-primary"></i>Riwayat Transfer</div>
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead><tr><th>No Transfer</th><th>Ke Proyek</th><th>Material</th><th>Qty</th><th>Tgl</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody id="trf-tbody">${TRANSFERS.map(t=>`<tr>
            <td class="fw-bold text-primary">${t.id}</td><td class="fw-medium">${t.ke}</td><td>${t.item}</td>
            <td class="fw-bold">${t.qty}</td><td class="text-muted">${t.date}</td>
            <td>${statusBadge(t.status)}</td>
            <td>${t.status==='pending'?`<button class="btn btn-success btn-sm" onclick="approveTransfer('${t.id}')"><i class="ti ti-check"></i></button>`:''}</td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="col-lg-5">
    <div class="card">
      <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-transfer text-primary"></i>Form Transfer Cepat</div>
      <div class="card-body">
        <div class="mb-3"><label class="form-label">Ke Proyek *</label><select class="form-select" id="tf-proj"><option value="">Pilih proyek...</option>${DB.projects.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</select></div>
        <div class="mb-3"><label class="form-label">Material *</label><select class="form-select" id="tf-item"><option value="">Pilih material...</option>${DB.stock.map(s=>`<option value="${s.id}">${s.nama} (${s.qty} ${s.satuan})</option>`).join('')}</select></div>
        <div class="row g-3 mb-3">
          <div class="col-6"><label class="form-label">Jumlah *</label><input type="number" class="form-control" id="tf-qty" placeholder="0" min="1"></div>
          <div class="col-6"><label class="form-label">Tanggal</label><input type="date" class="form-control" id="tf-date" value="${today()}"></div>
        </div>
        <div class="mb-3"><label class="form-label">Keterangan</label><textarea class="form-control" id="tf-note" rows="2" placeholder="Keperluan..."></textarea></div>
        <button class="btn btn-primary w-100" onclick="submitTransfer()"><i class="ti ti-send me-1"></i>Kirim Request Transfer</button>
      </div>
    </div>
  </div>
</div>`);
}

// ── EQUIPMENT ─────────────────────────────────────────
function renderEquipment(){
  return pw(`
${ph('Alat & Perlengkapan','Manajemen peminjaman alat ke proyek & kondisi',
  `<button class="btn btn-primary btn-sm" onclick="openModal('addEquipment')"><i class="ti ti-plus me-1"></i>Tambah Alat</button>`)}
<div class="row g-3 mb-4">
  <div class="col-6 col-md-3">${sc('Jenis Alat',DB.equipment.length,'Terdaftar','','ti-tool')}</div>
  <div class="col-6 col-md-3">${sc('Dipinjam',DB.equipment.reduce((a,e)=>a+e.dipinjam,0)+' unit','Di lapangan','sc-amber','ti-arrow-right')}</div>
  <div class="col-6 col-md-3">${sc('Tersedia',DB.equipment.reduce((a,e)=>a+(e.total-e.dipinjam),0)+' unit','Siap pakai','sc-green','ti-check')}</div>
  <div class="col-6 col-md-3">${sc('Nilai Aset','Rp 142M','Estimasi total','','ti-coins')}</div>
</div>
<div class="card">
  <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-tool text-primary"></i>Daftar Alat & Status</div>
  <div class="table-responsive">
    <table class="table table-hover mb-0">
      <thead><tr><th>ID</th><th>Nama Alat</th><th>Total</th><th>Dipinjam</th><th>Tersedia</th><th>Proyek</th><th>Kondisi</th><th>Biaya/Hari</th><th>Aksi</th></tr></thead>
      <tbody>${DB.equipment.map(e=>`<tr>
        <td class="text-muted font-monospace small">${e.id}</td><td class="fw-semibold">${e.name}</td>
        <td class="text-center fw-bold">${e.total}</td>
        <td class="text-center fw-bold ${e.dipinjam>0?'text-warning':''}">${e.dipinjam}</td>
        <td class="text-center fw-bold ${e.total-e.dipinjam>0?'text-success':'text-danger'}">${e.total-e.dipinjam}</td>
        <td class="text-muted small">${e.project?DB.projects.find(p=>p.id===e.project)?.name?.substring(0,20)||e.project:'—'}</td>
        <td><span class="badge bg-success-subtle text-success border border-success-subtle">${e.kondisi}</span></td>
        <td>${fmtFull(e.biaya_hari)}/hari</td>
        <td><div class="d-flex gap-1">
          <button class="btn btn-primary btn-sm" onclick="pinjamAlat('${e.id}')"><i class="ti ti-arrow-right me-1"></i>Pinjam</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="returnAlat('${e.id}')" title="Return ke Gudang"><i class="ti ti-arrow-back-up"></i></button>
        </div></td>
      </tr>`).join('')}</tbody>
    </table>
  </div>
</div>`);
}

// ── PURCHASE REQUEST ──────────────────────────────────
function renderPurchaseRequest(){
  const pend=DB.purchaseRequests.filter(p=>p.status==='pending').length;
  return pw(`
${ph('Purchase Request',`${DB.purchaseRequests.length} request · ${pend} menunggu approval`,
  `<button class="btn btn-primary btn-sm" onclick="openModal('newPR')"><i class="ti ti-plus me-1"></i>Buat PR Baru</button>`)}
<div class="alert alert-info d-flex gap-2 small"><i class="ti ti-info-circle flex-shrink-0 mt-1"></i>
  <div>PR wajib diapprove Owner. Setelah barang diterima, biaya otomatis masuk HPP proyek.</div></div>
<div class="row g-3 mb-4">
  <div class="col-6 col-md-3">${sc('Total PR',DB.purchaseRequests.length,'','','ti-clipboard-list')}</div>
  <div class="col-6 col-md-3">${sc('Pending',pend,'Menunggu approval','sc-amber','ti-clock')}</div>
  <div class="col-6 col-md-3">${sc('Urgen',DB.purchaseRequests.filter(p=>p.urgency==='high').length,'Perlu segera','sc-red','ti-alert-triangle')}</div>
  <div class="col-6 col-md-3">${sc('Nilai Estimasi',fmt(DB.purchaseRequests.reduce((a,p)=>a+p.est_price,0)),'','','ti-currency-dollar')}</div>
</div>
<div class="card">
  <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-clipboard-list text-primary"></i>Daftar Purchase Request</div>
  <div class="table-responsive">
    <table class="table table-hover mb-0">
      <thead><tr><th>No PR</th><th>Proyek</th><th>Item</th><th>Qty</th><th>Est. Harga</th><th>Requester</th><th>Tgl</th><th>Urgensi</th><th>Status</th><th>Aksi</th></tr></thead>
      <tbody>${DB.purchaseRequests.map(pr=>`<tr>
        <td class="fw-bold text-primary">${pr.id}</td>
        <td class="text-muted small">${pr.project}</td><td class="fw-semibold">${pr.item}</td>
        <td>${pr.qty} ${pr.satuan}</td><td class="fw-bold">${fmtFull(pr.est_price)}</td>
        <td class="text-muted">${pr.requester}</td><td class="text-muted">${pr.date}</td>
        <td>${statusBadge(pr.urgency)}</td><td>${statusBadge(pr.status)}</td>
        <td><div class="d-flex gap-1">
          ${pr.status==='pending'
            ?`<button class="btn btn-success btn-sm" onclick="approvePR('${pr.id}')"><i class="ti ti-check me-1"></i>OK</button>
               <button class="btn btn-danger btn-sm" onclick="rejectPR('${pr.id}')"><i class="ti ti-x"></i></button>`
            :`<button class="btn btn-outline-secondary btn-sm" onclick="navigate('purchase-order')"><i class="ti ti-eye me-1"></i>PO</button>`}
        </div></td>
      </tr>`).join('')}</tbody>
    </table>
  </div>
</div>`);
}

// ── PURCHASE ORDER ────────────────────────────────────
function renderPurchaseOrder(){
  return pw(`
${ph('Purchase Order',`${DB.purchaseOrders.length} PO aktif`,
  `<button class="btn btn-primary btn-sm" onclick="openModal('newPO')"><i class="ti ti-plus me-1"></i>Buat PO</button>`)}
<div class="card">
  <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-shopping-cart text-primary"></i>Daftar Purchase Order</div>
  <div class="table-responsive">
    <table class="table table-hover mb-0">
      <thead><tr><th>No PO</th><th>Vendor</th><th>Item</th><th>Total</th><th>Tgl Order</th><th>Jatuh Tempo</th><th>Proyek</th><th>Status</th><th>Aksi</th></tr></thead>
      <tbody>${DB.purchaseOrders.map(po=>`<tr>
        <td class="fw-bold text-primary">${po.id}</td><td class="fw-semibold">${po.vendor}</td>
        <td class="small">${po.item}</td><td class="fw-bold">${fmtFull(po.total)}</td>
        <td class="text-muted">${po.date}</td><td class="text-muted">${po.due}</td>
        <td class="text-muted font-monospace small">${po.project}</td>
        <td>${statusBadge(po.status)}</td>
        <td><div class="d-flex gap-1">
          ${po.status==='pending_approval'
            ?`<button class="btn btn-success btn-sm" onclick="approvePO('${po.id}')"><i class="ti ti-check"></i></button><button class="btn btn-danger btn-sm" onclick="rejectPO('${po.id}')"><i class="ti ti-x"></i></button>`
            :po.status==='ordered'
            ?`<button class="btn btn-outline-primary btn-sm" onclick="receivePO('${po.id}')"><i class="ti ti-package me-1"></i>Terima Barang</button>`
            :po.status==='received'
            ?`<button class="btn btn-primary btn-sm" onclick="payPO('${po.id}')"><i class="ti ti-cash me-1"></i>Bayar Vendor</button>`
            :`<span class="badge bg-success-subtle text-success border border-success-subtle"><i class="ti ti-check me-1"></i>Lunas</span>`}
        </div></td>
      </tr>`).join('')}</tbody>
    </table>
  </div>
</div>`);
}

// ── FINANCE ───────────────────────────────────────────
function renderFinance(){
  return pw(`
${ph('Finance & Accounting','Dashboard Keuangan · Juni 2025',
  `<button class="btn btn-primary btn-sm" onclick="openModal('newInvoice')"><i class="ti ti-plus me-1"></i>Buat Invoice</button>`)}
<div class="fin-hero mb-4"><div class="row g-4">
  <div class="col-6 col-md-3"><div class="fin-hero-label">KAS & BANK</div><div class="fin-hero-val">Rp 18,4M</div><small style="color:rgba(255,255,255,.4)">↑ +Rp 2,1M hari ini</small></div>
  <div class="col-6 col-md-3"><div class="fin-hero-label">PIUTANG CLIENT</div><div class="fin-hero-val" style="color:#93c5fd">Rp 24,2M</div><small style="color:rgba(255,255,255,.4)">3 invoice outstanding</small></div>
  <div class="col-6 col-md-3"><div class="fin-hero-label">HUTANG VENDOR</div><div class="fin-hero-val" style="color:#fca5a5">Rp 8,7M</div><small style="color:rgba(255,255,255,.4)">2 jatuh tempo</small></div>
  <div class="col-6 col-md-3"><div class="fin-hero-label">RETENSI DITAHAN</div><div class="fin-hero-val" style="color:#fde68a">Rp 3,8M</div><small style="color:rgba(255,255,255,.4)">2 proyek selesai</small></div>
</div></div>
<div class="row g-3 mb-3">
  <div class="col-md-7">
    <div class="card h-100">
      <div class="card-header d-flex align-items-center justify-content-between">
        <div class="fw-bold small d-flex align-items-center gap-2"><i class="ti ti-file-invoice text-primary"></i>Invoice Termin Outstanding</div>
        <button class="btn btn-primary btn-sm" onclick="openModal('newInvoice')"><i class="ti ti-plus me-1"></i>Buat Invoice</button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead><tr><th>Invoice</th><th>Client</th><th>Proyek</th><th>Nilai</th><th>Jatuh Tempo</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            <tr><td class="fw-bold text-primary">INV-2025-018</td><td>PT Maju Bersama</td><td class="text-muted">Sudirman</td><td class="fw-bold">Rp 18,5M</td><td class="text-warning fw-semibold">05 Jul 25</td>
              <td><span class="badge bg-primary-subtle text-primary border border-primary-subtle">Terkirim</span></td>
              <td><button class="btn btn-outline-secondary btn-sm" onclick="sendInvoiceReminder('INV-2025-018')"><i class="ti ti-mail me-1"></i>Reminder</button></td></tr>
            <tr><td class="fw-bold text-primary">INV-2025-017</td><td>PT Cibitung Trans</td><td class="text-muted">Cibitung</td><td class="fw-bold">Rp 12,8M</td><td class="text-danger fw-bold">28 Jun ⚠</td>
              <td><span class="badge bg-danger-subtle text-danger border border-danger-subtle">Jatuh Tempo</span></td>
              <td><button class="btn btn-danger btn-sm" onclick="sendInvoiceReminder('INV-2025-017')"><i class="ti ti-bell me-1"></i>Reminder Urgen</button></td></tr>
            <tr><td class="fw-bold text-primary">INV-2025-015</td><td>CV Sentosa</td><td class="text-muted">Ruko BSD</td><td class="fw-bold">Rp 3,6M</td><td class="text-muted">15 Jul 25</td>
              <td><span class="badge bg-secondary-subtle text-secondary border">Draft</span></td>
              <td><button class="btn btn-primary btn-sm" onclick="sendInvoiceToClient('INV-2025-015')"><i class="ti ti-send me-1"></i>Kirim</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="col-md-5">
    <div class="card h-100">
      <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-chart-line text-primary"></i>Laba Rugi Per Proyek</div>
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead><tr><th>Proyek</th><th>Pendapatan</th><th>HPP+OH</th><th>Profit</th></tr></thead>
          <tbody>${DB.projects.slice(0,4).map(p=>{const oh=Math.round(p.hpp*.08),pr=p.kontrak-p.hpp-oh;return `<tr>
            <td class="fw-semibold small">${p.name.substring(0,20)}...</td><td>${fmt(p.kontrak)}</td>
            <td class="text-danger">${fmt(p.hpp+oh)}</td>
            <td class="fw-bold ${pr>0?'text-success':'text-danger'}">${fmt(pr)}</td>
          </tr>`;}).join('')}
            <tr class="table-primary fw-bold"><td>Total</td><td class="text-primary">${fmt(DB.projects.reduce((a,p)=>a+p.kontrak,0))}</td><td class="text-danger">${fmt(DB.projects.reduce((a,p)=>a+p.hpp+Math.round(p.hpp*.08),0))}</td><td class="text-success">${fmt(DB.projects.reduce((a,p)=>a+(p.kontrak-p.hpp-Math.round(p.hpp*.08)),0))}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>`);
}

// ── GL ────────────────────────────────────────────────
function renderGL(){
  const totalD=DB.gl.reduce((a,r)=>a+r.debit,0);
  const totalK=DB.gl.reduce((a,r)=>a+r.kredit,0);
  const bal=Math.abs(totalD-totalK)<1000;
  return pw(`
${ph('General Ledger','Jurnal transaksi otomatis dari semua modul ERP',
  `<select class="form-select form-select-sm" style="width:140px" onchange="filterGL(this.value)"><option>Juni 2025</option><option>Mei 2025</option></select>
   <button class="btn btn-outline-secondary btn-sm" onclick="exportExcel()"><i class="ti ti-download me-1"></i>Export</button>`)}
<div class="row g-3 mb-4">
  <div class="col-6 col-md-3">${sc('Total Entri',DB.gl.length,'Juni 2025','','ti-book')}</div>
  <div class="col-6 col-md-3">${sc('Total Debit',fmt(totalD),'','','ti-arrow-up')}</div>
  <div class="col-6 col-md-3">${sc('Total Kredit',fmt(totalK),'','','ti-arrow-down')}</div>
  <div class="col-6 col-md-3">${sc(bal?'BALANCED ✓':'CHECK!',bal?'OK':'Selisih',bal?'Debit = Kredit':'Perlu dicek',bal?'sc-green':'sc-red','ti-scale')}</div>
</div>
<div class="card">
  <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-book text-primary"></i>Jurnal Umum</div>
  <div class="table-responsive">
    <table class="table table-hover mb-0">
      <thead><tr><th>Tanggal</th><th>Kode</th><th>Nama Akun</th><th>Keterangan</th><th>Proyek</th><th class="text-end">Debit</th><th class="text-end">Kredit</th></tr></thead>
      <tbody id="gl-tbody">${DB.gl.map(r=>glRowHTML(r)).join('')}</tbody>
      <tfoot><tr id="gl-summary-row" class="table-primary fw-bold border-top border-primary">
        <td colspan="5">TOTAL — Juni 2025</td>
        <td class="text-end text-primary">${fmtFull(totalD)}</td>
        <td class="text-end text-success">${fmtFull(totalK)}</td>
      </tr></tfoot>
    </table>
  </div>
</div>`);
}

// ── REPORTS ───────────────────────────────────────────
function renderReports(){
  const reps=[
    {ic:'ti-chart-pie',t:'Laporan HPP Proyek',s:'Breakdown biaya per komponen',c:'#2563eb',p:'hpp'},
    {ic:'ti-trending-up',t:'Laporan Profit & Loss',s:'Laba rugi bulanan & proyek',c:'#16a34a',p:'finance'},
    {ic:'ti-report-money',t:'Laporan Cashflow',s:'Arus kas masuk & keluar',c:'#d97706',p:'finance'},
    {ic:'ti-users',t:'Laporan Tenaga Kerja',s:'Absensi, produktivitas & biaya',c:'#7c3aed',p:'attendance'},
    {ic:'ti-package',t:'Laporan Inventory',s:'Pergerakan stok & pemakaian',c:'#dc2626',p:'stock-general'},
    {ic:'ti-shopping-cart',t:'Laporan Pembelian',s:'PO, vendor & pembayaran',c:'#0d9488',p:'purchase-order'},
  ];
  return pw(`
${ph('Laporan Proyek','Ringkasan keuangan & operasional',
  `<button class="btn btn-outline-secondary btn-sm" onclick="exportPDF()"><i class="ti ti-printer me-1"></i>Print</button>
   <button class="btn btn-primary btn-sm" onclick="exportAll()"><i class="ti ti-download me-1"></i>Download Semua</button>`)}
<div class="row g-3 mb-4">
  ${reps.map(r=>`<div class="col-md-4"><div class="card h-100" style="cursor:pointer;transition:.15s" onmouseover="this.style.boxShadow='0 4px 18px rgba(0,0,0,.1)'" onmouseout="this.style.boxShadow=''" onclick="navigate('${r.p}')">
    <div class="card-body d-flex align-items-center gap-3 p-3">
      <div class="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style="width:44px;height:44px;background:${r.c}18;color:${r.c};font-size:22px"><i class="ti ${r.ic}"></i></div>
      <div class="flex-grow-1"><div class="fw-bold small">${r.t}</div><small class="text-muted">${r.s}</small></div>
      <div class="d-flex flex-column gap-1">
        <i class="ti ti-eye text-muted" style="font-size:14px"></i>
        <i class="ti ti-download text-muted" style="font-size:14px" onclick="event.stopPropagation();exportExcel()"></i>
      </div>
    </div>
  </div></div>`).join('')}
</div>
<div class="card">
  <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-chart-bar text-primary"></i>Ringkasan Profit Semua Proyek</div>
  <div class="table-responsive">
    <table class="table table-hover mb-0">
      <thead><tr><th>Proyek</th><th>Client</th><th>Kontrak</th><th>HPP</th><th>Overhead</th><th>Profit</th><th>Margin</th><th>Status</th></tr></thead>
      <tbody>${DB.projects.map(p=>{const oh=Math.round(p.hpp*.08),pr=p.kontrak-p.hpp-oh,mg=(pr/p.kontrak*100).toFixed(1);return `<tr>
        <td class="fw-bold">${p.name}</td><td class="text-muted">${p.client}</td>
        <td>${fmt(p.kontrak)}</td><td class="text-warning">${fmt(p.hpp)}</td><td class="text-danger">${fmt(oh)}</td>
        <td class="fw-bold ${pr>0?'text-success':'text-danger'}">${fmt(pr)}</td>
        <td><span class="badge ${pr>0?'bg-success-subtle text-success border border-success-subtle':'bg-danger-subtle text-danger border border-danger-subtle'}">${mg}%</span></td>
        <td>${statusBadge(p.status)}</td>
      </tr>`;}).join('')}</tbody>
    </table>
  </div>
</div>`);
}

// ── EMPLOYEES ─────────────────────────────────────────
function renderEmployees(){
  return pw(`
${ph('Data Karyawan',`${DB.employees.length} karyawan aktif`,
  `<button class="btn btn-primary btn-sm" onclick="openModal('newEmployee')"><i class="ti ti-user-plus me-1"></i>Tambah Karyawan</button>`)}
<div class="card">
  <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-users text-primary"></i>Daftar Karyawan</div>
  <div class="table-responsive">
    <table class="table table-hover mb-0">
      <thead><tr><th>ID</th><th>Nama</th><th>Jabatan</th><th>Proyek</th><th>No. HP</th><th>Upah/Hari</th><th>Status</th><th>Aksi</th></tr></thead>
      <tbody>${DB.employees.map(e=>`<tr>
        <td class="text-muted font-monospace small">${e.id}</td>
        <td><div class="d-flex align-items-center gap-2"><div class="emp-av" style="background:${empColor(e)}">${e.initials}</div><span class="fw-semibold">${e.name}</span></div></td>
        <td>${e.role}</td>
        <td><span class="badge bg-primary-subtle text-primary border border-primary-subtle">${e.project}</span></td>
        <td class="text-muted">${e.phone}</td><td class="fw-semibold">${fmtFull(e.upah)}</td>
        <td>${statusBadge(e.status)}</td>
        <td><div class="d-flex gap-1">
          <button class="btn btn-outline-primary btn-sm" onclick="viewEmployee('${e.id}')"><i class="ti ti-eye me-1"></i>Detail</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="openEditEmployee('${e.id}')"><i class="ti ti-edit"></i></button>
          <button class="btn btn-outline-danger btn-sm" onclick="deleteEmployee('${e.id}')"><i class="ti ti-trash"></i></button>
        </div></td>
      </tr>`).join('')}</tbody>
    </table>
  </div>
</div>`);
}

// ── MASTER ────────────────────────────────────────────
function renderMaster(){
  const secs=[
    {ic:'ti-user',t:'Data Client',n:12,c:'#2563eb',p:'finance'},
    {ic:'ti-truck',t:'Data Vendor',n:28,c:'#d97706',p:'purchase-order'},
    {ic:'ti-building',t:'Subkontraktor',n:7,c:'#16a34a',p:'purchase-request'},
    {ic:'ti-users',t:'Data Karyawan',n:DB.employees.length,c:'#7c3aed',p:'employees'},
    {ic:'ti-user-star',t:'Data Mandor',n:5,c:'#0d9488',p:'employees'},
    {ic:'ti-package',t:'Data Material',n:DB.stock.length,c:'#dc2626',p:'stock-general'},
    {ic:'ti-tool',t:'Data Alat',n:DB.equipment.length,c:'#c2410c',p:'equipment'},
    {ic:'ti-building-warehouse',t:'Data Gudang',n:2,c:'#64748b',p:'stock-general'},
    {ic:'ti-map-pin',t:'Lokasi Proyek',n:DB.projects.length,c:'#0369a1',p:'projects'},
    {ic:'ti-ruler',t:'Satuan Barang',n:15,c:'#9333ea',p:'stock-general'},
    {ic:'ti-cash',t:'Upah Standar',n:8,c:'#16a34a',p:'employees'},
    {ic:'ti-book',t:'Chart of Account',n:45,c:'#0d2137',p:'gl'},
  ];
  return pw(`
${ph('Master Data','Data referensi & konfigurasi ERP')}
<div class="row g-3">${secs.map(s=>`<div class="col-6 col-md-4 col-lg-3">
  <div class="card h-100" style="cursor:pointer;transition:.15s" onmouseover="this.style.boxShadow='0 4px 18px rgba(0,0,0,.1)'" onmouseout="this.style.boxShadow=''" onclick="navigate('${s.p}')">
    <div class="card-body d-flex align-items-center gap-3 p-3">
      <div class="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style="width:40px;height:40px;background:${s.c}18;color:${s.c};font-size:20px"><i class="ti ${s.ic}"></i></div>
      <div class="flex-grow-1 min-w-0"><div class="fw-bold small text-truncate">${s.t}</div><small class="text-muted">${s.n} data</small></div>
      <i class="ti ti-chevron-right text-muted"></i>
    </div>
  </div>
</div>`).join('')}</div>`);
}

// ── SETTINGS ──────────────────────────────────────────
function renderSettings(){
  const intConfig = [
    { key:'whatsapp', name:'WhatsApp Notif', ic:'ti-brand-whatsapp', c:'#25D366' },
    { key:'email',    name:'Email SMTP',     ic:'ti-mail',           c:'#ea4335' },
    { key:'gdrive',   name:'Google Drive',   ic:'ti-brand-google-drive', c:'#fbbc04' },
    { key:'accounting',name:'Akuntansi Cloud',ic:'ti-cloud',         c:'#2563eb' },
  ];
  return pw(`
${ph('Pengaturan Sistem','Konfigurasi perusahaan, akses & integrasi')}
<div class="row g-4">
  <div class="col-md-6">
    <div class="card">
      <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-building text-primary"></i>Profil Perusahaan</div>
      <div class="card-body">
        <div class="mb-3"><label class="form-label">Nama Perusahaan</label><input class="form-control" id="s-company-name" value="${COMPANY.name}"></div>
        <div class="mb-3"><label class="form-label">NPWP</label><input class="form-control" id="s-npwp" value="${COMPANY.npwp}"></div>
        <div class="mb-3"><label class="form-label">Alamat</label><textarea class="form-control" id="s-address" rows="2">${COMPANY.address}</textarea></div>
        <div class="row g-3 mb-3">
          <div class="col-6"><label class="form-label">Overhead (%)</label><input class="form-control" id="s-overhead" type="number" value="${COMPANY.overhead}"></div>
          <div class="col-6"><label class="form-label">Retensi (%)</label><input class="form-control" id="s-retensi" type="number" value="${COMPANY.retensi}"></div>
        </div>
        <button class="btn btn-primary" onclick="saveCompanySettings()"><i class="ti ti-save me-1"></i>Simpan Pengaturan</button>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card mb-3">
      <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-lock text-primary"></i>Role & Hak Akses</div>
      ${Object.keys(ROLE_PERMS).map(r=>`
      <div class="d-flex align-items-center justify-content-between px-3 py-2 border-bottom">
        <div class="d-flex align-items-center gap-2">
          <i class="ti ti-user text-muted"></i>
          <span class="fw-semibold small">${r}</span>
          <span class="badge bg-secondary-subtle text-secondary border ms-1" style="font-size:10px">${(ROLE_PERMS[r]||[]).length} modul</span>
        </div>
        <button class="btn btn-outline-secondary btn-sm" onclick="openRoleModal('${r}')">
          <i class="ti ti-lock me-1"></i>Atur Akses
        </button>
      </div>`).join('')}
    </div>
    <div class="card">
      <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-plug text-primary"></i>Integrasi Sistem</div>
      <div class="card-body"><div class="row g-2">
        ${intConfig.map(i=>`<div class="col-6">
          <div class="p-3 rounded-3 border ${INTEGRATIONS[i.key]?'border-success-subtle bg-success-subtle':'border-secondary-subtle bg-light'}">
            <div class="d-flex align-items-center gap-2 mb-2"><i class="ti ${i.ic}" style="color:${i.c};font-size:18px"></i><span class="small fw-bold">${i.name}</span></div>
            <div class="d-flex align-items-center justify-content-between">
              <span class="badge ${INTEGRATIONS[i.key]?'bg-success':'bg-secondary'}">${INTEGRATIONS[i.key]?'Aktif':'Nonaktif'}</span>
              <button onclick="toggleIntegration('${i.name}')" class="btn btn-sm ${INTEGRATIONS[i.key]?'btn-outline-danger':'btn-outline-success'}" style="font-size:11px;padding:2px 8px">
                ${INTEGRATIONS[i.key]?'Nonaktifkan':'Aktifkan'}
              </button>
            </div>
          </div>
        </div>`).join('')}
      </div></div>
    </div>
  </div>
</div>`);
}

// ── EMPLOYEE DETAIL ───────────────────────────────────
function renderEmployeeDetail(){
  const emp = DB.employees.find(e=>e.id===window.currentEmpId);
  if(!emp) return pw(`<div class="text-center py-5"><i class="ti ti-user-x" style="font-size:48px;color:#94a3b8"></i><p class="mt-3 text-muted">Karyawan tidak ditemukan</p></div>`);

  const attHist = DB.attendance.filter(a=>a.emp_id===emp.id);
  const payHist = DB.payroll.filter(p=>p.emp_id===emp.id);
  const totalDays = attHist.filter(a=>a.status==='approved').length;
  const totalSalary = payHist.reduce((a,p)=>a+payrollNet(p),0);
  const totalLembur = payHist.reduce((a,p)=>a+(p.lembur||0),0);
  const projects = [...new Set(attHist.map(a=>a.project).filter(Boolean))];

  return pw(`
${ph(emp.name, emp.role+' · '+emp.id,
  `<button class="btn btn-outline-secondary btn-sm" onclick="navigate('employees')"><i class="ti ti-arrow-left me-1"></i>Kembali</button>
   <button class="btn btn-outline-secondary btn-sm" onclick="openEditEmployee('${emp.id}')"><i class="ti ti-edit me-1"></i>Edit Data</button>
   <button class="btn btn-primary btn-sm" onclick="printSlip('${payHist[0]?.id||''}')"><i class="ti ti-printer me-1"></i>Cetak Slip Gaji</button>`)}

<div class="row g-3 mb-4">
  <div class="col-12 col-md-3">
    <div class="card h-100">
      <div class="card-body text-center p-4">
        <div class="emp-av mx-auto mb-3" style="width:64px;height:64px;font-size:24px;background:${empColor(emp)}">${emp.initials}</div>
        <h5 class="fw-bold mb-1">${emp.name}</h5>
        <p class="text-muted small mb-3">${emp.role}</p>
        ${statusBadge(emp.status)}
        <hr class="my-3">
        <div class="d-flex flex-column gap-2 text-start small">
          <div><i class="ti ti-id-badge text-muted me-2"></i><strong>ID:</strong> ${emp.id}</div>
          <div><i class="ti ti-phone text-muted me-2"></i>${emp.phone||'—'}</div>
          <div><i class="ti ti-folder text-muted me-2"></i>${emp.project}</div>
          <div><i class="ti ti-cash text-muted me-2"></i>${fmtFull(emp.upah)}/hari</div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-9">
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3">${sc('Total Kehadiran',totalDays+' hari','Disetujui mandor','sc-green','ti-check-circle')}</div>
      <div class="col-6 col-md-3">${sc('Total Gaji Diterima',fmt(totalSalary),'Semua periode','sc-amber','ti-cash')}</div>
      <div class="col-6 col-md-3">${sc('Proyek Dikerjakan',projects.length+' proyek','Riwayat semua','','ti-folder-open')}</div>
      <div class="col-6 col-md-3">${sc('Total Lembur',fmt(totalLembur),'Akumulasi','','ti-moon')}</div>
    </div>
    <div class="card">
      <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-folder-open text-primary"></i>Riwayat Penugasan Proyek</div>
      <div class="table-responsive">
        <table class="table table-sm mb-0">
          <thead><tr><th>Proyek</th><th>Hari Hadir</th><th>Total Gaji Diterima</th><th>Rata-rata/Bulan</th></tr></thead>
          <tbody>
            ${projects.length>0 ? projects.map(proj=>{
              const pAtt=attHist.filter(a=>a.project===proj&&a.status==='approved');
              const pPay=payHist.filter(p=>p.project===proj);
              const pTotal=pPay.reduce((a,p)=>a+payrollNet(p),0);
              return `<tr>
                <td class="fw-semibold">${proj}</td>
                <td><span class="badge bg-success-subtle text-success border border-success-subtle">${pAtt.length} hari</span></td>
                <td class="fw-bold text-primary">${pTotal>0?fmt(pTotal):'—'}</td>
                <td class="text-muted">${pPay.length>0?fmt(Math.round(pTotal/pPay.length)):'—'}/periode</td>
              </tr>`;}).join('')
              : '<tr><td colspan="4" class="text-center py-3 text-muted">Belum ada riwayat proyek</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<div class="row g-3">
  <div class="col-md-7">
    <div class="card">
      <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-clock text-primary"></i>Riwayat Absensi (${attHist.length} record)</div>
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead><tr><th>Tanggal</th><th>Proyek</th><th>Masuk</th><th>Keluar</th><th>Jam</th><th>Upah</th><th>Status</th></tr></thead>
          <tbody>
            ${attHist.length>0 ? attHist.map(a=>`<tr>
              <td class="text-muted small">${a.date||'28 Jun 2025'}</td>
              <td class="fw-medium small">${a.project}</td>
              <td class="fw-semibold">${a.checkin}</td>
              <td class="${a.checkout==='--:--'?'text-muted':''}">${a.checkout}</td>
              <td>${a.hours>0?a.hours.toFixed(1)+'j':'—'}</td>
              <td class="fw-semibold">${fmt(a.upah)}</td>
              <td>${statusBadge(a.status)}</td>
            </tr>`).join('')
            : '<tr><td colspan="7" class="text-center py-4 text-muted">Belum ada riwayat absensi</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="col-md-5">
    <div class="card">
      <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-cash text-primary"></i>Riwayat Penggajian (${payHist.length} periode)</div>
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead><tr><th>Periode</th><th>Proyek</th><th>Gaji Pokok</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            ${payHist.length>0 ? payHist.map(p=>`<tr>
              <td class="text-muted small">${p.days} hari</td>
              <td class="small">${p.project}</td>
              <td>${fmt(p.days*p.upah)}</td>
              <td class="fw-bold text-primary">${fmt(payrollNet(p))}</td>
              <td>${statusBadge(p.status)}</td>
            </tr>`).join('')
            : '<tr><td colspan="5" class="text-center py-4 text-muted">Belum ada riwayat gaji</td></tr>'}
            ${payHist.length>0?`<tr class="table-primary fw-bold"><td colspan="3">Total Diterima</td><td class="text-primary">${fmt(totalSalary)}</td><td></td></tr>`:''}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>`);
}

// ── PROJECT DETAIL ────────────────────────────────────
function renderProjectDetail(){
  const proj = DB.projects.find(p=>p.id===window.currentProjId);
  if(!proj) return pw(`<div class="text-center py-5"><i class="ti ti-folder-x" style="font-size:48px;color:#94a3b8"></i><p class="mt-3 text-muted">Proyek tidak ditemukan</p></div>`);

  const employees = DB.employees.filter(e=>e.project===proj.id);
  const attendance = DB.attendance.filter(a=>a.project_id===proj.id);
  const purchases  = DB.purchaseOrders.filter(po=>po.project===proj.id);
  const oh = Math.round(proj.hpp*.08);
  const profit = proj.kontrak-proj.hpp-oh;
  const margin = proj.kontrak>0 ? (profit/proj.kontrak*100).toFixed(1) : '0';

  return pw(`
${ph(proj.name, proj.id+' · '+proj.client,
  `<button class="btn btn-outline-secondary btn-sm" onclick="navigate('projects')"><i class="ti ti-arrow-left me-1"></i>Kembali</button>
   <button class="btn btn-outline-secondary btn-sm" onclick="navigate('hpp')"><i class="ti ti-chart-pie me-1"></i>HPP & Profit</button>
   <button class="btn btn-primary btn-sm" onclick="openProjectReport('${proj.id}')"><i class="ti ti-file-report me-1"></i>Laporan Proyek</button>`)}

<div class="row g-3 mb-4">
  <div class="col-6 col-md-3">${sc('Nilai Kontrak',fmt(proj.kontrak),'','','ti-contract')}</div>
  <div class="col-6 col-md-3">${sc('HPP Aktual',fmt(proj.hpp),Math.round(proj.hpp/proj.kontrak*100)+'% kontrak','sc-amber','ti-coins')}</div>
  <div class="col-6 col-md-3">${sc('Est. Profit',fmt(profit),'Margin '+margin+'%',profit>0?'sc-green':'sc-red','ti-trending-up')}</div>
  <div class="col-6 col-md-3">${sc('Tim Aktif',employees.length+' orang',attendance.filter(a=>a.status==='approved').length+' hadir hari ini','','ti-users')}</div>
</div>

<ul class="nav nav-pills mb-3" style="background:#f1f5f9;padding:3px;border-radius:10px;gap:2px" id="pd-tabs">
  <li><button class="nav-link active tab-btn" onclick="switchProjTab('info',this)">📋 Info Proyek</button></li>
  <li><button class="nav-link tab-btn" onclick="switchProjTab('team',this)">👷 Tim Karyawan (${employees.length})</button></li>
  <li><button class="nav-link tab-btn" onclick="switchProjTab('absensi',this)">⏱ Absensi (${attendance.length})</button></li>
  <li><button class="nav-link tab-btn" onclick="switchProjTab('pembelian',this)">🛒 Pembelian (${purchases.length})</button></li>
  <li><button class="nav-link tab-btn" style="background:#fff0f0" onclick="openProjectStages('${proj.id}')">📸 Tahapan & Dok. (${(DB.stages||[]).filter(s=>s.project_id===proj.id).length})</button></li>
</ul>

<!-- INFO -->
<div id="pd-info">
  <div class="row g-3">
    <div class="col-md-5">
      <div class="card">
        <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-info-circle text-primary"></i>Informasi Proyek</div>
        <div class="card-body p-0">
          <table class="table table-sm mb-0">
            <tbody>
              <tr><td class="text-muted fw-medium ps-3">Client</td><td class="fw-semibold pe-3">${proj.client}</td></tr>
              <tr><td class="text-muted fw-medium ps-3">Project Manager</td><td class="pe-3">${proj.pm}</td></tr>
              <tr><td class="text-muted fw-medium ps-3">Lokasi</td><td class="pe-3">${proj.lokasi||'—'}</td></tr>
              <tr><td class="text-muted fw-medium ps-3">Tanggal Mulai</td><td class="pe-3">${fmtDate(proj.start)}</td></tr>
              <tr><td class="text-muted fw-medium ps-3">Target Selesai</td><td class="pe-3 ${proj.status==='late'?'text-danger fw-bold':''}">${fmtDate(proj.deadline)}</td></tr>
              <tr><td class="text-muted fw-medium ps-3">Status</td><td class="pe-3">${statusBadge(proj.status)}</td></tr>
              <tr><td class="text-muted fw-medium ps-3">Total Karyawan</td><td class="pe-3 fw-bold">${employees.length} orang</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-md-7">
      <div class="card">
        <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-chart-pie text-primary"></i>Progress & Komposisi HPP</div>
        <div class="card-body">
          <div class="mb-3">
            <div class="d-flex justify-content-between mb-1 small"><span class="fw-semibold">Progress Pelaksanaan</span><span class="fw-bold">${proj.progress}%</span></div>
            <div class="prg" style="height:12px"><div class="prg-fill ${progressColor(proj.progress)}" style="height:12px;width:${proj.progress}%"></div></div>
          </div>
          <div class="hpp-bar mb-3">
            <div class="hpp-seg" style="width:38%;background:#2563eb">Material 38%</div>
            <div class="hpp-seg" style="width:28%;background:#16a34a">Gaji 28%</div>
            <div class="hpp-seg" style="width:18%;background:#d97706">Beli 18%</div>
            <div class="hpp-seg" style="width:16%;background:#7c3aed">Lain 16%</div>
          </div>
          <div class="sum-row sub"><span>Nilai Kontrak</span><span>${fmtFull(proj.kontrak)}</span></div>
          <div class="sum-row"><span class="text-danger">(-) HPP + Overhead</span><span class="text-danger fw-bold">${fmtFull(proj.hpp+oh)}</span></div>
          <div class="sum-row ${profit>0?'total':'loss'}"><span>Estimasi Profit</span><span>${fmtFull(profit)}</span></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- TIM -->
<div id="pd-team" class="d-none">
  <div class="card">
    <div class="card-header d-flex align-items-center justify-content-between">
      <div class="fw-bold small d-flex align-items-center gap-2"><i class="ti ti-users text-primary"></i>Tim Karyawan — ${proj.name}</div>
      <button class="btn btn-primary btn-sm" onclick="openModal('newEmployee')"><i class="ti ti-user-plus me-1"></i>Tambah Karyawan</button>
    </div>
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead><tr><th>Karyawan</th><th>Jabatan</th><th>Upah/Hari</th><th>Hadir Bulan Ini</th><th>Gaji Diterima</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          ${employees.length>0 ? employees.map(e=>{
            const eAtt=DB.attendance.filter(a=>a.emp_id===e.id&&a.status==='approved');
            const ePay=DB.payroll.filter(p=>p.emp_id===e.id);
            const eTotal=ePay.reduce((a,p)=>a+payrollNet(p),0);
            return `<tr>
              <td><div class="d-flex align-items-center gap-2">
                <div class="emp-av" style="background:${empColor(e)}">${e.initials}</div>
                <div><div class="fw-semibold">${e.name}</div><small class="text-muted">${e.id}</small></div>
              </div></td>
              <td>${e.role}</td>
              <td class="fw-semibold">${fmtFull(e.upah)}</td>
              <td><span class="badge bg-success-subtle text-success border border-success-subtle">${eAtt.length} hari</span></td>
              <td class="fw-bold text-primary">${eTotal>0?fmt(eTotal):'—'}</td>
              <td>${statusBadge(e.status)}</td>
              <td><button class="btn btn-outline-secondary btn-sm" onclick="viewEmployee('${e.id}')"><i class="ti ti-eye me-1"></i>Riwayat</button></td>
            </tr>`;}).join('')
          : '<tr><td colspan="7" class="text-center py-5 text-muted"><i class="ti ti-users" style="font-size:36px;display:block;margin-bottom:8px"></i>Belum ada karyawan di proyek ini</td></tr>'}
        </tbody>
        ${employees.length>0?`<tfoot><tr class="table-light fw-bold"><td colspan="2">Total</td><td>${fmtFull(employees.reduce((a,e)=>a+e.upah,0))}/hari</td><td>${DB.attendance.filter(a=>a.project_id===proj.id&&a.status==='approved').length} hari</td><td class="text-primary">${fmt(DB.payroll.filter(p=>p.project_id===proj.id).reduce((a,p)=>a+payrollNet(p),0))}</td><td colspan="2"></td></tr></tfoot>`:''}
      </table>
    </div>
  </div>
</div>

<!-- ABSENSI -->
<div id="pd-absensi" class="d-none">
  <div class="card">
    <div class="card-header fw-bold small d-flex align-items-center gap-2"><i class="ti ti-clock text-primary"></i>Absensi — ${proj.name}</div>
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead><tr><th>Karyawan</th><th>Tanggal</th><th>Check-in</th><th>Check-out</th><th>Jam</th><th>Upah</th><th>Status</th></tr></thead>
        <tbody>
          ${attendance.length>0 ? attendance.map(a=>`<tr>
            <td><div class="d-flex align-items-center gap-2"><div class="emp-av" style="background:${empColor({id:a.emp_id})}">${a.name.split(' ').map(w=>w[0]).join('').substring(0,2)}</div><span class="fw-semibold">${a.name}</span></div></td>
            <td class="text-muted">${a.date||'28 Jun 2025'}</td>
            <td class="fw-semibold">${a.checkin}</td>
            <td class="${a.checkout==='--:--'?'text-muted':''}">${a.checkout}</td>
            <td>${a.hours>0?a.hours.toFixed(1)+'j':'—'}</td>
            <td class="fw-semibold">${fmt(a.upah)}</td>
            <td>${statusBadge(a.status)}</td>
          </tr>`).join('')
          : '<tr><td colspan="7" class="text-center py-4 text-muted">Tidak ada data absensi untuk proyek ini</td></tr>'}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- PEMBELIAN -->
<div id="pd-pembelian" class="d-none">
  <div class="card">
    <div class="card-header d-flex align-items-center justify-content-between">
      <div class="fw-bold small d-flex align-items-center gap-2"><i class="ti ti-shopping-cart text-primary"></i>Pembelian — ${proj.name}</div>
      <button class="btn btn-primary btn-sm" onclick="openModal('newPO')"><i class="ti ti-plus me-1"></i>Buat PO</button>
    </div>
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead><tr><th>No PO</th><th>Vendor</th><th>Item</th><th>Total</th><th>Tgl</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          ${purchases.length>0 ? purchases.map(po=>`<tr>
            <td class="fw-bold text-primary">${po.id}</td>
            <td class="fw-semibold">${po.vendor}</td>
            <td class="small">${po.item}</td>
            <td class="fw-bold">${fmtFull(po.total)}</td>
            <td class="text-muted">${po.date}</td>
            <td>${statusBadge(po.status)}</td>
            <td>${po.status==='received'?`<button class="btn btn-primary btn-sm" onclick="payPO('${po.id}')"><i class="ti ti-cash me-1"></i>Bayar</button>`:''}</td>
          </tr>`).join('')
          : '<tr><td colspan="7" class="text-center py-4 text-muted">Belum ada pembelian untuk proyek ini. <button class="btn btn-link btn-sm" onclick="openModal(\'newPO\')">Buat PO</button></td></tr>'}
        </tbody>
        ${purchases.length>0?`<tfoot><tr class="table-primary fw-bold"><td colspan="3">Total Pembelian</td><td class="text-primary">${fmtFull(purchases.reduce((a,po)=>a+po.total,0))}</td><td colspan="3"></td></tr></tfoot>`:''}
      </table>
    </div>
  </div>
</div>`);
}

// ── PAGE MAP ──────────────────────────────────────────
const PAGES={
  dashboard:renderDashboard, map:renderMap, projects:renderProjects,
  rab:renderRAB, hpp:renderHPP, attendance:renderAttendance,
  payroll:renderPayroll, employees:renderEmployees,
  'employee-detail':renderEmployeeDetail, 'project-detail':renderProjectDetail,
  'stock-general':renderStockGeneral, 'stock-project':renderStockProject,
  'stock-transfer':renderStockTransfer, equipment:renderEquipment,
  'purchase-request':renderPurchaseRequest, 'purchase-order':renderPurchaseOrder,
  finance:renderFinance, gl:renderGL, reports:renderReports,
  master:renderMaster, settings:renderSettings,
  'project-stages':  renderProjectStages,
  'stage-gallery':   renderStageGallery,
  'doc-gallery':     renderAllDocs,
  'project-report':  renderProjectReport,
};
