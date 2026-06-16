// ── Blog posts (Bahasa Indonesia, target keyword SEO) ──────
// Tambah post baru = tambahkan objek ke array ini + entri di public/sitemap.xml.
// Body ditulis dalam Markdown (dirender via `marked`).

export const SITE_URL = 'https://afss.tech'

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

Lihat rincian paket kami di halaman [Paket Harga](/harga) untuk perbandingan yang lebih konkret.

## Faktor yang memengaruhi harga

Dua website dengan tampilan mirip bisa berbeda harga jauh. Inilah penyebabnya:

### 1. Custom vs template
Template murah dan cepat, tapi terbatas dan sering "kembar" dengan situs lain. Website [custom](/layanan) dibangun sesuai brand dan kebutuhan Anda — investasinya lebih besar, tapi hasilnya unik dan fleksibel.

### 2. Jumlah & kompleksitas fitur
Form kontak sederhana berbeda dengan sistem pembayaran, multi-bahasa, atau integrasi WhatsApp dan API pihak ketiga. Semakin banyak logika, semakin besar effort.

### 3. Desain & UX
Desain yang dipikirkan matang (riset, prototype, design system) meningkatkan konversi — dan memang menambah biaya dibanding sekadar "asal jadi".

### 4. SEO & performa
Website yang dibangun **SEO-ready** dan cepat (skor Core Web Vitals tinggi) lebih mudah ditemukan di Google. Ini bukan biaya tambahan di tempat kami — kami bangun seperti itu sejak awal.

## Kenapa "murah" belum tentu hemat

Website Rp 500 ribu yang lambat, tidak bisa di-update, dan tidak muncul di Google justru membuang uang. Yang penting bukan harga termurah, tapi **nilai per rupiah**: apakah website itu mendatangkan pelanggan, mudah dirawat, dan kodenya jadi milik Anda?

Di AFSS, seluruh kode dan dokumentasi menjadi milik klien sepenuhnya — tanpa vendor lock-in. Pertanyaan umum lain soal harga dan timeline kami jawab di bagian [FAQ](/faq).

## Cara mendapat estimasi yang akurat

Angka pasti hanya bisa diberikan setelah kebutuhan jelas. Prosesnya singkat: ceritakan tujuan bisnis Anda, kami bantu rumuskan ruang lingkup, lalu beri proposal dengan harga dan timeline yang transparan — tanpa biaya tersembunyi.

**Siap mulai?** [Konsultasi gratis lewat WhatsApp](/harga), tanpa komitmen.
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

Durasi juga dipengaruhi pilihan teknologi. Pendekatan **cross-platform** seperti Flutter memungkinkan satu basis kode untuk Android & iOS sekaligus — lebih cepat dan hemat dibanding membangun dua aplikasi native terpisah. Lihat [layanan aplikasi mobile kami](/layanan).

## Tahapan yang dilalui

Waktu pengerjaan terbagi ke beberapa fase — ini sama dengan [proses kerja](/tentang) kami:

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

Ingin tahu estimasi untuk ide aplikasi Anda? Lihat detail di [jasa pembuatan aplikasi mobile kami](/layanan/aplikasi-mobile) atau [konsultasikan gratis](/harga) — kami beri timeline yang realistis, bukan janji manis.
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
Minta contoh proyek yang relevan dengan kebutuhan Anda. Perhatikan bukan cuma tampilannya, tapi **hasilnya** — apakah membantu bisnis klien sebelumnya? Lihat contoh karya kami di bagian [Portofolio](/portofolio).

## 2. Kepemilikan kode (hindari vendor lock-in)
Tanyakan: apakah kode dan dokumentasi menjadi milik Anda? Banyak vendor "menyandera" proyek sehingga Anda terpaksa terus bergantung. Di AFSS, **kode 100% milik klien** — tim mana pun bisa melanjutkannya.

## 3. Transparansi harga & timeline
Software house yang baik memberi ruang lingkup, harga, dan timeline yang jelas **di depan**, tanpa biaya tersembunyi. Jika estimasi terlalu kabur atau terlalu murah untuk dipercaya, hati-hati.

## 4. Teknologi yang dipakai
Stack modern (lihat [teknologi kami](/keunggulan)) memengaruhi kecepatan, keamanan, dan kemudahan pengembangan ke depan. Hindari teknologi usang yang sulit dirawat.

## 5. SEO & performa sejak awal
Website yang tidak bisa ditemukan di Google sama saja tidak ada. Pastikan vendor membangun situs yang **cepat dan SEO-ready**, bukan menambahkannya belakangan sebagai "biaya ekstra".

