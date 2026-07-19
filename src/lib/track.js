// Lightweight analytics event helper — GTM/GA4-ready scaffold.
// The site doesn't ship an analytics tag yet; events are pushed to
// window.dataLayer (picked up automatically once GTM is installed) and to
// window.gtag when a GA4 tag is present. Until then this is a safe no-op,
// so CTAs can be instrumented today and measured the day a tag is added.
export const track = (event, params = {}) => {
  try {
    if (typeof window === 'undefined') return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
    if (typeof window.gtag === 'function') window.gtag('event', event, params)
  } catch { /* analytics must never break the UI */ }
}
