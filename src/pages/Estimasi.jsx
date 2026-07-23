import { useState } from 'react'
import { motion } from 'framer-motion'
import { Head } from 'vite-react-ssg'
import { Icon } from '../Icon.jsx'
import { products } from '../data/index.js'
import { Link } from '../i18n/link.jsx'
import { useLocale } from '../i18n/context.jsx'
import { useHreflangTags } from '../i18n/HreflangTags.jsx'
import { withLocale } from '../i18n/locales.js'
import { useBrand, buildWaLink, SITE_URL, Reveal, Breadcrumb } from './shared.jsx'

/* ══════════════════════════════════════════════════ ESTIMASI (/estimasi) */
// Mirrors App.jsx's Estimator component exactly (same products/addons) — structural
// data only, labels are locale-keyed via t('estimator.*') (see src/i18n/strings.js).
const EST_PRODUCT_IDS = ['landing', 'profile', 'software', 'mobile', 'erp', 'ecommerce', 'marketplace']
const EST_PRODUCT_META = {
  landing:     { base: [1.5, 5],   perUnit: 0.4, unitKey: 'halaman', icon: 'fa-solid fa-rectangle-ad' },
  profile:     { base: [4.5, 12],  perUnit: 0.6, unitKey: 'halaman', icon: 'fa-solid fa-briefcase' },
  software:    { base: [8, 30],    perUnit: 2,   unitKey: 'modul',   icon: 'fa-solid fa-code' },
  mobile:      { base: [15, 60],   perUnit: 3,   unitKey: 'fitur',   icon: 'fa-solid fa-mobile-screen' },
  erp:         { base: [28, 100],  perUnit: 5,   unitKey: 'modul',   icon: 'fa-solid fa-circle-nodes' },
  ecommerce:   { base: [18, 50],   perUnit: 2.5, unitKey: 'modul',   icon: 'fa-solid fa-cart-shopping' },
  marketplace: { base: [65, 150],  perUnit: 8,   unitKey: 'modul',   icon: 'fa-solid fa-store' },
}
const EST_ADDON_IDS = ['seo', 'hosting', 'payment', 'wa', 'maint', 'uiux']
const EST_ADDON_PRICE = { seo: 1.5, hosting: 0.8, payment: 2, wa: 1.5, maint: 2.4, uiux: 3 }

function fmtPriceEst(val, unitSmall, unitBig) {
  if (val >= 1000) return `Rp ${(val / 1000).toFixed(0)} ${unitBig}`
  return `Rp ${val % 1 === 0 ? val : val.toFixed(1)} ${unitSmall}`
}

