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
  {
    id: 'code', n: 100, suffix: '%',
    i18n: {
      id: { label: 'Kode Milik Klien' },
      en: { label: 'Client-Owned Code' },
      zh: { label: '代码归客户所有' },
    },
  },
  {
    id: 'support', n: 24, suffix: '/7',
    i18n: {
      id: { label: 'Maintenance & Support' },
      en: { label: 'Maintenance & Support' },
      zh: { label: '维护与支持' },
    },
  },
]

// ── Trust bar: nama klien / industri (logo grayscale, satu baris) ──
// Teks dipakai sebagai "logo" — ganti dengan logo asli bila tersedia.
export const clients = [
  {
    key: 'retail-umkm',
    i18n: {
      id: { label: 'Retail & UMKM' },
      en: { label: 'Retail & SMEs' },
      zh: { label: '零售与中小微企业' },
    },
  },
  {
    key: 'klinik-kesehatan',
    i18n: {
      id: { label: 'Klinik & Kesehatan' },
      en: { label: 'Clinics & Healthcare' },
      zh: { label: '诊所与医疗健康' },
    },
  },
  {
    key: 'kontraktor',
    i18n: {
      id: { label: 'Kontraktor' },
      en: { label: 'Contractors' },
      zh: { label: '承包商' },
    },
  },
  {
    key: 'logistik',
    i18n: {
      id: { label: 'Logistik' },
      en: { label: 'Logistics' },
      zh: { label: '物流' },
    },
  },
  {
    key: 'pendidikan',
    i18n: {
      id: { label: 'Pendidikan' },
      en: { label: 'Education' },
      zh: { label: '教育' },
    },
  },
  {
    key: 'fnb',
    i18n: {
      id: { label: 'F&B' },
      en: { label: 'F&B' },
      zh: { label: '餐饮' },
    },
  },
  {
    key: 'koperasi',
    i18n: {
      id: { label: 'Koperasi' },
      en: { label: 'Cooperatives' },
      zh: { label: '合作社' },
    },
  },
  {
    key: 'manufaktur',
    i18n: {
      id: { label: 'Manufaktur' },
      en: { label: 'Manufacturing' },
      zh: { label: '制造业' },
    },
  },
]

// ── Layanan utama — 6 produk inti ────────────────────────
export const products = [
  {
    slug: 'landing-page',
    icon: 'fa-solid fa-rectangle-ad',
    hot: false,
    i18n: {
      id: {
        name: 'Landing Page',
        desc: 'Halaman konversi tinggi untuk iklan, produk, atau kampanye — persuasif, cepat load, dan terukur hasilnya.',
        metric: 'Konversi tinggi',
        feats: ['Desain fokus konversi & CTA jelas', 'Loading < 2 detik (LCP optimal)', 'Form lead + CTA WhatsApp', 'Tracking & analytics siap'],
      },
      en: {
        name: 'Landing Page',
        desc: 'A high-conversion page for ads, products, or campaigns — persuasive, fast-loading, and built to measure results.',
        metric: 'High conversion',
        feats: ['Conversion-focused design & clear CTAs', 'Load time under 2s (optimal LCP)', 'Lead form + WhatsApp CTA', 'Tracking & analytics ready'],
      },
      zh: {
        name: '落地页',
        desc: '为广告、产品或营销活动打造的高转化页面——极具说服力、加载迅速，且效果可量化。',
        metric: '高转化率',
        feats: ['以转化为核心的设计与清晰的CTA', '加载时间低于2秒（最佳LCP）', '获客表单 + WhatsApp咨询按钮', '内置追踪与数据分析'],
      },
    },
  },
  {
    slug: 'company-profile',
    icon: 'fa-solid fa-briefcase',
    hot: false,
    i18n: {
      id: {
        name: 'Company Profile',
        desc: 'Website profil perusahaan yang membangun kepercayaan, menampilkan layanan bisnis, dan mengundang calon klien menghubungi Anda.',
        metric: 'Profesional & kredibel',
        feats: ['Desain corporate custom & responsif', 'SEO lokal + Google Business', 'Halaman Tentang, Layanan, Portofolio, Kontak', 'Mudah diperbarui mandiri'],
      },
      en: {
        name: 'Company Profile',
        desc: 'A corporate website that builds trust, showcases your services, and invites prospective clients to reach out.',
        metric: 'Professional & credible',
        feats: ['Custom, responsive corporate design', 'Local SEO + Google Business', 'About, Services, Portfolio & Contact pages', 'Easy to update yourself'],
      },
      zh: {
        name: '企业官网',
        desc: '建立信任、展示业务服务，并邀请潜在客户主动联系您的企业形象网站。',
        metric: '专业可信',
        feats: ['定制化响应式企业设计', '本地SEO优化 + Google商家资料', '关于我们、服务、作品集、联系页面', '可自行轻松更新内容'],
      },
    },
  },
  {
    slug: 'software-custom',
    icon: 'fa-solid fa-code',
    hot: false,
    i18n: {
      id: {
        name: 'Software Custom',
        desc: 'Aplikasi web, dashboard, atau sistem internal yang dibuat dari nol sesuai alur kerja bisnis Anda — bukan template generik.',
        metric: 'Sesuai kebutuhan',
        feats: ['Web app & dashboard real-time', 'Multi-user & role access (RBAC)', 'Laporan & export Excel/PDF', 'Integrasi API & sistem existing'],
      },
      en: {
        name: 'Custom Software',
        desc: 'Web apps, dashboards, or internal systems built from scratch around your exact business workflow — not a generic template.',
        metric: 'Built to fit',
        feats: ['Real-time web app & dashboard', 'Multi-user & role-based access (RBAC)', 'Reports & Excel/PDF export', 'API integration with existing systems'],
      },
      zh: {
        name: '定制软件',
        desc: '根据您的业务流程从零打造的Web应用、仪表盘或内部系统——而非通用模板。',
        metric: '按需定制',
        feats: ['实时Web应用与仪表盘', '多用户与角色权限管理（RBAC）', '报表与Excel/PDF导出', '与现有系统的API集成'],
      },
    },
  },
  {
    slug: 'aplikasi-mobile',
    icon: 'fa-solid fa-mobile-screen',
    hot: false,
    i18n: {
      id: {
        name: 'Aplikasi Mobile',
        desc: 'Aplikasi Android & iOS cross-platform yang ringan, cepat, dan nyaman digunakan — siap dipublikasikan ke Play Store & App Store.',
        metric: 'Android & iOS',
        feats: ['Flutter cross-platform (1 codebase)', 'UI/UX desain custom', 'Integrasi API & notifikasi push', 'Siap publish Play Store & App Store'],
      },
      en: {
        name: 'Mobile App',
        desc: 'A lightweight, fast, and comfortable cross-platform Android & iOS app — ready to publish on the Play Store & App Store.',
        metric: 'Android & iOS',
        feats: ['Flutter cross-platform (1 codebase)', 'Custom UI/UX design', 'API integration & push notifications', 'Ready for Play Store & App Store'],
      },
      zh: {
        name: '移动应用',
        desc: '轻量、快速、体验舒适的Android与iOS跨平台应用——随时可发布至Play Store与App Store。',
        metric: 'Android与iOS',
        feats: ['Flutter跨平台（单一代码库）', '定制UI/UX设计', 'API集成与推送通知', '可发布至Play Store与App Store'],
      },
    },
  },
  {
    slug: 'erp',
    icon: 'fa-solid fa-circle-nodes',
    hot: true,
    i18n: {
      id: {
        name: 'ERP (Enterprise Resource Planning)',
        desc: 'Sistem ERP custom yang menyatukan keuangan, inventory, SDM, produksi, dan penjualan dalam satu platform terpusat.',
        metric: 'Efisiensi operasional',
        feats: ['Modul keuangan & akuntansi', 'Inventory & manajemen gudang', 'HR, absensi & penggajian', 'Laporan eksekutif real-time'],
      },
      en: {
        name: 'ERP (Enterprise Resource Planning)',
        desc: 'A custom ERP system that unifies finance, inventory, HR, production, and sales in one centralized platform.',
        metric: 'Operational efficiency',
        feats: ['Finance & accounting module', 'Inventory & warehouse management', 'HR, attendance & payroll', 'Real-time executive reporting'],
      },
      zh: {
        name: 'ERP企业资源规划系统',
        desc: '将财务、库存、人力资源、生产与销售整合于一体的定制化ERP系统。',
        metric: '提升运营效率',
        feats: ['财务与会计模块', '库存与仓库管理', '人力资源、考勤与薪资管理', '实时高管报表'],
      },
    },
  },
  {
    slug: 'ecommerce',
    icon: 'fa-solid fa-cart-shopping',
    hot: false,
    i18n: {
      id: {
        name: 'E-Commerce / Toko Online',
        desc: 'Toko online custom dengan payment gateway lokal, manajemen produk & stok, dan dashboard penjualan yang lengkap.',
        metric: 'Siap berjualan',
        feats: ['Payment gateway Midtrans / Xendit', 'Manajemen produk, kategori & stok', 'Kalkulasi ongkir otomatis', 'Dashboard & laporan penjualan'],
      },
      en: {
        name: 'E-Commerce / Online Store',
        desc: 'A custom online store with local payment gateways, product & stock management, and a complete sales dashboard.',
        metric: 'Ready to sell',
        feats: ['Midtrans / Xendit payment gateway', 'Product, category & stock management', 'Automatic shipping cost calculation', 'Sales dashboard & reports'],
      },
      zh: {
        name: '电商/在线商店',
        desc: '集成本地支付网关、产品与库存管理及完整销售仪表盘的定制在线商店。',
        metric: '即刻开卖',
        feats: ['Midtrans / Xendit支付网关', '产品、分类与库存管理', '自动运费计算', '销售仪表盘与报表'],
      },
    },
  },
  {
    slug: 'marketplace',
    icon: 'fa-solid fa-store',
    hot: false,
    i18n: {
      id: {
        name: 'Marketplace',
        desc: 'Platform multi-vendor lengkap — seller mendaftar, upload produk, buyer bertransaksi, admin kelola semua dari satu panel.',
        metric: 'Multi-vendor',
        feats: ['Registrasi & manajemen seller', 'Komisi & settlement otomatis', 'Review, rating & dispute', 'App mobile buyer + seller tersedia'],
      },
      en: {
        name: 'Marketplace',
        desc: 'A complete multi-vendor platform — sellers register and upload products, buyers transact, and admins manage everything from one panel.',
        metric: 'Multi-vendor',
        feats: ['Seller registration & management', 'Automatic commission & settlement', 'Reviews, ratings & dispute handling', 'Buyer + seller mobile apps available'],
      },
      zh: {
        name: '多商户平台',
        desc: '完整的多商户平台——卖家注册上架商品，买家下单交易，管理员在同一后台统一管理。',
        metric: '多商户支持',
        feats: ['卖家注册与管理', '自动佣金结算', '评价、评分与纠纷处理', '提供买家与卖家移动应用'],
      },
    },
  },
]

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug) || null

