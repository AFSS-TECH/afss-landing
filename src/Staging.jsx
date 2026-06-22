/* ════════════════════════════════════════════════════════════════════════
   STAGING — simplified homepage preview (route: /staging)
   Disposable: the live site (/) is untouched. To remove, delete this file
   and its route block in main.jsx (the exports added to App.jsx are inert).
   Implements the 9-point "user-friendly for common people" simplification.
   ════════════════════════════════════════════════════════════════════════ */
import { useEffect } from 'react'
import { motion, useScroll, useReducedMotion } from 'framer-motion'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Icon } from './Icon.jsx'
import { Nav, Footer, Mock } from './App.jsx'
import { BRAND, products, showcase, reviews, stats, kpis, satisfaction, waLink, clients } from './data.js'

/* Motion presets — same recipe as the live site, kept local so /staging is self-contained */
const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', duration: 0.7, bounce: 0 } },
}
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }
const viewport = { once: true, margin: '-60px' }
const Reveal = ({ children, className = '', ...rest }) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className={className} {...rest}>
    {children}
  </motion.div>
)
const onSpot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/* Scoped styles — every rule lives under .stg-home so nothing leaks to the live site */
const STG_CSS = `
.stg-home .hero-inner { grid-template-columns: 1fr; max-width: 820px; text-align: center; }
.stg-home .hero p.lead { max-width: 600px; margin-left: auto; margin-right: auto; }
.stg-home .hero-cta, .stg-home .hero-trust { justify-content: center; }
.stg-kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; max-width: 1000px; margin: 0 auto; }
.stg-rev-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 22px; }
.stg-home .stg-rev-grid .rev-card { width: auto; }
.stg-tech-line { text-align: center; color: var(--muted); font-size: 1.08rem; line-height: 1.7; max-width: 660px; margin: 0 auto; }
.stg-svc-card { text-decoration: none; color: inherit; }
@media (max-width: 640px) { .stg-home .hero-cta .btn { width: 100%; } }
`

/* ── #6 Process trimmed from 6 steps to 4 (Desain+Development & Launch+Maintenance merged) ── */
const STG_STEPS = [
  { step: '01', icon: 'fa-solid fa-comments', title: 'Konsultasi & Discovery', desc: 'Kami pelajari kebutuhan & tujuan bisnis Anda lebih dulu. Gratis, tanpa tekanan.' },
  { step: '02', icon: 'fa-solid fa-file-invoice', title: 'Proposal & Estimasi', desc: 'Ruang lingkup, harga, dan timeline yang jelas dan transparan di awal.' },
  { step: '03', icon: 'fa-solid fa-pen-ruler', title: 'Desain & Development', desc: 'Rancang tampilan yang sesuai brand, lalu bangun sistemnya dengan kode bersih — update progres berkala.' },
  { step: '04', icon: 'fa-solid fa-rocket', title: 'Launch & Maintenance', desc: 'Uji menyeluruh, rilis dengan dukungan penuh, lalu monitoring & update agar sistem terus optimal.' },
]

