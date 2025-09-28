import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const radioVariants = cva(
  'inline-flex items-center justify-center rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'border-gray-600 bg-gray-800 hover:bg-gray-700',
        neon: 'border-cyan-500/50 bg-transparent hover:bg-cyan-500/10 shadow-neon-cyan/20',
        success: 'border-green-500 bg-green-500/20 hover:bg-green-500/30',
        warning: 'border-orange-500 bg-orange-500/20 hover:bg-orange-500/30',
        danger: 'border-red-500 bg-red-500/20 hover:bg-red-500/30',
      },
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface RadioV2Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioVariants> {
  label?: string
  helperText?: string
  errorText?: string
  error?: boolean
  glow?: boolean
}

const RadioV2 = React.forwardRef<HTMLInputElement, RadioV2Props>(
  ({
    className,
    variant,
    size,
    label,
    helperText,
    errorText,
    error = false,
    glow = false,
    checked,
    disabled,
    ...props
  }, ref) => {
    const radioId = React.useId()
    const isChecked = checked || false

    return (
      <div className="flex items-start space-x-3">
        <div className="relative">
          <input
            type="radio"
            id={radioId}
            ref={ref}
            checked={isChecked}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <label
            htmlFor={radioId}
            className={cn(
              radioVariants({ variant, size }),
              error && 'border-red-500 bg-red-500/20',
              glow && 'shadow-neon-cyan hover:shadow-neon-cyan-lg',
              isChecked && 'bg-cyan-500 border-cyan-500',
              disabled && 'cursor-not-allowed',
              !disabled && 'cursor-pointer'
            )}
          >
            {isChecked && (
              <div className={cn(
                'rounded-full bg-white',
                size === 'sm' && 'h-2 w-2',
                size === 'md' && 'h-2.5 w-2.5',
                size === 'lg' && 'h-3 w-3'
              )} />
            )}
          </label>
        </div>
        
        {(label || helperText || errorText) && (
          <div className="flex-1">
            {label && (
              <label
                htmlFor={radioId}
                className={cn(
                  'text-sm font-medium cursor-pointer',
                  error ? 'text-red-400' : 'text-gray-300',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {label}
              </label>
            )}
            {error && errorText ? (
              <p className="text-sm text-red-500 mt-1">{errorText}</p>
            ) : (
              helperText && <p className="text-sm text-gray-500 mt-1">{helperText}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)
RadioV2.displayName = 'RadioV2'

export { RadioV2, radioVariants }
