'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { navigationService } from './NavigationService'
import { deepLinkingService } from './DeepLinking'
import { routeAnalyticsService } from './RouteAnalytics'
import { middlewareManager } from './middleware'
import { useG8 } from '../state'

/**
 * G8 Navigation Integration
 * Connects the routing system with the G8 app state and Next.js router
 */
export function useG8NavigationIntegration() {
  const router = useRouter()
  const { state, dispatch } = useG8()

  useEffect(() => {
    // Initialize navigation service
    navigationService.initialize(router, {
      navigate: (route: string, params?: any) => {
        dispatch({ type: 'NAVIGATE', payload: { route, params } })
      },
      goBack: () => {
        dispatch({ type: 'GO_BACK' })
      },
      reset: () => {
        dispatch({ type: 'RESET_NAVIGATION' })
      },
      getUserState: () => ({
        isAuthenticated: state.isAuthenticated,
        isWorldIdVerified: state.isWorldIdVerified,
        isWalletConnected: state.isWalletConnected
      }),
      getNavigationHistory: () => state.navigationHistory,
      getCurrentRoute: () => state.currentRoute,
      getCurrentParams: () => ({}) // Could be enhanced to track params
    })

    // Initialize deep linking service
    deepLinkingService.initialize(router, {
      navigate: (route: string, params?: any) => {
        dispatch({ type: 'NAVIGATE', payload: { route, params } })
      },
      getCurrentRoute: () => state.currentRoute,
      getCurrentParams: () => ({})
    })

    // Initialize analytics
    routeAnalyticsService.trackNavigation('app-init', { 
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      sessionId: routeAnalyticsService['sessionId']
    })

  }, [router, dispatch, state.isAuthenticated, state.isWorldIdVerified, state.isWalletConnected, state.navigationHistory, state.currentRoute])

  // Track route changes
  useEffect(() => {
    routeAnalyticsService.trackNavigation(state.currentRoute, {}, state.navigationHistory[state.navigationHistory.length - 2])
  }, [state.currentRoute, state.navigationHistory])

  return {
    navigationService,
    deepLinkingService,
    routeAnalyticsService
  }
}

/**
 * G8 Route Middleware Integration
 * Sets up route-specific middleware for the G8 app
 */
export function useG8RouteMiddleware() {
  useEffect(() => {
    // Register G8-specific middleware
    middlewareManager.registerRouteMiddleware('create', {
      before: [
        // Rate limiting for token creation
        (context) => {
          const now = Date.now()
          const lastCreate = localStorage.getItem('last-token-create')
          if (lastCreate && now - parseInt(lastCreate) < 300000) { // 5 minutes
            return {
              allow: false,
              error: 'Please wait before creating another token'
            }
          }
          localStorage.setItem('last-token-create', now.toString())
          return { allow: true }
        }
      ]
    })

    middlewareManager.registerRouteMiddleware('g8', {
      before: [
        // G8 zone specific checks
        (context) => {
          if (context.userState.reputationScore < 100) {
            return {
              allow: false,
              redirect: 'home',
              error: 'Insufficient reputation for G8 zone'
            }
          }
          return { allow: true }
        }
      ]
    })

    middlewareManager.registerRouteMiddleware('profile', {
      before: [
        // Profile access validation
        (context) => {
          if (!context.userState.isAuthenticated) {
            return {
              allow: false,
              redirect: 'onboarding',
              error: 'Authentication required for profile'
            }
          }
          return { allow: true }
        }
      ]
    })

  }, [])
}

/**
 * G8 State Persistence Integration
 * Connects state persistence with G8 app state
 */
export function useG8StatePersistence() {
  const { state } = useG8()

  useEffect(() => {
    // Configure state persistence for G8 app
    const { statePersistenceService } = require('../state/persistence')
    
    statePersistenceService.configure({
      enabled: true,
      storage: 'localStorage',
      selective: true,
      exclude: ['user', 'tokens', 'chatRooms', 'selectedToken', 'selectedChatRoom'],
      include: ['theme', 'animations', 'notifications', 'activeTab', 'showOnboarding'],
      encryption: false,
      compression: false
    })

    // Save state periodically
    const saveInterval = setInterval(() => {
      statePersistenceService.saveState(state)
    }, 30000) // Save every 30 seconds

    return () => {
      clearInterval(saveInterval)
    }
  }, [state])
}

/**
 * G8 Performance Monitoring Integration
 * Sets up performance monitoring for the G8 app
 */
export function useG8PerformanceMonitoring() {
  useEffect(() => {
    // Configure performance monitoring
    const { stateOptimizationService } = require('../state/optimization')
    
    stateOptimizationService.configure({
      enableMemoization: true,
      enableBatching: true,
      enableDebouncing: true,
      debounceDelay: 16,
      maxRenderTime: 16,
      enableProfiling: process.env.NODE_ENV === 'development',
      logPerformance: process.env.NODE_ENV === 'development'
    })

    // Monitor performance in production
    if (process.env.NODE_ENV === 'production') {
      const performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure' && entry.duration > 100) {
            console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`)
          }
        }
      })
      
      performanceObserver.observe({ entryTypes: ['measure'] })
      
      return () => {
        performanceObserver.disconnect()
      }
    }
  }, [])
}

/**
 * Complete G8 Integration Hook
 * Combines all G8 integrations
 */
export function useG8Integration() {
  const navigation = useG8NavigationIntegration()
  useG8RouteMiddleware()
  useG8StatePersistence()
  useG8PerformanceMonitoring()

  return {
    ...navigation
  }
}
