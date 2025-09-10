import { bondingCurveService } from '@/services/bondingCurveService'
import { TradeAttempt, BondingCurveConfig } from '@/types/antiManipulation'

// Mock the anti-manipulation service
jest.mock('@/services/antiManipulationService', () => ({
  antiManipulationService: {
    validateTradeAttempt: jest.fn(),
    updateTradingSession: jest.fn()
  }
}))

import { antiManipulationService } from '@/services/antiManipulationService'

const mockAntiManipulationService = antiManipulationService as jest.Mocked<typeof antiManipulationService>

// Create a test service with custom config
const createTestService = (config: Partial<BondingCurveConfig> = {}) => {
  const defaultConfig: BondingCurveConfig = {
    initialPrice: 0.0001,
    maxPrice: 0.01,
    priceIncrement: 0.000001,
    humanOnlyPhase: true,
    antiBotMechanisms: ['World ID Verification', 'Reputation System']
  }
  
  return new (bondingCurveService.constructor as typeof BondingCurveService)({ ...defaultConfig, ...config })
}

describe('BondingCurveService', () => {
  let service: BondingCurveService

  beforeEach(() => {
    service = createTestService()
    jest.clearAllMocks()
  })

  describe('processTrade', () => {
    it('should process valid trade successfully', async () => {
      const attempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 100,
        verificationLevel: 'Phone',
        reputationScore: 400,
        timestamp: Date.now()
      }

      mockAntiManipulationService.validateTradeAttempt.mockResolvedValue({
        allowed: true,
        riskScore: 20
      })

      const result = await service.processTrade(attempt)

      expect(result.success).toBe(true)
      expect(result.tokensReceived).toBeGreaterThan(0)
      expect(result.newPrice).toBeGreaterThan(service.state.currentPrice)
      expect(result.riskScore).toBe(20)
      expect(mockAntiManipulationService.updateTradingSession).toHaveBeenCalledWith(
        'user1',
        expect.objectContaining({
          amount: 100,
          tokens: result.tokensReceived,
          price: result.newPrice
        })
      )
    })

    it('should reject trade when anti-manipulation validation fails', async () => {
      const attempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 100,
        verificationLevel: 'Device',
        reputationScore: 30,
        timestamp: Date.now()
      }

      mockAntiManipulationService.validateTradeAttempt.mockResolvedValue({
        allowed: false,
        reason: 'Insufficient verification level',
        riskScore: 90
      })

      const result = await service.processTrade(attempt)

      expect(result.success).toBe(false)
      expect(result.tokensReceived).toBe(0)
      expect(result.reason).toBe('Insufficient verification level')
      expect(result.riskScore).toBe(90)
      expect(mockAntiManipulationService.updateTradingSession).not.toHaveBeenCalled()
    })

    it('should handle internal errors gracefully', async () => {
      const attempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 100,
        verificationLevel: 'Phone',
        reputationScore: 400,
        timestamp: Date.now()
      }

      mockAntiManipulationService.validateTradeAttempt.mockRejectedValue(
        new Error('Internal service error')
      )

      const result = await service.processTrade(attempt)

      expect(result.success).toBe(false)
      expect(result.tokensReceived).toBe(0)
      expect(result.reason).toBe('Internal error')
      expect(result.riskScore).toBe(100)
    })
  })

  describe('getCurrentState', () => {
    beforeEach(async () => {
      // Process some trades to populate state
      const attempt1: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 100,
        verificationLevel: 'Phone',
        reputationScore: 400,
        timestamp: Date.now()
      }

      const attempt2: TradeAttempt = {
        userId: 'user2',
        tokenId: 'token1',
        amount: 200,
        verificationLevel: 'Device',
        reputationScore: 100,
        timestamp: Date.now()
      }

      mockAntiManipulationService.validateTradeAttempt
        .mockResolvedValueOnce({ allowed: true, riskScore: 20 })
        .mockResolvedValueOnce({ allowed: true, riskScore: 30 })

      await service.processTrade(attempt1)
      await service.processTrade(attempt2)
    })

    it('should return current state with calculated metrics', () => {
      const state = service.getCurrentState()

      expect(state.currentPrice).toBeGreaterThan(0.0001)
      expect(state.totalSupply).toBeGreaterThan(0)
      expect(state.totalRaised).toBe(300) // 100 + 200
      expect(state.humanTrades).toBe(1) // Phone verification
      expect(state.botTrades).toBe(1) // Device verification
      expect(state.humanPercentage).toBe(50)
      expect(state.botPercentage).toBe(50)
      expect(state.averageTradeSize).toBe(150) // (100 + 200) / 2
      expect(state.tradesPerMinute).toBeGreaterThanOrEqual(0)
    })

    it('should handle zero trades correctly', () => {
      const newService = createTestService()
      const state = newService.getCurrentState()

      expect(state.humanTrades).toBe(0)
      expect(state.botTrades).toBe(0)
      expect(state.humanPercentage).toBe(0)
      expect(state.botPercentage).toBe(0)
      expect(state.averageTradeSize).toBe(0)
    })
  })

  describe('getBondingCurveData', () => {
    it('should generate bonding curve data points', () => {
      const data = service.getBondingCurveData()

      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThan(0)
      expect(data.length).toBeLessThanOrEqual(100)

      // Check first data point
      expect(data[0]).toEqual({
        price: 0.0001,
        supply: 0,
        raised: 0
      })

      // Check that price increases
      for (let i = 1; i < data.length; i++) {
        expect(data[i].price).toBeGreaterThanOrEqual(data[i - 1].price)
        expect(data[i].supply).toBeGreaterThan(data[i - 1].supply)
        expect(data[i].raised).toBeGreaterThan(data[i - 1].raised)
      }

      // Check that price doesn't exceed max
      data.forEach(point => {
        expect(point.price).toBeLessThanOrEqual(0.01)
      })
    })

    it('should respect max price limit', () => {
      const data = service.getBondingCurveData()
      const lastPoint = data[data.length - 1]

      expect(lastPoint.price).toBeLessThanOrEqual(0.01)
    })
  })

  describe('getAntiManipulationMetrics', () => {
    beforeEach(async () => {
      // Process various types of trades
      const trades: TradeAttempt[] = [
        {
          userId: 'user1',
          tokenId: 'token1',
          amount: 100,
          verificationLevel: 'Orb',
          reputationScore: 800,
          timestamp: Date.now(),
          riskScore: 10
        },
        {
          userId: 'user2',
          tokenId: 'token1',
          amount: 200,
          verificationLevel: 'Phone',
          reputationScore: 400,
          timestamp: Date.now(),
          riskScore: 20
        },
        {
          userId: 'user3',
          tokenId: 'token1',
          amount: 50,
          verificationLevel: 'Device',
          reputationScore: 100,
          timestamp: Date.now(),
          riskScore: 80
        },
        {
          userId: 'user4',
          tokenId: 'token1',
          amount: 300,
          verificationLevel: 'Device',
          reputationScore: 50,
          timestamp: Date.now(),
          riskScore: 90
        }
      ]

      mockAntiManipulationService.validateTradeAttempt
        .mockResolvedValue({ allowed: true, riskScore: 10 })
        .mockResolvedValue({ allowed: true, riskScore: 20 })
        .mockResolvedValue({ allowed: true, riskScore: 80 })
        .mockResolvedValue({ allowed: false, reason: 'High risk', riskScore: 90 })

      for (const trade of trades) {
        await service.processTrade(trade)
      }
    })

    it('should calculate anti-manipulation metrics correctly', () => {
      const metrics = service.getAntiManipulationMetrics()

      expect(metrics.humanTrades).toBe(2) // Orb + Phone
      expect(metrics.botTrades).toBe(1) // Device (only successful ones)
      expect(metrics.humanPercentage).toBe(66.67) // 2/3 * 100
      expect(metrics.averageHumanTradeSize).toBe(150) // (100 + 200) / 2
      expect(metrics.averageBotTradeSize).toBe(50) // 50 / 1
      expect(metrics.suspiciousTrades).toBe(1) // riskScore > 70
      expect(metrics.blockedTrades).toBe(1) // allowed: false
    })
  })

  describe('simulateTrade', () => {
    it('should simulate trade without affecting state', () => {
      const initialPrice = service.state.currentPrice
      const initialSupply = service.state.totalSupply

      const simulation = service.simulateTrade(100, 0.0001)

      expect(simulation.tokensReceived).toBe(1000000) // 100 / 0.0001
      expect(simulation.newPrice).toBeGreaterThan(0.0001)
      expect(simulation.priceImpact).toBeGreaterThan(0)

      // State should not be affected
      expect(service.state.currentPrice).toBe(initialPrice)
      expect(service.state.totalSupply).toBe(initialSupply)
    })

    it('should calculate price impact correctly', () => {
      const simulation = service.simulateTrade(100, 0.0001)
      const expectedPriceImpact = ((simulation.newPrice - 0.0001) / 0.0001) * 100

      expect(simulation.priceImpact).toBeCloseTo(expectedPriceImpact, 5)
    })
  })

  describe('bonding curve calculations', () => {
    it('should calculate tokens received correctly', () => {
      const tokens = service.calculateTokensReceived(100, 0.0001)
      expect(tokens).toBe(1000000) // 100 / 0.0001
    })

    it('should calculate next price correctly', () => {
      const nextPrice = service.calculateNextPrice(0.0001, 1000000)
      const expectedPrice = 0.0001 + (1000000 * 0.000001)
      expect(nextPrice).toBeCloseTo(expectedPrice, 10)
    })

    it('should respect max price limit in calculations', () => {
      const nextPrice = service.calculateNextPrice(0.009, 1000000)
      expect(nextPrice).toBeLessThanOrEqual(0.01)
    })
  })

  describe('trade history tracking', () => {
    it('should track trades per minute correctly', async () => {
      const now = Date.now()
      const attempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 100,
        verificationLevel: 'Phone',
        reputationScore: 400,
        timestamp: now
      }

      mockAntiManipulationService.validateTradeAttempt.mockResolvedValue({
        allowed: true,
        riskScore: 20
      })

      await service.processTrade(attempt)

      const state = service.getCurrentState()
      expect(state.tradesPerMinute).toBe(1)
    })

    it('should not count old trades in trades per minute', async () => {
      const oldTime = Date.now() - 120000 // 2 minutes ago
      const attempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 100,
        verificationLevel: 'Phone',
        reputationScore: 400,
        timestamp: oldTime
      }

      mockAntiManipulationService.validateTradeAttempt.mockResolvedValue({
        allowed: true,
        riskScore: 20
      })

      await service.processTrade(attempt)

      const state = service.getCurrentState()
      expect(state.tradesPerMinute).toBe(0) // Old trade shouldn't count
    })
  })

  describe('human vs bot trade tracking', () => {
    it('should correctly categorize human trades', async () => {
      const humanAttempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 100,
        verificationLevel: 'Orb',
        reputationScore: 800,
        timestamp: Date.now()
      }

      mockAntiManipulationService.validateTradeAttempt.mockResolvedValue({
        allowed: true,
        riskScore: 10
      })

      await service.processTrade(humanAttempt)

      expect(service.state.humanTrades).toBe(1)
      expect(service.state.botTrades).toBe(0)
    })

    it('should correctly categorize bot trades', async () => {
      const botAttempt: TradeAttempt = {
        userId: 'user2',
        tokenId: 'token1',
        amount: 50,
        verificationLevel: 'Device',
        reputationScore: 100,
        timestamp: Date.now()
      }

      mockAntiManipulationService.validateTradeAttempt.mockResolvedValue({
        allowed: true,
        riskScore: 30
      })

      await service.processTrade(botAttempt)

      expect(service.state.humanTrades).toBe(0)
      expect(service.state.botTrades).toBe(1)
    })
  })

  describe('configuration handling', () => {
    it('should use custom configuration', () => {
      const customService = createTestService({
        initialPrice: 0.001,
        maxPrice: 0.1,
        priceIncrement: 0.00001
      })

      expect(customService.state.currentPrice).toBe(0.001)
      expect(customService.config.maxPrice).toBe(0.1)
      expect(customService.config.priceIncrement).toBe(0.00001)
    })

    it('should handle human-only phase configuration', () => {
      const humanOnlyService = createTestService({
        humanOnlyPhase: true
      })

      expect(humanOnlyService.config.humanOnlyPhase).toBe(true)
    })
  })
})
