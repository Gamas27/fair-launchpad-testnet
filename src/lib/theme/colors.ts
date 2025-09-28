// G8 Design System - Color Palette
export const colors = {
  // Base Colors
  background: {
    primary: '#000000',
    secondary: '#1a1a1a',
    tertiary: '#2a2a2a',
    card: '#1f1f1f',
  },
  
  // Text Colors
  text: {
    primary: '#ffffff',
    secondary: '#e5e7eb',
    tertiary: '#9ca3af',
    muted: '#6b7280',
  },
  
  // Accent Colors
  accent: {
    pink: '#ff6b9d',
    purple: '#8b5cf6',
    cyan: '#06b6d4',
    green: '#10b981',
    red: '#ef4444',
    orange: '#f59e0b',
  },
  
  // Status Colors
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
  },
  
  // Border Colors
  border: {
    primary: '#374151',
    secondary: '#4b5563',
    accent: '#6b7280',
  },
}

// Gradient Definitions
export const gradients = {
  primary: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
  secondary: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  info: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  
  // Special Gradients
  neon: 'linear-gradient(135deg, #ff6b9d 0%, #8b5cf6 50%, #06b6d4 100%)',
  circuit: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%)',
}

// Shadow Definitions
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  
  // Neon Shadows
  neon: '0 0 20px rgba(6, 182, 212, 0.3)',
  neonPink: '0 0 20px rgba(255, 107, 157, 0.3)',
  neonPurple: '0 0 20px rgba(139, 92, 246, 0.3)',
  neonGreen: '0 0 20px rgba(16, 185, 129, 0.3)',
}
