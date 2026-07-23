import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Head } from 'vite-react-ssg'
import { Icon } from '../Icon.jsx'
import { faqs } from '../data/index.js'
import { Link } from '../i18n/link.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { useHreflangTags } from '../i18n/HreflangTags.jsx'
import { withLocale } from '../i18n/locales.js'
import { useSectionOverride } from '../lib/content.js'
import { useBrand, buildWaLink, SITE_URL, Reveal, Breadcrumb, HeroStatCard } from './shared.jsx'

/* ══════════════════════════════════════════════════ FAQ PAGE (/faq) */
export function Faq() {
  const [open, setOpen] = useState(-1)
  const { locale, t } = useLocale()
  const brand = useBrand()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/faq')}`
  const title = t('faqPage.seoTitle')
  const desc = t('faqPage.seoDesc')
  const faqsOverride = useSectionOverride('faqs', faqs)
  const faqItems = faqsOverride.map((f) => pick(f, locale))
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
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('faqPage.breadcrumb') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-circle-question" /> {t('faqPage.eyebrow')}</div>
              <h1 className="page-title">{t('faqPage.titlePre')}<span className="ital">{t('faqPage.titleItal')}</span>{t('faqPage.titlePost')}</h1>
              <p className="page-sub">{t('faqPage.sub')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={buildWaLink(brand.wa, t('faqPage.waAsk', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('faqPage.ctaAsk')}</a>
                <Link className="btn btn-ghost btn-lg" to="/kontak">{t('faqPage.ctaContact')}</Link>
              </div>
            </Reveal>
            <Reveal className="page-hero-stat-col">
              <HeroStatCard />
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="container container-narrow">
          <div className="faq-list">
            {faqItems.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.id || i} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                    <span>{f.q}</span>
                    <Icon icon={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div className="faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                        <p>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>{t('faqPage.ctaTitlePre')}<span className="ital">{t('faqPage.ctaTitleItal')}</span>{t('faqPage.ctaTitlePost')}</h2>
          <p>{t('faqPage.ctaDesc')}</p>
          <a className="btn btn-pri btn-lg" href={buildWaLink(brand.wa, t('faqPage.waAsk', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('faqPage.ctaAsk')}</a>
        </Reveal>
      </section>
    </>
  )
}

