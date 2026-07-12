import { useEffect, useState } from 'react'
import { supabase } from './supabase.js'

// Module-scope cache: each section is fetched from Supabase at most once per
// page load, no matter how many components call useSectionOverride() for it.
const cache = new Map()
const inflight = new Map()

async function fetchSection(id) {
  if (cache.has(id)) return cache.get(id)
  if (inflight.has(id)) return inflight.get(id)
  if (!supabase) return null

  const promise = supabase
    .from('content_sections')
    .select('data')
    .eq('id', id)
    .maybeSingle()
    .then(({ data, error }) => {
      const value = !error && data ? data.data : null
      cache.set(id, value)
      inflight.delete(id)
      return value
    })
    .catch(() => {
      inflight.delete(id)
      return null
    })

  inflight.set(id, promise)
  return promise
}

// Renders the hardcoded `fallback` on first paint (so SSG output and crawlers
// without JS always see real content), then swaps in the dashboard-edited
// version from Supabase once it loads client-side — same progressive-
// enhancement pattern as incrementBlogView in src/lib/supabase.js.
export function useSectionOverride(id, fallback) {
  const [value, setValue] = useState(fallback)

  useEffect(() => {
    let cancelled = false
    fetchSection(id).then((data) => {
      if (!cancelled && data != null) setValue(data)
    })
    return () => { cancelled = true }
  }, [id])

  return value
}
