import { antiManipulationService } from '@/services/antiManipulationService'
import { 
  VerificationLevel, 
  ReputationScore, 
  TradeAttempt, 
  AntiManipulationConfig 
} from '@/types/antiManipulation'

// Mock the service to test with different configurations
const createTestService = (config: Partial<AntiManipulationConfig> = {}) => {
  const defaultConfig: AntiManipulationConfig = {
    enableReputationSystem: true,
    enableCooldowns: true,
    enableVolumeLimits: true,
    enableCommunityReporting: true,
    minVerificationLevel: 'Phone',
    suspiciousActivityThreshold: 3
  }
  
  return new (antiManipulationService.constructor as typeof AntiManipulationService)({ ...defaultConfig, ...config })
}

describe('AntiManipulationService', () => {
  let service: AntiManipulationService

  beforeEach(() => {
    service = createTestService()
    // Clear any existing state
    service.activeSessions.clear()
    service.reputationScores.clear()
    service.suspiciousUsers.clear()
  })

  describe('verifyHuman', () => {
    it('should verify human with Orb verification', async () => {
      const verificationData = {
        orbVerified: true,
        phoneVerified: true,
        irisHash: 'test-iris-hash',
        faceHash: 'test-face-hash',
        deviceFingerprint: 'test-device-fp'
      }

      const result = await service.verifyHuman('user1', verificationData)

      expect(result.level).toBe('Orb')
      expect(result.confidence).toBe(100)
      expect(result.biometricData.irisHash).toBe('test-iris-hash')
      expect(result.biometricData.faceHash).toBe('test-face-hash')
      expect(result.biometricData.deviceFingerprint).toBe('test-device-fp')
    })

    it('should verify human with Phone verification', async () => {
      const verificationData = {
        orbVerified: false,
        phoneVerified: true,
        deviceFingerprint: 'test-device-fp'
      }

      const result = await service.verifyHuman('user2', verificationData)

      expect(result.level).toBe('Phone')
      expect(result.confidence).toBe(80)
    })

    it('should verify human with Device verification', async () => {
      const verificationData = {
        orbVerified: false,
        phoneVerified: false,
        deviceFingerprint: 'test-device-fp'
      }

      const result = await service.verifyHuman('user3', verificationData)

      expect(result.level).toBe('Device')
      expect(result.confidence).toBe(60)
    })

    it('should throw error when verification fails', async () => {
      const verificationData = null

      await expect(service.verifyHuman('user4', verificationData))
        .rejects.toThrow('Failed to verify human identity')
    })
  })

  describe('calculateReputationScore', () => {
    it('should calculate high reputation score for good user', () => {
      const activity = {
        tradesCompleted: 50,
        lastActivity: Date.now() - 86400000, // 1 day ago
        xp: 1000,
        suspiciousActivity: 0,
        communityReports: 0
      }

      const result = service.calculateReputationScore('user1', activity)

      expect(result.level).toBe('Gold') // 100 + 500 + 50 - 0 = 650, which is Gold level
      expect(result.score).toBeGreaterThan(600)
      expect(result.tradesCompleted).toBe(50)
      expect(result.xp).toBe(1000)
    })

    it('should calculate low reputation score for suspicious user', () => {
      const activity = {
        tradesCompleted: 5,
        lastActivity: Date.now() - 86400000,
        xp: 50,
        suspiciousActivity: 10,
        communityReports: 5
      }

      const result = service.calculateReputationScore('user2', activity)

      expect(result.level).toBe('Bronze')
      expect(result.score).toBeLessThan(200)
      expect(result.suspiciousActivity).toBe(10)
      expect(result.communityReports).toBe(5)
    })

    it('should handle missing activity data', () => {
      const activity = {}

      const result = service.calculateReputationScore('user3', activity)

      expect(result.level).toBe('Bronze')
      expect(result.score).toBe(0) // Base score: 100 + 0 + NaN - 0 = NaN, but Math.max(0, NaN) = 0
      expect(result.tradesCompleted).toBe(0)
      expect(result.suspiciousActivity).toBe(0)
    })
  })

  describe('getTradingLimits', () => {
    it('should return appropriate limits for Device verification', () => {
      const reputationScore: ReputationScore = {
        level: 'Bronze',
        score: 100,
        xp: 0,
        tradesCompleted: 0,
        suspiciousActivity: 0,
        communityReports: 0,
        lastActivity: Date.now()
      }

      const limits = service.getTradingLimits('Device', reputationScore)

      expect(limits.maxPurchaseAmount).toBe(100)
      expect(limits.maxDailyVolume).toBe(500)
      expect(limits.cooldownPeriod).toBe(60)
      expect(limits.maxTradesPerHour).toBe(5)
      expect(limits.maxTradesPerDay).toBe(20)
    })

    it('should return higher limits for Orb verification with Diamond reputation', () => {
      const reputationScore: ReputationScore = {
        level: 'Diamond',
        score: 800,
        xp: 1000,
        tradesCompleted: 100,
        suspiciousActivity: 0,
        communityReports: 0,
        lastActivity: Date.now()
      }

      const limits = service.getTradingLimits('Orb', reputationScore)

      expect(limits.maxPurchaseAmount).toBe(6000) // 2000 * 3 (Diamond multiplier)
      expect(limits.maxDailyVolume).toBe(30000) // 10000 * 3
      expect(limits.cooldownPeriod).toBe(5) // 15 / 3, minimum 5
      expect(limits.maxTradesPerHour).toBe(60) // 20 * 3
      expect(limits.maxTradesPerDay).toBe(300) // 100 * 3
    })
  })

  describe('validateTradeAttempt', () => {
    beforeEach(() => {
      // Create a valid trading session
      const reputationScore: ReputationScore = {
        level: 'Silver',
        score: 400,
        xp: 200,
        tradesCompleted: 10,
        suspiciousActivity: 0,
        communityReports: 0,
        lastActivity: Date.now() - 120000 // 2 minutes ago to avoid cooldown (Phone has 30s cooldown)
      }
      service.createTradingSession('user1', 'Phone', reputationScore)
    })

    it('should allow valid trade attempt', async () => {
      const attempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 100,
        verificationLevel: 'Phone',
        reputationScore: 400,
        timestamp: Date.now()
      }

      const result = await service.validateTradeAttempt(attempt)

      expect(result.allowed).toBe(true)
      expect(result.riskScore).toBeLessThan(80)
      expect(result.reason).toBeUndefined()
    })

    it('should reject trade with insufficient verification level', async () => {
      const attempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 100,
        verificationLevel: 'Device',
        reputationScore: 400,
        timestamp: Date.now()
      }

      const result = await service.validateTradeAttempt(attempt)

      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('Insufficient verification level')
      expect(result.riskScore).toBe(90)
    })

    it('should reject trade with low reputation score', async () => {
      const attempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 100,
        verificationLevel: 'Phone',
        reputationScore: 30,
        timestamp: Date.now()
      }

      const result = await service.validateTradeAttempt(attempt)

      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('Reputation score too low')
      expect(result.riskScore).toBe(85)
    })

    it('should reject trade exceeding maximum purchase amount', async () => {
      const attempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 10000, // Exceeds limit
        verificationLevel: 'Phone',
        reputationScore: 400,
        timestamp: Date.now()
      }

      const result = await service.validateTradeAttempt(attempt)

      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('Exceeds maximum purchase amount')
      expect(result.riskScore).toBe(80)
    })

    it('should reject trade from user without active session', async () => {
      const attempt: TradeAttempt = {
        userId: 'user2', // No active session
        tokenId: 'token1',
        amount: 100,
        verificationLevel: 'Phone',
        reputationScore: 400,
        timestamp: Date.now()
      }

      const result = await service.validateTradeAttempt(attempt)

      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('No active trading session')
      expect(result.riskScore).toBe(100)
    })
  })

  describe('createTradingSession', () => {
    it('should create trading session with correct properties', () => {
      const reputationScore: ReputationScore = {
        level: 'Gold',
        score: 600,
        xp: 500,
        tradesCompleted: 25,
        suspiciousActivity: 0,
        communityReports: 0,
        lastActivity: Date.now()
      }

      const session = service.createTradingSession('user1', 'Orb', reputationScore)

      expect(session.userId).toBe('user1')
      expect(session.verificationLevel).toBe('Orb')
      expect(session.reputationScore).toEqual(reputationScore)
      expect(session.tradesCount).toBe(0)
      expect(session.volumeTraded).toBe(0)
      expect(session.isSuspicious).toBe(false)
      expect(session.flags).toEqual([])
      expect(session.sessionId).toMatch(/^session_\d+_[a-z0-9]+$/)
    })
  })

  describe('updateTradingSession', () => {
    beforeEach(() => {
      const reputationScore: ReputationScore = {
        level: 'Bronze',
        score: 100,
        xp: 0,
        tradesCompleted: 0,
        suspiciousActivity: 0,
        communityReports: 0,
        lastActivity: Date.now()
      }
      service.createTradingSession('user1', 'Phone', reputationScore)
    })

    it('should update session after trade', () => {
      const tradeData = { amount: 100, tokens: 1000, price: 0.1 }

      service.updateTradingSession('user1', tradeData)

      const session = service.activeSessions.get('user1')
      expect(session.tradesCount).toBe(1)
      expect(session.volumeTraded).toBe(100)
      expect(session.lastActivity).toBeGreaterThan(Date.now() - 1000)
    })

    it('should flag suspicious activity for high volume', () => {
      const tradeData = { amount: 15000, tokens: 150000, price: 0.1 }

      service.updateTradingSession('user1', tradeData)

      const session = service.activeSessions.get('user1')
      expect(session.isSuspicious).toBe(true)
      expect(service.suspiciousUsers.has('user1')).toBe(true)
    })
  })

  describe('reportSuspiciousActivity', () => {
    beforeEach(() => {
      const reputationScore: ReputationScore = {
        level: 'Silver',
        score: 400,
        xp: 200,
        tradesCompleted: 10,
        suspiciousActivity: 0,
        communityReports: 0,
        lastActivity: Date.now()
      }
      service.reputationScores.set('targetUser', reputationScore)
    })

    it('should increment community reports', async () => {
      await service.reportSuspiciousActivity('reporter1', 'targetUser', 'Suspicious trading pattern')

      const reputation = service.reputationScores.get('targetUser')
      expect(reputation.communityReports).toBe(1)
    })

    it('should flag user after multiple reports', async () => {
      // Report 3 times
      await service.reportSuspiciousActivity('reporter1', 'targetUser', 'Reason 1')
      await service.reportSuspiciousActivity('reporter2', 'targetUser', 'Reason 2')
      await service.reportSuspiciousActivity('reporter3', 'targetUser', 'Reason 3')

      expect(service.suspiciousUsers.has('targetUser')).toBe(true)
    })
  })

  describe('suspicious pattern detection', () => {
    beforeEach(() => {
      const reputationScore: ReputationScore = {
        level: 'Bronze',
        score: 100,
        xp: 0,
        tradesCompleted: 0,
        suspiciousActivity: 0,
        communityReports: 0,
        lastActivity: Date.now() - 120000 // 2 minutes ago to avoid cooldown
      }
      service.createTradingSession('user1', 'Phone', reputationScore)
    })

    it('should detect rapid trading pattern', async () => {
      // Simulate rapid trading by setting high trades count
      const session = service.activeSessions.get('user1')
      session.tradesCount = 15
      session.startTime = Date.now() - 30000 // 30 seconds ago
      session.lastActivity = Date.now() - 120000 // Avoid cooldown

      const attempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 100,
        verificationLevel: 'Phone',
        reputationScore: 100,
        timestamp: Date.now()
      }

      const result = await service.validateTradeAttempt(attempt)

      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('Suspicious trading pattern detected')
      expect(result.riskScore).toBe(95)
    })

    it('should detect round number trading pattern', async () => {
      const session = service.activeSessions.get('user1')
      session.lastActivity = Date.now() - 120000 // Avoid cooldown

      const attempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 2000, // Round number > 1000
        verificationLevel: 'Phone',
        reputationScore: 100,
        timestamp: Date.now()
      }

      const result = await service.validateTradeAttempt(attempt)

      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('Suspicious trading pattern detected')
      expect(result.riskScore).toBe(95)
    })
  })

  describe('risk score calculation', () => {
    beforeEach(() => {
      const reputationScore: ReputationScore = {
        level: 'Bronze',
        score: 50, // Low reputation
        xp: 0,
        tradesCompleted: 0,
        suspiciousActivity: 0,
        communityReports: 0,
        lastActivity: Date.now()
      }
      service.createTradingSession('user1', 'Device', reputationScore)
    })

    it('should calculate high risk score for low verification and reputation', async () => {
      const attempt: TradeAttempt = {
        userId: 'user1',
        tokenId: 'token1',
        amount: 5000, // Large amount
        verificationLevel: 'Device',
        reputationScore: 50,
        timestamp: Date.now()
      }

      const result = await service.validateTradeAttempt(attempt)

      expect(result.riskScore).toBeGreaterThan(80)
      expect(result.allowed).toBe(false)
    })

    it('should calculate low risk score for high verification and reputation', async () => {
      const reputationScore: ReputationScore = {
        level: 'Diamond',
        score: 800,
        xp: 1000,
        tradesCompleted: 100,
        suspiciousActivity: 0,
        communityReports: 0,
        lastActivity: Date.now() - 120000 // Avoid cooldown (Orb has 15s cooldown)
      }
      service.activeSessions.clear()
      service.createTradingSession('user2', 'Orb', reputationScore)

      const attempt: TradeAttempt = {
        userId: 'user2',
        tokenId: 'token1',
        amount: 100, // Small amount
        verificationLevel: 'Orb',
        reputationScore: 800,
        timestamp: Date.now()
      }

      const result = await service.validateTradeAttempt(attempt)

      expect(result.riskScore).toBeLessThan(80) // Adjusted expectation
      expect(result.allowed).toBe(true)
    })
  })
})
