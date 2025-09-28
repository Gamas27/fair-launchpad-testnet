// Security utilities for production
export class SecurityManager {
  // Rate limiting
  private static rateLimitMap: Map<string, { count: number; resetTime: number }> = new Map()

  static checkRateLimit(identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now()
    const key = identifier
    const current = this.rateLimitMap.get(key)

    if (!current || now > current.resetTime) {
      this.rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
      return true
    }

    if (current.count >= maxRequests) {
      return false
    }

    current.count++
    return true
  }

  // Input validation
  static validateWalletAddress(address: string): boolean {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
    const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
    
    return ethAddressRegex.test(address) || solanaAddressRegex.test(address)
  }

  static validateWorldIdHash(hash: string): boolean {
    const worldIdHashRegex = /^0x[a-fA-F0-9]{64}$/
    return worldIdHashRegex.test(hash)
  }

  static sanitizeInput(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim()
  }

  // Security headers
  static getSecurityHeaders(): Record<string, string> {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    }
  }

  // CORS configuration
  static getCorsHeaders(): Record<string, string> {
    return {
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
        ? 'https://fair-launchpad-testnet-o5qdiyisk-launchworld.vercel.app'
        : '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
    }
  }
}

// Environment validation
export class EnvironmentValidator {
  static validateRequiredEnvVars(): void {
    const required = [
      'DATABASE_URL',
      'NEXTAUTH_SECRET',
      'NEXTAUTH_URL',
    ]

    const missing = required.filter(key => !process.env[key])
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
    }
  }

  static validateOptionalEnvVars(): void {
    const optional = [
      'NEXT_PUBLIC_WORLD_ID_API_KEY',
      'NEXT_PUBLIC_PRIVY_APP_ID',
      'NEXT_PUBLIC_PRIVY_APP_SECRET',
    ]

    const missing = optional.filter(key => !process.env[key])
    
    if (missing.length > 0) {
      console.warn(`Optional environment variables not set: ${missing.join(', ')}`)
    }
  }
}
