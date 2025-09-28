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
        // G8 Design System Colors
        background: {
          primary: '#000000',
          secondary: '#1a1a1a',
          tertiary: '#2a2a2a',
          card: '#1f1f1f',
        },
        text: {
          primary: '#ffffff',
          secondary: '#e5e7eb',
          tertiary: '#9ca3af',
          muted: '#6b7280',
        },
        accent: {
          pink: '#ff6b9d',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          green: '#10b981',
          red: '#ef4444',
          orange: '#f59e0b',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
        'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        'gradient-neon': 'linear-gradient(135deg, #ff6b9d 0%, #8b5cf6 50%, #06b6d4 100%)',
        'gradient-circuit': 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(6, 182, 212, 0.3)',
        'neon-pink': '0 0 20px rgba(255, 107, 157, 0.3)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'neon-green': '0 0 20px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        // Fade animations
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-in',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-in-left': 'fade-in-left 0.3s ease-out',
        'fade-in-right': 'fade-in-right 0.3s ease-out',
        
        // Scale animations
        'scale-in': 'scale-in 0.3s ease-out',
        'scale-out': 'scale-out 0.3s ease-in',
        'scale-in-up': 'scale-in-up 0.3s ease-out',
        'scale-in-down': 'scale-in-down 0.3s ease-out',
        
        // Slide animations
        'slide-in-up': 'slide-in-up 0.3s ease-out',
        'slide-in-down': 'slide-in-down 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        
        // Bounce animations
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-in-up': 'bounce-in-up 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-in-down': 'bounce-in-down 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        
        // Special animations
        'wiggle': 'wiggle 0.5s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        // Fade keyframes
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        
        // Scale keyframes
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scale-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9)' },
        },
        'scale-in-up': {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'scale-in-down': {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(-20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        
        // Slide keyframes
        'slide-in-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        
        // Bounce keyframes
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bounce-in-up': {
          '0%': { opacity: '0', transform: 'translateY(100px) scale(0.3)' },
          '50%': { opacity: '1', transform: 'translateY(-10px) scale(1.05)' },
          '70%': { transform: 'translateY(5px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'bounce-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-100px) scale(0.3)' },
          '50%': { opacity: '1', transform: 'translateY(10px) scale(1.05)' },
          '70%': { transform: 'translateY(-5px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        
        // Special keyframes
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(6, 182, 212, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
            transform: 'scale(1.05)'
          },
        },
      },
    },
  },
  plugins: [],
}
