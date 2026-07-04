export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          bg: '#0a0e27',
          dark: '#1a1f3a',
          card: '#252d4a',
          cyan: '#00d9ff',
          purple: '#7c3aed',
          green: '#10b981',
          red: '#ef4444',
          orange: '#f59e0b',
          pink: '#ec4899',
          blue: '#06b6d4',
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0, 217, 255, 0.8)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
