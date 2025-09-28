'use client'

import React from 'react'
import { Copy, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InfoRow {
  label: string
  value: string
  copy?: boolean
  link?: string
}

interface G8InfoCardProps {
  title: string
  rows: InfoRow[]
  className?: string
}

export const G8InfoCard = ({ 
  title, 
  rows, 
  className 
}: G8InfoCardProps) => {
  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
    // TODO: Add toast notification
  }

  return (
    <div className={cn(
      "bg-g8-surface2 border border-g8-stroke rounded-g8-lg p-4",
      "transition-all duration-200 hover:border-g8-text-primary/20",
      className
    )}>
      <h3 className="text-g8-text-primary text-g8-h2 font-semibold mb-4">
        {title}
      </h3>
      
      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-g8-text-secondary text-g8-body">
              {row.label}
            </span>
            
            <div className="flex items-center gap-2">
              {row.link ? (
                <a
                  href={row.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-g8-text-primary text-g8-mono hover:text-g8-text-secondary transition-colors"
                >
                  {row.value}
                  <ExternalLink className="inline h-3 w-3 ml-1" />
                </a>
              ) : (
                <span className="text-g8-text-primary text-g8-mono">
                  {row.value}
                </span>
              )}
              
              {row.copy && (
                <button
                  onClick={() => handleCopy(row.value)}
                  className="text-g8-text-secondary hover:text-g8-text-primary transition-colors"
                >
                  <Copy className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
