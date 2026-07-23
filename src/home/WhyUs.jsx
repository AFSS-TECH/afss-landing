import { motion } from 'framer-motion'
import { Icon } from '../Icon.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { STRINGS } from '../i18n/strings.js'
import { useSectionOverride } from '../lib/content.js'
import { fadeUp, container, viewport, Reveal, onSpot } from './shared.jsx'

/* ════════════════════════════════════════════════ KENAPA AFSS */
const WHY_US_VISUAL = [
  { icon: 'fa-solid fa-code', color: 'var(--blue)', bg: 'var(--blue-l)' },
  { icon: 'fa-solid fa-gauge-high', color: '#10C7B2', bg: 'rgba(16,199,178,.1)' },
  { icon: 'fa-solid fa-comments', color: 'var(--blue)', bg: 'var(--blue-l)' },
  { icon: 'fa-solid fa-shield-halved', color: '#10C7B2', bg: 'rgba(16,199,178,.1)' },
  { icon: 'fa-solid fa-location-dot', color: 'var(--blue)', bg: 'var(--blue-l)' },
  { icon: 'fa-solid fa-chart-line', color: '#10C7B2', bg: 'rgba(16,199,178,.1)' },
]

const WHY_US_FALLBACK = STRINGS.id.whyUs.items.map((idItem, i) => ({
  i18n: { id: idItem, en: STRINGS.en.whyUs.items[i], zh: STRINGS.zh.whyUs.items[i] },
}))

export function WhyUs() {
  const { locale, t } = useLocale()
  const whyUsOverride = useSectionOverride('why_us', WHY_US_FALLBACK)
  const items = whyUsOverride.map((it) => pick(it, locale))
  return (
    <section className="whyus-home">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-award" /> {t('whyUs.eyebrow')}</div>
          <h2 className="sec-title">{t('whyUs.titlePre')}<span className="ital">{t('whyUs.titleItal')}</span>{t('whyUs.titlePost')}</h2>
        </Reveal>
        <motion.div className="why-home-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {items.map((it, i) => (
            <motion.div key={i} className="why-home-card spot" variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} onMouseMove={onSpot}>
              <div className="why-home-ico" style={{ color: WHY_US_VISUAL[i].color, background: WHY_US_VISUAL[i].bg }}><Icon icon={WHY_US_VISUAL[i].icon} /></div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

