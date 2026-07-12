import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const FIELDS = [
  { key: 'short', label: 'Nama Singkat (mis. AFSS)' },
  { key: 'legal', label: 'Nama Legal (PT ...)' },
  { key: 'name', label: 'Nama Lengkap' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Telepon (tampilan, mis. +62 813-...)' },
  { key: 'wa', label: 'Nomor WhatsApp untuk link (angka saja, mis. 628139694307)' },
  { key: 'address', label: 'Alamat' },
  { key: 'city', label: 'Kota' },
]

const SOCIAL_PLATFORMS = [
  { name: 'instagram', icon: 'fa-brands fa-instagram', label: 'Instagram URL' },
  { name: 'linkedin', icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn URL' },
  { name: 'tiktok', icon: 'fa-brands fa-tiktok', label: 'TikTok URL' },
  { name: 'youtube', icon: 'fa-brands fa-youtube', label: 'YouTube URL' },
]

export function BrandPage() {
  const [value, setValue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.from('content_sections').select('data').eq('id', 'brand').maybeSingle().then(({ data }) => {
      setValue(data?.data ?? { social: [] })
      setLoading(false)
    })
  }, [])

  const setField = (key, v) => setValue((val) => ({ ...val, [key]: v }))
  const setSocialUrl = (name, url) => setValue((val) => {
    const social = SOCIAL_PLATFORMS.map((p) => {
      const existing = (val.social || []).find((s) => s.name === p.name)
      return p.name === name ? { name: p.name, icon: p.icon, url } : (existing || { name: p.name, icon: p.icon, url: '' })
    })
    return { ...val, social }
  })
  const socialUrl = (name) => (value?.social || []).find((s) => s.name === name)?.url || ''

  const save = async () => {
    setSaving(true)
    setError('')
    const { error: err } = await supabase.from('content_sections').upsert({ id: 'brand', data: value }, { onConflict: 'id' })
    setSaving(false)
    if (err) setError(err.message)
    else setSavedAt(new Date())
  }

  if (loading || !value) return <p>Memuat...</p>

  return (
    <div className="page">
      <div className="page-head">
        <h1>Brand & Kontak</h1>
        <button className="btn-primary" onClick={save} disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</button>
      </div>
      {savedAt && <p className="save-ok">Tersimpan {savedAt.toLocaleTimeString('id-ID')} — dipakai di nav, footer, hero, dan semua tombol WhatsApp.</p>}
      {error && <p className="form-error">{error}</p>}

      <div className="section-card">
        <div className="field-grid">
          {FIELDS.map((f) => (
            <label className="field" key={f.key}>
              <span>{f.label}</span>
              <input type="text" value={value[f.key] ?? ''} onChange={(e) => setField(f.key, e.target.value)} />
            </label>
          ))}
        </div>
      </div>

      <h2 className="section-subhead">Media Sosial</h2>
      <div className="section-card">
        <div className="field-grid">
          {SOCIAL_PLATFORMS.map((p) => (
            <label className="field" key={p.name}>
              <span>{p.label}</span>
              <input type="text" placeholder="Kosongkan jika tidak ada" value={socialUrl(p.name)} onChange={(e) => setSocialUrl(p.name, e.target.value)} />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
