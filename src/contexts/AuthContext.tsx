'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePrivyWallet } from '@/hooks/usePrivyWallet'
import { useSafeWorldId } from '@/providers/SafeWorldIdProvider'

interface AuthContextType {
  isConnected: boolean
  isVerified: boolean
  address: string | null
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isConnected: privyConnected, address: privyAddress } = usePrivyWallet()
  const { isVerified: worldIdVerified } = useSafeWorldId()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Development mode: Override authentication state
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isConnected = isDevelopment ? true : privyConnected
  const isVerified = isDevelopment ? true : worldIdVerified
  const address = isDevelopment ? '0x1234567890123456789012345678901234567890' : privyAddress

  useEffect(() => {
    setIsLoading(false)
  }, [privyConnected, worldIdVerified])

  const value: AuthContextType = {
    isConnected,
    isVerified,
    address,
    isLoading,
    error
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
