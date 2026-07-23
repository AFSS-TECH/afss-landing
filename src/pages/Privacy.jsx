import { Head } from 'vite-react-ssg'
import { BRAND, waLink } from '../data/index.js'
import { SITE_URL, Reveal, Breadcrumb } from './shared.jsx'

/* ══════════════════════════════════════════════════ PRIVACY POLICY (/privacy) */
export function Privacy() {
  const title = 'Kebijakan Privasi — AFSS'
  const desc = 'Kebijakan privasi PT Advanced Future Software Solutions mengenai pengumpulan, penggunaan, dan perlindungan data pengguna.'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${SITE_URL}/privacy`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${SITE_URL}/privacy`} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="robots" content="noindex" />
      </Head>

      <section className="page-hero">
        <div className="hero-glow" />
        <div className="container">
          <Reveal>
            <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Kebijakan Privasi' }]} />
            <h1 className="page-title">Kebijakan <span className="ital">Privasi</span></h1>
            <p className="page-sub">Terakhir diperbarui: 14 Juni 2026</p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 40, paddingBottom: 100 }}>
        <div className="container container-narrow">
          <div className="legal-body">
            <h2>1. Pendahuluan</h2>
            <p>PT Advanced Future Software Solutions ("AFSS", "kami") berkomitmen melindungi privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi yang Anda berikan saat menggunakan layanan atau mengunjungi situs web kami.</p>

            <h2>2. Informasi yang Kami Kumpulkan</h2>
            <p>Kami dapat mengumpulkan informasi berikut:</p>
            <ul>
              <li><strong>Informasi identitas:</strong> nama, alamat email, nomor telepon yang Anda berikan saat menghubungi kami atau mengisi formulir.</li>
              <li><strong>Informasi teknis:</strong> alamat IP, jenis browser, halaman yang dikunjungi, dan durasi kunjungan — dikumpulkan secara anonim melalui layanan analitik.</li>
              <li><strong>Informasi proyek:</strong> brief, dokumen, atau materi lain yang Anda bagikan dalam konteks kerja sama.</li>
            </ul>

            <h2>3. Penggunaan Informasi</h2>
            <p>Informasi Anda digunakan untuk:</p>
            <ul>
              <li>Merespons pertanyaan dan memberikan konsultasi.</li>
              <li>Memproses dan mengelola proyek yang telah disepakati.</li>
              <li>Meningkatkan kualitas layanan dan situs web kami.</li>
              <li>Mengirimkan informasi yang relevan jika Anda telah memberikan persetujuan.</li>
            </ul>

            <h2>4. Keamanan Data</h2>
            <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk melindungi data Anda dari akses tidak sah, pengungkapan, perubahan, atau penghapusan. Data proyek disimpan secara aman dan hanya dapat diakses oleh tim yang berkepentingan.</p>

            <h2>5. Berbagi Data dengan Pihak Ketiga</h2>
            <p>Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada pihak ketiga. Data dapat dibagikan kepada penyedia layanan pihak ketiga (seperti layanan hosting atau analitik) yang membantu operasional kami, dengan kewajiban kerahasiaan yang setara.</p>

            <h2>6. Cookie</h2>
            <p>Situs web kami menggunakan cookie teknis yang diperlukan untuk fungsi dasar situs. Kami tidak menggunakan cookie pelacak pihak ketiga untuk keperluan iklan.</p>

            <h2>7. Hak Anda</h2>
            <p>Anda berhak untuk meminta akses, koreksi, atau penghapusan data pribadi Anda yang kami simpan. Untuk mengajukan permintaan, hubungi kami di <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.</p>

            <h2>8. Perubahan Kebijakan</h2>
            <p>Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan signifikan akan kami informasikan melalui situs web atau email. Penggunaan layanan kami setelah perubahan diterbitkan dianggap sebagai penerimaan kebijakan yang diperbarui.</p>

            <h2>9. Hubungi Kami</h2>
            <p>Pertanyaan seputar kebijakan privasi ini dapat disampaikan ke:</p>
            <ul>
              <li>Email: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
              <li>WhatsApp: <a href={waLink('Halo, saya ingin bertanya tentang kebijakan privasi AFSS.')} target="_blank" rel="noreferrer">{BRAND.phone}</a></li>
              <li>Alamat: {BRAND.address}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

