import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const tagVariants = cva(
  'inline-flex items-center rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black',
  {
    variants: {
      variant: {
        default: 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700',
        success: 'bg-green-500/20 border-green-500 text-green-400 hover:bg-green-500/30',
        warning: 'bg-orange-500/20 border-orange-500 text-orange-400 hover:bg-orange-500/30',
        danger: 'bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30',
        info: 'bg-cyan-500/20 border-cyan-500 text-cyan-400 hover:bg-cyan-500/30',
        neon: 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 shadow-neon-cyan/20',
        gradient: 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/50 text-pink-400 hover:from-pink-500/30 hover:to-purple-500/30',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
      removable: {
        true: 'pr-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      removable: false,
    },
  }
)

export interface TagV2Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  children: React.ReactNode
  onRemove?: () => void
  removable?: boolean
  disabled?: boolean
}

const TagV2 = React.forwardRef<HTMLDivElement, TagV2Props>(
  ({
    className,
    variant,
    size,
    removable = false,
    onRemove,
    disabled = false,
    children,
    ...props
  }, ref) => {
    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!disabled && onRemove) {
        onRemove()
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          tagVariants({ variant, size, removable }),
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'cursor-pointer',
          className
        )}
        {...props}
      >
        <span className="flex-1 truncate">{children}</span>
        {removable && onRemove && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className={cn(
              'ml-1 rounded-full p-0.5 hover:bg-black/20 transition-colors duration-200',
              disabled && 'cursor-not-allowed'
            )}
            aria-label="Remove tag"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    )
  }
)
TagV2.displayName = 'TagV2'

export { TagV2, tagVariants }
