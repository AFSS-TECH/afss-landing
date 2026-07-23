// Dashboard-editable brand/contact info, shared by the app shell (Nav/Footer) and
// every homepage/page section that links out to WhatsApp.
import { BRAND, WA } from '../data/index.js'
import { useSectionOverride } from './content.js'

const BRAND_FALLBACK = { ...BRAND, wa: WA }
export const useBrand = () => useSectionOverride('brand', BRAND_FALLBACK)
export const buildWaLink = (wa, msg) => `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`
