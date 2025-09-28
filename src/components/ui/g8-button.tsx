import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const g8ButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-g8-lg text-g8-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-g8-text-primary/20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gradient-g8 text-g8-bg shadow-g8-glow hover:shadow-g8-m",
        secondary: "bg-g8-surface text-g8-text-primary border border-g8-stroke hover:border-g8-text-primary/20",
        danger: "bg-g8-error text-g8-bg hover:bg-g8-error/90",
        outline: "border border-g8-stroke text-g8-text-primary hover:bg-g8-surface hover:border-g8-text-primary/20",
        ghost: "text-g8-text-primary hover:bg-g8-surface",
        neon: "bg-gradient-g8 text-g8-bg shadow-g8-glow hover:shadow-g8-m animate-pulse-glow",
      },
      size: {
        sm: "h-8 px-3 py-1.5 text-g8-caption",
        default: "h-10 px-4 py-2 text-g8-body",
        lg: "h-12 px-6 py-3 text-g8-body",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface G8ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof g8ButtonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

const G8Button = React.forwardRef<HTMLButtonElement, G8ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, icon, children, ...props }, ref) => {
    return (
      <button
        className={cn(g8ButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
        ) : icon ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        {children}
      </button>
    )
  }
)
G8Button.displayName = "G8Button"

export { G8Button, g8ButtonVariants }
