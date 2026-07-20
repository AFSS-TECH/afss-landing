-- ERP Kontraktor portfolio demo — real backend for public/portofolio/erp/kontraktor
--
-- This project's auth.users has a trigger owned by another, unrelated
-- production app (dsd_profiles) that fails for users with no email — so
-- Supabase Auth (including anonymous sign-in) is intentionally NOT used here.
-- Instead each visitor gets a random visitor_id generated client-side
-- (localStorage), and RLS is permissive (using(true)) — this is throwaway
-- public demo data, isolation is enforced at the app query level (every
-- select/update/delete filters by visitor_id), not cryptographically.
--
-- Run once in the Supabase SQL editor (or `supabase db execute -f` after linking
-- the project with the CLI).

create table if not exists erp_demo_projects (
  visitor_id text not null,
  id         text not null,
  name       text not null,
  client     text,
  kontrak    bigint default 0,
  hpp        bigint default 0,
  progress   int default 0,
  start      date,
  deadline   date,
  status     text,
  pm         text,
  workers    int default 0,
  lokasi     text,
  created_at timestamptz not null default now(),
  primary key (visitor_id, id)
);

create table if not exists erp_demo_employees (
  visitor_id text not null,
  id         text not null,
  name       text not null,
  role       text,
  project    text,
  upah       bigint default 0,
  initials   text,
  color      text,
  phone      text,
  status     text,
  created_at timestamptz not null default now(),
  primary key (visitor_id, id)
);

create table if not exists erp_demo_attendance (
  visitor_id text not null,
  id         text not null,
  emp_id     text,
  name       text,
  role       text,
  project    text,
  project_id text,
  checkin    text,
  checkout   text,
  hours      numeric default 0,
  upah       bigint default 0,
  status     text,
  gps        boolean default false,
  date       date,
  created_at timestamptz not null default now(),
  primary key (visitor_id, id)
);

create table if not exists erp_demo_payroll (
  visitor_id text not null,
  id         text not null,
  emp_id     text,
  name       text,
  role       text,
  project    text,
  project_id text,
  days       int default 0,
  upah       bigint default 0,
  lembur     bigint default 0,
  makan      bigint default 0,
  transport  bigint default 0,
  kasbon     bigint default 0,
  potongan   bigint default 0,
  status     text,
  initials   text,
  color      text,
  created_at timestamptz not null default now(),
  primary key (visitor_id, id)
);

create table if not exists erp_demo_stock (
  visitor_id text not null,
  id         text not null,
  nama       text not null,
  kategori   text,
  qty        int default 0,
  min        int default 0,
  satuan     text,
  lokasi     text,
  harga      bigint default 0,
  created_at timestamptz not null default now(),
  primary key (visitor_id, id)
);

create table if not exists erp_demo_equipment (
  visitor_id text not null,
  id         text not null,
  name       text not null,
  total      int default 0,
  dipinjam   int default 0,
  kondisi    text,
  biaya_hari bigint default 0,
  project    text,
  created_at timestamptz not null default now(),
  primary key (visitor_id, id)
);

create table if not exists erp_demo_purchase_requests (
  visitor_id text not null,
  id         text not null,
  project_id text,
  project    text,
  item       text,
  qty        int default 0,
  satuan     text,
  est_price  bigint default 0,
  requester  text,
  date       date,
  status     text,
  urgency    text,
  created_at timestamptz not null default now(),
  primary key (visitor_id, id)
);

create table if not exists erp_demo_purchase_orders (
  visitor_id text not null,
  id         text not null,
  vendor     text,
  item       text,
  total      bigint default 0,
  date       date,
  status     text,
  due        date,
  project    text,
  created_at timestamptz not null default now(),
  primary key (visitor_id, id)
);

create table if not exists erp_demo_gl (
  visitor_id text not null,
  id         text not null,
  date       text,
  kode       text,
  akun       text,
  ket        text,
  debit      bigint default 0,
  kredit     bigint default 0,
  project    text,
  created_at timestamptz not null default now(),
  primary key (visitor_id, id)
);

