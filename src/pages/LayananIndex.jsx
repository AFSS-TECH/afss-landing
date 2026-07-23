import { motion } from 'framer-motion'
import { Head } from 'vite-react-ssg'
import { Icon } from '../Icon.jsx'
import { products } from '../data/index.js'
import { Link } from '../i18n/link.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { useHreflangTags } from '../i18n/HreflangTags.jsx'
import { withLocale } from '../i18n/locales.js'
import { useBrand, buildWaLink, SITE_URL, fadeUp, container, viewport, Reveal, Breadcrumb, HeroStatCard } from './shared.jsx'

/* ══════════════════════════════════════════════════ LAYANAN INDEX (/layanan) */
const SVC_CATS = [
  { id: 'web', icon: 'fa-solid fa-globe', slugs: ['landing-page', 'company-profile'] },
  { id: 'software', icon: 'fa-solid fa-code', slugs: ['software-custom', 'erp'] },
  { id: 'mobile', icon: 'fa-solid fa-mobile-screen', slugs: ['aplikasi-mobile'] },
  { id: 'commerce', icon: 'fa-solid fa-cart-shopping', slugs: ['ecommerce', 'marketplace'] },
]

export function LayananIndex() {
  const { locale, t } = useLocale()
  const brand = useBrand()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/layanan')}`
  const title = t('layananIndex.seoTitle')
  const desc = t('layananIndex.seoDesc')
  const cats = t('layananIndex.cats')
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

      {/* Hero */}
      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('layananIndex.eyebrow') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> {t('layananIndex.eyebrow')}</div>
              <h1 className="page-title">{t('layananIndex.titlePre')}<span className="ital">{t('layananIndex.titleItal')}</span>{t('layananIndex.titlePost')}</h1>
              <p className="page-sub">{t('layananIndex.sub')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={buildWaLink(brand.wa, t('keunggulan.waConsult', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('layananIndex.ctaConsult')}</a>
                <Link className="btn btn-ghost btn-lg" to="/portofolio">{t('layananIndex.ctaPortfolio')}</Link>
              </div>
            </Reveal>
            <Reveal className="page-hero-stat-col">
              <HeroStatCard />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Category sections */}
      <div className="svc-pg-wrap">
        {SVC_CATS.map((cat) => {
          const catProds = products.filter((p) => cat.slugs.includes(p.slug)).map((p) => pick(p, locale))
          const catMeta = cats[cat.id]
          return (
            <section key={cat.id} className="svc-cat-sec">
              <div className="container">
                {/* Category header */}
                <Reveal className="svc-cat-hd">
                  <div className="svc-cat-ico"><Icon icon={cat.icon} /></div>
                  <div>
                    <div className="svc-cat-name">{catMeta.label}</div>
                    <div className="svc-cat-sub">{catMeta.sub}</div>
                  </div>
                </Reveal>

                {/* Cards grid */}
                <motion.div className="svc-pg-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
                  {catProds.map((p) => (
                    <motion.div key={p.slug} variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                      <Link to={`/layanan/${p.slug}`} className={`svc-item${p.hot ? ' hot' : ''}`}>
                        {p.hot && <span className="hot-tag">{t('layananIndex.hotTag')}</span>}
                        <div className="svc-item-hd">
                          <div className="svc-item-ico"><Icon icon={p.icon} /></div>
                          <span className="svc-item-metric">{p.metric}</span>
                        </div>
                        <div className="svc-item-name">{p.name}</div>
                        <p className="svc-item-desc">{p.desc}</p>
                        <div className="svc-item-cta">
                          {t('layananIndex.viewDetail')} <Icon icon="fa-solid fa-arrow-right" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          )
        })}
      </div>

      {/* CTA */}
      <section className="cta-band">
        <Reveal className="cta-card">
          <h2>{t('layananIndex.ctaTitlePre')}<span className="ital">{t('layananIndex.ctaTitleItal')}</span>{t('layananIndex.ctaTitlePost')}</h2>
          <p>{t('layananIndex.ctaDesc')}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={buildWaLink(brand.wa, t('keunggulan.waConsult', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('layananIndex.ctaConsult')}</a>
            <Link className="btn btn-ghost btn-lg" to="/ajukan-proyek"><Icon icon="fa-solid fa-rocket" /> {t('layananIndex.ctaAjukan')}</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

