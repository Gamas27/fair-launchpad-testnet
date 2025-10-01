'use client'

import React from 'react'
import G8BottomNavigation from './G8BottomNavigation'

interface G8AppLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function G8AppLayout({ children, className }: G8AppLayoutProps) {
  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary">
      {/* Main Content */}
      <div className={className}>
        {children}
      </div>
      
      {/* Bottom Navigation */}
      <G8BottomNavigation />
      
      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20" />
    </div>
  )
}
