import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Sparkles, ChevronDown, Loader2, Play, Download } from 'lucide-react'

const styles = [
  { id: 'motivational', label: 'Motivational', emoji: '🔥' },
  { id: 'storytelling', label: 'Storytelling', emoji: '📖' },
  { id: 'meme', label: 'Meme Content', emoji: '😂' },
  { id: 'educational', label: 'Educational', emoji: '🎓' },
  { id: 'podcast', label: 'Podcast Clip', emoji: '🎙️' },
]

const durations = ['15s', '30s', '60s']
const formats = ['TikTok 9:16', 'YouTube 16:9', 'Instagram 1:1', 'Shorts 9:16']

const musicOptions = ['No music', 'Upbeat', 'Cinematic', 'Lo-fi', 'Dramatic', 'Happy']

export default function GenerateVideo() {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('motivational')
  const [selectedDuration, setSelectedDuration] = useState('30s')
  const [selectedFormat, setSelectedFormat] = useState('TikTok 9:16')
  const [selectedMusic, setSelectedMusic] = useState('Upbeat')
  const [addCaptions, setAddCaptions] = useState(true)
  const [addVoiceover, setAddVoiceover] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setGenerating(true)
    setGenerated(false)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 2800)
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <p className="section-label">AI Studio</p>
          <h1 className="font-display font-bold text-2xl mb-1">Generate Video</h1>
          <p className="text-white/40 text-sm">Describe your idea and VIRA creates a viral short-form video.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Left – controls */}
          <div className="space-y-5">
            {/* Prompt */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-5">
              <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-3">
                Your prompt
              </label>
              <textarea
                className="input-field resize-none min-h-[120px] text-base"
                placeholder="e.g. 5 morning habits that changed my life. Start with a hook, keep it energetic and end with a strong CTA..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
              <p className="text-[10px] text-white/25 mt-2">{prompt.length}/500 characters</p>
            </div>

            {/* Style */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-5">
              <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-3">
                Video style
              </label>
              <div className="flex flex-wrap gap-2">
                {styles.map(({ id, label, emoji }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedStyle(id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all border ${
                      selectedStyle === id
                        ? 'bg-accent/15 border-accent/40 text-violet-300'
                        : 'bg-white/5 border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white/70'
                    }`}
                  >
                    <span>{emoji}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Format options row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Duration */}
              <div className="bg-card border border-white/[0.07] rounded-2xl p-5">
                <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-3">Duration</label>
                <div className="flex gap-2">
                  {durations.map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDuration(d)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                        selectedDuration === d
                          ? 'bg-accent/15 border-accent/40 text-violet-300'
                          : 'bg-white/5 border-white/[0.08] text-white/40 hover:text-white/60'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div className="bg-card border border-white/[0.07] rounded-2xl p-5">
                <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-3">Format</label>
                <div className="relative">
                  <select
                    className="input-field appearance-none pr-8 text-sm"
                    value={selectedFormat}
                    onChange={e => setSelectedFormat(e.target.value)}
                  >
                    {formats.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-5 space-y-4">
              <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-1">AI Enhancements</label>

              {[
                { label: 'Auto Captions', sub: 'TikTok-style animated word captions', val: addCaptions, set: setAddCaptions },
                { label: 'AI Voiceover', sub: 'Natural narration generated from your prompt', val: addVoiceover, set: setAddVoiceover },
              ].map(({ label, sub, val, set }) => (
                <div key={label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-white/35">{sub}</p>
                  </div>
                  <button
                    onClick={() => set(!val)}
                    className={`w-10 h-5 rounded-full transition-all relative ${val ? 'bg-accent' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${val ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}

              {/* Music */}
              <div>
                <p className="text-sm font-medium mb-1">Background Music</p>
                <div className="flex flex-wrap gap-1.5">
                  {musicOptions.map(m => (
                    <button
                      key={m}
                      onClick={() => setSelectedMusic(m)}
                      className={`px-2.5 py-1 rounded-lg text-xs border transition-all ${
                        selectedMusic === m
                          ? 'bg-accent2/10 border-accent2/30 text-teal-400'
                          : 'bg-white/5 border-white/[0.07] text-white/40 hover:text-white/60'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={generating || !prompt.trim()}
              className="w-full bg-accent text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:-translate-y-px transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 text-base"
            >
              {generating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating your video…
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Video
                </>
              )}
            </button>
          </div>

          {/* Right – preview */}
          <div className="space-y-4">
            <div className="bg-card border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/[0.06]">
                <p className="text-xs font-medium text-white/40 uppercase tracking-widest">Preview</p>
              </div>

              <div className="p-4">
                <div
                  className="rounded-xl overflow-hidden flex items-center justify-center relative"
                  style={{ aspectRatio: '9/16', background: 'linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)' }}
                >
                  {generating && (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 size={28} className="text-accent animate-spin" />
                      <p className="text-xs text-white/50">AI is creating…</p>
                    </div>
                  )}

                  {generated && !generating && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                          <Play size={18} fill="white" className="text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-2 right-2 text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {['THESE', 'habits', 'CHANGED', 'my', 'LIFE'].map((w, i) => (
                            <span key={i} className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${w === w.toUpperCase() ? 'bg-accent2/90 text-black' : 'bg-white/80 text-black/80'}`} style={{ fontFamily: 'Syne, sans-serif' }}>{w}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {!generating && !generated && (
                    <div className="flex flex-col items-center gap-2 text-center px-4">
                      <Sparkles size={24} className="text-white/20" />
                      <p className="text-xs text-white/30">Your video will appear here</p>
                    </div>
                  )}
                </div>
              </div>

              {generated && (
                <div className="px-4 pb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/40">Viral score</span>
                    <span className="text-accent2 font-medium">92%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full" style={{ width: '92%' }} />
                  </div>
                  <button className="w-full mt-3 btn-secondary flex items-center justify-center gap-2 text-sm py-2.5">
                    <Download size={14} />
                    Export MP4
                  </button>
                </div>
              )}
            </div>

            {/* Settings summary */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-4 space-y-2">
              <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2">Settings</p>
              {[
                ['Style', styles.find(s => s.id === selectedStyle)?.label],
                ['Duration', selectedDuration],
                ['Format', selectedFormat],
                ['Music', selectedMusic],
                ['Captions', addCaptions ? 'On' : 'Off'],
                ['Voiceover', addVoiceover ? 'On' : 'Off'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-xs text-white/35">{k}</span>
                  <span className="text-xs text-white/70 font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
