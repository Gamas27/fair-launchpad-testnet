import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const g8BadgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent-cyan text-white shadow-neon",
        secondary: "border-transparent bg-accent-purple text-white shadow-neon-purple",
        success: "border-transparent bg-accent-green text-white shadow-neon-green",
        warning: "border-transparent bg-accent-orange text-white",
        danger: "border-transparent bg-accent-red text-white",
        outline: "border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10",
        live: "border-transparent bg-accent-green text-white animate-pulse shadow-neon-green",
        owner: "border-transparent bg-accent-purple text-white shadow-neon-purple",
        verified: "border-transparent bg-accent-cyan text-white shadow-neon",
        gradient: "border-transparent bg-gradient-neon text-white shadow-neon",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface G8BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof g8BadgeVariants> {
  asChild?: boolean
}

function G8Badge({ className, variant, size, ...props }: G8BadgeProps) {
  return (
    <div className={cn(g8BadgeVariants({ variant, size }), className)} {...props} />
  )
}

export { G8Badge, g8BadgeVariants }
