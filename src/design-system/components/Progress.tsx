import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const progressVariants = cva(
  'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      variant: {
        default: 'bg-gray-200',
        primary: 'bg-gray-200',
        secondary: 'bg-gray-200',
        success: 'bg-gray-200',
        warning: 'bg-gray-200',
        error: 'bg-gray-200',
        glass: 'bg-white/10 backdrop-blur-sm',
        neon: 'bg-gray-200 shadow-[0_0_10px_rgba(0,212,255,0.2)]',
      },
      size: {
        sm: 'h-2',
        md: 'h-4',
        lg: 'h-6',
        xl: 'h-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const progressBarVariants = cva(
  'h-full w-full flex-1 transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-cyan-500 to-purple-600',
        primary: 'bg-gradient-to-r from-cyan-500 to-purple-600',
        secondary: 'bg-gradient-to-r from-teal-500 to-cyan-600',
        success: 'bg-gradient-to-r from-green-500 to-emerald-600',
        warning: 'bg-gradient-to-r from-yellow-500 to-orange-600',
        error: 'bg-gradient-to-r from-red-500 to-pink-600',
        glass: 'bg-gradient-to-r from-cyan-400/50 to-purple-500/50 backdrop-blur-sm',
        neon: 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_20px_rgba(0,212,255,0.5)]',
      },
      animated: {
        true: 'animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: false,
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  showValue?: boolean
  label?: string
  animated?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    variant, 
    size, 
    value = 0, 
    max = 100, 
    showValue = false,
    label,
    animated = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          className={cn(progressVariants({ variant, size, className }))}
          {...props}
        >
          <div
            className={cn(progressBarVariants({ variant, animated }))}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = 'Progress'

// Circular Progress Component
export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'glass' | 'neon'
  showValue?: boolean
  label?: string
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    size = 120,
    strokeWidth = 8,
    variant = 'default',
    showValue = false,
    label,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    const getStrokeColor = () => {
      switch (variant) {
        case 'primary':
          return '#00d4ff'
        case 'secondary':
          return '#4ecdc4'
        case 'success':
          return '#22c55e'
        case 'warning':
          return '#f59e0b'
        case 'error':
          return '#ef4444'
        case 'glass':
          return 'rgba(0, 212, 255, 0.5)'
        case 'neon':
          return '#00d4ff'
        default:
          return '#00d4ff'
      }
    }

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getStrokeColor()}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
            style={{
              filter: variant === 'neon' ? 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))' : undefined
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {showValue && (
              <div className="text-2xl font-bold text-foreground">
                {Math.round(percentage)}%
              </div>
            )}
            {label && (
              <div className="text-sm text-muted-foreground mt-1">
                {label}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)
CircularProgress.displayName = 'CircularProgress'

export { Progress, CircularProgress, progressVariants, progressBarVariants }
