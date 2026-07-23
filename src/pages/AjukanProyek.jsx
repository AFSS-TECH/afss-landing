import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import { Icon } from '../Icon.jsx'
import emailjs from '@emailjs/browser'
import { Link } from '../i18n/link.jsx'
import { useLocale } from '../i18n/context.jsx'
import { useHreflangTags } from '../i18n/HreflangTags.jsx'
import { withLocale } from '../i18n/locales.js'
import { supabase } from '../lib/supabase.js'
import { useBrand, buildWaLink, SITE_URL, Reveal, Breadcrumb, HeroStatCard } from './shared.jsx'

/* ══════════════════════════════════════════════════ AJUKAN PROYEK (/ajukan-proyek) */
export function AjukanProyek() {
  const { locale, t } = useLocale()
  const brand = useBrand()
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
        to_email: brand.email,
      }, 'ig9sNOB9hNjTymRoP')
    } catch {
      // Email delivery failing shouldn't block the submission from being recorded.
    }
    if (supabase) {
      await supabase.from('submissions').insert({
        nama: form.nama, kontak: form.kontak, perusahaan: form.perusahaan || null,
        jenis: form.jenis, anggaran: form.anggaran || null, timeline: form.timeline || null,
        deskripsi: form.deskripsi,
      })
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
                  <a className="btn btn-pri btn-lg" href={buildWaLink(brand.wa, t('forms.ajukanProyek.waSubmitted', { brand: brand.short, jenis: form.jenis, nama: form.nama }))} target="_blank" rel="noreferrer">
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
                <a href={buildWaLink(brand.wa, t('forms.ajukanProyek.waDirect', { brand: brand.short }))} target="_blank" rel="noreferrer">
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

