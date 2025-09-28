// G8 Design System - Main Theme Export
export { colors, gradients, shadows } from './colors'
export { typography, textStyles } from './typography'
export { spacing, borderRadius, zIndex, breakpoints, containers } from './spacing'

// Theme Configuration
export const theme = {
  colors: {
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
  
  gradients: {
    primary: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    secondary: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    neon: 'linear-gradient(135deg, #ff6b9d 0%, #8b5cf6 50%, #06b6d4 100%)',
  },
  
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },
  
  borderRadius: {
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    neon: '0 0 20px rgba(6, 182, 212, 0.3)',
    neonPink: '0 0 20px rgba(255, 107, 157, 0.3)',
    neonPurple: '0 0 20px rgba(139, 92, 246, 0.3)',
  },
}

// CSS Variables for dynamic theming
export const cssVariables = {
  '--color-bg-primary': theme.colors.background.primary,
  '--color-bg-secondary': theme.colors.background.secondary,
  '--color-bg-card': theme.colors.background.card,
  '--color-text-primary': theme.colors.text.primary,
  '--color-text-secondary': theme.colors.text.secondary,
  '--color-accent-pink': theme.colors.accent.pink,
  '--color-accent-purple': theme.colors.accent.purple,
  '--color-accent-cyan': theme.colors.accent.cyan,
  '--color-accent-green': theme.colors.accent.green,
  '--gradient-primary': theme.gradients.primary,
  '--gradient-secondary': theme.gradients.secondary,
  '--gradient-neon': theme.gradients.neon,
  '--shadow-neon': theme.shadows.neon,
  '--shadow-neon-pink': theme.shadows.neonPink,
  '--shadow-neon-purple': theme.shadows.neonPurple,
}
