import './index.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { Layout, Home } from './App.jsx'
import { LayananIndex, LayananDetail, About, Contact, Portfolio, PortfolioDetail, Estimasi, Privacy, Terms, Keunggulan, Harga, Faq, Karir, AjukanProyek, Dashboard } from './Pages.jsx'
import { postsMeta } from './blog-meta.js'
import { products, portfolioProjects } from './data.js'

// Multi-route SSG: every route is prerendered to its own static HTML file for full crawlability.
// Blog routes are lazy-loaded (`lazy:`) so src/blog.js (~600KB of article markdown) only
// downloads when a visitor actually opens /blog — every other page (home, portofolio, harga,
// etc.) no longer pays that weight. The homepage teaser instead reads the lightweight
// `blog-meta.js` (titles/excerpts only, no article body).
export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // Blog (lazy chunk — only loaded on /blog/*)
      { path: 'blog', lazy: async () => { const m = await import('./Blog.jsx'); return { Component: m.BlogIndex } } },
      {
        path: 'blog/:slug',
        lazy: async () => { const m = await import('./Blog.jsx'); return { Component: m.BlogPost } },
        getStaticPaths: () => postsMeta.map((p) => `/blog/${p.slug}`),
      },
      // Layanan
      { path: 'layanan', element: <LayananIndex /> },
      {
        path: 'layanan/:slug',
        element: <LayananDetail />,
        getStaticPaths: () => products.map((p) => `/layanan/${p.slug}`),
      },
      // Static pages
      { path: 'tentang', element: <About /> },
      { path: 'kontak', element: <Contact /> },
      { path: 'portofolio', element: <Portfolio /> },
      {
        path: 'portofolio/:slug',
        element: <PortfolioDetail />,
        getStaticPaths: () => portfolioProjects.map(p => `/portofolio/${p.slug}`),
      },
      { path: 'estimasi', element: <Estimasi /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      { path: 'keunggulan', element: <Keunggulan /> },
      { path: 'harga', element: <Harga /> },
      { path: 'faq', element: <Faq /> },
      { path: 'karir', element: <Karir /> },
      { path: 'ajukan-proyek', element: <AjukanProyek /> },
      { path: 'dashboard', element: <Dashboard /> },
    ],
  },
]

export const createRoot = ViteReactSSG({ routes })
