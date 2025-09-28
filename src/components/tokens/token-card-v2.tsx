import React from 'react'
import { cn } from '@/lib/utils'
import { CardV2 } from '@/components/ui/card-v2'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react'

export interface TokenData {
  id: string
  name: string
  ticker: string
  logo: string
  price: number
  priceChange: number
  marketCap: string
  volume: string
  timeSinceLaunch: string
  isLive: boolean
  chartData?: number[]
  borderColor?: string
  bgColor?: string
  shadowColor?: string
}

export interface TokenCardV2Props {
  token: TokenData
  onClick?: (token: TokenData) => void
  variant?: 'default' | 'compact' | 'detailed'
  showChart?: boolean
  className?: string
}

export const TokenCardV2: React.FC<TokenCardV2Props> = ({
  token,
  onClick,
  variant = 'default',
  showChart = true,
  className
}) => {
  const isPositive = token.priceChange >= 0
  
  const handleClick = () => {
    onClick?.(token)
  }

  if (variant === 'compact') {
    return (
      <CardV2
        className={cn(
          'cursor-pointer hover:scale-105 transition-all duration-200',
          token.borderColor,
          token.bgColor,
          className
        )}
        onClick={handleClick}
        hover
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-sm font-bold">
              {token.logo}
            </div>
            <div>
              <div className="font-semibold text-white">{token.ticker}</div>
              <div className="text-xs text-gray-400">{token.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-white">${token.price.toFixed(4)}</div>
            <div className={cn(
              'text-xs flex items-center',
              isPositive ? 'text-green-400' : 'text-red-400'
            )}>
              {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(token.priceChange).toFixed(2)}%
            </div>
          </div>
        </div>
      </CardV2>
    )
  }

  if (variant === 'detailed') {
    return (
      <CardV2
        className={cn(
          'cursor-pointer hover:scale-105 transition-all duration-200',
          token.borderColor,
          token.bgColor,
          className
        )}
        onClick={handleClick}
        hover
        glow
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-lg font-bold">
                {token.logo}
              </div>
              <div>
                <div className="font-semibold text-white text-lg">{token.name}</div>
                <div className="text-sm text-gray-400">{token.ticker}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">${token.price.toFixed(4)}</div>
              <div className={cn(
                'text-sm flex items-center justify-end',
                isPositive ? 'text-green-400' : 'text-red-400'
              )}>
                {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {Math.abs(token.priceChange).toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-xs text-gray-400">Market Cap</div>
                <div className="text-sm font-semibold text-white">{token.marketCap}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-xs text-gray-400">Volume</div>
                <div className="text-sm font-semibold text-white">{token.volume}</div>
              </div>
            </div>
          </div>

          {/* Status and Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">{token.timeSinceLaunch}</span>
            </div>
            <div className="flex items-center space-x-2">
              {token.isLive && (
                <Badge className="bg-green-500 text-white animate-pulse">LIVE</Badge>
              )}
              <Badge variant="outline" className="text-gray-400 border-gray-600">
                {token.ticker}
              </Badge>
            </div>
          </div>

          {/* Chart placeholder */}
          {showChart && (
            <div className="h-16 bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-gray-500 text-sm">Chart Placeholder</div>
            </div>
          )}
        </div>
      </CardV2>
    )
  }

  // Default variant
  return (
    <CardV2
      className={cn(
        'cursor-pointer hover:scale-105 transition-all duration-200',
        token.borderColor,
        token.bgColor,
        className
      )}
      onClick={handleClick}
      hover
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-sm font-bold">
              {token.logo}
            </div>
            <div>
              <div className="font-semibold text-white">{token.name}</div>
              <div className="text-sm text-gray-400">{token.ticker}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-white">${token.price.toFixed(4)}</div>
            <div className={cn(
              'text-sm flex items-center',
              isPositive ? 'text-green-400' : 'text-red-400'
            )}>
              {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(token.priceChange).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-300">
          <div>MC: {token.marketCap}</div>
          <div>Vol: {token.volume}</div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{token.timeSinceLaunch}</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          {token.isLive && (
            <Badge className="bg-green-500 text-white animate-pulse">LIVE</Badge>
          )}
          <Badge variant="outline" className="text-gray-400 border-gray-600">
            {token.ticker}
          </Badge>
        </div>
      </div>
    </CardV2>
  )
}
