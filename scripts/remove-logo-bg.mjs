// Remove gray/white background from AFSS logo JPG → transparent PNG
// Uses flood-fill from corners to detect background, then sets to transparent.
import sharp from 'sharp'
import { join } from 'path'

const SRC = 'D:/coding/PT Advanced Future Software Solutions (AFSS).jpg'
const DIST_DARK = 'D:/coding/a fss/public/logo-full.png'   // for light bg (nav/header)
const DIST_LIGHT = 'D:/coding/a fss/public/logo-full-light.png'  // for dark bg (footer)

const TOLERANCE = 30  // how different a pixel can be from seed color to still be "background"

function colorDiff(r1, g1, b1, r2, g2, b2) {
  return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2)
}

async function removeBg(src, dest, lightVersion = false) {
  const img = sharp(src)
  const { width, height } = await img.metadata()

  // Get raw RGBA data
  const raw = await img.ensureAlpha().raw().toBuffer()
  const pixels = new Uint8Array(raw)

  const idx = (x, y) => (y * width + x) * 4

  // Seed points: all 4 corners (to catch both outer gray and inner white)
  const seeds = [
    [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
    // Also seed from image edges to catch the inner white rect
    [Math.floor(width / 2), 0],
    [Math.floor(width / 2), height - 1],
    [0, Math.floor(height / 2)],
    [width - 1, Math.floor(height / 2)],
  ]

  const visited = new Uint8Array(width * height)
  const queue = []

  for (const [sx, sy] of seeds) {
    const i = idx(sx, sy)
    const sr = pixels[i], sg = pixels[i + 1], sb = pixels[i + 2]
    // Only seed if close to white or beige (not dark logo colors)
    if (sr > 180 && sg > 175 && sb > 165) {
      if (!visited[sy * width + sx]) {
        visited[sy * width + sx] = 1
        queue.push([sx, sy, sr, sg, sb])
      }
    }
  }

  // BFS flood-fill
  let qi = 0
  while (qi < queue.length) {
    const [x, y, seedR, seedG, seedB] = queue[qi++]
    const i = idx(x, y)

    // Mark transparent
    pixels[i + 3] = 0

    const neighbors = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]
    for (const [nx, ny] of neighbors) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
      if (visited[ny * width + nx]) continue

      const ni = idx(nx, ny)
      const nr = pixels[ni], ng = pixels[ni + 1], nb = pixels[ni + 2]

      // Check if neighbor is close to seed color AND close to white/beige
      if (
        nr > 170 && ng > 165 && nb > 155 &&
        colorDiff(nr, ng, nb, seedR, seedG, seedB) < TOLERANCE * 2
      ) {
        visited[ny * width + nx] = 1
        queue.push([nx, ny, nr, ng, nb])
      }
    }
  }

  // If making light version: convert ALL non-transparent pixels to white
  // except teal pixels (which stay teal, they're visible on dark bg)
  if (lightVersion) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = idx(x, y)
        if (pixels[i + 3] === 0) continue  // skip transparent
        const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2]
        // Detect teal: high G and B, G > R by a lot
        const isTeal = g > 140 && b > 120 && g > r + 60
        if (!isTeal) {
          // Make white (preserve original alpha for smooth edges)
          pixels[i] = 255; pixels[i + 1] = 255; pixels[i + 2] = 255
        }
      }
    }
  }

  await sharp(Buffer.from(pixels), { raw: { width, height, channels: 4 } })
    .trim({ threshold: 0 })  // auto-crop transparent edges
    .png({ compressionLevel: 9 })
    .toFile(dest)

  console.log(`✓ ${dest}`)
}

await removeBg(SRC, DIST_DARK, false)
await removeBg(SRC, DIST_LIGHT, true)
console.log('Done.')
