'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface G8EmptyStateProps {
  title: string
  body: string
  primaryCta?: string
  secondaryLink?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  className?: string
}

export const G8EmptyState = ({ 
  title, 
  body, 
  primaryCta,
  secondaryLink,
  onPrimaryClick,
  onSecondaryClick,
  className 
}: G8EmptyStateProps) => {
  return (
    <div className={cn(
      "bg-g8-surface2 rounded-g8-lg p-8 text-center",
      "border border-g8-stroke",
      className
    )}>
      <h3 className="text-g8-text-primary text-g8-h1 font-semibold mb-2">
        {title}
      </h3>
      
      <p className="text-g8-text-secondary text-g8-body mb-6">
        {body}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {primaryCta && (
          <button
            onClick={onPrimaryClick}
            className="px-6 py-3 bg-gradient-g8 text-g8-bg rounded-g8-md font-medium shadow-g8-glow hover:shadow-g8-m transition-all duration-200"
          >
            {primaryCta}
          </button>
        )}
        
        {secondaryLink && (
          <button
            onClick={onSecondaryClick}
            className="px-6 py-3 text-g8-text-secondary hover:text-g8-text-primary transition-colors"
          >
            {secondaryLink}
          </button>
        )}
      </div>
    </div>
  )
}
