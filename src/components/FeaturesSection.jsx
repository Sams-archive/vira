import { Scissors, Type, Mic2, Link2, Film, Rocket, Sparkles, Hash } from 'lucide-react'

const features = [
  {
    icon: Scissors,
    color: 'accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    title: 'AI Clip Detection',
    desc: 'Scans your long-form video and detects the most emotionally engaging, hook-worthy moments automatically using Whisper + GPT-4.',
    tag: 'Whisper + GPT-4',
  },
  {
    icon: Type,
    color: 'accent2',
    bg: 'bg-accent2/10',
    border: 'border-accent2/20',
    title: 'Auto Captions',
    desc: 'TikTok-style animated captions with word highlighting, bold keywords, and one-click styling presets. Export as SRT or burned-in.',
    tag: 'SRT export',
  },
  {
    icon: Mic2,
    color: 'accent3',
    bg: 'bg-accent3/10',
    border: 'border-accent3/20',
    title: 'AI Voiceover',
    desc: 'Generate natural-sounding voices in multiple accents, tones, and emotions with full pitch, speed, and emotion controls.',
    tag: 'ElevenLabs API',
  },
  {
    icon: Link2,
    color: 'yellow',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
    title: 'Video Link Importer',
    desc: 'Paste any YouTube, TikTok, Instagram, or Facebook link. VIRA downloads, transcribes, and repurposes instantly.',
    tag: 'Multi-platform',
  },
  {
    icon: Film,
    color: 'accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    title: 'Browser Video Editor',
    desc: 'Trim, crop, resize, rotate, add music and captions — all in a lightweight timeline editor without leaving your browser.',
    tag: 'FFmpeg powered',
  },
  {
    icon: Rocket,
    color: 'accent2',
    bg: 'bg-accent2/10',
    border: 'border-accent2/20',
    title: 'Content Repurposing',
    desc: 'Upload once, get Shorts, Reels, and TikToks — all formatted for 9:16, captioned, and optimized with AI hooks.',
    tag: '9:16 · 1:1 · 16:9',
  },
  {
    icon: Sparkles,
    color: 'accent3',
    bg: 'bg-accent3/10',
    border: 'border-accent3/20',
    title: 'AI Hook Generator',
    desc: 'Generates irresistible opening hooks for each clip based on the content type — motivational, educational, storytelling, or meme.',
    tag: 'GPT-4 powered',
  },
  {
    icon: Hash,
    color: 'yellow',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
    title: 'Hashtag Generator',
    desc: 'Get platform-specific hashtag sets automatically generated for each clip to maximize reach and discoverability.',
    tag: 'Platform-aware',
  },
]

export default function FeaturesSection() {
  return (
    <a href='features'>
    <section id="features" className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
      {/* Header */}
      <div className="mb-16">
        <p className="section-label">Core features</p>
        <h2 className="section-title mb-4">
          Everything a creator needs,<br />
          <span className="text-gradient">powered by AI.</span>
        </h2>
        <p className="section-sub">
          From raw footage to polished viral clips — VIRA handles the hard parts automatically
          so you can focus on creating.
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, bg, border, title, desc, tag }, i) => (
          <div
            key={title}
            className="card p-5 group hover:border-white/15 hover:-translate-y-1 transition-all duration-200 cursor-default"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center mb-4`}>
              <Icon size={18} className="text-white/70" />
            </div>

            <h3 className="font-display font-bold text-sm mb-2 tracking-tight">{title}</h3>
            <p className="text-white/40 text-xs leading-relaxed font-light mb-3">{desc}</p>

            <span className="inline-block text-[10px] bg-white/5 border border-white/[0.08] text-white/40 rounded px-2 py-0.5 font-medium">
              {tag}
            </span>
          </div>
        ))}
      </div>
    </section>
    </a>
  )
}