// ── Kenapa memilih AFSS (diferensiasi) ─────────────────────
export const why = [
  {
    icon: 'fa-solid fa-code',
    i18n: {
      id: { title: 'Kode bersih & terdokumentasi', desc: 'Tidak ada vendor lock-in. Tim Anda bisa melanjutkan kapan saja — kode dan dokumentasinya milik Anda sepenuhnya.' },
      en: { title: 'Clean, well-documented code', desc: 'No vendor lock-in. Your team can take over anytime — the code and its documentation belong entirely to you.' },
      zh: { title: '代码整洁、文档完善', desc: '无供应商锁定。您的团队随时可以接手——代码与文档完全归您所有。' },
    },
  },
  {
    icon: 'fa-solid fa-gauge-high',
    i18n: {
      id: { title: 'Cepat & SEO-ready sejak awal', desc: 'Dibangun untuk skor Core Web Vitals tinggi, sehingga lebih mudah ditemukan di Google dan nyaman dipakai.' },
      en: { title: 'Fast & SEO-ready from day one', desc: 'Built for high Core Web Vitals scores, so it is easier to find on Google and pleasant to use.' },
      zh: { title: '从一开始就快速且符合SEO要求', desc: '专为高Core Web Vitals评分而构建，更容易被Google收录，使用体验也更流畅。' },
    },
  },
  {
    icon: 'fa-solid fa-handshake',
    i18n: {
      id: { title: 'Tim lokal, komunikasi cepat', desc: 'Tanpa beda zona waktu. Kami langsung paham konteks bisnis Indonesia dan responsif di setiap tahap.' },
      en: { title: 'Local team, fast communication', desc: 'No time-zone gap. We understand the Indonesian business context immediately and stay responsive at every stage.' },
      zh: { title: '本地团队，沟通高效', desc: '没有时差问题。我们深谙印尼本地商业环境，各阶段都能快速响应。' },
    },
  },
  {
    icon: 'fa-solid fa-receipt',
    i18n: {
      id: { title: 'Transparan', desc: 'Harga dan timeline jelas di depan. Tanpa biaya tersembunyi, tanpa kejutan di tengah jalan.' },
      en: { title: 'Transparent', desc: 'Clear pricing and timeline upfront. No hidden fees, no surprises along the way.' },
      zh: { title: '透明公开', desc: '价格与时间表提前明确说明。没有隐藏费用，过程中不会有意外。' },
    },
  },
]

// ── Proses kerja (6 langkah, bangun kepercayaan) ───────────
export const workflow = [
  {
    step: '01', icon: 'fa-solid fa-comments',
    i18n: {
      id: { title: 'Konsultasi & Discovery', desc: 'Kami pelajari kebutuhan & tujuan bisnis Anda lebih dulu. Gratis, tanpa tekanan.' },
      en: { title: 'Consultation & Discovery', desc: 'We first learn about your business needs and goals. Free, no pressure.' },
      zh: { title: '咨询与需求梳理', desc: '我们首先了解您的业务需求与目标。全程免费，无任何压力。' },
    },
  },
  {
    step: '02', icon: 'fa-solid fa-file-invoice',
    i18n: {
      id: { title: 'Proposal & Estimasi', desc: 'Ruang lingkup, harga, dan timeline yang jelas dan transparan di awal.' },
      en: { title: 'Proposal & Estimate', desc: 'Clear, transparent scope, pricing, and timeline from the very start.' },
      zh: { title: '方案与报价', desc: '一开始就明确清晰的项目范围、价格与时间表。' },
    },
  },
  {
    step: '03', icon: 'fa-solid fa-pen-ruler',
    i18n: {
      id: { title: 'Desain', desc: 'Rancang UI/UX yang sesuai brand dan terbukti meningkatkan konversi.' },
      en: { title: 'Design', desc: 'UI/UX design tailored to your brand and proven to boost conversion.' },
      zh: { title: '设计', desc: '打造符合品牌调性、且能有效提升转化率的UI/UX设计。' },
    },
  },
  {
    step: '04', icon: 'fa-solid fa-code',
    i18n: {
      id: { title: 'Development', desc: 'Bangun sistem dengan kode bersih & update progres berkala.' },
      en: { title: 'Development', desc: 'Building the system with clean code and regular progress updates.' },
      zh: { title: '开发', desc: '以整洁的代码构建系统，并定期同步开发进度。' },
    },
  },
  {
    step: '05', icon: 'fa-solid fa-rocket',
    i18n: {
      id: { title: 'Testing & Launch', desc: 'Uji menyeluruh lalu rilis dengan dukungan penuh saat peluncuran.' },
      en: { title: 'Testing & Launch', desc: 'Thorough testing, then launch with full support along the way.' },
      zh: { title: '测试与上线', desc: '全面测试后正式上线，并在上线期间提供全程支持。' },
    },
  },
  {
    step: '06', icon: 'fa-solid fa-headset',
    i18n: {
      id: { title: 'Maintenance', desc: 'Monitoring, update, dan perbaikan supaya sistem terus berjalan optimal.' },
      en: { title: 'Maintenance', desc: 'Monitoring, updates, and fixes to keep the system running at its best.' },
      zh: { title: '维护', desc: '持续监控、更新与修复，确保系统始终保持最佳运行状态。' },
    },
  },
]

