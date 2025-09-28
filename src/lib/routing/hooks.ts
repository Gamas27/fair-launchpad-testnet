'use client'

import { useCallback, useMemo } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useG8, useG8Navigation, useG8User } from '../state/context'
import { G8Route, G8RouteParams } from './types'
import { G8_ROUTE_CONFIG, G8_ROUTE_PATHS } from './config'

/**
 * Hook for accessing route parameters and navigation state
 */
export function useRouteParams<T extends G8RouteParams = G8RouteParams>() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const params = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const routeParams: T = {} as T
    
    // Extract dynamic route parameters
    if (pathSegments.includes('token') && pathSegments.length > 2) {
      const tokenIndex = pathSegments.indexOf('token')
      if (tokenIndex !== -1 && pathSegments[tokenIndex + 1]) {
        routeParams.tokenId = pathSegments[tokenIndex + 1]
      }
    }
    
    if (pathSegments.includes('chat') && pathSegments.length > 2) {
      const chatIndex = pathSegments.indexOf('chat')
      if (chatIndex !== -1 && pathSegments[chatIndex + 1]) {
        routeParams.chatRoomId = pathSegments[chatIndex + 1]
      }
    }
    
    // Extract query parameters
    const queryParams: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      queryParams[key] = value
    })
    
    return { ...routeParams, ...queryParams } as T
  }, [pathname, searchParams])
  
  return params
}

/**
 * Hook for route guard functionality and permission checks
 */
export function useRouteGuard(route: G8Route) {
  const { user, isAuthenticated, isWorldIdVerified, isWalletConnected } = useG8User()
  const { navigate } = useG8Navigation()
  
  const routeConfig = G8_ROUTE_CONFIG[route]
  
  const canAccess = useMemo(() => {
    if (!routeConfig) return false
    
    // Check authentication requirement
    if (routeConfig.requiresAuth && !isAuthenticated) {
      return false
    }
    
    // Check World ID requirement
    if (routeConfig.requiresWorldId && !isWorldIdVerified) {
      return false
    }
    
    // Check wallet requirement
    if (routeConfig.requiresWallet && !isWalletConnected) {
      return false
    }
    
    return true
  }, [routeConfig, isAuthenticated, isWorldIdVerified, isWalletConnected])
  
  const redirectToAuth = useCallback(() => {
    if (!isAuthenticated) {
      navigate('onboarding')
    } else if (!isWorldIdVerified) {
      navigate('onboarding')
    } else if (!isWalletConnected && routeConfig?.requiresWallet) {
      navigate('onboarding')
    }
  }, [isAuthenticated, isWorldIdVerified, isWalletConnected, routeConfig, navigate])
  
  const checkAccess = useCallback(() => {
    if (!canAccess) {
      redirectToAuth()
      return false
    }
    return true
  }, [canAccess, redirectToAuth])
  
  return {
    canAccess,
    checkAccess,
    redirectToAuth,
    requirements: {
      auth: routeConfig?.requiresAuth || false,
      worldId: routeConfig?.requiresWorldId || false,
      wallet: routeConfig?.requiresWallet || false
    },
    userState: {
      isAuthenticated,
      isWorldIdVerified,
      isWalletConnected
    }
  }
}

/**
 * Enhanced navigation hook with route validation
 */
