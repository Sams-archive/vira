import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import {
  Play, Pause, SkipBack, SkipForward, Scissors, RotateCw, 
  Volume2, Download, Layers, Mic2, Music, Type, Crop,
  ZoomIn, ZoomOut, ChevronDown
} from 'lucide-react'

const aspectRatios = [
  { label: 'TikTok 9:16', value: '9:16' },
  { label: 'YouTube 16:9', value: '16:9' },
  { label: 'Instagram 1:1', value: '1:1' },
  { label: 'Shorts 9:16', value: '9:16' },
]

const tools = [
  { icon: Scissors, label: 'Trim' },
  { icon: Crop, label: 'Crop' },
  { icon: RotateCw, label: 'Rotate' },
  { icon: Type, label: 'Captions' },
  { icon: Mic2, label: 'Voiceover' },
  { icon: Music, label: 'Music' },
]

const tracks = [
  { label: 'Video', color: 'bg-accent', segments: [{ start: 0, width: 60 }, { start: 65, width: 30 }] },
  { label: 'Audio', color: 'bg-accent2', segments: [{ start: 0, width: 90 }] },
  { label: 'Captions', color: 'bg-yellow-500', segments: [{ start: 5, width: 20 }, { start: 30, width: 25 }, { start: 60, width: 20 }] },
  { label: 'Music', color: 'bg-pink-500', segments: [{ start: 0, width: 95 }] },
]

