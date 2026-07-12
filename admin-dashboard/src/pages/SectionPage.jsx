import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSection } from '../config/sections.js'
import { SectionEditor } from '../components/SectionEditor.jsx'
import { supabase } from '../lib/supabase.js'

export function SectionPage() {
  const { sectionKey } = useParams()
  const config = getSection(sectionKey)
  const [value, setValue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setValue(null)
    setSavedAt(null)
    setError('')
    supabase.from('content_sections').select('data').eq('id', sectionKey).maybeSingle().then(({ data, error: err }) => {
      if (cancelled) return
      if (err) setError(err.message)
      setValue(data?.data ?? (config?.kind === 'object-i18n' ? {} : []))
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [sectionKey])

  const save = async () => {
    setSaving(true)
    setError('')
    const { error: err } = await supabase.from('content_sections').upsert({ id: sectionKey, data: value }, { onConflict: 'id' })
    setSaving(false)
    if (err) setError(err.message)
    else setSavedAt(new Date())
  }

  if (!config) return <p>Bagian tidak ditemukan.</p>

  return (
    <div className="page">
      <div className="page-head">
        <h1>{config.label}</h1>
        <button className="btn-primary" onClick={save} disabled={saving || loading}>
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
      {savedAt && <p className="save-ok">Tersimpan {savedAt.toLocaleTimeString('id-ID')} — perubahan langsung tampil di landing page.</p>}
      {error && <p className="form-error">{error}</p>}
      {loading ? <p>Memuat...</p> : <SectionEditor config={config} value={value} onChange={setValue} />}
    </div>
  )
}
