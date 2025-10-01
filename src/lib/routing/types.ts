// G8 App Routing Types
export type G8Route = 
  | 'home'
  | 'create'
  | 'g8'
  | 'profile'
  | 'settings'
  | 'token-details'
  | 'chat'
  | 'onboarding'
  | 'wallet-setup'
  | 'journey-complete'
  | 'world-id-verification'
  | 'wallet-creation'
  | 'tab-switch'
  | 'token-created'
  | 'back-from-create'
  | 'back-from-token'
  | 'create-token-click'
  | 'token-click'
  | 'app-init'

export interface G8RouteParams {
  tokenId?: string
  chatRoomId?: string
  userId?: string
  tab?: string
  step?: string
  from?: string
  to?: string
  tokenName?: string
  timestamp?: number
  userAgent?: string
  sessionId?: string
}

export interface G8NavigationState {
  currentRoute: G8Route
  params: G8RouteParams
  history: G8Route[]
  canGoBack: boolean
  isLoading: boolean
  error?: string
}

export interface G8RouteConfig {
  path: string
  component: string
  requiresAuth: boolean
  requiresWorldId: boolean
  requiresWallet: boolean
  allowedTabs?: G8Route[]
  metadata?: {
    title: string
    description: string
    icon?: string
  }
}

export interface G8NavigationAction {
  type: 'NAVIGATE' | 'GO_BACK' | 'RESET' | 'SET_LOADING' | 'SET_ERROR'
  payload?: {
    route?: G8Route
    params?: G8RouteParams
    error?: string
  }
}

