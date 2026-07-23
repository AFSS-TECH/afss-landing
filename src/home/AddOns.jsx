import { motion } from 'framer-motion'
import { Icon } from '../Icon.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { STRINGS } from '../i18n/strings.js'
import { useSectionOverride } from '../lib/content.js'
import { useBrand, buildWaLink } from '../lib/brand.js'
import { fadeUp, container, viewport, Reveal, onSpot } from './shared.jsx'

/* ════════════════════════════════════════════════ ADD-ON SERVICES */
const ADDON_VISUAL = [
  { icon: 'fa-solid fa-magnifying-glass-chart', color: '#2563FF', bg: 'rgba(37,99,255,.09)' },
  { icon: 'fa-solid fa-server', color: '#10C7B2', bg: 'rgba(16,199,178,.09)' },
  { icon: 'fa-solid fa-credit-card', color: '#2563FF', bg: 'rgba(37,99,255,.09)' },
  { icon: 'fa-brands fa-whatsapp', color: '#1EBE5D', bg: 'rgba(30,190,93,.09)' },
  { icon: 'fa-solid fa-chart-bar', color: '#10C7B2', bg: 'rgba(16,199,178,.09)' },
  { icon: 'fa-solid fa-pen-ruler', color: '#2563FF', bg: 'rgba(37,99,255,.09)' },
]

const ADDONS_FALLBACK = STRINGS.id.addons.items.map((idItem, i) => ({
  i18n: { id: idItem, en: STRINGS.en.addons.items[i], zh: STRINGS.zh.addons.items[i] },
}))

export function AddOns() {
  const { locale, t } = useLocale()
  const brand = useBrand()
  const addonsOverride = useSectionOverride('addons', ADDONS_FALLBACK)
  const items = addonsOverride.map((a) => pick(a, locale))
  return (
    <section className="addons-sec">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-puzzle-piece" /> {t('addons.eyebrow')}</div>
          <h2 className="sec-title">{t('addons.titlePre')}<span className="ital">{t('addons.titleItal')}</span>{t('addons.titlePost')}</h2>
          <p className="sec-sub">{t('addons.sub')}</p>
        </Reveal>
        <motion.div className="addons-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {items.map((a, i) => (
            <motion.div key={i} className="addon-card spot" variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} onMouseMove={onSpot}>
              <div className="addon-ico" style={{ color: ADDON_VISUAL[i].color, background: ADDON_VISUAL[i].bg }}><Icon icon={ADDON_VISUAL[i].icon} /></div>
              <div className="addon-content">
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
              <div className="addon-price">{a.price}</div>
            </motion.div>
          ))}
        </motion.div>
        <Reveal className="addons-note">
          {t('addons.notePre')}<b>{t('addons.noteBold')}</b>{t('addons.notePost')}{' '}
          <a href={buildWaLink(brand.wa, t('wa.addonAsk', { brand: brand.short }))} target="_blank" rel="noreferrer" className="accent-link">{t('addons.askWa')}</a>
        </Reveal>
      </div>
    </section>
  )
}

