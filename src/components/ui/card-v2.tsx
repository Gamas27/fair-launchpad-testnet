import React from 'react'
import { cn } from '@/lib/utils'

export interface CardV2Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient' | 'neon'
  glow?: boolean
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const cardVariants = {
  default: 'bg-gray-900 border border-gray-800',
  elevated: 'bg-gray-900 border border-gray-700 shadow-lg',
  outlined: 'bg-transparent border-2 border-gray-600',
  gradient: 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700',
  neon: 'bg-gray-900 border border-cyan-500/50 shadow-cyan-500/20',
}

const cardPaddings = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
}

export const CardV2 = React.forwardRef<HTMLDivElement, CardV2Props>(
  ({
    className,
    variant = 'default',
    glow = false,
    hover = false,
    padding = 'md',
    children,
    ...props
  }, ref) => {
    const baseStyles = 'rounded-xl transition-all duration-200'
    const variantStyles = cardVariants[variant]
    const paddingStyles = cardPaddings[padding]
    const glowStyles = glow ? 'shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40' : ''
    const hoverStyles = hover ? 'hover:scale-105 hover:shadow-lg' : ''
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles,
          paddingStyles,
          glowStyles,
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardV2.displayName = 'CardV2'

// Card Header Component
export interface CardHeaderV2Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export const CardHeaderV2 = React.forwardRef<HTMLDivElement, CardHeaderV2Props>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between mb-4', className)}
        {...props}
      >
        <div className="flex-1">
          {title && (
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-400">{subtitle}</p>
          )}
          {children}
        </div>
        {action && (
          <div className="ml-4">{action}</div>
        )}
      </div>
    )
  }
)

CardHeaderV2.displayName = 'CardHeaderV2'

// Card Content Component
export interface CardContentV2Props extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContentV2 = React.forwardRef<HTMLDivElement, CardContentV2Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-gray-300', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardContentV2.displayName = 'CardContentV2'

// Card Footer Component
export interface CardFooterV2Props extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooterV2 = React.forwardRef<HTMLDivElement, CardFooterV2Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-4 pt-4 border-t border-gray-800', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooterV2.displayName = 'CardFooterV2'
