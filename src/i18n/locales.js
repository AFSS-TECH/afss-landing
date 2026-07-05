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

// Locales that only have Indonesian content today (Phase 3 of the i18n plan) —
// their routes are only mounted under the `id` tree until translated.
export const ID_ONLY_SECTIONS = ['/privacy', '/terms']

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

// Same as withLocale(), but falls back to the target locale's homepage when
// `path` is under an ID_ONLY_SECTIONS path (blog/privacy/terms) — those pages
// don't exist under /en or /zh yet, so linking straight to them would 404.
// Use this (not withLocale) for any link a visitor can trigger while already
// on the site, e.g. the language switcher.
export function safeLocalePath(locale, path) {
  const isIdOnly = ID_ONLY_SECTIONS.some((p) => path === p || path.startsWith(p + '/'))
  if (isIdOnly && locale !== DEFAULT_LOCALE) return withLocale(locale, '/')
  return withLocale(locale, path)
}

// Persists an explicit language choice so the Accept-Language edge middleware
// (middleware.js) never overrides it on a later visit.
export function setLocaleCookie(locale) {
  try {
    document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
  } catch { /* no-op (SSR/prerender) */ }
}
