import { useState } from 'react'
import { motion } from 'framer-motion'
import { Head } from 'vite-react-ssg'
import { Icon } from '../Icon.jsx'
import emailjs from '@emailjs/browser'
import { useLocale } from '../i18n/context.jsx'
import { useHreflangTags } from '../i18n/HreflangTags.jsx'
import { withLocale } from '../i18n/locales.js'
import { useBrand, buildWaLink, SITE_URL, fadeUp, container, viewport, Reveal, Breadcrumb, HeroStatCard } from './shared.jsx'

/* ══════════════════════════════════════════════════ CONTACT (/kontak) */
/* ── Contact Form with EmailJS ── */
const EMAILJS_SERVICE  = 'service_7w4dccc'
const EMAILJS_TEMPLATE = 'template_0ogubg3'
const EMAILJS_KEY      = 'ig9sNOB9hNjTymRoP'

export function Contact() {
  const { locale, t } = useLocale()
  const brand = useBrand()
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
        to_email: brand.email,
      }, EMAILJS_KEY)
      setStatus('sent')
    } catch {
      // Fallback: redirect ke WA dengan data form
      const msg = `Halo ${brand.short},%0Anama: ${form.nama}%0AKontak: ${form.wa}%0AKebutuhan: ${form.jenis}%0APesan: ${form.pesan}`
      window.open(`https://wa.me/${brand.wa}?text=${msg}`, '_blank')
      setStatus('sent')
    }
  }

  const methods = [
    { icon: 'fa-brands fa-whatsapp', title: 'WhatsApp', value: brand.phone, sub: t('contact.methods.wa.sub'), href: buildWaLink(brand.wa, t('contact.waConsult', { brand: brand.short })), cta: t('contact.methods.wa.cta'), color: 'var(--wa)' },
    { icon: 'fa-solid fa-envelope', title: t('contact.methods.email.title'), value: brand.email, sub: t('contact.methods.email.sub'), href: `mailto:${brand.email}`, cta: t('contact.methods.email.cta'), color: 'var(--blue)' },
    { icon: 'fa-solid fa-location-dot', title: t('contact.methods.location.title'), value: brand.address, sub: t('contact.methods.location.sub'), href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address)}`, cta: t('contact.methods.location.cta'), color: 'var(--accent)' },
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
                <a className="btn btn-wa btn-lg" href={buildWaLink(brand.wa, t('contact.waConsult', { brand: brand.short }))} target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> {t('contact.ctaChat')}</a>
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
              <a href={buildWaLink(brand.wa, t('contact.waFollowUp', { brand: brand.short, nama: form.nama }))} target="_blank" rel="noreferrer" className="btn btn-wa btn-lg" style={{ marginTop: 24 }}>
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
                {t('contact.noForm')}<a href={buildWaLink(brand.wa, t('contact.waDirect', { brand: brand.short }))} target="_blank" rel="noreferrer" className="accent-link">{t('contact.noFormLink')}</a>
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

