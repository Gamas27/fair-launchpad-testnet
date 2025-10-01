'use client'

import { useState, useEffect, useCallback } from 'react'
import { authService, userService, tokenService, chatService, healthService, type User, type Token, type ChatRoom } from '@/lib/services/api'

// Authentication Hook
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const verifyWorldId = useCallback(async (worldIdHash: string, verificationLevel: string, proof?: any) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await authService.verifyWorldId(worldIdHash, verificationLevel, proof)
      
      if (response.success && response.data) {
        setUser(response.data)
        return response.data
      } else {
        setError(response.error || 'Verification failed')
        return null
      }
    } catch (err) {
      setError('Network error during verification')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setError(null)
  }, [])

  return {
    user,
    loading,
    error,
    verifyWorldId,
    logout,
    isAuthenticated: !!user
  }
}

// User Profile Hook
export const useUserProfile = (userId?: string) => {
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await userService.getProfile(id)
      
      if (response.success && response.data) {
        setProfile(response.data)
        return response.data
      } else {
        setError(response.error || 'Failed to fetch profile')
        return null
      }
    } catch (err) {
      setError('Network error fetching profile')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateProfile = useCallback(async (id: string, updates: Partial<User>) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await userService.updateProfile(id, updates)
      
      if (response.success && response.data) {
        setProfile(response.data)
        return response.data
      } else {
        setError(response.error || 'Failed to update profile')
        return null
      }
    } catch (err) {
      setError('Network error updating profile')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (userId) {
      fetchProfile(userId)
    }
  }, [userId, fetchProfile])

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile
  }
}

// Tokens Hook
export const useTokens = (filters?: {
  sortBy?: string
  order?: 'asc' | 'desc'
  limit?: number
  offset?: number
}) => {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTokens = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await tokenService.getTokens(filters)
      
      if (response.success && response.data) {
        setTokens(response.data)
        return response.data
      } else {
        setError(response.error || 'Failed to fetch tokens')
        return []
      }
    } catch (err) {
      setError('Network error fetching tokens')
      return []
    } finally {
      setLoading(false)
    }
  }, [filters])

  const getTokenById = useCallback(async (tokenId: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await tokenService.getTokenById(tokenId)
      
      if (response.success && response.data) {
        return response.data
      } else {
        setError(response.error || 'Failed to fetch token')
        return null
      }
    } catch (err) {
      setError('Network error fetching token')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const createToken = useCallback(async (tokenData: {
    name: string
    ticker: string
    description: string
    logo?: string
    socialLinks?: string
  }) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await tokenService.createToken(tokenData)
      
      if (response.success && response.data) {
        setTokens(prev => [response.data!, ...prev])
        return response.data
      } else {
        setError(response.error || 'Failed to create token')
        return null
      }
    } catch (err) {
      setError('Network error creating token')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTokens()
  }, [fetchTokens])

  return {
    tokens,
    loading,
    error,
    fetchTokens,
    getTokenById,
    createToken
  }
}

// Chat Hook
export const useChat = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRooms = useCallback(async (type?: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await chatService.getRooms(type)
      
      if (response.success && response.data) {
        setRooms(response.data)
        return response.data
      } else {
        setError(response.error || 'Failed to fetch chat rooms')
        return []
      }
    } catch (err) {
      setError('Network error fetching chat rooms')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const getMessages = useCallback(async (roomId: string, limit?: number) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await chatService.getMessages(roomId, limit)
      
      if (response.success && response.data) {
        return response.data
      } else {
        setError(response.error || 'Failed to fetch messages')
        return []
      }
    } catch (err) {
      setError('Network error fetching messages')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    getMessages
  }
}

// Health Check Hook
export const useHealth = () => {
  const [health, setHealth] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkHealth = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await healthService.checkHealth()
      
      if (response.success && response.data) {
        setHealth(response.data)
        return response.data
      } else {
        setError(response.error || 'Health check failed')
        return null
      }
    } catch (err) {
      setError('Network error during health check')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkHealth()
  }, [checkHealth])

  return {
    health,
    loading,
    error,
    checkHealth
  }
}

