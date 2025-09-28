'use client'

import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface G8TokenRowProps {
  avatar?: string
  name: string
  symbol: string
  price: string
  spark?: 'up' | 'down'
  onClick?: () => void
  className?: string
}

export const G8TokenRow = ({ 
  avatar, 
  name, 
  symbol, 
  price, 
  spark,
  onClick,
  className 
}: G8TokenRowProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-g8-md",
        "bg-transparent hover:bg-g8-surface/50",
        "transition-all duration-200 cursor-pointer",
        "border border-transparent hover:border-g8-stroke",
        className
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {avatar ? (
          <img 
            src={avatar} 
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-g8-surface border border-g8-stroke flex items-center justify-center">
            <span className="text-g8-text-primary text-sm font-semibold">
              {symbol.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Token Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-g8-text-primary text-g8-body font-semibold truncate">
            {name}
          </h3>
          <span className="text-g8-text-secondary text-g8-caption font-medium">
            {symbol}
          </span>
        </div>
      </div>

      {/* Price & Spark */}
      <div className="flex items-center gap-2">
        <span className="text-g8-text-primary text-g8-body font-semibold">
          {price}
        </span>
        
        {spark && (
          <div className={cn(
            "flex items-center",
            spark === 'up' ? "text-g8-success" : "text-g8-error"
          )}>
            {spark === 'up' ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
