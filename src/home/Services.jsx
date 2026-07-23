import { motion } from 'framer-motion'
import { Icon } from '../Icon.jsx'
import { products, pricing } from '../data/index.js'
import { Link } from '../i18n/link.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { fadeUp, container, viewport, Reveal, onSpot } from './shared.jsx'

/* ════════════════════════════════════════════════ SERVICES / LAYANAN */
export function Services() {
  const { locale, t } = useLocale()
  const items = products.map((p) => pick(p, locale))
  // Harga "mulai dari" per layanan — diambil dari data pricing (sumber yang sama dengan /harga)
  const priceBySlug = Object.fromEntries(pricing.map((pr) => [pr.slug, pick(pr, locale)]))
  return (
    <section id="services">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> {t('services.eyebrow')}</div>
          <h2 className="sec-title">{t('services.titlePre')}<span className="ital">{t('services.titleItal')}</span>{t('services.titlePost')}</h2>
          <p className="sec-sub">{t('services.sub')}</p>
        </Reveal>
        <motion.div className="svc-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {items.map((p) => (
            <motion.div key={p.slug} className={`svc-card spot ${p.hot ? 'hot' : ''}`} variants={fadeUp} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }} onMouseMove={onSpot}>
              {p.hot && <span className="hot-tag">{t('services.hotTag')}</span>}
              <div className="svc-top">
                <div className="svc-ico"><Icon icon={p.icon} /></div>
                <span className="metric-badge"><Icon icon="fa-solid fa-circle-check" /> {p.metric}</span>
              </div>
              <div className="svc-name">{p.name}</div>
              <p className="svc-desc">{p.desc}</p>
              <ul className="svc-feats">{p.feats.map((f) => <li key={f}><Icon icon="fa-solid fa-check" /> {f}</li>)}</ul>
              {priceBySlug[p.slug] && (
                <div className="svc-price-row">
                  <div className="svc-price">
                    <span className="lbl">{priceBySlug[p.slug].note}</span>
                    <span className="amt">{priceBySlug[p.slug].price}</span>
                  </div>
                </div>
              )}
              <div className="svc-foot">
                <Link className="btn" to={`/layanan/${p.slug}`}>{t('services.more')} <Icon icon="fa-solid fa-arrow-right" /></Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/layanan" className="btn btn-ghost btn-lg">{t('services.viewAll')} <Icon icon="fa-solid fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  )
}

