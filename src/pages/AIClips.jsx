// import { useState } from 'react'
// import DashboardLayout from '../components/DashboardLayout'
// import { Play, Download, TrendingUp, Hash, MoreHorizontal, Filter, Search } from 'lucide-react'

// const clips = [
//   {
//     id: 1, emoji: '🎬', title: 'Morning routine — hook cut', duration: '30s',
//     platform: 'TikTok', score: 94, status: 'Ready', hook: 'I wake up at 5AM and it changed everything…',
//     hashtags: ['#morningroutine', '#5amclub', '#productivity', '#motivation'],
//     timestamp: '0:12 – 0:42',
//   },
//   {
//     id: 2, emoji: '📹', title: 'Best podcast moment ever', duration: '60s',
//     platform: 'Shorts', score: 88, status: 'Ready', hook: 'Nobody talks about this but it\'s ruining your life…',
//     hashtags: ['#podcast', '#mindset', '#viral', '#shorts'],
//     timestamp: '14:07 – 15:07',
//   },
//   {
//     id: 3, emoji: '🎙️', title: 'Interview gold moment', duration: '15s',
//     platform: 'Reels', score: 91, status: 'Ready', hook: 'This one sentence will change how you see success…',
//     hashtags: ['#interview', '#success', '#reels', '#inspiration'],
//     timestamp: '8:33 – 8:48',
//   },
//   {
//     id: 4, emoji: '🎥', title: 'Behind the scenes reveal', duration: '45s',
//     platform: 'TikTok', score: 76, status: 'Ready', hook: 'What really happens when the cameras stop rolling…',
//     hashtags: ['#bts', '#creator', '#dayinmylife', '#tiktok'],
//     timestamp: '22:14 – 22:59',
//   },
//   {
//     id: 5, emoji: '📽️', title: 'Emotional story arc', duration: '60s',
//     platform: 'Reels', score: 83, status: 'Processing', hook: 'Three years ago I had nothing. Now…',
//     hashtags: ['#story', '#motivation', '#journey', '#reels'],
//     timestamp: '31:05 – 32:05',
//   },
//   {
//     id: 6, emoji: '🎞️', title: 'Quick tip — high energy', duration: '15s',
//     platform: 'Shorts', score: 79, status: 'Ready', hook: 'Stop scrolling. Try this right now.',
//     hashtags: ['#tip', '#quicktip', '#shorts', '#lifehack'],
//     timestamp: '45:20 – 45:35',
//   },
// ]

// const filters = ['All', 'TikTok', 'Shorts', 'Reels']

// function ScoreBadge({ score }) {
//   const color = score >= 90 ? 'text-teal-400 bg-accent2/10 border-accent2/20'
//     : score >= 80 ? 'text-violet-300 bg-accent/10 border-accent/20'
//     : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
//   return (
//     <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-medium ${color}`}>
//       <TrendingUp size={9} />
//       {score}%
//     </div>
//   )
// }

// export default function AIClips() {
//   const [search, setSearch] = useState('')
//   const [filter, setFilter] = useState('All')
//   const [selected, setSelected] = useState(null)

//   const filtered = clips.filter(c =>
//     (filter === 'All' || c.platform === filter) &&
//     c.title.toLowerCase().includes(search.toLowerCase())
//   )

//   const active = selected !== null ? clips.find(c => c.id === selected) : null

//   return (
//     <DashboardLayout>
//       <div className="p-8">
//         <div className="mb-6">
//           <p className="section-label">AI Engine</p>
//           <h1 className="font-display font-bold text-2xl mb-1">AI Clips</h1>
//           <p className="text-white/40 text-sm">{clips.length} clips generated from your video · Sorted by viral score</p>
//         </div>

//         {/* Toolbar */}
//         <div className="flex items-center gap-3 mb-6">
//           <div className="relative flex-1 max-w-xs">
//             <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
//             <input
//               className="input-field pl-8 text-sm py-2"
//               placeholder="Search clips…"
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//           </div>

