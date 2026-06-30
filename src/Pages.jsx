import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Icon } from './Icon.jsx'
import emailjs from '@emailjs/browser'
import { BRAND, products, why, showcase, stats, waLink, getProductBySlug, pricing, pricingBundles, faqs, portfolioProjects } from './data.js'

const SITE_URL = 'https://afss.tech'

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

/* ── Cursor spotlight (same pattern as App.jsx) ── */
const onSpot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

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

/* ── Hero stat card — right column of 2-col page-hero ── */
function HeroStatCard() {
  return (
    <div className="hero-stat-card">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="hero-stat-n">{s.prefix || ''}{s.n}<em>{s.suffix}</em></div>
          <div className="hero-stat-l">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════ EXTENDED SERVICE CONTENT */
const SERVICE_CONTENT = {
  'landing-page': {
    headline: 'Jasa Pembuatan Landing Page Konversi Tinggi',
    subline: 'Satu halaman yang dirancang untuk mengubah pengunjung iklan menjadi leads atau pelanggan — cepat, persuasif, dan terukur.',
    longDesc: 'Landing page bukan sekadar halaman web biasa. Ia adalah ujung tombak kampanye iklan Anda — harus meyakinkan pengunjung dalam hitungan detik. AFSS merancang landing page dengan pendekatan konversi: copywriting persuasif, desain fokus CTA, dan kecepatan loading di bawah 2 detik.',
    benefits: [
      { icon: 'fa-solid fa-bullseye', title: 'Fokus Satu Tujuan', desc: 'Tidak ada distraksi. Setiap elemen diarahkan untuk mendorong satu aksi: hubungi, beli, atau daftar.' },
      { icon: 'fa-solid fa-gauge-high', title: 'Loading < 2 Detik', desc: 'Setiap detik keterlambatan menurunkan konversi 7%. Landing page kami dioptimasi untuk kecepatan maksimal.' },
      { icon: 'fa-solid fa-mobile-screen', title: 'Mobile-First', desc: 'Lebih dari 70% trafik iklan dari HP. Desain kami prioritaskan mobile tanpa mengorbankan desktop.' },
      { icon: 'fa-solid fa-chart-bar', title: 'Tracking & Analytics', desc: 'Integrasi Google Analytics, Meta Pixel, dan konversi event untuk mengukur ROI kampanye secara akurat.' },
    ],
    serviceFaq: [
      { q: 'Berapa harga landing page?', a: 'Mulai dari Rp 1,5 juta untuk desain sederhana. Dengan fitur tambahan (animasi, tracking, copywriting) mulai Rp 3–6 juta.' },
      { q: 'Berapa lama pengerjaannya?', a: 'Landing page standar selesai 3–7 hari kerja. Dengan revisi dan approval konten, biasanya 1–2 minggu total.' },
      { q: 'Apakah termasuk copywriting?', a: 'Bisa. Kami menawarkan paket dengan copywriting persuasif berbasis riset audiens dan kompetitor.' },
      { q: 'Apakah bisa dihubungkan ke iklan Meta/Google?', a: 'Ya. Kami pasang tracking pixel, konversi event, dan pastikan URL siap dipakai di campaign iklan berbayar.' },
    ],
    relatedSlugs: ['company-profile', 'ecommerce'],
  },
  'company-profile': {
    headline: 'Jasa Pembuatan Company Profile Website',
    subline: 'Website profil perusahaan yang membangun kepercayaan, menampilkan layanan bisnis Anda, dan mengundang calon klien menghubungi Anda.',
    longDesc: 'Di era digital, calon klien mengecek website perusahaan sebelum memutuskan bekerja sama. Company profile yang baik adalah representasi terbaik bisnis Anda — menampilkan kredibilitas, layanan, tim, dan cara menghubungi dengan jelas dan profesional.',
    benefits: [
      { icon: 'fa-solid fa-building', title: 'Desain Corporate Modern', desc: 'Tampilan profesional yang mencerminkan identitas brand — dipercaya calon klien sejak kunjungan pertama.' },
      { icon: 'fa-solid fa-magnifying-glass', title: 'SEO Lokal Optimasi', desc: 'Dioptimasi agar muncul di Google saat calon klien mencari bisnis seperti Anda di kota atau industri Anda.' },
      { icon: 'fa-solid fa-layer-group', title: 'Multi-Halaman Lengkap', desc: 'Beranda, Tentang Kami, Layanan, Portofolio, dan Kontak — struktur yang lengkap dan mudah dinavigasi.' },
      { icon: 'fa-solid fa-pen-to-square', title: 'Mudah Diperbarui', desc: 'Sistem manajemen konten sederhana agar Anda bisa memperbarui berita, portofolio, dan info tanpa developer.' },
    ],
    serviceFaq: [
      { q: 'Berapa halaman yang termasuk?', a: 'Paket standar mencakup 5–7 halaman utama. Halaman tambahan bisa ditambahkan sesuai kebutuhan.' },
      { q: 'Berapa lama pengerjaannya?', a: 'Umumnya 2–4 minggu termasuk desain, development, dan revisi. Timeline pasti disepakati di awal.' },
      { q: 'Apakah sudah termasuk hosting dan domain?', a: 'Bisa. Kami bantu setup domain pilihan Anda dan hosting cepat dengan SSL gratis.' },
      { q: 'Apakah bisa versi bahasa Inggris?', a: 'Bisa dibuat bilingual (Indonesia & Inggris) dengan biaya tambahan yang terjangkau.' },
    ],
    relatedSlugs: ['landing-page', 'software-custom'],
  },
  'software-custom': {
    headline: 'Jasa Pembuatan Software & Aplikasi Web Custom',
    subline: 'Web app, dashboard, CRM, atau sistem internal yang dibuat dari nol sesuai alur kerja bisnis Anda — bukan template generik.',
    longDesc: 'Bisnis yang berkembang butuh sistem yang tumbuh bersamanya. AFSS membangun software custom yang menggantikan spreadsheet dan proses manual dengan platform terpusat — dari dashboard sederhana hingga sistem manajemen skala perusahaan.',
    benefits: [
      { icon: 'fa-solid fa-chart-line', title: 'Dashboard Real-Time', desc: 'Data penjualan, stok, dan KPI ditampilkan secara langsung untuk pengambilan keputusan yang lebih cepat.' },
      { icon: 'fa-solid fa-layer-group', title: 'Multi-User & Role (RBAC)', desc: 'Atur hak akses per departemen — staf hanya melihat data yang perlu mereka lihat.' },
      { icon: 'fa-solid fa-file-invoice', title: 'Laporan & Export Otomatis', desc: 'Laporan harian, mingguan, atau custom yang bisa diexport ke Excel/PDF dengan satu klik.' },
      { icon: 'fa-solid fa-circle-nodes', title: 'Integrasi Sistem', desc: 'Bisa diintegrasikan dengan sistem akuntansi, payment gateway, logistik, atau ERP yang sudah Anda pakai.' },
    ],
    serviceFaq: [
      { q: 'Berapa estimasi biaya software custom?', a: 'Dashboard sederhana mulai Rp 8 juta. Software kompleks dengan banyak modul mulai Rp 20–50 juta. Estimasi pasti setelah konsultasi.' },
      { q: 'Berapa lama pengerjaannya?', a: 'Software sederhana 3–6 minggu. Sistem kompleks 2–4 bulan. Timeline pasti disepakati di tahap proposal.' },
      { q: 'Apakah bisa diakses dari smartphone?', a: 'Ya. Kami bangun responsive — bisa dipakai di desktop kantor maupun smartphone di lapangan tanpa install apapun.' },
      { q: 'Apakah kode menjadi milik kami?', a: 'Ya. Seluruh source code, dokumentasi, dan aset menjadi milik Anda sepenuhnya setelah pelunasan.' },
    ],
    relatedSlugs: ['erp', 'ecommerce'],
  },
  'erp': {
    headline: 'Jasa Pembuatan Sistem ERP Custom untuk Bisnis',
    subline: 'ERP yang dibangun sesuai alur kerja bisnis Anda — bukan dipaksakan ke template generik — menyatukan seluruh operasional dalam satu platform.',
    longDesc: 'ERP (Enterprise Resource Planning) mengintegrasikan semua departemen bisnis Anda: keuangan, inventory, SDM, produksi, dan penjualan — dalam satu platform terpusat. AFSS membangun ERP custom yang benar-benar sesuai proses bisnis Anda.',
    benefits: [
      { icon: 'fa-solid fa-coins', title: 'Modul Keuangan & Akuntansi', desc: 'Pembukuan, faktur, laporan laba-rugi, dan arus kas — semua tercatat otomatis dan akurat.' },
      { icon: 'fa-solid fa-warehouse', title: 'Manajemen Inventory & Gudang', desc: 'Stok real-time, mutasi barang, dan peringatan stok minimum agar tidak ada kehabisan atau kelebihan.' },
      { icon: 'fa-solid fa-users', title: 'HR & Penggajian', desc: 'Data karyawan, absensi, perhitungan gaji, dan slip gaji otomatis — terintegrasi dengan BPJS dan PPh 21.' },
      { icon: 'fa-solid fa-file-chart-column', title: 'Dashboard Eksekutif', desc: 'KPI utama bisnis Anda bisa diakses kapan saja dari perangkat apa pun.' },
    ],
    serviceFaq: [
      { q: 'Berapa lama implementasi ERP?', a: 'ERP sederhana 2–3 modul: 8–12 minggu. ERP lengkap: 4–6 bulan termasuk migrasi data dan training tim.' },
      { q: 'Berapa biaya ERP custom?', a: 'Mulai dari Rp 28 juta untuk 2–3 modul dasar. Estimasi akurat diberikan setelah discovery session.' },
      { q: 'Apakah bisa integrasi dengan sistem lama?', a: 'Ya. Kami evaluasi sistem existing dan buat jembatan integrasi agar data tidak perlu diinput dua kali.' },
      { q: 'Apakah ada training untuk tim kami?', a: 'Ya. Setiap proyek ERP mencakup sesi training lengkap dan dokumentasi user manual.' },
    ],
    relatedSlugs: ['software-custom', 'ecommerce'],
  },
  'ecommerce': {
    headline: 'Jasa Pembuatan E-Commerce & Toko Online Custom',
    subline: 'Toko online dengan fitur lengkap — katalog, keranjang, pembayaran, dan manajemen pesanan — dibangun sesuai kebutuhan bisnis Anda.',
    longDesc: 'Toko online yang baik bukan sekadar memindahkan produk ke internet. Ia harus meyakinkan pembeli, memudahkan transaksi, dan memberikan pengalaman belanja yang menyenangkan. AFSS membangun e-commerce custom dengan payment gateway Indonesia, manajemen produk yang mudah, dan desain yang mendorong penjualan.',
    benefits: [
      { icon: 'fa-solid fa-credit-card', title: 'Payment Gateway Lengkap', desc: 'Integrasi Midtrans atau Xendit untuk transfer bank, QRIS, kartu kredit, dan dompet digital.' },
      { icon: 'fa-solid fa-boxes-stacked', title: 'Manajemen Produk & Stok', desc: 'Tambah, edit, dan kelola ribuan produk dengan mudah. Stok otomatis berkurang saat ada pesanan.' },
      { icon: 'fa-solid fa-truck', title: 'Kalkulasi Ongkir Otomatis', desc: 'Integrasi JNE, J&T, SiCepat, dan kurir lain dengan kalkulasi ongkir otomatis.' },
      { icon: 'fa-solid fa-chart-line', title: 'Dashboard Penjualan', desc: 'Pantau omzet, pesanan masuk, produk terlaris, dan performa toko dalam satu dashboard.' },
    ],
    serviceFaq: [
      { q: 'Berapa biaya e-commerce custom?', a: 'Mulai dari Rp 18 juta untuk fitur dasar. E-commerce dengan fitur kompleks mulai Rp 35 juta. Estimasi pasti setelah konsultasi.' },
      { q: 'Lebih baik custom atau platform (Shopify/WooCommerce)?', a: 'Platform lebih cepat dan murah untuk toko sederhana. Custom lebih fleksibel untuk kebutuhan unik atau volume tinggi.' },
      { q: 'Apakah bisa impor produk massal?', a: 'Ya. Kami siapkan fitur import produk via Excel/CSV sehingga tidak perlu input satu per satu.' },
      { q: 'Apakah bisa terkoneksi ke marketplace (Tokopedia/Shopee)?', a: 'Bisa. Kami integrasikan via API untuk sinkronisasi stok dan pesanan dari berbagai channel.' },
    ],
    relatedSlugs: ['marketplace', 'software-custom'],
  },
  'marketplace': {
    headline: 'Jasa Pembuatan Platform Marketplace Multi-Vendor',
    subline: 'Platform marketplace lengkap — seller mendaftar, upload produk, buyer bertransaksi, admin kelola semua dari satu panel.',
    longDesc: 'Marketplace multi-vendor adalah platform yang mempertemukan banyak seller dengan buyer dalam satu ekosistem. AFSS membangun marketplace custom dengan sistem komisi, manajemen seller, payment gateway, dan app mobile untuk buyer dan seller.',
    benefits: [
      { icon: 'fa-solid fa-store', title: 'Multi-Vendor Management', desc: 'Seller mendaftar dan kelola toko sendiri. Admin pantau, approve, dan kontrol semua aktivitas dari satu panel.' },
      { icon: 'fa-solid fa-percentage', title: 'Komisi & Settlement Otomatis', desc: 'Sistem komisi fleksibel per kategori atau seller. Settlement otomatis ke rekening seller sesuai jadwal.' },
      { icon: 'fa-solid fa-star-half-stroke', title: 'Review, Rating & Dispute', desc: 'Sistem ulasan pembeli, rating seller, dan penyelesaian sengketa yang terstruktur.' },
      { icon: 'fa-solid fa-mobile-screen-button', title: 'App Mobile Buyer & Seller', desc: 'Aplikasi mobile Android & iOS untuk buyer berbelanja dan seller mengelola toko dari mana saja.' },
    ],
    serviceFaq: [
      { q: 'Berapa biaya pembuatan marketplace?', a: 'Mulai dari Rp 65 juta untuk marketplace dasar. Marketplace dengan app mobile lengkap mulai Rp 100 juta.' },
      { q: 'Berapa lama pengerjaan marketplace?', a: 'Marketplace tanpa app mobile: 3–5 bulan. Dengan app mobile: 5–8 bulan.' },
      { q: 'Apakah ada fitur chat antara buyer dan seller?', a: 'Bisa ditambahkan. Kami integrasikan chat real-time menggunakan WebSocket atau Firebase.' },
      { q: 'Bagaimana sistem pembayarannya?', a: 'Dana masuk ke rekening perusahaan dulu, lalu didistribusikan ke seller setelah dikurangi komisi. Midtrans/Xendit siap diintegrasikan.' },
    ],
    relatedSlugs: ['ecommerce', 'software-custom'],
  },
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
    relatedSlugs: ['web-app', 'maintenance'],
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
  'jasa-pembuatan-landing-page': {
    headline: 'Jasa Pembuatan Landing Page Konversi Tinggi',
    subline: 'Landing page yang dirancang khusus untuk mengubah pengunjung iklan menjadi pelanggan — cepat, persuasif, dan terukur.',
    longDesc: 'Landing page bukan sekadar halaman web biasa. Ia adalah ujung tombak kampanye iklan Anda — satu halaman yang harus meyakinkan pengunjung dalam hitungan detik. AFSS merancang landing page dengan pendekatan konversi: copywriting persuasif, desain yang fokus pada CTA, dan kecepatan loading di bawah 2 detik.',
    benefits: [
      { icon: 'fa-solid fa-bullseye', title: 'Fokus Satu Tujuan', desc: 'Tidak ada distraksi. Setiap elemen landing page diarahkan untuk mendorong satu aksi: hubungi, beli, atau daftar.' },
      { icon: 'fa-solid fa-gauge-high', title: 'Loading < 2 Detik', desc: 'Setiap detik keterlambatan menurunkan konversi 7%. Landing page kami dioptimasi untuk kecepatan maksimal.' },
      { icon: 'fa-solid fa-mobile-screen', title: 'Mobile-First', desc: 'Lebih dari 70% trafik iklan datang dari HP. Desain kami prioritaskan mobile tanpa mengorbankan desktop.' },
      { icon: 'fa-solid fa-chart-bar', title: 'Tracking & Analytics', desc: 'Integrasi Google Analytics, Meta Pixel, dan konversi event untuk mengukur ROI kampanye Anda secara akurat.' },
    ],
    serviceFaq: [
      { q: 'Berapa harga landing page?', a: 'Landing page mulai dari Rp 1 juta untuk desain sederhana. Dengan fitur tambahan (form, animasi, tracking) mulai Rp 2–5 juta. Estimasi pasti diberikan setelah konsultasi.' },
      { q: 'Berapa lama pengerjaannya?', a: 'Landing page standar selesai 3–7 hari kerja. Dengan revisi dan approval konten, biasanya 1–2 minggu total.' },
      { q: 'Apakah termasuk copywriting?', a: 'Bisa. Kami menawarkan paket dengan copywriting persuasif berbasis riset kompetitor dan target audiens Anda.' },
      { q: 'Apakah bisa dihubungkan ke iklan Meta/Google?', a: 'Ya. Kami pasang tracking pixel, konversi event, dan pastikan URL landing page siap dipakai di campaign iklan berbayar.' },
    ],
    relatedSlugs: ['jasa-pembuatan-company-profile', 'pembuatan-website'],
  },
  'jasa-pembuatan-company-profile': {
    headline: 'Jasa Pembuatan Company Profile Website Profesional',
    subline: 'Website company profile yang membangun kepercayaan, menampilkan layanan bisnis Anda, dan mengundang calon klien untuk menghubungi Anda.',
    longDesc: 'Di era digital, calon klien mengecek website perusahaan Anda sebelum memutuskan untuk bekerja sama. Company profile website yang baik adalah representasi digital terbaik bisnis Anda — menampilkan kredibilitas, layanan, tim, dan cara menghubungi Anda dengan jelas dan profesional.',
    benefits: [
      { icon: 'fa-solid fa-building', title: 'Desain Corporate Modern', desc: 'Tampilan profesional yang mencerminkan identitas brand Anda — dipercaya oleh calon klien sejak kunjungan pertama.' },
      { icon: 'fa-solid fa-magnifying-glass', title: 'SEO Lokal Optimasi', desc: 'Dioptimasi agar muncul di Google saat calon klien mencari bisnis seperti Anda di kota atau industri Anda.' },
      { icon: 'fa-solid fa-layer-group', title: 'Multi-Halaman Lengkap', desc: 'Beranda, Tentang Kami, Layanan/Produk, Portofolio, dan Kontak — struktur yang lengkap dan mudah dinavigasi.' },
      { icon: 'fa-solid fa-pen-to-square', title: 'Mudah Diperbarui', desc: 'Sistem manajemen konten sederhana agar Anda bisa memperbarui berita, portofolio, dan informasi tanpa developer.' },
    ],
    serviceFaq: [
      { q: 'Berapa halaman yang termasuk?', a: 'Paket standar mencakup 5–7 halaman utama. Halaman tambahan (blog, galeri, karir) bisa ditambahkan sesuai kebutuhan.' },
      { q: 'Apakah ada versi bahasa Inggris?', a: 'Bisa dibuat bilingual (Indonesia & Inggris). Kami tambahkan fitur ganti bahasa dengan biaya tambahan yang terjangkau.' },
      { q: 'Berapa lama pengerjaan company profile website?', a: 'Umumnya 2–4 minggu termasuk desain, development, dan revisi. Timeline pasti disepakati di awal.' },
      { q: 'Apakah termasuk foto dan konten?', a: 'Kami bisa membantu menyiapkan template konten. Foto perusahaan disiapkan oleh Anda, atau kami bisa rekomendasikan fotografer.' },
    ],
    relatedSlugs: ['jasa-pembuatan-landing-page', 'pembuatan-website'],
  },
  'jasa-pembuatan-toko-online': {
    headline: 'Jasa Pembuatan Toko Online Custom',
    subline: 'Toko online dengan fitur lengkap — katalog, keranjang, pembayaran, dan manajemen pesanan — dibangun sesuai kebutuhan bisnis Anda.',
    longDesc: 'Toko online yang baik bukan sekadar memindahkan produk ke internet. Ia harus meyakinkan pembeli, memudahkan transaksi, dan memberikan pengalaman belanja yang menyenangkan. AFSS membangun toko online custom dengan payment gateway Indonesia, manajemen produk yang mudah, dan desain yang mendorong penjualan.',
    benefits: [
      { icon: 'fa-solid fa-credit-card', title: 'Payment Gateway Lengkap', desc: 'Integrasi Midtrans atau Xendit untuk transfer bank, QRIS, kartu kredit, dan dompet digital seperti GoPay & OVO.' },
      { icon: 'fa-solid fa-boxes-stacked', title: 'Manajemen Produk & Stok', desc: 'Tambah, edit, dan kelola ribuan produk dengan mudah. Stok otomatis berkurang saat ada pesanan masuk.' },
      { icon: 'fa-solid fa-truck', title: 'Kalkulasi Ongkir Otomatis', desc: 'Integrasi JNE, J&T, SiCepat, dan kurir lain dengan kalkulasi ongkos kirim otomatis berdasarkan berat dan lokasi.' },
      { icon: 'fa-solid fa-chart-line', title: 'Dashboard Penjualan', desc: 'Pantau omzet, pesanan masuk, produk terlaris, dan performa toko dalam satu dashboard yang mudah dipahami.' },
    ],
    serviceFaq: [
      { q: 'Lebih baik custom atau pakai platform (Shopify/WooCommerce)?', a: 'Platform lebih cepat dan murah untuk toko sederhana. Custom lebih fleksibel untuk kebutuhan unik, integrasi sistem, atau volume tinggi. Kami bantu memilih yang paling sesuai.' },
      { q: 'Apakah bisa impor produk massal?', a: 'Ya. Kami siapkan fitur import produk via Excel/CSV sehingga Anda tidak perlu input satu per satu.' },
      { q: 'Berapa biaya pembuatan toko online?', a: 'Mulai dari Rp 5 juta untuk fitur dasar. Toko dengan fitur lengkap (multi-seller, langganan) mulai Rp 15 juta. Estimasi pasti setelah konsultasi.' },
      { q: 'Apakah bisa terkoneksi ke Tokopedia/Shopee?', a: 'Bisa. Kami integrasikan dengan marketplace via API untuk sinkronisasi stok dan pesanan dari berbagai channel penjualan.' },
    ],
    relatedSlugs: ['jasa-pembuatan-dashboard', 'web-app'],
  },
  'jasa-pembuatan-erp': {
    headline: 'Jasa Pembuatan Sistem ERP Custom untuk Bisnis',
    subline: 'ERP yang dibangun sesuai alur kerja bisnis Anda — bukan dipaksakan ke template generik — menyatukan seluruh operasional dalam satu platform.',
    longDesc: 'ERP (Enterprise Resource Planning) mengintegrasikan semua departemen bisnis Anda: keuangan, inventory, SDM, produksi, dan penjualan — dalam satu platform terpusat. AFSS membangun ERP custom yang benar-benar sesuai dengan proses bisnis Anda, bukan solusi generik yang memaksa Anda mengubah cara kerja.',
    benefits: [
      { icon: 'fa-solid fa-coins', title: 'Modul Keuangan & Akuntansi', desc: 'Pembukuan, faktur, laporan laba-rugi, dan arus kas — semua tercatat otomatis dan akurat.' },
      { icon: 'fa-solid fa-warehouse', title: 'Manajemen Inventory & Gudang', desc: 'Stok real-time, mutasi barang, dan peringatan stok minimum agar tidak ada kehabisan atau kelebihan stok.' },
      { icon: 'fa-solid fa-users', title: 'HR & Penggajian', desc: 'Data karyawan, absensi, perhitungan gaji, dan slip gaji otomatis — terintegrasi dengan BPJS dan PPh 21.' },
      { icon: 'fa-solid fa-file-chart-column', title: 'Laporan Manajemen', desc: 'Dashboard eksekutif dengan KPI utama bisnis Anda — bisa diakses kapan saja, dari perangkat apa pun.' },
    ],
    serviceFaq: [
      { q: 'Berapa lama implementasi ERP?', a: 'ERP sederhana (1–3 modul) biasanya 8–12 minggu. ERP lengkap bisa 4–6 bulan termasuk migrasi data dan training tim.' },
      { q: 'Apakah bisa integrasi dengan sistem yang sudah ada?', a: 'Ya. Kami evaluasi sistem existing Anda dan buat jembatan integrasi agar data tidak perlu diinput dua kali.' },
      { q: 'Berapa biaya ERP custom?', a: 'Mulai dari Rp 30 juta untuk 2–3 modul dasar. Estimasi akurat diberikan setelah discovery session karena setiap bisnis berbeda.' },
      { q: 'Apakah ada training untuk tim kami?', a: 'Ya. Setiap proyek ERP mencakup sesi training lengkap dan dokumentasi user manual agar tim Anda mandiri mengoperasikan sistem.' },
    ],
    relatedSlugs: ['jasa-pembuatan-dashboard', 'web-app'],
  },
  'jasa-pembuatan-dashboard': {
    headline: 'Jasa Pembuatan Dashboard Bisnis & Sistem Manajemen',
    subline: 'Dashboard analitik yang menampilkan data bisnis real-time — untuk pengambilan keputusan yang lebih cepat dan akurat.',
    longDesc: 'Data bisnis yang tersebar di spreadsheet dan email membuat pengambilan keputusan lambat dan rawan kesalahan. Dashboard bisnis yang baik mengumpulkan semua data penting dalam satu tampilan terpusat — bisa diakses kapan saja, dari mana saja, oleh tim yang berwenang.',
    benefits: [
      { icon: 'fa-solid fa-chart-pie', title: 'Visualisasi Data Interaktif', desc: 'Grafik, tabel, dan metrik utama yang mudah dipahami — bukan spreadsheet yang membingungkan.' },
      { icon: 'fa-solid fa-shield-halved', title: 'Multi-User & Role Access', desc: 'Setiap departemen dan jabatan melihat data yang relevan dengan hak akses yang sesuai wewenangnya.' },
      { icon: 'fa-solid fa-file-export', title: 'Export Laporan Otomatis', desc: 'Laporan harian, mingguan, atau bulanan bisa diexport ke Excel atau PDF dengan satu klik, atau dikirim otomatis via email.' },
      { icon: 'fa-solid fa-plug', title: 'Integrasi Sumber Data', desc: 'Tarik data dari database Anda, Google Sheets, API eksternal, atau sistem akuntansi yang sudah dipakai.' },
    ],
    serviceFaq: [
      { q: 'Apa bedanya dashboard dengan ERP?', a: 'Dashboard fokus pada visualisasi dan monitoring data. ERP lebih luas — mencakup input transaksi, proses bisnis, dan alur kerja antar departemen.' },
      { q: 'Berapa lama pengerjaan dashboard?', a: 'Dashboard sederhana (5–10 metrik) bisa selesai 2–4 minggu. Dashboard kompleks dengan banyak sumber data 4–8 minggu.' },
      { q: 'Apakah bisa diakses dari HP?', a: 'Ya. Semua dashboard kami dibangun responsive — bisa diakses dari desktop, tablet, maupun smartphone tanpa install aplikasi.' },
      { q: 'Berapa biaya pembuatan dashboard?', a: 'Mulai dari Rp 4 juta untuk dashboard sederhana. Dashboard kompleks dengan integrasi banyak sistem mulai Rp 15 juta.' },
    ],
    relatedSlugs: ['jasa-pembuatan-erp', 'web-app'],
  },
  'jasa-pembuatan-crm': {
    headline: 'Jasa Pembuatan Sistem CRM Custom untuk Tim Sales',
    subline: 'Dari lead masuk hingga closing — seluruh pipeline penjualan terkelola rapi dalam satu platform, dengan reminder otomatis agar tidak ada prospek yang terlewat.',
    longDesc: 'Banyak bisnis kehilangan potensi penjualan bukan karena produknya kurang, tapi karena data pelanggan tersebar di WhatsApp, Excel, dan catatan pribadi sales. CRM (Customer Relationship Management) mengubah itu: semua kontak, history komunikasi, dan status deal tersimpan di satu tempat — bisa diakses siapa saja yang berwenang, kapan saja, dari perangkat apa pun. Hasilnya? Tim sales lebih fokus closing, manajer punya visibilitas penuh, dan tidak ada prospek hangat yang mendingin karena terlupakan.',
    benefits: [
      { icon: 'fa-solid fa-users', title: 'Database Pelanggan Terpusat', desc: 'Semua kontak, perusahaan, dan riwayat komunikasi tersimpan rapi — tidak ada data hilang saat sales resign atau berganti tim.' },
      { icon: 'fa-solid fa-diagram-project', title: 'Pipeline Penjualan Visual', desc: 'Pantau setiap deal dari prospek hingga closing dalam tampilan kanban yang mudah dipahami — manajemen tahu persis posisi setiap peluang.' },
      { icon: 'fa-solid fa-bell', title: 'Reminder & Follow-Up Otomatis', desc: 'Sistem mengingatkan tim sales untuk follow-up tepat waktu — prospek hangat tidak akan pernah mendingin karena lupa dihubungi.' },
      { icon: 'fa-solid fa-chart-line', title: 'Laporan Performa Tim', desc: 'Dashboard yang menampilkan konversi, jumlah deal per sales, rata-rata waktu closing, dan target vs realisasi — semua real-time.' },
    ],
    serviceFaq: [
      { q: 'Apa bedanya CRM dengan sistem manajemen (dashboard) biasa?', a: 'CRM difokuskan untuk siklus penjualan: lead, follow-up, deal, dan pelanggan. Dashboard umum lebih luas — bisa untuk inventory, keuangan, atau operasional. Jika tujuan Anda meningkatkan produktivitas tim sales dan konversi, CRM adalah solusi yang tepat.' },
      { q: 'Berapa lama pengerjaan CRM?', a: 'CRM dengan fitur standar (kontak, pipeline, reminder, laporan) biasanya 4–6 minggu. Fitur tambahan seperti integrasi WhatsApp Business API, email tracking, atau lead scoring bisa menambah 2–4 minggu.' },
      { q: 'Apakah bisa diintegrasikan dengan WhatsApp?', a: 'Bisa. Kami integrasikan dengan WhatsApp Business API sehingga percakapan WhatsApp langsung tercatat di CRM, dan tim bisa kirim pesan dari dalam sistem — semua terlacak otomatis.' },
      { q: 'Berapa user yang bisa mengakses?', a: 'Tidak ada batasan jumlah user di lisensi. Sistem dibangun multi-user dengan role berbeda: admin, manajer sales, dan sales representative — masing-masing melihat data dan fitur sesuai wewenangnya.' },
    ],
    relatedSlugs: ['jasa-pembuatan-dashboard', 'web-app'],
  },
  'jasa-pembuatan-website-medan': {
    headline: 'Jasa Pembuatan Website Medan — Software House Lokal Sumatera Utara',
    subline: 'Tim developer lokal Medan yang memahami kebutuhan bisnis Sumatera Utara — website, aplikasi, dan sistem digital dengan komunikasi langsung.',
    longDesc: 'AFSS adalah software house yang berbasis di Medan, Sumatera Utara. Kami melayani bisnis lokal Medan dan seluruh Indonesia dengan keunggulan komunikasi tatap muka, pemahaman pasar lokal, dan harga yang kompetitif. Dari UMKM Medan hingga perusahaan menengah Sumut — kami hadir untuk membantu digitalisasi bisnis Anda.',
    benefits: [
      { icon: 'fa-solid fa-location-dot', title: 'Tim Lokal, Konsultasi Tatap Muka', desc: 'Kami di Medan. Bisa bertemu langsung untuk diskusi kebutuhan, presentasi desain, atau training penggunaan sistem.' },
      { icon: 'fa-solid fa-handshake', title: 'Paham Pasar Lokal Sumut', desc: 'Kami mengerti konteks bisnis Medan — perilaku konsumen lokal hingga kebutuhan industri unggulan Sumatera Utara.' },
      { icon: 'fa-solid fa-clock', title: 'Respons Cepat, Zona Waktu Sama', desc: 'Tidak ada beda waktu. Chat, telepon, atau meeting bisa dilakukan di jam kerja yang sama dengan tim Anda.' },
      { icon: 'fa-solid fa-tag', title: 'Harga Kompetitif', desc: 'Tanpa biaya jarak atau overhead kantor kota besar. Kualitas Jakarta, harga ramah bisnis lokal Medan.' },
    ],
    serviceFaq: [
      { q: 'Apakah AFSS hanya melayani bisnis di Medan?', a: 'Tidak. Kami melayani klien di seluruh Indonesia secara remote. Namun untuk bisnis di Medan & Sumut, kami bisa konsultasi tatap muka.' },
      { q: 'Layanan apa saja yang tersedia di Medan?', a: 'Semua layanan: website custom, landing page, company profile, aplikasi mobile, web app, dashboard, ERP, dan maintenance.' },
      { q: 'Berapa harga jasa website di Medan?', a: 'Landing page mulai Rp 1 juta, company profile mulai Rp 3 juta, toko online mulai Rp 5 juta, web app mulai Rp 4 juta. Konsultasi gratis untuk estimasi akurat.' },
      { q: 'Bisa minta portofolio proyek bisnis Medan?', a: 'Ya. Hubungi kami via WhatsApp dan kami akan bagikan portofolio proyek yang relevan dengan industri Anda.' },
    ],
    relatedSlugs: ['pembuatan-website', 'jasa-pembuatan-company-profile'],
  },
}

/* ══════════════════════════════════════════════════ LAYANAN INDEX (/layanan) */
const SVC_CATS = [
  {
    id: 'web',
    icon: 'fa-solid fa-globe',
    label: 'Website',
    sub: 'Dari landing page iklan hingga company profile enterprise — cepat, SEO-ready, dan siap mengkonversi pengunjung.',
    slugs: ['landing-page', 'company-profile'],
  },
  {
    id: 'software',
    icon: 'fa-solid fa-code',
    label: 'Software & Sistem',
    sub: 'Solusi digital custom yang mengotomasi dan menskalakan operasional bisnis Anda dari satu platform terpusat.',
    slugs: ['software-custom', 'erp'],
  },
  {
    id: 'commerce',
    icon: 'fa-solid fa-cart-shopping',
    label: 'E-Commerce & Marketplace',
    sub: 'Buka channel penjualan baru — dari toko online sederhana hingga platform marketplace multi-vendor.',
    slugs: ['ecommerce', 'marketplace'],
  },
]

export function LayananIndex() {
  const title = 'Layanan AFSS — Landing Page, Company Profile, Software, ERP, E-Commerce & Marketplace'
  const desc = 'Jasa pembuatan landing page, company profile, software custom, ERP, e-commerce, dan marketplace. Software house Indonesia terpercaya, tim lokal Medan.'
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

      {/* Hero */}
      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Layanan' }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> Layanan</div>
              <h1 className="page-title">Solusi digital <span className="ital">lengkap</span> untuk bisnis Anda</h1>
              <p className="page-sub">Dari website custom hingga aplikasi mobile dan sistem enterprise — semua dibangun dari nol, cepat, dan siap tumbuh bersama bisnis Anda.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis tentang kebutuhan digital bisnis saya.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis</a>
                <Link className="btn btn-ghost btn-lg" to="/portofolio">Lihat Portofolio</Link>
              </div>
            </Reveal>
            <Reveal className="page-hero-stat-col">
              <HeroStatCard />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Category sections */}
      <div className="svc-pg-wrap">
        {SVC_CATS.map((cat) => {
          const catProds = products.filter((p) => cat.slugs.includes(p.slug))
          return (
            <section key={cat.id} className="svc-cat-sec">
              <div className="container">
                {/* Category header */}
                <Reveal className="svc-cat-hd">
                  <div className="svc-cat-ico"><Icon icon={cat.icon} /></div>
                  <div>
                    <div className="svc-cat-name">{cat.label}</div>
                    <div className="svc-cat-sub">{cat.sub}</div>
                  </div>
                </Reveal>

                {/* Cards grid */}
                <motion.div className="svc-pg-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
                  {catProds.map((p) => (
                    <motion.div key={p.slug} variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                      <Link to={`/layanan/${p.slug}`} className={`svc-item${p.hot ? ' hot' : ''}`}>
                        {p.hot && <span className="hot-tag">Terpopuler</span>}
                        <div className="svc-item-hd">
                          <div className="svc-item-ico"><Icon icon={p.icon} /></div>
                          <span className="svc-item-metric">{p.metric}</span>
                        </div>
                        <div className="svc-item-name">{p.name}</div>
                        <p className="svc-item-desc">{p.desc}</p>
                        <div className="svc-item-cta">
                          Lihat detail <Icon icon="fa-solid fa-arrow-right" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          )
        })}
      </div>

      {/* CTA */}
      <section className="cta-band">
        <Reveal className="cta-card">
          <h2>Tidak yakin layanan mana yang <span className="ital">tepat</span>?</h2>
          <p>Ceritakan kebutuhan bisnis Anda — kami bantu pilihkan solusi terbaik. Konsultasi gratis, tanpa komitmen.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis tentang kebutuhan digital bisnis saya.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis</a>
            <Link className="btn btn-ghost btn-lg" to="/ajukan-proyek"><Icon icon="fa-solid fa-rocket" /> Ajukan Proyek</Link>
          </div>
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
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Tentang Kami' }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-award" /> Tentang Kami</div>
              <h1 className="page-title">Software house yang <span className="ital">berpihak</span> pada bisnis Anda</h1>
              <p className="page-sub">Kami bukan sekadar vendor. Kami adalah mitra digital jangka panjang yang ikut berpikir, berkonsultasi, dan membangun bersama Anda.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin berkenalan dan berdiskusi tentang proyek saya.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis</a>
                <Link className="btn btn-ghost btn-lg" to="/kontak">Lihat Kontak</Link>
              </div>
            </Reveal>
            <Reveal className="page-hero-stat-col">
              <HeroStatCard />
            </Reveal>
          </div>
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
/* ── Contact Form with EmailJS ── */
const EMAILJS_SERVICE  = 'service_7w4dccc'
const EMAILJS_TEMPLATE = 'template_0ogubg3'
const EMAILJS_KEY      = 'ig9sNOB9hNjTymRoP'

const JENIS_OPTS = ['Landing Page', 'Website Profil / Company Profile', 'Toko Online', 'Aplikasi Mobile', 'Web App / Dashboard', 'Sistem ERP', 'Sistem CRM', 'Lainnya']

export function Contact() {
  const title = 'Kontak AFSS — Konsultasi Gratis via WhatsApp, Email & Form'
  const desc = 'Hubungi AFSS untuk konsultasi gratis pembuatan website, aplikasi mobile, dan sistem digital. WhatsApp, email, atau isi form kontak kami.'

  const [form, setForm] = useState({ nama: '', wa: '', jenis: '', pesan: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.nama.trim()) e.nama = 'Nama wajib diisi'
    if (!form.wa.trim()) e.wa = 'Nomor WhatsApp / email wajib diisi'
    if (!form.jenis) e.jenis = 'Pilih jenis kebutuhan'
    if (!form.pesan.trim()) e.pesan = 'Ceritakan kebutuhan Anda'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('sending')
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        from_name: form.nama,
        from_contact: form.wa,
        jenis_proyek: form.jenis,
        message: form.pesan,
        to_email: BRAND.email,
      }, EMAILJS_KEY)
      setStatus('sent')
    } catch {
      // Fallback: redirect ke WA dengan data form
      const msg = `Halo ${BRAND.short},%0Anama: ${form.nama}%0AKontak: ${form.wa}%0AKebutuhan: ${form.jenis}%0APesan: ${form.pesan}`
      window.open(`https://wa.me/628139694307?text=${msg}`, '_blank')
      setStatus('sent')
    }
  }

  const methods = [
    { icon: 'fa-brands fa-whatsapp', title: 'WhatsApp', value: BRAND.phone, sub: 'Respons paling cepat — rata-rata < 5 menit.', href: waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis.`), cta: 'Chat Sekarang', color: 'var(--wa)' },
    { icon: 'fa-solid fa-envelope', title: 'Email', value: BRAND.email, sub: 'Untuk brief detail, RFQ, atau lampiran dokumen.', href: `mailto:${BRAND.email}`, cta: 'Kirim Email', color: 'var(--blue)' },
    { icon: 'fa-solid fa-location-dot', title: 'Lokasi', value: BRAND.address, sub: 'Meeting tatap muka tersedia — hubungi untuk jadwal.', href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.address)}`, cta: 'Buka Maps', color: 'var(--accent)' },
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
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Kontak' }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-comments" /> Kontak</div>
              <h1 className="page-title">Mari <span className="ital">ngobrol</span> tentang proyek Anda</h1>
              <p className="page-sub">Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan bisnis Anda dan kami bantu temukan solusi terbaik dalam 1×24 jam kerja.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-wa btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Chat Langsung</a>
                <a className="btn btn-ghost btn-lg" href="#contact-form">Isi Form <Icon icon="fa-solid fa-arrow-down" /></a>
              </div>
            </Reveal>
            <Reveal className="page-hero-stat-col"><HeroStatCard /></Reveal>
          </div>
        </div>
      </section>

      {/* Contact methods */}
      <section style={{ paddingBottom: 0 }}>
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
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="container container-narrow">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-paper-plane" /> Form Kontak</div>
            <h2 className="sec-title">Atau isi form ini — kami <span className="ital">respons dalam 1×24 jam</span></h2>
          </Reveal>

          {status === 'sent' ? (
            <Reveal className="contact-success">
              <div className="success-ico"><Icon icon="fa-solid fa-circle-check" /></div>
              <h3>Pesan terkirim!</h3>
              <p>Terima kasih, <strong>{form.nama}</strong>. Tim kami akan menghubungi <strong>{form.wa}</strong> dalam 1×24 jam kerja.</p>
              <a href={waLink(`Halo ${BRAND.short}, saya baru isi form kontak — nama ${form.nama}. Ingin follow up lebih cepat.`)} target="_blank" rel="noreferrer" className="btn btn-wa btn-lg" style={{ marginTop: 24 }}>
                <Icon icon="fa-brands fa-whatsapp" /> Follow Up via WhatsApp
              </a>
            </Reveal>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="cf-row">
                <div className={`cf-field${errors.nama ? ' error' : ''}`}>
                  <label>Nama Lengkap *</label>
                  <input type="text" value={form.nama} onChange={set('nama')} placeholder="Budi Santoso" />
                  {errors.nama && <span className="cf-err">{errors.nama}</span>}
                </div>
                <div className={`cf-field${errors.wa ? ' error' : ''}`}>
                  <label>WhatsApp / Email *</label>
                  <input type="text" value={form.wa} onChange={set('wa')} placeholder="+62 812 xxxx / email@bisnis.com" />
                  {errors.wa && <span className="cf-err">{errors.wa}</span>}
                </div>
              </div>
              <div className={`cf-field${errors.jenis ? ' error' : ''}`}>
                <label>Saya butuh bantuan untuk *</label>
                <select value={form.jenis} onChange={set('jenis')}>
                  <option value="">— Pilih jenis kebutuhan —</option>
                  {JENIS_OPTS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                {errors.jenis && <span className="cf-err">{errors.jenis}</span>}
              </div>
              <div className={`cf-field${errors.pesan ? ' error' : ''}`}>
                <label>Ceritakan kebutuhan Anda *</label>
                <textarea value={form.pesan} onChange={set('pesan')} rows={5} placeholder="Bisnis saya bergerak di bidang... Saya ingin membuat... Target waktu launching..." />
                {errors.pesan && <span className="cf-err">{errors.pesan}</span>}
              </div>
              <button type="submit" className="btn btn-pri btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
                {status === 'sending' ? <><Icon icon="fa-solid fa-spinner fa-spin" /> Mengirim...</> : <><Icon icon="fa-solid fa-paper-plane" /> Kirim Pesan</>}
              </button>
              <p style={{ textAlign: 'center', fontSize: '.8rem', color: 'var(--muted)', marginTop: 12 }}>
                Tidak suka form? <a href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi langsung.`)} target="_blank" rel="noreferrer" className="accent-link">Chat langsung via WhatsApp →</a>
              </p>
            </form>
          )}

          <Reveal style={{ marginTop: 52, textAlign: 'center', padding: '24px', background: 'var(--paper-2)', borderRadius: 'var(--r)', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
              <div><strong style={{ display: 'block', color: 'var(--ink)', marginBottom: 4 }}>Senin – Jumat</strong><span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>08.00 – 17.00 WIB</span></div>
              <div><strong style={{ display: 'block', color: 'var(--ink)', marginBottom: 4 }}>Sabtu</strong><span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>09.00 – 13.00 WIB</span></div>
              <div><strong style={{ display: 'block', color: 'var(--ink)', marginBottom: 4 }}>Respons WA</strong><span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>Di luar jam kerja, balas besok pagi</span></div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ PORTFOLIO (/portofolio) */
/* ── Hover-zoom image (Tokopedia-style: zoom follows cursor) ── */
function ZoomImage({ src, alt, className }) {
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
function PortoMock({ p }) {
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

const PORTO_TABS = [
  { label: 'Semua', slug: 'semua' },
  { label: 'Landing Page', slug: 'landing-page' },
  { label: 'Company Profile', slug: 'company-profile' },
  { label: 'Software Custom', slug: 'software-custom' },
  { label: 'ERP', slug: 'erp' },
  { label: 'App Mobile', slug: 'app-mobile' },
  { label: 'E-Commerce', slug: 'ecommerce' },
  { label: 'Marketplace', slug: 'marketplace' },
]

export function Portfolio() {
  const title = 'Portofolio AFSS — Landing Page, Company Profile, Software, ERP, App & Marketplace'
  const desc = 'Lihat karya nyata AFSS: landing page UMKM, company profile, software custom, ERP, app mobile, e-commerce, dan marketplace. Klik untuk detail & hasil.'
  const [activeTab, setActiveTab] = useState('semua')

  const filtered = activeTab === 'semua'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.catSlug === activeTab)

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
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Portofolio' }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-images" /> Portofolio</div>
              <h1 className="page-title">Karya nyata &amp; <span className="ital">hasil terukur</span></h1>
              <p className="page-sub">{portfolioProjects.length} proyek dari berbagai industri — klik kartu untuk lihat detail masalah, solusi, fitur, dan testimoni klien.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-wa btn-lg" href={waLink(`Halo ${BRAND.short}, saya tertarik berdiskusi tentang proyek digital saya.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Diskusi Proyek</a>
                <Link className="btn btn-ghost btn-lg" to="/estimasi"><Icon icon="fa-solid fa-calculator" /> Estimasi Harga</Link>
              </div>
            </Reveal>
            <Reveal className="page-hero-stat-col"><HeroStatCard /></Reveal>
          </div>
        </div>
      </section>

      {/* Tab filter */}
      <div className="porto-tabs-wrap">
        <div className="container">
          <div className="porto-tabs">
            {PORTO_TABS.map(t => (
              <button key={t.slug} className={`porto-tab${activeTab === t.slug ? ' active' : ''}`} onClick={() => setActiveTab(t.slug)}>
                {t.label}
                <span className="porto-tab-count">{t.slug === 'semua' ? portfolioProjects.length : portfolioProjects.filter(p => p.catSlug === t.slug).length}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="porto-grid"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              {filtered.map((p, i) => (
                <motion.div key={p.slug} className="porto-card spot" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/portofolio/${p.slug}`} className="porto-card-link">
                    <PortoMock p={p} />
                    <div className="porto-card-body">
                      <div className="porto-card-meta">
                        <span className="porto-cat-badge">{p.cat}</span>
                        <span className="porto-budget">{p.budget}</span>
                      </div>
                      <h3 className="porto-card-title">{p.title}</h3>
                      <p className="porto-card-tagline">{p.tagline}</p>
                      <div className="porto-card-result"><Icon icon="fa-solid fa-arrow-trend-up" /> {p.result} <span>— {p.result2}</span></div>
                      <div className="porto-card-tags">{p.tags.slice(0,3).map(t => <span key={t}>{t}</span>)}</div>
                    </div>
                    <div className="porto-card-footer">
                      <span>Lihat Detail Proyek</span>
                      <Icon icon="fa-solid fa-arrow-right" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
              <Icon icon="fa-solid fa-folder-open" style={{ fontSize: '2rem', marginBottom: 12, opacity: .4 }} />
              <p>Belum ada proyek di kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>Proyek Anda bisa jadi <span className="ital">karya berikutnya</span></h2>
          <p>Ceritakan kebutuhan bisnis Anda — kami bantu wujudkan dengan standar yang sama.</p>
          <div className="btns">
            <a className="btn btn-wa btn-lg" href={waLink(`Halo ${BRAND.short}, saya tertarik berdiskusi tentang proyek digital saya.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Diskusi Proyek</a>
            <Link className="btn btn-ghost btn-lg" to="/estimasi">Estimasi Harga <Icon icon="fa-solid fa-calculator" /></Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ PORTFOLIO DETAIL (/portofolio/:slug) */
export function PortfolioDetail() {
  const { slug } = useParams()
  const p = portfolioProjects.find(x => x.slug === slug)

  if (!p) return (
    <section className="page-hero">
      <div className="container">
        <h1 className="page-title">Proyek tidak ditemukan</h1>
        <Link to="/portofolio" className="btn btn-ghost" style={{ marginTop: 20 }}><Icon icon="fa-solid fa-arrow-left" /> Kembali ke Portofolio</Link>
      </div>
    </section>
  )

  const url = `${SITE_URL}/portofolio/${p.slug}`

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
      </Head>

      {/* Hero banner */}
      <section className="pd-hero" style={{ '--c': p.c, '--c2': p.c2 }}>
        <div className="pd-hero-bg" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Portofolio', to: '/portofolio' }, { label: p.title }]} />
            <span className="pd-cat-badge">{p.cat}</span>
            <h1 className="pd-title">{p.title}</h1>
            <p className="pd-tagline">{p.tagline}</p>
            <div className="pd-stats">
              <div className="pd-stat"><Icon icon="fa-solid fa-tag" /><span className="pd-stat-label">Budget</span><span className="pd-stat-val">{p.budget}</span></div>
              <div className="pd-stat-div" />
              <div className="pd-stat"><Icon icon="fa-solid fa-arrow-trend-up" /><span className="pd-stat-label">Hasil Utama</span><span className="pd-stat-val">{p.result}</span></div>
              <div className="pd-stat-div" />
              <div className="pd-stat"><Icon icon="fa-solid fa-chart-line" /><span className="pd-stat-label">Detail</span><span className="pd-stat-val">{p.result2}</span></div>
            </div>
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
                <div className="pd-block-label"><Icon icon="fa-solid fa-circle-exclamation" /> Masalah Klien</div>
                <p>{p.problem}</p>
              </div>
              <div className="pd-block solution">
                <div className="pd-block-label"><Icon icon="fa-solid fa-circle-check" /> Solusi AFSS</div>
                <p>{p.solution}</p>
              </div>
            </div>
          </Reveal>

          {/* Benefit analysis (per feature) */}
          {p.benefits?.length > 0 && (
            <Reveal style={{ marginTop: 48 }}>
              <div className="eyebrow"><Icon icon="fa-solid fa-chart-line" /> Analisa Keuntungan</div>
              <h2 className="sec-title" style={{ fontSize: '1.6rem' }}>Kenapa sistem ini <span className="ital">menguntungkan bisnis</span></h2>
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
            <div className="eyebrow"><Icon icon="fa-solid fa-list-check" /> Fitur yang Dibangun</div>
            <h2 className="sec-title" style={{ fontSize: '1.6rem' }}>Yang kami bangun <span className="ital">untuk proyek ini</span></h2>
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
              <span className="pd-tech-label"><Icon icon="fa-solid fa-microchip" /> Teknologi</span>
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
                <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 12 }}><Icon icon="fa-solid fa-eye" /> Live Demo</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8, color: 'var(--ink)' }}>Lihat langsung sistemnya</h3>
                <p style={{ color: 'var(--muted)', fontSize: '.95rem', marginBottom: 20 }}>Demo aktif — coba login dengan berbagai role: Owner, Admin, Finance, PM, Mandor, Warehouse.</p>
                <a className="btn btn-pri btn-lg" href={p.visitUrl} target="_blank" rel="noreferrer">
                  <Icon icon="fa-solid fa-arrow-up-right-from-square" /> Buka Demo Sistem
                </a>
              </div>
            </Reveal>
          )}

          {/* CTA */}
          <Reveal style={{ marginTop: 56, textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 12, color: 'var(--ink)', letterSpacing: '-.03em' }}>Tertarik dengan proyek serupa?</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 28 }}>Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan Anda.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a className="btn btn-wa btn-lg" href={waLink(`Halo ${BRAND.short}, saya tertarik proyek serupa dengan "${p.title}". Boleh konsultasi?`)} target="_blank" rel="noreferrer">
                <Icon icon="fa-brands fa-whatsapp" /> Diskusi Proyek Serupa
              </a>
              <Link className="btn btn-ghost btn-lg" to="/portofolio">
                <Icon icon="fa-solid fa-arrow-left" /> Lihat Portofolio Lain
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ ESTIMASI (/estimasi) */
const EST_PRODS = [
  { id: 'landing',     label: 'Landing Page',    base: [1.5, 5],   perUnit: 0.4, unit: 'halaman', icon: 'fa-solid fa-rectangle-ad' },
  { id: 'profile',     label: 'Company Profile', base: [4.5, 12],  perUnit: 0.6, unit: 'halaman', icon: 'fa-solid fa-briefcase' },
  { id: 'software',    label: 'Software Custom', base: [8, 30],    perUnit: 2,   unit: 'modul',   icon: 'fa-solid fa-code' },
  { id: 'erp',         label: 'ERP',             base: [28, 100],  perUnit: 5,   unit: 'modul',   icon: 'fa-solid fa-circle-nodes' },
  { id: 'ecommerce',   label: 'E-Commerce',      base: [18, 50],   perUnit: 2.5, unit: 'modul',   icon: 'fa-solid fa-cart-shopping' },
  { id: 'marketplace', label: 'Marketplace',     base: [65, 150],  perUnit: 8,   unit: 'modul',   icon: 'fa-solid fa-store' },
]
const EST_ADDONS_PG = [
  { id: 'seo',     label: 'SEO On-page Lengkap',       price: 1.5 },
  { id: 'hosting', label: 'Domain + Hosting 1 Tahun',  price: 0.8 },
  { id: 'payment', label: 'Payment Gateway',           price: 2   },
  { id: 'wa',      label: 'Integrasi WhatsApp API',    price: 1.5 },
  { id: 'maint',   label: 'Maintenance 3 Bulan',       price: 2.4 },
  { id: 'uiux',    label: 'Desain Custom UI/UX',       price: 3   },
]
function fmtPg(v) { return v >= 1000 ? `Rp ${(v/1000).toFixed(0)} M` : `Rp ${v%1===0?v:v.toFixed(1)} Jt` }

export function Estimasi() {
  const title = 'Estimasi Harga Proyek — AFSS'
  const desc = 'Hitung estimasi biaya pembuatan website, software, ERP, e-commerce, atau marketplace. Pilih jenis proyek, jumlah modul, dan add-on yang dibutuhkan.'

  const [prodId, setProdId] = useState('profile')
  const [units, setUnits] = useState(5)
  const [addons, setAddons] = useState({})

  const prod = EST_PRODS.find(p => p.id === prodId)
  const addonTotal = EST_ADDONS_PG.filter(a => addons[a.id]).reduce((s,a) => s+a.price, 0)
  const low  = prod.base[0] + (units-1)*prod.perUnit + addonTotal
  const high = prod.base[1] + (units-1)*prod.perUnit*1.6 + addonTotal
  const toggle = id => setAddons(a => ({ ...a, [id]: !a[id] }))
  const waMsg = encodeURIComponent(`Halo AFSS, saya ingin konsultasi proyek:\n- Jenis: ${prod.label}\n- ${units} ${prod.unit}\n- Estimasi: ${fmtPg(low)} – ${fmtPg(high)}\n\nBoleh diskusi lebih lanjut?`)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/estimasi`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/estimasi`} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Estimasi Harga' }]} />
            <div className="eyebrow"><Icon icon="fa-solid fa-calculator" /> Estimasi Harga</div>
            <h1 className="page-title">Berapa estimasi biaya <span className="ital">proyek Anda</span>?</h1>
            <p className="page-sub">Pilih jenis proyek, jumlah halaman/modul, dan layanan tambahan — dapatkan estimasi harga awal secara instan. Gratis, tanpa komitmen.</p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 20, paddingBottom: 80, background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 900px 500px at 50% -10%, rgba(37,99,255,.22), transparent 60%), radial-gradient(circle 400px at 90% 100%, rgba(16,199,178,.16), transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="est-wrap">
            <div className="est-left">
              <div className="est-step">
                <div className="est-step-label"><span>1</span> Jenis Produk</div>
                <div className="est-prod-grid">
                  {EST_PRODS.map(p => (
                    <button key={p.id} className={`est-prod-btn${prodId===p.id?' active':''}`} onClick={() => { setProdId(p.id); setUnits(5) }}>
                      <Icon icon={p.icon} /><span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="est-step">
                <div className="est-step-label"><span>2</span> Jumlah {prod.unit} — <strong>{units} {prod.unit}</strong></div>
                <input type="range" min="1" max="15" value={units} onChange={e => setUnits(+e.target.value)} className="est-slider" />
                <div className="est-slider-marks"><span>1</span><span>5</span><span>10</span><span>15</span></div>
              </div>
              <div className="est-step">
                <div className="est-step-label"><span>3</span> Layanan Tambahan</div>
                <div className="est-addons">
                  {EST_ADDONS_PG.map(a => (
                    <button key={a.id} className={`est-addon-btn${addons[a.id]?' active':''}`} onClick={() => toggle(a.id)}>
                      <span className={`est-addon-check${addons[a.id]?' on':''}`}><Icon icon="fa-solid fa-check" /></span>
                      <span className="est-addon-label">{a.label}</span>
                      <span className="est-addon-price">+ {fmtPg(a.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="est-result">
              <div className="est-result-inner">
                <div className="est-result-label">Estimasi Awal Project</div>
                <motion.div className="est-result-low" key={`${prodId}-${units}-${JSON.stringify(addons)}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  {fmtPg(low)}
                </motion.div>
                <div className="est-result-range">s/d <strong>{fmtPg(high)}</strong></div>
                <div className="est-divider" />
                <div className="est-breakdown">
                  <div className="est-brow"><span>Base {prod.label}</span><span>{fmtPg(prod.base[0])} – {fmtPg(prod.base[1])}</span></div>
                  <div className="est-brow"><span>{units} {prod.unit} × {fmtPg(prod.perUnit)}</span><span>+{fmtPg((units-1)*prod.perUnit)}</span></div>
                  {addonTotal > 0 && <div className="est-brow accent"><span>Add-on terpilih</span><span>+{fmtPg(addonTotal)}</span></div>}
                </div>
                <div className="est-divider" />
                <p className="est-note">Estimasi awal — harga final menyesuaikan tingkat kesulitan, integrasi, dan kebutuhan khusus.</p>
                <a href={`https://wa.me/628139694307?text=${waMsg}`} target="_blank" rel="noreferrer" className="btn btn-wa" style={{ width:'100%', justifyContent:'center', marginTop: 8 }}>
                  <Icon icon="fa-brands fa-whatsapp" /> Konsultasi Estimasi Ini
                </a>
                <Link to="/ajukan-proyek" className="btn btn-ghost" style={{ width:'100%', justifyContent:'center', marginTop: 10 }}>
                  <Icon icon="fa-solid fa-file-pen" /> Ajukan Brief Proyek
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <Reveal className="cta-card">
          <h2>Butuh angka yang <span className="ital">lebih pasti</span>?</h2>
          <p>Konsultasi gratis 30 menit — kami bantu tentukan scope yang tepat dan estimasi yang akurat untuk proyek Anda.</p>
          <div className="btns">
            <a className="btn btn-wa btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi estimasi harga proyek saya.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis</a>
            <Link className="btn btn-ghost btn-lg" to="/portofolio"><Icon icon="fa-solid fa-images" /> Lihat Portofolio</Link>
          </div>
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
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/privacy`} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
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
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/terms`} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
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

/* ══════════════════════════════════════════════════ KEUNGGULAN (/keunggulan) */
export function Keunggulan() {
  const title = 'Keunggulan AFSS — Kenapa Memilih Kami?'
  const desc = '4 alasan utama kenapa 50+ perusahaan mempercayakan proyek digital mereka ke AFSS: kode bersih, cepat SEO-ready, tim lokal, dan harga transparan.'
  const guarantees = [
    { icon: 'fa-solid fa-certificate', label: 'Garansi bug 30–90 hari' },
    { icon: 'fa-solid fa-code', label: 'Kode & dokumentasi milik Anda' },
    { icon: 'fa-solid fa-headset', label: 'Support prioritas pasca-launching' },
    { icon: 'fa-solid fa-shield-halved', label: 'Kerahasiaan proyek terjamin' },
  ]
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/keunggulan`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/keunggulan`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Keunggulan' }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-award" /> Keunggulan</div>
              <h1 className="page-title">Kenapa memilih <span className="ital">AFSS</span>?</h1>
              <p className="page-sub">Kami membangun kemitraan jangka panjang — bukan sekadar proyek sekali jalan. Inilah yang membedakan kami dari vendor lain.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis tentang kebutuhan digital bisnis saya.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis</a>
                <Link className="btn btn-ghost btn-lg" to="/layanan">Lihat Layanan</Link>
              </div>
            </Reveal>
            <Reveal className="page-hero-stat-col">
              <HeroStatCard />
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <motion.div className="why-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {why.map((w) => (
              <motion.div key={w.title} className="why-card spot" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} onMouseMove={onSpot}>
                <div className="why-ico"><Icon icon={w.icon} /></div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="whyus" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-shield-halved" /> Jaminan Kami</div>
            <h2 className="sec-title">Yang kami <span className="ital">janjikan</span> di setiap proyek</h2>
          </Reveal>
          <motion.div className="tech-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {guarantees.map((g) => (
              <motion.div key={g.label} className="tech-chip" variants={fadeUp} whileHover={{ y: -4 }}>
                <Icon icon={g.icon} /> <span>{g.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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

      <section className="cta-band" style={{ paddingTop: 80 }}>
        <Reveal className="cta-card">
          <h2>Siap bekerja sama dengan tim yang <span className="ital">berpihak</span> pada Anda?</h2>
          <p>Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan bisnis Anda dan kami bantu temukan solusi terbaik.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi gratis.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis</a>
            <Link className="btn btn-ghost btn-lg" to="/layanan">Lihat Layanan Kami</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ HARGA (/harga) */
export function Harga() {
  const title = 'Harga Jasa Website, Aplikasi & Sistem | AFSS — Transparan, Tanpa Biaya Tersembunyi'
  const desc = 'Landing page Rp 1,5 jt, company profile Rp 6 jt, ERP Rp 20 jt, app mobile Rp 15 jt, e-commerce Rp 35 jt, marketplace Rp 50 jt. Paket kombinasi hemat tersedia.'

  const catColor = { 'Website': 'var(--accent)', 'Sistem': '#1E88A8', 'Mobile': '#8B5CF6', 'E-Commerce': '#D97706' }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/harga`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/harga`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
      </Head>

      {/* Hero */}
      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Harga' }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-tags" /> Harga</div>
              <h1 className="page-title">Harga <span className="ital">transparan</span>, tanpa biaya tersembunyi</h1>
              <p className="page-sub">Semua harga adalah estimasi awal. Harga final ditentukan setelah konsultasi gratis dan ruang lingkup proyek disepakati bersama.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin tanya harga untuk proyek digital saya.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Tanya Harga Gratis</a>
                <Link className="btn btn-ghost btn-lg" to="/ajukan-proyek"><Icon icon="fa-solid fa-rocket" /> Ajukan Proyek</Link>
              </div>
            </Reveal>
            <Reveal className="page-hero-stat-col"><HeroStatCard /></Reveal>
          </div>
        </div>
      </section>

      {/* ── Produk individual ── */}
      <section style={{ paddingTop: 60, paddingBottom: 24 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-box-open" /> Produk</div>
            <h2 className="sec-title">Harga per <span className="ital">produk</span></h2>
            <p className="sec-sub">Pilih produk sesuai kebutuhan, atau lihat paket kombinasi hemat di bawah.</p>
          </Reveal>
          <motion.div className="price-prod-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {pricing.map((p) => (
              <motion.div key={p.name} className={`price-prod-card${p.hot ? ' hot' : ''}`} variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                {p.hot && <span className="hot-tag">Paling diminati</span>}
                <div className="price-prod-top">
                  <div className="price-prod-ico" style={{ color: catColor[p.category], background: `color-mix(in srgb, ${catColor[p.category]} 12%, transparent)` }}>
                    <Icon icon={p.icon} />
                  </div>
                  <span className="price-prod-cat" style={{ color: catColor[p.category], background: `color-mix(in srgb, ${catColor[p.category]} 10%, transparent)`, borderColor: `color-mix(in srgb, ${catColor[p.category]} 25%, transparent)` }}>
                    {p.category}
                  </span>
                </div>
                <div className="price-prod-name">{p.name}</div>
                <p className="price-prod-desc">{p.desc}</p>
                <div className="price-prod-price-wrap">
                  <div className="price-prod-note">{p.note}</div>
                  <div className="price-prod-price">{p.price}</div>
                </div>
                <ul className="price-prod-feats">
                  {p.feats.map((f) => <li key={f}><Icon icon="fa-solid fa-check" /> {f}</li>)}
                </ul>
                <a className="btn btn-pri" href={waLink(`Halo ${BRAND.short}, saya tertarik dengan ${p.name} (${p.price}). Boleh konsultasi?`)} target="_blank" rel="noreferrer">
                  Konsultasi <Icon icon="fa-solid fa-arrow-right" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Paket kombinasi ── */}
      <section style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> Paket Kombinasi</div>
            <h2 className="sec-title">Bundle lebih hemat, <span className="ital">hasil lebih lengkap</span></h2>
            <p className="sec-sub">Kombinasi produk yang sering dipakai bersama — dengan harga lebih terjangkau dibanding beli terpisah.</p>
          </Reveal>
          <motion.div className="price-bundle-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {pricingBundles.map((b) => (
              <motion.div key={b.name} className={`price-bundle-card${b.hot ? ' hot' : ''}`} variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
                <div className="price-bundle-top">
                  <div className="price-bundle-ico"><Icon icon={b.icon} /></div>
                  <span className="price-bundle-tag">{b.tag}</span>
                </div>
                <div className="price-bundle-name">{b.name}</div>
                <p className="price-bundle-desc">{b.desc}</p>
                <ul className="price-bundle-items">
                  {b.items.map((item) => (
                    <li key={item} className="price-bundle-item"><Icon icon="fa-solid fa-circle-check" /> {item}</li>
                  ))}
                </ul>
                <div className="price-bundle-price-row">
                  <div>
                    {b.normalPrice && <div className="price-bundle-normal">{b.normalPrice}</div>}
                    <div className="price-bundle-price">{b.price}</div>
                  </div>
                  <span className="price-bundle-save">{b.save}</span>
                </div>
                <a className="btn" href={waLink(`Halo ${BRAND.short}, saya tertarik dengan ${b.name} (${b.price}). Boleh konsultasi lebih lanjut?`)} target="_blank" rel="noreferrer">
                  Mulai Konsultasi <Icon icon="fa-solid fa-arrow-right" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>Tidak yakin produk atau paket mana yang <span className="ital">tepat</span>?</h2>
          <p>Ceritakan kebutuhan bisnis Anda — kami bantu pilihkan solusi yang paling sesuai. Konsultasi gratis, tanpa komitmen.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin konsultasi pilihan paket yang sesuai untuk bisnis saya.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis</a>
            <Link className="btn btn-ghost btn-lg" to="/ajukan-proyek"><Icon icon="fa-solid fa-rocket" /> Ajukan Proyek</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ FAQ PAGE (/faq) */
export function Faq() {
  const [open, setOpen] = useState(-1)
  const title = 'FAQ — Pertanyaan yang Sering Ditanyakan | AFSS'
  const desc = 'Jawaban untuk pertanyaan umum seputar jasa pembuatan website, aplikasi, biaya, timeline, garansi, dan cara kerja AFSS.'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/faq`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/faq`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'FAQ' }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-circle-question" /> FAQ</div>
              <h1 className="page-title">Pertanyaan yang <span className="ital">sering</span> ditanyakan</h1>
              <p className="page-sub">Belum menemukan jawabannya? Hubungi kami langsung via WhatsApp untuk konsultasi gratis.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya ada pertanyaan tentang layanan Anda.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Tanya via WhatsApp</a>
                <Link className="btn btn-ghost btn-lg" to="/kontak">Lihat Kontak</Link>
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
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
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
          <h2>Masih ada pertanyaan <span className="ital">lain</span>?</h2>
          <p>Hubungi kami langsung — kami siap membantu Anda menemukan jawaban dan solusi terbaik untuk bisnis Anda.</p>
          <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya ada pertanyaan tentang layanan Anda.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Tanya via WhatsApp</a>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ KARIR (/karir) */
const JOBS = [
  {
    pos: 'Full-Stack Web Developer',
    type: 'Full-time · Remote/Hybrid',
    badge: 'Prioritas',
    badgeColor: 'var(--blue)',
    desc: 'Membangun website, web app, dan API untuk klien dari berbagai industri. Bertanggung jawab dari desain database sampai deployment.',
    skills: ['Next.js / React', 'Node.js + PostgreSQL', 'REST API & integrasi third-party', 'Pengalaman min. 1 tahun'],
    salary: 'Negosiasi + project bonus',
  },
  {
    pos: 'Flutter Mobile Developer',
    type: 'Full-time · Remote',
    badge: 'Buka',
    badgeColor: '#10C7B2',
    desc: 'Membangun aplikasi Android & iOS dengan Flutter. Berkolaborasi dengan backend developer dan desainer untuk deliver aplikasi yang siap publish ke store.',
    skills: ['Flutter & Dart', 'State management (Riverpod/BLoC)', 'Integrasi REST API & Firebase', 'Pengalaman min. 1 tahun'],
    salary: 'Negosiasi + project bonus',
  },
  {
    pos: 'UI/UX Designer',
    type: 'Full-time · Remote/Freelance',
    badge: 'Buka',
    badgeColor: '#10C7B2',
    desc: 'Merancang pengalaman pengguna yang intuitif dan antarmuka yang bersih untuk produk klien AFSS — website, dashboard, hingga aplikasi mobile.',
    skills: ['Figma (wajib)', 'User research & wireframing', 'Design system & component library', 'Memahami dasar frontend adalah nilai plus'],
    salary: 'Per proyek / retainer',
  },
  {
    pos: 'Digital Marketing & Sales',
    type: 'Full-time · Remote',
    badge: 'Buka',
    badgeColor: '#10C7B2',
    desc: 'Memperkenalkan layanan AFSS ke bisnis di seluruh Indonesia melalui media sosial, jaringan bisnis, dan strategi konten. Target-driven dengan komisi menarik.',
    skills: ['Kemampuan komunikasi & presentasi', 'Pengalaman sales B2B / digital agency', 'Memahami LinkedIn, Instagram, dan cold outreach', 'Memiliki jaringan pengusaha adalah nilai plus'],
    salary: 'Gaji pokok + komisi closing',
  },
  {
    pos: 'Project Manager',
    type: 'Part-time / Freelance',
    badge: 'Buka',
    badgeColor: '#10C7B2',
    desc: 'Memastikan proyek klien berjalan on-track, on-budget, dan on-scope. Menjadi jembatan antara tim developer dan klien agar komunikasi selalu lancar.',
    skills: ['Pengalaman PM di software house / startup', 'Mahir menggunakan tools PM (Notion, Linear, Jira)', 'Kemampuan komunikasi klien yang baik', 'Memahami siklus development (discovery → launch)'],
    salary: 'Per proyek / retainer',
  },
  {
    pos: 'Content Writer (Tech)',
    type: 'Freelance · Remote',
    badge: 'Buka',
    badgeColor: '#10C7B2',
    desc: 'Menulis artikel blog SEO tentang teknologi, software bisnis, dan transformasi digital untuk audiens pelaku usaha Indonesia.',
    skills: ['Kemampuan menulis konten SEO', 'Memahami topik teknologi & bisnis digital', 'Riset keyword dasar', 'Konsisten dan tepat deadline'],
    salary: 'Per artikel (negosiasi)',
  },
]

export function Karir() {
  const title = 'Karir di AFSS — Lowongan Developer, Designer, Marketing & PM'
  const desc = 'Bergabung dengan AFSS. Kami buka lowongan Full-Stack Developer, Flutter Developer, UI/UX Designer, Digital Marketing, Project Manager, dan Content Writer.'
  const [selectedJob, setSelectedJob] = useState(null)

  const benefits = [
    { icon: 'fa-solid fa-coins', title: 'Kompensasi Kompetitif', desc: 'Gaji + bonus project. Semakin bagus output, semakin besar reward.' },
    { icon: 'fa-solid fa-laptop-house', title: 'Remote-First', desc: 'Kerja dari mana saja. Output yang dinilai, bukan jam duduk di kursi.' },
    { icon: 'fa-solid fa-graduation-cap', title: 'Belajar Terus', desc: 'Akses kursus, conference, dan buku teknis. Kami invest di pertumbuhan tim.' },
    { icon: 'fa-solid fa-people-group', title: 'Tim yang Solid', desc: 'Kolaborasi dengan developer, desainer, dan PM yang saling support.' },
  ]
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/karir`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/karir`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Karir' }]} />
              <div className="eyebrow green"><Icon icon="fa-solid fa-briefcase" /> Karir</div>
              <h1 className="page-title">Bangun karir di <span className="ital">AFSS</span></h1>
              <p className="page-sub">Kami mencari developer, desainer, PM, dan marketer yang ingin ikut membangun produk digital untuk bisnis Indonesia — remote-first, output-driven.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href="#lowongan">Lihat Lowongan <Icon icon="fa-solid fa-arrow-down" /></a>
                <a className="btn btn-ghost btn-lg" href={`mailto:${BRAND.email}`}><Icon icon="fa-solid fa-envelope" /> Kirim CV Spontan</a>
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
            <div className="eyebrow green"><Icon icon="fa-solid fa-star" /> Benefit</div>
            <h2 className="sec-title">Kenapa bergabung dengan <span className="ital">AFSS</span>?</h2>
          </Reveal>
          <motion.div className="why-home-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {benefits.map((b) => (
              <motion.div key={b.title} className="why-home-card spot" variants={fadeUp} whileHover={{ y: -5 }} onMouseMove={onSpot}>
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
            <div className="eyebrow"><Icon icon="fa-solid fa-rectangle-list" /> Lowongan Tersedia</div>
            <h2 className="sec-title">{JOBS.length} posisi yang <span className="ital">sedang dibuka</span></h2>
            <p className="sec-sub">Semua posisi terbuka untuk kandidat dari seluruh Indonesia. Remote-friendly kecuali disebutkan hybrid.</p>
          </Reveal>
          <motion.div className="jobs-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {JOBS.map((j) => (
              <motion.div key={j.pos} className="job-card spot" variants={fadeUp} whileHover={{ y: -4 }} onMouseMove={onSpot}>
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
                <a className="btn btn-pri" href={waLink(`Halo ${BRAND.short}, saya tertarik melamar posisi "${j.pos}". Boleh saya kirim CV?`)} target="_blank" rel="noreferrer">
                  <Icon icon="fa-brands fa-whatsapp" /> Lamar Posisi Ini
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>Tidak ada posisi yang <span className="ital">cocok</span> sekarang?</h2>
          <p>Kirim CV dan portofolio Anda — kami simpan untuk project atau lowongan berikutnya yang sesuai profil Anda.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={`mailto:${BRAND.email}?subject=CV Spontan - [Nama] [Posisi]`}><Icon icon="fa-solid fa-envelope" /> Kirim CV via Email</a>
            <a className="btn btn-ghost btn-lg" href={waLink(`Halo ${BRAND.short}, saya ingin mendaftar spontan untuk bergabung dengan tim AFSS.`)} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Chat Dulu</a>
          </div>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ AJUKAN PROYEK (/ajukan-proyek) */
export function AjukanProyek() {
  const [form, setForm] = useState({ nama: '', kontak: '', perusahaan: '', jenis: '', anggaran: '', timeline: '', deskripsi: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.nama.trim()) e.nama = 'Nama wajib diisi'
    if (!form.kontak.trim()) e.kontak = 'Email / WhatsApp wajib diisi'
    if (!form.jenis) e.jenis = 'Pilih jenis proyek'
    if (!form.deskripsi.trim()) e.deskripsi = 'Deskripsi proyek wajib diisi'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSending(true)
    const pesan = [
      form.perusahaan ? `Perusahaan: ${form.perusahaan}` : '',
      `Anggaran: ${form.anggaran || 'Belum ditentukan'}`,
      `Timeline: ${form.timeline || 'Belum ditentukan'}`,
      '',
      'Deskripsi Proyek:',
      form.deskripsi,
    ].filter(Boolean).join('\n')

    try {
      await emailjs.send('service_7w4dccc', 'template_0ogubg3', {
        from_name: form.nama,
        from_contact: form.kontak,
        jenis_proyek: `[BRIEF PROYEK] ${form.jenis}`,
        message: pesan,
        to_email: BRAND.email,
      }, 'ig9sNOB9hNjTymRoP')
    } catch {
      // Fallback to localStorage only
    }
    if (typeof window !== 'undefined') {
      const all = JSON.parse(localStorage.getItem('afss_submissions') || '[]')
      all.push({ id: Date.now(), ...form, status: 'Baru', tanggal: new Date().toISOString() })
      localStorage.setItem('afss_submissions', JSON.stringify(all))
    }
    setSending(false)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const title = 'Ajukan Proyek — AFSS | Mulai Proyek Digital Anda'
  const desc = 'Ajukan proyek website, aplikasi, atau sistem digital Anda ke AFSS. Ceritakan kebutuhan bisnis Anda dan tim kami akan menghubungi dalam 1×24 jam kerja.'

  if (submitted) {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="robots" content="noindex" />
        </Head>
        <section className="page-hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className="hero-glow" />
          <div className="container">
            <Reveal>
              <div className="form-success">
                <div className="success-ico"><Icon icon="fa-solid fa-circle-check" /></div>
                <h1 className="page-title">Pengajuan <span className="ital">terkirim!</span></h1>
                <p className="page-sub">Terima kasih, <strong>{form.nama}</strong>. Tim kami akan menghubungi Anda di <strong>{form.kontak}</strong> dalam 1×24 jam kerja untuk mendiskusikan proyek Anda.</p>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginTop: 32 }}>
                  <a className="btn btn-pri btn-lg" href={waLink(`Halo ${BRAND.short}, saya baru mengajukan proyek "${form.jenis}" melalui website AFSS. Nama saya ${form.nama}.`)} target="_blank" rel="noreferrer">
                    <Icon icon="fa-brands fa-whatsapp" /> Chat Langsung
                  </a>
                  <Link className="btn btn-ghost btn-lg" to="/">Kembali ke Beranda</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/ajukan-proyek`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/ajukan-proyek`} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Ajukan Proyek' }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-rocket" /> Ajukan Proyek</div>
              <h1 className="page-title">Mulai proyek <span className="ital">digital</span> Anda bersama kami</h1>
              <p className="page-sub">Ceritakan kebutuhan bisnis Anda melalui formulir berikut. Tim kami akan menghubungi Anda dalam 1×24 jam kerja untuk mendiskusikan lebih lanjut — tanpa biaya atau komitmen.</p>
            </Reveal>
            <Reveal className="page-hero-stat-col">
              <HeroStatCard />
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 40, paddingBottom: 100 }}>
        <div className="container container-narrow">
          <form className="proj-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Nama Lengkap <span className="form-req">*</span></label>
                <input className={`form-ctrl${errors.nama ? ' err' : ''}`} type="text" placeholder="Nama Anda" value={form.nama} onChange={set('nama')} />
                {errors.nama && <span className="form-err-msg">{errors.nama}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Email / WhatsApp <span className="form-req">*</span></label>
                <input className={`form-ctrl${errors.kontak ? ' err' : ''}`} type="text" placeholder="Email atau nomor WA aktif" value={form.kontak} onChange={set('kontak')} />
                {errors.kontak && <span className="form-err-msg">{errors.kontak}</span>}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Nama Perusahaan / Usaha</label>
                <input className="form-ctrl" type="text" placeholder="Opsional" value={form.perusahaan} onChange={set('perusahaan')} />
              </div>
              <div className="form-group">
                <label className="form-label">Jenis Proyek <span className="form-req">*</span></label>
                <select className={`form-ctrl${errors.jenis ? ' err' : ''}`} value={form.jenis} onChange={set('jenis')}>
                  <option value="">-- Pilih Jenis Proyek --</option>
                  <option>Website / Company Profile</option>
                  <option>Landing Page</option>
                  <option>Toko Online</option>
                  <option>Aplikasi Mobile (Android / iOS)</option>
                  <option>Web App / Dashboard</option>
                  <option>Sistem ERP</option>
                  <option>Maintenance &amp; Support</option>
                  <option>Lainnya</option>
                </select>
                {errors.jenis && <span className="form-err-msg">{errors.jenis}</span>}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Estimasi Anggaran</label>
                <select className="form-ctrl" value={form.anggaran} onChange={set('anggaran')}>
                  <option value="">-- Pilih Rentang --</option>
                  <option>Di bawah Rp 5 juta</option>
                  <option>Rp 5–15 juta</option>
                  <option>Rp 15–50 juta</option>
                  <option>Di atas Rp 50 juta</option>
                  <option>Belum tahu / fleksibel</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Target Waktu Selesai</label>
                <select className="form-ctrl" value={form.timeline} onChange={set('timeline')}>
                  <option value="">-- Pilih Target --</option>
                  <option>Kurang dari 1 bulan</option>
                  <option>1–3 bulan</option>
                  <option>3–6 bulan</option>
                  <option>Lebih dari 6 bulan</option>
                  <option>Belum tahu / fleksibel</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Deskripsi Proyek <span className="form-req">*</span></label>
              <textarea
                className={`form-ctrl form-ta${errors.deskripsi ? ' err' : ''}`}
                placeholder="Ceritakan kebutuhan Anda: fitur yang diinginkan, target pengguna, referensi desain, atau pertanyaan khusus..."
                rows={6}
                value={form.deskripsi}
                onChange={set('deskripsi')}
              />
              {errors.deskripsi && <span className="form-err-msg">{errors.deskripsi}</span>}
            </div>

            <div className="form-submit-row">
              <button className="btn btn-pri btn-lg" type="submit" disabled={sending}>
                {sending ? <><Icon icon="fa-solid fa-spinner fa-spin" /> Mengirim...</> : <><Icon icon="fa-solid fa-paper-plane" /> Kirim Pengajuan</>}
              </button>
              <p className="form-note">
                Atau langsung chat via{' '}
                <a href={waLink(`Halo ${BRAND.short}, saya ingin mengajukan proyek digital.`)} target="_blank" rel="noreferrer">
                  <Icon icon="fa-brands fa-whatsapp" /> WhatsApp
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ DASHBOARD ADMIN (/dashboard) */
const STATUS_LIST = ['Baru', 'Dihubungi', 'Proses', 'Selesai', 'Ditolak']
const ADMIN_PIN = 'afss2026'

export function Dashboard() {
  const [isClient, setIsClient] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [filter, setFilter] = useState('Semua')

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined' && sessionStorage.getItem('afss_admin') === ADMIN_PIN) {
      setUnlocked(true)
      loadSubs()
    }
  }, [])

  const loadSubs = () => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('afss_submissions') : null
    setSubmissions(raw ? [...JSON.parse(raw)].reverse() : [])
  }

  const login = (e) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('afss_admin', ADMIN_PIN)
      setUnlocked(true)
      setPinError(false)
      loadSubs()
    } else {
      setPinError(true)
    }
  }

  const updateStatus = (id, status) => {
    const all = JSON.parse(localStorage.getItem('afss_submissions') || '[]')
    localStorage.setItem('afss_submissions', JSON.stringify(all.map((s) => (s.id === id ? { ...s, status } : s))))
    loadSubs()
  }

  const del = (id) => {
    if (!window.confirm('Hapus pengajuan ini?')) return
    const all = JSON.parse(localStorage.getItem('afss_submissions') || '[]')
    localStorage.setItem('afss_submissions', JSON.stringify(all.filter((s) => s.id !== id)))
    loadSubs()
  }

  /* SSG — return nothing until client hydrates */
  if (!isClient) return null

  if (!unlocked) {
    return (
      <>
        <Head>
          <title>Admin Dashboard | AFSS</title>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <section className="page-hero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="hero-glow" />
          <div className="container">
            <Reveal>
              <div className="eyebrow"><Icon icon="fa-solid fa-lock" /> Admin Area</div>
              <h1 className="page-title">Dashboard <span className="ital">Admin</span></h1>
              <p className="page-sub" style={{ marginBottom: 32 }}>Masukkan PIN untuk mengakses dashboard pengajuan proyek.</p>
              <form className="pin-form" onSubmit={login}>
                <input
                  type="password"
                  className={`form-ctrl${pinError ? ' err' : ''}`}
                  placeholder="PIN Admin"
                  value={pin}
                  onChange={(e) => { setPin(e.target.value); setPinError(false) }}
                  autoFocus
                  style={{ maxWidth: 280 }}
                />
                {pinError && <p className="form-err-msg">PIN salah. Silakan coba lagi.</p>}
                <button className="btn btn-pri" type="submit" style={{ width: 'fit-content' }}>
                  Masuk <Icon icon="fa-solid fa-arrow-right" />
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </>
    )
  }

  const tabs = ['Semua', ...STATUS_LIST]
  const filtered = filter === 'Semua' ? submissions : submissions.filter((s) => s.status === filter)
  const countOf = (st) => submissions.filter((s) => s.status === st).length

  return (
    <>
      <Head>
        <title>Dashboard Pengajuan | AFSS Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      {/* Header */}
      <section className="page-hero" style={{ paddingBottom: 40 }}>
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <div className="eyebrow"><Icon icon="fa-solid fa-gauge-high" /> Admin</div>
            <h1 className="page-title">Dashboard <span className="ital">Pengajuan</span></h1>
            <p className="page-sub">Kelola semua pengajuan proyek yang masuk dari calon klien.</p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section style={{ paddingTop: 0, paddingBottom: 32 }}>
        <div className="container">
          <div className="dash-stats">
            <div className="dash-stat-card">
              <div className="dash-stat-n">{submissions.length}</div>
              <div className="dash-stat-l">Total Pengajuan</div>
            </div>
            <div className="dash-stat-card baru">
              <div className="dash-stat-n">{countOf('Baru')}</div>
              <div className="dash-stat-l">Belum Ditangani</div>
            </div>
            <div className="dash-stat-card proses">
              <div className="dash-stat-n">{countOf('Proses')}</div>
              <div className="dash-stat-l">Sedang Proses</div>
            </div>
            <div className="dash-stat-card selesai">
              <div className="dash-stat-n">{countOf('Selesai')}</div>
              <div className="dash-stat-l">Selesai</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="dash-filter-bar">
        <div className="container">
          <div className="dash-tabs">
            {tabs.map((t) => (
              <button key={t} className={`dash-tab${filter === t ? ' active' : ''}`} onClick={() => setFilter(t)}>
                {t}
                {t !== 'Semua' && countOf(t) > 0 && <span className="dash-tab-count">{countOf(t)}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submissions list */}
      <section style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div className="blog-empty">
              <Icon icon="fa-solid fa-inbox" />
              <p>Belum ada pengajuan{filter !== 'Semua' ? ` berstatus "${filter}"` : ''}.</p>
              {filter !== 'Semua' && (
                <button className="btn btn-ghost" onClick={() => setFilter('Semua')}>Lihat semua</button>
              )}
            </div>
          ) : (
            <div className="submission-list">
              {filtered.map((s) => (
                <div key={s.id} className={`submission-card status-border-${s.status.toLowerCase()}`}>
                  <div className="sub-head">
                    <div>
                      <div className="sub-name">{s.nama}</div>
                      <div className="sub-date">
                        <Icon icon="fa-solid fa-clock" />{' '}
                        {new Date(s.tanggal).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <span className={`status-badge status-${s.status.toLowerCase()}`}>{s.status}</span>
                  </div>

                  <div className="sub-body">
                    {s.perusahaan && <div className="sub-row"><Icon icon="fa-solid fa-building" /> {s.perusahaan}</div>}
                    <div className="sub-row"><Icon icon="fa-solid fa-phone" /> {s.kontak}</div>
                    <div className="sub-row"><Icon icon="fa-solid fa-layer-group" /> {s.jenis}</div>
                    {s.anggaran && <div className="sub-row"><Icon icon="fa-solid fa-coins" /> {s.anggaran}</div>}
                    {s.timeline && <div className="sub-row"><Icon icon="fa-regular fa-calendar" /> {s.timeline}</div>}
                  </div>

                  {s.deskripsi && (
                    <div className="sub-desc">{s.deskripsi}</div>
                  )}

                  <div className="sub-actions">
                    <div className="status-btns">
                      {STATUS_LIST.map((st) => (
                        <button
                          key={st}
                          className={`status-btn${s.status === st ? ' active' : ''}`}
                          data-status={st.toLowerCase()}
                          onClick={() => updateStatus(s.id, st)}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                    <div className="sub-act-right">
                      <a
                        className="btn btn-ghost"
                        href={`https://wa.me/${s.kontak.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon icon="fa-brands fa-whatsapp" /> Hubungi
                      </a>
                      <button className="btn-del" onClick={() => del(s.id)} aria-label="Hapus">
                        <Icon icon="fa-solid fa-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
