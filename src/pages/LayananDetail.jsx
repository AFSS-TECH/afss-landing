import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Icon } from '../Icon.jsx'
import { products, why, getProductBySlug } from '../data/index.js'
import { Link } from '../i18n/link.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { useHreflangTags } from '../i18n/HreflangTags.jsx'
import { withLocale } from '../i18n/locales.js'
import { useBrand, buildWaLink, SITE_URL, fadeUp, container, viewport, Reveal, Breadcrumb } from './shared.jsx'
import { SERVICE_CONTENT } from './layanan-detail-content.js'

/* ══════════════════════════════════════════════════ LAYANAN DETAIL (/layanan/:slug) */
export function LayananDetail() {
  const { slug } = useParams()
  const [openFaq, setOpenFaq] = useState(-1)
  const { locale, t } = useLocale()
  const brand = useBrand()
  const hreflangTags = useHreflangTags()

  const productRaw = getProductBySlug(slug)
  const product = productRaw ? pick(productRaw, locale) : null
  const contentRaw = SERVICE_CONTENT[slug]
  const content = contentRaw ? pick(contentRaw, locale) : null

  if (!product || !content) {
    return (
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">{t('layananDetail.notFoundTitle')}</h1>
          <p className="page-sub"><Link to="/layanan" className="accent-text">{t('layananDetail.notFoundLink')}</Link></p>
        </div>
      </section>
    )
  }

  const canonicalPath = `/layanan/${slug}`
  const url = `${SITE_URL}${withLocale(locale, canonicalPath)}`
  const related = products.filter((p) => contentRaw.relatedSlugs.includes(p.slug)).map((p) => pick(p, locale))

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.beranda'), item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: t('layananDetail.breadcrumbLayanan'), item: `${SITE_URL}/layanan` },
      { '@type': 'ListItem', position: 3, name: product.name, item: url },
    ],
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: product.name,
    description: content.longDesc,
    provider: { '@type': 'Organization', name: brand.legal, url: `${SITE_URL}/` },
    url,
    areaServed: 'ID',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.serviceFaq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <Head>
        <title>{`${content.headline} | AFSS`}</title>
        <meta name="description" content={content.subline} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={content.headline} />
        <meta property="og:description" content={content.subline} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={content.headline} />
        <meta name="twitter:description" content={content.subline} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[
              { label: t('nav.beranda'), to: '/' },
              { label: t('layananDetail.breadcrumbLayanan'), to: '/layanan' },
              { label: product.name },
            ]} />
            <div className="eyebrow"><Icon icon={product.icon} /> {t('layananDetail.breadcrumbLayanan')}</div>
            <h1 className="page-title">{content.headline.split(' ').slice(0, 4).join(' ')} <span className="ital">{content.headline.split(' ').slice(4).join(' ')}</span></h1>
            <p className="page-sub">{content.subline}</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 32 }}>
              <a className="btn btn-pri btn-lg" href={buildWaLink(brand.wa, t('layananDetail.waConsult', { brand: brand.short, name: product.name }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('layananDetail.ctaConsult')}</a>
              <Link className="btn btn-ghost btn-lg" to="/layanan"><Icon icon="fa-solid fa-layer-group" /> {t('layananDetail.ctaMore')}</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About this service */}
      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <div className="pages-two-col">
            <Reveal>
              <div className="eyebrow"><Icon icon="fa-solid fa-circle-question" /> {t('layananDetail.aboutEyebrow')}</div>
              <h2 className="sec-title">{t('layananDetail.aboutTitlePre')}<span className="ital">{t('layananDetail.aboutTitleItal')}</span>{t('layananDetail.aboutTitlePost')}</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '1.05rem', marginBottom: 24 }}>{content.longDesc}</p>
              <ul className="svc-feats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {product.feats.map((f) => <li key={f}><Icon icon="fa-solid fa-check" /> {f}</li>)}
              </ul>
            </Reveal>
            <Reveal className="page-detail-badge">
              <div className="kpi-card" style={{ background: 'var(--navy)', color: '#fff', borderRadius: 'var(--r-lg)', padding: '36px 32px' }}>
                <div style={{ fontSize: '3rem', marginBottom: 12 }}><Icon icon={product.icon} /></div>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans', marginBottom: 8, lineHeight: 1.2 }}>{product.name}</div>
                <div style={{ opacity: .7, fontSize: '.95rem', marginBottom: 24, lineHeight: 1.6 }}>{product.desc}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.12)', padding: '8px 18px', borderRadius: 50, fontSize: '.85rem', fontWeight: 600 }}>
                  <Icon icon="fa-solid fa-circle-check" /> {product.metric}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="whyus" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-award" /> {t('layananDetail.benefitsEyebrow')}</div>
            <h2 className="sec-title">{t('layananDetail.benefitsTitlePre')}<span className="ital">{t('layananDetail.benefitsTitleItal')}</span>{t('layananDetail.benefitsTitlePost')}</h2>
          </Reveal>
          <motion.div className="why-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {content.benefits.map((b) => (
              <motion.div key={b.title} className="why-card spot" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                <div className="why-ico"><Icon icon={b.icon} /></div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container container-narrow">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-circle-question" /> {t('layananDetail.faqEyebrow')}</div>
            <h2 className="sec-title">{t('layananDetail.faqTitlePre')}<span className="ital">{t('layananDetail.faqTitleItal')}</span>{t('layananDetail.faqTitlePost')}</h2>
          </Reveal>
          <div className="faq-list">
            {content.serviceFaq.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={f.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button className="faq-q" onClick={() => setOpenFaq(isOpen ? -1 : i)} aria-expanded={isOpen}>
                    <span>{f.q}</span>
                    <Icon icon={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div className="faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                        <p>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section style={{ paddingTop: 40, paddingBottom: 60 }}>
          <div className="container">
            <Reveal className="sec-header center">
              <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> {t('layananDetail.relatedEyebrow')}</div>
              <h2 className="sec-title">{t('layananDetail.relatedTitlePre')}<span className="ital">{t('layananDetail.relatedTitleItal')}</span>{t('layananDetail.relatedTitlePost')}</h2>
            </Reveal>
            <motion.div className="svc-grid" style={{ gridTemplateColumns: `repeat(${related.length}, 1fr)`, maxWidth: 780, margin: '0 auto' }} variants={container} initial="hidden" whileInView="show" viewport={viewport}>
              {related.map((p) => (
                <motion.div key={p.slug} className="svc-card spot" variants={fadeUp} whileHover={{ y: -6 }}>
                  <div className="svc-top"><div className="svc-ico"><Icon icon={p.icon} /></div></div>
                  <div className="svc-name">{p.name}</div>
                  <p className="svc-desc">{p.desc}</p>
                  <div className="svc-foot">
                    <Link className="btn" to={`/layanan/${p.slug}`}>{t('layananDetail.relatedMore')} <Icon icon="fa-solid fa-arrow-right" /></Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>{t('layananDetail.ctaTitlePre')}<span className="ital">{product.name.toLowerCase()}</span>{t('layananDetail.ctaTitlePost')}</h2>
          <p>{t('layananDetail.ctaDesc')}</p>
          <a className="btn btn-pri btn-lg" href={buildWaLink(brand.wa, t('layananDetail.waStart', { brand: brand.short, name: product.name }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('layananDetail.ctaStart')}</a>
        </Reveal>
      </section>
    </>
  )
}

