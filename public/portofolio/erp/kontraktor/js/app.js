/* =====================================================
   APP CONTROLLER — Complete, all buttons functional
   ===================================================== */

// ── Global State ──────────────────────────────────────
let currentRole = 'Owner';
window.currentEmpId   = null;
window.currentProjId  = null;
window.currentStageId = null;
let confirmCb   = null;
let sidebarCollapsed = false;
let bsModal     = null;
let bsConfirm   = null;

// Integration on/off state (persisted)
const INTEGRATIONS = JSON.parse(localStorage.getItem('afss_integrations') || JSON.stringify({
  whatsapp: true, email: true, gdrive: false, accounting: false
}));

// Role permissions matrix
const ROLE_PERMS = {
  'Owner':             ['dashboard','map','projects','rab','hpp','attendance','payroll','employees','stock-general','stock-project','stock-transfer','equipment','purchase-request','purchase-order','finance','gl','reports','master','settings'],
  'Admin':             ['dashboard','map','projects','rab','attendance','employees','stock-general','stock-project','stock-transfer','equipment','purchase-request','purchase-order'],
  'Finance':           ['dashboard','finance','gl','reports','hpp'],
  'Project Manager':   ['projects','rab','hpp','attendance','stock-project','stock-transfer','purchase-request'],
  'Mandor':            ['attendance','stock-project','stock-transfer'],
  'Warehouse':         ['stock-general','stock-project','stock-transfer','equipment'],
  'Purchasing':        ['purchase-request','purchase-order'],
  'Karyawan Lapangan': ['attendance'],
};
const MODULE_NAMES = {
  dashboard:'Dashboard', map:'Peta Sistem', projects:'Daftar Proyek',
  rab:'RAB/BOQ', hpp:'HPP & Profit', attendance:'Absensi', payroll:'Payroll',
  employees:'Data Karyawan', 'stock-general':'Stock Umum', 'stock-project':'Stock Proyek',
  'stock-transfer':'Transfer Stock', equipment:'Alat & Perlengkapan',
  'purchase-request':'Purchase Request', 'purchase-order':'Purchase Order',
  finance:'Finance', gl:'General Ledger', reports:'Laporan',
  master:'Master Data', settings:'Pengaturan',
};

// Company settings
let COMPANY = JSON.parse(localStorage.getItem('afss_company') || JSON.stringify({
  name: 'PT AFSS Contractor Indonesia', npwp: '12.345.678.9-012.000',
  address: 'Jl. Raya Depok No.88, Depok, Jawa Barat', overhead: 8, retensi: 5
}));

// Invoice state
const INVOICES = [
  { id:'INV-2025-018', client:'PT Maju Bersama', proyek:'Sudirman', nilai:'Rp 18,5M', due:'05 Jul 25', status:'sent' },
  { id:'INV-2025-017', client:'PT Cibitung Trans', proyek:'Cibitung', nilai:'Rp 12,8M', due:'28 Jun 25', status:'overdue' },
  { id:'INV-2025-015', client:'CV Sentosa', proyek:'Ruko BSD', nilai:'Rp 3,6M', due:'15 Jul 25', status:'draft' },
];

// Transfer requests state
const TRANSFERS = [
  { id:'TRF-042', ke:'Gedung Sudirman', item:'Semen Portland', qty:'60 sak', date:'28 Jun', status:'pending' },
  { id:'TRF-041', ke:'Ruko BSD', item:'Cat Tembok', qty:'40 kaleng', date:'27 Jun', status:'pending' },
  { id:'TRF-040', ke:'Warehouse Cibitung', item:'Besi Beton D13', qty:'120 btg', date:'26 Jun', status:'approved' },
  { id:'TRF-039', ke:'Gedung Sudirman', item:'Bata Ringan AAC', qty:'300 buah', date:'25 Jun', status:'approved' },
];

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDB();
  bsModal   = new bootstrap.Modal(document.getElementById('erp-modal'));
  bsConfirm = new bootstrap.Modal(document.getElementById('confirm-modal'));
  setupRoleChips();
  setupNavLinks();
  startClock();
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') { e.preventDefault(); toggleSidebar(); }
  });
});

// ── Auth ──────────────────────────────────────────────
function setupRoleChips() {
  document.querySelectorAll('.role-chip').forEach(c => {
    c.onclick = () => {
      document.querySelectorAll('.role-chip').forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      currentRole = c.dataset.role;
    };
  });
}

async function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  if (!email) { showToast('Masukkan email atau username', 'danger'); return; }

  const btn = document.querySelector('.btn-login');
  if (btn) btn.disabled = true;
  await dbReadyPromise;
  if (btn) btn.disabled = false;

  const names = { Owner:'Budi Owner', Admin:'Admin Sistem', Finance:'Tim Finance', PM:'Rudi PM', Mandor:'Hasan Mandor', Warehouse:'Gudang Staff' };
  const inits = { Owner:'BO', Admin:'AS', Finance:'TF', PM:'RP', Mandor:'HM', Warehouse:'GS' };
  const name = names[currentRole] || 'User';
  const init = inits[currentRole] || 'U';
  ['tb-name','dd-uname'].forEach(id => document.getElementById(id).textContent = name);
  ['tb-role','dd-urole'].forEach(id => document.getElementById(id).textContent = currentRole);
  document.getElementById('tb-av').textContent = init;
  document.getElementById('page-login').style.display = 'none';
  document.getElementById('app').classList.remove('d-none');
  navigate('dashboard');
  showToast(`Selamat datang, ${name}! 👋`, 'success');
}

function doLogout() {
  document.getElementById('app').classList.add('d-none');
  document.getElementById('page-login').style.display = '';
}

// ── Navigation ────────────────────────────────────────
function setupNavLinks() {
  document.querySelectorAll('.sb-link').forEach(l => {
    l.onclick = () => navigate(l.dataset.page);
  });
}

function navigate(page) {
  if (!PAGES[page]) { showToast('Halaman tidak tersedia', 'warning'); return; }
  document.querySelectorAll('.sb-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));
  const main = document.getElementById('main');
  main.innerHTML = PAGES[page]();
  main.scrollTop = 0;
}

// ── Sidebar ───────────────────────────────────────────
function toggleSidebar() {
  sidebarCollapsed = !sidebarCollapsed;
  document.getElementById('sidebar').classList.toggle('collapsed', sidebarCollapsed);
}

// ── Clock ─────────────────────────────────────────────
function startClock() {
  const el = document.getElementById('clock-val');
  if (!el) return;
  const tick = () => el.textContent = new Date().toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });
  tick(); setInterval(tick, 30000);
}

// ── Toast ─────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const cfg = {
    success: ['bg-success','ti-check-circle','text-white'],
    danger:  ['bg-danger','ti-alert-circle','text-white'],
    warning: ['bg-warning','ti-alert-triangle','text-dark'],
    info:    ['bg-primary','ti-info-circle','text-white'],
  };
  const [bg, icon, txt] = cfg[type] || cfg.info;
  const el = document.createElement('div');
  el.className = `toast align-items-center ${txt} ${bg} border-0 shadow`;
  el.setAttribute('role', 'alert');
  el.innerHTML = `<div class="d-flex"><div class="toast-body d-flex align-items-center gap-2">
    <i class="ti ${icon} fs-5"></i><span>${msg}</span></div>
    <button type="button" class="btn-close ${txt==='text-white'?'btn-close-white':''} me-2 m-auto" data-bs-dismiss="toast"></button>
  </div>`;
  document.getElementById('toast-container').appendChild(el);
  const t = new bootstrap.Toast(el, { delay: 3200 });
  t.show();
  el.addEventListener('hidden.bs.toast', () => el.remove());
}

