// Production-ready rate limiter for Alchemy API calls
class AlchemyRateLimiter {
  private requests: number[] = []
  private readonly maxRequests: number
  private readonly windowMs: number

  constructor(maxRequests: number = 100, windowMs: number = 60000) {
    this.maxRequests = maxRequests
    this.windowMs = windowMs
  }

  // Check if we can make a request
  canMakeRequest(): boolean {
    const now = Date.now()
    
    // Remove old requests outside the window
    this.requests = this.requests.filter(time => now - time < this.windowMs)
    
    return this.requests.length < this.maxRequests
  }

  // Record a request
  recordRequest(): void {
    this.requests.push(Date.now())
  }

  // Get time until next request is allowed
  getTimeUntilNextRequest(): number {
    if (this.canMakeRequest()) return 0
    
    const oldestRequest = Math.min(...this.requests)
    return this.windowMs - (Date.now() - oldestRequest)
  }

  // Wait for rate limit to reset
  async waitForRateLimit(): Promise<void> {
    const waitTime = this.getTimeUntilNextRequest()
    if (waitTime > 0) {
      console.log(`⏳ Rate limit reached, waiting ${waitTime}ms...`)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
  }

  // Get current usage stats
  getUsageStats(): { current: number; max: number; remaining: number } {
    const now = Date.now()
    this.requests = this.requests.filter(time => now - time < this.windowMs)
    
    return {
      current: this.requests.length,
      max: this.maxRequests,
      remaining: Math.max(0, this.maxRequests - this.requests.length)
    }
  }
}

// Global rate limiter instance
export const alchemyRateLimiter = new AlchemyRateLimiter(100, 60000) // 100 requests per minute

// Production-ready API call wrapper with rate limiting
export const withRateLimit = async <T>(
  apiCall: () => Promise<T>,
  operation: string = 'API call'
): Promise<T> => {
  // Wait for rate limit if needed
  await alchemyRateLimiter.waitForRateLimit()
  
  // Record the request
  alchemyRateLimiter.recordRequest()
  
  console.log(`🚀 Making ${operation} (Rate limit: ${alchemyRateLimiter.getUsageStats().remaining}/${alchemyRateLimiter.getUsageStats().max} remaining)`)
  
  return apiCall()
}

// Monitor API usage
export const getAlchemyUsageStats = () => {
  return alchemyRateLimiter.getUsageStats()
}

