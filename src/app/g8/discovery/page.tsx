'use client'

import React, { useState } from 'react'
import G8AppLayout from '@/components/g8/G8AppLayout'

export default function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  // Mock tokens for demo purposes
  const mockTokens = [
    {
      id: '1',
      name: 'WORLD CAT',
      ticker: 'WCAT',
      description: 'The purr-fect meme token',
      marketCap: '$1.2M',
      volume: '$500K',
      price: '0.042 WLD',
      change: '+15.5%',
      changeType: 'up' as const,
      isLive: true,
      timeSinceLaunch: '2h'
    },
    {
      id: '2',
      name: 'DOGE',
      ticker: 'DOGE',
      description: 'The original meme coin',
      marketCap: '$12.5B',
      volume: '$2.1M',
      price: '0.08 WLD',
      change: '-2.3%',
      changeType: 'down' as const,
      isLive: true,
      timeSinceLaunch: '1d'
    },
    {
      id: '3',
      name: 'PEPE',
      ticker: 'PEPE',
      description: 'The greenest meme',
      marketCap: '$5.2B',
      volume: '$800K',
      price: '0.000012 WLD',
      change: '+8.7%',
      changeType: 'up' as const,
      isLive: true,
      timeSinceLaunch: '3d'
    }
  ]

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'trending', label: 'Trending' },
    { id: 'new', label: 'New' },
    { id: 'top', label: 'Top' }
  ]

  // Filter tokens based on search and active filter
  const filteredTokens = mockTokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         token.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'trending' && token.changeType === 'up') ||
                         (activeFilter === 'new' && token.timeSinceLaunch.includes('h')) ||
                         (activeFilter === 'top' && parseFloat(token.marketCap.replace(/[$,]/g, '')) > 1000000)
    return matchesSearch && matchesFilter
  })

  return (
    <G8AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-g8-h1 text-g8-text-primary font-bold mb-2">Discovery</h1>
          <p className="text-g8-body text-g8-text-secondary">Explore tokens on G8</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search tokens, creators, contracts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-g8-surface border border-g8-stroke rounded-g8-lg px-4 py-3 text-g8-text-primary placeholder-g8-text-secondary focus:border-g8-text-primary/20 focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <span className="text-g8-text-secondary">🔍</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-g8-md whitespace-nowrap transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-gradient-g8 text-g8-bg'
                  : 'bg-g8-surface text-g8-text-secondary border border-g8-stroke hover:text-g8-text-primary'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Token List */}
        <div className="space-y-4">
          {filteredTokens.length === 0 ? (
            // Empty state
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-g8-body text-g8-text-secondary">No tokens found</p>
              <p className="text-g8-caption text-g8-text-secondary">Try adjusting your search or filters</p>
            </div>
          ) : (
            // Token list
            filteredTokens.map((token) => (
              <div key={token.id} className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-g8 rounded-full flex items-center justify-center">
                    <span className="text-g8-bg font-bold text-lg">{token.ticker.slice(0, 2)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-g8-body text-g8-text-primary font-semibold">{token.name}</h3>
                      <span className="text-g8-caption text-g8-text-secondary">{token.ticker}</span>
                      {token.isLive && (
                        <span className="bg-g8-success/20 text-g8-success text-g8-caption px-2 py-1 rounded-g8-sm">
                          Live
                        </span>
                      )}
                    </div>
                    <p className="text-g8-caption text-g8-text-secondary mt-1">{token.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-g8-caption text-g8-text-secondary">
                        {token.marketCap} • {token.volume}
                      </span>
                      <span className="text-g8-caption text-g8-text-secondary">
                        {token.timeSinceLaunch}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-g8-body text-g8-text-primary font-medium">{token.price}</div>
                    <div className={`text-g8-caption font-medium ${
                      token.changeType === 'up' ? 'text-g8-success' : 'text-g8-error'
                    }`}>
                      {token.change}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </G8AppLayout>
  )
}