// ── Modal ─────────────────────────────────────────────
const MODALS = {
  newProject: {
    title: 'Buat Proyek Baru',
    body: () => `<div class="row g-3">
      <div class="col-6"><label class="form-label">Nama Proyek *</label><input class="form-control" id="m-pn" placeholder="Nama proyek..."></div>
      <div class="col-6"><label class="form-label">Kode Proyek</label><input class="form-control" id="m-pid" placeholder="PRJ-2025-XXX"></div>
      <div class="col-6"><label class="form-label">Client *</label><input class="form-control" id="m-pc" placeholder="Nama client..."></div>
      <div class="col-6"><label class="form-label">Lokasi</label><input class="form-control" id="m-pl" placeholder="Kota / alamat..."></div>
      <div class="col-6"><label class="form-label">Nilai Kontrak (Rp Juta) *</label><input class="form-control" id="m-pk" type="number" placeholder="0"></div>
      <div class="col-6"><label class="form-label">Project Manager</label><select class="form-select" id="m-ppm"><option>Rudi Hartono</option><option>Andi Pratama</option><option>Bambang W.</option></select></div>
      <div class="col-6"><label class="form-label">Tanggal Mulai</label><input class="form-control" id="m-ps" type="date" value="${today()}"></div>
      <div class="col-6"><label class="form-label">Target Selesai</label><input class="form-control" id="m-pe" type="date"></div>
    </div>`,
    save: () => {
      const name = document.getElementById('m-pn')?.value.trim();
      const client = document.getElementById('m-pc')?.value.trim();
      const kontrak = parseFloat(document.getElementById('m-pk')?.value || 0);
      if (!name || !client) { showToast('Nama proyek & client wajib diisi', 'danger'); return; }
      dbAdd('projects', { id: document.getElementById('m-pid')?.value.trim() || nextId('PRJ-', DB.projects), name, client, kontrak: kontrak * 1000000, hpp: 0, progress: 0, start: document.getElementById('m-ps')?.value, deadline: document.getElementById('m-pe')?.value, status: 'on-track', pm: document.getElementById('m-ppm')?.value, workers: 0, lokasi: document.getElementById('m-pl')?.value });
      closeModal(); navigate('projects'); showToast(`Proyek "${name}" berhasil dibuat!`, 'success');
    }
  },
  newEmployee: {
    title: 'Tambah Karyawan',
    body: () => `<div class="row g-3">
      <div class="col-6"><label class="form-label">Nama Lengkap *</label><input class="form-control" id="m-en" placeholder="Nama..."></div>
      <div class="col-6"><label class="form-label">Jabatan</label><select class="form-select" id="m-er"><option>Tukang Batu</option><option>Tukang Besi</option><option>Tukang Las</option><option>Tukang Cat</option><option>Kuli Bangunan</option><option>Operator Alat Berat</option><option>Mandor</option></select></div>
      <div class="col-6"><label class="form-label">No. HP</label><input class="form-control" id="m-ep" placeholder="08xx..."></div>
      <div class="col-6"><label class="form-label">Proyek</label><select class="form-select" id="m-eprj">${DB.projects.map(p=>`<option value="${p.id}">${p.name.substring(0,35)}</option>`).join('')}</select></div>
      <div class="col-6"><label class="form-label">Upah Harian (Rp)</label><input class="form-control" id="m-eu" type="number" placeholder="150000"></div>
      <div class="col-6"><label class="form-label">Status</label><select class="form-select" id="m-es"><option value="active">Aktif</option><option value="inactive">Nonaktif</option></select></div>
    </div>`,
    save: () => {
      const name = document.getElementById('m-en')?.value.trim();
      if (!name) { showToast('Nama wajib diisi', 'danger'); return; }
      dbAdd('employees', { id: nextId('EMP-', DB.employees), name, initials: name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase(), role: document.getElementById('m-er')?.value, phone: document.getElementById('m-ep')?.value, project: document.getElementById('m-eprj')?.value, upah: parseInt(document.getElementById('m-eu')?.value)||150000, status: document.getElementById('m-es')?.value||'active' });
      closeModal(); navigate('employees'); showToast(`Karyawan "${name}" ditambahkan!`, 'success');
    }
  },
  editEmployee: {
    title: 'Edit Data Karyawan',
    body: (id) => {
      const e = DB.employees.find(r=>r.id===id) || {};
      return `<div class="row g-3">
        <div class="col-6"><label class="form-label">Nama Lengkap *</label><input class="form-control" id="m-en" value="${e.name||''}"></div>
        <div class="col-6"><label class="form-label">Jabatan</label><select class="form-select" id="m-er">${['Tukang Batu','Tukang Besi','Tukang Las','Tukang Cat','Kuli Bangunan','Operator Alat Berat','Mandor'].map(r=>`<option ${r===e.role?'selected':''}>${r}</option>`).join('')}</select></div>
        <div class="col-6"><label class="form-label">No. HP</label><input class="form-control" id="m-ep" value="${e.phone||''}"></div>
        <div class="col-6"><label class="form-label">Proyek</label><select class="form-select" id="m-eprj">${DB.projects.map(p=>`<option value="${p.id}" ${p.id===e.project?'selected':''}>${p.name.substring(0,35)}</option>`).join('')}</select></div>
        <div class="col-6"><label class="form-label">Upah Harian (Rp)</label><input class="form-control" id="m-eu" type="number" value="${e.upah||150000}"></div>
        <div class="col-6"><label class="form-label">Status</label><select class="form-select" id="m-es"><option value="active" ${e.status==='active'?'selected':''}>Aktif</option><option value="inactive" ${e.status!=='active'?'selected':''}>Nonaktif</option></select></div>
        <input type="hidden" id="m-eid" value="${id}">
      </div>`;
    },
    save: () => {
      const id = document.getElementById('m-eid')?.value;
      const name = document.getElementById('m-en')?.value.trim();
      if (!name) { showToast('Nama wajib diisi', 'danger'); return; }
      dbUpdate('employees', id, { name, role: document.getElementById('m-er')?.value, phone: document.getElementById('m-ep')?.value, project: document.getElementById('m-eprj')?.value, upah: parseInt(document.getElementById('m-eu')?.value)||150000, status: document.getElementById('m-es')?.value });
      closeModal(); navigate('employees'); showToast(`Data ${name} diperbarui ✓`, 'success');
    }
  },
  addStock: {
    title: 'Tambah Item Stock',
    body: () => `<div class="row g-3">
      <div class="col-6"><label class="form-label">Kode</label><input class="form-control" id="m-sk" placeholder="MAT-XXX"></div>
      <div class="col-6"><label class="form-label">Kategori</label><select class="form-select" id="m-skat"><option>Material</option><option>Struktur</option><option>Finishing</option><option>K3</option><option>Alat</option></select></div>
      <div class="col-12"><label class="form-label">Nama Item *</label><input class="form-control" id="m-sn" placeholder="Nama material atau alat..."></div>
      <div class="col-4"><label class="form-label">Jumlah Awal</label><input class="form-control" id="m-sq" type="number" placeholder="0"></div>
      <div class="col-4"><label class="form-label">Stok Minimum</label><input class="form-control" id="m-sm" type="number" placeholder="0"></div>
      <div class="col-4"><label class="form-label">Satuan</label><input class="form-control" id="m-ss" placeholder="sak / btg / m³"></div>
      <div class="col-6"><label class="form-label">Harga/Satuan (Rp)</label><input class="form-control" id="m-sh" type="number" placeholder="0"></div>
      <div class="col-6"><label class="form-label">Lokasi Gudang</label><input class="form-control" id="m-sl" placeholder="Rak A-01"></div>
    </div>`,
    save: () => {
      const nama = document.getElementById('m-sn')?.value.trim();
      if (!nama) { showToast('Nama item wajib diisi', 'danger'); return; }
      dbAdd('stock', { id: document.getElementById('m-sk')?.value.trim()||nextId('MAT-',DB.stock), nama, kategori: document.getElementById('m-skat')?.value, qty: parseInt(document.getElementById('m-sq')?.value)||0, min: parseInt(document.getElementById('m-sm')?.value)||0, satuan: document.getElementById('m-ss')?.value||'pcs', harga: parseInt(document.getElementById('m-sh')?.value)||0, lokasi: document.getElementById('m-sl')?.value||'—' });
      closeModal(); navigate('stock-general'); showToast(`Item "${nama}" ditambahkan!`, 'success');
    }
  },
  newTransfer: {
    title: 'Transfer Stock ke Proyek',
    body: () => `<div class="row g-3">
      <div class="col-6"><label class="form-label">Ke Proyek *</label><select class="form-select" id="m-tj"><option value="">Pilih proyek...</option>${DB.projects.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</select></div>
      <div class="col-6"><label class="form-label">Material *</label><select class="form-select" id="m-ti"><option value="">Pilih material...</option>${DB.stock.map(s=>`<option value="${s.id}">${s.nama} (${s.qty} ${s.satuan})</option>`).join('')}</select></div>
      <div class="col-6"><label class="form-label">Jumlah *</label><input class="form-control" id="m-tq" type="number" placeholder="0" min="1"></div>
      <div class="col-6"><label class="form-label">Tanggal</label><input class="form-control" id="m-td" type="date" value="${today()}"></div>
      <div class="col-12"><label class="form-label">Keterangan</label><textarea class="form-control" id="m-tn" rows="2" placeholder="Keperluan transfer..."></textarea></div>
    </div>`,
    save: () => {
      if (!document.getElementById('m-tj')?.value || !document.getElementById('m-ti')?.value || !document.getElementById('m-tq')?.value) { showToast('Semua field wajib diisi', 'danger'); return; }
      const proj = DB.projects.find(p => p.id === document.getElementById('m-tj')?.value);
      const stock = DB.stock.find(s => s.id === document.getElementById('m-ti')?.value);
      const qty = parseInt(document.getElementById('m-tq')?.value);
      TRANSFERS.unshift({ id: 'TRF-' + (TRANSFERS.length + 43), ke: proj?.name?.substring(0,20)||'—', item: stock?.nama||'—', qty: qty + ' ' + (stock?.satuan||''), date: new Date().toLocaleDateString('id-ID', {day:'numeric',month:'short'}), status: 'pending' });
      closeModal(); navigate('stock-transfer'); showToast('Transfer request dikirim untuk approval ✓', 'success');
    }
  },
  returnStock: {
    title: 'Return Sisa Stock ke Gudang',
    body: (projId) => {
      const proj = DB.projects.find(p=>p.id===projId);
      return `<div class="alert alert-info small"><i class="ti ti-info-circle me-1"></i>Sisa material yang tidak terpakai di proyek akan dikembalikan ke gudang umum.</div>
      <div class="mb-3"><label class="form-label">Proyek</label><input class="form-control" value="${proj?.name||projId}" readonly style="background:#f8fafc"></div>
      <div class="row g-3">
        ${['Semen Portland — 12 sak','Besi Beton D13 — 8 btg','Cat Tembok — 2 kaleng'].map((item,i)=>`
        <div class="col-12"><div class="form-check d-flex align-items-center gap-3 p-3 border rounded-3">
          <input class="form-check-input" type="checkbox" id="ret-${i}" checked>
          <label class="form-check-label fw-medium" for="ret-${i}">${item}</label>
        </div></div>`).join('')}
      </div>
      <div class="mt-3"><label class="form-label">Kondisi Material</label><select class="form-select"><option>Baik</option><option>Rusak Sebagian</option><option>Tidak Layak Pakai</option></select></div>
      <div class="mt-3"><label class="form-label">Catatan</label><textarea class="form-control" rows="2" placeholder="Catatan pengembalian..."></textarea></div>`;
    },
    save: () => { closeModal(); showToast('Return stock berhasil dicatat ✓', 'success'); }
  },
  newPR: {
    title: 'Buat Purchase Request',
    body: () => `<div class="row g-3">
      <div class="col-6"><label class="form-label">Proyek *</label><select class="form-select" id="m-rp"><option value="">Pilih proyek...</option>${DB.projects.map(p=>`<option value="${p.id}">${p.name.substring(0,35)}</option>`).join('')}</select></div>
      <div class="col-6"><label class="form-label">Urgensi</label><select class="form-select" id="m-ru"><option value="normal">Normal</option><option value="high">Urgen</option></select></div>
      <div class="col-12"><label class="form-label">Item yang Dibutuhkan *</label><input class="form-control" id="m-ri" placeholder="Nama material / jasa..."></div>
      <div class="col-4"><label class="form-label">Jumlah</label><input class="form-control" id="m-rq" type="number" placeholder="0"></div>
      <div class="col-4"><label class="form-label">Satuan</label><input class="form-control" id="m-rs" placeholder="sak / unit..."></div>
      <div class="col-4"><label class="form-label">Est. Harga (Rp)</label><input class="form-control" id="m-rh" type="number" placeholder="0"></div>
      <div class="col-12"><label class="form-label">Requester</label><input class="form-control" id="m-rr" placeholder="Nama mandor / PM..."></div>
    </div>`,
    save: () => {
      const item = document.getElementById('m-ri')?.value.trim();
      const proj = document.getElementById('m-rp')?.value;
      if (!item || !proj) { showToast('Proyek dan item wajib diisi', 'danger'); return; }
      dbAdd('purchaseRequests', { id: nextId('PR-2025-', DB.purchaseRequests), project_id: proj, project: DB.projects.find(p=>p.id===proj)?.name?.substring(0,20)||proj, item, qty: parseInt(document.getElementById('m-rq')?.value)||1, satuan: document.getElementById('m-rs')?.value||'unit', est_price: parseInt(document.getElementById('m-rh')?.value)||0, requester: document.getElementById('m-rr')?.value||'—', date: today(), status: 'pending', urgency: document.getElementById('m-ru')?.value||'normal' });
      closeModal(); navigate('purchase-request'); showToast(`PR "${item}" dikirim untuk approval ✓`, 'success');
    }
  },
  newPO: {
    title: 'Buat Purchase Order',
    body: () => `<div class="row g-3">
      <div class="col-6"><label class="form-label">Vendor *</label><input class="form-control" id="m-ov" placeholder="Nama vendor..."></div>
      <div class="col-6"><label class="form-label">Proyek</label><select class="form-select" id="m-op"><option value="">Pilih proyek...</option>${DB.projects.map(p=>`<option value="${p.id}">${p.name.substring(0,35)}</option>`).join('')}</select></div>
      <div class="col-12"><label class="form-label">Item / Deskripsi *</label><input class="form-control" id="m-oi" placeholder="Nama item dan jumlah..."></div>
      <div class="col-6"><label class="form-label">Total (Rp) *</label><input class="form-control" id="m-ot" type="number" placeholder="0"></div>
      <div class="col-6"><label class="form-label">Jatuh Tempo</label><input class="form-control" id="m-od" type="date"></div>
    </div>`,
    save: () => {
      const vendor = document.getElementById('m-ov')?.value.trim();
      const item = document.getElementById('m-oi')?.value.trim();
      if (!vendor || !item) { showToast('Vendor dan item wajib diisi', 'danger'); return; }
      dbAdd('purchaseOrders', { id: nextId('PO-2025-', DB.purchaseOrders), vendor, item, project: document.getElementById('m-op')?.value, total: parseInt(document.getElementById('m-ot')?.value)||0, date: today(), due: document.getElementById('m-od')?.value||'—', status: 'pending_approval' });
      closeModal(); navigate('purchase-order'); showToast('PO dibuat, menunggu approval ✓', 'success');
    }
  },
  newInvoice: {
    title: 'Buat Invoice Termin',
    body: () => `<div class="row g-3">
      <div class="col-6"><label class="form-label">Proyek *</label><select class="form-select" id="m-ivp"><option value="">Pilih proyek...</option>${DB.projects.map(p=>`<option value="${p.id}">${p.name.substring(0,35)}</option>`).join('')}</select></div>
      <div class="col-6"><label class="form-label">Termin ke-</label><input class="form-control" id="m-ivt" type="number" placeholder="1" min="1" value="1"></div>
      <div class="col-12"><label class="form-label">Nama Client</label><input class="form-control" id="m-ivc" placeholder="Nama client..."></div>
      <div class="col-6"><label class="form-label">Nilai Invoice (Rp) *</label><input class="form-control" id="m-ivn" type="number" placeholder="0"></div>
      <div class="col-6"><label class="form-label">Jatuh Tempo</label><input class="form-control" id="m-ivd" type="date"></div>
      <div class="col-12"><label class="form-label">Keterangan</label><textarea class="form-control" rows="2" placeholder="Pekerjaan yang ditagihkan..."></textarea></div>
    </div>`,
    save: () => {
      const proj = document.getElementById('m-ivp')?.value;
      const nilai = document.getElementById('m-ivn')?.value;
      if (!proj || !nilai) { showToast('Proyek dan nilai wajib diisi', 'danger'); return; }
      const projName = DB.projects.find(p=>p.id===proj)?.name||proj;
      const newInv = { id: 'INV-2025-0' + (INVOICES.length + 19), client: document.getElementById('m-ivc')?.value||projName, proyek: projName.substring(0,15), nilai: fmtFull(parseInt(nilai)), due: document.getElementById('m-ivd')?.value, status: 'draft' };
      INVOICES.unshift(newInv);
      closeModal(); navigate('finance'); showToast('Invoice berhasil dibuat ✓', 'success');
    }
  },
  addBOQ: {
    title: 'Tambah Item RAB / BOQ',
    body: () => `<div class="row g-3">
      <div class="col-4"><label class="form-label">No. Urut</label><input class="form-control" placeholder="D.1"></div>
      <div class="col-8"><label class="form-label">Kategori Pekerjaan</label><input class="form-control" placeholder="D. Pekerjaan MEP"></div>
      <div class="col-12"><label class="form-label">Uraian Pekerjaan *</label><input class="form-control" id="m-bq" placeholder="Nama pekerjaan..."></div>
      <div class="col-3"><label class="form-label">Volume</label><input class="form-control" id="m-bqv" type="number" placeholder="0"></div>
      <div class="col-3"><label class="form-label">Satuan</label><input class="form-control" id="m-bqs" placeholder="m²"></div>
      <div class="col-3"><label class="form-label">Harga/Sat (Rp)</label><input class="form-control" id="m-bqh" type="number" placeholder="0" oninput="updateBOQTotal()"></div>
      <div class="col-3"><label class="form-label">Sub Total</label><input class="form-control" id="m-bqtotal" placeholder="0" readonly style="background:#f8fafc"></div>
    </div>`,
    save: () => {
      if (!document.getElementById('m-bq')?.value.trim()) { showToast('Uraian wajib diisi', 'danger'); return; }
      closeModal(); navigate('rab'); showToast('Item BOQ ditambahkan ✓', 'success');
    }
  },
  addEquipment: {
    title: 'Tambah Data Alat',
    body: () => `<div class="row g-3">
      <div class="col-6"><label class="form-label">ID Alat</label><input class="form-control" placeholder="ALT-XXX"></div>
      <div class="col-6"><label class="form-label">Kondisi</label><select class="form-select"><option>Baik</option><option>Perlu Servis</option><option>Rusak</option></select></div>
      <div class="col-12"><label class="form-label">Nama Alat *</label><input class="form-control" id="m-eq" placeholder="Nama alat..."></div>
      <div class="col-4"><label class="form-label">Total Unit</label><input class="form-control" id="m-eqt" type="number" placeholder="1" min="1"></div>
      <div class="col-4"><label class="form-label">Biaya/Hari (Rp)</label><input class="form-control" id="m-eqb" type="number" placeholder="0"></div>
      <div class="col-4"><label class="form-label">Lokasi</label><input class="form-control" placeholder="Gudang Alat"></div>
    </div>`,
    save: () => {
      const name = document.getElementById('m-eq')?.value.trim();
      if (!name) { showToast('Nama alat wajib diisi', 'danger'); return; }
      dbAdd('equipment', { id: nextId('ALT-', DB.equipment), name, total: parseInt(document.getElementById('m-eqt')?.value)||1, dipinjam: 0, kondisi: 'Baik', biaya_hari: parseInt(document.getElementById('m-eqb')?.value)||0, project: null });
      closeModal(); navigate('equipment'); showToast(`Alat "${name}" ditambahkan ✓`, 'success');
    }
  },
  filterProjects: {
    title: 'Filter Proyek',
    body: () => `<div class="row g-3">
      <div class="col-12"><label class="form-label">Status</label>
        <select class="form-select" id="fp-status"><option value="all">Semua Status</option><option value="on-track">On Track</option><option value="late">Terlambat</option><option value="finishing">Hampir Selesai</option><option value="done">Selesai</option></select></div>
      <div class="col-6"><label class="form-label">Dari Tanggal</label><input type="date" class="form-control" id="fp-from"></div>
      <div class="col-6"><label class="form-label">Sampai Tanggal</label><input type="date" class="form-control" id="fp-to"></div>
      <div class="col-12"><label class="form-label">Project Manager</label>
        <select class="form-select" id="fp-pm"><option value="">Semua PM</option><option>Rudi Hartono</option><option>Andi Pratama</option><option>Bambang W.</option></select></div>
    </div>`,
    save: () => {
      const status = document.getElementById('fp-status')?.value;
      const pm = document.getElementById('fp-pm')?.value;
      let filtered = DB.projects;
      if (status && status !== 'all') filtered = filtered.filter(p => p.status === status);
      if (pm) filtered = filtered.filter(p => p.pm === pm);
      closeModal();
      const tbody = document.getElementById('proj-tbody');
      if (tbody) {
        tbody.innerHTML = filtered.length
          ? filtered.map(p => projRowHTML(p)).join('')
          : '<tr><td colspan="6" class="text-center py-4 text-muted">Tidak ada proyek yang cocok</td></tr>';
      }
      showToast(`Filter diterapkan: ${filtered.length} proyek`, 'success');
    }
  },
  filterAttendance: {
    title: 'Filter Absensi',
    body: () => `<div class="row g-3">
      <div class="col-12"><label class="form-label">Tanggal</label><input type="date" class="form-control" id="fa-date" value="${today()}"></div>
      <div class="col-12"><label class="form-label">Proyek</label><select class="form-select" id="fa-proj"><option value="">Semua Proyek</option>${DB.projects.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</select></div>
      <div class="col-12"><label class="form-label">Status</label><select class="form-select" id="fa-status"><option value="">Semua Status</option><option value="approved">Disetujui</option><option value="pending">Pending</option><option value="rejected">Ditolak</option></select></div>
    </div>`,
    save: () => {
      const proj = document.getElementById('fa-proj')?.value;
      const status = document.getElementById('fa-status')?.value;
      let filtered = DB.attendance;
      if (proj) filtered = filtered.filter(a => a.project_id === proj);
      if (status) filtered = filtered.filter(a => a.status === status);
      closeModal();
      const tbody = document.getElementById('att-tbody');
      if (tbody) tbody.innerHTML = filtered.map(a => attRowHTML(a)).join('');
      showToast(`Filter diterapkan: ${filtered.length} data`, 'success');
    }
  },
  sendReminder: {
    title: 'Kirim Reminder ke Client',
    body: (invId) => {
      const inv = INVOICES.find(i=>i.id===invId) || { id:invId, client:'Client', nilai:'—' };
      return `<div class="alert alert-warning small d-flex gap-2"><i class="ti ti-alert-triangle flex-shrink-0 mt-1"></i>Invoice ${inv.id} senilai ${inv.nilai} belum dibayar oleh ${inv.client}.</div>
      <div class="mb-3"><label class="form-label">Kirim ke Email</label><input class="form-control" value="${inv.client?.toLowerCase().replace(/\s+/g,'')}@client.com"></div>
      <div class="mb-3"><label class="form-label">Pesan</label><textarea class="form-control" rows="3">Yth. ${inv.client},\n\nKami mengingatkan bahwa Invoice ${inv.id} senilai ${inv.nilai} telah jatuh tempo. Mohon segera melakukan pembayaran.\n\nTerima kasih.\n\nPT AFSS Contractor Indonesia</textarea></div>
      <div class="mb-3"><label class="form-label">CC</label><input class="form-control" placeholder="cc@email.com"></div>`;
    },
    save: () => { closeModal(); showToast('Reminder berhasil dikirim ke client ✓', 'success'); }
  },
  sendInvoice: {
    title: 'Kirim Invoice ke Client',
    body: (invId) => {
      const inv = INVOICES.find(i=>i.id===invId) || { id:invId, client:'Client', nilai:'—' };
      return `<div class="row g-3">
        <div class="col-12"><label class="form-label">Invoice</label><input class="form-control" value="${inv.id} — ${inv.nilai}" readonly style="background:#f8fafc"></div>
        <div class="col-12"><label class="form-label">Kirim ke Client</label><input class="form-control" value="${inv.client}"></div>
        <div class="col-12"><label class="form-label">Email Client</label><input class="form-control" placeholder="email@client.com"></div>
        <div class="col-12"><label class="form-label">Metode Pengiriman</label><select class="form-select"><option>Email</option><option>WhatsApp</option><option>Download PDF</option></select></div>
        <div class="col-12"><label class="form-label">Catatan</label><textarea class="form-control" rows="2" placeholder="Pesan tambahan..."></textarea></div>
      </div>`;
    },
    save: () => {
      const inv = INVOICES.find(i=>i.status==='draft');
      if (inv) inv.status = 'sent';
      closeModal(); navigate('finance'); showToast('Invoice berhasil dikirim ke client ✓', 'success');
    }
  },
  rolePermissions: {
    title: 'Konfigurasi Akses — Role',
    body: (role) => {
      const perms = ROLE_PERMS[role] || [];
      return `<p class="text-muted small mb-3">Centang modul yang dapat diakses oleh <strong>${role}</strong>. Perubahan berlaku setelah disimpan.</p>
      <div class="row g-2" id="perm-list">
        ${Object.entries(MODULE_NAMES).map(([k,v])=>`<div class="col-6">
          <div class="form-check p-2 rounded-3 border ${perms.includes(k)?'bg-primary-subtle border-primary-subtle':'bg-light'}">
            <input class="form-check-input" type="checkbox" id="p-${k}" ${perms.includes(k)?'checked':''} onchange="updatePermPreview(this,'${k}')">
            <label class="form-check-label small fw-medium" for="p-${k}">${v}</label>
          </div>
        </div>`).join('')}
      </div>
      <input type="hidden" id="perm-role" value="${role}">
      <div class="mt-3 p-2 bg-light rounded-3 small text-muted"><i class="ti ti-info-circle me-1"></i>Perubahan disimpan sementara di session demo ini.</div>`;
    },
    save: () => {
      const role = document.getElementById('perm-role')?.value;
      const checked = Object.keys(MODULE_NAMES).filter(k => document.getElementById('p-'+k)?.checked);
      ROLE_PERMS[role] = checked;
      closeModal(); showToast(`Akses "${role}" berhasil diperbarui ✓`, 'success');
    }
  },
};

