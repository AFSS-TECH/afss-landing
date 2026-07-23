import { useState } from 'react'
import { Icon } from '../Icon.jsx'
import { useLocale } from '../i18n/context.jsx'
import { useBrand, buildWaLink } from '../lib/brand.js'
import { supabase } from '../lib/supabase.js'
import { track } from '../lib/track.js'
import emailjs from '@emailjs/browser'

/* ════════════════════════════════════════════════ LEAD FORM — pesan cepat (3 kolom isian) */
export function LeadForm() {
  const { t } = useLocale()
  const brand = useBrand()
  const [form, setForm] = useState({ nama: '', kontak: '', kebutuhan: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: '' })) }

  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.nama.trim()) errs.nama = t('leadForm.errNama')
    if (!form.kontak.trim()) errs.kontak = t('leadForm.errKontak')
    if (!form.kebutuhan.trim()) errs.kebutuhan = t('leadForm.errKebutuhan')
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    try {
      await emailjs.send('service_7w4dccc', 'template_0ogubg3', {
        from_name: form.nama,
        from_contact: form.kontak,
        jenis_proyek: '[QUICK LEAD — Beranda]',
        message: form.kebutuhan,
        to_email: brand.email,
      }, 'ig9sNOB9hNjTymRoP')
    } catch {
      // email gagal tidak boleh memblokir pencatatan lead
    }
    if (supabase) {
      try {
        await supabase.from('submissions').insert({
          nama: form.nama, kontak: form.kontak, jenis: 'Quick Lead — Beranda', deskripsi: form.kebutuhan,
        })
      } catch { /* backup channel — jangan blokir UX */ }
    }
    track('lead_submit', { source: 'home_cta' })
    setSending(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="lead-form lead-success">
        <div className="lead-success-ico"><Icon icon="fa-solid fa-circle-check" /></div>
        <h3>{t('leadForm.successTitle')}</h3>
        <p>{t('leadForm.successDesc', { nama: form.nama, kontak: form.kontak })}</p>
        <a href={buildWaLink(brand.wa, t('leadForm.waFollow', { brand: brand.short, nama: form.nama }))} target="_blank" rel="noreferrer" className="btn btn-wa" onClick={() => track('wa_click', { source: 'lead_success' })}>
          <Icon icon="fa-brands fa-whatsapp" /> {t('leadForm.successWa')}
        </a>
      </div>
    )
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <h3>{t('leadForm.title')}</h3>
      <p className="lead-sub">{t('leadForm.sub')}</p>
      <div className="lead-field">
        <label htmlFor="lead-nama">{t('leadForm.nama')}</label>
        <input id="lead-nama" className={`form-ctrl${errors.nama ? ' err' : ''}`} value={form.nama} onChange={set('nama')} placeholder={t('leadForm.phNama')} autoComplete="name" />
        {errors.nama && <span className="form-err-msg">{errors.nama}</span>}
      </div>
      <div className="lead-field">
        <label htmlFor="lead-kontak">{t('leadForm.kontak')}</label>
        <input id="lead-kontak" className={`form-ctrl${errors.kontak ? ' err' : ''}`} value={form.kontak} onChange={set('kontak')} placeholder={t('leadForm.phKontak')} autoComplete="tel" inputMode="text" />
        {errors.kontak && <span className="form-err-msg">{errors.kontak}</span>}
      </div>
      <div className="lead-field">
        <label htmlFor="lead-kebutuhan">{t('leadForm.kebutuhan')}</label>
        <textarea id="lead-kebutuhan" rows="3" className={`form-ctrl form-ta${errors.kebutuhan ? ' err' : ''}`} value={form.kebutuhan} onChange={set('kebutuhan')} placeholder={t('leadForm.phKebutuhan')} style={{ minHeight: 84 }} />
        {errors.kebutuhan && <span className="form-err-msg">{errors.kebutuhan}</span>}
      </div>
      <button type="submit" className="btn btn-pri" disabled={sending} style={{ width: '100%', justifyContent: 'center' }}>
        {sending ? t('leadForm.sending') : <><Icon icon="fa-solid fa-paper-plane" /> {t('leadForm.submit')}</>}
      </button>
      <p className="lead-note">{t('leadForm.note')}</p>
    </form>
  )
}