//           <div className="flex gap-1">
//             {filters.map(f => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
//                   filter === f
//                     ? 'bg-accent/15 border-accent/30 text-violet-300'
//                     : 'bg-white/5 border-white/[0.07] text-white/40 hover:text-white/60'
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>

//           <button className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5 ml-auto">
//             <Download size={13} /> Export All
//           </button>
//         </div>

//         <div className={`grid gap-5 ${active ? 'grid-cols-[1fr_320px]' : 'grid-cols-1'}`}>
//           {/* Clip list */}
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
//             {filtered.map(clip => (
//               <div
//                 key={clip.id}
//                 onClick={() => setSelected(selected === clip.id ? null : clip.id)}
//                 className={`bg-card border rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-card ${
//                   selected === clip.id ? 'border-accent/40' : 'border-white/[0.07]'
//                 }`}
//               >
//                 {/* Thumbnail */}
//                 <div
//                   className="relative flex items-center justify-center"
//                   style={{ aspectRatio: '9/16', maxHeight: '160px', background: 'linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)' }}
//                 >
//                   <div className="text-2xl">{clip.emoji}</div>
//                   <div className="absolute top-2 right-2">
//                     <ScoreBadge score={clip.score} />
//                   </div>
//                   <div className="absolute bottom-2 left-2 bg-black/60 rounded px-1.5 py-0.5 text-[9px] text-white/70">
//                     {clip.duration}
//                   </div>
//                   {clip.status === 'Processing' && (
//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                       <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
//                     </div>
//                   )}
//                 </div>

//                 {/* Info */}
//                 <div className="p-3">
//                   <p className="text-xs font-medium truncate mb-0.5">{clip.title}</p>
//                   <p className="text-[10px] text-white/35 mb-2">{clip.platform} · {clip.timestamp}</p>
//                   <p className="text-[10px] text-white/40 italic leading-relaxed line-clamp-2">"{clip.hook}"</p>
//                   <div className="flex items-center gap-1.5 mt-3">
//                     <button className="flex-1 bg-accent/10 border border-accent/20 text-violet-300 text-[10px] font-medium py-1.5 rounded-lg hover:bg-accent/20 transition-colors flex items-center justify-center gap-1">
//                       <Play size={9} /> Preview
//                     </button>
//                     <button className="flex-1 bg-white/5 border border-white/[0.08] text-white/50 text-[10px] font-medium py-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-1">
//                       <Download size={9} /> Export
//                     </button>
//                     <button className="w-7 h-7 bg-white/5 border border-white/[0.08] rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 transition-colors">
//                       <MoreHorizontal size={11} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Detail panel */}
//           {active && (
//             <div className="bg-card border border-white/[0.07] rounded-2xl p-5 h-fit sticky top-8">
//               <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">Clip Details</p>

//               <div
//                 className="rounded-xl flex items-center justify-center mb-4 relative"
//                 style={{ aspectRatio: '9/16', maxHeight: '200px', background: 'linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)' }}
//               >
//                 <div className="text-4xl">{active.emoji}</div>
//                 <div className="absolute bottom-3 left-0 right-0 text-center">
//                   <div className="flex flex-wrap justify-center gap-1 px-2">
//                     {active.hook.split(' ').slice(0, 4).map((w, i) => (
//                       <span key={i} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-accent2/80 text-black" style={{ fontFamily: 'Syne, sans-serif' }}>{w.toUpperCase()}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <h3 className="font-display font-bold text-sm mb-1">{active.title}</h3>
//               <p className="text-xs text-white/35 mb-4">{active.platform} · {active.duration} · {active.timestamp}</p>

//               <div className="space-y-2.5 mb-4">
//                 <div className="flex justify-between text-xs">
//                   <span className="text-white/40">Viral score</span>
//                   <span className="text-accent2 font-medium">{active.score}%</span>
//                 </div>
//                 <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
//                   <div className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full" style={{ width: `${active.score}%` }} />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <p className="text-[10px] text-white/35 uppercase tracking-widest mb-2">AI Hook</p>
//                 <p className="text-xs text-white/70 italic leading-relaxed bg-white/[0.03] border border-white/[0.06] rounded-lg p-2.5">"{active.hook}"</p>
//               </div>

