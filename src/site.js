// Small shared constants/helpers used across pages — kept separate from blog.js
// (which holds ~600KB of article markdown) so importing these doesn't drag the
// whole blog content module into pages that don't need it.
export const SITE_URL = 'https://afss.tech'

export const formatDateId = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