export function Estimasi() {
  const { locale, t } = useLocale()
  const brand = useBrand()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/estimasi')}`
  const title = t('estimasi.seoTitle')
  const desc = t('estimasi.seoDesc')

  const [prodId, setProdId] = useState('profile')
  const [units, setUnits] = useState(5)
  const [addons, setAddons] = useState({})

  const prodLabels = t('estimator.products')
  const unitLabels = t('estimator.units')
  const addonLabels = t('estimator.addonLabels')
  const unitSmall = t('estimator.priceUnitSmall')
  const unitBig = t('estimator.priceUnitBig')

  const meta = EST_PRODUCT_META[prodId]
  const unit = unitLabels[meta.unitKey]
  const label = prodLabels[prodId]
  const addonTotal = EST_ADDON_IDS.filter((id) => addons[id]).reduce((s, id) => s + EST_ADDON_PRICE[id], 0)
  const low  = meta.base[0] + (units - 1) * meta.perUnit + addonTotal
  const high = meta.base[1] + (units - 1) * meta.perUnit * 1.6 + addonTotal
  const toggle = (id) => setAddons((a) => ({ ...a, [id]: !a[id] }))

  const waMsg = encodeURIComponent(
    t('estimator.waIntro', {
      brand: brand.short, jenis: label, units, unit,
      estLow: fmtPriceEst(low, unitSmall, unitBig), estHigh: fmtPriceEst(high, unitSmall, unitBig),
    })
  )

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('estimasi.breadcrumb') }]} />
            <div className="eyebrow"><Icon icon="fa-solid fa-calculator" /> {t('estimasi.eyebrow')}</div>
            <h1 className="page-title">{t('estimasi.titlePre')}<span className="ital">{t('estimasi.titleItal')}</span>{t('estimasi.titlePost')}</h1>
            <p className="page-sub">{t('estimasi.sub')}</p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 20, paddingBottom: 80, background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 900px 500px at 50% -10%, rgba(29,78,216,.20), transparent 60%), radial-gradient(circle 400px at 90% 100%, rgba(16,199,178,.16), transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="est-wrap">
            <div className="est-left">
              <div className="est-step">
                <div className="est-step-label"><span>1</span> {t('estimator.step1')}</div>
                <div className="est-prod-grid">
                  {EST_PRODUCT_IDS.map((id) => (
                    <button key={id} className={`est-prod-btn${prodId===id?' active':''}`} onClick={() => { setProdId(id); setUnits(5) }}>
                      <Icon icon={EST_PRODUCT_META[id].icon} /><span>{prodLabels[id]}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="est-step">
                <div className="est-step-label"><span>2</span> {t('estimator.step2Label', { unit, units })}</div>
                <input type="range" min="1" max="15" value={units} onChange={e => setUnits(+e.target.value)} className="est-slider" />
                <div className="est-slider-marks"><span>1</span><span>5</span><span>10</span><span>15</span></div>
              </div>
              <div className="est-step">
                <div className="est-step-label"><span>3</span> {t('estimator.step3')}</div>
                <div className="est-addons">
                  {EST_ADDON_IDS.map((id) => (
                    <button key={id} className={`est-addon-btn${addons[id]?' active':''}`} onClick={() => toggle(id)}>
                      <span className={`est-addon-check${addons[id]?' on':''}`}><Icon icon="fa-solid fa-check" /></span>
                      <span className="est-addon-label">{addonLabels[id]}</span>
                      <span className="est-addon-price">+ {fmtPriceEst(EST_ADDON_PRICE[id], unitSmall, unitBig)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="est-result">
              <div className="est-result-inner">
                <div className="est-result-label">{t('estimator.resultLabel')}</div>
                <motion.div className="est-result-low" key={`${prodId}-${units}-${JSON.stringify(addons)}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  {fmtPriceEst(low, unitSmall, unitBig)}
                </motion.div>
                <div className="est-result-range">{t('estimator.upTo')} <strong>{fmtPriceEst(high, unitSmall, unitBig)}</strong></div>
                <div className="est-divider" />
                <div className="est-breakdown">
                  <div className="est-brow"><span>{t('estimator.baseLabel', { label })}</span><span>{fmtPriceEst(meta.base[0], unitSmall, unitBig)} – {fmtPriceEst(meta.base[1], unitSmall, unitBig)}</span></div>
                  <div className="est-brow"><span>{units} {unit} × {fmtPriceEst(meta.perUnit, unitSmall, unitBig)}</span><span>+{fmtPriceEst((units-1)*meta.perUnit, unitSmall, unitBig)}</span></div>
                  {addonTotal > 0 && <div className="est-brow accent"><span>{t('estimator.addonSelected')}</span><span>+{fmtPriceEst(addonTotal, unitSmall, unitBig)}</span></div>}
                </div>
                <div className="est-divider" />
                <p className="est-note">{t('estimator.note')}</p>
                <a href={`https://wa.me/${brand.wa}?text=${waMsg}`} target="_blank" rel="noreferrer" className="btn btn-wa" style={{ width:'100%', justifyContent:'center', marginTop: 8 }}>
                  <Icon icon="fa-brands fa-whatsapp" /> {t('estimator.ctaConsult')}
                </a>
                <Link to="/ajukan-proyek" className="btn btn-ghost" style={{ width:'100%', justifyContent:'center', marginTop: 10 }}>
                  <Icon icon="fa-solid fa-file-pen" /> {t('estimator.ctaBrief')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <Reveal className="cta-card">
          <h2>{t('estimasi.ctaTitlePre')}<span className="ital">{t('estimasi.ctaTitleItal')}</span>{t('estimasi.ctaTitlePost')}</h2>
          <p>{t('estimasi.ctaDesc')}</p>
          <div className="btns">
            <a className="btn btn-wa btn-lg" href={buildWaLink(brand.wa, t('estimasi.waConsult', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('estimasi.ctaConsult')}</a>
            <Link className="btn btn-ghost btn-lg" to="/portofolio"><Icon icon="fa-solid fa-images" /> {t('estimasi.ctaPortfolio')}</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

