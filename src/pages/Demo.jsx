import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Upload, Link2, Scissors, Type, Mic2, Download,
  Play, CheckCircle2, ArrowRight, Zap, TrendingUp,
  ChevronRight, SkipForward
} from 'lucide-react'

// ── Step definitions ──────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 'upload',
    icon: Upload,
    label: 'Upload or Import',
    color: 'accent',
    colorHex: '#6C5CE7',
    desc: 'Drop a video file or paste a YouTube, TikTok, or Instagram link.',
  },
  {
    id: 'transcribe',
    icon: Type,
    label: 'AI Transcribes',
    color: 'accent2',
    colorHex: '#00D2A8',
    desc: 'Whisper AI transcribes every word with timestamps in seconds.',
  },
  {
    id: 'detect',
    icon: Scissors,
    label: 'Detect Highlights',
    color: 'accent',
    colorHex: '#6C5CE7',
    desc: 'GPT-4 scans the transcript and scores every moment for virality.',
  },
  {
    id: 'captions',
    icon: Type,
    label: 'Auto Captions',
    color: 'accent2',
    colorHex: '#00D2A8',
    desc: 'TikTok-style animated captions are burned in automatically.',
  },
  {
    id: 'voiceover',
    icon: Mic2,
    label: 'AI Voiceover',
    color: 'yellow',
    colorHex: '#FFB830',
    desc: 'ElevenLabs generates a natural voiceover from your script.',
  },
  {
    id: 'export',
    icon: Download,
    label: 'Export & Share',
    color: 'accent2',
    colorHex: '#00D2A8',
    desc: 'Download 1080p MP4 optimised for TikTok, Reels, and Shorts.',
  },
]

const CLIPS = [
  { title: 'Morning routine hook', platform: 'TikTok', score: 94, duration: '30s' },
  { title: 'Key insight moment',   platform: 'Reels',  score: 88, duration: '15s' },
  { title: 'Emotional story arc',  platform: 'Shorts', score: 91, duration: '60s' },
  { title: 'Viral CTA ending',     platform: 'TikTok', score: 86, duration: '30s' },
]

const CAPTION_WORDS = [
  { word: 'THIS',    highlight: true  },
  { word: 'is',      highlight: false },
  { word: 'HOW',     highlight: true  },
  { word: 'you',     highlight: false },
  { word: 'go',      highlight: false },
  { word: 'VIRAL',   highlight: true  },
  { word: 'in',      highlight: false },
  { word: 'SECONDS', highlight: true  },
]

// ── Reusable animated counter ─────────────────────────────────────────────────
function Counter({ to, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = to / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [to, duration])
  return <>{count.toLocaleString()}{suffix}</>
}

