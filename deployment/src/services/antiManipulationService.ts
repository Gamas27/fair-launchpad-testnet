import { 
  VerificationLevel, 
  HumanVerification, 
  ReputationScore, 
  TradingLimits, 
  AntiManipulationConfig,
  TradingSession,
  TradeAttempt,
  BondingCurveConfig
} from '@/types/antiManipulation'

class AntiManipulationService {
  private config: AntiManipulationConfig
  private activeSessions: Map<string, TradingSession> = new Map()
  private reputationScores: Map<string, ReputationScore> = new Map()
  private suspiciousUsers: Set<string> = new Set()

  constructor(config: AntiManipulationConfig) {
    this.config = config
  }

  /**
   * Verify human identity with multi-level verification
   */
  async verifyHuman(userId: string, verificationData: { worldIdProof?: string; deviceFingerprint?: string; phoneNumber?: string; orbVerified?: boolean; phoneVerified?: boolean; irisHash?: string; faceHash?: string }): Promise<HumanVerification> {
    try {
      // Simulate World ID verification
      const verification: HumanVerification = {
        level: this.determineVerificationLevel(verificationData),
        timestamp: Date.now(),
        confidence: this.calculateConfidence(verificationData),
        biometricData: {
          irisHash: verificationData.irisHash,
          faceHash: verificationData.faceHash,
          deviceFingerprint: verificationData.deviceFingerprint
        }
      }

      // Update reputation based on verification level
      await this.updateReputationFromVerification(userId, verification)
      
      return verification
    } catch (error) {
      console.error('Human verification failed:', error)
      throw new Error('Failed to verify human identity')
    }
  }

  /**
   * Calculate reputation score based on multiple factors
   */
  calculateReputationScore(userId: string, activity: { tradesCompleted: number; lastActivity?: number; suspiciousActivity: number; communityReports: number; xp?: number }): ReputationScore {
    const baseScore = 100
    const tradesBonus = activity.tradesCompleted * 10
    const timeBonus = this.calculateTimeBonus(activity.lastActivity || 0)
    const penalty = activity.suspiciousActivity * 50 + activity.communityReports * 30

    const totalScore = Math.max(0, baseScore + tradesBonus + timeBonus - penalty)
    
    return {
      level: this.determineReputationLevel(totalScore),
      score: totalScore,
      xp: activity.xp || 0,
      tradesCompleted: activity.tradesCompleted || 0,
      suspiciousActivity: activity.suspiciousActivity || 0,
      communityReports: activity.communityReports || 0,
      lastActivity: Date.now()
    }
  }

  /**
   * Analyze a trade for manipulation patterns
   */
  analyzeTrade(tradeData: {
    userAddress: string
    tokenAddress: string
    tradeType: 'buy' | 'sell'
    amount: number
    price: number
    userTradingHistory: any[]
    tokenTradingHistory: any[]
  }): {
    riskScore: number
    isSuspicious: boolean
    flags: string[]
    recommendations: string[]
  } {
    const flags: string[] = []
    let riskScore = 0

    // Check for rapid trading
    const recentTrades = tradeData.userTradingHistory.filter(t => 
      Date.now() - new Date(t.createdAt).getTime() < 60000 // Last minute
    )
    if (recentTrades.length > 5) {
      flags.push('Rapid trading detected')
      riskScore += 30
    }

    // Check for large trades
    if (tradeData.amount > 1000) {
      flags.push('Large trade amount')
      riskScore += 20
    }

    // Check for price manipulation
    const recentTokenTrades = tradeData.tokenTradingHistory.filter(t => 
      Date.now() - new Date(t.createdAt).getTime() < 300000 // Last 5 minutes
    )
    if (recentTokenTrades.length > 10) {
      flags.push('High trading volume')
      riskScore += 25
    }

    // Check for suspicious patterns
    const userTrades = tradeData.userTradingHistory
    if (userTrades.length > 0) {
      const avgTradeSize = userTrades.reduce((sum, t) => sum + t.amount, 0) / userTrades.length
      if (tradeData.amount > avgTradeSize * 5) {
        flags.push('Unusual trade size')
        riskScore += 15
      }
    }

    const recommendations: string[] = []
    if (riskScore > 50) {
      recommendations.push('Consider implementing a cooldown period')
    }
    if (riskScore > 70) {
      recommendations.push('Review user for potential manipulation')
    }
    if (flags.includes('Rapid trading detected')) {
      recommendations.push('Implement rate limiting')
    }

    return {
      riskScore: Math.min(100, riskScore),
      isSuspicious: riskScore > 60,
      flags,
      recommendations
    }
  }