## 6. Komunikasi & dukungan
Seberapa responsif mereka? Apakah ada laporan progres berkala? Partner lokal dengan komunikasi cepat dan tanpa beda zona waktu sangat memudahkan koordinasi.

## 7. Garansi & maintenance
Peluncuran bukan akhir. Tanyakan soal masa garansi bug dan paket [maintenance](/layanan): monitoring, update keamanan, dan backup berkala.

## Kesimpulan

Pilih partner yang transparan, menyerahkan kepemilikan kode, dan benar-benar memahami tujuan bisnis Anda — bukan sekadar mengejar transaksi. Berbasis di Medan? AFSS adalah [software house lokal Sumatera Utara](/layanan/jasa-pembuatan-website-medan) yang bisa konsultasi tatap muka. Punya pertanyaan? Cek [FAQ](/faq) kami atau langsung [konsultasi gratis](/harga).
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

Di AFSS, kami fokus pada [pembuatan website custom](/layanan) yang cepat dan SEO-ready — bukan template pasaran. [Konsultasi gratis](/harga) untuk cari tahu mana yang paling tepat untuk Anda.
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

SEO bukan biaya tambahan, tapi bagian dari membangun website yang benar. Ingin website yang cepat dan SEO-ready? Lihat [layanan kami](/layanan) atau [konsultasi gratis](/harga).
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

Tidak harus langsung lengkap. Kami biasa membangun ERP secara bertahap, mulai dari modul paling mendesak. Lihat [jasa pembuatan ERP custom kami](/layanan/jasa-pembuatan-erp) atau [minta penawaran](/harga).
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

Konversi adalah hasil dari kejelasan, kepercayaan, dan kemudahan. Ingin landing page yang dirancang untuk konversi? Lihat [jasa pembuatan landing page kami](/layanan/jasa-pembuatan-landing-page) atau [konsultasi gratis](/harga).
`,
  },
  {
    slug: 'beda-website-webapp-aplikasi-mobile',
    title: 'Beda Website, Web App, dan Aplikasi Mobile — Mana yang Anda Butuhkan?',
    description:
      'Penjelasan sederhana perbedaan website, web app, dan aplikasi mobile, beserta kapan sebaiknya bisnis memilih masing-masing.',
    date: '2026-06-07',
    readMinutes: 6,
    tags: ['Website', 'Web App'],
    c: '#0E8C86',
    c2: '#15243B',
    excerpt:
      'Istilah ini sering tertukar. Pahami bedanya agar Anda tidak salah investasi membangun produk digital.',
    body: `
"Saya butuh website atau aplikasi?" — pertanyaan ini sering muncul, dan jawabannya tergantung apa yang ingin Anda capai. Mari perjelas tiga istilah yang kerap tertukar.

## Website
Halaman yang diakses lewat browser untuk **menyampaikan informasi**: company profile, landing page, blog, atau katalog. Fokusnya konten dan ditemukan di Google. Kalau tujuan utama Anda "hadir online dan mendatangkan calon pelanggan", inilah yang Anda butuhkan. Lihat [layanan pembuatan website](/layanan).

## Web App (aplikasi berbasis web)
Aplikasi yang juga dibuka lewat browser, tapi **interaktif dan punya logika**: login, dashboard, manajemen data, laporan. Contohnya sistem kasir, CRM, atau [ERP](/blog/apa-itu-erp). Cocok saat Anda perlu *mengelola* sesuatu, bukan sekadar menampilkan informasi.

## Aplikasi Mobile
Aplikasi yang dipasang di ponsel (Android/iOS) lewat store. Unggul untuk **penggunaan rutin**, notifikasi push, fitur perangkat (kamera, GPS), dan pengalaman yang lebih cepat. Soal waktu pengerjaannya, baca [berapa lama pembuatan aplikasi mobile](/blog/lama-pembuatan-aplikasi-mobile).

## Mana yang sebaiknya dipilih?

- **Butuh dikenal & mendatangkan leads** → [Website atau landing page](/layanan/pembuatan-website).
- **Butuh mengelola operasional / data** → [Web app atau dashboard bisnis](/layanan/jasa-pembuatan-dashboard).
- **Butuh dipakai pengguna secara rutin di ponsel** → [Aplikasi mobile](/layanan/aplikasi-mobile).

Sering kali bisnis butuh kombinasi — misalnya website untuk marketing + [web app](/layanan/web-app) untuk operasional internal. Bingung menentukan? [Konsultasi gratis](/harga), kami bantu petakan kebutuhan Anda.
`,
  },
  {
    slug: 'company-profile-website',
    title: 'Apa Itu Company Profile Website dan Kenapa Bisnis Butuh?',
    description:
      'Company profile website membangun kredibilitas bisnis di mata calon klien. Pelajari isinya, manfaatnya, dan tips membuatnya efektif.',
    date: '2026-06-06',
    readMinutes: 5,
    tags: ['Website', 'Bisnis'],
    c: '#15243B',
    c2: '#1E88A8',
    excerpt:
      'Di era digital, calon klien mengecek perusahaan Anda online sebelum memutuskan. Inilah peran company profile website.',
    body: `
