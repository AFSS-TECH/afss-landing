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

