import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const g8InputVariants = cva(
  "flex h-12 w-full rounded-lg border-2 bg-background-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-background-tertiary focus:border-accent-cyan focus:ring-accent-cyan/20",
        success: "border-accent-green focus:border-accent-green focus:ring-accent-green/20",
        warning: "border-accent-orange focus:border-accent-orange focus:ring-accent-orange/20",
        danger: "border-accent-red focus:border-accent-red focus:ring-accent-red/20",
        neon: "border-accent-cyan focus:border-accent-cyan focus:ring-accent-cyan/20 shadow-neon",
      },
      size: {
        sm: "h-9 px-3 py-2 text-xs",
        default: "h-12 px-4 py-3 text-sm",
        lg: "h-14 px-6 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface G8InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof g8InputVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  error?: string
}

const G8Input = React.forwardRef<HTMLInputElement, G8InputProps>(
  ({ className, variant, size, icon, error, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}
        <input
          className={cn(
            g8InputVariants({ variant: error ? "danger" : variant, size }),
            icon && "pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-accent-red">{error}</p>
        )}
      </div>
    )
  }
)
G8Input.displayName = "G8Input"

export { G8Input, g8InputVariants }
