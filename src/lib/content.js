// Sistem override konten Supabase DIHAPUS (2026-07-18) bersamaan dengan
// admin dashboard: tabel content_sections tidak lagi di-fetch, semua section
// selalu merender data hardcoded dari src/data.js / fallback lokalnya.
// Stub ini dipertahankan agar seluruh call site useSectionOverride lama
// tetap bekerja tanpa perubahan. Supabase masih dipakai untuk fitur lain
// (blog view counter & backup form submissions — lihat src/lib/supabase.js).
export function useSectionOverride(_id, fallback) {
  return fallback
}
