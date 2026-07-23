import { useState } from 'react'
import { motion } from 'framer-motion'
import { Head } from 'vite-react-ssg'
import { Icon } from '../Icon.jsx'
import { why } from '../data/index.js'
import { useLocale, pick } from '../i18n/context.jsx'
import { useHreflangTags } from '../i18n/HreflangTags.jsx'
import { withLocale } from '../i18n/locales.js'
import { useBrand, buildWaLink, SITE_URL, fadeUp, container, viewport, Reveal, Breadcrumb, HeroStatCard, onSpot } from './shared.jsx'
import { JOBS } from './karir-content.js'

export function Karir() {
  const { locale, t } = useLocale()
  const brand = useBrand()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/karir')}`
  const title = t('karir.seoTitle')
  const desc = t('karir.seoDesc')
  const [selectedJob, setSelectedJob] = useState(null)

  const benefits = t('karir.benefits')
  const jobs = JOBS.map((j) => pick(j, locale))

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
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('karir.breadcrumb') }]} />
              <div className="eyebrow green"><Icon icon="fa-solid fa-briefcase" /> {t('karir.eyebrow')}</div>
              <h1 className="page-title">{t('karir.titlePre')}<span className="ital">{t('karir.titleItal')}</span>{t('karir.titlePost')}</h1>
              <p className="page-sub">{t('karir.sub')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href="#lowongan">{t('karir.ctaViewJobs')} <Icon icon="fa-solid fa-arrow-down" /></a>
                <a className="btn btn-ghost btn-lg" href={`mailto:${brand.email}`}><Icon icon="fa-solid fa-envelope" /> {t('karir.ctaSendCv')}</a>
              </div>
            </Reveal>
            <Reveal className="page-hero-stat-col"><HeroStatCard /></Reveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ paddingBottom: 0 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow green"><Icon icon="fa-solid fa-star" /> {t('karir.benefitsEyebrow')}</div>
            <h2 className="sec-title">{t('karir.benefitsTitlePre')}<span className="ital">{t('karir.benefitsTitleItal')}</span>{t('karir.benefitsTitlePost')}</h2>
          </Reveal>
          <motion.div className="why-home-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {benefits.map((b, i) => (
              <motion.div key={i} className="why-home-card spot" variants={fadeUp} whileHover={{ y: -5 }} onMouseMove={onSpot}>
                <div className="why-home-ico" style={{ color: 'var(--blue)', background: 'var(--blue-l)' }}><Icon icon={b.icon} /></div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job listings */}
      <section id="lowongan" style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-rectangle-list" /> {t('karir.jobsEyebrow')}</div>
            <h2 className="sec-title">{t('karir.jobsTitle', { count: JOBS.length })}<span className="ital">{t('karir.jobsTitleItal')}</span></h2>
            <p className="sec-sub">{t('karir.jobsSub')}</p>
          </Reveal>
          <motion.div className="jobs-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {jobs.map((j) => (
              <motion.div key={j.id} className="job-card spot" variants={fadeUp} whileHover={{ y: -4 }} onMouseMove={onSpot}>
                <div className="job-header">
                  <div>
                    <span className="job-badge" style={{ background: j.badgeColor + '1a', color: j.badgeColor }}>{j.badge}</span>
                    <h3 className="job-pos">{j.pos}</h3>
                    <div className="job-type"><Icon icon="fa-solid fa-clock" /> {j.type}</div>
                  </div>
                  <div className="job-salary">{j.salary}</div>
                </div>
                <p className="job-desc">{j.desc}</p>
                <div className="job-skills">
                  {j.skills.map((s) => <span key={s}><Icon icon="fa-solid fa-check" /> {s}</span>)}
                </div>
                <a className="btn btn-pri" href={buildWaLink(brand.wa, t('karir.waApply', { brand: brand.short, pos: j.pos }))} target="_blank" rel="noreferrer">
                  <Icon icon="fa-brands fa-whatsapp" /> {t('karir.applyBtn')}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>{t('karir.ctaTitlePre')}<span className="ital">{t('karir.ctaTitleItal')}</span>{t('karir.ctaTitlePost')}</h2>
          <p>{t('karir.ctaDesc')}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={`mailto:${brand.email}?subject=${t('karir.cvSubjectMailto')}`}><Icon icon="fa-solid fa-envelope" /> {t('karir.ctaSendCvEmail')}</a>
            <a className="btn btn-ghost btn-lg" href={buildWaLink(brand.wa, t('karir.waSpontaneous', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('karir.ctaChatFirst')}</a>
          </div>
        </Reveal>
      </section>
    </>
  )
}

