'use client'

import { useEffect, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { G8Route, G8RouteParams } from './types'
import { G8_ROUTE_CONFIG, G8_ROUTE_PATHS } from './config'
import { navigationService } from './NavigationService'

export interface DeepLinkConfig {
  route: G8Route
  params?: G8RouteParams
  query?: Record<string, string>
  hash?: string
}

export interface DeepLinkResult {
  success: boolean
  route?: G8Route
  params?: G8RouteParams
  error?: string
}

/**
 * Deep Linking Service
 * Handles URL-based navigation and deep linking
 */
export class DeepLinkingService {
  private static instance: DeepLinkingService
  private router: any
  private stateManager: any
  
  private constructor() {
    // Private constructor for singleton pattern
  }
  
  static getInstance(): DeepLinkingService {
    if (!DeepLinkingService.instance) {
      DeepLinkingService.instance = new DeepLinkingService()
    }
    return DeepLinkingService.instance
  }
  
  /**
   * Initialize the deep linking service
   */
  initialize(router: any, stateManager: any) {
    this.router = router
    this.stateManager = stateManager
  }
  
  /**
   * Parse URL and extract route information
   */
  parseUrl(url: string): DeepLinkResult {
    try {
      const urlObj = new URL(url, window.location.origin)
      const pathname = urlObj.pathname
      const searchParams = new URLSearchParams(urlObj.search)
      const hash = urlObj.hash.slice(1) // Remove # prefix
      
      // Find matching route
      const route = this.findRouteByPath(pathname)
      if (!route) {
        return {
          success: false,
          error: `No route found for path: ${pathname}`
        }
      }
      
      // Extract route parameters
      const params = this.extractRouteParams(pathname, route)
      
      // Extract query parameters
      const query: Record<string, string> = {}
      searchParams.forEach((value, key) => {
        query[key] = value
      })
      
      return {
        success: true,
        route,
        params: { ...params, ...query }
      }
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to parse URL'
      }
    }
  }
  
  /**
   * Find route by path
   */
  private findRouteByPath(pathname: string): G8Route | null {
    // Direct path match
    const directMatch = Object.entries(G8_ROUTE_PATHS).find(
      ([, path]) => path === pathname
    )
    if (directMatch) {
      return directMatch[0] as G8Route
    }
    
    // Dynamic route match
    for (const [route, path] of Object.entries(G8_ROUTE_PATHS)) {
      if (this.matchesDynamicRoute(pathname, path)) {
        return route as G8Route
      }
    }
    
    return null
  }
  
  /**
   * Check if pathname matches a dynamic route pattern
   */
  private matchesDynamicRoute(pathname: string, routePath: string): boolean {
    if (!routePath.includes(':')) {
      return pathname === routePath
    }
    
    // Convert route path to regex pattern
    const pattern = routePath
      .replace(/:[^/]+/g, '([^/]+)')
      .replace(/\//g, '\\/')
    
    const regex = new RegExp(`^${pattern}$`)
    return regex.test(pathname)
  }
  
  /**
   * Extract route parameters from pathname
   */
  private extractRouteParams(pathname: string, route: G8Route): G8RouteParams {
    const config = G8_ROUTE_CONFIG[route]
    if (!config) return {}
    
    const params: G8RouteParams = {}
    const pathSegments = pathname.split('/').filter(Boolean)
    const routeSegments = config.path.split('/').filter(Boolean)
    
    for (let i = 0; i < routeSegments.length; i++) {
      const segment = routeSegments[i]
      if (segment.startsWith(':')) {
        const paramName = segment.slice(1)
        const value = pathSegments[i]
        
        if (value) {
          if (paramName === 'tokenId') {
            params.tokenId = value
          } else if (paramName === 'chatRoomId') {
            params.chatRoomId = value
          }
        }
      }
    }
    
    return params
  }
  
  /**
   * Generate deep link URL
   */
  generateDeepLink(config: DeepLinkConfig): string {
    const routeConfig = G8_ROUTE_CONFIG[config.route]
    if (!routeConfig) {
      throw new Error(`Route ${config.route} not found`)
    }
    
    let path = routeConfig.path
    
    // Replace dynamic segments
    if (config.params) {
      if (config.params.tokenId && path.includes(':tokenId')) {
        path = path.replace(':tokenId', config.params.tokenId)
      }
      if (config.params.chatRoomId && path.includes(':chatRoomId')) {
        path = path.replace(':chatRoomId', config.params.chatRoomId)
      }
    }
    
    // Add query parameters
    if (config.query) {
      const queryParams = new URLSearchParams()
      Object.entries(config.query).forEach(([key, value]) => {
        queryParams.set(key, value)
      })
      const queryString = queryParams.toString()
      if (queryString) {
        path += `?${queryString}`
      }
    }
    
    // Add hash
    if (config.hash) {
      path += `#${config.hash}`
    }
    
    return path
  }
  
  /**
   * Navigate to deep link
   */
  async navigateToDeepLink(url: string): Promise<DeepLinkResult> {
    const parseResult = this.parseUrl(url)
    if (!parseResult.success) {
      return parseResult
    }
    
    try {
      // Use navigation service to navigate
      const navResult = await navigationService.navigate(
        parseResult.route!,
        parseResult.params
      )
      
      if (!navResult.success) {
        return {
          success: false,
          error: navResult.error
        }
      }
      
      return parseResult
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Navigation failed'
      }
    }
  }
  
  /**
   * Handle browser back/forward navigation
   */
  handleBrowserNavigation(pathname: string, searchParams: URLSearchParams) {
    const parseResult = this.parseUrl(`${pathname}?${searchParams.toString()}`)
    if (parseResult.success) {
      // Update state without triggering navigation
      this.stateManager?.navigate?.(parseResult.route!, parseResult.params)
    }
  }
  
  /**
   * Share current route as deep link
   */
  getCurrentDeepLink(): string {
    const currentRoute = this.stateManager?.getCurrentRoute?.()
    const currentParams = this.stateManager?.getCurrentParams?.()
    
    if (!currentRoute) {
      return '/g8'
    }
    
    return this.generateDeepLink({
      route: currentRoute,
      params: currentParams
    })
  }
}

