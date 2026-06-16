import { useEffect, useRef, useState } from 'react'
import {
  motion, AnimatePresence, useScroll, useTransform, useSpring,
  useInView, animate, useReducedMotion,
} from 'framer-motion'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Icon } from './Icon.jsx'
import {
  BRAND, products, workflow as steps, showcase, charts, reviews, stats,
  growthSeries, kpis, satisfaction, waLink, clients, why, techStack, pricing, faqs,
} from './data.js'
import { getAllPosts, formatDateId } from './blog.js'

/* ── Motion presets — enter recipe: opacity + y + blur, smooth spring ── */
const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', duration: 0.7, bounce: 0 } },
}
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }
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

/* ── Censor reviewer name ── */
const censor = (full) =>
  full.split(' ').map((w) => (w.length <= 1 ? w : w[0] + '*'.repeat(w.length - 1))).join(' ')

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

/* ── AFSS logo mark — "AF" peak monogram + teal triangle.
   Paths traced from official logo: A legs wide-open, F bars from right leg,
   teal triangle centered inside A pointing up. ── */
function AFMark({ light = false }) {
  const peak = light ? '#FFFFFF' : 'var(--navy)'
  const shadow = light
    ? { filter: 'drop-shadow(0 1px 6px rgba(43,179,163,0.28))' }
    : { filter: 'drop-shadow(0 2px 10px rgba(21,36,59,0.26)) drop-shadow(0 1px 4px rgba(14,140,134,0.18))' }
  return (
    <svg className="af-mark" viewBox="0 0 50 48" role="img" aria-label="Logo AFSS" fill="none"
      strokeLinecap="round" strokeLinejoin="round" style={shadow}>
      {/* A: wide open legs — left foot(5,43), peak(22,5), right foot/F-stem(34,43) */}
      <path d="M5 43 L22 5 L34 43" stroke={peak} strokeWidth="7.5" />
      {/* F top arm — extends right from the A peak */}
      <path d="M22 5 L46 5" stroke={peak} strokeWidth="7.5" />
      {/* F middle arm — starts where the right leg sits at this height */}
      <path d="M28 23 L44 23" stroke={peak} strokeWidth="6.5" />
      {/* teal triangle — upward-pointing, centered inside A */}
      <path d="M15 36 L22 23 L29 36 Z" fill="var(--accent)" />
    </svg>
  )
}

const Logo = ({ footer }) => footer
  ? (
    <div className="ft-logo">
      <span className="mark"><AFMark light /></span>
      <span className="logo-word">AFSS</span>
    </div>
  )
  : <img src="/logo.png" alt="AFSS" className="logo-img" />

/* ════════════════════════════════════════════════ ANIMATED AREA CHART (the motion graph) */
function smoothPath(pts) {
  if (pts.length < 2) return ''
  const t = 0.16
  const d = [`M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`]
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) * t
    const c1y = p1.y + (p2.y - p0.y) * t
    const c2x = p2.x - (p3.x - p1.x) * t
    const c2y = p2.y - (p3.y - p1.y) * t
    d.push(`C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`)
  }
  return d.join(' ')
}

