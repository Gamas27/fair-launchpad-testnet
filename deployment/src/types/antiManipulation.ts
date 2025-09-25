export type VerificationLevel = 'Device' | 'Phone' | 'Orb'

export interface HumanVerification {
  level: VerificationLevel
  timestamp: number
  confidence: number // 0-100
  biometricData?: {
    irisHash?: string
    faceHash?: string
    deviceFingerprint?: string
  }
}

export interface ReputationScore {
  level: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
  score: number // 0-1000
  xp: number
  tradesCompleted: number
  suspiciousActivity: number
  communityReports: number
  lastActivity: number
}

export interface TradingLimits {
  maxPurchaseAmount: number
  maxDailyVolume: number
  cooldownPeriod: number // minutes
  maxTradesPerHour: number
  maxTradesPerDay: number
}

export interface AntiManipulationConfig {
  enableReputationSystem: boolean
  enableCooldowns: boolean
  enableVolumeLimits: boolean
  enableCommunityReporting: boolean
  minVerificationLevel: VerificationLevel
  suspiciousActivityThreshold: number
}

export interface TradingSession {
  userId: string
  sessionId: string
  startTime: number
  lastActivity: number
  tradesCount: number
  volumeTraded: number
  verificationLevel: VerificationLevel
  reputationScore: ReputationScore
  isSuspicious: boolean
  flags: string[]
}

export interface BondingCurveConfig {
  initialPrice: number
  maxPrice: number
  priceIncrement: number
  humanOnlyPhase: boolean
  antiBotMechanisms: string[]
}

export interface TradeAttempt {
  userId: string
  tokenId: string
  amount: number
  price: number
  timestamp: number
  verificationLevel: VerificationLevel
  reputationScore: number
  sessionData: TradingSession
  riskScore: number // 0-100
  allowed: boolean
  reason?: string
}
