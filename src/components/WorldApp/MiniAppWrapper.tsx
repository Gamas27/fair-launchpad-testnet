'use client'

import React, { useEffect, useState } from 'react'
import { SafeWorldIdProvider } from '@/providers/SafeWorldIdProvider'
import { PrivyProvider } from '@/providers/PrivyProvider'
import { NavigationProvider, NavigationStateUpdater } from '@/contexts/NavigationContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ErrorBoundary } from './ErrorBoundary'

interface MiniAppWrapperProps {
  children: React.ReactNode
}

export function MiniAppWrapper({ children }: MiniAppWrapperProps) {
  const [isWorldApp, setIsWorldApp] = useState(false)

  useEffect(() => {
    // Detect if running in World App
    const checkWorldApp = () => {
      try {
        // Check for World App specific APIs or user agents
        const isWorldAppEnvironment = 
          typeof window !== 'undefined' && (
            window.location.hostname.includes('world.app') ||
            window.location.hostname.includes('world.org') ||
            // Check for World App specific globals
            (window as Record<string, unknown>).worldApp ||
            (window as Record<string, unknown>).worldId ||
            // Check for World App user agent
            navigator.userAgent.includes('WorldApp')
          )
        
        setIsWorldApp(isWorldAppEnvironment)
      } catch (error) {
        console.warn('Error detecting World App environment:', error)
        setIsWorldApp(false)
      }
    }

    checkWorldApp()
  }, [])

  // World App specific configuration - safer defaults
  const worldIdConfig = {
    appId: process.env.NEXT_PUBLIC_WORLD_ID_APP_ID || 'app_staging_1234567890abcdef',
    action: 'verify-human',
    signal: 'anti-bot-launchpad',
    environment: 'staging' // Force staging for testing
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {isWorldApp && (
          <div className="bg-green-600 text-white text-center py-2 px-4 text-sm">
            🚀 Running in World App - Enhanced features enabled
          </div>
        )}
        <ErrorBoundary fallback={<div className="p-4 text-white">Wallet Error</div>}>
          <PrivyProvider>
            <ErrorBoundary fallback={<div className="p-4 text-white">World ID Error</div>}>
              <SafeWorldIdProvider config={worldIdConfig}>
                <ErrorBoundary fallback={<div className="p-4 text-white">Navigation Error</div>}>
                  <AuthProvider>
                    <NavigationProvider>
                      <NavigationStateUpdater />
                      {children}
                    </NavigationProvider>
                  </AuthProvider>
                </ErrorBoundary>
              </SafeWorldIdProvider>
            </ErrorBoundary>
          </PrivyProvider>
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
}

export default MiniAppWrapper
