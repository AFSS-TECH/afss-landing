import { useEffect, useRef, useState } from 'react'
import {
  motion, AnimatePresence, useScroll, useSpring,
  useInView, animate, useReducedMotion,
} from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Icon } from './Icon.jsx'
import { ProductFinder } from './ProductFinder.jsx'
import {
  BRAND, products, workflow as steps, stats,
  waLink, clients, techStack,
} from './data.js'
import { SITE_URL, formatDateId, formatDate } from './site.js'
import { postsMeta } from './blog-meta.js'
import { Link, RawLink } from './i18n/link.jsx'
import { LocaleProvider, useLocale, pick } from './i18n/context.jsx'
import { LOCALES, LOCALE_SHORT, withLocale, safeLocalePath, setLocaleCookie } from './i18n/locales.js'
import { useHreflangTags } from './i18n/HreflangTags.jsx'

/* ── Motion presets — enter recipe: opacity + y, smooth easing (GPU-cheap, no filter) ── */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }
const viewport = { once: true, margin: '-60px' }

/* ── Animated counter (respects reduced-motion) ── */
function Counter({ to, prefix = '', suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  // Start at `to` so SSG pre-renders the real number (not 0).
  // Client-side: animate from 0 when element enters view.
  const [val, setVal] = useState(to)
  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to, reduce, duration])
  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

/* ── Cursor-following spotlight on cards (scoped, hover-only) ── */
const onSpot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/* ── Magnetic button — subtle pull toward cursor (rare, high-value CTA only) ── */
function Magnetic({ href, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 240, damping: 16 })
  const y = useSpring(0, { stiffness: 240, damping: 16 })
  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.45)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.a ref={ref} href={href} className={className} style={{ x, y }} onMouseMove={onMove} onMouseLeave={reset} {...rest}>
      {children}
    </motion.a>
  )
}

/* ── Scroll to top on every route change ── */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

/* ── Reveal wrapper ── */
const Reveal = ({ children, className = '', ...rest }) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className={className} {...rest}>
    {children}
  </motion.div>
)

const Logo = ({ footer }) => (
  <div className={footer ? 'ft-logo' : 'logo'}>
    <img
      src="/logo-full.png"
      alt="AFSS — PT Advanced Future Software Solutions"
      className="logo-img"
    />
  </div>
)

/* ── Language switcher — links to the same page in another locale, persists the choice
   so middleware.js's Accept-Language redirect never overrides an explicit pick. ── */
function LangSwitcher({ mobile, onNavigate }) {
  const { locale, path } = useLocale()
  return (
    <div className={mobile ? 'lang-switch-mobile' : 'lang-switch'}>
      {LOCALES.map((l) => (
        <RawLink
          key={l}
          to={safeLocalePath(l, path)}
          className={`lang-opt${l === locale ? ' active' : ''}`}
          onClick={() => { setLocaleCookie(l); onNavigate?.() }}
        >
          {LOCALE_SHORT[l]}
        </RawLink>
      ))}
    </div>
  )
}

