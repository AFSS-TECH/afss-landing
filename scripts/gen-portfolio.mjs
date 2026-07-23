// Generates 6 portfolio preview images (1200×750px) — one per showcase item.
// Landing pages get a browser-framed homepage mockup; dashboards get a sidebar+data layout.
// Run with `npm run gen:portfolio`; outputs go to public/portfolio/{n}.png.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { showcase } from '../src/data/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'portfolio')
mkdirSync(outDir, { recursive: true })

const W = 1200, H = 750
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function browserChrome() {
  const cx = 108, urlW = W - 230
  return [
    `<rect x="0" y="0" width="${W}" height="52" fill="#E6E6E6"/>`,
    `<circle cx="28"  cy="26" r="8" fill="#FF5F57"/>`,
    `<circle cx="54"  cy="26" r="8" fill="#FEBC2E"/>`,
    `<circle cx="80"  cy="26" r="8" fill="#28C840"/>`,
    `<rect x="${cx}" y="14" width="${urlW}" height="24" rx="12" fill="#CCCCCC"/>`,
    `<rect x="${cx + urlW/2 - 55}" y="20" width="110" height="12" rx="3" fill="#BBBBBB"/>`,
  ].join('\n')
}

function landingContent(c) {
  const p = [] // parts
  const Y = 52  // body starts below browser chrome

  // body bg
  p.push(`<rect x="0" y="${Y}" width="${W}" height="${H - Y}" fill="#FFFFFF"/>`)

  // — NAV —
  p.push(`<rect x="0" y="${Y}" width="${W}" height="58" fill="#FFFFFF"/>`)
  p.push(`<rect x="0" y="${Y+58}" width="${W}" height="1" fill="#E8E8E8"/>`)
  p.push(`<rect x="48" y="${Y+17}" width="34" height="24" rx="4" fill="${c}" opacity="0.9"/>`)
  p.push(`<rect x="88" y="${Y+22}" width="88" height="14" rx="3" fill="#222222" opacity="0.6"/>`)
  ;[44,56,64,52].forEach((w, i) => {
    p.push(`<rect x="${270+i*110}" y="${Y+23}" width="${w}" height="13" rx="2" fill="#888888" opacity="0.65"/>`)
  })
  p.push(`<rect x="${W-178}" y="${Y+14}" width="148" height="30" rx="15" fill="${c}"/>`)

  // — HERO —
  p.push(`<rect x="0" y="${Y+58}" width="${W}" height="300" fill="#F8F9FA"/>`)
  // badge
  p.push(`<rect x="60" y="${Y+100}" width="112" height="24" rx="12" fill="${c}" opacity="0.14"/>`)
  p.push(`<rect x="72" y="${Y+106}" width="88" height="12" rx="2" fill="${c}" opacity="0.8"/>`)
  // heading bars
  p.push(`<rect x="60" y="${Y+142}" width="465" height="44" rx="5" fill="#111111" opacity="0.82"/>`)
  p.push(`<rect x="60" y="${Y+196}" width="410" height="30" rx="5" fill="#111111" opacity="0.52"/>`)
  // subtitle
  p.push(`<rect x="60" y="${Y+250}" width="385" height="14" rx="2" fill="#999999" opacity="0.7"/>`)
  p.push(`<rect x="60" y="${Y+272}" width="345" height="14" rx="2" fill="#999999" opacity="0.5"/>`)
  // CTA row
  p.push(`<rect x="60" y="${Y+306}" width="158" height="42" rx="21" fill="${c}"/>`)
  p.push(`<rect x="230" y="${Y+306}" width="142" height="42" rx="21" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.65"/>`)

  // hero card (right)
  p.push(`<rect x="${W-524}" y="${Y+72}" width="464" height="270" rx="14" fill="#FFFFFF"/>`)
  p.push(`<rect x="${W-524}" y="${Y+72}" width="464" height="270" rx="14" fill="none" stroke="#EEEEEE" stroke-width="1"/>`)
  p.push(`<rect x="${W-510}" y="${Y+90}" width="436" height="30" rx="4" fill="${c}" opacity="0.12"/>`)
  p.push(`<rect x="${W-510}" y="${Y+130}" width="396" height="14" rx="3" fill="#DDDDDD"/>`)
  p.push(`<rect x="${W-510}" y="${Y+152}" width="358" height="13" rx="3" fill="#EEEEEE"/>`)
  p.push(`<rect x="${W-510}" y="${Y+174}" width="378" height="13" rx="3" fill="#EEEEEE"/>`)
  p.push(`<rect x="${W-510}" y="${Y+208}" width="204" height="52" rx="8" fill="${c}" opacity="0.09"/>`)
  p.push(`<rect x="${W-296}" y="${Y+208}" width="198" height="52" rx="8" fill="${c}" opacity="0.06"/>`)
  p.push(`<rect x="${W-492}" y="${Y+220}" width="130" height="10" rx="2" fill="${c}" opacity="0.38"/>`)
  p.push(`<rect x="${W-492}" y="${Y+240}" width="166" height="10" rx="2" fill="#DDDDDD"/>`)
  p.push(`<rect x="${W-510}" y="${Y+278}" width="184" height="38" rx="6" fill="${c}" opacity="0.85"/>`)
  p.push(`<rect x="${W-316}" y="${Y+288}" width="116" height="10" rx="2" fill="#DDDDDD"/>`)
  p.push(`<rect x="${W-316}" y="${Y+306}" width="96" height="10" rx="2" fill="#EEEEEE"/>`)

  // — TRUST BAR —
  p.push(`<rect x="0" y="${Y+360}" width="${W}" height="62" fill="#F3F4F6"/>`)
  p.push(`<rect x="48" y="${Y+376}" width="96" height="12" rx="2" fill="#CCCCCC"/>`)
  for (let i = 0; i < 5; i++) {
    p.push(`<rect x="${188+i*200}" y="${Y+369}" width="158" height="26" rx="5" fill="#DDDDDD" opacity="0.72"/>`)
  }

  // — FEATURES —
  p.push(`<rect x="0" y="${Y+422}" width="${W}" height="${H-Y-422}" fill="#FFFFFF"/>`)
  p.push(`<rect x="${W/2-160}" y="${Y+446}" width="320" height="20" rx="4" fill="#111111" opacity="0.18"/>`)
  p.push(`<rect x="${W/2-120}" y="${Y+475}" width="240" height="12" rx="2" fill="#CCCCCC" opacity="0.7"/>`)
  const cardW = Math.floor((W - 104) / 3) - 8
  for (let i = 0; i < 3; i++) {
    const cx2 = 48 + i * (cardW + 12)
    const hi = i === 1
    p.push(`<rect x="${cx2}" y="${Y+507}" width="${cardW}" height="158" rx="12" fill="${hi ? c : '#F8F8F8'}"/>`)
    p.push(`<rect x="${cx2+18}" y="${Y+528}" width="48" height="48" rx="10" fill="${hi ? 'rgba(255,255,255,0.25)' : c}" opacity="${hi ? '1' : '0.15'}"/>`)
    p.push(`<rect x="${cx2+18}" y="${Y+594}" width="${172-i*5}" height="14" rx="2" fill="${hi ? '#FFFFFF' : '#333333'}" opacity="${hi ? '0.9' : '0.22'}"/>`)
    p.push(`<rect x="${cx2+18}" y="${Y+616}" width="${210-i*8}" height="11" rx="2" fill="${hi ? 'rgba(255,255,255,0.6)' : '#DDDDDD'}"/>`)
    p.push(`<rect x="${cx2+18}" y="${Y+634}" width="${192-i*6}" height="11" rx="2" fill="${hi ? 'rgba(255,255,255,0.4)' : '#EEEEEE'}"/>`)
  }

  return p.join('\n')
}