Sebelum bekerja sama, calon klien hampir pasti mencari perusahaan Anda di Google. Jika yang muncul cuma akun media sosial atau bahkan nihil, kredibilitas Anda dipertaruhkan. Di sinilah **company profile website** berperan.

## Apa itu company profile website?

Website resmi yang memperkenalkan perusahaan Anda secara profesional: siapa Anda, apa layanan/produk Anda, portofolio, dan cara menghubungi. Ini "kartu nama digital" yang aktif 24/7.

## Isi yang sebaiknya ada

- **Beranda** dengan value proposition yang jelas.
- **Tentang kami** — visi, misi, dan kredibilitas.
- **Layanan / produk** — kaya kata kunci untuk SEO.
- **Portofolio / studi kasus** — bukti nyata hasil kerja.
- **Testimoni** — kepercayaan dari klien.
- **Kontak & lokasi** (NAP) — penting untuk SEO lokal.

## Manfaat untuk bisnis

- **Kredibilitas** — terlihat serius dan terpercaya.
- **Ditemukan di Google** — jika dibangun [SEO-friendly sejak awal](/blog/website-seo-friendly).
- **Aset milik sendiri** — tidak bergantung pada algoritma media sosial.
- **Buka 24 jam** — calon klien bisa mengenal Anda kapan saja.

## Tips agar efektif

Jangan sekadar "ada". Pastikan cepat, mobile-friendly, jelas CTA-nya, dan dibangun custom sesuai brand — bukan template pasaran (baca [custom vs template](/blog/website-custom-vs-template)).

Ingin company profile yang profesional dan SEO-ready? Lihat [jasa pembuatan company profile website kami](/layanan/jasa-pembuatan-company-profile) atau cek [paket harga](/harga). Bisnis di Medan? Kami juga melayani [klien lokal Sumatera Utara](/layanan/jasa-pembuatan-website-medan).
`,
  },
  {
    slug: 'pentingnya-maintenance-website',
    title: 'Maintenance Website: Kenapa Penting dan Apa Saja yang Dikerjakan',
    description:
      'Website bukan proyek sekali jadi. Pahami kenapa maintenance website penting dan apa saja yang dikerjakan agar situs tetap aman dan cepat.',
    date: '2026-06-05',
    readMinutes: 5,
    tags: ['Maintenance', 'Website'],
    c: '#2BB3A3',
    c2: '#0B6E69',
    excerpt:
      'Peluncuran bukan akhir. Tanpa maintenance, website bisa lambat, rentan diretas, dan ketinggalan zaman.',
    body: `
Banyak yang mengira website selesai setelah diluncurkan. Padahal seperti kendaraan, website butuh perawatan agar tetap **aman, cepat, dan relevan**. Tanpa maintenance, risikonya nyata: diretas, error, atau ditinggalkan pengunjung.

## Kenapa maintenance penting?

- **Keamanan** — celah keamanan baru muncul terus; update menutupnya.
- **Performa** — situs yang dirawat tetap cepat (baik untuk SEO & pengguna).
- **Kompatibilitas** — browser dan perangkat terus berubah.
- **Ketersediaan** — monitoring memastikan situs tidak down tanpa Anda sadari.

## Apa saja yang dikerjakan?

- **Update keamanan** rutin pada sistem dan dependensi.
- **Backup berkala** agar data aman bila terjadi masalah.
- **Monitoring uptime** dan perbaikan cepat saat ada gangguan.
- **Perbaikan bug** dan penyesuaian kecil.
- **Pembaruan konten** ringan bila diperlukan.

## Berapa biayanya?

Biasanya berupa paket bulanan/tahunan sesuai cakupan. Jauh lebih murah dibanding kerugian akibat situs diretas atau down saat momen penting.

Saat [memilih software house](/blog/cara-memilih-software-house), pastikan tanyakan soal garansi dan paket maintenance. Di AFSS, [Maintenance & Support](/layanan) tersedia untuk menjaga sistem Anda tetap prima. Butuh info lebih lanjut? [Konsultasi gratis](/harga).
`,
  },
  {
    slug: 'jasa-toko-online',
    title: 'Jasa Pembuatan Toko Online: Panduan Lengkap untuk Bisnis di Indonesia 2026',
    description:
      'Panduan memilih jasa pembuatan toko online di Indonesia 2026 — fitur wajib, perbandingan platform vs custom, kisaran biaya, dan tips sukses berjualan online.',
    date: '2026-06-15',
    readMinutes: 7,
    tags: ['Toko Online', 'E-Commerce'],
    c: '#0E5E78',
    c2: '#0E8C86',
    excerpt:
      'Bisnis Anda siap berjualan online? Panduan ini membantu memilih jasa pembuatan toko online yang tepat — dari fitur, platform, hingga biaya.',
    body: `
