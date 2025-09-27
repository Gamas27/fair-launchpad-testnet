import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary variants
        primary: 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl',
        'primary-outline': 'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white',
        'primary-ghost': 'text-cyan-500 hover:bg-cyan-500/10',
        
        // Secondary variants
        secondary: 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl',
        'secondary-outline': 'border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white',
        'secondary-ghost': 'text-teal-500 hover:bg-teal-500/10',
        
        // Neutral variants
        neutral: 'bg-gray-800 hover:bg-gray-700 text-white',
        'neutral-outline': 'border border-gray-600 text-gray-300 hover:bg-gray-700',
        'neutral-ghost': 'text-gray-300 hover:bg-gray-800',
        
        // Success variants
        success: 'bg-green-600 hover:bg-green-700 text-white',
        'success-outline': 'border border-green-600 text-green-400 hover:bg-green-600',
        'success-ghost': 'text-green-400 hover:bg-green-600/20',
        
        // Warning variants
        warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
        'warning-outline': 'border border-yellow-600 text-yellow-400 hover:bg-yellow-600',
        'warning-ghost': 'text-yellow-400 hover:bg-yellow-600/20',
        
        // Error variants
        error: 'bg-red-600 hover:bg-red-700 text-white',
        'error-outline': 'border border-red-600 text-red-400 hover:bg-red-600',
        'error-ghost': 'text-red-400 hover:bg-red-600/20',
        
        // Glass variants
        glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
        'glass-primary': 'bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/30',
        
        // Neon variants
        neon: 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold shadow-[0_0_20px_rgba(0,212,255,0.5)] hover:shadow-[0_0_30px_rgba(0,212,255,0.7)]',
        'neon-secondary': 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold shadow-[0_0_20px_rgba(78,205,196,0.5)] hover:shadow-[0_0_30px_rgba(78,205,196,0.7)]',
        
        // Link variants
        link: 'text-cyan-400 underline-offset-4 hover:underline',
        'link-primary': 'text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
        xl: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    rounded,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