function dashboardContent(c, uid, opts = {}) {
  const p = []
  const Y = 52
  const SW = 200  // sidebar width
  const MX = SW   // main content X
  const MW = W - SW

  const menu = opts.menu || ['Dashboard', 'Data', 'Laporan', 'Pengguna', 'Pengaturan', 'Keluar']
  const stats = opts.stats || ['Jumlah', 'Aktif', 'Selesai', 'Total']

  // — SIDEBAR —
  p.push(`<rect x="0" y="${Y}" width="${SW}" height="${H-Y}" fill="${c}"/>`)
  p.push(`<rect x="16" y="${Y+16}" width="30" height="18" rx="3" fill="#FFFFFF" opacity="0.28"/>`)
  p.push(`<rect x="52" y="${Y+20}" width="84" height="12" rx="2" fill="#FFFFFF" opacity="0.42"/>`)
  p.push(`<rect x="0" y="${Y+48}" width="${SW}" height="1" fill="#FFFFFF" opacity="0.10"/>`)
  menu.forEach((_, i) => {
    const active = i === 0
    p.push(`<rect x="8" y="${Y+60+i*52}" width="${SW-16}" height="40" rx="8" fill="#FFFFFF" opacity="${active ? '0.16' : '0'}"/>`)
    p.push(`<rect x="22" y="${Y+70+i*52}" width="20" height="20" rx="4" fill="#FFFFFF" opacity="${active ? '0.92' : '0.36'}"/>`)
    p.push(`<rect x="50" y="${Y+75+i*52}" width="${[78,42,62,65,68,34][i] || 55}" height="10" rx="2" fill="#FFFFFF" opacity="${active ? '0.92' : '0.42'}"/>`)
  })

  // — MAIN AREA —
  p.push(`<rect x="${MX}" y="${Y}" width="${MW}" height="${H-Y}" fill="#F0F2F5"/>`)

  // header bar
  p.push(`<rect x="${MX}" y="${Y}" width="${MW}" height="52" fill="#FFFFFF"/>`)
  p.push(`<rect x="${MX}" y="${Y+52}" width="${MW}" height="1" fill="#E4E7EB"/>`)
  p.push(`<rect x="${MX+20}" y="${Y+16}" width="220" height="14" rx="3" fill="#333333" opacity="0.15"/>`)
  p.push(`<circle cx="${W-50}" cy="${Y+26}" r="18" fill="${c}" opacity="0.14"/>`)
  p.push(`<circle cx="${W-95}" cy="${Y+26}" r="18" fill="#EEEEEE" opacity="0.9"/>`)

  // stat cards
  const scW = Math.floor((MW - 48) / 4) - 8
  stats.forEach((s, i) => {
    const scX = MX + 20 + i * (scW + 10)
    const hi = i === 0
    p.push(`<rect x="${scX}" y="${Y+68}" width="${scW}" height="98" rx="10" fill="${hi ? c : '#FFFFFF'}"/>`)
    p.push(`<rect x="${scX+14}" y="${Y+88}" width="${[76,72,62,80][i]}" height="10" rx="2" fill="${hi ? 'rgba(255,255,255,0.55)' : '#CCCCCC'}"/>`)
    p.push(`<rect x="${scX+14}" y="${Y+110}" width="${[100,92,84,108][i]}" height="22" rx="3" fill="${hi ? '#FFFFFF' : '#1A1A2E'}" opacity="${hi ? '0.95' : '0.75'}"/>`)
    p.push(`<rect x="${scX+14}" y="${Y+145}" width="62" height="10" rx="2" fill="${hi ? 'rgba(255,255,255,0.5)' : '#22AA55'}" opacity="0.82"/>`)
  })

  // chart card
  const chW = Math.floor(MW * 0.60) - 26
  p.push(`<rect x="${MX+20}" y="${Y+180}" width="${chW}" height="204" rx="10" fill="#FFFFFF"/>`)
  p.push(`<rect x="${MX+38}" y="${Y+198}" width="140" height="14" rx="3" fill="#333333" opacity="0.15"/>`)
  // area chart
  const ky = [45,55,50,66,58,76,70,68,86,80,94,90,100]
  const plotX = MX + 42, plotW2 = chW - 38, plotH = 100, baseY = Y + 362
  const pts = ky.map((v, i) => `${plotX + i*(plotW2/12)},${baseY - v*plotH/100}`)
  const area = pts.join(' ') + ` ${plotX+12*(plotW2/12)},${baseY} ${plotX},${baseY}`
  p.push(`<defs><linearGradient id="cg${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c}" stop-opacity="0.25"/><stop offset="100%" stop-color="${c}" stop-opacity="0.02"/></linearGradient></defs>`)
  p.push(`<polygon points="${area}" fill="url(#cg${uid})"/>`)
  p.push(`<polyline points="${pts.join(' ')}" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`)

  // donut card
  const dX = MX + 20 + chW + 10, dW = MW - 50 - chW
  const dCX = dX + dW/2, dCY = Y + 296
  p.push(`<rect x="${dX}" y="${Y+180}" width="${dW}" height="204" rx="10" fill="#FFFFFF"/>`)
  p.push(`<rect x="${dX+16}" y="${Y+198}" width="110" height="14" rx="3" fill="#333333" opacity="0.15"/>`)
  p.push(`<circle cx="${dCX}" cy="${dCY}" r="52" fill="none" stroke="#EEEEEE" stroke-width="22"/>`)
  p.push(`<circle cx="${dCX}" cy="${dCY}" r="52" fill="none" stroke="${c}" stroke-width="22" stroke-dasharray="198 130" stroke-linecap="round" transform="rotate(-90 ${dCX} ${dCY})"/>`)

  // bottom table
  p.push(`<rect x="${MX+20}" y="${Y+397}" width="${MW-40}" height="202" rx="10" fill="#FFFFFF"/>`)
  p.push(`<rect x="${MX+38}" y="${Y+415}" width="160" height="14" rx="3" fill="#333333" opacity="0.15"/>`)
  p.push(`<rect x="${MX+20}" y="${Y+442}" width="${MW-40}" height="2" fill="#F5F5F5"/>`)
  const cW2 = Math.floor((MW - 80) / 4)
  for (let col = 0; col < 4; col++) {
    p.push(`<rect x="${MX+38+col*cW2}" y="${Y+452}" width="${cW2-24}" height="10" rx="2" fill="#CCCCCC"/>`)
  }
  p.push(`<rect x="${MX+20}" y="${Y+474}" width="${MW-40}" height="1" fill="#F5F5F5"/>`)
  for (let row = 0; row < 5; row++) {
    const op = [0.15,0.08,0.12,0.07,0.10][row]
    const ry = Y + 482 + row*22
    p.push(`<rect x="${MX+38}" y="${ry}" width="${cW2-24}" height="10" rx="2" fill="${c}" opacity="${op}"/>`)
    p.push(`<rect x="${MX+38+cW2}" y="${ry}" width="${cW2-24}" height="10" rx="2" fill="#DDDDDD"/>`)
    p.push(`<rect x="${MX+38+2*cW2}" y="${ry}" width="${cW2-24}" height="10" rx="2" fill="#DDDDDD"/>`)
    p.push(`<rect x="${MX+38+3*cW2}" y="${ry-2}" width="56" height="18" rx="9" fill="${c}" opacity="${op}"/>`)
  }

  return p.join('\n')
}

