// ===== DEFAULT DATA =====
const DEFAULT_DATA = {
  projects: [
    { id:'PRJ-001', name:'Gedung Perkantoran Sudirman', client:'PT Maju Bersama', kontrak:12500000000, hpp:8420000000, progress:72, start:'2024-09-01', deadline:'2025-08-15', status:'on-track', pm:'Rudi Hartono', workers:12, lokasi:'Jl. Sudirman No.45 Jakarta' },
    { id:'PRJ-002', name:'Ruko BSD City Blok D-7', client:'CV Sentosa Property', kontrak:8200000000, hpp:3100000000, progress:45, start:'2024-12-01', deadline:'2025-09-30', status:'on-track', pm:'Andi Pratama', workers:8, lokasi:'BSD City, Tangerang Selatan' },
    { id:'PRJ-003', name:'Villa Bogor Indah Kav 3', client:'Pak Hendra Susanto', kontrak:4800000000, hpp:2200000000, progress:30, start:'2025-01-15', deadline:'2025-07-01', status:'late', pm:'Bambang W.', workers:6, lokasi:'Bogor, Jawa Barat' },
    { id:'PRJ-004', name:'Warehouse Cibitung Logistik', client:'PT Cibitung Trans', kontrak:21700000000, hpp:18100000000, progress:88, start:'2024-06-01', deadline:'2025-07-10', status:'finishing', pm:'Rudi Hartono', workers:18, lokasi:'Cibitung, Bekasi' },
    { id:'PRJ-005', name:'Perumahan Griya Asri Blok B', client:'PT Griya Nusantara', kontrak:6300000000, hpp:1200000000, progress:18, start:'2025-04-01', deadline:'2025-12-31', status:'on-track', pm:'Andi Pratama', workers:9, lokasi:'Depok, Jawa Barat' },
  ],
  employees: [
    { id:'EMP-001', name:'Agus Santoso', role:'Tukang Batu', project:'PRJ-001', upah:185000, initials:'AS', color:'#1d4ed8', phone:'08123456001', status:'active' },
    { id:'EMP-002', name:'Bambang Wahyu', role:'Tukang Batu', project:'PRJ-001', upah:185000, initials:'BW', color:'#15803d', phone:'08123456002', status:'active' },
    { id:'EMP-003', name:'Suherman Riyanto', role:'Tukang Las', project:'PRJ-004', upah:220000, initials:'SR', color:'#b91c1c', phone:'08123456003', status:'active' },
    { id:'EMP-004', name:'Dedi Kurniawan', role:'Kuli Bangunan', project:'PRJ-003', upah:150000, initials:'DK', color:'#7c3aed', phone:'08123456004', status:'active' },
    { id:'EMP-005', name:'Joko Purnomo', role:'Kuli Bangunan', project:'PRJ-002', upah:150000, initials:'JP', color:'#0d9488', phone:'08123456005', status:'active' },
    { id:'EMP-006', name:'Eko Sulistyo', role:'Tukang Cat', project:'PRJ-002', upah:165000, initials:'ES', color:'#c2410c', phone:'08123456006', status:'active' },
    { id:'EMP-007', name:'Fajar Nugroho', role:'Tukang Besi', project:'PRJ-004', upah:195000, initials:'FN', color:'#0369a1', phone:'08123456007', status:'active' },
    { id:'EMP-008', name:'Gunawan Setiawan', role:'Operator Alat Berat', project:'PRJ-004', upah:250000, initials:'GS', color:'#9333ea', phone:'08123456008', status:'active' },
  ],
  attendance: [
    { id:'ATT-001', emp_id:'EMP-001', name:'Agus Santoso', role:'Tukang Batu', project:'Gedung Sudirman', project_id:'PRJ-001', checkin:'07:12', checkout:'16:45', hours:9.55, upah:185000, status:'approved', gps:true, date:'2025-06-28' },
    { id:'ATT-002', emp_id:'EMP-002', name:'Bambang Wahyu', role:'Tukang Batu', project:'Gedung Sudirman', project_id:'PRJ-001', checkin:'07:30', checkout:'--:--', hours:0, upah:185000, status:'pending', gps:true, date:'2025-06-28' },
    { id:'ATT-003', emp_id:'EMP-003', name:'Suherman Riyanto', role:'Tukang Las', project:'Warehouse Cibitung', project_id:'PRJ-004', checkin:'06:55', checkout:'17:30', hours:10.58, upah:220000, status:'pending', gps:true, date:'2025-06-28' },
    { id:'ATT-004', emp_id:'EMP-004', name:'Dedi Kurniawan', role:'Kuli Bangunan', project:'Villa Bogor', project_id:'PRJ-003', checkin:'08:00', checkout:'17:00', hours:9, upah:150000, status:'approved', gps:true, date:'2025-06-28' },
    { id:'ATT-005', emp_id:'EMP-005', name:'Joko Purnomo', role:'Kuli Bangunan', project:'Ruko BSD', project_id:'PRJ-002', checkin:'08:10', checkout:'16:50', hours:8.67, upah:150000, status:'pending', gps:true, date:'2025-06-28' },
    { id:'ATT-006', emp_id:'EMP-006', name:'Eko Sulistyo', role:'Tukang Cat', project:'Ruko BSD', project_id:'PRJ-002', checkin:'07:45', checkout:'16:30', hours:8.75, upah:165000, status:'pending', gps:true, date:'2025-06-28' },
    { id:'ATT-007', emp_id:'EMP-007', name:'Fajar Nugroho', role:'Tukang Besi', project:'Warehouse Cibitung', project_id:'PRJ-004', checkin:'07:00', checkout:'17:15', hours:10.25, upah:195000, status:'approved', gps:true, date:'2025-06-28' },
    { id:'ATT-008', emp_id:'EMP-008', name:'Gunawan Setiawan', role:'Operator Alat Berat', project:'Warehouse Cibitung', project_id:'PRJ-004', checkin:'06:30', checkout:'--:--', hours:0, upah:250000, status:'pending', gps:true, date:'2025-06-28' },
  ],
  payroll: [
    { id:'PAY-001', emp_id:'EMP-001', name:'Agus Santoso', role:'Tukang Batu', project:'Gedung Sudirman', project_id:'PRJ-001', days:22, upah:185000, lembur:185000, makan:440000, transport:220000, kasbon:500000, potongan:0, status:'pending', initials:'AS', color:'#1d4ed8' },
    { id:'PAY-002', emp_id:'EMP-003', name:'Suherman Riyanto', role:'Tukang Las', project:'Warehouse Cibitung', project_id:'PRJ-004', days:24, upah:220000, lembur:440000, makan:480000, transport:240000, kasbon:0, potongan:0, status:'paid', initials:'SR', color:'#b91c1c' },
    { id:'PAY-003', emp_id:'EMP-004', name:'Dedi Kurniawan', role:'Kuli Bangunan', project:'Villa Bogor', project_id:'PRJ-003', days:20, upah:150000, lembur:0, makan:400000, transport:200000, kasbon:300000, potongan:0, status:'pending', initials:'DK', color:'#7c3aed' },
    { id:'PAY-004', emp_id:'EMP-007', name:'Fajar Nugroho', role:'Tukang Besi', project:'Warehouse Cibitung', project_id:'PRJ-004', days:25, upah:195000, lembur:390000, makan:500000, transport:250000, kasbon:200000, potongan:0, status:'approved', initials:'FN', color:'#0369a1' },
  ],
  stock: [
    { id:'MAT-001', nama:'Semen Portland 40kg', kategori:'Material', qty:45, min:100, satuan:'sak', lokasi:'Rak A-01', harga:55000 },
    { id:'MAT-002', nama:'Besi Beton D13', kategori:'Material', qty:240, min:100, satuan:'batang', lokasi:'Rak B-03', harga:14500 },
    { id:'MAT-003', nama:'Cat Tembok Dulux 25kg', kategori:'Finishing', qty:8, min:20, satuan:'kaleng', lokasi:'Rak C-02', harga:185000 },
    { id:'MAT-004', nama:'Bata Ringan AAC 60x20cm', kategori:'Struktur', qty:850, min:200, satuan:'buah', lokasi:'Area Terbuka', harga:4200 },
    { id:'MAT-005', nama:'Pasir Cor', kategori:'Material', qty:15, min:10, satuan:'m³', lokasi:'Area Terbuka', harga:220000 },
    { id:'MAT-006', nama:'Besi WF 200x100', kategori:'Struktur', qty:12, min:20, satuan:'batang', lokasi:'Rak B-01', harga:840000 },
    { id:'PER-001', nama:'Helm Safety SNI', kategori:'K3', qty:65, min:30, satuan:'buah', lokasi:'Rak D-01', harga:45000 },
    { id:'PER-002', nama:'Rompi Safety', kategori:'K3', qty:42, min:30, satuan:'buah', lokasi:'Rak D-02', harga:35000 },
  ],
  equipment: [
    { id:'ALT-001', name:'Scaffolding Set', total:12, dipinjam:4, kondisi:'Baik', biaya_hari:25000, project:'PRJ-001' },
    { id:'ALT-002', name:'Concrete Mixer 350L', total:3, dipinjam:2, kondisi:'Baik', biaya_hari:150000, project:'PRJ-004' },
    { id:'ALT-003', name:'Mesin Las ESAB 200A', total:5, dipinjam:3, kondisi:'Baik', biaya_hari:75000, project:'PRJ-004' },
    { id:'ALT-004', name:'Stamper Kuda Tanaka', total:4, dipinjam:1, kondisi:'Baik', biaya_hari:50000, project:'PRJ-002' },
    { id:'ALT-005', name:'Tower Crane 10T', total:1, dipinjam:1, kondisi:'Baik', biaya_hari:2500000, project:'PRJ-001' },
    { id:'ALT-006', name:'Excavator Mini CAT', total:2, dipinjam:0, kondisi:'Baik', biaya_hari:1800000, project:null },
  ],
  purchaseRequests: [
    { id:'PR-2025-018', project_id:'PRJ-001', project:'Gedung Sudirman', item:'Semen Portland 40kg', qty:60, satuan:'sak', est_price:3300000, requester:'Mandor Hasan', date:'2025-06-27', status:'pending', urgency:'high' },
    { id:'PR-2025-019', project_id:'PRJ-004', project:'Warehouse Cibitung', item:'Besi WF 200x100', qty:25, satuan:'batang', est_price:21000000, requester:'PM Rudi H.', date:'2025-06-27', status:'pending', urgency:'normal' },
    { id:'PR-2025-020', project_id:'PRJ-002', project:'Ruko BSD', item:'Cat Tembok Dulux 25kg', qty:30, satuan:'kaleng', est_price:5550000, requester:'Mandor Andi', date:'2025-06-28', status:'pending', urgency:'normal' },
    { id:'PR-2025-017', project_id:'PRJ-003', project:'Villa Bogor', item:'Pasir Cor', qty:10, satuan:'m³', est_price:2200000, requester:'Mandor Bambang', date:'2025-06-26', status:'approved', urgency:'high' },
    { id:'PR-2025-016', project_id:'PRJ-004', project:'Warehouse Cibitung', item:'Kawat Las E6013', qty:100, satuan:'kg', est_price:1800000, requester:'PM Rudi H.', date:'2025-06-25', status:'ordered', urgency:'normal' },
  ],
  purchaseOrders: [
    { id:'PO-2025-087', vendor:'Toko Baja Jaya', item:'Besi WF 200x100 — 25 batang', total:21000000, date:'2025-06-28', status:'pending_approval', due:'2025-07-05', project:'PRJ-004' },
    { id:'PO-2025-086', vendor:'CV Bangunan Utama', item:'Semen Portland — 200 sak', total:11000000, date:'2025-06-27', status:'ordered', due:'2025-07-02', project:'PRJ-001' },
    { id:'PO-2025-085', vendor:'PT Material Tama', item:'Pasir Cor 15m³', total:3300000, date:'2025-06-26', status:'received', due:'2025-06-30', project:'PRJ-003' },
    { id:'PO-2025-084', vendor:'Toko Baja Jaya', item:'Besi Beton D13 — 500 btg', total:7250000, date:'2025-06-25', status:'paid', due:'2025-06-28', project:'PRJ-002' },
  ],
  gl: [
    { id:'JNL-001', date:'28/06/25', kode:'6-001', akun:'Biaya Tenaga Kerja', ket:'Gaji Agus S. — Gedung Sudirman', debit:4415000, kredit:0, project:'PRJ-001' },
    { id:'JNL-002', date:'28/06/25', kode:'1-001', akun:'Kas & Bank', ket:'Pembayaran gaji Agus Santoso', debit:0, kredit:4415000, project:'PRJ-001' },
    { id:'JNL-003', date:'27/06/25', kode:'6-003', akun:'Biaya Material', ket:'Pemakaian semen 12 sak — Sudirman', debit:660000, kredit:0, project:'PRJ-001' },
    { id:'JNL-004', date:'27/06/25', kode:'1-004', akun:'Persediaan Stock', ket:'Kurangi stok semen Portland', debit:0, kredit:660000, project:'PRJ-001' },
    { id:'JNL-005', date:'26/06/25', kode:'1-002', akun:'Piutang Usaha', ket:'Invoice Termin 2 — Gedung Sudirman', debit:18500000, kredit:0, project:'PRJ-001' },
    { id:'JNL-006', date:'26/06/25', kode:'4-001', akun:'Pendapatan Proyek', ket:'Tagihan Termin 2 — Sudirman', debit:0, kredit:18500000, project:'PRJ-001' },
    { id:'JNL-007', date:'25/06/25', kode:'6-004', akun:'Biaya Alat', ket:'Scaffolding 5 set × 7 hari', debit:875000, kredit:0, project:'PRJ-002' },
    { id:'JNL-008', date:'25/06/25', kode:'1-003', akun:'Hutang Vendor', ket:'Invoice PT Material Tama PO-085', debit:0, kredit:3300000, project:'PRJ-003' },
    { id:'JNL-009', date:'24/06/25', kode:'1-001', akun:'Kas & Bank', ket:'Bayar Toko Baja Jaya PO-084', debit:0, kredit:7250000, project:'PRJ-002' },
    { id:'JNL-010', date:'24/06/25', kode:'1-003', akun:'Hutang Vendor', ket:'Pelunasan Toko Baja Jaya PO-084', debit:7250000, kredit:0, project:'PRJ-002' },
  ],
  cashflow: [
    { month:'Jan', masuk:28000000000, keluar:22000000000 },
    { month:'Feb', masuk:24000000000, keluar:19500000000 },
    { month:'Mar', masuk:35000000000, keluar:27000000000 },
    { month:'Apr', masuk:31000000000, keluar:25500000000 },
    { month:'Mei', masuk:42000000000, keluar:33000000000 },
    { month:'Jun', masuk:38000000000, keluar:30000000000 },
  ],
  stages: [
    // PRJ-001 Gedung Sudirman (progress 72%)
    { id:'STG-001', project_id:'PRJ-001', name:'Pekerjaan Tanah & Pondasi',       desc:'Galian tanah, urugan, dan bored pile 48 titik diameter 60cm',      order:1, status:'done',         target_pct:15, actual_pct:15, start:'2024-09-01', deadline:'2024-10-15' },
    { id:'STG-002', project_id:'PRJ-001', name:'Basement & Struktur Bawah',        desc:'Konstruksi basement, pile cap, raft slab, dan dinding penahan',     order:2, status:'done',         target_pct:20, actual_pct:19, start:'2024-10-16', deadline:'2024-12-15' },
    { id:'STG-003', project_id:'PRJ-001', name:'Struktur Atas Lantai 1–4',         desc:'Cor kolom, balok, dan plat lantai 1 sampai 4, mutu K-400',          order:3, status:'done',         target_pct:22, actual_pct:22, start:'2024-12-16', deadline:'2025-03-15' },
    { id:'STG-004', project_id:'PRJ-001', name:'Struktur Atas Lantai 5–8',         desc:'Cor kolom, balok, dan plat lantai 5 sampai 8',                      order:4, status:'in-progress',  target_pct:18, actual_pct:12, start:'2025-03-16', deadline:'2025-06-30' },
    { id:'STG-005', project_id:'PRJ-001', name:'MEP & Finishing Interior',          desc:'Instalasi ME/plumbing, dinding partisi, plafond, keramik lantai',   order:5, status:'pending',      target_pct:15, actual_pct:0,  start:'2025-05-01', deadline:'2025-07-31' },
    { id:'STG-006', project_id:'PRJ-001', name:'Eksterior, Facade & Landscape',    desc:'Fasad kaca curtain wall, parkir, taman, commissioning & serah terima',order:6, status:'pending',     target_pct:10, actual_pct:0,  start:'2025-07-01', deadline:'2025-08-15' },
    // PRJ-004 Warehouse Cibitung (progress 88%)
    { id:'STG-007', project_id:'PRJ-004', name:'Persiapan & Land Clearing',        desc:'Mobilisasi, pagar proyek, gudang material, land clearing',           order:1, status:'done',         target_pct:5,  actual_pct:5,  start:'2024-06-01', deadline:'2024-06-30' },
    { id:'STG-008', project_id:'PRJ-004', name:'Pondasi Tiang Pancang',            desc:'Pemancangan 120 titik, pile cap, dan tie beam',                      order:2, status:'done',         target_pct:20, actual_pct:20, start:'2024-07-01', deadline:'2024-08-31' },
    { id:'STG-009', project_id:'PRJ-004', name:'Fabrikasi & Erection Baja',        desc:'Rangka baja utama WF 400, kolom, balok, gording, bracing',           order:3, status:'done',         target_pct:35, actual_pct:35, start:'2024-09-01', deadline:'2024-12-31' },
    { id:'STG-010', project_id:'PRJ-004', name:'Atap Spandek & Dinding Cladding', desc:'Pemasangan atap spandek 0.5mm, wall cladding, skylight poly',        order:4, status:'done',         target_pct:22, actual_pct:20, start:'2025-01-01', deadline:'2025-04-30' },
    { id:'STG-011', project_id:'PRJ-004', name:'MEP, Floor Hardener & Finishing',  desc:'Instalasi listrik, plumbing, floor hardener, cat dinding & kolom',   order:5, status:'in-progress',  target_pct:18, actual_pct:8,  start:'2025-04-01', deadline:'2025-07-10' },
    // PRJ-002 Ruko BSD (progress 45%)
    { id:'STG-012', project_id:'PRJ-002', name:'Pekerjaan Pondasi Ruko',           desc:'Galian, urugan, pondasi footplate beton bertulang',                  order:1, status:'done',         target_pct:20, actual_pct:20, start:'2024-12-01', deadline:'2025-01-15' },
    { id:'STG-013', project_id:'PRJ-002', name:'Struktur Beton Ruko',              desc:'Kolom, balok, plat lantai 1 dan 2, tangga beton',                    order:2, status:'in-progress',  target_pct:40, actual_pct:25, start:'2025-01-16', deadline:'2025-04-30' },
    { id:'STG-014', project_id:'PRJ-002', name:'Dinding, Plafond & Finishing',     desc:'Pasang bata, plester, plafond, keramik, cat interior & eksterior',   order:3, status:'pending',      target_pct:25, actual_pct:0,  start:'2025-04-01', deadline:'2025-08-31' },
    { id:'STG-015', project_id:'PRJ-002', name:'MEP & Pekerjaan Luar',             desc:'Instalasi listrik, AC, plumbing, pagar, parkir, taman',              order:4, status:'pending',      target_pct:15, actual_pct:0,  start:'2025-08-01', deadline:'2025-09-30' },
  ],
  docUploads: [
    // PRJ-001 STG-001
    { id:'DOC-001', stage_id:'STG-001', project_id:'PRJ-001', title:'Galian Bored Pile Selesai',       caption:'Galian bored pile diameter 60cm kedalaman 18m. Total 48 titik selesai 100%. Tanah keras sesuai hasil soil test dan NSPT.',              type:'image', drive_id:'', uploaded_by:'Mandor Hasan',  uploaded_at:'2024-09-18', kinerja_note:'Selesai H-3 dari jadwal, cuaca mendukung' },
    { id:'DOC-002', stage_id:'STG-001', project_id:'PRJ-001', title:'Pengecoran Bored Pile',           caption:'Pengecoran bored pile menggunakan ready mix K-350. Slump test 12cm OK. Semua 48 titik sudah dicor menggunakan pipa tremie.',           type:'image', drive_id:'', uploaded_by:'PM Rudi H.',    uploaded_at:'2024-10-02', kinerja_note:'Kualitas beton sesuai spec, tidak ada reject' },
    // PRJ-001 STG-002
    { id:'DOC-003', stage_id:'STG-002', project_id:'PRJ-001', title:'Pembesian Pile Cap Zone A',       caption:'Pembesian pile cap zone A selesai menggunakan besi D25 sesuai shop drawing. Menunggu bekisting dan pengecoran.',                        type:'image', drive_id:'', uploaded_by:'Mandor Hasan',  uploaded_at:'2024-11-05', kinerja_note:'Zone A selesai, sedang lanjut zone B dan C' },
    { id:'DOC-004', stage_id:'STG-002', project_id:'PRJ-001', title:'Raft Slab Basement Cor',          caption:'Pengecoran raft slab basement area parkir bawah tanah. Volume beton ±840m³, menggunakan 4 unit concrete pump simultan.',               type:'image', drive_id:'', uploaded_by:'PM Rudi H.',    uploaded_at:'2024-12-01', kinerja_note:'Pengecoran massal selesai dalam 1 shift, tidak ada cold joint' },
    // PRJ-001 STG-003
    { id:'DOC-005', stage_id:'STG-003', project_id:'PRJ-001', title:'Cor Kolom Lantai 2 Zona B',       caption:'Pengecoran kolom lantai 2 zona B menggunakan pump concrete. Mutu beton K-400. Beton sudah dibuka bekisting, permukaan baik.',            type:'image', drive_id:'', uploaded_by:'PM Rudi H.',    uploaded_at:'2025-01-20', kinerja_note:'Progress sesuai schedule, kualitas baik' },
    { id:'DOC-006', stage_id:'STG-003', project_id:'PRJ-001', title:'Video Timelapse Progress Lt. 3',  caption:'Video timelapse pekerjaan lantai 3 selama 2 minggu. Semua kolom sudah dicor, sedang pekerjaan pembesian balok dan plat lantai.',       type:'video', drive_id:'', uploaded_by:'PM Rudi H.',    uploaded_at:'2025-02-20', kinerja_note:'Pekerjaan lantai 3 sudah 85%, estimasi selesai minggu depan' },
    { id:'DOC-007', stage_id:'STG-003', project_id:'PRJ-001', title:'Plat Lantai 4 Pengecoran',        caption:'Pengecoran plat lantai 4 menggunakan ready mix K-400 dengan aditif waterproofing. Luas ±1.200m², volume beton ±180m³.',               type:'image', drive_id:'', uploaded_by:'Mandor Hasan',  uploaded_at:'2025-03-10', kinerja_note:'Selesai tepat waktu, cuaca cerah mendukung pengecoran' },
    // PRJ-001 STG-004
    { id:'DOC-008', stage_id:'STG-004', project_id:'PRJ-001', title:'Pembesian Kolom Lt. 5 Zona A',    caption:'Pembesian kolom lantai 5 zona A menggunakan besi D25 dan D19. Sudah terpasang 12 dari 18 kolom, menunggu bekisting.',                  type:'image', drive_id:'', uploaded_by:'Mandor Hasan',  uploaded_at:'2025-04-10', kinerja_note:'Progres 70% zona ini, deviasi -6% dari target' },
    { id:'DOC-009', stage_id:'STG-004', project_id:'PRJ-001', title:'Progress Lt. 6 Minggu Ini',       caption:'Update progress lantai 6. Bekisting kolom sudah terpasang, menunggu giliran pengecoran. Kendala: delivery besi sempat terlambat 3 hari.',type:'image', drive_id:'', uploaded_by:'PM Rudi H.',    uploaded_at:'2025-05-05', kinerja_note:'Delay 3 hari akibat keterlambatan material, sudah dikompensasi' },
    // PRJ-004 STG-008
    { id:'DOC-010', stage_id:'STG-008', project_id:'PRJ-004', title:'Pemancangan 120 Titik Selesai',   caption:'Pemancangan 120 titik tiang pancang spun pile Ø 40cm selesai 100%. Kedalaman rata-rata 24m, final set sesuai spesifikasi teknis.',      type:'image', drive_id:'', uploaded_by:'PM Rudi H.',    uploaded_at:'2024-08-25', kinerja_note:'Selesai tepat waktu, 0 tiang reject dari total 120 titik' },
    // PRJ-004 STG-009
    { id:'DOC-011', stage_id:'STG-009', project_id:'PRJ-004', title:'Erection Kolom Baja WF 400',      caption:'Erection 48 kolom baja WF 400×200 selesai 100%. Semua sambungan las sudah diinspeksi oleh inspector internal dan sudah sesuai standar.', type:'image', drive_id:'', uploaded_by:'Mandor Andi',   uploaded_at:'2024-11-20', kinerja_note:'Inspeksi las: 0 defect, semua passed NDT' },
    { id:'DOC-012', stage_id:'STG-009', project_id:'PRJ-004', title:'Video Erection Balok & Gording',  caption:'Video dokumentasi erection balok induk dan gording roof frame warehouse. Progress rangka atap sudah 90%, estimasi selesai dalam 2 minggu.',type:'video', drive_id:'', uploaded_by:'PM Rudi H.',    uploaded_at:'2024-12-15', kinerja_note:'Mundur 4 hari akibat hujan, sudah dikejar dengan lembur' },
    // PRJ-004 STG-010
    { id:'DOC-013', stage_id:'STG-010', project_id:'PRJ-004', title:'Pemasangan Atap Spandek 70%',     caption:'Pemasangan atap spandek 0.5mm progress 70%. Menggunakan self-drilling screw dan sealant pada sambungan. Estimasi selesai akhir bulan.',  type:'image', drive_id:'', uploaded_by:'Mandor Andi',   uploaded_at:'2025-03-10', kinerja_note:'Progress baik, cuaca mendukung. On track dengan schedule' },
    { id:'DOC-014', stage_id:'STG-010', project_id:'PRJ-004', title:'Video Pasang Wall Cladding',       caption:'Video pemasangan wall cladding panel baja sisi utara warehouse. Ketebalan 0.5mm galvalum. Progress cladding 60% dari total area.',        type:'video', drive_id:'', uploaded_by:'Mandor Andi',   uploaded_at:'2025-04-01', kinerja_note:'Pemasangan rapi sesuai gambar, diverifikasi oleh PM dan pengawas MK' },
    // PRJ-002 STG-012
    { id:'DOC-015', stage_id:'STG-012', project_id:'PRJ-002', title:'Cor Pondasi Footplate Ruko',       caption:'Pengecoran pondasi footplate 24 titik selesai. Mutu beton K-250. Semua titik sudah dicor menggunakan truck mixer dan bucket concrete.',   type:'image', drive_id:'', uploaded_by:'PM Andi P.',    uploaded_at:'2025-01-12', kinerja_note:'Selesai sesuai jadwal, tidak ada masalah teknis' },
    // PRJ-002 STG-013
    { id:'DOC-016', stage_id:'STG-013', project_id:'PRJ-002', title:'Kolom Lantai 1 Ruko Progress',    caption:'Pengecoran kolom lantai 1 sudah selesai 8 unit dari 12 unit ruko. Progress 67%. Sedang persiapan bekisting balok dan plat lantai 1.',      type:'image', drive_id:'', uploaded_by:'Mandor Hasan',  uploaded_at:'2025-03-05', kinerja_note:'Progress sedikit di bawah target, dikejar dengan tambah shift sore' },
  ],
};

