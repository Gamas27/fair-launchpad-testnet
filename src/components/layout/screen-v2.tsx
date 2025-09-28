import React from 'react'
import { cn } from '@/lib/utils'

export interface ScreenV2Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  showBackButton?: boolean
  onBack?: () => void
  actions?: React.ReactNode
  variant?: 'default' | 'fullscreen' | 'modal'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  background?: 'default' | 'gradient' | 'pattern'
}

export const ScreenV2: React.FC<ScreenV2Props> = ({
  className,
  title,
  subtitle,
  header,
  footer,
  showBackButton = false,
  onBack,
  actions,
  variant = 'default',
  padding = 'md',
  background = 'default',
  children,
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  const backgroundStyles = {
    default: 'bg-black',
    gradient: 'bg-gradient-to-br from-black via-gray-900 to-black',
    pattern: 'bg-black bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]',
  }

  const variantStyles = {
    default: 'min-h-screen',
    fullscreen: 'h-screen overflow-hidden',
    modal: 'h-screen max-h-screen overflow-hidden',
  }

  return (
    <div
      className={cn(
        'relative text-white',
        variantStyles[variant],
        backgroundStyles[background],
        className
      )}
      {...props}
    >
      {/* Header */}
      {(title || header || showBackButton || actions) && (
        <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              {showBackButton && (
                <button
                  onClick={onBack}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              <div>
                {title && (
                  <h1 className="text-lg font-bold text-white">{title}</h1>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-400">{subtitle}</p>
                )}
              </div>
            </div>
            
            {actions && (
              <div className="flex items-center space-x-2">{actions}</div>
            )}
          </div>
          
          {header && (
            <div className="px-4 pb-4">{header}</div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={cn(
        'flex-1',
        paddingStyles[padding],
        footer ? 'pb-20' : 'pb-16'
      )}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="sticky bottom-0 z-10 bg-black/90 backdrop-blur-md border-t border-gray-800/50">
          {footer}
        </div>
      )}
    </div>
  )
}

// Specialized screens for G8 app
export const G8Screen: React.FC<Omit<ScreenV2Props, 'background'>> = (props) => {
  return (
    <ScreenV2
      {...props}
      background="pattern"
    />
  )
}

export const ModalScreen: React.FC<Omit<ScreenV2Props, 'variant'>> = (props) => {
  return (
    <ScreenV2
      {...props}
      variant="modal"
    />
  )
}
