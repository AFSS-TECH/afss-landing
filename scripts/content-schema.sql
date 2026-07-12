-- Jalankan ini di Supabase Dashboard > SQL Editor > New Query > Run
-- Project: https://jltdidqhdqdsyiakdaqy.supabase.co
--
-- Menambahkan CMS untuk dashboard.afss.tech:
--   1. content_sections — satu baris JSONB per bagian landing page (hero, stats,
--      why_us, clients, workflow, addons, tech_stack, pricing, pricing_bundles,
--      faqs, brand). Landing page (anon key) hanya BACA. Dashboard (login
--      Supabase Auth) BACA + TULIS.
--   2. submissions — pengajuan proyek dari form /ajukan-proyek, menggantikan
--      localStorage. Publik (anon key) boleh INSERT saja. Dashboard (login)
--      boleh baca/update/hapus.

create table if not exists content_sections (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table content_sections enable row level security;

drop policy if exists "Public can read content sections" on content_sections;
create policy "Public can read content sections" on content_sections
  for select using (true);

drop policy if exists "Authenticated can write content sections" on content_sections;
create policy "Authenticated can write content sections" on content_sections
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists content_sections_set_updated_at on content_sections;
create trigger content_sections_set_updated_at
  before update on content_sections
  for each row execute function set_updated_at();

-- ── Submissions (pengajuan proyek) ──────────────────────────────────────
create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  kontak text not null,
  perusahaan text,
  jenis text not null,
  anggaran text,
  timeline text,
  deskripsi text,
  status text not null default 'Baru',
  tanggal timestamptz not null default now()
);

alter table submissions enable row level security;

drop policy if exists "Public can insert submissions" on submissions;
create policy "Public can insert submissions" on submissions
  for insert with check (true);

drop policy if exists "Authenticated can manage submissions" on submissions;
create policy "Authenticated can manage submissions" on submissions
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
