import { motion } from 'framer-motion'
import { Icon } from '../Icon.jsx'
import { workflow as steps } from '../data/index.js'
import { useLocale, pick } from '../i18n/context.jsx'
import { useSectionOverride } from '../lib/content.js'
import { fadeUp, container, viewport, Reveal, onSpot } from './shared.jsx'

/* ════════════════════════════════════════════════ PROCESS — 6 langkah */
export function Process() {
  const { locale, t } = useLocale()
  const stepsOverride = useSectionOverride('workflow', steps)
  const items = stepsOverride.map((s) => pick(s, locale))
  return (
    <section className="process" id="process">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow green"><Icon icon="fa-solid fa-route" /> {t('process.eyebrow')}</div>
          <h2 className="sec-title">{t('process.titlePre')}<span className="ital">{t('process.titleItal')}</span>{t('process.titlePost')}</h2>
          <p className="sec-sub">{t('process.sub')}</p>
        </Reveal>
        <motion.div className="proc-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {items.map((s) => (
            <motion.div className="proc-card spot" key={s.step} variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} onMouseMove={onSpot}>
              <span className="proc-step">{s.step}</span>
              <div className="proc-ico"><Icon icon={s.icon} /></div>
              <h3 className="proc-title">{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <Reveal className="proc-note">{t('process.note')}</Reveal>
      </div>
    </section>
  )
}

