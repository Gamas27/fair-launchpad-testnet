import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const switchVariants = cva(
  'relative inline-flex items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-gray-600 data-[state=checked]:bg-cyan-500',
        neon: 'bg-gray-600 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-purple-500 data-[state=checked]:shadow-neon-cyan',
        success: 'bg-gray-600 data-[state=checked]:bg-green-500',
        warning: 'bg-gray-600 data-[state=checked]:bg-orange-500',
        danger: 'bg-gray-600 data-[state=checked]:bg-red-500',
      },
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const thumbVariants = cva(
  'pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0 transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
        md: 'h-5 w-5 data-[state=checked]:translate-x-5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface SwitchV2Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof switchVariants> {
  label?: string
  helperText?: string
  errorText?: string
  error?: boolean
  glow?: boolean
}

const SwitchV2 = React.forwardRef<HTMLInputElement, SwitchV2Props>(
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
    const switchId = React.useId()
    const isChecked = checked || false

    return (
      <div className="flex items-start space-x-3">
        <div className="relative">
          <input
            type="checkbox"
            id={switchId}
            ref={ref}
            checked={isChecked}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <label
            htmlFor={switchId}
            className={cn(
              switchVariants({ variant, size }),
              error && 'bg-red-500/20 data-[state=checked]:bg-red-500',
              glow && 'data-[state=checked]:shadow-neon-cyan',
              disabled && 'cursor-not-allowed',
              !disabled && 'cursor-pointer'
            )}
            data-state={isChecked ? 'checked' : 'unchecked'}
          >
            <div
              className={cn(
                thumbVariants({ size }),
                isChecked && 'translate-x-5'
              )}
              data-state={isChecked ? 'checked' : 'unchecked'}
            />
          </label>
        </div>
        
        {(label || helperText || errorText) && (
          <div className="flex-1">
            {label && (
              <label
                htmlFor={switchId}
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
SwitchV2.displayName = 'SwitchV2'

export { SwitchV2, switchVariants }
