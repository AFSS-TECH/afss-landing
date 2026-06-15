/**
 * Daily Blog Analytics Email Report Generator
 * Runs via scheduled task / cron job
 * Sends email to: oto.cmd.co@gmail.com
 *
 * Usage: node scripts/generate-email-report.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Generate HTML email report
 */
function generateEmailHTML(report) {
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
    .header { background: linear-gradient(135deg, #0E8C86 0%, #1E88A8 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
    .content { background: white; padding: 30px; }
    .stat-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
    .stat-label { font-weight: 500; }
    .stat-value { font-size: 18px; font-weight: bold; color: #0E8C86; }
    .section { margin: 25px 0; }
    .section h3 { margin: 0 0 12px 0; color: #1E88A8; font-size: 16px; }
    .page-item { padding: 8px 0; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; }
    .page-name { flex: 1; }
    .page-count { font-weight: bold; color: #0E8C86; }
    .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
    .cta { background: #0E8C86; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 AFSS Blog Analytics</h1>
      <p>Laporan Kunjungan Website • ${today}</p>
    </div>

    <div class="content">
      <div class="section">
        <h3>📈 Ringkasan Minggu Lalu</h3>
        <div class="stat-row">
          <span class="stat-label">Total Kunjungan:</span>
          <span class="stat-value">${report.totalVisits || '—'}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Pengunjung Unik:</span>
          <span class="stat-value">${report.uniqueVisitors || '—'}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Periode:</span>
          <span class="stat-value" style="font-size: 14px; color: #333;">${report.period}</span>
        </div>
      </div>

      <div class="section">
        <h3>🔝 Halaman Paling Dikunjungi</h3>
        ${
          report.topPages && report.topPages.length > 0
            ? report.topPages
                .map(
                  (page) => `
          <div class="page-item">
            <span class="page-name">${page.name}</span>
            <span class="page-count">${page.views} views</span>
          </div>
        `
                )
                .join('')
            : '<p style="color: #999; font-size: 14px;">Data belum tersedia</p>'
        }
      </div>

      <div class="section">
        <h3>💡 Update Blog Terbaru</h3>
        <p>Kami terus membuat artikel baru tentang:</p>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Pembuatan Website & Aplikasi</li>
          <li>Panduan Teknologi & Digital</li>
          <li>Tips Bisnis Online</li>
          <li>Tren Industri Tech</li>
        </ul>
      </div>

      <div style="text-align: center;">
        <a href="https://afss-landing.vercel.app/blog" class="cta">Lihat Blog Lengkap →</a>
      </div>
    </div>

    <div class="footer">
      <p>
        📧 Laporan otomatis AFSS Blog Analytics<br>
        Dikirim setiap hari Senin pukul 09:00<br>
        <small style="color: #999;">Jangan balas email ini. Hubungi: <a href="mailto:oto.cmd.co@gmail.com" style="color: #0E8C86;">oto.cmd.co@gmail.com</a></small>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Main report generator
 */
async function generateReport() {
  const today = new Date()
  const reportDate = today.toISOString().split('T')[0]

  // Placeholder report structure
  // In production, this would fetch real data from analytics service
  const report = {
    period: 'Seminggu terakhir',
    totalVisits: 0,
    uniqueVisitors: 0,
    topPages: [],
    generatedAt: new Date().toISOString(),
  }

  const htmlContent = generateEmailHTML(report)

  // Save report to file for reference
  const reportPath = path.join(__dirname, `../reports/email-report-${reportDate}.html`)
  const reportDir = path.dirname(reportPath)

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true })
  }

  fs.writeFileSync(reportPath, htmlContent, 'utf-8')

  console.log(`✓ Email report generated: ${reportPath}`)
  console.log(`
To send this email via SendGrid, Gmail, or other provider:

1. Get HTML content from report file
2. Send via email API to: oto.cmd.co@gmail.com
3. Subject: "AFSS Blog Analytics — ${today.toLocaleDateString('id-ID')}"

Example with SendGrid:
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
await sgMail.send({
  to: 'oto.cmd.co@gmail.com',
  from: 'noreply@afss-landing.vercel.app',
  subject: 'AFSS Blog Analytics',
  html: htmlContent,
});
  `)

  return {
    success: true,
    reportPath,
    reportDate,
    htmlLength: htmlContent.length,
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateReport().catch(console.error)
}

export { generateReport, generateEmailHTML }
