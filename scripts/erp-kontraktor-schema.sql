-- ERP Kontraktor portfolio demo — real backend for public/portofolio/erp/kontraktor
-- Each visitor gets an isolated sandbox via Supabase anonymous auth: every row is
-- owned by auth.uid() and RLS scopes all reads/writes to the caller's own rows,
-- so visitors can't see or overwrite each other's demo data.
--
-- Run once in the Supabase SQL editor (or `supabase db execute -f` after linking
-- the project with the CLI). Requires Anonymous Sign-Ins enabled under
-- Authentication > Providers in the Supabase dashboard.

create table if not exists erp_demo_projects (
  owner_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
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
  primary key (owner_id, id)
);

create table if not exists erp_demo_employees (
  owner_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
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
  primary key (owner_id, id)
);

create table if not exists erp_demo_attendance (
  owner_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
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
  primary key (owner_id, id)
);

create table if not exists erp_demo_payroll (
  owner_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
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
  primary key (owner_id, id)
);

create table if not exists erp_demo_stock (
  owner_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id         text not null,
  nama       text not null,
  kategori   text,
  qty        int default 0,
  min        int default 0,
  satuan     text,
  lokasi     text,
  harga      bigint default 0,
  created_at timestamptz not null default now(),
  primary key (owner_id, id)
);

create table if not exists erp_demo_equipment (
  owner_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id         text not null,
  name       text not null,
  total      int default 0,
  dipinjam   int default 0,
  kondisi    text,
  biaya_hari bigint default 0,
  project    text,
  created_at timestamptz not null default now(),
  primary key (owner_id, id)
);

create table if not exists erp_demo_purchase_requests (
  owner_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
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
  primary key (owner_id, id)
);

create table if not exists erp_demo_purchase_orders (
  owner_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id         text not null,
  vendor     text,
  item       text,
  total      bigint default 0,
  date       date,
  status     text,
  due        date,
  project    text,
  created_at timestamptz not null default now(),
  primary key (owner_id, id)
);

create table if not exists erp_demo_gl (
  owner_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id         text not null,
  date       text,
  kode       text,
  akun       text,
  ket        text,
  debit      bigint default 0,
  kredit     bigint default 0,
  project    text,
  created_at timestamptz not null default now(),
  primary key (owner_id, id)
);

create table if not exists erp_demo_cashflow (
  owner_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id         uuid not null default gen_random_uuid(),
  month      text,
  masuk      bigint default 0,
  keluar     bigint default 0,
  created_at timestamptz not null default now(),
  primary key (owner_id, id)
);

create table if not exists erp_demo_stages (
  owner_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
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
  primary key (owner_id, id)
);

create table if not exists erp_demo_doc_uploads (
  owner_id      uuid not null default auth.uid() references auth.users(id) on delete cascade,
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
  primary key (owner_id, id)
);

-- RLS: every table is scoped to auth.uid() = owner_id, for anonymous or real users alike.
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
    execute format(
      'create policy "owner_all" on %I for all using (owner_id = auth.uid()) with check (owner_id = auth.uid())',
      t
    );
  end loop;
end $$;
