import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SECTIONS } from '../config/sections.js'
import { supabase } from '../lib/supabase.js'

const Ic = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)

const ICONS = {
  dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  submission: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  database: 'M12 2c4.97 0 9 1.34 9 3v14c0 1.66-4.03 3-9 3S3 20.66 3 19V5c0-1.66 4.03-3 9-3zm9 3c0 1.66-4.03 3-9 3S3 6.66 3 5M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12',
  external: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  chevron: 'M6 9l6 6 6-6',
  brand: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  hero: 'M4 6h16M4 12h16M4 18h7',
  stats: 'M18 20V10M12 20V4M6 20v-6',
  why: 'M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z',
  workflow: 'M12 22V12M12 12L8 8M12 12l4-4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83',
  pricing: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  faq: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  addon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  tech: 'M10 20l4-16M4 9h16M4 15h16',
  clients: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
}

const SECTION_ICONS = {
  hero: ICONS.hero,
  stats: ICONS.stats,
  why: ICONS.why,
  why_us: ICONS.why,
  clients: ICONS.clients,
  workflow: ICONS.workflow,
  addons: ICONS.addon,
  tech_stack: ICONS.tech,
  pricing: ICONS.pricing,
  pricing_bundles: ICONS.pricing,
  faqs: ICONS.faq,
}

const MASTER_DATA_GROUPS = [
  {
    label: 'Identitas & Brand',
    items: [{ type: 'brand', to: '/settings/brand', label: 'Brand & Kontak', icon: ICONS.brand }],
  },
  {
    label: 'Konten Hero',
    items: ['hero', 'stats'],
  },
  {
    label: 'Profil & Keunggulan',
    items: ['why', 'why_us', 'clients', 'workflow'],
  },
  {
    label: 'Layanan & Harga',
    items: ['addons', 'tech_stack', 'pricing', 'pricing_bundles'],
  },
  {
    label: 'Support',
    items: ['faqs'],
  },
]

function SectionItem({ sectionKey }) {
  const sec = SECTIONS.find((s) => s.key === sectionKey)
  if (!sec) return null
  return (
    <NavLink to={`/settings/${sec.key}`} className={({ isActive }) => `nav-sub-item${isActive ? ' active' : ''}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={SECTION_ICONS[sec.key] || ICONS.dashboard} />
      </svg>
      <span>{sec.label}</span>
    </NavLink>
  )
}

export function Sidebar() {
  const [masterOpen, setMasterOpen] = useState(true)
  const location = useLocation()
  const isInMaster = location.pathname.startsWith('/settings')

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#10C7B2" fillOpacity=".15" />
            <path d="M8 24L16 8l8 16" stroke="#10C7B2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.5 19h11" stroke="#10C7B2" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="sidebar-brand-name">AFSS</div>
          <div className="sidebar-brand-sub">Command Center</div>
        </div>
      </div>

      <div className="sidebar-section-label">MENU UTAMA</div>
      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <Ic d={ICONS.dashboard} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/pengajuan" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <Ic d={ICONS.submission} />
          <span>Pengajuan Proyek</span>
        </NavLink>
      </nav>

      <div className="sidebar-section-label" style={{ marginTop: 16 }}>KONTEN</div>
      <nav className="sidebar-nav">
        <button
          type="button"
          className={`nav-item nav-group-btn${masterOpen || isInMaster ? ' open' : ''}`}
          onClick={() => setMasterOpen((o) => !o)}
        >
          <Ic d={ICONS.database} />
          <span>Master Data</span>
          <span className="nav-chevron">
            <Ic d={ICONS.chevron} size={13} />
          </span>
        </button>

        {(masterOpen || isInMaster) && (
          <div className="nav-submenu">
            {MASTER_DATA_GROUPS.map((group) => (
              <div key={group.label} className="nav-sub-group">
                <div className="nav-sub-group-label">{group.label}</div>
                {group.items.map((item) => {
                  if (typeof item === 'string') {
                    return <SectionItem key={item} sectionKey={item} />
                  }
                  return (
                    <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-sub-item${isActive ? ' active' : ''}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={item.icon} />
                      </svg>
                      <span>{item.label}</span>
                    </NavLink>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </nav>

      <div className="sidebar-spacer" />

      <div className="sidebar-footer">
        <a className="nav-item nav-external" href="https://afss.tech" target="_blank" rel="noreferrer">
          <Ic d={ICONS.external} />
          <span>Lihat Landing Page</span>
        </a>
        <button type="button" className="nav-item nav-logout" onClick={() => supabase.auth.signOut()}>
          <Ic d={ICONS.logout} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  )
}
