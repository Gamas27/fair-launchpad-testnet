# 🔄 State Management - Fair Launchpad

## 🎯 State Architecture Overview

### **State Management Strategy**
```
┌─────────────────────────────────────────────────────────────┐
│                State Management Architecture                │
├─────────────────────────────────────────────────────────────┤
│  G8Provider (React Context)                               │
│  ├─ G8Reducer (State Logic)                                │
│  ├─ G8Actions (Action Types)                               │
│  └─ G8Selectors (Optimized Selectors)                       │
├─────────────────────────────────────────────────────────────┤
│  Persistence Layer                                         │
│  ├─ localStorage (User Preferences)                        │
│  ├─ Session Storage (Temporary Data)                       │
│  └─ IndexedDB (Large Data Sets)                           │
├─────────────────────────────────────────────────────────────┤
│  External State                                             │
│  ├─ React Query (Server State)                             │
│  ├─ Wagmi (Blockchain State)                              │
│  └─ World ID (Authentication State)                       │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ State Structure

### **Core State Schema**
```typescript
interface G8AppState {
  // User State
  user: G8User | null
  isAuthenticated: boolean
  isWorldIdVerified: boolean
  isWalletConnected: boolean
  
  // Navigation State
  currentRoute: string
  navigationHistory: string[]
  isLoading: boolean
  error: string | null
  
  // Data State
  tokens: G8Token[]
  chatRooms: G8ChatRoom[]
  selectedToken: G8Token | null
  selectedChatRoom: G8ChatRoom | null
  
  // UI State
  activeTab: string
  showOnboarding: boolean
  showCreateToken: boolean
  showChat: boolean
  
  // Settings State
  notifications: {
    enabled: boolean
    priceAlerts: boolean
    chatMessages: boolean
    campaignUpdates: boolean
  }
  
  // Theme State
  theme: 'light' | 'dark' | 'auto'
  animations: boolean
}
```

### **User State Schema**
```typescript
interface G8User {
  id: string
  username: string
  email?: string
  avatar?: string
  walletAddress?: string
  isWorldIdVerified: boolean
  reputation: {
    level: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
    xp: number
    achievements: string[]
  }
  preferences: {
    theme: 'light' | 'dark' | 'auto'
    notifications: boolean
    language: string
  }
  createdAt: Date
  updatedAt: Date
}
```

### **Token State Schema**
```typescript
interface G8Token {
  id: string
  name: string
  symbol: string
  description: string
  logo: string
  website?: string
  twitter?: string
  telegram?: string
  creator: {
    id: string
    username: string
    avatar?: string
  }
  economics: {
    totalSupply: number
    currentPrice: number
    marketCap: number
    liquidity: number
  }
  status: 'active' | 'paused' | 'graduated'
  createdAt: Date
  updatedAt: Date
}
```

## 🔄 Action System

### **Action Types**
```typescript
// Navigation Actions
type NavigationAction = 
  | { type: 'NAVIGATE'; payload: { route: string; params?: any } }
  | { type: 'GO_BACK' }
  | { type: 'RESET_NAVIGATION' }

// Loading Actions
type LoadingAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }

// User Actions
type UserAction =
  | { type: 'SET_USER'; payload: G8User | null }
  | { type: 'UPDATE_USER'; payload: Partial<G8User> }
  | { type: 'LOGOUT' }

// Data Actions
type DataAction =
  | { type: 'SET_TOKENS'; payload: G8Token[] }
  | { type: 'ADD_TOKEN'; payload: G8Token }
  | { type: 'UPDATE_TOKEN'; payload: { id: string; updates: Partial<G8Token> } }
  | { type: 'SELECT_TOKEN'; payload: G8Token | null }

// UI Actions
type UIAction =
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'TOGGLE_ONBOARDING'; payload: boolean }
  | { type: 'TOGGLE_CREATE_TOKEN'; payload: boolean }
  | { type: 'TOGGLE_CHAT'; payload: boolean }

// Settings Actions
type SettingsAction =
  | { type: 'UPDATE_NOTIFICATIONS'; payload: Partial<NotificationSettings> }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'auto' }
  | { type: 'TOGGLE_ANIMATIONS'; payload: boolean }