// ===== DB (live, mutable) =====
const DB = {};
const LS_KEY = 'afss_erp_v25';

function initDB() {
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge: use saved data but fill any missing keys from defaults
      Object.keys(DEFAULT_DATA).forEach(k => {
        DB[k] = parsed[k] !== undefined ? parsed[k] : JSON.parse(JSON.stringify(DEFAULT_DATA[k]));
      });
    } else {
      resetToDefaults();
    }
  } catch (e) {
    resetToDefaults();
  }
}

function resetToDefaults() {
  Object.keys(DEFAULT_DATA).forEach(k => {
    DB[k] = JSON.parse(JSON.stringify(DEFAULT_DATA[k]));
  });
}

function saveDB() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(DB)); } catch(e) {}
}

function resetDB() {
  showConfirm('Reset Data Demo?', 'Semua perubahan dan input akan dikembalikan ke data awal. Lanjutkan?', () => {
    localStorage.removeItem(LS_KEY);
    location.reload();
  });
}

// ===== CRUD =====
function dbAdd(table, item) { DB[table].push(item); saveDB(); }

function dbUpdate(table, id, updates) {
  const idx = DB[table].findIndex(r => r.id === id);
  if (idx >= 0) { Object.assign(DB[table][idx], updates); saveDB(); }
}

