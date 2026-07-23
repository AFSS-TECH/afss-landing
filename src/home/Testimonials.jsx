import { motion } from 'framer-motion'
import { Icon } from '../Icon.jsx'
import { testimonials } from '../data/index.js'
import { useLocale, pick } from '../i18n/context.jsx'
import { useSectionOverride } from '../lib/content.js'
import { fadeUp, container, viewport, Reveal } from './shared.jsx'

const TESTI_AVATAR_BG = ['#1D4ED8', '#0B9C8B', '#B45309', '#7C3AED', '#DC2626']
const initials = (name = '') => name.replace(/[\[\]]/g, '').trim().split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase()

/* ════════════════════════════════════════════════ TESTIMONIALS — client quotes */
export function Testimonials() {
  const { locale, t } = useLocale()
  const testimonialsOverride = useSectionOverride('testimonials', testimonials)
  const items = testimonialsOverride.map((it) => pick(it, locale))
  return (
    <section className="testi-sec">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-quote-left" /> {t('testimonials.eyebrow')}</div>
          <h2 className="sec-title">{t('testimonials.titlePre')}<span className="ital">{t('testimonials.titleItal')}</span>{t('testimonials.titlePost')}</h2>
        </Reveal>
        <motion.div className="testi-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {items.map((it, i) => (
            <motion.div key={i} className="testi-card" variants={fadeUp}>
              <div className="testi-stars">
                {Array.from({ length: 5 }).map((_, s) => <Icon key={s} icon="fa-solid fa-star" />)}
              </div>
              <p className="testi-quote">{it.quote}</p>
              <div className="testi-footer">
                <div className="testi-avatar" style={{ background: TESTI_AVATAR_BG[i % TESTI_AVATAR_BG.length] }}>{initials(it.name)}</div>
                <div>
                  <div className="testi-name">{it.name}</div>
                  <div className="testi-role">{it.role}{it.company ? ` — ${it.company}` : ''}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

