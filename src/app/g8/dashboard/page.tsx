'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, TrendingUp, TrendingDown, Plus, Filter, Eye, BarChart3, Coins, Wallet, ArrowUpRight, ArrowDownRight, Star, Clock, Users, Rocket } from 'lucide-react'
import G8AppLayout from '@/components/g8/G8AppLayout'

export default function DashboardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'cap' | 'vol' | 'new'>('new')

  // Mock data - in real app this would come from API
  const mockTokens = [
    {
      id: '1',
      name: 'WORLD CAT',
      symbol: 'WCAT',
      price: '0.042 WLD',
      change: '+15.5%',
      changeType: 'up' as const,
      volume: '$500K',
      marketCap: '$1.2M',
      isLive: true,
      timeSinceLaunch: '2h'
    },
    {
      id: '2',
      name: 'DOGE',
      symbol: 'DOGE',
      price: '0.08 WLD',
      change: '-2.3%',
      changeType: 'down' as const,
      volume: '$2.1M',
      marketCap: '$12.5B',
      isLive: true,
      timeSinceLaunch: '1d'
    },
    {
      id: '3',
      name: 'PEPE',
      symbol: 'PEPE',
      price: '0.000012 WLD',
      change: '+8.7%',
      changeType: 'up' as const,
      volume: '$800K',
      marketCap: '$5.2B',
      isLive: true,
      timeSinceLaunch: '3d'
    }
  ]

  const filteredTokens = mockTokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <G8AppLayout>
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header with Search */}
        <div className="flex items-center justify-between">
          <h1 className="text-g8-display text-g8-text-primary font-bold">G8</h1>
          <div className="relative flex-1 max-w-xs ml-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-g8-text-secondary" />
            <input
              type="text"
              placeholder="Search tokens, creators…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-g8-surface border border-g8-stroke rounded-g8-md pl-10 pr-4 py-2 text-g8-body text-g8-text-primary placeholder-g8-text-secondary focus:outline-none focus:border-g8-text-primary/50"
            />
          </div>
        </div>

        {/* Segmented Control */}
        <div className="flex bg-g8-surface border border-g8-stroke rounded-g8-md p-1">
          {[
            { key: 'cap', label: 'Market Cap' },
            { key: 'vol', label: 'Volume' },
            { key: 'new', label: 'Latest' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedFilter(key as any)}
              className={`flex-1 py-2 px-3 rounded-g8-sm text-g8-body font-medium transition-all duration-200 ${
                selectedFilter === key
                  ? 'bg-g8-text-primary text-g8-bg'
                  : 'text-g8-text-secondary hover:text-g8-text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Token List */}
        <div className="space-y-3">
          {filteredTokens.map((token) => (
            <div
              key={token.id}
              className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4 hover:border-g8-text-primary/20 transition-all duration-200 cursor-pointer"
              onClick={() => router.push(`/g8/token/${token.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-g8 rounded-full flex items-center justify-center">
                    <span className="text-g8-bg font-bold text-sm">{token.symbol[0]}</span>
                  </div>
                  <div>
                    <div className="text-g8-h2 text-g8-text-primary font-semibold">{token.name}</div>
                    <div className="text-g8-caption text-g8-text-secondary">{token.symbol}</div>
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
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => router.push('/g8/create')}
            className="bg-gradient-g8 text-g8-bg font-medium py-4 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Token</span>
          </button>
          
          <button 
            onClick={() => router.push('/g8/discovery')}
            className="bg-g8-surface text-g8-text-primary border border-g8-stroke font-medium py-4 px-6 rounded-g8-lg hover:border-g8-text-primary/20 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Eye className="h-5 w-5" />
            <span>Discover</span>
          </button>
        </div>

        {/* Status Cards */}
        <div className="space-y-3">
          <div className="bg-g8-success/20 border border-g8-success/50 rounded-g8-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="text-g8-success">✅</span>
              <div>
                <div className="text-g8-body text-g8-text-primary font-medium">World ID Verified</div>
                <div className="text-g8-caption text-g8-text-secondary">Identity verified</div>
              </div>
            </div>
          </div>
          
          <div className="bg-g8-success/20 border border-g8-success/50 rounded-g8-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="text-g8-success">🔐</span>
              <div>
                <div className="text-g8-body text-g8-text-primary font-medium">Wallet Connected</div>
                <div className="text-g8-caption text-g8-text-secondary">Ready to trade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </G8AppLayout>
  )
}
