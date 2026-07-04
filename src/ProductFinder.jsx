// ── Product Finder — chat-style need-finder (still no LLM / backend call) ──
// Visitors can type what they need in their own words — matched against a
// keyword dictionary per product — or fall back to a short branching Q&A for
// people who'd rather click. Either path ends in the same product recommendation.
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Icon } from './Icon.jsx'
import { products, waLink, BRAND } from './data.js'

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
    'sistem manajemen', 'operasional internal', 'aplikasi mobile', 'app mobile',
    'dashboard', 'custom', 'otomasi', 'crm', 'laporan', 'internal', 'workflow',
    'aplikasi', 'mobile',
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

// fallback branching Q&A — for visitors who'd rather click than type
const TREE = {
  start: {
    q: 'Boleh, apa tujuan utama proyeknya?',
    options: [
      { label: 'Jualan produk/jasa online', next: 'jual' },
      { label: 'Bangun kepercayaan & profil bisnis', next: 'company-profile' },
      { label: 'Kelola operasional internal bisnis', next: 'internal' },
      { label: 'Kampanye/promosi sesaat (iklan, produk baru, event)', next: 'landing-page' },
    ],
  },
  jual: {
    q: 'Siap. Ini toko/brand Anda sendiri, atau platform untuk banyak penjual berbeda?',
    options: [
      { label: 'Toko/brand saya sendiri', next: 'ecommerce' },
      { label: 'Banyak penjual berbeda (marketplace)', next: 'marketplace' },
    ],
  },
  internal: {
    q: 'Fokus utama operasionalnya yang mana?',
    options: [
      { label: 'Keuangan, inventory & SDM dalam satu sistem terpusat', next: 'erp' },
      { label: 'Sistem/dashboard custom sesuai alur kerja spesifik', next: 'software-custom' },
    ],
  },
}

const QUICK_PROMPTS = [
  'Saya mau jualan baju online, butuh apa?',
  'Butuh sistem buat kelola stok & keuangan pabrik',
  'Mau bikin website biar keliatan lebih profesional',
]

export function ProductFinder() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [thread, setThread] = useState([
    { from: 'bot', text: 'Halo! Ceritakan kebutuhan bisnis Anda dalam kalimat sendiri, atau pilih salah satu di bawah — saya bantu cari layanan yang paling cocok.' },
  ])
  const [nodeId, setNodeId] = useState(null) // active fallback-tree node, if any
  const [result, setResult] = useState(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [thread, nodeId, result])

  const showResult = (product, viaText) => {
    setResult(product)
    setNodeId(null)
    setThread((h) => [...h, { from: 'bot', text: viaText
      ? `Berdasarkan cerita Anda, ini yang paling cocok:`
      : `Berdasarkan jawaban Anda, ini yang paling cocok:` }])
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
      setThread((h) => [...h, { from: 'bot', text: 'Boleh dibantu lebih spesifik? Pilih salah satu yang paling dekat dengan kebutuhan Anda:' }])
    }
  }

  const choose = (opt) => {
    const node = TREE[nodeId]
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
    setThread([{ from: 'bot', text: 'Oke, mulai lagi. Ceritakan kebutuhan Anda, atau pilih dari opsi di bawah.' }])
  }

  const node = nodeId ? TREE[nodeId] : null

  return (
    <>
      <motion.button
        className="finder-fab"
        onClick={() => setOpen((o) => !o)}
        title="Bantu cari produk yang cocok"
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
                <div className="finder-head-title">Cari Produk yang Cocok</div>
                <div className="finder-head-sub">Chat singkat berbasis kata kunci — bukan AI generatif, langsung dipetakan ke layanan kami.</div>
              </div>
              <button className="finder-close" onClick={() => setOpen(false)} aria-label="Tutup"><Icon icon="fa-solid fa-xmark" /></button>
            </div>

            <div className="finder-body" ref={bodyRef}>
              {thread.map((t, i) => (
                <div key={i} className={`finder-bubble ${t.from}`}>{t.text}</div>
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
                        Lihat Detail <Icon icon="fa-solid fa-arrow-right" />
                      </Link>
                      <a
                        href={waLink(`Halo ${BRAND.short}, saya tertarik dengan layanan ${result.name}. Boleh konsultasi?`)}
                        target="_blank" rel="noreferrer" className="btn btn-wa"
                      >
                        <Icon icon="fa-brands fa-whatsapp" /> Tanya via WhatsApp
                      </a>
                    </div>
                  </div>
                  <button className="finder-restart" onClick={reset}>
                    <Icon icon="fa-solid fa-rotate-left" /> Mulai ulang
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
                  placeholder="Ketik kebutuhan Anda di sini..."
                  className="finder-input"
                />
                <button type="submit" className="finder-send" aria-label="Kirim"><Icon icon="fa-solid fa-paper-plane" /></button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
