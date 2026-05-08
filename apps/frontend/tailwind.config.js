/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // n8n Midnight Theme palette
        midnight: {
          50: '#f6f6f7',
          100: '#e1e1e6',
          200: '#c2c2cf',
          300: '#9b9ba9',
          400: '#71717a',
          500: '#52525b',
          600: '#3f3f46',
          700: '#27272a',
          800: '#18181b',
          900: '#09090b',
        }
      }
    },
  },
  plugins: [],
}
