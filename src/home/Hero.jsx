import { motion } from 'framer-motion'
import { Icon } from '../Icon.jsx'
import { Link } from '../i18n/link.jsx'
import { useLocale } from '../i18n/context.jsx'
import { STRINGS } from '../i18n/strings.js'
import { useSectionOverride } from '../lib/content.js'
import { useBrand, buildWaLink } from '../lib/brand.js'
import { track } from '../lib/track.js'
import { fadeUp, container } from './shared.jsx'
import { JourneyBar } from './JourneyBar.jsx'

/* ════════════════════════════════════════════════ HERO */
const pickHero = (s) => ({ badge: s.hero.badge, h1Pre: s.hero.h1Pre, h1Ital: s.hero.h1Ital, h1Post: s.hero.h1Post, lead: s.hero.lead })
const HERO_FALLBACK = { id: pickHero(STRINGS.id), en: pickHero(STRINGS.en), zh: pickHero(STRINGS.zh) }

export function Hero() {
  const { locale, t } = useLocale()
  const brand = useBrand()
  const hero = useSectionOverride('hero', HERO_FALLBACK)
  const h = hero[locale] || hero.id
  return (
    <section className="hero" id="home">
      <div className="hero-glow" />
      <div className="hero-inner">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div className="hero-badge" variants={fadeUp}>
            <span className="pulse-dot" />
            {h.badge}
          </motion.div>
          <motion.h1 variants={fadeUp}>
            {h.h1Pre}<span className="ital">{h.h1Ital}</span>{h.h1Post}
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>
            {h.lead}
          </motion.p>
          <motion.div className="hero-cta" variants={fadeUp}>
            <a href={buildWaLink(brand.wa, t('wa.heroConsult', { brand: brand.short }))} className="btn btn-wa btn-lg" target="_blank" rel="noreferrer" onClick={() => track('wa_click', { source: 'hero' })}><Icon icon="fa-brands fa-whatsapp" /> {t('hero.ctaWa')}</a>
            <Link to="/portofolio" className="btn btn-ghost btn-lg">{t('hero.ctaPortfolio')} <Icon icon="fa-solid fa-arrow-right" /></Link>
          </motion.div>
          <motion.div className="hero-trust" variants={fadeUp}>
            <span>{t('hero.trustPre')}<b>{t('hero.trustBold')}</b>{t('hero.trustPost')}</span>
          </motion.div>
        </motion.div>

        {/* Blueprint spec plate — a build manifest for what AFSS actually ships, not a fake SaaS dashboard */}
        <motion.div className="hero-visual" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
          <div className="bp-plate">
            <div className="bp-head">
              <span className="bp-tag">{t('hero.buildTag')}</span>
              <span className="bp-status"><span className="dot" /> {t('hero.buildStatus')}</span>
            </div>
            <div className="bp-title">Website <span className="ital">→</span> Dashboard <span className="ital">→</span> ERP</div>
            <div className="bp-flow">
              <div className="bp-node">
                <div className="bp-node-ico"><Icon icon="fa-solid fa-window-maximize" /></div>
                <div className="bp-node-lbl">{t('hero.flowWebsite')}</div>
              </div>
              <div className="bp-connector" />
              <div className="bp-node">
                <div className="bp-node-ico"><Icon icon="fa-solid fa-gauge-high" /></div>
                <div className="bp-node-lbl">{t('hero.flowDashboard')}</div>
              </div>
              <div className="bp-connector" />
              <div className="bp-node">
                <div className="bp-node-ico"><Icon icon="fa-solid fa-circle-nodes" /></div>
                <div className="bp-node-lbl">{t('hero.flowErp')}</div>
              </div>
            </div>
            <div className="bp-stats">
              <div className="bp-stat">
                <div className="bp-stat-num">100%</div>
                <div className="bp-stat-lbl">{t('hero.statCode')}</div>
              </div>
              <div className="bp-stat">
                <div className="bp-stat-num">{t('hero.statBugNum')}</div>
                <div className="bp-stat-lbl">{t('hero.statBug')}</div>
              </div>
              <div className="bp-stat">
                <div className="bp-stat-num">24/7</div>
                <div className="bp-stat-lbl">{t('hero.statSupport')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Journey bar — "sekali lihat paham": produk → demo → harga → pesan */}
      <JourneyBar />
    </section>
  )
}