Di Indonesia, nilai transaksi e-commerce terus tumbuh setiap tahun. Konsumen kini terbiasa berbelanja dari ponsel kapan saja. Artinya, **toko online bukan lagi keunggulan kompetitif — melainkan kebutuhan dasar** bagi bisnis yang ingin bertahan dan berkembang.

## Apa itu toko online (e-commerce)?

Toko online adalah website yang memungkinkan pelanggan **menelusuri produk, memesan, dan membayar** secara langsung — 24 jam sehari, tanpa batas geografis. Berbeda dengan marketplace (Tokopedia, Shopee), toko online milik sendiri memberi Anda kendali penuh atas brand, data pelanggan, dan margin keuntungan.

## Fitur wajib toko online yang efektif

Tidak semua toko online sama. Ini fitur yang sebaiknya ada sejak awal:

- **Katalog produk** — filter kategori, varian, stok, dan galeri foto.
- **Keranjang & checkout** — alur yang ringkas menurunkan abandonment rate.
- **Pembayaran otomatis** — integrasi payment gateway (Midtrans, Xendit, dll.) dan QRIS.
- **Manajemen pesanan** — notifikasi otomatis ke penjual dan pembeli.
- **Dashboard penjual** — laporan penjualan, stok, dan performa real-time.
- **SEO-ready** — URL bersih, meta per produk, schema markup — agar toko muncul di Google. Lihat [kenapa SEO harus dibangun sejak awal](/blog/website-seo-friendly).
- **Mobile-first** — mayoritas pembeli Indonesia berbelanja via ponsel.

## Platform siap pakai vs toko online custom

Dua pendekatan umum:

### Platform / SaaS (Shopify, WooCommerce, dll.)
- Cepat dipasang, biaya awal rendah.
- Fitur terbatas; biaya langganan bulanan terus berjalan.
- Tampilan sering mirip toko lain dan sulit dikustomisasi penuh.
- Data dan kode bukan milik Anda sepenuhnya — mirip dilema [website custom vs template](/blog/website-custom-vs-template).

### Toko online custom
- Dibangun sesuai alur bisnis dan brand Anda.
- Fitur bisa berkembang (multi-cabang, loyalty poin, integrasi ERP, dll.).
- **Kode milik Anda** — tidak ada biaya langganan vendor yang terus naik.
- Cocok untuk bisnis yang serius membangun aset digital jangka panjang.

## Kisaran biaya pembuatan toko online

Harga bergantung pada fitur dan kompleksitas:

- **Toko sederhana** (katalog + checkout dasar) — mulai **Rp 3–5 juta**.
- **Toko menengah** (payment gateway, manajemen stok, dashboard) — **Rp 6–15 juta**.
- **Toko kompleks** (multi-vendor, integrasi ERP, aplikasi mobile) — **mulai Rp 20 juta ke atas**.

Untuk perbandingan yang lebih rinci, baca [panduan biaya pembuatan website](/blog/biaya-pembuatan-website).

## Tips sukses membangun toko online

1. **Mulai dari MVP** — rilis fitur inti dulu, kembangkan bertahap berdasarkan data nyata.
2. **Foto produk berkualitas** — visual adalah daya jual utama di dunia online.
3. **Deskripsi produk SEO-friendly** — bantu calon pembeli menemukan produk Anda di Google.
4. **Checkout yang cepat dan mudah** — setiap langkah ekstra meningkatkan risiko pelanggan kabur.
5. **Pilih partner terpercaya** — pastikan kode jadi milik Anda dan ada dukungan pasca peluncuran. Lihat [cara memilih software house](/blog/cara-memilih-software-house).

## Siap mulai toko online Anda?

