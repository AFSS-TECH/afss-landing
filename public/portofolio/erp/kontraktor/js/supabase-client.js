/* ===================================================
   SUPABASE CLIENT — ERP Kontraktor portfolio demo
   Anon/publishable key only — safe to ship to the browser.
   No Supabase Auth is used here (this project's auth.users has a
   trigger owned by another, unrelated production app — anonymous
   sign-in would run through it and isn't safe to touch). Instead each
   visitor gets a random, browser-generated visitor_id persisted in
   localStorage; rows are scoped to it at the app level and RLS is
   permissive (this is throwaway public demo data, not sensitive).
   =================================================== */
const SUPA_URL = 'https://jltdidqhdqdsyiakdaqy.supabase.co';
const SUPA_ANON_KEY = 'sb_publishable_kCC3rPf6B_09_HNIRCf7Yg_BlmfJxiy';

const supa = window.supabase.createClient(SUPA_URL, SUPA_ANON_KEY, {
  auth: { persistSession: false },
});

const VISITOR_ID_KEY = 'afss_erp_visitor_id';
function getVisitorId() {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}
const VISITOR_ID = getVisitorId();
