'use client'

import React from 'react'
import { useNavigation, useRouteParams } from '@/lib/routing'
import { useG8 } from '@/lib/state'

/**
 * Simple G8 Navigation Test Component
 * This helps debug routing issues
 */
export function G8NavigationTest() {
  const { navigate, goBack } = useNavigation()
  const { state } = useG8()
  const params = useRouteParams()

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-4">G8 Navigation Test</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Current State:</h3>
          <pre className="text-sm bg-gray-800 p-2 rounded">
            {JSON.stringify({
              currentRoute: state.currentRoute,
              isAuthenticated: state.isAuthenticated,
              isWorldIdVerified: state.isWorldIdVerified,
              isWalletConnected: state.isWalletConnected,
              params
            }, null, 2)}
          </pre>
        </div>

        <div>
          <h3 className="font-semibold">Navigation Actions:</h3>
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => navigate('home')}
              className="px-3 py-1 bg-blue-600 rounded text-sm"
            >
              Go Home
            </button>
            <button 
              onClick={() => navigate('g8')}
              className="px-3 py-1 bg-green-600 rounded text-sm"
            >
              Go to G8 Zone
            </button>
            <button 
              onClick={() => navigate('profile')}
              className="px-3 py-1 bg-purple-600 rounded text-sm"
            >
              Go to Profile
            </button>
            <button 
              onClick={() => navigate('settings')}
              className="px-3 py-1 bg-orange-600 rounded text-sm"
            >
              Go to Settings
            </button>
            <button 
              onClick={goBack}
              className="px-3 py-1 bg-gray-600 rounded text-sm"
            >
              Go Back
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Debug Info:</h3>
          <p className="text-sm text-gray-300">
            If you see this component, the routing system is working. 
            Check the current state above to see what's happening.
          </p>
        </div>
      </div>
    </div>
  )
}