function dbDelete(table, id) {
  DB[table] = DB[table].filter(r => r.id !== id);
  saveDB();
}

// Generate IDs
function nextId(prefix, table) {
  const nums = DB[table].map(r => parseInt((r.id || '0').replace(/\D+/g,''))).filter(n => !isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return prefix + String(next).padStart(3, '0');
}

// ===== HELPERS =====
function fmt(n) {
  if (n >= 1000000000) return 'Rp ' + (n/1000000000).toFixed(1).replace(/\.0$/,'') + 'M';
  if (n >= 1000000)    return 'Rp ' + (n/1000000).toFixed(1).replace(/\.0$/,'') + 'Jt';
  if (n >= 1000)       return 'Rp ' + Math.round(n/1000) + 'K';
  return 'Rp ' + (n||0).toLocaleString('id');
}
function fmtFull(n) { return 'Rp ' + (n||0).toLocaleString('id-ID'); }
function fmtDate(d) {
  if (!d) return '-';
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
  const [y,mo,day] = d.split('-');
  return `${parseInt(day)} ${m[parseInt(mo)-1]} ${y}`;
}
function today() { return new Date().toISOString().split('T')[0]; }

function statusBadge(s) {
  const map = {
    'on-track':['badge-blue','On Track'],
    'late':['badge-red','⚠ Terlambat'],
    'finishing':['badge-amber','Hampir Selesai'],
    'done':['badge-green','Selesai'],
    'pending':['badge-amber','Pending'],
    'pending_approval':['badge-amber','Menunggu Approval'],
    'approved':['badge-green','Disetujui'],
    'paid':['badge-green','Lunas'],
    'ordered':['badge-blue','Dipesan'],
    'received':['badge-navy','Diterima'],
    'rejected':['badge-red','Ditolak'],
    'active':['badge-green','Aktif'],
    'inactive':['badge-gray','Nonaktif'],
    'high':['badge-red','Urgen'],
    'normal':['badge-gray','Normal'],
  };
  const [cls, label] = map[s] || ['badge-gray', s];
  return `<span class="${cls}">${label}</span>`;
}

function progressColor(p) {
  if (p >= 80) return 'pb-green';
  if (p >= 50) return 'pb-blue';
  if (p >= 30) return 'pb-amber';
  return 'pb-red';
}

function stockStatus(item) {
  if (item.qty <= item.min * 0.5) return ['text-red-600 font-bold', 'badge-red', 'Kritis'];
  if (item.qty <= item.min)       return ['text-amber-600 font-bold', 'badge-amber', 'Hampir Habis'];
  return ['text-emerald-600 font-semibold', 'badge-green', 'Aman'];
}

function payrollNet(p) {
  return (p.days * p.upah) + (p.lembur||0) + (p.makan||0) + (p.transport||0) - (p.kasbon||0) - (p.potongan||0);
}

function empColor(emp) {
  const colors = ['#1d4ed8','#15803d','#b91c1c','#7c3aed','#0d9488','#c2410c','#0369a1','#9333ea','#d97706','#be185d'];
  const idx = parseInt((emp.id||'').replace(/\D/g,'')) % colors.length;
  return emp.color || colors[idx] || '#475569';
}
