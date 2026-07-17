import './index.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { Layout, Home, NotFound } from './App.jsx'
import { LayananIndex, LayananDetail, About, Contact, Portfolio, PortfolioDetail, Estimasi, Privacy, Terms, Keunggulan, Harga, Faq, Karir, AjukanProyek } from './Pages.jsx'
import { postsMeta } from './blog-meta.js'
import { products, portfolioProjects } from './data.js'
import { LOCALES, LOCALE_PREFIX, DEFAULT_LOCALE } from './i18n/locales.js'

// Multi-route SSG: every route is prerendered to its own static HTML file for full crawlability.
// Blog routes are lazy-loaded (`lazy:`) so src/blog.js (~600KB of article markdown) only
// downloads when a visitor actually opens /blog — every other page (home, portofolio, harga,
// etc.) no longer pays that weight. The homepage teaser instead reads the lightweight
// `blog-meta.js` (titles/excerpts only, no article body).
//
// i18n: the whole route tree below is built once per supported locale (id/en/zh) via
// `buildRouteTree(locale)`, each mounted at its own prefix ('' for id, '/en', '/zh' — see
// src/i18n/locales.js). Adding a new language later is just one more locale in that list;
// nothing here needs to change. Legal pages are Indonesian-only for now (see
// isDefaultLocale below) so /en/* and /zh/* never link to an untranslated page. Blog posts
// are fully translated (see src/blog.js's i18n shape) and available under every locale.
function buildRouteTree(locale) {
  const prefix = LOCALE_PREFIX[locale]
  const abs = (path) => prefix + path // absolute path for getStaticPaths, e.g. '/en/layanan/erp'
  const isDefaultLocale = locale === DEFAULT_LOCALE

  const children = [
    { index: true, element: <Home /> },
    // Blog (lazy chunk — only loaded on /blog/*)
    { path: 'blog', lazy: async () => { const m = await import('./Blog.jsx'); return { Component: m.BlogIndex } } },
    {
      path: 'blog/:slug',
      lazy: async () => { const m = await import('./Blog.jsx'); return { Component: m.BlogPost } },
      getStaticPaths: () => postsMeta.map((p) => abs(`/blog/${p.slug}`)),
    },
    // Layanan
    { path: 'layanan', element: <LayananIndex /> },
    {
      path: 'layanan/:slug',
      element: <LayananDetail />,
      getStaticPaths: () => products.map((p) => abs(`/layanan/${p.slug}`)),
    },
    // Static pages
    { path: 'tentang', element: <About /> },
    { path: 'kontak', element: <Contact /> },
    { path: 'portofolio', element: <Portfolio /> },
    {
      path: 'portofolio/:slug',
      element: <PortfolioDetail />,
      getStaticPaths: () => portfolioProjects.map((p) => abs(`/portofolio/${p.slug}`)),
    },
    { path: 'estimasi', element: <Estimasi /> },
    { path: 'keunggulan', element: <Keunggulan /> },
    { path: 'harga', element: <Harga /> },
    { path: 'faq', element: <Faq /> },
    { path: 'karir', element: <Karir /> },
    { path: 'ajukan-proyek', element: <AjukanProyek /> },
  ]

  // Legal pages: Indonesian-only until Phase 3 of the i18n rollout translates them.
  if (isDefaultLocale) {
    children.push(
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
    )
  }

  // Catch-all — must be last. Covers any unmatched path (e.g. an id-only
  // section like /blog reached under /en or /zh) with a proper branded 404
  // instead of React Router's default error boundary.
  children.push({ path: '*', element: <NotFound /> })

  return { path: prefix || '/', element: <Layout />, children }
}

export const routes = LOCALES.map(buildRouteTree)

export const createRoot = ViteReactSSG({ routes })
