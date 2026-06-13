// ── Blog posts (Bahasa Indonesia, target keyword SEO) ──────
// Tambah post baru = tambahkan objek ke array ini + entri di public/sitemap.xml.
// Body ditulis dalam Markdown (dirender via `marked`).

export const SITE_URL = 'https://afss-landing.vercel.app'

export const posts = [
  {
    slug: 'biaya-pembuatan-website',
    title: 'Berapa Biaya Pembuatan Website di Indonesia? Panduan Lengkap 2026',
    description:
      'Rincian biaya pembuatan website di Indonesia 2026 — dari landing page UMKM hingga web app perusahaan, plus faktor yang memengaruhi harga.',
    date: '2026-06-13',
    readMinutes: 7,
    tags: ['Website', 'Biaya', 'Panduan'],
    c: '#0E8C86',
    c2: '#0B6E69',
    excerpt:
      'Berapa sebenarnya biaya membuat website yang profesional? Kami uraikan kisaran harga per jenis website dan faktor yang memengaruhinya.',
    body: `
Salah satu pertanyaan pertama yang muncul saat ingin go digital adalah: **berapa biaya pembuatan website?** Jawabannya tergantung kebutuhan — tapi di artikel ini kami beri kisaran nyata yang berlaku di Indonesia pada 2026, supaya Anda bisa menyiapkan anggaran dengan realistis.

## Kisaran biaya berdasarkan jenis website

Tidak semua website sama. Sebuah landing page satu halaman jelas berbeda dari sistem dashboard dengan login dan database. Berikut gambaran umumnya:

- **Landing page / company profile** — mulai dari **Rp 1 juta**. Cocok untuk UMKM, personal brand, atau peluncuran produk. Biasanya 1–2 minggu pengerjaan.
- **Website + CMS (bisa update sendiri)** — **Rp 3–6 juta**. Anda bisa mengubah konten, artikel, dan produk tanpa coding.
- **Web app / dashboard** (login, manajemen data, laporan) — **mulai Rp 4 juta**, naik sesuai jumlah fitur dan peran pengguna.
- **Sistem custom / ERP** — dihitung per proyek karena sangat bergantung pada alur bisnis.

Lihat rincian paket kami di halaman [Paket Harga](/#pricing) untuk perbandingan yang lebih konkret.

## Faktor yang memengaruhi harga

Dua website dengan tampilan mirip bisa berbeda harga jauh. Inilah penyebabnya:

### 1. Custom vs template
Template murah dan cepat, tapi terbatas dan sering "kembar" dengan situs lain. Website [custom](/#services) dibangun sesuai brand dan kebutuhan Anda — investasinya lebih besar, tapi hasilnya unik dan fleksibel.

### 2. Jumlah & kompleksitas fitur
Form kontak sederhana berbeda dengan sistem pembayaran, multi-bahasa, atau integrasi WhatsApp dan API pihak ketiga. Semakin banyak logika, semakin besar effort.

### 3. Desain & UX
Desain yang dipikirkan matang (riset, prototype, design system) meningkatkan konversi — dan memang menambah biaya dibanding sekadar "asal jadi".

### 4. SEO & performa
Website yang dibangun **SEO-ready** dan cepat (skor Core Web Vitals tinggi) lebih mudah ditemukan di Google. Ini bukan biaya tambahan di tempat kami — kami bangun seperti itu sejak awal.

## Kenapa "murah" belum tentu hemat

Website Rp 500 ribu yang lambat, tidak bisa di-update, dan tidak muncul di Google justru membuang uang. Yang penting bukan harga termurah, tapi **nilai per rupiah**: apakah website itu mendatangkan pelanggan, mudah dirawat, dan kodenya jadi milik Anda?

Di AFSS, seluruh kode dan dokumentasi menjadi milik klien sepenuhnya — tanpa vendor lock-in. Pertanyaan umum lain soal harga dan timeline kami jawab di bagian [FAQ](/#faq).

## Cara mendapat estimasi yang akurat

Angka pasti hanya bisa diberikan setelah kebutuhan jelas. Prosesnya singkat: ceritakan tujuan bisnis Anda, kami bantu rumuskan ruang lingkup, lalu beri proposal dengan harga dan timeline yang transparan — tanpa biaya tersembunyi.

**Siap mulai?** [Konsultasi gratis lewat WhatsApp](/#pricing), tanpa komitmen.
`,
  },
  {
    slug: 'lama-pembuatan-aplikasi-mobile',
    title: 'Berapa Lama Proses Pembuatan Aplikasi Mobile? (Android & iOS)',
    description:
      'Estimasi waktu pembuatan aplikasi mobile Android & iOS, tahap-tahap pengerjaan, dan cara mempercepatnya tanpa mengorbankan kualitas.',
    date: '2026-06-12',
    readMinutes: 6,
    tags: ['Aplikasi Mobile', 'Timeline'],
    c: '#1E88A8',
    c2: '#0E5E78',
    excerpt:
      'Dari ide sampai aplikasi tayang di Play Store — berapa lama prosesnya, dan apa saja yang menentukan durasinya?',
    body: `
Setelah biaya, pertanyaan kedua yang paling sering kami terima adalah: **berapa lama membuat aplikasi mobile?** Jawaban singkatnya: umumnya **4–8 minggu** untuk aplikasi skala menengah. Tapi mari kita uraikan supaya ekspektasinya jelas.

## Estimasi waktu berdasarkan kompleksitas

- **MVP / aplikasi sederhana** (beberapa layar, satu alur utama) — **3–5 minggu**.
- **Aplikasi menengah** (login, profil, notifikasi, integrasi backend) — **6–10 minggu**.
- **Aplikasi kompleks** (pembayaran, real-time, peta, multi-peran) — **3 bulan ke atas**.

Durasi juga dipengaruhi pilihan teknologi. Pendekatan **cross-platform** seperti Flutter memungkinkan satu basis kode untuk Android & iOS sekaligus — lebih cepat dan hemat dibanding membangun dua aplikasi native terpisah. Lihat [layanan aplikasi mobile kami](/#services).

## Tahapan yang dilalui

Waktu pengerjaan terbagi ke beberapa fase — ini sama dengan [proses kerja](/#process) kami:

1. **Konsultasi & discovery** — memetakan kebutuhan dan fitur inti.
2. **Desain UI/UX** — wireframe, prototype, lalu desain final.
3. **Development** — membangun fitur dengan update progres berkala.
4. **Testing** — uji di berbagai perangkat, perbaiki bug.
5. **Launch** — publikasi ke Google Play / App Store (proses review store sendiri bisa 1–3 hari).

## Yang sering memperlambat proyek

Bukan coding yang biasanya bikin molor, melainkan:

- **Kebutuhan yang berubah-ubah** di tengah jalan (scope creep).
- **Feedback lambat** — setiap tahap butuh persetujuan Anda.
- **Aset belum siap** — logo, konten, atau akun developer store.

Menyiapkan hal-hal ini di awal bisa memangkas waktu secara signifikan.

## Cara mempercepat tanpa menurunkan kualitas

- Mulai dari **MVP**: rilis versi inti dulu, kembangkan bertahap.
- Tetapkan **ruang lingkup yang jelas** sejak proposal.
- Pilih partner dengan **komunikasi cepat** — tim lokal tanpa beda zona waktu mempercepat keputusan.

Ingin tahu estimasi untuk ide aplikasi Anda? [Konsultasikan gratis](/#pricing) — kami beri timeline yang realistis, bukan janji manis.
`,
  },
  {
    slug: 'cara-memilih-software-house',
    title: 'Cara Memilih Software House yang Tepat untuk Bisnis Anda',
    description:
      'Panduan memilih software house terpercaya: 7 hal yang wajib dicek sebelum menyerahkan proyek website atau aplikasi Anda.',
    date: '2026-06-11',
    readMinutes: 6,
    tags: ['Software House', 'Tips'],
    c: '#15243B',
    c2: '#26405E',
    excerpt:
      'Salah pilih vendor bisa membuat proyek molor, mahal, dan menyusahkan. Berikut cara memilih software house yang tepat.',
    body: `
Memilih **software house** ibarat memilih partner jangka panjang, bukan sekadar tukang. Salah pilih, proyek bisa molor, membengkak, atau ditinggal setengah jadi. Berikut hal-hal yang sebaiknya Anda cek sebelum memutuskan.

## 1. Portofolio & studi kasus nyata
Minta contoh proyek yang relevan dengan kebutuhan Anda. Perhatikan bukan cuma tampilannya, tapi **hasilnya** — apakah membantu bisnis klien sebelumnya? Lihat contoh karya kami di bagian [Portofolio](/#portfolio).

## 2. Kepemilikan kode (hindari vendor lock-in)
Tanyakan: apakah kode dan dokumentasi menjadi milik Anda? Banyak vendor "menyandera" proyek sehingga Anda terpaksa terus bergantung. Di AFSS, **kode 100% milik klien** — tim mana pun bisa melanjutkannya.

## 3. Transparansi harga & timeline
Software house yang baik memberi ruang lingkup, harga, dan timeline yang jelas **di depan**, tanpa biaya tersembunyi. Jika estimasi terlalu kabur atau terlalu murah untuk dipercaya, hati-hati.

## 4. Teknologi yang dipakai
Stack modern (lihat [teknologi kami](/#tech)) memengaruhi kecepatan, keamanan, dan kemudahan pengembangan ke depan. Hindari teknologi usang yang sulit dirawat.

## 5. SEO & performa sejak awal
Website yang tidak bisa ditemukan di Google sama saja tidak ada. Pastikan vendor membangun situs yang **cepat dan SEO-ready**, bukan menambahkannya belakangan sebagai "biaya ekstra".

## 6. Komunikasi & dukungan
Seberapa responsif mereka? Apakah ada laporan progres berkala? Partner lokal dengan komunikasi cepat dan tanpa beda zona waktu sangat memudahkan koordinasi.

## 7. Garansi & maintenance
Peluncuran bukan akhir. Tanyakan soal masa garansi bug dan paket [maintenance](/#services): monitoring, update keamanan, dan backup berkala.

## Kesimpulan

Pilih partner yang transparan, menyerahkan kepemilikan kode, dan benar-benar memahami tujuan bisnis Anda — bukan sekadar mengejar transaksi. Punya pertanyaan? Cek [FAQ](/#faq) kami atau langsung [konsultasi gratis](/#pricing).
`,
  },
  {
    slug: 'website-custom-vs-template',
    title: 'Website Custom vs Template: Mana yang Tepat untuk Bisnis Anda?',
    description:
      'Perbandingan website custom vs template — biaya, kecepatan, SEO, fleksibilitas, dan kapan sebaiknya memilih masing-masing.',
    date: '2026-06-14',
    readMinutes: 6,
    tags: ['Website', 'Perbandingan'],
    c: '#2BB3A3',
    c2: '#0E8C86',
    excerpt:
      'Template lebih murah dan cepat, custom lebih fleksibel dan unik. Mana yang sebaiknya Anda pilih?',
    body: `
Saat membuat website, Anda akan dihadapkan pada dua pilihan: pakai **template jadi** atau bangun **custom dari nol**. Keduanya valid — yang penting cocok dengan tujuan dan anggaran Anda. Mari bandingkan.

## Apa bedanya?

**Template** adalah desain siap pakai yang tinggal diisi konten. **Custom** dibangun khusus sesuai brand, kebutuhan, dan alur bisnis Anda — mulai dari desain hingga fungsionalitas.

## Template: cepat & murah, tapi terbatas

Kelebihan:

- **Murah** dan cepat diluncurkan.
- Cocok untuk kebutuhan sederhana atau uji pasar.

Kekurangan:

- Tampilan sering "kembar" dengan ribuan situs lain.
- Sulit dikustomisasi saat kebutuhan berkembang.
- Banyak kode bawaan yang tidak terpakai → bisa memperlambat situs dan menurunkan skor SEO.

## Custom: investasi yang tumbuh bersama Anda

Kelebihan:

- **Unik** dan sesuai identitas brand.
- Dibangun **cepat & SEO-ready** sejak awal (tanpa beban kode template).
- Fleksibel — fitur bisa ditambah seiring bisnis berkembang.
- Kode menjadi **milik Anda** sepenuhnya.

Kekurangan:

- Investasi awal lebih besar dan butuh waktu pengerjaan lebih lama. Lihat kisaran biayanya di artikel [biaya pembuatan website](/blog/biaya-pembuatan-website).

## Jadi, mana yang sebaiknya dipilih?

- **Pilih template** jika anggaran sangat terbatas, kebutuhan sederhana, dan Anda hanya ingin "hadir" online secepatnya.
- **Pilih custom** jika website adalah aset bisnis serius yang harus mendatangkan pelanggan, mencerminkan brand, dan berkembang ke depan.

Di AFSS, kami fokus pada [pembuatan website custom](/#services) yang cepat dan SEO-ready — bukan template pasaran. [Konsultasi gratis](/#pricing) untuk cari tahu mana yang paling tepat untuk Anda.
`,
  },
  {
    slug: 'website-seo-friendly',
    title: 'Kenapa Website Bisnis Harus SEO-Friendly Sejak Awal',
    description:
      'Website yang tidak SEO-friendly = tidak ditemukan di Google. Pelajari elemen website SEO-friendly dan kenapa harus dibangun sejak awal.',
    date: '2026-06-10',
    readMinutes: 6,
    tags: ['SEO', 'Website'],
    c: '#0E8C86',
    c2: '#1E88A8',
    excerpt:
      'Website cantik tapi tidak muncul di Google sama saja tidak ada. Inilah kenapa SEO harus dibangun sejak awal.',
    body: `
Website yang bagus tapi tidak bisa ditemukan di Google ibarat toko mewah di gang buntu. **SEO (Search Engine Optimization)** memastikan calon pelanggan menemukan Anda saat mencari "jasa pembuatan website", "software house", atau layanan Anda.

## Apa itu website SEO-friendly?

Website yang dirancang agar mudah dipahami mesin pencari dan nyaman bagi pengguna. Ini bukan trik — ini fondasi teknis dan konten yang benar.

## Elemen utama website SEO-friendly

### 1. Cepat (Core Web Vitals)
Google memprioritaskan situs yang cepat. Skor Core Web Vitals yang baik (LCP, CLS, INP) meningkatkan peringkat sekaligus pengalaman pengguna.

### 2. Struktur & konten yang jelas
Satu H1 per halaman, hierarki heading yang rapi, dan konten yang menjawab kebutuhan pencari. Inilah peran [blog](/blog) — menarget banyak kata kunci turunan.

### 3. Meta & data terstruktur
Title dan meta description yang relevan, plus schema markup (JSON-LD) agar tampil lebih menonjol di hasil pencarian.

### 4. Mobile-friendly
Mayoritas trafik di Indonesia dari ponsel. Google memakai indeks mobile-first.

### 5. Bisa di-crawl
Konten harus muncul di HTML (bukan hanya setelah JavaScript jalan), plus sitemap.xml dan robots.txt yang benar.

## Kenapa harus sejak awal?

Menambahkan SEO setelah website jadi sering kali mahal dan tambal-sulam. Membangun **SEO-ready sejak awal** jauh lebih hemat dan efektif — ini salah satu prinsip kerja kami, dan salah satu hal yang sebaiknya Anda tanyakan saat [memilih software house](/blog/cara-memilih-software-house).

## Kesimpulan

SEO bukan biaya tambahan, tapi bagian dari membangun website yang benar. Ingin website yang cepat dan SEO-ready? Lihat [layanan kami](/#services) atau [konsultasi gratis](/#pricing).
`,
  },
  {
    slug: 'apa-itu-erp',
    title: 'Apa Itu ERP? Panduan Sistem ERP untuk Perusahaan di Indonesia',
    description:
      'Penjelasan sederhana tentang sistem ERP, modul-modulnya, tanda bisnis Anda membutuhkan ERP, dan pilihan ERP custom vs paket.',
    date: '2026-06-09',
    readMinutes: 7,
    tags: ['ERP', 'Sistem'],
    c: '#15243B',
    c2: '#0E8C86',
    excerpt:
      'ERP menyatukan keuangan, inventory, dan HR dalam satu sistem. Apakah bisnis Anda sudah membutuhkannya?',
    body: `
Seiring bisnis tumbuh, data tersebar di mana-mana: stok di Excel, keuangan di buku, absensi di aplikasi lain. **ERP (Enterprise Resource Planning)** menyatukan semuanya dalam satu sistem terintegrasi.

## Apa itu ERP?

ERP adalah sistem yang mengelola dan menghubungkan proses inti bisnis — keuangan, persediaan, pembelian, penjualan, hingga SDM — sehingga semua data mengalir di satu tempat dan laporan jadi real-time.

## Modul yang umum ada di ERP

- **Keuangan & Akuntansi** — pencatatan, laporan laba rugi, neraca.
- **Inventory / Persediaan** — stok masuk-keluar, multi-gudang.
- **Pembelian & Penjualan** — purchase order, invoice, pelanggan.
- **HR & Payroll** — data karyawan, absensi, penggajian.
- **Laporan** — dashboard dan analitik lintas departemen.

## Tanda bisnis Anda butuh ERP

- Data tersebar di banyak file/aplikasi dan sering tidak sinkron.
- Laporan bulanan makan waktu berhari-hari.
- Sering terjadi kesalahan input manual.
- Tim kesulitan melihat kondisi bisnis secara real-time.

Jika beberapa poin di atas terasa familier, ERP bisa menghemat waktu operasional Anda secara drastis.

## ERP paket vs ERP custom

**ERP paket** (siap pakai) cepat dipasang tapi sering tidak pas dengan alur bisnis Anda. **ERP custom** dibangun sesuai proses nyata perusahaan — lebih pas, dan kodenya milik Anda. Untuk memutuskan, pertimbangkan kompleksitas dan keunikan alur bisnis Anda — mirip pertimbangan [website custom vs template](/blog/website-custom-vs-template).

## Mulai dari yang Anda butuhkan

Tidak harus langsung lengkap. Kami biasa membangun ERP secara bertahap, mulai dari modul paling mendesak. Lihat [layanan pengembangan sistem kami](/#services) atau [minta penawaran](/#pricing).
`,
  },
  {
    slug: 'tips-meningkatkan-konversi-landing-page',
    title: '7 Tips Meningkatkan Konversi Landing Page',
    description:
      'Tujuh tips praktis meningkatkan konversi landing page — dari headline, CTA, bukti sosial, hingga kecepatan dan mobile.',
    date: '2026-06-08',
    readMinutes: 6,
    tags: ['Landing Page', 'Konversi'],
    c: '#1E88A8',
    c2: '#15243B',
    excerpt:
      'Trafik banyak tapi sedikit yang menghubungi? Tujuh tips ini membantu landing page Anda mengubah pengunjung jadi pelanggan.',
    body: `
Landing page yang baik bukan yang paling cantik, tapi yang paling banyak **mengubah pengunjung menjadi pelanggan**. Berikut tujuh tips yang terbukti meningkatkan konversi.

## 1. Headline yang jelas & spesifik
Pengunjung memutuskan dalam hitungan detik. Sampaikan manfaat utama secara jelas — bukan slogan kabur.

## 2. Satu tujuan, satu CTA utama
Fokuskan pada satu aksi (mis. "Konsultasi Gratis"). Terlalu banyak pilihan membingungkan dan menurunkan konversi.

## 3. Tonjolkan manfaat, bukan fitur
Pengunjung peduli pada hasil bagi mereka, bukan daftar fitur teknis. Ubah "punya dashboard" menjadi "lihat performa bisnis real-time".

## 4. Bukti sosial
Testimoni, jumlah klien, dan logo perusahaan meningkatkan kepercayaan. Orang cenderung mengikuti pilihan orang lain.

## 5. Kurangi gesekan pada form
Minta data seperlunya. Form pendek + opsi kontak via WhatsApp menurunkan hambatan untuk menghubungi Anda.

## 6. Cepat & mobile-friendly
Halaman lambat membunuh konversi. Pastikan ringan dan nyaman di ponsel — ini juga baik untuk SEO, seperti dibahas di [website SEO-friendly](/blog/website-seo-friendly).

## 7. Hilangkan keraguan
Sertakan FAQ, garansi, atau transparansi harga untuk menjawab keberatan sebelum muncul.

## Kesimpulan

Konversi adalah hasil dari kejelasan, kepercayaan, dan kemudahan. Ingin landing page yang dirancang untuk konversi? Lihat [layanan kami](/#services) atau [konsultasi gratis](/#pricing).
`,
  },
]

export const getAllPosts = () =>
  [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))

export const getPost = (slug) => posts.find((p) => p.slug === slug)

export const formatDateId = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
