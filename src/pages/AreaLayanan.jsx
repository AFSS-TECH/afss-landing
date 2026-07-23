import { motion } from 'framer-motion'
import { Head } from 'vite-react-ssg'
import { Icon } from '../Icon.jsx'
import { pricing, serviceAreas, why } from '../data/index.js'
import { Link, RawLink } from '../i18n/link.jsx'
import { pick } from '../i18n/context.jsx'
import { useBrand, buildWaLink, SITE_URL, fadeUp, container, viewport, Reveal, Breadcrumb } from './shared.jsx'

/* ══════════════════════════════════════════════════ AREA LAYANAN (/jasa-pembuatan-website-<kota>)
   Halaman SEO lokal per kota — Indonesian-only (dipasang hanya di route tree
   default-locale, seperti /privacy & /terms). Konten per kota di data.js
   `serviceAreas`, dibuat unik agar tidak terhitung doorway page. */
export function AreaLayanan({ area }) {
  const brand = useBrand()
  const title = `Jasa Pembuatan Website & Aplikasi ${area.name} | AFSS`
  const desc = `Jasa pembuatan website, aplikasi mobile & sistem bisnis custom untuk ${area.name} dan sekitarnya (${area.region}). Harga transparan mulai Rp 1,5 juta, kode milik Anda, garansi bug. Konsultasi gratis via WhatsApp.`
  const canonical = `${SITE_URL}/jasa-pembuatan-website-${area.slug}`
  const waMsg = `Halo ${brand.short}, saya dari ${area.name}, ingin konsultasi pembuatan website/aplikasi.`
  const priceItems = pricing.map((p) => ({ slug: p.slug, icon: p.icon, ...pick(p, 'id') }))
  const otherAreas = serviceAreas.filter((a) => a.slug !== area.slug)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Jasa Pembuatan Website & Aplikasi ${area.name}`,
    description: desc,
    url: canonical,
    serviceType: 'Web & Software Development',
    areaServed: { '@type': 'City', name: area.name, containedInPlace: { '@type': 'State', name: area.region } },
    provider: { '@type': 'Organization', name: 'PT Advanced Future Software Solutions', url: 'https://afss.tech/' },
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
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ to: '/', label: 'Beranda' }, { label: `Jasa Pembuatan Website ${area.name}` }]} />
          <Reveal>
            <h1 className="page-title">Jasa Pembuatan Website & Aplikasi di <span className="ital">{area.name}</span></h1>
            <p className="page-sub">{area.intro[0]}</p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <Reveal>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1.02rem', maxWidth: 760, marginBottom: 18 }}>{area.intro[1]}</p>
            <div className="area-note"><Icon icon="fa-solid fa-location-dot" /> {area.localNote}</div>
          </Reveal>
        </div>
      </section>

      <section className="whyus-home" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-industry" /> Industri di {area.name}</div>
            <h2 className="sec-title">Yang sering kami bantu di <span className="ital">{area.region}</span></h2>
          </Reveal>
          <motion.div className="why-home-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {area.industries.map((ind) => (
              <motion.div key={ind.name} className="why-home-card" variants={fadeUp}>
                <div className="why-home-ico" style={{ color: 'var(--blue)', background: 'var(--blue-l)' }}><Icon icon={ind.icon} /></div>
                <h3>{ind.name}</h3>
                <p>{ind.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="sec-header center">
            <div className="eyebrow"><Icon icon="fa-solid fa-layer-group" /> Layanan</div>
            <h2 className="sec-title">Layanan untuk bisnis di <span className="ital">{area.name}</span></h2>
            <p className="sec-sub">Semua layanan tersedia untuk {area.name} — harga sama transparan, kode tetap milik Anda.</p>
          </Reveal>
          <motion.div className="svc-pg-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
            {priceItems.map((p) => (
              <motion.div key={p.slug} variants={fadeUp}>
                <Link to={`/layanan/${p.slug}`} className="svc-item">
                  <div className="svc-item-hd">
                    <div className="svc-item-ico"><Icon icon={p.icon} /></div>
                    <span className="svc-item-metric">{p.note} {p.price}</span>
                  </div>
                  <div className="svc-item-name">{p.name}</div>
                  <p className="svc-item-desc">{p.desc}</p>
                  <span className="svc-item-cta">Selengkapnya <Icon icon="fa-solid fa-arrow-right" /></span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" style={{ paddingTop: 20 }}>
        <Reveal className="cta-card">
          <h2>Siap bantu bisnis Anda di <span className="ital">{area.name}</span></h2>
          <p>Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan Anda — kami beri rekomendasi solusi & estimasi harga yang jujur.</p>
          <div className="btns">
            <a href={buildWaLink(brand.wa, waMsg)} className="btn btn-wa btn-lg" target="_blank" rel="noreferrer"><Icon icon="fa-brands fa-whatsapp" /> Konsultasi Gratis via WhatsApp</a>
            <Link to="/harga" className="btn btn-ghost btn-lg">Lihat Paket Harga</Link>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0, paddingBottom: 72 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="area-links-label">Area layanan lainnya:</div>
          <div className="area-links">
            {otherAreas.map((a) => (
              <RawLink key={a.slug} to={`/jasa-pembuatan-website-${a.slug}`} className="area-link-chip">{a.name}</RawLink>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

