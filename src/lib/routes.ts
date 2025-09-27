export interface Route {
  id: string
  path: string
  label: string
  icon: string
  description: string
  requiresAuth?: boolean
  requiresWorldId?: boolean
  isExternal?: boolean
  isMobile?: boolean
  category: 'main' | 'secondary' | 'utility'
}

export const ROUTES: Record<string, Route> = {
  HOME: {
    id: 'home',
    path: '/',
    label: 'Home',
    icon: 'Home',
    description: 'FairLaunch dashboard and overview',
    category: 'main'
  },
  LAUNCH: {
    id: 'launch',
    path: '/launch',
    label: 'Launch',
    icon: 'Rocket',
    description: 'Launch new tokens with anti-bot protection',
    requiresAuth: true,
    requiresWorldId: true,
    category: 'main'
  },
  TRADING: {
    id: 'trading',
    path: '/trading',
    label: 'Trade',
    icon: 'TrendingUp',
    description: 'Trade verified tokens with fair mechanics',
    requiresAuth: true,
    requiresWorldId: true,
    category: 'main'
  },
  PROFILE: {
    id: 'profile',
    path: '/profile',
    label: 'Profile',
    icon: 'User',
    description: 'Your reputation and achievements',
    requiresAuth: true,
    category: 'main'
  },
  DEX: {
    id: 'dex',
    path: '/dex',
    label: 'DEX',
    icon: 'BarChart3',
    description: 'Decentralized exchange explorer',
    requiresAuth: true,
    category: 'secondary'
  },
  TEST_CONTRACTS: {
    id: 'test-contracts',
    path: '/test-contracts',
    label: 'Test',
    icon: 'TestTube',
    description: 'Test smart contract integration',
    category: 'utility'
  }
}

export const MAIN_ROUTES = Object.values(ROUTES).filter(route => route.category === 'main')
export const SECONDARY_ROUTES = Object.values(ROUTES).filter(route => route.category === 'secondary')
export const UTILITY_ROUTES = Object.values(ROUTES).filter(route => route.category === 'utility')

export const getRouteByPath = (path: string): Route | undefined => {
  return Object.values(ROUTES).find(route => route.path === path)
}

export const getRouteById = (id: string): Route | undefined => {
  return ROUTES[id.toUpperCase()]
}

export const isRouteAccessible = (route: Route, isAuthenticated: boolean, isWorldIdVerified: boolean): boolean => {
  if (route.requiresAuth && !isAuthenticated) return false
  if (route.requiresWorldId && !isWorldIdVerified) return false
  return true
}
