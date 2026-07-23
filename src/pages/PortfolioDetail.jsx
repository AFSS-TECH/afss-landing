import { useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Icon } from '../Icon.jsx'
import { portfolioProjects } from '../data/index.js'
import { Link } from '../i18n/link.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { useHreflangTags } from '../i18n/HreflangTags.jsx'
import { withLocale } from '../i18n/locales.js'
import { track } from '../lib/track.js'
import { useBrand, buildWaLink, SITE_URL, Reveal, Breadcrumb, ZoomImage } from './shared.jsx'

/* ══════════════════════════════════════════════════ PORTFOLIO DETAIL (/portofolio/:slug) */
export function PortfolioDetail() {
  const { slug } = useParams()
  const { locale, t } = useLocale()
  const brand = useBrand()
  const hreflangTags = useHreflangTags()
  const pRaw = portfolioProjects.find(x => x.slug === slug)
  const p = pRaw ? pick(pRaw, locale) : null

  if (!p) return (
    <section className="page-hero">
      <div className="container">
        <h1 className="page-title">{t('portfolio.notFoundTitle')}</h1>
        <Link to="/portofolio" className="btn btn-ghost" style={{ marginTop: 20 }}><Icon icon="fa-solid fa-arrow-left" /> {t('portfolio.backToPortfolio')}</Link>
      </div>
    </section>
  )

  const canonicalPath = `/portofolio/${p.slug}`
  const url = `${SITE_URL}${withLocale(locale, canonicalPath)}`

  return (
    <>
      <Head>
        <title>{`${p.title} — Portofolio AFSS`}</title>
        <meta name="description" content={p.tagline} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${p.title} — Portofolio AFSS`} />
        <meta property="og:description" content={p.tagline} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      {/* Hero banner */}
      <section className="pd-hero" style={{ '--c': p.c, '--c2': p.c2 }}>
        <div className="pd-hero-bg" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('portfolio.breadcrumb'), to: '/portofolio' }, { label: p.title }]} />
            <span className="pd-cat-badge">{p.cat}</span>
            <h1 className="pd-title">{p.title}</h1>
            <p className="pd-tagline">{p.tagline}</p>
            <div className="pd-stats">
              <div className="pd-stat"><Icon icon="fa-solid fa-arrow-trend-up" /><span className="pd-stat-label">{t('portfolio.resultLabel')}</span><span className="pd-stat-val">{p.result}</span></div>
              <div className="pd-stat-div" />
              <div className="pd-stat"><Icon icon="fa-solid fa-chart-line" /><span className="pd-stat-label">{t('portfolio.detailLabel')}</span><span className="pd-stat-val">{p.result2}</span></div>
            </div>
            {p.visitUrl && (
              <a className="btn btn-lg pd-hero-demo-btn" href={p.visitUrl} target="_blank" rel="noreferrer" onClick={() => track('demo_open', { project: p.slug })}>
                <Icon icon="fa-solid fa-arrow-up-right-from-square" /> {t('demoTeaser.liveDemo')}
              </a>
            )}
          </Reveal>
        </div>
      </section>

      {/* Screenshot gallery (real product) or fake mockup fallback */}
      {p.images?.length ? (
        <div className="pd-gallery-wrap" style={{ '--c': p.c, '--c2': p.c2 }}>
          <div className="container">
            <div className="pd-gallery">
              {p.images.map((src, i) => (
                <Reveal key={src} className={`pd-gallery-item${i === 0 ? ' main' : ''}${p.imagePortrait?.[i] ? ' portrait' : ''}`} style={{ transitionDelay: `${i*60}ms` }}>
                  <ZoomImage className="pd-gallery-frame" src={src} alt={p.imageCaptions?.[i] || p.title} />
                  {p.imageCaptions?.[i] && <p className="pd-gallery-cap">{p.imageCaptions[i]}</p>}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="pd-mockup-wrap" style={{ '--c': p.c, '--c2': p.c2 }}>
          <div className="container">
            <div className="pd-mockup">
              <div className="pd-mockup-browser">
                <div className="pd-browser-bar">
                  <i style={{ background: '#FF6058' }} /><i style={{ background: '#FFBD2E' }} /><i style={{ background: '#28C840' }} />
                  <div className="pd-browser-url">afss.tech · {p.title.toLowerCase()}</div>
                </div>
                <div className="pd-browser-body">
                  {p.kind === 'dash' ? (
                    <div className="pd-screen-dash">
                      <div className="pd-dash-side"><span/><span className="on"/><span/><span/><span/></div>
                      <div className="pd-dash-main">
                        <div className="pd-dash-topbar"/>
                        <div className="pd-dash-kpis"><div/><div/><div/><div/></div>
                        <div className="pd-dash-chart"/>
                        <div className="pd-dash-table"><div/><div/><div/><div/></div>
                      </div>
                    </div>
                  ) : (
                    <div className="pd-screen-land">
                      <div className="pd-land-nav"><div className="pd-land-logo"/><div/><div/><div className="pd-land-cta"/></div>
                      <div className="pd-land-hero"><div className="pd-land-h1"/><div className="pd-land-p"/><div className="pd-land-btn"/></div>
                      <div className="pd-land-cards"><div/><div/><div/></div>
                      <div className="pd-land-strip"/>
                    </div>
                  )}
                </div>
              </div>
              {/* Phone mockup */}
              <div className="pd-phone">
                <div className="pd-phone-screen">
                  <div className="pd-phone-header" style={{ background: `linear-gradient(135deg,${p.c},${p.c2})` }}/>
                  <div className="pd-phone-body"><div/><div/><div/><div/></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <section style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="container">
          {/* Problem + Solution */}
          <Reveal>
            <div className="pd-two-col">
              <div className="pd-block problem">
                <div className="pd-block-label"><Icon icon="fa-solid fa-circle-exclamation" /> {t('portfolio.problemLabel')}</div>
                <p>{p.problem}</p>
              </div>
              <div className="pd-block solution">
                <div className="pd-block-label"><Icon icon="fa-solid fa-circle-check" /> {t('portfolio.solutionLabel')}</div>
                <p>{p.solution}</p>
              </div>
            </div>
          </Reveal>

          {/* Benefit analysis (per feature) */}
          {p.benefits?.length > 0 && (
            <Reveal style={{ marginTop: 48 }}>
              <div className="eyebrow"><Icon icon="fa-solid fa-chart-line" /> {t('portfolio.benefitsEyebrow')}</div>
              <h2 className="sec-title" style={{ fontSize: '1.6rem' }}>{t('portfolio.benefitsTitlePre')}<span className="ital">{t('portfolio.benefitsTitleItal')}</span>{t('portfolio.benefitsTitlePost')}</h2>
              <div className="pd-benefits">
                {p.benefits.map(b => (
                  <div key={b.title} className="pd-benefit-card">
                    <div className="pd-benefit-ico" style={{ background: `linear-gradient(135deg,${p.c},${p.c2})` }}><Icon icon={b.icon} /></div>
                    <h3>{b.title}</h3>
                    <p>{b.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* Features */}
          <Reveal style={{ marginTop: 48 }}>
            <div className="eyebrow"><Icon icon="fa-solid fa-list-check" /> {t('portfolio.featuresEyebrow')}</div>
            <h2 className="sec-title" style={{ fontSize: '1.6rem' }}>{t('portfolio.featuresTitlePre')}<span className="ital">{t('portfolio.featuresTitleItal')}</span>{t('portfolio.featuresTitlePost')}</h2>
            <div className="pd-features">
              {p.features.map(f => (
                <div key={f} className="pd-feat">
                  <div className="pd-feat-ico"><Icon icon="fa-solid fa-check" /></div>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tech stack */}
          <Reveal style={{ marginTop: 40 }}>
            <div className="pd-tech-bar">
              <span className="pd-tech-label"><Icon icon="fa-solid fa-microchip" /> {t('portfolio.techLabel')}</span>
              <span className="pd-tech-val">{p.tech}</span>
            </div>
          </Reveal>

          {/* Testimonial */}
          <Reveal style={{ marginTop: 48 }}>
            <div className="pd-review">
              <div className="pd-review-stars">{[...Array(5)].map((_,i) => <Icon key={i} icon="fa-solid fa-star" />)}</div>
              <p className="pd-review-text">"{p.review}"</p>
              <div className="pd-review-author">
                <div className="pd-review-avatar" style={{ background: `linear-gradient(135deg,${p.c},${p.c2})` }}>{p.clientName[0]}</div>
                <div>
                  <div className="pd-review-name">{p.clientName}</div>
                  <div className="pd-review-role">{p.clientRole}</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Visit Project button */}
          {p.visitUrl && (
            <Reveal style={{ marginTop: 48, textAlign: 'center' }}>
              <div style={{ background: 'var(--paper-2)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '32px 24px' }}>
                <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 12 }}><Icon icon="fa-solid fa-eye" /> {t('portfolio.liveDemoEyebrow')}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8, color: 'var(--ink)' }}>{t('portfolio.liveDemoTitle')}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '.95rem', marginBottom: 20 }}>{t('portfolio.liveDemoDesc')}</p>
                <a className="btn btn-pri btn-lg" href={p.visitUrl} target="_blank" rel="noreferrer">
                  <Icon icon="fa-solid fa-arrow-up-right-from-square" /> {t('portfolio.liveDemoCta')}
                </a>
              </div>
            </Reveal>
          )}

          {/* CTA */}
          <Reveal style={{ marginTop: 56, textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 12, color: 'var(--ink)', letterSpacing: '-.03em' }}>{t('portfolio.finalCtaTitle')}</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 28 }}>{t('portfolio.finalCtaDesc')}</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a className="btn btn-wa btn-lg" href={buildWaLink(brand.wa, t('portfolio.waSimilar', { brand: brand.short, title: p.title }))} target="_blank" rel="noreferrer">
                <Icon icon="fa-brands fa-whatsapp" /> {t('portfolio.finalCtaDiscuss')}
              </a>
              <Link className="btn btn-ghost btn-lg" to="/portofolio">
                <Icon icon="fa-solid fa-arrow-left" /> {t('portfolio.finalCtaBack')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

