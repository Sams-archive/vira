import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Mic2, Play, Pause, Download, Loader2, Volume2 } from 'lucide-react'

const voices = [
  { id: 'aria', name: 'Aria', gender: 'Female', accent: 'American', tone: 'Warm', color: 'bg-pink-400/15 border-pink-400/25 text-pink-300' },
  { id: 'nova', name: 'Nova', gender: 'Female', accent: 'British', tone: 'Professional', color: 'bg-violet-400/15 border-violet-400/25 text-violet-300' },
  { id: 'max', name: 'Max', gender: 'Male', accent: 'American', tone: 'Energetic', color: 'bg-blue-400/15 border-blue-400/25 text-blue-300' },
  { id: 'leo', name: 'Leo', gender: 'Male', accent: 'Australian', tone: 'Calm', color: 'bg-teal-400/15 border-teal-400/25 text-teal-300' },
  { id: 'zara', name: 'Zara', gender: 'Female', accent: 'Indian', tone: 'Bright', color: 'bg-amber-400/15 border-amber-400/25 text-amber-300' },
  { id: 'rex', name: 'Rex', gender: 'Male', accent: 'British', tone: 'Deep', color: 'bg-accent/15 border-accent/25 text-violet-200' },
]

const emotions = ['Neutral', 'Happy', 'Excited', 'Serious', 'Sad', 'Whispering']

export default function VoiceGenerator() {
  const [text, setText] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('aria')
  const [emotion, setEmotion] = useState('Neutral')
  const [speed, setSpeed] = useState(1.0)
  const [pitch, setPitch] = useState(0)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [playing, setPlaying] = useState(false)

  const handleGenerate = () => {
    if (!text.trim()) return
    setGenerating(true)
    setGenerated(false)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 2000)
  }

  const togglePlay = () => setPlaying(p => !p)

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
            {/* Text input */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-5">
              <label className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-3">Script</label>
              <textarea
                className="input-field resize-none min-h-[140px] text-sm leading-relaxed"
                placeholder="Paste your script here… VIRA will generate a natural voiceover that matches your selected voice and emotion."
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <div className="flex justify-between mt-2">
                <p className="text-[10px] text-white/25">{text.split(' ').filter(Boolean).length} words · ~{Math.max(1, Math.round(text.split(' ').filter(Boolean).length / 150))} min</p>
                <p className="text-[10px] text-white/25">{text.length}/2000</p>
              </div>
            </div>

            {/* Voice selection */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-5">
              <label className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-3">Voice</label>
              <div className="grid grid-cols-3 gap-2">
                {voices.map(({ id, name, gender, accent, tone, color }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedVoice(id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedVoice === id
                        ? color
                        : 'bg-white/[0.03] border-white/[0.07] hover:border-white/15'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-2 font-display font-bold text-xs text-white">
                      {name[0]}
                    </div>
                    <p className="text-xs font-medium text-white">{name}</p>
                    <p className="text-[10px] text-white/40">{gender} · {accent}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">{tone}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-5 space-y-5">
              <label className="block text-xs font-medium text-white/40 uppercase tracking-widest">Voice Settings</label>

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
                          : 'bg-white/5 border-white/[0.07] text-white/40 hover:text-white/60'
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
                <div className="flex justify-between text-[10px] text-white/25 mt-1">
                  <span>Slow</span><span>Normal</span><span>Fast</span>
                </div>
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
                <div className="flex justify-between text-[10px] text-white/25 mt-1">
                  <span>Lower</span><span>Normal</span><span>Higher</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating || !text.trim()}
              className="w-full bg-accent text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-base"
            >
              {generating
                ? <><Loader2 size={16} className="animate-spin" /> Generating voiceover…</>
                : <><Mic2 size={16} /> Generate Voiceover</>
              }
            </button>
          </div>

          {/* Right – output */}
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
                    {/* Waveform visualiser */}
                    <div className="bg-off-black rounded-xl p-3">
                      <div className="flex items-end gap-[3px] h-12 justify-center">
                        {Array.from({ length: 40 }).map((_, i) => {
                          const h = playing
                            ? Math.random() * 36 + 6
                            : [8, 12, 20, 30, 24, 36, 20, 14, 8, 18, 28, 16, 22, 34, 12, 8, 20, 32, 18, 10,
                               8, 12, 20, 30, 24, 36, 20, 14, 8, 18, 28, 16, 22, 34, 12, 8, 20, 32, 18, 10][i]
                          return (
                            <div
                              key={i}
                              className="rounded-full flex-shrink-0"
                              style={{
                                width: '3px',
                                height: `${h}px`,
                                background: i < 15 ? '#6C5CE7' : '#ffffff20',
                                transition: 'height 0.1s ease',
                              }}
                            />
                          )
                        })}
                      </div>
                      <div className="flex justify-between text-[10px] text-white/25 mt-1.5">
                        <span>0:00</span><span>0:48</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:opacity-90 transition-all flex-shrink-0"
                      >
                        {playing
                          ? <Pause size={14} fill="white" className="text-white" />
                          : <Play size={14} fill="white" className="text-white ml-0.5" />
                        }
                      </button>
                      <div className="flex-1">
                        <p className="text-xs font-medium">{voices.find(v => v.id === selectedVoice)?.name} · {emotion}</p>
                        <p className="text-[10px] text-white/35">Speed {speed.toFixed(1)}× · Pitch {pitch > 0 ? `+${pitch}` : pitch}</p>
                      </div>
                    </div>

                    <button className="w-full btn-secondary flex items-center justify-center gap-2 text-sm py-2.5">
                      <Download size={14} /> Download MP3
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent generations */}
            {generated && (
              <div className="mt-4 bg-card border border-white/[0.07] rounded-2xl p-4">
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Recent</p>
                {['Previous take 1', 'Previous take 2'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 py-2">
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <p className="text-xs text-white/40 flex-1">{t}</p>
                    <Play size={10} className="text-white/30 hover:text-white/60 cursor-pointer" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
