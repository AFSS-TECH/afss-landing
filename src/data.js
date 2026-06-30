// ── Brand & global config ──────────────────────────────────
export const BRAND = {
  short: 'AFSS',
  legal: 'PT Advanced Future Software Solutions',
  name: 'Advanced Future Software Solutions',
  tagline: 'Building Future Digital Solutions',
  email: 'hendrik@afss.tech',
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

// ── Hero trust stats — kebijakan/jaminan nyata, bukan klaim jumlah klien/proyek ──
export const stats = [
  { n: 100, suffix: '%', label: 'Kode Milik Klien' },
  { n: 24,  suffix: '/7', label: 'Maintenance & Support' },
]

// ── Trust bar: nama klien / industri (logo grayscale, satu baris) ──
// Teks dipakai sebagai "logo" — ganti dengan logo asli bila tersedia.
export const clients = [
  'Retail & UMKM', 'Klinik & Kesehatan', 'Kontraktor', 'Logistik',
  'Pendidikan', 'F&B', 'Koperasi', 'Manufaktur',
]

// ── Layanan utama — 6 produk inti ────────────────────────
export const products = [
  {
    slug: 'landing-page',
    icon: 'fa-solid fa-rectangle-ad',
    name: 'Landing Page',
    desc: 'Halaman konversi tinggi untuk iklan, produk, atau kampanye — persuasif, cepat load, dan terukur hasilnya.',
    metric: 'Konversi tinggi',
    feats: ['Desain fokus konversi & CTA jelas', 'Loading < 2 detik (LCP optimal)', 'Form lead + CTA WhatsApp', 'Tracking & analytics siap'],
    hot: false,
  },
  {
    slug: 'company-profile',
    icon: 'fa-solid fa-briefcase',
    name: 'Company Profile',
    desc: 'Website profil perusahaan yang membangun kepercayaan, menampilkan layanan bisnis, dan mengundang calon klien menghubungi Anda.',
    metric: 'Profesional & kredibel',
    feats: ['Desain corporate custom & responsif', 'SEO lokal + Google Business', 'Halaman Tentang, Layanan, Portofolio, Kontak', 'Mudah diperbarui mandiri'],
    hot: false,
  },
  {
    slug: 'software-custom',
    icon: 'fa-solid fa-code',
    name: 'Software Custom',
    desc: 'Aplikasi web, dashboard, atau sistem internal yang dibuat dari nol sesuai alur kerja bisnis Anda — bukan template generik.',
    metric: 'Sesuai kebutuhan',
    feats: ['Web app & dashboard real-time', 'Multi-user & role access (RBAC)', 'Laporan & export Excel/PDF', 'Integrasi API & sistem existing'],
    hot: false,
  },
  {
    slug: 'erp',
    icon: 'fa-solid fa-circle-nodes',
    name: 'ERP (Enterprise Resource Planning)',
    desc: 'Sistem ERP custom yang menyatukan keuangan, inventory, SDM, produksi, dan penjualan dalam satu platform terpusat.',
    metric: 'Efisiensi operasional',
    feats: ['Modul keuangan & akuntansi', 'Inventory & manajemen gudang', 'HR, absensi & penggajian', 'Laporan eksekutif real-time'],
    hot: true,
  },
  {
    slug: 'ecommerce',
    icon: 'fa-solid fa-cart-shopping',
    name: 'E-Commerce / Toko Online',
    desc: 'Toko online custom dengan payment gateway lokal, manajemen produk & stok, dan dashboard penjualan yang lengkap.',
    metric: 'Siap berjualan',
    feats: ['Payment gateway Midtrans / Xendit', 'Manajemen produk, kategori & stok', 'Kalkulasi ongkir otomatis', 'Dashboard & laporan penjualan'],
    hot: false,
  },
  {
    slug: 'marketplace',
    icon: 'fa-solid fa-store',
    name: 'Marketplace',
    desc: 'Platform multi-vendor lengkap — seller mendaftar, upload produk, buyer bertransaksi, admin kelola semua dari satu panel.',
    metric: 'Multi-vendor',
    feats: ['Registrasi & manajemen seller', 'Komisi & settlement otomatis', 'Review, rating & dispute', 'App mobile buyer + seller tersedia'],
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

// ── Portfolio projects — contoh karya per kategori ──────────
export const portfolioProjects = [
  // ERP
  { slug:'erp-kontraktor', cat:'ERP', catSlug:'erp', title:'AFSS Contractor ERP', tagline:'Sistem ERP kontraktor: proyek, RAB, keuangan, SDM & gudang terintegrasi', c:'#0E2240', c2:'#2563FF', kind:'dash', budget:'Rp 48 Jt', result:'Efisiensi Ops +60%', result2:'Laporan proyek real-time, 0 delay', tags:['Bootstrap','Vanilla JS','Multi-Role','Demo'], problem:'Kontraktor mengelola proyek, RAB, pengadaan material, absensi mandor, dan laporan keuangan di file Excel terpisah — sering tidak sinkron dan rawan hilang.', solution:'Sistem ERP kontraktor terpadu: login multi-role (Owner, PM, Finance, Mandor, Warehouse), dashboard proyek real-time, RAB, BAST, penggajian, dan laporan keuangan.', features:['Dashboard eksekutif per proyek & keuangan','Manajemen proyek & RAB','Modul keuangan & faktur BAST','HR: absensi, penggajian, PPh 21','Gudang & pengadaan material','Multi-role: Owner / Admin / Finance / PM / Mandor / Warehouse'], tech:'Bootstrap 5, Vanilla JS, Tabler Icons, Demo Mode Multi-Role', review:'ERP ini mengubah cara kami mengelola proyek. Semua data proyek, keuangan, dan SDM kini terpusat — Owner bisa pantau dari mana saja.', clientName:'Tim AFSS', clientRole:'Demo Project — AFSS Contractor ERP', visitUrl:'https://afss.tech/portofolio/erp/kontraktor/',
    image:'/portofolio/erp/kontraktor/mockup/dashboard.webp',
    images:['/portofolio/erp/kontraktor/mockup/dashboard.webp','/portofolio/erp/kontraktor/mockup/project-hpp.webp','/portofolio/erp/kontraktor/mockup/mobile-lapangan.webp'],
    imageCaptions:['Dashboard Eksekutif — kontrol proyek, HPP, stok & keuangan dalam satu layar','Kontrol Proyek & HPP — RAB vs realisasi biaya, profit margin per proyek real-time','Mobile Lapangan — mandor input absensi, foto progres & request material langsung dari HP'],
    benefits:[
      { icon:'fa-solid fa-chart-pie', title:'Profit per proyek transparan', desc:'HPP vs RAB dan realisasi biaya terlihat real-time — Owner tahu untung-rugi tiap proyek tanpa tunggu tutup buku.' },
      { icon:'fa-solid fa-clock-rotate-left', title:'Laporan instan, bukan akhir bulan', desc:'Dashboard eksekutif menyatukan keuangan, stok, dan progres proyek — laporan yang biasanya makan berhari-hari kini sekali klik.' },
      { icon:'fa-solid fa-people-roof', title:'Akses sesuai peran kerja', desc:'Owner, PM, Finance, Mandor, dan Warehouse masing-masing punya akses sendiri — data sensitif tetap terjaga, kerja tetap cepat.' },
      { icon:'fa-solid fa-location-dot', title:'Mandor lapangan tanpa kertas', desc:'Absensi, foto progres, dan permintaan material langsung dari HP di lokasi proyek — tidak perlu bolak-balik kantor.' },
      { icon:'fa-solid fa-file-invoice-dollar', title:'BAST & penggajian otomatis', desc:'Faktur termin (BAST), absensi, hingga PPh 21 dihitung sistem — mengurangi human error di proses keuangan & HR.' },
      { icon:'fa-solid fa-boxes-stacked', title:'Stok material selalu akurat', desc:'Pengadaan dan pemakaian material tercatat per proyek — mencegah kelebihan beli atau kehabisan stok mendadak.' },
    ],
  },
  // LANDING PAGE
  { slug:'koperasi-emas-kimberli', cat:'Landing Page', catSlug:'landing-page', title:'Koperasi Emas Kimberli', tagline:'Platform investasi emas koperasi: tabungan, cicil emas, gadai simpanan & simulasi real-time', c:'#1A1305', c2:'#D4A93B', kind:'land', budget:'Rp 14 Jt', result:'Konversi Daftar +180%', result2:'150.000+ anggota terlayani di platform', tags:['Next.js','Supabase','Multi-Role Dashboard','Realtime Gold Price'], visitUrl:'https://afss.tech/portofolio/landing_page/koperasi_emas',
    problem:'Koperasi emas mengandalkan brosur dan WhatsApp manual untuk jualan produk tabungan & cicil emas. Calon anggota tidak bisa cek harga emas terkini atau simulasi cicilan sendiri, sehingga banyak yang ragu mendaftar.',
    solution:'Landing page investasi emas dengan harga emas real-time, simulator cicilan & buyback interaktif, serta dashboard multi-role (Admin, Master, Member) untuk kelola anggota, tabungan, dan SHU tahunan.',
    features:['Harga emas hari ini real-time + grafik 30 hari','Simulasi cicilan & buyback interaktif','Tabungan emas, gadai simpanan, SHU tahunan','Dashboard member: portofolio & riwayat transaksi','Dashboard admin/master: kelola anggota & transaksi','Autentikasi & registrasi anggota terverifikasi'],
    tech:'Next.js 15, TypeScript, Supabase, Tailwind CSS, Vercel',
    review:'Anggota sekarang bisa cek harga emas dan simulasi cicilan sendiri kapan saja — tim kami tidak perlu lagi jawab pertanyaan yang sama berulang-ulang di WhatsApp.',
    clientName:'Tim AFSS', clientRole:'Demo Project — Koperasi Emas Kimberli',
    image:'/portofolio/landing-page/koperasi-emas-kimberli/mockup/hero.webp',
    images:['/portofolio/landing-page/koperasi-emas-kimberli/mockup/hero.webp','/portofolio/landing-page/koperasi-emas-kimberli/mockup/harga-emas.webp','/portofolio/landing-page/koperasi-emas-kimberli/mockup/simulasi.webp','/portofolio/landing-page/koperasi-emas-kimberli/mockup/mobile.webp'],
    imageCaptions:['Beranda — harga emas live, simulasi cicilan, dan ringkasan layanan dalam satu layar','Harga Emas Hari Ini — perbandingan harga & produk simpanan terbaru','Halaman Harga Emas — grafik 30 hari, simulasi cicilan & buyback dengan estimasi hasil','Tampilan Mobile — akses harga emas dan simulasi investasi langsung dari HP'],
    imagePortrait:[false,false,false,true],
    benefits:[
      { icon:'fa-solid fa-coins', title:'Harga emas selalu update', desc:'Anggota lihat harga beli/buyback hari ini dan grafik 30 hari tanpa perlu tanya admin — kepercayaan naik karena transparan.' },
      { icon:'fa-solid fa-calculator', title:'Simulasi sebelum daftar', desc:'Calon anggota bisa hitung sendiri cicilan & estimasi hasil sebelum mendaftar — mengurangi keraguan dan mempercepat keputusan.' },
      { icon:'fa-solid fa-users-gear', title:'Operasional admin lebih ringan', desc:'Dashboard admin & master mengelola anggota, transaksi, dan SHU tahunan tanpa rekap manual di Excel.' },
      { icon:'fa-solid fa-shield-halved', title:'Kepercayaan & legalitas terlihat', desc:'Status terdaftar Kementerian Koperasi & UKM RI dan informasi keamanan ditampilkan jelas di landing page — penting untuk produk finansial.' },
    ],
  },
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

// ── Harga 6 produk utama — riset pasar software house Indonesia 2024-2025 ──
export const pricing = [
  {
    name: 'Landing Page',
    icon: 'fa-solid fa-rectangle-ad',
    category: 'Website',
    price: 'Rp 1,5 Jt',
    note: 'mulai dari',
    desc: 'Satu halaman fokus konversi untuk iklan, produk, atau event — persuasif, cepat, dan terukur hasilnya.',
    feats: ['Desain fokus konversi & CTA jelas', 'Loading < 2 detik (LCP optimal)', 'Form lead + CTA WhatsApp', 'Mobile-first & tracking siap'],
    hot: false,
    slug: 'landing-page',
  },
  {
    name: 'Company Profile',
    icon: 'fa-solid fa-briefcase',
    category: 'Website',
    price: 'Rp 4,5 Jt',
    note: 'mulai dari',
    desc: 'Website 5–7 halaman profesional yang membangun kepercayaan dan mengundang calon klien menghubungi Anda.',
    feats: ['Desain custom & responsif', 'SEO on-page + Google Business', 'Halaman Tentang, Layanan, Portofolio, Kontak', 'CMS untuk update mandiri'],
    hot: false,
    slug: 'company-profile',
  },
  {
    name: 'Software Custom',
    icon: 'fa-solid fa-code',
    category: 'Software',
    price: 'Rp 8 Jt',
    note: 'mulai dari',
    desc: 'Web app, dashboard, atau sistem internal custom — gantikan spreadsheet dengan platform terpusat yang real-time.',
    feats: ['Multi-user & role access (RBAC)', 'Dashboard analitik & laporan', 'Export Excel/PDF otomatis', 'Integrasi API & sistem existing'],
    hot: false,
    slug: 'software-custom',
  },
  {
    name: 'ERP Custom',
    icon: 'fa-solid fa-circle-nodes',
    category: 'Software',
    price: 'Rp 28 Jt',
    note: 'mulai dari',
    desc: 'ERP yang menyatukan keuangan, inventory, SDM, dan operasional sesuai alur kerja unik bisnis Anda.',
    feats: ['Modul keuangan & akuntansi', 'Inventory & manajemen gudang', 'HR, absensi & penggajian', 'Dashboard eksekutif real-time'],
    hot: true,
    slug: 'erp',
  },
  {
    name: 'E-Commerce',
    icon: 'fa-solid fa-cart-shopping',
    category: 'E-Commerce',
    price: 'Rp 18 Jt',
    note: 'mulai dari',
    desc: 'Toko online custom dengan payment gateway lokal, manajemen produk & stok, dan dashboard penjualan.',
    feats: ['Payment gateway Midtrans / Xendit', 'Manajemen produk, kategori & stok', 'Kalkulasi ongkir otomatis', 'Dashboard & laporan penjualan'],
    hot: false,
    slug: 'ecommerce',
  },
  {
    name: 'Marketplace',
    icon: 'fa-solid fa-store',
    category: 'E-Commerce',
    price: 'Rp 65 Jt',
    note: 'mulai dari',
    desc: 'Platform multi-vendor — seller mendaftar, upload produk, buyer bertransaksi, admin kelola semua dari satu panel.',
    feats: ['Multi-vendor: seller, buyer & admin', 'Komisi & settlement otomatis', 'Review, rating & dispute', 'App mobile buyer + seller tersedia'],
    hot: false,
    slug: 'marketplace',
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
    name: 'Paket Sales Digital',
    icon: 'fa-solid fa-handshake',
    tag: 'Untuk tim penjualan',
    desc: 'Company profile yang membangun kepercayaan + CRM yang memastikan tidak ada leads lolos — kombinasi ideal untuk bisnis B2B.',
    items: ['Company Profile Website', 'Sistem CRM', 'Maintenance 2 bulan'],
    normalPrice: 'Rp 22,5 Jt',
    price: 'Rp 19 Jt',
    save: 'Hemat Rp 3,5 Jt',
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
  { q: 'Berapa biaya jasa AFSS?', a: 'Landing page mulai Rp 1,5 juta, company profile mulai Rp 4,5 juta, software custom mulai Rp 8 juta, e-commerce mulai Rp 18 juta, ERP mulai Rp 28 juta, dan marketplace mulai Rp 65 juta. Semua harga adalah estimasi awal — final disesuaikan ruang lingkup dan kompleksitas setelah konsultasi gratis.' },
  { q: 'Berapa lama pengerjaannya?', a: 'Landing page biasanya 1–2 minggu, website dashboard 3–5 minggu, aplikasi mobile 4–8 minggu, dan ERP 8–16 minggu. Timeline pasti akan kami sepakati bersama di tahap proposal.' },
  { q: 'Apakah saya mendapat akses penuh ke kode?', a: 'Ya. Seluruh kode dan dokumentasinya milik Anda sepenuhnya — tidak ada vendor lock-in. Tim Anda bisa melanjutkan kapan saja.' },
  { q: 'Apakah ada garansi dan maintenance?', a: 'Ada. Setiap proyek mencakup masa garansi bug, dan kami menyediakan paket maintenance untuk monitoring, update keamanan, serta backup berkala.' },
  { q: 'Teknologi apa yang dipakai?', a: 'Kami memakai stack modern: Next.js, React, TypeScript, Tailwind CSS, Node.js, Flutter, PostgreSQL, dan Laravel — dipilih sesuai kebutuhan proyek agar cepat, aman, dan mudah dikembangkan.' },
]

