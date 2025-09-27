'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ROUTES, getRouteByPath, isRouteAccessible, type Route } from '@/lib/routes'
import { usePrivyWallet } from '@/hooks/usePrivyWallet'
import { useSafeWorldId } from '@/providers/SafeWorldIdProvider'

interface NavigationContextType {
  currentRoute: Route | null
  activeTab: string
  setActiveTab: (tab: string) => void
  navigateTo: (route: Route) => void
  isRouteAccessible: (route: Route) => boolean
  getAccessibleRoutes: () => Route[]
  isMobile: boolean
  setIsMobile: (mobile: boolean) => void
  updateConnectionStatus: (connected: boolean, verified: boolean) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState('home')
  const [isMobile, setIsMobile] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  // Development mode: Enable authentication for testing
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Auto-enable authentication in development mode for testing
      setIsConnected(true)
      setIsVerified(true)
    }
  }, [])

  // Override authentication state in development mode
  const isConnectedOverride = process.env.NODE_ENV === 'development' ? true : isConnected
  const isVerifiedOverride = process.env.NODE_ENV === 'development' ? true : isVerified

  // Get current route based on pathname
  const currentRoute = getRouteByPath(pathname)

  // Update connection status from providers (this will be called by a child component)
  const updateConnectionStatus = (connected: boolean, verified: boolean) => {
    setIsConnected(connected)
    setIsVerified(verified)
  }

  // Update active tab when route changes
  useEffect(() => {
    if (currentRoute) {
      setActiveTab(currentRoute.id)
    }
  }, [currentRoute])

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navigateTo = (route: Route) => {
    if (route.isExternal) {
      window.open(route.path, '_blank')
      return
    }
    
    // Check if route is accessible
    if (!isRouteAccessible(route, isConnectedOverride, isVerifiedOverride)) {
      // Show warning or redirect to auth
      if (route.requiresAuth && !isConnectedOverride) {
        alert('Please connect your wallet to access this page.')
        return
      }
      if (route.requiresWorldId && !isVerifiedOverride) {
        alert('Please verify with World ID to access this page.')
        return
      }
    }
    
    router.push(route.path)
  }

  const isRouteAccessibleCheck = (route: Route) => {
    return isRouteAccessible(route, isConnectedOverride, isVerifiedOverride)
  }

  const getAccessibleRoutes = () => {
    return Object.values(ROUTES).filter(route => isRouteAccessibleCheck(route))
  }

  const value: NavigationContextType = {
    currentRoute,
    activeTab,
    setActiveTab,
    navigateTo,
    isRouteAccessible: isRouteAccessibleCheck,
    getAccessibleRoutes,
    isMobile,
    setIsMobile,
    updateConnectionStatus
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}

// Component to update navigation state based on provider states
export function NavigationStateUpdater() {
  const { updateConnectionStatus } = useNavigation()
  
  // Safely get provider states
  let isConnected = false
  let isVerified = false
  
  try {
    const walletHook = usePrivyWallet()
    isConnected = walletHook.isConnected
  } catch (error) {
    // Provider not available yet
  }
  
  try {
    const worldIdHook = useSafeWorldId()
    isVerified = worldIdHook.isVerified
  } catch (error) {
    // Provider not available yet
  }
  
  // Update navigation state when provider states change
  useEffect(() => {
    updateConnectionStatus(isConnected, isVerified)
  }, [isConnected, isVerified, updateConnectionStatus])
  
  return null // This component doesn't render anything
}
