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

