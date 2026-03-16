import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Type, Download, Bold, Italic, AlignCenter, Palette } from 'lucide-react'

const captionStyles = [
  { id: 'tiktok', label: 'TikTok', preview: 'bg-yellow-400 text-black' },
  { id: 'bold', label: 'Bold Pop', preview: 'bg-white text-black' },
  { id: 'neon', label: 'Neon', preview: 'bg-accent2 text-black' },
  { id: 'minimal', label: 'Minimal', preview: 'bg-black/80 text-white' },
  { id: 'highlight', label: 'Highlight', preview: 'bg-accent text-white' },
]

const fonts = ['Syne', 'DM Sans', 'Bebas Neue', 'Montserrat', 'Oswald']
const positions = ['Bottom', 'Center', 'Top']
const colors = ['#FFFFFF', '#FFD700', '#00D2A8', '#6C5CE7', '#FF6B6B', '#FF8C00']

const sampleText = "I wake up at 5AM every single day and it has completely transformed my life in ways I never expected"

export default function CaptionStudio() {
  const [style, setStyle] = useState('tiktok')
  const [font, setFont] = useState('Syne')
  const [position, setPosition] = useState('Bottom')
  const [color, setColor] = useState('#FFFFFF')
  const [fontSize, setFontSize] = useState(18)
  const [activeWord, setActiveWord] = useState(3)
  const [animated, setAnimated] = useState(true)

  const words = sampleText.split(' ')

  const previewClass = captionStyles.find(s => s.id === style)?.preview || 'bg-white text-black'

  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl">
        <div className="mb-8">
          <p className="section-label">AI Studio</p>
          <h1 className="font-display font-bold text-2xl mb-1">Caption Studio</h1>
          <p className="text-white/40 text-sm">Style, position, and animate your captions for social media.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* Preview pane */}
          <div className="space-y-5">
            {/* Video preview with captions */}
            <div className="bg-card border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                <p className="text-xs font-medium text-white/40 uppercase tracking-widest">Live Preview</p>
                <span className="text-[10px] bg-accent2/10 text-teal-400 border border-accent2/20 px-2 py-0.5 rounded-md">9:16</span>
              </div>
              <div className="p-4">
                <div
                  className="rounded-xl relative overflow-hidden mx-auto"
                  style={{ aspectRatio: '9/16', maxHeight: '380px', background: 'linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)', maxWidth: '215px' }}
                >
                  {/* Caption position */}
                  <div className={`absolute left-3 right-3 ${
                    position === 'Bottom' ? 'bottom-8' :
                    position === 'Center' ? 'top-1/2 -translate-y-1/2' :
                    'top-8'
                  }`}>
                    <div className="flex flex-wrap justify-center gap-[3px]">
                      {words.slice(0, 8).map((word, i) => (
                        <span
                          key={i}
                          onClick={() => setActiveWord(i)}
                          className={`text-[10px] font-bold px-[5px] py-[2px] rounded cursor-pointer transition-all ${
                            i === activeWord
                              ? previewClass
                              : 'bg-black/50 text-white/80'
                          }`}
                          style={{
                            fontFamily: font,
                            fontSize: `${fontSize * 0.55}px`,
                          }}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Export panel */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-5">
              <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">Export</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-primary flex items-center justify-center gap-2 text-sm py-3">
                  <Download size={14} /> Burn-in Captions
                </button>
                <button className="btn-secondary flex items-center justify-center gap-2 text-sm py-3">
                  <Type size={14} /> Export .SRT
                </button>
              </div>
            </div>
          </div>

          {/* Controls panel */}
          <div className="space-y-4">
            {/* Caption style */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-4">
              <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-3">Caption Style</p>
              <div className="grid grid-cols-1 gap-2">
                {captionStyles.map(({ id, label, preview }) => (
                  <button
                    key={id}
                    onClick={() => setStyle(id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all ${
                      style === id
                        ? 'border-accent/40 bg-accent/10'
                        : 'border-white/[0.07] bg-white/[0.02] hover:border-white/15'
                    }`}
                  >
                    <span className={`text-[9px] font-bold px-2 py-1 rounded ${preview}`} style={{ fontFamily: 'Syne, sans-serif' }}>
                      WORD
                    </span>
                    <span className={`text-sm ${style === id ? 'text-violet-300' : 'text-white/60'}`}>{label}</span>
                    {style === id && <span className="ml-auto text-accent text-xs">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Font */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-4">
              <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-3">Font</p>
              <div className="flex flex-col gap-1.5">
                {fonts.map(f => (
                  <button
                    key={f}
                    onClick={() => setFont(f)}
                    className={`px-3 py-2 rounded-lg text-sm text-left border transition-all ${
                      font === f
                        ? 'bg-accent2/10 border-accent2/25 text-teal-400'
                        : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:text-white/70'
                    }`}
                    style={{ fontFamily: f }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Size & Position */}
            <div className="bg-card border border-white/[0.07] rounded-2xl p-4 space-y-4">
              <p className="text-xs font-medium text-white/40 uppercase tracking-widest">Layout</p>

              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-xs text-white/50">Font size</p>
                  <p className="text-xs font-medium text-white">{fontSize}px</p>
                </div>
                <input
                  type="range" min="12" max="36" step="1"
                  value={fontSize}
                  onChange={e => setFontSize(parseInt(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>

              <div>
                <p className="text-xs text-white/50 mb-2">Position</p>
                <div className="flex gap-1">
                  {positions.map(p => (
                    <button
                      key={p}
                      onClick={() => setPosition(p)}
                      className={`flex-1 py-1.5 rounded-lg text-xs border transition-all ${
                        position === p
                          ? 'bg-accent/15 border-accent/30 text-violet-300'
                          : 'bg-white/5 border-white/[0.07] text-white/40'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlight color */}
              <div>
                <p className="text-xs text-white/50 mb-2">Highlight color</p>
                <div className="flex gap-2">
                  {colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${color === c ? 'border-white scale-110' : 'border-transparent'}`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Animated toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Animated</p>
                  <p className="text-xs text-white/35">Word-by-word pop</p>
                </div>
                <button
                  onClick={() => setAnimated(!animated)}
                  className={`w-10 h-5 rounded-full transition-all relative ${animated ? 'bg-accent' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${animated ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
