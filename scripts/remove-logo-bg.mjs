// Remove gray/white background from AFSS logo JPG → transparent PNG
// Simple per-pixel threshold: any pixel brighter than the logo colors → transparent
import sharp from 'sharp'

const SRC = 'D:/coding/PT Advanced Future Software Solutions (AFSS).jpg'
const DIST_DARK  = 'D:/coding/a fss/public/logo-full.png'        // nav (dark logo, light bg)
const DIST_LIGHT = 'D:/coding/a fss/public/logo-full-light.png'  // footer (white logo, dark bg)

async function removeBg(src, dest, lightVersion = false) {
  const img = sharp(src)
  const { width, height } = await img.metadata()
  const pixels = new Uint8Array(await img.ensureAlpha().raw().toBuffer())
  const n = width * height

  for (let i = 0; i < n; i++) {
    const p = i * 4
    const r = pixels[p], g = pixels[p+1], b = pixels[p+2]

    // Background detection: pixel is "light" = close to white or beige.
    // Logo colors are dark navy (#0E2240) and teal (#10C7B2) — both have
    // R < 50 or specific G/B ratios. Anything with all channels > 160
    // and not strongly teal is background.
    const isTeal = g > 140 && b > 100 && g > r + 60   // teal: #10C7B2
    const isLight = r > 160 && g > 155 && b > 145       // white or beige

    if (isLight) {
      // Smooth anti-aliased edges: partial transparency based on brightness
      const brightness = (r + g + b) / 3
      const alpha = brightness < 180
        ? Math.round((180 - brightness) / 20 * 255)  // 160–180: fade out
        : 0                                            // > 180: fully transparent
      pixels[p+3] = Math.min(pixels[p+3], alpha)
    }

    if (lightVersion && pixels[p+3] > 0) {
      // Convert remaining non-transparent pixels to white, keep teal as-is
      if (!isTeal) {
        pixels[p] = 255; pixels[p+1] = 255; pixels[p+2] = 255
      }
    }
  }

  await sharp(Buffer.from(pixels), { raw: { width, height, channels: 4 } })
    .trim({ threshold: 0 })
    .png({ compressionLevel: 9 })
    .toFile(dest)

  console.log(`✓ ${dest}`)
}

await removeBg(SRC, DIST_DARK,  false)
await removeBg(SRC, DIST_LIGHT, true)
console.log('Done.')