  /**
   * Get anti-manipulation metrics for a user
   */
  getAntiManipulationMetrics(userAddress: string): {
    cooldownRemaining: number
    dailyTradeLimit: number
    remainingTrades: number
    riskLevel: 'low' | 'medium' | 'high'
  } {
    const session = this.activeSessions.get(userAddress)
    const reputation = this.reputationScores.get(userAddress)
    
    const cooldownRemaining = session ? Math.max(0, session.cooldownUntil - Date.now()) : 0
    const dailyTradeLimit = reputation ? this.getDailyTradeLimit(reputation.level) : 10
    const remainingTrades = session ? Math.max(0, dailyTradeLimit - session.tradesToday) : dailyTradeLimit
    
    let riskLevel: 'low' | 'medium' | 'high' = 'low'
    if (reputation) {
      if (reputation.score < 200) riskLevel = 'high'
      else if (reputation.score < 500) riskLevel = 'medium'
    }

    return {
      cooldownRemaining,
      dailyTradeLimit,
      remainingTrades,
      riskLevel
    }
  }

  /**
   * Get trading limits based on verification level and reputation
   */
  getTradingLimits(verificationLevel: VerificationLevel, reputationScore: ReputationScore): TradingLimits {
    const baseLimits = {
      Device: { maxPurchase: 100, maxDaily: 500, cooldown: 60, maxPerHour: 5, maxPerDay: 20 },
      Phone: { maxPurchase: 500, maxDaily: 2000, cooldown: 30, maxPerHour: 10, maxPerDay: 50 },
      Orb: { maxPurchase: 2000, maxDaily: 10000, cooldown: 15, maxPerHour: 20, maxPerDay: 100 }
    }

    const limits = baseLimits[verificationLevel]
    const reputationMultiplier = this.getReputationMultiplier(reputationScore.level)

    return {
      maxPurchaseAmount: limits.maxPurchase * reputationMultiplier,
      maxDailyVolume: limits.maxDaily * reputationMultiplier,
      cooldownPeriod: Math.max(5, limits.cooldown / reputationMultiplier),
      maxTradesPerHour: Math.floor(limits.maxPerHour * reputationMultiplier),
      maxTradesPerDay: Math.floor(limits.maxPerDay * reputationMultiplier)
    }
  }

  /**
   * Validate trade attempt against anti-manipulation rules
   */
  async validateTradeAttempt(attempt: TradeAttempt): Promise<{ allowed: boolean; reason?: string; riskScore: number }> {
    const session = this.activeSessions.get(attempt.userId)
    if (!session) {
      return { allowed: false, reason: 'No active trading session', riskScore: 100 }
    }

    // Check verification level
    if (this.isVerificationLevelInsufficient(attempt.verificationLevel)) {
      return { allowed: false, reason: 'Insufficient verification level', riskScore: 90 }
    }

    // Check reputation score
    if (attempt.reputationScore < 50) {
      return { allowed: false, reason: 'Reputation score too low', riskScore: 85 }
    }

    // Check trading limits
    const limits = this.getTradingLimits(attempt.verificationLevel, session.reputationScore)
    if (attempt.amount > limits.maxPurchaseAmount) {
      return { allowed: false, reason: 'Exceeds maximum purchase amount', riskScore: 80 }
    }

    // Check cooldown period
    if (this.isInCooldownPeriod(session)) {
      return { allowed: false, reason: 'In cooldown period', riskScore: 70 }
    }

    // Check for suspicious patterns
    const suspiciousPatterns = this.detectSuspiciousPatterns(attempt, session)
    if (suspiciousPatterns.length > 0) {
      await this.flagSuspiciousActivity(attempt.userId, suspiciousPatterns)
      return { allowed: false, reason: 'Suspicious trading pattern detected', riskScore: 95 }
    }

    // Calculate risk score
    const riskScore = this.calculateRiskScore(attempt, session)

    return { 
      allowed: riskScore < 80, 
      reason: riskScore >= 80 ? 'High risk trade detected' : undefined,
      riskScore 
    }
  }

  /**
   * Create or update trading session
   */
  createTradingSession(userId: string, verificationLevel: VerificationLevel, reputationScore: ReputationScore): TradingSession {
    const session: TradingSession = {
      userId,
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      lastActivity: Date.now(),
      tradesCount: 0,
      volumeTraded: 0,
      verificationLevel,
      reputationScore,
      isSuspicious: false,
      flags: []
    }

    this.activeSessions.set(userId, session)
    return session
  }

  /**
   * Update session after trade
   */
  updateTradingSession(userId: string, tradeData: { amount: number; price: number; timestamp: number }): void {
    const session = this.activeSessions.get(userId)
    if (session) {
      session.lastActivity = Date.now()
      session.tradesCount += 1
      session.volumeTraded += tradeData.amount
      
      // Check for suspicious activity
      if (this.detectSuspiciousActivity(session)) {
        session.isSuspicious = true
        this.suspiciousUsers.add(userId)
      }
    }
  }

  /**
   * Community reporting system
   */
  async reportSuspiciousActivity(reporterId: string, targetUserId: string, reason: string): Promise<void> {
    const targetReputation = this.reputationScores.get(targetUserId)
    if (targetReputation) {
      targetReputation.communityReports += 1
      this.reputationScores.set(targetUserId, targetReputation)
    }

    // If multiple reports, flag user
    if (targetReputation && targetReputation.communityReports >= 3) {
      this.suspiciousUsers.add(targetUserId)
      await this.flagSuspiciousActivity(targetUserId, [`Community reported: ${reason}`])
    }
  }

