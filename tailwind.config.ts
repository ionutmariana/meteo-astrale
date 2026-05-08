import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      colors: {
        gold: {
          DEFAULT: 'var(--gold)',
          light: 'var(--gold-light)',
        },
        violet: {
          DEFAULT: 'var(--violet)',
          light: 'var(--violet-light)',
        },
        navy: 'var(--navy)',
        cream: 'var(--cream)',
      },
    },
  },
  plugins: [],
}

export default config
