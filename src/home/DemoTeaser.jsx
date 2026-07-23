import { motion } from 'framer-motion'
import { Icon } from '../Icon.jsx'
import { portfolioProjects } from '../data/index.js'
import { Link } from '../i18n/link.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { track } from '../lib/track.js'
import { fadeUp, container, viewport, Reveal } from './shared.jsx'

/* ════════════════════════════════════════════════ DEMO TEASER — portofolio + demo live di beranda */
export function DemoTeaser() {
  const { locale, t } = useLocale()
  const featured = portfolioProjects.filter((p) => p.image && p.visitUrl).slice(0, 3)
  return (
    <section className="demo-sec" id="demo">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-hand-pointer" /> {t('demoTeaser.eyebrow')}</div>
          <h2 className="sec-title">{t('demoTeaser.titlePre')}<span className="ital">{t('demoTeaser.titleItal')}</span>{t('demoTeaser.titlePost')}</h2>
          <p className="sec-sub">{t('demoTeaser.sub')}</p>
        </Reveal>
        <motion.div className="demo-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {featured.map((p) => {
            const l = pick(p, locale)
            return (
              <motion.article key={p.slug} className="demo-card" variants={fadeUp} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
                <Link to={`/portofolio/${p.slug}`} className="demo-shot" aria-label={p.title}>
                  <img src={p.image} alt={`${p.title} — ${l.tagline}`} loading="lazy" width="800" height="500" />
                </Link>
                <div className="demo-body">
                  <div className="demo-meta">
                    <span className="demo-cat">{l.cat}</span>
                    <span className="demo-result"><Icon icon="fa-solid fa-arrow-trend-up" /> {l.result}</span>
                  </div>
                  <h3 className="demo-title">{p.title}</h3>
                  <p className="demo-tagline">{l.tagline}</p>
                  <div className="demo-actions">
                    <a href={p.visitUrl} target="_blank" rel="noreferrer" className="btn btn-pri" onClick={() => track('demo_open', { project: p.slug })}><Icon icon="fa-solid fa-arrow-up-right-from-square" /> {t('demoTeaser.liveDemo')}</a>
                    <Link to={`/portofolio/${p.slug}`} className="btn btn-ghost">{t('demoTeaser.caseStudy')}</Link>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/portofolio" className="btn btn-ghost btn-lg">{t('demoTeaser.viewAll')} <Icon icon="fa-solid fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  )
}

