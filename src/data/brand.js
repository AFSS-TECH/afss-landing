// ── Brand & global config ──────────────────────────────────
export const BRAND = {
  short: 'AFSS',
  legal: 'PT Advanced Future Software Solutions',
  name: 'Advanced Future Software Solutions',
  tagline: 'Building Future Digital Solutions',
  email: 'hendrik@afss.tech',
  phone: '+62 813-9694-307',
  // NAP (Name · Address · Phone) — penting untuk SEO lokal. Ganti sesuai kantor asli.
  address: 'Medan, Sumatera Utara, Indonesia',
  city: 'Medan',
  // Isi URL akun sosial media — kosong = ikon tidak ditampilkan
  social: [
    { name: 'instagram',  icon: 'fa-brands fa-instagram',   url: 'https://instagram.com/afss.tech' },
    { name: 'linkedin',   icon: 'fa-brands fa-linkedin-in', url: '' },
    { name: 'tiktok',     icon: 'fa-brands fa-tiktok',      url: '' },
    { name: 'youtube',    icon: 'fa-brands fa-youtube',     url: '' },
  ],
}

export const WA = '628139694307'
export const waLink = (msg) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`

