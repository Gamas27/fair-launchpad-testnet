import { useState, useEffect, useCallback } from 'react'
import { 
  VerificationLevel, 
  ReputationScore, 
  TradingLimits, 
  TradeAttempt,
  TradingSession 
} from '@/types/antiManipulation'
import { antiManipulationService } from '@/services/antiManipulationService'
import { bondingCurveService } from '@/services/bondingCurveService'
import { useWorldId } from './useWorldId'
import { useWallet } from './useWallet'

interface TradingState {
  isConnected: boolean
  verificationLevel: VerificationLevel
  reputationScore: ReputationScore
  tradingLimits: TradingLimits
  session: TradingSession | null
  currentPrice: number
  tradeHistory: TradeAttempt[]
  isLoading: boolean
  error: string | null
}

interface TradeResult {
  success: boolean
  tokensReceived: number
  newPrice: number
  reason?: string
  riskScore: number
}

export function useTrading() {
  const { isConnected, worldId } = useWorldId()
  const { address } = useWallet()
  const [state, setState] = useState<TradingState>({
    isConnected: false,
    verificationLevel: 'Device',
    reputationScore: {
      level: 'Bronze',
      score: 100,
      xp: 0,
      tradesCompleted: 0,
      suspiciousActivity: 0,
      communityReports: 0,
      lastActivity: Date.now()
    },
    tradingLimits: {
      maxPurchaseAmount: 100,
      maxDailyVolume: 500,
      cooldownPeriod: 60,
      maxTradesPerHour: 5,
      maxTradesPerDay: 20
    },
    session: null,
    currentPrice: 0.0001,
    tradeHistory: [],
    isLoading: false,
    error: null
  })

  // Initialize trading session when connected
  useEffect(() => {
    if (isConnected && address && !state.session) {
      initializeTradingSession()
    }
  }, [isConnected, address, state.session])

  // Update current price periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const curveState = bondingCurveService.getCurrentState()
      setState(prev => ({ ...prev, currentPrice: curveState.currentPrice }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const initializeTradingSession = useCallback(async () => {
    if (!address) return

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // Get user verification level
      const verificationLevel = await getUserVerificationLevel()
      
      // Get or create reputation score
      const reputationScore = await getUserReputationScore(address)
      
      // Create trading session
      const session = antiManipulationService.createTradingSession(
        address,
        verificationLevel,
        reputationScore
      )

      // Get trading limits
      const tradingLimits = antiManipulationService.getTradingLimits(
        verificationLevel,
        reputationScore
      )

      setState(prev => ({
        ...prev,
        isConnected: true,
        verificationLevel,
        reputationScore,
        tradingLimits,
        session,
        isLoading: false
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to initialize trading session'
      }))
    }
  }, [address])

  const executeTrade = useCallback(async (
    tokenId: string,
    amount: number
  ): Promise<TradeResult> => {
    if (!state.session || !address) {
      return {
        success: false,
        tokensReceived: 0,
        newPrice: state.currentPrice,
        reason: 'No active trading session',
        riskScore: 100
      }
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // Create trade attempt
      const tradeAttempt: TradeAttempt = {
        userId: address,
        tokenId,
        amount,
        price: state.currentPrice,
        timestamp: Date.now(),
        verificationLevel: state.verificationLevel,
        reputationScore: state.reputationScore.score,
        sessionData: state.session,
        riskScore: 0,
        allowed: false
      }

      // Process trade through bonding curve service
      const result = await bondingCurveService.processTrade(tradeAttempt)

      if (result.success) {
        // Update state with successful trade
        setState(prev => ({
          ...prev,
          currentPrice: result.newPrice,
          tradeHistory: [...prev.tradeHistory, tradeAttempt],
          reputationScore: {
            ...prev.reputationScore,
            tradesCompleted: prev.reputationScore.tradesCompleted + 1,
            xp: prev.reputationScore.xp + 10,
            lastActivity: Date.now()
          },
          isLoading: false
        }))
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.reason || 'Trade failed'
        }))
      }

      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Trade execution failed'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }))

      return {
        success: false,
        tokensReceived: 0,
        newPrice: state.currentPrice,
        reason: errorMessage,
        riskScore: 100
      }
    }
  }, [state.session, address, state.verificationLevel, state.reputationScore, state.currentPrice])

  const simulateTrade = useCallback((amount: number) => {
    return bondingCurveService.simulateTrade(amount, state.currentPrice)
  }, [state.currentPrice])

  const reportSuspiciousActivity = useCallback(async (
    targetUserId: string,
    reason: string
  ) => {
    if (!address) return

    try {
      await antiManipulationService.reportSuspiciousActivity(
        address,
        targetUserId,
        reason
      )
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to report suspicious activity'
      }))
    }
  }, [address])

  const getBondingCurveData = useCallback(() => {
    return bondingCurveService.getBondingCurveData()
  }, [])

  const getAntiManipulationMetrics = useCallback(() => {
    return bondingCurveService.getAntiManipulationMetrics()
  }, [])

  const getCurrentBondingCurveState = useCallback(() => {
    return bondingCurveService.getCurrentState()
  }, [])

  // Helper functions
  const getUserVerificationLevel = async (): Promise<VerificationLevel> => {
    // In a real implementation, this would check World ID verification status
    // For now, return a mock level based on connection status
    if (worldId) return 'Orb'
    if (isConnected) return 'Phone'
    return 'Device'
  }

  const getUserReputationScore = async (userId: string): Promise<ReputationScore> => {
    // In a real implementation, this would fetch from a database
    // For now, return a default score
    return {
      level: 'Bronze',
      score: 100,
      xp: 0,
      tradesCompleted: 0,
      suspiciousActivity: 0,
      communityReports: 0,
      lastActivity: Date.now()
    }
  }

  return {
    // State
    ...state,
    
    // Actions
    executeTrade,
    simulateTrade,
    reportSuspiciousActivity,
    
    // Data
    getBondingCurveData,
    getAntiManipulationMetrics,
    getCurrentBondingCurveState,
    
    // Helpers
    canTrade: state.session && !state.isLoading && !state.error,
    timeUntilNextTrade: state.session ? calculateTimeUntilNextTrade(state.session) : 0
  }
}

// Helper function to calculate time until next trade is allowed
function calculateTimeUntilNextTrade(session: TradingSession): number {
  const timeSinceLastActivity = Date.now() - session.lastActivity
  const cooldownPeriod = 15 * 60 * 1000 // 15 minutes in milliseconds
  return Math.max(0, cooldownPeriod - timeSinceLastActivity)
}
