import React, { useState, useEffect } from 'react'
import { useTrading } from '@/hooks/useTrading'
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
  Target
} from 'lucide-react'

export function TradingInterface() {
  const {
    isConnected,
    verificationLevel,
    reputationScore,
    tradingLimits,
    currentPrice,
    tradeHistory,
    isLoading,
    error,
    executeTrade,
    simulateTrade,
    getAntiManipulationMetrics,
    getCurrentBondingCurveState,
    canTrade,
    timeUntilNextTrade
  } = useTrading()

  const [tradeAmount, setTradeAmount] = useState('')
  const [simulation, setSimulation] = useState<{
    tokensReceived: number;
    newPrice: number;
    priceImpact: number;
  } | null>(null)
  const [metrics, setMetrics] = useState<{
    humanTrades: number;
    botTrades: number;
    humanPercentage: number;
    averageHumanTradeSize: number;
    averageBotTradeSize: number;
    suspiciousTrades: number;
    blockedTrades: number;
  } | null>(null)
  const [curveState, setCurveState] = useState<{
    currentPrice: number;
    totalSupply: number;
    totalRaised: number;
    humanTrades: number;
    botTrades: number;
    lastTradeTime: number;
    humanPercentage: number;
    botPercentage: number;
    averageTradeSize: number;
    tradesPerMinute: number;
  } | null>(null)

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(getAntiManipulationMetrics())
      setCurveState(getCurrentBondingCurveState())
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 5000)

    return () => clearInterval(interval)
  }, [getAntiManipulationMetrics, getCurrentBondingCurveState])

  const handleAmountChange = (value: string) => {
    setTradeAmount(value)
    if (value && !isNaN(Number(value))) {
      const sim = simulateTrade(Number(value))
      setSimulation(sim)
    } else {
      setSimulation(null)
    }
  }

  const handleTrade = async () => {
    if (!tradeAmount || isNaN(Number(tradeAmount))) return

    const result = await executeTrade('default-token', Number(tradeAmount))
    if (result.success) {
      setTradeAmount('')
      setSimulation(null)
    }
  }

  const getVerificationBadgeColor = (level: string) => {
    switch (level) {
      case 'Orb': return 'bg-green-500'
      case 'Phone': return 'bg-blue-500'
      case 'Device': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getReputationBadgeColor = (level: string) => {
    switch (level) {
      case 'Diamond': return 'bg-purple-500'
      case 'Gold': return 'bg-yellow-500'
      case 'Silver': return 'bg-gray-400'
      case 'Bronze': return 'bg-orange-600'
      default: return 'bg-gray-500'
    }
  }

  if (!isConnected) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Anti-Manipulation Trading Interface
          </CardTitle>
          <CardDescription>
            Connect your World ID to start trading with military-grade human verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Please connect your World ID to access the trading interface
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Human-Only Trading Interface
          </CardTitle>
          <CardDescription>
            Military-grade anti-manipulation system with World ID verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Badge className={getVerificationBadgeColor(verificationLevel)}>
                {verificationLevel} Verified
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getReputationBadgeColor(reputationScore.level)}>
                {reputationScore.level} Level
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm">${currentPrice.toFixed(6)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="text-sm">{tradeHistory?.length || 0} trades</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trading Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trade Execution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Execute Trade
              </CardTitle>
              <CardDescription>
                Trade with confidence - all transactions are human-verified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Amount (USD)</label>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="Enter amount to trade"
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  disabled={!canTrade}
                />
              </div>

              {simulation && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h4 className="font-medium">Trade Simulation</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tokens:</span>
                      <span className="ml-2 font-medium">
                        {simulation.tokensReceived.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">New Price:</span>
                      <span className="ml-2 font-medium">
                        ${simulation.newPrice.toFixed(6)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price Impact:</span>
                      <span className="ml-2 font-medium">
                        {simulation.priceImpact.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {timeUntilNextTrade > 0 && (
                <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-yellow-600">
                    Cooldown: {Math.ceil(timeUntilNextTrade / 1000)}s
                  </span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">{error}</span>
                </div>
              )}

              <Button
                onClick={handleTrade}
                disabled={!canTrade || !tradeAmount || isLoading}
                className="w-full"
              >
                {isLoading ? 'Processing...' : 'Execute Trade'}
              </Button>
            </CardContent>
          </Card>

          {/* Trading Limits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Your Trading Limits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Max Purchase</div>
                  <div className="font-medium">${tradingLimits.maxPurchaseAmount}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Daily Volume</div>
                  <div className="font-medium">${tradingLimits.maxDailyVolume}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Trades/Hour</div>
                  <div className="font-medium">{tradingLimits.maxTradesPerHour}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Trades/Day</div>
                  <div className="font-medium">{tradingLimits.maxTradesPerDay}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Anti-Manipulation Metrics */}
        <div className="space-y-6">
          {/* Human vs Bot Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Human Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              {metrics && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Human Trades</span>
                      <span>{metrics.humanPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={metrics.humanPercentage} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Human</div>
                      <div className="font-medium">{metrics.humanTrades}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Blocked</div>
                      <div className="font-medium">{metrics.blockedTrades}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reputation Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Reputation Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>XP Progress</span>
                    <span>{reputationScore.xp}/1000</span>
                  </div>
                  <Progress value={(reputationScore.xp / 1000) * 100} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Trades</div>
                    <div className="font-medium">{reputationScore.tradesCompleted}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Score</div>
                    <div className="font-medium">{reputationScore.score}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bonding Curve State */}
          <Card>
            <CardHeader>
              <CardTitle>Bonding Curve</CardTitle>
            </CardHeader>
            <CardContent>
              {curveState && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Total Raised</div>
                      <div className="font-medium">${curveState.totalRaised.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total Supply</div>
                      <div className="font-medium">{curveState.totalSupply.toFixed(0)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Trades/Min</div>
                      <div className="font-medium">{curveState.tradesPerMinute.toFixed(1)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Avg Trade</div>
                      <div className="font-medium">${curveState.averageTradeSize.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