  // Private helper methods
  private determineVerificationLevel(data: { orbVerified?: boolean; phoneVerified?: boolean }): VerificationLevel {
    if (data.orbVerified) return 'Orb'
    if (data.phoneVerified) return 'Phone'
    return 'Device'
  }

  private calculateConfidence(data: { orbVerified?: boolean; phoneVerified?: boolean; deviceFingerprint?: string }): number {
    let confidence = 50 // Base confidence
    
    if (data.orbVerified) confidence += 40
    if (data.phoneVerified) confidence += 20
    if (data.deviceFingerprint) confidence += 10
    
    return Math.min(100, confidence)
  }

  private determineReputationLevel(score: number): 'Bronze' | 'Silver' | 'Gold' | 'Diamond' {
    if (score >= 800) return 'Diamond'
    if (score >= 600) return 'Gold'
    if (score >= 400) return 'Silver'
    return 'Bronze'
  }

  private getReputationMultiplier(level: string): number {
    const multipliers = { Bronze: 1, Silver: 1.5, Gold: 2, Diamond: 3 }
    return multipliers[level as keyof typeof multipliers] || 1
  }

  private calculateTimeBonus(lastActivity: number): number {
    const daysSinceActivity = (Date.now() - lastActivity) / (1000 * 60 * 60 * 24)
    return Math.min(50, daysSinceActivity * 5) // Bonus for consistent activity
  }

  private getDailyTradeLimit(reputationLevel: string): number {
    const limits = { Bronze: 10, Silver: 25, Gold: 50, Diamond: 100 }
    return limits[reputationLevel as keyof typeof limits] || 10
  }

  private isVerificationLevelInsufficient(level: VerificationLevel): boolean {
    const requiredLevels = { Device: 0, Phone: 1, Orb: 2 }
    const userLevel = requiredLevels[level]
    const requiredLevel = requiredLevels[this.config.minVerificationLevel]
    return userLevel < requiredLevel
  }

  private isInCooldownPeriod(session: TradingSession): boolean {
    const timeSinceLastActivity = Date.now() - session.lastActivity
    const limits = this.getTradingLimits(session.verificationLevel, session.reputationScore)
    return timeSinceLastActivity < limits.cooldownPeriod * 60 * 1000
  }

  private detectSuspiciousPatterns(attempt: TradeAttempt, session: TradingSession): string[] {
    const patterns: string[] = []

    // Check for rapid trading
    if (session.tradesCount > 10 && (Date.now() - session.startTime) < 60000) {
      patterns.push('Rapid trading pattern')
    }

    // Check for round number amounts (bot-like behavior)
    if (attempt.amount % 100 === 0 && attempt.amount > 1000) {
      patterns.push('Round number trading pattern')
    }

    // Check for unusual timing
    const hour = new Date().getHours()
    if (hour < 6 || hour > 22) {
      patterns.push('Unusual trading time')
    }

    return patterns
  }

  private detectSuspiciousActivity(session: TradingSession): boolean {
    return session.tradesCount > 50 || session.volumeTraded > 10000
  }

  private calculateRiskScore(attempt: TradeAttempt, session: TradingSession): number {
    let riskScore = 0

    // Base risk from verification level
    const verificationRisk = { Device: 30, Phone: 15, Orb: 5 }
    riskScore += verificationRisk[attempt.verificationLevel]

    // Risk from reputation
    if (attempt.reputationScore < 200) riskScore += 20
    if (attempt.reputationScore < 100) riskScore += 30

    // Risk from session activity
    if (session.tradesCount > 20) riskScore += 15
    if (session.volumeTraded > 5000) riskScore += 10

    // Risk from amount
    if (attempt.amount > 1000) riskScore += 10
    if (attempt.amount > 5000) riskScore += 20

    return Math.min(100, riskScore)
  }

  private async updateReputationFromVerification(userId: string, verification: HumanVerification): Promise<void> {
    const currentReputation = this.reputationScores.get(userId) || this.getDefaultReputation()
    
    // Bonus for higher verification levels
    const verificationBonus = { Device: 0, Phone: 10, Orb: 25 }
    currentReputation.xp += verificationBonus[verification.level]
    currentReputation.score = this.calculateReputationScore(userId, currentReputation).score
    
    this.reputationScores.set(userId, currentReputation)
  }

  private async flagSuspiciousActivity(userId: string, flags: string[]): Promise<void> {
    const session = this.activeSessions.get(userId)
    if (session) {
      session.flags.push(...flags)
      session.isSuspicious = true
    }
    this.suspiciousUsers.add(userId)
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private getDefaultReputation(): ReputationScore {
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
}

export const antiManipulationService = new AntiManipulationService({
  enableReputationSystem: true,
  enableCooldowns: true,
  enableVolumeLimits: true,
  enableCommunityReporting: true,
  minVerificationLevel: 'Phone',
  suspiciousActivityThreshold: 3
})
