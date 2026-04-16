import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { aiApi, projectsApi } from '../lib/api'
import { Sparkles, ChevronDown, Loader2, Play, Download, AlertCircle, CheckCircle2 } from 'lucide-react'

const styles = [
  { id: 'motivational', label: 'Motivational', emoji: '🔥' },
  { id: 'storytelling', label: 'Storytelling', emoji: '📖' },
  { id: 'meme',         label: 'Meme Content', emoji: '😂' },
  { id: 'educational',  label: 'Educational',  emoji: '🎓' },
  { id: 'podcast',      label: 'Podcast Clip', emoji: '🎙️' },
]

const durations   = ['15s', '30s', '60s']
const formats     = ['TikTok 9:16', 'YouTube 16:9', 'Instagram 1:1', 'Shorts 9:16']
const musicOptions = ['No music', 'Upbeat', 'Cinematic', 'Lo-fi', 'Dramatic', 'Happy']

export default function GenerateVideo() {
  const navigate = useNavigate()

  const [prompt,          setPrompt]          = useState('')
  const [selectedStyle,   setSelectedStyle]   = useState('motivational')
  const [selectedDuration,setSelectedDuration]= useState('30s')
  const [selectedFormat,  setSelectedFormat]  = useState('TikTok 9:16')
  const [selectedMusic,   setSelectedMusic]   = useState('Upbeat')
  const [addCaptions,     setAddCaptions]     = useState(true)
  const [addVoiceover,    setAddVoiceover]    = useState(true)
  const [generating,      setGenerating]      = useState(false)
  const [generated,       setGenerated]       = useState(false)
  const [error,           setError]           = useState('')
  const [hooks,           setHooks]           = useState([])
  const [hashtags,        setHashtags]        = useState([])
  const [projectId,       setProjectId]       = useState(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setGenerating(true)
    setGenerated(false)
    setError('')
    setHooks([])
    setHashtags([])

    try {
      // Step 1 — Create a project record
      const { project } = await projectsApi.create({
        title:  prompt.slice(0, 60),
        source: 'generate',
      })
      setProjectId(project.id)

      // Step 2 — Generate hook from prompt
      const hookResult = await aiApi.generateHook({
        transcript: prompt,
        style:      selectedStyle,
      })
      setHooks(hookResult.hooks || [])

      // Step 3 — Generate hashtags
      const hashtagResult = await aiApi.generateHashtags({
        transcript: prompt,
        platform:   selectedFormat.includes('TikTok') ? 'tiktok' :
                    selectedFormat.includes('YouTube') ? 'shorts' : 'reels',
      })
      setHashtags(hashtagResult.hashtags || [])

      setGenerated(true)

    } catch (err) {
      console.error('Generate error:', err)
      setError(err.message || 'Generation failed. Make sure your backend is running.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <p className="section-label">AI Studio</p>
          <h1 className="font-display font-bold text-2xl mb-1">Generate Video</h1>
          <p className="text-white/40 text-sm">Describe your idea and VIRA creates viral content.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Left — controls */}
          <div className="space-y-5">

            {/* Prompt */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-5">
              <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-3">
                Your prompt
              </label>
              <textarea
                className="input-field resize-none min-h-[120px] text-base"
                placeholder="e.g. 5 morning habits that changed my life. Start with a hook, keep it energetic..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
              <p className="text-[10px] text-white/25 mt-2">{prompt.length}/500</p>
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
                        : 'bg-white/5 border-white/[0.08] text-white/50 hover:border-white/20'
                    }`}
                  >
                    <span>{emoji}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration + Format */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-white/[0.07] rounded-2xl p-5">
                <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-3">
                  Duration
                </label>
                <div className="flex gap-2">
                  {durations.map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDuration(d)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                        selectedDuration === d
                          ? 'bg-accent/15 border-accent/40 text-violet-300'
                          : 'bg-white/5 border-white/[0.08] text-white/40'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-white/[0.07] rounded-2xl p-5">
                <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-3">
                  Format
                </label>
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
              <label className="block text-xs font-medium text-white/50 uppercase tracking-widest">
                AI Enhancements
              </label>
              {[
                { label: 'Auto Captions',  sub: 'TikTok-style animated word captions', val: addCaptions,  set: setAddCaptions  },
                { label: 'AI Voiceover',   sub: 'Natural narration from your prompt',  val: addVoiceover, set: setAddVoiceover },
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
                <p className="text-sm font-medium mb-2">Background Music</p>
                <div className="flex flex-wrap gap-1.5">
                  {musicOptions.map(m => (
                    <button
                      key={m}
                      onClick={() => setSelectedMusic(m)}
                      className={`px-2.5 py-1 rounded-lg text-xs border transition-all ${
                        selectedMusic === m
                          ? 'bg-accent2/10 border-accent2/30 text-teal-400'
                          : 'bg-white/5 border-white/[0.07] text-white/40'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
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
              disabled={generating || !prompt.trim()}
              className="w-full bg-accent text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-base"
            >
              {generating
                ? <><Loader2 size={16} className="animate-spin" /> Generating…</>
                : <><Sparkles size={16} /> Generate Video</>
              }
            </button>
          </div>

          {/* Right — results */}
          <div className="space-y-4">

            {/* Preview */}
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
                      <p className="text-xs text-white/50">AI is working…</p>
                    </div>
                  )}
                  {generated && !generating && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <Play size={18} fill="white" className="text-white ml-1" />
                      </div>
                    </div>
                  )}
                  {!generating && !generated && (
                    <div className="text-center px-4">
                      <Sparkles size={24} className="text-white/20 mx-auto mb-2" />
                      <p className="text-xs text-white/30">Your video preview appears here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Generated hooks */}
            {hooks.length > 0 && (
              <div className="bg-card border border-white/[0.07] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={13} className="text-accent2" />
                  <p className="text-xs font-medium text-white/50 uppercase tracking-widest">AI Hooks</p>
                </div>
                <div className="space-y-2">
                  {hooks.map((hook, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-2.5">
                      <p className="text-xs text-white/70 italic">"{hook}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Generated hashtags */}
            {hashtags.length > 0 && (
              <div className="bg-card border border-white/[0.07] rounded-2xl p-4">
                <p className="text-xs font-medium text-white/50 uppercase tracking-widest mb-3">Hashtags</p>
                <div className="flex flex-wrap gap-1.5">
                  {hashtags.map(tag => (
                    <span key={tag} className="text-[10px] bg-accent/10 border border-accent/20 text-violet-300 px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Go to clips */}
            {generated && (
              <button
                onClick={() => navigate('/clips')}
                className="w-full btn-secondary flex items-center justify-center gap-2 text-sm py-3"
              >
                <Download size={14} /> View in AI Clips
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}