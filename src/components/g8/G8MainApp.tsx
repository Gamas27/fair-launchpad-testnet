'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import G8BottomTabBar from './G8BottomTabBar'

interface G8MainAppProps {
  children: React.ReactNode
}

export const G8MainApp: React.FC<G8MainAppProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home')
  const pathname = usePathname()

  // Update active tab based on current path
  useEffect(() => {
    if (pathname.includes('/g8/home')) {
      setActiveTab('home')
    } else if (pathname.includes('/g8/create')) {
      setActiveTab('create')
    } else if (pathname.includes('/g8/discovery')) {
      setActiveTab('discovery')
    }
  }, [pathname])

  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary">
      {/* Main Content */}
      <div className="pb-20">
        {children}
      </div>
      
      {/* Bottom Tab Bar */}
      <G8BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default G8MainApp

