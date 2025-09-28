import { G8Route, G8RouteConfig } from './types'

export const G8_ROUTE_CONFIG: Record<G8Route, G8RouteConfig> = {
  home: {
    path: '/g8',
    component: 'HomeScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: true,
    allowedTabs: ['g8', 'chat', 'profile', 'settings'],
    metadata: {
      title: 'G8 Home',
      description: 'Welcome to G8 platform',
      icon: 'trending-up'
    }
  },
  create: {
    path: '/g8/create',
    component: 'CreateScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: true,
    allowedTabs: ['home', 'g8', 'profile'],
    metadata: {
      title: 'Create Token',
      description: 'Launch your token with G8',
      icon: 'plus'
    }
  },
  g8: {
    path: '/g8/zone',
    component: 'G8Screen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: false,
    allowedTabs: ['home', 'create', 'profile'],
    metadata: {
      title: 'G8 Zone',
      description: 'Campaigns and quests',
      icon: 'bar-chart-3'
    }
  },
  profile: {
    path: '/g8/profile',
    component: 'ProfileScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: true,
    allowedTabs: ['home', 'create', 'g8'],
    metadata: {
      title: 'Profile',
      description: 'Your G8 profile and portfolio',
      icon: 'user'
    }
  },
  settings: {
    path: '/g8/settings',
    component: 'SettingsScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: false,
    allowedTabs: ['home', 'create', 'g8', 'profile'],
    metadata: {
      title: 'Settings',
      description: 'G8 app settings',
      icon: 'settings'
    }
  },
  'token-details': {
    path: '/g8/token/:tokenId',
    component: 'TokenDetailsScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: true,
    allowedTabs: ['home', 'create', 'g8', 'profile'],
    metadata: {
      title: 'Token Details',
      description: 'Token information and trading',
      icon: 'coins'
    }
  },
  chat: {
    path: '/g8/chat',
    component: 'ChatScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: false,
    allowedTabs: ['home', 'g8', 'profile', 'settings'],
    metadata: {
      title: 'Chat',
      description: 'Community chat room',
      icon: 'message-circle'
    }
  },
  onboarding: {
    path: '/g8/onboarding',
    component: 'OnboardingScreen',
    requiresAuth: false,
    requiresWorldId: false,
    requiresWallet: false,
    allowedTabs: [],
    metadata: {
      title: 'Welcome to G8',
      description: 'Get started with G8',
      icon: 'shield'
    }
  }
}

export const G8_ROUTE_PATHS = Object.fromEntries(
  Object.entries(G8_ROUTE_CONFIG).map(([key, config]) => [key, config.path])
) as Record<G8Route, string>

export const G8_PROTECTED_ROUTES: G8Route[] = [
  'create',
  'g8',
  'profile',
  'settings',
  'token-details',
  'chat'
]

export const G8_PUBLIC_ROUTES: G8Route[] = [
  'home',
  'onboarding'
]

