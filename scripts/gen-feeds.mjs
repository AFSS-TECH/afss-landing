// Auto-generates public/sitemap.xml and public/rss.xml from the blog posts.
// Runs before each build (see package.json "build") so feeds never drift from content.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { posts } from '../src/blog.js'
import { products, portfolioProjects, serviceAreas } from '../src/data/index.js'
import { SITE_URL } from '../src/site.js'
import { LOCALES, LOCALE_PREFIX, HREFLANG, DEFAULT_LOCALE } from '../src/i18n/locales.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pub = join(__dirname, '..', 'public')
const today = new Date().toISOString().slice(0, 10)
const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Blog posts are stored as { ...structural fields, i18n: { id, en, zh } } —
// see the i18n shape convention in src/i18n/context.jsx's pick(). RSS stays
// Indonesian-only for now (Phase 3), so it just reads the `id` locale directly.
const pick = (entry, locale) => ({ ...entry, ...(entry.i18n[locale] || entry.i18n[DEFAULT_LOCALE]) })
const postsId = posts.map((p) => pick(p, DEFAULT_LOCALE))
const byDateDesc = [...postsId].sort((a, b) => (a.date < b.date ? 1 : -1))

// ── sitemap.xml ──
// Every core/service/portfolio/blog page exists under all 3 locale trees
// (id/en/zh — see src/main.jsx's buildRouteTree), so each gets one <url> per
// locale with xhtml:link hreflang alternates pointing at its siblings +
// x-default. Legal pages are Indonesian-only for now (Phase 3 of the i18n
// rollout — see buildRouteTree's isDefaultLocale branch), so they get a
// single, unprefixed <url> with no alternates.
const withLocale = (locale, path) => {
  const prefix = LOCALE_PREFIX[locale] || ''
  if (!prefix) return path
  return path === '/' ? prefix : prefix + path
}

const localizedEntries = (path, { changefreq, priority, lastmod }) => {
  const variants = LOCALES.map((l) => ({ locale: l, loc: `${SITE_URL}${withLocale(l, path)}` }))
  return variants.map(({ locale, loc }) => ({
    loc, lastmod: lastmod || today, changefreq, priority,
    alternates: [
      ...variants.map((v) => ({ hreflang: HREFLANG[v.locale], href: v.loc })),
      { hreflang: 'x-default', href: `${SITE_URL}${path}` },
    ],
  }))
}

const CORE_PATHS = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/layanan', changefreq: 'weekly', priority: '0.9' },
  { path: '/harga', changefreq: 'weekly', priority: '0.9' },
  { path: '/portofolio', changefreq: 'weekly', priority: '0.8' },
  { path: '/kontak', changefreq: 'monthly', priority: '0.8' },
  { path: '/keunggulan', changefreq: 'monthly', priority: '0.8' },
  { path: '/faq', changefreq: 'monthly', priority: '0.8' },
  { path: '/tentang', changefreq: 'monthly', priority: '0.7' },
  { path: '/karir', changefreq: 'monthly', priority: '0.6' },
  { path: '/ajukan-proyek', changefreq: 'monthly', priority: '0.8' },
]
// Indonesian-only for now — no locale alternates to link to yet.
const ID_ONLY_PATHS = [
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  // Local-SEO city pages (see src/main.jsx / data.js serviceAreas)
  ...serviceAreas.map((a) => ({ path: `/jasa-pembuatan-website-${a.slug}`, changefreq: 'monthly', priority: '0.8' })),
]

const urls = [
  ...CORE_PATHS.flatMap((p) => localizedEntries(p.path, p)),
  ...localizedEntries('/blog', { changefreq: 'weekly', priority: '0.8' }),
  // Service pages (high priority — keyword-rich landing pages)
  ...products.flatMap((p) => localizedEntries(`/layanan/${p.slug}`, { changefreq: 'monthly', priority: '0.85' })),
  // Portfolio detail pages
  ...portfolioProjects.flatMap((p) => localizedEntries(`/portofolio/${p.slug}`, { changefreq: 'monthly', priority: '0.7' })),
  // Blog posts — fully translated, available under every locale
  ...byDateDesc.flatMap((p) => localizedEntries(`/blog/${p.slug}`, { changefreq: 'monthly', priority: '0.7', lastmod: p.date })),
  // Indonesian-only sections
  ...ID_ONLY_PATHS.map((p) => ({ loc: `${SITE_URL}${p.path}`, lastmod: today, changefreq: p.changefreq, priority: p.priority, alternates: [] })),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
${u.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n')}
  </url>`).join('\n')}
</urlset>
`
writeFileSync(join(pub, 'sitemap.xml'), sitemap)

// ── rss.xml (blog feed) ──
const items = byDateDesc.map((p) => `    <item>
      <title>${xmlEsc(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid>${SITE_URL}/blog/${p.slug}</guid>
      <description>${xmlEsc(p.excerpt)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
${p.tags.map((t) => `      <category>${xmlEsc(t)}</category>`).join('\n')}
    </item>`).join('\n')
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog AFSS — PT Advanced Future Software Solutions</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Tips & panduan pembuatan website, aplikasi mobile, dan strategi digital untuk bisnis di Indonesia.</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`
writeFileSync(join(pub, 'rss.xml'), rss)

console.log(`Generated sitemap.xml (${urls.length} urls) + rss.xml (${byDateDesc.length} items)`)
