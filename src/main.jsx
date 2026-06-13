import './index.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { Layout, Home } from './App.jsx'
import { BlogIndex, BlogPost } from './Blog.jsx'
import { posts } from './blog.js'

// Multi-route SSG: every route is prerendered to its own static HTML file
// (home, /blog, and one page per blog post) for full crawlability.
export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'blog', element: <BlogIndex /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        getStaticPaths: () => posts.map((p) => `/blog/${p.slug}`),
      },
    ],
  },
]

export const createRoot = ViteReactSSG({ routes })