// ── Portfolio projects — contoh karya per kategori ──────────
export const portfolioProjects = [
  // ERP
  {
    slug: 'erp-kontraktor', catSlug: 'erp', title: 'AFSS Contractor ERP',
    c: '#0E2240', c2: '#2563FF', kind: 'dash',
    tags: ['Bootstrap', 'Vanilla JS', 'Multi-Role', 'Demo'],
    clientName: 'Tim AFSS',
    visitUrl: 'https://afss.tech/portofolio/erp/kontraktor/',
    image: '/portofolio/erp/kontraktor/mockup/dashboard.webp',
    images: ['/portofolio/erp/kontraktor/mockup/dashboard.webp', '/portofolio/erp/kontraktor/mockup/project-hpp.webp', '/portofolio/erp/kontraktor/mockup/mobile-lapangan.webp'],
    i18n: {
      id: {
        cat: 'ERP',
        tagline: 'Sistem ERP kontraktor: proyek, RAB, keuangan, SDM & gudang terintegrasi',
        budget: 'Rp 48 Jt',
        result: 'Efisiensi Ops +60%',
        result2: 'Laporan proyek real-time, 0 delay',
        problem: 'Kontraktor mengelola proyek, RAB, pengadaan material, absensi mandor, dan laporan keuangan di file Excel terpisah — sering tidak sinkron dan rawan hilang.',
        solution: 'Sistem ERP kontraktor terpadu: login multi-role (Owner, PM, Finance, Mandor, Warehouse), dashboard proyek real-time, RAB, BAST, penggajian, dan laporan keuangan.',
        features: ['Dashboard eksekutif per proyek & keuangan', 'Manajemen proyek & RAB', 'Modul keuangan & faktur BAST', 'HR: absensi, penggajian, PPh 21', 'Gudang & pengadaan material', 'Multi-role: Owner / Admin / Finance / PM / Mandor / Warehouse'],
        review: 'ERP ini mengubah cara kami mengelola proyek. Semua data proyek, keuangan, dan SDM kini terpusat — Owner bisa pantau dari mana saja.',
        clientRole: 'Demo Project — AFSS Contractor ERP',
        imageCaptions: ['Dashboard Eksekutif — kontrol proyek, HPP, stok & keuangan dalam satu layar', 'Kontrol Proyek & HPP — RAB vs realisasi biaya, profit margin per proyek real-time', 'Mobile Lapangan — mandor input absensi, foto progres & request material langsung dari HP'],
        benefits: [
          { icon: 'fa-solid fa-chart-pie', title: 'Profit per proyek transparan', desc: 'HPP vs RAB dan realisasi biaya terlihat real-time — Owner tahu untung-rugi tiap proyek tanpa tunggu tutup buku.' },
          { icon: 'fa-solid fa-clock-rotate-left', title: 'Laporan instan, bukan akhir bulan', desc: 'Dashboard eksekutif menyatukan keuangan, stok, dan progres proyek — laporan yang biasanya makan berhari-hari kini sekali klik.' },
          { icon: 'fa-solid fa-people-roof', title: 'Akses sesuai peran kerja', desc: 'Owner, PM, Finance, Mandor, dan Warehouse masing-masing punya akses sendiri — data sensitif tetap terjaga, kerja tetap cepat.' },
          { icon: 'fa-solid fa-location-dot', title: 'Mandor lapangan tanpa kertas', desc: 'Absensi, foto progres, dan permintaan material langsung dari HP di lokasi proyek — tidak perlu bolak-balik kantor.' },
          { icon: 'fa-solid fa-file-invoice-dollar', title: 'BAST & penggajian otomatis', desc: 'Faktur termin (BAST), absensi, hingga PPh 21 dihitung sistem — mengurangi human error di proses keuangan & HR.' },
          { icon: 'fa-solid fa-boxes-stacked', title: 'Stok material selalu akurat', desc: 'Pengadaan dan pemakaian material tercatat per proyek — mencegah kelebihan beli atau kehabisan stok mendadak.' },
        ],
      },
      en: {
        cat: 'ERP',
        tagline: 'Integrated contractor ERP: projects, budgets, finance, HR & warehouse in one system',
        budget: 'Rp 48M',
        result: 'Ops Efficiency +60%',
        result2: 'Real-time project reports, zero delay',
        problem: 'The contractor managed projects, budgets (RAB), material procurement, foreman attendance, and financial reports across separate Excel files — often out of sync and prone to being lost.',
        solution: 'A unified contractor ERP system: multi-role login (Owner, PM, Finance, Foreman, Warehouse), real-time project dashboard, budgeting, handover invoices (BAST), payroll, and financial reporting.',
        features: ['Executive dashboard per project & finance', 'Project & budget (RAB) management', 'Finance module & BAST handover invoices', 'HR: attendance, payroll, income tax (PPh 21)', 'Warehouse & material procurement', 'Multi-role: Owner / Admin / Finance / PM / Foreman / Warehouse'],
        review: 'This ERP changed how we manage projects. All project, finance, and HR data is now centralized — the Owner can monitor everything from anywhere.',
        clientRole: 'Demo Project — AFSS Contractor ERP',
        imageCaptions: ['Executive Dashboard — project control, cost of goods, stock & finance in one screen', 'Project & Cost Control — budget vs actual cost, real-time profit margin per project', 'Field Mobile View — foremen log attendance, progress photos & material requests straight from their phone'],
        benefits: [
          { icon: 'fa-solid fa-chart-pie', title: 'Transparent profit per project', desc: 'Cost of goods vs budget and actual costs are visible in real time — the Owner knows the profit or loss on every project without waiting for month-end close.' },
          { icon: 'fa-solid fa-clock-rotate-left', title: 'Instant reports, not month-end', desc: 'The executive dashboard consolidates finance, stock, and project progress — reports that used to take days now take one click.' },
          { icon: 'fa-solid fa-people-roof', title: 'Access matched to each role', desc: 'Owner, PM, Finance, Foreman, and Warehouse each get their own access level — sensitive data stays protected while work stays fast.' },
          { icon: 'fa-solid fa-location-dot', title: 'Paperless field foremen', desc: 'Attendance, progress photos, and material requests happen straight from a phone on-site — no more trips back to the office.' },
          { icon: 'fa-solid fa-file-invoice-dollar', title: 'Automated handover invoices & payroll', desc: 'Milestone invoices (BAST), attendance, and income tax (PPh 21) are all calculated by the system — reducing human error in finance and HR.' },
          { icon: 'fa-solid fa-boxes-stacked', title: 'Always-accurate material stock', desc: 'Procurement and material usage are logged per project — preventing over-buying or sudden stockouts.' },
        ],
      },
      zh: {
        cat: 'ERP系统',
        tagline: '承包商ERP系统：项目、预算、财务、人力资源与仓库一体化整合',
        budget: 'Rp 48M',
        result: '运营效率提升60%',
        result2: '实时项目报表，零延迟',
        problem: '承包商此前使用分散的Excel文件管理项目、预算（RAB）、材料采购、工头考勤与财务报表——数据经常不同步，且容易丢失。',
        solution: '打造统一的承包商ERP系统：多角色登录（业主、项目经理、财务、工头、仓库），实时项目仪表盘、预算管理、验收单据（BAST）、薪资发放与财务报表。',
        features: ['按项目与财务划分的高管仪表盘', '项目与预算（RAB）管理', '财务模块与BAST验收发票', '人力资源：考勤、薪资、个人所得税（PPh 21）', '仓库与材料采购', '多角色支持：业主/管理员/财务/项目经理/工头/仓库'],
        review: '这套ERP系统彻底改变了我们管理项目的方式。所有项目、财务与人力资源数据现已集中管理——业主可以随时随地掌握全局。',
        clientRole: '演示项目——AFSS承包商ERP',
        imageCaptions: ['高管仪表盘——项目管控、成本、库存与财务一屏统览', '项目与成本管控——预算与实际成本对比，实时查看各项目利润率', '现场移动端——工头可直接通过手机录入考勤、上传进度照片并申请材料'],
        benefits: [
          { icon: 'fa-solid fa-chart-pie', title: '项目利润透明可见', desc: '成本与预算、实际支出实时对比——业主无需等到月结即可掌握每个项目的盈亏情况。' },
          { icon: 'fa-solid fa-clock-rotate-left', title: '即时报表，无需等到月底', desc: '高管仪表盘整合财务、库存与项目进度——过去需要数天完成的报表如今一键即得。' },
          { icon: 'fa-solid fa-people-roof', title: '按角色分配访问权限', desc: '业主、项目经理、财务、工头与仓库各自拥有独立权限——敏感数据得到保护，工作效率不受影响。' },
          { icon: 'fa-solid fa-location-dot', title: '现场工头无纸化作业', desc: '考勤、进度照片与材料申请均可在项目现场通过手机直接完成，无需往返办公室。' },
          { icon: 'fa-solid fa-file-invoice-dollar', title: '验收单据与薪资自动化', desc: '阶段性验收发票（BAST）、考勤乃至个人所得税（PPh 21）均由系统自动计算，大幅减少财务与人事流程中的人为错误。' },
          { icon: 'fa-solid fa-boxes-stacked', title: '材料库存始终精准', desc: '按项目记录材料采购与使用情况，避免超量采购或突然缺货。' },
        ],
      },
    },
  },
  // LANDING PAGE
  {
    slug: 'koperasi-emas-kimberli', catSlug: 'landing-page', title: 'Koperasi Emas Kimberli',
    c: '#1A1305', c2: '#D4A93B', kind: 'land',
    tags: ['Next.js', 'Supabase', 'Multi-Role Dashboard', 'Realtime Gold Price'],
    visitUrl: 'https://afss.tech/portofolio/landing_page/koperasi_emas',
    clientName: 'Tim AFSS',
    tech: 'Next.js 15, TypeScript, Supabase, Tailwind CSS, Vercel',
    image: '/portofolio/landing-page/koperasi-emas-kimberli/mockup/hero.webp',
    images: ['/portofolio/landing-page/koperasi-emas-kimberli/mockup/hero.webp', '/portofolio/landing-page/koperasi-emas-kimberli/mockup/harga-emas.webp', '/portofolio/landing-page/koperasi-emas-kimberli/mockup/simulasi.webp', '/portofolio/landing-page/koperasi-emas-kimberli/mockup/mobile.webp'],
    imagePortrait: [false, false, false, true],
    i18n: {
      id: {
        cat: 'Landing Page',
        tagline: 'Platform investasi emas koperasi: tabungan, cicil emas, gadai simpanan & simulasi real-time',
        budget: 'Rp 14 Jt',
        result: 'Konversi Daftar +180%',
        result2: '150.000+ anggota terlayani di platform',
        problem: 'Koperasi emas mengandalkan brosur dan WhatsApp manual untuk jualan produk tabungan & cicil emas. Calon anggota tidak bisa cek harga emas terkini atau simulasi cicilan sendiri, sehingga banyak yang ragu mendaftar.',
        solution: 'Landing page investasi emas dengan harga emas real-time, simulator cicilan & buyback interaktif, serta dashboard multi-role (Admin, Master, Member) untuk kelola anggota, tabungan, dan SHU tahunan.',
        features: ['Harga emas hari ini real-time + grafik 30 hari', 'Simulasi cicilan & buyback interaktif', 'Tabungan emas, gadai simpanan, SHU tahunan', 'Dashboard member: portofolio & riwayat transaksi', 'Dashboard admin/master: kelola anggota & transaksi', 'Autentikasi & registrasi anggota terverifikasi'],
        review: 'Anggota sekarang bisa cek harga emas dan simulasi cicilan sendiri kapan saja — tim kami tidak perlu lagi jawab pertanyaan yang sama berulang-ulang di WhatsApp.',
        clientRole: 'Demo Project — Koperasi Emas Kimberli',
        imageCaptions: ['Beranda — harga emas live, simulasi cicilan, dan ringkasan layanan dalam satu layar', 'Harga Emas Hari Ini — perbandingan harga & produk simpanan terbaru', 'Halaman Harga Emas — grafik 30 hari, simulasi cicilan & buyback dengan estimasi hasil', 'Tampilan Mobile — akses harga emas dan simulasi investasi langsung dari HP'],
        benefits: [
          { icon: 'fa-solid fa-coins', title: 'Harga emas selalu update', desc: 'Anggota lihat harga beli/buyback hari ini dan grafik 30 hari tanpa perlu tanya admin — kepercayaan naik karena transparan.' },
          { icon: 'fa-solid fa-calculator', title: 'Simulasi sebelum daftar', desc: 'Calon anggota bisa hitung sendiri cicilan & estimasi hasil sebelum mendaftar — mengurangi keraguan dan mempercepat keputusan.' },
          { icon: 'fa-solid fa-users-gear', title: 'Operasional admin lebih ringan', desc: 'Dashboard admin & master mengelola anggota, transaksi, dan SHU tahunan tanpa rekap manual di Excel.' },
          { icon: 'fa-solid fa-shield-halved', title: 'Kepercayaan & legalitas terlihat', desc: 'Status terdaftar Kementerian Koperasi & UKM RI dan informasi keamanan ditampilkan jelas di landing page — penting untuk produk finansial.' },
        ],
      },
      en: {
        cat: 'Landing Page',
        tagline: 'Cooperative gold investment platform: savings, gold installments, savings-backed loans & real-time simulation',
        budget: 'Rp 14M',
        result: 'Sign-up Conversion +180%',
        result2: '150,000+ members served on the platform',
        problem: 'The gold cooperative relied on brochures and manual WhatsApp chats to sell its savings and gold-installment products. Prospective members had no way to check current gold prices or run their own installment simulation, leaving many hesitant to sign up.',
        solution: 'A gold-investment landing page with real-time gold prices, an interactive installment & buyback simulator, plus a multi-role dashboard (Admin, Master, Member) to manage members, savings, and the annual profit-sharing (SHU).',
        features: ['Real-time daily gold price + 30-day chart', 'Interactive installment & buyback simulation', 'Gold savings, savings-backed loans, annual SHU', 'Member dashboard: portfolio & transaction history', 'Admin/master dashboard: manage members & transactions', 'Verified member authentication & registration'],
        review: 'Members can now check gold prices and run their own installment simulations anytime — our team no longer has to answer the same questions over and over on WhatsApp.',
        clientRole: 'Demo Project — Koperasi Emas Kimberli',
        imageCaptions: ['Homepage — live gold price, installment simulation, and service summary in one screen', "Today's Gold Price — price comparison & latest savings products", '30-Day Chart Page — installment & buyback simulation with estimated returns', 'Mobile View — check gold prices and run investment simulations right from your phone'],
        benefits: [
          { icon: 'fa-solid fa-coins', title: 'Gold prices always up to date', desc: "Members see today's buy/buyback price and a 30-day chart without asking an admin — transparency builds trust." },
          { icon: 'fa-solid fa-calculator', title: 'Simulate before signing up', desc: 'Prospective members can calculate installments and estimated returns themselves before registering — reducing hesitation and speeding up decisions.' },
          { icon: 'fa-solid fa-users-gear', title: 'Lighter admin workload', desc: 'The admin & master dashboard manages members, transactions, and the annual SHU without manual Excel recaps.' },
          { icon: 'fa-solid fa-shield-halved', title: 'Visible trust & legal standing', desc: "Registration status with Indonesia's Ministry of Cooperatives & SMEs and security information are clearly shown on the landing page — essential for a financial product." },
        ],
      },
      zh: {
        cat: '落地页',
        tagline: '合作社黄金投资平台：储蓄、黄金分期、存款质押贷款与实时模拟计算',
        budget: 'Rp 14M',
        result: '注册转化率提升180%',
        result2: '平台已服务超过15万名会员',
        problem: '黄金合作社此前依靠宣传册与人工WhatsApp沟通来推广储蓄与黄金分期产品。潜在会员无法自行查询实时金价或进行分期模拟计算，导致许多人对注册犹豫不决。',
        solution: '打造黄金投资落地页，提供实时金价、互动式分期与回购模拟计算器，并配备多角色仪表盘（管理员、主管、会员）以管理会员信息、储蓄与年度盈余分配（SHU）。',
        features: ['实时每日金价 + 30天走势图', '互动式分期与回购模拟计算', '黄金储蓄、存款质押贷款、年度盈余分配', '会员仪表盘：投资组合与交易记录', '管理员/主管仪表盘：会员与交易管理', '经验证的会员身份认证与注册'],
        review: '会员现在可以随时自行查询金价并进行分期模拟计算——我们的团队再也不用在WhatsApp上反复回答相同的问题。',
        clientRole: '演示项目——Koperasi Emas Kimberli黄金合作社',
        imageCaptions: ['首页——实时金价、分期模拟与服务概览一屏呈现', '今日金价——价格对比与最新储蓄产品', '30天走势页面——分期与回购模拟及预估收益', '移动端界面——随时通过手机查询金价并进行投资模拟'],
        benefits: [
          { icon: 'fa-solid fa-coins', title: '金价实时更新', desc: '会员无需询问管理员即可查看当日买入/回购价格及30天走势图——透明度提升带来更高信任。' },
          { icon: 'fa-solid fa-calculator', title: '注册前即可模拟计算', desc: '潜在会员可在注册前自行计算分期方案与预估收益——减少犹豫，加快决策。' },
          { icon: 'fa-solid fa-users-gear', title: '管理运营更轻松', desc: '管理员与主管仪表盘可管理会员、交易与年度盈余分配，无需再手动整理Excel表格。' },
          { icon: 'fa-solid fa-shield-halved', title: '信任与合规清晰可见', desc: '落地页明确展示印尼合作社与中小企业部的注册状态及安全信息——这对金融类产品至关重要。' },
        ],
      },
    },
  },
  {
    slug: 'radiance-aesthetic-clinic', catSlug: 'landing-page', title: 'Radiance Aesthetic Clinic',
    c: '#1B2A22', c2: '#4E9E7C', kind: 'land',
    tags: ['React', 'Booking WhatsApp', 'Before-After Gallery', 'SEO Lokal'],
    clientName: 'Tim AFSS',
    visitUrl: 'https://afss.tech/portofolio/landing-page/radiance',
    tech: 'React, Tailwind CSS, Vercel, SEO on-page',
    image: '/portofolio/landing-page/radiance-aesthetic-clinic/mockup/hero.webp',
    images: ['/portofolio/landing-page/radiance-aesthetic-clinic/mockup/hero.webp', '/portofolio/landing-page/radiance-aesthetic-clinic/mockup/catalog.webp', '/portofolio/landing-page/radiance-aesthetic-clinic/mockup/gallery.webp', '/portofolio/landing-page/radiance-aesthetic-clinic/mockup/mobile.webp'],
    imagePortrait: [false, false, false, true],
    i18n: {
      id: {
        cat: 'Landing Page',
        tagline: 'Landing page klinik estetika: katalog treatment, galeri before-after, dan booking konsultasi langsung ke WhatsApp',
        budget: 'Rp 12 Jt',
        result: 'Booking Konsultasi +95%',
        result2: 'Waktu respons admin turun dari semalam jadi hitungan jam',
        problem: 'Klinik mengandalkan Instagram dan WhatsApp manual untuk terima booking konsultasi. Calon pasien kesulitan melihat daftar treatment, kisaran harga, dan hasil nyata sebelum memutuskan datang — banyak yang ragu dan akhirnya batal chat.',
        solution: 'Landing page satu halaman dengan katalog treatment & kisaran harga, galeri before-after per kategori, dan form booking yang langsung terhubung ke WhatsApp admin lengkap dengan detail treatment yang diminati.',
        features: ['Katalog treatment & kisaran harga', 'Galeri before-after per kategori', 'Form booking konsultasi ke WhatsApp', 'Testimoni pasien terverifikasi', 'SEO lokal untuk pencarian "klinik estetika" di kota terkait'],
        review: 'Pasien baru sekarang sudah tahu treatment dan kisaran harga sebelum chat — tim front office kami tidak perlu jawab pertanyaan yang sama berulang kali setiap hari.',
        clientRole: 'Demo Project — Radiance Aesthetic Clinic',
        imageCaptions: ['Beranda — headline utama, trust badge, dan CTA booking konsultasi', 'Katalog Treatment — daftar layanan populer dengan kisaran harga', 'Before & After — galeri hasil nyata per kategori treatment', 'Tampilan Mobile — booking konsultasi langsung dari HP'],
        benefits: [
          { icon: 'fa-solid fa-calendar-check', title: 'Booking tanpa bolak-balik chat', desc: 'Form booking terarah langsung ke WhatsApp dengan detail treatment yang diminati — admin tidak perlu tanya ulang dari awal.' },
          { icon: 'fa-solid fa-images', title: 'Before-after jadi alat percaya', desc: 'Galeri hasil nyata per kategori treatment membantu calon pasien lebih yakin sebelum datang konsultasi.' },
          { icon: 'fa-solid fa-magnifying-glass', title: 'Ditemukan saat dicari lokal', desc: 'SEO on-page membantu klinik muncul saat calon pasien mencari layanan sejenis di kotanya.' },
          { icon: 'fa-solid fa-star', title: 'Testimoni yang membangun percaya', desc: 'Testimoni pasien terverifikasi ditampilkan berdampingan dengan treatment terkait, bukan generik.' },
        ],
      },
      en: {
        cat: 'Landing Page',
        tagline: 'Aesthetic clinic landing page: treatment catalog, before-after gallery, and consultation booking straight to WhatsApp',
        budget: 'Rp 12M',
        result: 'Consultation Bookings +95%',
        result2: 'Admin response time dropped from overnight to hours',
        problem: 'The clinic relied on Instagram and manual WhatsApp chats to take consultation bookings. Prospective patients struggled to see the treatment list, price range, and real results before deciding to visit — many hesitated and abandoned the chat.',
        solution: 'A one-page landing page with a treatment catalog & price range, a before-after gallery by category, and a booking form that connects directly to the admin\'s WhatsApp with full details of the treatment they\'re interested in.',
        features: ['Treatment catalog & price range', 'Before-after gallery by category', 'Consultation booking form to WhatsApp', 'Verified patient testimonials', 'Local SEO for "aesthetic clinic" searches in the relevant city'],
        review: 'New patients now already know the treatments and price range before chatting — our front-office team no longer has to answer the same questions over and over every day.',
        clientRole: 'Demo Project — Radiance Aesthetic Clinic',
        imageCaptions: ['Homepage — main headline, trust badges, and consultation booking CTA', 'Treatment Catalog — popular services listed with price ranges', 'Before & After — real results gallery by treatment category', 'Mobile View — book a consultation straight from your phone'],
        benefits: [
          { icon: 'fa-solid fa-calendar-check', title: 'Booking without back-and-forth chats', desc: "The booking form routes straight to WhatsApp with the treatment details the patient is interested in — the admin never has to ask from scratch." },
          { icon: 'fa-solid fa-images', title: 'Before-after as a trust builder', desc: 'A real-results gallery by treatment category helps prospective patients feel more confident before booking a consultation.' },
          { icon: 'fa-solid fa-magnifying-glass', title: 'Found in local searches', desc: 'On-page SEO helps the clinic appear when prospective patients search for similar services in their city.' },
          { icon: 'fa-solid fa-star', title: 'Testimonials that build trust', desc: 'Verified patient testimonials are shown alongside the relevant treatment, not generically.' },
        ],
      },
      zh: {
        cat: '落地页',
        tagline: '医美诊所落地页：疗程目录、前后对比图库，以及直连WhatsApp的咨询预约',
        budget: 'Rp 12M',
        result: '咨询预约提升95%',
        result2: '管理员响应时间从隔夜缩短至数小时',
        problem: '诊所此前依靠Instagram与人工WhatsApp沟通接受咨询预约。潜在患者在决定到访前很难查看疗程列表、价格区间与真实效果——许多人因此犹豫并放弃咨询。',
        solution: '打造单页落地页，包含疗程目录与价格区间、按类别分类的前后对比图库，以及可直接将感兴趣疗程详情发送至管理员WhatsApp的预约表单。',
        features: ['疗程目录与价格区间', '按类别分类的前后对比图库', '直连WhatsApp的咨询预约表单', '经过验证的患者好评', '针对当地"医美诊所"搜索的本地SEO优化'],
        review: '新患者现在在咨询前就已了解疗程与价格区间——我们的前台团队不再需要每天反复回答相同的问题。',
        clientRole: '演示项目——Radiance医美诊所',
        imageCaptions: ['首页——主标题、信任标识与咨询预约行动号召', '疗程目录——热门服务及价格区间一览', '前后对比——按疗程类别展示真实效果图库', '移动端界面——直接通过手机预约咨询'],
        benefits: [
          { icon: 'fa-solid fa-calendar-check', title: '预约无需反复沟通', desc: '预约表单直接跳转至WhatsApp，并附带患者感兴趣的疗程详情——管理员无需从头询问。' },
          { icon: 'fa-solid fa-images', title: '前后对比建立信任', desc: '按疗程类别展示的真实效果图库，帮助潜在患者在预约咨询前更有信心。' },
          { icon: 'fa-solid fa-magnifying-glass', title: '本地搜索易被发现', desc: '页面SEO优化帮助诊所在潜在患者搜索同类服务时更容易被发现。' },
          { icon: 'fa-solid fa-star', title: '好评建立信任感', desc: '经过验证的患者好评与相关疗程并列展示，而非泛泛而谈。' },
        ],
      },
    },
  },
  {
    slug: 'skilva-digital-bootcamp', catSlug: 'landing-page', title: 'Skilva Digital Bootcamp',
    c: '#22242B', c2: '#C98A2E', kind: 'land',
    tags: ['Next.js', 'Form Pendaftaran', 'Countdown Batch', 'Testimoni Alumni'],
    clientName: 'Tim AFSS',
    visitUrl: 'https://afss.tech/portofolio/landing-page/skilva',
    tech: 'Next.js, Tailwind CSS, Google Sheets API, Vercel',
    image: '/portofolio/landing-page/skilva-digital-bootcamp/mockup/hero.webp',
    images: ['/portofolio/landing-page/skilva-digital-bootcamp/mockup/hero.webp', '/portofolio/landing-page/skilva-digital-bootcamp/mockup/catalog.webp', '/portofolio/landing-page/skilva-digital-bootcamp/mockup/gallery.webp', '/portofolio/landing-page/skilva-digital-bootcamp/mockup/mobile.webp'],
    imagePortrait: [false, false, false, true],
    i18n: {
      id: {
        cat: 'Landing Page',
        tagline: 'Landing page pendaftaran bootcamp digital: kurikulum per batch, testimoni alumni, dan pendaftaran online otomatis',
        budget: 'Rp 16 Jt',
        result: 'Pendaftaran Batch +140%',
        result2: 'Panitia tidak lagi rekap manual pendaftar satu-satu',
        problem: 'Pendaftaran bootcamp masih lewat Google Form tanpa informasi kurikulum yang jelas — calon peserta sering bertanya ulang hal yang sama, dan panitia rekap manual data pendaftar di spreadsheet.',
        solution: 'Landing page dengan kurikulum & jadwal per batch, harga jelas di depan, countdown penutupan pendaftaran, serta form pendaftaran yang otomatis tersimpan tanpa rekap manual.',
        features: ['Kurikulum & jadwal per batch', 'Countdown penutupan pendaftaran', 'Form pendaftaran otomatis tersimpan', 'Testimoni & portofolio alumni', 'Perbandingan paket kelas'],
        review: 'Calon peserta datang ke WhatsApp sudah tahu jadwal dan harga — pertanyaan berulang jauh berkurang, dan kami tidak lagi rekap manual pendaftar satu-satu.',
        clientRole: 'Demo Project — Skilva Digital Bootcamp',
        imageCaptions: ['Beranda — headline utama, countdown batch, dan visual code editor', 'Kurikulum — modul per batch dengan topik dan durasi jelas', 'Testimoni Alumni — cerita nyata dari peserta yang sudah lulus', 'Tampilan Mobile — pendaftaran batch langsung dari HP'],
        benefits: [
          { icon: 'fa-solid fa-graduation-cap', title: 'Kurikulum jelas sejak awal', desc: 'Calon peserta tahu materi, jadwal, dan harga sebelum mendaftar — mengurangi pertanyaan berulang ke panitia.' },
          { icon: 'fa-solid fa-clock', title: 'Urgensi tanpa paksaan', desc: 'Countdown batch berjalan mendorong keputusan mendaftar lebih cepat, tanpa bahasa yang memaksa.' },
          { icon: 'fa-solid fa-file-export', title: 'Data pendaftar rapi otomatis', desc: 'Form pendaftaran tersimpan otomatis — panitia tidak lagi rekap manual dari WhatsApp atau form terpisah.' },
          { icon: 'fa-solid fa-star', title: 'Alumni jadi bukti nyata', desc: 'Testimoni dan portofolio alumni ditampilkan untuk membangun kepercayaan calon peserta baru.' },
        ],
      },
      en: {
        cat: 'Landing Page',
        tagline: 'Digital bootcamp enrollment landing page: per-batch curriculum, alumni testimonials, and automated online registration',
        budget: 'Rp 16M',
        result: 'Batch Enrollments +140%',
        result2: 'Committee no longer recaps registrants manually one by one',
        problem: 'Bootcamp registration still ran through a Google Form with no clear curriculum information — prospective participants kept asking the same questions, and the committee manually compiled registrant data in a spreadsheet.',
        solution: 'A landing page with curriculum & schedule per batch, upfront pricing, a countdown to registration close, and a registration form that saves automatically with no manual compilation.',
        features: ['Curriculum & schedule per batch', 'Countdown to registration close', 'Registration form auto-saved', 'Alumni testimonials & portfolios', 'Class package comparison'],
        review: 'Prospective participants now arrive on WhatsApp already knowing the schedule and price — repeat questions have dropped sharply, and we no longer compile registrant data manually one by one.',
        clientRole: 'Demo Project — Skilva Digital Bootcamp',
        imageCaptions: ['Homepage — main headline, batch countdown, and code editor visual', 'Curriculum — modules per batch with clear topics and duration', 'Alumni Testimonials — real stories from graduated participants', 'Mobile View — register for a batch straight from your phone'],
        benefits: [
          { icon: 'fa-solid fa-graduation-cap', title: 'Clear curriculum from the start', desc: 'Prospective participants know the material, schedule, and price before enrolling — cutting repeat questions to the committee.' },
          { icon: 'fa-solid fa-clock', title: 'Urgency without being pushy', desc: 'A running batch countdown encourages faster enrollment decisions without forceful language.' },
          { icon: 'fa-solid fa-file-export', title: 'Registrant data organized automatically', desc: 'The registration form saves automatically — the committee no longer compiles data manually from WhatsApp or separate forms.' },
          { icon: 'fa-solid fa-star', title: 'Alumni as real proof', desc: 'Alumni testimonials and portfolios are shown to build trust with new prospective participants.' },
        ],
      },
      zh: {
        cat: '落地页',
        tagline: '数字训练营报名落地页：分批次课程、校友好评与自动化在线报名',
        budget: 'Rp 16M',
        result: '批次报名人数提升140%',
        result2: '筹备团队无需再逐一手动整理报名信息',
        problem: '训练营报名此前仍通过Google表单进行，且缺乏清晰的课程信息——潜在学员反复询问相同问题，筹备团队还需在电子表格中手动整理报名数据。',
        solution: '打造包含分批次课程与时间安排、明确价格、报名截止倒计时的落地页，并配备可自动保存的报名表单，无需人工整理。',
        features: ['分批次课程与时间安排', '报名截止倒计时', '报名表单自动保存', '校友好评与作品展示', '课程套餐对比'],
        review: '潜在学员现在联系WhatsApp时已经了解时间安排与价格——重复性问题大幅减少，我们也不再需要逐一手动整理报名数据。',
        clientRole: '演示项目——Skilva数字训练营',
        imageCaptions: ['首页——主标题、批次倒计时与代码编辑器视觉呈现', '课程安排——各批次模块，主题与时长清晰明了', '校友好评——已毕业学员的真实故事', '移动端界面——直接通过手机完成批次报名'],
        benefits: [
          { icon: 'fa-solid fa-graduation-cap', title: '课程内容从一开始就清晰明了', desc: '潜在学员在报名前即可了解课程内容、时间安排与价格——减少对筹备团队的重复提问。' },
          { icon: 'fa-solid fa-clock', title: '营造紧迫感而不强迫', desc: '实时批次倒计时促使学员更快做出报名决定，而无需使用强硬的措辞。' },
          { icon: 'fa-solid fa-file-export', title: '报名数据自动整理', desc: '报名表单自动保存——筹备团队无需再从WhatsApp或独立表单中手动整理数据。' },
          { icon: 'fa-solid fa-star', title: '校友成为最有力的证明', desc: '展示校友好评与作品集，为新学员建立信任。' },
        ],
      },
    },
  },
  // E-COMMERCE
  {
    slug: 'premium-fashion-ecommerce', catSlug: 'ecommerce', title: 'Premium Fashion E-Commerce',
    c: '#111111', c2: '#D4AF37', kind: 'land',
    tags: ['React', 'Vite', 'Tailwind CSS', 'TypeScript', 'Demo'],
    tech: 'React 18, TypeScript, Vite, Tailwind CSS 4, MUI, Radix UI',
    clientName: 'Tim AFSS',
    visitUrl: 'https://afss.tech/portofolio/ecommerce/luxe',
    image: '/portofolio/ecommerce/premium-fashion/mockup/hero.webp',
    images: [
      '/portofolio/ecommerce/premium-fashion/mockup/hero.webp',
      '/portofolio/ecommerce/premium-fashion/mockup/catalog.webp',
      '/portofolio/ecommerce/premium-fashion/mockup/product-detail.webp',
      '/portofolio/ecommerce/premium-fashion/mockup/mobile.webp',
    ],
    imagePortrait: [false, false, false, true],
    i18n: {
      id: {
        cat: 'E-Commerce',
        tagline: 'Toko fashion premium: katalog produk, wishlist, keranjang, checkout, admin dashboard & AI style assistant',
        budget: 'Rp 28 Jt',
        result: 'Konversi Cart +35%',
        result2: 'Experience premium — dark mode, AI stylist, live flash sale',
        problem: 'Brand fashion premium butuh toko online yang mencerminkan identitas luxury mereka — bukan template generik yang sama dengan ribuan toko lain. Pengalaman belanja harus terasa eksklusif dari landing page hingga checkout, dengan fitur seperti wishlist, product comparison, dan rekomendasi personal agar pelanggan betah dan kembali lagi.',
        solution: 'Platform e-commerce custom dengan desain full-custom berbasis warna hitam-gold yang memancarkan aura premium. Dilengkapi AI Style Assistant berbasis chat, live shopping banner dengan countdown, flash sale real-time, admin dashboard dengan analytics penjualan, dan fitur product comparison — semua dalam satu SPA yang responsif dengan dark mode.',
        features: [
          'Homepage: hero, live shopping banner, flash sale countdown, trending products, lookbook editorial',
          'Katalog produk: filter brand/kategori/size/harga, sort, search visual, product comparison',
          'Product detail: galeri gambar, pilih size, add-to-cart, wishlist, recently viewed',
          'Cart & checkout: manajemen kuantitas, kupon diskon, ringkasan pesanan, form checkout multi-step',
          'Customer dashboard: pesanan, wishlist, riwayat, profil, preferensi gaya',
          'Admin dashboard: analytics penjualan (chart), manajemen produk, kelola pesanan',
          'AI Style Assistant: rekomendasi outfit berbasis chat',
          'Dark mode penuh, bahasa ID/EN, mobile-first responsif',
        ],
        review: 'Desain dan fiturnya jauh melampaui ekspektasi — terasa seperti platform fashion kelas dunia. AI Style Assistant dan admin dashboard-nya langsung bisa kami pakai sejak hari pertama.',
        clientRole: 'Demo Project — AFSS Premium Fashion E-Commerce',
        imageCaptions: [
          'Homepage — hero section, live shopping banner & trending products dalam desain hitam-gold premium',
          'Katalog — filter brand/kategori/ukuran, product grid dengan wishlist & quick-add',
          'Product Detail — galeri gambar, pilih size, add to cart, product comparison',
          'Tampilan Mobile — full-featured dark mode, bottom navigation, AI style assistant',
        ],
        benefits: [
          { icon: 'fa-solid fa-wand-magic-sparkles', title: 'AI Style Assistant', desc: 'Rekomendasi outfit cerdas berbasis chat — pelanggan bisa cerita gaya mereka dan langsung dapat saran produk yang cocok.' },
          { icon: 'fa-solid fa-bolt', title: 'Live Flash Sale & Countdown', desc: 'Banner flash sale real-time dengan timer countdown mendorong urgensi pembelian tanpa terasa memaksa.' },
          { icon: 'fa-solid fa-chart-line', title: 'Admin Dashboard Lengkap', desc: 'Pantau penjualan, kelola produk, dan monitor pesanan dari satu dashboard dengan grafik analitik yang bersih.' },
          { icon: 'fa-solid fa-layer-group', title: 'Product Comparison', desc: 'Pelanggan bisa bandingkan hingga 3 produk sekaligus — fitur premium yang meningkatkan kepercayaan sebelum membeli.' },
          { icon: 'fa-solid fa-moon', title: 'Dark Mode & Bilingual', desc: 'Dark mode penuh dan dukungan dua bahasa (ID/EN) tersedia sejak awal — siap untuk pasar lokal dan internasional.' },
          { icon: 'fa-solid fa-mobile-screen', title: 'Mobile-First Premium', desc: 'Pengalaman belanja yang sama mewahnya di smartphone — bottom nav, gesture-friendly, performa optimal.' },
        ],
      },
      en: {
        cat: 'E-Commerce',
        tagline: 'Premium fashion store: product catalog, wishlist, cart, checkout, admin dashboard & AI style assistant',
        budget: 'Rp 28M',
        result: 'Cart Conversion +35%',
        result2: 'Premium experience — dark mode, AI stylist, live flash sales',
        problem: 'A premium fashion brand needed an online store that reflects their luxury identity — not a generic template shared by thousands of other stores. The shopping experience had to feel exclusive from the landing page through checkout, with features like wishlists, product comparison, and personalized recommendations to keep customers coming back.',
        solution: 'A fully custom e-commerce platform with a bespoke black-and-gold design that radiates a premium feel. Featuring an AI Style Assistant via chat, live shopping banners with countdown, real-time flash sales, an admin dashboard with sales analytics, and product comparison — all in one responsive SPA with full dark mode support.',
        features: [
          'Homepage: hero, live shopping banner, flash sale countdown, trending products, editorial lookbook',
          'Product catalog: filter by brand/category/size/price, sort, visual search, product comparison',
          'Product detail: image gallery, size selector, add-to-cart, wishlist, recently viewed',
          'Cart & checkout: quantity management, discount coupons, order summary, multi-step checkout form',
          'Customer dashboard: orders, wishlist, history, profile, style preferences',
          'Admin dashboard: sales analytics (charts), product management, order management',
          'AI Style Assistant: outfit recommendations via chat',
          'Full dark mode, ID/EN bilingual, mobile-first responsive',
        ],
        review: 'The design and features far exceeded expectations — it feels like a world-class fashion platform. The AI Style Assistant and admin dashboard were ready to use from day one.',
        clientRole: 'Demo Project — AFSS Premium Fashion E-Commerce',
        imageCaptions: [
          'Homepage — hero section, live shopping banner & trending products in premium black-gold design',
          'Catalog — brand/category/size filters, product grid with wishlist & quick-add',
          'Product Detail — image gallery, size selector, add to cart, product comparison',
          'Mobile View — full-featured dark mode, bottom navigation, AI style assistant',
        ],
        benefits: [
          { icon: 'fa-solid fa-wand-magic-sparkles', title: 'AI Style Assistant', desc: 'Smart outfit recommendations via chat — customers describe their style and instantly get matching product suggestions.' },
          { icon: 'fa-solid fa-bolt', title: 'Live Flash Sales & Countdown', desc: 'Real-time flash sale banners with countdown timers drive purchasing urgency without feeling pushy.' },
          { icon: 'fa-solid fa-chart-line', title: 'Full Admin Dashboard', desc: 'Monitor sales, manage products, and track orders from a single dashboard with clean analytics charts.' },
          { icon: 'fa-solid fa-layer-group', title: 'Product Comparison', desc: 'Customers can compare up to 3 products side-by-side — a premium feature that builds confidence before buying.' },
          { icon: 'fa-solid fa-moon', title: 'Dark Mode & Bilingual', desc: 'Full dark mode and dual-language support (ID/EN) built in from the start — ready for local and international markets.' },
          { icon: 'fa-solid fa-mobile-screen', title: 'Mobile-First Premium', desc: 'The same luxurious shopping experience on smartphones — bottom nav, gesture-friendly, optimal performance.' },
        ],
      },
      zh: {
        cat: '电商平台',
        tagline: '高端时装电商平台：商品目录、收藏夹、购物车、结账流程、管理后台与AI穿搭助手',
        budget: 'Rp 28M',
        result: '购物车转化率 +35%',
        result2: '高端购物体验 — 深色模式、AI穿搭师、限时闪购',
        problem: '一个高端时装品牌需要一个能体现其奢华形象的在线商店——而不是与数千家其他店铺共享的通用模板。从首页到结账的整个购物体验都必须彰显专属感，同时配备收藏夹、商品对比和个性化推荐等功能，让顾客愿意反复回来。',
        solution: '一个完全定制化的电商平台，采用专属的黑金配色设计，散发出高端时尚气质。配备基于对话的AI穿搭助手、带倒计时的限时抢购横幅、实时闪购、带销售分析图表的管理后台以及商品对比功能——全部集成在一个支持完整深色模式的响应式单页应用中。',
        features: [
          '首页：英雄区、限时购物横幅、闪购倒计时、热门商品、编辑风格大片',
          '商品目录：按品牌/类别/尺码/价格筛选、排序、视觉搜索、商品对比',
          '商品详情：图片画廊、尺码选择、加入购物车、收藏夹、最近浏览',
          '购物车与结账：数量管理、优惠券、订单摘要、多步骤结账表单',
          '用户后台：订单、收藏夹、历史记录、个人资料、穿搭偏好设置',
          '管理后台：销售分析（图表）、商品管理、订单管理',
          'AI穿搭助手：通过对话提供搭配推荐',
          '完整深色模式、印尼语/英语双语、移动优先响应式设计',
        ],
        review: '设计和功能远超预期——感觉就像一个世界级的时装平台。AI穿搭助手和管理后台从第一天起就可以直接使用。',
        clientRole: 'Demo 项目 — AFSS 高端时装电商平台',
        imageCaptions: [
          '首页 — 英雄区、限时购物横幅与热门商品，高端黑金设计风格',
          '商品目录 — 品牌/类别/尺码筛选，带收藏夹和快速加购的商品网格',
          '商品详情 — 图片画廊、尺码选择、加入购物车、商品对比',
          '移动端视图 — 完整深色模式、底部导航栏、AI穿搭助手',
        ],
        benefits: [
          { icon: 'fa-solid fa-wand-magic-sparkles', title: 'AI穿搭助手', desc: '通过对话提供智能搭配推荐——顾客描述自己的风格，即可立即获得匹配的商品建议。' },
          { icon: 'fa-solid fa-bolt', title: '限时闪购与倒计时', desc: '实时闪购横幅配合倒计时，制造购买紧迫感，而不显得咄咄逼人。' },
          { icon: 'fa-solid fa-chart-line', title: '完整管理后台', desc: '通过一个拥有清晰分析图表的后台，监控销售、管理商品、跟踪订单。' },
          { icon: 'fa-solid fa-layer-group', title: '商品对比功能', desc: '顾客可同时对比多达3件商品——这一高端功能有效建立购买前的信心。' },
          { icon: 'fa-solid fa-moon', title: '深色模式与双语支持', desc: '从一开始就内置完整深色模式和双语（印尼语/英语）支持——为本地和国际市场做好准备。' },
          { icon: 'fa-solid fa-mobile-screen', title: '移动优先高端体验', desc: '在智能手机上提供同等奢华的购物体验——底部导航、手势友好、性能卓越。' },
        ],
      },
    },
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
    icon: 'fa-solid fa-rectangle-ad',
    hot: false,
    slug: 'landing-page',
    i18n: {
      id: {
        name: 'Landing Page', category: 'Website', price: 'Rp 1,5 Jt', note: 'mulai dari',
        desc: 'Satu halaman fokus konversi untuk iklan, produk, atau event — persuasif, cepat, dan terukur hasilnya.',
        feats: ['Desain fokus konversi & CTA jelas', 'Loading < 2 detik (LCP optimal)', 'Form lead + CTA WhatsApp', 'Mobile-first & tracking siap'],
      },
      en: {
        name: 'Landing Page', category: 'Website', price: 'Rp 1.5M', note: 'starting from',
        desc: 'A single conversion-focused page for ads, products, or events — persuasive, fast, and built to measure results.',
        feats: ['Conversion-focused design & clear CTAs', 'Load time under 2s (optimal LCP)', 'Lead form + WhatsApp CTA', 'Mobile-first & tracking ready'],
      },
      zh: {
        name: '落地页', category: '网站', price: 'Rp 1.5M', note: '起',
        desc: '为广告、产品或活动打造的单页转化页面——极具说服力、加载迅速，且效果可量化。',
        feats: ['以转化为核心的设计与清晰的CTA', '加载时间低于2秒（最佳LCP）', '获客表单 + WhatsApp咨询按钮', '移动优先设计，内置追踪功能'],
      },
    },
  },
  {
    icon: 'fa-solid fa-briefcase',
    hot: false,
    slug: 'company-profile',
    i18n: {
      id: {
        name: 'Company Profile', category: 'Website', price: 'Rp 4,5 Jt', note: 'mulai dari',
        desc: 'Website 5–7 halaman profesional yang membangun kepercayaan dan mengundang calon klien menghubungi Anda.',
        feats: ['Desain custom & responsif', 'SEO on-page + Google Business', 'Halaman Tentang, Layanan, Portofolio, Kontak', 'CMS untuk update mandiri'],
      },
      en: {
        name: 'Company Profile', category: 'Website', price: 'Rp 4.5M', note: 'starting from',
        desc: 'A professional 5-7 page website that builds trust and invites prospective clients to reach out.',
        feats: ['Custom, responsive design', 'On-page SEO + Google Business', 'About, Services, Portfolio & Contact pages', 'CMS for self-service updates'],
      },
      zh: {
        name: '企业官网', category: '网站', price: 'Rp 4.5M', note: '起',
        desc: '5-7页的专业网站，建立信任并邀请潜在客户主动联系您。',
        feats: ['定制化响应式设计', '页面SEO优化 + Google商家资料', '关于我们、服务、作品集、联系页面', '可自助更新的CMS系统'],
      },
    },
  },
  {
    icon: 'fa-solid fa-code',
    hot: false,
    slug: 'software-custom',
    i18n: {
      id: {
        name: 'Software Custom', category: 'Software', price: 'Rp 8 Jt', note: 'mulai dari',
        desc: 'Web app, dashboard, atau sistem internal custom — gantikan spreadsheet dengan platform terpusat yang real-time.',
        feats: ['Multi-user & role access (RBAC)', 'Dashboard analitik & laporan', 'Export Excel/PDF otomatis', 'Integrasi API & sistem existing'],
      },
      en: {
        name: 'Custom Software', category: 'Software', price: 'Rp 8M', note: 'starting from',
        desc: 'A custom web app, dashboard, or internal system — replace spreadsheets with a centralized, real-time platform.',
        feats: ['Multi-user & role-based access (RBAC)', 'Analytics dashboard & reports', 'Automatic Excel/PDF export', 'API integration with existing systems'],
      },
      zh: {
        name: '定制软件', category: '软件', price: 'Rp 8M', note: '起',
        desc: '定制Web应用、仪表盘或内部系统——用集中化的实时平台取代电子表格。',
        feats: ['多用户与角色权限管理（RBAC）', '数据分析仪表盘与报表', '自动Excel/PDF导出', '与现有系统的API集成'],
      },
    },
  },
  {
    icon: 'fa-solid fa-mobile-screen',
    hot: false,
    slug: 'aplikasi-mobile',
    i18n: {
      id: {
        name: 'Aplikasi Mobile', category: 'Mobile', price: 'Rp 15 Jt', note: 'mulai dari',
        desc: 'Aplikasi Android & iOS cross-platform yang ringan, cepat, dan nyaman — siap dipublikasikan ke Play Store & App Store.',
        feats: ['Android & iOS (Flutter cross-platform)', 'UI/UX desain custom', 'Integrasi API & notifikasi push', 'Siap publish Play Store & App Store'],
      },
      en: {
        name: 'Mobile App', category: 'Mobile', price: 'Rp 15M', note: 'starting from',
        desc: 'A lightweight, fast, and comfortable Android & iOS cross-platform app — ready to publish on Play Store & App Store.',
        feats: ['Android & iOS (Flutter cross-platform)', 'Custom UI/UX design', 'API integration & push notifications', 'Ready to publish on Play Store & App Store'],
      },
      zh: {
        name: '移动应用', category: '移动端', price: 'Rp 15M', note: '起',
        desc: '轻量、快速、舒适的Android与iOS跨平台应用——随时可发布至Play Store与App Store。',
        feats: ['Android与iOS（Flutter跨平台）', '定制UI/UX设计', 'API集成与推送通知', '可发布至Play Store与App Store'],
      },
    },
  },
  {
    icon: 'fa-solid fa-circle-nodes',
    hot: true,
    slug: 'erp',
    i18n: {
      id: {
        name: 'ERP Custom', category: 'Software', price: 'Rp 28 Jt', note: 'mulai dari',
        desc: 'ERP yang menyatukan keuangan, inventory, SDM, dan operasional sesuai alur kerja unik bisnis Anda.',
        feats: ['Modul keuangan & akuntansi', 'Inventory & manajemen gudang', 'HR, absensi & penggajian', 'Dashboard eksekutif real-time'],
      },
      en: {
        name: 'Custom ERP', category: 'Software', price: 'Rp 28M', note: 'starting from',
        desc: 'An ERP that unifies finance, inventory, HR, and operations to match your business\'s unique workflow.',
        feats: ['Finance & accounting module', 'Inventory & warehouse management', 'HR, attendance & payroll', 'Real-time executive dashboard'],
      },
      zh: {
        name: '定制ERP系统', category: '软件', price: 'Rp 28M', note: '起',
        desc: '根据您企业独特工作流程整合财务、库存、人力资源与运营的ERP系统。',
        feats: ['财务与会计模块', '库存与仓库管理', '人力资源、考勤与薪资管理', '实时高管仪表盘'],
      },
    },
  },
  {
    icon: 'fa-solid fa-cart-shopping',
    hot: false,
    slug: 'ecommerce',
    i18n: {
      id: {
        name: 'E-Commerce', category: 'E-Commerce', price: 'Rp 18 Jt', note: 'mulai dari',
        desc: 'Toko online custom dengan payment gateway lokal, manajemen produk & stok, dan dashboard penjualan.',
        feats: ['Payment gateway Midtrans / Xendit', 'Manajemen produk, kategori & stok', 'Kalkulasi ongkir otomatis', 'Dashboard & laporan penjualan'],
      },
      en: {
        name: 'E-Commerce', category: 'E-Commerce', price: 'Rp 18M', note: 'starting from',
        desc: 'A custom online store with local payment gateways, product & stock management, and a sales dashboard.',
        feats: ['Midtrans / Xendit payment gateway', 'Product, category & stock management', 'Automatic shipping cost calculation', 'Sales dashboard & reports'],
      },
      zh: {
        name: '电商平台', category: '电商', price: 'Rp 18M', note: '起',
        desc: '集成本地支付网关、产品与库存管理及销售仪表盘的定制在线商店。',
        feats: ['Midtrans / Xendit支付网关', '产品、分类与库存管理', '自动运费计算', '销售仪表盘与报表'],
      },
    },
  },
  {
    icon: 'fa-solid fa-store',
    hot: false,
    slug: 'marketplace',
    i18n: {
      id: {
        name: 'Marketplace', category: 'E-Commerce', price: 'Rp 65 Jt', note: 'mulai dari',
        desc: 'Platform multi-vendor — seller mendaftar, upload produk, buyer bertransaksi, admin kelola semua dari satu panel.',
        feats: ['Multi-vendor: seller, buyer & admin', 'Komisi & settlement otomatis', 'Review, rating & dispute', 'App mobile buyer + seller tersedia'],
      },
      en: {
        name: 'Marketplace', category: 'E-Commerce', price: 'Rp 65M', note: 'starting from',
        desc: 'A multi-vendor platform — sellers register and upload products, buyers transact, and admins manage everything from one panel.',
        feats: ['Multi-vendor: seller, buyer & admin', 'Automatic commission & settlement', 'Reviews, ratings & dispute handling', 'Buyer + seller mobile apps available'],
      },
      zh: {
        name: '多商户平台', category: '电商', price: 'Rp 65M', note: '起',
        desc: '多商户平台——卖家注册上架商品，买家下单交易，管理员在同一后台统一管理。',
        feats: ['多商户支持：卖家、买家与管理员', '自动佣金结算', '评价、评分与纠纷处理', '提供买家与卖家移动应用'],
      },
    },
  },
]

