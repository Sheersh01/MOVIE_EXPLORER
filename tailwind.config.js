/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cinema: {
          950: '#050508',
          900: '#0d0d14',
          800: '#13131f',
          700: '#1a1a2e',
          600: '#22223b',
        },
        gold: {
          400: '#f5c842',
          500: '#e6b800',
          600: '#cc9f00',
        },
        coral: {
          400: '#ff6b6b',
          500: '#ff4757',
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'shimmer': 'shimmer 1.5s infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(245,200,66,0)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(245,200,66,0.25)' },
        }
      }
    },
  },
  plugins: [],
}