function AreaChart({ id, data, big = false }) {
  const reduce = useReducedMotion()
  const W = big ? 760 : 440
  const H = big ? 300 : 158
  const padX = 8, padTop = big ? 28 : 16, padBot = big ? 10 : 8
  const plotW = W - padX * 2
  const plotH = H - padTop - padBot
  const baseY = H - padBot
  const pts = data.map((p, i) => ({
    x: padX + (i / (data.length - 1)) * plotW,
    y: padTop + (1 - p.v / 100) * plotH,
  }))
  const line = smoothPath(pts)
  const area = `${line} L ${pts[pts.length - 1].x.toFixed(1)},${baseY} L ${pts[0].x.toFixed(1)},${baseY} Z`
  const last = pts[pts.length - 1]
  const grid = big ? [0, 25, 50, 75, 100] : [0, 50, 100]
  const drawT = reduce ? 0 : (big ? 1.9 : 1.4)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Grafik pertumbuhan klien">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity={big ? 0.18 : 0.16} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>

      {/* gridlines */}
      {grid.map((g, i) => {
        const gy = padTop + (1 - g / 100) * plotH
        return (
          <motion.line key={g} x1={padX} y1={gy} x2={W - padX} y2={gy}
            stroke="var(--line)" strokeWidth="1" strokeDasharray="2 5"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.08 }} />
        )
      })}

      {/* area fill rises in under the line */}
      <motion.path d={area} fill={`url(#${id}-fill)`}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.35, ease: 'easeOut' }} />

      {/* line draws itself */}
      <motion.path d={line} fill="none" stroke={`url(#${id}-stroke)`}
        strokeWidth={big ? 3 : 2.6} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: drawT, ease: [0.4, 0, 0.1, 1] }} />

      {/* end marker appears once the line arrives */}
      <motion.g
        initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.45, delay: drawT * 0.92, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${last.x}px ${last.y}px` }}>
        {big && <line x1={last.x} y1={last.y + 6} x2={last.x} y2={baseY} stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />}
        <circle cx={last.x} cy={last.y} r={big ? 9 : 7} fill="var(--accent)" opacity="0.16" />
        <circle cx={last.x} cy={last.y} r={big ? 4.5 : 3.6} fill="var(--accent)" stroke="#fff" strokeWidth="2" />
      </motion.g>
    </svg>
  )
}

/* ════════════════════════════════════════════════ NAV */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [
    { label: 'Layanan', to: '/layanan' },
    { label: 'Keunggulan', to: '/keunggulan' },
    { label: 'Portofolio', to: '/portofolio' },
    { label: 'Harga', to: '/harga' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Karir', to: '/karir' },
  ]
  const close = () => setOpen(false)
  return (
    <motion.nav className={`nav ${scrolled ? 'scrolled' : ''}`} initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <div className="nav-inner">
        <Link to="/" aria-label="AFSS beranda"><Logo /></Link>
        <ul className="nav-links">
          {links.map((lnk) => (
            <li key={lnk.label}><Link to={lnk.to}>{lnk.label}</Link></li>
          ))}
          <li><Link to="/blog">Blog</Link></li>
          <li><a href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis.`)} className="btn btn-pri" target="_blank" rel="noreferrer">Konsultasi Gratis</a></li>
        </ul>
        <button className="hamburger" aria-label="Menu" onClick={() => setOpen((o) => !o)}><span /><span /><span /></button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -8, height: 0 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
            {links.map((lnk) => (
              <Link key={lnk.label} to={lnk.to} onClick={close}>{lnk.label}</Link>
            ))}
            <Link to="/blog" onClick={close}>Blog</Link>
            <a href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis.`)} className="btn btn-pri" target="_blank" rel="noreferrer" onClick={close}>Konsultasi Gratis</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ── Reusable mockup (portfolio) ── */
function Mock({ item }) {
  return (
    <div className="mock" style={{ '--c': item.c, '--c2': item.c2 }}>
      <div className="mock-top"><i style={{ background: '#FF6058' }} /><i style={{ background: '#FFBD2E' }} /><i style={{ background: '#28C840' }} /></div>
      <div className="mock-body">
        {item.kind === 'dash' ? (
          <>
            <div className="m-side"><span className="act" /><span /><span /><span /><span /></div>
            <div className="m-main">
              <div className="m-bar" />
              <div className="m-stats"><div className="m-chip" /><div className="m-chip" /><div className="m-chip" /></div>
              <div className="m-chart">
                <svg viewBox="0 0 100 36" preserveAspectRatio="none">
                  <polyline points={charts[item.chart]} fill="none" stroke={item.c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="m-rows"><div className="m-row" /><div className="m-row" /><div className="m-row" /></div>
            </div>
          </>
        ) : (
          <div className="l-hero">
            <div className="l-nav"><div className="l-logo" /><div className="l-dot" /><div className="l-dot" /><div className="l-dot" /></div>
            <div className="l-h1" /><div className="l-h2" /><div className="l-btn" /><div className="l-img" />
          </div>
        )}
        <div className="m-phone"><div className="m-screen"><div className="m-ph-head" /><div className="m-ph-body"><div className="m-ph-card" /><div className="m-ph-card" /><div className="m-ph-card" /><div className="m-ph-card" /></div></div></div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════ HERO */
function Hero({ reduce, parallax }) {
  const floatA = reduce ? {} : { animate: { y: [0, -9, 0] }, transition: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' } }
  const floatB = reduce ? {} : { animate: { y: [0, 9, 0] }, transition: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' } }
  return (
    <section className="hero" id="home">
      <div className="hero-glow" />
      <div className="hero-inner">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div className="hero-badge" variants={fadeUp}>
            <span className="stars">★★★★★</span> Dipercaya 50+ perusahaan di Indonesia
          </motion.div>
          <motion.h1 variants={fadeUp}>
            Bangun Website &amp; Aplikasi Custom yang <span className="ital">sesuai kebutuhan</span> bisnis Anda
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>
            Kami rancang dan kembangkan website dan aplikasi dari nol — cepat, aman, dan siap tumbuh
            bersama bisnis Anda. Bukan template, bukan setengah jadi.
          </motion.p>
          <motion.div className="hero-cta" variants={fadeUp}>
            <Magnetic href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis untuk proyek saya.`)} className="btn btn-pri btn-lg" target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis</Magnetic>
            <Link to="/portofolio" className="btn btn-ghost btn-lg"><Icon icon="fa-solid fa-images" /> Lihat Portofolio</Link>
          </motion.div>
          <motion.div className="hero-trust" variants={fadeUp}>
            <div className="avatars"><span>50+</span></div>
            <span><b>Dipercaya 50+ perusahaan</b> · 100+ proyek selesai</span>
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
          <motion.div className="panel" style={reduce ? {} : { y: parallax }}>
            <div className="panel-head">
              <div className="ph-l"><span className="panel-dot" /><span className="panel-title">Pertumbuhan Klien</span></div>
              <span className="panel-tag">Live</span>
            </div>
            <div className="panel-figure">
              <span className="big"><Counter to={218} prefix="+" suffix="%" /></span>
              <span className="delta"><Icon icon="fa-solid fa-arrow-up" /> 12,4% bln ini</span>
            </div>
            <div className="panel-sub">Rata-rata konversi klien · 12 bulan terakhir</div>
            <div className="panel-chart"><AreaChart id="hero" data={growthSeries} /></div>
            <div className="panel-x"><span>Jan</span><span>Apr</span><span>Jul</span><span>Okt</span><span>Des</span></div>
          </motion.div>

          <motion.div className="float-card fc-1" {...floatA}>
            <div className="fc-ico" style={{ background: 'var(--wa)' }}><Icon icon="fa-solid fa-arrow-trend-up" /></div>
            <div><div className="fc-big">+38%</div><div className="fc-sm">Konversi</div></div>
          </motion.div>
          <motion.div className="float-card fc-2" {...floatB}>
            <div className="fc-ico" style={{ background: 'var(--accent)' }}><Icon icon="fa-solid fa-circle-check" /></div>
            <div><div className="fc-big">100+</div><div className="fc-sm">Proyek Selesai</div></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ STATS BAND */
