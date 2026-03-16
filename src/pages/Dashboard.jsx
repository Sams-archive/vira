import DashboardLayout from '../components/DashboardLayout'
import { Link } from 'react-router-dom'
import {
  TrendingUp, Clock, Scissors, Download, Play,
  MoreHorizontal, Plus, ArrowRight, Zap, Star
} from 'lucide-react'

const stats = [
  { label: 'Clips Created', value: '247', change: '+23%', up: true, icon: Scissors },
  { label: 'Avg Viral Score', value: '87%', change: '+4 pts', up: true, icon: Star },
  { label: 'Hours Saved', value: '142h', change: '+18h', up: true, icon: Clock },
  { label: 'Total Exports', value: '1,204', change: '+67', up: true, icon: Download },
]

const recentClips = [
  { emoji: '🎬', title: 'My morning routine — 30s cut #3', meta: 'TikTok · 30s · 9:16 · 4.2MB', status: 'Ready', score: 94 },
  { emoji: '📹', title: 'Podcast ep.47 — hook highlight', meta: 'Shorts · 60s · 9:16 · 8.1MB', status: 'Processing', score: 88 },
  { emoji: '🎙️', title: 'Interview clip — viral moment', meta: 'Reels · 15s · 9:16 · 2.8MB', status: 'Ready', score: 91 },
  { emoji: '🎥', title: 'Behind the scenes — day in life', meta: 'TikTok · 60s · 9:16 · 11.3MB', status: 'Ready', score: 78 },
  { emoji: '📽️', title: 'Product review highlight reel', meta: 'Shorts · 30s · 9:16 · 6.7MB', status: 'Failed', score: 0 },
]

const quickActions = [
  { icon: Plus, label: 'Generate Video', href: '/generate', color: 'bg-accent/15 border-accent/25 text-accent' },
  { icon: ArrowRight, label: 'Import Video', href: '/import', color: 'bg-accent2/10 border-accent2/25 text-accent2' },
  { icon: Scissors, label: 'AI Clips', href: '/clips', color: 'bg-accent3/10 border-accent3/25 text-accent3' },
]

function StatusBadge({ status }) {
  const styles = {
    Ready: 'bg-accent2/10 text-teal-400 border border-accent2/20',
    Processing: 'bg-accent/12 text-violet-300 border border-accent/20',
    Failed: 'bg-accent3/10 text-rose-400 border border-accent3/20',
  }
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${styles[status]}`}>
      {status}
    </span>
  )
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl mb-1">Good morning, Alex 👋</h1>
          <p className="text-white/40 text-sm">You have 3 clips processing and 12 ready to export.</p>
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
          {stats.map(({ label, value, change, up, icon: Icon }) => (
            <div key={label} className="bg-card border border-white/[0.07] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-white/35 uppercase tracking-widest font-medium">{label}</p>
                <Icon size={13} className="text-white/20" />
              </div>
              <p className="font-display font-bold text-2xl mb-1">{value}</p>
              <p className={`text-[10px] font-medium ${up ? 'text-accent2' : 'text-accent3'}`}>
                {up ? '↑' : '↓'} {change} this week
              </p>
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
            <Link to="/pricing" className="text-xs text-accent no-underline hover:underline">Upgrade to Pro →</Link>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full" style={{ width: '60%' }} />
          </div>
          <p className="text-[10px] text-white/35 mt-1.5">3 of 5 clips used this month</p>
        </div>

        {/* Recent clips */}
        <div className="bg-card border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <h2 className="font-display font-bold text-sm">Recent Clips</h2>
            <Link to="/clips" className="text-xs text-accent no-underline hover:underline flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {recentClips.map(({ emoji, title, meta, status, score }) => (
              <div key={title} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                {/* Thumb */}
                <div className="w-10 h-10 rounded-lg bg-off-black border border-white/[0.06] flex items-center justify-center text-base flex-shrink-0">
                  {emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{title}</p>
                  <p className="text-xs text-white/35 mt-0.5">{meta}</p>
                </div>

                {/* Score */}
                {score > 0 && (
                  <div className="hidden sm:flex items-center gap-1.5">
                    <TrendingUp size={11} className="text-accent2" />
                    <span className="text-xs text-accent2 font-medium">{score}%</span>
                  </div>
                )}

                {/* Status */}
                <StatusBadge status={status} />

                {/* Actions */}
                <div className="flex items-center gap-1.5 ml-2">
                  {status === 'Ready' && (
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
        </div>
      </div>
    </DashboardLayout>
  )
}
