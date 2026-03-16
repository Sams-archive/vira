export function LogoStrip() {
  const platforms = ['YouTube', 'TikTok', 'Instagram', 'Spotify', 'Twitch', 'LinkedIn', 'Facebook']

  return (
    <div className="py-10 border-y border-white/[0.05] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-center text-[10px] tracking-widest uppercase text-white/25 mb-6 font-medium">
          Trusted by creators from
        </p>
        <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12">
          {platforms.map(p => (
            <span
              key={p}
              className="font-display font-bold text-lg text-white/20 hover:text-white/50 transition-colors cursor-default tracking-tight"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const steps = [
  {
    num: '01',
    title: 'Upload or import',
    desc: 'Drop a video file or paste a link from YouTube, TikTok, Instagram, or Facebook.',
  },
  {
    num: '02',
    title: 'AI analyzes',
    desc: 'VIRA transcribes the audio, detects highlights, and scores each moment for virality.',
  },
  {
    num: '03',
    title: 'Clips generated',
    desc: 'Multiple short clips in 15s, 30s, and 60s formats with captions and viral hooks.',
  },
  {
    num: '04',
    title: 'Export & publish',
    desc: 'Download 1080p MP4 optimized for each platform or schedule directly.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
      <p className="section-label">Process</p>
      <h2 className="section-title mb-4">Four steps to viral.</h2>
      <p className="section-sub mb-16">
        VIRA takes you from raw footage to publish-ready clips in minutes, not hours.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Connector line (desktop) */}
        <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-accent/30 via-accent2/30 to-accent/30" />

        {steps.map(({ num, title, desc }) => (
          <div key={num} className="text-center">
            {/* Step circle */}
            <div className="w-14 h-14 rounded-full bg-card border border-white/[0.07] flex items-center justify-center mx-auto mb-5 relative z-10">
              <span className="font-display font-extrabold text-accent text-sm">{num}</span>
            </div>
            <h4 className="font-display font-bold text-sm mb-2">{title}</h4>
            <p className="text-white/40 text-xs leading-relaxed font-light">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const testimonials = [
  {
    initials: 'JM',
    bg: 'bg-accent/15',
    color: 'text-violet-300',
    name: 'Jake Miller',
    handle: '@jakemillerpodcast · 80K followers',
    quote: 'VIRA turned my 3-hour podcast into 24 viral clips in under 10 minutes. My TikTok went from 2K to 80K followers in a month. Absolute game-changer.',
  },
  {
    initials: 'SR',
    bg: 'bg-accent2/10',
    color: 'text-teal-400',
    name: 'Sofia Reyes',
    handle: '@sofiareyes.fit · 220K followers',
    quote: 'The auto-captions are insane. They look better than what I was spending hours doing manually. My Reels reach doubled within two weeks of using VIRA.',
  },
  {
    initials: 'TK',
    bg: 'bg-accent3/10',
    color: 'text-rose-400',
    name: 'Tyler Kim',
    handle: '@tylerteaches · 140K subscribers',
    quote: 'I used to spend 6 hours a week editing clips. VIRA cut that to 20 minutes. It\'s like having a professional editor on demand, available 24/7.',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
      <p className="section-label">Creators love VIRA</p>
      <h2 className="section-title mb-16">Built for the new<br />creator economy.</h2>

      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map(({ initials, bg, color, name, handle, quote }) => (
          <div key={name} className="card p-6 hover:border-white/12 transition-all duration-200">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-white/50 text-sm leading-relaxed font-light italic mb-5">"{quote}"</p>

            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center font-display font-bold text-xs ${color}`}>
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-white/35">{handle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