function StatsBand() {
  return (
    <div className="stats-band">
      <motion.div className="stats-card" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
        {stats.map((s) => (
          <motion.div className="stat-item" key={s.label} variants={fadeUp}>
            <div className="stat-num"><Counter to={s.n} prefix={s.prefix || ''} suffix={s.suffix} /></div>
            <div className="stat-lbl">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* ════════════════════════════════════════════════ TRUST BAR — client / industry strip */
function TrustBar() {
  return (
    <div className="trustbar">
      <div className="container">
        <Reveal className="trust-label">Dipercaya oleh bisnis di berbagai industri</Reveal>
        <motion.div className="trust-logos" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {clients.map((c) => (
            <motion.span className="trust-logo" key={c} variants={fadeUp}>
              <Icon icon="fa-solid fa-circle-nodes" /> {c}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════ SERVICES / LAYANAN */
function Services() {
  return (
    <section id="services">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> Layanan</div>
          <h2 className="sec-title">Jasa pembuatan website &amp; aplikasi untuk <span className="ital">setiap</span> kebutuhan</h2>
          <p className="sec-sub">Dari website custom hingga aplikasi mobile dan sistem internal — dibangun dari nol, cepat, dan SEO-ready sejak awal.</p>
        </Reveal>
        <motion.div className="svc-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {products.map((p) => (
            <motion.div key={p.name} className={`svc-card spot ${p.hot ? 'hot' : ''}`} variants={fadeUp} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }} onMouseMove={onSpot}>
              {p.hot && <span className="hot-tag">Terpopuler</span>}
              <div className="svc-top">
                <div className="svc-ico"><Icon icon={p.icon} /></div>
                <span className="metric-badge"><Icon icon="fa-solid fa-circle-check" /> {p.metric}</span>
              </div>
              <div className="svc-name">{p.name}</div>
              <p className="svc-desc">{p.desc}</p>
              <ul className="svc-feats">{p.feats.map((f) => <li key={f}><Icon icon="fa-solid fa-check" /> {f}</li>)}</ul>
              <div className="svc-foot">
                <a className="btn" href={waLink(`Halo ${BRAND.short}, saya tertarik dengan layanan ${p.name}.`)} target="_blank" rel="noreferrer">Konsultasi Sekarang <Icon icon="fa-solid fa-arrow-right" /></a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/layanan" className="btn btn-ghost btn-lg">Lihat semua layanan <Icon icon="fa-solid fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ IMPACT / MOTION GRAPH */
function Impact() {
  return (
    <section className="impact" id="impact">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-chart-line" /> Dampak</div>
          <h2 className="sec-title">Hasil yang <span className="ital">terukur</span>, bukan sekadar janji</h2>
          <p className="sec-sub">Setiap sistem yang kami bangun dirancang untuk menggerakkan angka yang penting bagi bisnis Anda.</p>
        </Reveal>
        <div className="impact-grid">
          <Reveal className="graph-card spot" onMouseMove={onSpot}>
            <div className="graph-head">
              <h3>Pertumbuhan rata-rata klien</h3>
              <div className="legend">
                <span><i style={{ background: 'var(--accent)' }} /> Indeks konversi</span>
              </div>
            </div>
            <div className="graph-figure">
              <span className="num"><Counter to={218} prefix="+" suffix="%" duration={1.9} /></span>
              <span className="pill"><Icon icon="fa-solid fa-arrow-up" /> 12 bulan</span>
            </div>
            <div className="graph-canvas"><AreaChart id="impact" data={growthSeries} big /></div>
            <div className="gx-labels">{growthSeries.map((p) => <span key={p.m}>{p.m}</span>)}</div>
          </Reveal>

          <div className="kpi-col">
            {kpis.map((k) => (
              <Reveal key={k.label} className="kpi-card">
                <div className="kpi-top">
                  <div className="kpi-num"><Counter to={k.n} prefix={k.prefix} suffix={k.suffix} /></div>
                  <div className="kpi-label">{k.label}</div>
                </div>
                <div className="kpi-track">
                  <motion.div className="kpi-fill"
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: k.bar / 100 }} viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} />
                </div>
              </Reveal>
            ))}
            <Reveal className="gauge-card">
              <div className="gauge">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="8" />
                  <motion.circle cx="50" cy="50" r="42" fill="none" stroke="var(--accent-2)" strokeWidth="8" strokeLinecap="round"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: satisfaction / 100 }} viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} />
                </svg>
                <div className="gauge-val"><Counter to={satisfaction} suffix="%" /></div>
              </div>
              <div className="gauge-txt">
                <div className="gt-t">Kepuasan klien</div>
                <div className="gt-d">Diukur dari survei pasca-launching seluruh proyek yang telah kami selesaikan.</div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ PROCESS — 6 langkah */
function Process() {
  return (
    <section className="process" id="process">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow green"><Icon icon="fa-solid fa-route" /> Cara Kerja</div>
          <h2 className="sec-title">Proses yang transparan &amp; <span className="ital">konsultatif</span></h2>
          <p className="sec-sub">Kami selalu mengutamakan konsultasi sebelum membangun. Anda tahu persis apa yang dikerjakan di setiap tahap.</p>
        </Reveal>
        <motion.div className="proc-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {steps.map((s) => (
            <motion.div className="proc-card spot" key={s.step} variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} onMouseMove={onSpot}>
              <span className="proc-step">{s.step}</span>
              <div className="proc-ico"><Icon icon={s.icon} /></div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <Reveal className="proc-note">💡 <b>Kepercayaan lebih penting dari transaksi</b> — itulah mengapa konsultasi awal selalu gratis.</Reveal>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ SHOWCASE / PORTOFOLIO */
function Showcase() {
  return (
    <section className="showcase" id="portfolio">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-images" /> Portofolio</div>
          <h2 className="sec-title">Studi kasus &amp; <span className="ital">hasil nyata</span></h2>
          <p className="sec-sub">Beragam sistem yang telah kami bangun — lengkap dengan stack teknologi &amp; hasil yang dirasakan klien.</p>
        </Reveal>
        <motion.div className="show-grid" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-30px' }}>
          {showcase.map((item) => (
            <motion.div key={item.n} className="show-card spot" style={{ '--c': item.c, '--c2': item.c2 }} variants={fadeUp} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} onMouseMove={onSpot}>
              <div className="show-head"><div className="show-num">{item.n}</div><div className="show-title">{item.title}</div></div>
              <Mock item={item} />
              <div className="show-tags">{item.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="show-price"><Icon icon="fa-solid fa-arrow-trend-up" /> {item.price}</div>
            </motion.div>
          ))}
        </motion.div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/portofolio" className="btn btn-ghost btn-lg">Lihat semua portofolio <Icon icon="fa-solid fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ REVIEWS / TESTIMONI */
function ReviewCard({ r }) {
  return (
    <div className="rev-card">
      <div className="rev-stars">{[...Array(5)].map((_, i) => <Icon key={i} icon="fa-solid fa-star" />)}</div>
      <p className="rev-text">“{r.text}”</p>
      <div className="rev-author">
        <div className="av" style={{ background: r.grad }}>{r.initials}</div>
        <div>
          <div className="av-name">{censor(r.name)}<Icon icon="fa-solid fa-circle-check verified" title="Klien terverifikasi" /></div>
          <div className="av-co">{r.company}</div>
        </div>
      </div>
    </div>
  )
}
function Reviews({ reduce }) {
  const rowA = reviews.slice(0, 5)
  const rowB = reviews.slice(4)
  const Row = ({ items, dir }) => (
    <div className="marquee">
      <motion.div className="marquee-track" animate={reduce ? {} : { x: dir > 0 ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration: 50, ease: 'linear', repeat: Infinity }}>
        {[...items, ...items].map((r, i) => <ReviewCard key={i} r={r} />)}
      </motion.div>
    </div>
  )
  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-heart" /> Testimoni</div>
          <h2 className="sec-title">Apa kata <span className="ital">klien</span> kami?</h2>
          <p className="sec-sub">Kepuasan klien adalah prioritas utama kami. Demi privasi, nama klien ditampilkan secara tersamar.</p>
        </Reveal>
      </div>
      <Row items={rowA} dir={-1} />
      <Row items={rowB} dir={1} />
    </section>
  )
}

/* ════════════════════════════════════════════════ TECH STACK / TEKNOLOGI */
function TechStack() {
  return (
    <section className="tech" id="tech">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-microchip" /> Teknologi</div>
          <h2 className="sec-title">Stack modern yang kami <span className="ital">gunakan</span></h2>
          <p className="sec-sub">Teknologi terkini yang teruji — dipilih agar sistem Anda cepat, aman, dan mudah dikembangkan ke depan.</p>
        </Reveal>
        <motion.div className="tech-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {techStack.map((t) => (
            <motion.div className="tech-chip" key={t.name} variants={fadeUp} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }}>
              <Icon icon={t.icon} /> <span>{t.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ BLOG TEASER (internal linking from home) */
function BlogTeaser() {
  const latest = getAllPosts().slice(0, 3)
  return (
    <section className="blog-teaser" id="blog-teaser">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-newspaper" /> Blog</div>
          <h2 className="sec-title">Wawasan &amp; <span className="ital">tips</span> terbaru</h2>
          <p className="sec-sub">Panduan praktis seputar pembuatan website, aplikasi, dan strategi digital untuk bisnis Anda.</p>
        </Reveal>
        <motion.div className="blog-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {latest.map((p) => (
            <motion.article key={p.slug} className="blog-card" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
              <Link to={`/blog/${p.slug}`} className="blog-card-link">
                <div className="blog-cover" style={{ '--c': p.c, '--c2': p.c2 }}>
                  <img src={`/blog/${p.slug}.png`} alt={`Ilustrasi artikel: ${p.title}`} width="1200" height="630" loading="lazy" />
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta">{formatDateId(p.date)} · {p.readMinutes} menit baca</div>
                  <h3 className="blog-card-title">{p.title}</h3>
                  <p className="blog-card-excerpt">{p.excerpt}</p>
                  <span className="blog-readmore">Baca selengkapnya <Icon icon="fa-solid fa-arrow-right" /></span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
        <div className="blog-teaser-all">
          <Link to="/blog" className="btn btn-ghost btn-lg">Lihat semua artikel <Icon icon="fa-solid fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ CTA BAND */
function CtaBand() {
  return (
    <section className="cta-band">
      <Reveal className="cta-card">
        <h2>Siap mewujudkan website atau aplikasi <span className="ital">Anda</span>?</h2>
        <p>Konsultasi gratis, tanpa komitmen. Ceritakan ide Anda hari ini — kami bantu temukan solusi terbaik untuk bisnis Anda.</p>
        <div className="btns">
          <Magnetic href={waLink(`Halo ${BRAND.short}, saya ingin memulai proyek dan konsultasi gratis.`)} className="btn btn-pri btn-lg" target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Mulai Sekarang</Magnetic>
          <Link to="/harga" className="btn btn-ghost btn-lg">Lihat Paket Harga</Link>
        </div>
      </Reveal>
    </section>
  )
}

/* ════════════════════════════════════════════════ FOOTER */
function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <Logo footer />
          <p className="ft-legal">{BRAND.legal}</p>
          <p className="ft-desc">Software house terpercaya yang membangun website, aplikasi, dan sistem digital berkualitas tinggi untuk semua skala bisnis di Indonesia. {BRAND.tagline}.</p>
          <div className="ft-social">
            {BRAND.social.filter((s) => s.url).map((s) => (
              <a key={s.name} href={s.url} className="soc" aria-label={s.name} target="_blank" rel="noreferrer">
                <Icon icon={s.icon} />
              </a>
            ))}
            <a href={waLink(`Halo ${BRAND.short}!`)} target="_blank" rel="noreferrer" className="soc" aria-label="WhatsApp"><Icon icon="fa-brands fa-whatsapp" /></a>
          </div>
        </div>
        <div>
          <div className="ft-head">Layanan</div>
          <ul className="ft-links">
            <li><Link to="/layanan/pembuatan-website">Pembuatan Website Custom</Link></li>
            <li><Link to="/layanan/aplikasi-mobile">Aplikasi Mobile Android &amp; iOS</Link></li>
            <li><Link to="/layanan/web-app">Web App &amp; Sistem Internal</Link></li>
            <li><Link to="/layanan/maintenance">Maintenance &amp; Support</Link></li>
          </ul>
        </div>
        <div>
          <div className="ft-head">Perusahaan</div>
          <ul className="ft-links">
            <li><Link to="/tentang">Tentang Kami</Link></li>
            <li><Link to="/portofolio">Portofolio</Link></li>
            <li><Link to="/kontak">Kontak</Link></li>
            <li><Link to="/harga">Paket Harga</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/karir">Karir</Link></li>
          </ul>
        </div>
        <div>
          <div className="ft-head">Kontak</div>
          <ul className="ft-links">
            <li><a href={waLink(`Halo ${BRAND.short}!`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" />{BRAND.phone}</a></li>
            <li><a href={`mailto:${BRAND.email}`}><Icon icon="fa-solid fa-envelope" />{BRAND.email}</a></li>
            <li><span><Icon icon="fa-solid fa-location-dot" />{BRAND.address}</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {BRAND.legal}. All rights reserved.</p>
        <div className="legal"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Service</Link></div>
      </div>
    </footer>
  )
}

/* ════════════════════════════════════════════════ LAYOUT — shared chrome (nav + footer) */
export function Layout() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  return (
    <>
      <ScrollToTop />
      <div className="grain" aria-hidden="true" />
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <Nav />
      <Outlet />
      <Footer />
      <motion.a className="float-wa" href={waLink(`Halo ${BRAND.short}, saya ingin bertanya.`)} target="_blank" rel="noreferrer" title="Chat WhatsApp"
        animate={reduce ? {} : { y: [0, -7, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
        <Icon icon="fa-brands fa-whatsapp" />
      </motion.a>
    </>
  )
}

/* ════════════════════════════════════════════════ HOME PAGE */
export function Home() {
  const { scrollY } = useScroll()
  const reduce = useReducedMotion()
  const parallax = useTransform(scrollY, [0, 600], [0, -40])
  return (
    <>
      <Head>
        <title>Jasa Pembuatan Website & Aplikasi Custom | AFSS</title>
        <meta name="description" content="AFSS — software house Indonesia. Jasa pembuatan website custom, aplikasi mobile Android & iOS, web app & ERP. Cepat, SEO-ready, kode milik Anda." />
        <link rel="canonical" href="https://afss.tech/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://afss.tech/" />
        <meta property="og:title" content="Jasa Pembuatan Website & Aplikasi Custom | AFSS" />
        <meta property="og:description" content="Bangun website & aplikasi custom sesuai kebutuhan bisnis Anda. Cepat, SEO-ready, kode milik Anda. Konsultasi gratis." />
        <meta name="twitter:title" content="Jasa Pembuatan Website & Aplikasi Custom | AFSS" />
        <meta name="twitter:description" content="Bangun website & aplikasi custom sesuai kebutuhan bisnis Anda. Cepat, SEO-ready, kode milik Anda." />
        <meta property="og:image" content="https://afss.tech/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://afss.tech/og.png" />
      </Head>
      <Hero reduce={reduce} parallax={parallax} />
      <StatsBand />
      <TrustBar />
      <Services />
      <Impact />
      <Process />
      <Showcase />
      <Reviews reduce={reduce} />
      <TechStack />
      <BlogTeaser />
      <CtaBand />
    </>
  )
}
