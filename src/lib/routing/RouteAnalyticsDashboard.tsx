'use client'

import React from 'react'
import { useRouteAnalytics } from './RouteAnalytics'

/**
 * Analytics dashboard component
 */
export function RouteAnalyticsDashboard() {
  const { getPopularRoutes, getNavigationPatterns, getRouteMetrics } = useRouteAnalytics()
  
  const popularRoutes = getPopularRoutes(5)
  const patterns = getNavigationPatterns().slice(0, 5)
  
  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4">Navigation Analytics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-300 mb-3">Popular Routes</h4>
          <div className="space-y-2">
            {popularRoutes.map(({ route, count }) => (
              <div key={route} className="flex justify-between items-center">
                <span className="text-gray-400">{route}</span>
                <span className="text-blue-400 font-mono">{count}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gray-300 mb-3">Navigation Patterns</h4>
          <div className="space-y-2">
            {patterns.map(({ from, to, count }) => (
              <div key={`${from}-${to}`} className="flex justify-between items-center">
                <span className="text-gray-400">{from} → {to}</span>
                <span className="text-green-400 font-mono">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
