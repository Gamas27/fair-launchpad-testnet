// Performance optimization utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startTimer(label: string): void {
    this.metrics.set(label, performance.now())
  }

  endTimer(label: string): number {
    const startTime = this.metrics.get(label)
    if (!startTime) {
      console.warn(`Timer ${label} was not started`)
      return 0
    }
    
    const duration = performance.now() - startTime
    this.metrics.delete(label)
    
    // Log slow operations
    if (duration > 1000) {
      console.warn(`Slow operation detected: ${label} took ${duration.toFixed(2)}ms`)
    }
    
    return duration
  }

  measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.startTimer(label)
    return fn().finally(() => {
      this.endTimer(label)
    })
  }
}

// Error handling and logging
export class ErrorHandler {
  static logError(error: Error, context?: string): void {
    console.error(`Error${context ? ` in ${context}` : ''}:`, {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    })
  }

  static handleApiError(error: unknown, endpoint: string): never {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(`API Error in ${endpoint}:`, errorMessage)
    throw new Error(`API call failed: ${errorMessage}`)
  }
}

// Caching utilities
export class CacheManager {
  private static cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map()

  static set(key: string, data: any, ttl: number = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  static get(key: string): any | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  static clear(): void {
    this.cache.clear()
  }

  static clearExpired(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key)
      }
    }
  }
}
