import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-gray-700 hover:bg-gray-600 text-white',
        outline: 'border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white',
        ghost: 'bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white',
        gradient: 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:shadow-neon',
        'gradient-pink-purple': 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-neon-pink',
        'gradient-green-cyan': 'bg-gradient-to-r from-green-500 to-cyan-600 text-white hover:shadow-neon-cyan',
        'gradient-red': 'bg-gradient-to-r from-red-500 to-red-700 text-white hover:shadow-red-500/50',
      },
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-14 w-14',
      },
      glow: {
        true: 'shadow-neon hover:shadow-neon-lg',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      glow: false,
    },
  }
)

export interface IconButtonV2Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ElementType
  label?: string
}

const IconButtonV2 = React.forwardRef<HTMLButtonElement, IconButtonV2Props>(
  ({ className, variant, size, glow, icon: Icon, label, ...props }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, glow, className }))}
        ref={ref}
        aria-label={label}
        {...props}
      >
        <Icon className="h-4 w-4" />
      </button>
    )
  }
)
IconButtonV2.displayName = 'IconButtonV2'

export { IconButtonV2, iconButtonVariants }
