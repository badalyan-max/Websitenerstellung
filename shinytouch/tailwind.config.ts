import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ShinyTouch Brand Colors - Fresh Blue Theme
        // Design System: Soft UI Evolution - Trust, Cleanliness, Professionalism
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Fresh blue - cleanliness & trust
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // CTA Orange - High visibility for conversions
        cta: {
          DEFAULT: '#f97316',
          light: '#fdba74',
          dark: '#ea580c',
        },
        // Accent Green - Eco-friendly, freshness
        accent: {
          DEFAULT: '#22c55e',
          light: '#86efac',
          dark: '#16a34a',
        },
      },
      fontFamily: {
        sans: ['Lexend', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
