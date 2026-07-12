import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { SECTIONS } from '../config/sections.js'
import { supabase } from '../lib/supabase.js'

export function Sidebar() {
  const [settingsOpen, setSettingsOpen] = useState(true)

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">AFSS Dashboard</div>
      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Ringkasan</NavLink>
        <NavLink to="/pengajuan" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Pengajuan Proyek</NavLink>

        <button type="button" className="nav-group-toggle" onClick={() => setSettingsOpen((o) => !o)}>
          Setting Landing Page
          <span className={`chevron${settingsOpen ? ' open' : ''}`}>▾</span>
        </button>
        {settingsOpen && (
          <div className="nav-submenu">
            <NavLink to="/settings/brand" className={({ isActive }) => `nav-link sub${isActive ? ' active' : ''}`}>Brand & Kontak</NavLink>
            {SECTIONS.map((s) => (
              <NavLink key={s.key} to={`/settings/${s.key}`} className={({ isActive }) => `nav-link sub${isActive ? ' active' : ''}`}>
                {s.label}
              </NavLink>
            ))}
          </div>
        )}

        <a className="nav-link" href="https://afss.tech" target="_blank" rel="noreferrer">Lihat Landing Page ↗</a>
      </nav>
      <button type="button" className="nav-logout" onClick={() => supabase.auth.signOut()}>Keluar</button>
    </aside>
  )
}
