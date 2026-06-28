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

// ── Portofolio / studi kasus (masalah → solusi → hasil) ────
export const showcase = [
  {
    n: 1, title: 'Toko Batik Sari Melati', cat: 'Landing Page · UMKM',
    price: 'Konversi +340%', result: '0 → 52 leads/bulan dalam 6 minggu',
    c: '#10C7B2', c2: '#2563FF', kind: 'land', chart: 0,
    tags: ['Next.js', 'Tailwind CSS', 'SEO', 'WhatsApp API'],
    problem: 'Pemilik hanya mengandalkan foto di status WhatsApp. Tidak ada tampilan profesional, sulit ditemukan di Google, dan tidak bisa mengukur berapa yang menghubungi setelah melihat produk.',
    solution: 'Landing page 1 halaman yang cepat (<1.8 detik), dengan galeri produk, testimoni pelanggan, dan CTA WhatsApp teroptimasi. SEO lokal Medan diatur sejak baris kode pertama.',
    features: ['Galeri produk dengan filter kategori', 'CTA WhatsApp dengan pesan pre-filled', 'SEO lokal + Google Business integration', 'Google Analytics & heatmap tracking'],
    tech: 'Next.js 14, Tailwind CSS, Vercel, GA4',
    budget: 'Rp 4,5 Jt',
  },
  {
    n: 2, title: 'CV Bangun Prima Kontraktor', cat: 'Company Profile · Konstruksi',
    price: 'Lead Organik +210%', result: 'Dari 2 → 18 inquiry/bulan via Google',
    c: '#0E2240', c2: '#2563FF', kind: 'land', chart: 0,
    tags: ['Next.js', 'SEO Lokal', 'Schema Markup'],
    problem: 'Website lama dibuat 2018 — lambat, tidak mobile-friendly, dan tidak pernah muncul di Google. Calon klien sulit menemukan perusahaan ini meski sudah cari nama mereknya.',
    solution: 'Redesign total dengan Core Web Vitals 95+, struktur SEO yang benar, halaman portofolio proyek bergambar, dan schema markup untuk konstruksi lokal Medan.',
    features: ['Halaman About, Layanan, Portofolio, Kontak', 'Galeri proyek dengan lightbox', 'Schema markup LocalBusiness & Service', 'Contact form + WhatsApp redirect'],
    tech: 'Next.js 14, Tailwind CSS, Vercel, Schema.org',
    budget: 'Rp 8 Jt',
  },
  {
    n: 3, title: 'Klinik Sehat Bersama', cat: 'Mobile App + Dashboard · Kesehatan',
    price: 'Waktu Tunggu -62%', result: 'Rating Google naik dari 3.8 → 4.7 bintang',
    c: '#1E88A8', c2: '#10C7B2', kind: 'dash', chart: 2,
    tags: ['React', 'Flutter', 'Node.js', 'PostgreSQL'],
    problem: 'Pasien mengantri manual dengan kertas nomor — sering ricuh, pasien kabur karena terlalu lama. Rekam medis masih di buku besar, sulit dicari saat darurat.',
    solution: 'Aplikasi Flutter untuk pasien (ambil nomor antrian dari HP) + dashboard web untuk staff (kelola antrian & rekam medis). Data tersinkronisasi real-time.',
    features: ['Booking antrian via smartphone', 'Rekam medis digital per pasien', 'Dashboard dokter & staff real-time', 'Notifikasi push saat nomor antrian dipanggil', 'Laporan kunjungan harian/bulanan'],
    tech: 'Flutter (Android + iOS), React, Node.js, PostgreSQL, Firebase',
    budget: 'Rp 32 Jt',
  },
  {
    n: 4, title: 'Armada Rental Mitra Jaya', cat: 'Sistem Manajemen · Transportasi',
    price: 'Double Booking 0%', result: 'Pendapatan +28% dari utilisasi armada lebih baik',
    c: '#2563FF', c2: '#10C7B2', kind: 'dash', chart: 1,
    tags: ['React', 'Laravel', 'MySQL', 'Midtrans'],
    problem: 'Pemesanan via WhatsApp dan telepon sering bentrok. Tidak ada sistem jadwal armada, supir sering tidak tahu order terbarunya, dan laporan pendapatan harus dihitung manual setiap hari.',
    solution: 'Sistem rental terintegrasi: booking online dengan kalender real-time, manajemen armada & supir, pembayaran DP via payment gateway, dan laporan otomatis setiap hari.',
    features: ['Booking online + kalender ketersediaan armada', 'Manajemen supir & notifikasi WA otomatis', 'Pembayaran DP via Midtrans', 'Dashboard laporan pendapatan harian', 'Riwayat perjalanan per kendaraan'],
    tech: 'React, Laravel 10, MySQL, Midtrans, WhatsApp Cloud API',
    budget: 'Rp 22 Jt',
  },
  {
    n: 5, title: 'Dealer Motor Sejahtera (3 Cabang)', cat: 'Sistem Inventory · Otomotif',
    price: 'Stok Sinkron 3 Cabang', result: 'Selisih stok & laporan hilang 100%',
    c: '#0E2240', c2: '#10C7B2', kind: 'dash', chart: 2,
    tags: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
    problem: 'Tiga cabang mencatat stok di Excel berbeda. Sering terjadi unit sudah terjual di satu cabang tapi masih ditawarkan di cabang lain. Rekonsiliasi bulanan memakan 2 hari penuh.',
    solution: 'Sistem manajemen dealer terpusat dengan stok real-time lintas cabang, pencatatan unit masuk-keluar, laporan penjualan per cabang, dan role akses per kepala toko.',
    features: ['Stok unit real-time 3 cabang', 'SPK (Surat Pesanan Kendaraan) digital', 'Laporan penjualan per salesperson', 'Dashboard eksekutif multi-cabang', 'Export laporan ke Excel / PDF'],
    tech: 'React, Node.js, PostgreSQL, REST API, Vercel + Railway',
    budget: 'Rp 27 Jt',
  },
  {
    n: 6, title: 'UD Berkah Sembako Grosir', cat: 'ERP Lite · Perdagangan',
    price: 'Laporan -88% Lebih Cepat', result: '8 jam/bulan → 45 menit',
    c: '#10C7B2', c2: '#2563FF', kind: 'dash', chart: 0,
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma'],
    problem: 'Semua transaksi dicatat di buku dan Excel terpisah. Rekap hutang-piutang supplier dan pelanggan sering salah. Pemilik tidak tahu posisi stok & laba realnya kapan pun.',
    solution: 'ERP lite: modul pembelian, penjualan, stok, dan hutang-piutang dalam satu sistem. Dashboard laba-rugi sederhana yang bisa diakses kapan saja dari HP pemilik.',
    features: ['Pencatatan pembelian & penjualan', 'Stok otomatis bertambah/berkurang', 'Manajemen hutang-piutang supplier & pelanggan', 'Laporan laba-rugi & neraca sederhana', 'Akses mobile untuk pemilik'],
    tech: 'Next.js, Node.js, PostgreSQL, Prisma ORM, Vercel',
    budget: 'Rp 35 Jt',
  },
]