// ── Paket kombinasi (bundle hemat) ───────────────────────────
export const pricingBundles = [
  {
    icon: 'fa-solid fa-seedling',
    hot: false,
    i18n: {
      id: {
        name: 'Paket UMKM Starter', tag: 'Paling terjangkau',
        desc: 'Untuk UMKM yang baru go-digital. Dapatkan landing page profesional + ketenangan pikiran dengan maintenance 3 bulan.',
        items: ['Landing Page', 'Setup Google Business Profile', 'Maintenance 3 bulan'],
        normalPrice: 'Rp 4,75 Jt', price: 'Rp 3,5 Jt', save: 'Hemat Rp 1,25 Jt',
      },
      en: {
        name: 'SME Starter Package', tag: 'Most affordable',
        desc: 'For SMEs just going digital. Get a professional landing page + peace of mind with 3 months of maintenance.',
        items: ['Landing Page', 'Google Business Profile Setup', '3 Months Maintenance'],
        normalPrice: 'Rp 4.75M', price: 'Rp 3.5M', save: 'Save Rp 1.25M',
      },
      zh: {
        name: '中小微企业入门套餐', tag: '最超值',
        desc: '为刚开始数字化转型的中小微企业打造。获得专业落地页，加上3个月维护服务的安心保障。',
        items: ['落地页', 'Google商家资料设置', '3个月维护服务'],
        normalPrice: 'Rp 4.75M', price: 'Rp 3.5M', save: '节省 Rp 1.25M',
      },
    },
  },
  {
    icon: 'fa-solid fa-briefcase',
    hot: false,
    i18n: {
      id: {
        name: 'Paket Bisnis Profil', tag: 'Populer untuk UKM',
        desc: 'Company profile yang kuat + sistem manajemen internal ringan — tampil profesional ke luar, operasional rapi ke dalam.',
        items: ['Company Profile Website', 'Mini Dashboard', 'Maintenance 1 bulan'],
        normalPrice: 'Rp 19,5 Jt', price: 'Rp 16 Jt', save: 'Hemat Rp 3,5 Jt',
      },
      en: {
        name: 'Business Profile Package', tag: 'Popular for SMEs',
        desc: 'A strong company profile + a lightweight internal management system — professional on the outside, organized on the inside.',
        items: ['Company Profile Website', 'Mini Dashboard', '1 Month Maintenance'],
        normalPrice: 'Rp 19.5M', price: 'Rp 16M', save: 'Save Rp 3.5M',
      },
      zh: {
        name: '企业形象套餐', tag: '中小企业热门之选',
        desc: '强大的企业官网 + 轻量级内部管理系统——对外展现专业形象，对内保持高效运营。',
        items: ['企业官网', '迷你仪表盘', '1个月维护服务'],
        normalPrice: 'Rp 19.5M', price: 'Rp 16M', save: '节省 Rp 3.5M',
      },
    },
  },
  {
    icon: 'fa-solid fa-bag-shopping',
    hot: true,
    i18n: {
      id: {
        name: 'Paket Digital Commerce', tag: 'Rekomendasi bisnis online',
        desc: 'Toko online + aplikasi mobile: jangkau pelanggan dari browser maupun smartphone dalam satu ekosistem terintegrasi.',
        items: ['Toko Online (E-Commerce)', 'Aplikasi Mobile', 'Maintenance 2 bulan'],
        normalPrice: 'Rp 51,5 Jt', price: 'Rp 45 Jt', save: 'Hemat Rp 6,5 Jt',
      },
      en: {
        name: 'Digital Commerce Package', tag: 'Recommended for online business',
        desc: 'Online store + mobile app: reach customers from both browser and smartphone in one integrated ecosystem.',
        items: ['Online Store (E-Commerce)', 'Mobile App', '2 Months Maintenance'],
        normalPrice: 'Rp 51.5M', price: 'Rp 45M', save: 'Save Rp 6.5M',
      },
      zh: {
        name: '数字商务套餐', tag: '在线业务推荐之选',
        desc: '在线商店 + 移动应用：在一个整合生态系统中，同时通过浏览器与手机触达客户。',
        items: ['在线商店（电商）', '移动应用', '2个月维护服务'],
        normalPrice: 'Rp 51.5M', price: 'Rp 45M', save: '节省 Rp 6.5M',
      },
    },
  },
  {
    icon: 'fa-solid fa-building-columns',
    hot: false,
    i18n: {
      id: {
        name: 'Paket Enterprise', tag: 'Solusi korporat',
        desc: 'ERP, dashboard analitik, dan aplikasi mobile dalam satu ekosistem — untuk bisnis skala menengah yang butuh efisiensi penuh.',
        items: ['Sistem ERP Custom', 'Mini Dashboard Eksekutif', 'Aplikasi Mobile', 'Maintenance 3 bulan'],
        normalPrice: 'Rp 49,25 Jt', price: 'Rp 43 Jt', save: 'Hemat Rp 6,25 Jt',
      },
      en: {
        name: 'Enterprise Package', tag: 'Corporate solution',
        desc: 'ERP, analytics dashboard, and mobile app in one ecosystem — for mid-size businesses that need full efficiency.',
        items: ['Custom ERP System', 'Mini Executive Dashboard', 'Mobile App', '3 Months Maintenance'],
        normalPrice: 'Rp 49.25M', price: 'Rp 43M', save: 'Save Rp 6.25M',
      },
      zh: {
        name: '企业级套餐', tag: '企业解决方案',
        desc: 'ERP系统、数据分析仪表盘与移动应用整合于一个生态系统——为需要全面提升效率的中型企业打造。',
        items: ['定制ERP系统', '迷你高管仪表盘', '移动应用', '3个月维护服务'],
        normalPrice: 'Rp 49.25M', price: 'Rp 43M', save: '节省 Rp 6.25M',
      },
    },
  },
  {
    icon: 'fa-solid fa-handshake',
    hot: false,
    i18n: {
      id: {
        name: 'Paket Sales Digital', tag: 'Untuk tim penjualan',
        desc: 'Company profile yang membangun kepercayaan + CRM yang memastikan tidak ada leads lolos — kombinasi ideal untuk bisnis B2B.',
        items: ['Company Profile Website', 'Sistem CRM', 'Maintenance 2 bulan'],
        normalPrice: 'Rp 22,5 Jt', price: 'Rp 19 Jt', save: 'Hemat Rp 3,5 Jt',
      },
      en: {
        name: 'Digital Sales Package', tag: 'For sales teams',
        desc: 'A trust-building company profile + a CRM that ensures no lead slips through — an ideal combination for B2B businesses.',
        items: ['Company Profile Website', 'CRM System', '2 Months Maintenance'],
        normalPrice: 'Rp 22.5M', price: 'Rp 19M', save: 'Save Rp 3.5M',
      },
      zh: {
        name: '数字销售套餐', tag: '专为销售团队打造',
        desc: '建立信任的企业官网 + 确保不遗漏任何一个潜在客户的CRM系统——B2B业务的理想组合。',
        items: ['企业官网', 'CRM客户管理系统', '2个月维护服务'],
        normalPrice: 'Rp 22.5M', price: 'Rp 19M', save: '节省 Rp 3.5M',
      },
    },
  },
  {
    icon: 'fa-solid fa-rocket',
    hot: false,
    i18n: {
      id: {
        name: 'Paket Marketplace Pro', tag: 'Skala besar',
        desc: 'Platform marketplace lengkap dengan aplikasi mobile untuk buyer dan seller — ekosistem digital yang siap bersaing.',
        items: ['Platform Marketplace', 'Aplikasi Mobile (Buyer & Seller)', 'Maintenance 3 bulan'],
        normalPrice: 'Rp 92,25 Jt', price: 'Rp 82 Jt', save: 'Hemat Rp 10 Jt',
      },
      en: {
        name: 'Marketplace Pro Package', tag: 'Large scale',
        desc: 'A complete marketplace platform with mobile apps for buyers and sellers — a digital ecosystem ready to compete.',
        items: ['Marketplace Platform', 'Mobile App (Buyer & Seller)', '3 Months Maintenance'],
        normalPrice: 'Rp 92.25M', price: 'Rp 82M', save: 'Save Rp 10M',
      },
      zh: {
        name: '专业级多商户套餐', tag: '大规模部署',
        desc: '功能完整的多商户平台，配备买家与卖家双端移动应用——随时可投入市场竞争的数字生态系统。',
        items: ['多商户平台', '移动应用（买家与卖家端）', '3个月维护服务'],
        normalPrice: 'Rp 92.25M', price: 'Rp 82M', save: '节省 Rp 10M',
      },
    },
  },
]

