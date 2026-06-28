import './index.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { Layout, Home } from './App.jsx'
import { BlogIndex, BlogPost } from './Blog.jsx'
import { LayananIndex, LayananDetail, About, Contact, Portfolio, PortfolioDetail, Estimasi, Privacy, Terms, Keunggulan, Harga, Faq, Karir, AjukanProyek, Dashboard } from './Pages.jsx'
import { StagingLayout, StagingHome } from './Staging.jsx'
import { posts } from './blog.js'
import { products, portfolioProjects } from './data.js'

// Multi-route SSG: every route is prerendered to its own static HTML file for full crawlability.
export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // Blog
      { path: 'blog', element: <BlogIndex /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        getStaticPaths: () => posts.map((p) => `/blog/${p.slug}`),
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
  // ── Disposable simplified-homepage preview (/staging). Delete this block + Staging.jsx before going live. ──
  {
    path: '/staging',
    element: <StagingLayout />,
    children: [
      { index: true, element: <StagingHome /> },
    ],
  },
]

export const createRoot = ViteReactSSG({ routes })
