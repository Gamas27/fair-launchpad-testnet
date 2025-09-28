import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const stepperDotVariants = cva(
  'inline-flex items-center justify-center rounded-full border-2 transition-all duration-200',
  {
    variants: {
      state: {
        todo: 'border-gray-600 bg-gray-800 text-gray-400',
        current: 'border-cyan-500 bg-cyan-500/20 text-cyan-400 shadow-neon-cyan/20',
        done: 'border-green-500 bg-green-500 text-white',
      },
      size: {
        sm: 'h-6 w-6 text-xs',
        md: 'h-8 w-8 text-sm',
        lg: 'h-10 w-10 text-base',
      },
    },
    defaultVariants: {
      state: 'todo',
      size: 'md',
    },
  }
)

export interface StepperDotV2Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperDotVariants> {
  stepNumber?: number
  label?: string
  showLabel?: boolean
}

const StepperDotV2 = React.forwardRef<HTMLDivElement, StepperDotV2Props>(
  ({
    className,
    state,
    size,
    stepNumber,
    label,
    showLabel = false,
    ...props
  }, ref) => {
    return (
      <div className="flex flex-col items-center space-y-2">
        <div
          ref={ref}
          className={cn(stepperDotVariants({ state, size }), className)}
          {...props}
        >
          {state === 'done' ? (
            <Check className={cn(
              size === 'sm' && 'h-3 w-3',
              size === 'md' && 'h-4 w-4',
              size === 'lg' && 'h-5 w-5'
            )} />
          ) : (
            stepNumber
          )}
        </div>
        {showLabel && label && (
          <span className={cn(
            'text-xs font-medium',
            state === 'current' ? 'text-cyan-400' : 'text-gray-400'
          )}>
            {label}
          </span>
        )}
      </div>
    )
  }
)
StepperDotV2.displayName = 'StepperDotV2'

export { StepperDotV2, stepperDotVariants }