/* ════════════════════════════════════════════════ NAV */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { locale, t } = useLocale()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [
    { key: 'layanan', to: '/layanan' },
    { key: 'portofolio', to: '/portofolio' },
    { key: 'estimasi', to: '/estimasi' },
    { key: 'harga', to: '/harga' },
    { key: 'blog', to: '/blog' },
    { key: 'faq', to: '/faq' },
  ]
  const close = () => setOpen(false)
  return (
    <motion.nav className={`nav ${scrolled ? 'scrolled' : ''}`} initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <div className="nav-inner">
        <Link to="/" aria-label={t('nav.beranda')}><Logo /></Link>
        <ul className="nav-links">
          {links.map((lnk) => (
            <li key={lnk.key}><Link to={lnk.to}>{t(`nav.${lnk.key}`)}</Link></li>
          ))}
          <li><Link to="/ajukan-proyek" className="nav-cta-link">{t('nav.ajukanProyek')}</Link></li>
          <li><LangSwitcher /></li>
          <li><a href={waLink(t('wa.navConsult', { brand: BRAND.short }))} className="btn btn-pri" target="_blank" rel="noreferrer">{t('nav.konsultasiGratis')}</a></li>
        </ul>
        <button className="hamburger" aria-label={t('nav.menu')} onClick={() => setOpen((o) => !o)}><span /><span /><span /></button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -8, height: 0 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
            {links.map((lnk) => (
              <Link key={lnk.key} to={lnk.to} onClick={close}>{t(`nav.${lnk.key}`)}</Link>
            ))}
            <Link to="/ajukan-proyek" onClick={close}>{t('nav.ajukanProyek')}</Link>
            <LangSwitcher mobile onNavigate={close} />
            <a href={waLink(t('wa.navConsult', { brand: BRAND.short }))} className="btn btn-pri" target="_blank" rel="noreferrer" onClick={close}>{t('nav.konsultasiGratis')}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ════════════════════════════════════════════════ HERO */
function Hero() {
  const { t } = useLocale()
  return (
    <section className="hero" id="home">
      <div className="hero-glow" />
      <div className="hero-inner">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div className="hero-badge" variants={fadeUp}>
            <span className="pulse-dot" />
            {t('hero.badge')}
          </motion.div>
          <motion.h1 variants={fadeUp}>
            {t('hero.h1Pre')}<span className="ital">{t('hero.h1Ital')}</span>{t('hero.h1Post')}
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>
            {t('hero.lead')}
          </motion.p>
          <motion.div className="hero-cta" variants={fadeUp}>
            <Magnetic href={waLink(t('wa.heroConsult', { brand: BRAND.short }))} className="btn btn-wa btn-lg" target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('hero.ctaWa')}</Magnetic>
            <Link to="/portofolio" className="btn btn-ghost btn-lg">{t('hero.ctaPortfolio')} <Icon icon="fa-solid fa-arrow-right" /></Link>
          </motion.div>
          <motion.div className="hero-trust" variants={fadeUp}>
            <span>{t('hero.trustPre')}<b>{t('hero.trustBold')}</b>{t('hero.trustPost')}</span>
          </motion.div>
        </motion.div>

        {/* Blueprint spec plate — a build manifest for what AFSS actually ships, not a fake SaaS dashboard */}
        <motion.div className="hero-visual" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
          <div className="bp-plate">
            <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
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
    </section>
  )
}

