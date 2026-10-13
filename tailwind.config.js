/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF6A',
          bright: '#F3D082',
          light: '#FBE8B5',
          dark: '#B08C4A',
          glow: 'rgba(212, 175, 106, 0.15)',
        },
        cyber: {
          bg: '#05070A',
          surface: '#0B0F17',
          card: '#0F1522',
          cardHover: '#141C2D',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(212, 175, 106, 0.35)',
          muted: '#8B949E',
          text: '#F0F6FC',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-spin': 'glow-spin 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}