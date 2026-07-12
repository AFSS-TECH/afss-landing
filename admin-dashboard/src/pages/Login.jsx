import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (err) setError('Email atau password salah.')
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <h1>AFSS Dashboard</h1>
        <p className="login-sub">Masuk untuk mengelola landing page & pengajuan proyek.</p>
        <label className="field">
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
        </label>
        <label className="field">
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="btn-primary" type="submit" disabled={busy}>{busy ? 'Memproses...' : 'Masuk'}</button>
      </form>
    </div>
  )
}
