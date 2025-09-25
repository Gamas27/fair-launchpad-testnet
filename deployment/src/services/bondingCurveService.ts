import { BondingCurveConfig, TradeAttempt } from '@/types/antiManipulation'
import { antiManipulationService } from './antiManipulationService'

interface BondingCurveState {
  currentPrice: number
  totalSupply: number
  totalRaised: number
  humanTrades: number
  botTrades: number
  lastTradeTime: number
}

class BondingCurveService {
  private config: BondingCurveConfig
  private state: BondingCurveState
  private tradeHistory: TradeAttempt[] = []

  constructor(config: BondingCurveConfig) {
    this.config = config
    this.state = {
      currentPrice: config.initialPrice,
      totalSupply: 0,
      totalRaised: 0,
      humanTrades: 0,
      botTrades: 0,
      lastTradeTime: 0
    }
  }

  /**
   * Process a trade attempt with anti-manipulation checks
   */
  async processTrade(attempt: TradeAttempt): Promise<{
    success: boolean
    tokensReceived: number
    newPrice: number
    reason?: string
    riskScore: number
  }> {
    try {
      // Validate trade against anti-manipulation rules
      const validation = await antiManipulationService.validateTradeAttempt(attempt)
      
      if (!validation.allowed) {
        return {
          success: false,
          tokensReceived: 0,
          newPrice: this.state.currentPrice,
          reason: validation.reason,
          riskScore: validation.riskScore
        }
      }

      // Calculate tokens to receive
      const tokensReceived = this.calculateTokensReceived(attempt.amount, this.state.currentPrice)
      
      // Update bonding curve state
      this.updateBondingCurveState(attempt, tokensReceived)
      
      // Record trade
      this.tradeHistory.push(attempt)
      
      // Update trading session
      antiManipulationService.updateTradingSession(attempt.userId, {
        amount: attempt.amount,
        price: this.state.currentPrice,
        timestamp: Date.now()
      })

      return {
        success: true,
        tokensReceived,
        newPrice: this.state.currentPrice,
        riskScore: validation.riskScore
      }
    } catch (error) {
      console.error('Trade processing failed:', error)
      return {
        success: false,
        tokensReceived: 0,
        newPrice: this.state.currentPrice,
        reason: 'Internal error',
        riskScore: 100
      }
    }
  }

  /**
   * Get current bonding curve state
   */
  getCurrentState(): BondingCurveState & {
    humanPercentage: number
    botPercentage: number
    averageTradeSize: number
    tradesPerMinute: number
  } {
    const totalTrades = this.state.humanTrades + this.state.botTrades
    const humanPercentage = totalTrades > 0 ? (this.state.humanTrades / totalTrades) * 100 : 0
    const botPercentage = totalTrades > 0 ? (this.state.botTrades / totalTrades) * 100 : 0
    
    const averageTradeSize = this.tradeHistory.length > 0 
      ? this.tradeHistory.reduce((sum, trade) => sum + trade.amount, 0) / this.tradeHistory.length
      : 0

    const tradesPerMinute = this.calculateTradesPerMinute()

    return {
      ...this.state,
      humanPercentage,
      botPercentage,
      averageTradeSize,
      tradesPerMinute
    }
  }

  /**
   * Get bonding curve data for visualization
   */
  getBondingCurveData(): Array<{ price: number; supply: number; raised: number }> {
    const data = []
    let price = this.config.initialPrice
    let supply = 0
    let raised = 0

    // Generate curve data points
    for (let i = 0; i < 100; i++) {
      data.push({ price, supply, raised })
      
      // Calculate next point
      const tokensToAdd = 1000 // Simulate adding tokens
      supply += tokensToAdd
      raised += tokensToAdd * price
      price = this.calculateNextPrice(price, tokensToAdd)
      
      if (price >= this.config.maxPrice) break
    }

    return data
  }

  /**
   * Get current bonding curve state for a token
   */
  getCurrentBondingCurveState(
    currentSupply: bigint,
    currentPrice: number,
    priceIncrement: number,
    maxSupply: bigint
  ): BondingCurveState {
    return {
      currentPrice,
      totalSupply: Number(currentSupply),
      totalRaised: Number(currentSupply) * currentPrice,
      humanTrades: this.tradeHistory.filter(t => t.verificationLevel !== 'Device').length,
      botTrades: this.tradeHistory.filter(t => t.verificationLevel === 'Device').length,
      lastTradeTime: this.tradeHistory.length > 0 ? this.tradeHistory[this.tradeHistory.length - 1].timestamp : 0
    }
  }

