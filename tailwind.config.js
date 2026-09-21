/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#101c3d',
        'ink-2': '#18264e',
        cream: '#f8f5ed',
        paper: '#fffdfa',
        gold: '#e0af43',
        coral: '#e96350',
        sea: '#8cd3c7',
        line: 'rgba(16,28,61,0.16)',
        muted: '#63708a',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'Arial', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}