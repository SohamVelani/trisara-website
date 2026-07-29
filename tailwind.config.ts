import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'trisara-blue': {
          50: 'hsl(210, 60%, 97%)',
          100: 'hsl(210, 60%, 92%)',
          200: 'hsl(210, 60%, 82%)',
          300: 'hsl(210, 60%, 68%)',
          400: 'hsl(210, 60%, 55%)',
          500: 'hsl(210, 60%, 45%)',
          600: 'hsl(210, 62%, 37%)',
          700: 'hsl(210, 65%, 29%)',
          800: 'hsl(210, 68%, 21%)',
          900: 'hsl(215, 70%, 14%)',
          950: 'hsl(215, 72%, 9%)',
        },
        'trisara-teal': {
          50: 'hsl(175, 50%, 96%)',
          100: 'hsl(175, 50%, 88%)',
          200: 'hsl(175, 50%, 74%)',
          300: 'hsl(175, 50%, 60%)',
          400: 'hsl(175, 50%, 50%)',
          500: 'hsl(175, 50%, 42%)',
          600: 'hsl(175, 52%, 34%)',
          700: 'hsl(175, 55%, 26%)',
          800: 'hsl(175, 58%, 19%)',
          900: 'hsl(175, 60%, 13%)',
        },
        'trisara-dark': 'hsl(215, 28%, 10%)',
        'trisara-navy': 'hsl(215, 25%, 16%)',
        'trisara-slate': 'hsl(215, 18%, 22%)',
        'trisara-light': 'hsl(210, 30%, 97%)',
        'trisara-muted': 'hsl(215, 12%, 58%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand':
          'linear-gradient(135deg, hsl(210,60%,45%) 0%, hsl(175,50%,42%) 100%)',
        'gradient-brand-soft':
          'linear-gradient(135deg, hsl(210,60%,45%,0.08) 0%, hsl(175,50%,42%,0.08) 100%)',
        'gradient-hero':
          'linear-gradient(160deg, hsl(215,28%,10%) 0%, hsl(215,30%,14%) 50%, hsl(210,35%,16%) 100%)',
        'gradient-section':
          'linear-gradient(180deg, hsl(210,30%,97%) 0%, hsl(210,25%,94%) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in-up-slow': 'fadeInUp 1s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
        'slide-in-right': 'slideInRight 0.7s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover':
          '0 12px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        brand: '0 8px 32px rgba(30, 100, 180, 0.25)',
        'brand-teal': '0 8px 32px rgba(30, 150, 140, 0.22)',
      },
    },
  },
  plugins: [],
};

export default config;
