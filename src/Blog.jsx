import { marked } from 'marked'
import { Link, useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { motion } from 'framer-motion'
import { BRAND, waLink } from './data.js'
import { SITE_URL, getAllPosts, getPost, formatDateId } from './blog.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', duration: 0.7, bounce: 0 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } }

marked.setOptions({ gfm: true, breaks: false })

/* ── Reusable article body (Markdown → HTML) ── */
function Article({ markdown }) {
  return <div className="article" dangerouslySetInnerHTML={{ __html: marked.parse(markdown.trim()) }} />
}

/* ════════════════════════════════════════════════ BLOG INDEX (/blog) */
export function BlogIndex() {
  const all = getAllPosts()
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

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className="eyebrow"><i className="fa-solid fa-newspaper" /> Blog</div>
            <h1 className="page-title">Wawasan seputar <span className="ital">website &amp; aplikasi</span></h1>
            <p className="page-sub">Panduan praktis soal biaya, timeline, teknologi, dan cara memilih partner digital yang tepat untuk bisnis Anda.</p>
          </motion.div>
        </div>
      </section>

      <section className="blog-list-sec">
        <div className="container">
          <motion.div className="blog-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>
            {all.map((p) => (
              <motion.article key={p.slug} className="blog-card" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
                <Link to={`/blog/${p.slug}`} className="blog-card-link">
                  <div className="blog-cover" style={{ '--c': p.c, '--c2': p.c2 }}>
                    <img src={`/blog/${p.slug}.png`} alt={`Ilustrasi artikel: ${p.title}`} width="1200" height="630" loading="lazy" />
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-meta">{formatDateId(p.date)} · {p.readMinutes} menit baca</div>
                    <h2 className="blog-card-title">{p.title}</h2>
                    <p className="blog-card-excerpt">{p.excerpt}</p>
                    <span className="blog-readmore">Baca selengkapnya <i className="fa-solid fa-arrow-right" /></span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
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
  const related = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2)

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
      </Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <article className="post">
        <div className="post-head">
          <div className="hero-glow" />
          <div className="container container-narrow">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Beranda</Link> <span>/</span> <Link to="/blog">Blog</Link> <span>/</span> <span className="bc-current">{post.tags[0]}</span>
            </nav>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">{formatDateId(post.date)} · {post.readMinutes} menit baca</div>
            <img className="post-cover" src={`/blog/${post.slug}.png`} alt={`Ilustrasi artikel: ${post.title}`} width="1200" height="630" fetchpriority="high" />
          </div>
        </div>

        <div className="container container-narrow">
          <Article markdown={post.body} />

          <div className="post-cta">
            <h3>Punya proyek serupa?</h3>
            <p>Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan Anda — kami bantu temukan solusi terbaik.</p>
            <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya baru membaca artikel "${post.title}" dan ingin konsultasi.`)} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-whatsapp" /> Konsultasi Gratis
            </a>
          </div>
        </div>

        {related.length > 0 && (
          <div className="container">
            <div className="related-head">Artikel lainnya</div>
            <div className="blog-grid">
              {related.map((p) => (
                <article key={p.slug} className="blog-card">
                  <Link to={`/blog/${p.slug}`} className="blog-card-link">
                    <div className="blog-cover" style={{ '--c': p.c, '--c2': p.c2 }}>
                      <img src={`/blog/${p.slug}.png`} alt={`Ilustrasi artikel: ${p.title}`} width="1200" height="630" loading="lazy" />
                    </div>
                    <div className="blog-card-body">
                      <div className="blog-meta">{formatDateId(p.date)} · {p.readMinutes} menit baca</div>
                      <h2 className="blog-card-title">{p.title}</h2>
                      <span className="blog-readmore">Baca selengkapnya <i className="fa-solid fa-arrow-right" /></span>
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
