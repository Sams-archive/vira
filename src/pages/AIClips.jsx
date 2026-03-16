import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Play, Download, TrendingUp, Hash, MoreHorizontal, Filter, Search } from 'lucide-react'

const clips = [
  {
    id: 1, emoji: '🎬', title: 'Morning routine — hook cut', duration: '30s',
    platform: 'TikTok', score: 94, status: 'Ready', hook: 'I wake up at 5AM and it changed everything…',
    hashtags: ['#morningroutine', '#5amclub', '#productivity', '#motivation'],
    timestamp: '0:12 – 0:42',
  },
  {
    id: 2, emoji: '📹', title: 'Best podcast moment ever', duration: '60s',
    platform: 'Shorts', score: 88, status: 'Ready', hook: 'Nobody talks about this but it\'s ruining your life…',
    hashtags: ['#podcast', '#mindset', '#viral', '#shorts'],
    timestamp: '14:07 – 15:07',
  },
  {
    id: 3, emoji: '🎙️', title: 'Interview gold moment', duration: '15s',
    platform: 'Reels', score: 91, status: 'Ready', hook: 'This one sentence will change how you see success…',
    hashtags: ['#interview', '#success', '#reels', '#inspiration'],
    timestamp: '8:33 – 8:48',
  },
  {
    id: 4, emoji: '🎥', title: 'Behind the scenes reveal', duration: '45s',
    platform: 'TikTok', score: 76, status: 'Ready', hook: 'What really happens when the cameras stop rolling…',
    hashtags: ['#bts', '#creator', '#dayinmylife', '#tiktok'],
    timestamp: '22:14 – 22:59',
  },
  {
    id: 5, emoji: '📽️', title: 'Emotional story arc', duration: '60s',
    platform: 'Reels', score: 83, status: 'Processing', hook: 'Three years ago I had nothing. Now…',
    hashtags: ['#story', '#motivation', '#journey', '#reels'],
    timestamp: '31:05 – 32:05',
  },
  {
    id: 6, emoji: '🎞️', title: 'Quick tip — high energy', duration: '15s',
    platform: 'Shorts', score: 79, status: 'Ready', hook: 'Stop scrolling. Try this right now.',
    hashtags: ['#tip', '#quicktip', '#shorts', '#lifehack'],
    timestamp: '45:20 – 45:35',
  },
]

const filters = ['All', 'TikTok', 'Shorts', 'Reels']

function ScoreBadge({ score }) {
  const color = score >= 90 ? 'text-teal-400 bg-accent2/10 border-accent2/20'
    : score >= 80 ? 'text-violet-300 bg-accent/10 border-accent/20'
    : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
  return (
    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-medium ${color}`}>
      <TrendingUp size={9} />
      {score}%
    </div>
  )
}

export default function AIClips() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = clips.filter(c =>
    (filter === 'All' || c.platform === filter) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  const active = selected !== null ? clips.find(c => c.id === selected) : null

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-6">
          <p className="section-label">AI Engine</p>
          <h1 className="font-display font-bold text-2xl mb-1">AI Clips</h1>
          <p className="text-white/40 text-sm">{clips.length} clips generated from your video · Sorted by viral score</p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              className="input-field pl-8 text-sm py-2"
              placeholder="Search clips…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-1">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  filter === f
                    ? 'bg-accent/15 border-accent/30 text-violet-300'
                    : 'bg-white/5 border-white/[0.07] text-white/40 hover:text-white/60'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5 ml-auto">
            <Download size={13} /> Export All
          </button>
        </div>

        <div className={`grid gap-5 ${active ? 'grid-cols-[1fr_320px]' : 'grid-cols-1'}`}>
          {/* Clip list */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
            {filtered.map(clip => (
              <div
                key={clip.id}
                onClick={() => setSelected(selected === clip.id ? null : clip.id)}
                className={`bg-card border rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-card ${
                  selected === clip.id ? 'border-accent/40' : 'border-white/[0.07]'
                }`}
              >
                {/* Thumbnail */}
                <div
                  className="relative flex items-center justify-center"
                  style={{ aspectRatio: '9/16', maxHeight: '160px', background: 'linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)' }}
                >
                  <div className="text-2xl">{clip.emoji}</div>
                  <div className="absolute top-2 right-2">
                    <ScoreBadge score={clip.score} />
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 rounded px-1.5 py-0.5 text-[9px] text-white/70">
                    {clip.duration}
                  </div>
                  {clip.status === 'Processing' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs font-medium truncate mb-0.5">{clip.title}</p>
                  <p className="text-[10px] text-white/35 mb-2">{clip.platform} · {clip.timestamp}</p>
                  <p className="text-[10px] text-white/40 italic leading-relaxed line-clamp-2">"{clip.hook}"</p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <button className="flex-1 bg-accent/10 border border-accent/20 text-violet-300 text-[10px] font-medium py-1.5 rounded-lg hover:bg-accent/20 transition-colors flex items-center justify-center gap-1">
                      <Play size={9} /> Preview
                    </button>
                    <button className="flex-1 bg-white/5 border border-white/[0.08] text-white/50 text-[10px] font-medium py-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-1">
                      <Download size={9} /> Export
                    </button>
                    <button className="w-7 h-7 bg-white/5 border border-white/[0.08] rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 transition-colors">
                      <MoreHorizontal size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {active && (
            <div className="bg-card border border-white/[0.07] rounded-2xl p-5 h-fit sticky top-8">
              <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">Clip Details</p>

              <div
                className="rounded-xl flex items-center justify-center mb-4 relative"
                style={{ aspectRatio: '9/16', maxHeight: '200px', background: 'linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)' }}
              >
                <div className="text-4xl">{active.emoji}</div>
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <div className="flex flex-wrap justify-center gap-1 px-2">
                    {active.hook.split(' ').slice(0, 4).map((w, i) => (
                      <span key={i} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-accent2/80 text-black" style={{ fontFamily: 'Syne, sans-serif' }}>{w.toUpperCase()}</span>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="font-display font-bold text-sm mb-1">{active.title}</h3>
              <p className="text-xs text-white/35 mb-4">{active.platform} · {active.duration} · {active.timestamp}</p>

              <div className="space-y-2.5 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Viral score</span>
                  <span className="text-accent2 font-medium">{active.score}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full" style={{ width: `${active.score}%` }} />
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[10px] text-white/35 uppercase tracking-widest mb-2">AI Hook</p>
                <p className="text-xs text-white/70 italic leading-relaxed bg-white/[0.03] border border-white/[0.06] rounded-lg p-2.5">"{active.hook}"</p>
              </div>

              <div className="mb-5">
                <p className="text-[10px] text-white/35 uppercase tracking-widest mb-2">Hashtags</p>
                <div className="flex flex-wrap gap-1.5">
                  {active.hashtags.map(h => (
                    <span key={h} className="text-[10px] bg-accent/10 border border-accent/20 text-violet-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Hash size={8} />{h.replace('#', '')}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm">
                <Download size={14} /> Download MP4
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
