// Generates a unique branded cover image (1200x630) for each blog post.
// Left half: brand header + category chip + title + footer (text layout).
// Right half: topic-specific illustration (SVG shapes keyed by slug).
// Run with `npm run gen:covers`; output public/blog/<slug>.png is committed as static assets.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { posts } from '../src/blog.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'blog')
mkdirSync(outDir, { recursive: true })

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function wrap(text, maxChars = 26, maxLines = 3) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ''
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) {
      lines.push(line)
      line = w
    } else {
      line = (line + ' ' + w).trim()
    }
    if (lines.length === maxLines - 1 && line.length > maxChars) break
  }
  if (line) lines.push(line)
  if (lines.length > maxLines) {
    lines.length = maxLines
    lines[maxLines - 1] = lines[maxLines - 1].replace(/[\s.,]+$/, '') + '…'
  }
  return lines
}

// ── Topic illustrations (placed in the right zone: x≈660–1160, center y≈310) ──
// All shapes use white with varying opacity to sit on the colored gradient.
const ILLUSTRATIONS = {
  'biaya-pembuatan-website': () => `
    <!-- Coin rings -->
    <circle cx="910" cy="240" r="110" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.18"/>
    <circle cx="910" cy="240" r="82"  fill="#FFFFFF" opacity="0.10"/>
    <circle cx="910" cy="240" r="62"  fill="#FFFFFF" opacity="0.10"/>
    <!-- Rp symbol -->
    <text x="910" y="222" text-anchor="middle" font-family="Arial,sans-serif" font-size="54" font-weight="900" fill="#FFFFFF" opacity="0.88">Rp</text>
    <text x="910" y="270" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" opacity="0.55">/ proyek</text>
    <!-- Price tier pills -->
    <rect x="670" y="380" width="155" height="50" rx="25" fill="#FFFFFF" opacity="0.16"/>
    <text x="748" y="412" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" opacity="0.9">1 Juta+</text>
    <rect x="845" y="380" width="155" height="50" rx="25" fill="#FFFFFF" opacity="0.21"/>
    <text x="923" y="412" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" opacity="0.9">4 Juta+</text>
    <rect x="1020" y="380" width="145" height="50" rx="25" fill="#FFFFFF" opacity="0.14"/>
    <text x="1093" y="412" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" opacity="0.9">Custom</text>
    <!-- small coins -->
    <circle cx="700" cy="240" r="28" fill="#FFFFFF" opacity="0.12"/>
    <text x="700" y="248" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" opacity="0.7">Rp</text>
    <circle cx="1120" cy="220" r="22" fill="#FFFFFF" opacity="0.09"/>
    <circle cx="1140" cy="310" r="16" fill="#FFFFFF" opacity="0.07"/>
    <!-- underline accent -->
    <rect x="670" y="460" width="480" height="3" rx="2" fill="#FFFFFF" opacity="0.12"/>
    <text x="670" y="494" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" opacity="0.45">Harga transparan · tanpa biaya tersembunyi</text>
  `,

  'website-custom-vs-template': () => `
    <!-- Left panel: template (uniform grid) -->
    <rect x="668" y="100" width="210" height="430" rx="14" fill="#FFFFFF" opacity="0.08"/>
    <rect x="678" y="112" width="190" height="24" rx="4" fill="#FFFFFF" opacity="0.3"/>
    ${[0,1,2,3,4].map(r => [0,1].map(col =>
      `<rect x="${686+col*96}" y="${148+r*60}" width="84" height="48" rx="6" fill="#FFFFFF" opacity="${r===0&&col===0?'0.22':'0.12'}"/>`
    ).join('')).join('')}
    <text x="773" y="560" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" opacity="0.5">Template</text>
    <!-- VS divider -->
    <rect x="890" y="120" width="2" height="390" rx="1" fill="#FFFFFF" opacity="0.2"/>
    <rect x="862" y="282" width="58" height="58" rx="29" fill="#FFFFFF" opacity="0.18"/>
    <text x="891" y="320" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" opacity="0.9">VS</text>
    <!-- Right panel: custom (varied layout) -->
    <rect x="908" y="100" width="250" height="430" rx="14" fill="#FFFFFF" opacity="0.12"/>
    <rect x="918" y="112" width="230" height="28" rx="5" fill="#FFFFFF" opacity="0.35"/>
    <rect x="918" y="152" width="230" height="80" rx="8" fill="#FFFFFF" opacity="0.18"/>
    <rect x="918" y="244" width="110" height="110" rx="8" fill="#FFFFFF" opacity="0.12"/>
    <rect x="1038" y="244" width="110" height="50" rx="8" fill="#FFFFFF" opacity="0.16"/>
    <rect x="1038" y="304" width="110" height="50" rx="8" fill="#FFFFFF" opacity="0.10"/>
    <rect x="918" y="366" width="230" height="36" rx="8" fill="#FFFFFF" opacity="0.22"/>
    <rect x="918" y="412" width="160" height="24" rx="4" fill="#FFFFFF" opacity="0.14"/>
    <rect x="918" y="444" width="200" height="16" rx="3" fill="#FFFFFF" opacity="0.10"/>
    <text x="1033" y="560" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" opacity="0.5">Custom</text>
  `,

  'lama-pembuatan-aplikasi-mobile': () => `
    <!-- Calendar icon -->
    <rect x="820" y="90" width="100" height="96" rx="12" fill="#FFFFFF" opacity="0.14"/>
    <rect x="820" y="90" width="100" height="28" rx="12" fill="#FFFFFF" opacity="0.22"/>
    <rect x="820" y="106" width="100" height="12" fill="#FFFFFF" opacity="0.22"/>
    ${[0,1,2,3,4,5].map(i => `<circle cx="${838+i*13}" cy="${146+Math.floor(i/3)*20}" r="5" fill="#FFFFFF" opacity="0.4"/>`).join('')}
    ${[0,1,2].map(i => `<circle cx="${838+i*13}" cy="${166}" r="5" fill="#FFFFFF" opacity="0.4"/>`).join('')}
    <!-- Timeline bars -->
    ${[
      { label: 'Landing Page', range: '1–2 minggu', w: 130 },
      { label: 'Website',       range: '2–4 minggu', w: 210 },
      { label: 'Aplikasi Mobile',range: '4–8 minggu', w: 310 },
      { label: 'Sistem / ERP',  range: '8–16 minggu', w: 430 },
    ].map((t, i) => `
      <text x="670" y="${228+i*72}" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" opacity="0.65">${esc(t.label)}</text>
      <rect x="670" y="${238+i*72}" width="480" height="22" rx="11" fill="#FFFFFF" opacity="0.10"/>
      <rect x="670" y="${238+i*72}" width="${t.w}" height="22" rx="11" fill="#FFFFFF" opacity="0.35"/>
      <text x="${670+t.w+10}" y="${254+i*72}" font-family="Arial,sans-serif" font-size="14" font-weight="600" fill="#FFFFFF" opacity="0.55">${esc(t.range)}</text>
    `).join('')}
  `,

  'cara-memilih-software-house': () => `
    <!-- Checklist card -->
    <rect x="660" y="100" width="498" height="430" rx="18" fill="#FFFFFF" opacity="0.08"/>
    <rect x="660" y="100" width="498" height="52" rx="18" fill="#FFFFFF" opacity="0.10"/>
    <rect x="660" y="134" width="498" height="18" fill="#FFFFFF" opacity="0.10"/>
    <text x="909" y="136" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" opacity="0.7">Checklist Software House</text>
    ${[
      'Portofolio & pengalaman relevan',
      'Kode milik klien (no lock-in)',
      'Timeline & harga transparan',
      'Dukungan pasca peluncuran',
      'Referensi dari klien sebelumnya',
      'Stack teknologi modern',
    ].map((item, i) => `
      <circle cx="700" cy="${186+i*56}" r="16" fill="#FFFFFF" opacity="${i<3?'0.22':'0.14'}"/>
      <text x="700" y="${192+i*56}" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="800" fill="#FFFFFF" opacity="${i<3?'0.9':'0.5'}">✓</text>
      <text x="728" y="${192+i*56}" font-family="Arial,sans-serif" font-size="17" font-weight="600" fill="#FFFFFF" opacity="${i<3?'0.8':'0.45'}">${esc(item)}</text>
      <rect x="728" y="${198+i*56}" width="${item.length * 8.5}" height="1" fill="#FFFFFF" opacity="${i<3?'0.15':'0.06'}"/>
    `).join('')}
  `,

  'website-seo-friendly': () => `
    <!-- Magnifying glass -->
    <circle cx="920" cy="255" r="118" fill="none" stroke="#FFFFFF" stroke-width="22" opacity="0.20"/>
    <circle cx="920" cy="255" r="88"  fill="#FFFFFF" opacity="0.08"/>
    <!-- handle -->
    <rect x="1010" y="338" width="22" height="100" rx="11" fill="#FFFFFF" opacity="0.20" transform="rotate(45 1010 338)"/>
    <!-- search bar inside glass -->
    <rect x="846" y="222" width="148" height="28" rx="14" fill="#FFFFFF" opacity="0.22"/>
    <!-- result rows inside glass -->
    <rect x="848" y="264" width="140" height="10" rx="3" fill="#FFFFFF" opacity="0.35"/>
    <rect x="848" y="282" width="110" height="8" rx="2" fill="#FFFFFF" opacity="0.22"/>
    <rect x="848" y="302" width="128" height="10" rx="3" fill="#FFFFFF" opacity="0.28"/>
    <rect x="848" y="320" width="96" height="8" rx="2" fill="#FFFFFF" opacity="0.18"/>
    <!-- Stars row -->
    ${[0,1,2,3,4].map(i => `<polygon points="${670+i*28},${470} ${670+i*28+8},${453} ${670+i*28+16},${470} ${670+i*28+4},${480} ${670+i*28+12},${480}" fill="#FFFFFF" opacity="${i<4?'0.55':'0.20'}"/>`).join('')}
    <text x="814" y="480" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="#FFFFFF" opacity="0.5">Ranking #1 di Google</text>
  `,

  'apa-itu-erp': () => `
    <!-- Central ERP hub -->
    <rect x="858" y="238" width="106" height="68" rx="10" fill="#FFFFFF" opacity="0.22"/>
    <text x="911" y="280" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" font-weight="900" fill="#FFFFFF" opacity="0.9">ERP</text>
    <!-- Spoke modules -->
    ${[
      { label: 'Sales',     x: 688,  y: 180, lx: 780, ly: 220, ex: 858, ey: 260 },
      { label: 'Finance',   x: 688,  y: 330, lx: 780, ly: 330, ex: 858, ey: 290 },
      { label: 'HR',        x: 1085, y: 180, lx: 1055, ly: 220, ex: 964, ey: 260 },
      { label: 'Inventory', x: 1075, y: 330, lx: 1050, ly: 330, ex: 964, ey: 290 },
      { label: 'CRM',       x: 860,  y: 110, lx: 905, ly: 170, ex: 908, ey: 238 },
      { label: 'Laporan',   x: 855,  y: 380, lx: 905, ly: 355, ex: 908, ey: 306 },
    ].map(m => `
      <line x1="${m.lx}" y1="${m.ly}" x2="${m.ex}" y2="${m.ey}" stroke="#FFFFFF" stroke-width="1.5" opacity="0.22"/>
      <rect x="${m.x-2}" y="${m.y-2}" width="92" height="46" rx="8" fill="#FFFFFF" opacity="0.13"/>
      <text x="${m.x+44}" y="${m.y+26}" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" opacity="0.7">${esc(m.label)}</text>
    `).join('')}
  `,

  'tips-meningkatkan-konversi-landing-page': () => `
    <!-- Conversion funnel -->
    <polygon points="668,150 1155,150 1040,250 780,250" fill="#FFFFFF" opacity="0.18"/>
    <polygon points="780,262 1040,262 970,360 850,360" fill="#FFFFFF" opacity="0.22"/>
    <polygon points="850,372 970,372 930,458 890,458" fill="#FFFFFF" opacity="0.28"/>
    <!-- Funnel labels -->
    <text x="912" y="212" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" opacity="0.65">Pengunjung</text>
    <text x="912" y="318" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="#FFFFFF" opacity="0.70">Tertarik</text>
    <text x="912" y="424" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" opacity="0.80">Konversi</text>
    <!-- Up arrow (right side) -->
    <line x1="1118" y1="480" x2="1118" y2="150" stroke="#FFFFFF" stroke-width="3" opacity="0.25" stroke-linecap="round"/>
    <polygon points="1098,175 1118,135 1138,175" fill="#FFFFFF" opacity="0.50"/>
    <!-- % badges -->
    <rect x="668" y="95" width="96" height="42" rx="21" fill="#FFFFFF" opacity="0.18"/>
    <text x="716" y="122" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" opacity="0.9">100%</text>
    <rect x="786" y="310" width="80" height="38" rx="19" fill="#FFFFFF" opacity="0.18"/>
    <text x="826" y="335" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="800" fill="#FFFFFF" opacity="0.8">45%</text>
    <rect x="840" y="462" width="144" height="44" rx="22" fill="#FFFFFF" opacity="0.24"/>
    <text x="912" y="490" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" opacity="0.95">+38% CVR</text>
  `,

  'beda-website-webapp-aplikasi-mobile': () => `
    <!-- Desktop monitor -->
    <rect x="665" y="130" width="300" height="200" rx="10" fill="#FFFFFF" opacity="0.14"/>
    <rect x="665" y="130" width="300" height="28" rx="10" fill="#FFFFFF" opacity="0.18"/>
    <rect x="665" y="148" width="300" height="10" fill="#FFFFFF" opacity="0.18"/>
    <!-- screen content -->
    <rect x="680" y="175" width="270" height="140" rx="4" fill="#FFFFFF" opacity="0.08"/>
    <rect x="692" y="188" width="180" height="16" rx="3" fill="#FFFFFF" opacity="0.3"/>
    <rect x="692" y="212" width="240" height="10" rx="2" fill="#FFFFFF" opacity="0.18"/>
    <rect x="692" y="230" width="220" height="10" rx="2" fill="#FFFFFF" opacity="0.14"/>
    <rect x="692" y="268" width="120" height="28" rx="6" fill="#FFFFFF" opacity="0.22"/>
    <!-- stand -->
    <rect x="790" y="330" width="24" height="36" rx="3" fill="#FFFFFF" opacity="0.14"/>
    <rect x="756" y="362" width="92" height="14" rx="5" fill="#FFFFFF" opacity="0.14"/>
    <text x="815" y="398" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#FFFFFF" opacity="0.45">Website</text>

    <!-- Tablet -->
    <rect x="988" y="140" width="135" height="188" rx="12" fill="#FFFFFF" opacity="0.14"/>
    <rect x="1000" y="155" width="111" height="154" rx="5" fill="#FFFFFF" opacity="0.08"/>
    <rect x="1010" y="165" width="91" height="12" rx="3" fill="#FFFFFF" opacity="0.28"/>
    <rect x="1010" y="185" width="80" height="8" rx="2" fill="#FFFFFF" opacity="0.18"/>
    <rect x="1010" y="200" width="86" height="8" rx="2" fill="#FFFFFF" opacity="0.14"/>
    <rect x="1010" y="228" width="50" height="60" rx="5" fill="#FFFFFF" opacity="0.12"/>
    <rect x="1068" y="228" width="38" height="28" rx="5" fill="#FFFFFF" opacity="0.10"/>
    <rect x="1068" y="262" width="38" height="26" rx="5" fill="#FFFFFF" opacity="0.10"/>
    <circle cx="1056" cy="348" r="8" fill="#FFFFFF" opacity="0.22"/>
    <text x="1056" y="378" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#FFFFFF" opacity="0.45">Web App</text>

    <!-- Phone -->
    <rect x="1135" y="156" width="78" height="160" rx="14" fill="#FFFFFF" opacity="0.14"/>
    <rect x="1145" y="170" width="58" height="128" rx="5" fill="#FFFFFF" opacity="0.08"/>
    <rect x="1152" y="178" width="44" height="8" rx="2" fill="#FFFFFF" opacity="0.30"/>
    <rect x="1152" y="194" width="38" height="6" rx="2" fill="#FFFFFF" opacity="0.18"/>
    ${[0,1,2,3].map(i => `<rect x="1152" y="${208+i*18}" width="${[38,32,36,28][i]}" height="12" rx="3" fill="#FFFFFF" opacity="0.14"/>`).join('')}
    <rect x="1155" y="280" width="52" height="10" rx="5" fill="#FFFFFF" opacity="0.22"/>
    <circle cx="1174" cy="328" r="7" fill="#FFFFFF" opacity="0.22"/>
    <text x="1174" y="356" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#FFFFFF" opacity="0.45">Mobile</text>

    <!-- Comparison bar at bottom -->
    <rect x="665" y="430" width="548" height="2" rx="1" fill="#FFFFFF" opacity="0.14"/>
    <text x="930" y="470" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="#FFFFFF" opacity="0.45">3 solusi digital — mana yang tepat untuk Anda?</text>
  `,

  'company-profile-website': () => `
    <!-- Building -->
    <!-- base structure -->
    <rect x="730" y="200" width="380" height="310" rx="4" fill="#FFFFFF" opacity="0.10"/>
    <!-- floors -->
    ${[0,1,2,3].map(i => `<rect x="730" y="${480-i*68}" width="380" height="1" fill="#FFFFFF" opacity="0.18"/>`).join('')}
    <!-- window grid - 5 col x 4 row -->
    ${[0,1,2,3].map(row =>
      [0,1,2,3,4].map(col =>
        `<rect x="${756+col*68}" y="${216+row*62}" width="40" height="44" rx="4" fill="#FFFFFF" opacity="${row===0&&col===2?'0.30':'0.14'}"/>`
      ).join('')
    ).join('')}
    <!-- door -->
    <rect x="866" y="454" width="108" height="56" rx="4 4 0 0" fill="#FFFFFF" opacity="0.20"/>
    <circle cx="912" cy="482" r="5" fill="#FFFFFF" opacity="0.5"/>
    <!-- roof line -->
    <polygon points="700,200 920,110 1140,200" fill="#FFFFFF" opacity="0.15"/>
    <polygon points="720,200 920,120 1120,200" fill="#FFFFFF" opacity="0.06"/>
    <!-- flag -->
    <rect x="918" y="66" width="3" height="50" fill="#FFFFFF" opacity="0.4"/>
    <polygon points="921,66 968,84 921,104" fill="#FFFFFF" opacity="0.35"/>
    <!-- shadow at base -->
    <rect x="700" y="510" width="440" height="8" rx="4" fill="#FFFFFF" opacity="0.08"/>
    <text x="920" y="556" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" opacity="0.45">Tampil profesional di mata klien</text>
  `,

  'pentingnya-maintenance-website': () => `
    <!-- Shield -->
    <path d="M910 90 L1090 148 L1090 310 Q1090 440 910 520 Q730 440 730 310 L730 148 Z" fill="#FFFFFF" opacity="0.12"/>
    <path d="M910 110 L1068 162 L1068 310 Q1068 426 910 498 Q752 426 752 310 L752 162 Z" fill="#FFFFFF" opacity="0.06"/>
    <!-- Checkmark inside shield -->
    <polyline points="824,304 878,364 996,240" fill="none" stroke="#FFFFFF" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" opacity="0.50"/>
    <!-- Calendar chips below -->
    <rect x="680" y="472" width="122" height="44" rx="10" fill="#FFFFFF" opacity="0.14"/>
    <text x="741" y="500" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" opacity="0.7">Update Rutin</text>
    <rect x="818" y="472" width="122" height="44" rx="10" fill="#FFFFFF" opacity="0.14"/>
    <text x="879" y="500" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" opacity="0.7">Backup Aman</text>
    <rect x="958" y="472" width="122" height="44" rx="10" fill="#FFFFFF" opacity="0.14"/>
    <text x="1019" y="500" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" opacity="0.7">24/7 Monitor</text>
    <!-- wrench hint (top-right corner) -->
    <circle cx="1090" cy="130" r="30" fill="#FFFFFF" opacity="0.09"/>
    <rect x="1074" y="116" width="12" height="28" rx="4" fill="#FFFFFF" opacity="0.4" transform="rotate(45 1080 130)"/>
    <circle cx="1078" cy="122" r="8" fill="#FFFFFF" opacity="0" stroke="#FFFFFF" stroke-width="2" opacity_dummy="0.35"/>
  `,

  'jasa-toko-online': () => `
    <!-- Shopping cart -->
    <circle cx="920" cy="220" r="110" fill="#FFFFFF" opacity="0.07"/>
    <!-- cart body -->
    <path d="M700 160 L730 160 L790 360 L1090 360 L1130 220 L760 220" fill="none" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="0.40"/>
    <!-- cart items (boxes) -->
    <rect x="800" y="230" width="64" height="60" rx="8" fill="#FFFFFF" opacity="0.22"/>
    <rect x="876" y="230" width="64" height="60" rx="8" fill="#FFFFFF" opacity="0.16"/>
    <rect x="952" y="230" width="64" height="60" rx="8" fill="#FFFFFF" opacity="0.20"/>
    <rect x="1028" y="230" width="64" height="60" rx="8" fill="#FFFFFF" opacity="0.13"/>
    <!-- cart wheels -->
    <circle cx="820" cy="400" r="28" fill="#FFFFFF" opacity="0.22"/>
    <circle cx="820" cy="400" r="14" fill="#FFFFFF" opacity="0.14"/>
    <circle cx="1060" cy="400" r="28" fill="#FFFFFF" opacity="0.22"/>
    <circle cx="1060" cy="400" r="14" fill="#FFFFFF" opacity="0.14"/>
    <!-- payment check badge -->
    <circle cx="1100" cy="130" r="48" fill="#FFFFFF" opacity="0.18"/>
    <polyline points="1078,130 1094,148 1124,110" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.80"/>
    <!-- tag chips -->
    <rect x="670" y="462" width="148" height="44" rx="10" fill="#FFFFFF" opacity="0.14"/>
    <text x="744" y="490" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" opacity="0.75">Payment Gateway</text>
    <rect x="832" y="462" width="120" height="44" rx="10" fill="#FFFFFF" opacity="0.14"/>
    <text x="892" y="490" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" opacity="0.75">SEO-Ready</text>
    <rect x="966" y="462" width="120" height="44" rx="10" fill="#FFFFFF" opacity="0.14"/>
    <text x="1026" y="490" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" opacity="0.75">Mobile-First</text>
    <text x="910" y="556" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" opacity="0.45">Toko online custom · kode milik Anda</text>
  `,

  'transformasi-digital-bisnis': () => `
    <!-- Digital network nodes -->
    <circle cx="910" cy="300" r="54" fill="#FFFFFF" opacity="0.20"/>
    <text x="910" y="287" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" opacity="0.80">Digital</text>
    <text x="910" y="307" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" opacity="0.80">Hub</text>
    <!-- Spoke nodes -->
    ${[
      { label: 'Website', x: 760, y: 180 },
      { label: 'Aplikasi', x: 1060, y: 180 },
      { label: 'ERP', x: 760, y: 420 },
      { label: 'Data', x: 1060, y: 420 },
      { label: 'SEO', x: 690, y: 300 },
      { label: 'Mobile', x: 1130, y: 300 },
    ].map(n => `
      <line x1="${n.x}" y1="${n.y}" x2="910" y2="300" stroke="#FFFFFF" stroke-width="1.5" opacity="0.18"/>
      <circle cx="${n.x}" cy="${n.y}" r="34" fill="#FFFFFF" opacity="0.14"/>
      <text x="${n.x}" y="${n.y + 5}" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" opacity="0.70">${esc(n.label)}</text>
    `).join('')}
    <!-- Outer ring decoration -->
    <circle cx="910" cy="300" r="140" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.10" stroke-dasharray="8 6"/>
    <!-- Progress arrows at bottom -->
    ${[
      { x: 670, label: 'Online', pct: 100 },
      { x: 808, label: 'Otomasi', pct: 70 },
      { x: 946, label: 'Integrasi', pct: 45 },
    ].map(b => `
      <rect x="${b.x}" y="490" width="128" height="18" rx="9" fill="#FFFFFF" opacity="0.10"/>
      <rect x="${b.x}" y="490" width="${b.pct * 1.28}" height="18" rx="9" fill="#FFFFFF" opacity="0.30"/>
      <text x="${b.x + 64}" y="503" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" opacity="0.70">${esc(b.label)}</text>
    `).join('')}
    <text x="910" y="556" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" opacity="0.45">Mulai transformasi digital bisnis Anda</text>
  `,

  'website-untuk-umkm': () => `
    <!-- Store front -->
    <!-- roof -->
    <rect x="670" y="148" width="500" height="56" rx="6" fill="#FFFFFF" opacity="0.18"/>
    <!-- awning stripe -->
    ${[0,1,2,3,4,5,6,7,8,9].map(i =>
      `<rect x="${670+i*50}" y="148" width="25" height="56" fill="#FFFFFF" opacity="${i%2===0?'0.08':'0'}" />`
    ).join('')}
    <!-- sign board -->
    <rect x="720" y="90" width="400" height="62" rx="10" fill="#FFFFFF" opacity="0.20"/>
    <rect x="740" y="106" width="260" height="30" rx="6" fill="#FFFFFF" opacity="0.22"/>
    <rect x="1016" y="106" width="84" height="30" rx="6" fill="#FFFFFF" opacity="0.14"/>
    <!-- main store body -->
    <rect x="670" y="204" width="500" height="310" rx="0" fill="#FFFFFF" opacity="0.07"/>
    <!-- display windows -->
    <rect x="688" y="224" width="200" height="170" rx="8" fill="#FFFFFF" opacity="0.13"/>
    <rect x="904" y="224" width="246" height="170" rx="8" fill="#FFFFFF" opacity="0.10"/>
    <!-- products in window (left) -->
    ${[0,1,2].map(i => `<rect x="${702+i*62}" y="${244}" width="48" height="60" rx="5" fill="#FFFFFF" opacity="${[0.20,0.14,0.17][i]}"/>`).join('')}
    ${[0,1,2].map(i => `<rect x="${710+i*62}" y="${312}" width="32" height="10" rx="2" fill="#FFFFFF" opacity="0.25"/>`).join('')}
    <!-- products in window (right) -->
    ${[0,1,2,3].map(i => `<rect x="${918+i*56}" y="${244}" width="44" height="55" rx="5" fill="#FFFFFF" opacity="${[0.18,0.12,0.16,0.10][i]}"/>`).join('')}
    <!-- door -->
    <rect x="804" y="374" width="106" height="140" rx="8 8 0 0" fill="#FFFFFF" opacity="0.15"/>
    <circle cx="886" cy="444" r="6" fill="#FFFFFF" opacity="0.5"/>
    <!-- open/closed sign -->
    <rect x="820" y="392" width="72" height="28" rx="5" fill="#FFFFFF" opacity="0.24"/>
    <text x="856" y="412" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" opacity="0.8">OPEN</text>
    <!-- welcome mat -->
    <rect x="776" y="510" width="162" height="14" rx="4" fill="#FFFFFF" opacity="0.14"/>
    <text x="912" y="556" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" opacity="0.45">Buka toko online — jangkau lebih banyak pembeli</text>
  `,
}

