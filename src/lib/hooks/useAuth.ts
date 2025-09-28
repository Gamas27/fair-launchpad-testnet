import { useState, useEffect } from 'react'
import { apiClient, API_ENDPOINTS, buildUrl } from '../api'

export interface User {
  id: string
  username: string
  displayName: string
  bio: string
  avatar: string
  verified: boolean
  repScore: number
  joinDate: string
  walletAddress: string
  stats: {
    tokensCreated: number
    tokensGraduated: number
    followers: number
    following: number
    totalVolume: number
    totalTrades: number
  }
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  })

  const verifyWorldId = async (worldIdHash: string, verificationLevel: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await apiClient.post(buildUrl(API_ENDPOINTS.AUTH.VERIFY_WORLD_ID), {
        worldIdHash,
        verificationLevel,
      })

      if (response.success) {
        const userData = response.data as any
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: true,
          user: userData.user,
          loading: false,
        }))
        return { success: true, data: response.data }
      } else {
        throw new Error(response.error || 'Verification failed')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Verification failed'
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      return { success: false, error: errorMessage }
    }
  }

  const fetchProfile = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await apiClient.get(buildUrl(API_ENDPOINTS.USER.PROFILE))
      
      if (response.success) {
        const userData = response.data as User
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: true,
          user: userData,
          loading: false,
        }))
        return { success: true, data: response.data }
      } else {
        throw new Error(response.error || 'Failed to fetch profile')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile'
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      return { success: false, error: errorMessage }
    }
  }

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await apiClient.put(buildUrl(API_ENDPOINTS.USER.UPDATE_PROFILE), profileData)
      
      if (response.success) {
        const userData = response.data as User
        setAuthState(prev => ({
          ...prev,
          user: userData,
          loading: false,
        }))
        return { success: true, data: response.data }
      } else {
        throw new Error(response.error || 'Failed to update profile')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile'
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    })
  }

  // Initialize auth state on mount
  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    ...authState,
    verifyWorldId,
    fetchProfile,
    updateProfile,
    logout,
  }
}
