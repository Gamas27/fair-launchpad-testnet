import React from 'react'
import { cn } from '@/lib/utils'
import { theme } from '@/lib/theme'

export interface ButtonV2Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  gradient?: 'primary' | 'secondary' | 'success' | 'danger' | 'neon'
  glow?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const buttonVariants = {
  primary: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white',
  secondary: 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white',
  success: 'bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white',
  danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white',
  warning: 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white',
  ghost: 'bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white',
  outline: 'border border-gray-600 bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white',
}

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
}

const gradientStyles = {
  primary: 'bg-gradient-to-r from-pink-500 to-purple-600',
  secondary: 'bg-gradient-to-r from-purple-500 to-cyan-500',
  success: 'bg-gradient-to-r from-green-500 to-cyan-500',
  danger: 'bg-gradient-to-r from-red-500 to-red-600',
  neon: 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500',
}

export const ButtonV2 = React.forwardRef<HTMLButtonElement, ButtonV2Props>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    gradient,
    glow = false,
    loading = false,
    icon,
    iconPosition = 'left',
    children,
    disabled,
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantStyles = gradient ? gradientStyles[gradient] : buttonVariants[variant]
    const sizeStyles = buttonSizes[size]
    const glowStyles = glow ? 'shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40' : ''
    
    return (
      <button
        className={cn(
          baseStyles,
          variantStyles,
          sizeStyles,
          glowStyles,
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    )
  }
)

ButtonV2.displayName = 'ButtonV2'
