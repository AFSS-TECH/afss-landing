import './index.css'
import { ViteReactSSG } from 'vite-react-ssg/single-page'
import App from './App.jsx'

// Single-page SSG: vite-react-ssg renders <App /> to static HTML at build time
// (crawler-friendly) and hydrates it on the client.
export const createRoot = ViteReactSSG(<App />)
