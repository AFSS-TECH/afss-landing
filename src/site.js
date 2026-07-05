// Small shared constants/helpers used across pages — kept separate from blog.js
// (which holds ~600KB of article markdown) so importing these doesn't drag the
// whole blog content module into pages that don't need it.
export const SITE_URL = 'https://afss.tech'

export const formatDateId = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

const DATE_LOCALE_TAG = { id: 'id-ID', en: 'en-US', zh: 'zh-CN' }

// Locale-aware date formatting for blog posts (id/en/zh) — falls back to Indonesian.
export const formatDate = (iso, locale) =>
  new Date(iso).toLocaleDateString(DATE_LOCALE_TAG[locale] || 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