// ── Portfolio projects — contoh karya per kategori ──────────
export const portfolioProjects = [
  // LANDING PAGE
  { slug:'batik-sari-melati', cat:'Landing Page', catSlug:'landing-page', title:'Batik Sari Melati', tagline:'Landing page UMKM batik Medan, konversi tinggi', c:'#10C7B2', c2:'#2563FF', kind:'land', budget:'Rp 4,5 Jt', result:'Konversi +340%', result2:'0 → 52 leads/bulan dalam 6 minggu', tags:['Next.js','Tailwind CSS','WhatsApp API','GA4'], problem:'Pemilik hanya mengandalkan foto di status WhatsApp. Tidak ada tampilan profesional dan sulit ditemukan di Google.', solution:'Landing page cepat (<1.8 detik) dengan galeri produk, testimoni, dan CTA WhatsApp teroptimasi. SEO lokal Medan diatur sejak awal.', features:['Galeri produk dengan filter kategori','CTA WhatsApp pesan pre-filled','SEO lokal + Google Business','Analytics & tracking konversi'], tech:'Next.js 14, Tailwind CSS, Vercel, GA4', review:'AFSS benar-benar paham kebutuhan kami. Landing page mereka meningkatkan penjualan 340% dalam 6 minggu. Tidak hanya tampilan, mereka juga bantu strategi CTA!', clientName:'Budi S.', clientRole:'Owner, Batik Sari Melati' },
  { slug:'herbal-nusa', cat:'Landing Page', catSlug:'landing-page', title:'Herbal Nusa Supplement', tagline:'Landing page campaign iklan Meta untuk produk herbal', c:'#1EBE5D', c2:'#10C7B2', kind:'land', budget:'Rp 3,5 Jt', result:'ROAS +4.2x', result2:'CPL turun Rp 45rb → Rp 11rb', tags:['Next.js','Meta Pixel','GA4','WhatsApp'], problem:'Iklan Meta berjalan tapi landing page lama lambat dan tidak mobile-friendly. CPL sangat tinggi karena bounce rate 78%.', solution:'Landing page baru loading < 1.5 detik, social proof, testimonial video embed, dan Meta Pixel lengkap dengan event purchase.', features:['Loading < 1.5 detik (LCP optimal)','Testimoni & social proof','Meta Pixel + konversi event','Form lead dengan validasi'], tech:'Next.js 14, Vercel, Meta Pixel, WhatsApp API', review:'ROAS iklan kami naik drastis setelah ganti landing page ke AFSS. CPL turun dari Rp 45 ribu jadi Rp 11 ribu. Balik modal dalam 2 minggu!', clientName:'Rina W.', clientRole:'Marketing Manager, Herbal Nusa' },
  // COMPANY PROFILE
  { slug:'bangun-prima', cat:'Company Profile', catSlug:'company-profile', title:'CV Bangun Prima', tagline:'Website company profile kontraktor bangunan profesional', c:'#0E2240', c2:'#2563FF', kind:'land', budget:'Rp 8 Jt', result:'Lead Organik +210%', result2:'2 → 18 inquiry/bulan via Google', tags:['Next.js','SEO Lokal','Schema Markup','Google Business'], problem:'Website lama dibuat 2018 — lambat, tidak mobile-friendly, dan tidak pernah muncul di Google.', solution:'Redesign total dengan Core Web Vitals 95+, galeri proyek bergambar, schema markup kontraktor lokal, dan optimasi Google Business.', features:['Halaman About, Layanan, Portofolio, Kontak','Galeri proyek dengan lightbox','Schema markup LocalBusiness','Google Business integration'], tech:'Next.js 14, Tailwind CSS, Vercel, Schema.org', review:'Website baru kami muncul di halaman 1 Google untuk "kontraktor Medan". Inquiry dari online naik 10x dalam 3 bulan!', clientName:'Ahmad F.', clientRole:'Direktur, CV Bangun Prima' },
  { slug:'klinik-bunda-sehat', cat:'Company Profile', catSlug:'company-profile', title:'Klinik Bunda Sehat', tagline:'Website profil klinik kesehatan ibu & anak', c:'#E05563', c2:'#2563FF', kind:'land', budget:'Rp 6,5 Jt', result:'Pasien Baru +65%', result2:'Google Maps: 3.9 → 4.6 bintang', tags:['Next.js','SEO Kesehatan','Google Business','WhatsApp'], problem:'Klinik tidak punya website. Calon pasien sulit menemukan info dokter, jadwal, dan layanan.', solution:'Website profil klinik dengan halaman dokter, jadwal praktek, layanan, dan booking konsultasi via WhatsApp.', features:['Profil dokter & spesialisasi','Jadwal praktek','Booking via WhatsApp','FAQ & edukasi kesehatan'], tech:'Next.js 14, Tailwind CSS, Vercel, WhatsApp API', review:'Pasien baru yang datang karena temukan di Google meningkat drastis. Website ini beneran membantu pertumbuhan klinik kami!', clientName:'dr. Siti R.', clientRole:'Pemilik, Klinik Bunda Sehat' },
  // SOFTWARE CUSTOM
  { slug:'hrconnect', cat:'Software Custom', catSlug:'software-custom', title:'HRConnect', tagline:'Sistem HR & payroll untuk perusahaan manufaktur 150 karyawan', c:'#2563FF', c2:'#7C5CFF', kind:'dash', budget:'Rp 22 Jt', result:'Waktu Payroll -80%', result2:'3 hari → 4 jam setiap bulan', tags:['React','Node.js','PostgreSQL','REST API'], problem:'HR menghitung gaji 150 karyawan di Excel — rawan kesalahan, memakan 3 hari kerja, dan rekap absensi manual terpisah.', solution:'Sistem HR: absensi terintegrasi fingerprint, kalkulasi gaji + lembur + potongan otomatis, slip gaji digital, laporan BPJS.', features:['Integrasi fingerprint absensi','Kalkulasi gaji + lembur + PPh 21','Slip gaji digital via email','Laporan BPJS otomatis','Dashboard kehadiran real-time'], tech:'React, Node.js, PostgreSQL, REST API, Vercel + Railway', review:'Payroll yang biasanya makan 3 hari sekarang selesai 4 jam. Tim HR bisa fokus ke hal yang lebih strategis. Best investment ever!', clientName:'Hendra L.', clientRole:'HRD Manager, PT Maju Industri' },
  { slug:'datasight', cat:'Software Custom', catSlug:'software-custom', title:'DataSight Analytics', tagline:'Dashboard analitik penjualan untuk distributor multi-wilayah', c:'#10C7B2', c2:'#2563FF', kind:'dash', budget:'Rp 14 Jt', result:'Visibilitas Data 100%', result2:'Laporan 2 hari → 15 menit', tags:['React','Node.js','PostgreSQL','Chart.js'], problem:'Data penjualan 5 cabang tersebar di Excel berbeda. Owner tidak bisa lihat performa real-time.', solution:'Dashboard analitik terpusat tarik data semua cabang real-time. Grafik, target vs realisasi, dan export laporan satu klik.', features:['Dashboard multi-cabang real-time','Grafik penjualan harian/bulanan','Target vs realisasi per salesperson','Export Excel/PDF','Alert target tidak tercapai'], tech:'React, Node.js, PostgreSQL, Chart.js, Railway', review:'Sekarang saya bisa lihat performa semua cabang dari HP kapan saja. Laporan 2 hari kini tinggal klik export!', clientName:'Doni P.', clientRole:'Owner, CV Distribusi Nusantara' },
  // ERP
  { slug:'grosirerp', cat:'ERP', catSlug:'erp', title:'GrosirPro ERP', tagline:'ERP toko grosir sembako dengan 200+ supplier', c:'#10C7B2', c2:'#0E2240', kind:'dash', budget:'Rp 35 Jt', result:'Laporan -88% Lebih Cepat', result2:'8 jam → 45 menit per bulan', tags:['Next.js','Node.js','PostgreSQL','Prisma'], problem:'Transaksi dicatat di buku dan Excel terpisah. Rekap hutang-piutang sering salah dan pemilik tidak tahu laba realnya.', solution:'ERP lite: pembelian, penjualan, stok, hutang-piutang, dan laba-rugi dalam satu sistem. Dashboard mobile untuk pemilik.', features:['Pencatatan pembelian & penjualan','Stok otomatis','Hutang-piutang 200+ supplier','Laporan laba-rugi sederhana','Dashboard mobile pemilik'], tech:'Next.js, Node.js, PostgreSQL, Prisma ORM, Vercel', review:'Rekap bulanan yang makan 8 jam sekarang 45 menit. Tidak ada lagi selisih stok atau hutang yang hilang!', clientName:'Pak Wijaya', clientRole:'Pemilik, UD Berkah Sembako' },
  { slug:'manufact-erp', cat:'ERP', catSlug:'erp', title:'ManuFact ERP', tagline:'ERP produksi & inventory untuk pabrik furniture custom', c:'#0E2240', c2:'#7C5CFF', kind:'dash', budget:'Rp 52 Jt', result:'Lead Time -35%', result2:'14 hari → 9 hari per order', tags:['React','Laravel','MySQL','REST API'], problem:'BOM manual di Word, jadwal produksi di whiteboard, inventory tidak akurat. Order sering terlambat karena bahan kehabisan mendadak.', solution:'ERP manufaktur: BOM digital, jadwal produksi, inventory bahan baku, work order, dan laporan biaya produksi per unit.', features:['Bill of Materials digital','Jadwal produksi & work order','Inventory real-time','Laporan biaya per unit','Alert stok minimum'], tech:'React, Laravel 10, MySQL, REST API, AWS EC2', review:'Lead time turun dari 14 ke 9 hari. Alert stok minimum bekerja sempurna, tidak ada lagi kekurangan bahan mendadak!', clientName:'Benny T.', clientRole:'Operations Manager, CV Furniture Prima' },
  // APP MOBILE
  { slug:'klinikq', cat:'App Mobile', catSlug:'app-mobile', title:'KlinikQ', tagline:'Aplikasi antrian digital & rekam medis klinik', c:'#1E88A8', c2:'#10C7B2', kind:'dash', budget:'Rp 32 Jt', result:'Waktu Tunggu -62%', result2:'Rating Google: 3.8 → 4.7 bintang', tags:['Flutter','React','Node.js','Firebase'], problem:'Pasien mengantri manual dengan kertas nomor. Rekam medis masih di buku besar, sulit dicari saat darurat.', solution:'App Flutter untuk pasien (ambil nomor dari HP) + dashboard web staff. Data tersinkronisasi real-time.', features:['Antrian digital dari HP','Notifikasi push giliran','Rekam medis digital','Dashboard staff real-time','Laporan kunjungan'], tech:'Flutter (Android + iOS), React, Node.js, PostgreSQL, Firebase', review:'Pasien tidak perlu antri panjang. Mereka ambil nomor dari HP dan datang saat hampir giliran. Rating Google kami naik dari 3.8 ke 4.7!', clientName:'dr. Andi S.', clientRole:'Direktur, Klinik Sehat Bersama' },
  { slug:'deliverease', cat:'App Mobile', catSlug:'app-mobile', title:'DeliverEase', tagline:'App manajemen pengiriman & tracking untuk kurir lokal', c:'#F59E0B', c2:'#EF4444', kind:'dash', budget:'Rp 28 Jt', result:'On-time Delivery +42%', result2:'Komplain keterlambatan turun 80%', tags:['Flutter','Node.js','PostgreSQL','Google Maps'], problem:'Koordinasi kurir via WhatsApp kacau. Pengirim tidak tahu status paket dan admin tidak bisa pantau posisi kurir.', solution:'3 aplikasi: app kurir, app pengirim (tracking real-time), dan dashboard admin.', features:['Tracking paket real-time di peta','Optimasi rute kurir','Notifikasi status ke pengirim','Tanda tangan digital','Laporan performa kurir'], tech:'Flutter, Node.js, PostgreSQL, Google Maps API, Firebase', review:'Tidak ada lagi pertanyaan "paket saya mana?". Kurir jauh lebih efisien dan komplain turun 80% dalam 2 bulan!', clientName:'Rudi H.', clientRole:'Founder, ExpressKu Courier' },
  // E-COMMERCE
  { slug:'fashionhub', cat:'E-Commerce', catSlug:'ecommerce', title:'FashionHub Store', tagline:'Toko online fashion premium dengan loyalty program', c:'#EC4899', c2:'#8B5CF6', kind:'land', budget:'Rp 24 Jt', result:'Penjualan Online +280%', result2:'Cart abandonment: 71% → 38%', tags:['Next.js','Midtrans','PostgreSQL','Cloudinary'], problem:'Penjualan via Instagram manual dan tidak terukur. Konfirmasi pembayaran via WA, stok tidak akurat, tidak ada data pelanggan.', solution:'Toko online dengan katalog, filter produk, Midtrans, stok otomatis, dan program loyalitas poin.', features:['Katalog + filter ukuran & warna','Payment Midtrans (12 metode)','Stok otomatis','Program loyalitas poin','CS via WhatsApp'], tech:'Next.js 14, Midtrans, PostgreSQL, Cloudinary, Vercel', review:'Penjualan online naik 280% dalam 4 bulan. Tidak ada lagi konfirmasi bayar manual dan stok tidak pernah salah lagi!', clientName:'Lisa M.', clientRole:'CEO, FashionHub Indonesia' },
  { slug:'organicmart', cat:'E-Commerce', catSlug:'ecommerce', title:'OrganicMart', tagline:'E-commerce produk organik dengan sistem berlangganan bulanan', c:'#1EBE5D', c2:'#10C7B2', kind:'land', budget:'Rp 20 Jt', result:'MRR Rp 85 Jt', result2:'320 subscriber aktif dalam 6 bulan', tags:['Next.js','Xendit','Node.js','PostgreSQL'], problem:'Pelanggan setia beli berulang tapi proses order manual setiap bulan merepotkan. Tidak ada sistem berlangganan otomatis.', solution:'Platform e-commerce dengan subscription — pilih paket bulanan, auto-charge via Xendit, produk dikirim sesuai jadwal.', features:['Berlangganan bulanan otomatis','Auto-charge Xendit recurring','Jadwal pengiriman','Dashboard subscriber','Notifikasi renewal'], tech:'Next.js 14, Xendit Recurring, Node.js, PostgreSQL, Railway', review:'Sistem langganan AFSS membuat revenue kami jadi predictable. Dari 0 ke 320 subscriber dengan MRR Rp 85 juta dalam 6 bulan!', clientName:'Maya S.', clientRole:'Co-founder, OrganicMart' },
  // MARKETPLACE
  { slug:'pasarlokal', cat:'Marketplace', catSlug:'marketplace', title:'PasarLokal', tagline:'Marketplace produk lokal UMKM Indonesia + app mobile', c:'#F59E0B', c2:'#EF4444', kind:'dash', budget:'Rp 95 Jt', result:'180+ Seller Aktif', result2:'GMV Rp 420 Jt/bulan dalam 8 bulan', tags:['React','Flutter','Node.js','Midtrans','PostgreSQL'], problem:'UMKM lokal kesulitan jual online. Buyer tidak tahu di mana beli produk lokal berkualitas.', solution:'Marketplace khusus UMKM lokal: seller daftar gratis, upload produk, buyer belanja via web & app mobile.', features:['Registrasi & onboarding seller','Katalog multi-kategori','Payment Midtrans (11 metode)','Komisi & settlement otomatis','App mobile buyer & seller','Rating, review & dispute','Dashboard admin lengkap'], tech:'React, Flutter (Android + iOS), Node.js, PostgreSQL, Midtrans, Vercel + Railway', review:'Dalam 8 bulan ada 180+ seller aktif dan GMV Rp 420 juta per bulan. AFSS deliver tepat waktu dan sistem berjalan stabil. Luar biasa!', clientName:'Kevin A.', clientRole:'CEO, PasarLokal Indonesia' },
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

// ── Testimonials (homepage featured — 3 cards) ─────────────
export const testimonials = [
  {
    name: 'Budi Santoso', role: 'Owner', company: 'Batik Nusantara Medan', initial: 'BS',
    grad: 'linear-gradient(135deg,#2563FF,#10C7B2)',
    star: 5,
    quote: 'AFSS benar-benar paham kebutuhan bisnis kami. Landing page mereka meningkatkan penjualan online 340% dalam 6 minggu. Yang bikin kagum, mereka tidak cuma deliver tampilan — mereka kasih saran copy dan struktur CTA yang terbukti convert.',
    project: 'Landing Page UMKM',
    result: 'Konversi +340%',
  },
  {
    name: 'Dewi Kusuma', role: 'Direktur Operasional', company: 'CV Nusantara Jaya Abadi', initial: 'DK',
    grad: 'linear-gradient(135deg,#0E2240,#2563FF)',
    star: 5,
    quote: 'Sistem ERP-nya mengintegrasikan seluruh operasional kami yang dulunya manual. Efisiensi laporan bulanan dari 8 jam jadi 45 menit. Tim support juga responsif bahkan setelah proyek selesai — itu yang bikin kami percaya untuk proyek berikutnya.',
    project: 'ERP Custom Toko Grosir',
    result: 'Efisiensi +88%',
  },
  {
    name: 'Ahmad Fauzi', role: 'Founder', company: 'KlinikQ App', initial: 'AF',
    grad: 'linear-gradient(135deg,#10C7B2,#2563FF)',
    star: 5,
    quote: 'Dari konsultasi sampai launching, AFSS selalu bantu cari solusi terbaik. Aplikasi mobile klinik kami sekarang dipakai di 3 cabang. Waktu tunggu pasien turun 62% dan rating Google kami naik dari 3.8 jadi 4.7 bintang.',
    project: 'Mobile App + Dashboard Klinik',
    result: 'Rating Google 4.7⭐',
  },
]

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