// ── Step 1 — Upload ───────────────────────────────────────────────────────────
function UploadStep({ active }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) { setProgress(0); setDone(false); return }
    setProgress(0); setDone(false)
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setDone(true); return 100 }
        return p + 2
      })
    }, 30)
    return () => clearInterval(t)
  }, [active])

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-500 ${
        active ? 'border-accent/60 bg-accent/5' : 'border-white/10'
      }`}>
        <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-500 ${
          active ? 'bg-accent/20' : 'bg-white/5'
        }`}>
          <Upload size={22} className={active ? 'text-violet-300' : 'text-white/30'} />
        </div>
        <p className="text-sm font-medium text-white/70 mb-1">morning-routine-full.mp4</p>
        <p className="text-xs text-white/30">47 minutes · 2.1 GB</p>

        {active && (
          <div className="mt-4">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-white/40 mt-1.5">
              {done ? '✓ Upload complete' : `Uploading… ${progress}%`}
            </p>
          </div>
        )}
      </div>

      {/* Or paste URL */}
      <div className="flex gap-2">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
          <Link2 size={13} className="text-white/30 flex-shrink-0" />
          <span className={`text-xs transition-all duration-500 ${active ? 'text-white/60' : 'text-white/20'}`}>
            https://youtube.com/watch?v=...
          </span>
        </div>
        <div className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 ${
          active ? 'bg-accent text-white' : 'bg-white/5 text-white/20'
        }`}>
          Import
        </div>
      </div>

      {/* Supported platforms */}
      <div className="flex gap-2 justify-center">
        {['YouTube', 'TikTok', 'Instagram', 'Facebook'].map(p => (
          <span key={p} className={`text-[10px] px-2 py-1 rounded-md border transition-all duration-300 ${
            active ? 'border-white/15 text-white/50' : 'border-white/5 text-white/20'
          }`}>{p}</span>
        ))}
      </div>
    </div>
  )
}

// ── Step 2 — Transcribe ───────────────────────────────────────────────────────
function TranscribeStep({ active }) {
  const lines = [
    "I wake up every single morning at 5AM and",
    "it has completely changed my life in ways I",
    "never expected. The first thing I do is...",
    "hydrate. Not coffee. Water. Here's why that",
    "matters more than anything else you'll do...",
  ]
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    if (!active) { setRevealed(0); return }
    setRevealed(0)
    let i = 0
    const t = setInterval(() => {
      i++
      setRevealed(i)
      if (i >= lines.length) clearInterval(t)
    }, 400)
    return () => clearInterval(t)
  }, [active])

  return (
    <div className="bg-off-black rounded-2xl border border-white/[0.07] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
        <div className={`w-1.5 h-1.5 rounded-full transition-all ${active ? 'bg-accent2 animate-pulse' : 'bg-white/20'}`} />
        <span className="text-[10px] text-white/40 font-medium uppercase tracking-widest">
          {active ? 'Whisper AI transcribing…' : 'Awaiting audio'}
        </span>
      </div>
      <div className="p-4 space-y-2 min-h-[160px]">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 transition-all duration-300 ${
              i < revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="text-[9px] text-accent2/60 font-mono mt-0.5 flex-shrink-0">
              {String(i * 4).padStart(2, '0')}s
            </span>
            <p className="text-xs text-white/60 leading-relaxed">{line}</p>
          </div>
        ))}
        {active && revealed < lines.length && (
          <div className="flex gap-1 pt-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1 h-1 rounded-full bg-accent2/40 animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Step 3 — Detect ───────────────────────────────────────────────────────────
function DetectStep({ active }) {
  const [scores, setScores] = useState([0, 0, 0, 0])

  useEffect(() => {
    if (!active) { setScores([0, 0, 0, 0]); return }
    const targets = [94, 88, 91, 86]
    const timers = targets.map((target, i) =>
      setTimeout(() => {
        let v = 0
        const t = setInterval(() => {
          v += 3
          setScores(s => { const n = [...s]; n[i] = Math.min(v, target); return n })
          if (v >= target) clearInterval(t)
        }, 20)
      }, i * 300)
    )
    return () => timers.forEach(clearTimeout)
  }, [active])

  return (
    <div className="space-y-3">
      {CLIPS.map((clip, i) => (
        <div key={clip.title} className={`bg-off-black border rounded-xl p-3.5 flex items-center gap-3 transition-all duration-500 ${
          active && scores[i] > 0 ? 'border-white/10 opacity-100' : 'border-white/[0.05] opacity-40'
        }`}>
          <div className="w-9 h-12 rounded-lg bg-gradient-to-b from-accent/20 to-accent2/10 flex-shrink-0 flex items-center justify-center text-base">
            🎬
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate mb-1">{clip.title}</p>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-white/30">{clip.platform}</span>
              <span className="text-[9px] text-white/20">·</span>
              <span className="text-[9px] text-white/30">{clip.duration}</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full transition-all duration-100"
                style={{ width: `${scores[i]}%` }}
              />
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-display font-bold text-accent2">{scores[i]}%</p>
            <div className="flex items-center gap-0.5 justify-end mt-0.5">
              <TrendingUp size={8} className="text-accent2" />
              <span className="text-[9px] text-accent2/70">viral</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Step 4 — Captions ─────────────────────────────────────────────────────────
function CaptionsStep({ active }) {
  const [activeWord, setActiveWord] = useState(-1)

  useEffect(() => {
    if (!active) { setActiveWord(-1); return }
    let i = 0
    const t = setInterval(() => {
      setActiveWord(i % CAPTION_WORDS.length)
      i++
    }, 400)
    return () => clearInterval(t)
  }, [active])

  return (
    <div className="flex justify-center">
      <div className="relative">
        {/* Phone */}
        <div className="w-44 bg-card border border-white/[0.07] rounded-[2rem] p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div
            className="rounded-[1.5rem] overflow-hidden flex items-end justify-center pb-6 relative"
            style={{ aspectRatio: '9/16', background: 'linear-gradient(160deg, #1a1a2e, #0f3460)' }}
          >
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <Play size={12} fill="white" className="text-white ml-0.5" />
            </div>
            <div className="flex flex-wrap justify-center gap-1 px-2">
              {CAPTION_WORDS.map((w, i) => (
                <span
                  key={i}
                  className={`text-[8px] font-bold px-1.5 py-0.5 rounded transition-all duration-200 ${
                    i === activeWord
                      ? w.highlight
                        ? 'bg-accent2 text-black scale-110'
                        : 'bg-white text-black scale-105'
                      : w.highlight
                        ? 'bg-accent2/40 text-white/80'
                        : 'bg-white/20 text-white/60'
                  }`}
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {w.word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Style badge */}
        {active && (
          <div className="absolute -right-16 top-1/3 bg-card border border-white/[0.07] rounded-xl px-2.5 py-2 animate-float">
            <p className="text-[9px] text-white/40 mb-0.5">Style</p>
            <p className="text-xs font-display font-bold text-accent2">TikTok</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Step 5 — Voiceover ────────────────────────────────────────────────────────
function VoiceoverStep({ active }) {
  const [playing, setPlaying] = useState(false)
  const [waveHeights, setWaveHeights] = useState(Array(24).fill(4))

  useEffect(() => {
    if (!active) { setPlaying(false); return }
    setTimeout(() => setPlaying(true), 600)
  }, [active])

  useEffect(() => {
    if (!playing) { setWaveHeights(Array(24).fill(4)); return }
    const t = setInterval(() => {
      setWaveHeights(Array(24).fill(0).map(() => Math.random() * 28 + 4))
    }, 80)
    return () => clearInterval(t)
  }, [playing])

  const voices = [
    { name: 'Aria', tag: 'Female · Warm',       color: 'bg-pink-400/15 text-pink-300'    },
    { name: 'Max',  tag: 'Male · Energetic',     color: 'bg-blue-400/15 text-blue-300'    },
    { name: 'Nova', tag: 'Female · Professional',color: 'bg-violet-400/15 text-violet-300'},
  ]

  return (
    <div className="space-y-4">
      {/* Voice selector */}
      <div className="grid grid-cols-3 gap-2">
        {voices.map((v, i) => (
          <div key={v.name} className={`p-3 rounded-xl border text-center transition-all duration-300 ${
            active && i === 0
              ? 'border-accent/40 bg-accent/10'
              : 'border-white/[0.07] bg-white/[0.02]'
          }`}>
            <div className={`w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center text-xs font-bold font-display ${v.color}`}>
              {v.name[0]}
            </div>
            <p className="text-[10px] font-medium text-white">{v.name}</p>
            <p className="text-[9px] text-white/30 leading-tight mt-0.5">{v.tag}</p>
          </div>
        ))}
      </div>

      {/* Waveform player */}
      <div className={`bg-off-black border rounded-2xl p-4 transition-all duration-300 ${
        active ? 'border-white/10' : 'border-white/[0.05]'
      }`}>
        <div className="flex items-end gap-[2px] h-10 justify-center mb-3">
          {waveHeights.map((h, i) => (
            <div
              key={i}
              className="rounded-full flex-shrink-0 transition-all duration-75"
              style={{
                width: '3px',
                height: `${h}px`,
                background: i < 10 ? '#6C5CE7' : 'rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlaying(p => !p)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              active ? 'bg-accent' : 'bg-white/10'
            }`}
          >
            <Play size={10} fill="white" className="text-white ml-0.5" />
          </button>
          <div className="flex-1">
            <p className="text-xs font-medium">Aria · Warm</p>
            <p className="text-[9px] text-white/30">0:48 · Speed 1.0×</p>
          </div>
          {active && playing && (
            <span className="text-[9px] bg-accent2/10 text-teal-400 border border-accent2/20 px-2 py-0.5 rounded-full animate-pulse">
              Playing
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Step 6 — Export ───────────────────────────────────────────────────────────
function ExportStep({ active }) {
  const [downloaded, setDownloaded] = useState([false, false, false, false])

  useEffect(() => {
    if (!active) { setDownloaded([false, false, false, false]); return }
    CLIPS.forEach((_, i) => {
      setTimeout(() => {
        setDownloaded(d => { const n = [...d]; n[i] = true; return n })
      }, i * 400 + 300)
    })
  }, [active])

  const platforms = [
    { label: 'TikTok',   color: 'text-white' },
    { label: 'Reels',    color: 'text-pink-400' },
    { label: 'Shorts',   color: 'text-red-400' },
    { label: 'TikTok',   color: 'text-white' },
  ]

  return (
    <div className="space-y-2.5">
      {CLIPS.map((clip, i) => (
        <div key={clip.title} className={`flex items-center gap-3 bg-off-black border rounded-xl px-4 py-3 transition-all duration-500 ${
          downloaded[i] ? 'border-accent2/25' : 'border-white/[0.07]'
        }`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            downloaded[i] ? 'bg-accent2/15' : 'bg-white/5'
          }`}>
            {downloaded[i]
              ? <CheckCircle2 size={14} className="text-accent2" />
              : <Download size={14} className="text-white/30" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{clip.title}</p>
            <p className={`text-[9px] font-medium mt-0.5 ${platforms[i].color}`}>
              {platforms[i].label} · 1080p · MP4
            </p>
          </div>
          <span className={`text-[10px] font-medium transition-all duration-300 ${
            downloaded[i] ? 'text-accent2' : 'text-white/20'
          }`}>
            {downloaded[i] ? 'Ready ✓' : '...'}
          </span>
        </div>
      ))}

      {active && downloaded[3] && (
        <div className="bg-accent2/5 border border-accent2/15 rounded-xl p-3 text-center mt-2">
          <p className="text-xs font-medium text-accent2 mb-0.5">🎉 All clips exported!</p>
          <p className="text-[10px] text-white/35">4 clips · 1080p · Ready to post</p>
        </div>
      )}
    </div>
  )
}

// ── Main Demo Page ─────────────────────────────────────────────────────────────
export default function Demo() {
  const [activeStep, setActiveStep] = useState(0)
  const [autoPlay, setAutoPlay]     = useState(true)
  const timerRef = useRef(null)

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveStep(s => (s + 1) % STEPS.length)
    }, 4000)
  }

  useEffect(() => {
    if (autoPlay) startTimer()
    else clearInterval(timerRef.current)
    return () => clearInterval(timerRef.current)
  }, [autoPlay])

  const goToStep = (i) => {
    setActiveStep(i)
    if (autoPlay) startTimer()
  }

  const stepComponents = [
    <UploadStep    active={activeStep === 0} />,
    <TranscribeStep active={activeStep === 1} />,
    <DetectStep    active={activeStep === 2} />,
    <CaptionsStep  active={activeStep === 3} />,
    <VoiceoverStep active={activeStep === 4} />,
    <ExportStep    active={activeStep === 5} />,
  ]

  const ActiveIcon = STEPS[activeStep].icon

  return (
    <div className="min-h-screen bg-black">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-display font-bold text-[10px]">V</span>
            </div>
            <span className="font-display font-extrabold text-base tracking-tight text-white">
              VIR<span className="text-accent2">A</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-white/40 text-sm no-underline hover:text-white transition-colors">← Back</Link>
            <Link to="/auth" className="bg-accent text-white text-xs font-medium px-4 py-2 rounded-lg no-underline hover:opacity-85 transition-all">
              Try VIRA Free
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-full px-4 py-1.5 mb-6">
            <Play size={10} className="text-violet-300" fill="#a99cf7" />
            <span className="text-xs font-medium text-violet-300">Interactive Demo</span>
          </div>
          <h1 className="font-display font-extrabold text-5xl lg:text-6xl tracking-tight mb-4">
            See VIRA in <span className="text-gradient">action.</span>
          </h1>
          <p className="text-white/40 text-lg font-light max-w-xl mx-auto">
            Watch how VIRA turns a 47-minute video into 4 viral clips — automatically.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Video length',    value: '47',   suffix: ' min' },
            { label: 'Processing time', value: '3',    suffix: ' min' },
            { label: 'Clips generated', value: '4',    suffix: ' clips' },
            { label: 'Avg viral score', value: '90',   suffix: '%' },
          ].map(({ label, value, suffix }) => (
            <div key={label} className="bg-card border border-white/[0.07] rounded-2xl p-4 text-center">
              <p className="font-display font-bold text-2xl text-white">
                {activeStep >= 2 ? <Counter to={parseInt(value)} suffix={suffix} /> : `0${suffix}`}
              </p>
              <p className="text-[10px] text-white/35 mt-1 uppercase tracking-widest font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Main demo area */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 mb-10">

          {/* Step list */}
          <div className="space-y-2">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              const isActive = activeStep === i
              const isDone   = activeStep > i
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-accent/12 border-accent/35'
                      : isDone
                      ? 'bg-accent2/5 border-accent2/15 opacity-70'
                      : 'bg-white/[0.02] border-white/[0.06] opacity-50 hover:opacity-70'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    isActive ? 'bg-accent/20' : isDone ? 'bg-accent2/15' : 'bg-white/5'
                  }`}>
                    {isDone
                      ? <CheckCircle2 size={14} className="text-accent2" />
                      : <Icon size={14} className={isActive ? 'text-violet-300' : 'text-white/30'} />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : isDone ? 'text-white/60' : 'text-white/40'
                    }`}>{step.label}</p>
                  </div>
                  {isActive && <ChevronRight size={13} className="text-accent/60 flex-shrink-0" />}
                  {isDone   && <span className="text-[9px] text-accent2/60 flex-shrink-0">Done</span>}
                </button>
              )
            })}
          </div>

          {/* Active step panel */}
          <div className="bg-card border border-white/[0.07] rounded-3xl overflow-hidden">
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center">
                  <ActiveIcon size={15} className="text-violet-300" />
                </div>
                <div>
                  <p className="text-sm font-display font-bold">{STEPS[activeStep].label}</p>
                  <p className="text-[10px] text-white/35">{STEPS[activeStep].desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/30">{activeStep + 1} / {STEPS.length}</span>
                <button
                  onClick={() => goToStep((activeStep + 1) % STEPS.length)}
                  className="w-7 h-7 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
                >
                  <SkipForward size={11} />
                </button>
              </div>
            </div>

            {/* Step content */}
            <div className="p-6 min-h-[360px] flex flex-col justify-center">
              {stepComponents[activeStep]}
            </div>

            {/* Progress bar */}
            <div className="px-6 pb-5">
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToStep(i)}
                    className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                      i === activeStep ? 'bg-accent' :
                      i < activeStep  ? 'bg-accent2/50' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Autoplay toggle */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all ${
              autoPlay
                ? 'bg-accent/12 border-accent/30 text-violet-300'
                : 'bg-white/5 border-white/[0.08] text-white/40'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${autoPlay ? 'bg-accent2 animate-pulse' : 'bg-white/20'}`} />
            {autoPlay ? 'Auto-playing' : 'Auto-play paused'}
          </button>
          <button
            onClick={() => { setActiveStep(0); if (autoPlay) startTimer() }}
            className="px-4 py-2 rounded-xl border border-white/[0.08] bg-white/5 text-white/40 text-sm hover:text-white/70 transition-colors"
          >
            Restart demo
          </button>
        </div>

        {/* CTA */}
        <div
          className="rounded-3xl p-12 text-center border border-accent/20 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.12) 0%, rgba(0,210,168,0.06) 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%)' }} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-1.5 mb-5">
              <Zap size={11} className="text-yellow-400" />
              <span className="text-xs font-medium text-yellow-300">Free to start — no credit card</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl tracking-tight mb-3">
              Ready to try it yourself?
            </h2>
            <p className="text-white/40 text-base font-light mb-8 max-w-md mx-auto">
              Join 180,000+ creators using VIRA to turn long videos into viral clips automatically.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                to="/auth"
                className="btn-primary flex items-center gap-2 no-underline text-base px-8 py-4"
              >
                Start for free <ArrowRight size={16} />
              </Link>
              <Link
                to="/"
                className="btn-secondary flex items-center gap-2 no-underline text-base px-6 py-4"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}