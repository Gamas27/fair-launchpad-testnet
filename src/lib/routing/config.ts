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
  },
  'wallet-setup': {
    path: '/g8/wallet-setup',
    component: 'WalletSetupScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: false,
    metadata: {
      title: 'Wallet Setup',
      description: 'Set up your wallet',
      icon: 'wallet'
    }
  },
  'journey-complete': {
    path: '/g8/journey-complete',
    component: 'JourneyCompleteScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: true,
    metadata: {
      title: 'Journey Complete',
      description: 'Welcome to G8',
      icon: 'check-circle'
    }
  },
  'world-id-verification': {
    path: '/g8/world-id-verification',
    component: 'WorldIdVerificationScreen',
    requiresAuth: true,
    requiresWorldId: false,
    requiresWallet: false,
    metadata: {
      title: 'World ID Verification',
      description: 'Verify your identity',
      icon: 'shield'
    }
  },
  'wallet-creation': {
    path: '/g8/wallet-creation',
    component: 'WalletCreationScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: false,
    metadata: {
      title: 'Wallet Creation',
      description: 'Create your wallet',
      icon: 'wallet'
    }
  },
  'tab-switch': {
    path: '/g8/tab-switch',
    component: 'TabSwitchScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: true,
    metadata: {
      title: 'Tab Switch',
      description: 'Switch tabs',
      icon: 'layout'
    }
  },
  'token-created': {
    path: '/g8/token-created',
    component: 'TokenCreatedScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: true,
    metadata: {
      title: 'Token Created',
      description: 'Your token has been created',
      icon: 'check-circle'
    }
  },
  'back-from-create': {
    path: '/g8/back-from-create',
    component: 'BackFromCreateScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: true,
    metadata: {
      title: 'Back from Create',
      description: 'Return from create flow',
      icon: 'arrow-left'
    }
  },
  'back-from-token': {
    path: '/g8/back-from-token',
    component: 'BackFromTokenScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: true,
    metadata: {
      title: 'Back from Token',
      description: 'Return from token details',
      icon: 'arrow-left'
    }
  },
  'create-token-click': {
    path: '/g8/create-token-click',
    component: 'CreateTokenClickScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: true,
    metadata: {
      title: 'Create Token Click',
      description: 'Create token action',
      icon: 'plus'
    }
  },
  'token-click': {
    path: '/g8/token-click',
    component: 'TokenClickScreen',
    requiresAuth: true,
    requiresWorldId: true,
    requiresWallet: true,
    metadata: {
      title: 'Token Click',
      description: 'Token action',
      icon: 'eye'
    }
  },
  'app-init': {
    path: '/g8/app-init',
    component: 'AppInitScreen',
    requiresAuth: false,
    requiresWorldId: false,
    requiresWallet: false,
    metadata: {
      title: 'App Initialization',
      description: 'Initialize the app',
      icon: 'loader'
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