// Export singleton instance
export const deepLinkingService = DeepLinkingService.getInstance()

/**
 * Deep linking hook
 */
export function useDeepLinking() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Initialize service
  useEffect(() => {
    deepLinkingService.initialize(router, {
      navigate: (route: G8Route, params?: G8RouteParams) => {
        // This would be connected to your state manager
        console.log('Navigate to:', route, params)
      },
      getCurrentRoute: () => {
        // This would return current route from state
        return 'home'
      },
      getCurrentParams: () => {
        // This would return current params from state
        return {}
      }
    })
  }, [router])
  
  // Handle URL changes
  useEffect(() => {
    deepLinkingService.handleBrowserNavigation(pathname, searchParams)
  }, [pathname, searchParams])
  
  const navigateToDeepLink = useCallback(async (url: string) => {
    return deepLinkingService.navigateToDeepLink(url)
  }, [])
  
  const generateDeepLink = useCallback((config: DeepLinkConfig) => {
    return deepLinkingService.generateDeepLink(config)
  }, [])
  
  const getCurrentDeepLink = useCallback(() => {
    return deepLinkingService.getCurrentDeepLink()
  }, [])
  
  return {
    navigateToDeepLink,
    generateDeepLink,
    getCurrentDeepLink
  }
}

/**
 * Deep link sharing utility
 */
export function createDeepLinkShare(route: G8Route, params?: G8RouteParams) {
  const deepLinkingService = DeepLinkingService.getInstance()
  const deepLink = deepLinkingService.generateDeepLink({ route, params })
  const fullUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${deepLink}`
  
  return {
    url: fullUrl,
    share: async () => {
      if (typeof window !== 'undefined' && navigator.share) {
        try {
          await navigator.share({
            title: G8_ROUTE_CONFIG[route]?.metadata?.title || 'G8 App',
            url: fullUrl
          })
        } catch (error) {
          console.error('Share failed:', error)
        }
      } else if (typeof window !== 'undefined' && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(fullUrl)
        } catch (error) {
          console.error('Clipboard failed:', error)
        }
      }
    }
  }
}
