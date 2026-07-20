/* ===================================================
   SUPABASE CLIENT — ERP Kontraktor portfolio demo
   Anon/publishable key only — safe to ship to the browser,
   row access is enforced by RLS (owner_id = auth.uid()).
   =================================================== */
const SUPA_URL = 'https://jltdidqhdqdsyiakdaqy.supabase.co';
const SUPA_ANON_KEY = 'sb_publishable_kCC3rPf6B_09_HNIRCf7Yg_BlmfJxiy';

const supa = window.supabase.createClient(SUPA_URL, SUPA_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, storageKey: 'afss_erp_demo_auth' },
});

async function supaEnsureSession() {
  const { data: { session } } = await supa.auth.getSession();
  if (session) return session;
  const { data, error } = await supa.auth.signInAnonymously();
  if (error) throw error;
  return data.session;
}
