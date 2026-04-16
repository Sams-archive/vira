import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'

import Demo          from './pages/Demo'
import LandingPage   from './pages/LandingPage'
import Auth          from './pages/Auth'
import Dashboard     from './pages/Dashboard'
import GenerateVideo from './pages/GenerateVideo'
import ImportVideo   from './pages/ImportVideo'
import AIClips       from './pages/AIClips'
import VoiceGenerator  from './pages/VoiceGenerator'
import CaptionStudio   from './pages/CaptionStudio'
import Editor        from './pages/Editor'
import Pricing       from './pages/Pricing'

// ── Loading screen ────────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
          <span className="text-white font-display font-bold text-sm">V</span>
        </div>
        <span className="font-display font-extrabold text-2xl tracking-tight text-white">
          VIR<span className="text-accent2">A</span>
        </span>
      </div>
      <div className="w-5 h-5 rounded-full border-2 border-white/10 border-t-accent animate-spin" />
      <p className="text-white/30 text-xs tracking-widest uppercase font-medium">
        Loading VIRA…
      </p>
    </div>
  )
}

// ── Protected route ───────────────────────────────────────────────────────────
// Only shows loading screen on protected pages, never on public ones
function ProtectedRoute({ session, loading, children }) {
  if (loading) return <LoadingScreen />
  if (!session) return <Navigate to="/auth" replace />
  return children
}

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check session once on app load — fast
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Keep session in sync on login / logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      <div className="noise-overlay" />
      <Routes>

        {/* ── Public routes — instant, no loading screen ever ── */}
        <Route path="/"        element={<LandingPage />} />
        <Route path="/pricing" element={<Pricing />}     />
        <Route path="/demo"    element={<Demo />}        />

        {/* Auth — instant load, no delay */}
        <Route path="/auth"    element={<Auth />} />
        <Route path="/login"   element={<Auth />} />
        <Route path="/signup"  element={<Auth />} />

        {/* ── Protected routes — loading screen only shows here ── */}
        <Route path="/dashboard" element={
          <ProtectedRoute session={session} loading={loading}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/generate" element={
          <ProtectedRoute session={session} loading={loading}>
            <GenerateVideo />
          </ProtectedRoute>
        } />
        <Route path="/import" element={
          <ProtectedRoute session={session} loading={loading}>
            <ImportVideo />
          </ProtectedRoute>
        } />
        <Route path="/clips" element={
          <ProtectedRoute session={session} loading={loading}>
            <AIClips />
          </ProtectedRoute>
        } />
        <Route path="/voice" element={
          <ProtectedRoute session={session} loading={loading}>
            <VoiceGenerator />
          </ProtectedRoute>
        } />
        <Route path="/captions" element={
          <ProtectedRoute session={session} loading={loading}>
            <CaptionStudio />
          </ProtectedRoute>
        } />
        <Route path="/editor" element={
          <ProtectedRoute session={session} loading={loading}>
            <Editor />
          </ProtectedRoute>
        } />

        {/* ── Catch-all ── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  )
}