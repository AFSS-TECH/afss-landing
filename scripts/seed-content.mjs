// One-time seed: pushes the current hardcoded landing-page content (src/data.js +
// the whyUs/addons item lists in src/i18n/strings.js) into the Supabase
// `content_sections` table, so the new admin dashboard starts pre-populated with
// real content instead of empty forms.
//
// Run once after applying scripts/content-schema.sql:
//   SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/seed-content.mjs
//
// Needs the SERVICE ROLE key (not the anon key) because content_sections write
// access is restricted to authenticated users via RLS — this script bypasses
// that intentionally for a one-off bootstrap. Never commit the service role key.

import { createClient } from '@supabase/supabase-js'
import {
  BRAND, WA, stats, clients, workflow, techStack, pricing, pricingBundles, faqs, why,
} from '../src/data.js'
import { STRINGS } from '../src/i18n/strings.js'

const url = process.env.VITE_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.')
  process.exit(1)
}

const supabase = createClient(url, serviceKey)

// whyUs.items and addons.items live in strings.js keyed by locale rather than
// per-item i18n — zip the three locale arrays (id/en/zh, same order, same
// length) into the { ...fields, i18n: { id, en, zh } } shape used everywhere
// else, so the dashboard's generic editor can treat every section uniformly.
function zipToPerItemI18n(idItems, enItems, zhItems) {
  return idItems.map((idItem, i) => ({
    i18n: { id: idItem, en: enItems[i], zh: zhItems[i] },
  }))
}

const whyUs = zipToPerItemI18n(STRINGS.id.whyUs.items, STRINGS.en.whyUs.items, STRINGS.zh.whyUs.items)
const addons = zipToPerItemI18n(STRINGS.id.addons.items, STRINGS.en.addons.items, STRINGS.zh.addons.items)

const hero = {
  id: { badge: STRINGS.id.hero.badge, h1Pre: STRINGS.id.hero.h1Pre, h1Ital: STRINGS.id.hero.h1Ital, h1Post: STRINGS.id.hero.h1Post, lead: STRINGS.id.hero.lead },
  en: { badge: STRINGS.en.hero.badge, h1Pre: STRINGS.en.hero.h1Pre, h1Ital: STRINGS.en.hero.h1Ital, h1Post: STRINGS.en.hero.h1Post, lead: STRINGS.en.hero.lead },
  zh: { badge: STRINGS.zh.hero.badge, h1Pre: STRINGS.zh.hero.h1Pre, h1Ital: STRINGS.zh.hero.h1Ital, h1Post: STRINGS.zh.hero.h1Post, lead: STRINGS.zh.hero.lead },
}

const brand = { ...BRAND, wa: WA }

const rows = [
  { id: 'hero', data: hero },
  { id: 'brand', data: brand },
  { id: 'stats', data: stats },
  { id: 'clients', data: clients },
  { id: 'why', data: why },
  { id: 'why_us', data: whyUs },
  { id: 'workflow', data: workflow },
  { id: 'addons', data: addons },
  { id: 'tech_stack', data: techStack },
  { id: 'pricing', data: pricing },
  { id: 'pricing_bundles', data: pricingBundles },
  { id: 'faqs', data: faqs },
]

const { error } = await supabase.from('content_sections').upsert(rows, { onConflict: 'id' })
if (error) {
  console.error('Seed failed:', error.message)
  process.exit(1)
}
console.log(`Seeded ${rows.length} content sections: ${rows.map((r) => r.id).join(', ')}`)
