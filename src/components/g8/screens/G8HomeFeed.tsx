'use client'

import React, { useState } from 'react'
import { G8Column, G8Row } from '@/components/ui/g8-layout'
import { G8SearchPill } from '@/components/ui/g8-search-pill'
import { G8SegmentedControl } from '@/components/ui/g8-segmented-control'
import { G8TokenRow } from '@/components/ui/g8-token-row'
import { G8Button } from '@/components/ui/g8-button'
import { G8Card } from '@/components/ui/g8-card'
import { G8Badge } from '@/components/ui/g8-badge'
import { 
  Plus, 
  TrendingUp, 
  TrendingDown,
  Search,
  Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Token {
  id: string
  avatar?: string
  name: string
  symbol: string
  price: string
  spark: 'up' | 'down'
}

interface G8HomeFeedProps {
  className?: string
}

export const G8HomeFeed = ({ className }: G8HomeFeedProps) => {
  const [activeSegment, setActiveSegment] = useState('new')
  const [searchValue, setSearchValue] = useState('')

  // Mock token data
  const tokens: Token[] = [
    {
      id: '1',
      name: 'WORLD CAT',
      symbol: 'WCAT',
      price: '0.042 WLD',
      spark: 'up'
    },
    {
      id: '2',
      name: 'G8 DOGE',
      symbol: 'G8D',
      price: '0.007 WLD',
      spark: 'down'
    },
    {
      id: '3',
      name: 'MOON TOKEN',
      symbol: 'MOON',
      price: '0.123 WLD',
      spark: 'up'
    },
    {
      id: '4',
      name: 'DIAMOND HANDS',
      symbol: 'DIAMOND',
      price: '0.089 WLD',
      spark: 'up'
    }
  ]

  const segments = [
    { key: 'cap', label: 'Market Cap' },
    { key: 'vol', label: 'Volume' },
    { key: 'new', label: 'Latest' }
  ]

  const handleSearch = (value: string) => {
    setSearchValue(value)
    // TODO: Implement search logic
  }

  const handleTokenClick = (tokenId: string) => {
    // TODO: Navigate to token details
    console.log('Navigate to token:', tokenId)
  }

  return (
    <div className={cn("min-h-screen bg-g8-bg text-g8-text-primary", className)}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-g8-bg/90 backdrop-blur-md border-b border-g8-stroke">
        <div className="p-g8-lg">
          <G8Row gap="md" align="center" justify="between">
            {/* G8 Logo */}
            <div className="flex items-center gap-g8-sm">
              <h1 className="text-g8-display font-bold text-g8-text-primary">
                G8
              </h1>
              <G8Badge variant="live" size="sm" className="animate-pulse">
                LIVE
              </G8Badge>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <G8SearchPill
                placeholder="Search tokens, creators…"
                value={searchValue}
                onSubmit={handleSearch}
              />
            </div>

            {/* Actions */}
            <G8Row gap="sm">
              <G8Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </G8Button>
              <G8Button variant="primary" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Create
              </G8Button>
            </G8Row>
          </G8Row>
        </div>
      </div>

      {/* Content */}
      <div className="p-g8-lg">
        <G8Column gap="md">
          {/* Segmented Control */}
          <G8SegmentedControl
            segments={segments}
            active={activeSegment}
            onSegmentChange={setActiveSegment}
          />

          {/* Token List */}
          <G8Card variant="default" size="sm">
            <G8Column gap="xs">
              {tokens.map((token) => (
                <G8TokenRow
                  key={token.id}
                  avatar={token.avatar}
                  name={token.name}
                  symbol={token.symbol}
                  price={token.price}
                  spark={token.spark}
                  onClick={() => handleTokenClick(token.id)}
                />
              ))}
            </G8Column>
          </G8Card>

          {/* Empty State (if no tokens) */}
          {tokens.length === 0 && (
            <G8Card variant="default" size="lg">
              <div className="text-center py-g8-xxl">
                <div className="text-g8-text-secondary text-g8-body mb-g8-md">
                  No tokens found
                </div>
                <G8Button variant="primary">
                  Discover Tokens
                </G8Button>
              </div>
            </G8Card>
          )}
        </G8Column>
      </div>
    </div>
  )
}
