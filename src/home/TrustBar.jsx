import { Icon } from '../Icon.jsx'
import { clients } from '../data/index.js'
import { useLocale, pick } from '../i18n/context.jsx'
import { useSectionOverride } from '../lib/content.js'

/* ════════════════════════════════════════════════ TRUST BAR — client / industry strip */
export function TrustBar() {
  const { locale, t } = useLocale()
  const clientsOverride = useSectionOverride('clients', clients)
  const localized = clientsOverride.map((c) => pick(c, locale))
  return (
    <div className="trustbar">
      <div className="trust-label">{t('trustBar.label')}</div>
      <div className="trust-marquee-wrap">
        <div className="trust-logos">
          {localized.map((c, i) => (
            <span className="trust-logo" key={i}>
              <Icon icon="fa-solid fa-circle-nodes" /> {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
