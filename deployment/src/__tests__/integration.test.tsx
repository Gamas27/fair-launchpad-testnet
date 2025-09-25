import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import TokenLaunchScreen from '@/components/TokenLaunchScreen'
import ReputationScreen from '@/components/ReputationScreen'
import { Token, User, ReputationQuest, Achievement } from '@/types'

// Mock all services
jest.mock('@/services/antiManipulationService', () => ({
  antiManipulationService: {
    verifyHuman: jest.fn(),
    calculateReputationScore: jest.fn(),
    getTradingLimits: jest.fn(),
    validateTradeAttempt: jest.fn(),
    createTradingSession: jest.fn(),
    updateTradingSession: jest.fn(),
    reportSuspiciousActivity: jest.fn()
  }
}))

jest.mock('@/services/bondingCurveService', () => ({
  bondingCurveService: {
    processTrade: jest.fn(),
    getCurrentState: jest.fn(),
    getBondingCurveData: jest.fn(),
    getAntiManipulationMetrics: jest.fn(),
    simulateTrade: jest.fn()
  }
}))

jest.mock('@/services/worldIdService', () => ({
  worldIdService: {
    initialize: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    getAccount: jest.fn(),
    signMessage: jest.fn(),
    sendTransaction: jest.fn()
  }
}))

// Mock utils
jest.mock('@/lib/utils', () => ({
  formatCurrency: jest.fn((amount: number, currency: string = 'WLD') => `${amount.toLocaleString()} ${currency}`),
  formatPercentage: jest.fn((value: number) => `${(value * 100).toFixed(1)}%`),
  getReputationLevel: jest.fn((xp: number) => ({
    level: xp >= 5000 ? 'Diamond' : xp >= 2500 ? 'Gold' : xp >= 1000 ? 'Silver' : 'Bronze',
    icon: xp >= 5000 ? '💎' : xp >= 2500 ? '🥇' : xp >= 1000 ? '🥈' : '🥉',
    color: xp >= 5000 ? 'text-blue-400' : xp >= 2500 ? 'text-yellow-500' : xp >= 1000 ? 'text-gray-400' : 'text-amber-600',
    currentLevelXp: xp >= 5000 ? 5000 : xp >= 2500 ? 2500 : xp >= 1000 ? 1000 : 0,
    nextLevelXp: xp >= 5000 ? Infinity : xp >= 2500 ? 5000 : xp >= 1000 ? 2500 : 1000,
    progress: xp >= 5000 ? 100 : xp >= 2500 ? ((xp - 2500) / 2500) * 100 : xp >= 1000 ? ((xp - 1000) / 1500) * 100 : (xp / 1000) * 100
  })),
  calculateAllocationCap: jest.fn((level: string) => {
    const caps = { Bronze: 200, Silver: 500, Gold: 1000, Diamond: 2500 }
    return caps[level as keyof typeof caps] || 200
  })
}))

const mockToken: Token = {
  id: 'test-token',
  name: 'Test Token',
  symbol: 'TEST',
  logo: '/test-logo.png',
  currentPrice: 0.001,
  marketCap: 1000000,
  progress: 45,
  securityScore: 85,
  humanCount: 150,
  botCount: 5,
  avgBuy: 50
}

const mockUser: User = {
  address: '0x1234567890abcdef',
  allocationCap: 500,
  usedAllocation: 100,
  reputationLevel: 'Silver',
  verificationLevel: 'Phone',
  xp: 1500
}

const mockQuests: ReputationQuest[] = [
  {
    id: 'quest1',
    title: 'Verify Phone Number',
    description: 'Complete phone verification to increase your reputation',
    reward: 50,
    completed: true,
    progress: 100,
    target: 1
  },
  {
    id: 'quest2',
    title: 'Complete 10 Trades',
    description: 'Make 10 successful trades to earn reputation points',
    reward: 100,
    completed: false,
    progress: 7,
    target: 10
  }
]

const mockAchievements: Achievement[] = [
  {
    id: 'achievement1',
    title: 'Fair Trader',
    description: 'Completed 50 trades without any suspicious activity',
    icon: '🏆',
    unlocked: true,
    unlockedAt: '2024-01-15T10:30:00Z'
  }
]

