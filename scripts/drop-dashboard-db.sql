-- Jalankan di Supabase Dashboard → SQL Editor → New Query → Run
-- Project: https://jltdidqhdqdsyiakdaqy.supabase.co (kiseki-db)
--
-- Menghapus sisa database dashboard (dashboard.afss.tech sudah dihapus,
-- landing sudah tidak fetch content_sections sejak commit f591e88).
--
-- JANGAN hapus tabel `submissions` (backup lead form /ajukan-proyek)
-- dan `blog_views` (counter view blog) — keduanya masih dipakai afss.tech.

-- Trigger + tabel konten dashboard
drop trigger if exists content_sections_set_updated_at on content_sections;
drop table if exists content_sections;

-- Function trigger-nya — pakai RESTRICT (default): kalau ternyata ada tabel
-- lain di project ini yang masih memakainya, statement ini gagal dengan
-- error dependensi (aman) alih-alih ikut merusak tabel lain.
drop function if exists set_updated_at();
