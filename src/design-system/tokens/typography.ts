/**
 * Design System Typography Tokens
 * Fair Launchpad - Typography Scale
 */

export const typography = {
  // Font Families
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    display: ['Inter', 'system-ui', 'sans-serif'],
  },

  // Font Sizes
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem',    // 128px
  },

  // Font Weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Text Styles
  textStyles: {
    // Display Styles
    'display-2xl': {
      fontSize: '4.5rem',
      lineHeight: '1',
      fontWeight: '800',
      letterSpacing: '-0.025em',
    },
    'display-xl': {
      fontSize: '3.75rem',
      lineHeight: '1',
      fontWeight: '800',
      letterSpacing: '-0.025em',
    },
    'display-lg': {
      fontSize: '3rem',
      lineHeight: '1.1',
      fontWeight: '800',
      letterSpacing: '-0.025em',
    },
    'display-md': {
      fontSize: '2.25rem',
      lineHeight: '1.2',
      fontWeight: '800',
      letterSpacing: '-0.025em',
    },
    'display-sm': {
      fontSize: '1.875rem',
      lineHeight: '1.25',
      fontWeight: '800',
      letterSpacing: '-0.025em',
    },
    'display-xs': {
      fontSize: '1.5rem',
      lineHeight: '1.3',
      fontWeight: '800',
      letterSpacing: '-0.025em',
    },

    // Heading Styles
    'heading-2xl': {
      fontSize: '1.875rem',
      lineHeight: '1.2',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    'heading-xl': {
      fontSize: '1.5rem',
      lineHeight: '1.3',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    'heading-lg': {
      fontSize: '1.25rem',
      lineHeight: '1.4',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    'heading-md': {
      fontSize: '1.125rem',
      lineHeight: '1.4',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    'heading-sm': {
      fontSize: '1rem',
      lineHeight: '1.5',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    'heading-xs': {
      fontSize: '0.875rem',
      lineHeight: '1.5',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },

    // Body Styles
    'body-xl': {
      fontSize: '1.25rem',
      lineHeight: '1.6',
      fontWeight: '400',
    },
    'body-lg': {
      fontSize: '1.125rem',
      lineHeight: '1.6',
      fontWeight: '400',
    },
    'body-md': {
      fontSize: '1rem',
      lineHeight: '1.6',
      fontWeight: '400',
    },
    'body-sm': {
      fontSize: '0.875rem',
      lineHeight: '1.6',
      fontWeight: '400',
    },
    'body-xs': {
      fontSize: '0.75rem',
      lineHeight: '1.6',
      fontWeight: '400',
    },

    // Label Styles
    'label-xl': {
      fontSize: '1.125rem',
      lineHeight: '1.4',
      fontWeight: '600',
    },
    'label-lg': {
      fontSize: '1rem',
      lineHeight: '1.4',
      fontWeight: '600',
    },
    'label-md': {
      fontSize: '0.875rem',
      lineHeight: '1.4',
      fontWeight: '600',
    },
    'label-sm': {
      fontSize: '0.75rem',
      lineHeight: '1.4',
      fontWeight: '600',
    },
    'label-xs': {
      fontSize: '0.625rem',
      lineHeight: '1.4',
      fontWeight: '600',
    },

    // Caption Styles
    'caption-lg': {
      fontSize: '0.875rem',
      lineHeight: '1.4',
      fontWeight: '400',
    },
    'caption-md': {
      fontSize: '0.75rem',
      lineHeight: '1.4',
      fontWeight: '400',
    },
    'caption-sm': {
      fontSize: '0.625rem',
      lineHeight: '1.4',
      fontWeight: '400',
    },
  },
} as const

export type TypographyToken = keyof typeof typography
export type TextStyle = keyof typeof typography.textStyles