create table if not exists erp_demo_cashflow (
  visitor_id text not null,
  id         uuid not null default gen_random_uuid(),
  month      text,
  masuk      bigint default 0,
  keluar     bigint default 0,
  created_at timestamptz not null default now(),
  primary key (visitor_id, id)
);

create table if not exists erp_demo_stages (
  visitor_id  text not null,
  id          text not null,
  project_id  text,
  name        text,
  description text,
  "order"     int default 0,
  status      text,
  target_pct  int default 0,
  actual_pct  int default 0,
  start       date,
  deadline    date,
  created_at  timestamptz not null default now(),
  primary key (visitor_id, id)
);

create table if not exists erp_demo_doc_uploads (
  visitor_id    text not null,
  id            text not null,
  stage_id      text,
  project_id    text,
  title         text,
  caption       text,
  type          text,
  drive_id      text,
  thumb_url     text,
  uploaded_by   text,
  uploaded_at   date,
  kinerja_note  text,
  created_at    timestamptz not null default now(),
  primary key (visitor_id, id)
);

-- RLS is enabled for hygiene but permissive (no Supabase Auth identity to check
-- against — see header note). Isolation between visitors is enforced by the
-- app always filtering/writing with visitor_id, not by this policy.
do $$
declare
  t text;
begin
  foreach t in array array[
    'erp_demo_projects','erp_demo_employees','erp_demo_attendance','erp_demo_payroll',
    'erp_demo_stock','erp_demo_equipment','erp_demo_purchase_requests','erp_demo_purchase_orders',
    'erp_demo_gl','erp_demo_cashflow','erp_demo_stages','erp_demo_doc_uploads'
  ]
  loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "owner_all" on %I', t);
    execute format('drop policy if exists "visitor_all" on %I', t);
    execute format(
      'create policy "visitor_all" on %I for all using (true) with check (true)',
      t
    );
  end loop;
end $$;


-- Reference demo dataset — matches js/data.js DEFAULT_DATA exactly.
-- Seeded under a fixed reference visitor_id so you can verify the schema/data
-- in the table editor after running this script. The LIVE app does NOT read
-- these rows — each real visitor gets their own isolated copy of this same
-- dataset, auto-seeded by js/data.js (seedDefaults()) on first load, scoped
-- to their own browser-generated visitor_id. This block just keeps a
-- durable, query-able copy in sync.
do $$
declare
  ref_owner text := '00000000-0000-0000-0000-000000000000';