// Fallback: decorative circles if slug has no illustration
function fallbackIllustration() {
  return `
    <circle cx="1140" cy="700" r="300" fill="#ffffff" opacity="0.06"/>
    <circle cx="1050" cy="120" r="150" fill="#ffffff" opacity="0.05"/>
    <path d="M980 630 L1130 410 L1200 630 Z" fill="#ffffff" opacity="0.06"/>
  `
}

function svgFor(post) {
  const tag = post.tags[0] || 'Artikel'
  const chipW = tag.length * 15 + 56
  const lines = wrap(post.title, 26, 3)
  const lh = 80
  const firstY = 332 + (3 - lines.length) * 30
  const titleTspans = lines
    .map((l, i) => `<tspan x="80" y="${firstY + i * lh}">${esc(l)}</tspan>`)
    .join('')

  const illus = (ILLUSTRATIONS[post.slug] || fallbackIllustration)()

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${post.c}"/>
      <stop offset="100%" stop-color="${post.c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="illusClip">
      <rect x="640" y="0" width="560" height="630"/>
    </clipPath>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Divider line (subtle) -->
  <rect x="640" y="40" width="1" height="550" fill="#ffffff" opacity="0.08"/>

  <!-- Illustration zone (right half, clipped) -->
  <g clip-path="url(#illusClip)">
    ${illus}
  </g>

  <!-- Top accent bar -->
  <rect width="1200" height="8" fill="#ffffff" opacity="0.28"/>

  <!-- AF mark -->
  <g transform="translate(80,60) scale(1.4)">
    <path d="M6 43 L24 8 L33 43" fill="none" stroke="#ffffff" stroke-width="6.6" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M24 8 L45 8" fill="none" stroke="#ffffff" stroke-width="6.6" stroke-linecap="round"/>
    <path d="M29 22 L43 22" fill="none" stroke="#ffffff" stroke-width="5.8" stroke-linecap="round"/>
    <path d="M17.5 43 L24 30 L30.5 43 Z" fill="#ffffff" opacity="0.6"/>
  </g>
  <text x="160" y="112" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="800" fill="#ffffff" letter-spacing="-1">AFSS <tspan fill="#ffffff" opacity="0.65" font-weight="600">/ Blog</tspan></text>

  <!-- category chip -->
  <rect x="80" y="196" width="${chipW}" height="48" rx="24" fill="#ffffff" opacity="0.18"/>
  <text x="${80 + chipW / 2}" y="227" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#ffffff">${esc(tag)}</text>

  <!-- title -->
  <text font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="800" fill="#ffffff" letter-spacing="-1.5">${titleTspans}</text>

  <!-- footer -->
  <text x="80" y="582" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="#ffffff" opacity="0.85">${post.readMinutes} menit baca</text>
  <text x="1120" y="582" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" fill="#ffffff" opacity="0.75">afss-landing.vercel.app</text>
</svg>`
}

let n = 0
for (const post of posts) {
  await sharp(Buffer.from(svgFor(post))).png().toFile(join(outDir, `${post.slug}.png`))
  n++
}
console.log(`Generated ${n} blog cover images in public/blog/`)