describe('Integration Tests - User Flows', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Token Launch Flow', () => {
    it('should display complete token launch information', () => {
      render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

      // Verify all key information is displayed
      expect(screen.getByText('Test Token (TEST)')).toBeInTheDocument()
      expect(screen.getByText('0.001 WLD')).toBeInTheDocument()
      expect(screen.getByText('Your Level: Silver 🥈')).toBeInTheDocument()
      expect(screen.getByText('Security: 85%')).toBeInTheDocument()
      expect(screen.getByText('400 WLD')).toBeInTheDocument() // Remaining allocation
      expect(screen.getByText('100 WLD')).toBeInTheDocument() // Used allocation
    })

    it('should show anti-manipulation features', () => {
      render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

      expect(screen.getByText('Anti-Manipulation Features')).toBeInTheDocument()
      expect(screen.getByText('World ID Verification')).toBeInTheDocument()
      expect(screen.getByText('Reputation System')).toBeInTheDocument()
      expect(screen.getByText('Trading Limits')).toBeInTheDocument()
      expect(screen.getByText('Community Reporting')).toBeInTheDocument()
    })

    it('should display fair launch guarantee', () => {
      render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

      expect(screen.getByText('Fair Launch Guarantee')).toBeInTheDocument()
      expect(screen.getByText('100% Human-Only Trading')).toBeInTheDocument()
      expect(screen.getByText('No Bot Manipulation')).toBeInTheDocument()
      expect(screen.getByText('Transparent Process')).toBeInTheDocument()
    })
  })

  describe('Reputation System Flow', () => {
    it('should display complete reputation information', () => {
      render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

      // Verify reputation level display
      expect(screen.getByText('Silver HUMAN')).toBeInTheDocument()
      expect(screen.getByText('🥈')).toBeInTheDocument()
      expect(screen.getByText('XP: 1,500')).toBeInTheDocument()

      // Verify allocation information
      expect(screen.getByText('500 WLD')).toBeInTheDocument() // Allocation cap
      expect(screen.getByText('100 WLD')).toBeInTheDocument() // Used allocation

      // Verify verification level
      expect(screen.getByText('Phone Verified')).toBeInTheDocument()
      expect(screen.getByText('Medium Security Level')).toBeInTheDocument()
    })

    it('should display quest system correctly', () => {
      render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

      expect(screen.getByText('Reputation Quests')).toBeInTheDocument()
      
      // Completed quest
      expect(screen.getByText('Verify Phone Number')).toBeInTheDocument()
      expect(screen.getByText('+50 XP')).toBeInTheDocument()
      
      // In-progress quest
      expect(screen.getByText('Complete 10 Trades')).toBeInTheDocument()
      expect(screen.getByText('7/10')).toBeInTheDocument()
      expect(screen.getByText('+100 XP')).toBeInTheDocument()
    })

    it('should display achievements correctly', () => {
      render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

      expect(screen.getByText('Achievements')).toBeInTheDocument()
      expect(screen.getByText('Fair Trader')).toBeInTheDocument()
      expect(screen.getByText('🏆')).toBeInTheDocument()
      expect(screen.getByText('Unlocked: Jan 15, 2024')).toBeInTheDocument()
    })
  })

  describe('User Progression Flow', () => {
    it('should show Bronze level user correctly', () => {
      const bronzeUser = { ...mockUser, xp: 500, reputationLevel: 'Bronze' as const }
      render(<ReputationScreen user={bronzeUser} quests={mockQuests} achievements={mockAchievements} />)

      expect(screen.getByText('Bronze HUMAN')).toBeInTheDocument()
      expect(screen.getByText('🥉')).toBeInTheDocument()
      expect(screen.getByText('XP: 500')).toBeInTheDocument()
    })

    it('should show Gold level user correctly', () => {
      const goldUser = { ...mockUser, xp: 3000, reputationLevel: 'Gold' as const }
      render(<ReputationScreen user={goldUser} quests={mockQuests} achievements={mockAchievements} />)

      expect(screen.getByText('Gold HUMAN')).toBeInTheDocument()
      expect(screen.getByText('🥇')).toBeInTheDocument()
      expect(screen.getByText('XP: 3,000')).toBeInTheDocument()
    })

    it('should show Diamond level user correctly', () => {
      const diamondUser = { ...mockUser, xp: 6000, reputationLevel: 'Diamond' as const }
      render(<ReputationScreen user={diamondUser} quests={mockQuests} achievements={mockAchievements} />)

      expect(screen.getByText('Diamond HUMAN')).toBeInTheDocument()
      expect(screen.getByText('💎')).toBeInTheDocument()
      expect(screen.getByText('XP: 6,000')).toBeInTheDocument()
    })
  })

  describe('Verification Level Flow', () => {
    it('should show Device verification correctly', () => {
      const deviceUser = { ...mockUser, verificationLevel: 'Device' }
      render(<ReputationScreen user={deviceUser} quests={mockQuests} achievements={mockAchievements} />)

      expect(screen.getByText('Device Verified')).toBeInTheDocument()
      expect(screen.getByText('Basic Security Level')).toBeInTheDocument()
    })

    it('should show Phone verification correctly', () => {
      render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

      expect(screen.getByText('Phone Verified')).toBeInTheDocument()
      expect(screen.getByText('Medium Security Level')).toBeInTheDocument()
    })

    it('should show Orb verification correctly', () => {
      const orbUser = { ...mockUser, verificationLevel: 'Orb' }
      render(<ReputationScreen user={orbUser} quests={mockQuests} achievements={mockAchievements} />)

      expect(screen.getByText('Orb Verified')).toBeInTheDocument()
      expect(screen.getByText('Maximum Security Level')).toBeInTheDocument()
    })
  })

  describe('Allocation Management Flow', () => {
    it('should show zero allocation usage', () => {
      const userWithNoAllocation = { ...mockUser, usedAllocation: 0 }
      render(<TokenLaunchScreen token={mockToken} user={userWithNoAllocation} />)

      expect(screen.getByText('500 WLD')).toBeInTheDocument() // Remaining
      expect(screen.getByText('0 WLD')).toBeInTheDocument() // Used
      
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '0')
    })

    it('should show full allocation usage', () => {
      const userWithFullAllocation = { ...mockUser, usedAllocation: 500 }
      render(<TokenLaunchScreen token={mockToken} user={userWithFullAllocation} />)

      expect(screen.getByText('0 WLD')).toBeInTheDocument() // Remaining
      expect(screen.getByText('500 WLD')).toBeInTheDocument() // Used
      
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '100')
    })

    it('should show partial allocation usage', () => {
      render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

      expect(screen.getByText('400 WLD')).toBeInTheDocument() // Remaining (500 - 100)
      expect(screen.getByText('100 WLD')).toBeInTheDocument() // Used
      
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '20') // (100/500) * 100
    })
  })

  describe('Quest Progress Flow', () => {
    it('should show completed quest correctly', () => {
      render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

      const completedQuest = screen.getByText('Verify Phone Number')
      expect(completedQuest).toBeInTheDocument()
      
      const questContainer = completedQuest.closest('.space-y-4')
      expect(questContainer).toHaveClass('opacity-75') // Completed styling
    })

    it('should show in-progress quest correctly', () => {
      render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

      expect(screen.getByText('Complete 10 Trades')).toBeInTheDocument()
      expect(screen.getByText('7/10')).toBeInTheDocument()
      
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '70') // 7/10 * 100
    })

    it('should show quest with 100% progress but not completed', () => {
      const questAtTarget: ReputationQuest = {
        id: 'quest3',
        title: 'Test Quest',
        description: 'Test description',
        reward: 50,
        completed: false,
        progress: 10,
        target: 10
      }

      render(<ReputationScreen user={mockUser} quests={[questAtTarget]} achievements={mockAchievements} />)

      expect(screen.getByText('10/10')).toBeInTheDocument()
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '100')
    })
  })

  describe('Achievement System Flow', () => {
    it('should show unlocked achievement with date', () => {
      render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

      expect(screen.getByText('Fair Trader')).toBeInTheDocument()
      expect(screen.getByText('🏆')).toBeInTheDocument()
      expect(screen.getByText('Unlocked: Jan 15, 2024')).toBeInTheDocument()
    })

    it('should show locked achievement without date', () => {
      const lockedAchievement: Achievement = {
        id: 'achievement2',
        title: 'Bot Hunter',
        description: 'Successfully reported 5 suspicious trading patterns',
        icon: '🕵️',
        unlocked: false
      }

      render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={[lockedAchievement]} />)

      expect(screen.getByText('Bot Hunter')).toBeInTheDocument()
      expect(screen.getByText('🕵️')).toBeInTheDocument()
      expect(screen.queryByText(/Unlocked:/)).not.toBeInTheDocument()
    })
  })

  describe('Error Handling Flow', () => {
    it('should handle missing token data gracefully', () => {
      const incompleteToken = { ...mockToken, name: '', symbol: '' }
      render(<TokenLaunchScreen token={incompleteToken} user={mockUser} />)

      // Should still render without crashing
      expect(screen.getByText('Fair Human-Only Launch')).toBeInTheDocument()
    })

    it('should handle missing user data gracefully', () => {
      const incompleteUser = { ...mockUser, address: '', xp: 0 }
      render(<ReputationScreen user={incompleteUser} quests={mockQuests} achievements={mockAchievements} />)

      // Should still render without crashing
      expect(screen.getByText('Reputation System')).toBeInTheDocument()
    })

    it('should handle empty quests and achievements', () => {
      render(<ReputationScreen user={mockUser} quests={[]} achievements={[]} />)

      expect(screen.getByText('Reputation Quests')).toBeInTheDocument()
      expect(screen.getByText('Achievements')).toBeInTheDocument()
      // Should not crash with empty arrays
    })
  })

  describe('Responsive Design Flow', () => {
    it('should render with proper responsive classes', () => {
      render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

      const container = document.querySelector('.container')
      expect(container).toHaveClass('mx-auto', 'max-w-4xl')
    })

    it('should use proper grid layouts', () => {
      render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

      const gridElement = document.querySelector('.grid')
      expect(gridElement).toHaveClass('md:grid-cols-2')
    })
  })
})