  /**
   * Simulate a trade without executing it
   */
  simulateTrade(
    type: 'buy' | 'sell',
    amount: number,
    curveState: BondingCurveState
  ): {
    newPrice: number
    priceImpact: number
    totalCost: number
    tokensReceived: number
    newSupply: number
    isPossible: boolean
    error?: string
  } {
    try {
      if (type === 'buy') {
        // Simple calculation: tokens = amount / currentPrice
        const tokensReceived = amount / curveState.currentPrice
        const newSupply = curveState.totalSupply + tokensReceived
        
        // Simple price increase: 1% per 1000 tokens
        const priceIncrease = (tokensReceived / 1000) * 0.01
        const newPrice = curveState.currentPrice * (1 + priceIncrease)
        
        const priceImpact = ((newPrice - curveState.currentPrice) / curveState.currentPrice) * 100

        return {
          newPrice: Math.round(newPrice * 1000000) / 1000000, // Round to 6 decimal places
          priceImpact: Math.round(priceImpact * 100) / 100, // Round to 2 decimal places
          totalCost: amount,
          tokensReceived: Math.round(tokensReceived * 1000000) / 1000000, // Round to 6 decimal places
          newSupply: Math.round(newSupply),
          isPossible: true
        }
      } else {
        // Sell logic
        const tokensToSell = amount
        if (tokensToSell > curveState.totalSupply) {
          return {
            newPrice: curveState.currentPrice,
            priceImpact: 0,
            totalCost: 0,
            tokensReceived: 0,
            newSupply: curveState.totalSupply,
            isPossible: false,
            error: 'Insufficient token balance'
          }
        }

        const newSupply = curveState.totalSupply - tokensToSell
        const newPrice = this.calculateNextPrice(curveState.currentPrice, -tokensToSell)
        const priceImpact = ((newPrice - curveState.currentPrice) / curveState.currentPrice) * 100
        const totalCost = tokensToSell * curveState.currentPrice

        return {
          newPrice,
          priceImpact,
          totalCost,
          tokensReceived: totalCost,
          newSupply,
          isPossible: true
        }
      }
    } catch (error) {
      return {
        newPrice: curveState.currentPrice,
        priceImpact: 0,
        totalCost: 0,
        tokensReceived: 0,
        newSupply: curveState.totalSupply,
        isPossible: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Get anti-manipulation metrics
   */
  getAntiManipulationMetrics(): {
    humanTrades: number
    botTrades: number
    humanPercentage: number
    averageHumanTradeSize: number
    averageBotTradeSize: number
    suspiciousTrades: number
    blockedTrades: number
  } {
    const humanTrades = this.tradeHistory.filter(trade => trade.verificationLevel !== 'Device').length
    const botTrades = this.tradeHistory.filter(trade => trade.verificationLevel === 'Device').length
    const suspiciousTrades = this.tradeHistory.filter(trade => trade.riskScore > 70).length
    const blockedTrades = this.tradeHistory.filter(trade => !trade.allowed).length

    const humanTradesData = this.tradeHistory.filter(trade => trade.verificationLevel !== 'Device')
    const botTradesData = this.tradeHistory.filter(trade => trade.verificationLevel === 'Device')

    const averageHumanTradeSize = humanTradesData.length > 0 
      ? humanTradesData.reduce((sum, trade) => sum + trade.amount, 0) / humanTradesData.length
      : 0

    const averageBotTradeSize = botTradesData.length > 0 
      ? botTradesData.reduce((sum, trade) => sum + trade.amount, 0) / botTradesData.length
      : 0

    const totalTrades = humanTrades + botTrades
    const humanPercentage = totalTrades > 0 ? (humanTrades / totalTrades) * 100 : 0

    return {
      humanTrades,
      botTrades,
      humanPercentage,
      averageHumanTradeSize,
      averageBotTradeSize,
      suspiciousTrades,
      blockedTrades
    }
  }

  /**
   * Simulate what would happen if a trade was made
   */
  simulateTrade(amount: number, currentPrice: number): {
    tokensReceived: number
    newPrice: number
    priceImpact: number
  } {
    const tokensReceived = this.calculateTokensReceived(amount, currentPrice)
    const newPrice = this.calculateNextPrice(currentPrice, tokensReceived)
    const priceImpact = ((newPrice - currentPrice) / currentPrice) * 100

    return {
      tokensReceived,
      newPrice,
      priceImpact
    }
  }

  // Private helper methods
  private calculateTokensReceived(amount: number, currentPrice: number): number {
    // Simple bonding curve formula: tokens = amount / currentPrice
    // In a real implementation, this would be more complex
    if (currentPrice <= 0) {
      throw new Error('Invalid current price')
    }
    if (amount <= 0) {
      throw new Error('Invalid amount')
    }
    return amount / currentPrice
  }

  private calculateNextPrice(currentPrice: number, tokensAdded: number): number {
    // Simple price increment based on tokens added
    // In a real implementation, this would follow a specific bonding curve formula
    const priceIncrement = this.config.priceIncrement * Math.abs(tokensAdded) / 100
    return Math.min(this.config.maxPrice, currentPrice + priceIncrement)
  }

  private updateBondingCurveState(attempt: TradeAttempt, tokensReceived: number): void {
    this.state.totalSupply += tokensReceived
    this.state.totalRaised += attempt.amount
    this.state.currentPrice = this.calculateNextPrice(this.state.currentPrice, tokensReceived)
    this.state.lastTradeTime = Date.now()

    // Track human vs bot trades
    if (attempt.verificationLevel === 'Device') {
      this.state.botTrades++
    } else {
      this.state.humanTrades++
    }
  }

  private calculateTradesPerMinute(): number {
    const now = Date.now()
    const oneMinuteAgo = now - 60000
    const recentTrades = this.tradeHistory.filter(trade => trade.timestamp > oneMinuteAgo)
    return recentTrades.length
  }
}

// Default bonding curve configuration
const defaultBondingCurveConfig: BondingCurveConfig = {
  initialPrice: 0.0001,
  maxPrice: 0.01,
  priceIncrement: 0.000001,
  humanOnlyPhase: true,
  antiBotMechanisms: [
    'World ID Verification',
    'Reputation System',
    'Trading Limits',
    'Cooldown Periods',
    'Community Reporting',
    'Suspicious Pattern Detection'
  ]
}

export const bondingCurveService = new BondingCurveService(defaultBondingCurveConfig)
