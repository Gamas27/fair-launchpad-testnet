'use client'

import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Delta {
  value: string
  dir: 'up' | 'down'
}

interface G8StatCardProps {
  title: string
  value: string
  delta?: Delta
  icon?: React.ReactNode
  className?: string
}

export const G8StatCard = ({ 
  title, 
  value, 
  delta, 
  icon,
  className 
}: G8StatCardProps) => {
  return (
    <div className={cn(
      "bg-g8-surface2 border border-g8-stroke rounded-g8-lg p-4",
      "transition-all duration-200 hover:border-g8-text-primary/20",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-g8-text-secondary text-g8-caption font-medium">
          {title}
        </p>
        {icon && (
          <div className="text-g8-text-secondary">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-g8-text-primary text-g8-h2 font-semibold">
          {value}
        </p>
        
        {delta && (
          <div className={cn(
            "flex items-center gap-1 text-g8-caption font-medium",
            delta.dir === 'up' 
              ? "text-g8-success" 
              : "text-g8-error"
          )}>
            {delta.dir === 'up' ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {delta.value}
          </div>
        )}
      </div>
    </div>
  )
}
