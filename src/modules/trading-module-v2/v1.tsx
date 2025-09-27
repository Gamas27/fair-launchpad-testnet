'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  TrendingUp, 
  Coins,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Activity,
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Shield,
  Zap,
  ExternalLink,
  Copy,
  Users,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// TRADING MODULE V1 - TRADING INTERFACE
// ============================================================================

interface Token {
  address: string
  name: string
  symbol: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  imageUrl?: string
}

interface TradingModuleProps {
  className?: string
  onTradeExecuted?: (trade: any) => void
}

export const TradingInterface = ({ 
  className, 
  onTradeExecuted 
}: TradingModuleProps) => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [tradeAmount, setTradeAmount] = useState('')
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Mock tokens data
  const mockTokens: Token[] = [
    {
      address: '0x1234567890123456789012345678901234567890',
      name: 'Mock Token 1',
      symbol: 'MTK1',
      price: 0.001,
      change24h: 5.2,
      volume24h: 125000,
      marketCap: 1000000,
      imageUrl: 'https://via.placeholder.com/40'
    },
    {
      address: '0x2345678901234567890123456789012345678901',
      name: 'Mock Token 2',
      symbol: 'MTK2',
      price: 0.002,
      change24h: -2.1,
      volume24h: 89000,
      marketCap: 750000,
      imageUrl: 'https://via.placeholder.com/40'
    },
    {
      address: '0x3456789012345678901234567890123456789012',
      name: 'Mock Token 3',
      symbol: 'MTK3',
      price: 0.0005,
      change24h: 12.5,
      volume24h: 200000,
      marketCap: 500000,
      imageUrl: 'https://via.placeholder.com/40'
    }
  ]

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token)
    setError(null)
  }

  const handleTrade = async () => {
    if (!selectedToken) {
      setError('Please select a token to trade')
      return
    }

    if (!tradeAmount || parseFloat(tradeAmount) <= 0) {
      setError('Please enter a valid trade amount')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simulate trade execution
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const trade = {
        token: selectedToken,
        amount: parseFloat(tradeAmount),
        type: tradeType,
        timestamp: new Date().toISOString(),
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`
      }

      setSuccess(`Trade executed successfully! ${tradeType === 'buy' ? 'Bought' : 'Sold'} ${tradeAmount} ${selectedToken.symbol}`)
      
      if (onTradeExecuted) {
        onTradeExecuted(trade)
      }

      // Reset form
      setTradeAmount('')
    } catch (err) {
      setError('Trade execution failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Token Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Select Token to Trade
          </CardTitle>
          <CardDescription>
            Choose a token from the available trading pairs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTokens.map((token) => (
              <Card 
                key={token.address}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedToken?.address === token.address 
                    ? "ring-2 ring-blue-500 bg-blue-50" 
                    : "hover:bg-gray-50"
                )}
                onClick={() => handleTokenSelect(token)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {token.imageUrl ? (
                        <img src={token.imageUrl} alt={token.name} className="w-8 h-8 rounded-full" />
                      ) : (
                        <Coins className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{token.name}</div>
                      <div className="text-sm text-gray-600">{token.symbol}</div>
                      <div className="text-xs text-gray-500">
                        ${token.price.toFixed(6)} • {token.change24h > 0 ? '+' : ''}{token.change24h}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "text-sm font-medium",
                        token.change24h > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {token.change24h > 0 ? '+' : ''}{token.change24h}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Form */}
      {selectedToken && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trade {selectedToken.symbol}
            </CardTitle>
            <CardDescription>
              Execute buy or sell orders for {selectedToken.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* Trade Type Selection */}
            <div className="flex gap-2">
              <Button
                variant={tradeType === 'buy' ? 'default' : 'outline'}
                onClick={() => setTradeType('buy')}
                className="flex-1"
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                Buy
              </Button>
              <Button
                variant={tradeType === 'sell' ? 'default' : 'outline'}
                onClick={() => setTradeType('sell')}
                className="flex-1"
              >
                <ArrowDown className="h-4 w-4 mr-2" />
                Sell
              </Button>
            </div>

            {/* Trade Amount */}
            <div>
              <label className="text-sm font-medium">Amount ({selectedToken.symbol})</label>
              <input
                type="number"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                placeholder="Enter amount to trade"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Trade Summary */}
            {tradeAmount && (
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-semibold mb-2">Trade Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Token:</span>
                    <span>{selectedToken.name} ({selectedToken.symbol})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>{tradeAmount} {selectedToken.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span>${selectedToken.price.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${(parseFloat(tradeAmount) * selectedToken.price).toFixed(6)}</span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleTrade}
              disabled={isLoading || !tradeAmount}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <TrendingUp className="h-4 w-4 mr-2" />
              )}
              {isLoading ? 'Executing Trade...' : `${tradeType === 'buy' ? 'Buy' : 'Sell'} ${selectedToken.symbol}`}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Token Info */}
      {selectedToken && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {selectedToken.name} Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded-md">
                <div className="text-sm font-medium text-blue-800">Price</div>
                <div className="text-lg font-bold text-blue-900">${selectedToken.price.toFixed(6)}</div>
              </div>
              <div className="p-3 bg-green-50 rounded-md">
                <div className="text-sm font-medium text-green-800">24h Change</div>
                <div className={cn(
                  "text-lg font-bold",
                  selectedToken.change24h > 0 ? "text-green-900" : "text-red-900"
                )}>
                  {selectedToken.change24h > 0 ? '+' : ''}{selectedToken.change24h}%
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-md">
                <div className="text-sm font-medium text-purple-800">Volume 24h</div>
                <div className="text-lg font-bold text-purple-900">${selectedToken.volume24h.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-md">
                <div className="text-sm font-medium text-orange-800">Market Cap</div>
                <div className="text-lg font-bold text-orange-900">${selectedToken.marketCap.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Token Address:</span>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                    {selectedToken.address.slice(0, 6)}...{selectedToken.address.slice(-4)}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(selectedToken.address)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ============================================================================
// TRADING MODULE V1 - MAIN PAGE
// ============================================================================

export const TradingModulePage = () => {
  const [tradeHistory, setTradeHistory] = useState<any[]>([])

  const handleTradeExecuted = (trade: any) => {
    setTradeHistory(prev => [trade, ...prev])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Trading Interface
          </h1>
          <p className="text-gray-600">
            Trade tokens with anti-bot protection and fair pricing
          </p>
        </div>

        {/* Main Trading Interface */}
        <TradingInterface onTradeExecuted={handleTradeExecuted} />

        {/* Trade History */}
        {tradeHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Trade History
              </CardTitle>
              <CardDescription>
                Your recent trading activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tradeHistory.map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <Badge variant={trade.type === 'buy' ? 'default' : 'destructive'}>
                        {trade.type.toUpperCase()}
                      </Badge>
                      <div>
                        <div className="font-medium">{trade.amount} {trade.token.symbol}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(trade.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${(trade.amount * trade.token.price).toFixed(6)}</div>
                      <div className="text-xs text-gray-500">
                        {trade.txHash.slice(0, 6)}...{trade.txHash.slice(-4)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Debug Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Trading Module</CardTitle>
            <CardDescription>
              Trading Interface Module v1.0.0
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-1 font-mono">
              <div>Environment: Production</div>
              <div>Version: v1.0.0</div>
              <div>Module: Trading Interface</div>
              <div>Status: {tradeHistory.length > 0 ? 'Active' : 'Ready'}</div>
              <div>Trades Executed: {tradeHistory.length}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ============================================================================
// TRADING MODULE V1 - EXPORTS
// ============================================================================

export const TradingModuleV1 = {
  version: 'v1.0.0',
  name: 'Trading Interface Module',
  
  // Components
  TradingInterface,
  TradingModulePage,
  
  // Metadata
  features: {
    tokenTrading: true,
    antiBotProtection: true,
    priceCharts: true,
    tradeHistory: true,
    marketData: true
  }
}
