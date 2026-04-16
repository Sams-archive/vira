import { useState, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { voiceApi } from '../lib/api'
import { Mic2, Play, Pause, Download, Loader2, Volume2, AlertCircle, CheckCircle2 } from 'lucide-react'

const emotions = ['Neutral', 'Happy', 'Excited', 'Serious', 'Sad', 'Whispering']

export default function VoiceGenerator() {
  const [text,          setText]          = useState('')
  const [voices,        setVoices]        = useState([])
  const [selectedVoice, setSelectedVoice] = useState('')
  const [emotion,       setEmotion]       = useState('Neutral')
  const [speed,         setSpeed]         = useState(1.0)
  const [pitch,         setPitch]         = useState(0)
  const [generating,    setGenerating]    = useState(false)
  const [generated,     setGenerated]     = useState(false)
  const [audioUrl,      setAudioUrl]      = useState('')
  const [playing,       setPlaying]       = useState(false)
  const [error,         setError]         = useState('')
  const [loading,       setLoading]       = useState(true)
  const [audio,         setAudio]         = useState(null)

  // Load voices from backend on mount
  useEffect(() => {
    loadVoices()
  }, [])

  const loadVoices = async () => {
    try {
      const result = await voiceApi.getVoices()
      setVoices(result.voices || [])
      if (result.voices?.length > 0) {
        setSelectedVoice(result.voices[0].id)
      }
    } catch (err) {
      console.error('Failed to load voices:', err)
      // Use fallback voices if backend is offline
      const fallback = [
        { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Aria',  gender: 'Female', accent: 'American', tone: 'Warm'      },
        { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', gender: 'Male',   accent: 'American', tone: 'Calm'      },
        { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli',   gender: 'Female', accent: 'American', tone: 'Emotional' },
        { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh',   gender: 'Male',   accent: 'American', tone: 'Deep'      },
      ]
      setVoices(fallback)
      setSelectedVoice(fallback[0].id)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    if (!text.trim()) return
    setGenerating(true)
    setGenerated(false)
    setError('')
    if (audio) { audio.pause(); setAudio(null) }

    try {
      const result = await voiceApi.generate({
        text,
        voiceId: selectedVoice,
        emotion: emotion.toLowerCase(),
        speed,
        pitch,
      })

      setAudioUrl(result.url)
      setGenerated(true)

      // Auto play
      if (result.url) {
        const a = new Audio(result.url)
        setAudio(a)
        a.play()
        setPlaying(true)
        a.onended = () => setPlaying(false)
      }

    } catch (err) {
      console.error('Voice generate error:', err)
      setError(err.message || 'Voice generation failed. Check your ElevenLabs API key.')
    } finally {
      setGenerating(false)
    }
  }

  const togglePlay = () => {
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  const handleDownload = () => {
    if (!audioUrl) return
    const link    = document.createElement('a')
    link.href     = audioUrl
    link.download = 'vira-voiceover.mp3'
    link.click()
  }

  const selectedVoiceData = voices.find(v => v.id === selectedVoice)

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl">

        <div className="mb-8">
          <p className="section-label">AI Studio</p>
          <h1 className="font-display font-bold text-2xl mb-1">Voice Generator</h1>
          <p className="text-white/40 text-sm">Generate natural AI voiceovers powered by ElevenLabs.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-6">
          {/* Left */}
          <div className="space-y-5">

            {/* Script */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-5">
              <label className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-3">
                Script
              </label>
              <textarea
                className="input-field resize-none min-h-[140px] text-sm leading-relaxed"
                placeholder="Paste your script here…"
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <div className="flex justify-between mt-2">
                <p className="text-[10px] text-white/25">
                  {text.split(' ').filter(Boolean).length} words · ~{Math.max(1, Math.round(text.split(' ').filter(Boolean).length / 150))} min
                </p>
                <p className="text-[10px] text-white/25">{text.length}/2000</p>
              </div>
            </div>

            {/* Voice selection */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-5">
              <label className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-3">
                Voice
              </label>
              {loading ? (
                <div className="flex items-center gap-2 text-white/40">
                  <Loader2 size={14} className="animate-spin" />
                  <span className="text-sm">Loading voices…</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {voices.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVoice(v.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedVoice === v.id
                          ? 'border-accent/40 bg-accent/10'
                          : 'bg-white/[0.03] border-white/[0.07] hover:border-white/15'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-2 font-display font-bold text-xs text-white">
                        {v.name[0]}
                      </div>
                      <p className="text-xs font-medium text-white">{v.name}</p>
                      <p className="text-[10px] text-white/40">{v.gender} · {v.accent}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{v.tone}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-5 space-y-5">
              <label className="block text-xs font-medium text-white/40 uppercase tracking-widest">
                Voice Settings
              </label>

              {/* Emotion */}
              <div>
                <p className="text-xs text-white/50 mb-2">Emotion</p>
                <div className="flex flex-wrap gap-2">
                  {emotions.map(e => (
                    <button
                      key={e}
                      onClick={() => setEmotion(e)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                        emotion === e
                          ? 'bg-accent2/10 border-accent2/30 text-teal-400'
                          : 'bg-white/5 border-white/[0.07] text-white/40'
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed */}
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-xs text-white/50">Speed</p>
                  <p className="text-xs font-medium text-white">{speed.toFixed(1)}×</p>
                </div>
                <input
                  type="range" min="0.5" max="2" step="0.1"
                  value={speed}
                  onChange={e => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>

              {/* Pitch */}
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-xs text-white/50">Pitch</p>
                  <p className="text-xs font-medium text-white">{pitch > 0 ? `+${pitch}` : pitch}</p>
                </div>
                <input
                  type="range" min="-10" max="10" step="1"
                  value={pitch}
                  onChange={e => setPitch(parseInt(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-accent3/10 border border-accent3/20 rounded-xl px-4 py-3 flex items-center gap-2">
                <AlertCircle size={15} className="text-rose-400 flex-shrink-0" />
                <p className="text-sm text-rose-400">{error}</p>
              </div>
            )}

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={generating || !text.trim() || !selectedVoice}
              className="w-full bg-accent text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-base"
            >
              {generating
                ? <><Loader2 size={16} className="animate-spin" /> Generating voiceover…</>
                : <><Mic2 size={16} /> Generate Voiceover</>
              }
            </button>
          </div>

          {/* Right — output */}
          <div>
            <div className="bg-card border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/[0.06]">
                <p className="text-xs font-medium text-white/40 uppercase tracking-widest">Output</p>
              </div>
              <div className="p-5">
                {!generated && !generating && (
                  <div className="text-center py-8">
                    <Volume2 size={28} className="text-white/15 mx-auto mb-3" />
                    <p className="text-xs text-white/30">Your voiceover will appear here</p>
                  </div>
                )}

                {generating && (
                  <div className="text-center py-8">
                    <Loader2 size={28} className="text-accent animate-spin mx-auto mb-3" />
                    <p className="text-xs text-white/40">Synthesising voice…</p>
                  </div>
                )}

                {generated && !generating && (
                  <div className="space-y-4">
                    {/* Success badge */}
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-accent2" />
                      <p className="text-xs text-accent2 font-medium">Voiceover ready!</p>
                    </div>

                    {/* Player */}
                    <div className="bg-off-black rounded-xl p-3">
                      <div className="flex items-end gap-[2px] h-10 justify-center mb-3">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div
                            key={i}
                            className="rounded-full flex-shrink-0 transition-all"
                            style={{
                              width:      '3px',
                              height:     playing ? `${Math.random() * 28 + 4}px` : '6px',
                              background: i < 10 ? '#6C5CE7' : 'rgba(255,255,255,0.12)',
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={togglePlay}
                          className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:opacity-90 transition-all flex-shrink-0"
                        >
                          {playing
                            ? <Pause size={12} fill="white" className="text-white" />
                            : <Play  size={12} fill="white" className="text-white ml-0.5" />
                          }
                        </button>
                        <div className="flex-1">
                          <p className="text-xs font-medium">
                            {selectedVoiceData?.name || 'Voice'} · {emotion}
                          </p>
                          <p className="text-[9px] text-white/30">
                            Speed {speed.toFixed(1)}× · Pitch {pitch > 0 ? `+${pitch}` : pitch}
                          </p>
                        </div>
                        {playing && (
                          <span className="text-[9px] bg-accent2/10 text-teal-400 border border-accent2/20 px-2 py-0.5 rounded-full animate-pulse">
                            Playing
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleDownload}
                      className="w-full btn-secondary flex items-center justify-center gap-2 text-sm py-2.5"
                    >
                      <Download size={14} /> Download MP3
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}