AFSS membangun toko online custom yang SEO-ready, cepat, dan skalabel — dengan kode yang 100% menjadi milik Anda. Dari katalog sederhana hingga platform marketplace multi-penjual. Lihat detail di [jasa pembuatan toko online kami](/layanan/jasa-pembuatan-toko-online) atau [konsultasi gratis lewat WhatsApp](/harga).
`,
  },
  {
    slug: 'transformasi-digital-bisnis',
    title: 'Transformasi Digital: Panduan Lengkap untuk Bisnis di Indonesia 2026',
    description:
      'Transformasi digital bukan sekadar tren — ini keharusan bisnis di 2026. Pelajari apa itu transformasi digital, manfaatnya, dan langkah konkret memulainya dengan website, aplikasi, dan ERP.',
    date: '2026-06-15',
    readMinutes: 9,
    tags: ['Transformasi Digital', 'Bisnis', 'Teknologi'],
    c: '#0E2A4A',
    c2: '#0E8C86',
    excerpt:
      'Bisnis yang belum bertransformasi digital akan tertinggal. Panduan ini menjelaskan langkah nyata — dari website hingga ERP — untuk memulai transformasi Anda.',
    body: `
Istilah **transformasi digital** terdengar besar dan mahal. Tapi inti sederhananya adalah: menggunakan teknologi untuk membuat bisnis bekerja lebih cepat, lebih efisien, dan lebih mudah berkembang. Di 2026, bukan lagi soal "apakah" perlu bertransformasi — tapi **bagaimana** dan **mulai dari mana**.

## Apa itu transformasi digital?

Transformasi digital bukan sekadar punya website atau akun media sosial. Ini adalah perubahan mendasar dalam cara bisnis beroperasi — menggantikan proses manual dan terfragmentasi dengan sistem digital yang terintegrasi.

Contoh konkretnya:
- Penjualan dicatat di Excel → digantikan sistem **CRM atau ERP otomatis**.
- Promosi hanya dari mulut ke mulut → ditambah dengan **website + SEO** yang mendatangkan pelanggan baru 24/7.
- Laporan keuangan dibuat manual setiap bulan → menjadi **dashboard real-time** yang bisa diakses kapan saja.
- Pelanggan menghubungi via SMS → ditangani oleh **aplikasi mobile atau web app** dengan notifikasi terintegrasi.

Transformasi digital bisa berlangsung bertahap — tidak harus sekaligus.

## Mengapa transformasi digital penting di 2026?

### 1. Konsumen sudah digital
Riset menunjukkan mayoritas konsumen Indonesia meneliti produk/jasa secara online sebelum membeli — baik lewat Google, media sosial, maupun marketplace. Bisnis yang tidak hadir secara digital kehilangan potensi pelanggan ini setiap hari.

### 2. Efisiensi operasional
Proses manual — entri data, laporan bulanan, rekap stok — menyita waktu dan rentan kesalahan. Sistem digital memangkas waktu ini drastis. Tim bisa fokus pada hal yang benar-benar bernilai.

### 3. Data sebagai aset
Bisnis digital mengumpulkan data: siapa pelanggannya, produk apa yang laris, kapan trafik puncak. Data ini jadi bahan pengambilan keputusan yang jauh lebih tajam dibanding intuisi semata.

### 4. Skalabilitas
Sistem digital bisa melayani 10 pelanggan dan 10.000 pelanggan dengan infrastruktur yang sama. Pertumbuhan tidak lagi menuntut penambahan SDM secara linier.

### 5. Ketahanan bisnis
Pandemi membuktikan: bisnis dengan sistem digital (penjualan online, tim kerja jarak jauh, laporan berbasis cloud) jauh lebih tahan terhadap gangguan eksternal.

## Tiga pilar transformasi digital untuk bisnis

### Pilar 1 — Kehadiran Online (Website & SEO)

Langkah pertama transformasi digital hampir selalu dimulai dari sini: **website resmi yang bisa ditemukan di Google**.

Website bukan sekadar kartu nama digital. Website yang dibangun dengan benar:
- Muncul di halaman pertama Google saat calon pelanggan mencari layanan Anda ([SEO-friendly sejak awal](/blog/website-seo-friendly)).
- Aktif 24 jam — menjawab pertanyaan, menampilkan portofolio, dan mendorong calon pelanggan untuk menghubungi Anda.
- Membangun kredibilitas yang sulit diperoleh dari media sosial saja (baca [kenapa UMKM wajib punya website](/blog/website-untuk-umkm)).

Untuk bisnis yang juga menjual produk secara online, langkah berikutnya adalah [toko online](/blog/jasa-toko-online) — platform e-commerce milik sendiri yang tidak bergantung pada fee marketplace.

### Pilar 2 — Otomasi Operasional (Web App & Aplikasi Mobile)

Setelah hadir online, langkah berikutnya adalah **mengotomasi proses internal**. Di sinilah peran web app dan aplikasi mobile.

**Web app** (aplikasi berbasis browser) cocok untuk:
- Manajemen pesanan dan inventori.
- CRM — database pelanggan, riwayat transaksi, pipeline penjualan.
- Dashboard laporan real-time lintas departemen.
- Portal khusus klien atau mitra.

