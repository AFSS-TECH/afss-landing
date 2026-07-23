import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../Icon.jsx'
import { faqs } from '../data/index.js'
import { Link } from '../i18n/link.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { Reveal } from './shared.jsx'

/* ════════════════════════════════════════════════ FAQ TEASER — jawaban keberatan umum di beranda */
export function FaqTeaser() {
  const { locale, t } = useLocale()
  const [open, setOpen] = useState(0)
  const items = faqs.map((f) => pick(f, locale))
  return (
    <section className="faq" id="faq">
      <div className="container container-narrow">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-circle-question" /> {t('faqTeaser.eyebrow')}</div>
          <h2 className="sec-title">{t('faqTeaser.titlePre')}<span className="ital">{t('faqTeaser.titleItal')}</span>{t('faqTeaser.titlePost')}</h2>
          <p className="sec-sub">{t('faqTeaser.sub')}</p>
        </Reveal>
        <div className="faq-list">
          {items.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.id || i} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span>{f.q}</span>
                  <Icon icon={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div className="faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <Link to="/faq" className="btn btn-ghost">{t('faqTeaser.viewAll')} <Icon icon="fa-solid fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  )
}

