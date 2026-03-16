import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import GenerateVideo from './pages/GenerateVideo'
import ImportVideo from './pages/ImportVideo'
import AIClips from './pages/AIClips'
import VoiceGenerator from './pages/VoiceGenerator'
import CaptionStudio from './pages/CaptionStudio'
import Editor from './pages/Editor'
import Pricing from './pages/Pricing'

export default function App() {
  return (
    <>
      <div className="noise-overlay" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<GenerateVideo />} />
        <Route path="/import" element={<ImportVideo />} />
        <Route path="/clips" element={<AIClips />} />
        <Route path="/voice" element={<VoiceGenerator />} />
        <Route path="/captions" element={<CaptionStudio />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </>
  )
}
