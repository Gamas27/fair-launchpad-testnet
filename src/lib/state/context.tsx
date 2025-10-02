'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { G8AppState, G8Action, G8ContextType, G8User, G8Token, G8ChatRoom } from './types'
import { g8Reducer, G8_INITIAL_STATE } from './reducer'

const G8Context = createContext<G8ContextType | undefined>(undefined)

interface G8ProviderProps {
  children: React.ReactNode
}

export function G8Provider({ children }: G8ProviderProps) {
  const [state, dispatch] = useReducer(g8Reducer, G8_INITIAL_STATE)

  // Navigation functions
  const navigate = useCallback((route: string, params?: any) => {
    dispatch({
      type: 'NAVIGATE',
      payload: { route, params }
    })
  }, [])

  const goBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET_NAVIGATION' })
  }, [])

  // Loading and error functions
  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }, [])

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }, [])

  // User functions
  const setUser = useCallback((user: G8User | null) => {
    dispatch({ type: 'SET_USER', payload: user })
  }, [])

  // Data functions
  const setTokens = useCallback((tokens: G8Token[]) => {
    dispatch({ type: 'SET_TOKENS', payload: tokens })
  }, [])

  const setChatRooms = useCallback((rooms: G8ChatRoom[]) => {
    dispatch({ type: 'SET_CHAT_ROOMS', payload: rooms })
  }, [])

  const selectToken = useCallback((token: G8Token | null) => {
    dispatch({ type: 'SELECT_TOKEN', payload: token })
  }, [])

  const selectChatRoom = useCallback((room: G8ChatRoom | null) => {
    dispatch({ type: 'SELECT_CHAT_ROOM', payload: room })
  }, [])

  // Settings functions
  const updateSettings = useCallback((settings: Partial<G8AppState['notifications']>) => {
    dispatch({ type: 'UPDATE_NOTIFICATIONS', payload: settings })
  }, [])

  // Persist state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('g8-app-state', JSON.stringify(state))
    }
  }, [state])

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('g8-app-state')
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState)
          // Only restore non-sensitive data
          if (parsedState.theme) {
            dispatch({ type: 'SET_THEME', payload: parsedState.theme })
          }
          if (parsedState.animations !== undefined) {
            dispatch({ type: 'TOGGLE_ANIMATIONS', payload: parsedState.animations })
          }
          if (parsedState.notifications) {
            dispatch({ type: 'UPDATE_NOTIFICATIONS', payload: parsedState.notifications })
          }
          if (parsedState.user) {
            dispatch({ type: 'SET_USER', payload: parsedState.user })
          }
        } catch (error) {
          console.error('Failed to load saved state:', error)
        }
      }
    }
  }, [])

  const contextValue: G8ContextType = {
    state,
    dispatch,
    navigate,
    goBack,
    reset,
    setLoading,
    setError,
    setUser,
    setTokens,
    setChatRooms,
    selectToken,
    selectChatRoom,
    updateSettings
  }

  return (
    <G8Context.Provider value={contextValue}>
      {children}
    </G8Context.Provider>
  )
}

export function useG8() {
  const context = useContext(G8Context)
  if (context === undefined) {
    throw new Error('useG8 must be used within a G8Provider')
  }
  return context
}

// Convenience hooks for specific state slices
export function useG8User() {
  const { state, setUser } = useG8()
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isWorldIdVerified: state.isWorldIdVerified,
    isWalletConnected: state.isWalletConnected,
    setUser
  }
}

export function useG8Navigation() {
  const { state, navigate, goBack, reset } = useG8()
  return {
    currentRoute: state.currentRoute,
    navigationHistory: state.navigationHistory,
    canGoBack: state.navigationHistory.length > 1,
    navigate,
    goBack,
    reset
  }
}

export function useG8Data() {
  const { state, setTokens, setChatRooms, selectToken, selectChatRoom } = useG8()
  return {
    tokens: state.tokens,
    chatRooms: state.chatRooms,
    selectedToken: state.selectedToken,
    selectedChatRoom: state.selectedChatRoom,
    setTokens,
    setChatRooms,
    selectToken,
    selectChatRoom
  }
}

export function useG8UI() {
  const { state, dispatch } = useG8()
  return {
    activeTab: state.activeTab,
    showOnboarding: state.showOnboarding,
    showCreateToken: state.showCreateToken,
    showChat: state.showChat,
    isLoading: state.isLoading,
    error: state.error,
    setActiveTab: (tab: string) => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab }),
    toggleOnboarding: (show: boolean) => dispatch({ type: 'TOGGLE_ONBOARDING', payload: show }),
    toggleCreateToken: (show: boolean) => dispatch({ type: 'TOGGLE_CREATE_TOKEN', payload: show }),
    toggleChat: (show: boolean) => dispatch({ type: 'TOGGLE_CHAT', payload: show })
  }
}

export function useG8Settings() {
  const { state, updateSettings, dispatch } = useG8()
  return {
    notifications: state.notifications,
    theme: state.theme,
    animations: state.animations,
    updateNotifications: updateSettings,
    setTheme: (theme: 'light' | 'dark' | 'auto') => dispatch({ type: 'SET_THEME', payload: theme }),
    toggleAnimations: (enabled: boolean) => dispatch({ type: 'TOGGLE_ANIMATIONS', payload: enabled })
  }
}

