import React, { useState, useRef, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const tooltipVariants = cva(
  'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 border border-gray-600 rounded-lg shadow-lg transition-all duration-200',
  {
    variants: {
      placement: {
        top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
      },
      variant: {
        default: 'bg-gray-900 border-gray-600',
        neon: 'bg-gray-900 border-cyan-500/50 shadow-neon-cyan/20',
        success: 'bg-green-900 border-green-500 text-green-100',
        warning: 'bg-orange-900 border-orange-500 text-orange-100',
        danger: 'bg-red-900 border-red-500 text-red-100',
      },
      size: {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-2',
        lg: 'text-base px-4 py-3',
      },
    },
    defaultVariants: {
      placement: 'top',
      variant: 'default',
      size: 'md',
    },
  }
)

const arrowVariants = cva(
  'absolute w-2 h-2 bg-gray-900 border border-gray-600 transform rotate-45',
  {
    variants: {
      placement: {
        top: 'top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0',
        bottom: 'bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2 border-b-0 border-r-0',
        left: 'left-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 border-l-0 border-b-0',
        right: 'right-full top-1/2 transform -translate-y-1/2 translate-x-1/2 border-r-0 border-t-0',
      },
    },
    defaultVariants: {
      placement: 'top',
    },
  }
)

export interface TooltipV2Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  title: string
  body?: string
  children: React.ReactNode
  delay?: number
  disabled?: boolean
}

const TooltipV2 = React.forwardRef<HTMLDivElement, TooltipV2Props>(
  ({
    className,
    placement,
    variant,
    size,
    title,
    body,
    children,
    delay = 500,
    disabled = false,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const triggerRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout>()

    const showTooltip = () => {
      if (disabled) return
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect()
          setPosition({ x: rect.left, y: rect.top })
          setIsVisible(true)
        }
      }, delay)
    }

    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsVisible(false)
    }

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [])

    return (
      <div
        ref={triggerRef}
        className="relative inline-block"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
        
        {isVisible && (
          <div
            ref={tooltipRef}
            className={cn(
              tooltipVariants({ placement, variant, size }),
              className
            )}
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y,
              zIndex: 9999,
            }}
            {...props}
          >
            <div className="font-medium">{title}</div>
            {body && (
              <div className="text-gray-300 mt-1">{body}</div>
            )}
            <div className={cn(arrowVariants({ placement }))} />
          </div>
        )}
      </div>
    )
  }
)
TooltipV2.displayName = 'TooltipV2'

export { TooltipV2, tooltipVariants }
