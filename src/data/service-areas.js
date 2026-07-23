// ── Area layanan — halaman SEO lokal per kota (Indonesian-only, lihat main.jsx) ──
// URL: /jasa-pembuatan-website-<slug>. Konten dibuat unik per kota agar tidak
// dianggap doorway/duplicate content oleh Google.
export const serviceAreas = [
  {
    slug: 'medan', name: 'Medan', region: 'Sumatera Utara',
    intro: [
      'AFSS berkantor pusat di Medan — jadi untuk bisnis di Medan dan sekitarnya (Binjai, Deli Serdang, Tebing Tinggi), kami bukan vendor jauh: Anda bisa bertemu langsung untuk konsultasi, presentasi progres, maupun pelatihan penggunaan sistem.',
      'Kami memahami lanskap bisnis Sumatera Utara — dari usaha perkebunan dan distribusi, ruko-ruko grosir di Pusat Pasar, hingga klinik dan sekolah swasta yang mulai berbenah digital. Solusi yang kami bangun menyesuaikan cara kerja lokal, bukan template kota besar yang dipaksakan.',
    ],
    industries: [
      { icon: 'fa-solid fa-boxes-stacked', name: 'Distribusi & Grosir', desc: 'Sistem stok, faktur, dan piutang untuk distributor & toko grosir — menggantikan buku catat dan Excel yang rawan selisih.' },
      { icon: 'fa-solid fa-tree', name: 'Perkebunan & Agribisnis', desc: 'Pencatatan hasil panen, timbangan, dan upah pekerja kebun dalam satu sistem yang bisa diakses dari lapangan.' },
      { icon: 'fa-solid fa-stethoscope', name: 'Klinik & Praktik', desc: 'Booking online, rekam pasien, dan antrian digital untuk klinik yang ingin naik kelas layanan.' },
    ],
    localNote: 'Bisa meeting tatap muka di Medan — konsultasi pertama tetap gratis.',
  },
  {
    slug: 'jakarta', name: 'Jakarta', region: 'DKI Jakarta',
    intro: [
      'Untuk perusahaan di Jakarta, kecepatan dan profesionalisme adalah segalanya. AFSS terbiasa bekerja remote dengan klien Jabodetabek: komunikasi harian via WhatsApp, review progres lewat Google Meet, dan demo sistem yang bisa Anda klik sendiri sebelum bayar termin berikutnya.',
      'Dengan biaya operasional di luar Jakarta, kami bisa menawarkan kualitas pengerjaan setara agensi besar dengan harga yang jauh lebih masuk akal — selisihnya bisa Anda pakai untuk iklan atau pengembangan fitur berikutnya.',
    ],
    industries: [
      { icon: 'fa-solid fa-building', name: 'Startup & Korporat', desc: 'MVP, dashboard internal, dan integrasi API untuk tim yang butuh eksekusi cepat tanpa merekrut tim IT sendiri.' },
      { icon: 'fa-solid fa-cart-shopping', name: 'E-Commerce & Brand', desc: 'Toko online dengan payment gateway lokal (Midtrans/Xendit), siap perang harbolnas.' },
      { icon: 'fa-solid fa-briefcase', name: 'Jasa Profesional', desc: 'Website firma hukum, konsultan, dan agensi yang membangun kredibilitas di hasil pencarian Google.' },
    ],
    localNote: 'Pengerjaan remote penuh — update progres harian, meeting online sesuai jadwal Anda.',
  },
  {
    slug: 'surabaya', name: 'Surabaya', region: 'Jawa Timur',
    intro: [
      'Surabaya adalah kota dagang — dan sistem yang kami bangun untuk klien Jawa Timur hampir selalu berpusat pada satu hal: arus barang dan uang yang rapi. Dari toko bangunan sampai pabrik skala menengah, kami membantu memindahkan operasional dari nota karbon ke sistem yang bisa dicek dari HP.',
      'Kerja sama berjalan remote dengan pola yang sudah teruji lintas kota: scope jelas di awal, demo tiap tahap, dan serah terima lengkap dengan pelatihan tim Anda via video call.',
    ],
    industries: [
      { icon: 'fa-solid fa-industry', name: 'Manufaktur & UKM Produksi', desc: 'Pencatatan produksi, bahan baku, dan HPP yang akurat — tahu untung sebenarnya per batch produksi.' },
      { icon: 'fa-solid fa-warehouse', name: 'Toko & Distribusi', desc: 'Stok multi-gudang, harga bertingkat (ecer/grosir), dan laporan omzet harian otomatis.' },
      { icon: 'fa-solid fa-ship', name: 'Logistik & Ekspedisi', desc: 'Tracking pengiriman dan manajemen armada sederhana yang bisa dipakai sopir tanpa pelatihan panjang.' },
    ],
    localNote: 'Sudah terbiasa menangani proyek lintas kota — komunikasi rapi, hasil terukur.',
  },
  {
    slug: 'bandung', name: 'Bandung', region: 'Jawa Barat',
    intro: [
      'Bandung penuh brand kreatif — fashion, kuliner, studio, dan pendidikan. Untuk pasar seperti ini, website bukan sekadar ada: tampilannya harus mencerminkan karakter brand, dan tokonya harus mudah dikelola sendiri setelah serah terima.',
      'AFSS membangun website dan sistem yang desainnya custom (bukan template jadi), tapi tetap dengan fondasi teknis yang benar: cepat diakses, SEO-ready, dan mudah dikembangkan saat bisnis Anda tumbuh.',
    ],
    industries: [
      { icon: 'fa-solid fa-shirt', name: 'Fashion & Clothing Brand', desc: 'Toko online dengan katalog yang enak dilihat, checkout cepat, dan integrasi marketplace.' },
      { icon: 'fa-solid fa-mug-hot', name: 'F&B & Kafe', desc: 'Menu digital, sistem reservasi, dan website brand yang sekuat feed Instagram-nya.' },
      { icon: 'fa-solid fa-graduation-cap', name: 'Pendidikan & Kursus', desc: 'Pendaftaran online, pembayaran, dan portal materi untuk lembaga kursus dan sekolah.' },
    ],
    localNote: 'Desain custom sesuai karakter brand — bukan template yang dipakai seribu toko lain.',
  },
  {
    slug: 'semarang', name: 'Semarang', region: 'Jawa Tengah',
    intro: [
      'Bisnis di Semarang dan Jawa Tengah dikenal efisien — dan itu pula pendekatan kami: sistem yang fungsional, harga masuk akal, tanpa fitur mubazir yang hanya menambah biaya. Kami mulai dari masalah operasional yang paling mahal, lalu bangun solusinya bertahap.',
      'Dari kawasan industri sampai UMKM binaan, kami membantu digitalisasi dengan cara yang bisa diikuti tim Anda — pelatihan disertakan, dokumentasi lengkap, dan kode sepenuhnya milik Anda.',
    ],
    industries: [
      { icon: 'fa-solid fa-industry', name: 'Industri & Pergudangan', desc: 'Sistem inventaris dan pencatatan produksi untuk pabrik dan gudang di kawasan industri.' },
      { icon: 'fa-solid fa-store', name: 'UMKM & Kuliner', desc: 'Website dan katalog online sederhana yang benar-benar mendatangkan pesanan, bukan sekadar pajangan.' },
      { icon: 'fa-solid fa-truck', name: 'Distribusi Regional', desc: 'Order-taking untuk sales lapangan dan rekap penjualan per wilayah secara real-time.' },
    ],
    localNote: 'Solusi bertahap sesuai anggaran — mulai dari yang paling berdampak dulu.',
  },
  {
    slug: 'makassar', name: 'Makassar', region: 'Sulawesi Selatan',
    intro: [
      'Sebagai gerbang Indonesia Timur, bisnis di Makassar bergerak cepat — perdagangan, pelayaran, dan distribusi antar-pulau. AFSS membantu bisnis Sulawesi membangun sistem yang tetap jalan meski koneksi tidak selalu stabil: aplikasi ringan, hemat data, dan mobile-first.',
      'Seluruh proses berjalan online dengan jadwal yang menyesuaikan zona waktu WITA — konsultasi, demo progres, hingga pelatihan pemakaian sistem untuk tim Anda.',
    ],
    industries: [
      { icon: 'fa-solid fa-anchor', name: 'Perdagangan Antar-Pulau', desc: 'Pencatatan muatan, invoice, dan piutang pelanggan untuk usaha ekspedisi dan distribusi.' },
      { icon: 'fa-solid fa-fish', name: 'Perikanan & Hasil Laut', desc: 'Pencatatan hasil tangkapan, harga harian, dan penjualan ke pengepul dalam satu aplikasi.' },
      { icon: 'fa-solid fa-hotel', name: 'Pariwisata & Perhotelan', desc: 'Booking online dan website destinasi untuk hotel, travel, dan operator wisata.' },
    ],
    localNote: 'Aplikasi ringan & mobile-first — dirancang untuk kondisi jaringan Indonesia Timur.',
  },
]
