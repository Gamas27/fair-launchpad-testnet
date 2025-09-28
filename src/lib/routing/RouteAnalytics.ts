'use client'

import { useEffect, useCallback, useRef } from 'react'
import { G8Route, G8RouteParams } from './types'

export interface NavigationEvent {
  route: G8Route
  params?: G8RouteParams
  timestamp: number
  duration?: number
  previousRoute?: G8Route
  userAgent: string
  sessionId: string
}

export interface RouteMetrics {
  route: G8Route
  visitCount: number
  totalDuration: number
  averageDuration: number
  lastVisited: number
  bounceRate: number
  conversionRate: number
}

export interface UserJourney {
  sessionId: string
  startTime: number
  endTime?: number
  routes: NavigationEvent[]
  totalDuration: number
  completed: boolean
}

/**
 * Route Analytics Service
 * Tracks navigation patterns and user behavior
 */
export class RouteAnalyticsService {
  private static instance: RouteAnalyticsService
  private events: NavigationEvent[] = []
  private currentSession: UserJourney | null = null
  private sessionId: string
  private startTime: number
  private routeStartTime: number = 0
  
  private constructor() {
    this.sessionId = this.generateSessionId()
    this.startTime = Date.now()
  }
  
  static getInstance(): RouteAnalyticsService {
    if (!RouteAnalyticsService.instance) {
      RouteAnalyticsService.instance = new RouteAnalyticsService()
    }
    return RouteAnalyticsService.instance
  }
  
  /**
   * Track route navigation
   */
  trackNavigation(route: G8Route, params?: G8RouteParams, previousRoute?: G8Route) {
    const now = Date.now()
    const duration = this.routeStartTime > 0 ? now - this.routeStartTime : undefined
    
    const event: NavigationEvent = {
      route,
      params,
      timestamp: now,
      duration,
      previousRoute,
      userAgent: navigator.userAgent,
      sessionId: this.sessionId
    }
    
    this.events.push(event)
    
    // Update current session
    if (!this.currentSession) {
      this.currentSession = {
        sessionId: this.sessionId,
        startTime: this.startTime,
        routes: [],
        totalDuration: 0,
        completed: false
      }
    }
    
    this.currentSession.routes.push(event)
    this.routeStartTime = now
    
    // Send to analytics providers
    this.sendToAnalytics(event)
    
    // Store in localStorage for persistence
    this.persistEvents()
  }
  
  /**
   * Track route exit
   */
  trackRouteExit(route: G8Route) {
    const now = Date.now()
    const duration = this.routeStartTime > 0 ? now - this.routeStartTime : 0
    
    // Update last event with duration
    const lastEvent = this.events[this.events.length - 1]
    if (lastEvent && lastEvent.route === route) {
      lastEvent.duration = duration
    }
    
    this.routeStartTime = 0
  }
  
  /**
   * Track session end
   */
  trackSessionEnd() {
    if (this.currentSession) {
      this.currentSession.endTime = Date.now()
      this.currentSession.totalDuration = this.currentSession.endTime - this.currentSession.startTime
      this.currentSession.completed = true
      
      // Send session data
      this.sendSessionToAnalytics(this.currentSession)
    }
  }
  
  /**
   * Get route metrics
   */
  getRouteMetrics(route: G8Route): RouteMetrics {
    const routeEvents = this.events.filter(event => event.route === route)
    const visitCount = routeEvents.length
    const totalDuration = routeEvents.reduce((sum, event) => sum + (event.duration || 0), 0)
    const averageDuration = visitCount > 0 ? totalDuration / visitCount : 0
    const lastVisited = routeEvents.length > 0 ? Math.max(...routeEvents.map(e => e.timestamp)) : 0
    
    // Calculate bounce rate (single page visits)
    const singlePageVisits = routeEvents.filter(event => {
      const nextEvent = this.events[this.events.indexOf(event) + 1]
      return !nextEvent || nextEvent.timestamp - event.timestamp > 30000 // 30 seconds
    }).length
    const bounceRate = visitCount > 0 ? (singlePageVisits / visitCount) * 100 : 0
    
    // Calculate conversion rate (placeholder - would need business logic)
    const conversionRate = 0 // This would be calculated based on business goals
    
    return {
      route,
      visitCount,
      totalDuration,
      averageDuration,
      lastVisited,
      bounceRate,
      conversionRate
    }
  }
  
  /**
   * Get user journey
   */
  getUserJourney(): UserJourney | null {
    return this.currentSession
  }
  
