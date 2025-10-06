import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { G8Card, G8CardContent, G8CardHeader, G8CardTitle } from "@/components/ui/g8-card"
import { G8Button } from "@/components/ui/g8-button"
import { G8Input } from "@/components/ui/g8-input"
import { G8Badge } from "@/components/ui/g8-badge"
import { useReputationStore } from "@/lib/reputation/reputationStore"
import { TrendingUp, TrendingDown, Shield, AlertTriangle, CheckCircle, Zap } from "lucide-react"

export interface TradingInterfaceProps {
  tokenId: string
  tokenSymbol: string
  currentPrice: number
  userBalance: number
  onTrade: (type: 'buy' | 'sell', amount: number) => Promise<void>
  className?: string
}

export function TradingInterface({ 
  tokenId, 
  tokenSymbol, 
  currentPrice, 
  userBalance, 
  onTrade, 
  className 
}: TradingInterfaceProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { reputationData, benefits } = useReputationStore()
  
  // Calculate trading limits based on reputation
  const maxTradeAmount = benefits.tradingLimits.maxAmount
  const feeDiscount = benefits.feeDiscount
  const baseFee = 0.003 // 0.3% base fee
  const actualFee = baseFee * (1 - feeDiscount / 100)
  
  // Calculate trade values
  const tradeAmount = parseFloat(amount) || 0
  const tradeValue = tradeAmount * currentPrice
  const feeAmount = tradeValue * actualFee
  const totalCost = tradeValue + feeAmount
  
  // Validation
  const isValidAmount = tradeAmount > 0 && tradeAmount <= maxTradeAmount
  const hasEnoughBalance = activeTab === 'buy' ? totalCost <= userBalance : tradeAmount <= userBalance
  const canTrade = isValidAmount && hasEnoughBalance && !isLoading
  
  const handleTrade = async () => {
    if (!canTrade) return
    
    setIsLoading(true)
    setError('')
    
    try {
      await onTrade(activeTab, tradeAmount)
      setAmount('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Trade failed')
    } finally {
      setIsLoading(false)
    }
  }
  
  const setQuickAmount = (percentage: number) => {
    const maxAmount = activeTab === 'buy' 
      ? Math.min(maxTradeAmount, userBalance / currentPrice)
      : Math.min(maxTradeAmount, userBalance)
    setAmount((maxAmount * percentage / 100).toString())
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Reputation Benefits Display */}
      <G8Card variant="gradient" className="border-g8-primary/30">
        <G8CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-g8-primary" />
              <G8CardTitle className="text-g8-h2 text-g8-text-primary">
                Trading Benefits
              </G8CardTitle>
            </div>
            <G8Badge variant="gradient" className="text-sm">
              {reputationData.level} Level
            </G8Badge>
          </div>
        </G8CardHeader>
        
        <G8CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-g8-text-secondary">Max Trade Amount</span>
              <span className="text-g8-text-primary font-medium">
                {maxTradeAmount.toLocaleString()} {tokenSymbol}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-g8-text-secondary">Fee Discount</span>
              <span className="text-g8-text-primary font-medium">
                {feeDiscount}% off
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-g8-text-secondary">Trading Fee</span>
              <span className="text-g8-text-primary font-medium">
                {(actualFee * 100).toFixed(3)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-g8-text-secondary">Priority Access</span>
              <span className="text-g8-text-primary font-medium">
                {benefits.priorityAccess ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </G8CardContent>
      </G8Card>

      {/* Trading Interface */}
      <G8Card variant="default">
        <G8CardHeader>
          <div className="flex items-center justify-between">
            <G8CardTitle className="text-g8-h2 text-g8-text-primary">
              Trade {tokenSymbol}
            </G8CardTitle>
            <div className="text-g8-body text-g8-text-secondary">
              ${currentPrice.toFixed(6)}
            </div>
          </div>
        </G8CardHeader>
        
        <G8CardContent className="space-y-4">
          {/* Buy/Sell Tabs */}
          <div className="flex gap-2">
            <G8Button
              variant={activeTab === 'buy' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('buy')}
              className="flex-1"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Buy
            </G8Button>
            <G8Button
              variant={activeTab === 'sell' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('sell')}
              className="flex-1"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              Sell
            </G8Button>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-g8-body text-g8-text-primary font-medium">
              Amount ({tokenSymbol})
            </label>
            <G8Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-lg"
            />
            
            {/* Quick Amount Buttons */}
            <div className="flex gap-2">
              {[25, 50, 75, 100].map((percentage) => (
                <G8Button
                  key={percentage}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickAmount(percentage)}
                  className="flex-1"
                >
                  {percentage}%
                </G8Button>
              ))}
            </div>
          </div>

          {/* Trade Summary */}
          {tradeAmount > 0 && (
            <G8Card variant="glass" className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-g8-text-secondary">Trade Value</span>
                  <span className="text-g8-text-primary">${tradeValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-g8-text-secondary">Trading Fee</span>
                  <span className="text-g8-text-primary">${feeAmount.toFixed(2)}</span>
                </div>
                {feeDiscount > 0 && (
                  <div className="flex justify-between text-g8-success">
                    <span>Fee Discount ({feeDiscount}%)</span>
                    <span>-${(tradeValue * baseFee * feeDiscount / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium border-t border-g8-stroke pt-2">
                  <span className="text-g8-text-primary">Total Cost</span>
                  <span className="text-g8-text-primary">${totalCost.toFixed(2)}</span>
                </div>
              </div>
            </G8Card>
          )}

          {/* Validation Messages */}
          {tradeAmount > 0 && (
            <div className="space-y-1">
              {tradeAmount > maxTradeAmount && (
                <div className="flex items-center gap-2 text-g8-error text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Amount exceeds your trading limit ({maxTradeAmount.toLocaleString()} {tokenSymbol})</span>
                </div>
              )}
              {!hasEnoughBalance && (
                <div className="flex items-center gap-2 text-g8-error text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Insufficient balance</span>
                </div>
              )}
              {isValidAmount && hasEnoughBalance && (
                <div className="flex items-center gap-2 text-g8-success text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>Trade is valid</span>
                </div>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 text-g8-error text-sm bg-g8-error/10 p-2 rounded-g8-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Trade Button */}
          <G8Button
            variant="primary"
            size="lg"
            onClick={handleTrade}
            disabled={!canTrade}
            loading={isLoading}
            className="w-full"
          >
            {isLoading ? (
              'Processing...'
            ) : (
              <>
                {activeTab === 'buy' ? (
                  <>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Buy {tradeAmount > 0 ? `${tradeAmount.toFixed(2)} ${tokenSymbol}` : ''}
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Sell {tradeAmount > 0 ? `${tradeAmount.toFixed(2)} ${tokenSymbol}` : ''}
                  </>
                )}
              </>
            )}
          </G8Button>

          {/* Reputation Level Up Hint */}
          {reputationData.level !== 'Diamond' && (
            <G8Card variant="glass" className="p-3 border-g8-warning/30">
              <div className="flex items-center gap-2 text-g8-warning text-sm">
                <Zap className="h-4 w-4" />
                <span>
                  Level up to {getNextLevel(reputationData.level)} for higher trading limits and better fees!
                </span>
              </div>
            </G8Card>
          )}
        </G8CardContent>
      </G8Card>
    </div>
  )
}

function getNextLevel(currentLevel: string): string {
  switch (currentLevel) {
    case 'Bronze': return 'Silver'
    case 'Silver': return 'Gold'
    case 'Gold': return 'Diamond'
    default: return 'Max'
  }
}
