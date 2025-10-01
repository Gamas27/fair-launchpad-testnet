'use client'

import React from 'react'
import G8AppLayout from '@/components/g8/G8AppLayout'
import { useTokens } from '@/lib/hooks/useApi'
import { useG8User } from '@/lib/state/context'

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

export default function ProfilePage() {
  const { user: currentUser, isAuthenticated } = useG8User()
  const { tokens: apiTokens, loading: tokensLoading } = useTokens({ limit: 10 })
  
  // Use mock data if API fails or returns invalid data
  const tokens = Array.isArray(apiTokens) && apiTokens.length > 0 ? apiTokens : mockTokens

  // Handle unauthenticated state
  if (!isAuthenticated || !currentUser) {
    return (
      <G8AppLayout>
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-g8-surface2 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-g8-text-secondary text-2xl">🔒</span>
          </div>
          <h1 className="text-g8-h1 text-g8-text-primary font-bold mb-2">Authentication Required</h1>
          <p className="text-g8-body text-g8-text-secondary mb-6">
            Please complete the onboarding process to access your profile.
          </p>
          <button 
            onClick={() => window.location.href = '/g8/onboarding'}
            className="bg-gradient-g8 text-g8-bg px-6 py-3 rounded-g8-lg font-medium hover:opacity-90 transition-opacity"
          >
            Go to Onboarding
          </button>
        </div>
      </G8AppLayout>
    )
  }

  return (
    <G8AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-g8 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-g8-bg font-bold text-2xl">👤</span>
          </div>
          <h1 className="text-g8-h1 text-g8-text-primary font-bold mb-2">Profile</h1>
          <p className="text-g8-body text-g8-text-secondary">Manage your account and settings</p>
        </div>

        {/* Profile Info */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6">
          <h2 className="text-g8-h2 text-g8-text-primary font-semibold mb-4">Account Information</h2>
          <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-g8-body text-g8-text-secondary">Wallet Address</span>
                <span className="text-g8-body text-g8-text-primary font-mono">
                  {currentUser.walletAddress.slice(0, 6)}...{currentUser.walletAddress.slice(-4)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-g8-body text-g8-text-secondary">World ID Status</span>
                <span className={`text-g8-body font-medium ${currentUser.isWorldIdVerified ? 'text-g8-success' : 'text-g8-error'}`}>
                  {currentUser.isWorldIdVerified ? '✅ Verified' : '❌ Not Verified'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-g8-body text-g8-text-secondary">Reputation Level</span>
                <span className="text-g8-body text-g8-text-primary font-medium">{currentUser.reputationLevel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-g8-body text-g8-text-secondary">Total Trades</span>
                <span className="text-g8-body text-g8-text-primary font-medium">{currentUser.totalTrades}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-g8-body text-g8-text-secondary">Total Volume</span>
                <span className="text-g8-body text-g8-text-primary font-medium">${currentUser.totalVolume.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-4xl mb-2">👤</div>
              <p className="text-g8-body text-g8-text-secondary">No profile data available</p>
            </div>
          )}
        </div>

        {/* My Tokens */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6">
          <h2 className="text-g8-h2 text-g8-text-primary font-semibold mb-4">My Tokens</h2>
          {tokensLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-g8-surface2 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : tokens.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🪙</div>
              <p className="text-g8-body text-g8-text-secondary">No tokens created yet</p>
              <p className="text-g8-caption text-g8-text-secondary">Start by creating your first token</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tokens.slice(0, 5).map((token) => (
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

        {/* Settings */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6">
          <h2 className="text-g8-h2 text-g8-text-primary font-semibold mb-4">Settings</h2>
          <div className="space-y-4">
            <button className="w-full text-left p-4 bg-g8-surface2 rounded-lg hover:bg-g8-surface2/80 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-g8-body text-g8-text-primary font-medium">Notifications</h3>
                  <p className="text-g8-caption text-g8-text-secondary">Manage your notification preferences</p>
                </div>
                <span className="text-g8-text-secondary">→</span>
              </div>
            </button>
            
            <button className="w-full text-left p-4 bg-g8-surface2 rounded-lg hover:bg-g8-surface2/80 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-g8-body text-g8-text-primary font-medium">Privacy</h3>
                  <p className="text-g8-caption text-g8-text-secondary">Control your privacy settings</p>
                </div>
                <span className="text-g8-text-secondary">→</span>
              </div>
            </button>
            
            <button className="w-full text-left p-4 bg-g8-surface2 rounded-lg hover:bg-g8-surface2/80 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-g8-body text-g8-text-primary font-medium">Security</h3>
                  <p className="text-g8-caption text-g8-text-secondary">Manage your security settings</p>
                </div>
                <span className="text-g8-text-secondary">→</span>
              </div>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full bg-g8-error/20 text-g8-error font-medium py-4 px-6 rounded-g8-lg border border-g8-error/50 hover:bg-g8-error/30 transition-all duration-200">
          Logout
        </button>
      </div>
    </G8AppLayout>
  )
}

