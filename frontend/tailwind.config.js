// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0d1117',
        'dark-card': '#161b22',
        'dark-border': '#30363d',
        'text-primary': '#c9d1d9',
        'text-muted': '#8b949e',
        'accent-blue': '#58a6ff',
        'accent-violet': '#8957e5',
        'accent-green': '#3fb950',
        'accent-red': '#f85149',
        'accent-yellow': '#d29922',
      },
    },
  },
  plugins: [],
}