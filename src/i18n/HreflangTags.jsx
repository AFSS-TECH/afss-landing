import { useLocale } from './context.jsx'
import { SITE_URL } from '../site.js'
import { LOCALES, HREFLANG, HTML_LANG, OG_LOCALE, withLocale } from './locales.js'

// Returns the <html lang>, og:locale, and full hreflang alternate set (including
// x-default) for the current canonical path, as a plain array of elements.
//
// This MUST be used as a hook (spread the returned array as children of the
// existing <Head> block) rather than rendered as `<HreflangTags />` — Helmet
// inspects its children's element types directly and throws "nested Helmet"
// if it encounters an un-instantiated custom component, so the elements need
// to already be resolved by the time Head sees them:
//
//   const hreflangTags = useHreflangTags()
//   <Head>...{hreflangTags}</Head>
export function useHreflangTags(path) {
  const { locale, path: currentPath } = useLocale()
  const canonicalPath = path || currentPath
  return [
    <html key="html-lang" lang={HTML_LANG[locale]} />,
    <meta key="og-locale" property="og:locale" content={OG_LOCALE[locale]} />,
    ...LOCALES.map((l) => (
      <link key={`alt-${l}`} rel="alternate" hrefLang={HREFLANG[l]} href={`${SITE_URL}${withLocale(l, canonicalPath)}`} />
    )),
    <link key="alt-x-default" rel="alternate" hrefLang="x-default" href={`${SITE_URL}${canonicalPath}`} />,
  ]
}
