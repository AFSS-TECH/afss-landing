// Schema-driven config for every "Setting Landing Page" submenu. Each entry
// describes one row in Supabase's content_sections table (see
// ../../../scripts/content-schema.sql) and how SectionEditor should render a
// form for it — so adding a new editable section later is just one more
// entry here, no new component needed.
export const LOCALES = ['id', 'en', 'zh']
export const LOCALE_LABELS = { id: 'Indonesia', en: 'English', zh: '中文' }

export const SECTIONS = [
  {
    key: 'hero', label: 'Hero / Judul Utama', kind: 'object-i18n',
    fields: [
      { key: 'badge', label: 'Badge kecil di atas judul' },
      { key: 'h1Pre', label: 'Judul — bagian awal' },
      { key: 'h1Ital', label: 'Judul — bagian miring (highlight)' },
      { key: 'h1Post', label: 'Judul — bagian akhir' },
      { key: 'lead', label: 'Paragraf deskripsi', multiline: true },
    ],
  },
  {
    key: 'stats', label: 'Statistik (Hero)', kind: 'array-i18n',
    extraFields: [
      { key: 'id', label: 'ID unik' },
      { key: 'n', label: 'Angka', type: 'number' },
      { key: 'prefix', label: 'Prefix (mis. Rp)' },
      { key: 'suffix', label: 'Suffix (mis. %, /7)' },
    ],
    i18nFields: [{ key: 'label', label: 'Label' }],
  },
  {
    key: 'why', label: 'Kenapa AFSS (halaman Tentang/Keunggulan)', kind: 'array-i18n',
    extraFields: [{ key: 'icon', label: 'Icon (fa-solid fa-...)' }],
    i18nFields: [{ key: 'title', label: 'Judul' }, { key: 'desc', label: 'Deskripsi', multiline: true }],
  },
  {
    key: 'why_us', label: 'Kenapa AFSS (beranda)', kind: 'array-i18n',
    extraFields: [],
    i18nFields: [{ key: 'title', label: 'Judul' }, { key: 'desc', label: 'Deskripsi', multiline: true }],
  },
  {
    key: 'clients', label: 'Trust Bar / Industri Klien', kind: 'array-i18n',
    extraFields: [{ key: 'key', label: 'Key unik' }],
    i18nFields: [{ key: 'label', label: 'Label' }],
  },
  {
    key: 'workflow', label: 'Proses Kerja (6 langkah)', kind: 'array-i18n',
    extraFields: [{ key: 'step', label: 'Nomor (01, 02, ...)' }, { key: 'icon', label: 'Icon (fa-solid fa-...)' }],
    i18nFields: [{ key: 'title', label: 'Judul' }, { key: 'desc', label: 'Deskripsi', multiline: true }],
  },
  {
    key: 'addons', label: 'Add-On Services', kind: 'array-i18n',
    extraFields: [],
    i18nFields: [{ key: 'title', label: 'Judul' }, { key: 'desc', label: 'Deskripsi', multiline: true }, { key: 'price', label: 'Kisaran Harga' }],
  },
  {
    key: 'tech_stack', label: 'Tech Stack', kind: 'array-plain',
    fields: [{ key: 'name', label: 'Nama teknologi' }, { key: 'icon', label: 'Icon (fa-solid / fa-brands fa-...)' }],
  },
  {
    key: 'pricing', label: 'Harga — 7 Produk Utama', kind: 'array-i18n',
    extraFields: [
      { key: 'slug', label: 'Slug (harus cocok dengan /layanan/:slug)' },
      { key: 'icon', label: 'Icon' },
      { key: 'hot', label: 'Tandai "Terpopuler"', type: 'checkbox' },
    ],
    i18nFields: [
      { key: 'name', label: 'Nama Produk' }, { key: 'category', label: 'Kategori' },
      { key: 'price', label: 'Harga' }, { key: 'note', label: 'Catatan (mis. "mulai dari")' },
      { key: 'desc', label: 'Deskripsi', multiline: true },
      { key: 'feats', label: 'Fitur (satu per baris)', type: 'list' },
    ],
  },
  {
    key: 'pricing_bundles', label: 'Paket Kombinasi (Bundle)', kind: 'array-i18n',
    extraFields: [{ key: 'icon', label: 'Icon' }, { key: 'hot', label: 'Tandai "Terpopuler"', type: 'checkbox' }],
    i18nFields: [
      { key: 'name', label: 'Nama Paket' }, { key: 'tag', label: 'Tag (mis. "Paling terjangkau")' },
      { key: 'desc', label: 'Deskripsi', multiline: true },
      { key: 'items', label: 'Isi Paket (satu per baris)', type: 'list' },
      { key: 'normalPrice', label: 'Harga Normal (dicoret)' }, { key: 'price', label: 'Harga Paket' }, { key: 'save', label: 'Teks Hemat' },
    ],
  },
  {
    key: 'faqs', label: 'FAQ', kind: 'array-i18n',
    extraFields: [{ key: 'id', label: 'ID unik' }],
    i18nFields: [{ key: 'q', label: 'Pertanyaan' }, { key: 'a', label: 'Jawaban', multiline: true }],
  },
]

export const getSection = (key) => SECTIONS.find((s) => s.key === key) || null