```

### **Reducer Implementation**
```typescript
export function g8Reducer(state: G8AppState, action: G8Action): G8AppState {
  switch (action.type) {
    // Navigation Actions
    case 'NAVIGATE':
      return {
        ...state,
        currentRoute: action.payload.route,
        navigationHistory: [...state.navigationHistory, action.payload.route],
        error: null
      }
    
    case 'GO_BACK':
      if (state.navigationHistory.length > 1) {
        const newHistory = [...state.navigationHistory]
        newHistory.pop()
        return {
          ...state,
          currentRoute: newHistory[newHistory.length - 1],
          navigationHistory: newHistory
        }
      }
      return state
    
    // User Actions
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isWorldIdVerified: action.payload?.isWorldIdVerified || false,
        isWalletConnected: !!action.payload?.walletAddress
      }
    
    // Data Actions
    case 'SET_TOKENS':
      return {
        ...state,
        tokens: action.payload
      }
    
    case 'ADD_TOKEN':
      return {
        ...state,
        tokens: [...state.tokens, action.payload]
      }
    
    // UI Actions
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload
      }
    
    // Settings Actions
    case 'UPDATE_NOTIFICATIONS':
      return {
        ...state,
        notifications: { ...state.notifications, ...action.payload }
      }
    
    default:
      return state
  }
}
```

## 🎯 State Selectors

### **Optimized Selectors**
```typescript
// Basic Selectors
export const selectUser = (state: G8AppState) => state.user
export const selectIsAuthenticated = (state: G8AppState) => state.isAuthenticated
export const selectCurrentRoute = (state: G8AppState) => state.currentRoute
export const selectTokens = (state: G8AppState) => state.tokens
export const selectSelectedToken = (state: G8AppState) => state.selectedToken

// Computed Selectors
export const selectUserReputation = (state: G8AppState) => {
  return state.user?.reputation || null
}

export const selectActiveTokens = (state: G8AppState) => {
  return state.tokens.filter(token => token.status === 'active')
}

export const selectUserTokens = (state: G8AppState) => {
  if (!state.user) return []
  return state.tokens.filter(token => token.creator.id === state.user!.id)
}

export const selectTokenById = (id: string) => (state: G8AppState) => {
  return state.tokens.find(token => token.id === id)
}

// Performance Optimized Selectors
export const selectTokensByCreator = (creatorId: string) => (state: G8AppState) => {
  return state.tokens.filter(token => token.creator.id === creatorId)
}

export const selectTokensByStatus = (status: TokenStatus) => (state: G8AppState) => {
  return state.tokens.filter(token => token.status === status)
}
```

### **Memoized Selectors**
```typescript
import { createSelector } from '@reduxjs/toolkit'

// Memoized selectors for performance
export const selectTokenStats = createSelector(
  [selectTokens],
  (tokens) => {
    const totalTokens = tokens.length
    const activeTokens = tokens.filter(t => t.status === 'active').length
    const totalMarketCap = tokens.reduce((sum, token) => sum + token.economics.marketCap, 0)
    
    return {
      totalTokens,
      activeTokens,
      totalMarketCap,
      averageMarketCap: totalMarketCap / totalTokens
    }
  }
)

export const selectUserStats = createSelector(
  [selectUser, selectUserTokens],
  (user, userTokens) => {
    if (!user) return null
    
    const totalTokensCreated = userTokens.length
    const activeTokens = userTokens.filter(t => t.status === 'active').length
    const totalVolume = userTokens.reduce((sum, token) => sum + token.economics.marketCap, 0)
    
    return {
      totalTokensCreated,
      activeTokens,
      totalVolume,
      reputation: user.reputation
    }
  }
)
```

## 💾 State Persistence

### **Persistence Strategy**
```typescript
export class StatePersistenceService {
  private static instance: StatePersistenceService
  private config: PersistenceConfig
  
  constructor(config: PersistenceConfig) {
    this.config = config
  }
  
  // Save state to localStorage
  saveState(state: G8AppState): void {
    if (typeof window === 'undefined') return
    
    const stateToSave = {
      user: state.user,
      theme: state.theme,
      animations: state.animations,
      notifications: state.notifications,
      activeTab: state.activeTab
    }
    
    try {
      localStorage.setItem('g8-app-state', JSON.stringify(stateToSave))
    } catch (error) {
      console.error('Failed to save state:', error)
    }
  }
  
  // Load state from localStorage
  loadState(): Partial<G8AppState> | null {
    if (typeof window === 'undefined') return null
    
    try {
      const savedState = localStorage.getItem('g8-app-state')
      return savedState ? JSON.parse(savedState) : null
    } catch (error) {
      console.error('Failed to load state:', error)
      return null
    }
  }
  
