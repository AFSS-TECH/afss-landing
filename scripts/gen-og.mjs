// Generates a branded Open Graph image (1200x630) for social sharing.
// Run once with `npm run gen:og`; output public/og.png is committed as a static asset.
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '..', 'public', 'og.png')

// Real AF brand mark (white/teal, for dark backgrounds) — embedded as-is so this
// matches the actual logo file used everywhere else, not a redrawn approximation.
const LOGO_MARK_B64 = readFileSync(join(__dirname, '..', 'public', 'logo-mark-light.png')).toString('base64')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="85%" cy="12%" r="60%">
      <stop offset="0%" stop-color="#2BB3A3" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#15243B" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#15243B"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="10" fill="#0E8C86"/>

  <!-- AF mark (real logo file, not redrawn) -->
  <image x="96" y="136" width="110" height="68" href="data:image/png;base64,${LOGO_MARK_B64}"/>
  <text x="240" y="190" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="800" fill="#FFFFFF" letter-spacing="-2">AFSS</text>
  <text x="244" y="232" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="600" fill="#AAB6C4">PT Advanced Future Software Solutions</text>

  <text x="96" y="380" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" fill="#FFFFFF">Jasa Pembuatan Website</text>
  <text x="96" y="452" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" fill="#FFFFFF">&amp; Aplikasi <tspan fill="#2BB3A3">Custom</tspan></text>

  <text x="96" y="540" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="500" fill="#B2BECC">Website &#183; Aplikasi Mobile &#183; Web App &#183; ERP &#183; UI/UX</text>

  <text x="96" y="592" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#2BB3A3">Building Future Digital Solutions</text>
  <text x="1104" y="592" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="#8995A4">afss-landing.vercel.app</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)
console.log('Generated', out)