/* ════════ HERO — #1 & #2: live chart panel + "Pertumbuhan Klien" card removed ════════ */
function HeroStaging() {
  return (
    <section className="hero" id="home">
      <div className="hero-glow" />
      <div className="hero-inner">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div className="hero-badge" variants={fadeUp}>
            <span className="stars">★★★★★</span> Dipercaya 50+ perusahaan di Indonesia
          </motion.div>
          <motion.h1 variants={fadeUp}>
            Jasa Pembuatan Website, Aplikasi Mobile &amp; Sistem ERP Custom untuk <span className="ital">Bisnis Indonesia</span>
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>
            Software house Medan — kami bangun website profesional, aplikasi Android &amp; iOS, dashboard, dan ERP dari nol.
            Cepat, SEO-ready, kode milik Anda sepenuhnya.
          </motion.p>
          <motion.div className="hero-cta" variants={fadeUp}>
            <a href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis untuk proyek saya.`)} className="btn btn-pri btn-lg" target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis</a>
            <Link to="/portofolio" className="btn btn-ghost btn-lg"><Icon icon="fa-solid fa-images" /> Lihat Portofolio</Link>
          </motion.div>
          <motion.div className="hero-trust" variants={fadeUp}>
            <div className="avatars"><span>50+</span></div>
            <span><b>Dipercaya 50+ perusahaan</b> · 100+ proyek selesai</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════ STATS BAND — kept (plain credibility numbers), static ════════ */
function StatsBandStaging() {
  return (
    <div className="stats-band">
      <motion.div className="stats-card" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
        {stats.map((s) => (
          <motion.div className="stat-item" key={s.label} variants={fadeUp}>
            <div className="stat-num">{s.prefix || ''}{s.n}{s.suffix}</div>
            <div className="stat-lbl">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* ════════ TRUST BAR — #3: plain static grid (no moving text) ════════ */
function TrustBarStaging() {
  return (
    <div className="trustbar">
      <div className="container">
        <div className="trust-label">Dipercaya oleh bisnis di berbagai industri</div>
        <div className="trust-logos">
          {clients.map((c) => (
            <span className="trust-logo" key={c}><Icon icon="fa-solid fa-circle-nodes" /> {c}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════ SERVICES — #5: per-card CTA buttons removed; whole card links to detail ════════ */
function ServicesStaging() {
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
            <motion.div key={p.name} variants={fadeUp} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
              <Link to={`/layanan/${p.slug}`} className={`svc-card spot stg-svc-card ${p.hot ? 'hot' : ''}`} onMouseMove={onSpot}>
                {p.hot && <span className="hot-tag">Terpopuler</span>}
                <div className="svc-top">
                  <div className="svc-ico"><Icon icon={p.icon} /></div>
                  <span className="metric-badge"><Icon icon="fa-solid fa-circle-check" /> {p.metric}</span>
                </div>
                <div className="svc-name">{p.name}</div>
                <p className="svc-desc">{p.desc}</p>
                <ul className="svc-feats">{p.feats.map((f) => <li key={f}><Icon icon="fa-solid fa-check" /> {f}</li>)}</ul>
              </Link>
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

/* ════════ IMPACT — #1/#2 spirit: animated line chart dropped, plain result numbers kept ════════ */
function ImpactStaging() {
  const cards = [...kpis, { label: 'Kepuasan klien', n: satisfaction, prefix: '', suffix: '%', bar: satisfaction }]
  return (
    <section className="impact" id="impact">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-chart-line" /> Dampak</div>
          <h2 className="sec-title">Hasil yang <span className="ital">terukur</span>, bukan sekadar janji</h2>
          <p className="sec-sub">Angka nyata dari proyek yang telah kami selesaikan bersama klien.</p>
        </Reveal>
        <div className="stg-kpi-grid">
          {cards.map((k) => (
            <Reveal key={k.label} className="kpi-card">
              <div className="kpi-top">
                <div className="kpi-num">{k.prefix}{k.n}{k.suffix}</div>
                <div className="kpi-label">{k.label}</div>
              </div>
              <div className="kpi-track">
                <motion.div className="kpi-fill"
                  initial={{ scaleX: 0 }} whileInView={{ scaleX: k.bar / 100 }} viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════ PROCESS — #6: 4 steps ════════ */
function ProcessStaging() {
  return (
    <section className="process" id="process">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow green"><Icon icon="fa-solid fa-route" /> Cara Kerja</div>
          <h2 className="sec-title">Proses yang transparan &amp; <span className="ital">konsultatif</span></h2>
          <p className="sec-sub">Empat tahap sederhana — dari ngobrol pertama sampai sistem Anda jalan dan terus kami rawat.</p>
        </Reveal>
        <motion.div className="proc-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {STG_STEPS.map((s) => (
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

/* ════════ SHOWCASE — kept as-is (6 concrete case studies) ════════ */
function ShowcaseStaging() {
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

/* ════════ REVIEWS — #7: static grid, obfuscated names dropped (role/company only) ════════ */
function ReviewsStaging() {
  const items = reviews.slice(0, 6)
  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-heart" /> Testimoni</div>
          <h2 className="sec-title">Apa kata <span className="ital">klien</span> kami?</h2>
          <p className="sec-sub">Sebagian klien yang telah mempercayakan proyek digitalnya kepada kami.</p>
        </Reveal>
        <div className="stg-rev-grid">
          {items.map((r, i) => (
            <Reveal key={i} className="rev-card">
              <div className="rev-stars">{[...Array(5)].map((_, j) => <Icon key={j} icon="fa-solid fa-star" />)}</div>
              <p className="rev-text">“{r.text}”</p>
              <div className="rev-author">
                <div className="av" style={{ background: r.grad }}><Icon icon="fa-solid fa-user" /></div>
                <div><div className="av-co">{r.company}</div></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════ TECH — #4: 12 logos replaced with one reassuring line ════════ */
function TechLineStaging() {
  return (
    <section className="tech" id="tech">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-microchip" /> Teknologi</div>
          <h2 className="sec-title">Dibangun dengan teknologi <span className="ital">modern &amp; terpercaya</span></h2>
          <p className="stg-tech-line">Kami memakai teknologi terkini yang teruji agar sistem Anda cepat, aman, dan mudah dikembangkan ke depan — tanpa Anda perlu memikirkan detail teknisnya.</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ════════ CTA BAND — kept ════════ */
function CtaBandStaging() {
  return (
    <section className="cta-band">
      <Reveal className="cta-card">
        <h2>Siap mewujudkan website atau aplikasi <span className="ital">Anda</span>?</h2>
        <p>Konsultasi gratis, tanpa komitmen. Ceritakan ide Anda hari ini — kami bantu temukan solusi terbaik untuk bisnis Anda.</p>
        <div className="btns">
          <a href={waLink(`Halo ${BRAND.short}, saya ingin memulai proyek dan konsultasi gratis.`)} className="btn btn-pri btn-lg" target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Mulai Sekarang</a>
          <Link to="/harga" className="btn btn-ghost btn-lg">Lihat Paket Harga</Link>
        </div>
      </Reveal>
    </section>
  )
}

/* ════════════════════════════════════════════════ STAGING HOME */
export function StagingHome() {
  return (
    <div className="stg-home">
      <Head>
        <title>[STAGING] Beranda Sederhana | AFSS</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <style>{STG_CSS}</style>
      <HeroStaging />
      <StatsBandStaging />
      <TrustBarStaging />
      <ServicesStaging />
      <ImpactStaging />
      <ProcessStaging />
      <ShowcaseStaging />
      <ReviewsStaging />
      <TechLineStaging />
      <CtaBandStaging />
    </div>
  )
}

/* ════════════════════════════════════════════════ STAGING LAYOUT
   Reuses the real Nav, but a trimmed Footer (#9 — duplicate service links removed). */
export function StagingLayout() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return (
    <>
      <a href="#main-content" className="skip-link">Langsung ke konten</a>
      <div className="grain" aria-hidden="true" />
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <Nav />
      <main id="main-content"><Outlet /></main>
      <Footer trimmed />
      <motion.a className="float-wa" href={waLink(`Halo ${BRAND.short}, saya ingin bertanya.`)} target="_blank" rel="noreferrer" title="Chat WhatsApp"
        animate={reduce ? {} : { y: [0, -7, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
        <Icon icon="fa-brands fa-whatsapp" />
      </motion.a>
    </>
  )
}