export default function Editor() {
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(14)
  const [totalTime] = useState(60)
  const [aspect, setAspect] = useState('9:16')
  const [activeTool, setActiveTool] = useState('Trim')
  const [volume, setVolume] = useState(80)
  const [zoom, setZoom] = useState(1)

  const formatTime = (s) => `0:${s.toString().padStart(2, '0')}`
  const progress = (currentTime / totalTime) * 100

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.06] bg-off-black flex-shrink-0">
          <div className="flex items-center gap-3">
            <p className="font-display font-bold text-sm">morning-routine-edit.mp4</p>
            <span className="text-[10px] bg-accent2/10 text-teal-400 border border-accent2/20 px-2 py-0.5 rounded">Unsaved</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Aspect ratio */}
            <div className="relative">
              <select
                className="bg-white/5 border border-white/[0.08] text-white text-xs rounded-lg px-3 py-1.5 appearance-none pr-6 outline-none"
                value={aspect}
                onChange={e => setAspect(e.target.value)}
              >
                {aspectRatios.map(r => <option key={r.label} value={r.value}>{r.label}</option>)}
              </select>
              <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            </div>
            <button className="btn-primary text-xs py-1.5 px-4 flex items-center gap-1.5">
              <Download size={12} /> Export
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Tool sidebar */}
          <div className="w-14 bg-off-black border-r border-white/[0.06] flex flex-col items-center py-4 gap-3 flex-shrink-0">
            {tools.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setActiveTool(label)}
                title={label}
                className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all text-[8px] font-medium ${
                  activeTool === label
                    ? 'bg-accent/20 text-violet-300'
                    : 'text-white/30 hover:bg-white/5 hover:text-white/60'
                }`}
              >
                <Icon size={15} />
                <span className="leading-none">{label}</span>
              </button>
            ))}
          </div>

          {/* Main editor area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Preview area */}
            <div className="flex-1 flex items-center justify-center bg-black p-6 overflow-hidden">
              <div
                className="rounded-xl overflow-hidden relative flex items-center justify-center flex-shrink-0"
                style={{
                  aspectRatio: aspect === '1:1' ? '1/1' : aspect === '16:9' ? '16/9' : '9/16',
                  maxHeight: '320px',
                  maxWidth: '500px',
                  width: '100%',
                  background: 'linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)',
                }}
              >
                {/* Crop overlay if crop tool active */}
                {activeTool === 'Crop' && (
                  <div className="absolute inset-4 border-2 border-dashed border-white/60 rounded pointer-events-none">
                    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
                      <div key={pos} className={`absolute w-3 h-3 bg-white rounded-sm cursor-pointer
                        ${pos.includes('top') ? '-top-1.5' : '-bottom-1.5'}
                        ${pos.includes('left') ? '-left-1.5' : '-right-1.5'}`}
                      />
                    ))}
                  </div>
                )}

                {/* Frame counter */}
                <div className="absolute top-2 right-2 bg-black/70 rounded px-2 py-0.5 text-[9px] font-mono text-white/60">
                  {formatTime(currentTime)} / {formatTime(totalTime)}
                </div>

                {/* Active tool indicator */}
                <div className="absolute top-2 left-2 bg-accent/80 rounded px-2 py-0.5 text-[9px] font-medium text-white">
                  {activeTool}
                </div>

                {/* Sample content */}
                <div className="text-center">
                  <div className="text-4xl mb-2">🎬</div>
                  {!playing && <p className="text-xs text-white/30">Click play to preview</p>}
                </div>
              </div>
            </div>

            {/* Playback controls */}
            <div className="bg-off-black border-t border-white/[0.06] px-6 py-3 flex items-center gap-4 flex-shrink-0">
              {/* Transport */}
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors" onClick={() => setCurrentTime(0)}>
                  <SkipBack size={14} />
                </button>
                <button
                  onClick={() => setPlaying(p => !p)}
                  className="w-9 h-9 rounded-full bg-accent flex items-center justify-center hover:opacity-90 transition-all"
                >
                  {playing
                    ? <Pause size={14} fill="white" className="text-white" />
                    : <Play size={14} fill="white" className="text-white ml-0.5" />
                  }
                </button>
                <button className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors" onClick={() => setCurrentTime(totalTime)}>
                  <SkipForward size={14} />
                </button>
              </div>

              {/* Timeline scrubber */}
              <div className="flex-1 flex items-center gap-3">
                <span className="text-[10px] text-white/40 font-mono w-8">{formatTime(currentTime)}</span>
                <div className="flex-1 relative h-1 bg-white/10 rounded-full cursor-pointer"
                  onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const pct = (e.clientX - rect.left) / rect.width
                    setCurrentTime(Math.round(pct * totalTime))
                  }}
                >
                  <div className="h-full bg-accent rounded-full" style={{ width: `${progress}%` }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow border-2 border-accent" style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }} />
                </div>
                <span className="text-[10px] text-white/40 font-mono w-8">{formatTime(totalTime)}</span>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2 w-24">
                <Volume2 size={13} className="text-white/40 flex-shrink-0" />
                <input
                  type="range" min="0" max="100"
                  value={volume}
                  onChange={e => setVolume(parseInt(e.target.value))}
                  className="flex-1 accent-accent"
                />
              </div>

              {/* Zoom */}
              <div className="flex items-center gap-1.5">
                <button className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white" onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}>
                  <ZoomOut size={12} />
                </button>
                <span className="text-[10px] text-white/40 w-8 text-center">{zoom}×</span>
                <button className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white" onClick={() => setZoom(z => Math.min(3, z + 0.25))}>
                  <ZoomIn size={12} />
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-black border-t border-white/[0.06] px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <Layers size={11} className="text-white/30" />
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-medium">Timeline</p>
              </div>

              {/* Time ruler */}
              <div className="ml-16 flex mb-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex-1 text-[8px] text-white/20 border-l border-white/[0.06] pl-1">
                    {formatTime(i * 6)}
                  </div>
                ))}
              </div>

              {/* Tracks */}
              <div className="space-y-1.5">
                {tracks.map(({ label, color, segments }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-[9px] text-white/30 w-14 text-right flex-shrink-0">{label}</span>
                    <div className="flex-1 h-6 bg-white/[0.03] rounded relative overflow-hidden border border-white/[0.05]">
                      {segments.map(({ start, width }, i) => (
                        <div
                          key={i}
                          className={`absolute top-0.5 bottom-0.5 ${color} opacity-70 rounded-sm cursor-pointer hover:opacity-90 transition-opacity`}
                          style={{ left: `${start}%`, width: `${width}%` }}
                        />
                      ))}
                      {/* Playhead */}
                      <div
                        className="absolute top-0 bottom-0 w-[1px] bg-white/60 z-10"
                        style={{ left: `${progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
