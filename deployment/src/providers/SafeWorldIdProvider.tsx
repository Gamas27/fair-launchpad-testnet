'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { safeWorldIdService, WorldIdConfig, WorldIdVerification } from '@/services/safeWorldIdService'

interface SafeWorldIdContextType {
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
  clearError: () => void
}

const SafeWorldIdContext = createContext<SafeWorldIdContextType | undefined>(undefined)

interface SafeWorldIdProviderProps {
  children: ReactNode
  config?: WorldIdConfig
}

export function SafeWorldIdProvider({ children, config }: SafeWorldIdProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [verificationLevel, setVerificationLevel] = useState<'Device' | 'Phone' | 'Orb'>('Device')
  const [worldId, setWorldId] = useState<string | null>(null)
  const [account, setAccount] = useState<{ address: string; balance: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const initialize = async (config: WorldIdConfig) => {
    setLoading(true)
    setError(null)
    
    try {
      await safeWorldIdService.initialize(config)
      setIsInitialized(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize World ID'
      setError(errorMessage)
      console.warn('Safe World ID initialization failed, continuing in mock mode:', errorMessage)
      setIsInitialized(true) // Continue anyway
    } finally {
      setLoading(false)
    }
  }

  const connect = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const verification: WorldIdVerification = await safeWorldIdService.connect()
      
      setIsConnected(verification.isVerified)
      setIsVerified(verification.isVerified)
      setVerificationLevel(verification.verificationLevel)
      setWorldId(verification.worldId)
      
      if (verification.error) {
        setError(verification.error)
      }
      
      if (verification.isVerified) {
        const accountInfo = await safeWorldIdService.getAccount()
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

  const disconnect = async () => {
    setLoading(true)
    setError(null)
    
    try {
      await safeWorldIdService.disconnect()
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

  const signMessage = async (message: string): Promise<string> => {
    if (!isConnected) {
      throw new Error('Not connected to World ID')
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const signature = await safeWorldIdService.signMessage(message)
      return signature
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign message'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const sendTransaction = async (transaction: { to: string; value: string; data?: string }): Promise<string> => {
    if (!isConnected) {
      throw new Error('Not connected to World ID')
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const txHash = await safeWorldIdService.sendTransaction(transaction)
      return txHash
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send transaction'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    if (config && !isInitialized && typeof window !== 'undefined') {
      initialize(config).catch(console.error)
    }
  }, [config, isInitialized])

  const value: SafeWorldIdContextType = {
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
    clearError,
  }

  return (
    <SafeWorldIdContext.Provider value={value}>
      {children}
    </SafeWorldIdContext.Provider>
  )
}

export function useSafeWorldId(): SafeWorldIdContextType {
  const context = useContext(SafeWorldIdContext)
  if (context === undefined) {
    throw new Error('useSafeWorldId must be used within a SafeWorldIdProvider')
  }
  return context
}

export default SafeWorldIdProvider
