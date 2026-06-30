// ── Product Finder — scripted (non-AI) decision-tree chat widget ──
// Helps visitors figure out which product fits their need by answering a
// short series of fixed multiple-choice questions. No LLM call, no backend —
// pure branching logic mapped to the existing `products` catalogue.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Icon } from './Icon.jsx'
import { products, waLink, BRAND } from './data.js'

const TREE = {
  start: {
    q: 'Halo! Saya bisa bantu cari produk yang paling cocok untuk Anda. Apa tujuan utama Anda?',
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

export function ProductFinder() {
  const [open, setOpen] = useState(false)
  const [nodeId, setNodeId] = useState('start')
  const [history, setHistory] = useState([]) // [{ q, chosen }]

  const node = TREE[nodeId]
  const result = !node ? products.find((p) => p.slug === nodeId) : null

  const choose = (opt) => {
    setHistory((h) => [...h, { q: node.q, chosen: opt.label }])
    setNodeId(opt.next)
  }

  const reset = () => { setNodeId('start'); setHistory([]) }

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
        <Icon icon={open ? 'fa-solid fa-xmark' : 'fa-solid fa-wand-magic-sparkles'} />
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
              <div className="finder-head-ico"><Icon icon="fa-solid fa-wand-magic-sparkles" /></div>
              <div>
                <div className="finder-head-title">Cari Produk yang Cocok</div>
                <div className="finder-head-sub">Jawab beberapa pertanyaan singkat — bukan AI, langsung dipetakan ke layanan kami.</div>
              </div>
              <button className="finder-close" onClick={() => setOpen(false)} aria-label="Tutup"><Icon icon="fa-solid fa-xmark" /></button>
            </div>

            <div className="finder-body">
              {history.map((h, i) => (
                <div key={i} className="finder-turn">
                  <div className="finder-bubble bot">{h.q}</div>
                  <div className="finder-bubble user">{h.chosen}</div>
                </div>
              ))}

              {node && (
                <div className="finder-turn">
                  <div className="finder-bubble bot">{node.q}</div>
                  <div className="finder-options">
                    {node.options.map((opt) => (
                      <button key={opt.label} className="finder-opt" onClick={() => choose(opt)}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {result && (
                <div className="finder-result">
                  <div className="finder-bubble bot">Berdasarkan jawaban Anda, ini yang paling cocok:</div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