//               <div className="mb-5">
//                 <p className="text-[10px] text-white/35 uppercase tracking-widest mb-2">Hashtags</p>
//                 <div className="flex flex-wrap gap-1.5">
//                   {active.hashtags.map(h => (
//                     <span key={h} className="text-[10px] bg-accent/10 border border-accent/20 text-violet-300 px-2 py-0.5 rounded-md flex items-center gap-1">
//                       <Hash size={8} />{h.replace('#', '')}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <button className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm">
//                 <Download size={14} /> Download MP4
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   )
// }

import { useState, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { supabase } from '../lib/supabase'
import {
  Play, Download, TrendingUp, Hash, MoreHorizontal,
  Search, Scissors, Loader2, Trash2, AlertCircle,
  CheckCircle2, Filter, RefreshCw
} from 'lucide-react'

const filters = ['All', 'TikTok', 'Shorts', 'Reels', 'General']

function ScoreBadge({ score }) {
  if (!score) return null
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

function StatusBadge({ status }) {
  const styles = {
    ready:      'bg-accent2/10 text-teal-400 border border-accent2/20',
    processing: 'bg-accent/12 text-violet-300 border border-accent/20',
    failed:     'bg-accent3/10 text-rose-400 border border-accent3/20',
    pending:    'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20',
  }
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${styles[status] || styles.pending}`}>
      {status}
    </span>
  )
}

function EmptyState({ search, filter }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
        <Scissors size={22} className="text-accent/50" />
      </div>
      {search || filter !== 'All' ? (
        <>
          <p className="text-sm font-medium text-white/50 mb-1">No clips match your search</p>
          <p className="text-xs text-white/30">Try a different search term or filter</p>
        </>
      ) : (
        <>
          <p className="text-sm font-medium text-white/50 mb-1">No clips yet</p>
          <p className="text-xs text-white/30 mb-4">
            Import a video and VIRA will automatically generate clips for you
          </p>
          
            <a href="/import"
            className="bg-accent text-white text-xs font-medium px-4 py-2 rounded-lg no-underline hover:opacity-85 transition-all"
          >
            Import your first video
          </a>
        </>
      )}
    </div>
  )
}

export default function AIClips() {
  const [clips, setClips]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('All')
  const [selected, setSelected] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')

  useEffect(() => {
    loadClips()
  }, [])

  // ── Load clips from Supabase ───────────────────────────────────────────────
  const loadClips = async () => {
    setLoading(true)
    setError('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('clips')
        .select(`
          *,
          projects (
            title,
            source
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setClips(data || [])

    } catch (err) {
      console.error('Error loading clips:', err)
      setError('Failed to load clips. Please refresh.')
    } finally {
      setLoading(false)
    }
  }

  // ── Delete a clip ──────────────────────────────────────────────────────────
  const handleDelete = async (clipId, storagePath) => {
    setDeleting(clipId)
    setError('')
    try {
      // Delete from storage if path exists
      if (storagePath) {
        await supabase.storage
          .from('videos')
          .remove([storagePath])
      }

      // Delete from database
      const { error } = await supabase
        .from('clips')
        .delete()
        .eq('id', clipId)

      if (error) throw error

      // Remove from local state
      setClips(prev => prev.filter(c => c.id !== clipId))
      if (selected === clipId) setSelected(null)
      setSuccess('Clip deleted successfully.')
      setTimeout(() => setSuccess(''), 3000)

    } catch (err) {
      console.error('Delete error:', err)
      setError('Failed to delete clip. Please try again.')
    } finally {
      setDeleting(null)
    }
  }

  // ── Download a clip ────────────────────────────────────────────────────────
  const handleDownload = async (clip) => {
    try {
      if (!clip.storage_path) {
        setError('No file available to download yet.')
        return
      }

      const { data, error } = await supabase.storage
        .from('videos')
        .createSignedUrl(clip.storage_path, 3600) // 1 hour expiry

      if (error) throw error

      // Trigger download
      const link = document.createElement('a')
      link.href = data.signedUrl
      link.download = `${clip.title || 'clip'}.mp4`
      link.click()

      // Save export record
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('exports').insert({
        clip_id:    clip.id,
        user_id:    user.id,
        format:     'mp4',
        resolution: '1080p',
        platform:   clip.platform,
      })

    } catch (err) {
      console.error('Download error:', err)
      setError('Download failed. Please try again.')
    }
  }

  // ── Filter clips ───────────────────────────────────────────────────────────
  const filteredClips = clips.filter(clip => {
    const matchesSearch = !search ||
      clip.title?.toLowerCase().includes(search.toLowerCase()) ||
      clip.hook?.toLowerCase().includes(search.toLowerCase())

    const matchesFilter = filter === 'All' ||
      clip.platform?.toLowerCase() === filter.toLowerCase()

    return matchesSearch && matchesFilter
  })

  const activeClip = selected ? clips.find(c => c.id === selected) : null

  return (
    <DashboardLayout>
      <div className="p-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="section-label">AI Engine</p>
            <h1 className="font-display font-bold text-2xl mb-1">AI Clips</h1>
            <p className="text-white/40 text-sm">
              {loading ? 'Loading…' : `${clips.length} clip${clips.length !== 1 ? 's' : ''} generated from your videos`}
            </p>
          </div>
          <button
            onClick={loadClips}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white transition-colors"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Success / Error messages */}
        {success && (
          <div className="bg-accent2/10 border border-accent2/20 rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-accent2" />
            <p className="text-sm text-teal-400">{success}</p>
          </div>
        )}
        {error && (
          <div className="bg-accent3/10 border border-accent3/20 rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
            <AlertCircle size={14} className="text-rose-400" />
            <p className="text-sm text-rose-400">{error}</p>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              className="input-field pl-8 text-sm py-2"
              placeholder="Search clips…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-1 flex-wrap">
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

          {clips.length > 0 && (
            <button className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5 ml-auto">
              <Download size={13} /> Export All
            </button>
          )}
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={24} className="text-accent animate-spin" />
              <p className="text-white/40 text-sm">Loading your clips…</p>
            </div>
          </div>
        ) : (
          <div className={`grid gap-5 ${activeClip ? 'grid-cols-1 lg:grid-cols-[1fr_320px]' : 'grid-cols-1'}`}>

            {/* Clips grid */}
            <div>
              {filteredClips.length === 0 ? (
                <EmptyState search={search} filter={filter} />
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredClips.map(clip => (
                    <div
                      key={clip.id}
                      onClick={() => setSelected(selected === clip.id ? null : clip.id)}
                      className={`bg-card border rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-card ${
                        selected === clip.id
                          ? 'border-accent/40'
                          : 'border-white/[0.07]'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div
                        className="relative flex items-center justify-center"
                        style={{
                          aspectRatio: '9/16',
                          maxHeight: '180px',
                          background: 'linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)'
                        }}
                      >
                        <div className="text-3xl">🎬</div>

                        {/* Viral score */}
                        {clip.viral_score > 0 && (
                          <div className="absolute top-2 right-2">
                            <ScoreBadge score={clip.viral_score} />
                          </div>
                        )}

                        {/* Duration */}
                        {clip.duration && (
                          <div className="absolute bottom-2 left-2 bg-black/60 rounded px-1.5 py-0.5 text-[9px] text-white/70">
                            {Math.round(clip.duration)}s
                          </div>
                        )}

                        {/* Processing overlay */}
                        {clip.status === 'processing' && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Loader2 size={20} className="text-accent animate-spin" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-3">
                        <p className="text-xs font-medium truncate mb-0.5">
                          {clip.title || 'Untitled clip'}
                        </p>
                        <p className="text-[10px] text-white/35 mb-2">
                          {clip.platform || 'General'} · {clip.projects?.title || 'Unknown project'}
                        </p>

                        {/* Hook preview */}
                        {clip.hook && (
                          <p className="text-[10px] text-white/40 italic leading-relaxed line-clamp-2 mb-2">
                            "{clip.hook}"
                          </p>
                        )}

                        <div className="flex items-center gap-1.5 mt-2">
                          <StatusBadge status={clip.status} />
                          <div className="flex items-center gap-1 ml-auto">
                            {/* Download */}
                            <button
                              onClick={e => { e.stopPropagation(); handleDownload(clip) }}
                              className="w-6 h-6 rounded-md bg-white/5 border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
                              title="Download"
                            >
                              <Download size={10} />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={e => { e.stopPropagation(); handleDelete(clip.id, clip.storage_path) }}
                              disabled={deleting === clip.id}
                              className="w-6 h-6 rounded-md bg-white/5 border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-rose-400 transition-colors disabled:opacity-40"
                              title="Delete"
                            >
                              {deleting === clip.id
                                ? <Loader2 size={10} className="animate-spin" />
                                : <Trash2 size={10} />
                              }
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detail panel */}
            {activeClip && (
              <div className="bg-card border border-white/[0.07] rounded-2xl p-5 h-fit sticky top-8">
                <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">
                  Clip Details
                </p>

                {/* Mini preview */}
                <div
                  className="rounded-xl flex items-center justify-center mb-4 relative overflow-hidden"
                  style={{
                    aspectRatio: '9/16',
                    maxHeight: '200px',
                    background: 'linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)'
                  }}
                >
                  <div className="text-4xl">🎬</div>
                  {activeClip.viral_score > 0 && (
                    <div className="absolute top-2 right-2">
                      <ScoreBadge score={activeClip.viral_score} />
                    </div>
                  )}
                </div>

                {/* Details */}
                <h3 className="font-display font-bold text-sm mb-1">
                  {activeClip.title || 'Untitled clip'}
                </h3>
                <p className="text-xs text-white/35 mb-4">
                  {activeClip.platform || 'General'} ·{' '}
                  {activeClip.duration ? `${Math.round(activeClip.duration)}s` : '--'} ·{' '}
                  {activeClip.start_time && activeClip.end_time
                    ? `${Math.round(activeClip.start_time)}s – ${Math.round(activeClip.end_time)}s`
                    : 'No timestamps'}
                </p>

                {/* Viral score bar */}
                {activeClip.viral_score > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/40">Viral score</span>
                      <span className="text-accent2 font-medium">{activeClip.viral_score}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full"
                        style={{ width: `${activeClip.viral_score}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Hook */}
                {activeClip.hook && (
                  <div className="mb-4">
                    <p className="text-[10px] text-white/35 uppercase tracking-widest mb-2">AI Hook</p>
                    <p className="text-xs text-white/70 italic leading-relaxed bg-white/[0.03] border border-white/[0.06] rounded-lg p-2.5">
                      "{activeClip.hook}"
                    </p>
                  </div>
                )}

                {/* Hashtags */}
                {activeClip.hashtags?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[10px] text-white/35 uppercase tracking-widest mb-2">Hashtags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeClip.hashtags.map(h => (
                        <span
                          key={h}
                          className="text-[10px] bg-accent/10 border border-accent/20 text-violet-300 px-2 py-0.5 rounded-md flex items-center gap-1"
                        >
                          <Hash size={8} />{h.replace('#', '')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project source */}
                <div className="mb-5 bg-white/[0.03] border border-white/[0.06] rounded-lg p-3">
                  <p className="text-[10px] text-white/30 mb-1">Source project</p>
                  <p className="text-xs text-white/60 font-medium">
                    {activeClip.projects?.title || 'Unknown project'}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleDownload(activeClip)}
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm"
                  >
                    <Download size={14} /> Download MP4
                  </button>
                  <button
                    onClick={() => handleDelete(activeClip.id, activeClip.storage_path)}
                    disabled={deleting === activeClip.id}
                    className="w-full btn-secondary py-2.5 flex items-center justify-center gap-2 text-sm text-rose-400 border-rose-400/20 hover:bg-rose-400/5 disabled:opacity-40"
                  >
                    {deleting === activeClip.id
                      ? <Loader2 size={14} className="animate-spin" />
                      : <Trash2 size={14} />
                    }
                    Delete clip
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
