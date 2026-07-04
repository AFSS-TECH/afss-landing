import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Icon } from './Icon.jsx'
import emailjs from '@emailjs/browser'
import { BRAND, products, why, stats, waLink, getProductBySlug, pricing, pricingBundles, faqs, portfolioProjects } from './data.js'
import { Link, RawLink } from './i18n/link.jsx'
import { useLocale, pick } from './i18n/context.jsx'
import { useHreflangTags } from './i18n/HreflangTags.jsx'
import { withLocale } from './i18n/locales.js'

const SITE_URL = 'https://afss.tech'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }
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
  const { locale } = useLocale()
  const items = stats.map((s) => pick(s, locale))
  return (
    <div className="hero-stat-card">
      {items.map((s, i) => (
        <div key={s.id || i}>
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
    relatedSlugs: ['company-profile', 'ecommerce'],
    i18n: {
      id: {
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
      },
      en: {
        headline: 'High-Converting Landing Page Development',
        subline: 'A single page engineered to turn ad traffic into leads or customers — fast, persuasive, and measurable.',
        longDesc: 'A landing page is more than a regular web page — it is the spearhead of your ad campaign, and it has to convince visitors within seconds. AFSS designs landing pages with conversion in mind: persuasive copywriting, CTA-focused design, and load times under 2 seconds.',
        benefits: [
          { icon: 'fa-solid fa-bullseye', title: 'Single-Minded Focus', desc: 'No distractions. Every element is aimed at driving one action: contact, buy, or sign up.' },
          { icon: 'fa-solid fa-gauge-high', title: 'Loads in Under 2 Seconds', desc: 'Every second of delay drops conversion by 7%. Our landing pages are optimized for maximum speed.' },
          { icon: 'fa-solid fa-mobile-screen', title: 'Mobile-First', desc: 'Over 70% of ad traffic comes from phones. Our designs prioritize mobile without sacrificing desktop.' },
          { icon: 'fa-solid fa-chart-bar', title: 'Tracking & Analytics', desc: 'Google Analytics, Meta Pixel, and conversion-event integration to accurately measure campaign ROI.' },
        ],
        serviceFaq: [
          { q: 'How much does a landing page cost?', a: 'Starting from Rp 1.5M for a simple design. With extra features (animation, tracking, copywriting), pricing starts around Rp 3–6M.' },
          { q: 'How long does it take?', a: 'A standard landing page is done in 3–7 business days. With revisions and content approval, it usually takes 1–2 weeks total.' },
          { q: 'Is copywriting included?', a: 'It can be. We offer packages with persuasive copywriting based on audience and competitor research.' },
          { q: 'Can it connect to Meta/Google ads?', a: 'Yes. We set up tracking pixels and conversion events, and make sure the URL is ready to use in paid ad campaigns.' },
        ],
      },
      zh: {
        headline: '高转化落地页开发服务',
        subline: '专为将广告流量转化为潜在客户或买家而设计的单页——快速、极具说服力，且效果可量化。',
        longDesc: '落地页不只是一个普通网页——它是您广告活动的先锋，必须在几秒钟内说服访客。AFSS以转化为核心设计落地页：极具说服力的文案、聚焦CTA的设计，以及低于2秒的加载速度。',
        benefits: [
          { icon: 'fa-solid fa-bullseye', title: '专注单一目标', desc: '没有任何干扰。每个元素都指向同一个行动：联系、购买或注册。' },
          { icon: 'fa-solid fa-gauge-high', title: '加载时间低于2秒', desc: '每延迟一秒，转化率就下降7%。我们的落地页经过优化，速度极致。' },
          { icon: 'fa-solid fa-mobile-screen', title: '移动优先', desc: '超过70%的广告流量来自手机。我们的设计以移动端为先，同时不牺牲桌面端体验。' },
          { icon: 'fa-solid fa-chart-bar', title: '追踪与数据分析', desc: '集成Google Analytics、Meta Pixel与转化事件追踪，精准衡量广告投放回报率。' },
        ],
        serviceFaq: [
          { q: '落地页的价格是多少？', a: '简单设计起价150万印尼盾。加上额外功能（动效、追踪、文案撰写），价格约为300–600万印尼盾。' },
          { q: '制作需要多长时间？', a: '标准落地页3–7个工作日完成。加上修改与内容确认，通常总计需要1–2周。' },
          { q: '是否包含文案撰写？', a: '可以。我们提供基于受众与竞品调研的专业文案撰写服务。' },
          { q: '可以对接Meta/Google广告吗？', a: '可以。我们会安装追踪像素与转化事件，并确保URL可直接用于付费广告投放。' },
        ],
      },
    },
  },
  'company-profile': {
    relatedSlugs: ['landing-page', 'software-custom'],
    i18n: {
      id: {
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
      },
      en: {
        headline: 'Company Profile Website Development',
        subline: 'A corporate website that builds trust, showcases your services, and invites prospective clients to reach out.',
        longDesc: 'In the digital age, prospective clients check your company website before deciding to work with you. A good company profile is the best representation of your business — showcasing credibility, services, team, and clear, professional contact information.',
        benefits: [
          { icon: 'fa-solid fa-building', title: 'Modern Corporate Design', desc: 'A professional look that reflects your brand identity — trusted by prospects from the very first visit.' },
          { icon: 'fa-solid fa-magnifying-glass', title: 'Local SEO Optimization', desc: 'Optimized to show up on Google when prospects search for a business like yours in your city or industry.' },
          { icon: 'fa-solid fa-layer-group', title: 'Complete Multi-Page Structure', desc: 'Home, About, Services, Portfolio, and Contact — a complete, easy-to-navigate structure.' },
          { icon: 'fa-solid fa-pen-to-square', title: 'Easy to Update', desc: 'A simple content management system so you can update news, portfolio, and info without a developer.' },
        ],
        serviceFaq: [
          { q: 'How many pages are included?', a: 'The standard package covers 5–7 core pages. Additional pages can be added as needed.' },
          { q: 'How long does it take?', a: 'Typically 2–4 weeks including design, development, and revisions. The exact timeline is agreed upfront.' },
          { q: 'Is hosting and domain included?', a: 'It can be. We help set up your chosen domain and fast hosting with free SSL.' },
          { q: 'Can it be built in English?', a: 'Yes, it can be built bilingual (Indonesian & English) for an affordable extra fee.' },
        ],
      },
      zh: {
        headline: '企业官网开发服务',
        subline: '建立信任、展示业务服务，并邀请潜在客户主动联系您的企业形象网站。',
        longDesc: '在数字时代，潜在客户在决定合作前，通常会先查看您公司的网站。一个优秀的企业官网是您业务最好的代言人——清晰、专业地展示可信度、服务内容、团队与联系方式。',
        benefits: [
          { icon: 'fa-solid fa-building', title: '现代化企业设计', desc: '专业的外观，展现您的品牌形象——从第一次访问就赢得潜在客户的信任。' },
          { icon: 'fa-solid fa-magnifying-glass', title: '本地SEO优化', desc: '经过优化，当潜在客户在您所在城市或行业搜索相关业务时，能在Google上被找到。' },
          { icon: 'fa-solid fa-layer-group', title: '完整的多页面结构', desc: '首页、关于我们、服务、作品集与联系方式——结构完整，导航清晰。' },
          { icon: 'fa-solid fa-pen-to-square', title: '轻松更新', desc: '简易的内容管理系统，让您无需开发人员即可自行更新新闻、作品集与信息。' },
        ],
        serviceFaq: [
          { q: '包含多少个页面？', a: '标准套餐包含5–7个核心页面。可根据需要添加更多页面。' },
          { q: '制作需要多长时间？', a: '通常需要2–4周，包括设计、开发与修改。确切的时间表会提前商定。' },
          { q: '是否包含主机托管与域名？', a: '可以。我们协助设置您选择的域名，并提供带免费SSL证书的高速主机托管。' },
          { q: '可以制作英文版本吗？', a: '可以做成双语版本（印尼语与英语），只需额外支付一笔合理的费用。' },
        ],
      },
    },
  },
  'software-custom': {
    relatedSlugs: ['erp', 'ecommerce'],
    i18n: {
      id: {
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
      },
      en: {
        headline: 'Custom Software & Web App Development',
        subline: 'Web apps, dashboards, CRMs, or internal systems built from scratch around your business workflow — not a generic template.',
        longDesc: 'A growing business needs a system that grows with it. AFSS builds custom software that replaces spreadsheets and manual processes with a centralized platform — from simple dashboards to enterprise-scale management systems.',
        benefits: [
          { icon: 'fa-solid fa-chart-line', title: 'Real-Time Dashboard', desc: 'Sales, stock, and KPI data displayed live for faster decision-making.' },
          { icon: 'fa-solid fa-layer-group', title: 'Multi-User & Role Access (RBAC)', desc: 'Set access rights per department — staff only see the data they need to see.' },
          { icon: 'fa-solid fa-file-invoice', title: 'Automated Reports & Export', desc: 'Daily, weekly, or custom reports exportable to Excel/PDF in one click.' },
          { icon: 'fa-solid fa-circle-nodes', title: 'System Integration', desc: 'Can be integrated with the accounting, payment gateway, logistics, or ERP systems you already use.' },
        ],
        serviceFaq: [
          { q: 'What does custom software cost?', a: 'Simple dashboards start from Rp 8M. Complex software with many modules starts around Rp 20–50M. An exact estimate follows a consultation.' },
          { q: 'How long does it take?', a: 'Simple software takes 3–6 weeks. Complex systems take 2–4 months. The exact timeline is agreed at the proposal stage.' },
          { q: 'Can it be accessed from a smartphone?', a: 'Yes. We build responsive systems — usable from an office desktop or a smartphone in the field without installing anything.' },
          { q: 'Do we own the code?', a: 'Yes. All source code, documentation, and assets become entirely yours once the project is paid in full.' },
        ],
      },
      zh: {
        headline: '定制软件与Web应用开发服务',
        subline: '根据您的业务流程从零打造的Web应用、仪表盘、CRM或内部系统——而非通用模板。',
        longDesc: '成长中的企业需要能够与其共同成长的系统。AFSS打造定制软件，以集中化平台取代电子表格与手动流程——从简单的仪表盘到企业级管理系统，一应俱全。',
        benefits: [
          { icon: 'fa-solid fa-chart-line', title: '实时仪表盘', desc: '销售、库存与KPI数据即时呈现，助力更快速的决策。' },
          { icon: 'fa-solid fa-layer-group', title: '多用户与角色权限（RBAC）', desc: '按部门设置访问权限——员工只能查看其需要的数据。' },
          { icon: 'fa-solid fa-file-invoice', title: '自动报表与导出', desc: '日报、周报或自定义报表，一键导出为Excel/PDF格式。' },
          { icon: 'fa-solid fa-circle-nodes', title: '系统集成', desc: '可与您现有的财务系统、支付网关、物流或ERP系统集成对接。' },
        ],
        serviceFaq: [
          { q: '定制软件的费用大概是多少？', a: '简单仪表盘起价800万印尼盾。包含多个模块的复杂软件约为2000–5000万印尼盾。确切报价需咨询后确定。' },
          { q: '制作需要多长时间？', a: '简单软件需要3–6周。复杂系统需要2–4个月。确切的时间表将在方案阶段确定。' },
          { q: '可以在手机上访问吗？', a: '可以。我们打造的系统具备响应式设计——无论是办公室电脑还是外勤手机，无需安装任何应用即可使用。' },
          { q: '代码归我们所有吗？', a: '是的。项目全款支付后，全部源代码、文档与资产将完全归您所有。' },
        ],
      },
    },
  },
  'erp': {
    relatedSlugs: ['software-custom', 'ecommerce'],
    i18n: {
      id: {
        headline: 'Jasa Pembuatan Sistem ERP Custom untuk Bisnis',
        subline: 'ERP yang dibangun sesuai alur kerja bisnis Anda — bukan dipaksakan ke template generik — menyatukan seluruh operasional dalam satu platform.',
        longDesc: 'ERP (Enterprise Resource Planning) mengintegrasikan semua departemen bisnis Anda: keuangan, inventory, SDM, produksi, dan penjualan — dalam satu platform terpusat. AFSS membangun ERP custom yang benar-benar sesuai proses bisnis Anda.',
        benefits: [
          { icon: 'fa-solid fa-coins', title: 'Modul Keuangan & Akuntansi', desc: 'Pembukuan, faktur, laporan laba-rugi, dan arus kas — semua tercatat otomatis dan akurat.' },
          { icon: 'fa-solid fa-warehouse', title: 'Manajemen Inventory & Gudang', desc: 'Stok real-time, mutasi barang, dan peringatan stok minimum agar tidak ada kehabisan atau kelebihan.' },
          { icon: 'fa-solid fa-users', title: 'HR & Penggajian', desc: 'Data karyawan, absensi, perhitungan gaji, dan slip gaji otomatis — terintegrasi dengan BPJS dan PPh 21.' },
          { icon: 'fa-solid fa-chart-column', title: 'Dashboard Eksekutif', desc: 'KPI utama bisnis Anda bisa diakses kapan saja dari perangkat apa pun.' },
        ],
        serviceFaq: [
          { q: 'Berapa lama implementasi ERP?', a: 'ERP sederhana 2–3 modul: 8–12 minggu. ERP lengkap: 4–6 bulan termasuk migrasi data dan training tim.' },
          { q: 'Berapa biaya ERP custom?', a: 'Mulai dari Rp 28 juta untuk 2–3 modul dasar. Estimasi akurat diberikan setelah discovery session.' },
          { q: 'Apakah bisa integrasi dengan sistem lama?', a: 'Ya. Kami evaluasi sistem existing dan buat jembatan integrasi agar data tidak perlu diinput dua kali.' },
          { q: 'Apakah ada training untuk tim kami?', a: 'Ya. Setiap proyek ERP mencakup sesi training lengkap dan dokumentasi user manual.' },
        ],
      },
      en: {
        headline: 'Custom ERP System Development for Business',
        subline: 'An ERP built around your business workflow — not forced into a generic template — unifying your entire operation on one platform.',
        longDesc: 'ERP (Enterprise Resource Planning) integrates every department of your business — finance, inventory, HR, production, and sales — into one centralized platform. AFSS builds custom ERP systems that truly match your business processes.',
        benefits: [
          { icon: 'fa-solid fa-coins', title: 'Finance & Accounting Module', desc: 'Bookkeeping, invoices, profit-and-loss reports, and cash flow — all recorded automatically and accurately.' },
          { icon: 'fa-solid fa-warehouse', title: 'Inventory & Warehouse Management', desc: 'Real-time stock, stock movements, and low-stock alerts so you never run out or overstock.' },
          { icon: 'fa-solid fa-users', title: 'HR & Payroll', desc: 'Employee data, attendance, salary calculation, and automatic payslips — integrated with BPJS and income tax (PPh 21).' },
          { icon: 'fa-solid fa-chart-column', title: 'Executive Dashboard', desc: "Your business's key KPIs, accessible anytime from any device." },
        ],
        serviceFaq: [
          { q: 'How long does ERP implementation take?', a: 'A simple ERP with 2–3 modules: 8–12 weeks. A full ERP: 4–6 months including data migration and team training.' },
          { q: 'What does a custom ERP cost?', a: 'Starting from Rp 28M for 2–3 basic modules. An accurate estimate is given after a discovery session.' },
          { q: 'Can it integrate with legacy systems?', a: "Yes. We evaluate your existing systems and build integration bridges so data never needs to be entered twice." },
          { q: 'Is there training for our team?', a: 'Yes. Every ERP project includes a full training session and user-manual documentation.' },
        ],
      },
      zh: {
        headline: '企业定制ERP系统开发服务',
        subline: '根据您的业务流程量身打造的ERP系统——而非套用通用模板——将整个运营流程整合于一个平台。',
        longDesc: 'ERP（企业资源规划）将您企业的各个部门——财务、库存、人力资源、生产与销售——整合到一个集中化平台中。AFSS打造真正贴合您业务流程的定制ERP系统。',
        benefits: [
          { icon: 'fa-solid fa-coins', title: '财务与会计模块', desc: '记账、发票、损益表与现金流——全部自动、准确记录。' },
          { icon: 'fa-solid fa-warehouse', title: '库存与仓库管理', desc: '实时库存、货物调拨与低库存预警，避免缺货或库存积压。' },
          { icon: 'fa-solid fa-users', title: '人力资源与薪资管理', desc: '员工数据、考勤、薪资计算与自动生成工资单——与BPJS和个人所得税（PPh 21）系统集成。' },
          { icon: 'fa-solid fa-chart-column', title: '高管仪表盘', desc: '随时随地、通过任意设备访问企业核心KPI指标。' },
        ],
        serviceFaq: [
          { q: 'ERP实施需要多长时间？', a: '包含2–3个模块的简单ERP：8–12周。完整ERP系统：4–6个月，包括数据迁移与团队培训。' },
          { q: '定制ERP的费用是多少？', a: '2–3个基础模块起价2800万印尼盾。准确报价将在需求分析会议后提供。' },
          { q: '可以与旧系统集成吗？', a: '可以。我们会评估您现有的系统，并搭建集成桥梁，避免数据重复录入。' },
          { q: '是否为团队提供培训？', a: '是的。每个ERP项目都包含完整的培训课程与用户操作手册。' },
        ],
      },
    },
  },
  'ecommerce': {
    relatedSlugs: ['marketplace', 'software-custom'],
    i18n: {
      id: {
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
      },
      en: {
        headline: 'Custom E-Commerce & Online Store Development',
        subline: 'A full-featured online store — catalog, cart, payments, and order management — built around your business needs.',
        longDesc: 'A good online store is more than just moving products to the internet. It has to convince buyers, make transactions easy, and deliver an enjoyable shopping experience. AFSS builds custom e-commerce with Indonesian payment gateways, easy product management, and a design that drives sales.',
        benefits: [
          { icon: 'fa-solid fa-credit-card', title: 'Complete Payment Gateway', desc: 'Midtrans or Xendit integration for bank transfer, QRIS, credit cards, and e-wallets.' },
          { icon: 'fa-solid fa-boxes-stacked', title: 'Product & Stock Management', desc: 'Add, edit, and manage thousands of products with ease. Stock updates automatically with every order.' },
          { icon: 'fa-solid fa-truck', title: 'Automatic Shipping Calculation', desc: 'JNE, J&T, SiCepat, and other couriers integrated with automatic shipping-cost calculation.' },
          { icon: 'fa-solid fa-chart-line', title: 'Sales Dashboard', desc: 'Track revenue, incoming orders, best-selling products, and store performance in one dashboard.' },
        ],
        serviceFaq: [
          { q: 'What does custom e-commerce cost?', a: 'Starting from Rp 18M for basic features. E-commerce with complex features starts around Rp 35M. An exact estimate follows a consultation.' },
          { q: 'Is custom better than a platform (Shopify/WooCommerce)?', a: 'A platform is faster and cheaper for a simple store. Custom is more flexible for unique needs or high volume.' },
          { q: 'Can I bulk-import products?', a: 'Yes. We set up product import via Excel/CSV so you don’t need to enter items one by one.' },
          { q: 'Can it connect to marketplaces (Tokopedia/Shopee)?', a: 'Yes. We integrate via API to sync stock and orders across multiple sales channels.' },
        ],
      },
      zh: {
        headline: '定制电商与在线商店开发服务',
        subline: '功能完善的在线商店——含商品目录、购物车、支付与订单管理——按您的业务需求打造。',
        longDesc: '优秀的在线商店远不止是把产品搬上网络。它必须打动买家、简化交易流程，并提供愉悦的购物体验。AFSS打造集成印尼本地支付网关、便捷产品管理与促进销售设计的定制电商系统。',
        benefits: [
          { icon: 'fa-solid fa-credit-card', title: '完整支付网关', desc: '集成Midtrans或Xendit，支持银行转账、QRIS扫码、信用卡与电子钱包。' },
          { icon: 'fa-solid fa-boxes-stacked', title: '产品与库存管理', desc: '轻松添加、编辑与管理数千种商品。库存随订单自动更新。' },
          { icon: 'fa-solid fa-truck', title: '自动运费计算', desc: '集成JNE、J&T、SiCepat等快递公司，自动计算运费。' },
          { icon: 'fa-solid fa-chart-line', title: '销售仪表盘', desc: '在一个仪表盘中追踪营收、新订单、畅销商品与店铺表现。' },
        ],
        serviceFaq: [
          { q: '定制电商系统的费用是多少？', a: '基础功能起价1800万印尼盾。功能复杂的电商系统约为3500万印尼盾起。确切报价需咨询后确定。' },
          { q: '定制开发还是使用平台（Shopify/WooCommerce）更好？', a: '对于简单的店铺，平台更快速、更经济。而定制开发对于特殊需求或高流量业务更加灵活。' },
          { q: '可以批量导入商品吗？', a: '可以。我们会设置通过Excel/CSV导入商品的功能，无需逐一手动录入。' },
          { q: '可以对接Tokopedia/Shopee等平台吗？', a: '可以。我们通过API集成，实现多渠道的库存与订单同步。' },
        ],
      },
    },
  },
  'marketplace': {
    relatedSlugs: ['ecommerce', 'software-custom'],
    i18n: {
      id: {
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
      },
      en: {
        headline: 'Multi-Vendor Marketplace Platform Development',
        subline: 'A complete marketplace platform — sellers register and upload products, buyers transact, and admins manage everything from one panel.',
        longDesc: 'A multi-vendor marketplace is a platform that brings many sellers and buyers together in one ecosystem. AFSS builds custom marketplaces with commission systems, seller management, payment gateways, and mobile apps for both buyers and sellers.',
        benefits: [
          { icon: 'fa-solid fa-store', title: 'Multi-Vendor Management', desc: 'Sellers register and manage their own stores. Admins monitor, approve, and control all activity from one panel.' },
          { icon: 'fa-solid fa-percentage', title: 'Automatic Commission & Settlement', desc: 'Flexible commission rules per category or seller. Automatic settlement to seller accounts on schedule.' },
          { icon: 'fa-solid fa-star-half-stroke', title: 'Reviews, Ratings & Disputes', desc: 'A structured system for buyer reviews, seller ratings, and dispute resolution.' },
          { icon: 'fa-solid fa-mobile-screen-button', title: 'Buyer & Seller Mobile Apps', desc: 'Android & iOS apps for buyers to shop and sellers to manage their stores from anywhere.' },
        ],
        serviceFaq: [
          { q: 'What does building a marketplace cost?', a: 'Starting from Rp 65M for a basic marketplace. A marketplace with full mobile apps starts around Rp 100M.' },
          { q: 'How long does a marketplace take to build?', a: 'Without mobile apps: 3–5 months. With mobile apps: 5–8 months.' },
          { q: 'Is there chat between buyers and sellers?', a: 'It can be added. We integrate real-time chat using WebSocket or Firebase.' },
          { q: 'How does the payment system work?', a: "Funds first go into the company's account, then are distributed to sellers after commission is deducted. Midtrans/Xendit are ready to integrate." },
        ],
      },
      zh: {
        headline: '多商户市场平台开发服务',
        subline: '完整的多商户平台——卖家注册上架商品，买家下单交易，管理员在同一后台统一管理。',
        longDesc: '多商户市场平台是一个将众多卖家与买家汇聚于同一生态系统的平台。AFSS打造定制化市场平台，配备佣金系统、卖家管理、支付网关，以及面向买家与卖家的移动应用。',
        benefits: [
          { icon: 'fa-solid fa-store', title: '多商户管理', desc: '卖家可注册并自行管理店铺。管理员在同一后台监控、审核并管控所有活动。' },
          { icon: 'fa-solid fa-percentage', title: '自动佣金与结算', desc: '按类别或卖家灵活设置佣金规则。按计划自动结算至卖家账户。' },
          { icon: 'fa-solid fa-star-half-stroke', title: '评价、评分与纠纷处理', desc: '结构化的买家评价、卖家评分与纠纷解决系统。' },
          { icon: 'fa-solid fa-mobile-screen-button', title: '买家与卖家移动应用', desc: '提供Android与iOS应用，买家可随时购物，卖家可随地管理店铺。' },
        ],
        serviceFaq: [
          { q: '搭建市场平台的费用是多少？', a: '基础版市场平台起价6500万印尼盾。配备完整移动应用的市场平台约为1亿印尼盾起。' },
          { q: '市场平台的开发周期是多长？', a: '不含移动应用：3–5个月。含移动应用：5–8个月。' },
          { q: '买卖双方之间是否有聊天功能？', a: '可以添加。我们使用WebSocket或Firebase集成实时聊天功能。' },
          { q: '支付系统是如何运作的？', a: '资金先进入公司账户，扣除佣金后再分配给卖家。可对接Midtrans/Xendit支付网关。' },
        ],
      },
    },
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
      { icon: 'fa-solid fa-chart-column', title: 'Laporan Manajemen', desc: 'Dashboard eksekutif dengan KPI utama bisnis Anda — bisa diakses kapan saja, dari perangkat apa pun.' },
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
  { id: 'web', icon: 'fa-solid fa-globe', slugs: ['landing-page', 'company-profile'] },
  { id: 'software', icon: 'fa-solid fa-code', slugs: ['software-custom', 'erp'] },
  { id: 'commerce', icon: 'fa-solid fa-cart-shopping', slugs: ['ecommerce', 'marketplace'] },
]

export function LayananIndex() {
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/layanan')}`
  const title = t('layananIndex.seoTitle')
  const desc = t('layananIndex.seoDesc')
  const cats = t('layananIndex.cats')
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      {/* Hero */}
      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('layananIndex.eyebrow') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> {t('layananIndex.eyebrow')}</div>
              <h1 className="page-title">{t('layananIndex.titlePre')}<span className="ital">{t('layananIndex.titleItal')}</span>{t('layananIndex.titlePost')}</h1>
              <p className="page-sub">{t('layananIndex.sub')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={waLink(t('keunggulan.waConsult', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('layananIndex.ctaConsult')}</a>
                <Link className="btn btn-ghost btn-lg" to="/portofolio">{t('layananIndex.ctaPortfolio')}</Link>
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
          const catProds = products.filter((p) => cat.slugs.includes(p.slug)).map((p) => pick(p, locale))
          const catMeta = cats[cat.id]
          return (
            <section key={cat.id} className="svc-cat-sec">
              <div className="container">
                {/* Category header */}
                <Reveal className="svc-cat-hd">
                  <div className="svc-cat-ico"><Icon icon={cat.icon} /></div>
                  <div>
                    <div className="svc-cat-name">{catMeta.label}</div>
                    <div className="svc-cat-sub">{catMeta.sub}</div>
                  </div>
                </Reveal>

                {/* Cards grid */}
                <motion.div className="svc-pg-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
                  {catProds.map((p) => (
                    <motion.div key={p.slug} variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                      <Link to={`/layanan/${p.slug}`} className={`svc-item${p.hot ? ' hot' : ''}`}>
                        {p.hot && <span className="hot-tag">{t('layananIndex.hotTag')}</span>}
                        <div className="svc-item-hd">
                          <div className="svc-item-ico"><Icon icon={p.icon} /></div>
                          <span className="svc-item-metric">{p.metric}</span>
                        </div>
                        <div className="svc-item-name">{p.name}</div>
                        <p className="svc-item-desc">{p.desc}</p>
                        <div className="svc-item-cta">
                          {t('layananIndex.viewDetail')} <Icon icon="fa-solid fa-arrow-right" />
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
          <h2>{t('layananIndex.ctaTitlePre')}<span className="ital">{t('layananIndex.ctaTitleItal')}</span>{t('layananIndex.ctaTitlePost')}</h2>
          <p>{t('layananIndex.ctaDesc')}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={waLink(t('keunggulan.waConsult', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('layananIndex.ctaConsult')}</a>
            <Link className="btn btn-ghost btn-lg" to="/ajukan-proyek"><Icon icon="fa-solid fa-rocket" /> {t('layananIndex.ctaAjukan')}</Link>
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
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()

  const productRaw = getProductBySlug(slug)
  const product = productRaw ? pick(productRaw, locale) : null
  const contentRaw = SERVICE_CONTENT[slug]
  const content = contentRaw ? pick(contentRaw, locale) : null

  if (!product || !content) {
    return (
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">{t('layananDetail.notFoundTitle')}</h1>
          <p className="page-sub"><Link to="/layanan" className="accent-text">{t('layananDetail.notFoundLink')}</Link></p>
        </div>
      </section>
    )
  }

  const canonicalPath = `/layanan/${slug}`
  const url = `${SITE_URL}${withLocale(locale, canonicalPath)}`
  const related = products.filter((p) => contentRaw.relatedSlugs.includes(p.slug)).map((p) => pick(p, locale))

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.beranda'), item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: t('layananDetail.breadcrumbLayanan'), item: `${SITE_URL}/layanan` },
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
        {hreflangTags}
      </Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[
              { label: t('nav.beranda'), to: '/' },
              { label: t('layananDetail.breadcrumbLayanan'), to: '/layanan' },
              { label: product.name },
            ]} />
            <div className="eyebrow"><Icon icon={product.icon} /> {t('layananDetail.breadcrumbLayanan')}</div>
            <h1 className="page-title">{content.headline.split(' ').slice(0, 4).join(' ')} <span className="ital">{content.headline.split(' ').slice(4).join(' ')}</span></h1>
            <p className="page-sub">{content.subline}</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 32 }}>
              <a className="btn btn-pri btn-lg" href={waLink(t('layananDetail.waConsult', { brand: BRAND.short, name: product.name }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('layananDetail.ctaConsult')}</a>
              <Link className="btn btn-ghost btn-lg" to="/layanan"><Icon icon="fa-solid fa-layer-group" /> {t('layananDetail.ctaMore')}</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About this service */}
      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <div className="pages-two-col">
            <Reveal>
              <div className="eyebrow"><Icon icon="fa-solid fa-circle-question" /> {t('layananDetail.aboutEyebrow')}</div>
              <h2 className="sec-title">{t('layananDetail.aboutTitlePre')}<span className="ital">{t('layananDetail.aboutTitleItal')}</span>{t('layananDetail.aboutTitlePost')}</h2>
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
            <div className="eyebrow"><Icon icon="fa-solid fa-award" /> {t('layananDetail.benefitsEyebrow')}</div>
            <h2 className="sec-title">{t('layananDetail.benefitsTitlePre')}<span className="ital">{t('layananDetail.benefitsTitleItal')}</span>{t('layananDetail.benefitsTitlePost')}</h2>
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
            <div className="eyebrow"><Icon icon="fa-solid fa-circle-question" /> {t('layananDetail.faqEyebrow')}</div>
            <h2 className="sec-title">{t('layananDetail.faqTitlePre')}<span className="ital">{t('layananDetail.faqTitleItal')}</span>{t('layananDetail.faqTitlePost')}</h2>
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
              <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> {t('layananDetail.relatedEyebrow')}</div>
              <h2 className="sec-title">{t('layananDetail.relatedTitlePre')}<span className="ital">{t('layananDetail.relatedTitleItal')}</span>{t('layananDetail.relatedTitlePost')}</h2>
            </Reveal>
            <motion.div className="svc-grid" style={{ gridTemplateColumns: `repeat(${related.length}, 1fr)`, maxWidth: 780, margin: '0 auto' }} variants={container} initial="hidden" whileInView="show" viewport={viewport}>
              {related.map((p) => (
                <motion.div key={p.slug} className="svc-card spot" variants={fadeUp} whileHover={{ y: -6 }}>
                  <div className="svc-top"><div className="svc-ico"><Icon icon={p.icon} /></div></div>
                  <div className="svc-name">{p.name}</div>
                  <p className="svc-desc">{p.desc}</p>
                  <div className="svc-foot">
                    <Link className="btn" to={`/layanan/${p.slug}`}>{t('layananDetail.relatedMore')} <Icon icon="fa-solid fa-arrow-right" /></Link>
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
          <h2>{t('layananDetail.ctaTitlePre')}<span className="ital">{product.name.toLowerCase()}</span>{t('layananDetail.ctaTitlePost')}</h2>
          <p>{t('layananDetail.ctaDesc')}</p>
          <a className="btn btn-pri btn-lg" href={waLink(t('layananDetail.waStart', { brand: BRAND.short, name: product.name }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('layananDetail.ctaStart')}</a>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ ABOUT (/tentang) */
export function About() {
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/tentang')}`
  const title = t('about.seoTitle')
  const desc = t('about.seoDesc')
  const milestones = t('about.milestones')
  const whyItems = why.map((w) => pick(w, locale))
  const statsItems = stats.map((s) => pick(s, locale))
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('about.breadcrumb') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-award" /> {t('about.eyebrow')}</div>
              <h1 className="page-title">{t('about.titlePre')}<span className="ital">{t('about.titleItal')}</span>{t('about.titlePost')}</h1>
              <p className="page-sub">{t('about.sub')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={waLink(t('about.waIntro', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('about.ctaConsult')}</a>
                <Link className="btn btn-ghost btn-lg" to="/kontak">{t('about.ctaContact')}</Link>
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
              <div className="eyebrow"><Icon icon="fa-solid fa-route" /> {t('about.storyEyebrow')}</div>
              <h2 className="sec-title">{t('about.storyTitlePre')}<span className="ital">{t('about.storyTitleItal')}</span>{t('about.storyTitlePost')}</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 20 }}>
                {t('about.storyP1')}
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                {t('about.storyP2')}
              </p>
            </Reveal>
            <div>
              {milestones.map((m, i) => (
                <Reveal key={m.year || i}>
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
            <div className="eyebrow"><Icon icon="fa-solid fa-rocket" /> {t('about.missionVisionEyebrow')}</div>
            <h2 className="sec-title">{t('about.missionVisionTitlePre')}<span className="ital">{t('about.missionVisionTitleItal')}</span>{t('about.missionVisionTitlePost')}</h2>
          </Reveal>
          <div className="why-grid" style={{ gridTemplateColumns: '1fr 1fr', maxWidth: 900, margin: '0 auto' }}>
            <Reveal className="why-card">
              <div className="why-ico"><Icon icon="fa-solid fa-rocket" /></div>
              <h3>{t('about.missionTitle')}</h3>
              <p>{t('about.missionText')}</p>
            </Reveal>
            <Reveal className="why-card">
              <div className="why-ico"><Icon icon="fa-solid fa-arrow-trend-up" /></div>
              <h3>{t('about.visionTitle')}</h3>
              <p>{t('about.visionText')}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-heart" /> {t('about.valuesEyebrow')}</div>
            <h2 className="sec-title">{t('about.valuesTitlePre')}<span className="ital">{t('about.valuesTitleItal')}</span>{t('about.valuesTitlePost')}</h2>
          </Reveal>
          <motion.div className="why-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {whyItems.map((w, i) => (
              <motion.div key={i} className="why-card spot" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
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
          {statsItems.map((s, i) => (
            <motion.div key={s.id || i} className="stat-item" variants={fadeUp}>
              <div className="stat-num">{s.prefix || ''}{s.n}{s.suffix}</div>
              <div className="stat-lbl">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <section className="cta-band" style={{ paddingTop: 80 }}>
        <Reveal className="cta-card">
          <h2>{t('about.ctaTitlePre')}<span className="ital">{t('about.ctaTitleItal')}</span>{t('about.ctaTitlePost')}</h2>
          <p>{t('about.ctaDesc')}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={waLink(t('about.waCta', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('about.ctaContact2')}</a>
            <Link className="btn btn-ghost btn-lg" to="/kontak">{t('about.ctaContactInfo')}</Link>
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

export function Contact() {
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/kontak')}`
  const title = t('contact.seoTitle')
  const desc = t('contact.seoDesc')
  const jenisOpts = t('forms.jenisOpts')

  const [form, setForm] = useState({ nama: '', wa: '', jenis: '', pesan: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.nama.trim()) e.nama = t('contact.errNama')
    if (!form.wa.trim()) e.wa = t('contact.errKontak')
    if (!form.jenis) e.jenis = t('contact.errJenis')
    if (!form.pesan.trim()) e.pesan = t('contact.errPesan')
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
    { icon: 'fa-brands fa-whatsapp', title: 'WhatsApp', value: BRAND.phone, sub: t('contact.methods.wa.sub'), href: waLink(t('contact.waConsult', { brand: BRAND.short })), cta: t('contact.methods.wa.cta'), color: 'var(--wa)' },
    { icon: 'fa-solid fa-envelope', title: t('contact.methods.email.title'), value: BRAND.email, sub: t('contact.methods.email.sub'), href: `mailto:${BRAND.email}`, cta: t('contact.methods.email.cta'), color: 'var(--blue)' },
    { icon: 'fa-solid fa-location-dot', title: t('contact.methods.location.title'), value: BRAND.address, sub: t('contact.methods.location.sub'), href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.address)}`, cta: t('contact.methods.location.cta'), color: 'var(--accent)' },
  ]

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('contact.breadcrumb') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-comments" /> {t('contact.eyebrow')}</div>
              <h1 className="page-title">{t('contact.titlePre')}<span className="ital">{t('contact.titleItal')}</span>{t('contact.titlePost')}</h1>
              <p className="page-sub">{t('contact.sub')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-wa btn-lg" href={waLink(t('contact.waConsult', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('contact.ctaChat')}</a>
                <a className="btn btn-ghost btn-lg" href="#contact-form">{t('contact.ctaForm')} <Icon icon="fa-solid fa-arrow-down" /></a>
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
            <div className="eyebrow"><Icon icon="fa-solid fa-paper-plane" /> {t('contact.formEyebrow')}</div>
            <h2 className="sec-title">{t('contact.formTitlePre')}<span className="ital">{t('contact.formTitleItal')}</span>{t('contact.formTitlePost')}</h2>
          </Reveal>

          {status === 'sent' ? (
            <Reveal className="contact-success">
              <div className="success-ico"><Icon icon="fa-solid fa-circle-check" /></div>
              <h3>{t('contact.successTitle')}</h3>
              <p>{t('contact.successPre')}<strong>{form.nama}</strong>{t('contact.successMid')}<strong>{form.wa}</strong>{t('contact.successPost')}</p>
              <a href={waLink(t('contact.waFollowUp', { brand: BRAND.short, nama: form.nama }))} target="_blank" rel="noreferrer" className="btn btn-wa btn-lg" style={{ marginTop: 24 }}>
                <Icon icon="fa-brands fa-whatsapp" /> {t('contact.successFollowUp')}
              </a>
            </Reveal>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="cf-row">
                <div className={`cf-field${errors.nama ? ' error' : ''}`}>
                  <label>{t('contact.labelNama')}</label>
                  <input type="text" value={form.nama} onChange={set('nama')} placeholder={t('contact.placeholderNama')} />
                  {errors.nama && <span className="cf-err">{errors.nama}</span>}
                </div>
                <div className={`cf-field${errors.wa ? ' error' : ''}`}>
                  <label>{t('contact.labelKontak')}</label>
                  <input type="text" value={form.wa} onChange={set('wa')} placeholder={t('contact.placeholderKontak')} />
                  {errors.wa && <span className="cf-err">{errors.wa}</span>}
                </div>
              </div>
              <div className={`cf-field${errors.jenis ? ' error' : ''}`}>
                <label>{t('contact.labelJenis')}</label>
                <select value={form.jenis} onChange={set('jenis')}>
                  <option value="">{t('contact.placeholderJenis')}</option>
                  {jenisOpts.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                {errors.jenis && <span className="cf-err">{errors.jenis}</span>}
              </div>
              <div className={`cf-field${errors.pesan ? ' error' : ''}`}>
                <label>{t('contact.labelPesan')}</label>
                <textarea value={form.pesan} onChange={set('pesan')} rows={5} placeholder={t('contact.placeholderPesan')} />
                {errors.pesan && <span className="cf-err">{errors.pesan}</span>}
              </div>
              <button type="submit" className="btn btn-pri btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
                {status === 'sending' ? <><Icon icon="fa-solid fa-spinner fa-spin" /> {t('contact.submitting')}</> : <><Icon icon="fa-solid fa-paper-plane" /> {t('contact.submit')}</>}
              </button>
              <p style={{ textAlign: 'center', fontSize: '.8rem', color: 'var(--muted)', marginTop: 12 }}>
                {t('contact.noForm')}<a href={waLink(t('contact.waDirect', { brand: BRAND.short }))} target="_blank" rel="noreferrer" className="accent-link">{t('contact.noFormLink')}</a>
              </p>
            </form>
          )}

          <Reveal style={{ marginTop: 52, textAlign: 'center', padding: '24px', background: 'var(--paper-2)', borderRadius: 'var(--r)', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
              <div><strong style={{ display: 'block', color: 'var(--ink)', marginBottom: 4 }}>{t('contact.hours.weekday')}</strong><span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>{t('contact.hours.weekdayTime')}</span></div>
              <div><strong style={{ display: 'block', color: 'var(--ink)', marginBottom: 4 }}>{t('contact.hours.saturday')}</strong><span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>{t('contact.hours.saturdayTime')}</span></div>
              <div><strong style={{ display: 'block', color: 'var(--ink)', marginBottom: 4 }}>{t('contact.hours.waLabel')}</strong><span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>{t('contact.hours.waTime')}</span></div>
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

const PORTO_TAB_SLUGS = ['semua', 'landing-page', 'software-custom', 'erp', 'app-mobile', 'ecommerce', 'marketplace']
const PORTO_TAB_KEYS = { semua: 'semua', 'landing-page': 'landingPage', 'software-custom': 'softwareCustom', erp: 'erp', 'app-mobile': 'appMobile', ecommerce: 'ecommerce', marketplace: 'marketplace' }

export function Portfolio() {
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/portofolio')}`
  const title = t('portfolio.seoTitle')
  const desc = t('portfolio.seoDesc')
  const tabLabels = t('portfolio.tabs')
  const [activeTab, setActiveTab] = useState('semua')

  const filteredRaw = activeTab === 'semua'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.catSlug === activeTab)
  const filtered = filteredRaw.map((p) => pick(p, locale))

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('portfolio.breadcrumb') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-images" /> {t('portfolio.eyebrow')}</div>
              <h1 className="page-title">{t('portfolio.titlePre')}<span className="ital">{t('portfolio.titleItal')}</span>{t('portfolio.titlePost')}</h1>
              <p className="page-sub">{t('portfolio.sub', { count: portfolioProjects.length })}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-wa btn-lg" href={waLink(t('portfolio.waDiscuss', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('portfolio.ctaDiscuss')}</a>
                <Link className="btn btn-ghost btn-lg" to="/estimasi"><Icon icon="fa-solid fa-calculator" /> {t('portfolio.ctaEstimate')}</Link>
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
            {PORTO_TAB_SLUGS.map(slug => (
              <button key={slug} className={`porto-tab${activeTab === slug ? ' active' : ''}`} onClick={() => setActiveTab(slug)}>
                {tabLabels[PORTO_TAB_KEYS[slug]]}
                <span className="porto-tab-count">{slug === 'semua' ? portfolioProjects.length : portfolioProjects.filter(p => p.catSlug === slug).length}</span>
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
                      </div>
                      <h3 className="porto-card-title">{p.title}</h3>
                      <p className="porto-card-tagline">{p.tagline}</p>
                      <div className="porto-card-result"><Icon icon="fa-solid fa-arrow-trend-up" /> {p.result} <span>— {p.result2}</span></div>
                      <div className="porto-card-tags">{p.tags.slice(0,3).map(tag => <span key={tag}>{tag}</span>)}</div>
                    </div>
                    <div className="porto-card-footer">
                      <span>{t('portfolio.viewDetail')}</span>
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
              <p>{t('portfolio.emptyState')}</p>
            </div>
          )}
        </div>
      </section>

      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>{t('portfolio.ctaTitlePre')}<span className="ital">{t('portfolio.ctaTitleItal')}</span>{t('portfolio.ctaTitlePost')}</h2>
          <p>{t('portfolio.ctaDesc')}</p>
          <div className="btns">
            <a className="btn btn-wa btn-lg" href={waLink(t('portfolio.waDiscuss', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('portfolio.ctaDiscuss')}</a>
            <Link className="btn btn-ghost btn-lg" to="/estimasi">{t('portfolio.ctaEstimate')} <Icon icon="fa-solid fa-calculator" /></Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ PORTFOLIO DETAIL (/portofolio/:slug) */
export function PortfolioDetail() {
  const { slug } = useParams()
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const pRaw = portfolioProjects.find(x => x.slug === slug)
  const p = pRaw ? pick(pRaw, locale) : null

  if (!p) return (
    <section className="page-hero">
      <div className="container">
        <h1 className="page-title">{t('portfolio.notFoundTitle')}</h1>
        <Link to="/portofolio" className="btn btn-ghost" style={{ marginTop: 20 }}><Icon icon="fa-solid fa-arrow-left" /> {t('portfolio.backToPortfolio')}</Link>
      </div>
    </section>
  )

  const canonicalPath = `/portofolio/${p.slug}`
  const url = `${SITE_URL}${withLocale(locale, canonicalPath)}`

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
        {hreflangTags}
      </Head>

      {/* Hero banner */}
      <section className="pd-hero" style={{ '--c': p.c, '--c2': p.c2 }}>
        <div className="pd-hero-bg" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('portfolio.breadcrumb'), to: '/portofolio' }, { label: p.title }]} />
            <span className="pd-cat-badge">{p.cat}</span>
            <h1 className="pd-title">{p.title}</h1>
            <p className="pd-tagline">{p.tagline}</p>
            <div className="pd-stats">
              <div className="pd-stat"><Icon icon="fa-solid fa-arrow-trend-up" /><span className="pd-stat-label">{t('portfolio.resultLabel')}</span><span className="pd-stat-val">{p.result}</span></div>
              <div className="pd-stat-div" />
              <div className="pd-stat"><Icon icon="fa-solid fa-chart-line" /><span className="pd-stat-label">{t('portfolio.detailLabel')}</span><span className="pd-stat-val">{p.result2}</span></div>
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
                <div className="pd-block-label"><Icon icon="fa-solid fa-circle-exclamation" /> {t('portfolio.problemLabel')}</div>
                <p>{p.problem}</p>
              </div>
              <div className="pd-block solution">
                <div className="pd-block-label"><Icon icon="fa-solid fa-circle-check" /> {t('portfolio.solutionLabel')}</div>
                <p>{p.solution}</p>
              </div>
            </div>
          </Reveal>

          {/* Benefit analysis (per feature) */}
          {p.benefits?.length > 0 && (
            <Reveal style={{ marginTop: 48 }}>
              <div className="eyebrow"><Icon icon="fa-solid fa-chart-line" /> {t('portfolio.benefitsEyebrow')}</div>
              <h2 className="sec-title" style={{ fontSize: '1.6rem' }}>{t('portfolio.benefitsTitlePre')}<span className="ital">{t('portfolio.benefitsTitleItal')}</span>{t('portfolio.benefitsTitlePost')}</h2>
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
            <div className="eyebrow"><Icon icon="fa-solid fa-list-check" /> {t('portfolio.featuresEyebrow')}</div>
            <h2 className="sec-title" style={{ fontSize: '1.6rem' }}>{t('portfolio.featuresTitlePre')}<span className="ital">{t('portfolio.featuresTitleItal')}</span>{t('portfolio.featuresTitlePost')}</h2>
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
              <span className="pd-tech-label"><Icon icon="fa-solid fa-microchip" /> {t('portfolio.techLabel')}</span>
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
                <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 12 }}><Icon icon="fa-solid fa-eye" /> {t('portfolio.liveDemoEyebrow')}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8, color: 'var(--ink)' }}>{t('portfolio.liveDemoTitle')}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '.95rem', marginBottom: 20 }}>{t('portfolio.liveDemoDesc')}</p>
                <a className="btn btn-pri btn-lg" href={p.visitUrl} target="_blank" rel="noreferrer">
                  <Icon icon="fa-solid fa-arrow-up-right-from-square" /> {t('portfolio.liveDemoCta')}
                </a>
              </div>
            </Reveal>
          )}

          {/* CTA */}
          <Reveal style={{ marginTop: 56, textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 12, color: 'var(--ink)', letterSpacing: '-.03em' }}>{t('portfolio.finalCtaTitle')}</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 28 }}>{t('portfolio.finalCtaDesc')}</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a className="btn btn-wa btn-lg" href={waLink(t('portfolio.waSimilar', { brand: BRAND.short, title: p.title }))} target="_blank" rel="noreferrer">
                <Icon icon="fa-brands fa-whatsapp" /> {t('portfolio.finalCtaDiscuss')}
              </a>
              <Link className="btn btn-ghost btn-lg" to="/portofolio">
                <Icon icon="fa-solid fa-arrow-left" /> {t('portfolio.finalCtaBack')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ ESTIMASI (/estimasi) */
// Mirrors App.jsx's Estimator component exactly (same products/addons) — structural
// data only, labels are locale-keyed via t('estimator.*') (see src/i18n/strings.js).
const EST_PRODUCT_IDS = ['landing', 'profile', 'software', 'erp', 'ecommerce', 'marketplace']
const EST_PRODUCT_META = {
  landing:     { base: [1.5, 5],   perUnit: 0.4, unitKey: 'halaman', icon: 'fa-solid fa-rectangle-ad' },
  profile:     { base: [4.5, 12],  perUnit: 0.6, unitKey: 'halaman', icon: 'fa-solid fa-briefcase' },
  software:    { base: [8, 30],    perUnit: 2,   unitKey: 'modul',   icon: 'fa-solid fa-code' },
  erp:         { base: [28, 100],  perUnit: 5,   unitKey: 'modul',   icon: 'fa-solid fa-circle-nodes' },
  ecommerce:   { base: [18, 50],   perUnit: 2.5, unitKey: 'modul',   icon: 'fa-solid fa-cart-shopping' },
  marketplace: { base: [65, 150],  perUnit: 8,   unitKey: 'modul',   icon: 'fa-solid fa-store' },
}
const EST_ADDON_IDS = ['seo', 'hosting', 'payment', 'wa', 'maint', 'uiux']
const EST_ADDON_PRICE = { seo: 1.5, hosting: 0.8, payment: 2, wa: 1.5, maint: 2.4, uiux: 3 }

function fmtPriceEst(val, unitSmall, unitBig) {
  if (val >= 1000) return `Rp ${(val / 1000).toFixed(0)} ${unitBig}`
  return `Rp ${val % 1 === 0 ? val : val.toFixed(1)} ${unitSmall}`
}

export function Estimasi() {
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/estimasi')}`
  const title = t('estimasi.seoTitle')
  const desc = t('estimasi.seoDesc')

  const [prodId, setProdId] = useState('profile')
  const [units, setUnits] = useState(5)
  const [addons, setAddons] = useState({})

  const prodLabels = t('estimator.products')
  const unitLabels = t('estimator.units')
  const addonLabels = t('estimator.addonLabels')
  const unitSmall = t('estimator.priceUnitSmall')
  const unitBig = t('estimator.priceUnitBig')

  const meta = EST_PRODUCT_META[prodId]
  const unit = unitLabels[meta.unitKey]
  const label = prodLabels[prodId]
  const addonTotal = EST_ADDON_IDS.filter((id) => addons[id]).reduce((s, id) => s + EST_ADDON_PRICE[id], 0)
  const low  = meta.base[0] + (units - 1) * meta.perUnit + addonTotal
  const high = meta.base[1] + (units - 1) * meta.perUnit * 1.6 + addonTotal
  const toggle = (id) => setAddons((a) => ({ ...a, [id]: !a[id] }))

  const waMsg = encodeURIComponent(
    t('estimator.waIntro', {
      brand: BRAND.short, jenis: label, units, unit,
      estLow: fmtPriceEst(low, unitSmall, unitBig), estHigh: fmtPriceEst(high, unitSmall, unitBig),
    })
  )

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('estimasi.breadcrumb') }]} />
            <div className="eyebrow"><Icon icon="fa-solid fa-calculator" /> {t('estimasi.eyebrow')}</div>
            <h1 className="page-title">{t('estimasi.titlePre')}<span className="ital">{t('estimasi.titleItal')}</span>{t('estimasi.titlePost')}</h1>
            <p className="page-sub">{t('estimasi.sub')}</p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 20, paddingBottom: 80, background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 900px 500px at 50% -10%, rgba(169,113,31,.22), transparent 60%), radial-gradient(circle 400px at 90% 100%, rgba(16,199,178,.16), transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="est-wrap">
            <div className="est-left">
              <div className="est-step">
                <div className="est-step-label"><span>1</span> {t('estimator.step1')}</div>
                <div className="est-prod-grid">
                  {EST_PRODUCT_IDS.map((id) => (
                    <button key={id} className={`est-prod-btn${prodId===id?' active':''}`} onClick={() => { setProdId(id); setUnits(5) }}>
                      <Icon icon={EST_PRODUCT_META[id].icon} /><span>{prodLabels[id]}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="est-step">
                <div className="est-step-label"><span>2</span> {t('estimator.step2Label', { unit, units })}</div>
                <input type="range" min="1" max="15" value={units} onChange={e => setUnits(+e.target.value)} className="est-slider" />
                <div className="est-slider-marks"><span>1</span><span>5</span><span>10</span><span>15</span></div>
              </div>
              <div className="est-step">
                <div className="est-step-label"><span>3</span> {t('estimator.step3')}</div>
                <div className="est-addons">
                  {EST_ADDON_IDS.map((id) => (
                    <button key={id} className={`est-addon-btn${addons[id]?' active':''}`} onClick={() => toggle(id)}>
                      <span className={`est-addon-check${addons[id]?' on':''}`}><Icon icon="fa-solid fa-check" /></span>
                      <span className="est-addon-label">{addonLabels[id]}</span>
                      <span className="est-addon-price">+ {fmtPriceEst(EST_ADDON_PRICE[id], unitSmall, unitBig)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="est-result">
              <div className="est-result-inner">
                <div className="est-result-label">{t('estimator.resultLabel')}</div>
                <motion.div className="est-result-low" key={`${prodId}-${units}-${JSON.stringify(addons)}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  {fmtPriceEst(low, unitSmall, unitBig)}
                </motion.div>
                <div className="est-result-range">{t('estimator.upTo')} <strong>{fmtPriceEst(high, unitSmall, unitBig)}</strong></div>
                <div className="est-divider" />
                <div className="est-breakdown">
                  <div className="est-brow"><span>{t('estimator.baseLabel', { label })}</span><span>{fmtPriceEst(meta.base[0], unitSmall, unitBig)} – {fmtPriceEst(meta.base[1], unitSmall, unitBig)}</span></div>
                  <div className="est-brow"><span>{units} {unit} × {fmtPriceEst(meta.perUnit, unitSmall, unitBig)}</span><span>+{fmtPriceEst((units-1)*meta.perUnit, unitSmall, unitBig)}</span></div>
                  {addonTotal > 0 && <div className="est-brow accent"><span>{t('estimator.addonSelected')}</span><span>+{fmtPriceEst(addonTotal, unitSmall, unitBig)}</span></div>}
                </div>
                <div className="est-divider" />
                <p className="est-note">{t('estimator.note')}</p>
                <a href={`https://wa.me/628139694307?text=${waMsg}`} target="_blank" rel="noreferrer" className="btn btn-wa" style={{ width:'100%', justifyContent:'center', marginTop: 8 }}>
                  <Icon icon="fa-brands fa-whatsapp" /> {t('estimator.ctaConsult')}
                </a>
                <Link to="/ajukan-proyek" className="btn btn-ghost" style={{ width:'100%', justifyContent:'center', marginTop: 10 }}>
                  <Icon icon="fa-solid fa-file-pen" /> {t('estimator.ctaBrief')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <Reveal className="cta-card">
          <h2>{t('estimasi.ctaTitlePre')}<span className="ital">{t('estimasi.ctaTitleItal')}</span>{t('estimasi.ctaTitlePost')}</h2>
          <p>{t('estimasi.ctaDesc')}</p>
          <div className="btns">
            <a className="btn btn-wa btn-lg" href={waLink(t('estimasi.waConsult', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('estimasi.ctaConsult')}</a>
            <Link className="btn btn-ghost btn-lg" to="/portofolio"><Icon icon="fa-solid fa-images" /> {t('estimasi.ctaPortfolio')}</Link>
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
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/keunggulan')}`
  const title = t('keunggulan.seoTitle')
  const desc = t('keunggulan.seoDesc')
  const guarantees = t('keunggulan.guarantees')
  const whyItems = why.map((w) => pick(w, locale))
  const statsItems = stats.map((s) => pick(s, locale))
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('keunggulan.breadcrumb') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-award" /> {t('keunggulan.eyebrow')}</div>
              <h1 className="page-title">{t('keunggulan.titlePre')}<span className="ital">{t('keunggulan.titleItal')}</span>{t('keunggulan.titlePost')}</h1>
              <p className="page-sub">{t('keunggulan.sub')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={waLink(t('keunggulan.waConsult', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('keunggulan.ctaConsult')}</a>
                <Link className="btn btn-ghost btn-lg" to="/layanan">{t('keunggulan.ctaServices')}</Link>
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
            {whyItems.map((w, i) => (
              <motion.div key={i} className="why-card spot" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} onMouseMove={onSpot}>
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
            <div className="eyebrow"><Icon icon="fa-solid fa-shield-halved" /> {t('keunggulan.guaranteesEyebrow')}</div>
            <h2 className="sec-title">{t('keunggulan.guaranteesTitlePre')}<span className="ital">{t('keunggulan.guaranteesTitleItal')}</span>{t('keunggulan.guaranteesTitlePost')}</h2>
          </Reveal>
          <motion.div className="tech-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {guarantees.map((g, i) => (
              <motion.div key={i} className="tech-chip" variants={fadeUp} whileHover={{ y: -4 }}>
                <Icon icon={g.icon} /> <span>{g.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="stats-band">
        <motion.div className="stats-card" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {statsItems.map((s, i) => (
            <motion.div key={s.id || i} className="stat-item" variants={fadeUp}>
              <div className="stat-num">{s.prefix || ''}{s.n}{s.suffix}</div>
              <div className="stat-lbl">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <section className="cta-band" style={{ paddingTop: 80 }}>
        <Reveal className="cta-card">
          <h2>{t('keunggulan.ctaTitlePre')}<span className="ital">{t('keunggulan.ctaTitleItal')}</span>{t('keunggulan.ctaTitlePost')}</h2>
          <p>{t('keunggulan.ctaDesc')}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={waLink(t('keunggulan.waConsult2', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('keunggulan.ctaConsult')}</a>
            <Link className="btn btn-ghost btn-lg" to="/layanan">{t('keunggulan.ctaServices2')}</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ HARGA (/harga) */
// Colors keyed by the product's stable (locale-independent) slug — not by the
// translated `category` label, which differs per locale (Website/Software/E-Commerce -> 网站/软件/电商).
const PRICE_SLUG_COLOR = {
  'landing-page': 'var(--accent)', 'company-profile': 'var(--accent)',
  'software-custom': '#1E88A8', erp: '#1E88A8',
  ecommerce: '#D97706', marketplace: '#D97706',
}

export function Harga() {
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/harga')}`
  const title = t('harga.seoTitle')
  const desc = t('harga.seoDesc')
  const pricingItems = pricing.map((p) => pick(p, locale))
  const bundleItems = pricingBundles.map((b) => pick(b, locale))

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      {/* Hero */}
      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('harga.breadcrumb') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-tags" /> {t('harga.eyebrow')}</div>
              <h1 className="page-title">{t('harga.titlePre')}<span className="ital">{t('harga.titleItal')}</span>{t('harga.titlePost')}</h1>
              <p className="page-sub">{t('harga.sub')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={waLink(t('harga.waAskPrice', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('harga.ctaAskPrice')}</a>
                <Link className="btn btn-ghost btn-lg" to="/ajukan-proyek"><Icon icon="fa-solid fa-rocket" /> {t('harga.ctaAjukan')}</Link>
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
            <div className="eyebrow"><Icon icon="fa-solid fa-box-open" /> {t('harga.prodEyebrow')}</div>
            <h2 className="sec-title">{t('harga.prodTitlePre')}<span className="ital">{t('harga.prodTitleItal')}</span>{t('harga.prodTitlePost')}</h2>
            <p className="sec-sub">{t('harga.prodSub')}</p>
          </Reveal>
          <motion.div className="price-prod-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {pricingItems.map((p) => (
              <motion.div key={p.slug} className={`price-prod-card${p.hot ? ' hot' : ''}`} variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                {p.hot && <span className="hot-tag">{t('harga.hotTag')}</span>}
                <div className="price-prod-top">
                  <div className="price-prod-ico" style={{ color: PRICE_SLUG_COLOR[p.slug], background: `color-mix(in srgb, ${PRICE_SLUG_COLOR[p.slug]} 12%, transparent)` }}>
                    <Icon icon={p.icon} />
                  </div>
                  <span className="price-prod-cat" style={{ color: PRICE_SLUG_COLOR[p.slug], background: `color-mix(in srgb, ${PRICE_SLUG_COLOR[p.slug]} 10%, transparent)`, borderColor: `color-mix(in srgb, ${PRICE_SLUG_COLOR[p.slug]} 25%, transparent)` }}>
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
                <a className="btn btn-pri" href={waLink(t('harga.waProdInterest', { brand: BRAND.short, name: p.name, price: p.price }))} target="_blank" rel="noreferrer">
                  {t('harga.ctaConsult')} <Icon icon="fa-solid fa-arrow-right" />
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
            <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> {t('harga.bundleEyebrow')}</div>
            <h2 className="sec-title">{t('harga.bundleTitlePre')}<span className="ital">{t('harga.bundleTitleItal')}</span>{t('harga.bundleTitlePost')}</h2>
            <p className="sec-sub">{t('harga.bundleSub')}</p>
          </Reveal>
          <motion.div className="price-bundle-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {bundleItems.map((b, i) => (
              <motion.div key={i} className={`price-bundle-card${b.hot ? ' hot' : ''}`} variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
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
                <a className="btn" href={waLink(t('harga.waBundleInterest', { brand: BRAND.short, name: b.name, price: b.price }))} target="_blank" rel="noreferrer">
                  {t('harga.ctaStartConsult')} <Icon icon="fa-solid fa-arrow-right" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>{t('harga.ctaTitlePre')}<span className="ital">{t('harga.ctaTitleItal')}</span>{t('harga.ctaTitlePost')}</h2>
          <p>{t('harga.ctaDesc')}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={waLink(t('harga.waConsultChoice', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('harga.ctaAskPrice')}</a>
            <Link className="btn btn-ghost btn-lg" to="/ajukan-proyek"><Icon icon="fa-solid fa-rocket" /> {t('harga.ctaAjukan')}</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ FAQ PAGE (/faq) */
export function Faq() {
  const [open, setOpen] = useState(-1)
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/faq')}`
  const title = t('faqPage.seoTitle')
  const desc = t('faqPage.seoDesc')
  const faqItems = faqs.map((f) => pick(f, locale))
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('faqPage.breadcrumb') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-circle-question" /> {t('faqPage.eyebrow')}</div>
              <h1 className="page-title">{t('faqPage.titlePre')}<span className="ital">{t('faqPage.titleItal')}</span>{t('faqPage.titlePost')}</h1>
              <p className="page-sub">{t('faqPage.sub')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href={waLink(t('faqPage.waAsk', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('faqPage.ctaAsk')}</a>
                <Link className="btn btn-ghost btn-lg" to="/kontak">{t('faqPage.ctaContact')}</Link>
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
            {faqItems.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.id || i} className={`faq-item ${isOpen ? 'open' : ''}`}>
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
          <h2>{t('faqPage.ctaTitlePre')}<span className="ital">{t('faqPage.ctaTitleItal')}</span>{t('faqPage.ctaTitlePost')}</h2>
          <p>{t('faqPage.ctaDesc')}</p>
          <a className="btn btn-pri btn-lg" href={waLink(t('faqPage.waAsk', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('faqPage.ctaAsk')}</a>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ KARIR (/karir) */
// Structural fields (id, badgeColor) stay top-level; all prose is in i18n: {id,en,zh}.
const JOBS = [
  {
    id: 'fullstack',
    badgeColor: 'var(--blue)',
    i18n: {
      id: {
        pos: 'Full-Stack Web Developer', type: 'Full-time · Remote/Hybrid', badge: 'Prioritas',
        desc: 'Membangun website, web app, dan API untuk klien dari berbagai industri. Bertanggung jawab dari desain database sampai deployment.',
        skills: ['Next.js / React', 'Node.js + PostgreSQL', 'REST API & integrasi third-party', 'Pengalaman min. 1 tahun'],
        salary: 'Negosiasi + project bonus',
      },
      en: {
        pos: 'Full-Stack Web Developer', type: 'Full-time · Remote/Hybrid', badge: 'Priority',
        desc: 'Build websites, web apps, and APIs for clients across various industries. Responsible from database design through deployment.',
        skills: ['Next.js / React', 'Node.js + PostgreSQL', 'REST API & third-party integrations', 'Minimum 1 year of experience'],
        salary: 'Negotiable + project bonus',
      },
      zh: {
        pos: '全栈网站开发工程师', type: '全职 · 远程/混合办公', badge: '优先招募',
        desc: '为不同行业的客户构建网站、Web应用与API，负责从数据库设计到部署的全流程工作。',
        skills: ['Next.js / React', 'Node.js + PostgreSQL', 'REST API与第三方集成', '至少1年相关经验'],
        salary: '面议 + 项目奖金',
      },
    },
  },
  {
    id: 'flutter',
    badgeColor: '#10C7B2',
    i18n: {
      id: {
        pos: 'Flutter Mobile Developer', type: 'Full-time · Remote', badge: 'Buka',
        desc: 'Membangun aplikasi Android & iOS dengan Flutter. Berkolaborasi dengan backend developer dan desainer untuk deliver aplikasi yang siap publish ke store.',
        skills: ['Flutter & Dart', 'State management (Riverpod/BLoC)', 'Integrasi REST API & Firebase', 'Pengalaman min. 1 tahun'],
        salary: 'Negosiasi + project bonus',
      },
      en: {
        pos: 'Flutter Mobile Developer', type: 'Full-time · Remote', badge: 'Open',
        desc: 'Build Android & iOS apps with Flutter. Collaborate with backend developers and designers to deliver apps ready to publish to the app stores.',
        skills: ['Flutter & Dart', 'State management (Riverpod/BLoC)', 'REST API & Firebase integration', 'Minimum 1 year of experience'],
        salary: 'Negotiable + project bonus',
      },
      zh: {
        pos: 'Flutter移动应用开发工程师', type: '全职 · 远程办公', badge: '招募中',
        desc: '使用Flutter开发Android与iOS应用，与后端开发人员及设计师协作，交付可发布至应用商店的应用。',
        skills: ['Flutter与Dart', '状态管理（Riverpod/BLoC）', 'REST API与Firebase集成', '至少1年相关经验'],
        salary: '面议 + 项目奖金',
      },
    },
  },
  {
    id: 'designer',
    badgeColor: '#10C7B2',
    i18n: {
      id: {
        pos: 'UI/UX Designer', type: 'Full-time · Remote/Freelance', badge: 'Buka',
        desc: 'Merancang pengalaman pengguna yang intuitif dan antarmuka yang bersih untuk produk klien AFSS — website, dashboard, hingga aplikasi mobile.',
        skills: ['Figma (wajib)', 'User research & wireframing', 'Design system & component library', 'Memahami dasar frontend adalah nilai plus'],
        salary: 'Per proyek / retainer',
      },
      en: {
        pos: 'UI/UX Designer', type: 'Full-time · Remote/Freelance', badge: 'Open',
        desc: "Design intuitive user experiences and clean interfaces for AFSS's client products — websites, dashboards, and mobile apps.",
        skills: ['Figma (required)', 'User research & wireframing', 'Design systems & component libraries', 'Basic frontend knowledge is a plus'],
        salary: 'Per project / retainer',
      },
      zh: {
        pos: 'UI/UX设计师', type: '全职 · 远程/自由职业', badge: '招募中',
        desc: '为AFSS客户的产品——网站、仪表盘乃至移动应用——设计直观的用户体验与简洁的界面。',
        skills: ['Figma（必备）', '用户研究与线框图设计', '设计系统与组件库', '具备基础前端知识者优先'],
        salary: '按项目计费 / 长期合作',
      },
    },
  },
  {
    id: 'marketing',
    badgeColor: '#10C7B2',
    i18n: {
      id: {
        pos: 'Digital Marketing & Sales', type: 'Full-time · Remote', badge: 'Buka',
        desc: 'Memperkenalkan layanan AFSS ke bisnis di seluruh Indonesia melalui media sosial, jaringan bisnis, dan strategi konten. Target-driven dengan komisi menarik.',
        skills: ['Kemampuan komunikasi & presentasi', 'Pengalaman sales B2B / digital agency', 'Memahami LinkedIn, Instagram, dan cold outreach', 'Memiliki jaringan pengusaha adalah nilai plus'],
        salary: 'Gaji pokok + komisi closing',
      },
      en: {
        pos: 'Digital Marketing & Sales', type: 'Full-time · Remote', badge: 'Open',
        desc: "Introduce AFSS's services to businesses through social media, business networks, and content strategy. Target-driven with attractive commissions.",
        skills: ['Communication & presentation skills', 'B2B sales / digital agency experience', 'Familiarity with LinkedIn, Instagram, and cold outreach', 'A network of business owners is a plus'],
        salary: 'Base salary + closing commission',
      },
      zh: {
        pos: '数字营销与销售', type: '全职 · 远程办公', badge: '招募中',
        desc: '通过社交媒体、商业人脉与内容策略，向各地企业推广AFSS的服务。目标导向，提供丰厚佣金。',
        skills: ['沟通与演讲能力', 'B2B销售/数字营销代理经验', '熟悉LinkedIn、Instagram与陌生开发', '拥有企业主人脉者优先'],
        salary: '基本工资 + 成交佣金',
      },
    },
  },
  {
    id: 'pm',
    badgeColor: '#10C7B2',
    i18n: {
      id: {
        pos: 'Project Manager', type: 'Part-time / Freelance', badge: 'Buka',
        desc: 'Memastikan proyek klien berjalan on-track, on-budget, dan on-scope. Menjadi jembatan antara tim developer dan klien agar komunikasi selalu lancar.',
        skills: ['Pengalaman PM di software house / startup', 'Mahir menggunakan tools PM (Notion, Linear, Jira)', 'Kemampuan komunikasi klien yang baik', 'Memahami siklus development (discovery → launch)'],
        salary: 'Per proyek / retainer',
      },
      en: {
        pos: 'Project Manager', type: 'Part-time / Freelance', badge: 'Open',
        desc: 'Keep client projects on track, on budget, and on scope. Act as the bridge between the developer team and clients for smooth communication.',
        skills: ['PM experience at a software house / startup', 'Proficient with PM tools (Notion, Linear, Jira)', 'Strong client communication skills', 'Understanding of the development cycle (discovery → launch)'],
        salary: 'Per project / retainer',
      },
      zh: {
        pos: '项目经理', type: '兼职 / 自由职业', badge: '招募中',
        desc: '确保客户项目按进度、按预算、按范围顺利推进，作为开发团队与客户之间的桥梁，保持沟通顺畅。',
        skills: ['在软件公司/初创企业担任过项目经理', '熟练使用项目管理工具（Notion、Linear、Jira）', '出色的客户沟通能力', '了解开发周期（需求发现 → 上线）'],
        salary: '按项目计费 / 长期合作',
      },
    },
  },
  {
    id: 'writer',
    badgeColor: '#10C7B2',
    i18n: {
      id: {
        pos: 'Content Writer (Tech)', type: 'Freelance · Remote', badge: 'Buka',
        desc: 'Menulis artikel blog SEO tentang teknologi, software bisnis, dan transformasi digital untuk audiens pelaku usaha Indonesia.',
        skills: ['Kemampuan menulis konten SEO', 'Memahami topik teknologi & bisnis digital', 'Riset keyword dasar', 'Konsisten dan tepat deadline'],
        salary: 'Per artikel (negosiasi)',
      },
      en: {
        pos: 'Content Writer (Tech)', type: 'Freelance · Remote', badge: 'Open',
        desc: 'Write SEO blog articles about technology, business software, and digital transformation for a business-owner audience.',
        skills: ['SEO content writing skills', 'Understanding of tech & digital business topics', 'Basic keyword research', 'Consistent and meets deadlines'],
        salary: 'Per article (negotiable)',
      },
      zh: {
        pos: '内容撰稿人（科技类）', type: '自由职业 · 远程办公', badge: '招募中',
        desc: '为企业主受众撰写关于科技、商业软件与数字化转型的SEO博客文章。',
        skills: ['SEO内容写作能力', '了解科技与数字商业相关话题', '具备基础关键词调研能力', '按时交稿，工作稳定可靠'],
        salary: '按文章计费（可议价）',
      },
    },
  },
]

export function Karir() {
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/karir')}`
  const title = t('karir.seoTitle')
  const desc = t('karir.seoDesc')
  const [selectedJob, setSelectedJob] = useState(null)

  const benefits = t('karir.benefits')
  const jobs = JOBS.map((j) => pick(j, locale))

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('karir.breadcrumb') }]} />
              <div className="eyebrow green"><Icon icon="fa-solid fa-briefcase" /> {t('karir.eyebrow')}</div>
              <h1 className="page-title">{t('karir.titlePre')}<span className="ital">{t('karir.titleItal')}</span>{t('karir.titlePost')}</h1>
              <p className="page-sub">{t('karir.sub')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
                <a className="btn btn-pri btn-lg" href="#lowongan">{t('karir.ctaViewJobs')} <Icon icon="fa-solid fa-arrow-down" /></a>
                <a className="btn btn-ghost btn-lg" href={`mailto:${BRAND.email}`}><Icon icon="fa-solid fa-envelope" /> {t('karir.ctaSendCv')}</a>
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
            <div className="eyebrow green"><Icon icon="fa-solid fa-star" /> {t('karir.benefitsEyebrow')}</div>
            <h2 className="sec-title">{t('karir.benefitsTitlePre')}<span className="ital">{t('karir.benefitsTitleItal')}</span>{t('karir.benefitsTitlePost')}</h2>
          </Reveal>
          <motion.div className="why-home-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {benefits.map((b, i) => (
              <motion.div key={i} className="why-home-card spot" variants={fadeUp} whileHover={{ y: -5 }} onMouseMove={onSpot}>
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
            <div className="eyebrow"><Icon icon="fa-solid fa-rectangle-list" /> {t('karir.jobsEyebrow')}</div>
            <h2 className="sec-title">{t('karir.jobsTitle', { count: JOBS.length })}<span className="ital">{t('karir.jobsTitleItal')}</span></h2>
            <p className="sec-sub">{t('karir.jobsSub')}</p>
          </Reveal>
          <motion.div className="jobs-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {jobs.map((j) => (
              <motion.div key={j.id} className="job-card spot" variants={fadeUp} whileHover={{ y: -4 }} onMouseMove={onSpot}>
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
                <a className="btn btn-pri" href={waLink(t('karir.waApply', { brand: BRAND.short, pos: j.pos }))} target="_blank" rel="noreferrer">
                  <Icon icon="fa-brands fa-whatsapp" /> {t('karir.applyBtn')}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" style={{ paddingTop: 0 }}>
        <Reveal className="cta-card">
          <h2>{t('karir.ctaTitlePre')}<span className="ital">{t('karir.ctaTitleItal')}</span>{t('karir.ctaTitlePost')}</h2>
          <p>{t('karir.ctaDesc')}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-pri btn-lg" href={`mailto:${BRAND.email}?subject=${t('karir.cvSubjectMailto')}`}><Icon icon="fa-solid fa-envelope" /> {t('karir.ctaSendCvEmail')}</a>
            <a className="btn btn-ghost btn-lg" href={waLink(t('karir.waSpontaneous', { brand: BRAND.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('karir.ctaChatFirst')}</a>
          </div>
        </Reveal>
      </section>
    </>
  )
}

/* ══════════════════════════════════════════════════ AJUKAN PROYEK (/ajukan-proyek) */
export function AjukanProyek() {
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/ajukan-proyek')}`
  const jenisOpts = t('forms.ajukanProyek.jenisOpts2')
  const anggaranOpts = t('forms.ajukanProyek.anggaranOpts')
  const timelineOpts = t('forms.ajukanProyek.timelineOpts')

  const [form, setForm] = useState({ nama: '', kontak: '', perusahaan: '', jenis: '', anggaran: '', timeline: '', deskripsi: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.nama.trim()) e.nama = t('forms.ajukanProyek.errNama')
    if (!form.kontak.trim()) e.kontak = t('forms.ajukanProyek.errKontak')
    if (!form.jenis) e.jenis = t('forms.ajukanProyek.errJenis')
    if (!form.deskripsi.trim()) e.deskripsi = t('forms.ajukanProyek.errDeskripsi')
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

  const title = t('forms.ajukanProyek.seoTitle')
  const desc = t('forms.ajukanProyek.seoDesc')

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
                <h1 className="page-title">{t('forms.ajukanProyek.successTitlePre')}<span className="ital">{t('forms.ajukanProyek.successTitleItal')}</span></h1>
                <p className="page-sub">{t('forms.ajukanProyek.successPre')}<strong>{form.nama}</strong>{t('forms.ajukanProyek.successMid')}<strong>{form.kontak}</strong>{t('forms.ajukanProyek.successPost')}</p>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginTop: 32 }}>
                  <a className="btn btn-pri btn-lg" href={waLink(t('forms.ajukanProyek.waSubmitted', { brand: BRAND.short, jenis: form.jenis, nama: form.nama }))} target="_blank" rel="noreferrer">
                    <Icon icon="fa-brands fa-whatsapp" /> {t('forms.ajukanProyek.successChat')}
                  </a>
                  <Link className="btn btn-ghost btn-lg" to="/">{t('forms.ajukanProyek.successHome')}</Link>
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
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="page-hero-grid">
            <Reveal>
              <Breadcrumb items={[{ label: t('nav.beranda'), to: '/' }, { label: t('forms.ajukanProyek.breadcrumb') }]} />
              <div className="eyebrow"><Icon icon="fa-solid fa-rocket" /> {t('forms.ajukanProyek.eyebrow')}</div>
              <h1 className="page-title">{t('forms.ajukanProyek.titlePre')}<span className="ital">{t('forms.ajukanProyek.titleItal')}</span>{t('forms.ajukanProyek.titlePost')}</h1>
              <p className="page-sub">{t('forms.ajukanProyek.sub')}</p>
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
                <label className="form-label">{t('forms.ajukanProyek.labelNama')} <span className="form-req">*</span></label>
                <input className={`form-ctrl${errors.nama ? ' err' : ''}`} type="text" placeholder={t('forms.ajukanProyek.placeholderNama')} value={form.nama} onChange={set('nama')} />
                {errors.nama && <span className="form-err-msg">{errors.nama}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">{t('forms.ajukanProyek.labelKontak')} <span className="form-req">*</span></label>
                <input className={`form-ctrl${errors.kontak ? ' err' : ''}`} type="text" placeholder={t('forms.ajukanProyek.placeholderKontak')} value={form.kontak} onChange={set('kontak')} />
                {errors.kontak && <span className="form-err-msg">{errors.kontak}</span>}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">{t('forms.ajukanProyek.labelPerusahaan')}</label>
                <input className="form-ctrl" type="text" placeholder={t('forms.ajukanProyek.placeholderPerusahaan')} value={form.perusahaan} onChange={set('perusahaan')} />
              </div>
              <div className="form-group">
                <label className="form-label">{t('forms.ajukanProyek.labelJenis')} <span className="form-req">*</span></label>
                <select className={`form-ctrl${errors.jenis ? ' err' : ''}`} value={form.jenis} onChange={set('jenis')}>
                  <option value="">{t('forms.ajukanProyek.placeholderJenis')}</option>
                  {jenisOpts.map((o) => <option key={o}>{o}</option>)}
                </select>
                {errors.jenis && <span className="form-err-msg">{errors.jenis}</span>}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">{t('forms.ajukanProyek.labelAnggaran')}</label>
                <select className="form-ctrl" value={form.anggaran} onChange={set('anggaran')}>
                  <option value="">{t('forms.ajukanProyek.placeholderAnggaran')}</option>
                  {anggaranOpts.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{t('forms.ajukanProyek.labelTimeline')}</label>
                <select className="form-ctrl" value={form.timeline} onChange={set('timeline')}>
                  <option value="">{t('forms.ajukanProyek.placeholderTimeline')}</option>
                  {timelineOpts.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t('forms.ajukanProyek.labelDeskripsi')} <span className="form-req">*</span></label>
              <textarea
                className={`form-ctrl form-ta${errors.deskripsi ? ' err' : ''}`}
                placeholder={t('forms.ajukanProyek.placeholderDeskripsi')}
                rows={6}
                value={form.deskripsi}
                onChange={set('deskripsi')}
              />
              {errors.deskripsi && <span className="form-err-msg">{errors.deskripsi}</span>}
            </div>

            <div className="form-submit-row">
              <button className="btn btn-pri btn-lg" type="submit" disabled={sending}>
                {sending ? <><Icon icon="fa-solid fa-spinner fa-spin" /> {t('forms.ajukanProyek.submitting')}</> : <><Icon icon="fa-solid fa-paper-plane" /> {t('forms.ajukanProyek.submit')}</>}
              </button>
              <p className="form-note">
                {t('forms.ajukanProyek.noForm')}
                <a href={waLink(t('forms.ajukanProyek.waDirect', { brand: BRAND.short }))} target="_blank" rel="noreferrer">
                  <Icon icon="fa-brands fa-whatsapp" /> {t('forms.ajukanProyek.noFormLink')}
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
                    {s.timeline && <div className="sub-row"><Icon icon="fa-solid fa-calendar" /> {s.timeline}</div>}
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
