import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone Vite app — deployed as its own Vercel project at dashboard.afss.tech,
// completely separate from the main landing page's build (../vite.config.js).
export default defineConfig({
  plugins: [react()],
})
