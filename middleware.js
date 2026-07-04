// Vercel Edge Middleware — auto-detects a first-time visitor's browser language
// (Accept-Language) and redirects them into /en or /zh, mirroring the
// language-prefixed route trees built in src/main.jsx (buildRouteTree).
//
// This is a vanilla Vite/vite-react-ssg static site, NOT Next.js — Vercel's
// framework-agnostic Edge Middleware contract is used here (plain Request/
// Response Web APIs), not `next/server`'s `NextResponse`.
//
// Rules:
//  - Only ever redirects away from an UNPREFIXED path (never overrides an
//    explicit /en or /zh visit).
//  - Never redirects twice: once a `locale` cookie exists (set here, or by the
//    language switcher in src/App.jsx's LangSwitcher on a manual pick), the
//    visitor's choice is respected on every later visit.
//  - Leaves the koperasi_emas portfolio proxy path alone — it's rewritten
//    (see vercel.json) to an entirely separate external app with no locale
//    variants, so it must never gain a locale prefix.

const ONE_YEAR = 60 * 60 * 24 * 365

function pickLocale(acceptLanguage) {
  if (!acceptLanguage) return null
  const langs = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
  for (const { tag } of langs) {
    const base = tag.split('-')[0]
    if (base === 'en') return 'en'
    if (base === 'zh') return 'zh'
    if (base === 'id') return null // explicit Indonesian preference — stay on the default tree
  }
  return null
}

export const config = {
  // Skip anything that looks like a static asset (has a file extension) and
  // any /api routes — only run on page-navigation paths.
  matcher: ['/((?!api/).*)'],
}

export default function middleware(request) {
  const url = new URL(request.url)
  const { pathname } = url

  // Only static-asset-like paths need to be skipped explicitly beyond the
  // matcher above (belt and suspenders — matcher already excludes /api/*).
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return

  // Already locale-prefixed — never override an explicit /en or /zh visit.
  if (/^\/(en|zh)(\/|$)/.test(pathname)) return

  // External proxy target (see vercel.json rewrites) — no locale variants exist.
  if (pathname.startsWith('/portofolio/landing_page/koperasi_emas')) return

  // Visitor already has an explicit or previously-detected locale — respect it.
  const cookieHeader = request.headers.get('cookie') || ''
  if (/(^|;\s*)locale=/.test(cookieHeader)) return

  const preferred = pickLocale(request.headers.get('accept-language'))
  if (!preferred) return // browser prefers Indonesian (or sent nothing usable) — stay on the default tree

  const redirectUrl = new URL(`/${preferred}${pathname}${url.search}`, url)
  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl.toString(),
      'Set-Cookie': `locale=${preferred}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax`,
      'Cache-Control': 'private',
    },
  })
}
