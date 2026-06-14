import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Icon } from './Icon.jsx'
import { BRAND, products, why, showcase, stats, waLink, getProductBySlug } from './data.js'

const SITE_URL = 'https://afss-landing.vercel.app'

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

/* ── Breadcrumb ── */
function Breadcrumb({ items }) {
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

/* ══════════════════════════════════════════════════ EXTENDED SERVICE CONTENT */
const SERVICE_CONTENT = {
  'pembuatan-website': {
    headline: 'Jasa Pembuatan Website Custom Profesional',
    subline: 'Dari landing page UMKM hingga company profile enterprise — dibangun dari nol, cepat, dan SEO-ready sejak hari pertama.',
    longDesc: 'Website bukan sekadar brosur digital. Website yang baik adalah mesin pemasaran 24 jam yang menarik pengunjung dari Google, membangun kepercayaan, dan mengkonversi mereka menjadi pelanggan. AFSS membangun setiap website dari nol: tidak ada template, tidak ada vendor lock-in, dan SEO dipertimbangkan sejak baris kode pertama.',
    benefits: [
      { icon: 'fa-solid fa-gauge-high', title: 'Core Web Vitals Tinggi', desc: 'Skor Lighthouse 90+ untuk LCP, FID, dan CLS — lebih cepat berarti lebih tinggi di Google dan lebih nyaman bagi pengunjung.' },
      { icon: 'fa-solid fa-mobile-screen', title: 'Responsif di Semua Layar', desc: 'Tampilan sempurna di desktop, tablet, dan smartphone tanpa kompromi kualitas desain.' },
      { icon: 'fa-solid fa-chart-line', title: 'SEO On-Page Lengkap', desc: 'Meta tag, schema markup, sitemap, canonical, dan struktur konten yang ramah mesin pencari sejak awal.' },
      { icon: 'fa-solid fa-code', title: 'Kode Bersih & Milik Anda', desc: 'Tidak ada vendor lock-in. Seluruh kode dan dokumentasinya milik Anda sepenuhnya.' },
    ],
    serviceFaq: [
      { q: 'Berapa lama pembuatan website?', a: 'Landing page 1–2 minggu, company profile multi-halaman 2–4 minggu, website dengan fitur khusus (toko, portal) 4–8 minggu. Timeline pasti kami sepakati di tahap proposal.' },
      { q: 'Apakah sudah termasuk hosting dan domain?', a: 'Paket Basic sudah termasuk domain & hosting 1 tahun. Kami juga bisa menggunakan hosting yang Anda miliki atau membantu setup hosting baru.' },
      { q: 'Bisakah saya update konten sendiri?', a: 'Ya. Kami menyediakan training singkat dan dokumentasi agar Anda bisa memperbarui konten tanpa harus kembali ke developer.' },
      { q: 'Apakah website saya akan muncul di Google?', a: 'Kami membangun dengan praktik SEO on-page terbaik sejak awal. Untuk peringkat organik, butuh waktu dan konten — kami bisa membantu strategi kontennya juga.' },
    ],
    relatedSlugs: ['web-app', 'ui-ux-design'],
  },
  'aplikasi-mobile': {
    headline: 'Jasa Pembuatan Aplikasi Mobile Android & iOS',
    subline: 'Aplikasi native dan cross-platform yang ringan, cepat, dan nyaman dipakai — siap publish ke Play Store & App Store.',
    longDesc: 'Aplikasi mobile yang baik bukan hanya tentang tampilan — tapi tentang pengalaman yang membuat pengguna kembali. AFSS membangun aplikasi Android & iOS dengan Flutter maupun native, dilengkapi backend & API yang solid, siap dipublikasikan ke toko aplikasi.',
    benefits: [
      { icon: 'fa-solid fa-mobile-screen-button', title: 'Android & iOS Sekaligus', desc: 'Satu codebase Flutter untuk dua platform — efisiensi biaya tanpa mengorbankan tampilan dan performa native.' },
      { icon: 'fa-solid fa-rocket', title: 'Publish ke Toko Aplikasi', desc: 'Kami bantu proses pendaftaran, review, dan publikasi ke Google Play Store maupun Apple App Store.' },
      { icon: 'fa-solid fa-microchip', title: 'Backend & API Terintegrasi', desc: 'Sistem backend robust dengan REST API untuk autentikasi, notifikasi push, dan sinkronisasi data real-time.' },
      { icon: 'fa-solid fa-code', title: 'Kode Bersih & Terdokumentasi', desc: 'Arsitektur yang skalabel sehingga fitur baru bisa ditambahkan dengan mudah seiring pertumbuhan bisnis Anda.' },
    ],
    serviceFaq: [
      { q: 'Flutter atau native (Kotlin/Swift)?', a: 'Flutter untuk sebagian besar kasus: satu tim, satu codebase, dua platform. Native kami rekomendasikan hanya untuk kasus khusus yang memerlukan akses hardware sangat dalam.' },
      { q: 'Berapa estimasi biaya aplikasi mobile?', a: 'Mulai dari Rp 15 juta untuk aplikasi sederhana. Aplikasi dengan fitur kompleks (marketplace, fintech, IoT) bisa lebih — estimasi pasti diberikan setelah konsultasi.' },
      { q: 'Berapa lama proses review App Store?', a: 'Google Play biasanya 1–3 hari kerja. Apple App Store 1–7 hari. Kami sudah berpengalaman menyiapkan submission agar lolos review pertama kali.' },
      { q: 'Apakah ada maintenance setelah launching?', a: 'Ya. Kami menyediakan paket maintenance untuk update OS, perbaikan bug, dan penambahan fitur baru setelah aplikasi live.' },
    ],
    relatedSlugs: ['web-app', 'maintenance'],
  },
  'web-app': {
    headline: 'Jasa Pembuatan Web App, Dashboard & Sistem Internal',
    subline: 'Dashboard analitik, ERP, CRM, atau sistem operasional custom — dalam satu platform yang mudah diakses dari mana saja.',
    longDesc: 'Bisnis yang berkembang butuh sistem yang tumbuh bersamanya. AFSS membangun web application yang menggantikan spreadsheet dan proses manual dengan platform terpusat — dari dashboard sederhana hingga ERP & CRM skala perusahaan.',
    benefits: [
      { icon: 'fa-solid fa-chart-line', title: 'Dashboard Real-Time', desc: 'Data penjualan, stok, dan KPI bisnis ditampilkan secara langsung untuk pengambilan keputusan yang lebih cepat.' },
      { icon: 'fa-solid fa-layer-group', title: 'Manajemen User & Role (RBAC)', desc: 'Atur hak akses per departemen atau jabatan — staf melihat hanya yang perlu mereka lihat.' },
      { icon: 'fa-solid fa-file-invoice', title: 'Laporan & Export Otomatis', desc: 'Laporan bulanan, mingguan, atau custom yang bisa diexport ke Excel/PDF dengan satu klik.' },
      { icon: 'fa-solid fa-circle-nodes', title: 'Integrasi Sistem yang Ada', desc: 'Bisa diintegrasikan dengan sistem akuntansi, payment gateway, logistik, atau ERP yang sudah Anda pakai.' },
    ],
    serviceFaq: [
      { q: 'Apa bedanya website biasa dan web app?', a: 'Website lebih untuk informasi (company profile, blog). Web app untuk aksi: login, input data, kalkulasi, laporan. Keduanya berbasis browser tapi kegunaan berbeda.' },
      { q: 'Bisa diakses dari smartphone?', a: 'Ya. Kami bangun responsive — bisa dipakai di desktop kantor maupun smartphone di lapangan tanpa install apapun.' },
      { q: 'Bisa integrasi dengan sistem lama (misal SAP, Accurate)?', a: 'Bisa, selama sistem lama menyediakan API atau export data. Kami evaluasi integrasi teknis di tahap discovery.' },
      { q: 'Berapa user yang bisa mengakses sistem?', a: 'Tidak ada batasan user per lisensi. Sistem kami dibangun untuk multi-user secara bersamaan — skalabel sesuai pertumbuhan tim.' },
    ],
    relatedSlugs: ['pembuatan-website', 'maintenance'],
  },
  'ui-ux-design': {
    headline: 'Jasa UI/UX Design Profesional untuk Website & Aplikasi',
    subline: 'Desain yang bukan sekadar cantik — tapi terbukti meningkatkan konversi, mengurangi bounce rate, dan membuat pengguna betah.',
    longDesc: 'Desain yang baik adalah yang tidak terasa. Pengguna tahu cara pakainya tanpa baca manual, dan bisnis Anda mendapat lebih banyak konversi. AFSS menggunakan pendekatan design thinking — riset, prototipe, uji, iterasi — bukan hanya estetika.',
    benefits: [
      { icon: 'fa-solid fa-route', title: 'User Research & Journey Mapping', desc: 'Riset perilaku target pengguna untuk memastikan desain yang dibuat relevan dan mudah digunakan.' },
      { icon: 'fa-solid fa-pen-ruler', title: 'Wireframe & Prototype Interaktif', desc: 'Prototipe yang bisa diklik dan dirasakan sebelum coding dimulai — menghemat biaya revisi.' },
      { icon: 'fa-solid fa-layer-group', title: 'Design System & Komponen', desc: 'Sistem desain yang konsisten sehingga tampilan seragam di seluruh halaman dan mudah dikembangkan.' },
      { icon: 'fa-solid fa-check', title: 'Handoff Siap Developer', desc: 'File Figma terorganisir, aset tersedia, dan spesifikasi lengkap sehingga developer bisa langsung kerja.' },
    ],
    serviceFaq: [
      { q: 'Software apa yang digunakan?', a: 'Kami menggunakan Figma sebagai tools utama. File desain final diserahkan ke Anda beserta aset-aset yang dibutuhkan.' },
      { q: 'Berapa kali revisi yang diberikan?', a: 'Setiap tahap (wireframe, desain visual) mencakup 2–3 putaran revisi. Revisi di luar scope bisa disepakati terpisah.' },
      { q: 'Bisa mendesain ulang sistem yang sudah ada?', a: 'Bisa. Kami lakukan audit UX terlebih dahulu untuk identifikasi titik masalah, lalu redesign bertahap agar tidak mengganggu operasional.' },
      { q: 'Apakah termasuk copywriting?', a: 'Copywriting ringan (label, button, microcopy) sudah termasuk. Konten panjang seperti artikel atau halaman produk dari sisi Anda atau bisa dibahas terpisah.' },
    ],
    relatedSlugs: ['pembuatan-website', 'aplikasi-mobile'],
  },
  'maintenance': {
    headline: 'Jasa Maintenance & Support Website dan Aplikasi',
    subline: 'Sistem yang tidak dipelihara akan ketinggalan, rentan, dan lambat. Paket maintenance AFSS memastikan aset digital Anda selalu prima.',
    longDesc: 'Meluncurkan website atau aplikasi bukan titik akhir — itu titik awal. Update keamanan, monitoring uptime, backup rutin, dan respons cepat ketika ada masalah adalah investasi yang melindungi bisnis Anda dari kerugian yang jauh lebih besar.',
    benefits: [
      { icon: 'fa-solid fa-gauge-high', title: 'Monitoring Uptime 24/7', desc: 'Sistem dipantau terus-menerus. Kami tahu (dan bertindak) sebelum Anda menyadari ada masalah.' },
      { icon: 'fa-solid fa-award', title: 'Update Keamanan Rutin', desc: 'Library, CMS, dan dependensi selalu diperbarui untuk menutup celah keamanan sebelum dieksploitasi.' },
      { icon: 'fa-solid fa-database', title: 'Backup Berkala Otomatis', desc: 'Backup harian atau mingguan ke lokasi terpisah — data Anda aman meski terjadi insiden.' },
      { icon: 'fa-solid fa-headset', title: 'Respons Prioritas', desc: 'Laporan bug ditangani dalam hitungan jam, bukan hari. Klien maintenance mendapat antrean prioritas.' },
    ],
    serviceFaq: [
      { q: 'Bisa maintenance proyek dari developer lain?', a: 'Bisa. Kami lakukan code audit terlebih dahulu untuk memahami sistem yang ada, lalu kami ambil alih pemeliharaannya.' },
      { q: 'Berapa SLA response time?', a: 'Bug kritis: maks 4 jam. Bug non-kritis: maks 24 jam kerja. Update rutin dijadwalkan di luar jam sibuk bisnis Anda.' },
      { q: 'Apakah update konten termasuk?', a: 'Paket standar mencakup update konten ringan (teks, gambar, produk). Update konten besar atau fitur baru dihitung terpisah.' },
      { q: 'Berapa biaya paket maintenance?', a: 'Mulai dari Rp 500 ribu/bulan untuk website statis. Aplikasi dan sistem kompleks mulai dari Rp 1,5 juta/bulan. Konsultasi gratis untuk estimasi.' },
    ],
    relatedSlugs: ['pembuatan-website', 'web-app'],
  },
}

/* ══════════════════════════════════════════════════ LAYANAN INDEX (/layanan) */
export function LayananIndex() {
  const title = 'Layanan AFSS — Jasa Website, Aplikasi, & Sistem Digital'
  const desc = 'Daftar lengkap layanan AFSS: pembuatan website custom, aplikasi mobile Android & iOS, web app, UI/UX design, dan maintenance. Konsultasi gratis.'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/layanan`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/layanan`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Layanan' }]} />
            <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> Layanan</div>
            <h1 className="page-title">Solusi digital <span className="ital">lengkap</span> untuk bisnis Anda</h1>
            <p className="page-sub">Dari website custom hingga aplikasi mobile dan sistem enterprise — semua dibangun dari nol, cepat, dan siap tumbuh bersama bisnis Anda.</p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 40 }}>
        <div className="container">
          <motion.div className="svc-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {products.map((p) => (
              <motion.div key={p.slug} className={`svc-card spot ${p.hot ? 'hot' : ''}`} variants={fadeUp} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
                {p.hot && <span className="hot-tag">Terpopuler</span>}
                <div className="svc-top">
                  <div className="svc-ico"><Icon icon={p.icon} /></div>
                  <span className="metric-badge"><Icon icon="fa-solid fa-circle-check" /> {p.metric}</span>
                </div>
                <div className="svc-name">{p.name}</div>
                <p className="svc-desc">{p.desc}</p>
                <ul className="svc-feats">{p.feats.map((f) => <li key={f}><Icon icon="fa-solid fa-check" /> {f}</li>)}</ul>
                <div className="svc-foot" style={{ display: 'flex', gap: 10 }}>
                  <Link className="btn btn-pri" to={`/layanan/${p.slug}`}>Detail <Icon icon="fa-solid fa-arrow-right" /></Link>
                  <a className="btn btn-ghost" href={waLink(`Halo ${BRAND.short}, saya tertarik dengan layanan ${p.name}.`)} target="_blank" rel="noreferrer">Konsultasi</a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" style={{ paddingTop: 40 }}>
        <Reveal className="cta-card">
          <h2>Tidak yakin layanan mana yang <span className="ital">tepat</span>?</h2>
          <p>Ceritakan kebutuhan bisnis Anda — kami bantu pilihkan solusi terbaik. Konsultasi gratis, tanpa komitmen.</p>
          <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis tentang kebutuhan digital bisnis saya.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis</a>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ LAYANAN DETAIL (/layanan/:slug) */
