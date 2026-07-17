// ── Product Finder — chat-style need-finder (still no LLM / backend call) ──
// Visitors can type what they need in their own words — matched against a
// keyword dictionary per product — or fall back to a short branching Q&A for
// people who'd rather click. Either path ends in the same product recommendation.
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from './i18n/link.jsx'
import { Icon } from './Icon.jsx'
import { products, waLink, BRAND } from './data.js'
import { useLocale, pick } from './i18n/context.jsx'

// keyword → product slug, used to score free-text input against each product.
// Multi-word phrases score higher (specific intent); single words are broader
// signals that add up — free text rarely uses the exact phrasing we'd guess.
const KEYWORDS = {
  'landing-page': [
    'landing page', 'satu halaman', 'halaman promosi',
    'landing', 'iklan', 'promosi', 'kampanye', 'event', 'peluncuran',
    'launching', 'konversi', 'ads', 'promo',
  ],
  'company-profile': [
    'company profile', 'profil perusahaan', 'profil bisnis', 'terlihat profesional',
    'kredibilitas', 'kepercayaan', 'perusahaan', 'company', 'korporat', 'kantor',
    'profesional', 'kredibel',
  ],
  'software-custom': [
    'sistem internal', 'aplikasi khusus', 'aplikasi custom', 'manajemen data',
    'sistem manajemen', 'operasional internal',
    'dashboard', 'custom', 'otomasi', 'crm', 'laporan', 'internal', 'workflow',
    'aplikasi',
  ],
  'aplikasi-mobile': [
    'aplikasi mobile', 'app mobile', 'aplikasi android', 'aplikasi ios',
    'app android', 'app ios', 'aplikasi hp', 'play store', 'app store',
    'mobile', 'android', 'ios', 'flutter', 'apk', 'smartphone',
  ],
  'erp': [
    'keuangan dan inventory', 'stok gudang', 'multi departemen', 'kelola stok',
    'kelola keuangan',
    'erp', 'pabrik', 'manufaktur', 'akuntansi', 'gudang', 'payroll',
    'penggajian', 'produksi', 'rab', 'kontraktor', 'koperasi', 'sdm', 'inventory',
    'stok',
  ],
  'ecommerce': [
    'toko online', 'jual produk sendiri', 'toko sendiri', 'brand sendiri',
    'keranjang belanja', 'payment gateway',
    'jualan', 'jual', 'ecommerce', 'e-commerce', 'online', 'toko', 'barang',
    'dagang', 'belanja', 'checkout', 'produk',
  ],
  'marketplace': [
    'banyak penjual', 'multi vendor', 'platform jual beli', 'buyer dan seller',
    'berbagai penjual', 'banyak toko',
    'marketplace', 'seller', 'vendor', 'multivendor', 'komisi',
  ],
}

function matchProduct(text) {
  const t = text.toLowerCase()
  const scores = Object.entries(KEYWORDS).map(([slug, words]) => ({
    slug,
    score: words.reduce((s, w) => (t.includes(w) ? s + (w.split(' ').length > 1 ? 2 : 1) : s), 0),
  }))
  scores.sort((a, b) => b.score - a.score)
  if (scores[0].score === 0) return null
  if (scores[1] && scores[1].score === scores[0].score) return null // ambiguous — ask instead of guessing
  return products.find((p) => p.slug === scores[0].slug) || null
}

export function ProductFinder() {
  const { locale, t } = useLocale()
  const TREE = t('finder.tree')
  const QUICK_PROMPTS = t('finder.quickPrompts')
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [thread, setThread] = useState([
    { from: 'bot', text: t('finder.greeting') },
  ])
  const [nodeId, setNodeId] = useState(null) // active fallback-tree node, if any
  const [result, setResult] = useState(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [thread, nodeId, result])

  const showResult = (product, viaText) => {
    setResult(pick(product, locale))
    setNodeId(null)
    setThread((h) => [...h, { from: 'bot', text: viaText ? t('finder.viaText') : t('finder.viaTree') }])
  }

  const handleFreeText = (text) => {
    const clean = text.trim()
    if (!clean) return
    setThread((h) => [...h, { from: 'user', text: clean }])
    setInput('')
    const match = matchProduct(clean)
    if (match) {
      showResult(match, true)
    } else {
      setNodeId('start')
      setThread((h) => [...h, { from: 'bot', text: t('finder.clarify') }])
    }
  }

  const choose = (opt) => {
    setThread((h) => [...h, { from: 'user', text: opt.label }])
    if (TREE[opt.next]) {
      setNodeId(opt.next)
      setThread((h) => [...h, { from: 'bot', text: TREE[opt.next].q }])
    } else {
      const product = products.find((p) => p.slug === opt.next)
      showResult(product, false)
    }
  }

  const reset = () => {
    setNodeId(null)
    setResult(null)
    setThread([{ from: 'bot', text: t('finder.restartMsg') }])
  }

  const node = nodeId ? TREE[nodeId] : null

  return (
    <>
      <motion.button
        className="finder-fab"
        onClick={() => setOpen((o) => !o)}
        title={t('finder.fabTitle')}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <Icon icon={open ? 'fa-solid fa-xmark' : 'fa-solid fa-comments'} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="finder-panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div className="finder-head">
              <div className="finder-head-ico"><Icon icon="fa-solid fa-comments" /></div>
              <div>
                <div className="finder-head-title">{t('finder.headTitle')}</div>
                <div className="finder-head-sub">{t('finder.headSub')}</div>
              </div>
              <button className="finder-close" onClick={() => setOpen(false)} aria-label={t('finder.close')}><Icon icon="fa-solid fa-xmark" /></button>
            </div>

            <div className="finder-body" ref={bodyRef}>
              {thread.map((msg, i) => (
                <div key={i} className={`finder-bubble ${msg.from}`}>{msg.text}</div>
              ))}

              {!result && node && (
                <div className="finder-options">
                  {node.options.map((opt) => (
                    <button key={opt.label} className="finder-opt" onClick={() => choose(opt)}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {!result && !node && (
                <div className="finder-quick">
                  {QUICK_PROMPTS.map((p) => (
                    <button key={p} className="finder-quick-chip" onClick={() => handleFreeText(p)}>{p}</button>
                  ))}
                </div>
              )}

              {result && (
                <div className="finder-result">
                  <div className="finder-card">
                    <div className="finder-card-ico"><Icon icon={result.icon} /></div>
                    <div className="finder-card-name">{result.name}</div>
                    <p className="finder-card-desc">{result.desc}</p>
                    <div className="finder-card-ctas">
                      <Link to={`/layanan/${result.slug}`} className="btn btn-pri" onClick={() => setOpen(false)}>
                        {t('finder.viewDetail')} <Icon icon="fa-solid fa-arrow-right" />
                      </Link>
                      <a
                        href={waLink(t('finder.waAsk', { brand: BRAND.short, product: result.name }))}
                        target="_blank" rel="noreferrer" className="btn btn-wa"
                      >
                        <Icon icon="fa-brands fa-whatsapp" /> {t('finder.askWa')}
                      </a>
                    </div>
                  </div>
                  <button className="finder-restart" onClick={reset}>
                    <Icon icon="fa-solid fa-rotate-left" /> {t('finder.restart')}
                  </button>
                </div>
              )}
            </div>

            {!result && (
              <form
                className="finder-input-row"
                onSubmit={(e) => { e.preventDefault(); handleFreeText(input) }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('finder.placeholder')}
                  className="finder-input"
                />
                <button type="submit" className="finder-send" aria-label={t('finder.send')}><Icon icon="fa-solid fa-paper-plane" /></button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