  // Clear persisted state
  clearState(): void {
    if (typeof window === 'undefined') return
    
    localStorage.removeItem('g8-app-state')
  }
}
```

### **Selective Persistence**
```typescript
// Only persist non-sensitive data
const PERSISTENT_STATE_KEYS = [
  'theme',
  'animations',
  'notifications',
  'activeTab',
  'user.preferences'
] as const

// Exclude sensitive data from persistence
const SENSITIVE_STATE_KEYS = [
  'user.walletAddress',
  'user.privateKeys',
  'tokens.privateData'
] as const

export function createPersistentState(state: G8AppState): Partial<G8AppState> {
  const persistentState: Partial<G8AppState> = {}
  
  // Only include safe, non-sensitive data
  if (state.theme) persistentState.theme = state.theme
  if (state.animations !== undefined) persistentState.animations = state.animations
  if (state.notifications) persistentState.notifications = state.notifications
  if (state.activeTab) persistentState.activeTab = state.activeTab
  
  return persistentState
}
```

## 🔄 State Synchronization

### **External State Integration**
```typescript
// React Query integration
export function useTokenData() {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: () => apiClient.getTokens(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Wagmi integration
export function useWalletState() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  
  return {
    address,
    isConnected,
    balance
  }
}

// World ID integration
export function useWorldIdState() {
  const { isVerified, verify } = useWorldId()
  
  return {
    isVerified,
    verify
  }
}
```

### **State Synchronization Hooks**
```typescript
export function useStateSync() {
  const { state, dispatch } = useG8()
  const walletState = useWalletState()
  const worldIdState = useWorldIdState()
  
  // Sync wallet state
  useEffect(() => {
    if (walletState.isConnected && walletState.address) {
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          walletAddress: walletState.address,
          isWalletConnected: true
        }
      })
    }
  }, [walletState.isConnected, walletState.address, dispatch])
  
  // Sync World ID state
  useEffect(() => {
    if (worldIdState.isVerified) {
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          isWorldIdVerified: true
        }
      })
    }
  }, [worldIdState.isVerified, dispatch])
}
```

## 🎯 Performance Optimization

### **State Optimization Strategies**
```typescript
// Memoized selectors to prevent unnecessary re-renders
export const useOptimizedSelector = <T>(
  selector: (state: G8AppState) => T,
  deps: any[] = []
) => {
  const { state } = useG8()
  
  return useMemo(() => selector(state), [state, ...deps])
}

// Debounced state updates
export const useDebouncedState = <T>(
  value: T,
  delay: number = 300
): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debouncedValue
}

// State normalization for large datasets
export function normalizeTokens(tokens: G8Token[]): NormalizedTokens {
  const byId: Record<string, G8Token> = {}
  const allIds: string[] = []
  
  tokens.forEach(token => {
    byId[token.id] = token
    allIds.push(token.id)
  })
  
  return { byId, allIds }
}
```

### **State Cleanup**
```typescript
export function useStateCleanup() {
  const { state, dispatch } = useG8()
  
  useEffect(() => {
    // Cleanup on unmount
    return () => {
      // Clear sensitive data
      dispatch({ type: 'CLEAR_SENSITIVE_DATA' })
    }
  }, [dispatch])
  
  // Periodic cleanup of old data
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      // Remove old chat messages
      // Clear expired tokens
      // Clean up navigation history
    }, 5 * 60 * 1000) // Every 5 minutes
    
    return () => clearInterval(cleanupInterval)
  }, [])
}
```

## 🔍 State Debugging

### **Development Tools**
```typescript
// State logging in development
export function useStateLogger() {
  const { state } = useG8()
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('G8 State Update:', state)
    }
  }, [state])
}

// State validation
export function validateState(state: G8AppState): boolean {
  // Validate required fields
  if (!state.currentRoute) return false
  if (!Array.isArray(state.navigationHistory)) return false
  if (typeof state.isAuthenticated !== 'boolean') return false
  
  // Validate user state
  if (state.user && !state.user.id) return false
  
  // Validate tokens array
  if (!Array.isArray(state.tokens)) return false
  
  return true
}
```

---

**State Management Version**: 2.0  
**Last Updated**: December 2024  
**Next Review**: Q1 2025  
**Maintainer**: Development Team
