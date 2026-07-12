# Deploy dashboard.afss.tech

Status: **project Vercel `afss-dashboard` sudah dibuat & deployed** (https://afss-dashboard.vercel.app), env var `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` sudah diset, dan domain `dashboard.afss.tech` sudah didaftarkan ke project itu. Sisa langkah manual di bawah ini butuh akses yang Claude tidak punya (Supabase SQL Editor, service role key, Hostinger DNS).

## 1. Setup database (sekali saja)
1. Buka Supabase Dashboard → project AFSS → SQL Editor → New Query.
2. Jalankan isi [`scripts/content-schema.sql`](../scripts/content-schema.sql) (tabel `content_sections` + `submissions`).
3. Isi konten awal dari kode yang sudah ada supaya dashboard tidak mulai kosong. Jalankan dari root repo (`D:\coding\a fss`), bukan dari `admin-dashboard/`:
   ```
   SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/seed-content.mjs
   ```
   Ambil `SUPABASE_SERVICE_ROLE_KEY` dari Supabase Dashboard → Project Settings → API → `service_role` (secret — Vercel menandainya "sensitive" sehingga tidak bisa ditarik ulang lewat CLI, jalankan ini dari mesin Anda sendiri, jangan commit).

## 2. Buat akun admin
Supabase Dashboard → Authentication → Users → Add User. Buat satu akun per admin (email + password). Tidak ada pendaftaran mandiri di dashboard — akun hanya dibuat lewat Supabase.

## 3. Domain dashboard.afss.tech (tinggal DNS)
Domain sudah ditambahkan ke project Vercel `afss-dashboard`. Tinggal:
1. Buka Hostinger DNS (tempat afss.tech dikelola, sama seperti setup `staging.afss.tech`).
2. Tambahkan record: **Type** CNAME, **Name** `dashboard`, **Target** `cname.vercel-dns.com`.
3. Tunggu propagasi DNS (~beberapa menit–1 jam), Vercel akan auto-issue SSL setelah terverifikasi.
4. Cek status verifikasi di Vercel Dashboard → project `afss-dashboard` → Settings → Domains.

## Catatan
- Dashboard ini app terpisah (React + Vite biasa, client-side routed) — bukan bagian dari build SSG landing page, jadi deploy/redeploy-nya independen.
- Setiap perubahan yang disimpan di menu "Setting Landing Page" langsung tersimpan ke Supabase dan langsung tampil di afss.tech saat visitor membuka/reload halaman (client-side fetch) — tidak perlu rebuild landing page.
- Halaman lama `/dashboard` di landing page sekarang hanya menampilkan link ke dashboard.afss.tech (PIN lama sudah dihapus karena tidak aman).
