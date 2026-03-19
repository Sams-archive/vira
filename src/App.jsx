import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'

import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import GenerateVideo from './pages/GenerateVideo'
import ImportVideo from './pages/ImportVideo'
import AIClips from './pages/AIClips'
import VoiceGenerator from './pages/VoiceGenerator'
import CaptionStudio from './pages/CaptionStudio'
import Editor from './pages/Editor'
import Pricing from './pages/Pricing'

// ── Loading screen shown while checking auth session ──────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
          <span className="text-white font-display font-bold text-sm">V</span>
        </div>
        <span className="font-display font-extrabold text-2xl tracking-tight text-white">
          VIR<span className="text-accent2">A</span>
        </span>
      </div>

      {/* Spinner */}
      <div className="w-5 h-5 rounded-full border-2 border-white/10 border-t-accent animate-spin" />

      <p className="text-white/30 text-xs tracking-widest uppercase font-medium">
        Loading VIRA…
      </p>
    </div>
  )
}

// ── Wraps any route that requires a logged-in user ────────────────────────────
function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Keep session in sync if user logs in/out in another tab
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <LoadingScreen />

  if (!session) return <Navigate to="/auth" replace />

  return children
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <div className="noise-overlay" />
      <Routes>

        {/* Public — anyone can access */}
        <Route path="/"        element={<LandingPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/auth"    element={<Auth />} />
        <Route path="/login"   element={<Auth />} />
        <Route path="/signup"  element={<Auth />} />

        {/* Protected — redirects to /auth if not logged in */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/generate"  element={<ProtectedRoute><GenerateVideo /></ProtectedRoute>} />
        <Route path="/import"    element={<ProtectedRoute><ImportVideo /></ProtectedRoute>} />
        <Route path="/clips"     element={<ProtectedRoute><AIClips /></ProtectedRoute>} />
        <Route path="/voice"     element={<ProtectedRoute><VoiceGenerator /></ProtectedRoute>} />
        <Route path="/captions"  element={<ProtectedRoute><CaptionStudio /></ProtectedRoute>} />
        <Route path="/editor"    element={<ProtectedRoute><Editor /></ProtectedRoute>} />

        {/* Catch-all — unknown URLs go to home */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  )
}