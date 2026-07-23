// Helpers shared across the split page components in this folder — extracted
// from the former monolithic Pages.jsx so each page file only imports what it needs.
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { stats } from '../data/index.js'
import { Link } from '../i18n/link.jsx'
import { useLocale, pick } from '../i18n/context.jsx'

export { useBrand, buildWaLink } from '../lib/brand.js'

export const SITE_URL = 'https://afss.tech'

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
export const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }
export const viewport = { once: true, margin: '-60px' }

export const Reveal = ({ children, className = '', ...rest }) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className={className} {...rest}>
    {children}
  </motion.div>
)

/* ── Cursor spotlight (same pattern as App.jsx) ── */
export const onSpot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/* ── Breadcrumb ── */
export function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span> / </span>}
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span className="bc-current">{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}

/* ── Hero stat card — right column of 2-col page-hero ── */
export function HeroStatCard() {
  const { locale } = useLocale()
  const items = stats.map((s) => pick(s, locale))
  return (
    <div className="hero-stat-card">
      {items.map((s, i) => (
        <div key={s.id || i}>
          <div className="hero-stat-n">{s.prefix || ''}{s.n}<em>{s.suffix}</em></div>
          <div className="hero-stat-l">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

/* ── Zoom-on-hover image (portfolio gallery) ── */
export function ZoomImage({ src, alt, className }) {
  const imgRef = useRef(null)
  const onMove = e => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    if (imgRef.current) imgRef.current.style.transformOrigin = `${x}% ${y}%`
  }
  const onLeave = () => { if (imgRef.current) imgRef.current.style.transformOrigin = 'center' }
  return (
    <div className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      <img ref={imgRef} src={src} alt={alt} loading="lazy" />
    </div>
  )
}

/* ── Portfolio card mockup visual ── */
export function PortoMock({ p }) {
  if (p.image) {
    return (
      <div className="porto-mock" style={{ background: `linear-gradient(135deg, ${p.c}, ${p.c2})` }}>
        <img src={p.image} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      </div>
    )
  }
  return (
    <div className="porto-mock" style={{ background: `linear-gradient(135deg, ${p.c}, ${p.c2})` }}>
      <div className="porto-mock-inner">
        {p.kind === 'dash' ? (
          <div className="pm-dash">
            <div className="pm-sidebar"><span/><span/><span className="act"/><span/></div>
            <div className="pm-main">
              <div className="pm-topbar"/>
              <div className="pm-stats"><div/><div/><div/></div>
              <div className="pm-chart"/>
              <div className="pm-rows"><div/><div/><div/></div>
            </div>
          </div>
        ) : (
          <div className="pm-land">
            <div className="pm-nav"><div className="pm-logo"/><div/><div/><div/></div>
            <div className="pm-hero-h"/><div className="pm-hero-p"/><div className="pm-btn"/>
            <div className="pm-grid"><div/><div/><div/></div>
          </div>
        )}
      </div>
    </div>
  )
}
