import { useState, useEffect } from 'react'
import { marked } from 'marked'
import { Link, useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { motion } from 'framer-motion'
import { BRAND, waLink } from './data.js'
import { Icon } from './Icon.jsx'
import { SITE_URL, getAllPosts, getPost, formatDateId } from './blog.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', duration: 0.7, bounce: 0 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } }

marked.setOptions({ gfm: true, breaks: false })

const PER_PAGE = 6

function Article({ markdown }) {
  return <div className="article" dangerouslySetInnerHTML={{ __html: marked.parse(markdown.trim()) }} />
}

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
  const all = getAllPosts()
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('')
  const [page, setPage] = useState(1)

  // Hitung frekuensi tag, ambil top 15 yang paling banyak dipakai
  const tagFreq = all.flatMap((p) => p.tags).reduce((acc, t) => { acc[t] = (acc[t] || 0) + 1; return acc; }, {})
  const allTags = Object.entries(tagFreq).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([t]) => t).sort()

  // Posts matching the search query (used to derive available tag chips)
  const q = query.trim().toLowerCase()
  const bySearch = q
    ? all.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
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
  const handleTag = (t) => { setActiveTag(effectiveTag === t ? '' : t); setPage(1) }
  const goPage = (n) => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const title = 'Blog AFSS — Tips Website, Aplikasi & Software House'
  const description = 'Artikel & panduan seputar pembuatan website, aplikasi mobile, dan memilih software house yang tepat di Indonesia.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
      </Head>

      {/* Hero */}
      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <div className="eyebrow"><Icon icon="fa-solid fa-newspaper" /> Blog</div>
              <h1 className="page-title">Wawasan seputar <span className="ital">website &amp; aplikasi</span></h1>
              <p className="page-sub">Panduan praktis soal biaya, timeline, teknologi, dan cara memilih partner digital yang tepat untuk bisnis Anda.</p>
            </motion.div>
            <motion.div className="page-hero-stat-col" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.12 }}>
              <div className="blog-hero-card">
                <div className="bhs-item">
                  <span className="bhs-n">{all.length}</span>
                  <span className="bhs-l">Artikel tersedia</span>
                </div>
                <div className="bhs-item">
                  <span className="bhs-n">{allTags.length}</span>
                  <span className="bhs-l">Topik tersedia</span>
                </div>
                <div className="bhs-item">
                  <span className="bhs-n bhs-icon"><Icon icon="fa-solid fa-calendar-check" /></span>
                  <span className="bhs-l">Update rutin</span>
                </div>
                <div className="bhs-item">
                  <span className="bhs-n bhs-icon"><Icon icon="fa-solid fa-magnifying-glass-chart" /></span>
                  <span className="bhs-l">SEO-targeted</span>
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
                placeholder="Cari artikel..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                aria-label="Cari artikel"
              />
              {query && (
                <button className="blog-search-clear" onClick={() => handleSearch('')} aria-label="Hapus pencarian">
                  <Icon icon="fa-solid fa-xmark" />
                </button>
              )}
            </div>
            <div className="blog-tags-wrap">
              <div className="blog-tags" role="list" aria-label="Filter topik">
                <button
                  className={`blog-tag-chip${!effectiveTag ? ' active' : ''}`}
                  onClick={() => handleTag('')}
                  aria-pressed={!effectiveTag}
                >
                  Semua
                </button>
                {availableTags.map((t) => (
                  <button
                    key={t}
                    className={`blog-tag-chip${effectiveTag === t ? ' active' : ''}`}
                    onClick={() => handleTag(t)}
                    aria-pressed={effectiveTag === t}
                  >
                    {t}
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
              <p>Tidak ada artikel untuk <strong>{activeTag || query}</strong>.</p>
              <button className="btn btn-ghost" onClick={() => { setQuery(''); setActiveTag(''); setPage(1) }}>
                Lihat semua artikel
              </button>
            </div>
          ) : (
            <>
              <motion.div key={`${effectiveTag}|${page}`} className="blog-grid" variants={stagger} initial="hidden" animate="show">
                {visible.map((p) => (
                  <motion.article key={p.slug} className="blog-card" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
                    <Link to={`/blog/${p.slug}`} className="blog-card-link">
                      <div className="blog-cover" style={{ '--c': p.c, '--c2': p.c2 }}>
                        <img src={`/blog/${p.slug}.png`} alt={`Ilustrasi artikel: ${p.title}`} width="1200" height="630" loading="lazy" onError={(e) => { e.target.style.display = 'none' }} />
                        <div className="blog-cover-tags">
                          {p.tags.map((t) => <span key={t}>{t}</span>)}
                        </div>
                      </div>
                      <div className="blog-card-body">
                        <div className="blog-meta">
                          <span>Terbit {formatDateId(p.date)}</span>
                          {p.updatedAt && p.updatedAt !== p.date && <span className="blog-meta-upd"> · Diperbarui {formatDateId(p.updatedAt)}</span>}
                        </div>
                        <h2 className="blog-card-title">{p.title}</h2>
                        <p className="blog-card-excerpt">{p.excerpt}</p>
                        <span className="blog-readmore">Baca selengkapnya <Icon icon="fa-solid fa-arrow-right" /></span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>

              {/* Result count when filtered */}
              {(query || effectiveTag) && (
                <p className="blog-result-count">
                  {filtered.length} artikel ditemukan
                  {effectiveTag ? ` — topik "${effectiveTag}"` : ''}
                  {query ? ` — kata kunci "${query}"` : ''}
                </p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="blog-pagination" aria-label="Halaman blog">
                  <button className="pgn-btn" disabled={page === 1} onClick={() => goPage(page - 1)} aria-label="Halaman sebelumnya">
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
                  <button className="pgn-btn" disabled={page === totalPages} onClick={() => goPage(page + 1)} aria-label="Halaman berikutnya">
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
  const post = getPost(slug)

  if (!post) {
    return (
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Artikel tidak ditemukan</h1>
          <p className="page-sub">Maaf, artikel yang Anda cari tidak ada. <Link to="/blog" className="accent-text">Kembali ke Blog</Link>.</p>
        </div>
      </section>
    )
  }

  const url = `${SITE_URL}/blog/${post.slug}`
  const cover = `${SITE_URL}/blog/${post.slug}.png`

  /* Related: prefer posts sharing a tag, fall back to any recent post */
  const byTag = getAllPosts().filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
  const fallback = getAllPosts().filter((p) => p.slug !== post.slug && !byTag.find((r) => r.slug === p.slug))
  const related = [...byTag, ...fallback].slice(0, 3)

  const wordCount = post.body.trim().split(/\s+/).length
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'id-ID',
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
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
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
        {post.tags.map((t) => <meta key={t} property="article:tag" content={t} />)}
      </Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <ReadingProgress />

      <article className="post">
        <div className="post-head">
          <div className="hero-glow" />
          <div className="container container-narrow">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Beranda</Link> <span>/</span> <Link to="/blog">Blog</Link> <span>/</span> <span className="bc-current">{post.tags[0]}</span>
            </nav>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              Terbit {formatDateId(post.date)}
              {post.updatedAt && post.updatedAt !== post.date && <span className="blog-meta-upd"> · Diperbarui {formatDateId(post.updatedAt)}</span>}
            </div>
            <div className="post-tag-row">
              {post.tags.map((t) => (
                <Link key={t} to={`/blog?tag=${encodeURIComponent(t)}`} className="post-tag-chip">{t}</Link>
              ))}
            </div>
            <img className="post-cover" src={`/blog/${post.slug}.png`} alt={`Ilustrasi artikel: ${post.title}`} width="1200" height="630" fetchpriority="high" />
          </div>
        </div>

        <div className="container container-narrow">
          <Article markdown={post.body} />

          <div className="post-cta">
            <h3>Punya proyek serupa?</h3>
            <p>Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan Anda — kami bantu temukan solusi terbaik.</p>
            <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya baru membaca artikel "${post.title}" dan ingin konsultasi.`)} target="_blank" rel="noreferrer">
              <Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis
            </a>
          </div>
        </div>

        {related.length > 0 && (
          <div className="container">
            <div className="related-head">Artikel terkait</div>
            <div className="blog-grid blog-grid-3">
              {related.map((p) => (
                <article key={p.slug} className="blog-card">
                  <Link to={`/blog/${p.slug}`} className="blog-card-link">
                    <div className="blog-cover" style={{ '--c': p.c, '--c2': p.c2 }}>
                      <img src={`/blog/${p.slug}.png`} alt={`Ilustrasi artikel: ${p.title}`} width="1200" height="630" loading="lazy" onError={(e) => { e.target.style.display = 'none' }} />
                      <div className="blog-cover-tags">
                        {p.tags.map((t) => <span key={t}>{t}</span>)}
                      </div>
                    </div>
                    <div className="blog-card-body">
                      <div className="blog-meta">Terbit {formatDateId(p.date)}</div>
                      <h2 className="blog-card-title">{p.title}</h2>
                      <span className="blog-readmore">Baca selengkapnya <Icon icon="fa-solid fa-arrow-right" /></span>
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
