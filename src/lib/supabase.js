import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// During SSG (Node build) these env vars may be unset for routes that don't
// need them — guard so the build never crashes; the client is only ever
// actually called from browser-side useEffect hooks.
export const supabase = url && key ? createClient(url, key) : null

// Records one view for `slug` and returns the updated { view_count, last_viewed_at }.
// Safe no-op (returns null) if Supabase isn't configured or the call fails.
export async function incrementBlogView(slug) {
  if (!supabase) return null
  try {
    const { data, error } = await supabase.rpc('increment_blog_view', { p_slug: slug })
    if (error || !data?.length) return null
    return data[0]
  } catch {
    return null
  }
}

// Returns a Map<slug, { view_count, last_viewed_at }> for every tracked post.
export async function fetchAllBlogViews() {
  if (!supabase) return new Map()
  try {
    const { data, error } = await supabase.from('blog_views').select('slug, view_count, last_viewed_at')
    if (error || !data) return new Map()
    return new Map(data.map((row) => [row.slug, row]))
  } catch {
    return new Map()
  }
}