  /**
   * Get popular routes
   */
  getPopularRoutes(limit: number = 10): Array<{ route: G8Route; count: number }> {
    const routeCounts = new Map<G8Route, number>()
    
    this.events.forEach(event => {
      const count = routeCounts.get(event.route) || 0
      routeCounts.set(event.route, count + 1)
    })
    
    return Array.from(routeCounts.entries())
      .map(([route, count]) => ({ route, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }
  
  /**
   * Get navigation patterns
   */
  getNavigationPatterns(): Array<{ from: G8Route; to: G8Route; count: number }> {
    const patterns = new Map<string, number>()
    
    for (let i = 0; i < this.events.length - 1; i++) {
      const current = this.events[i]
      const next = this.events[i + 1]
      const pattern = `${current.route}->${next.route}`
      const count = patterns.get(pattern) || 0
      patterns.set(pattern, count + 1)
    }
    
    return Array.from(patterns.entries())
      .map(([pattern, count]) => {
        const [from, to] = pattern.split('->')
        return { from: from as G8Route, to: to as G8Route, count }
      })
      .sort((a, b) => b.count - a.count)
  }
  
  /**
   * Send to analytics providers
   */
  private sendToAnalytics(event: NavigationEvent) {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: event.route,
        page_location: window.location.href,
        custom_map: {
          route: event.route,
          duration: event.duration,
          previous_route: event.previousRoute
        }
      })
    }
    
    // Custom analytics endpoint
    if (process.env.NODE_ENV === 'production') {
      this.sendToCustomAnalytics(event)
    }
  }
  
  /**
   * Send to custom analytics endpoint
   */
  private async sendToCustomAnalytics(event: NavigationEvent) {
    try {
      await fetch('/api/analytics/navigation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
    } catch (error) {
      console.error('Failed to send analytics:', error)
    }
  }
  
  /**
   * Send session data to analytics
   */
  private async sendSessionToAnalytics(session: UserJourney) {
    try {
      await fetch('/api/analytics/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(session)
      })
    } catch (error) {
      console.error('Failed to send session analytics:', error)
    }
  }
  
  /**
   * Persist events to localStorage
   */
  private persistEvents() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('route-analytics', JSON.stringify({
          events: this.events,
          session: this.currentSession
        }))
      } catch (error) {
        console.error('Failed to persist analytics:', error)
      }
    }
  }
  
  /**
   * Load events from localStorage
   */
  loadPersistedEvents() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('route-analytics')
        if (stored) {
          const data = JSON.parse(stored)
          this.events = data.events || []
          this.currentSession = data.session || null
        }
      } catch (error) {
        console.error('Failed to load analytics:', error)
      }
    }
  }
  
  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  
  /**
   * Clear analytics data
   */
  clearAnalytics() {
    this.events = []
    this.currentSession = null
    this.routeStartTime = 0
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('route-analytics')
    }
  }
}

// Export singleton instance
export const routeAnalyticsService = RouteAnalyticsService.getInstance()

/**
 * Route analytics hook
 */
export function useRouteAnalytics() {
  const analyticsRef = useRef(routeAnalyticsService)
  
  useEffect(() => {
    // Load persisted events on mount
    analyticsRef.current.loadPersistedEvents()
    
    // Track session end on unmount
    return () => {
      analyticsRef.current.trackSessionEnd()
    }
  }, [])
  
  const trackNavigation = useCallback((route: G8Route, params?: G8RouteParams, previousRoute?: G8Route) => {
    analyticsRef.current.trackNavigation(route, params, previousRoute)
  }, [])
  
  const trackRouteExit = useCallback((route: G8Route) => {
    analyticsRef.current.trackRouteExit(route)
  }, [])
  
  const getRouteMetrics = useCallback((route: G8Route) => {
    return analyticsRef.current.getRouteMetrics(route)
  }, [])
  
  const getPopularRoutes = useCallback((limit?: number) => {
    return analyticsRef.current.getPopularRoutes(limit)
  }, [])
  
  const getNavigationPatterns = useCallback(() => {
    return analyticsRef.current.getNavigationPatterns()
  }, [])
  
  return {
    trackNavigation,
    trackRouteExit,
    getRouteMetrics,
    getPopularRoutes,
    getNavigationPatterns
  }
}

/**
 * Analytics dashboard data utility
 */
export function getRouteAnalyticsData() {
  const analyticsService = RouteAnalyticsService.getInstance()
  
  return {
    popularRoutes: analyticsService.getPopularRoutes(5),
    patterns: analyticsService.getNavigationPatterns().slice(0, 5),
    metrics: analyticsService.getMetrics()
  }
}