// ── FAQ (target featured snippet — long-tail keyword) ──────
export const faqs = [
  {
    id: 'biaya',
    i18n: {
      id: { q: 'Berapa biaya jasa AFSS?', a: 'Landing page mulai Rp 1,5 juta, company profile mulai Rp 4,5 juta, software custom mulai Rp 8 juta, aplikasi mobile mulai Rp 15 juta, e-commerce mulai Rp 18 juta, ERP mulai Rp 28 juta, dan marketplace mulai Rp 65 juta. Semua harga adalah estimasi awal — final disesuaikan ruang lingkup dan kompleksitas setelah konsultasi gratis.' },
      en: { q: 'How much do AFSS services cost?', a: 'Landing pages start from Rp 1.5 million, company profiles from Rp 4.5 million, custom software from Rp 8 million, mobile apps from Rp 15 million, e-commerce from Rp 18 million, ERP from Rp 28 million, and marketplaces from Rp 65 million. All prices are initial estimates — the final figure is adjusted for scope and complexity after a free consultation.' },
      zh: { q: 'AFSS的服务费用是多少？', a: '落地页起价150万印尼盾，企业官网起价450万印尼盾，定制软件起价800万印尼盾，移动应用起价1500万印尼盾，电商平台起价1800万印尼盾，ERP系统起价2800万印尼盾，多商户平台起价6500万印尼盾。以上均为初步估算——最终报价将在免费咨询后根据项目范围与复杂度确定。' },
    },
  },
  {
    id: 'durasi',
    i18n: {
      id: { q: 'Berapa lama pengerjaannya?', a: 'Landing page biasanya 1–2 minggu, website dashboard 3–5 minggu, aplikasi mobile 4–8 minggu, dan ERP 8–16 minggu. Timeline pasti akan kami sepakati bersama di tahap proposal.' },
      en: { q: 'How long does the project take?', a: 'Landing pages typically take 1-2 weeks, dashboard websites 3-5 weeks, mobile apps 4-8 weeks, and ERP systems 8-16 weeks. We\'ll agree on the exact timeline together during the proposal stage.' },
      zh: { q: '项目开发需要多长时间？', a: '落地页通常需要1-2周，仪表盘网站需要3-5周，移动应用需要4-8周，ERP系统需要8-16周。确切的时间表将在方案阶段与您共同确定。' },
    },
  },
  {
    id: 'kode',
    i18n: {
      id: { q: 'Apakah saya mendapat akses penuh ke kode?', a: 'Ya. Seluruh kode dan dokumentasinya milik Anda sepenuhnya — tidak ada vendor lock-in. Tim Anda bisa melanjutkan kapan saja.' },
      en: { q: 'Do I get full access to the code?', a: 'Yes. All code and its documentation belong entirely to you — no vendor lock-in. Your team can take over anytime.' },
      zh: { q: '我能获得完整的代码访问权限吗？', a: '可以。全部代码及其文档完全归您所有——无供应商锁定。您的团队随时可以接手继续开发。' },
    },
  },
  {
    id: 'garansi',
    i18n: {
      id: { q: 'Apakah ada garansi dan maintenance?', a: 'Ada. Setiap proyek mencakup masa garansi bug, dan kami menyediakan paket maintenance untuk monitoring, update keamanan, serta backup berkala.' },
      en: { q: 'Is there a warranty and maintenance?', a: 'Yes. Every project includes a bug-warranty period, and we offer maintenance packages for monitoring, security updates, and regular backups.' },
      zh: { q: '是否提供质保与维护服务？', a: '提供。每个项目都包含错误质保期，我们还提供维护套餐，涵盖监控、安全更新与定期备份。' },
    },
  },
  {
    id: 'teknologi',
    i18n: {
      id: { q: 'Teknologi apa yang dipakai?', a: 'Kami memakai stack modern: Next.js, React, TypeScript, Tailwind CSS, Node.js, Flutter, PostgreSQL, dan Laravel — dipilih sesuai kebutuhan proyek agar cepat, aman, dan mudah dikembangkan.' },
      en: { q: 'What technology do you use?', a: 'We use a modern stack: Next.js, React, TypeScript, Tailwind CSS, Node.js, Flutter, PostgreSQL, and Laravel — chosen to fit each project so it stays fast, secure, and easy to extend.' },
      zh: { q: '你们使用什么技术？', a: '我们采用现代技术栈：Next.js、React、TypeScript、Tailwind CSS、Node.js、Flutter、PostgreSQL与Laravel——根据项目需求灵活选用，确保系统快速、安全且易于扩展。' },
    },
  },
]
