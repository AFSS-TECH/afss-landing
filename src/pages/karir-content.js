/* ══════════════════════════════════════════════════ KARIR (/karir) */
// Structural fields (id, badgeColor) stay top-level; all prose is in i18n: {id,en,zh}.
export const JOBS = [
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