function updatePermPreview(cb, key) {
  const card = cb.closest('.form-check');
  if (cb.checked) {
    card.classList.add('bg-primary-subtle','border-primary-subtle');
    card.classList.remove('bg-light');
  } else {
    card.classList.remove('bg-primary-subtle','border-primary-subtle');
    card.classList.add('bg-light');
  }
}

function updateBOQTotal() {
  const vol = parseFloat(document.getElementById('m-bqv')?.value||0);
  const harga = parseFloat(document.getElementById('m-bqh')?.value||0);
  const total = document.getElementById('m-bqtotal');
  if (total) total.value = (vol * harga).toLocaleString('id-ID');
}

function openModal(type, param) {
  const tmpl = MODALS[type];
  if (!tmpl) { showToast('Modal tidak tersedia', 'warning'); return; }
  document.getElementById('modal-title').textContent = typeof tmpl.title === 'function' ? tmpl.title(param) : tmpl.title;
  document.getElementById('modal-body').innerHTML = tmpl.body(param);
  document.getElementById('modal-save-btn').onclick = tmpl.save;
  bsModal.show();
}
function closeModal() { bsModal.hide(); }

// ── Confirm ───────────────────────────────────────────
function showConfirm(title, msg, cb) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent = msg;
  document.getElementById('confirm-ok-btn').onclick = () => { bsConfirm.hide(); if (cb) cb(); };
  bsConfirm.show();
}

