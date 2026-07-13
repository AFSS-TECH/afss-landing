-- Jalankan di Supabase Dashboard → SQL Editor → New Query → Run
-- Mengisi / memperbarui data pricing & bundle di content_sections
-- Termasuk produk baru: Aplikasi Mobile (slug: aplikasi-mobile)
--
-- Aman dijalankan berulang kali (ON CONFLICT DO UPDATE = upsert)

-- ═══════════════════════════════════════════════════════════════
-- 1. HARGA PRODUK (7 produk)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO content_sections (id, data) VALUES (
  'pricing',
  '[
    {
      "slug": "landing-page",
      "icon": "fa-solid fa-rectangle-ad",
      "hot": false,
      "i18n": {
        "id": {
          "name": "Landing Page",
          "category": "Website",
          "price": "Rp 1,5 Jt",
          "note": "mulai dari",
          "desc": "Satu halaman fokus konversi untuk iklan, produk, atau event — persuasif, cepat, dan terukur hasilnya.",
          "feats": ["Desain fokus konversi & CTA jelas", "Loading < 2 detik (LCP optimal)", "Form lead + CTA WhatsApp", "Mobile-first & tracking siap"]
        },
        "en": {
          "name": "Landing Page",
          "category": "Website",
          "price": "Rp 1.5M",
          "note": "starting from",
          "desc": "A single conversion-focused page for ads, products, or events — persuasive, fast, and built to measure results.",
          "feats": ["Conversion-focused design & clear CTAs", "Load time under 2s (optimal LCP)", "Lead form + WhatsApp CTA", "Mobile-first & tracking ready"]
        },
        "zh": {
          "name": "落地页",
          "category": "网站",
          "price": "Rp 1.5M",
          "note": "起",
          "desc": "为广告、产品或活动打造的单页转化页面——极具说服力、加载迅速，且效果可量化。",
          "feats": ["以转化为核心的设计与清晰的CTA", "加载时间低于2秒（最佳LCP）", "获客表单 + WhatsApp咨询按钮", "移动优先设计，内置追踪功能"]
        }
      }
    },
    {
      "slug": "company-profile",
      "icon": "fa-solid fa-briefcase",
      "hot": false,
      "i18n": {
        "id": {
          "name": "Company Profile",
          "category": "Website",
          "price": "Rp 4,5 Jt",
          "note": "mulai dari",
          "desc": "Website 5–7 halaman profesional yang membangun kepercayaan dan mengundang calon klien menghubungi Anda.",
          "feats": ["Desain custom & responsif", "SEO on-page + Google Business", "Halaman Tentang, Layanan, Portofolio, Kontak", "CMS untuk update mandiri"]
        },
        "en": {
          "name": "Company Profile",
          "category": "Website",
          "price": "Rp 4.5M",
          "note": "starting from",
          "desc": "A professional 5-7 page website that builds trust and invites prospective clients to reach out.",
          "feats": ["Custom, responsive design", "On-page SEO + Google Business", "About, Services, Portfolio & Contact pages", "CMS for self-service updates"]
        },
        "zh": {
          "name": "企业官网",
          "category": "网站",
          "price": "Rp 4.5M",
          "note": "起",
          "desc": "5-7页的专业网站，建立信任并邀请潜在客户主动联系您。",
          "feats": ["定制化响应式设计", "页面SEO优化 + Google商家资料", "关于我们、服务、作品集、联系页面", "可自助更新的CMS系统"]
        }
      }
    },
    {
      "slug": "software-custom",
      "icon": "fa-solid fa-code",
      "hot": false,
      "i18n": {
        "id": {
          "name": "Software Custom",
          "category": "Software",
          "price": "Rp 8 Jt",
          "note": "mulai dari",
          "desc": "Web app, dashboard, atau sistem internal custom — gantikan spreadsheet dengan platform terpusat yang real-time.",
          "feats": ["Multi-user & role access (RBAC)", "Dashboard analitik & laporan", "Export Excel/PDF otomatis", "Integrasi API & sistem existing"]
        },
        "en": {
          "name": "Custom Software",
          "category": "Software",
          "price": "Rp 8M",
          "note": "starting from",
          "desc": "A custom web app, dashboard, or internal system — replace spreadsheets with a centralized, real-time platform.",
          "feats": ["Multi-user & role-based access (RBAC)", "Analytics dashboard & reports", "Automatic Excel/PDF export", "API integration with existing systems"]
        },
        "zh": {
          "name": "定制软件",
          "category": "软件",
          "price": "Rp 8M",
          "note": "起",
          "desc": "定制Web应用、仪表盘或内部系统——用集中化的实时平台取代电子表格。",
          "feats": ["多用户与角色权限管理（RBAC）", "数据分析仪表盘与报表", "自动Excel/PDF导出", "与现有系统的API集成"]
        }
      }
    },
    {
      "slug": "aplikasi-mobile",
      "icon": "fa-solid fa-mobile-screen",
      "hot": false,
      "i18n": {
        "id": {
          "name": "Aplikasi Mobile",
          "category": "Mobile",
          "price": "Rp 15 Jt",
          "note": "mulai dari",
          "desc": "Aplikasi Android & iOS cross-platform yang ringan, cepat, dan nyaman — siap dipublikasikan ke Play Store & App Store.",
          "feats": ["Android & iOS (Flutter cross-platform)", "UI/UX desain custom", "Integrasi API & notifikasi push", "Siap publish Play Store & App Store"]
        },
        "en": {
          "name": "Mobile App",
          "category": "Mobile",
          "price": "Rp 15M",
          "note": "starting from",
          "desc": "A lightweight, fast, and comfortable Android & iOS cross-platform app — ready to publish on Play Store & App Store.",
          "feats": ["Android & iOS (Flutter cross-platform)", "Custom UI/UX design", "API integration & push notifications", "Ready to publish on Play Store & App Store"]
        },
        "zh": {
          "name": "移动应用",
          "category": "移动端",
          "price": "Rp 15M",
          "note": "起",
          "desc": "轻量、快速、舒适的Android与iOS跨平台应用——随时可发布至Play Store与App Store。",
          "feats": ["Android与iOS（Flutter跨平台）", "定制UI/UX设计", "API集成与推送通知", "可发布至Play Store与App Store"]
        }
      }
    },
    {
      "slug": "erp",
      "icon": "fa-solid fa-circle-nodes",
      "hot": true,
      "i18n": {
        "id": {
          "name": "ERP Custom",
          "category": "Software",
          "price": "Rp 28 Jt",
          "note": "mulai dari",
          "desc": "ERP yang menyatukan keuangan, inventory, SDM, dan operasional sesuai alur kerja unik bisnis Anda.",
          "feats": ["Modul keuangan & akuntansi", "Inventory & manajemen gudang", "HR, absensi & penggajian", "Dashboard eksekutif real-time"]
        },
        "en": {
          "name": "Custom ERP",
          "category": "Software",
          "price": "Rp 28M",
          "note": "starting from",
          "desc": "An ERP that unifies finance, inventory, HR, and operations to match your business unique workflow.",
          "feats": ["Finance & accounting module", "Inventory & warehouse management", "HR, attendance & payroll", "Real-time executive dashboard"]
        },
        "zh": {
          "name": "定制ERP系统",
          "category": "软件",
          "price": "Rp 28M",
          "note": "起",
          "desc": "根据您企业独特工作流程整合财务、库存、人力资源与运营的ERP系统。",
          "feats": ["财务与会计模块", "库存与仓库管理", "人力资源、考勤与薪资管理", "实时高管仪表盘"]
        }
      }
    },
    {
      "slug": "ecommerce",
      "icon": "fa-solid fa-cart-shopping",
      "hot": false,
      "i18n": {
        "id": {
          "name": "E-Commerce",
          "category": "E-Commerce",
          "price": "Rp 18 Jt",
          "note": "mulai dari",
          "desc": "Toko online custom dengan payment gateway lokal, manajemen produk & stok, dan dashboard penjualan.",
          "feats": ["Payment gateway Midtrans / Xendit", "Manajemen produk, kategori & stok", "Kalkulasi ongkir otomatis", "Dashboard & laporan penjualan"]
        },
        "en": {
          "name": "E-Commerce",
          "category": "E-Commerce",
          "price": "Rp 18M",
          "note": "starting from",
          "desc": "A custom online store with local payment gateways, product & stock management, and a sales dashboard.",
          "feats": ["Midtrans / Xendit payment gateway", "Product, category & stock management", "Automatic shipping cost calculation", "Sales dashboard & reports"]
        },
        "zh": {
          "name": "电商平台",
          "category": "电商",
          "price": "Rp 18M",
          "note": "起",
          "desc": "集成本地支付网关、产品与库存管理及销售仪表盘的定制在线商店。",
          "feats": ["Midtrans / Xendit支付网关", "产品、分类与库存管理", "自动运费计算", "销售仪表盘与报表"]
        }
      }
    },
    {
      "slug": "marketplace",
      "icon": "fa-solid fa-store",
      "hot": false,
      "i18n": {
        "id": {
          "name": "Marketplace",
          "category": "E-Commerce",
          "price": "Rp 65 Jt",
          "note": "mulai dari",
          "desc": "Platform multi-vendor — seller mendaftar, upload produk, buyer bertransaksi, admin kelola semua dari satu panel.",
          "feats": ["Multi-vendor: seller, buyer & admin", "Komisi & settlement otomatis", "Review, rating & dispute", "App mobile buyer + seller tersedia"]
        },
        "en": {
          "name": "Marketplace",
          "category": "E-Commerce",
          "price": "Rp 65M",
          "note": "starting from",
          "desc": "A multi-vendor platform — sellers register and upload products, buyers transact, and admins manage everything from one panel.",
          "feats": ["Multi-vendor: seller, buyer & admin", "Automatic commission & settlement", "Reviews, ratings & dispute handling", "Buyer + seller mobile apps available"]
        },
        "zh": {
          "name": "多商户平台",
          "category": "电商",
          "price": "Rp 65M",
          "note": "起",
          "desc": "多商户平台——卖家注册上架商品，买家下单交易，管理员在同一后台统一管理。",
          "feats": ["多商户支持：卖家、买家与管理员", "自动佣金结算", "评价、评分与纠纷处理", "提供买家与卖家移动应用"]
        }
      }
    }
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE
  SET data = EXCLUDED.data,
      updated_at = now();


-- ═══════════════════════════════════════════════════════════════
-- 2. PAKET KOMBINASI (6 bundle)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO content_sections (id, data) VALUES (
  'pricing_bundles',
  '[
    {
      "icon": "fa-solid fa-seedling",
      "hot": false,
      "i18n": {
        "id": {
          "name": "Paket UMKM Starter",
          "tag": "Paling terjangkau",
          "desc": "Untuk UMKM yang baru go-digital. Dapatkan landing page profesional + ketenangan pikiran dengan maintenance 3 bulan.",
          "items": ["Landing Page", "Setup Google Business Profile", "Maintenance 3 bulan"],
          "normalPrice": "Rp 4,75 Jt",
          "price": "Rp 3,5 Jt",
          "save": "Hemat Rp 1,25 Jt"
        },
        "en": {
          "name": "SME Starter Package",
          "tag": "Most affordable",
          "desc": "For SMEs just going digital. Get a professional landing page + peace of mind with 3 months of maintenance.",
          "items": ["Landing Page", "Google Business Profile Setup", "3 Months Maintenance"],
          "normalPrice": "Rp 4.75M",
          "price": "Rp 3.5M",
          "save": "Save Rp 1.25M"
        },
        "zh": {
          "name": "中小微企业入门套餐",
          "tag": "最超值",
          "desc": "为刚开始数字化转型的中小微企业打造。获得专业落地页，加上3个月维护服务的安心保障。",
          "items": ["落地页", "Google商家资料设置", "3个月维护服务"],
          "normalPrice": "Rp 4.75M",
          "price": "Rp 3.5M",
          "save": "节省 Rp 1.25M"
        }
      }
    },
    {
      "icon": "fa-solid fa-briefcase",
      "hot": false,
      "i18n": {
        "id": {
          "name": "Paket Bisnis Profil",
          "tag": "Populer untuk UKM",
          "desc": "Company profile yang kuat + sistem manajemen internal ringan — tampil profesional ke luar, operasional rapi ke dalam.",
          "items": ["Company Profile Website", "Mini Dashboard", "Maintenance 1 bulan"],
          "normalPrice": "Rp 19,5 Jt",
          "price": "Rp 16 Jt",
          "save": "Hemat Rp 3,5 Jt"
        },
        "en": {
          "name": "Business Profile Package",
          "tag": "Popular for SMEs",
          "desc": "A strong company profile + a lightweight internal management system — professional on the outside, organized on the inside.",
          "items": ["Company Profile Website", "Mini Dashboard", "1 Month Maintenance"],
          "normalPrice": "Rp 19.5M",
          "price": "Rp 16M",
          "save": "Save Rp 3.5M"
        },
        "zh": {
          "name": "企业形象套餐",
          "tag": "中小企业热门之选",
          "desc": "强大的企业官网 + 轻量级内部管理系统——对外展现专业形象，对内保持高效运营。",
          "items": ["企业官网", "迷你仪表盘", "1个月维护服务"],
          "normalPrice": "Rp 19.5M",
          "price": "Rp 16M",
          "save": "节省 Rp 3.5M"
        }
      }
    },
    {
      "icon": "fa-solid fa-bag-shopping",
      "hot": true,
      "i18n": {
        "id": {
          "name": "Paket Digital Commerce",
          "tag": "Rekomendasi bisnis online",
          "desc": "Toko online + aplikasi mobile: jangkau pelanggan dari browser maupun smartphone dalam satu ekosistem terintegrasi.",
          "items": ["Toko Online (E-Commerce)", "Aplikasi Mobile", "Maintenance 2 bulan"],
          "normalPrice": "Rp 51,5 Jt",
          "price": "Rp 45 Jt",
          "save": "Hemat Rp 6,5 Jt"
        },
        "en": {
          "name": "Digital Commerce Package",
          "tag": "Recommended for online business",
          "desc": "Online store + mobile app: reach customers from both browser and smartphone in one integrated ecosystem.",
          "items": ["Online Store (E-Commerce)", "Mobile App", "2 Months Maintenance"],
          "normalPrice": "Rp 51.5M",
          "price": "Rp 45M",
          "save": "Save Rp 6.5M"
        },
        "zh": {
          "name": "数字商务套餐",
          "tag": "在线业务推荐之选",
          "desc": "在线商店 + 移动应用：在一个整合生态系统中，同时通过浏览器与手机触达客户。",
          "items": ["在线商店（电商）", "移动应用", "2个月维护服务"],
          "normalPrice": "Rp 51.5M",
          "price": "Rp 45M",
          "save": "节省 Rp 45M"
        }
      }
    },
    {
      "icon": "fa-solid fa-building-columns",
      "hot": false,
      "i18n": {
        "id": {
          "name": "Paket Enterprise",
          "tag": "Solusi korporat",
          "desc": "ERP, dashboard analitik, dan aplikasi mobile dalam satu ekosistem — untuk bisnis skala menengah yang butuh efisiensi penuh.",
          "items": ["Sistem ERP Custom", "Mini Dashboard Eksekutif", "Aplikasi Mobile", "Maintenance 3 bulan"],
          "normalPrice": "Rp 49,25 Jt",
          "price": "Rp 43 Jt",
          "save": "Hemat Rp 6,25 Jt"
        },
        "en": {
          "name": "Enterprise Package",
          "tag": "Corporate solution",
          "desc": "ERP, analytics dashboard, and mobile app in one ecosystem — for mid-size businesses that need full efficiency.",
          "items": ["Custom ERP System", "Mini Executive Dashboard", "Mobile App", "3 Months Maintenance"],
          "normalPrice": "Rp 49.25M",
          "price": "Rp 43M",
          "save": "Save Rp 6.25M"
        },
        "zh": {
          "name": "企业级套餐",
          "tag": "企业解决方案",
          "desc": "ERP系统、数据分析仪表盘与移动应用整合于一个生态系统——为需要全面提升效率的中型企业打造。",
          "items": ["定制ERP系统", "迷你高管仪表盘", "移动应用", "3个月维护服务"],
          "normalPrice": "Rp 49.25M",
          "price": "Rp 43M",
          "save": "节省 Rp 6.25M"
        }
      }
    },
    {
      "icon": "fa-solid fa-handshake",
      "hot": false,
      "i18n": {
        "id": {
          "name": "Paket Sales Digital",
          "tag": "Untuk tim penjualan",
          "desc": "Company profile yang membangun kepercayaan + CRM yang memastikan tidak ada leads lolos — kombinasi ideal untuk bisnis B2B.",
          "items": ["Company Profile Website", "Sistem CRM", "Maintenance 2 bulan"],
          "normalPrice": "Rp 22,5 Jt",
          "price": "Rp 19 Jt",
          "save": "Hemat Rp 3,5 Jt"
        },
        "en": {
          "name": "Digital Sales Package",
          "tag": "For sales teams",
          "desc": "A trust-building company profile + a CRM that ensures no lead slips through — an ideal combination for B2B businesses.",
          "items": ["Company Profile Website", "CRM System", "2 Months Maintenance"],
          "normalPrice": "Rp 22.5M",
          "price": "Rp 19M",
          "save": "Save Rp 3.5M"
        },
        "zh": {
          "name": "数字销售套餐",
          "tag": "专为销售团队打造",
          "desc": "建立信任的企业官网 + 确保不遗漏任何一个潜在客户的CRM系统——B2B业务的理想组合。",
          "items": ["企业官网", "CRM客户管理系统", "2个月维护服务"],
          "normalPrice": "Rp 22.5M",
          "price": "Rp 19M",
          "save": "节省 Rp 3.5M"
        }
      }
    },
    {
      "icon": "fa-solid fa-rocket",
      "hot": false,
      "i18n": {
        "id": {
          "name": "Paket Marketplace Pro",
          "tag": "Skala besar",
          "desc": "Platform marketplace lengkap dengan aplikasi mobile untuk buyer dan seller — ekosistem digital yang siap bersaing.",
          "items": ["Platform Marketplace", "Aplikasi Mobile (Buyer & Seller)", "Maintenance 3 bulan"],
          "normalPrice": "Rp 92,25 Jt",
          "price": "Rp 82 Jt",
          "save": "Hemat Rp 10 Jt"
        },
        "en": {
          "name": "Marketplace Pro Package",
          "tag": "Large scale",
          "desc": "A complete marketplace platform with mobile apps for buyers and sellers — a digital ecosystem ready to compete.",
          "items": ["Marketplace Platform", "Mobile App (Buyer & Seller)", "3 Months Maintenance"],
          "normalPrice": "Rp 92.25M",
          "price": "Rp 82M",
          "save": "Save Rp 10M"
        },
        "zh": {
          "name": "专业级多商户套餐",
          "tag": "大规模部署",
          "desc": "功能完整的多商户平台，配备买家与卖家双端移动应用——随时可投入市场竞争的数字生态系统。",
          "items": ["多商户平台", "移动应用（买家与卖家端）", "3个月维护服务"],
          "normalPrice": "Rp 92.25M",
          "price": "Rp 82M",
          "save": "节省 Rp 10M"
        }
      }
    }
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE
  SET data = EXCLUDED.data,
      updated_at = now();
