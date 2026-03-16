import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Dashboard', href: '/dashboard' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDashboard = location.pathname !== '/'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || isDashboard
        ? 'bg-black/85 backdrop-blur-xl border-b border-white/[0.06]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-display font-bold text-xs">V</span>
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-gradient-white">
            VIR<span className="text-accent2" style={{WebkitTextFillColor: '#00D2A8'}}>A</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map(link => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="text-white/50 text-sm no-underline hover:text-white transition-colors duration-200 font-light"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors no-underline">
            Sign in
          </Link>
          <Link
            to="/dashboard"
            className="bg-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-85 transition-all duration-200 hover:-translate-y-px no-underline"
          >
            Start free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-off-black border-t border-white/[0.06] px-6 py-4 flex flex-col gap-3">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.href}
              className="text-white/60 text-sm no-underline py-1 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/dashboard"
            className="btn-primary text-center text-sm mt-2 no-underline"
            onClick={() => setMobileOpen(false)}
          >
            Start free
          </Link>
        </div>
      )}
    </nav>
  )
}
