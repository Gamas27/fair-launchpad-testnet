'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface Segment {
  key: string
  label: string
}

interface G8SegmentedControlProps {
  segments: Segment[]
  active: string
  onSegmentChange?: (key: string) => void
  className?: string
}

export const G8SegmentedControl = ({ 
  segments, 
  active, 
  onSegmentChange,
  className 
}: G8SegmentedControlProps) => {
  return (
    <div className={cn(
      "flex bg-g8-surface rounded-g8-md p-1",
      "border border-g8-stroke",
      className
    )}>
      {segments.map((segment) => (
        <button
          key={segment.key}
          onClick={() => onSegmentChange?.(segment.key)}
          className={cn(
            "flex-1 px-3 py-2 text-sm font-medium rounded-g8-sm transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-g8-text-primary/20",
            active === segment.key
              ? "bg-gradient-g8 text-g8-bg shadow-g8-glow"
              : "text-g8-text-secondary hover:text-g8-text-primary"
          )}
        >
          {segment.label}
        </button>
      ))}
    </div>
  )
}
