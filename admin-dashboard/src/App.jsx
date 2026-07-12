import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { Login } from './pages/Login.jsx'
import { Overview } from './pages/Overview.jsx'
import { Submissions } from './pages/Submissions.jsx'
import { BrandPage } from './pages/BrandPage.jsx'
import { SectionPage } from './pages/SectionPage.jsx'

function Protected({ children }) {
  const { session, loading } = useAuth()
  if (loading) return <div className="full-loading">Memuat...</div>
  if (!session) return <Navigate to="/login" replace />
  return children
}

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">{children}</main>
    </div>
  )
}

function Root() {
  const { session, loading } = useAuth()
  if (loading) return <div className="full-loading">Memuat...</div>

  return (
    <Routes>
      <Route path="/login" element={session ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<Protected><Layout><Overview /></Layout></Protected>} />
      <Route path="/pengajuan" element={<Protected><Layout><Submissions /></Layout></Protected>} />
      <Route path="/settings/brand" element={<Protected><Layout><BrandPage /></Layout></Protected>} />
      <Route path="/settings/:sectionKey" element={<Protected><Layout><SectionPage /></Layout></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </BrowserRouter>
  )
}
