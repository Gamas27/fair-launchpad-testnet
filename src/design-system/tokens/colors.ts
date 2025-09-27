/**
 * Design System Color Tokens
 * Fair Launchpad - Color Palette
 */

export const colors = {
  // Primary Colors
  primary: {
    50: '#f0fdff',
    100: '#ccf7fe',
    200: '#99effd',
    300: '#66e7fc',
    400: '#33dffb',
    500: '#00d4ff', // Main primary color
    600: '#00aacc',
    700: '#008099',
    800: '#005666',
    900: '#002c33',
  },

  // Secondary Colors
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#66f1d7',
    400: '#4ecdc4', // Main secondary color
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },

  // Neutral Colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Semantic Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Background Gradients
  background: {
    primary: 'linear-gradient(135deg, #1f2937 0%, #1e3a8a 50%, #1f2937 100%)',
    secondary: 'linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #0f172a 100%)',
    card: 'rgba(255, 255, 255, 0.05)',
    glass: 'rgba(255, 255, 255, 0.1)',
  },

  // Text Colors
  text: {
    primary: '#ffffff',
    secondary: '#e5e7eb',
    muted: '#9ca3af',
    inverse: '#000000',
  },

  // Border Colors
  border: {
    primary: 'rgba(0, 212, 255, 0.3)',
    secondary: 'rgba(78, 205, 196, 0.3)',
    muted: 'rgba(255, 255, 255, 0.1)',
    focus: '#00d4ff',
  },
} as const

export type ColorToken = keyof typeof colors
export type ColorScale = keyof typeof colors.primary
