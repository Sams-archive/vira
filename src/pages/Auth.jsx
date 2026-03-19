// import React from "react";

// import { supabase } from "../lib/supabase";

// export default function Auth() {
//   const handleGoogleLogin = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: { redirectTo: window.location.origin + "/dashboard" },
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
//       <div className="max-w-md w-full bg-card border border-white/10 p-8 rounded-3xl text-center">
//         <h1 className="text-3xl font-bold mb-2">Welcome to VIRA</h1>
//         <p className="text-white/40 mb-8">
//           Sign in to start repurposing your videos.
//         </p>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full bg-white text-black font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-3 hover:bg-white/90 transition-all"
//         >
//           <img
//             src="https://www.google.com/favicon.ico"
//             alt="Google"
//             className="w-5 h-5"
//           />
//           Continue with Google
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Eye, EyeOff, Loader2, ArrowRight, Zap } from 'lucide-react'

const CLIPS = [
  { top: '12%',  left: '4%',   delay: '0s',    score: 94 },
  { top: '55%',  left: '2%',   delay: '1.2s',  score: 87 },
  { top: '80%',  left: '6%',   delay: '0.6s',  score: 91 },
  { top: '20%',  right: '4%',  delay: '0.3s',  score: 88 },
  { top: '60%',  right: '3%',  delay: '1.5s',  score: 96 },
]

function FloatingClip({ style, delay, score }) {
  return (
    <div
      className="absolute hidden lg:flex items-center gap-2 bg-card border border-white/[0.07] rounded-xl px-3 py-2 pointer-events-none"
      style={{ ...style, animation: `float 4s ease-in-out ${delay} infinite` }}
    >
      <div className="w-8 h-10 rounded-md bg-gradient-to-b from-accent/30 to-accent2/20 flex items-center justify-center text-[10px]">🎬</div>
      <div>
        <p className="text-[9px] text-white/35 leading-none mb-0.5">Viral score</p>
        <p className="text-xs font-display font-bold text-accent2">{score}%</p>
      </div>
    </div>
  )
}

function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]
  const strength = checks.filter(Boolean).length
  const colors = ['bg-white/10', 'bg-accent3', 'bg-yellow-400', 'bg-accent2', 'bg-accent2']
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  if (!password) return null
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-all duration-300 ${
              i < strength ? colors[strength] : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <p className={`text-[10px] font-medium ${
        strength <= 1 ? 'text-rose-400' :
        strength === 2 ? 'text-yellow-400' : 'text-teal-400'
      }`}>
        {labels[strength]}
      </p>
    </div>
  )
}

export default function Auth() {
  const navigate = useNavigate()
  const [mode, setMode]         = useState('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [gLoading, setGLoading] = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')

  const isLogin  = mode === 'login'
  const isSignup = mode === 'signup'

  const handleGoogleLogin = async () => {
    setGLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/dashboard' },
    })
    if (error) { setError(error.message); setGLoading(false) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        })
        if (error) throw error
        setSuccess('Check your email to confirm your account, then sign in.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setMode(isLogin ? 'signup' : 'login')
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4">

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(108,92,231,0.09) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,210,168,0.07) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(240,239,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,239,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
      </div>

      {/* Floating clip cards */}
      {CLIPS.map((c, i) => (
        <FloatingClip
          key={i}
          style={{ top: c.top, left: c.left, right: c.right }}
          delay={c.delay}
          score={c.score}
        />
      ))}

      {/* Main card */}
      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 no-underline mb-6">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">V</span>
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tight text-white">
              VIR<span className="text-accent2">A</span>
            </span>
          </Link>
          <h1 className="font-display font-extrabold text-3xl tracking-tight mb-2">
            {isLogin ? 'Welcome back.' : 'Start going viral.'}
          </h1>
          <p className="text-white/40 text-sm font-light">
            {isLogin
              ? 'Sign in to your VIRA account.'
              : 'Create your free account — no credit card needed.'}
          </p>
        </div>

        <div className="bg-card border border-white/[0.08] rounded-3xl p-7 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

          {/* Google button */}
          <button
            onClick={handleGoogleLogin}
            disabled={gLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-medium text-sm py-3.5 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed mb-5"
          >
            {gLoading ? (
              <Loader2 size={16} className="animate-spin text-black" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-[11px] text-white/25 font-medium tracking-wider uppercase">or</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">

            {isSignup && (
              <div>
                <label className="block text-[11px] font-medium text-white/40 uppercase tracking-widest mb-1.5">Full name</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-field"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-medium text-white/40 uppercase tracking-widest mb-1.5">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-medium text-white/40 uppercase tracking-widest">Password</label>
                {isLogin && (
                  <button type="button" className="text-[11px] text-accent hover:underline bg-transparent border-0 cursor-pointer p-0">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder={isSignup ? 'At least 8 characters' : '••••••••'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  minLength={isSignup ? 8 : undefined}
                  className="input-field pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors bg-transparent border-0 cursor-pointer p-0"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {isSignup && <PasswordStrength password={password} />}
            </div>

            {error && (
              <div className="bg-accent3/10 border border-accent3/25 rounded-xl px-4 py-3 text-sm text-rose-400 leading-relaxed">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-accent2/10 border border-accent2/25 rounded-xl px-4 py-3 text-sm text-teal-400 leading-relaxed">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:-translate-y-px active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 mt-1 text-sm"
            >
              {loading ? (
                <><Loader2 size={15} className="animate-spin" /> {isLogin ? 'Signing in…' : 'Creating account…'}</>
              ) : (
                <>{isLogin ? 'Sign in' : 'Create free account'} <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-sm text-white/35 mt-5 font-light">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={switchMode}
              className="text-white/70 hover:text-white font-medium transition-colors bg-transparent border-0 cursor-pointer p-0"
            >
              {isLogin ? 'Sign up free' : 'Sign in'}
            </button>
          </p>

          {/* Free plan badge — signup only */}
          {isSignup && (
            <div className="mt-5 bg-accent2/5 border border-accent2/15 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-accent2/15 flex items-center justify-center flex-shrink-0">
                <Zap size={13} className="text-accent2" />
              </div>
              <div>
                <p className="text-xs font-medium text-white/70">Free plan includes</p>
                <p className="text-[11px] text-white/35 font-light">5 AI clips/month · Auto captions · All imports</p>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-[11px] text-white/20 mt-6 font-light">
          By continuing, you agree to VIRA's{' '}
          <Link to="/" className="text-white/35 hover:text-white/60 no-underline transition-colors">Terms</Link>
          {' '}and{' '}
          <Link to="/" className="text-white/35 hover:text-white/60 no-underline transition-colors">Privacy Policy</Link>
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}