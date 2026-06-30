// Auto-generates public/sitemap.xml and public/rss.xml from the blog posts.
// Runs before each build (see package.json "build") so feeds never drift from content.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { posts } from '../src/blog.js'
import { SITE_URL } from '../src/site.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pub = join(__dirname, '..', 'public')
const today = new Date().toISOString().slice(0, 10)
const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const byDateDesc = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))

const serviceSlugs = [
  'pembuatan-website',
  'aplikasi-mobile',
  'web-app',
  'ui-ux-design',
  'maintenance',
  'jasa-pembuatan-landing-page',
  'jasa-pembuatan-company-profile',
  'jasa-pembuatan-toko-online',
  'jasa-pembuatan-erp',
  'jasa-pembuatan-dashboard',
  'jasa-pembuatan-website-medan',
]

// ── sitemap.xml ──
const urls = [
  { loc: `${SITE_URL}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
  // Core pages
  { loc: `${SITE_URL}/layanan`, lastmod: today, changefreq: 'weekly', priority: '0.9' },
  { loc: `${SITE_URL}/harga`, lastmod: today, changefreq: 'weekly', priority: '0.9' },
  { loc: `${SITE_URL}/blog`, lastmod: today, changefreq: 'weekly', priority: '0.8' },
  { loc: `${SITE_URL}/portofolio`, lastmod: today, changefreq: 'weekly', priority: '0.8' },
  { loc: `${SITE_URL}/kontak`, lastmod: today, changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE_URL}/keunggulan`, lastmod: today, changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE_URL}/faq`, lastmod: today, changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE_URL}/tentang`, lastmod: today, changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE_URL}/karir`, lastmod: today, changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE_URL}/privacy`, lastmod: today, changefreq: 'yearly', priority: '0.3' },
  { loc: `${SITE_URL}/terms`, lastmod: today, changefreq: 'yearly', priority: '0.3' },
  // Service pages (high priority — keyword-rich landing pages)
  ...serviceSlugs.map((s) => ({
    loc: `${SITE_URL}/layanan/${s}`, lastmod: today, changefreq: 'monthly', priority: '0.85',
  })),
  // Blog posts
  ...byDateDesc.map((p) => ({
    loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.date, changefreq: 'monthly', priority: '0.7',
  })),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
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
