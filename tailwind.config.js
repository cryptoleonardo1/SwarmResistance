/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'space-blue': '#1C133A',
        'cosmic-purple': '#4A2B9F',
        'meda-gold': '#FFB61E',
        'neon-cyan': '#00F0FF',
        'stellar-white': '#FFFFFF',
        
        // Secondary Colors
        'nebula-pink': '#FF3E8A',
        'void-black': '#120D26',
        'energy-green': '#39FF14',
      },
      fontFamily: {
        'exo': ['"Exo 2"', 'sans-serif'],
        'jetbrains': ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'typing': 'typing 3.5s steps(30, end), blink .5s step-end infinite alternate',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': {
            opacity: '0.6',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)'
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        'blink': {
          '50%': { borderColor: 'transparent' }
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      zIndex: {
        '-5': '-5',
      },
      transitionDuration: {
        '400': '400ms',
        '2000': '2000ms',
      },
      scale: {
        '103': '1.03',
        '98': '0.98',
        '105': '1.05',
        '95': '0.95',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.2)'
        },
        '.text-shadow-md': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.4)'
        },
        '.text-shadow-lg': {
          'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.6)'
        },
      };
      
      addUtilities(newUtilities);
    }
  ],
}