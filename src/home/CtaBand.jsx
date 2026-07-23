import { Icon } from '../Icon.jsx'
import { Link } from '../i18n/link.jsx'
import { useLocale } from '../i18n/context.jsx'
import { useBrand, buildWaLink } from '../lib/brand.js'
import { track } from '../lib/track.js'
import { Reveal } from './shared.jsx'
import { LeadForm } from './LeadForm.jsx'

/* ════════════════════════════════════════════════ CTA BAND */
export function CtaBand() {
  const { t } = useLocale()
  const brand = useBrand()
  return (
    <section className="cta-band">
      <Reveal className="cta-card cta-split">
        <div className="cta-copy">
          <h2>{t('cta.titlePre')}<span className="ital">{t('cta.titleItal')}</span>{t('cta.titlePost')}</h2>
          <p>{t('cta.desc')}</p>
          <div className="btns">
            <a href={buildWaLink(brand.wa, t('wa.ctaStart', { brand: brand.short }))} className="btn btn-wa btn-lg" target="_blank" rel="noreferrer" onClick={() => track('wa_click', { source: 'cta_band' })}><Icon icon="fa-brands fa-whatsapp" /> {t('cta.start')}</a>
            <Link to="/harga" className="btn btn-ghost btn-lg">{t('cta.viewPricing')}</Link>
          </div>
        </div>
        <LeadForm />
      </Reveal>
    </section>
  )
}

