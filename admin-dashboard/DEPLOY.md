# Deploy dashboard.afss.tech

## 1. Setup database (sekali saja)
1. Buka Supabase Dashboard → project AFSS → SQL Editor → New Query.
2. Jalankan isi [`scripts/content-schema.sql`](../scripts/content-schema.sql) (tabel `content_sections` + `submissions`).
3. Isi konten awal dari kode yang sudah ada supaya dashboard tidak mulai kosong:
   ```
   SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/seed-content.mjs
   ```
   Ambil `SUPABASE_SERVICE_ROLE_KEY` dari Supabase Dashboard → Project Settings → API → `service_role` (secret, jangan commit). Jalankan dari root repo (`D:\coding\a fss`), bukan dari `admin-dashboard/`.

## 2. Buat akun admin
Supabase Dashboard → Authentication → Users → Add User. Buat satu akun per admin (email + password). Tidak ada pendaftaran mandiri di dashboard — akun hanya dibuat lewat Supabase.

## 3. Deploy sebagai project Vercel baru
1. Vercel Dashboard → Add New → Project → import repo yang sama (`a-fss`).
2. Saat konfigurasi:
   - **Root Directory**: `admin-dashboard`
   - **Framework Preset**: Vite
   - Build Command / Output Directory ikut `admin-dashboard/vercel.json` (biarkan default).
3. Environment Variables (Production + Preview):
   - `VITE_SUPABASE_URL` = `https://jltdidqhdqdsyiakdaqy.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = (anon/publishable key yang sama dengan landing page, ada di `.env.local` root)
4. Deploy.

## 4. Domain dashboard.afss.tech
1. Di project Vercel dashboard baru: Settings → Domains → Add → `dashboard.afss.tech`.
2. Vercel akan minta record DNS (biasanya CNAME ke `cname.vercel-dns.com`).
3. Di Hostinger DNS (tempat afss.tech dikelola): tambahkan CNAME `dashboard` → target yang diberikan Vercel — pola yang sama seperti setup `staging.afss.tech`.
4. Tunggu propagasi DNS, lalu Vercel akan auto-issue SSL.

## Catatan
- Dashboard ini app terpisah (React + Vite biasa, client-side routed) — bukan bagian dari build SSG landing page, jadi deploy/redeploy-nya independen.
- Setiap perubahan yang disimpan di menu "Setting Landing Page" langsung tersimpan ke Supabase dan langsung tampil di afss.tech saat visitor membuka/reload halaman (client-side fetch) — tidak perlu rebuild landing page.
- Halaman lama `/dashboard` di landing page sekarang hanya menampilkan link ke dashboard.afss.tech (PIN lama sudah dihapus karena tidak aman).
