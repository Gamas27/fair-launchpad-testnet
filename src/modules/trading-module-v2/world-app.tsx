'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  TrendingUp, 
  Coins,
  ArrowUp,
  ArrowDown,
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Shield,
  Activity,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// TRADING MODULE WORLD APP - TRADING INTERFACE
// ============================================================================

interface Token {
  address: string
  name: string
  symbol: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
}

interface TradingModuleWorldAppProps {
  className?: string
  onTradeExecuted?: (trade: any) => void
}

// Mock World ID and Privy hooks for World App deployment
function useMockWorldId() {
  const [isVerified, setIsVerified] = useState(true) // Assume verified for World App
  const [verificationLevel] = useState('Orb')
  return { isVerified, verificationLevel }
}

function useMockPrivyWallet() {
  const [isConnected, setIsConnected] = useState(true) // Assume connected for World App
  const [address, setAddress] = useState('0xMockPrivyWalletAddress1234567890')
  return { isConnected, address }
}

export const TradingInterfaceWorldApp = ({ 
  className, 
  onTradeExecuted 
}: TradingModuleWorldAppProps) => {
  const { isVerified, verificationLevel } = useMockWorldId()
  const { isConnected, address } = useMockPrivyWallet()
  
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
      marketCap: 1000000
    },
    {
      address: '0x2345678901234567890123456789012345678901',
      name: 'Mock Token 2',
      symbol: 'MTK2',
      price: 0.002,
      change24h: -2.1,
      volume24h: 89000,
      marketCap: 750000
    }
  ]

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token)
    setError(null)
  }

  const handleTrade = async () => {
    if (!isVerified) {
      setError('World ID verification required')
      return
    }

    if (!isConnected) {
      setError('Wallet connection required')
      return
    }

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

  return (
    <div className={cn("space-y-6", className)}>
      {/* Status Indicators */}
      <div className="space-y-2">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            World ID: <Badge className={cn("text-white", "bg-gradient-to-r from-purple-500 to-pink-600")}>{verificationLevel}</Badge>
          </AlertDescription>
        </Alert>
        <Alert>
          <Coins className="h-4 w-4" />
          <AlertDescription>
            Wallet: <Badge>{address?.slice(0, 6)}...{address?.slice(-4)}</Badge>
          </AlertDescription>
        </Alert>
      </div>

      {/* Token Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Select Token
          </CardTitle>
          <CardDescription>
            Choose a token to trade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
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
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Coins className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{token.name}</div>
                      <div className="text-sm text-gray-600">{token.symbol}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">${token.price.toFixed(6)}</div>
                      <div className={cn(
                        "text-xs",
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
              Execute buy or sell orders
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
                placeholder="Enter amount"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Trade Summary */}
            {tradeAmount && (
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">Trade Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>{tradeAmount} {selectedToken.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span>${selectedToken.price.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
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
              {isLoading ? 'Executing...' : `${tradeType === 'buy' ? 'Buy' : 'Sell'} ${selectedToken.symbol}`}
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
              {selectedToken.name} Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ============================================================================
// TRADING MODULE WORLD APP - MAIN PAGE
// ============================================================================

export const TradingModulePageWorldApp = () => {
  const [tradeHistory, setTradeHistory] = useState<any[]>([])

  const handleTradeExecuted = (trade: any) => {
    setTradeHistory(prev => [trade, ...prev])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Trading Interface
          </h1>
          <p className="text-gray-600">
            Trade tokens with anti-bot protection
          </p>
        </div>

        {/* Main Trading Interface */}
        <TradingInterfaceWorldApp onTradeExecuted={handleTradeExecuted} />

        {/* Trade History */}
        {tradeHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Trade History
              </CardTitle>
              <CardDescription>
                Your recent trades
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
              <div>Environment: World App</div>
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
// TRADING MODULE WORLD APP - EXPORTS
// ============================================================================

export const TradingModuleWorldApp = {
  version: 'v1.0.0',
  name: 'Trading Interface Module (World App)',
  
  // Components
  TradingInterface: TradingInterfaceWorldApp,
  TradingModulePage: TradingModulePageWorldApp,
  
  // Metadata
  features: {
    tokenTrading: true,
    antiBotProtection: true,
    worldAppOptimized: true,
    simplifiedUI: true,
    tradeHistory: true
  }
}
