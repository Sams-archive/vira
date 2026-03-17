// import { Routes, Route } from 'react-router-dom'
// import LandingPage from './pages/LandingPage'
// import Dashboard from './pages/Dashboard'
// import GenerateVideo from './pages/GenerateVideo'
// import ImportVideo from './pages/ImportVideo'
// import AIClips from './pages/AIClips'
// import VoiceGenerator from './pages/VoiceGenerator'
// import CaptionStudio from './pages/CaptionStudio'
// import Editor from './pages/Editor'
// import Pricing from './pages/Pricing'

// export default function App() {
//   return (
//     <>
//       <div className="noise-overlay" />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/generate" element={<GenerateVideo />} />
//         <Route path="/import" element={<ImportVideo />} />
//         <Route path="/clips" element={<AIClips />} />
//         <Route path="/voice" element={<VoiceGenerator />} />
//         <Route path="/captions" element={<CaptionStudio />} />
//         <Route path="/editor" element={<Editor />} />
//         <Route path="/pricing" element={<Pricing />} />
//       </Routes>
//     </>
//   )
// }


import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { supabase } from './lib/supabase' // You'll need to create this helper file

import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import GenerateVideo from './pages/GenerateVideo'
import ImportVideo from './pages/ImportVideo'
import AIClips from './pages/AIClips'
import VoiceGenerator from './pages/VoiceGenerator'
import CaptionStudio from './pages/CaptionStudio'
import Editor from './pages/Editor'
import Pricing from './pages/Pricing'
import Auth from './pages/Auth' // Create a simple Login/Signup page

// 1. Higher-Order Component to protect private routes
function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center text-white">Loading VIRA...</div>;
  
  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default function App() {
  return (
    <>
      <div className="noise-overlay" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes (Wrapped in ProtectedRoute) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/generate" element={<ProtectedRoute><GenerateVideo /></ProtectedRoute>} />
        <Route path="/import" element={<ProtectedRoute><ImportVideo /></ProtectedRoute>} />
        <Route path="/clips" element={<ProtectedRoute><AIClips /></ProtectedRoute>} />
        <Route path="/voice" element={<ProtectedRoute><VoiceGenerator /></ProtectedRoute>} />
        <Route path="/captions" element={<ProtectedRoute><CaptionStudio /></ProtectedRoute>} />
        <Route path="/editor" element={<ProtectedRoute><Editor /></ProtectedRoute>} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}