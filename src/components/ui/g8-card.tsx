import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const g8CardVariants = cva(
  "rounded-g8-lg border transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-g8-surface border-g8-stroke hover:border-g8-text-primary/20",
        gradient: "bg-g8-surface border-g8-stroke hover:border-g8-text-primary/20 shadow-g8-s",
        neon: "bg-g8-surface border-g8-stroke shadow-g8-glow hover:shadow-g8-m",
        success: "bg-g8-surface2 border-g8-success/50 hover:border-g8-success",
        warning: "bg-g8-surface2 border-g8-warning/50 hover:border-g8-warning",
        danger: "bg-g8-surface2 border-g8-error/50 hover:border-g8-error",
        glass: "bg-g8-surface/80 backdrop-blur-md border-g8-stroke/50 hover:border-g8-text-primary/20",
      },
      size: {
        sm: "p-g8-md",
        default: "p-g8-lg",
        lg: "p-g8-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface G8CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof g8CardVariants> {
  asChild?: boolean
}

const G8Card = React.forwardRef<HTMLDivElement, G8CardProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <div
        className={cn(g8CardVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
G8Card.displayName = "G8Card"

const G8CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
))
G8CardHeader.displayName = "G8CardHeader"

const G8CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-g8-h2 font-semibold text-g8-text-primary", className)}
    {...props}
  />
))
G8CardTitle.displayName = "G8CardTitle"

const G8CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-g8-body text-g8-text-secondary", className)}
    {...props}
  />
))
G8CardDescription.displayName = "G8CardDescription"

const G8CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
G8CardContent.displayName = "G8CardContent"

const G8CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
))
G8CardFooter.displayName = "G8CardFooter"

export { 
  G8Card, 
  G8CardHeader, 
  G8CardFooter, 
  G8CardTitle, 
  G8CardDescription, 
  G8CardContent 
}
