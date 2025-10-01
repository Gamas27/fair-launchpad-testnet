'use client'

import React from 'react'
import G8AppLayout from '@/components/g8/G8AppLayout'
import { useTokens, useUserProfile } from '@/lib/hooks/useApi'

// Mock data for demo purposes
const mockTokens = [
  {
    id: '1',
    name: 'G8 Token',
    ticker: 'G8',
    price: '0.042',
    change24h: 12.5,
    logo: '/api/placeholder/40/40'
  },
  {
    id: '2', 
    name: 'World Coin',
    ticker: 'WLD',
    price: '2.15',
    change24h: -3.2,
    logo: '/api/placeholder/40/40'
  },
  {
    id: '3',
    name: 'Ethereum',
    ticker: 'ETH', 
    price: '3,250.00',
    change24h: 5.8,
    logo: '/api/placeholder/40/40'
  }
]

export default function HomePage() {
  const { tokens: apiTokens, loading: tokensLoading, error: tokensError } = useTokens({ limit: 10 })
  const { profile, loading: profileLoading } = useUserProfile('demo-user-id')
  
  // Use mock data if API fails or returns invalid data
  const tokens = Array.isArray(apiTokens) && apiTokens.length > 0 ? apiTokens : mockTokens
  return (
    <G8AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-g8-h1 text-g8-text-primary font-bold">Welcome back</h1>
            <p className="text-g8-body text-g8-text-secondary">Ready to explore G8?</p>
          </div>
          <div className="w-10 h-10 bg-gradient-g8 rounded-full flex items-center justify-center">
            <span className="text-g8-bg font-bold">G8</span>
          </div>
        </div>

        {/* Portfolio Card */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6 shadow-g8-glow">
          <h2 className="text-g8-h2 text-g8-text-primary font-semibold mb-4">Your Portfolio</h2>
          {profileLoading ? (
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-4 bg-g8-surface2 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-g8-surface2 rounded w-1/2"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-g8-body text-g8-text-secondary">Total Value</span>
                <span className="text-g8-h2 text-g8-text-primary font-bold">
                  ${profile?.totalVolume?.toFixed(2) || '0.00'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-g8-body text-g8-text-secondary">Tokens</span>
                <span className="text-g8-body text-g8-text-primary">{tokens.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-g8-body text-g8-text-secondary">24h Change</span>
                <span className="text-g8-body text-g8-success">+0.00%</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4 text-center">
            <div className="text-2xl mb-2">🪙</div>
            <div className="text-g8-body text-g8-text-primary font-medium">My Tokens</div>
            <div className="text-g8-caption text-g8-text-secondary">0 tokens</div>
          </div>
          
          <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4 text-center">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-g8-body text-g8-text-primary font-medium">Activity</div>
            <div className="text-g8-caption text-g8-text-secondary">No activity yet</div>
          </div>
        </div>

        {/* Recent Tokens */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6">
          <h3 className="text-g8-h2 text-g8-text-primary font-semibold mb-4">Recent Tokens</h3>
          {tokensLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-g8-surface2 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : tokensError ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-g8-body text-g8-error">Failed to load tokens</p>
              <p className="text-g8-caption text-g8-text-secondary">{tokensError}</p>
            </div>
          ) : tokens.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🪙</div>
              <p className="text-g8-body text-g8-text-secondary">No tokens yet</p>
              <p className="text-g8-caption text-g8-text-secondary">Start by creating your first token</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tokens.slice(0, 3).map((token) => (
                <div key={token.id} className="flex items-center space-x-4 p-3 bg-g8-surface2 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-g8 rounded-full flex items-center justify-center">
                    <span className="text-g8-bg font-bold text-sm">{token.ticker.slice(0, 2)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-g8-body text-g8-text-primary font-medium">{token.name}</h4>
                      <span className="text-g8-caption text-g8-text-secondary">{token.ticker}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-g8-body text-g8-text-primary font-medium">${token.price}</span>
                      <span className={`text-g8-caption ${token.change24h >= 0 ? 'text-g8-success' : 'text-g8-error'}`}>
                        {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </G8AppLayout>
  )
}
