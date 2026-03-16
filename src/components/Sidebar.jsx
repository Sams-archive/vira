import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Sparkles, Link2, Scissors, Mic2,
  Type, Film, Download, Settings, ChevronRight, Zap
} from 'lucide-react'

const mainNav = [
  { icon: LayoutDashboard, label: 'Projects', href: '/dashboard' },
  { icon: Sparkles, label: 'Generate Video', href: '/generate' },
  { icon: Link2, label: 'Import Video', href: '/import' },
  { icon: Scissors, label: 'AI Clips', href: '/clips' },
]

const toolsNav = [
  { icon: Mic2, label: 'Voice Generator', href: '/voice' },
  { icon: Type, label: 'Caption Studio', href: '/captions' },
  { icon: Film, label: 'Editor', href: '/editor' },
  { icon: Download, label: 'Exports', href: '/dashboard' },
]

export default function Sidebar() {
  const location = useLocation()

  const isActive = (href) => location.pathname === href

  return (
    <aside className="w-56 min-h-screen bg-off-black border-r border-white/[0.06] flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
            <span className="text-white font-display font-bold text-[10px]">V</span>
          </div>
          <span className="font-display font-extrabold text-base tracking-tight text-white">
            VIR<span className="text-accent2">A</span>
          </span>
        </Link>
      </div>

      {/* Plan badge */}
      <div className="px-3 py-3">
        <div className="bg-accent/10 border border-accent/20 rounded-xl px-3 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-yellow-400" />
            <span className="text-xs font-medium text-white/70">Free Plan</span>
          </div>
          <Link to="/pricing" className="text-[10px] text-accent no-underline hover:underline">Upgrade</Link>
        </div>
      </div>

      {/* Main nav */}
      <div className="px-1 py-2">
        <p className="px-3 py-1.5 text-[10px] font-medium tracking-widest uppercase text-white/25 mb-1">Workspace</p>
        {mainNav.map(({ icon: Icon, label, href }) => (
          <Link
            key={href}
            to={href}
            className={`sidebar-item no-underline ${isActive(href) ? 'active' : ''}`}
          >
            <Icon size={15} className="flex-shrink-0" />
            <span>{label}</span>
            {isActive(href) && <ChevronRight size={12} className="ml-auto opacity-50" />}
          </Link>
        ))}
      </div>

      <div className="px-1 py-2">
        <p className="px-3 py-1.5 text-[10px] font-medium tracking-widest uppercase text-white/25 mb-1">Tools</p>
        {toolsNav.map(({ icon: Icon, label, href }) => (
          <Link
            key={href + label}
            to={href}
            className={`sidebar-item no-underline ${isActive(href) ? 'active' : ''}`}
          >
            <Icon size={15} className="flex-shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Bottom */}
      <div className="mt-auto border-t border-white/[0.06] px-3 py-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-[11px] font-bold font-display text-accent">
            AJ
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">Alex Johnson</p>
            <p className="text-[10px] text-white/40 truncate">alex@example.com</p>
          </div>
          <Settings size={13} className="text-white/30 hover:text-white/70 cursor-pointer transition-colors flex-shrink-0" />
        </div>
      </div>
    </aside>
  )
}
