'use client'

import React, { useState } from 'react'
import G8AppLayout from '@/components/g8/G8AppLayout'
import { useG8User } from '@/lib/state/context'
import { 
  SlippageProtection, 
  LimitOrders, 
  PortfolioAnalytics, 
  AdvancedCharting 
} from '@/components/trading'

// Mock data for demo purposes
const mockChartData = [
  { timestamp: Date.now() - 3600000, open: 0.042, high: 0.045, low: 0.041, close: 0.044, volume: 125000 },
  { timestamp: Date.now() - 3000000, open: 0.044, high: 0.047, low: 0.043, close: 0.046, volume: 98000 },
  { timestamp: Date.now() - 2400000, open: 0.046, high: 0.048, low: 0.044, close: 0.045, volume: 156000 },
  { timestamp: Date.now() - 1800000, open: 0.045, high: 0.047, low: 0.043, close: 0.046, volume: 89000 },
  { timestamp: Date.now() - 1200000, open: 0.046, high: 0.049, low: 0.045, close: 0.048, volume: 203000 },
  { timestamp: Date.now() - 600000, open: 0.048, high: 0.050, low: 0.047, close: 0.049, volume: 178000 },
  { timestamp: Date.now(), open: 0.049, high: 0.051, low: 0.048, close: 0.050, volume: 145000 }
]

const mockPortfolioData = {
  totalValue: 12547.89,
  totalPnl: 2347.89,
  pnlPercentage: 23.0,
  assets: [
    { symbol: 'WCAT', amount: 10000, value: 5000, pnl: 1000, pnlPercentage: 25.0, allocation: 39.8 },
    { symbol: 'WLD', amount: 2500, value: 5375, pnl: 375, pnlPercentage: 7.5, allocation: 42.8 },
    { symbol: 'ETH', amount: 0.5, value: 1625, pnl: 125, pnlPercentage: 8.3, allocation: 12.9 },
    { symbol: 'USDC', amount: 547.89, value: 547.89, pnl: 0, pnlPercentage: 0, allocation: 4.4 }
  ],
  performance: {
    day: 2.3,
    week: 8.7,
    month: 23.0,
    allTime: 45.2
  }
}

const mockLimitOrders = [
  {
    id: '1',
    tokenSymbol: 'WCAT',
    type: 'buy' as const,
    amount: 5000,
    price: 0.045,
    status: 'pending' as const,
    createdAt: new Date(Date.now() - 3600000),
    expiresAt: new Date(Date.now() + 86400000)
  },
  {
    id: '2',
    tokenSymbol: 'WCAT',
    type: 'sell' as const,
    amount: 2000,
    price: 0.055,
    status: 'pending' as const,
    createdAt: new Date(Date.now() - 1800000)
  }
]

export default function AdvancedTradingPage() {
  const { user: currentUser, isAuthenticated } = useG8User()
  const [slippage, setSlippage] = useState(0.5)
  const [selectedToken, setSelectedToken] = useState('WCAT')

  // Since World ID is mandatory, redirect to onboarding if not authenticated
  if (!isAuthenticated || !currentUser) {
    return (
      <G8AppLayout>
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-g8-surface2 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-g8-text-secondary text-2xl">🔒</span>
          </div>
          <h1 className="text-g8-h1 text-g8-text-primary font-bold mb-2">World ID Required</h1>
          <p className="text-g8-body text-g8-text-secondary mb-6">
            Please complete World ID verification to access advanced trading features.
          </p>
          <button 
            onClick={() => window.location.href = '/g8/onboarding'}
            className="bg-gradient-g8 text-g8-bg px-6 py-3 rounded-g8-lg font-medium hover:opacity-90 transition-opacity"
          >
            Complete World ID Verification
          </button>
        </div>
      </G8AppLayout>
    )
  }

  const handleCreateOrder = (order: any) => {
    console.log('Creating limit order:', order)
    // In a real app, this would call an API to create the order
  }

  const handleCancelOrder = (orderId: string) => {
    console.log('Cancelling order:', orderId)
    // In a real app, this would call an API to cancel the order
  }

  const handleTimeframeChange = (timeframe: string) => {
    console.log('Timeframe changed:', timeframe)
    // In a real app, this would fetch new chart data
  }

  const handleIndicatorToggle = (indicator: string) => {
    console.log('Indicator toggled:', indicator)
    // In a real app, this would update chart indicators
  }

  return (
    <G8AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-g8-h1 text-g8-text-primary font-bold mb-2">Advanced Trading</h1>
            <p className="text-g8-body text-g8-text-secondary">
              Professional trading tools with slippage protection, limit orders, and analytics
            </p>
          </div>
          <SlippageProtection
            currentSlippage={slippage}
            onSlippageChange={setSlippage}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2">
            <AdvancedCharting
              data={mockChartData}
              symbol={selectedToken}
              onTimeframeChange={handleTimeframeChange}
              onIndicatorToggle={handleIndicatorToggle}
            />
          </div>

          {/* Right Column - Portfolio & Orders */}
          <div className="space-y-6">
            <PortfolioAnalytics data={mockPortfolioData} />
            <LimitOrders
              orders={mockLimitOrders}
              onCreateOrder={handleCreateOrder}
              onCancelOrder={handleCancelOrder}
            />
          </div>
        </div>

        {/* Trading Features Info */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6">
          <h3 className="text-g8-h3 text-g8-text-primary font-semibold mb-4">Advanced Trading Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-g8-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-g8-primary text-xl">🛡️</span>
              </div>
              <h4 className="text-g8-body text-g8-text-primary font-medium mb-1">Slippage Protection</h4>
              <p className="text-g8-caption text-g8-text-secondary">
                Set custom slippage tolerance to protect against price movements
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-g8-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-g8-primary text-xl">⏰</span>
              </div>
              <h4 className="text-g8-body text-g8-text-primary font-medium mb-1">Limit Orders</h4>
              <p className="text-g8-caption text-g8-text-secondary">
                Set buy/sell orders at specific prices with expiration dates
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-g8-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-g8-primary text-xl">📊</span>
              </div>
              <h4 className="text-g8-body text-g8-text-primary font-medium mb-1">Portfolio Analytics</h4>
              <p className="text-g8-caption text-g8-text-secondary">
                Track performance, P&L, and asset allocation across your portfolio
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-g8-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-g8-primary text-xl">📈</span>
              </div>
              <h4 className="text-g8-body text-g8-text-primary font-medium mb-1">Advanced Charts</h4>
              <p className="text-g8-caption text-g8-text-secondary">
                Professional charting with technical indicators and multiple timeframes
              </p>
            </div>
          </div>
        </div>
      </div>
    </G8AppLayout>
  )
}
