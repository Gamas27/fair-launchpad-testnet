'use client'

import { G8Route, G8RouteParams } from './types'
import { G8_ROUTE_CONFIG, G8_ROUTE_PATHS } from './config'

export interface NavigationOptions {
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  locale?: string
}

export interface NavigationResult {
  success: boolean
  error?: string
  redirected?: boolean
  redirectTo?: G8Route
}

export interface RouteValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  requirements: {
    auth: boolean
    worldId: boolean
    wallet: boolean
  }
}

/**
 * Navigation Service
 * Provides programmatic navigation with validation and error handling
 */
export class NavigationService {
  private static instance: NavigationService
  private router: any
  private stateManager: any
  private analytics: any
  
  private constructor() {
    // Private constructor for singleton pattern
  }
  
  static getInstance(): NavigationService {
    if (!NavigationService.instance) {
      NavigationService.instance = new NavigationService()
    }
    return NavigationService.instance
  }
  
  /**
   * Initialize the navigation service with dependencies
   */
  initialize(router: any, stateManager: any, analytics?: any) {
    this.router = router
    this.stateManager = stateManager
    this.analytics = analytics
  }
  
  /**
   * Validate route access and requirements
   */
  validateRoute(route: G8Route, userState: any): RouteValidationResult {
    const config = G8_ROUTE_CONFIG[route]
    const errors: string[] = []
    const warnings: string[] = []
    
    if (!config) {
      return {
        isValid: false,
        errors: [`Route '${route}' not found in configuration`],
        warnings: [],
        requirements: { auth: false, worldId: false, wallet: false }
      }
    }
    
    const requirements = {
      auth: config.requiresAuth,
      worldId: config.requiresWorldId,
      wallet: config.requiresWallet
    }
    
    // Check authentication requirement
    if (config.requiresAuth && !userState.isAuthenticated) {
      errors.push('Authentication required')
    }
    
    // Check World ID requirement
    if (config.requiresWorldId && !userState.isWorldIdVerified) {
      errors.push('World ID verification required')
    }
    
    // Check wallet requirement
    if (config.requiresWallet && !userState.isWalletConnected) {
      errors.push('Wallet connection required')
    }
    
    // Add warnings for missing optional requirements
    if (!userState.isAuthenticated && !config.requiresAuth) {
      warnings.push('Authentication recommended for better experience')
    }
    
    if (!userState.isWorldIdVerified && !config.requiresWorldId) {
      warnings.push('World ID verification recommended for security')
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      requirements
    }
  }
  
  /**
   * Navigate to a route with validation
   */
  async navigate(
    route: G8Route, 
    params?: G8RouteParams, 
    options?: NavigationOptions
  ): Promise<NavigationResult> {
    try {
      // Get current user state
      const userState = this.stateManager?.getUserState?.() || {
        isAuthenticated: false,
        isWorldIdVerified: false,
        isWalletConnected: false
      }
      
      // Validate route access
      const validation = this.validateRoute(route, userState)
      
      if (!validation.isValid) {
        // Determine redirect route based on missing requirements
        const redirectTo = this.determineRedirectRoute(validation.requirements, userState)
        
        return {
          success: false,
          error: validation.errors.join(', '),
          redirected: true,
          redirectTo
        }
      }
      
      // Build the path
      const path = this.buildPath(route, params)
      
      // Update state
      this.stateManager?.navigate?.(route, params)
      
      // Navigate using router
      if (options?.replace) {
        this.router?.replace(path)
      } else {
        this.router?.push(path, { scroll: options?.scroll, shallow: options?.shallow })
      }
      
      // Track navigation
      this.trackNavigation(route, params, 'navigate')
      
      return { success: true }
      
    } catch (error) {
      console.error('Navigation error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown navigation error'
      }
    }
  }
  
  /**
   * Navigate back with validation
   */
  async goBack(): Promise<NavigationResult> {
    try {
      const history = this.stateManager?.getNavigationHistory?.() || []
      
      if (history.length <= 1) {
        // No history, navigate to home
        return this.navigate('home')
      }
      
      // Go back in state
      this.stateManager?.goBack?.()
      
      // Go back in browser
      this.router?.back()
      
      // Track navigation
      this.trackNavigation('back', undefined, 'goBack')
      
      return { success: true }
      
    } catch (error) {
      console.error('Go back error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown go back error'
      }
    }
  }
  
  /**
   * Reset navigation to home
   */
  async reset(): Promise<NavigationResult> {
    try {
      // Reset state
      this.stateManager?.reset?.()
      
      // Navigate to home
      this.router?.push('/g8')
      
      // Track navigation
      this.trackNavigation('home', undefined, 'reset')
      
      return { success: true }
      
    } catch (error) {
      console.error('Reset navigation error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown reset error'
      }
    }
  }
  
  /**
   * Build path from route and parameters
   */
  private buildPath(route: G8Route, params?: G8RouteParams): string {
    const config = G8_ROUTE_CONFIG[route]
    if (!config) return '/g8'
    
    let path = config.path
    
    // Replace dynamic segments
    if (params) {
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
    
    return path
  }
  
  /**
   * Determine redirect route based on missing requirements
   */
  private determineRedirectRoute(requirements: any, userState: any): G8Route {
    if (!userState.isAuthenticated) {
      return 'onboarding'
    }
    
    if (!userState.isWorldIdVerified) {
      return 'onboarding'
    }
    
    if (!userState.isWalletConnected && requirements.wallet) {
      return 'onboarding'
    }
    
    return 'home'
  }
  
  /**
   * Track navigation for analytics
   */
  private trackNavigation(route: string, params?: any, action: string = 'navigate') {
    if (this.analytics) {
      this.analytics.track('navigation', {
        route,
        params,
        action,
        timestamp: new Date().toISOString()
      })
    }
  }
  
  /**
   * Get available routes for current user
   */
  getAvailableRoutes(userState: any): G8Route[] {
    return Object.keys(G8_ROUTE_CONFIG).filter(route => {
      const config = G8_ROUTE_CONFIG[route as G8Route]
      if (!config) return false
      
      if (config.requiresAuth && !userState.isAuthenticated) return false
      if (config.requiresWorldId && !userState.isWorldIdVerified) return false
      if (config.requiresWallet && !userState.isWalletConnected) return false
      
      return true
    }) as G8Route[]
  }
  
  /**
   * Get route metadata
   */
  getRouteMetadata(route: G8Route) {
    const config = G8_ROUTE_CONFIG[route]
    return config?.metadata || null
  }
  
  /**
   * Check if route exists
   */
  routeExists(route: string): route is G8Route {
    return route in G8_ROUTE_CONFIG
  }
}

// Export singleton instance
export const navigationService = NavigationService.getInstance()
