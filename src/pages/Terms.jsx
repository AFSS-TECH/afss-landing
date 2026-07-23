import { Head } from 'vite-react-ssg'
import { BRAND } from '../data/index.js'
import { SITE_URL, Reveal, Breadcrumb } from './shared.jsx'

/* ══════════════════════════════════════════════════ TERMS OF SERVICE (/terms) */
export function Terms() {
  const title = 'Syarat & Ketentuan Layanan — AFSS'
  const desc = 'Syarat dan ketentuan layanan PT Advanced Future Software Solutions untuk proyek pembuatan website, aplikasi, dan sistem digital.'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/terms`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/terms`} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="robots" content="noindex" />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Syarat & Ketentuan' }]} />
            <h1 className="page-title">Syarat &amp; <span className="ital">Ketentuan</span></h1>
            <p className="page-sub">Terakhir diperbarui: 14 Juni 2026</p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 40, paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div className="legal-body">
            <h2>1. Penerimaan Syarat</h2>
            <p>Dengan menggunakan layanan PT Advanced Future Software Solutions ("AFSS"), Anda menyetujui syarat dan ketentuan yang berlaku dalam dokumen ini. Jika Anda tidak menyetujuinya, mohon tidak menggunakan layanan kami.</p>

            <h2>2. Deskripsi Layanan</h2>
            <p>AFSS menyediakan jasa pengembangan perangkat lunak termasuk namun tidak terbatas pada: pembuatan website custom, pengembangan aplikasi mobile, web application, UI/UX design, serta layanan maintenance dan support.</p>

            <h2>3. Proses Kerja Sama</h2>
            <ul>
              <li><strong>Konsultasi:</strong> Dimulai dengan diskusi kebutuhan secara gratis tanpa komitmen.</li>
              <li><strong>Proposal:</strong> Kami menyampaikan ruang lingkup pekerjaan, estimasi biaya, dan timeline yang disepakati bersama secara tertulis.</li>
              <li><strong>Pembayaran:</strong> Skema pembayaran termin disepakati sebelum pengerjaan dimulai (umumnya DP di awal, pelunasan sebelum serah terima).</li>
              <li><strong>Serah Terima:</strong> Seluruh aset, kode sumber, dan dokumentasi diserahkan kepada klien setelah pelunasan.</li>
            </ul>

            <h2>4. Kepemilikan Kode dan Aset</h2>
            <p>Setelah pelunasan penuh, seluruh hak kekayaan intelektual atas kode sumber, desain, dan aset yang dikembangkan khusus untuk proyek Anda menjadi milik Anda sepenuhnya. AFSS tidak mempertahankan hak kepemilikan atas deliverable yang telah dibayar lunas.</p>
            <p>Library dan komponen open-source yang digunakan tunduk pada lisensi masing-masing (umumnya MIT, Apache 2.0, atau sejenisnya).</p>

            <h2>5. Tanggung Jawab Klien</h2>
            <p>Klien bertanggung jawab untuk:</p>
            <ul>
              <li>Menyediakan materi, konten, dan informasi yang diperlukan secara tepat waktu.</li>
              <li>Memberikan feedback pada setiap milestone dalam tenggat waktu yang disepakati.</li>
              <li>Memastikan bahwa materi yang disediakan tidak melanggar hak cipta atau hukum yang berlaku.</li>
            </ul>

            <h2>6. Garansi dan Perbaikan</h2>
            <p>Setiap proyek dilengkapi masa garansi bug (umumnya 30–90 hari setelah launching, sesuai kesepakatan). Garansi mencakup perbaikan bug yang muncul dari kode yang kami tulis dan bukan akibat perubahan konten atau sistem oleh klien.</p>

            <h2>7. Pembatasan Tanggung Jawab</h2>
            <p>AFSS tidak bertanggung jawab atas kerugian tidak langsung, kehilangan pendapatan, atau kerugian data yang disebabkan oleh penggunaan sistem yang kami bangun di luar kondisi normal operasional yang telah diuji.</p>

            <h2>8. Kerahasiaan</h2>
            <p>Kami menjaga kerahasiaan informasi bisnis dan teknis yang Anda berikan selama kerja sama. Informasi tersebut tidak akan dibagikan kepada pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum.</p>

            <h2>9. Penyelesaian Sengketa</h2>
            <p>Sengketa yang timbul dari perjanjian layanan diselesaikan terlebih dahulu melalui musyawarah mufakat. Jika tidak tercapai kesepakatan dalam 30 hari, penyelesaian dilakukan sesuai hukum yang berlaku di Indonesia.</p>

            <h2>10. Perubahan Syarat</h2>
            <p>AFSS berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan berlaku untuk proyek baru yang dimulai setelah tanggal perubahan diterbitkan.</p>

            <h2>11. Hubungi Kami</h2>
            <p>Pertanyaan terkait syarat dan ketentuan ini dapat disampaikan ke <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> atau melalui WhatsApp di {BRAND.phone}.</p>
          </div>
        </div>
      </section>
    </>
  )
}

