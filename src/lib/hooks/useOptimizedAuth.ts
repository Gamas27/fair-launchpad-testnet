import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useAuth'
import { PerformanceMonitor, ErrorHandler, CacheManager } from '@/lib/utils/performance'
import { WorldIdService } from '@/lib/services/world-id'
import { PrivyService } from '@/lib/services/privy'

// Optimized authentication hook with caching and performance monitoring
export function useOptimizedAuth() {
  const { isAuthenticated, user, loading, error, verifyWorldId, updateProfile } = useAuth()
  const [isInitialized, setIsInitialized] = useState(false)
  const [worldIdService, setWorldIdService] = useState<WorldIdService | null>(null)
  const [privyService, setPrivyService] = useState<PrivyService | null>(null)

  // Initialize services
  useEffect(() => {
    const initServices = async () => {
      try {
        const perf = PerformanceMonitor.getInstance()
        await perf.measureAsync('auth-init', async () => {
          // Initialize World ID service
          const worldIdApiKey = process.env.NEXT_PUBLIC_WORLD_ID_API_KEY
          if (worldIdApiKey) {
            setWorldIdService(WorldIdService.getInstance(worldIdApiKey))
          }

          // Initialize Privy service
          const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
          const privyAppSecret = process.env.NEXT_PUBLIC_PRIVY_APP_SECRET
          if (privyAppId && privyAppSecret) {
            setPrivyService(PrivyService.getInstance(privyAppId, privyAppSecret))
          }
        })
        setIsInitialized(true)
      } catch (error) {
        ErrorHandler.logError(error as Error, 'auth initialization')
      }
    }

    initServices()
  }, [])

  // Optimized World ID verification with caching
  const verifyWorldIdOptimized = useCallback(async (worldIdHash: string, verificationLevel: string) => {
    const cacheKey = `world-id-${worldIdHash}`
    const cached = CacheManager.get(cacheKey)
    
    if (cached) {
      console.log('Using cached World ID verification')
      return cached
    }

    try {
      const perf = PerformanceMonitor.getInstance()
      const result = await perf.measureAsync('world-id-verify', async () => {
        if (worldIdService) {
          return await worldIdService.verifyWorldId(worldIdHash, verificationLevel)
        }
        return await verifyWorldId(worldIdHash, verificationLevel)
      })

      // Cache successful verification for 1 hour
      CacheManager.set(cacheKey, result, 3600000)
      return result
    } catch (error) {
      ErrorHandler.logError(error as Error, 'World ID verification')
      throw error
    }
  }, [worldIdService, verifyWorldId])

  // Optimized wallet creation
  const createWalletOptimized = useCallback(async (userId: string, worldIdHash: string) => {
    try {
      const perf = PerformanceMonitor.getInstance()
      const result = await perf.measureAsync('wallet-creation', async () => {
        if (privyService) {
          return await privyService.createWallet(userId, worldIdHash)
        }
        // Fallback to mock wallet creation
        return {
          address: `0xMockPrivyWallet${Math.random().toString(36).substr(2, 9)}`,
          chainId: 1,
          isConnected: true,
          createdAt: new Date().toISOString(),
        }
      })

      return result
    } catch (error) {
      ErrorHandler.logError(error as Error, 'wallet creation')
      throw error
    }
  }, [privyService])

  // Optimized profile fetching with caching
  const fetchUserProfileOptimized = useCallback(async () => {
    if (!user?.id) return null

    const cacheKey = `user-profile-${user.id}`
    const cached = CacheManager.get(cacheKey)
    
    if (cached) {
      console.log('Using cached user profile')
      return cached
    }

    try {
      const perf = PerformanceMonitor.getInstance()
      const result = await perf.measureAsync('profile-fetch', async () => {
        // Mock profile fetch for now
        return { success: true, data: user }
      })

      // Cache profile for 5 minutes
      CacheManager.set(cacheKey, result, 300000)
      return result
    } catch (error) {
      ErrorHandler.logError(error as Error, 'profile fetch')
      throw error
    }
  }, [user?.id])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      CacheManager.clearExpired()
    }
  }, [])

  return {
    isAuthenticated,
    user,
    loading,
    error,
    isInitialized,
    worldIdService,
    privyService,
    verifyWorldId: verifyWorldIdOptimized,
    createWallet: createWalletOptimized,
    fetchUserProfile: fetchUserProfileOptimized,
    updateProfile,
  }
}
