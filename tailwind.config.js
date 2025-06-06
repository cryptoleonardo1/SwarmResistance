/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Phoenix Design System Colors
        'phoenix': {
          'primary': '#FF8C00',  // Dark Orange
          'light': '#FFB84D',    // Warm highlight
          'glow': '#FFAA1A',     // Interactive states
        },
        'resistance': {
          'primary': '#1E3A8A',  // Deep Navy
          'light': '#3B82F6',    // Accent blue
          'glow': '#60A5FA',     // Holographic effects
        },
        'void': {
          'primary': '#0F0F23',  // Almost black with blue tint
          'secondary': '#1A1A2E', // Lighter dark
        },
        
        // Legacy colors for compatibility
        'space-blue': '#1C133A',
        'cosmic-purple': '#4A2B9F',
        'meda-gold': '#FF8C00',
        'neon-cyan': '#60A5FA',
        'stellar-white': '#FFFFFF',
        'nebula-pink': '#FF3E8A',
        'void-black': '#0F0F23',
        'energy-green': '#22C55E',
        
        // Additional Phoenix colors
        'warning-orange': '#FB923C',
        'success-green': '#22C55E',
        'energy-purple': '#8B5CF6',
        'neutral': {
          'light': '#9CA3AF',
          'medium': '#6B7280',
          'dark': '#374151',
        }
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
        'exo': ['"Exo 2"', 'sans-serif'],
        'jetbrains': ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'heading-xl': '3.5rem',    // 56px - Hero sections
        'heading-lg': '2.5rem',    // 40px - Section titles
        'heading-md': '1.875rem',  // 30px - Card titles
        'heading-sm': '1.25rem',   // 20px - Component headers
        'body-lg': '1.125rem',     // 18px - Primary descriptions
        'body-md': '1rem',         // 16px - Standard text
        'body-sm': '0.875rem',     // 14px - Secondary text
        'caption': '0.75rem',      // 12px - Labels, metadata
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'particle-orbit': 'particle-orbit 3s linear infinite',
        'fire-flow': 'fire-flow 4s ease-in-out infinite',
        'hologram-flicker': 'hologram-flicker 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'warp-gate': 'warp-gate 0.8s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            'box-shadow': '0 0 10px rgba(255, 140, 0, 0.3)',
          },
          '50%': {
            'box-shadow': '0 0 20px rgba(255, 140, 0, 0.6)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'particle-orbit': {
          '0%': {
            transform: 'rotate(0deg) translateX(25px) rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg) translateX(25px) rotate(-360deg)',
          },
        },
        'fire-flow': {
          '0%': {
            transform: 'translateY(100%) scale(0.8)',
            opacity: '0',
          },
          '20%': {
            opacity: '1',
          },
          '80%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100%) scale(1.2)',
            opacity: '0',
          },
        },
        'hologram-flicker': {
          '0%, 100%': {
            opacity: '0.3',
            'background-color': 'rgba(59, 130, 246, 0.1)',
          },
          '50%': {
            opacity: '0.6',
            'background-color': 'rgba(59, 130, 246, 0.2)',
          },
        },
        'shimmer': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'warp-gate': {
          '0%': {
            transform: 'scale(0.9) rotateY(-90deg)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1.05) rotateY(0deg)',
          },
          '100%': {
            transform: 'scale(1) rotateY(0deg)',
            opacity: '1',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'phoenix-gradient': 'linear-gradient(45deg, #FF8C00, #FFB84D)',
        'resistance-gradient': 'linear-gradient(45deg, #1E3A8A, #3B82F6)',
        'cyber-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      boxShadow: {
        'phoenix': '0 0 15px rgba(255, 140, 0, 0.3)',
        'phoenix-md': '0 0 20px rgba(255, 140, 0, 0.6)',
        'phoenix-lg': '0 0 30px rgba(255, 140, 0, 0.8)',
        'resistance': '0 0 15px rgba(59, 130, 246, 0.3)',
        'resistance-md': '0 0 20px rgba(59, 130, 246, 0.6)',
        'resistance-lg': '0 0 30px rgba(59, 130, 246, 0.8)',
        'hologram': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      letterSpacing: {
        'wide-sm': '0.025em',
      },
      zIndex: {
        '-5': '-5',
        '60': '60',
      },
      transitionDuration: {
        '400': '400ms',
        '2000': '2000ms',
      },
      scale: {
        '102': '1.02',
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
        // Text shadows
        '.text-shadow-sm': {
          'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.2)'
        },
        '.text-shadow-md': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.4)'
        },
        '.text-shadow-lg': {
          'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.6)'
        },
        '.text-shadow-phoenix': {
          'text-shadow': '0 0 10px rgba(255, 140, 0, 0.7)'
        },
        '.text-shadow-resistance': {
          'text-shadow': '0 0 10px rgba(59, 130, 246, 0.7)'
        },
        
        // Glassmorphism utilities
        '.glass-phoenix': {
          'background': 'rgba(255, 140, 0, 0.1)',
          'backdrop-filter': 'blur(8px)',
          '-webkit-backdrop-filter': 'blur(8px)',
          'border': '1px solid rgba(255, 140, 0, 0.2)',
        },
        '.glass-resistance': {
          'background': 'rgba(59, 130, 246, 0.1)',
          'backdrop-filter': 'blur(8px)',
          '-webkit-backdrop-filter': 'blur(8px)',
          'border': '1px solid rgba(59, 130, 246, 0.2)',
        },
        '.glass-void': {
          'background': 'rgba(15, 15, 35, 0.3)',
          'backdrop-filter': 'blur(8px)',
          '-webkit-backdrop-filter': 'blur(8px)',
          'border': '1px solid rgba(255, 255, 255, 0.05)',
        },
        
        // Button styles
        '.btn-phoenix': {
          'background': 'linear-gradient(45deg, #FF8C00, #FFB84D)',
          'color': '#0F0F23',
          'font-weight': '600',
          'padding': '0.75rem 1.5rem',
          'border-radius': '0.5rem',
          'box-shadow': '0 4px 20px rgba(255, 140, 0, 0.3)',
          'transition': 'all 0.3s ease',
          '&:hover': {
            'box-shadow': '0 8px 25px rgba(255, 140, 0, 0.4)',
            'transform': 'translateY(-2px)',
          },
        },
        '.btn-resistance': {
          'background': 'transparent',
          'color': '#3B82F6',
          'font-weight': '600',
          'padding': '0.75rem 1.5rem',
          'border-radius': '0.5rem',
          'border': '2px solid #3B82F6',
          'box-shadow': '0 4px 20px rgba(59, 130, 246, 0.15)',
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background': 'rgba(59, 130, 246, 0.1)',
            'box-shadow': '0 8px 25px rgba(59, 130, 246, 0.25)',
            'transform': 'translateY(-2px)',
          },
        },
        
        // Section utilities
        '.section-gradient': {
          'background': 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #1E3A8A 100%)',
        },
        
        // Hide scrollbar
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            'display': 'none',
          },
        },
      };
      
      addUtilities(newUtilities);
    }
  ],
}