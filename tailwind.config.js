/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgDark: '#09090b',
        bgLight: '#fafafa',
        fontDark: '#e5e7eb',
        fontLight: '#0a0a0a',
        hoverDark: '#292524',
        hoverLight: '#d1d5db',
        postColor: '#334155'
      }
    }
  },
  plugins: []
}
