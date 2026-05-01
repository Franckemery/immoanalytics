// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg':      '#0d1117',
        'dark-card':    '#161b22',
        'dark-border':  '#30363d',
        'text-primary': '#c9d1d9',
        'text-muted':   '#8b949e',
        'accent-blue':  '#58a6ff',
        'accent-violet':'#8957e5',
        'accent-green': '#3fb950',
        'accent-red':   '#f85149',
        'accent-yellow':'#d29922',
      },
      animation: {
        'spin':       'spin 1s linear infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in':   'slideIn 0.3s ease-out',
        'fade-in':    'fadeIn 0.2s ease',
      },
      keyframes: {
        slideIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
