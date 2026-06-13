// Generates a unique branded cover image (1200x630) for each blog post.
// Used as the card cover, the article hero banner, and the per-post OG/Twitter image.
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

// Greedy word-wrap into at most `maxLines` lines of ~maxChars characters.
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

function svgFor(post) {
  const tag = post.tags[0] || 'Artikel'
  const chipW = tag.length * 15 + 56
  const lines = wrap(post.title, 26, 3)
  const lh = 80
  // keep the title block below the category chip and above the footer
  const firstY = 332 + (3 - lines.length) * 30
  const titleTspans = lines
    .map((l, i) => `<tspan x="80" y="${firstY + i * lh}">${esc(l)}</tspan>`)
    .join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${post.c}"/>
      <stop offset="100%" stop-color="${post.c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="82%" cy="14%" r="65%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <circle cx="1140" cy="700" r="300" fill="#ffffff" opacity="0.06"/>
  <circle cx="1050" cy="120" r="150" fill="#ffffff" opacity="0.05"/>
  <path d="M980 630 L1130 410 L1200 630 Z" fill="#ffffff" opacity="0.06"/>
  <rect width="1200" height="8" fill="#ffffff" opacity="0.30"/>

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