export function useNavigation() {
  const router = useRouter()
  const { navigate: stateNavigate, goBack, reset } = useG8Navigation()
  const { currentRoute, navigationHistory } = useG8Navigation()
  
  const navigateToRoute = useCallback((route: G8Route, params?: G8RouteParams) => {
    const routeConfig = G8_ROUTE_CONFIG[route]
    if (!routeConfig) {
      console.error(`Route ${route} not found in configuration`)
      return false
    }
    
    // Build the path with parameters
    let path = routeConfig.path
    if (params) {
      // Replace dynamic segments
      if (params.tokenId && path.includes(':tokenId')) {
        path = path.replace(':tokenId', params.tokenId)
      }
      if (params.chatRoomId && path.includes(':chatRoomId')) {
        path = path.replace(':chatRoomId', params.chatRoomId)
      }
      
      // Add query parameters
      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (key !== 'tokenId' && key !== 'chatRoomId' && value) {
          queryParams.set(key, String(value))
        }
      })
      
      const queryString = queryParams.toString()
      if (queryString) {
        path += `?${queryString}`
      }
    }
    
    // Update state navigation
    stateNavigate(route, params)
    
    // Update browser URL
    router.push(path)
    
    return true
  }, [router, stateNavigate])
  
  const navigateToPath = useCallback((path: string) => {
    // Find route by path
    const routeEntry = Object.entries(G8_ROUTE_PATHS).find(([, routePath]) => {
      // Handle dynamic routes
      if (routePath.includes(':')) {
        const routePattern = routePath.replace(/:[^/]+/g, '[^/]+')
        const regex = new RegExp(`^${routePattern}$`)
        return regex.test(path)
      }
      return routePath === path
    })
    
    if (routeEntry) {
      const [route] = routeEntry
      return navigateToRoute(route as G8Route)
    }
    
    // Fallback to direct navigation
    router.push(path)
    return true
  }, [router, navigateToRoute])
  
  const replaceRoute = useCallback((route: G8Route, params?: G8RouteParams) => {
    const routeConfig = G8_ROUTE_CONFIG[route]
    if (!routeConfig) return false
    
    let path = routeConfig.path
    if (params) {
      if (params.tokenId && path.includes(':tokenId')) {
        path = path.replace(':tokenId', params.tokenId)
      }
      if (params.chatRoomId && path.includes(':chatRoomId')) {
        path = path.replace(':chatRoomId', params.chatRoomId)
      }
    }
    
    stateNavigate(route, params)
    router.replace(path)
    return true
  }, [router, stateNavigate])
  
  const goBackSafe = useCallback(() => {
    if (navigationHistory.length > 1) {
      goBack()
      router.back()
    } else {
      navigateToRoute('home')
    }
  }, [navigationHistory.length, goBack, router, navigateToRoute])
  
  const resetToHome = useCallback(() => {
    reset()
    router.push('/g8')
  }, [reset, router])
  
  return {
    navigate: navigateToRoute,
    navigateToPath,
    replace: replaceRoute,
    goBack: goBackSafe,
    reset: resetToHome,
    currentRoute,
    canGoBack: navigationHistory.length > 1,
    history: navigationHistory
  }
}

/**
 * Hook for route metadata and configuration
 */
export function useRouteMetadata(route?: G8Route) {
  const { currentRoute } = useG8Navigation()
  const targetRoute = route || currentRoute
  
  const config = G8_ROUTE_CONFIG[targetRoute as G8Route]
  
  return {
    title: config?.metadata?.title || 'G8 App',
    description: config?.metadata?.description || '',
    icon: config?.metadata?.icon,
    path: config?.path,
    requiresAuth: config?.requiresAuth || false,
    requiresWorldId: config?.requiresWorldId || false,
    requiresWallet: config?.requiresWallet || false,
    allowedTabs: config?.allowedTabs || []
  }
}

/**
 * Hook for tab navigation within the app
 */
export function useTabNavigation() {
  const { navigate } = useNavigation()
  const { currentRoute } = useG8Navigation()
  
  const switchTab = useCallback((tab: G8Route) => {
    const currentConfig = G8_ROUTE_CONFIG[currentRoute as G8Route]
    const targetConfig = G8_ROUTE_CONFIG[tab]
    
    // Check if tab is allowed from current route
    if (currentConfig?.allowedTabs?.includes(tab) || targetConfig?.allowedTabs?.includes(currentRoute as G8Route)) {
      navigate(tab)
      return true
    }
    
    return false
  }, [navigate, currentRoute])
  
  const getAvailableTabs = useCallback(() => {
    const currentConfig = G8_ROUTE_CONFIG[currentRoute as G8Route]
    return currentConfig?.allowedTabs || []
  }, [currentRoute])
  
  return {
    switchTab,
    getAvailableTabs,
    currentTab: currentRoute
  }
}
