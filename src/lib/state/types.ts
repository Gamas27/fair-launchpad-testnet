// G8 App State Management Types

export interface G8User {
  id: string
  walletAddress: string
  worldIdHash: string
  verificationLevel: 'Device' | 'Phone' | 'Orb'
  reputationScore: number
  reputationLevel: string
  totalTrades: number
  totalVolume: number
  isWorldIdVerified: boolean
  walletCreatedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface G8Token {
  id: string
  name: string
  ticker: string
  logo: string
  description: string
  marketCap: string
  volume: string
  price: number
  priceChange: number
  isLive: boolean
  timeSinceLaunch: string
  chartData: number[]
  creatorId: string
  createdAt: Date
  updatedAt: Date
}

export interface G8ChatRoom {
  id: string
  name: string
  type: 'token' | 'general' | 'campaign'
  description: string
  repRequirement: number
  isLocked: boolean
  membersCount: number
  onlineCount: number
  lastMessage?: string
  lastMessageTime?: Date
  creatorId: string
  createdAt: Date
  updatedAt: Date
}

export interface G8AppState {
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

export interface G8Action {
  type: string
  payload?: any
}

export interface G8ContextType {
  state: G8AppState
  dispatch: (action: G8Action) => void
  navigate: (route: string, params?: any) => void
  goBack: () => void
  reset: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setUser: (user: G8User | null) => void
  setTokens: (tokens: G8Token[]) => void
  setChatRooms: (rooms: G8ChatRoom[]) => void
  selectToken: (token: G8Token | null) => void
  selectChatRoom: (room: G8ChatRoom | null) => void
  updateSettings: (settings: Partial<G8AppState['notifications']>) => void
}