begin
  delete from erp_demo_projects where visitor_id = ref_owner;
  insert into erp_demo_projects (visitor_id, id, name, client, kontrak, hpp, progress, start, deadline, status, pm, workers, lokasi) values
    (ref_owner, 'PRJ-001', 'Gedung Perkantoran Sudirman', 'PT Maju Bersama', 12500000000, 8420000000, 72, '2024-09-01', '2025-08-15', 'on-track', 'Rudi Hartono', 12, 'Jl. Sudirman No.45 Jakarta'),
    (ref_owner, 'PRJ-002', 'Ruko BSD City Blok D-7', 'CV Sentosa Property', 8200000000, 3100000000, 45, '2024-12-01', '2025-09-30', 'on-track', 'Andi Pratama', 8, 'BSD City, Tangerang Selatan'),
    (ref_owner, 'PRJ-003', 'Villa Bogor Indah Kav 3', 'Pak Hendra Susanto', 4800000000, 2200000000, 30, '2025-01-15', '2025-07-01', 'late', 'Bambang W.', 6, 'Bogor, Jawa Barat'),
    (ref_owner, 'PRJ-004', 'Warehouse Cibitung Logistik', 'PT Cibitung Trans', 21700000000, 18100000000, 88, '2024-06-01', '2025-07-10', 'finishing', 'Rudi Hartono', 18, 'Cibitung, Bekasi'),
    (ref_owner, 'PRJ-005', 'Perumahan Griya Asri Blok B', 'PT Griya Nusantara', 6300000000, 1200000000, 18, '2025-04-01', '2025-12-31', 'on-track', 'Andi Pratama', 9, 'Depok, Jawa Barat');
  delete from erp_demo_employees where visitor_id = ref_owner;
  insert into erp_demo_employees (visitor_id, id, name, role, project, upah, initials, color, phone, status) values
    (ref_owner, 'EMP-001', 'Agus Santoso', 'Tukang Batu', 'PRJ-001', 185000, 'AS', '#1d4ed8', '08123456001', 'active'),
    (ref_owner, 'EMP-002', 'Bambang Wahyu', 'Tukang Batu', 'PRJ-001', 185000, 'BW', '#15803d', '08123456002', 'active'),
    (ref_owner, 'EMP-003', 'Suherman Riyanto', 'Tukang Las', 'PRJ-004', 220000, 'SR', '#b91c1c', '08123456003', 'active'),
    (ref_owner, 'EMP-004', 'Dedi Kurniawan', 'Kuli Bangunan', 'PRJ-003', 150000, 'DK', '#7c3aed', '08123456004', 'active'),
    (ref_owner, 'EMP-005', 'Joko Purnomo', 'Kuli Bangunan', 'PRJ-002', 150000, 'JP', '#0d9488', '08123456005', 'active'),
    (ref_owner, 'EMP-006', 'Eko Sulistyo', 'Tukang Cat', 'PRJ-002', 165000, 'ES', '#c2410c', '08123456006', 'active'),
    (ref_owner, 'EMP-007', 'Fajar Nugroho', 'Tukang Besi', 'PRJ-004', 195000, 'FN', '#0369a1', '08123456007', 'active'),
    (ref_owner, 'EMP-008', 'Gunawan Setiawan', 'Operator Alat Berat', 'PRJ-004', 250000, 'GS', '#9333ea', '08123456008', 'active');
  delete from erp_demo_attendance where visitor_id = ref_owner;
  insert into erp_demo_attendance (visitor_id, id, emp_id, name, role, project, project_id, checkin, checkout, hours, upah, status, gps, date) values
    (ref_owner, 'ATT-001', 'EMP-001', 'Agus Santoso', 'Tukang Batu', 'Gedung Sudirman', 'PRJ-001', '07:12', '16:45', 9.55, 185000, 'approved', true, '2025-06-28'),
    (ref_owner, 'ATT-002', 'EMP-002', 'Bambang Wahyu', 'Tukang Batu', 'Gedung Sudirman', 'PRJ-001', '07:30', '--:--', 0, 185000, 'pending', true, '2025-06-28'),
    (ref_owner, 'ATT-003', 'EMP-003', 'Suherman Riyanto', 'Tukang Las', 'Warehouse Cibitung', 'PRJ-004', '06:55', '17:30', 10.58, 220000, 'pending', true, '2025-06-28'),
    (ref_owner, 'ATT-004', 'EMP-004', 'Dedi Kurniawan', 'Kuli Bangunan', 'Villa Bogor', 'PRJ-003', '08:00', '17:00', 9, 150000, 'approved', true, '2025-06-28'),
    (ref_owner, 'ATT-005', 'EMP-005', 'Joko Purnomo', 'Kuli Bangunan', 'Ruko BSD', 'PRJ-002', '08:10', '16:50', 8.67, 150000, 'pending', true, '2025-06-28'),
    (ref_owner, 'ATT-006', 'EMP-006', 'Eko Sulistyo', 'Tukang Cat', 'Ruko BSD', 'PRJ-002', '07:45', '16:30', 8.75, 165000, 'pending', true, '2025-06-28'),
    (ref_owner, 'ATT-007', 'EMP-007', 'Fajar Nugroho', 'Tukang Besi', 'Warehouse Cibitung', 'PRJ-004', '07:00', '17:15', 10.25, 195000, 'approved', true, '2025-06-28'),
    (ref_owner, 'ATT-008', 'EMP-008', 'Gunawan Setiawan', 'Operator Alat Berat', 'Warehouse Cibitung', 'PRJ-004', '06:30', '--:--', 0, 250000, 'pending', true, '2025-06-28');
  delete from erp_demo_payroll where visitor_id = ref_owner;
  insert into erp_demo_payroll (visitor_id, id, emp_id, name, role, project, project_id, days, upah, lembur, makan, transport, kasbon, potongan, status, initials, color) values
    (ref_owner, 'PAY-001', 'EMP-001', 'Agus Santoso', 'Tukang Batu', 'Gedung Sudirman', 'PRJ-001', 22, 185000, 185000, 440000, 220000, 500000, 0, 'pending', 'AS', '#1d4ed8'),
    (ref_owner, 'PAY-002', 'EMP-003', 'Suherman Riyanto', 'Tukang Las', 'Warehouse Cibitung', 'PRJ-004', 24, 220000, 440000, 480000, 240000, 0, 0, 'paid', 'SR', '#b91c1c'),
    (ref_owner, 'PAY-003', 'EMP-004', 'Dedi Kurniawan', 'Kuli Bangunan', 'Villa Bogor', 'PRJ-003', 20, 150000, 0, 400000, 200000, 300000, 0, 'pending', 'DK', '#7c3aed'),
    (ref_owner, 'PAY-004', 'EMP-007', 'Fajar Nugroho', 'Tukang Besi', 'Warehouse Cibitung', 'PRJ-004', 25, 195000, 390000, 500000, 250000, 200000, 0, 'approved', 'FN', '#0369a1');
  delete from erp_demo_stock where visitor_id = ref_owner;
  insert into erp_demo_stock (visitor_id, id, nama, kategori, qty, min, satuan, lokasi, harga) values
    (ref_owner, 'MAT-001', 'Semen Portland 40kg', 'Material', 45, 100, 'sak', 'Rak A-01', 55000),
    (ref_owner, 'MAT-002', 'Besi Beton D13', 'Material', 240, 100, 'batang', 'Rak B-03', 14500),
    (ref_owner, 'MAT-003', 'Cat Tembok Dulux 25kg', 'Finishing', 8, 20, 'kaleng', 'Rak C-02', 185000),
    (ref_owner, 'MAT-004', 'Bata Ringan AAC 60x20cm', 'Struktur', 850, 200, 'buah', 'Area Terbuka', 4200),
    (ref_owner, 'MAT-005', 'Pasir Cor', 'Material', 15, 10, 'm³', 'Area Terbuka', 220000),
    (ref_owner, 'MAT-006', 'Besi WF 200x100', 'Struktur', 12, 20, 'batang', 'Rak B-01', 840000),
    (ref_owner, 'PER-001', 'Helm Safety SNI', 'K3', 65, 30, 'buah', 'Rak D-01', 45000),
    (ref_owner, 'PER-002', 'Rompi Safety', 'K3', 42, 30, 'buah', 'Rak D-02', 35000);
  delete from erp_demo_equipment where visitor_id = ref_owner;
  insert into erp_demo_equipment (visitor_id, id, name, total, dipinjam, kondisi, biaya_hari, project) values
    (ref_owner, 'ALT-001', 'Scaffolding Set', 12, 4, 'Baik', 25000, 'PRJ-001'),
    (ref_owner, 'ALT-002', 'Concrete Mixer 350L', 3, 2, 'Baik', 150000, 'PRJ-004'),
    (ref_owner, 'ALT-003', 'Mesin Las ESAB 200A', 5, 3, 'Baik', 75000, 'PRJ-004'),
    (ref_owner, 'ALT-004', 'Stamper Kuda Tanaka', 4, 1, 'Baik', 50000, 'PRJ-002'),
    (ref_owner, 'ALT-005', 'Tower Crane 10T', 1, 1, 'Baik', 2500000, 'PRJ-001'),
    (ref_owner, 'ALT-006', 'Excavator Mini CAT', 2, 0, 'Baik', 1800000, NULL);
  delete from erp_demo_purchase_requests where visitor_id = ref_owner;
  insert into erp_demo_purchase_requests (visitor_id, id, project_id, project, item, qty, satuan, est_price, requester, date, status, urgency) values
    (ref_owner, 'PR-2025-018', 'PRJ-001', 'Gedung Sudirman', 'Semen Portland 40kg', 60, 'sak', 3300000, 'Mandor Hasan', '2025-06-27', 'pending', 'high'),
    (ref_owner, 'PR-2025-019', 'PRJ-004', 'Warehouse Cibitung', 'Besi WF 200x100', 25, 'batang', 21000000, 'PM Rudi H.', '2025-06-27', 'pending', 'normal'),
    (ref_owner, 'PR-2025-020', 'PRJ-002', 'Ruko BSD', 'Cat Tembok Dulux 25kg', 30, 'kaleng', 5550000, 'Mandor Andi', '2025-06-28', 'pending', 'normal'),
    (ref_owner, 'PR-2025-017', 'PRJ-003', 'Villa Bogor', 'Pasir Cor', 10, 'm³', 2200000, 'Mandor Bambang', '2025-06-26', 'approved', 'high'),
    (ref_owner, 'PR-2025-016', 'PRJ-004', 'Warehouse Cibitung', 'Kawat Las E6013', 100, 'kg', 1800000, 'PM Rudi H.', '2025-06-25', 'ordered', 'normal');
  delete from erp_demo_purchase_orders where visitor_id = ref_owner;
  insert into erp_demo_purchase_orders (visitor_id, id, vendor, item, total, date, status, due, project) values
    (ref_owner, 'PO-2025-087', 'Toko Baja Jaya', 'Besi WF 200x100 — 25 batang', 21000000, '2025-06-28', 'pending_approval', '2025-07-05', 'PRJ-004'),
    (ref_owner, 'PO-2025-086', 'CV Bangunan Utama', 'Semen Portland — 200 sak', 11000000, '2025-06-27', 'ordered', '2025-07-02', 'PRJ-001'),
    (ref_owner, 'PO-2025-085', 'PT Material Tama', 'Pasir Cor 15m³', 3300000, '2025-06-26', 'received', '2025-06-30', 'PRJ-003'),
    (ref_owner, 'PO-2025-084', 'Toko Baja Jaya', 'Besi Beton D13 — 500 btg', 7250000, '2025-06-25', 'paid', '2025-06-28', 'PRJ-002');
  delete from erp_demo_gl where visitor_id = ref_owner;
  insert into erp_demo_gl (visitor_id, id, date, kode, akun, ket, debit, kredit, project) values
    (ref_owner, 'JNL-001', '28/06/25', '6-001', 'Biaya Tenaga Kerja', 'Gaji Agus S. — Gedung Sudirman', 4415000, 0, 'PRJ-001'),
    (ref_owner, 'JNL-002', '28/06/25', '1-001', 'Kas & Bank', 'Pembayaran gaji Agus Santoso', 0, 4415000, 'PRJ-001'),
    (ref_owner, 'JNL-003', '27/06/25', '6-003', 'Biaya Material', 'Pemakaian semen 12 sak — Sudirman', 660000, 0, 'PRJ-001'),
    (ref_owner, 'JNL-004', '27/06/25', '1-004', 'Persediaan Stock', 'Kurangi stok semen Portland', 0, 660000, 'PRJ-001'),
    (ref_owner, 'JNL-005', '26/06/25', '1-002', 'Piutang Usaha', 'Invoice Termin 2 — Gedung Sudirman', 18500000, 0, 'PRJ-001'),
    (ref_owner, 'JNL-006', '26/06/25', '4-001', 'Pendapatan Proyek', 'Tagihan Termin 2 — Sudirman', 0, 18500000, 'PRJ-001'),
    (ref_owner, 'JNL-007', '25/06/25', '6-004', 'Biaya Alat', 'Scaffolding 5 set × 7 hari', 875000, 0, 'PRJ-002'),
    (ref_owner, 'JNL-008', '25/06/25', '1-003', 'Hutang Vendor', 'Invoice PT Material Tama PO-085', 0, 3300000, 'PRJ-003'),
    (ref_owner, 'JNL-009', '24/06/25', '1-001', 'Kas & Bank', 'Bayar Toko Baja Jaya PO-084', 0, 7250000, 'PRJ-002'),
    (ref_owner, 'JNL-010', '24/06/25', '1-003', 'Hutang Vendor', 'Pelunasan Toko Baja Jaya PO-084', 7250000, 0, 'PRJ-002');
  delete from erp_demo_cashflow where visitor_id = ref_owner;
  insert into erp_demo_cashflow (visitor_id, month, masuk, keluar) values
    (ref_owner, 'Jan', 28000000000, 22000000000),
    (ref_owner, 'Feb', 24000000000, 19500000000),
    (ref_owner, 'Mar', 35000000000, 27000000000),
    (ref_owner, 'Apr', 31000000000, 25500000000),
    (ref_owner, 'Mei', 42000000000, 33000000000),
    (ref_owner, 'Jun', 38000000000, 30000000000);
  delete from erp_demo_stages where visitor_id = ref_owner;
  insert into erp_demo_stages (visitor_id, id, project_id, name, description, "order", status, target_pct, actual_pct, start, deadline) values
    (ref_owner, 'STG-001', 'PRJ-001', 'Pekerjaan Tanah & Pondasi', 'Galian tanah, urugan, dan bored pile 48 titik diameter 60cm', 1, 'done', 15, 15, '2024-09-01', '2024-10-15'),
    (ref_owner, 'STG-002', 'PRJ-001', 'Basement & Struktur Bawah', 'Konstruksi basement, pile cap, raft slab, dan dinding penahan', 2, 'done', 20, 19, '2024-10-16', '2024-12-15'),
    (ref_owner, 'STG-003', 'PRJ-001', 'Struktur Atas Lantai 1–4', 'Cor kolom, balok, dan plat lantai 1 sampai 4, mutu K-400', 3, 'done', 22, 22, '2024-12-16', '2025-03-15'),
    (ref_owner, 'STG-004', 'PRJ-001', 'Struktur Atas Lantai 5–8', 'Cor kolom, balok, dan plat lantai 5 sampai 8', 4, 'in-progress', 18, 12, '2025-03-16', '2025-06-30'),
    (ref_owner, 'STG-005', 'PRJ-001', 'MEP & Finishing Interior', 'Instalasi ME/plumbing, dinding partisi, plafond, keramik lantai', 5, 'pending', 15, 0, '2025-05-01', '2025-07-31'),
    (ref_owner, 'STG-006', 'PRJ-001', 'Eksterior, Facade & Landscape', 'Fasad kaca curtain wall, parkir, taman, commissioning & serah terima', 6, 'pending', 10, 0, '2025-07-01', '2025-08-15'),
    (ref_owner, 'STG-007', 'PRJ-004', 'Persiapan & Land Clearing', 'Mobilisasi, pagar proyek, gudang material, land clearing', 1, 'done', 5, 5, '2024-06-01', '2024-06-30'),
    (ref_owner, 'STG-008', 'PRJ-004', 'Pondasi Tiang Pancang', 'Pemancangan 120 titik, pile cap, dan tie beam', 2, 'done', 20, 20, '2024-07-01', '2024-08-31'),
    (ref_owner, 'STG-009', 'PRJ-004', 'Fabrikasi & Erection Baja', 'Rangka baja utama WF 400, kolom, balok, gording, bracing', 3, 'done', 35, 35, '2024-09-01', '2024-12-31'),
    (ref_owner, 'STG-010', 'PRJ-004', 'Atap Spandek & Dinding Cladding', 'Pemasangan atap spandek 0.5mm, wall cladding, skylight poly', 4, 'done', 22, 20, '2025-01-01', '2025-04-30'),
    (ref_owner, 'STG-011', 'PRJ-004', 'MEP, Floor Hardener & Finishing', 'Instalasi listrik, plumbing, floor hardener, cat dinding & kolom', 5, 'in-progress', 18, 8, '2025-04-01', '2025-07-10'),
    (ref_owner, 'STG-012', 'PRJ-002', 'Pekerjaan Pondasi Ruko', 'Galian, urugan, pondasi footplate beton bertulang', 1, 'done', 20, 20, '2024-12-01', '2025-01-15'),
    (ref_owner, 'STG-013', 'PRJ-002', 'Struktur Beton Ruko', 'Kolom, balok, plat lantai 1 dan 2, tangga beton', 2, 'in-progress', 40, 25, '2025-01-16', '2025-04-30'),
    (ref_owner, 'STG-014', 'PRJ-002', 'Dinding, Plafond & Finishing', 'Pasang bata, plester, plafond, keramik, cat interior & eksterior', 3, 'pending', 25, 0, '2025-04-01', '2025-08-31'),
    (ref_owner, 'STG-015', 'PRJ-002', 'MEP & Pekerjaan Luar', 'Instalasi listrik, AC, plumbing, pagar, parkir, taman', 4, 'pending', 15, 0, '2025-08-01', '2025-09-30');
  delete from erp_demo_doc_uploads where visitor_id = ref_owner;
  insert into erp_demo_doc_uploads (visitor_id, id, stage_id, project_id, title, caption, type, drive_id, thumb_url, uploaded_by, uploaded_at, kinerja_note) values
    (ref_owner, 'DOC-001', 'STG-001', 'PRJ-001', 'Galian Bored Pile Selesai', 'Galian bored pile diameter 60cm kedalaman 18m. Total 48 titik selesai 100%. Tanah keras sesuai hasil soil test dan NSPT.', 'image', '', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=75', 'Mandor Hasan', '2024-09-18', 'Selesai H-3 dari jadwal, cuaca mendukung'),
    (ref_owner, 'DOC-002', 'STG-001', 'PRJ-001', 'Pengecoran Bored Pile', 'Pengecoran bored pile menggunakan ready mix K-350. Slump test 12cm OK. Semua 48 titik sudah dicor menggunakan pipa tremie.', 'image', '', 'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=500&q=75', 'PM Rudi H.', '2024-10-02', 'Kualitas beton sesuai spec, tidak ada reject'),
    (ref_owner, 'DOC-003', 'STG-002', 'PRJ-001', 'Pembesian Pile Cap Zone A', 'Pembesian pile cap zone A selesai menggunakan besi D25 sesuai shop drawing. Menunggu bekisting dan pengecoran.', 'image', '', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=75', 'Mandor Hasan', '2024-11-05', 'Zone A selesai, sedang lanjut zone B dan C'),
    (ref_owner, 'DOC-004', 'STG-002', 'PRJ-001', 'Raft Slab Basement Cor', 'Pengecoran raft slab basement area parkir bawah tanah. Volume beton ±840m³, menggunakan 4 unit concrete pump simultan.', 'image', '', 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500&q=75', 'PM Rudi H.', '2024-12-01', 'Pengecoran massal selesai dalam 1 shift, tidak ada cold joint'),
    (ref_owner, 'DOC-005', 'STG-003', 'PRJ-001', 'Cor Kolom Lantai 2 Zona B', 'Pengecoran kolom lantai 2 zona B menggunakan pump concrete. Mutu beton K-400. Beton sudah dibuka bekisting, permukaan baik.', 'image', '', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&q=75', 'PM Rudi H.', '2025-01-20', 'Progress sesuai schedule, kualitas baik'),
    (ref_owner, 'DOC-006', 'STG-003', 'PRJ-001', 'Video Timelapse Progress Lt. 3', 'Video timelapse pekerjaan lantai 3 selama 2 minggu. Semua kolom sudah dicor, sedang pekerjaan pembesian balok dan plat lantai.', 'video', '', '', 'PM Rudi H.', '2025-02-20', 'Pekerjaan lantai 3 sudah 85%, estimasi selesai minggu depan'),
    (ref_owner, 'DOC-007', 'STG-003', 'PRJ-001', 'Plat Lantai 4 Pengecoran', 'Pengecoran plat lantai 4 menggunakan ready mix K-400 dengan aditif waterproofing. Luas ±1.200m², volume beton ±180m³.', 'image', '', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=75', 'Mandor Hasan', '2025-03-10', 'Selesai tepat waktu, cuaca cerah mendukung pengecoran'),
    (ref_owner, 'DOC-008', 'STG-004', 'PRJ-001', 'Pembesian Kolom Lt. 5 Zona A', 'Pembesian kolom lantai 5 zona A menggunakan besi D25 dan D19. Sudah terpasang 12 dari 18 kolom, menunggu bekisting.', 'image', '', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=75', 'Mandor Hasan', '2025-04-10', 'Progres 70% zona ini, deviasi -6% dari target'),
    (ref_owner, 'DOC-009', 'STG-004', 'PRJ-001', 'Progress Lt. 6 Minggu Ini', 'Update progress lantai 6. Bekisting kolom sudah terpasang, menunggu giliran pengecoran. Kendala: delivery besi sempat terlambat 3 hari.', 'image', '', 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&q=75', 'PM Rudi H.', '2025-05-05', 'Delay 3 hari akibat keterlambatan material, sudah dikompensasi'),
    (ref_owner, 'DOC-010', 'STG-008', 'PRJ-004', 'Pemancangan 120 Titik Selesai', 'Pemancangan 120 titik tiang pancang spun pile Ø 40cm selesai 100%. Kedalaman rata-rata 24m, final set sesuai spesifikasi teknis.', 'image', '', 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=500&q=75', 'PM Rudi H.', '2024-08-25', 'Selesai tepat waktu, 0 tiang reject dari total 120 titik'),
    (ref_owner, 'DOC-011', 'STG-009', 'PRJ-004', 'Erection Kolom Baja WF 400', 'Erection 48 kolom baja WF 400×200 selesai 100%. Semua sambungan las sudah diinspeksi oleh inspector internal dan sudah sesuai standar.', 'image', '', 'https://images.unsplash.com/photo-1513467653872-c56a0b8f78fc?w=500&q=75', 'Mandor Andi', '2024-11-20', 'Inspeksi las: 0 defect, semua passed NDT'),
    (ref_owner, 'DOC-012', 'STG-009', 'PRJ-004', 'Video Erection Balok & Gording', 'Video dokumentasi erection balok induk dan gording roof frame warehouse. Progress rangka atap sudah 90%, estimasi selesai dalam 2 minggu.', 'video', '', '', 'PM Rudi H.', '2024-12-15', 'Mundur 4 hari akibat hujan, sudah dikejar dengan lembur'),
    (ref_owner, 'DOC-013', 'STG-010', 'PRJ-004', 'Pemasangan Atap Spandek 70%', 'Pemasangan atap spandek 0.5mm progress 70%. Menggunakan self-drilling screw dan sealant pada sambungan. Estimasi selesai akhir bulan.', 'image', '', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=75', 'Mandor Andi', '2025-03-10', 'Progress baik, cuaca mendukung. On track dengan schedule'),
    (ref_owner, 'DOC-014', 'STG-010', 'PRJ-004', 'Video Pasang Wall Cladding', 'Video pemasangan wall cladding panel baja sisi utara warehouse. Ketebalan 0.5mm galvalum. Progress cladding 60% dari total area.', 'video', '', '', 'Mandor Andi', '2025-04-01', 'Pemasangan rapi sesuai gambar, diverifikasi oleh PM dan pengawas MK'),
    (ref_owner, 'DOC-015', 'STG-012', 'PRJ-002', 'Cor Pondasi Footplate Ruko', 'Pengecoran pondasi footplate 24 titik selesai. Mutu beton K-250. Semua titik sudah dicor menggunakan truck mixer dan bucket concrete.', 'image', '', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=75', 'PM Andi P.', '2025-01-12', 'Selesai sesuai jadwal, tidak ada masalah teknis'),
    (ref_owner, 'DOC-016', 'STG-013', 'PRJ-002', 'Kolom Lantai 1 Ruko Progress', 'Pengecoran kolom lantai 1 sudah selesai 8 unit dari 12 unit ruko. Progress 67%. Sedang persiapan bekisting balok dan plat lantai 1.', 'image', '', 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=500&q=75', 'Mandor Hasan', '2025-03-05', 'Progress sedikit di bawah target, dikejar dengan tambah shift sore');
end $$;