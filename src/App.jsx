import { useEffect, useRef, useState } from 'react'
import {
  motion, AnimatePresence, useScroll, useSpring,
  useInView, animate, useReducedMotion,
} from 'framer-motion'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Icon } from './Icon.jsx'
import { ProductFinder } from './ProductFinder.jsx'
import {
  BRAND, products, workflow as steps, stats,
  waLink, clients, techStack, pricing, faqs,
} from './data.js'
import { formatDateId } from './site.js'
import { postsMeta } from './blog-meta.js'

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
  : <img src="/logo.png" alt="AFSS" className="logo-img" width="120" height="40" />


/* ════════════════════════════════════════════════ NAV */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [
    { label: 'Layanan', to: '/layanan' },
    { label: 'Portofolio', to: '/portofolio' },
    { label: 'Estimasi', to: '/estimasi' },
    { label: 'Harga', to: '/harga' },
    { label: 'Blog', to: '/blog' },
    { label: 'FAQ', to: '/faq' },
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
          <li><Link to="/ajukan-proyek" className="nav-cta-link">Ajukan Proyek</Link></li>
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
            <Link to="/ajukan-proyek" onClick={close}>Ajukan Proyek</Link>
            <a href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis.`)} className="btn btn-pri" target="_blank" rel="noreferrer" onClick={close}>Konsultasi Gratis</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}


/* ════════════════════════════════════════════════ HERO */
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-glow" />
      <div className="hero-inner">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div className="hero-badge" variants={fadeUp}>
            <span className="pulse-dot" />
            Software House untuk Bisnis Indonesia
          </motion.div>
          <motion.h1 variants={fadeUp}>
            Bangun Website, Aplikasi Mobile &amp; <span className="ital">Sistem Bisnis Digital</span> dengan Harga Masuk Akal
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>
            AFSS membantu bisnis Indonesia memiliki website, dashboard, aplikasi mobile, hingga ERP custom yang profesional, mudah digunakan, dan bisa dikembangkan sesuai kebutuhan.
          </motion.p>
          <motion.div className="hero-cta" variants={fadeUp}>
            <Magnetic href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis untuk proyek saya.`)} className="btn btn-wa btn-lg" target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis via WhatsApp</Magnetic>
            <Link to="/portofolio" className="btn btn-ghost btn-lg">Lihat Portofolio <Icon icon="fa-solid fa-arrow-right" /></Link>
          </motion.div>
          <motion.div className="hero-trust" variants={fadeUp}>
            <span>Cocok untuk <b>UMKM, startup, klinik, sekolah, retail</b> & perusahaan yang ingin naik level digital.</span>
          </motion.div>
        </motion.div>

        {/* Blueprint spec plate — a build manifest for what AFSS actually ships, not a fake SaaS dashboard */}
        <motion.div className="hero-visual" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
          <div className="bp-plate">
            <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
            <div className="bp-head">
              <span className="bp-tag">AFSS / BUILD SPEC</span>
              <span className="bp-status"><span className="dot" /> Dalam Pengerjaan</span>
            </div>
            <div className="bp-title">Website <span className="ital">→</span> Dashboard <span className="ital">→</span> ERP</div>
            <div className="bp-flow">
              <div className="bp-node">
                <div className="bp-node-ico"><Icon icon="fa-solid fa-window-maximize" /></div>
                <div className="bp-node-lbl">Website / App</div>
              </div>
              <div className="bp-connector" />
              <div className="bp-node">
                <div className="bp-node-ico"><Icon icon="fa-solid fa-gauge-high" /></div>
                <div className="bp-node-lbl">Dashboard</div>
              </div>
              <div className="bp-connector" />
              <div className="bp-node">
                <div className="bp-node-ico"><Icon icon="fa-solid fa-circle-nodes" /></div>
                <div className="bp-node-lbl">ERP / Sistem</div>
              </div>
            </div>
            <div className="bp-stats">
              <div className="bp-stat">
                <div className="bp-stat-num">100%</div>
                <div className="bp-stat-lbl">Kode milik klien</div>
              </div>
              <div className="bp-stat">
                <div className="bp-stat-num">30–90 Hari</div>
                <div className="bp-stat-lbl">Garansi bug gratis</div>
              </div>
              <div className="bp-stat">
                <div className="bp-stat-num">24/7</div>
                <div className="bp-stat-lbl">Maintenance &amp; support</div>
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

