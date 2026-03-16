import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { Check, Zap, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: 0,
    sub: 'Perfect to get started',
    features: [
      '5 clips per month',
      'Auto captions (VIRA watermark)',
      '720p export quality',
      'Basic caption styles',
      'YouTube & TikTok import',
      'Community support',
    ],
    cta: 'Get started free',
    ctaStyle: 'btn-secondary',
    featured: false,
  },
  {
    name: 'Pro',
    price: 29,
    sub: 'For serious creators',
    features: [
      'Unlimited clips per month',
      '1080p HD export, no watermark',
      'All caption styles + animations',
      'AI Voiceover (50 mins/month)',
      'Priority AI processing',
      'All platform imports',
      'AI Hashtag & hook generator',
      'Thumbnail generator',
      'Email support',
    ],
    cta: 'Start Pro trial',
    ctaStyle: 'btn-primary',
    featured: true,
  },
  {
    name: 'Agency',
    price: 99,
    sub: 'For teams & agencies',
    features: [
      'Everything in Pro',
      '5 team seats included',
      'AI Voiceover (unlimited)',
      'White-label video exports',
      'Full API access',
      'Priority dedicated support',
      'Custom branding & logo',
      'Analytics dashboard',
      'SLA guarantee',
    ],
    cta: 'Contact sales',
    ctaStyle: 'btn-secondary',
    featured: false,
  },
]

const faqs = [
  { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time. Your access continues until the end of the billing period.' },
  { q: 'What video formats are supported?', a: 'VIRA supports MP4, MOV, AVI, MKV, and WebM files up to 2GB. Exported clips are always optimized MP4.' },
  { q: 'How does the AI clip detection work?', a: 'VIRA uses Whisper for transcription and GPT-4 to analyze content and identify emotionally engaging, high-retention moments.' },
  { q: 'Is there a free trial for Pro?', a: 'Yes — Pro includes a 7-day free trial with no credit card required. You get full access to all Pro features.' },
  { q: 'What platforms can I import from?', a: 'Free plan supports YouTube and TikTok. Pro and Agency support YouTube, TikTok, Instagram, and Facebook.' },
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label">Pricing</p>
          <h1 className="font-display font-extrabold text-5xl lg:text-6xl tracking-tight mb-4">
            Grow at your<br />
            <span className="text-gradient">own pace.</span>
          </h1>
          <p className="text-white/45 text-lg font-light max-w-xl mx-auto">
            Start free. Upgrade when you're ready. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-6 bg-card border border-white/[0.07] rounded-xl px-5 py-2">
            <span className="text-sm text-white font-medium">Monthly</span>
            <div className="w-10 h-5 rounded-full bg-accent/30 relative">
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white/40 rounded-full" />
            </div>
            <span className="text-sm text-white/40">Annual</span>
            <span className="text-[10px] bg-accent2/10 text-teal-400 border border-accent2/20 px-2 py-0.5 rounded-full font-medium">Save 30%</span>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {plans.map(({ name, price, sub, features, cta, ctaStyle, featured }) => (
            <div
              key={name}
              className={`rounded-2xl p-7 relative transition-all hover:-translate-y-1 ${
                featured
                  ? 'border-2 border-accent/50 bg-gradient-to-b from-accent/10 to-card'
                  : 'border border-white/[0.07] bg-card'
              }`}
            >
              {featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-white/35 mb-3">{name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="font-display font-extrabold text-5xl tracking-tight leading-none">
                    <sup className="text-xl align-super font-medium">$</sup>{price}
                  </span>
                  <span className="text-white/35 text-sm mb-1">/month</span>
                </div>
                <p className="text-white/35 text-xs font-light">{sub}</p>
              </div>

              <div className="h-px bg-white/[0.06] mb-6" />

              <ul className="space-y-3 mb-8">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-accent2/15 border border-accent2/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={9} className="text-accent2" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-white/55 font-light leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/dashboard"
                className={`${ctaStyle} w-full flex items-center justify-center gap-2 no-underline text-sm py-3.5 ${featured ? 'shadow-accent' : ''}`}
              >
                {cta}
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* Feature comparison teaser */}
        <div className="bg-card border border-white/[0.07] rounded-2xl p-8 mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap size={16} className="text-yellow-400" />
            <p className="font-display font-bold text-base">Enterprise plan available</p>
          </div>
          <p className="text-white/40 text-sm font-light mb-4">Custom seats, SSO, dedicated infrastructure, SLA, and white-glove onboarding.</p>
          <button className="btn-secondary text-sm px-6 py-2.5">Talk to sales →</button>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-bold text-2xl text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-card border border-white/[0.07] rounded-xl p-5">
                <p className="font-medium text-sm mb-2">{q}</p>
                <p className="text-white/45 text-sm font-light leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
