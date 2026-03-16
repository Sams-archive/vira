/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        black: '#080810',
        'off-black': '#0d0d18',
        surface: '#111120',
        card: '#161628',
        accent: '#6C5CE7',
        accent2: '#00D2A8',
        accent3: '#FF6B6B',
        vira: {
          purple: '#6C5CE7',
          teal: '#00D2A8',
          coral: '#FF6B6B',
          amber: '#FFB830',
        },
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #6C5CE7 0%, #00D2A8 100%)',
        'gradient-hero': 'linear-gradient(135deg, #080810 0%, #0d0d18 60%, #111120 100%)',
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'wave': 'wave 1s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out infinite 0.5s',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        pulseDot: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
        wave: { '0%,100%': { height: '6px' }, '50%': { height: '18px' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideIn: { from: { opacity: 0, transform: 'translateX(-20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(108,92,231,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(108,92,231,0.6)' },
        },
      },
      boxShadow: {
        'accent': '0 8px 30px rgba(108,92,231,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
