import { Link } from 'react-router-dom'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Dashboard', 'API'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'GDPR'],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
                <span className="text-white font-display font-bold text-[10px]">V</span>
              </div>
              <span className="font-display font-extrabold text-base text-white">VIR<span className="text-accent2">A</span></span>
            </div>
            <p className="text-white/35 text-xs leading-relaxed font-light mb-4">
              Video Intelligence &<br />Repurposing Assistant.<br />Turn any video viral.
            </p>
            <div className="flex gap-2">
              {['𝕏', 'in', '▶'].map(s => (
                <div key={s} className="w-7 h-7 rounded-md bg-white/5 border border-white/[0.07] flex items-center justify-center text-xs text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors cursor-pointer">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-[10px] font-medium tracking-widest uppercase text-white/30 mb-4">{section}</p>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {links.map(link => (
                  <li key={link}>
                    <Link to="/" className="text-xs text-white/40 no-underline hover:text-white/80 transition-colors font-light">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.05] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/20">© 2025 VIRA · Video Intelligence & Repurposing Assistant</p>
          <p className="text-xs text-white/20">Built for creators worldwide.</p>
        </div>
      </div>
    </footer>
  )
}
