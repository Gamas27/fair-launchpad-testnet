// Custom keyframe animations for Tailwind CSS
export const keyframes = {
  // Fade animations
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
  
  // Scale animations
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
  
  // Slide animations
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
  
  // Bounce animations
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
  
  // Special animations
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
}

// Animation durations
export const animationDurations = {
  '75ms': '75ms',
  '100ms': '100ms',
  '150ms': '150ms',
  '200ms': '200ms',
  '300ms': '300ms',
  '500ms': '500ms',
  '700ms': '700ms',
  '1000ms': '1000ms',
}

// Animation timing functions
export const timingFunctions = {
  'linear': 'linear',
  'ease': 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  'ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  'ease-elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
}
