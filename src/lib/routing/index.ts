// Routing and Navigation System
// Comprehensive routing and state management solution

// Core routing types and configuration
export * from './types'
export * from './config'

// Routing hooks
export * from './hooks'

// Route protection and guards
export * from './RouteGuard'

// Navigation service
export * from './NavigationService'

// Route middleware
export * from './middleware'

// Route transitions and animations
export * from './RouteTransition'

// Deep linking support
export * from './DeepLinking'

// Route analytics
export * from './RouteAnalytics'

// Re-export commonly used items for convenience
export {
  useRouteParams,
  useRouteGuard,
  useNavigation,
  useRouteMetadata,
  useTabNavigation
} from './hooks'

export {
  RouteGuard,
  withRouteGuard,
  useRouteAccess
} from './RouteGuard'

export {
  navigationService
} from './NavigationService'

export {
  middlewareManager,
  authMiddleware,
  worldIdMiddleware,
  walletMiddleware,
  rateLimitMiddleware,
  analyticsMiddleware,
  loadingMiddleware,
  errorBoundaryMiddleware
} from './middleware'

export {
  RouteTransition,
  AnimatedRoute,
  PageTransition,
  useRouteTransition,
  routeTransitions
} from './RouteTransition'

export {
  deepLinkingService,
  useDeepLinking,
  createDeepLinkShare
} from './DeepLinking'

export { DeepLinkShare } from './DeepLinkShare'

export {
  routeAnalyticsService,
  useRouteAnalytics,
  getRouteAnalyticsData
} from './RouteAnalytics'

export { RouteAnalyticsDashboard } from './RouteAnalyticsDashboard'
