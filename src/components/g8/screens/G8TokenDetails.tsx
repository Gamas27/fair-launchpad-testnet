'use client'

import React from 'react'
import { G8Column, G8Row } from '@/components/ui/g8-layout'
import { G8Card } from '@/components/ui/g8-card'
import { G8Button } from '@/components/ui/g8-button'
import { G8InfoCard } from '@/components/ui/g8-info-card'
import { G8Badge } from '@/components/ui/g8-badge'
import { 
  ArrowLeft, 
  ExternalLink, 
  Copy,
  TrendingUp,
  TrendingDown,
  Share,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface G8TokenDetailsProps {
  tokenId?: string
  onBack?: () => void
  className?: string
}

export const G8TokenDetails = ({ 
  tokenId = '1',
  onBack,
  className 
}: G8TokenDetailsProps) => {
  // Mock token data
  const token = {
    id: '1',
    name: 'WORLD CAT',
    symbol: 'WCAT',
    logo: '',
    price: '0.042 WLD',
    change: '+12.5%',
    changeDirection: 'up' as 'up' | 'down',
    marketCap: '$1.2M',
    volume: '$450K',
    holders: '1,234',
    contract: '0x1234...abcd',
    raiseGoal: '2000 WLD (65%)',
    bondingCurve: 'Progress bar • 65%',
    links: ['X', 'Website', 'Telegram']
  }

  const infoRows = [
    { label: 'Contract', value: token.contract, copy: true },
    { label: 'Raise goal', value: token.raiseGoal },
    { label: 'Bonding curve', value: token.bondingCurve },
    { label: 'Links', value: token.links.join(' • ') }
  ]

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
    // TODO: Add toast notification
  }

  return (
    <div className={cn("min-h-screen bg-g8-bg text-g8-text-primary", className)}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-g8-bg/90 backdrop-blur-md border-b border-g8-stroke">
        <div className="p-g8-lg">
          <G8Row gap="md" align="center" justify="between">
            <G8Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </G8Button>
            
            <div className="flex items-center gap-g8-sm">
              <h1 className="text-g8-h1 font-semibold text-g8-text-primary">
                Token Profile
              </h1>
            </div>

            <G8Row gap="sm">
              <G8Button variant="ghost" size="icon">
                <Share className="h-4 w-4" />
              </G8Button>
              <G8Button variant="ghost" size="icon">
                <Star className="h-4 w-4" />
              </G8Button>
            </G8Row>
          </G8Row>
        </div>
      </div>

      {/* Content */}
      <div className="p-g8-lg">
        <G8Column gap="md">
          {/* Token Header */}
          <G8Card variant="gradient" size="lg">
            <G8Column gap="md">
              <G8Row gap="md" align="center">
                {/* Token Logo */}
                <div className="w-16 h-16 rounded-full bg-g8-surface border border-g8-stroke flex items-center justify-center">
                  <span className="text-g8-text-primary text-xl font-bold">
                    {token.symbol.charAt(0)}
                  </span>
                </div>

                {/* Token Info */}
                <G8Column gap="xs">
                  <G8Row gap="sm" align="center">
                    <h2 className="text-g8-h2 font-semibold text-g8-text-primary">
                      {token.name}
                    </h2>
                    <G8Badge variant="gradient" size="sm">
                      Verified
                    </G8Badge>
                  </G8Row>
                  <p className="text-g8-caption text-g8-text-secondary">
                    {token.symbol} • {token.holders} holders
                  </p>
                </G8Column>
              </G8Row>

              {/* Price Info */}
              <G8Row gap="md" align="center" justify="between">
                <G8Column gap="xs">
                  <p className="text-g8-h1 font-bold text-g8-text-primary">
                    {token.price}
                  </p>
                  <G8Row gap="xs" align="center">
                    {token.changeDirection === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-g8-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-g8-error" />
                    )}
                    <span className={cn(
                      "text-g8-body font-medium",
                      token.changeDirection === 'up' ? "text-g8-success" : "text-g8-error"
                    )}>
                      {token.change}
                    </span>
                  </G8Row>
                </G8Column>

                <G8Column gap="xs" align="end">
                  <p className="text-g8-body text-g8-text-secondary">
                    Market Cap
                  </p>
                  <p className="text-g8-body font-semibold text-g8-text-primary">
                    {token.marketCap}
                  </p>
                </G8Column>
              </G8Row>
            </G8Column>
          </G8Card>

          {/* Token Information */}
          <G8InfoCard
            title="Token Information"
            rows={infoRows}
          />

          {/* Action Buttons */}
          <G8Row gap="sm">
            <G8Button variant="primary" size="lg" className="flex-1">
              Buy {token.symbol}
            </G8Button>
            <G8Button variant="secondary" size="lg" className="flex-1">
              Sell {token.symbol}
            </G8Button>
          </G8Row>

          {/* Additional Info */}
          <G8Card variant="default" size="md">
            <G8Column gap="md">
              <h3 className="text-g8-h2 font-semibold text-g8-text-primary">
                About {token.name}
              </h3>
              <p className="text-g8-body text-g8-text-secondary">
                {token.name} is a community-driven token built on the G8 platform. 
                It represents the collective vision of our community and provides 
                utility within the G8 ecosystem.
              </p>
            </G8Column>
          </G8Card>
        </G8Column>
      </div>
    </div>
  )
}
