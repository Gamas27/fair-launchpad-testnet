import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const dividerVariants = cva(
  'border-gray-600',
  {
    variants: {
      orientation: {
        horizontal: 'w-full border-t',
        vertical: 'h-full border-l',
      },
      variant: {
        default: 'border-gray-600',
        subtle: 'border-gray-700',
        accent: 'border-cyan-500/50',
        neon: 'border-cyan-500/50 shadow-neon-cyan/20',
        gradient: 'border-transparent bg-gradient-to-r from-transparent via-gray-600 to-transparent',
      },
      size: {
        sm: 'border-1',
        md: 'border-2',
        lg: 'border-4',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'default',
      size: 'md',
    },
  }
)

export interface DividerV2Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  label?: string
  showLabel?: boolean
}

const DividerV2 = React.forwardRef<HTMLDivElement, DividerV2Props>(
  ({
    className,
    orientation,
    variant,
    size,
    label,
    showLabel = false,
    ...props
  }, ref) => {
    if (showLabel && label && orientation === 'horizontal') {
      return (
        <div className="relative flex items-center" ref={ref} {...props}>
          <div className={cn(
          'flex-grow',
          dividerVariants({ orientation, variant, size })
        )} />
          <span className="px-3 text-sm text-gray-400 bg-black">{label}</span>
          <div className={cn(
          'flex-grow',
          dividerVariants({ orientation, variant, size })
        )} />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(dividerVariants({ orientation, variant, size }), className)}
        {...props}
      />
    )
  }
)
DividerV2.displayName = 'DividerV2'

export { DividerV2, dividerVariants }
