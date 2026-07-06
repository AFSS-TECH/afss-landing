import { useState, useEffect } from 'react'
import { marked } from 'marked'
import { useParams } from 'react-router-dom'
import { Link } from './i18n/link.jsx'
import { Head } from 'vite-react-ssg'
import { motion } from 'framer-motion'
import { BRAND, waLink } from './data.js'
import { Icon } from './Icon.jsx'
import { getPost } from './blog.js'
import { SITE_URL, formatDate } from './site.js'
import { postsMeta } from './blog-meta.js'
import { incrementBlogView, fetchAllBlogViews } from './lib/supabase.js'
import { useLocale, pick } from './i18n/context.jsx'
import { DEFAULT_LOCALE } from './i18n/locales.js'
import { useHreflangTags } from './i18n/HreflangTags.jsx'
import { LOCALE_PREFIX, withLocale } from './i18n/locales.js'

const JSON_LD_LANG = { id: 'id-ID', en: 'en-US', zh: 'zh-Hans' }

/* ── Format penuh: dd/mmm/yyyy HH:mm:ss (view-tracking timestamp — kept in Indonesian
   short month codes site-wide, this is an internal "last viewed" stat, not reader-facing copy) ── */
const MONTHS_ID = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
function formatLastViewed(iso) {
  if (!iso) return null
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mmm = MONTHS_ID[d.getMonth()]
  const yyyy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${dd}/${mmm}/${yyyy} ${hh}:${mi}:${ss}`
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } } }

marked.setOptions({ gfm: true, breaks: false })

const imgRenderer = new marked.Renderer()
imgRenderer.image = ({ href, text }) =>
  `<img src="${href}" alt="${text || ''}" loading="lazy" style="max-width:100%;width:100%;max-height:420px;object-fit:cover;object-position:center;border-radius:12px;margin:2rem auto;display:block;box-shadow:0 2px 16px rgba(0,0,0,.10)">`

const PER_PAGE = 6

// Article body markdown is authored with plain internal links like `[Paket Harga](/harga)`.
// `marked` renders these as raw <a href> tags, bypassing our locale-prefixing <Link> wrapper —
// so on an /en or /zh post they'd silently drop the visitor back into the Indonesian site.
// Rewrite any such internal link to include the current locale's prefix before rendering.
function localizeMarkdownLinks(markdown, locale) {
  const prefix = LOCALE_PREFIX[locale]
  if (!prefix) return markdown
  return markdown.replace(/\]\(\/(?!en\/|zh\/)/g, `](${prefix}/`)
}

function Article({ markdown, locale }) {
  const localized = localizeMarkdownLinks(markdown, locale)
  return <div className="article" dangerouslySetInnerHTML={{ __html: marked.parse(localized.trim(), { renderer: imgRenderer }) }} />
}

// Returns the locale-specific cover image path, e.g. /blog/en/{slug}.png.
// Falls back to the default (Indonesian) image if the locale dir is unavailable.
const coverPath = (slug, locale) =>
  locale === DEFAULT_LOCALE ? `/blog/${slug}.png` : `/blog/${locale}/${slug}.png`

/* ── Reading progress bar (fixed at top during article scroll) ── */
function ReadingProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop || document.body.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div className="reading-progress" style={{ width: `${pct}%` }} aria-hidden="true" />
}

/* ════════════════════════════════════════════════ BLOG INDEX (/blog) */
export function BlogIndex() {
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const all = postsMeta.map((p) => pick(p, locale))
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('')
  const [page, setPage] = useState(1)
  const [views, setViews] = useState(new Map())

  useEffect(() => { fetchAllBlogViews().then(setViews) }, [])

  // Hitung frekuensi tag, ambil top 15 yang paling banyak dipakai
  const tagFreq = all.flatMap((p) => p.tags).reduce((acc, tag) => { acc[tag] = (acc[tag] || 0) + 1; return acc; }, {})
  const allTags = Object.entries(tagFreq).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([tag]) => tag).sort()

  // Posts matching the search query (used to derive available tag chips)
  const q = query.trim().toLowerCase()
  const bySearch = q
    ? all.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    : all

  // Only show tag chips that exist in current search results
  const availableTags = [...new Set(bySearch.flatMap((p) => p.tags))].sort()
  // If the selected tag disappeared from available tags, treat as no tag filter
  const effectiveTag = availableTags.includes(activeTag) ? activeTag : ''

  const filtered = bySearch.filter((p) => !effectiveTag || p.tags.includes(effectiveTag))

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSearch = (v) => { setQuery(v); setPage(1) }
  const handleTag = (tag) => { setActiveTag(effectiveTag === tag ? '' : tag); setPage(1) }
  const goPage = (n) => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const title = t('blog.seoIndexTitle')
  const description = t('blog.seoIndexDesc')
  const canonical = `${SITE_URL}${withLocale(locale, '/blog')}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      {/* Hero */}
      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <motion.div variants={fadeUp} initial={false} animate="show">
              <div className="eyebrow"><Icon icon="fa-solid fa-newspaper" /> {t('blog.eyebrow')}</div>
              <h1 className="page-title">{t('blog.heroTitlePre')}<span className="ital">{t('blog.heroTitleItal')}</span>{t('blog.heroTitlePost')}</h1>
              <p className="page-sub">{t('blog.heroSub')}</p>
            </motion.div>
            <motion.div className="page-hero-stat-col" variants={fadeUp} initial={false} animate="show" transition={{ delay: 0.12 }}>
              <div className="blog-hero-card">
                <div className="bhs-item">
                  <span className="bhs-n">{all.length}</span>
                  <span className="bhs-l">{t('blog.statArticles')}</span>
                </div>
                <div className="bhs-item">
                  <span className="bhs-n">{allTags.length}</span>
                  <span className="bhs-l">{t('blog.statTopics')}</span>
                </div>
                <div className="bhs-item">
                  <span className="bhs-n bhs-icon"><Icon icon="fa-solid fa-calendar-check" /></span>
                  <span className="bhs-l">{t('blog.statUpdate')}</span>
                </div>
                <div className="bhs-item">
                  <span className="bhs-n bhs-icon"><Icon icon="fa-solid fa-magnifying-glass-chart" /></span>
                  <span className="bhs-l">{t('blog.statSeo')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search + Tag filter */}
      <div className="blog-controls">
        <div className="container">
          <div className="blog-controls-inner">
            <div className="blog-search-wrap">
              <Icon icon="fa-solid fa-magnifying-glass" />
              <input
                className="blog-search"
                type="search"
                placeholder={t('blog.searchPlaceholder')}
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                aria-label={t('blog.searchAriaLabel')}
              />
              {query && (
                <button className="blog-search-clear" onClick={() => handleSearch('')} aria-label={t('blog.searchClearAriaLabel')}>
                  <Icon icon="fa-solid fa-xmark" />
                </button>
              )}
            </div>
            <div className="blog-tags-wrap">
              <div className="blog-tags" role="list" aria-label={t('blog.tagsAriaLabel')}>
                <button
                  className={`blog-tag-chip${!effectiveTag ? ' active' : ''}`}
                  onClick={() => handleTag('')}
                  aria-pressed={!effectiveTag}
                >
                  {t('blog.tagAll')}
                </button>
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    className={`blog-tag-chip${effectiveTag === tag ? ' active' : ''}`}
                    onClick={() => handleTag(tag)}
                    aria-pressed={effectiveTag === tag}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article grid */}
      <section className="blog-list-sec">
        <div className="container">
          {visible.length === 0 ? (
            <div className="blog-empty">
              <Icon icon="fa-solid fa-file-circle-question" />
              <p>{t('blog.emptyPre')}<strong>{activeTag || query}</strong>{t('blog.emptyPost')}</p>
              <button className="btn btn-ghost" onClick={() => { setQuery(''); setActiveTag(''); setPage(1) }}>
                {t('blog.emptyCta')}
              </button>
            </div>
          ) : (
            <>
              <motion.div key={`${effectiveTag}|${page}`} className="blog-grid" variants={stagger} initial="hidden" animate="show">
                {visible.map((p) => (
                  <motion.article key={p.slug} className="blog-card" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
                    <Link to={`/blog/${p.slug}`} className="blog-card-link">
                      <div className="blog-cover" style={{ '--c': p.c, '--c2': p.c2 }}>
                        <img src={coverPath(p.slug, locale)} alt={p.title} width="1200" height="630" loading="lazy" onError={(e) => { e.target.style.display = 'none' }} />
                        <div className="blog-cover-tags">
                          {p.tags.map((tag) => <span key={tag}>{tag}</span>)}
                        </div>
                      </div>
                      <div className="blog-card-body">
                        <div className="blog-meta">
                          <span>{t('blog.publishedPrefix')}{formatDate(p.date, locale)}</span>
                          {p.updatedAt && p.updatedAt !== p.date && <span className="blog-meta-upd">{t('blog.updatedPrefix')}{formatDate(p.updatedAt, locale)}</span>}
                        </div>
                        <h2 className="blog-card-title">{p.title}</h2>
                        <p className="blog-card-excerpt">{p.excerpt}</p>
                        {(() => {
                          const vs = views.get(p.slug)
                          const count = vs?.view_count ?? 0
                          const lastIso = vs?.last_viewed_at || p.date
                          return (
                            <div className="blog-view-stat">
                              <Icon icon="fa-solid fa-eye" /> {count.toLocaleString(JSON_LD_LANG[locale] === 'zh-Hans' ? 'zh-CN' : JSON_LD_LANG[locale] || 'id-ID')}{t('blog.viewsSuffix')}
                              <span> · {count > 0 ? t('blog.lastViewedWord') : t('blog.publishedWord')} {formatLastViewed(lastIso)}</span>
                            </div>
                          )
                        })()}
                        <span className="blog-readmore">{t('blogTeaser.readMore')} <Icon icon="fa-solid fa-arrow-right" /></span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>

              {/* Result count when filtered */}
              {(query || effectiveTag) && (
                <p className="blog-result-count">
                  {t('blog.resultCount', { count: filtered.length })}
                  {effectiveTag ? t('blog.resultCountTopic', { tag: effectiveTag }) : ''}
                  {query ? t('blog.resultCountKeyword', { query }) : ''}
                </p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="blog-pagination" aria-label={t('blog.paginationAriaLabel')}>
                  <button className="pgn-btn" disabled={page === 1} onClick={() => goPage(page - 1)} aria-label={t('blog.prevPageAriaLabel')}>
                    <Icon icon="fa-solid fa-chevron-left" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      className={`pgn-btn${n === page ? ' active' : ''}`}
                      onClick={() => goPage(n)}
                      aria-current={n === page ? 'page' : undefined}
                    >
                      {n}
                    </button>
                  ))}
                  <button className="pgn-btn" disabled={page === totalPages} onClick={() => goPage(page + 1)} aria-label={t('blog.nextPageAriaLabel')}>
                    <Icon icon="fa-solid fa-chevron-right" />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

/* ════════════════════════════════════════════════ BLOG POST (/blog/:slug) */
export function BlogPost() {
  const { slug } = useParams()
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const rawPost = getPost(slug)
  const post = rawPost ? pick(rawPost, locale) : null
  const [viewStat, setViewStat] = useState(null)

  useEffect(() => {
    if (!slug) return
    incrementBlogView(slug).then((res) => { if (res) setViewStat(res) })
  }, [slug])

  if (!post) {
    return (
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">{t('blog.notFoundTitle')}</h1>
          <p className="page-sub">{t('blog.notFoundDesc')} <Link to="/blog" className="accent-text">{t('blog.backToBlog')}</Link>.</p>
        </div>
      </section>
    )
  }

  const url = `${SITE_URL}${withLocale(locale, `/blog/${post.slug}`)}`
  const cover = `${SITE_URL}${coverPath(post.slug, locale)}`

  /* Related: prefer posts sharing a tag, fall back to any recent post */
  const localizedMeta = postsMeta.map((p) => pick(p, locale))
  const byTag = localizedMeta.filter((p) => p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag)))
  const fallback = localizedMeta.filter((p) => p.slug !== post.slug && !byTag.find((r) => r.slug === p.slug))
  const related = [...byTag, ...fallback].slice(0, 3)

  const wordCount = post.body.trim().split(/\s+/).length
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: JSON_LD_LANG[locale] || 'id-ID',
    mainEntityOfPage: url,
    image: cover,
    keywords: post.tags.join(', '),
    articleSection: post.tags[0],
    wordCount,
    author: { '@type': 'Organization', name: BRAND.legal, url: `${SITE_URL}/` },
    publisher: { '@type': 'Organization', name: BRAND.legal, logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` } },
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('blog.breadcrumbHome'), item: `${SITE_URL}${withLocale(locale, '/')}` },
      { '@type': 'ListItem', position: 2, name: t('blog.breadcrumbBlog'), item: `${SITE_URL}${withLocale(locale, '/blog')}` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <>
      <Head>
        <title>{`${post.title} | AFSS`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta property="og:image" content={cover} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content={cover} />
        {post.tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}
        {hreflangTags}
      </Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <ReadingProgress />

      <article className="post">
        <div className="post-head">
          <div className="hero-glow" />
          <div className="container container-narrow">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">{t('blog.breadcrumbHome')}</Link> <span>/</span> <Link to="/blog">{t('blog.breadcrumbBlog')}</Link> <span>/</span> <span className="bc-current">{post.tags[0]}</span>
            </nav>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              {t('blog.publishedPrefix')}{formatDate(post.date, locale)}
              {post.updatedAt && post.updatedAt !== post.date && <span className="blog-meta-upd">{t('blog.updatedPrefix')}{formatDate(post.updatedAt, locale)}</span>}
              {viewStat && (
                <span className="blog-meta-upd">
                  {' · '}<Icon icon="fa-solid fa-eye" /> {viewStat.view_count.toLocaleString(JSON_LD_LANG[locale] === 'zh-Hans' ? 'zh-CN' : JSON_LD_LANG[locale] || 'id-ID')}{t('blog.viewsSuffix')} · {t('blog.lastViewedWord')} {formatLastViewed(viewStat.last_viewed_at)}
                </span>
              )}
            </div>
            <div className="post-tag-row">
              {post.tags.map((tag) => (
                <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`} className="post-tag-chip">{tag}</Link>
              ))}
            </div>
            <img className="post-cover" src={coverPath(post.slug, locale)} alt={post.title} width="1200" height="630" fetchpriority="high" />
          </div>
        </div>

        <div className="container container-narrow">
          <Article markdown={post.body} locale={locale} />

          <div className="post-cta">
            <h3>{t('blog.ctaTitle')}</h3>
            <p>{t('blog.ctaDesc')}</p>
            <a className="btn btn-pri btn-lg" href={waLink(t('blog.waMessage', { brand: BRAND.short, title: post.title }))} target="_blank" rel="noreferrer">
              <Icon icon="fa-brands fa-whatsapp" /> {t('blog.ctaButton')}
            </a>
          </div>
        </div>

        {related.length > 0 && (
          <div className="container">
            <div className="related-head">{t('blog.relatedHead')}</div>
            <div className="blog-grid blog-grid-3">
              {related.map((p) => (
                <article key={p.slug} className="blog-card">
                  <Link to={`/blog/${p.slug}`} className="blog-card-link">
                    <div className="blog-cover" style={{ '--c': p.c, '--c2': p.c2 }}>
                      <img src={coverPath(p.slug, locale)} alt={p.title} width="1200" height="630" loading="lazy" onError={(e) => { e.target.style.display = 'none' }} />
                      <div className="blog-cover-tags">
                        {p.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                    </div>
                    <div className="blog-card-body">
                      <div className="blog-meta">{t('blog.publishedPrefix')}{formatDate(p.date, locale)}</div>
                      <h2 className="blog-card-title">{p.title}</h2>
                      <span className="blog-readmore">{t('blogTeaser.readMore')} <Icon icon="fa-solid fa-arrow-right" /></span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  )
}
