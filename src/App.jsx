import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Icon } from './Icon.jsx'
import { ProductFinder } from './ProductFinder.jsx'
import { Link, RawLink } from './i18n/link.jsx'
import { LocaleProvider, useLocale } from './i18n/context.jsx'
import { LOCALES, LOCALE_SHORT, safeLocalePath, setLocaleCookie } from './i18n/locales.js'
import { useHreflangTags } from './i18n/HreflangTags.jsx'
import { serviceAreas } from './data/index.js'
import { useBrand, buildWaLink } from './lib/brand.js'
import { track } from './lib/track.js'

/* ── Scroll to top on every route change ── */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

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
  const brand = useBrand()
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
          <li><a href={buildWaLink(brand.wa, t('wa.navConsult', { brand: brand.short }))} className="btn btn-pri" target="_blank" rel="noreferrer">{t('nav.konsultasiGratis')}</a></li>
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
            <a href={buildWaLink(brand.wa, t('wa.navConsult', { brand: brand.short }))} className="btn btn-pri" target="_blank" rel="noreferrer" onClick={close}>{t('nav.konsultasiGratis')}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}


/* ════════════════════════════════════════════════ FOOTER */
export function Footer({ trimmed = false }) {
  const { locale, t } = useLocale()
  const brand = useBrand()
  return (
    <footer>
      <div className="footer-grid" style={trimmed ? { gridTemplateColumns: '2fr 1.2fr' } : undefined}>
        <div>
          <Logo footer />
          <p className="ft-legal">{brand.legal}</p>
          <p className="ft-desc">{t('footer.descPre')} {brand.tagline}.</p>
          <div className="ft-social">
            {brand.social.filter((s) => s.url).map((s) => (
              <a key={s.name} href={s.url} className="soc" aria-label={s.name} target="_blank" rel="noreferrer">
                <Icon icon={s.icon} />
              </a>
            ))}
            <a href={buildWaLink(brand.wa, t('wa.greetShort', { brand: brand.short }))} target="_blank" rel="noreferrer" className="soc" aria-label="WhatsApp"><Icon icon="fa-brands fa-whatsapp" /></a>
          </div>
        </div>
        {!trimmed && (<>
        <div>
          <div className="ft-head">{t('footer.layanan')}</div>
          <ul className="ft-links">
            <li><Link to="/layanan/landing-page">{t('footer.svc.landingPage')}</Link></li>
            <li><Link to="/layanan/company-profile">{t('footer.svc.companyProfile')}</Link></li>
            <li><Link to="/layanan/software-custom">{t('footer.svc.softwareCustom')}</Link></li>
            <li><Link to="/layanan/aplikasi-mobile">{t('footer.svc.aplikasiMobile')}</Link></li>
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
        <div>
          <div className="ft-head">{t('footer.area')}</div>
          <ul className="ft-links">
            {/* City pages are Indonesian-only — RawLink keeps them unprefixed under /en & /zh */}
            {serviceAreas.map((a) => (
              <li key={a.slug}><RawLink to={`/jasa-pembuatan-website-${a.slug}`}>{a.name}</RawLink></li>
            ))}
          </ul>
        </div>
        </>)}
        <div>
          <div className="ft-head">{t('footer.kontakHead')}</div>
          <ul className="ft-links">
            <li><a href={buildWaLink(brand.wa, t('wa.greetShort', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" />{brand.phone}</a></li>
            <li><a href={`mailto:${brand.email}`}><Icon icon="fa-solid fa-envelope" />{brand.email}</a></li>
            <li><span><Icon icon="fa-solid fa-location-dot" />{brand.address}</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {brand.legal}. {t('footer.rights')}</p>
        {/* Privacy/Terms are Indonesian-only for now (see main.jsx) — always link to the
            unprefixed page directly rather than through the locale-prefixing Link wrapper. */}
        <div className="legal"><RawLink to="/privacy">{t('footer.privacy')}</RawLink><RawLink to="/terms">{t('footer.terms')}</RawLink></div>
      </div>
    </footer>
  )
}


/* ════════════════════════════════════════════════ SMART WA FLOAT */
function SmartWA({ reduce }) {
  const { path, t } = useLocale()
  const brand = useBrand()
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
  const msg = t(`smartWa.messages.${hit ? hit[1] : 'default'}`, { brand: brand.short })

  if (!visible) return null
  return (
    <motion.a
      className="float-wa"
      href={buildWaLink(brand.wa, msg)}
      target="_blank" rel="noreferrer"
      title={t('smartWa.title')}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <Icon icon="fa-brands fa-whatsapp" />
    </motion.a>
  )
}

/* ════════════════════════════════════════════════ MOBILE ACTION BAR — bottom quick-nav (≤768px) */
function MobileBar() {
  const { path, t } = useLocale()
  const brand = useBrand()
  const items = [
    { to: '/layanan', icon: 'fa-solid fa-layer-group', label: t('mobileBar.produk') },
    { to: '/portofolio', icon: 'fa-solid fa-eye', label: t('mobileBar.demo') },
    { to: '/harga', icon: 'fa-solid fa-tag', label: t('mobileBar.harga') },
  ]
  return (
    <nav className="mobile-bar" aria-label={t('journey.aria')}>
      {items.map((it) => (
        <Link key={it.to} to={it.to} className={path.startsWith(it.to) ? 'active' : ''}>
          <Icon icon={it.icon} />
          <span>{it.label}</span>
        </Link>
      ))}
      <a href={buildWaLink(brand.wa, t('smartWa.messages.default', { brand: brand.short }))} target="_blank" rel="noreferrer" className="mb-wa" onClick={() => track('wa_click', { source: 'mobile_bar' })}>
        <Icon icon="fa-brands fa-whatsapp" />
        <span>{t('mobileBar.chat')}</span>
      </a>
    </nav>
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
      <MobileBar />
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


export { Home } from './home/Home.jsx'
