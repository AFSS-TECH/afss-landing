import { motion } from 'framer-motion'
import { Icon } from '../Icon.jsx'
import { techStack } from '../data/index.js'
import { useLocale } from '../i18n/context.jsx'
import { useSectionOverride } from '../lib/content.js'
import { fadeUp, container, viewport, Reveal } from './shared.jsx'

/* ════════════════════════════════════════════════ TECH STACK / TEKNOLOGI */
export function TechStack() {
  const { t } = useLocale()
  const techStackOverride = useSectionOverride('tech_stack', techStack)
  return (
    <section className="tech" id="tech">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-microchip" /> {t('techStack.eyebrow')}</div>
          <h2 className="sec-title">{t('techStack.titlePre')}<span className="ital">{t('techStack.titleItal')}</span>{t('techStack.titlePost')}</h2>
          <p className="sec-sub">{t('techStack.sub')}</p>
        </Reveal>
        <motion.div className="tech-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {techStackOverride.map((tech) => (
            <motion.div className="tech-chip" key={tech.name} variants={fadeUp} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }}>
              <Icon icon={tech.icon} /> <span>{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