**Aplikasi mobile** cocok saat tim atau pelanggan Anda perlu akses dari ponsel secara intensif — misalnya aplikasi untuk tim sales di lapangan, kurir, atau pelanggan yang ingin melacak pesanan. Soal estimasi waktunya, baca [berapa lama membuat aplikasi mobile](/blog/lama-pembuatan-aplikasi-mobile).

Perbedaan ketiganya — website, web app, dan aplikasi mobile — kami uraikan lebih detail di [artikel ini](/blog/beda-website-webapp-aplikasi-mobile).

### Pilar 3 — Integrasi Data (ERP & Sistem Terpadu)

Untuk bisnis yang sudah berkembang, tantangannya bergeser: bukan lagi soal "hadir online", tapi soal **data yang tidak tersinkron** antar departemen.

Di sinilah **ERP (Enterprise Resource Planning)** berperan. ERP menyatukan keuangan, persediaan, penjualan, pembelian, dan HR dalam satu sistem — sehingga tidak ada lagi data yang "tersebar di 5 spreadsheet berbeda". Semua keputusan berbasis data yang sama dan terkini. Kami bahas detail ERP di [artikel khusus ERP](/blog/apa-itu-erp).

## Langkah konkret memulai transformasi digital

Transformasi digital tidak harus sekaligus besar. Ini urutan yang realistis:

**Tahap 1 — Fondasi online (1–4 minggu)**
- Buat website profesional yang SEO-friendly.
- Pastikan ada halaman layanan, portofolio, kontak, dan call to action yang jelas.
- Mulai konten blog untuk menarget kata kunci di Google.

**Tahap 2 — Aktifkan penjualan digital (4–8 minggu)**
- Tambahkan toko online jika menjual produk.
- Integrasikan payment gateway (Midtrans, Xendit, QRIS).
- Pasang analytics untuk memantau performa.

**Tahap 3 — Otomasi operasional (2–6 bulan)**
- Bangun web app untuk manajemen pesanan, pelanggan, atau inventori.
- Buat aplikasi mobile jika tim atau pelanggan butuh akses dari ponsel.
- Integrasikan notifikasi otomatis (email, WhatsApp).

**Tahap 4 — Integrasi penuh (6–12 bulan)**
- Implementasi ERP untuk menyatukan data lintas departemen.
- Bangun dashboard eksekutif untuk pemantauan bisnis real-time.
- Otomasi laporan keuangan, payroll, dan rekonsiliasi.

## Jebakan yang harus dihindari

### Jangan pilih vendor yang "mengunci" Anda
Beberapa vendor membangun sistem dengan kode yang tidak bisa Anda miliki — sehingga Anda terpaksa membayar maintenance ke mereka selamanya. Saat [memilih software house](/blog/cara-memilih-software-house), pastikan **kode menjadi milik Anda sepenuhnya**.

### Jangan transformasi semua sekaligus
Scope terlalu besar sekaligus meningkatkan risiko proyek gagal atau molor. Mulai dari pilar yang paling berdampak untuk bisnis Anda — biasanya website dan satu sistem internal.

### Jangan abaikan pelatihan tim
Sistem terbaik pun tidak berguna jika tim tidak tahu menggunakannya. Pastikan ada sesi onboarding dan dokumentasi yang memadai.

### Jangan lupa maintenance
Website dan sistem digital butuh perawatan berkala: update keamanan, backup, monitoring uptime. Ini bukan biaya ekstra — ini investasi untuk menjaga sistem tetap aman dan berjalan optimal. Baca lebih lanjut tentang [pentingnya maintenance website](/blog/pentingnya-maintenance-website).

## Berapa investasi yang dibutuhkan?

Tidak ada angka pasti karena bergantung pada ruang lingkup. Gambaran kasarnya:

- **Website profesional** — mulai Rp 1 juta hingga beberapa juta, tergantung fitur. Lihat [panduan biaya](/blog/biaya-pembuatan-website).
- **Web app sederhana** — mulai Rp 4–8 juta.
- **Aplikasi mobile** — mulai Rp 8–15 juta untuk MVP.
- **ERP** — sangat bervariasi; dihitung per proyek sesuai modul dan kompleksitas.

Yang terpenting: bandingkan dengan kerugian dari tidak bertransformasi — waktu terbuang, pelanggan yang tidak terjangkau, data yang tidak akurat.

## Kesimpulan

Transformasi digital bukan proyek satu kali selesai — ini perjalanan yang dimulai dengan satu langkah. Mulai dari kehadiran online yang kuat, otomasi proses yang paling menyita waktu, lalu integrasi data seiring bisnis berkembang.

