// import Sidebar from './Sidebar'

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-black">
//       <Sidebar />
//       <main className="flex-1 overflow-auto">
//         {children}
//       </main>
//     </div>
//   )
// }


import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { supabase } from '../lib/supabase'
import {
  TrendingUp, Clock, Scissors, Download,
  Play, MoreHorizontal, Plus, ArrowRight,
  Zap, Star, Loader2
} from 'lucide-react'

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

const quickActions = [
  { icon: Plus,       label: 'Generate Video', href: '/generate', color: 'bg-accent/15 border-accent/25 text-accent'    },
  { icon: ArrowRight, label: 'Import Video',   href: '/import',   color: 'bg-accent2/10 border-accent2/25 text-accent2' },
  { icon: Scissors,   label: 'AI Clips',       href: '/clips',    color: 'bg-accent3/10 border-accent3/25 text-accent3' },
]

export default function Dashboard() {
  const [user, setUser]       = useState(null)
  const [clips, setClips]     = useState([])
  const [stats, setStats]     = useState({ clips: 0, exports: 0, projects: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    setLoading(true)
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (!user) return

      // Get recent clips
      const { data: clipsData } = await supabase
        .from('clips')
        .select('*, projects(title)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      setClips(clipsData || [])

      // Get stats
      const { count: clipCount } = await supabase
        .from('clips')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      const { count: projectCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      const { count: exportCount } = await supabase
        .from('exports')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      setStats({
        clips:    clipCount    || 0,
        projects: projectCount || 0,
        exports:  exportCount  || 0,
      })

    } catch (err) {
      console.error('Dashboard load error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const getFirstName = () => {
    if (!user) return ''
    const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'there'
    return fullName.split(' ')[0]
  }

  const statCards = [
    { label: 'Clips Created',   value: stats.clips,    icon: Scissors, change: 'all time'  },
    { label: 'Projects',        value: stats.projects, icon: Star,     change: 'all time'  },
    { label: 'Total Exports',   value: stats.exports,  icon: Download, change: 'all time'  },
    { label: 'Hours Saved',     value: Math.round(stats.clips * 0.5), icon: Clock, change: 'estimated' },
  ]

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={24} className="text-accent animate-spin" />
            <p className="text-white/40 text-sm">Loading dashboard…</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl mb-1">
            {getGreeting()}, {getFirstName()} 👋
          </h1>
          <p className="text-white/40 text-sm">
            {clips.length > 0
              ? `You have ${clips.filter(c => c.status === 'processing').length} clips processing and ${clips.filter(c => c.status === 'ready').length} ready to export.`
              : 'Welcome to VIRA! Start by importing a video or generating a clip.'}
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex gap-3 mb-8">
          {quickActions.map(({ icon: Icon, label, href, color }) => (
            <Link
              key={label}
              to={href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium no-underline transition-all hover:-translate-y-px ${color}`}
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, change }) => (
            <div key={label} className="bg-card border border-white/[0.07] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-white/35 uppercase tracking-widest font-medium">{label}</p>
                <Icon size={13} className="text-white/20" />
              </div>
              <p className="font-display font-bold text-2xl mb-1">{value}</p>
              <p className="text-[10px] text-white/35">{change}</p>
            </div>
          ))}
        </div>

        {/* Usage bar */}
        <div className="bg-card border border-white/[0.07] rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-yellow-400" />
              <span className="text-sm font-medium">Free Plan · 5 clips/month</span>
            </div>
            <Link to="/pricing" className="text-xs text-accent no-underline hover:underline">
              Upgrade to Pro →
            </Link>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full transition-all"
              style={{ width: `${Math.min((stats.clips / 5) * 100, 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-white/35 mt-1.5">
            {stats.clips} of 5 clips used this month
          </p>
        </div>

        {/* Recent clips */}
        <div className="bg-card border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <h2 className="font-display font-bold text-sm">Recent Clips</h2>
            <Link to="/clips" className="text-xs text-accent no-underline hover:underline flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>

          {clips.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <Scissors size={20} className="text-accent/50" />
              </div>
              <p className="text-sm font-medium text-white/50 mb-1">No clips yet</p>
              <p className="text-xs text-white/30 mb-4">Import a video or generate your first clip to get started</p>
              <Link
                to="/import"
                className="bg-accent text-white text-xs font-medium px-4 py-2 rounded-lg no-underline hover:opacity-85 transition-all"
              >
                Import your first video
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {clips.map((clip) => (
                <div key={clip.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-off-black border border-white/[0.06] flex items-center justify-center text-base flex-shrink-0">
                    🎬
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{clip.title || 'Untitled clip'}</p>
                    <p className="text-xs text-white/35 mt-0.5">
                      {clip.projects?.title || 'Unknown project'} · {clip.duration ? `${Math.round(clip.duration)}s` : '--'}
                    </p>
                  </div>
                  {clip.viral_score > 0 && (
                    <div className="hidden sm:flex items-center gap-1.5">
                      <TrendingUp size={11} className="text-accent2" />
                      <span className="text-xs text-accent2 font-medium">{clip.viral_score}%</span>
                    </div>
                  )}
                  <StatusBadge status={clip.status} />
                  <div className="flex items-center gap-1.5 ml-2">
                    {clip.status === 'ready' && (
                      <button className="w-7 h-7 rounded-md bg-white/5 border border-white/[0.07] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                        <Play size={11} />
                      </button>
                    )}
                    <button className="w-7 h-7 rounded-md bg-white/5 border border-white/[0.07] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                      <MoreHorizontal size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}