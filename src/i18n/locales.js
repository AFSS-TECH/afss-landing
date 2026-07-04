// Central locale registry. Adding a new language later = one more entry here
// + one more `buildRouteTree(locale)` call in main.jsx — nothing else changes.
export const LOCALES = ['id', 'en', 'zh']
export const DEFAULT_LOCALE = 'id'

export const LOCALE_LABELS = { id: 'Indonesia', en: 'English', zh: '中文' }
export const LOCALE_SHORT = { id: 'ID', en: 'EN', zh: '中文' }
export const LOCALE_PREFIX = { id: '', en: '/en', zh: '/zh' }
export const OG_LOCALE = { id: 'id_ID', en: 'en_US', zh: 'zh_CN' }
export const HREFLANG = { id: 'id', en: 'en', zh: 'zh-Hans' }
export const HTML_LANG = { id: 'id', en: 'en', zh: 'zh-Hans' }

// Locales that only have Indonesian content today (Phase 2/3 of the i18n plan) —
// their routes are only mounted under the `id` tree until translated.
export const ID_ONLY_SECTIONS = ['/blog', '/privacy', '/terms']

export function localeFromPathname(pathname) {
  const seg = pathname.split('/')[1]
  return LOCALES.includes(seg) ? seg : DEFAULT_LOCALE
}

// Strips a locale prefix (if present) so callers can get the "canonical" path
// shared across all locale trees, e.g. '/en/layanan' -> '/layanan'.
export function stripLocale(pathname) {
  const seg = pathname.split('/')[1]
  if (LOCALES.includes(seg) && seg !== DEFAULT_LOCALE) {
    const rest = pathname.slice(('/' + seg).length)
    return rest === '' ? '/' : rest
  }
  return pathname
}

// Prefixes a canonical path with the given locale, e.g. withLocale('en','/layanan') -> '/en/layanan'.
export function withLocale(locale, path) {
  const prefix = LOCALE_PREFIX[locale] || ''
  if (!prefix) return path
  return path === '/' ? prefix : prefix + path
}

// Persists an explicit language choice so the Accept-Language edge middleware
// (middleware.js) never overrides it on a later visit.
export function setLocaleCookie(locale) {
  try {
    document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
  } catch { /* no-op (SSR/prerender) */ }
}
