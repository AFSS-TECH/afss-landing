// Drop-in replacements for react-router-dom's Link/NavLink that automatically
// stay within the visitor's current locale. Existing code only needs to change
// its import statement (`from 'react-router-dom'` -> `from './i18n/link.jsx'`)
// — every `<Link to="/some/path">` call site keeps working unmodified.
import { Link as RRLink, NavLink as RRNavLink } from 'react-router-dom'
import { useLocale } from './context.jsx'
import { withLocale } from './locales.js'

function isInternalPath(to) {
  return typeof to === 'string' && to.startsWith('/')
}

export function Link({ to, ...props }) {
  const { locale } = useLocale()
  const finalTo = isInternalPath(to) ? withLocale(locale, to) : to
  return <RRLink to={finalTo} {...props} />
}

export function NavLink({ to, ...props }) {
  const { locale } = useLocale()
  const finalTo = isInternalPath(to) ? withLocale(locale, to) : to
  return <RRNavLink to={finalTo} {...props} />
}

// Escape hatch for sections that are intentionally Indonesian-only for now
// (blog, privacy, terms — see ID_ONLY_SECTIONS in locales.js): always links to
// the unprefixed `id` path regardless of the visitor's current locale, so a
// visitor on /en/... browsing to /blog doesn't get a locale prefix that has no
// matching prerendered page.
export { RRLink as RawLink }
