'use client'

import React, { useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Activity } from 'lucide-react'

interface PortfolioData {
  totalValue: number
  totalPnl: number
  pnlPercentage: number
  assets: {
    symbol: string
    amount: number
    value: number
    pnl: number
    pnlPercentage: number
    allocation: number
  }[]
  performance: {
    day: number
    week: number
    month: number
    allTime: number
  }
}

interface PortfolioAnalyticsProps {
  data: PortfolioData
  className?: string
}

export function PortfolioAnalytics({ data, className = '' }: PortfolioAnalyticsProps) {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'allTime'>('day')

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const getPnlColor = (value: number) => {
    return value >= 0 ? 'text-g8-success' : 'text-g8-error'
  }

  const getPnlBgColor = (value: number) => {
    return value >= 0 ? 'bg-g8-success/10' : 'bg-g8-error/10'
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center space-x-2">
        <BarChart3 className="w-5 h-5 text-g8-text-primary" />
        <h3 className="text-g8-h3 text-g8-text-primary font-semibold">Portfolio Analytics</h3>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Value */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-g8-text-secondary" />
            <span className="text-g8-caption text-g8-text-secondary">Total Value</span>
          </div>
          <p className="text-g8-h2 text-g8-text-primary font-bold">
            {formatCurrency(data.totalValue)}
          </p>
        </div>

        {/* Total PnL */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            {data.totalPnl >= 0 ? (
              <TrendingUp className="w-4 h-4 text-g8-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-g8-error" />
            )}
            <span className="text-g8-caption text-g8-text-secondary">Total P&L</span>
          </div>
          <p className={`text-g8-h2 font-bold ${getPnlColor(data.totalPnl)}`}>
            {formatCurrency(data.totalPnl)}
          </p>
          <p className={`text-g8-caption ${getPnlColor(data.totalPnl)}`}>
            {formatPercentage(data.pnlPercentage)}
          </p>
        </div>

        {/* Performance */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-g8-text-secondary" />
            <span className="text-g8-caption text-g8-text-secondary">Performance</span>
          </div>
          <p className={`text-g8-h2 font-bold ${getPnlColor(data.performance[timeframe])}`}>
            {formatPercentage(data.performance[timeframe])}
          </p>
          <p className="text-g8-caption text-g8-text-secondary">
            {timeframe === 'day' && '24h'}
            {timeframe === 'week' && '7d'}
            {timeframe === 'month' && '30d'}
            {timeframe === 'allTime' && 'All time'}
          </p>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex space-x-2">
        {(['day', 'week', 'month', 'allTime'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setTimeframe(period)}
            className={`px-3 py-2 rounded-g8-lg text-g8-caption font-medium transition-colors ${
              timeframe === period
                ? 'bg-g8-primary text-g8-bg'
                : 'bg-g8-surface border border-g8-stroke text-g8-text-primary hover:bg-g8-surface2'
            }`}
          >
            {period === 'day' && '24h'}
            {period === 'week' && '7d'}
            {period === 'month' && '30d'}
            {period === 'allTime' && 'All'}
          </button>
        ))}
      </div>

      {/* Assets Breakdown */}
      <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <PieChart className="w-4 h-4 text-g8-text-primary" />
          <h4 className="text-g8-body text-g8-text-primary font-semibold">Asset Allocation</h4>
        </div>

        <div className="space-y-3">
          {data.assets.map((asset, index) => (
            <div key={asset.symbol} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                />
                <div>
                  <p className="text-g8-body text-g8-text-primary font-medium">
                    {asset.symbol}
                  </p>
                  <p className="text-g8-caption text-g8-text-secondary">
                    {asset.amount.toFixed(4)} tokens
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-g8-body text-g8-text-primary font-medium">
                  {formatCurrency(asset.value)}
                </p>
                <div className="flex items-center space-x-2">
                  <span className={`text-g8-caption ${getPnlColor(asset.pnl)}`}>
                    {formatPercentage(asset.pnlPercentage)}
                  </span>
                  <span className="text-g8-caption text-g8-text-secondary">
                    ({asset.allocation.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-4 h-4 text-g8-text-primary" />
          <h4 className="text-g8-body text-g8-text-primary font-semibold">Performance Chart</h4>
        </div>
        
        <div className="h-48 bg-g8-surface2 rounded-g8-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-g8-text-secondary mx-auto mb-2" />
            <p className="text-g8-body text-g8-text-secondary">Chart visualization</p>
            <p className="text-g8-caption text-g8-text-secondary">
              Interactive performance chart would be rendered here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
