import { createContext, useContext, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { localeFromPathname, stripLocale, DEFAULT_LOCALE } from './locales.js'
import { STRINGS } from './strings.js'

const LocaleContext = createContext({ locale: DEFAULT_LOCALE, path: '/', t: (k) => k })

function lookup(dict, key) {
  let node = dict
  for (const part of key.split('.')) {
    node = node?.[part]
    if (node == null) return undefined
  }
  return node
}

function interpolate(str, vars) {
  if (typeof str !== 'string' || !vars) return str
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ''))
}

export function LocaleProvider({ children }) {
  const { pathname } = useLocation()
  const value = useMemo(() => {
    const locale = localeFromPathname(pathname)
    const path = stripLocale(pathname)
    const t = (key, vars) => {
      const hit = lookup(STRINGS[locale], key) ?? lookup(STRINGS[DEFAULT_LOCALE], key)
      return typeof hit === 'string' ? interpolate(hit, vars) : (hit ?? key)
    }
    return { locale, path, t }
  }, [pathname])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}

// Picks the right-locale fields out of a `{ ...fields, i18n: { id, en, zh } }` entry,
// falling back to `id` for anything not yet translated (never 404s on partial content).
export function pick(entry, locale) {
  if (!entry || !entry.i18n) return entry
  const localized = entry.i18n[locale] || entry.i18n[DEFAULT_LOCALE]
  return { ...entry, ...localized }
}
