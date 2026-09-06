/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        obsidian: {
          950: '#04070F',
          900: '#080D1A', // Midnight Obsidian Base
          850: '#0E1626',
          800: '#141F36',
          700: '#1E2D4A',
          600: '#2A3C5E',
        },
        emerald: {
          400: '#34D399',
          500: '#00E699', // Amber Emerald Primary
          600: '#00B377',
        },
        cyanTeal: {
          400: '#38BDF8',
          500: '#00B8D9', // Deep Cyan-Teal Secondary
          600: '#008BA3',
        },
        amethyst: {
          400: '#A78BFA',
          500: '#7C3AED', // Imperial Amethyst Tertiary
          600: '#6D28D9',
        },
        crimson: {
          400: '#F87171',
          500: '#FF4B4B', // Sunset Crimson Hazard
          600: '#DC2626',
        }
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      }
    },
  },
  plugins: [],
}
