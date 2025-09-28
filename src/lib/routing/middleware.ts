'use client'

import { G8Route, G8RouteParams } from './types'
import { G8_ROUTE_CONFIG } from './config'

export interface MiddlewareContext {
  route: G8Route
  params?: G8RouteParams
  userState: any
  navigationHistory: string[]
  previousRoute?: G8Route
}

export interface MiddlewareResult {
  allow: boolean
  redirect?: G8Route
  error?: string
  data?: any
}

export type RouteMiddleware = (
  context: MiddlewareContext
) => Promise<MiddlewareResult> | MiddlewareResult

export interface MiddlewareOptions {
  before?: RouteMiddleware[]
  after?: RouteMiddleware[]
  error?: RouteMiddleware[]
}

/**
 * Route Middleware Manager
 * Handles pre and post navigation hooks
 */
export class RouteMiddlewareManager {
  private middlewares: Map<G8Route, MiddlewareOptions> = new Map()
  private globalMiddlewares: MiddlewareOptions = {
    before: [],
    after: [],
    error: []
  }
  
  /**
   * Register middleware for a specific route
   */
  registerRouteMiddleware(route: G8Route, options: MiddlewareOptions) {
    this.middlewares.set(route, options)
  }
  
  /**
   * Register global middleware
   */
  registerGlobalMiddleware(options: MiddlewareOptions) {
    if (options.before) {
      this.globalMiddlewares.before!.push(...options.before)
    }
    if (options.after) {
      this.globalMiddlewares.after!.push(...options.after)
    }
    if (options.error) {
      this.globalMiddlewares.error!.push(...options.error)
    }
  }
  
  /**
   * Execute before navigation middlewares
   */
  async executeBeforeMiddlewares(context: MiddlewareContext): Promise<MiddlewareResult> {
    const routeMiddlewares = this.middlewares.get(context.route)
    const allBeforeMiddlewares = [
      ...(this.globalMiddlewares.before || []),
      ...(routeMiddlewares?.before || [])
    ]
    
    for (const middleware of allBeforeMiddlewares) {
      try {
        const result = await middleware(context)
        if (!result.allow) {
          return result
        }
      } catch (error) {
        console.error('Before middleware error:', error)
        return {
          allow: false,
          error: error instanceof Error ? error.message : 'Middleware error'
        }
      }
    }
    
    return { allow: true }
  }
  
  /**
   * Execute after navigation middlewares
   */
  async executeAfterMiddlewares(context: MiddlewareContext): Promise<MiddlewareResult> {
    const routeMiddlewares = this.middlewares.get(context.route)
    const allAfterMiddlewares = [
      ...(this.globalMiddlewares.after || []),
      ...(routeMiddlewares?.after || [])
    ]
    
    for (const middleware of allAfterMiddlewares) {
      try {
        const result = await middleware(context)
        if (!result.allow) {
          return result
        }
      } catch (error) {
        console.error('After middleware error:', error)
        return {
          allow: false,
          error: error instanceof Error ? error.message : 'Middleware error'
        }
      }
    }
    
    return { allow: true }
  }
  
  /**
   * Execute error middlewares
   */
  async executeErrorMiddlewares(context: MiddlewareContext, error: Error): Promise<MiddlewareResult> {
    const routeMiddlewares = this.middlewares.get(context.route)
    const allErrorMiddlewares = [
      ...(this.globalMiddlewares.error || []),
      ...(routeMiddlewares?.error || [])
    ]
    
    for (const middleware of allErrorMiddlewares) {
      try {
        const result = await middleware(context)
        if (!result.allow) {
          return result
        }
      } catch (middlewareError) {
        console.error('Error middleware error:', middlewareError)
      }
    }
    
    return { allow: true }
  }
}

// Singleton instance
export const middlewareManager = new RouteMiddlewareManager()

/**
 * Built-in middleware functions
 */

/**
 * Authentication middleware
 */
export const authMiddleware: RouteMiddleware = (context) => {
  const config = G8_ROUTE_CONFIG[context.route]
  
  if (config?.requiresAuth && !context.userState.isAuthenticated) {
    return {
      allow: false,
      redirect: 'onboarding',
      error: 'Authentication required'
    }
  }
  
  return { allow: true }
}

/**
 * World ID verification middleware
 */
export const worldIdMiddleware: RouteMiddleware = (context) => {
  const config = G8_ROUTE_CONFIG[context.route]
  
  if (config?.requiresWorldId && !context.userState.isWorldIdVerified) {
    return {
      allow: false,
      redirect: 'onboarding',
      error: 'World ID verification required'
    }
  }
  
  return { allow: true }
}

/**
 * Wallet connection middleware
 */
export const walletMiddleware: RouteMiddleware = (context) => {
  const config = G8_ROUTE_CONFIG[context.route]
  
  if (config?.requiresWallet && !context.userState.isWalletConnected) {
    return {
      allow: false,
      redirect: 'onboarding',
      error: 'Wallet connection required'
    }
  }
  
  return { allow: true }
}

/**
 * Rate limiting middleware
 */
export const rateLimitMiddleware = (maxRequests: number = 10, windowMs: number = 60000): RouteMiddleware => {
  const requests = new Map<string, number[]>()
  
  return (context) => {
    const userId = context.userState.user?.id || 'anonymous'
    const now = Date.now()
    const userRequests = requests.get(userId) || []
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < windowMs)
    
    if (validRequests.length >= maxRequests) {
      return {
        allow: false,
        error: 'Rate limit exceeded. Please try again later.'
      }
    }
    
    // Add current request
    validRequests.push(now)
    requests.set(userId, validRequests)
    
    return { allow: true }
  }
}

/**
 * Analytics middleware
 */
export const analyticsMiddleware: RouteMiddleware = (context) => {
  // Track navigation
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: G8_ROUTE_CONFIG[context.route]?.metadata?.title,
      page_location: window.location.href
    })
  }
  
  return { allow: true }
}

/**
 * Loading state middleware
 */
export const loadingMiddleware: RouteMiddleware = (context) => {
  // Set loading state
  if (context.userState.setLoading) {
    context.userState.setLoading(true)
  }
  
  return { allow: true }
}

/**
 * Error boundary middleware
 */
export const errorBoundaryMiddleware: RouteMiddleware = (context) => {
  // Clear any previous errors
  if (context.userState.setError) {
    context.userState.setError(null)
  }
  
  return { allow: true }
}

/**
 * Register default middlewares
 */
export function registerDefaultMiddlewares() {
  // Register global middlewares
  middlewareManager.registerGlobalMiddleware({
    before: [
      authMiddleware,
      worldIdMiddleware,
      walletMiddleware,
      analyticsMiddleware,
      loadingMiddleware,
      errorBoundaryMiddleware
    ],
    after: [
      // Add any post-navigation middlewares here
    ],
    error: [
      // Add error handling middlewares here
    ]
  })
  
  // Register route-specific middlewares
  middlewareManager.registerRouteMiddleware('create', {
    before: [
      rateLimitMiddleware(5, 300000) // 5 requests per 5 minutes for token creation
    ]
  })
  
  middlewareManager.registerRouteMiddleware('g8', {
    before: [
      // Add G8 zone specific middlewares
    ]
  })
}

// Initialize default middlewares
registerDefaultMiddlewares()