const DASH_OPTS = {
  3: {
    menu: ['Dashboard', 'Pasien', 'Antrian', 'Rekam Medis', 'Jadwal', 'Laporan'],
    stats: ['Total Pasien', 'Antrian Hari Ini', 'Selesai', 'Pendapatan'],
  },
  4: {
    menu: ['Dashboard', 'Armada', 'Booking', 'Pengemudi', 'Laporan', 'Pengaturan'],
    stats: ['Total Armada', 'Booking Aktif', 'Pengemudi', 'Pendapatan'],
  },
  5: {
    menu: ['Dashboard', 'Stok', 'Penjualan', 'Cabang', 'Laporan', 'Pengaturan'],
    stats: ['Stok Unit', 'Terjual Bulan Ini', 'Cabang', 'Omzet'],
  },
  6: {
    menu: ['Dashboard', 'Produk', 'Pembelian', 'Penjualan', 'Keuangan', 'Laporan'],
    stats: ['Total Produk', 'Transaksi Hari Ini', 'Hutang Piutang', 'Omzet'],
  },
}

function makeSVG(item) {
  const content = item.kind === 'land'
    ? landingContent(item.c)
    : dashboardContent(item.c, `u${item.n}`, DASH_OPTS[item.n] || {})

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`,
    // outer bg (shows as shadow behind browser card)
    `<rect width="${W}" height="${H}" fill="#D9DDE3"/>`,
    // browser window
    `<rect width="${W}" height="${H}" rx="12" fill="#FFFFFF"/>`,
    browserChrome(),
    content,
    // bottom title bar
    `<rect x="0" y="${H-52}" width="${W}" height="52" fill="${item.c}" opacity="0.94"/>`,
    `<text x="36" y="${H-18}" font-family="Arial,sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" opacity="0.95">${esc(item.title)}</text>`,
    `<rect x="${W-200}" y="${H-42}" width="178" height="30" rx="15" fill="#FFFFFF" opacity="0.18"/>`,
    `<text x="${W-111}" y="${H-20}" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="#FFFFFF" opacity="0.92">${esc(item.price)}</text>`,
    `</svg>`,
  ].join('\n')
}

for (const item of showcase) {
  const svg = makeSVG(item)
  await sharp(Buffer.from(svg)).png().toFile(join(outDir, `${item.n}.png`))
  console.log(`Generated public/portfolio/${item.n}.png`)
}
console.log('Done.')
