import { motion } from 'framer-motion'
import { Head } from 'vite-react-ssg'
import { Icon } from '../Icon.jsx'
import { pricing, pricingBundles } from '../data/index.js'
import { Link } from '../i18n/link.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { useHreflangTags } from '../i18n/HreflangTags.jsx'
import { withLocale } from '../i18n/locales.js'
import { useSectionOverride } from '../lib/content.js'
import { useBrand, buildWaLink, SITE_URL, fadeUp, container, viewport, Reveal, Breadcrumb, HeroStatCard } from './shared.jsx'

/* ══════════════════════════════════════════════════ HARGA (/harga) */
// Colors keyed by the product's stable (locale-independent) slug — not by the
// translated `category` label, which differs per locale (Website/Software/E-Commerce -> 网站/软件/电商).
const PRICE_SLUG_COLOR = {
  'landing-page': 'var(--accent)', 'company-profile': 'var(--accent)',
  'software-custom': '#1E88A8', erp: '#1E88A8',
  'aplikasi-mobile': '#7C3AED',
  ecommerce: '#D97706', marketplace: '#D97706',
}

export function Harga() {
  const { locale, t } = useLocale()
  const brand = useBrand()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/harga')}`
  const title = t('harga.seoTitle')
  const desc = t('harga.seoDesc')
  const pricingOverride = useSectionOverride('pricing', pricing)
  const bundlesOverride = useSectionOverride('pricing_bundles', pricingBundles)
  const pricingItems = pricingOverride.map((p) => pick(p, locale))
  const bundleItems = bundlesOverride.map((b) => pick(b, locale))

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
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('harga.breadcrumb') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-tags" /> {t('harga.eyebrow')}</div>
              <h1 className="page-title">{t('harga.titlePre')}<span className="ital">{t('harga.titleItal')}</span>{t('harga.titlePost')}</h1>
              <p className="page-sub">{t('harga.sub')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={buildWaLink(brand.wa, t('harga.waAskPrice', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('harga.ctaAskPrice')}</a>
                <Link className="btn btn-ghost btn-lg" to="/ajukan-proyek"><Icon icon="fa-solid fa-rocket" /> {t('harga.ctaAjukan')}</Link>
              </div>
            </Reveal>
            <Reveal className="page-hero-stat-col"><HeroStatCard /></Reveal>
          </div>
        </div>
      </section>

      {/* ── Produk individual ── */}
      <section style={{ paddingTop: 60, paddingBottom: 24 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-box-open" /> {t('harga.prodEyebrow')}</div>
            <h2 className="sec-title">{t('harga.prodTitlePre')}<span className="ital">{t('harga.prodTitleItal')}</span>{t('harga.prodTitlePost')}</h2>
            <p className="sec-sub">{t('harga.prodSub')}</p>
          </Reveal>
          <motion.div className="price-prod-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {pricingItems.map((p) => (
              <motion.div key={p.slug} className={`price-prod-card${p.hot ? ' hot' : ''}`} variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                {p.hot && <span className="hot-tag">{t('harga.hotTag')}</span>}
                <div className="price-prod-top">
                  <div className="price-prod-ico" style={{ color: PRICE_SLUG_COLOR[p.slug], background: `color-mix(in srgb, ${PRICE_SLUG_COLOR[p.slug]} 12%, transparent)` }}>
                    <Icon icon={p.icon} />
                  </div>
                  <span className="price-prod-cat" style={{ color: PRICE_SLUG_COLOR[p.slug], background: `color-mix(in srgb, ${PRICE_SLUG_COLOR[p.slug]} 10%, transparent)`, borderColor: `color-mix(in srgb, ${PRICE_SLUG_COLOR[p.slug]} 25%, transparent)` }}>
                    {p.category}
                  </span>
                </div>
                <div className="price-prod-name">{p.name}</div>
                <p className="price-prod-desc">{p.desc}</p>
                <div className="price-prod-price-wrap">
                  <div className="price-prod-note">{p.note}</div>
                  <div className="price-prod-price-row">
                    <div>
                      {p.normalPrice && <div className="price-prod-normal">{p.normalPrice}</div>}
                      <div className="price-prod-price">{p.price}</div>
                    </div>
                    {p.save && <span className="price-prod-save">{p.save}</span>}
                  </div>
                </div>
                <ul className="price-prod-feats">
                  {p.feats.map((f) => <li key={f}><Icon icon="fa-solid fa-check" /> {f}</li>)}
                </ul>
                <a className="btn btn-pri" href={buildWaLink(brand.wa, t('harga.waProdInterest', { brand: brand.short, name: p.name, price: p.price }))} target="_blank" rel="noreferrer">
                  {t('harga.ctaConsult')} <Icon icon="fa-solid fa-arrow-right" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Paket kombinasi ── */}
      <section style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> {t('harga.bundleEyebrow')}</div>
            <h2 className="sec-title">{t('harga.bundleTitlePre')}<span className="ital">{t('harga.bundleTitleItal')}</span>{t('harga.bundleTitlePost')}</h2>
            <p className="sec-sub">{t('harga.bundleSub')}</p>
          </Reveal>
          <motion.div className="price-bundle-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {bundleItems.map((b, i) => (
              <motion.div key={i} className={`price-bundle-card${b.hot ? ' hot' : ''}`} variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
                <div className="price-bundle-top">
                  <div className="price-bundle-ico"><Icon icon={b.icon} /></div>
                  <span className="price-bundle-tag">{b.tag}</span>
                </div>
                <div className="price-bundle-name">{b.name}</div>
                <p className="price-bundle-desc">{b.desc}</p>
                <ul className="price-bundle-items">
                  {b.items.map((item) => (
                    <li key={item} className="price-bundle-item"><Icon icon="fa-solid fa-circle-check" /> {item}</li>
                  ))}
                </ul>
                <div className="price-bundle-price-row">
                  <div>
                    {b.normalPrice && <div className="price-bundle-normal">{b.normalPrice}</div>}
                    <div className="price-bundle-price">{b.price}</div>
                  </div>
                  <span className="price-bundle-save">{b.save}</span>
                </div>
                <a className="btn" href={buildWaLink(brand.wa, t('harga.waBundleInterest', { brand: brand.short, name: b.name, price: b.price }))} target="_blank" rel="noreferrer">
                  {t('harga.ctaStartConsult')} <Icon icon="fa-solid fa-arrow-right" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>{t('harga.ctaTitlePre')}<span className="ital">{t('harga.ctaTitleItal')}</span>{t('harga.ctaTitlePost')}</h2>
          <p>{t('harga.ctaDesc')}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={buildWaLink(brand.wa, t('harga.waConsultChoice', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('harga.ctaAskPrice')}</a>
            <Link className="btn btn-ghost btn-lg" to="/ajukan-proyek"><Icon icon="fa-solid fa-rocket" /> {t('harga.ctaAjukan')}</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

