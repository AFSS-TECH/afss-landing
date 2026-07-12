import sharp from 'sharp'
import { createCanvas } from 'canvas'
import fs from 'fs'
import path from 'path'

const blogImages = [
  { slug: 'optimasi-kecepatan-website', title: 'Optimasi Kecepatan Website', color1: '#2BB3A3', color2: '#0E8C86' },
  { slug: 'api-integration-sistem-bisnis', title: 'API Integration', color1: '#1E88A8', color2: '#0E5E78' },
  { slug: 'progressive-web-app-pwa', title: 'Progressive Web App', color1: '#0E8C86', color2: '#1E88A8' },
  { slug: 'devops-continuous-deployment', title: 'DevOps & Deployment', color1: '#15243B', color2: '#2BB3A3' },
]

async function generateBlogImage(slug, title, color1, color2) {
  const width = 1200
  const height = 630

  // Create SVG
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      <circle cx="200" cy="150" r="80" fill="rgba(255,255,255,0.1)"/>
      <circle cx="1000" cy="500" r="120" fill="rgba(255,255,255,0.08)"/>
      <rect x="100" y="250" width="1000" height="180" fill="rgba(255,255,255,0.05)" rx="10"/>
      <text x="600" y="360" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="white" text-anchor="middle">
        ${title}
      </text>
      <text x="600" y="420" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)" text-anchor="middle">
        Blog AFSS — Tips Website, Aplikasi &amp; Teknologi
      </text>
    </svg>
  `

  const outputPath = path.join('D:\\coding\\a fss\\public\\blog', `${slug}.png`)

  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath)
    console.log(`✓ Created ${slug}.png`)
  } catch (err) {
    console.error(`✗ Failed to create ${slug}.png:`, err.message)
  }
}

async function main() {
  console.log('Generating blog post images...\n')
  for (const img of blogImages) {
    await generateBlogImage(img.slug, img.title, img.color1, img.color2)
  }
  console.log('\n✓ All images generated!')
}

main().catch(console.error)
