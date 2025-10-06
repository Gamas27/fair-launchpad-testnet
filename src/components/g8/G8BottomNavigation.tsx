'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, 
  Plus, 
  Search, 
  User,
  TrendingUp,
  BarChart3,
  Award
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationTab {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  path: string
  badge?: number
}

interface G8BottomNavigationProps {
  className?: string
}

export default function G8BottomNavigation({ className }: G8BottomNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  const tabs: NavigationTab[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/g8/dashboard'
    },
    {
      id: 'create',
      label: 'Create',
      icon: Plus,
      path: '/g8/create'
    },
    {
      id: 'discovery',
      label: 'Discovery',
      icon: Search,
      path: '/g8/discovery'
    },
    {
      id: 'trading',
      label: 'Trading',
      icon: TrendingUp,
      path: '/g8/trading'
    },
    {
      id: 'reputation',
      label: 'Reputation',
      icon: Award,
      path: '/g8/reputation'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/g8/profile'
    }
  ]

  const getActiveTab = () => {
    if (pathname.startsWith('/g8/dashboard') || pathname === '/g8/home') return 'home'
    if (pathname.startsWith('/g8/create')) return 'create'
    if (pathname.startsWith('/g8/discovery')) return 'discovery'
    if (pathname.startsWith('/g8/trading')) return 'trading'
    if (pathname.startsWith('/g8/reputation')) return 'reputation'
    if (pathname.startsWith('/g8/profile')) return 'profile'
    return 'home'
  }

  const handleTabClick = (tab: NavigationTab) => {
    router.push(tab.path)
  }

  const activeTab = getActiveTab()

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50",
      "bg-g8-surface/95 backdrop-blur-md",
      "border-t border-g8-stroke",
      "safe-area-pb",
      className
    )}>
      <div className="flex items-center justify-around px-2 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={cn(
                "flex flex-col items-center justify-center",
                "py-2 px-3 rounded-g8-md",
                "transition-all duration-200",
                "min-w-0 flex-1",
                "relative group",
                isActive
                  ? "bg-gradient-g8 text-g8-bg shadow-g8-glow"
                  : "text-g8-text-secondary hover:text-g8-text-primary hover:bg-g8-surface2"
              )}
            >
              {/* Icon */}
              <div className="relative">
                <Icon className={cn(
                  "h-5 w-5 mb-1 transition-transform duration-200",
                  isActive && "scale-110"
                )} />
                
                {/* Badge */}
                {tab.badge && tab.badge > 0 && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-g8-error text-g8-bg text-xs rounded-full flex items-center justify-center">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </div>
                )}
              </div>
              
              {/* Label */}
              <span className={cn(
                "text-xs font-medium transition-colors duration-200",
                "truncate max-w-full",
                isActive ? "text-g8-bg" : "text-g8-text-secondary"
              )}>
                {tab.label}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-g8-bg rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Hook for navigation state
export function useG8Navigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navigate = (path: string) => {
    router.push(path)
  }

  const getCurrentTab = () => {
    if (pathname.startsWith('/g8/dashboard') || pathname === '/g8/home') return 'home'
    if (pathname.startsWith('/g8/create')) return 'create'
    if (pathname.startsWith('/g8/discovery')) return 'discovery'
    if (pathname.startsWith('/g8/reputation')) return 'reputation'
    if (pathname.startsWith('/g8/profile')) return 'profile'
    return 'home'
  }

  return {
    navigate,
    currentTab: getCurrentTab(),
    pathname
  }
}
