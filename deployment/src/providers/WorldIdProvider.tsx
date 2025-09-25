'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { worldIdService, WorldIdConfig, WorldIdVerification, WorldIdProof } from '@/services/worldIdService'

interface WorldIdContextType {
  isInitialized: boolean
  isConnected: boolean
  isVerified: boolean
  verificationLevel: 'Device' | 'Phone' | 'Orb'
  worldId: string | null
  account: { address: string; balance: string } | null
  error: string | null
  loading: boolean
  initialize: (config: WorldIdConfig) => Promise<void>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  signMessage: (message: string) => Promise<string>
  sendTransaction: (transaction: { to: string; value: string; data?: string }) => Promise<string>
  verifyProof: (proof: WorldIdProof) => Promise<boolean>
  clearError: () => void
}

const WorldIdContext = createContext<WorldIdContextType | undefined>(undefined)

interface WorldIdProviderProps {
  children: ReactNode
  config?: WorldIdConfig
}

export function WorldIdProvider({ children, config }: WorldIdProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)
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
  const initialize = async (config: WorldIdConfig) => {
    setLoading(true)
    setError(null)
    
    try {
      await worldIdService.initialize(config)
      setIsInitialized(true)
      
      // Auto-connect if user was previously verified
      const isVerified = await worldIdService.connect()
      if (isVerified.isVerified) {
        setIsConnected(true)
        setIsVerified(true)
        setVerificationLevel(isVerified.verificationLevel)
        setWorldId(isVerified.worldId)
        
        const accountInfo = await worldIdService.getAccount()
        setAccount(accountInfo)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize World ID'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Connect to World ID
   */
  const connect = async () => {
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
  }

  /**
   * Disconnect from World ID
   */
  const disconnect = async () => {
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
  }

  /**
   * Sign a message
   */
  const signMessage = async (message: string): Promise<string> => {
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
  }

  /**
   * Send a transaction
   */
  const sendTransaction = async (transaction: { to: string; value: string; data?: string }): Promise<string> => {
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
  }

  /**
   * Verify a World ID proof
   */
  const verifyProof = async (proof: WorldIdProof): Promise<boolean> => {
    try {
      return await worldIdService.verifyProof(proof)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify proof'
      setError(errorMessage)
      return false
    }
  }

  /**
   * Clear error
   */
  const clearError = () => {
    setError(null)
  }

  /**
   * Auto-initialize if config is provided (client-side only)
   */
  useEffect(() => {
    if (config && !isInitialized && typeof window !== 'undefined') {
      initialize(config).catch(console.error)
    }
  }, [config, isInitialized])

  const value: WorldIdContextType = {
    isInitialized,
    isConnected,
    isVerified,
    verificationLevel,
    worldId,
    account,
    error,
    loading,
    initialize,
    connect,
    disconnect,
    signMessage,
    sendTransaction,
    verifyProof,
    clearError,
  }

  return (
    <WorldIdContext.Provider value={value}>
      {children}
    </WorldIdContext.Provider>
  )
}

/**
 * Hook to use World ID context
 */
export function useWorldId(): WorldIdContextType {
  const context = useContext(WorldIdContext)
  if (context === undefined) {
    throw new Error('useWorldId must be used within a WorldIdProvider')
  }
  return context
}

export default WorldIdProvider
