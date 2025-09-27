/**
 * Fair Launchpad Design System
 * Centralized design system exports
 */

// Design Tokens
export * from './tokens'

// Utilities
export { cn } from '../lib/utils'

// Design System Configuration
export const designSystem = {
  name: 'Fair Launchpad Design System',
  version: '1.0.0',
  description: 'A comprehensive design system for the Fair Launchpad application',
  
  // Features
  features: {
    glassmorphism: true,
    neonEffects: true,
    gradientText: true,
    responsiveDesign: true,
    darkTheme: true,
    accessibility: true,
  },
  
  // Breakpoints
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Animation durations
  animations: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
} as const

export type DesignSystem = typeof designSystem
