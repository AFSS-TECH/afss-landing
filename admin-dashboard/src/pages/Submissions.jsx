import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const STATUS_LIST = ['Baru', 'Dihubungi', 'Proses', 'Selesai', 'Ditolak']

export function Submissions() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Semua')

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('submissions').select('*').order('tanggal', { ascending: false })
    setSubmissions(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    setSubmissions((subs) => subs.map((s) => (s.id === id ? { ...s, status } : s)))
    await supabase.from('submissions').update({ status }).eq('id', id)
  }

  const del = async (id) => {
    if (!window.confirm('Hapus pengajuan ini?')) return
    setSubmissions((subs) => subs.filter((s) => s.id !== id))
    await supabase.from('submissions').delete().eq('id', id)
  }

  const tabs = ['Semua', ...STATUS_LIST]
  const filtered = filter === 'Semua' ? submissions : submissions.filter((s) => s.status === filter)
  const countOf = (st) => submissions.filter((s) => s.status === st).length

  return (
    <div className="page">
      <div className="page-head"><h1>Pengajuan Proyek</h1></div>

      <div className="stat-grid">
        <div className="stat-card"><div className="stat-n">{submissions.length}</div><div className="stat-l">Total</div></div>
        <div className="stat-card baru"><div className="stat-n">{countOf('Baru')}</div><div className="stat-l">Belum Ditangani</div></div>
        <div className="stat-card proses"><div className="stat-n">{countOf('Proses')}</div><div className="stat-l">Sedang Proses</div></div>
        <div className="stat-card selesai"><div className="stat-n">{countOf('Selesai')}</div><div className="stat-l">Selesai</div></div>
      </div>

      <div className="tab-bar">
        {tabs.map((t) => (
          <button key={t} className={`tab${filter === t ? ' active' : ''}`} onClick={() => setFilter(t)}>
            {t}{t !== 'Semua' && countOf(t) > 0 && <span className="tab-count">{countOf(t)}</span>}
          </button>
        ))}
      </div>

      {loading ? <p>Memuat...</p> : filtered.length === 0 ? (
        <p className="empty-state">Belum ada pengajuan{filter !== 'Semua' ? ` berstatus "${filter}"` : ''}.</p>
      ) : (
        <div className="submission-list">
          {filtered.map((s) => (
            <div key={s.id} className={`submission-card status-${s.status.toLowerCase()}`}>
              <div className="sub-head">
                <div>
                  <div className="sub-name">{s.nama}</div>
                  <div className="sub-date">{new Date(s.tanggal).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                </div>
                <span className={`status-badge status-${s.status.toLowerCase()}`}>{s.status}</span>
              </div>
              <div className="sub-body">
                {s.perusahaan && <div className="sub-row">🏢 {s.perusahaan}</div>}
                <div className="sub-row">📞 {s.kontak}</div>
                <div className="sub-row">📦 {s.jenis}</div>
                {s.anggaran && <div className="sub-row">💰 {s.anggaran}</div>}
                {s.timeline && <div className="sub-row">🗓️ {s.timeline}</div>}
              </div>
              {s.deskripsi && <div className="sub-desc">{s.deskripsi}</div>}
              <div className="sub-actions">
                <div className="status-btns">
                  {STATUS_LIST.map((st) => (
                    <button key={st} className={`status-btn${s.status === st ? ' active' : ''}`} onClick={() => updateStatus(s.id, st)}>{st}</button>
                  ))}
                </div>
                <div className="sub-act-right">
                  <a className="btn-ghost" href={`https://wa.me/${s.kontak.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">Hubungi</a>
                  <button className="btn-icon-del" onClick={() => del(s.id)}>Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
