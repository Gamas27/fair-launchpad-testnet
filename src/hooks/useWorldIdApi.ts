'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiService } from '@/services/apiService'
import { useWallet } from './useWallet'
import { worldIdService } from '@/services/worldIdService'

interface User {
  walletAddress: string
  worldIdHash: string | null
  verificationLevel: string
  reputationScore: number
  reputationLevel: string
  totalTrades: number
  totalVolume: number
  riskScore: number
  isBanned: boolean
  createdAt: string
}

export function useWorldIdApi() {
  const { address, isConnected } = useWallet()
  const [user, setUser] = useState<User | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUserProfile = useCallback(async () => {
    if (!isConnected || !address) return

    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiService.getUserProfile()
      setUser(response)
    } catch (err) {
      console.error('Failed to fetch user profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch user profile')
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, address])

  const verifyWorldId = useCallback(async (verificationLevel: 'device' | 'document' | 'orb' = 'device') => {
    if (!isConnected || !address) {
      setError('Wallet not connected')
      return false
    }

    try {
      setIsVerifying(true)
      setError(null)

      // Get World ID proof
      const worldIdProof = await worldIdService.verifyIdentity(verificationLevel)
      
      if (!worldIdProof) {
        setError('World ID verification failed')
        return false
      }

      // Send verification to backend
      const response = await apiService.verifyWorldId({
        walletAddress: address,
        worldIdHash: worldIdProof.nullifierHash,
        verificationLevel,
        proof: worldIdProof
      })

      // Store session token
      localStorage.setItem('sessionToken', response.sessionToken)
      
      // Update user state
      setUser(response.user)
      
      return true
    } catch (err) {
      console.error('World ID verification failed:', err)
      setError(err instanceof Error ? err.message : 'World ID verification failed')
      return false
    } finally {
      setIsVerifying(false)
    }
  }, [isConnected, address])

  const updateUserProfile = useCallback(async (data: Partial<User>) => {
    if (!isConnected || !address) return

    try {
      setError(null)
      
      const response = await apiService.updateUserProfile(data)
      setUser(response)
      
      return response
    } catch (err) {
      console.error('Failed to update user profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to update user profile')
      return null
    }
  }, [isConnected, address])

  const refreshUser = useCallback(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

  // Check for existing session on mount
  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken')
    if (sessionToken && isConnected && address) {
      fetchUserProfile()
    }
  }, [isConnected, address, fetchUserProfile])

  return {
    // Data
    user,
    
    // State
    isVerifying,
    isLoading,
    error,
    
    // Actions
    verifyWorldId,
    updateUserProfile,
    refreshUser,
    
    // Computed values
    isVerified: !!user?.worldIdHash,
    verificationLevel: user?.verificationLevel || 'device',
    reputationScore: user?.reputationScore || 0,
    reputationLevel: user?.reputationLevel || 'Bronze',
    totalTrades: user?.totalTrades || 0,
    totalVolume: user?.totalVolume || 0,
    riskScore: user?.riskScore || 0,
    isBanned: user?.isBanned || false,
    
    // Verification helpers
    canVerify: isConnected && !isVerifying,
    needsVerification: isConnected && !user?.worldIdHash,
  }
}
