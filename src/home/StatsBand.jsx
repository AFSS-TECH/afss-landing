import { motion } from 'framer-motion'
import { stats } from '../data/index.js'
import { useLocale, pick } from '../i18n/context.jsx'
import { useSectionOverride } from '../lib/content.js'
import { Counter, fadeUp, container, viewport } from './shared.jsx'

/* ════════════════════════════════════════════════ STATS BAND */
export function StatsBand() {
  const { locale } = useLocale()
  const statsOverride = useSectionOverride('stats', stats)
  const items = statsOverride.map((s) => pick(s, locale))
  return (
    <div className="stats-band">
      <motion.div className="stats-card" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
        {items.map((s, i) => (
          <motion.div className="stat-item" key={s.id || i} variants={fadeUp}>
            <div className="stat-num"><Counter to={s.n} prefix={s.prefix || ''} suffix={s.suffix} /></div>
            <div className="stat-lbl">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