AFSS hadir sebagai partner transformasi digital Anda — dari website, aplikasi mobile, web app, hingga sistem ERP custom. Semua kode milik Anda, semua proses transparan, semua teknologi modern. [Konsultasi gratis lewat WhatsApp](/harga) untuk mulai merancang peta jalan digital bisnis Anda.
`,
  },
  {
    slug: 'website-untuk-umkm',
    title: 'Kenapa UMKM Wajib Punya Website di 2026',
    description:
      'Alasan UMKM perlu punya website di 2026, manfaat konkretnya, dan cara memulai dengan budget terjangkau.',
    date: '2026-06-04',
    readMinutes: 5,
    tags: ['UMKM', 'Website'],
    c: '#1E88A8',
    c2: '#0E8C86',
    excerpt:
      'Media sosial saja tidak cukup. Website memberi UMKM kredibilitas, kontrol, dan peluang ditemukan di Google.',
    body: `
Banyak UMKM mengandalkan media sosial saja. Itu bagus, tapi tidak cukup. Di 2026, **website** memberi keunggulan yang tidak bisa diberikan media sosial — dan biayanya kini sangat terjangkau.

## Kenapa media sosial saja tidak cukup?

- Anda **menumpang** di platform orang lain — algoritma dan aturannya bisa berubah kapan saja.
- Sulit ditemukan lewat **pencarian Google** saat orang mencari produk Anda.
- Kredibilitas terbatas dibanding website resmi.

## Manfaat website untuk UMKM

- **Ditemukan di Google** — muncul saat calon pelanggan mencari produk/jasa Anda.
- **Kredibilitas** — terlihat lebih profesional dan terpercaya.
- **Buka 24 jam** — etalase yang tidak pernah tutup.
- **Aset milik sendiri** — Anda yang pegang kendali penuh.
- **Konversi** — diarahkan untuk mengubah pengunjung jadi pembeli (baca [tips konversi landing page](/blog/tips-meningkatkan-konversi-landing-page)).

## Mulai dari yang terjangkau

Tidak perlu langsung mahal. Sebuah landing page atau company profile sederhana sudah cukup untuk memulai — dan bisa dikembangkan seiring bisnis tumbuh. Cek kisaran [biaya pembuatan website](/blog/biaya-pembuatan-website).

Siap membawa UMKM Anda online dengan benar? Mulai dari [landing page](/layanan/jasa-pembuatan-landing-page) atau [company profile website](/layanan/jasa-pembuatan-company-profile). Berbasis di Medan atau Sumatera Utara? Kami layani [klien lokal dengan konsultasi tatap muka](/layanan/jasa-pembuatan-website-medan). [Konsultasi gratis](/harga), tanpa komitmen.
`,
  },
  {
    slug: 'keamanan-website-cyber-security',
    title: 'Keamanan Website: Langkah Penting Melindungi Bisnis Online Anda',
    description:
      'Panduan keamanan website untuk bisnis — ancaman yang ada, fitur keamanan wajib, dan cara menjaga data pelanggan tetap aman.',
    date: '2026-06-16',
    readMinutes: 8,
    tags: ['Keamanan', 'Website', 'Teknologi'],
    c: '#15243B',
    c2: '#0E5E78',
    excerpt:
      'Website yang diretas atau data pelanggan bocor bisa merusak bisnis Anda. Pahami ancaman umum dan fitur keamanan yang harus ada.',
    body: `
Di era digital, keamanan website bukan lagi pilihan — ini **keharusan**. Satu celah keamanan bisa merugikan bisnis Anda: data hilang, pelanggan tidak percaya, atau bahkan kena denda regulasi. Artikel ini menjelaskan ancaman umum dan bagaimana melindungi website Anda.

## Ancaman keamanan website yang umum

### 1. SQL Injection
Penyerang memasukkan kode SQL berbahaya melalui form input untuk mengakses atau merusak database. **Solusi:** Gunakan prepared statements dan validasi input yang ketat.

### 2. Cross-Site Scripting (XSS)
Kode JavaScript berbahaya dimasukkan ke website untuk mencuri data pengunjung atau merusak tampilan. **Solusi:** Sanitasi semua input pengguna sebelum ditampilkan.

### 3. Brute Force Attack
Penyerang mencoba ribuan kombinasi password untuk masuk ke akun admin. **Solusi:** Gunakan login yang kuat, rate limiting, dan two-factor authentication (2FA).

### 4. DDoS (Distributed Denial of Service)
Website diserang dengan traffic masif sehingga tidak bisa diakses. **Solusi:** Gunakan CDN dan layanan DDoS protection seperti Cloudflare.