// ── Detail Navigation ─────────────────────────────────
function viewEmployee(id) {
  window.currentEmpId = id;
  navigate('employee-detail');
}

function viewProject(id) {
  window.currentProjId = id;
  navigate('project-detail');
}

function switchProjTab(id, btn) {
  // Hide all pd-* panels
  ['info','team','absensi','pembelian'].forEach(t => {
    const el = document.getElementById('pd-' + t);
    if (el) el.classList.add('d-none');
  });
  const target = document.getElementById('pd-' + id);
  if (target) target.classList.remove('d-none');
  // Update active tab
  document.querySelectorAll('#pd-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── Map Tabs ──────────────────────────────────────────
function switchMapTab(id, btn) {
  document.querySelectorAll('.map-panel').forEach(p => p.classList.add('d-none'));
  const panel = document.getElementById('map-' + id);
  if (panel) panel.classList.remove('d-none');
  document.querySelectorAll('#map-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── Filter: Projects ──────────────────────────────────
function filterProjects(filter, btn) {
  // Update active tab
  btn.closest('.nav').querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Filter data
  let data;
  const demoSelesai = DB.projects.slice(0,1).map(p=>({...p, status:'done', progress:100}));
  const demoPipeline = [
    { id:'PRJ-006', name:'Gedung Sewa Kemang Selatan', client:'PT Kemang Properti', kontrak:9500000000, hpp:0, progress:0, deadline:'2026-06-30', status:'on-track', pm:'Rudi Hartono', workers:0 },
    { id:'PRJ-007', name:'Ruko Bekasi Timur Blok A', client:'CV Mega Realty', kontrak:4200000000, hpp:0, progress:0, deadline:'2026-09-30', status:'on-track', pm:'Andi Pratama', workers:0 },
  ];
  switch(filter) {
    case 'active':   data = DB.projects.filter(p=>p.status!=='done'); break;
    case 'done':     data = demoSelesai; break;
    case 'pipeline': data = demoPipeline; break;
    case 'late':     data = DB.projects.filter(p=>p.status==='late'); break;
    default:         data = [...DB.projects, ...demoSelesai];
  }
  const tbody = document.getElementById('proj-tbody');
  if (!tbody) return;
  tbody.innerHTML = data.length
    ? data.map(p => projRowHTML(p)).join('')
    : '<tr><td colspan="6" class="text-center py-5 text-muted"><i class="ti ti-folder-open fs-1 d-block mb-2"></i>Tidak ada proyek di kategori ini</td></tr>';
  // Update count badge in tab
  const countEl = btn.querySelector('[data-count]');
  if (countEl) countEl.textContent = data.length;
}

// ── Filter: Attendance ────────────────────────────────
function filterAttendance(dateVal) {
  const tbody = document.getElementById('att-tbody');
  if (!tbody) return;
  const filtered = dateVal ? DB.attendance.filter(a => a.date === dateVal) : DB.attendance;
  tbody.innerHTML = filtered.length
    ? filtered.map(a => attRowHTML(a)).join('')
    : '<tr><td colspan="8" class="text-center py-4 text-muted">Tidak ada data absensi untuk tanggal ini</td></tr>';
  // Update stats
  updateAttStats(filtered);
}

function updateAttStats(data) {
  const hadirEl = document.getElementById('att-stat-hadir');
  const pendEl  = document.getElementById('att-stat-pend');
  if (hadirEl) hadirEl.textContent = data.filter(a=>a.status==='approved').length + ' org';
  if (pendEl)  pendEl.textContent  = data.filter(a=>a.status==='pending').length + ' org';
}

// ── Filter: GL Period ─────────────────────────────────
function filterGL(period) {
  const tbody = document.getElementById('gl-tbody');
  if (!tbody) return;
  // For demo, just show toast and same data
  const filtered = period === 'Mei 2025'
    ? DB.gl.slice(3) // Show fewer entries for Mei
    : DB.gl;
  tbody.innerHTML = filtered.map(r => glRowHTML(r)).join('');
  const totalD = filtered.reduce((a,r)=>a+r.debit,0);
  const totalK = filtered.reduce((a,r)=>a+r.kredit,0);
  const sumEl = document.getElementById('gl-summary-row');
  if (sumEl) sumEl.innerHTML = `<td colspan="5" class="fw-bold">TOTAL — ${period}</td><td class="text-end fw-bold text-primary">${fmtFull(totalD)}</td><td class="text-end fw-bold text-success">${fmtFull(totalK)}</td>`;
  showToast(`Menampilkan GL ${period}`, 'info');
}

// ── Export / Print ────────────────────────────────────
function exportPage() { window.print(); }
function exportExcel() {
  showToast('Mengunduh file Excel...', 'info');
  setTimeout(() => showToast('File berhasil diunduh ✓', 'success'), 1500);
}
function exportPDF() {
  showToast('Menyiapkan PDF...', 'info');
  setTimeout(() => window.print(), 500);
}
function exportAll() {
  showToast('Mengunduh semua laporan...', 'info');
  setTimeout(() => showToast('Semua laporan berhasil diunduh ✓', 'success'), 1800);
}

// ── Transfer Operations ───────────────────────────────
function submitTransfer() {
  const proj = document.getElementById('tf-proj')?.value;
  const item = document.getElementById('tf-item')?.value;
  const qty  = document.getElementById('tf-qty')?.value;
  if (!proj || !item || !qty) { showToast('Semua field wajib diisi', 'danger'); return; }
  const projName  = DB.projects.find(p=>p.id===proj)?.name?.substring(0,20)||proj;
  const stockItem = DB.stock.find(s=>s.id===item);
  TRANSFERS.unshift({ id:'TRF-0' + (TRANSFERS.length+43), ke: projName, item: stockItem?.nama||item, qty: qty+' '+(stockItem?.satuan||''), date: new Date().toLocaleDateString('id-ID',{day:'numeric',month:'short'}), status:'pending' });
  showToast('Transfer request dikirim untuk approval ✓', 'success');
  const tbody = document.getElementById('trf-tbody');
  if (tbody) tbody.innerHTML = TRANSFERS.map(t => transferRowHTML(t)).join('');
}

function approveTransfer(id) {
  const t = TRANSFERS.find(r=>r.id===id);
  if (t) t.status = 'approved';
  const tbody = document.getElementById('trf-tbody');
  if (tbody) tbody.innerHTML = TRANSFERS.map(t => transferRowHTML(t)).join('');
  showToast(`Transfer ${id} disetujui ✓`, 'success');
}

function transferRowHTML(t) {
  return `<tr>
    <td class="fw-bold text-primary">${t.id}</td>
    <td class="fw-medium">${t.ke}</td><td>${t.item}</td>
    <td class="fw-bold">${t.qty}</td><td class="text-muted">${t.date}</td>
    <td>${statusBadge(t.status)}</td>
    <td>${t.status==='pending'?`<button class="btn btn-success btn-sm" onclick="approveTransfer('${t.id}')"><i class="ti ti-check"></i></button>`:''}</td>
  </tr>`;
}

// ── Invoice Operations ────────────────────────────────
function sendInvoiceReminder(invId) { openModal('sendReminder', invId); }
function sendInvoiceToClient(invId) { openModal('sendInvoice', invId); }
function openReturnStockModal(projId) { openModal('returnStock', projId); }
function openRoleModal(role) {
  MODALS.rolePermissions.title = `Konfigurasi Akses — ${role}`;
  openModal('rolePermissions', role);
}

// ── Integration Toggle ────────────────────────────────
const INT_KEY_MAP = { 'WhatsApp':'whatsapp', 'Email SMTP':'email', 'Google Drive':'gdrive', 'Akuntansi Cloud':'accounting' };

function toggleIntegration(name) {
  const key = INT_KEY_MAP[name] || name.toLowerCase();
  INTEGRATIONS[key] = !INTEGRATIONS[key];
  localStorage.setItem('afss_integrations', JSON.stringify(INTEGRATIONS));
  navigate('settings');
  showToast(`${name} ${INTEGRATIONS[key]?'diaktifkan ✓':'dinonaktifkan'}`, INTEGRATIONS[key]?'success':'warning');
}

// ── Settings Save ─────────────────────────────────────
function saveCompanySettings() {
  COMPANY.name = document.getElementById('s-company-name')?.value || COMPANY.name;
  COMPANY.npwp = document.getElementById('s-npwp')?.value || COMPANY.npwp;
  COMPANY.address = document.getElementById('s-address')?.value || COMPANY.address;
  COMPANY.overhead = parseFloat(document.getElementById('s-overhead')?.value) || COMPANY.overhead;
  COMPANY.retensi = parseFloat(document.getElementById('s-retensi')?.value) || COMPANY.retensi;
  localStorage.setItem('afss_company', JSON.stringify(COMPANY));
  showToast('Pengaturan perusahaan disimpan ✓', 'success');
}

// ── Attendance Actions ────────────────────────────────
function approveAtt(id) {
  dbUpdate('attendance', id, { status:'approved' });
  const a = DB.attendance.find(r=>r.id===id);
  const row = document.querySelector(`[data-att="${id}"]`);
  if (row) row.innerHTML = attRowHTML(DB.attendance.find(r=>r.id===id)).replace('<tr','<tr').split('<tr').pop();
  const tbody = document.getElementById('att-tbody');
  if (tbody) tbody.innerHTML = DB.attendance.map(a => attRowHTML(a)).join('');
  showToast(`Absensi ${a?.name||''} disetujui ✓`, 'success');
  updateAttStats(DB.attendance);
}
function rejectAtt(id) {
  dbUpdate('attendance', id, { status:'rejected' });
  const tbody = document.getElementById('att-tbody');
  if (tbody) tbody.innerHTML = DB.attendance.map(a => attRowHTML(a)).join('');
  showToast('Absensi ditolak', 'danger');
  updateAttStats(DB.attendance);
}
function approveAllAtt() {
  DB.attendance.filter(a=>a.status==='pending').forEach(a => dbUpdate('attendance', a.id, {status:'approved'}));
  const tbody = document.getElementById('att-tbody');
  if (tbody) tbody.innerHTML = DB.attendance.map(a => attRowHTML(a)).join('');
  updateAttStats(DB.attendance);
  showToast('Semua absensi pending disetujui ✓', 'success');
}

// ── Payroll Actions ───────────────────────────────────
function approvePayroll(id) {
  dbUpdate('payroll', id, { status:'paid' });
  const p = DB.payroll.find(r=>r.id===id);
  if (p) dbAdd('gl', { id:'JNL-'+Date.now(), date: new Date().toLocaleDateString('id-ID'), kode:'6-001', akun:'Biaya Tenaga Kerja', ket:`Gaji ${p.name}`, debit: payrollNet(p), kredit:0, project: p.project_id });
  navigate('payroll');
  showToast(`Payroll ${p?.name||''} dibayarkan & dicatat ke GL ✓`, 'success');
}
function approvePayrollAll() {
  const pending = DB.payroll.filter(p=>p.status==='pending');
  pending.forEach(p => {
    dbUpdate('payroll', p.id, { status:'paid' });
    dbAdd('gl', { id:'JNL-'+Date.now()+Math.random(), date: new Date().toLocaleDateString('id-ID'), kode:'6-001', akun:'Biaya Tenaga Kerja', ket:`Gaji ${p.name}`, debit: payrollNet(p), kredit:0, project: p.project_id });
  });
  navigate('payroll');
  showToast(`${pending.length} payroll diproses & dicatat ke GL ✓`, 'success');
}
function processPayrollPayment(id) {
  dbUpdate('payroll', id, { status:'paid' });
  navigate('payroll');
  showToast('Pembayaran berhasil diproses ✓', 'success');
}
function printSlip(id) {
  const p = DB.payroll.find(r=>r.id===id);
  if (!p) return;
  const win = window.open('', '_blank', 'width=600,height=800');
  const net = payrollNet(p);
  win.document.write(`<html><head><title>Slip Gaji — ${p.name}</title>
  <style>body{font-family:Arial,sans-serif;padding:30px;max-width:500px;margin:0 auto}
  h2{text-align:center;color:#0f2a4a;margin-bottom:5px}.subtitle{text-align:center;color:#64748b;font-size:12px;margin-bottom:20px}
  table{width:100%;border-collapse:collapse}td{padding:6px 10px;font-size:13px}
  .label{color:#64748b}.val{text-align:right;font-weight:bold}
  .total-row{border-top:2px solid #0f2a4a;font-weight:bold;font-size:15px}
  .total-row td{padding:10px}.footer{text-align:center;margin-top:20px;font-size:11px;color:#94a3b8}
  </style></head><body>
  <h2>SLIP GAJI KARYAWAN</h2>
  <div class="subtitle">PT AFSS Contractor Indonesia | Juni 2025</div>
  <table><tr><td class="label">Nama</td><td class="val">${p.name}</td></tr>
  <tr><td class="label">Jabatan</td><td class="val">${p.role}</td></tr>
  <tr><td class="label">Proyek</td><td class="val">${p.project}</td></tr>
  <tr><td colspan="2" style="padding:8px 0"><hr></td></tr>
  <tr><td class="label">Hari Kerja (${p.days} hari × ${fmtFull(p.upah)})</td><td class="val">${fmtFull(p.days*p.upah)}</td></tr>
  <tr><td class="label">+ Uang Lembur</td><td class="val">${fmtFull(p.lembur||0)}</td></tr>
  <tr><td class="label">+ Uang Makan</td><td class="val">${fmtFull(p.makan||0)}</td></tr>
  <tr><td class="label">+ Transport</td><td class="val">${fmtFull(p.transport||0)}</td></tr>
  <tr><td class="label">− Kasbon</td><td class="val" style="color:red">-${fmtFull(p.kasbon||0)}</td></tr>
  <tr><td class="label">− Potongan</td><td class="val" style="color:red">-${fmtFull(p.potongan||0)}</td></tr>
  <tr class="total-row"><td>TOTAL DITERIMA</td><td class="val" style="color:#2563eb">${fmtFull(net)}</td></tr>
  </table>
  <div class="footer">Slip gaji ini dibuat otomatis oleh AFSS Contractor ERP · ${new Date().toLocaleDateString('id-ID')}</div>
  <script>window.print(); window.close();<\/script></body></html>`);
  win.document.close();
}

// ── Purchase Actions ──────────────────────────────────
function approvePR(id) {
  dbUpdate('purchaseRequests', id, {status:'approved'});
  const pr = DB.purchaseRequests.find(r=>r.id===id);
  // Ask user if want to create PO now
  showConfirm(
    'PR Disetujui ✓',
    `Purchase Request "${pr?.item||id}" disetujui. Buat Purchase Order (PO) sekarang?`,
    () => {
      // Auto-create draft PO from PR
      const newPO = {
        id: nextId('PO-2025-', DB.purchaseOrders),
        vendor: '— Pilih Vendor —', item: pr?.item + ' — ' + pr?.qty + ' ' + pr?.satuan,
        project: pr?.project_id||'', total: pr?.est_price||0,
        date: today(), due: '—', status: 'pending_approval'
      };
      dbAdd('purchaseOrders', newPO);
      navigate('purchase-order');
      showToast(`PO ${newPO.id} dibuat dari PR ${id} → Lengkapi vendor & kirim untuk approval ✓`, 'success');
    }
  );
  navigate('purchase-request');
}
function rejectPR(id)  { dbUpdate('purchaseRequests', id, {status:'rejected'}); navigate('purchase-request'); showToast('PR ditolak', 'danger'); }
function approvePO(id) { dbUpdate('purchaseOrders', id, {status:'ordered'});  navigate('purchase-order'); showToast('PO disetujui → Dikirim ke vendor ✓', 'success'); }
function rejectPO(id)  { dbUpdate('purchaseOrders', id, {status:'rejected'}); navigate('purchase-order'); showToast('PO ditolak', 'danger'); }
function receivePO(id) {
  const po = DB.purchaseOrders.find(r=>r.id===id);
  if (!po) return;
  // Show modal to confirm receipt + add to stock
  document.getElementById('modal-title').textContent = 'Konfirmasi Penerimaan Barang';
  document.getElementById('modal-body').innerHTML = `
    <div class="alert alert-info small d-flex gap-2"><i class="ti ti-info-circle flex-shrink-0 mt-1"></i>
      <div>Setelah barang dikonfirmasi diterima, stok akan otomatis bertambah dan biaya masuk HPP proyek.</div></div>
    <div class="mb-3"><label class="form-label">PO yang Diterima</label>
      <input class="form-control bg-light" value="${po.id} — ${po.item}" readonly></div>
    <div class="mb-3"><label class="form-label">Vendor</label>
      <input class="form-control bg-light" value="${po.vendor}" readonly></div>
    <div class="mb-3"><label class="form-label fw-bold text-primary">Tambahkan ke Item Stock *</label>
      <select class="form-select" id="recv-stock-item">
        <option value="">-- Pilih item stock yang diterima --</option>
        ${DB.stock.map(s=>`<option value="${s.id}">${s.nama} (Stok saat ini: ${s.qty} ${s.satuan})</option>`).join('')}
        <option value="__new__">+ Catat sebagai item baru</option>
      </select></div>
    <div class="row g-3 mb-3">
      <div class="col-6"><label class="form-label">Jumlah Diterima *</label>
        <input class="form-control" type="number" id="recv-qty" placeholder="0" min="1"></div>
      <div class="col-6"><label class="form-label">Kondisi Barang</label>
        <select class="form-select" id="recv-cond"><option>Baik</option><option>Ada Kerusakan Sebagian</option><option>Tidak Sesuai PO</option></select></div>
    </div>
    <div class="mb-3"><label class="form-label">Catatan Penerimaan</label>
      <textarea class="form-control" id="recv-note" rows="2" placeholder="Diterima oleh, lokasi penyimpanan, dsb..."></textarea></div>
    <div class="alert alert-success small mb-0"><i class="ti ti-check me-1"></i>
      Setelah disimpan: stok diupdate → biaya ${fmtFull(po.total)} masuk HPP proyek → GL dicatat otomatis</div>`;
  document.getElementById('modal-save-btn').textContent = '✓ Konfirmasi Terima Barang';
  document.getElementById('modal-save-btn').onclick = () => {
    const stockId = document.getElementById('recv-stock-item')?.value;
    const qty = parseInt(document.getElementById('recv-qty')?.value) || 0;
    if (!stockId) { showToast('Pilih item stock yang diterima', 'danger'); return; }
    if (!qty || qty < 1) { showToast('Masukkan jumlah barang yang diterima', 'danger'); return; }
    // Update stock quantity
    if (stockId !== '__new__') {
      const s = DB.stock.find(r=>r.id===stockId);
      if (s) {
        dbUpdate('stock', stockId, { qty: s.qty + qty });
        // Add GL entry for stock in
        dbAdd('gl', { id:'JNL-'+Date.now(), date: new Date().toLocaleDateString('id-ID'), kode:'1-004', akun:'Persediaan Stock', ket:`Terima barang PO ${po.id} — ${s.nama} +${qty} ${s.satuan}`, debit: po.total, kredit: 0, project: po.project });
        const stockName = s.nama;
        dbUpdate('purchaseOrders', id, { status:'received' });
        closeModal();
        navigate('purchase-order');
        showToast(`Barang diterima ✓ Stok "${stockName}" +${qty} ${s.satuan} · GL dicatat`, 'success');
      }
    } else {
      dbUpdate('purchaseOrders', id, { status:'received' });
      closeModal();
      navigate('purchase-order');
      showToast('Barang diterima ✓ Tambahkan item ke Master Stock untuk tracking lanjutan', 'success');
    }
  };
  bsModal.show();
}
function payPO(id)     {
  dbUpdate('purchaseOrders', id, {status:'paid'});
  const po = DB.purchaseOrders.find(r=>r.id===id);
  if (po) dbAdd('gl', { id:'JNL-'+Date.now(), date: new Date().toLocaleDateString('id-ID'), kode:'2-001', akun:'Hutang Vendor', ket:`Bayar ${po.vendor} ${po.id}`, debit: po.total, kredit:0, project: po.project });
  navigate('purchase-order');
  showToast('Vendor dibayar ✓ → GL diupdate', 'success');
}

// ── Equipment Actions ─────────────────────────────────
function pinjamAlat(id) {
  const e = DB.equipment.find(r=>r.id===id);
  if (!e || e.total-e.dipinjam<=0) { showToast(`${e?.name||'Alat'} tidak ada unit tersedia`, 'danger'); return; }
  dbUpdate('equipment', id, { dipinjam: e.dipinjam+1 });
  navigate('equipment');
  showToast(`${e.name} dipinjamkan ke proyek ✓`, 'success');
}
function returnAlat(id) {
  const e = DB.equipment.find(r=>r.id===id);
  if (!e || e.dipinjam<=0) { showToast('Tidak ada unit yang sedang dipinjam', 'warning'); return; }
  dbUpdate('equipment', id, { dipinjam: e.dipinjam-1 });
  navigate('equipment');
  showToast(`${e.name} dikembalikan ke gudang ✓`, 'success');
}

// ── Employee Actions ──────────────────────────────────
function openEditEmployee(id) { openModal('editEmployee', id); }
function deleteEmployee(id) {
  const e = DB.employees.find(r=>r.id===id);
  showConfirm('Hapus Karyawan?', `Data ${e?.name||''} akan dihapus dari sistem.`, () => {
    dbDelete('employees', id);
    navigate('employees');
    showToast('Karyawan dihapus', 'success');
  });
}

// ── Stages Navigation ─────────────────────────────────
function openProjectStages(projId) {
  window.currentProjId = projId;
  navigate('project-stages');
}

function openStageGallery(stageId) {
  const stage = (DB.stages || []).find(s => s.id === stageId);
  if (stage) window.currentProjId = stage.project_id;
  window.currentStageId = stageId;
  navigate('stage-gallery');
}

function openProjectReport(projId) {
  window.currentProjId = projId;
  navigate('project-report');
}

// ── Stage Modal (new + edit) ──────────────────────────
function openStageModal(stageId) {
  const proj   = DB.projects.find(p => p.id === window.currentProjId);
  const stage  = stageId ? (DB.stages || []).find(s => s.id === stageId) : null;
  const isEdit = !!stage;
  const stages = (DB.stages || []).filter(s => s.project_id === window.currentProjId);
  const nextOrder = stages.length > 0 ? Math.max(...stages.map(s => s.order)) + 1 : 1;

  document.getElementById('modal-title').textContent = isEdit ? 'Edit Tahapan' : 'Tambah Tahapan Baru';
  document.getElementById('modal-body').innerHTML = `
    <div class="row g-3">
      <div class="col-12"><div class="alert alert-info py-2 small"><i class="ti ti-folder-open me-1"></i><strong>${proj?.name || 'Proyek'}</strong></div></div>
      <div class="col-3">
        <label class="form-label">No. Urut</label>
        <input class="form-control" id="ms-order" type="number" min="1" value="${stage?.order ?? nextOrder}">
      </div>
      <div class="col-9">
        <label class="form-label">Nama Tahapan *</label>
        <input class="form-control" id="ms-name" placeholder="Pekerjaan Pondasi, Struktur Lt.1, dll..." value="${stage?.name || ''}">
      </div>
      <div class="col-12">
        <label class="form-label">Deskripsi Pekerjaan</label>
        <input class="form-control" id="ms-desc" placeholder="Uraian singkat lingkup pekerjaan..." value="${stage?.desc || ''}">
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label">Target (% bobot)</label>
        <input class="form-control" id="ms-tgt" type="number" min="0" max="100" placeholder="0" value="${stage?.target_pct ?? ''}">
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label">Realisasi (%)</label>
        <input class="form-control" id="ms-act" type="number" min="0" max="100" placeholder="0" value="${stage?.actual_pct ?? ''}">
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label">Mulai</label>
        <input class="form-control" id="ms-start" type="date" value="${stage?.start || today()}">
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label">Target Selesai</label>
        <input class="form-control" id="ms-end" type="date" value="${stage?.deadline || ''}">
      </div>
      <div class="col-12">
        <label class="form-label">Status</label>
        <div class="d-flex gap-2">
          ${['pending','in-progress','done'].map(s => `
            <label class="flex-grow-1" style="cursor:pointer">
              <input type="radio" name="ms-status" value="${s}" ${(stage?.status||'pending')===s?'checked':''} class="d-none">
              <div class="status-radio-card ${(stage?.status||'pending')===s?'active':''}" onclick="this.closest('label').querySelector('input').checked=true;document.querySelectorAll('.status-radio-card').forEach(c=>c.classList.remove('active'));this.classList.add('active')">
                ${{pending:'⏳ Belum Mulai','in-progress':'🔵 Sedang Berjalan',done:'✅ Selesai'}[s]}
              </div>
            </label>`).join('')}
        </div>
      </div>
      ${isEdit ? `<input type="hidden" id="ms-id" value="${stageId}">` : ''}
    </div>`;

  document.getElementById('modal-save-btn').textContent = isEdit ? 'Simpan Perubahan' : 'Tambah Tahapan';
  document.getElementById('modal-save-btn').onclick = () => {
    const name = document.getElementById('ms-name')?.value.trim();
    if (!name) { showToast('Nama tahapan wajib diisi', 'danger'); return; }
    const statusEl = document.querySelector('input[name="ms-status"]:checked');
    const data = {
      project_id:  window.currentProjId,
      name,
      desc:        document.getElementById('ms-desc')?.value.trim() || '',
      order:       parseInt(document.getElementById('ms-order')?.value) || nextOrder,
      target_pct:  parseInt(document.getElementById('ms-tgt')?.value)  || 0,
      actual_pct:  parseInt(document.getElementById('ms-act')?.value)  || 0,
      start:       document.getElementById('ms-start')?.value || today(),
      deadline:    document.getElementById('ms-end')?.value   || '',
      status:      statusEl?.value || 'pending',
    };
    if (isEdit) {
      dbUpdate('stages', stageId, data);
      closeModal(); navigate('project-stages');
      showToast(`Tahapan "${name}" diperbarui ✓`, 'success');
    } else {
      dbAdd('stages', { id: nextId('STG-', DB.stages), ...data });
      closeModal(); navigate('project-stages');
      showToast(`Tahapan "${name}" berhasil ditambahkan ✓`, 'success');
    }
  };
  bsModal.show();
}

// ── Delete Stage ──────────────────────────────────────
function deleteStage(id) {
  const s = (DB.stages || []).find(r => r.id === id);
  const docCount = (DB.docUploads || []).filter(d => d.stage_id === id).length;
  showConfirm(
    'Hapus Tahapan?',
    `"${s?.name || id}" beserta ${docCount} dokumentasi akan dihapus dari sistem.`,
    () => {
      dbDelete('stages', id);
      (DB.docUploads || []).filter(d => d.stage_id === id).forEach(d => dbDelete('docUploads', d.id));
      navigate('project-stages');
      showToast('Tahapan dihapus', 'success');
    }
  );
}

// ── Delete Doc ────────────────────────────────────────
function deleteDoc(id) {
  const d = (DB.docUploads || []).find(r => r.id === id);
  showConfirm('Hapus Dokumentasi?', `"${d?.title || id}" akan dihapus dari sistem (file di Drive tidak ikut terhapus).`, () => {
    dbDelete('docUploads', id);
    navigate('stage-gallery');
    showToast('Dokumentasi dihapus ✓', 'success');
  });
}

// ── Upload Doc Modal ──────────────────────────────────
function openUploadDoc(stageId) {
  window.currentStageId = stageId;
  const stage = (DB.stages || []).find(s => s.id === stageId);
  const proj  = DB.projects.find(p => p.id === stage?.project_id);
  const names = { Owner:'Budi Owner', Admin:'Admin Sistem', Finance:'Tim Finance', PM:'Rudi PM', Mandor:'Hasan Mandor', Warehouse:'Gudang Staff' };
  const uploader = names[currentRole] || 'Tim Lapangan';

  document.getElementById('modal-title').textContent = 'Upload Dokumentasi';
  document.getElementById('modal-body').innerHTML = `
    <div class="row g-3">
      <div class="col-12">
        <div class="alert alert-info py-2 small d-flex gap-2 align-items-center">
          <i class="ti ti-list-check flex-shrink-0"></i>
          <span><strong>${proj?.name || '—'}</strong> › ${stage?.name || '—'}</span>
        </div>
      </div>
      <div class="col-12">
        <label class="form-label">Judul Dokumentasi *</label>
        <input class="form-control" id="ud-title" placeholder="Foto pengecoran, video progress, dll...">
      </div>
      <div class="col-12">
        <label class="form-label">Caption / Keterangan</label>
        <textarea class="form-control" id="ud-caption" rows="2" placeholder="Deskripsi kondisi, volume, material yang digunakan, dll..."></textarea>
      </div>
      <div class="col-12">
        <label class="form-label">Catatan Kinerja</label>
        <input class="form-control" id="ud-kinerja" placeholder="Sesuai/tidak sesuai target, kendala, dll...">
      </div>
      <div class="col-6">
        <label class="form-label">Diunggah Oleh</label>
        <input class="form-control" id="ud-uploader" value="${uploader}">
      </div>
      <div class="col-6">
        <label class="form-label">Tanggal</label>
        <input class="form-control" id="ud-date" type="date" value="${today()}">
      </div>
      <div class="col-12">
        <label class="form-label">File (Foto / Video)</label>
        <div class="upload-drop-zone" id="upload-drop" onclick="document.getElementById('ud-file').click()" ondragover="event.preventDefault();this.classList.add('dragover')" ondragleave="this.classList.remove('dragover')" ondrop="handleFileDrop(event)">
          <i class="ti ti-cloud-upload" style="font-size:36px;color:#94a3b8"></i>
          <div class="fw-semibold mt-2" style="font-size:13px">Klik atau drag & drop file di sini</div>
          <div class="small text-muted mt-1">JPG, PNG, MP4, MOV — maks. 100MB</div>
          <div id="ud-file-preview" class="mt-2"></div>
        </div>
        <input type="file" id="ud-file" accept="image/*,video/*" class="d-none" onchange="previewUploadFile(this)">
      </div>
      <div id="ud-progress-wrap" class="col-12 d-none">
        <div class="d-flex justify-content-between mb-1 small">
          <span id="ud-progress-label">Mengunggah ke Google Drive…</span>
          <span id="ud-progress-pct">0%</span>
        </div>
        <div class="prg" style="height:8px"><div class="prg-fill prg-blue" id="ud-progress-bar" style="width:0%;height:8px;transition:width .3s"></div></div>
      </div>
    </div>`;

  document.getElementById('modal-save-btn').innerHTML = '<i class="ti ti-cloud-upload me-1"></i>Upload ke Google Drive';
  document.getElementById('modal-save-btn').onclick = handleDocUpload;
  bsModal.show();
}

function previewUploadFile(input) {
  const file = input.files[0];
  if (!file) return;
  const preview = document.getElementById('ud-file-preview');
  const drop    = document.getElementById('upload-drop');
  if (!file) return;
  const isVideo = file.type.startsWith('video/');
  const sizeStr = file.size > 1024 * 1024 ? (file.size / 1024 / 1024).toFixed(1) + ' MB' : (file.size / 1024).toFixed(0) + ' KB';
  if (isVideo) {
    preview.innerHTML = `<div class="d-flex align-items-center gap-2 mt-1">
      <i class="ti ti-video text-primary fs-5"></i>
      <div class="text-start"><div class="fw-semibold small text-truncate" style="max-width:240px">${file.name}</div><div class="small text-muted">${sizeStr}</div></div>
      <i class="ti ti-check-circle text-success ms-auto"></i>
    </div>`;
  } else {
    const url = URL.createObjectURL(file);
    preview.innerHTML = `<div class="d-flex align-items-center gap-2 mt-2">
      <img src="${url}" style="width:60px;height:42px;object-fit:cover;border-radius:6px;border:1px solid #e2e8f0">
      <div class="text-start"><div class="fw-semibold small text-truncate" style="max-width:200px">${file.name}</div><div class="small text-muted">${sizeStr}</div></div>
      <i class="ti ti-check-circle text-success ms-auto"></i>
    </div>`;
  }
  drop.style.background = '#f0fdf4';
  drop.style.borderColor = '#16a34a';
}

function handleFileDrop(e) {
  e.preventDefault();
  document.getElementById('upload-drop').classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (!file) return;
  const input = document.getElementById('ud-file');
  const dt = new DataTransfer();
  dt.items.add(file);
  input.files = dt.files;
  previewUploadFile(input);
}

async function handleDocUpload() {
  const title    = document.getElementById('ud-title')?.value.trim();
  const caption  = document.getElementById('ud-caption')?.value.trim();
  const kinerja  = document.getElementById('ud-kinerja')?.value.trim();
  const uploader = document.getElementById('ud-uploader')?.value.trim() || currentRole;
  const dateVal  = document.getElementById('ud-date')?.value || today();
  const fileInput = document.getElementById('ud-file');
  const file      = fileInput?.files[0];

  if (!title) { showToast('Judul wajib diisi', 'danger'); return; }

  const stage = (DB.stages || []).find(s => s.id === window.currentStageId);
  const proj  = DB.projects.find(p => p.id === stage?.project_id);

  const docData = {
    id:          nextId('DOC-', DB.docUploads),
    stage_id:    window.currentStageId,
    project_id:  stage?.project_id || '',
    title,
    caption:     caption || '',
    kinerja_note: kinerja || '',
    uploaded_by: uploader,
    uploaded_at: dateVal,
    type:        file ? (file.type.startsWith('video/') ? 'video' : 'image') : 'image',
    drive_id:    '',
  };

  const saveBtn = document.getElementById('modal-save-btn');
  saveBtn.disabled = true;
  saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan…';

  if (!file) {
    dbAdd('docUploads', docData);
    closeModal();
    navigate('stage-gallery');
    showToast(`Dokumentasi "${title}" disimpan (tanpa file) ✓`, 'success');
    return;
  }

  // Show progress
  const wrap  = document.getElementById('ud-progress-wrap');
  const bar   = document.getElementById('ud-progress-bar');
  const label = document.getElementById('ud-progress-label');
  const pct   = document.getElementById('ud-progress-pct');
  if (wrap) wrap.classList.remove('d-none');

  const setProgress = (v, msg) => {
    if (bar)   bar.style.width   = v + '%';
    if (pct)   pct.textContent   = v + '%';
    if (label) label.textContent = msg || 'Mengunggah…';
  };

  try {
    setProgress(10, 'Menghubungkan ke Google Drive…');
    const fileData = await gdriveUpload(file, stage, proj, setProgress);
    docData.drive_id = fileData.id;
    setProgress(100, 'Upload selesai!');
    dbAdd('docUploads', docData);
    await new Promise(r => setTimeout(r, 500));
    closeModal();
    navigate('stage-gallery');
    showToast(`"${title}" berhasil diunggah ke Google Drive ✓`, 'success');
  } catch (err) {
    console.error(err);
    // Simpan tanpa drive_id, user bisa upload ulang
    dbAdd('docUploads', docData);
    if (wrap) wrap.classList.add('d-none');
    saveBtn.disabled = false;
    saveBtn.innerHTML = '<i class="ti ti-cloud-upload me-1"></i>Upload ke Google Drive';
    showToast('Gagal upload ke Drive — data disimpan lokal. ' + (err.message || ''), 'warning');
    closeModal();
    navigate('stage-gallery');
  }
}

// ── Global helpers used by both pages.js and app.js ──
const ERPApp = { export: exportPage };
