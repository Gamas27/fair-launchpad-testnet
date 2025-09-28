'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { 
  Home,
  Search, 
  MessageCircle,
  User,
  Settings
} from 'lucide-react'

interface BottomNavigationV2Props {
  currentTab?: string
  onTabChange?: (tab: string) => void
  className?: string
}

export const BottomNavigationV2 = ({ 
  currentTab = 'home', 
  onTabChange,
  className 
}: BottomNavigationV2Props) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, route: 'home' as const },
    { id: 'discovery', label: 'Discovery', icon: Search, route: 'g8' as const },
    { id: 'chat', label: 'Chat', icon: MessageCircle, route: 'chat' as const },
    { id: 'profile', label: 'Profile', icon: User, route: 'profile' as const },
    { id: 'settings', label: 'Settings', icon: Settings, route: 'settings' as const }
  ]

  const handleTabClick = (tab: typeof tabs[0]) => {
    onTabChange?.(tab.id)
  }

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-background-primary/90 backdrop-blur-md border-t border-background-tertiary/50 z-50",
      className
    )}>
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = currentTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={cn(
                "flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 relative",
                isActive
                  ? "text-accent-cyan"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-accent-cyan rounded-full" />
              )}
              
              <Icon className={cn(
                "h-5 w-5 mb-1 transition-all duration-200",
                isActive && "scale-110"
              )} />
              <span className={cn(
                "text-xs font-medium transition-all duration-200",
                isActive && "font-semibold"
              )}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Enhanced Navigation with animations
export const EnhancedBottomNavigationV2 = ({ 
  currentTab = 'home', 
  onTabChange,
  className 
}: BottomNavigationV2Props) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, route: 'home' as const },
    { id: 'discovery', label: 'Discovery', icon: Search, route: 'g8' as const },
    { id: 'chat', label: 'Chat', icon: MessageCircle, route: 'chat' as const },
    { id: 'profile', label: 'Profile', icon: User, route: 'profile' as const },
    { id: 'settings', label: 'Settings', icon: Settings, route: 'settings' as const }
  ]

  const handleTabClick = (tab: typeof tabs[0]) => {
    onTabChange?.(tab.id)
  }

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-background-primary/95 backdrop-blur-lg border-t border-accent-cyan/20 z-50",
      "shadow-neon",
      className
    )}>
      <div className="flex relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 via-accent-purple/5 to-accent-pink/5" />
        
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          const isActive = currentTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={cn(
                "flex-1 flex flex-col items-center py-4 px-2 transition-all duration-300 relative group",
                isActive
                  ? "text-accent-cyan"
                  : "text-text-muted hover:text-text-primary"
              )}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Active indicator with glow */}
              {isActive && (
                <>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full shadow-neon" />
                  <div className="absolute inset-0 bg-accent-cyan/10 rounded-lg" />
                </>
              )}
              
              {/* Hover effect */}
              <div className={cn(
                "absolute inset-0 rounded-lg transition-all duration-200",
                "group-hover:bg-accent-cyan/5",
                isActive && "bg-accent-cyan/10"
              )} />
              
              <div className="relative z-10">
                <Icon className={cn(
                  "h-5 w-5 mb-1 transition-all duration-300",
                  isActive && "scale-110 animate-pulse-glow",
                  "group-hover:scale-105"
                )} />
                <span className={cn(
                  "text-xs font-medium transition-all duration-300",
                  isActive && "font-semibold text-accent-cyan"
                )}>
                  {tab.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
