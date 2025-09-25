'use client'

import React, { useState, useEffect } from 'react'
import { useTradingApi } from '@/hooks/useTradingApi'
import { useTokens } from '@/hooks/useTokens'
import { useWorldIdApi } from '@/hooks/useWorldIdApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Clock, 
  DollarSign,
  Activity,
  Target,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface TradingInterfaceApiProps {
  tokenAddress?: string
}

export function TradingInterfaceApi({ tokenAddress }: TradingInterfaceApiProps) {
  const { 
    tradeHistory,
    antiManipulationStatus,
    isLoading,
    error,
    simulateTrade,
    executeTrade,
    analyzeTrade,
    refreshData,
    canTrade,
    riskLevel,
    riskScore,
    isFlagged,
    isBanned,
    reputationScore,
    reputationLevel,
    totalTrades,
    totalVolume,
    recentTrades,
    buyTrades,
    sellTrades,
    suspiciousTrades,
    riskFactors,
    recommendations
  } = useTradingApi(tokenAddress)

  const { tokens } = useTokens()
  const { isVerified, verificationLevel } = useWorldIdApi()

  const [tradeAmount, setTradeAmount] = useState('')
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [simulation, setSimulation] = useState<{
    tokensReceived: number;
    newPrice: number;
    priceImpact: number;
    totalCost: number;
    slippage: number;
    gasEstimate: number;
  } | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [isExecuting, setIsExecuting] = useState(false)

  const selectedToken = tokens.find(token => token.address === tokenAddress)

  const handleSimulateTrade = async () => {
    if (!tradeAmount || !tokenAddress) return

    const amount = parseFloat(tradeAmount)
    if (isNaN(amount) || amount <= 0) return

    setIsSimulating(true)
    try {
      const result = await simulateTrade(tradeType, amount)
      setSimulation(result)
    } catch (err) {
      console.error('Simulation failed:', err)
    } finally {
      setIsSimulating(false)
    }
  }

  const handleExecuteTrade = async () => {
    if (!tradeAmount || !tokenAddress || !simulation) return

    const amount = parseFloat(tradeAmount)
    if (isNaN(amount) || amount <= 0) return

    setIsExecuting(true)
    try {
      const result = await executeTrade(tradeType, amount)
      if (result) {
        // Trade executed successfully
        setTradeAmount('')
        setSimulation(null)
        console.log('Trade executed:', result)
      }
    } catch (err) {
      console.error('Trade execution failed:', err)
    } finally {
      setIsExecuting(false)
    }
  }

  const handleAnalyzeTrade = async () => {
    if (!tradeAmount || !tokenAddress) return

    const amount = parseFloat(tradeAmount)
    if (isNaN(amount) || amount <= 0) return

    try {
      const result = await analyzeTrade(tradeType, amount, selectedToken?.currentPrice || 0)
      console.log('Trade analysis:', result)
    } catch (err) {
      console.error('Trade analysis failed:', err)
    }
  }

  useEffect(() => {
    if (tradeAmount && tokenAddress) {
      const timeoutId = setTimeout(() => {
        handleSimulateTrade()
      }, 500) // Debounce simulation

      return () => clearTimeout(timeoutId)
    }
  }, [tradeAmount, tradeType, tokenAddress])

  if (isLoading && !tradeHistory?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading trading data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold gradient-text">FairLaunch Trading</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={refreshData} variant="outline" size="sm" disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </header>

        {error && (
          <Card className="bg-red-500/10 border-red-500/20 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Trading Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trading Form */}
            <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-cyan-400" />
                  Trade {selectedToken?.name || 'Token'}
                </CardTitle>
                <CardDescription>
                  {selectedToken && (
                    <div className="flex items-center gap-4">
                      <span>Current Price: ${selectedToken.currentPrice.toFixed(4)}</span>
                      <span>Market Cap: ${selectedToken.marketCap.toLocaleString('en-US')}</span>
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Trade Type Selection */}
                <div className="flex gap-2">
                  <Button
                    variant={tradeType === 'buy' ? 'default' : 'outline'}
                    onClick={() => setTradeType('buy')}
                    className="flex-1"
                  >
                    Buy
                  </Button>
                  <Button
                    variant={tradeType === 'sell' ? 'default' : 'outline'}
                    onClick={() => setTradeType('sell')}
                    className="flex-1"
                  >
                    Sell
                  </Button>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Amount ({tradeType === 'buy' ? 'USD' : 'Tokens'})
                  </label>
                  <input
                    type="number"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder={`Enter ${tradeType === 'buy' ? 'USD amount' : 'token amount'}`}
                    className="w-full p-3 bg-background/50 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* Simulation Results */}
                {simulation && (
                  <Card className="bg-cyan-500/10 border-cyan-500/20">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-cyan-400 mb-3">Trade Simulation</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Tokens Received:</span>
                          <div className="font-semibold">{simulation.tokensReceived.toFixed(4)}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">New Price:</span>
                          <div className="font-semibold">${simulation.newPrice.toFixed(4)}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Price Impact:</span>
                          <div className="font-semibold">{simulation.priceImpact.toFixed(2)}%</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Total Cost:</span>
                          <div className="font-semibold">${simulation.totalCost.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Slippage:</span>
                          <div className="font-semibold">{simulation.slippage.toFixed(2)}%</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Gas Estimate:</span>
                          <div className="font-semibold">{simulation.gasEstimate.toLocaleString('en-US')}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleExecuteTrade}
                    disabled={!canTrade || !simulation || isExecuting || !isVerified}
                    className="flex-1"
                  >
                    {isExecuting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      `Execute ${tradeType === 'buy' ? 'Buy' : 'Sell'}`
                    )}
                  </Button>
                  <Button
                    onClick={handleAnalyzeTrade}
                    variant="outline"
                    disabled={!tradeAmount}
                  >
                    Analyze
                  </Button>
                </div>

                {/* Trading Status */}
                {!isVerified && (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">World ID verification required to trade</span>
                  </div>
                )}
                {isBanned && (
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="h-4 w-4" />
                    <span className="text-sm">Account is banned from trading</span>
                  </div>
                )}
                {isFlagged && (
                  <div className="flex items-center gap-2 text-orange-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">Account flagged for review</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Trades */}
            <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-green-400" />
                  Recent Trades ({recentTrades?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(!recentTrades || recentTrades.length === 0) ? (
                  <div className="text-center py-8 text-gray-400">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No trades yet</p>
                    <p className="text-sm">Start trading to see your history here</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentTrades.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant={trade.type === 'buy' ? 'default' : 'secondary'}>
                            {trade.type.toUpperCase()}
                          </Badge>
                          <div>
                            <div className="font-medium">{trade.amount.toFixed(4)} tokens</div>
                            <div className="text-sm text-gray-400">
                              ${trade.totalValue.toFixed(2)} @ ${trade.price.toFixed(4)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">
                            {new Date(trade.createdAt).toLocaleDateString()}
                          </div>
                          {trade.isSuspicious && (
                            <Badge variant="destructive" className="text-xs">
                              Suspicious
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-purple-400" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{reputationLevel}</div>
                  <div className="text-sm text-gray-400">Reputation Level</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Score:</span>
                    <span className="font-semibold">{reputationScore}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Trades:</span>
                    <span className="font-semibold">{totalTrades}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Volume:</span>
                    <span className="font-semibold">${totalVolume.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Risk Score:</span>
                    <Badge variant={riskScore < 30 ? 'default' : riskScore < 70 ? 'secondary' : 'destructive'}>
                      {riskScore}/100
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            {antiManipulationStatus && (
              <Card className="bg-card/50 backdrop-blur-sm border-orange-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-orange-400" />
                    Risk Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400 capitalize">{riskLevel}</div>
                    <div className="text-sm text-gray-400">Risk Level</div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Risk Factors:</h4>
                    {Object.entries(riskFactors).map(([factor, active]) => (
                      <div key={factor} className="flex items-center justify-between text-sm">
                        <span className="capitalize">{factor.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                        {active ? (
                          <XCircle className="h-4 w-4 text-red-400" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                    ))}
                  </div>

                  {recommendations?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Recommendations:</h4>
                      <ul className="space-y-1">
                        {recommendations.map((rec, index) => (
                          <li key={index} className="text-xs text-gray-400">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Trading Summary */}
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-blue-400" />
                  Trading Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <div className="text-xl font-bold text-blue-400">{buyTrades?.length || 0}</div>
                    <div className="text-xs text-gray-400">Buy Trades</div>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <div className="text-xl font-bold text-blue-400">{sellTrades?.length || 0}</div>
                    <div className="text-xs text-gray-400">Sell Trades</div>
                  </div>
                </div>
                {suspiciousTrades?.length > 0 && (
                  <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm font-semibold">{suspiciousTrades?.length || 0} Suspicious Trades</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
