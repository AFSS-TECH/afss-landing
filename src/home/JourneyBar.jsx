import { motion } from 'framer-motion'
import { Icon } from '../Icon.jsx'
import { Link } from '../i18n/link.jsx'
import { useLocale } from '../i18n/context.jsx'
import { useBrand, buildWaLink } from '../lib/brand.js'
import { track } from '../lib/track.js'

/* ════════════════════════════════════════════════ JOURNEY BAR — 4-step visitor path */
export function JourneyBar() {
  const { t } = useLocale()
  const brand = useBrand()
  const items = t('journey.items')
  const hrefs = [
    { href: '#services' },
    { href: '#demo' },
    { to: '/harga' },
    { href: buildWaLink(brand.wa, t('wa.heroConsult', { brand: brand.short })), external: true },
  ]
  return (
    <motion.nav
      className="journey" aria-label={t('journey.aria')}
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
    >
      {items.map((it, i) => {
        const body = (
          <>
            <span className={`journey-num${i === 3 ? ' wa' : ''}`}>{i + 1}</span>
            <span className="journey-txt">
              <span className="journey-label">{it.label} <Icon icon="fa-solid fa-arrow-right" /></span>
              <span className="journey-desc">{it.desc}</span>
            </span>
          </>
        )
        const meta = hrefs[i]
        const onClick = () => track('journey_click', { step: i + 1, label: it.label })
        return meta.to
          ? <Link key={i} to={meta.to} className="journey-card" onClick={onClick}>{body}</Link>
          : <a key={i} href={meta.href} className="journey-card" onClick={onClick} {...(meta.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{body}</a>
      })}
    </motion.nav>
  )
}