/* ════════════════════════════════════════════════ STATS BAND */
function StatsBand() {
  const { locale } = useLocale()
  const items = stats.map((s) => pick(s, locale))
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

/* ════════════════════════════════════════════════ KENAPA AFSS */
const WHY_US_VISUAL = [
  { icon: 'fa-solid fa-code', color: 'var(--blue)', bg: 'var(--blue-l)' },
  { icon: 'fa-solid fa-gauge-high', color: '#10C7B2', bg: 'rgba(16,199,178,.1)' },
  { icon: 'fa-solid fa-comments', color: 'var(--blue)', bg: 'var(--blue-l)' },
  { icon: 'fa-solid fa-shield-halved', color: '#10C7B2', bg: 'rgba(16,199,178,.1)' },
  { icon: 'fa-solid fa-location-dot', color: 'var(--blue)', bg: 'var(--blue-l)' },
  { icon: 'fa-solid fa-chart-line', color: '#10C7B2', bg: 'rgba(16,199,178,.1)' },
]

function WhyUs() {
  const { t } = useLocale()
  const items = t('whyUs.items')
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

/* ════════════════════════════════════════════════ TRUST BAR — client / industry strip */
function TrustBar() {
  const { locale, t } = useLocale()
  const localized = clients.map((c) => pick(c, locale))
  const doubled = [...localized, ...localized]
  return (
    <div className="trustbar">
      <div className="trust-label">{t('trustBar.label')}</div>
      <div className="trust-marquee-wrap">
        <div className="trust-logos">
          {doubled.map((c, i) => (
            <span className="trust-logo" key={i}>
              <Icon icon="fa-solid fa-circle-nodes" /> {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════ SERVICES / LAYANAN */
function Services() {
  const { locale, t } = useLocale()
  const items = products.slice(0, 6).map((p) => pick(p, locale))
  return (
    <section id="services">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> {t('services.eyebrow')}</div>
          <h2 className="sec-title">{t('services.titlePre')}<span className="ital">{t('services.titleItal')}</span>{t('services.titlePost')}</h2>
          <p className="sec-sub">{t('services.sub')}</p>
        </Reveal>
        <motion.div className="svc-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {items.map((p) => (
            <motion.div key={p.slug} className={`svc-card spot ${p.hot ? 'hot' : ''}`} variants={fadeUp} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }} onMouseMove={onSpot}>
              {p.hot && <span className="hot-tag">{t('services.hotTag')}</span>}
              <div className="svc-top">
                <div className="svc-ico"><Icon icon={p.icon} /></div>
                <span className="metric-badge"><Icon icon="fa-solid fa-circle-check" /> {p.metric}</span>
              </div>
              <div className="svc-name">{p.name}</div>
              <p className="svc-desc">{p.desc}</p>
              <ul className="svc-feats">{p.feats.map((f) => <li key={f}><Icon icon="fa-solid fa-check" /> {f}</li>)}</ul>
              <div className="svc-foot">
                <Link className="btn" to={`/layanan/${p.slug}`}>{t('services.more')} <Icon icon="fa-solid fa-arrow-right" /></Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/layanan" className="btn btn-ghost btn-lg">{t('services.viewAll')} <Icon icon="fa-solid fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ PROCESS — 6 langkah */
function Process() {
  const { locale, t } = useLocale()
  const items = steps.map((s) => pick(s, locale))
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

/* ════════════════════════════════════════════════ ADD-ON SERVICES */
const ADDON_VISUAL = [
  { icon: 'fa-solid fa-magnifying-glass-chart', color: '#2563FF', bg: 'rgba(37,99,255,.09)' },
  { icon: 'fa-solid fa-server', color: '#10C7B2', bg: 'rgba(16,199,178,.09)' },
  { icon: 'fa-solid fa-credit-card', color: '#2563FF', bg: 'rgba(37,99,255,.09)' },
  { icon: 'fa-brands fa-whatsapp', color: '#1EBE5D', bg: 'rgba(30,190,93,.09)' },
  { icon: 'fa-solid fa-chart-bar', color: '#10C7B2', bg: 'rgba(16,199,178,.09)' },
  { icon: 'fa-solid fa-pen-ruler', color: '#2563FF', bg: 'rgba(37,99,255,.09)' },
]

function AddOns() {
  const { t } = useLocale()
  const items = t('addons.items')
  return (
    <section className="addons-sec">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-puzzle-piece" /> {t('addons.eyebrow')}</div>
          <h2 className="sec-title">{t('addons.titlePre')}<span className="ital">{t('addons.titleItal')}</span>{t('addons.titlePost')}</h2>
          <p className="sec-sub">{t('addons.sub')}</p>
        </Reveal>
        <motion.div className="addons-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {items.map((a, i) => (
            <motion.div key={i} className="addon-card spot" variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} onMouseMove={onSpot}>
              <div className="addon-ico" style={{ color: ADDON_VISUAL[i].color, background: ADDON_VISUAL[i].bg }}><Icon icon={ADDON_VISUAL[i].icon} /></div>
              <div className="addon-content">
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
              <div className="addon-price">{a.price}</div>
            </motion.div>
          ))}
        </motion.div>
        <Reveal className="addons-note">
          {t('addons.notePre')}<b>{t('addons.noteBold')}</b>{t('addons.notePost')}{' '}
          <a href={waLink(t('wa.addonAsk', { brand: BRAND.short }))} target="_blank" rel="noreferrer" className="accent-link">{t('addons.askWa')}</a>
        </Reveal>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ TECH STACK / TEKNOLOGI */
function TechStack() {
  const { t } = useLocale()
  return (
    <section className="tech" id="tech">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-microchip" /> {t('techStack.eyebrow')}</div>
          <h2 className="sec-title">{t('techStack.titlePre')}<span className="ital">{t('techStack.titleItal')}</span>{t('techStack.titlePost')}</h2>
          <p className="sec-sub">{t('techStack.sub')}</p>
        </Reveal>
        <motion.div className="tech-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {techStack.map((tech) => (
            <motion.div className="tech-chip" key={tech.name} variants={fadeUp} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }}>
              <Icon icon={tech.icon} /> <span>{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ BLOG TEASER (internal linking from home) */
function BlogTeaser() {
  const { locale, t } = useLocale()
  const latest = postsMeta.slice(0, 3).map((p) => pick(p, locale))
  return (
    <section className="blog-teaser" id="blog-teaser">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-newspaper" /> {t('blogTeaser.eyebrow')}</div>
          <h2 className="sec-title">{t('blogTeaser.titlePre')}<span className="ital">{t('blogTeaser.titleItal')}</span>{t('blogTeaser.titlePost')}</h2>
          <p className="sec-sub">{t('blogTeaser.sub')}</p>
        </Reveal>
        <motion.div className="blog-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {latest.map((p) => (
            <motion.article key={p.slug} className="blog-card" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
              <Link to={`/blog/${p.slug}`} className="blog-card-link">
                <div className="blog-cover" style={{ '--c': p.c, '--c2': p.c2 }}>
                  <img src={locale === 'id' ? `/blog/${p.slug}.png` : `/blog/${locale}/${p.slug}.png`} alt={p.title} width="1200" height="630" loading="lazy" onError={(e) => { e.target.style.display = 'none' }} />
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta">{formatDate(p.date, locale)} · {p.readMinutes} {t('blogTeaser.readMinutes')}</div>
                  <h3 className="blog-card-title">{p.title}</h3>
                  <p className="blog-card-excerpt">{p.excerpt}</p>
                  <span className="blog-readmore">{t('blogTeaser.readMore')} <Icon icon="fa-solid fa-arrow-right" /></span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
        <div className="blog-teaser-all">
          <Link to="/blog" className="btn btn-ghost btn-lg">{t('blogTeaser.viewAll')} <Icon icon="fa-solid fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ CTA BAND */
function CtaBand() {
  const { t } = useLocale()
  return (
    <section className="cta-band">
      <Reveal className="cta-card">
        <h2>{t('cta.titlePre')}<span className="ital">{t('cta.titleItal')}</span>{t('cta.titlePost')}</h2>
        <p>{t('cta.desc')}</p>
        <div className="btns">
          <Magnetic href={waLink(t('wa.ctaStart', { brand: BRAND.short }))} className="btn btn-pri btn-lg" target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('cta.start')}</Magnetic>
          <Link to="/harga" className="btn btn-ghost btn-lg">{t('cta.viewPricing')}</Link>
        </div>
      </Reveal>
    </section>
  )
}

/* ════════════════════════════════════════════════ FOOTER */
export function Footer({ trimmed = false }) {
  const { locale, t } = useLocale()
  return (
    <footer>
      <div className="footer-grid" style={trimmed ? { gridTemplateColumns: '2fr 1.2fr' } : undefined}>
        <div>
          <Logo footer />
          <p className="ft-legal">{BRAND.legal}</p>
          <p className="ft-desc">{t('footer.descPre')} {BRAND.tagline}.</p>
          <div className="ft-social">
            {BRAND.social.filter((s) => s.url).map((s) => (
              <a key={s.name} href={s.url} className="soc" aria-label={s.name} target="_blank" rel="noreferrer">
                <Icon icon={s.icon} />
              </a>
            ))}
            <a href={waLink(t('wa.greetShort', { brand: BRAND.short }))} target="_blank" rel="noreferrer" className="soc" aria-label="WhatsApp"><Icon icon="fa-brands fa-whatsapp" /></a>
          </div>
        </div>
        {!trimmed && (<>
        <div>
          <div className="ft-head">{t('footer.layanan')}</div>
          <ul className="ft-links">
            <li><Link to="/layanan/landing-page">{t('footer.svc.landingPage')}</Link></li>
            <li><Link to="/layanan/company-profile">{t('footer.svc.companyProfile')}</Link></li>
            <li><Link to="/layanan/software-custom">{t('footer.svc.softwareCustom')}</Link></li>
            <li><Link to="/layanan/erp">{t('footer.svc.erp')}</Link></li>
            <li><Link to="/layanan/ecommerce">{t('footer.svc.ecommerce')}</Link></li>
            <li><Link to="/layanan/marketplace">{t('footer.svc.marketplace')}</Link></li>
          </ul>
        </div>
        <div>
          <div className="ft-head">{t('footer.perusahaan')}</div>
          <ul className="ft-links">
            <li><Link to="/tentang">{t('footer.tentangKami')}</Link></li>
            <li><Link to="/keunggulan">{t('footer.keunggulan')}</Link></li>
            <li><Link to="/portofolio">{t('footer.portofolio')}</Link></li>
            <li><Link to="/estimasi">{t('footer.estimasiBiaya')}</Link></li>
            <li><Link to="/kontak">{t('footer.kontak')}</Link></li>
            <li><Link to="/harga">{t('footer.hargaPaket')}</Link></li>
            <li><Link to="/blog">{t('footer.blog')}</Link></li>
            <li><Link to="/faq">{t('footer.faq')}</Link></li>
            <li><Link to="/karir">{t('footer.karir')}</Link></li>
          </ul>
        </div>
        </>)}
        <div>
          <div className="ft-head">{t('footer.kontakHead')}</div>
          <ul className="ft-links">
            <li><a href={waLink(t('wa.greetShort', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" />{BRAND.phone}</a></li>
            <li><a href={`mailto:${BRAND.email}`}><Icon icon="fa-solid fa-envelope" />{BRAND.email}</a></li>
            <li><span><Icon icon="fa-solid fa-location-dot" />{BRAND.address}</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {BRAND.legal}. {t('footer.rights')}</p>
        {/* Privacy/Terms are Indonesian-only for now (see main.jsx) — always link to the
            unprefixed page directly rather than through the locale-prefixing Link wrapper. */}
        <div className="legal"><RawLink to="/privacy">{t('footer.privacy')}</RawLink><RawLink to="/terms">{t('footer.terms')}</RawLink></div>
      </div>
    </footer>
  )
}

/* ════════════════════════════════════════════════ PROJECT ESTIMATOR */
const EST_PRODUCT_IDS = ['landing', 'profile', 'software', 'erp', 'ecommerce', 'marketplace']
const EST_PRODUCT_META = {
  landing:     { base: [1.5, 5],   perUnit: 0.4, unitKey: 'halaman', icon: 'fa-solid fa-rectangle-ad' },
  profile:     { base: [4.5, 12],  perUnit: 0.6, unitKey: 'halaman', icon: 'fa-solid fa-briefcase' },
  software:    { base: [8, 30],    perUnit: 2,   unitKey: 'modul',   icon: 'fa-solid fa-code' },
  erp:         { base: [28, 100],  perUnit: 5,   unitKey: 'modul',   icon: 'fa-solid fa-circle-nodes' },
  ecommerce:   { base: [18, 50],   perUnit: 2.5, unitKey: 'modul',   icon: 'fa-solid fa-cart-shopping' },
  marketplace: { base: [65, 150],  perUnit: 8,   unitKey: 'modul',   icon: 'fa-solid fa-store' },
}
const EST_ADDON_IDS = ['seo', 'hosting', 'payment', 'wa', 'maint', 'uiux']
const EST_ADDON_PRICE = { seo: 1.5, hosting: 0.8, payment: 2, wa: 1.5, maint: 2.4, uiux: 3 }

function fmtPrice(val, unitSmall, unitBig) {
  if (val >= 1000) return `Rp ${(val / 1000).toFixed(0)} ${unitBig}`
  return `Rp ${val % 1 === 0 ? val : val.toFixed(1)} ${unitSmall}`
}

function Estimator() {
  const { t } = useLocale()
  const [prodId, setProdId] = useState('profile')
  const [units, setUnits] = useState(5)
  const [addons, setAddons] = useState({})

  const prodLabels = t('estimator.products')
  const unitLabels = t('estimator.units')
  const addonLabels = t('estimator.addonLabels')
  const unitSmall = t('estimator.priceUnitSmall')
  const unitBig = t('estimator.priceUnitBig')

  const meta = EST_PRODUCT_META[prodId]
  const unit = unitLabels[meta.unitKey]
  const label = prodLabels[prodId]
  const addonTotal = EST_ADDON_IDS.filter((id) => addons[id]).reduce((s, id) => s + EST_ADDON_PRICE[id], 0)
  const low  = meta.base[0] + (units - 1) * meta.perUnit + addonTotal
  const high = meta.base[1] + (units - 1) * meta.perUnit * 1.6 + addonTotal

  const waMsg = encodeURIComponent(
    t('estimator.waIntro', {
      brand: BRAND.short, jenis: label, units, unit,
      estLow: fmtPrice(low, unitSmall, unitBig), estHigh: fmtPrice(high, unitSmall, unitBig),
    })
  )

  const toggleAddon = (id) => setAddons((a) => ({ ...a, [id]: !a[id] }))

  return (
    <section className="estimator" id="estimator">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-calculator" /> {t('estimator.eyebrow')}</div>
          <h2 className="sec-title">{t('estimator.titlePre')}<span className="ital">{t('estimator.titleItal')}</span>{t('estimator.titlePost')}</h2>
          <p className="sec-sub">{t('estimator.sub')}</p>
        </Reveal>

        <div className="est-wrap">
          {/* Left — inputs */}
          <div className="est-left">
            {/* Step 1 */}
            <div className="est-step">
              <div className="est-step-label"><span>1</span> {t('estimator.step1')}</div>
              <div className="est-prod-grid">
                {EST_PRODUCT_IDS.map((id) => (
                  <button key={id} className={`est-prod-btn${prodId === id ? ' active' : ''}`} onClick={() => { setProdId(id); setUnits(5) }}>
                    <Icon icon={EST_PRODUCT_META[id].icon} />
                    <span>{prodLabels[id]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="est-step">
              <div className="est-step-label">
                <span>2</span> {t('estimator.step2Label', { unit, units })}
              </div>
              <input type="range" min="1" max="15" value={units} onChange={(e) => setUnits(+e.target.value)} className="est-slider" />
              <div className="est-slider-marks"><span>1</span><span>5</span><span>10</span><span>15</span></div>
            </div>

            {/* Step 3 */}
            <div className="est-step">
              <div className="est-step-label"><span>3</span> {t('estimator.step3')}</div>
              <div className="est-addons">
                {EST_ADDON_IDS.map((id) => (
                  <button key={id} className={`est-addon-btn${addons[id] ? ' active' : ''}`} onClick={() => toggleAddon(id)}>
                    <span className={`est-addon-check${addons[id] ? ' on' : ''}`}>
                      <Icon icon="fa-solid fa-check" />
                    </span>
                    <span className="est-addon-label">{addonLabels[id]}</span>
                    <span className="est-addon-price">+ {fmtPrice(EST_ADDON_PRICE[id], unitSmall, unitBig)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — result */}
          <div className="est-result">
            <div className="est-result-inner">
              <div className="est-result-label">{t('estimator.resultLabel')}</div>
              <motion.div className="est-result-low" key={`${prodId}-${units}-${JSON.stringify(addons)}`}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                {fmtPrice(low, unitSmall, unitBig)}
              </motion.div>
              <div className="est-result-range">{t('estimator.upTo')} <strong>{fmtPrice(high, unitSmall, unitBig)}</strong></div>
              <div className="est-divider" />

              <div className="est-breakdown">
                <div className="est-brow">
                  <span>{t('estimator.baseLabel', { label })}</span>
                  <span>{fmtPrice(meta.base[0], unitSmall, unitBig)} – {fmtPrice(meta.base[1], unitSmall, unitBig)}</span>
                </div>
                <div className="est-brow">
                  <span>{units} {unit} × {fmtPrice(meta.perUnit, unitSmall, unitBig)}</span>
                  <span>+{fmtPrice((units - 1) * meta.perUnit, unitSmall, unitBig)}</span>
                </div>
                {addonTotal > 0 && (
                  <div className="est-brow accent">
                    <span>{t('estimator.addonSelected')}</span>
                    <span>+{fmtPrice(addonTotal, unitSmall, unitBig)}</span>
                  </div>
                )}
              </div>

              <div className="est-divider" />
              <p className="est-note">{t('estimator.note')}</p>
              <a href={`https://wa.me/628139694307?text=${waMsg}`} target="_blank" rel="noreferrer" className="btn btn-wa" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                <Icon icon="fa-brands fa-whatsapp" /> {t('estimator.ctaConsult')}
              </a>
              <Link to="/ajukan-proyek" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
                <Icon icon="fa-solid fa-file-pen" /> {t('estimator.ctaBrief')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ SMART WA FLOAT */
function SmartWA({ reduce }) {
  const { path, t } = useLocale()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const PATH_KEYS = [
    ['/layanan', 'layanan'], ['/harga', 'harga'], ['/portofolio', 'portofolio'],
    ['/kontak', 'kontak'], ['/ajukan-proyek', 'ajukanProyek'], ['/karir', 'karir'],
    ['/blog', 'blog'], ['/faq', 'faq'],
  ]
  const hit = PATH_KEYS.find(([prefix]) => path.startsWith(prefix))
  const msg = t(`smartWa.messages.${hit ? hit[1] : 'default'}`, { brand: BRAND.short })

  if (!visible) return null
  return (
    <motion.a
      className="float-wa"
      href={waLink(msg)}
      target="_blank" rel="noreferrer"
      title={t('smartWa.title')}
      initial={{ scale: 0, opacity: 0 }}
      animate={reduce ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1, y: [0, -7, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
    >
      <Icon icon="fa-brands fa-whatsapp" />
    </motion.a>
  )
}

/* ════════════════════════════════════════════════ SKIP LINK */
function SkipLink() {
  const { t } = useLocale()
  return <a href="#main-content" className="skip-link">{t('common.skipLink')}</a>
}

/* ════════════════════════════════════════════════ LAYOUT — shared chrome (nav + footer) */
function LayoutInner() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  return (
    <>
      <ScrollToTop />
      <SkipLink />
      <div className="grain" aria-hidden="true" />
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <Nav />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <SmartWA reduce={reduce} />
      <ProductFinder />
    </>
  )
}

/* ════════════════════════════════════════════════ 404 — catch-all for unmatched paths
   (e.g. a stray link into an Indonesian-only section like /blog under /en or /zh). */
export function NotFound() {
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags('/')
  return (
    <>
      <Head>
        <title>{t('notFound.title')} | AFSS</title>
        <meta name="robots" content="noindex" />
        {hreflangTags}
      </Head>
      <section className="notfound">
        <div className="container notfound-inner">
          <div className="notfound-code">404</div>
          <h1>{t('notFound.title')}</h1>
          <p>{t('notFound.desc')}</p>
          <div className="notfound-ctas">
            <Link to="/" className="btn btn-pri btn-lg">{t('notFound.cta')}</Link>
            <Link to="/layanan" className="btn btn-ghost btn-lg">{t('notFound.ctaSecondary')}</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function Layout() {
  return (
    <LocaleProvider>
      <LayoutInner />
    </LocaleProvider>
  )
}

/* ════════════════════════════════════════════════ HOME PAGE */
export function Home() {
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/')}`
  return (
    <>
      <Head>
        <title>{t('seo.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={t('seo.home.title')} />
        <meta property="og:description" content={t('seo.home.ogDescription')} />
        <meta name="twitter:title" content={t('seo.home.title')} />
        <meta name="twitter:description" content={t('seo.home.ogDescription')} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>
      <Hero />
      <StatsBand />
      <TrustBar />
      <WhyUs />
      <Services />
      <AddOns />
      <Estimator />
      <Process />
      <TechStack />
      <BlogTeaser />
      <CtaBand />
    </>
  )
}
