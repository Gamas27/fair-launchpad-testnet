'use client'

import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface G8SearchPillProps {
  placeholder?: string
  value?: string
  onSubmit?: (value: string) => void
  onClear?: () => void
  className?: string
}

export const G8SearchPill = ({ 
  placeholder = "Search...", 
  value = "", 
  onSubmit, 
  onClear,
  className 
}: G8SearchPillProps) => {
  const [searchValue, setSearchValue] = useState(value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(searchValue)
  }

  const handleClear = () => {
    setSearchValue("")
    onClear?.()
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-g8-text-secondary" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-10 py-2.5",
            "bg-g8-surface border border-g8-stroke rounded-g8-md",
            "text-g8-text-primary placeholder:text-g8-text-secondary",
            "focus:outline-none focus:ring-2 focus:ring-g8-text-primary/20",
            "transition-all duration-200"
          )}
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 h-4 w-4 text-g8-text-secondary hover:text-g8-text-primary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  )
}
