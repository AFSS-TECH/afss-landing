// ── Brand & global config ──────────────────────────────────
export const BRAND = {
  short: 'AFSS',
  legal: 'PT Advanced Future Software Solutions',
  name: 'Advanced Future Software Solutions',
  tagline: 'Building Future Digital Solutions',
  email: 'hendrik@afss.id',
  phone: '+62 813-9694-307',
  // NAP (Name · Address · Phone) — penting untuk SEO lokal. Ganti sesuai kantor asli.
  address: 'Medan, Sumatera Utara, Indonesia',
  city: 'Medan',
  // Isi URL akun sosial media — kosong = ikon tidak ditampilkan
  social: [
    { name: 'instagram',  icon: 'fa-brands fa-instagram',   url: 'https://instagram.com/afss.tech' },
    { name: 'linkedin',   icon: 'fa-brands fa-linkedin-in', url: '' },
    { name: 'tiktok',     icon: 'fa-brands fa-tiktok',      url: '' },
    { name: 'youtube',    icon: 'fa-brands fa-youtube',     url: '' },
  ],
}

export const WA = '628139694307'
export const waLink = (msg) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`

// ── Hero trust stats ───────────────────────────────────────
export const stats = [
  { n: 100, suffix: '+', label: 'Proyek Selesai' },
  { n: 50,  suffix: '+', label: 'Perusahaan Dipercaya' },
  { n: 100, suffix: '%', label: 'Kode Milik Klien' },
  { n: 24,  suffix: '/7', label: 'Maintenance & Support' },
]

// ── Trust bar: nama klien / industri (logo grayscale, satu baris) ──
// Teks dipakai sebagai "logo" — ganti dengan logo asli bila tersedia.
export const clients = [
  'Retail & UMKM', 'Klinik & Kesehatan', 'Kontraktor', 'Logistik',
  'Pendidikan', 'F&B', 'Koperasi', 'Manufaktur',
]

// ── Layanan (heading kaya keyword untuk SEO) ───────────────
export const products = [
  {
    slug: 'pembuatan-website',
    icon: 'fa-solid fa-window-maximize',
    name: 'Pembuatan Website Custom',
    desc: 'Website profesional yang dibangun sesuai brand dan kebutuhan bisnis Anda — bukan template pasaran. Cepat & SEO-ready sejak awal.',
    metric: 'SEO-ready',
    feats: ['Desain custom & responsif', 'Optimasi SEO on-page', 'Core Web Vitals tinggi', 'Integrasi WhatsApp & sosmed'],
    hot: false,
  },
  {
    slug: 'aplikasi-mobile',
    icon: 'fa-solid fa-mobile-screen-button',
    name: 'Pembuatan Aplikasi Mobile (Android & iOS)',
    desc: 'Aplikasi native maupun cross-platform yang ringan, cepat, dan mudah dipakai pengguna di semua perangkat.',
    metric: 'Native / Flutter',
    feats: ['Android & iOS', 'Publikasi ke Play Store & App Store', 'Push notification', 'Backend & API terintegrasi'],
    hot: true,
  },
  {
    slug: 'web-app',
    icon: 'fa-solid fa-chart-line',
    name: 'Pengembangan Web App & Sistem Internal',
    desc: 'Dashboard, ERP, CRM, atau sistem custom untuk mengelola seluruh operasional perusahaan Anda dalam satu platform.',
    metric: 'Dashboard · ERP · CRM',
    feats: ['Dashboard analitik real-time', 'Manajemen user & role (RBAC)', 'Laporan & export data', 'Integrasi sistem yang ada'],
    hot: false,
  },
  {
    slug: 'maintenance',
    icon: 'fa-solid fa-headset',
    name: 'Maintenance & Support',
    desc: 'Update, monitoring, dan perbaikan berkala supaya sistem Anda selalu jalan, aman, dan up-to-date.',
    metric: 'Uptime terjaga',
    feats: ['Monitoring & uptime', 'Update keamanan rutin', 'Backup berkala', 'Dukungan prioritas'],
    hot: false,
  },
  {
    slug: 'jasa-pembuatan-landing-page',
    icon: 'fa-solid fa-layer-group',
    name: 'Jasa Pembuatan Landing Page',
    desc: 'Landing page konversi tinggi untuk iklan, produk, atau kampanye pemasaran — dioptimasi agar pengunjung jadi pelanggan.',
    metric: 'Konversi tinggi',
    feats: ['Desain persuasif & CTA jelas', 'Loading super cepat (<2 detik)', 'Integrasi WhatsApp & form lead', 'A/B test ready'],
    hot: false,
  },
  {
    slug: 'jasa-pembuatan-company-profile',
    icon: 'fa-solid fa-briefcase',
    name: 'Jasa Pembuatan Company Profile Website',
    desc: 'Website company profile profesional yang membangun kepercayaan, menampilkan layanan, dan mengundang calon klien menghubungi Anda.',
    metric: 'Profesional & kredibel',
    feats: ['Desain corporate modern', 'SEO lokal & Google Business', 'Multi-halaman: Tentang, Layanan, Kontak', 'Responsif & cepat'],
    hot: false,
  },
  {
    slug: 'jasa-pembuatan-toko-online',
    icon: 'fa-solid fa-tags',
    name: 'Jasa Pembuatan Toko Online',
    desc: 'Toko online custom dengan fitur lengkap: katalog produk, keranjang belanja, pembayaran, dan manajemen pesanan.',
    metric: 'Siap berjualan',
    feats: ['Payment gateway (Midtrans, Xendit)', 'Manajemen produk & stok', 'Dashboard penjualan', 'Mobile-first & SEO-ready'],
    hot: false,
  },
  {
    slug: 'jasa-pembuatan-erp',
    icon: 'fa-solid fa-circle-nodes',
    name: 'Jasa Pembuatan Sistem ERP Custom',
    desc: 'Sistem ERP yang dibangun sesuai alur kerja bisnis Anda — menyatukan keuangan, inventory, SDM, dan operasional dalam satu platform.',
    metric: 'Efisiensi operasional',
    feats: ['Modul keuangan & akuntansi', 'Manajemen inventory & gudang', 'HR & penggajian', 'Laporan & analitik real-time'],
    hot: true,
  },
  {
    slug: 'jasa-pembuatan-dashboard',
    icon: 'fa-solid fa-gauge-high',
    name: 'Jasa Pembuatan Dashboard Bisnis',
    desc: 'Dashboard analitik dan sistem manajemen internal yang menampilkan data bisnis secara real-time untuk keputusan yang lebih cepat.',
    metric: 'Data real-time',
    feats: ['Visualisasi data & grafik', 'Multi-user & role access', 'Export laporan Excel/PDF', 'Integrasi API eksternal'],
    hot: false,
  },
  {
    slug: 'jasa-pembuatan-website-medan',
    icon: 'fa-solid fa-location-dot',
    name: 'Jasa Pembuatan Website Medan',
    desc: 'Software house lokal Medan yang memahami kebutuhan bisnis Sumatera Utara — website, aplikasi, dan sistem digital dengan layanan tatap muka.',
    metric: 'Tim lokal Medan',
    feats: ['Konsultasi tatap muka di Medan', 'Memahami pasar lokal Sumut', 'Harga kompetitif tanpa biaya jarak', 'Support responsif waktu Indonesia Barat'],
    hot: false,
  },
]

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug) || null

// ── Kenapa memilih AFSS (diferensiasi) ─────────────────────
export const why = [
  { icon: 'fa-solid fa-code', title: 'Kode bersih & terdokumentasi', desc: 'Tidak ada vendor lock-in. Tim Anda bisa melanjutkan kapan saja — kode dan dokumentasinya milik Anda sepenuhnya.' },
  { icon: 'fa-solid fa-gauge-high', title: 'Cepat & SEO-ready sejak awal', desc: 'Dibangun untuk skor Core Web Vitals tinggi, sehingga lebih mudah ditemukan di Google dan nyaman dipakai.' },
  { icon: 'fa-solid fa-handshake', title: 'Tim lokal, komunikasi cepat', desc: 'Tanpa beda zona waktu. Kami langsung paham konteks bisnis Indonesia dan responsif di setiap tahap.' },
  { icon: 'fa-solid fa-receipt', title: 'Transparan', desc: 'Harga dan timeline jelas di depan. Tanpa biaya tersembunyi, tanpa kejutan di tengah jalan.' },
]

// ── Proses kerja (6 langkah, bangun kepercayaan) ───────────
export const workflow = [
  { step: '01', icon: 'fa-solid fa-comments',    title: 'Konsultasi & Discovery', desc: 'Kami pelajari kebutuhan & tujuan bisnis Anda lebih dulu. Gratis, tanpa tekanan.' },
  { step: '02', icon: 'fa-solid fa-file-invoice', title: 'Proposal & Estimasi',     desc: 'Ruang lingkup, harga, dan timeline yang jelas dan transparan di awal.' },
  { step: '03', icon: 'fa-solid fa-pen-ruler',    title: 'Desain',                  desc: 'Rancang UI/UX yang sesuai brand dan terbukti meningkatkan konversi.' },
  { step: '04', icon: 'fa-solid fa-code',         title: 'Development',             desc: 'Bangun sistem dengan kode bersih & update progres berkala.' },
  { step: '05', icon: 'fa-solid fa-rocket',       title: 'Testing & Launch',        desc: 'Uji menyeluruh lalu rilis dengan dukungan penuh saat peluncuran.' },
  { step: '06', icon: 'fa-solid fa-headset',      title: 'Maintenance',             desc: 'Monitoring, update, dan perbaikan supaya sistem terus berjalan optimal.' },
]

// ── Portofolio / studi kasus (masalah → solusi → hasil) ────
export const showcase = [
  { n: 1,  title: 'Landing Page UMKM / Toko Online', price: 'Konversi +300%',        c: '#0E8C86', c2: '#0B6E69', kind: 'land', chart: 0, tags: ['Next.js', 'Tailwind', 'SEO'] },
  { n: 2,  title: 'Company Profile Kontraktor',      price: 'Lead +2x',              c: '#15243B', c2: '#0E1A2E', kind: 'land', chart: 0, tags: ['Next.js', 'SEO'] },
  { n: 3,  title: 'Dashboard & Mobile App Klinik',   price: 'Antrian -60%',          c: '#1E88A8', c2: '#0E5E78', kind: 'dash', chart: 2, tags: ['React', 'Flutter'] },
  { n: 4,  title: 'Sistem Rental Mobil',             price: 'Operasional rapi',      c: '#2BB3A3', c2: '#0E8C86', kind: 'dash', chart: 1, tags: ['Laravel', 'MySQL'] },
  { n: 5,  title: 'Sistem Dealer Motor',             price: 'Stok real-time',        c: '#15243B', c2: '#26405E', kind: 'dash', chart: 2, tags: ['React', 'Postgres'] },
  { n: 6,  title: 'ERP Lite Toko Grosir',            price: 'Lapor -70% waktu',      c: '#0E8C86', c2: '#0B6E69', kind: 'dash', chart: 0, tags: ['Node.js', 'Postgres'] },
]

// Sparkline presets (viewBox 0 0 100 36)
export const charts = [
  '0,28 12,22 24,26 36,14 48,18 60,8 72,12 84,4 100,9',
  '0,30 14,18 28,24 42,12 56,20 70,10 84,16 100,6',
  '0,20 12,24 24,12 36,18 48,8 60,16 72,6 84,12 100,3',
]

// ── Teknologi yang kami gunakan (authority + keyword teknis) ──
export const techStack = [
  { name: 'Next.js',     icon: 'fa-solid fa-n' },
  { name: 'React',       icon: 'fa-brands fa-react' },
  { name: 'TypeScript',  icon: 'fa-solid fa-code' },
  { name: 'Tailwind CSS',icon: 'fa-solid fa-wind' },
  { name: 'Node.js',     icon: 'fa-brands fa-node-js' },
  { name: 'Flutter',     icon: 'fa-solid fa-mobile-screen' },
  { name: 'PostgreSQL',  icon: 'fa-solid fa-database' },
  { name: 'Laravel',     icon: 'fa-brands fa-laravel' },
  { name: 'AWS',         icon: 'fa-brands fa-aws' },
  { name: 'Vercel',      icon: 'fa-solid fa-triangle-exclamation' },
  { name: 'Figma',       icon: 'fa-brands fa-figma' },
  { name: 'Docker',      icon: 'fa-brands fa-docker' },
]

// ── Harga per produk ─────────────────────────────────────────
// Urutan: dari harga entry → high ticket
export const pricing = [
  {
    name: 'Maintenance Bulanan',
    icon: 'fa-solid fa-shield-halved',
    category: 'Support',
    price: 'Rp 750 rb',
    note: 'mulai dari / bulan',
    desc: 'Langganan bulanan untuk menjaga sistem Anda tetap aman, cepat, dan berjalan optimal — tanpa khawatir soal teknis.',
    feats: ['Monitoring uptime 24/7', 'Update keamanan rutin', 'Backup data berkala', 'Respons bug < 4 jam kerja'],
    hot: false,
  },
  {
    name: 'Landing Page',
    icon: 'fa-solid fa-rectangle-ad',
    category: 'Website',
    price: 'Rp 2,5 Jt',
    note: 'mulai dari',
    desc: 'Halaman konversi untuk iklan atau kampanye produk — persuasif, cepat, dan terukur hasilnya.',
    feats: ['Desain fokus konversi tinggi', 'Loading < 2 detik', 'Form lead & CTA WhatsApp', 'Mobile-first & SEO-ready'],
    hot: false,
  },
  {
    name: 'Website Revamp',
    icon: 'fa-solid fa-arrows-rotate',
    category: 'Website',
    price: 'Rp 4 Jt',
    note: 'mulai dari',
    desc: 'Redesign total website lama yang sudah tidak relevan — tampilan baru, performa lebih cepat, SEO dipertahankan.',
    feats: ['Audit & analisis website lama', 'Desain ulang sesuai brand terkini', 'Migrasi konten & SEO preservation', 'Responsif & Core Web Vitals baru'],
    hot: false,
  },
  {
    name: 'Company Profile',
    icon: 'fa-solid fa-building',
    category: 'Website',
    price: 'Rp 6 Jt',
    note: 'mulai dari',
    desc: 'Website multi-halaman profesional yang membangun kepercayaan dan menampilkan layanan bisnis Anda.',
    feats: ['Desain custom & responsif', 'SEO on-page lengkap', 'Halaman Tentang, Layanan, Kontak', 'Mudah diperbarui sendiri'],
    hot: false,
  },
  {
    name: 'Mini Dashboard',
    icon: 'fa-solid fa-gauge-high',
    category: 'Sistem',
    price: 'Rp 12 Jt',
    note: 'mulai dari',
    desc: 'Sistem manajemen internal untuk mencatat, memantau, dan melaporkan data bisnis — menggantikan spreadsheet yang kacau.',
    feats: ['Login multi-user & role access', 'CRUD data & manajemen tabel', 'Laporan & export Excel/PDF', 'Notifikasi & dashboard ringkasan'],
    hot: false,
  },
  {
    name: 'Aplikasi Mobile',
    icon: 'fa-solid fa-mobile-screen-button',
    category: 'Mobile',
    price: 'Rp 15 Jt',
    note: 'mulai dari',
    desc: 'Aplikasi Android & iOS (Flutter atau native) yang ringan, cepat, dan siap publish ke Play Store & App Store.',
    feats: ['Android & iOS dari satu codebase', 'Push notification & deeplink', 'Backend & REST API terintegrasi', 'Asistensi publish ke toko aplikasi'],
    hot: true,
  },
  {
    name: 'Sistem ERP',
    icon: 'fa-solid fa-circle-nodes',
    category: 'Sistem',
    price: 'Rp 20 Jt',
    note: 'mulai dari',
    desc: 'ERP custom yang menyatukan keuangan, inventory, SDM, dan operasional sesuai alur kerja unik bisnis Anda.',
    feats: ['Modul keuangan & akuntansi', 'Inventory & manajemen gudang', 'HR & penggajian otomatis', 'Laporan eksekutif real-time'],
    hot: false,
  },
  {
    name: 'Toko Online (E-Commerce)',
    icon: 'fa-solid fa-cart-shopping',
    category: 'E-Commerce',
    price: 'Rp 35 Jt',
    note: 'mulai dari',
    desc: 'Toko online custom dengan payment gateway, katalog produk, manajemen stok, dan dashboard penjualan lengkap.',
    feats: ['Payment gateway (Midtrans / Xendit)', 'Katalog produk & manajemen stok', 'Dashboard penjualan & laporan', 'SEO-ready & mobile-first'],
    hot: false,
  },
  {
    name: 'Platform Marketplace',
    icon: 'fa-solid fa-store',
    category: 'E-Commerce',
    price: 'Rp 75 Jt',
    note: 'mulai dari',
    desc: 'Platform multi-vendor lengkap — seller mendaftar, upload produk, buyer bertransaksi, admin kelola semua dari satu panel.',
    feats: ['Multi-vendor: seller, buyer & admin', 'Komisi & settlement otomatis', 'Manajemen dispute, review & rating', 'App mobile buyer + seller tersedia'],
    hot: false,
  },
]

// ── Paket kombinasi (bundle hemat) ───────────────────────────
export const pricingBundles = [
  {
    name: 'Paket UMKM Starter',
    icon: 'fa-solid fa-seedling',
    tag: 'Paling terjangkau',
    desc: 'Untuk UMKM yang baru go-digital. Dapatkan landing page profesional + ketenangan pikiran dengan maintenance 3 bulan.',
    items: ['Landing Page', 'Setup Google Business Profile', 'Maintenance 3 bulan'],
    normalPrice: 'Rp 4,75 Jt',
    price: 'Rp 3,5 Jt',
    save: 'Hemat Rp 1,25 Jt',
    hot: false,
  },
  {
    name: 'Paket Bisnis Profil',
    icon: 'fa-solid fa-briefcase',
    tag: 'Populer untuk UKM',
    desc: 'Company profile yang kuat + sistem manajemen internal ringan — tampil profesional ke luar, operasional rapi ke dalam.',
    items: ['Company Profile Website', 'Mini Dashboard', 'Maintenance 1 bulan'],
    normalPrice: 'Rp 19,5 Jt',
    price: 'Rp 16 Jt',
    save: 'Hemat Rp 3,5 Jt',
    hot: false,
  },
  {
    name: 'Paket Digital Commerce',
    icon: 'fa-solid fa-bag-shopping',
    tag: 'Rekomendasi bisnis online',
    desc: 'Toko online + aplikasi mobile: jangkau pelanggan dari browser maupun smartphone dalam satu ekosistem terintegrasi.',
    items: ['Toko Online (E-Commerce)', 'Aplikasi Mobile', 'Maintenance 2 bulan'],
    normalPrice: 'Rp 51,5 Jt',
    price: 'Rp 45 Jt',
    save: 'Hemat Rp 6,5 Jt',
    hot: true,
  },
  {
    name: 'Paket Enterprise',
    icon: 'fa-solid fa-building-columns',
    tag: 'Solusi korporat',
    desc: 'ERP, dashboard analitik, dan aplikasi mobile dalam satu ekosistem — untuk bisnis skala menengah yang butuh efisiensi penuh.',
    items: ['Sistem ERP Custom', 'Mini Dashboard Eksekutif', 'Aplikasi Mobile', 'Maintenance 3 bulan'],
    normalPrice: 'Rp 49,25 Jt',
    price: 'Rp 43 Jt',
    save: 'Hemat Rp 6,25 Jt',
    hot: false,
  },
  {
    name: 'Paket Marketplace Pro',
    icon: 'fa-solid fa-rocket',
    tag: 'Skala besar',
    desc: 'Platform marketplace lengkap dengan aplikasi mobile untuk buyer dan seller — ekosistem digital yang siap bersaing.',
    items: ['Platform Marketplace', 'Aplikasi Mobile (Buyer & Seller)', 'Maintenance 3 bulan'],
    normalPrice: 'Rp 92,25 Jt',
    price: 'Rp 82 Jt',
    save: 'Hemat Rp 10 Jt',
    hot: false,
  },
]

// ── FAQ (target featured snippet — long-tail keyword) ──────
export const faqs = [
  { q: 'Berapa biaya pembuatan website atau aplikasi?', a: 'Landing page mulai Rp 2,5 juta, website revamp Rp 4 juta, company profile Rp 6 juta, mini dashboard Rp 12 juta, aplikasi mobile Rp 15 juta, ERP Rp 20 juta, toko online Rp 35 juta, dan marketplace Rp 75 juta. Tersedia juga paket kombinasi hemat. Semua harga adalah estimasi awal — final menyesuaikan ruang lingkup setelah konsultasi gratis.' },
  { q: 'Berapa lama pengerjaannya?', a: 'Landing page biasanya 1–2 minggu, website dashboard 3–5 minggu, aplikasi mobile 4–8 minggu, dan ERP 8–16 minggu. Timeline pasti akan kami sepakati bersama di tahap proposal.' },
  { q: 'Apakah saya mendapat akses penuh ke kode?', a: 'Ya. Seluruh kode dan dokumentasinya milik Anda sepenuhnya — tidak ada vendor lock-in. Tim Anda bisa melanjutkan kapan saja.' },
  { q: 'Apakah ada garansi dan maintenance?', a: 'Ada. Setiap proyek mencakup masa garansi bug, dan kami menyediakan paket maintenance untuk monitoring, update keamanan, serta backup berkala.' },
  { q: 'Teknologi apa yang dipakai?', a: 'Kami memakai stack modern: Next.js, React, TypeScript, Tailwind CSS, Node.js, Flutter, PostgreSQL, dan Laravel — dipilih sesuai kebutuhan proyek agar cepat, aman, dan mudah dikembangkan.' },
]

// ── Impact section: animated motion graph ──────────────────
export const growthSeries = [
  { m: 'Jan', v: 26 }, { m: 'Feb', v: 33 }, { m: 'Mar', v: 30 }, { m: 'Apr', v: 44 },
  { m: 'Mei', v: 51 }, { m: 'Jun', v: 47 }, { m: 'Jul', v: 62 }, { m: 'Agu', v: 70 },
  { m: 'Sep', v: 66 }, { m: 'Okt', v: 81 }, { m: 'Nov', v: 90 }, { m: 'Des', v: 100 },
]

export const kpis = [
  { label: 'Rata-rata kenaikan konversi', n: 38, prefix: '+', suffix: '%', bar: 76 },
  { label: 'Proyek selesai tepat waktu',   n: 98, prefix: '',  suffix: '%', bar: 98 },
  { label: 'Klien yang kembali lagi',      n: 92, prefix: '',  suffix: '%', bar: 92 },
]

export const satisfaction = 100

// ── Reviews (Bahasa Indonesia, semua positif). Nama disensor saat render. ──
export const reviews = [
  {
    name: 'Budi Santoso', company: 'Owner, Batik Nusantara UMKM', initials: 'BS',
    grad: 'linear-gradient(135deg,#15243B,#0E8C86)',
    text: 'Tim AFSS sangat profesional dan benar-benar memahami kebutuhan bisnis kami. Landing page mereka meningkatkan penjualan online kami hingga 300% dalam 2 bulan pertama!',
  },
  {
    name: 'Siti Rahmawati', company: 'CEO, PT Maju Bersama Digital', initials: 'SR',
    grad: 'linear-gradient(135deg,#0E8C86,#2BB3A3)',
    text: 'Dashboard manajemen dari AFSS mengubah cara kami mengelola data. Semua laporan kini real-time. Tim support-nya responsif bahkan jauh setelah sistem diluncurkan.',
  },
  {
    name: 'Ahmad Fauzi', company: 'Founder, StartupKita.id', initials: 'AF',
    grad: 'linear-gradient(135deg,#1E88A8,#15243B)',
    text: 'Dari konsultasi hingga launching, AFSS selalu memberi saran terbaik. Aplikasi mobile kami kini diunduh lebih dari 10.000 pengguna! Kualitas kodenya solid.',
  },
  {
    name: 'Dewi Kusuma', company: 'Direktur, CV Nusantara Jaya Abadi', initials: 'DK',
    grad: 'linear-gradient(135deg,#15243B,#26405E)',
    text: 'Sistem ERP-nya mengintegrasikan seluruh operasional kami yang dulunya manual. Efisiensi meningkat drastis — hemat waktu hingga 60% untuk pelaporan bulanan!',
  },
  {
    name: 'Rizky Pratama', company: 'IT Manager, PT Solusi Digital Indonesia', initials: 'RP',
    grad: 'linear-gradient(135deg,#0E8C86,#1E88A8)',
    text: 'Harga sangat kompetitif untuk kualitas luar biasa! AFSS bukan sekadar membangun software, tapi juga memberi konsultasi strategis. Mitra jangka panjang yang kami percaya.',
  },
  {
    name: 'Linda Maharani', company: 'Owner, Toko Berkah Fashion', initials: 'LM',
    grad: 'linear-gradient(135deg,#2BB3A3,#0E8C86)',
    text: 'Awalnya ragu karena toko online saya masih kecil, tapi AFSS melayani dengan serius. Website saya jauh lebih profesional dan omzet naik 2x lipat dalam 3 bulan!',
  },
  {
    name: 'Andi Wijaya', company: 'Manajer, Restoran Sederhana Group', initials: 'AW',
    grad: 'linear-gradient(135deg,#1E88A8,#15243B)',
    text: 'Website restoran kami benar-benar membantu. Pelanggan jadi lebih gampang lihat menu dan promo. Proses pengerjaannya cepat dan komunikatif. Recommended!',
  },
  {
    name: 'Maya Sari', company: 'Manajer Operasional, Klinik Sehat Sentosa', initials: 'MS',
    grad: 'linear-gradient(135deg,#0E8C86,#0B6E69)',
    text: 'Sistem antrian & rekam medis digital dari AFSS sangat memudahkan operasional klinik kami. Pasien lebih nyaman dan staf lebih produktif. Terima kasih AFSS!',
  },
  {
    name: 'Hendra Gunawan', company: 'Owner, Bengkel Jaya Motor', initials: 'HG',
    grad: 'linear-gradient(135deg,#15243B,#0E8C86)',
    text: 'Aplikasi manajemen bengkel buatan AFSS bikin pencatatan servis & stok sparepart jadi rapi. Tim-nya sabar membimbing dari nol sampai kami bisa pakai sendiri.',
  },
]
