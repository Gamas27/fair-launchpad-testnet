'use client'

import React, { useEffect, useState } from 'react'
import { useRouteGuard } from './hooks'
import { G8Route } from './types'
import { useG8Navigation } from '../state/context'

interface RouteGuardProps {
  route: G8Route
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectOnFail?: boolean
  onAccessDenied?: () => void
}

/**
 * Route Guard Component
 * Protects routes based on authentication and permission requirements
 */
export function RouteGuard({ 
  route, 
  children, 
  fallback, 
  redirectOnFail = true,
  onAccessDenied 
}: RouteGuardProps) {
  const { canAccess, checkAccess, redirectToAuth, requirements, userState } = useRouteGuard(route)
  const [isChecking, setIsChecking] = useState(true)
  const [accessGranted, setAccessGranted] = useState(false)
  
  useEffect(() => {
    const checkRouteAccess = async () => {
      setIsChecking(true)
      
      const hasAccess = checkAccess()
      setAccessGranted(hasAccess)
      
      if (!hasAccess && redirectOnFail) {
        redirectToAuth()
      }
      
      if (!hasAccess && onAccessDenied) {
        onAccessDenied()
      }
      
      setIsChecking(false)
    }
    
    checkRouteAccess()
  }, [route, checkAccess, redirectOnFail, redirectToAuth, onAccessDenied])
  
  // Show loading state while checking
  if (isChecking) {
    return fallback || <DefaultLoadingFallback />
  }
  
  // Show access denied if no access
  if (!accessGranted) {
    return fallback || <DefaultAccessDeniedFallback requirements={requirements} userState={userState} />
  }
  
  // Render protected content
  return <>{children}</>
}

/**
 * Default loading fallback component
 */
function DefaultLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Checking access...</p>
      </div>
    </div>
  )
}

/**
 * Default access denied fallback component
 */
function DefaultAccessDeniedFallback({ 
  requirements, 
  userState 
}: { 
  requirements: any
  userState: any 
}) {
  const { navigate } = useG8Navigation()
  
  const handleRedirect = () => {
    navigate('onboarding')
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 to-orange-900">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-gray-300 mb-6">
          You don't have the required permissions to access this page.
        </p>
        
        <div className="space-y-3 mb-6">
          {requirements.auth && !userState.isAuthenticated && (
            <div className="flex items-center text-red-400">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Authentication required
            </div>
          )}
          
          {requirements.worldId && !userState.isWorldIdVerified && (
            <div className="flex items-center text-red-400">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              World ID verification required
            </div>
          )}
          
          {requirements.wallet && !userState.isWalletConnected && (
            <div className="flex items-center text-red-400">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Wallet connection required
            </div>
          )}
        </div>
        
        <button
          onClick={handleRedirect}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Complete Setup
        </button>
      </div>
    </div>
  )
}

/**
 * Higher-order component for route protection
 */
export function withRouteGuard<P extends object>(
  Component: React.ComponentType<P>,
  route: G8Route,
  options?: {
    fallback?: React.ReactNode
    redirectOnFail?: boolean
    onAccessDenied?: () => void
  }
) {
  return function GuardedComponent(props: P) {
    return (
      <RouteGuard 
        route={route}
        fallback={options?.fallback}
        redirectOnFail={options?.redirectOnFail}
        onAccessDenied={options?.onAccessDenied}
      >
        <Component {...props} />
      </RouteGuard>
    )
  }
}

/**
 * Hook for conditional rendering based on route access
 */
export function useRouteAccess(route: G8Route) {
  const { canAccess, requirements, userState } = useRouteGuard(route)
  
  return {
    canAccess,
    requirements,
    userState,
    isAuthenticated: userState.isAuthenticated,
    isWorldIdVerified: userState.isWorldIdVerified,
    isWalletConnected: userState.isWalletConnected
  }
}
