import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import { LogoStrip, HowItWorks, Testimonials } from '../components/MarketingSections'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <LogoStrip />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />

      {/* CTA Section */}
      <section className="py-12 max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className="rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-accent/20"
          style={{
            background: 'linear-gradient(135deg, rgba(108,92,231,0.12) 0%, rgba(0,210,168,0.06) 100%)',
          }}
        >
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%)' }} />
          </div>

          <p className="section-label relative z-10">Get started</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4 relative z-10">
            Ready to go viral?
          </h2>
          <p className="text-white/45 text-lg font-light mb-8 max-w-xl mx-auto relative z-10">
            Join 180,000+ creators using VIRA to turn their content into growth engines.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative z-10">
            <Link
              to="/dashboard"
              className="btn-primary flex items-center gap-2 no-underline text-base px-8 py-4"
            >
              Start for free — no card needed
              <ArrowRight size={16} />
            </Link>
            <button className="btn-secondary px-6 py-4 text-base">
              Book a demo
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
