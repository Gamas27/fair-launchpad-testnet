import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { DatabaseService } from './database'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'

export interface AuthUser {
  walletAddress: string
  worldIdHash?: string
  verificationLevel: string
  reputationScore: number
  reputationLevel: string
}

export interface JWTPayload {
  walletAddress: string
  worldIdHash?: string
  verificationLevel: string
  iat: number
  exp: number
}

export class AuthService {
  private static instance: AuthService
  private db: DatabaseService

  private constructor() {
    this.db = DatabaseService.getInstance()
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  /**
   * Generate JWT token for user
   */
  generateToken(user: AuthUser): string {
    const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
      walletAddress: user.walletAddress,
      worldIdHash: user.worldIdHash,
      verificationLevel: user.verificationLevel,
    }

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: '7d',
    })
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload
    } catch (error) {
      console.error('Token verification failed:', error)
      return null
    }
  }

  /**
   * Extract token from request headers
   */
  extractTokenFromRequest(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7)
    }
    return null
  }

  /**
   * Get authenticated user from request
   */
  async getAuthenticatedUser(request: NextRequest): Promise<AuthUser | null> {
    const token = this.extractTokenFromRequest(request)
    if (!token) {
      return null
    }

    const payload = this.verifyToken(token)
    if (!payload) {
      return null
    }

    // Get user from database to ensure they still exist and get latest data
    const user = await this.db.getUser(payload.walletAddress)
    if (!user) {
      return null
    }

    return {
      walletAddress: user.walletAddress,
      worldIdHash: user.worldIdHash || undefined,
      verificationLevel: user.verificationLevel,
      reputationScore: user.reputationScore,
      reputationLevel: user.reputationLevel,
    }
  }

  /**
   * Create or update user session
   */
  async createSession(user: AuthUser): Promise<string> {
    const token = this.generateToken(user)
    
    return token
  }

  /**
   * Validate session and get user
   */
  async validateSession(sessionToken: string): Promise<AuthUser | null> {
    const payload = this.verifyToken(sessionToken)
    if (!payload) {
      return null
    }

    // Get user from database to ensure they still exist and get latest data
    const user = await this.db.getUser(payload.walletAddress)
    if (!user) {
      return null
    }

    return {
      walletAddress: user.walletAddress,
      worldIdHash: user.worldIdHash || undefined,
      verificationLevel: user.verificationLevel,
      reputationScore: user.reputationScore,
      reputationLevel: user.reputationLevel,
    }
  }

  /**
   * Invalidate session
   */
  async invalidateSession(sessionToken: string): Promise<void> {
    // Since we're using JWT tokens, we can't invalidate them server-side
    // In a production app, you'd want to maintain a blacklist of invalidated tokens
    // For now, we'll just return successfully
    return
  }

  /**
   * Middleware for protecting API routes
   */
  async requireAuth(request: NextRequest): Promise<AuthUser> {
    const user = await this.getAuthenticatedUser(request)
    if (!user) {
      throw new Error('Authentication required')
    }
    return user
  }

  /**
   * Middleware for optional authentication
   */
  async optionalAuth(request: NextRequest): Promise<AuthUser | null> {
    return this.getAuthenticatedUser(request)
  }

  /**
   * Check if user has required verification level
   */
  hasVerificationLevel(user: AuthUser, requiredLevel: string): boolean {
    const levels = ['device', 'document', 'orb']
    const userLevelIndex = levels.indexOf(user.verificationLevel)
    const requiredLevelIndex = levels.indexOf(requiredLevel)
    
    return userLevelIndex >= requiredLevelIndex
  }

  /**
   * Check if user meets minimum reputation requirements
   */
  meetsReputationRequirement(user: AuthUser, minScore: number): boolean {
    return user.reputationScore >= minScore
  }

  /**
   * Rate limiting check
   */
  async checkRateLimit(
    userAddress: string,
    action: string,
    maxRequests: number,
    windowMs: number
  ): Promise<boolean> {
    // This is a simplified rate limiting implementation
    // In production, you'd want to use Redis or a more sophisticated solution
    
    const now = new Date()
    const windowStart = new Date(now.getTime() - windowMs)
    
    // For now, always allow requests
    // In a production app, you'd implement proper rate limiting
    return true
  }
}

export default AuthService

