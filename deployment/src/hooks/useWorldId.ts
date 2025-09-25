'use client'

import { useState, useEffect, useCallback } from 'react'
import { worldIdService, WorldIdVerification, WorldIdConfig } from '@/services/worldIdService'

export interface UseWorldIdReturn {
  isConnected: boolean
  isVerified: boolean
  verificationLevel: 'Device' | 'Phone' | 'Orb'
  worldId: string | null
  account: { address: string; balance: string } | null
  error: string | null
  loading: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  signMessage: (message: string) => Promise<string>
  sendTransaction: (transaction: { to: string; value: string; data?: string }) => Promise<string>
  initialize: (config: WorldIdConfig) => Promise<void>
}

export const useWorldId = (): UseWorldIdReturn => {
  const [isConnected, setIsConnected] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [verificationLevel, setVerificationLevel] = useState<'Device' | 'Phone' | 'Orb'>('Device')
  const [worldId, setWorldId] = useState<string | null>(null)
  const [account, setAccount] = useState<{ address: string; balance: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  /**
   * Initialize World ID service
   */
  const initialize = useCallback(async (config: WorldIdConfig) => {
    setLoading(true)
    setError(null)
    
    try {
      await worldIdService.initialize(config)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize World ID'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Connect to World ID
   */
  const connect = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const verification: WorldIdVerification = await worldIdService.connect()
      
      setIsConnected(verification.isVerified)
      setIsVerified(verification.isVerified)
      setVerificationLevel(verification.verificationLevel)
      setWorldId(verification.worldId)
      
      if (verification.error) {
        setError(verification.error)
      }
      
      // Get account information if connected
      if (verification.isVerified) {
        const accountInfo = await worldIdService.getAccount()
        setAccount(accountInfo)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to World ID'
      setError(errorMessage)
      setIsConnected(false)
      setIsVerified(false)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Disconnect from World ID
   */
  const disconnect = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      await worldIdService.disconnect()
      setIsConnected(false)
      setIsVerified(false)
      setVerificationLevel('Device')
      setWorldId(null)
      setAccount(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to disconnect from World ID'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Sign a message
   */
  const signMessage = useCallback(async (message: string): Promise<string> => {
    if (!isConnected) {
      throw new Error('Not connected to World ID')
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const signature = await worldIdService.signMessage(message)
      return signature
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign message'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [isConnected])

  /**
   * Send a transaction
   */
  const sendTransaction = useCallback(async (transaction: { to: string; value: string; data?: string }): Promise<string> => {
    if (!isConnected) {
      throw new Error('Not connected to World ID')
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const txHash = await worldIdService.sendTransaction(transaction)
      return txHash
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send transaction'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [isConnected])

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isConnected,
    isVerified,
    verificationLevel,
    worldId,
    account,
    error,
    loading,
    connect,
    disconnect,
    signMessage,
    sendTransaction,
    initialize,
  }
}
