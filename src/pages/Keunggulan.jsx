import { motion } from 'framer-motion'
import { Head } from 'vite-react-ssg'
import { Icon } from '../Icon.jsx'
import { stats, why } from '../data/index.js'
import { Link } from '../i18n/link.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { useHreflangTags } from '../i18n/HreflangTags.jsx'
import { withLocale } from '../i18n/locales.js'
import { useSectionOverride } from '../lib/content.js'
import { useBrand, buildWaLink, SITE_URL, fadeUp, container, viewport, Reveal, Breadcrumb, HeroStatCard, onSpot } from './shared.jsx'

/* ══════════════════════════════════════════════════ KEUNGGULAN (/keunggulan) */
export function Keunggulan() {
  const { locale, t } = useLocale()
  const brand = useBrand()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/keunggulan')}`
  const title = t('keunggulan.seoTitle')
  const desc = t('keunggulan.seoDesc')
  const guarantees = t('keunggulan.guarantees')
  const whyOverride = useSectionOverride('why', why)
  const statsOverride = useSectionOverride('stats', stats)
  const whyItems = whyOverride.map((w) => pick(w, locale))
  const statsItems = statsOverride.map((s) => pick(s, locale))
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

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('keunggulan.breadcrumb') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-award" /> {t('keunggulan.eyebrow')}</div>
              <h1 className="page-title">{t('keunggulan.titlePre')}<span className="ital">{t('keunggulan.titleItal')}</span>{t('keunggulan.titlePost')}</h1>
              <p className="page-sub">{t('keunggulan.sub')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={buildWaLink(brand.wa, t('keunggulan.waConsult', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('keunggulan.ctaConsult')}</a>
                <Link className="btn btn-ghost btn-lg" to="/layanan">{t('keunggulan.ctaServices')}</Link>
              </div>
            </Reveal>
            <Reveal className="page-hero-stat-col">
              <HeroStatCard />
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <motion.div className="why-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {whyItems.map((w, i) => (
              <motion.div key={i} className="why-card spot" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} onMouseMove={onSpot}>
                <div className="why-ico"><Icon icon={w.icon} /></div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="whyus" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-shield-halved" /> {t('keunggulan.guaranteesEyebrow')}</div>
            <h2 className="sec-title">{t('keunggulan.guaranteesTitlePre')}<span className="ital">{t('keunggulan.guaranteesTitleItal')}</span>{t('keunggulan.guaranteesTitlePost')}</h2>
          </Reveal>
          <motion.div className="tech-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {guarantees.map((g, i) => (
              <motion.div key={i} className="tech-chip" variants={fadeUp} whileHover={{ y: -4 }}>
                <Icon icon={g.icon} /> <span>{g.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="stats-band">
        <motion.div className="stats-card" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {statsItems.map((s, i) => (
            <motion.div key={s.id || i} className="stat-item" variants={fadeUp}>
              <div className="stat-num">{s.prefix || ''}{s.n}{s.suffix}</div>
              <div className="stat-lbl">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <section className="cta-band" style={{ paddingTop: 80 }}>
        <Reveal className="cta-card">
          <h2>{t('keunggulan.ctaTitlePre')}<span className="ital">{t('keunggulan.ctaTitleItal')}</span>{t('keunggulan.ctaTitlePost')}</h2>
          <p>{t('keunggulan.ctaDesc')}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={buildWaLink(brand.wa, t('keunggulan.waConsult2', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('keunggulan.ctaConsult')}</a>
            <Link className="btn btn-ghost btn-lg" to="/layanan">{t('keunggulan.ctaServices2')}</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