export function LayananDetail() {
  const { slug } = useParams()
  const [openFaq, setOpenFaq] = useState(-1)

  const product = getProductBySlug(slug)
  const content = SERVICE_CONTENT[slug]

  if (!product || !content) {
    return (
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Layanan tidak ditemukan</h1>
          <p className="page-sub"><Link to="/layanan" className="accent-text">Lihat semua layanan</Link></p>
        </div>
      </section>
    )
  }

  const url = `${SITE_URL}/layanan/${slug}`
  const related = products.filter((p) => content.relatedSlugs.includes(p.slug))

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Layanan', item: `${SITE_URL}/layanan` },
      { '@type': 'ListItem', position: 3, name: product.name, item: url },
    ],
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: product.name,
    description: content.longDesc,
    provider: { '@type': 'Organization', name: BRAND.legal, url: `${SITE_URL}/` },
    url,
    areaServed: 'ID',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.serviceFaq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <Head>
        <title>{`${content.headline} | AFSS`}</title>
        <meta name="description" content={content.subline} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={content.headline} />
        <meta property="og:description" content={content.subline} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={content.headline} />
        <meta name="twitter:description" content={content.subline} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
      </Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[
              { label: 'Beranda', to: '/' },
              { label: 'Layanan', to: '/layanan' },
              { label: product.name },
            ]} />
            <div className="eyebrow"><Icon icon={product.icon} /> Layanan</div>
            <h1 className="page-title">{content.headline.split(' ').slice(0, 4).join(' ')} <span className="ital">{content.headline.split(' ').slice(4).join(' ')}</span></h1>
            <p className="page-sub">{content.subline}</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 32 }}>
              <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya tertarik dengan layanan ${product.name}. Boleh konsultasi?`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis</a>
              <Link className="btn btn-ghost btn-lg" to="/layanan"><Icon icon="fa-solid fa-layer-group" /> Layanan Lainnya</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About this service */}
      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <div className="pages-two-col">
            <Reveal>
              <div className="eyebrow"><Icon icon="fa-solid fa-circle-question" /> Tentang Layanan Ini</div>
              <h2 className="sec-title">Mengapa <span className="ital">ini penting</span> untuk bisnis Anda?</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '1.05rem', marginBottom: 24 }}>{content.longDesc}</p>
              <ul className="svc-feats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {product.feats.map((f) => <li key={f}><Icon icon="fa-solid fa-check" /> {f}</li>)}
              </ul>
            </Reveal>
            <Reveal className="page-detail-badge">
              <div className="kpi-card" style={{ background: 'var(--navy)', color: '#fff', borderRadius: 'var(--r-lg)', padding: '36px 32px' }}>
                <div style={{ fontSize: '3rem', marginBottom: 12 }}><Icon icon={product.icon} /></div>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans', marginBottom: 8, lineHeight: 1.2 }}>{product.name}</div>
                <div style={{ opacity: .7, fontSize: '.95rem', marginBottom: 24, lineHeight: 1.6 }}>{product.desc}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.12)', padding: '8px 18px', borderRadius: 50, fontSize: '.85rem', fontWeight: 600 }}>
                  <Icon icon="fa-solid fa-circle-check" /> {product.metric}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="whyus" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-award" /> Keunggulan</div>
            <h2 className="sec-title">Yang Anda dapatkan dari <span className="ital">layanan ini</span></h2>
          </Reveal>
          <motion.div className="why-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {content.benefits.map((b) => (
              <motion.div key={b.title} className="why-card spot" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                <div className="why-ico"><Icon icon={b.icon} /></div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container container-narrow">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-circle-question" /> FAQ</div>
            <h2 className="sec-title">Pertanyaan seputar <span className="ital">layanan ini</span></h2>
          </Reveal>
          <div className="faq-list">
            {content.serviceFaq.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div key={f.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button className="faq-q" onClick={() => setOpenFaq(isOpen ? -1 : i)} aria-expanded={isOpen}>
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

      {/* Related services */}
      {related.length > 0 && (
        <section style={{ paddingTop: 40, paddingBottom: 60 }}>
          <div className="container">
            <Reveal className="sec-header center">
              <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> Layanan Terkait</div>
              <h2 className="sec-title">Sering dikombinasikan <span className="ital">bersama ini</span></h2>
            </Reveal>
            <motion.div className="svc-grid" style={{ gridTemplateColumns: `repeat(${related.length}, 1fr)`, maxWidth: 780, margin: '0 auto' }} variants={container} initial="hidden" whileInView="show" viewport={viewport}>
              {related.map((p) => (
                <motion.div key={p.slug} className="svc-card spot" variants={fadeUp} whileHover={{ y: -6 }}>
                  <div className="svc-top"><div className="svc-ico"><Icon icon={p.icon} /></div></div>
                  <div className="svc-name">{p.name}</div>
                  <p className="svc-desc">{p.desc}</p>
                  <div className="svc-foot">
                    <Link className="btn" to={`/layanan/${p.slug}`}>Selengkapnya <Icon icon="fa-solid fa-arrow-right" /></Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>Siap memulai proyek <span className="ital">{product.name.toLowerCase()}</span>?</h2>
          <p>Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan Anda dan kami bantu temukan solusi terbaik.</p>
          <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi tentang ${product.name}.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Mulai Konsultasi</a>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ ABOUT (/tentang) */
export function About() {
  const title = 'Tentang AFSS — PT Advanced Future Software Solutions'
  const desc = 'Mengenal AFSS lebih dekat: misi, visi, nilai-nilai, dan mengapa kami membangun software house yang berpihak pada bisnis Indonesia.'
  const milestones = [
    { year: '2021', text: 'AFSS berdiri dengan fokus pada pembuatan website untuk UMKM lokal di Medan.' },
    { year: '2022', text: 'Ekspansi ke pengembangan aplikasi mobile dan sistem internal. Portofolio melampaui 30 proyek.' },
    { year: '2023', text: 'Melayani klien dari berbagai industri: kesehatan, logistik, pendidikan, dan F&B. 50+ proyek selesai.' },
    { year: '2024', text: 'Pengembangan tim dan metodologi. Memperkenalkan paket maintenance & SLA untuk klien korporat.' },
    { year: '2025', text: 'Melayani 50+ perusahaan di seluruh Indonesia dengan 100+ proyek yang berhasil diluncurkan.' },
  ]
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/tentang`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/tentang`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Tentang Kami' }]} />
            <div className="eyebrow"><Icon icon="fa-solid fa-award" /> Tentang Kami</div>
            <h1 className="page-title">Software house yang <span className="ital">berpihak</span> pada bisnis Anda</h1>
            <p className="page-sub">Kami bukan sekadar vendor. Kami adalah mitra digital jangka panjang yang ikut berpikir, berkonsultasi, dan membangun bersama Anda.</p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <div className="pages-two-col">
            <Reveal>
              <div className="eyebrow"><Icon icon="fa-solid fa-route" /> Perjalanan Kami</div>
              <h2 className="sec-title">Dari Medan untuk <span className="ital">Indonesia</span></h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 20 }}>
                PT Advanced Future Software Solutions (AFSS) didirikan dengan satu keyakinan sederhana: bisnis Indonesia berhak mendapatkan solusi digital berkualitas tinggi dengan harga yang adil dan komunikasi yang manusiawi.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Terlalu banyak bisnis yang kecewa karena vendor software yang tidak responsif, hasil yang tidak sesuai ekspektasi, atau kode yang tidak bisa dikembangkan. AFSS hadir untuk mengubah itu.
              </p>
            </Reveal>
            <div>
              {milestones.map((m, i) => (
                <Reveal key={m.year}>
                  <div className="timeline-item">
                    <div className="timeline-year">{m.year}</div>
                    <div className="timeline-text">{m.text}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="whyus" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-rocket" /> Misi & Visi</div>
            <h2 className="sec-title">Mengapa kami <span className="ital">ada</span></h2>
          </Reveal>
          <div className="why-grid" style={{ gridTemplateColumns: '1fr 1fr', maxWidth: 900, margin: '0 auto' }}>
            <Reveal className="why-card">
              <div className="why-ico"><Icon icon="fa-solid fa-rocket" /></div>
              <h3>Misi</h3>
              <p>Membantu bisnis Indonesia tumbuh melalui solusi digital yang berkualitas, transparan, dan terjangkau — tanpa kompromi pada standar teknis.</p>
            </Reveal>
            <Reveal className="why-card">
              <div className="why-ico"><Icon icon="fa-solid fa-arrow-trend-up" /></div>
              <h3>Visi</h3>
              <p>Menjadi software house pilihan utama bagi bisnis Indonesia yang ingin bertransformasi digital dengan mitra yang benar-benar peduli pada kesuksesan mereka.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-heart" /> Nilai-Nilai Kami</div>
            <h2 className="sec-title">Prinsip yang <span className="ital">memandu</span> setiap keputusan</h2>
          </Reveal>
          <motion.div className="why-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {why.map((w) => (
              <motion.div key={w.title} className="why-card spot" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                <div className="why-ico"><Icon icon={w.icon} /></div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-band">
        <motion.div className="stats-card" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {stats.map((s) => (
            <motion.div key={s.label} className="stat-item" variants={fadeUp}>
              <div className="stat-num">{s.prefix || ''}{s.n}{s.suffix}</div>
              <div className="stat-lbl">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <section className="cta-band" style={{ paddingTop: 80 }}>
        <Reveal className="cta-card">
          <h2>Ingin berkenalan lebih <span className="ital">dekat</span>?</h2>
          <p>Hubungi kami — ceritakan bisnis Anda, kami ceritakan bagaimana kami bisa membantu.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin berkenalan dan berdiskusi tentang proyek digital saya.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Hubungi Kami</a>
            <Link className="btn btn-ghost btn-lg" to="/kontak">Lihat Info Kontak</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ CONTACT (/kontak) */
export function Contact() {
  const title = 'Kontak AFSS — Konsultasi Gratis via WhatsApp, Email & Lokasi'
  const desc = 'Hubungi AFSS untuk konsultasi gratis pembuatan website, aplikasi mobile, dan sistem digital. WhatsApp, email, atau kunjungi kantor kami di Medan.'
  const methods = [
    {
      icon: 'fa-brands fa-whatsapp',
      title: 'WhatsApp',
      value: BRAND.phone,
      sub: 'Respons tercepat — biasanya dalam hitungan menit.',
      href: waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis.`),
      cta: 'Mulai Chat',
      color: 'var(--wa)',
    },
    {
      icon: 'fa-solid fa-envelope',
      title: 'Email',
      value: BRAND.email,
      sub: 'Untuk pertanyaan detail atau pengiriman brief proyek.',
      href: `mailto:${BRAND.email}`,
      cta: 'Kirim Email',
      color: 'var(--accent)',
    },
    {
      icon: 'fa-solid fa-location-dot',
      title: 'Lokasi',
      value: BRAND.address,
      sub: 'Kunjungan dan meeting online tersedia. Hubungi dulu untuk jadwal.',
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.address)}`,
      cta: 'Lihat Maps',
      color: 'var(--ink-2)',
    },
  ]
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/kontak`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/kontak`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Kontak' }]} />
            <div className="eyebrow"><Icon icon="fa-solid fa-comments" /> Kontak</div>
            <h1 className="page-title">Mari <span className="ital">ngobrol</span> tentang proyek Anda</h1>
            <p className="page-sub">Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan bisnis Anda dan kami bantu temukan solusi terbaik.</p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="container">
          <motion.div className="contact-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {methods.map((m) => (
              <motion.div key={m.title} className="contact-card spot" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                <div className="contact-ico" style={{ color: m.color }}><Icon icon={m.icon} /></div>
                <div className="contact-label">{m.title}</div>
                <div className="contact-val">{m.value}</div>
                <p className="contact-sub">{m.sub}</p>
                <a className="btn btn-pri" href={m.href} target="_blank" rel="noreferrer">{m.cta} <Icon icon="fa-solid fa-arrow-right" /></a>
              </motion.div>
            ))}
          </motion.div>

          <Reveal style={{ marginTop: 80, textAlign: 'center' }}>
            <div className="eyebrow center" style={{ justifyContent: 'center', marginBottom: 16 }}><Icon icon="fa-solid fa-clock" /> Jam Operasional</div>
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>Senin – Jumat: <strong style={{ color: 'var(--ink)' }}>08.00 – 17.00 WIB</strong></p>
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>Sabtu: <strong style={{ color: 'var(--ink)' }}>09.00 – 13.00 WIB</strong> &nbsp;·&nbsp; Minggu & Libur Nasional: <strong style={{ color: 'var(--ink)' }}>Tutup</strong></p>
            <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginTop: 12 }}>WhatsApp tetap bisa dikirim di luar jam kerja — kami balas saat jam operasional.</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ PORTFOLIO (/portofolio) */
export function Portfolio() {
  const title = 'Portofolio AFSS — Studi Kasus Website, Aplikasi & Sistem'
  const desc = 'Lihat studi kasus dan hasil nyata proyek AFSS: landing page UMKM, dashboard klinik, sistem rental, ERP toko grosir, dan lainnya.'

  const caseStudies = [
    { ...showcase[0], detail: 'Landing page toko batik UMKM dengan desain custom, optimasi SEO, dan integrasi WhatsApp. Dalam 2 bulan pertama, konversi naik signifikan berkat kecepatan loading dan CTA yang dioptimasi.' },
    { ...showcase[1], detail: 'Website company profile kontraktor dengan galeri proyek, halaman layanan terpisah, dan form kontak. Peningkatan lead inquiry organik dari Google dalam 3 bulan.' },
    { ...showcase[2], detail: 'Aplikasi Flutter + dashboard web untuk klinik: registrasi pasien digital, antrian real-time, dan rekam medis sederhana. Waktu tunggu pasien berkurang drastis.' },
    { ...showcase[3], detail: 'Sistem reservasi dan manajemen armada untuk rental mobil: booking online, jadwal pengemudi, laporan pendapatan harian. Operasional lebih rapi dan terukur.' },
    { ...showcase[4], detail: 'Sistem manajemen stok dan penjualan untuk dealer motor multi-cabang. Data stok tersinkron real-time antar cabang, laporan otomatis setiap hari.' },
    { ...showcase[5], detail: 'ERP lite untuk toko grosir: pembelian, penjualan, stok, dan hutang-piutang dalam satu sistem. Waktu pembuatan laporan bulanan dari 8 jam menjadi kurang dari 1 jam.' },
  ]

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/portofolio`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/portofolio`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Portofolio' }]} />
            <div className="eyebrow"><Icon icon="fa-solid fa-images" /> Portofolio</div>
            <h1 className="page-title">Studi kasus &amp; <span className="ital">hasil nyata</span></h1>
            <p className="page-sub">Beragam sistem yang telah kami bangun — lengkap dengan tantangan, solusi, dan dampak yang dirasakan klien.</p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="container">
          <motion.div className="portfolio-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {caseStudies.map((item) => (
              <motion.div key={item.n} className="portfolio-card spot" style={{ '--c': item.c, '--c2': item.c2 }} variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                <div className="portfolio-header">
                  <span className="portfolio-num">{String(item.n).padStart(2, '0')}</span>
                  <span className="portfolio-result"><Icon icon="fa-solid fa-arrow-trend-up" /> {item.price}</span>
                </div>
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-detail">{item.detail}</p>
                <div className="portfolio-tags">{item.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>Proyek Anda bisa jadi <span className="ital">studi kasus</span> berikutnya</h2>
          <p>Ceritakan kebutuhan bisnis Anda — kami bantu wujudkan dengan standar yang sama seperti portofolio di atas.</p>
          <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya tertarik berdiskusi tentang proyek digital saya.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Diskusi Proyek</a>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ PRIVACY POLICY (/privacy) */
export function Privacy() {
  const title = 'Kebijakan Privasi — AFSS'
  const desc = 'Kebijakan privasi PT Advanced Future Software Solutions mengenai pengumpulan, penggunaan, dan perlindungan data pengguna.'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/privacy`} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`${SITE_URL}/privacy`} />
        <meta name="robots" content="noindex" />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Kebijakan Privasi' }]} />
            <h1 className="page-title">Kebijakan <span className="ital">Privasi</span></h1>
            <p className="page-sub">Terakhir diperbarui: 14 Juni 2026</p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 40, paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div className="legal-body">
            <h2>1. Pendahuluan</h2>
            <p>PT Advanced Future Software Solutions ("AFSS", "kami") berkomitmen melindungi privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi yang Anda berikan saat menggunakan layanan atau mengunjungi situs web kami.</p>

            <h2>2. Informasi yang Kami Kumpulkan</h2>
            <p>Kami dapat mengumpulkan informasi berikut:</p>
            <ul>
              <li><strong>Informasi identitas:</strong> nama, alamat email, nomor telepon yang Anda berikan saat menghubungi kami atau mengisi formulir.</li>
              <li><strong>Informasi teknis:</strong> alamat IP, jenis browser, halaman yang dikunjungi, dan durasi kunjungan — dikumpulkan secara anonim melalui layanan analitik.</li>
              <li><strong>Informasi proyek:</strong> brief, dokumen, atau materi lain yang Anda bagikan dalam konteks kerja sama.</li>
            </ul>

            <h2>3. Penggunaan Informasi</h2>
            <p>Informasi Anda digunakan untuk:</p>
            <ul>
              <li>Merespons pertanyaan dan memberikan konsultasi.</li>
              <li>Memproses dan mengelola proyek yang telah disepakati.</li>
              <li>Meningkatkan kualitas layanan dan situs web kami.</li>
              <li>Mengirimkan informasi yang relevan jika Anda telah memberikan persetujuan.</li>
            </ul>

            <h2>4. Keamanan Data</h2>
            <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk melindungi data Anda dari akses tidak sah, pengungkapan, perubahan, atau penghapusan. Data proyek disimpan secara aman dan hanya dapat diakses oleh tim yang berkepentingan.</p>

            <h2>5. Berbagi Data dengan Pihak Ketiga</h2>
            <p>Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada pihak ketiga. Data dapat dibagikan kepada penyedia layanan pihak ketiga (seperti layanan hosting atau analitik) yang membantu operasional kami, dengan kewajiban kerahasiaan yang setara.</p>

            <h2>6. Cookie</h2>
            <p>Situs web kami menggunakan cookie teknis yang diperlukan untuk fungsi dasar situs. Kami tidak menggunakan cookie pelacak pihak ketiga untuk keperluan iklan.</p>

            <h2>7. Hak Anda</h2>
            <p>Anda berhak untuk meminta akses, koreksi, atau penghapusan data pribadi Anda yang kami simpan. Untuk mengajukan permintaan, hubungi kami di <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.</p>

            <h2>8. Perubahan Kebijakan</h2>
            <p>Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan signifikan akan kami informasikan melalui situs web atau email. Penggunaan layanan kami setelah perubahan diterbitkan dianggap sebagai penerimaan kebijakan yang diperbarui.</p>

            <h2>9. Hubungi Kami</h2>
            <p>Pertanyaan seputar kebijakan privasi ini dapat disampaikan ke:</p>
            <ul>
              <li>Email: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
              <li>WhatsApp: <a href={waLink('Halo, saya ingin bertanya tentang kebijakan privasi AFSS.')} target="_blank" rel="noreferrer">{BRAND.phone}</a></li>
              <li>Alamat: {BRAND.address}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ TERMS OF SERVICE (/terms) */
