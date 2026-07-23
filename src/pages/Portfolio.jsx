import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Head } from 'vite-react-ssg'
import { Icon } from '../Icon.jsx'
import { portfolioProjects } from '../data/index.js'
import { Link } from '../i18n/link.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { useHreflangTags } from '../i18n/HreflangTags.jsx'
import { withLocale } from '../i18n/locales.js'
import { track } from '../lib/track.js'
import { useBrand, buildWaLink, SITE_URL, Reveal, Breadcrumb, HeroStatCard, PortoMock } from './shared.jsx'

const PORTO_TAB_SLUGS = ['semua', 'landing-page', 'software-custom', 'erp', 'app-mobile', 'ecommerce', 'marketplace']
const PORTO_TAB_KEYS = { semua: 'semua', 'landing-page': 'landingPage', 'software-custom': 'softwareCustom', erp: 'erp', 'app-mobile': 'appMobile', ecommerce: 'ecommerce', marketplace: 'marketplace' }

export function Portfolio() {
  const { locale, t } = useLocale()
  const brand = useBrand()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/portofolio')}`
  const title = t('portfolio.seoTitle')
  const desc = t('portfolio.seoDesc')
  const tabLabels = t('portfolio.tabs')
  const [activeTab, setActiveTab] = useState('semua')

  const filteredRaw = activeTab === 'semua'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.catSlug === activeTab)
  const filtered = filteredRaw.map((p) => pick(p, locale))

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('portfolio.breadcrumb') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-images" /> {t('portfolio.eyebrow')}</div>
              <h1 className="page-title">{t('portfolio.titlePre')}<span className="ital">{t('portfolio.titleItal')}</span>{t('portfolio.titlePost')}</h1>
              <p className="page-sub">{t('portfolio.sub', { count: portfolioProjects.length })}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-wa btn-lg" href={buildWaLink(brand.wa, t('portfolio.waDiscuss', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('portfolio.ctaDiscuss')}</a>
                <Link className="btn btn-ghost btn-lg" to="/estimasi"><Icon icon="fa-solid fa-calculator" /> {t('portfolio.ctaEstimate')}</Link>
              </div>
            </Reveal>
            <Reveal className="page-hero-stat-col"><HeroStatCard /></Reveal>
          </div>
        </div>
      </section>

      {/* Tab filter */}
      <div className="porto-tabs-wrap">
        <div className="container">
          <div className="porto-tabs">
            {PORTO_TAB_SLUGS.map(slug => (
              <button key={slug} className={`porto-tab${activeTab === slug ? ' active' : ''}`} onClick={() => setActiveTab(slug)}>
                {tabLabels[PORTO_TAB_KEYS[slug]]}
                <span className="porto-tab-count">{slug === 'semua' ? portfolioProjects.length : portfolioProjects.filter(p => p.catSlug === slug).length}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="porto-grid"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              {filtered.map((p, i) => (
                <motion.div key={p.slug} className="porto-card spot" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/portofolio/${p.slug}`} className="porto-card-link">
                    <PortoMock p={p} />
                    <div className="porto-card-body">
                      <div className="porto-card-meta">
                        <span className="porto-cat-badge">{p.cat}</span>
                      </div>
                      <h3 className="porto-card-title">{p.title}</h3>
                      <p className="porto-card-tagline">{p.tagline}</p>
                      <div className="porto-card-result"><Icon icon="fa-solid fa-arrow-trend-up" /> {p.result} <span>— {p.result2}</span></div>
                      <div className="porto-card-tags">{p.tags.slice(0,3).map(tag => <span key={tag}>{tag}</span>)}</div>
                    </div>
                  </Link>
                  <div className="porto-card-footer">
                    {p.visitUrl && (
                      <a href={p.visitUrl} target="_blank" rel="noreferrer" className="porto-card-demo-btn" onClick={() => track('demo_open', { project: p.slug })}>
                        <Icon icon="fa-solid fa-arrow-up-right-from-square" /> {t('demoTeaser.liveDemo')}
                      </a>
                    )}
                    <Link to={`/portofolio/${p.slug}`} className="porto-card-detail-link">
                      {t('portfolio.viewDetail')} <Icon icon="fa-solid fa-arrow-right" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
              <Icon icon="fa-solid fa-folder-open" style={{ fontSize: '2rem', marginBottom: 12, opacity: .4 }} />
              <p>{t('portfolio.emptyState')}</p>
            </div>
          )}
        </div>
      </section>

      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>{t('portfolio.ctaTitlePre')}<span className="ital">{t('portfolio.ctaTitleItal')}</span>{t('portfolio.ctaTitlePost')}</h2>
          <p>{t('portfolio.ctaDesc')}</p>
          <div className="btns">
            <a className="btn btn-wa btn-lg" href={buildWaLink(brand.wa, t('portfolio.waDiscuss', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('portfolio.ctaDiscuss')}</a>
            <Link className="btn btn-ghost btn-lg" to="/estimasi">{t('portfolio.ctaEstimate')} <Icon icon="fa-solid fa-calculator" /></Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