### 5. Man-in-the-Middle (MITM)
Penyerang mencuri data yang dikirim antara browser dan server. **Solusi:** Selalu gunakan HTTPS (SSL/TLS encryption).

### 6. Malware & Backdoor
Kode berbahaya dimasukkan ke website yang memungkinkan akses tanpa izin. **Solusi:** Update sistem rutin, gunakan Web Application Firewall (WAF), dan monitoring aktif.

## Fitur keamanan yang wajib ada

### 1. HTTPS / SSL Certificate
Semua komunikasi antara pengguna dan website harus terenkripsi. Tidak ada alasan untuk tidak punya SSL di 2026 — gratisnya sudah tersedia.

### 2. Autentikasi yang Kuat
- Password minimal 12 karakter dengan kombinasi huruf, angka, dan simbol.
- Two-Factor Authentication (2FA) — khususnya untuk akun admin.
- Session timeout otomatis untuk login yang lama.

### 3. Validasi & Sanitasi Input
Semua data dari form harus divalidasi dan dibersihkan sebelum disimpan ke database. Jangan pernah percaya input pengguna.

### 4. Rate Limiting
Batasi jumlah request per IP dalam waktu tertentu untuk mencegah brute force dan DDoS.

### 5. Logging & Monitoring
Catat semua aktivitas login, perubahan data, dan error. Monitor 24/7 untuk mendeteksi aktivitas mencurigakan.

### 6. Backup Berkala
Backup database dan file secara rutin — minimal harian. Simpan di lokasi terpisah dari server utama.

### 7. Update & Patching
Update sistem operasi, framework, dan dependencies secara rutin. Celah keamanan baru terus ditemukan — update adalah pertahanan pertama.

### 8. Web Application Firewall (WAF)
Firewall khusus yang melindungi aplikasi web dari serangan umum — seperti SQL Injection dan XSS. Cloudflare atau ModSecurity adalah contohnya.

## Compliance & Regulasi

Jika website Anda mengelola data pelanggan, Anda mungkin terikat regulasi:

- **GDPR** (Eropa) — melindungi data pribadi EU residents.
- **CCPA** (California) — hak privasi konsumen.
- **PDP Act** (Indonesia) — perlindungan data pribadi pengguna Indonesia.

Pelanggaran bisa mengakibatkan denda besar. Pastikan tanyakan soal compliance saat [memilih software house](/blog/cara-memilih-software-house).

## Langkah konkret menjaga keamanan website

1. **Audit keamanan** — cek website Anda dengan tools seperti OWASP ZAP atau Burp Suite.
2. **Penetration testing** — minta tim keamanan mencoba "hack" website Anda untuk menemukan celah.
3. **Security headers** — implementasikan X-Frame-Options, Content-Security-Policy, dll.
4. **Monitoring aktif** — gunakan layanan monitoring untuk alert kalau ada aktivitas aneh.
5. **Incident response plan** — siapkan rencana jika terjadi serangan (siapa yang dihubungi, langkah apa yang diambil).
6. **Training tim** — ajari tim cara recogn phishing dan praktik keamanan baik.

## Tools & Layanan Keamanan

- **SSL Certificate:** Let's Encrypt (gratis), Sectigo, DigiCert.
- **WAF:** Cloudflare, AWS WAF, ModSecurity.
- **Monitoring:** Uptime Robot, Datadog, New Relic.
- **Backup:** AWS S3, Google Cloud Storage, Backblaze.
- **Vulnerability Scanning:** OWASP ZAP, Nessus, Burp Suite Community.

## Cost vs Risk

"Keamanan mahal!" — mungkin terdengar begitu. Tapi biaya mencegah serangan jauh lebih murah daripada membersihkan setelah sistem diretas. Satu insiden bisa mengakibatkan:
- Kehilangan data pelanggan.
- Downtime yang merugikan.
- Reputation damage yang sulit dipulihkan.
- Biaya forensik dan remediation yang besar.

Investasi keamanan di awal jauh lebih bijak.

## Kesimpulan

Keamanan website bukan tugas sekali jadi — ini upaya berkelanjutan. Update, monitor, test, dan improve terus-menerus. Saat [memilih partner teknologi](/blog/cara-memilih-software-house), pastikan mereka memahami dan prioritaskan keamanan sejak awal — bukan menambahkannya belakangan sebagai "fitur ekstra".

Ingin website yang aman dan compliant? Lihat [layanan kami](/layanan) atau [konsultasi gratis](/harga) untuk membahas keamanan spesifik bisnis Anda.
`,
  },
]

export const getAllPosts = () =>
  [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))

export const getPost = (slug) => posts.find((p) => p.slug === slug)

export const formatDateId = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