/* ════════════════════════════════════════════════ KENAPA AFSS */
function WhyUs() {
  const items = [
    { icon: 'fa-solid fa-code', color: 'var(--blue)', bg: 'var(--blue-l)', title: 'Kode Milik Anda Sepenuhnya', desc: 'Tidak ada vendor lock-in. Seluruh source code, dokumentasi, dan aset diserahkan setelah proyek selesai.' },
    { icon: 'fa-solid fa-gauge-high', color: '#10C7B2', bg: 'rgba(16,199,178,.1)', title: 'Cepat & SEO-Ready Sejak Awal', desc: 'Core Web Vitals 90+ dan struktur SEO on-page yang benar sejak baris kode pertama — bukan tambalan belakangan.' },
    { icon: 'fa-solid fa-comments', color: 'var(--blue)', bg: 'var(--blue-l)', title: 'Komunikasi Transparan', desc: 'Update progres berkala, bisa dichat kapan saja, dan perubahan kecil tidak tiba-tiba ada biaya tambahan.' },
    { icon: 'fa-solid fa-shield-halved', color: '#10C7B2', bg: 'rgba(16,199,178,.1)', title: 'Garansi Bug 30–90 Hari', desc: 'Setiap proyek dilengkapi masa garansi bug setelah launching. Jika ada yang rusak karena kode kami — kami perbaiki gratis.' },
    { icon: 'fa-solid fa-location-dot', color: 'var(--blue)', bg: 'var(--blue-l)', title: 'Tim Lokal, Paham Konteks Indonesia', desc: 'Memahami kebutuhan bisnis Indonesia — dari integrasi e-commerce lokal, payment gateway Rupiah, hingga regulasi pajak.' },
    { icon: 'fa-solid fa-chart-line', color: '#10C7B2', bg: 'rgba(16,199,178,.1)', title: 'Berorientasi Hasil Bisnis', desc: 'Kami tidak hanya membangun tampilan. Setiap fitur yang kami rekomendasikan punya alasan bisnis yang jelas.' },
  ]
  return (
    <section className="whyus-home">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-award" /> Kenapa AFSS</div>
          <h2 className="sec-title">Kami tidak hanya membuat tampilan — kami membantu bisnis <span className="ital">benar-benar bisa dipakai</span></h2>
        </Reveal>
        <motion.div className="why-home-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {items.map((it) => (
            <motion.div key={it.title} className="why-home-card spot" variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} onMouseMove={onSpot}>
              <div className="why-home-ico" style={{ color: it.color, background: it.bg }}><Icon icon={it.icon} /></div>
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
  const doubled = [...clients, ...clients]
  return (
    <div className="trustbar">
      <div className="trust-label">Dipercaya beragam bisnis di Indonesia</div>
      <div className="trust-marquee-wrap">
        <div className="trust-logos">
          {doubled.map((c, i) => (
            <span className="trust-logo" key={i}>
              <Icon icon="fa-solid fa-circle-nodes" /> {c}
            </span>
          ))}
        </div>
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
          {products.slice(0, 6).map((p) => (
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
                <Link className="btn" to={`/layanan/${p.slug}`}>Selengkapnya <Icon icon="fa-solid fa-arrow-right" /></Link>
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
              <h3 className="proc-title">{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <Reveal className="proc-note">💡 <b>Kepercayaan lebih penting dari transaksi</b> — itulah mengapa konsultasi awal selalu gratis.</Reveal>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ ADD-ON SERVICES */
const ADDONS_DISPLAY = [
  { icon: 'fa-solid fa-magnifying-glass-chart', color: '#2563FF', bg: 'rgba(37,99,255,.09)', title: 'SEO On-Page Lengkap', desc: 'Riset keyword, optimasi meta tag, schema markup, internal linking, dan sitemap — semua siap submit ke Google.', price: 'Rp 1,5–3 Jt' },
  { icon: 'fa-solid fa-server', color: '#10C7B2', bg: 'rgba(16,199,178,.09)', title: 'Domain + Hosting 1 Tahun', desc: 'Setup domain pilihan Anda (.com / .id / .co.id) + hosting cepat dengan SSL gratis dan backup mingguan.', price: 'Rp 500rb–1,5 Jt' },
  { icon: 'fa-solid fa-credit-card', color: '#2563FF', bg: 'rgba(37,99,255,.09)', title: 'Integrasi Payment Gateway', desc: 'Midtrans atau Xendit — transfer bank, QRIS, kartu kredit, GoPay, OVO, Dana. Siap produksi.', price: 'Rp 1,5–3 Jt' },
  { icon: 'fa-brands fa-whatsapp', color: '#1EBE5D', bg: 'rgba(30,190,93,.09)', title: 'WhatsApp Business API', desc: 'Notifikasi otomatis ke pelanggan — konfirmasi order, reminder jadwal, OTP, hingga broadcast promo.', price: 'Rp 1,5–2,5 Jt' },
  { icon: 'fa-solid fa-chart-bar', color: '#10C7B2', bg: 'rgba(16,199,178,.09)', title: 'Analytics & Tracking Setup', desc: 'Google Analytics 4, Google Tag Manager, Meta Pixel, dan konversi event — data akurat untuk keputusan iklan.', price: 'Rp 500rb–1,5 Jt' },
  { icon: 'fa-solid fa-pen-ruler', color: '#2563FF', bg: 'rgba(37,99,255,.09)', title: 'Desain UI/UX Tambahan', desc: 'Wireframe, mockup Figma, dan user flow untuk halaman atau fitur tambahan di luar scope awal.', price: 'Rp 1–3 Jt/halaman' },
]

function AddOns() {
  return (
    <section className="addons-sec">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-puzzle-piece" /> Add-On</div>
          <h2 className="sec-title">Tambahkan layanan sesuai <span className="ital">kebutuhan proyek</span></h2>
          <p className="sec-sub">Kombinasikan layanan utama dengan add-on untuk solusi yang lebih lengkap. Bisa ditambahkan kapan saja, bahkan setelah proyek selesai.</p>
        </Reveal>
        <motion.div className="addons-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {ADDONS_DISPLAY.map((a) => (
            <motion.div key={a.title} className="addon-card spot" variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} onMouseMove={onSpot}>
              <div className="addon-ico" style={{ color: a.color, background: a.bg }}><Icon icon={a.icon} /></div>
              <div className="addon-content">
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
              <div className="addon-price">{a.price}</div>
            </motion.div>
          ))}
        </motion.div>
        <Reveal className="addons-note">
          Harga add-on adalah estimasi. Kombinasi dengan proyek utama bisa mendapat <b>harga lebih baik</b>.{' '}
          <a href={waLink(`Halo ${BRAND.short}, saya ingin tanya tentang add-on layanan AFSS.`)} target="_blank" rel="noreferrer" className="accent-link">Tanya via WhatsApp →</a>
        </Reveal>
      </div>
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
  const latest = postsMeta.slice(0, 3)
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
                  <img src={`/blog/${p.slug}.png`} alt={`Ilustrasi artikel: ${p.title}`} width="1200" height="630" loading="lazy" onError={(e) => { e.target.style.display = 'none' }} />
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
export function Footer({ trimmed = false }) {
  return (
    <footer>
      <div className="footer-grid" style={trimmed ? { gridTemplateColumns: '2fr 1.2fr' } : undefined}>
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
        {!trimmed && (<>
        <div>
          <div className="ft-head">Layanan</div>
          <ul className="ft-links">
            <li><Link to="/layanan/landing-page">Landing Page</Link></li>
            <li><Link to="/layanan/company-profile">Company Profile</Link></li>
            <li><Link to="/layanan/software-custom">Software Custom</Link></li>
            <li><Link to="/layanan/erp">ERP Custom</Link></li>
            <li><Link to="/layanan/ecommerce">E-Commerce</Link></li>
            <li><Link to="/layanan/marketplace">Marketplace</Link></li>
          </ul>
        </div>
        <div>
          <div className="ft-head">Perusahaan</div>
          <ul className="ft-links">
            <li><Link to="/tentang">Tentang Kami</Link></li>
            <li><Link to="/keunggulan">Keunggulan</Link></li>
            <li><Link to="/portofolio">Portofolio</Link></li>
            <li><Link to="/estimasi">Estimasi Biaya</Link></li>
            <li><Link to="/kontak">Kontak</Link></li>
            <li><Link to="/harga">Paket Harga</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/karir">Karir</Link></li>
          </ul>
        </div>
        </>)}
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

/* ════════════════════════════════════════════════ PROJECT ESTIMATOR */
const EST_PRODUCTS = [
  { id: 'landing',     label: 'Landing Page',      base: [1.5, 5],   perUnit: 0.4,  unit: 'halaman', icon: 'fa-solid fa-rectangle-ad' },
  { id: 'profile',     label: 'Company Profile',   base: [4.5, 12],  perUnit: 0.6,  unit: 'halaman', icon: 'fa-solid fa-briefcase' },
  { id: 'software',    label: 'Software Custom',   base: [8, 30],    perUnit: 2,    unit: 'modul',   icon: 'fa-solid fa-code' },
  { id: 'erp',         label: 'ERP',               base: [28, 100],  perUnit: 5,    unit: 'modul',   icon: 'fa-solid fa-circle-nodes' },
  { id: 'ecommerce',   label: 'E-Commerce',        base: [18, 50],   perUnit: 2.5,  unit: 'modul',   icon: 'fa-solid fa-cart-shopping' },
  { id: 'marketplace', label: 'Marketplace',       base: [65, 150],  perUnit: 8,    unit: 'modul',   icon: 'fa-solid fa-store' },
]

const EST_ADDONS = [
  { id: 'seo',       label: 'SEO On-page Lengkap',        price: 1.5 },
  { id: 'hosting',   label: 'Domain + Hosting 1 Tahun',   price: 0.8 },
  { id: 'payment',   label: 'Payment Gateway',            price: 2   },
  { id: 'wa',        label: 'Integrasi WhatsApp API',     price: 1.5 },
  { id: 'maint',     label: 'Maintenance 3 Bulan',        price: 2.4 },
  { id: 'uiux',      label: 'Desain Custom UI/UX',        price: 3   },
]

function fmtPrice(val) {
  if (val >= 1000) return `Rp ${(val / 1000).toFixed(0)} M`
  return `Rp ${val % 1 === 0 ? val : val.toFixed(1)} Jt`
}

function Estimator() {
  const [prodId, setProdId] = useState('profile')
  const [units, setUnits] = useState(5)
  const [addons, setAddons] = useState({})

  const prod = EST_PRODUCTS.find((p) => p.id === prodId)
  const addonTotal = EST_ADDONS.filter((a) => addons[a.id]).reduce((s, a) => s + a.price, 0)
  const low  = prod.base[0] + (units - 1) * prod.perUnit + addonTotal
  const high = prod.base[1] + (units - 1) * prod.perUnit * 1.6 + addonTotal

  const waMsg = encodeURIComponent(
    `Halo AFSS, saya ingin konsultasi proyek:\n- Jenis: ${prod.label}\n- ${units} ${prod.unit}\n- Estimasi: ${fmtPrice(low)} – ${fmtPrice(high)}\n\nBoleh diskusi lebih lanjut?`
  )

  const toggleAddon = (id) => setAddons((a) => ({ ...a, [id]: !a[id] }))

  return (
    <section className="estimator" id="estimator">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-calculator" /> Estimator</div>
          <h2 className="sec-title">Berapa estimasi biaya <span className="ital">proyek Anda</span>?</h2>
          <p className="sec-sub">Pilih jenis proyek dan kebutuhan Anda — dapatkan estimasi harga awal secara instan. Tanpa komitmen.</p>
        </Reveal>

        <div className="est-wrap">
          {/* Left — inputs */}
          <div className="est-left">
            {/* Step 1 */}
            <div className="est-step">
              <div className="est-step-label"><span>1</span> Jenis Produk</div>
              <div className="est-prod-grid">
                {EST_PRODUCTS.map((p) => (
                  <button key={p.id} className={`est-prod-btn${prodId === p.id ? ' active' : ''}`} onClick={() => { setProdId(p.id); setUnits(5) }}>
                    <Icon icon={p.icon} />
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="est-step">
              <div className="est-step-label">
                <span>2</span> Jumlah {prod.unit} — <strong>{units} {prod.unit}</strong>
              </div>
              <input type="range" min="1" max="15" value={units} onChange={(e) => setUnits(+e.target.value)} className="est-slider" />
              <div className="est-slider-marks"><span>1</span><span>5</span><span>10</span><span>15</span></div>
            </div>

            {/* Step 3 */}
            <div className="est-step">
              <div className="est-step-label"><span>3</span> Layanan Tambahan</div>
              <div className="est-addons">
                {EST_ADDONS.map((a) => (
                  <button key={a.id} className={`est-addon-btn${addons[a.id] ? ' active' : ''}`} onClick={() => toggleAddon(a.id)}>
                    <span className={`est-addon-check${addons[a.id] ? ' on' : ''}`}>
                      <Icon icon="fa-solid fa-check" />
                    </span>
                    <span className="est-addon-label">{a.label}</span>
                    <span className="est-addon-price">+ {fmtPrice(a.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — result */}
          <div className="est-result">
            <div className="est-result-inner">
              <div className="est-result-label">Estimasi Awal Project</div>
              <motion.div className="est-result-low" key={`${prodId}-${units}-${JSON.stringify(addons)}`}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                {fmtPrice(low)}
              </motion.div>
              <div className="est-result-range">s/d <strong>{fmtPrice(high)}</strong></div>
              <div className="est-divider" />

              <div className="est-breakdown">
                <div className="est-brow">
                  <span>Base {prod.label}</span>
                  <span>{fmtPrice(prod.base[0])} – {fmtPrice(prod.base[1])}</span>
                </div>
                <div className="est-brow">
                  <span>{units} {prod.unit} × {fmtPrice(prod.perUnit)}</span>
                  <span>+{fmtPrice((units - 1) * prod.perUnit)}</span>
                </div>
                {addonTotal > 0 && (
                  <div className="est-brow accent">
                    <span>Add-on terpilih</span>
                    <span>+{fmtPrice(addonTotal)}</span>
                  </div>
                )}
              </div>

              <div className="est-divider" />
              <p className="est-note">Estimasi awal — harga final menyesuaikan tingkat kesulitan, integrasi, dan kebutuhan khusus. Konsultasi gratis untuk angka pasti.</p>
              <a href={`https://wa.me/628139694307?text=${waMsg}`} target="_blank" rel="noreferrer" className="btn btn-wa" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                <Icon icon="fa-brands fa-whatsapp" /> Konsultasi Estimasi Ini
              </a>
              <a href="/ajukan-proyek" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
                <Icon icon="fa-solid fa-file-pen" /> Ajukan Brief Proyek
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════ SMART WA FLOAT */
const WA_MESSAGES = {
  '/layanan':      `Halo ${BRAND.short}, saya tertarik dengan layanan Anda. Boleh konsultasi?`,
  '/harga':        `Halo ${BRAND.short}, saya mau tanya lebih lanjut soal paket harga AFSS.`,
  '/portofolio':   `Halo ${BRAND.short}, saya lihat portofolio AFSS dan tertarik diskusi proyek serupa.`,
  '/kontak':       `Halo ${BRAND.short}, saya ingin konsultasi gratis.`,
  '/ajukan-proyek':`Halo ${BRAND.short}, saya ingin mengajukan brief proyek.`,
  '/karir':        `Halo ${BRAND.short}, saya tertarik bergabung dengan tim AFSS.`,
  '/blog':         `Halo ${BRAND.short}, saya baca artikel di blog AFSS dan ingin tahu lebih lanjut.`,
  '/faq':          `Halo ${BRAND.short}, saya punya pertanyaan tentang layanan AFSS.`,
  default:         `Halo ${BRAND.short}, saya ingin konsultasi gratis tentang proyek digital saya.`,
}

function SmartWA({ reduce }) {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(t)
  }, [])

  const msg = Object.entries(WA_MESSAGES).find(([k]) => k !== 'default' && pathname.startsWith(k))?.[1] || WA_MESSAGES.default

  if (!visible) return null
  return (
    <motion.a
      className="float-wa"
      href={waLink(msg)}
      target="_blank" rel="noreferrer"
      title="Chat WhatsApp — Konsultasi Gratis"
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

/* ════════════════════════════════════════════════ LAYOUT — shared chrome (nav + footer) */
export function Layout() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Langsung ke konten</a>
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

/* ════════════════════════════════════════════════ HOME PAGE */
export function Home() {
  const reduce = useReducedMotion()
  return (
    <>
      <Head>
        <title>Jasa Pembuatan Website, Aplikasi & ERP Custom | AFSS</title>
        <meta name="description" content="AFSS adalah software house Indonesia — jasa pembuatan website, aplikasi mobile Android & iOS, dashboard, ERP & sistem bisnis custom. Konsultasi gratis via WhatsApp." />
        <link rel="canonical" href="https://afss.tech/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://afss.tech/" />
        <meta property="og:title" content="Jasa Pembuatan Website, Aplikasi & ERP Custom | AFSS" />
        <meta property="og:description" content="Software house Indonesia — website, aplikasi mobile, dashboard, ERP & sistem bisnis custom. Konsultasi gratis." />
        <meta name="twitter:title" content="Jasa Pembuatan Website, Aplikasi & ERP Custom | AFSS" />
        <meta name="twitter:description" content="Software house Indonesia — website, aplikasi mobile, dashboard, ERP & sistem bisnis custom. Konsultasi gratis." />
        <meta property="og:image" content="https://afss.tech/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://afss.tech/og.png" />
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
