/**
 * Simple analytics logger for visitor tracking
 * Stores visitor data in Vercel KV (key-value store)
 * Used by daily email reporter to generate stats
 */

const KV_NAMESPACE = 'afss-blog-analytics'
const DATE_FORMAT = (d = new Date()) => d.toISOString().split('T')[0]

/**
 * Log a page view (called on client-side page navigation)
 * @param {string} pathname - e.g., '/blog/website-seo-friendly'
 * @param {string} referrer - document.referrer
 */
export async function logPageView(pathname, referrer = '') {
  if (typeof window === 'undefined') return

  try {
    const today = DATE_FORMAT()
    const data = {
      timestamp: new Date().toISOString(),
      pathname,
      referrer,
      userAgent: navigator.userAgent,
    }

    // Send to server endpoint (see API route below)
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: today, ...data }),
    }).catch(() => {
      // Silent fail — don't break app if logging fails
    })
  } catch (e) {
    console.error('[Analytics] Failed to log:', e)
  }
}

/**
 * Generate weekly report
 * Called by scheduled task / cron job
 * Returns stats for the past 7 days
 */
export function generateWeeklyReport() {
  const days = []
  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(DATE_FORMAT(d))
  }

  // In a real implementation, this would:
  // 1. Fetch visitor data from KV for each day
  // 2. Aggregate stats (total visits, top pages, etc.)
  // 3. Return structured data for email template

  return {
    period: `${days[6]} to ${days[0]}`,
    totalVisits: 0,
    uniqueVisitors: 0,
    topPages: [],
    trafficSources: {},
    generatedAt: new Date().toISOString(),
  }
}
