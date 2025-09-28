import { G8AppState, G8Action } from './types'

export const G8_INITIAL_STATE: G8AppState = {
  // User State
  user: null,
  isAuthenticated: false,
  isWorldIdVerified: false,
  isWalletConnected: false,
  
  // Navigation State
  currentRoute: 'home',
  navigationHistory: ['home'],
  isLoading: false,
  error: null,
  
  // Data State
  tokens: [],
  chatRooms: [],
  selectedToken: null,
  selectedChatRoom: null,
  
  // UI State
  activeTab: 'home',
  showOnboarding: true,
  showCreateToken: false,
  showChat: false,
  
  // Settings State
  notifications: {
    enabled: true,
    priceAlerts: true,
    chatMessages: true,
    campaignUpdates: true
  },
  
  // Theme State
  theme: 'dark',
  animations: true
}

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
    
    case 'RESET_NAVIGATION':
      return {
        ...state,
        currentRoute: 'home',
        navigationHistory: ['home'],
        error: null
      }
    
    // Loading Actions
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    
    // User Actions
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isWorldIdVerified: action.payload?.isWorldIdVerified || false,
        isWalletConnected: !!action.payload?.walletAddress
      }
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload ? { ...state.user, ...action.payload } : null
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
    
    case 'UPDATE_TOKEN':
      return {
        ...state,
        tokens: state.tokens.map(token => 
          token.id === action.payload.id ? { ...token, ...action.payload } : token
        )
      }
    
    case 'SET_CHAT_ROOMS':
      return {
        ...state,
        chatRooms: action.payload
      }
    
    case 'ADD_CHAT_ROOM':
      return {
        ...state,
        chatRooms: [...state.chatRooms, action.payload]
      }
    
    case 'UPDATE_CHAT_ROOM':
      return {
        ...state,
        chatRooms: state.chatRooms.map(room => 
          room.id === action.payload.id ? { ...room, ...action.payload } : room
        )
      }
    
    // Selection Actions
    case 'SELECT_TOKEN':
      return {
        ...state,
        selectedToken: action.payload,
        showCreateToken: false,
        showChat: false
      }
    
    case 'SELECT_CHAT_ROOM':
      return {
        ...state,
        selectedChatRoom: action.payload,
        showChat: !!action.payload
      }
    
    // UI Actions
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload
      }
    
    case 'TOGGLE_ONBOARDING':
      return {
        ...state,
        showOnboarding: action.payload
      }
    
    case 'TOGGLE_CREATE_TOKEN':
      return {
        ...state,
        showCreateToken: action.payload,
        selectedToken: action.payload ? null : state.selectedToken
      }
    
    case 'TOGGLE_CHAT':
      return {
        ...state,
        showChat: action.payload,
        selectedChatRoom: action.payload ? state.selectedChatRoom : null
      }
    
    // Settings Actions
    case 'UPDATE_NOTIFICATIONS':
      return {
        ...state,
        notifications: {
          ...state.notifications,
          ...action.payload
        }
      }
    
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      }
    
    case 'TOGGLE_ANIMATIONS':
      return {
        ...state,
        animations: action.payload
      }
    
    // Reset Actions
    case 'RESET_APP':
      return G8_INITIAL_STATE
    
    case 'RESET_USER':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isWorldIdVerified: false,
        isWalletConnected: false
      }
    
    default:
      return state
  }
}

