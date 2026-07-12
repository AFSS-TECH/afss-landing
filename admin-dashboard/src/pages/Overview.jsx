import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

export function Overview() {
  const [counts, setCounts] = useState(null)

  useEffect(() => {
    supabase.from('submissions').select('status').then(({ data }) => {
      if (!data) return
      const c = { total: data.length, Baru: 0, Proses: 0, Selesai: 0 }
      data.forEach((s) => { if (c[s.status] != null) c[s.status] += 1 })
      setCounts(c)
    })
  }, [])

  return (
    <div className="page">
      <div className="page-head"><h1>Ringkasan</h1></div>
      <p className="page-lead">Kelola seluruh konten landing page afss.tech dan pengajuan proyek dari sini.</p>

      <div className="stat-grid">
        <div className="stat-card"><div className="stat-n">{counts?.total ?? '—'}</div><div className="stat-l">Total Pengajuan</div></div>
        <div className="stat-card baru"><div className="stat-n">{counts?.Baru ?? '—'}</div><div className="stat-l">Belum Ditangani</div></div>
        <div className="stat-card proses"><div className="stat-n">{counts?.Proses ?? '—'}</div><div className="stat-l">Sedang Proses</div></div>
        <div className="stat-card selesai"><div className="stat-n">{counts?.Selesai ?? '—'}</div><div className="stat-l">Selesai</div></div>
      </div>

      <h2 className="section-subhead">Mulai dari sini</h2>
      <div className="quick-links">
        <Link to="/pengajuan" className="quick-link">📋 Kelola Pengajuan Proyek</Link>
        <Link to="/settings/hero" className="quick-link">🖋️ Ubah Teks Hero</Link>
        <Link to="/settings/brand" className="quick-link">📞 Ubah Kontak & WhatsApp</Link>
        <Link to="/settings/pricing" className="quick-link">💰 Ubah Harga Layanan</Link>
      </div>
    </div>
  )
}