export function Terms() {
  const title = 'Syarat & Ketentuan Layanan — AFSS'
  const desc = 'Syarat dan ketentuan layanan PT Advanced Future Software Solutions untuk proyek pembuatan website, aplikasi, dan sistem digital.'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/terms`} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`${SITE_URL}/terms`} />
        <meta name="robots" content="noindex" />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Syarat & Ketentuan' }]} />
            <h1 className="page-title">Syarat &amp; <span className="ital">Ketentuan</span></h1>
            <p className="page-sub">Terakhir diperbarui: 14 Juni 2026</p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 40, paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div className="legal-body">
            <h2>1. Penerimaan Syarat</h2>
            <p>Dengan menggunakan layanan PT Advanced Future Software Solutions ("AFSS"), Anda menyetujui syarat dan ketentuan yang berlaku dalam dokumen ini. Jika Anda tidak menyetujuinya, mohon tidak menggunakan layanan kami.</p>

            <h2>2. Deskripsi Layanan</h2>
            <p>AFSS menyediakan jasa pengembangan perangkat lunak termasuk namun tidak terbatas pada: pembuatan website custom, pengembangan aplikasi mobile, web application, UI/UX design, serta layanan maintenance dan support.</p>

            <h2>3. Proses Kerja Sama</h2>
            <ul>
              <li><strong>Konsultasi:</strong> Dimulai dengan diskusi kebutuhan secara gratis tanpa komitmen.</li>
              <li><strong>Proposal:</strong> Kami menyampaikan ruang lingkup pekerjaan, estimasi biaya, dan timeline yang disepakati bersama secara tertulis.</li>
              <li><strong>Pembayaran:</strong> Skema pembayaran termin disepakati sebelum pengerjaan dimulai (umumnya DP di awal, pelunasan sebelum serah terima).</li>
              <li><strong>Serah Terima:</strong> Seluruh aset, kode sumber, dan dokumentasi diserahkan kepada klien setelah pelunasan.</li>
            </ul>

            <h2>4. Kepemilikan Kode dan Aset</h2>
            <p>Setelah pelunasan penuh, seluruh hak kekayaan intelektual atas kode sumber, desain, dan aset yang dikembangkan khusus untuk proyek Anda menjadi milik Anda sepenuhnya. AFSS tidak mempertahankan hak kepemilikan atas deliverable yang telah dibayar lunas.</p>
            <p>Library dan komponen open-source yang digunakan tunduk pada lisensi masing-masing (umumnya MIT, Apache 2.0, atau sejenisnya).</p>

            <h2>5. Tanggung Jawab Klien</h2>
            <p>Klien bertanggung jawab untuk:</p>
            <ul>
              <li>Menyediakan materi, konten, dan informasi yang diperlukan secara tepat waktu.</li>
              <li>Memberikan feedback pada setiap milestone dalam tenggat waktu yang disepakati.</li>
              <li>Memastikan bahwa materi yang disediakan tidak melanggar hak cipta atau hukum yang berlaku.</li>
            </ul>

            <h2>6. Garansi dan Perbaikan</h2>
            <p>Setiap proyek dilengkapi masa garansi bug (umumnya 30–90 hari setelah launching, sesuai kesepakatan). Garansi mencakup perbaikan bug yang muncul dari kode yang kami tulis dan bukan akibat perubahan konten atau sistem oleh klien.</p>

            <h2>7. Pembatasan Tanggung Jawab</h2>
            <p>AFSS tidak bertanggung jawab atas kerugian tidak langsung, kehilangan pendapatan, atau kerugian data yang disebabkan oleh penggunaan sistem yang kami bangun di luar kondisi normal operasional yang telah diuji.</p>

            <h2>8. Kerahasiaan</h2>
            <p>Kami menjaga kerahasiaan informasi bisnis dan teknis yang Anda berikan selama kerja sama. Informasi tersebut tidak akan dibagikan kepada pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum.</p>

            <h2>9. Penyelesaian Sengketa</h2>
            <p>Sengketa yang timbul dari perjanjian layanan diselesaikan terlebih dahulu melalui musyawarah mufakat. Jika tidak tercapai kesepakatan dalam 30 hari, penyelesaian dilakukan sesuai hukum yang berlaku di Indonesia.</p>

            <h2>10. Perubahan Syarat</h2>
            <p>AFSS berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan berlaku untuk proyek baru yang dimulai setelah tanggal perubahan diterbitkan.</p>

            <h2>11. Hubungi Kami</h2>
            <p>Pertanyaan terkait syarat dan ketentuan ini dapat disampaikan ke <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> atau melalui WhatsApp di {BRAND.phone}.</p>
          </div>
        </div>
      </section>
    </>
  )
}
