import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ReputationScreen from '@/components/ReputationScreen'
import { User, ReputationQuest, Achievement } from '@/types'

// Mock the utils functions
jest.mock('@/lib/utils', () => ({
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
  },
  {
    id: 'quest3',
    title: 'Report Suspicious Activity',
    description: 'Help the community by reporting suspicious trading patterns',
    reward: 25,
    completed: false,
    progress: 0,
    target: 3
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
  },
  {
    id: 'achievement2',
    title: 'Bot Hunter',
    description: 'Successfully reported 5 suspicious trading patterns',
    icon: '🕵️',
    unlocked: false
  },
  {
    id: 'achievement3',
    title: 'Diamond Hands',
    description: 'Held tokens for more than 30 days',
    icon: '💎',
    unlocked: true,
    unlockedAt: '2024-02-01T15:45:00Z'
  }
]

describe('ReputationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders reputation overview correctly', () => {
    render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

    expect(screen.getByText('Reputation System')).toBeInTheDocument()
    expect(screen.getByText('Silver HUMAN')).toBeInTheDocument()
    expect(screen.getByText('Level Silver')).toBeInTheDocument()
    expect(screen.getByText('🥈')).toBeInTheDocument()
  })

  it('displays user XP and level information', () => {
    render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

    expect(screen.getByText('Current: Silver 🥈')).toBeInTheDocument()
    expect(screen.getByText('XP: 1,500')).toBeInTheDocument()
  })

  it('shows different reputation levels correctly', () => {
    const bronzeUser = { ...mockUser, xp: 500, reputationLevel: 'Bronze' as const }
    const goldUser = { ...mockUser, xp: 3000, reputationLevel: 'Gold' as const }
    const diamondUser = { ...mockUser, xp: 6000, reputationLevel: 'Diamond' as const }

    const { rerender } = render(<ReputationScreen user={bronzeUser} quests={mockQuests} achievements={mockAchievements} />)
    expect(screen.getByText('Bronze HUMAN')).toBeInTheDocument()
    expect(screen.getByText('🥉')).toBeInTheDocument()

    rerender(<ReputationScreen user={goldUser} quests={mockQuests} achievements={mockAchievements} />)
    expect(screen.getByText('Gold HUMAN')).toBeInTheDocument()
    expect(screen.getByText('🥇')).toBeInTheDocument()

    rerender(<ReputationScreen user={diamondUser} quests={mockQuests} achievements={mockAchievements} />)
    expect(screen.getByText('Diamond HUMAN')).toBeInTheDocument()
    expect(screen.getByText('💎')).toBeInTheDocument()
  })

  it('displays allocation cap information', () => {
    render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

    expect(screen.getByText('500 WLD')).toBeInTheDocument() // allocationCap
    expect(screen.getByText('Allocation Cap')).toBeInTheDocument()
    expect(screen.getByText('100 WLD')).toBeInTheDocument() // usedAllocation
    expect(screen.getByText('Used Allocation')).toBeInTheDocument()
  })

  it('shows quest system correctly', () => {
    render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

    expect(screen.getByText('Reputation Quests')).toBeInTheDocument()
    
    // Check completed quest
    expect(screen.getByText('Verify Phone Number')).toBeInTheDocument()
    expect(screen.getByText('Complete phone verification to increase your reputation')).toBeInTheDocument()
    expect(screen.getByText('+50 XP')).toBeInTheDocument()
    
    // Check in-progress quest
    expect(screen.getByText('Complete 10 Trades')).toBeInTheDocument()
    expect(screen.getByText('Make 10 successful trades to earn reputation points')).toBeInTheDocument()
    expect(screen.getByText('7/10')).toBeInTheDocument()
    expect(screen.getByText('+100 XP')).toBeInTheDocument()
    
    // Check unstarted quest
    expect(screen.getByText('Report Suspicious Activity')).toBeInTheDocument()
    expect(screen.getByText('Help the community by reporting suspicious trading patterns')).toBeInTheDocument()
    expect(screen.getByText('0/3')).toBeInTheDocument()
    expect(screen.getByText('+25 XP')).toBeInTheDocument()
  })

  it('displays achievements correctly', () => {
    render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

    expect(screen.getByText('Achievements')).toBeInTheDocument()
    
    // Check unlocked achievements
    expect(screen.getByText('Fair Trader')).toBeInTheDocument()
    expect(screen.getByText('Completed 50 trades without any suspicious activity')).toBeInTheDocument()
    expect(screen.getByText('🏆')).toBeInTheDocument()
    
    expect(screen.getByText('Diamond Hands')).toBeInTheDocument()
    expect(screen.getByText('Held tokens for more than 30 days')).toBeInTheDocument()
    expect(screen.getByText('💎')).toBeInTheDocument()
    
    // Check locked achievements
    expect(screen.getByText('Bot Hunter')).toBeInTheDocument()
    expect(screen.getByText('Successfully reported 5 suspicious trading patterns')).toBeInTheDocument()
    expect(screen.getByText('🕵️')).toBeInTheDocument()
  })

  it('shows progress bars for quests', () => {
    render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

    const progressBars = screen.getAllByRole('progressbar')
    expect(progressBars).toHaveLength(2) // Two quests with progress
    
    // Check completed quest (100% progress)
    expect(progressBars[0]).toHaveAttribute('aria-valuenow', '100')
    
    // Check in-progress quest (70% progress: 7/10)
    expect(progressBars[1]).toHaveAttribute('aria-valuenow', '70')
  })

  it('displays verification level information', () => {
    render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

    expect(screen.getByText('Phone Verified')).toBeInTheDocument()
    expect(screen.getByText('Medium Security Level')).toBeInTheDocument()
  })

  it('shows different verification levels', () => {
    const deviceUser = { ...mockUser, verificationLevel: 'Device' }
    const orbUser = { ...mockUser, verificationLevel: 'Orb' }

    const { rerender } = render(<ReputationScreen user={deviceUser} quests={mockQuests} achievements={mockAchievements} />)
    expect(screen.getByText('Device Verified')).toBeInTheDocument()
    expect(screen.getByText('Basic Security Level')).toBeInTheDocument()

    rerender(<ReputationScreen user={orbUser} quests={mockQuests} achievements={mockAchievements} />)
    expect(screen.getByText('Orb Verified')).toBeInTheDocument()
    expect(screen.getByText('Maximum Security Level')).toBeInTheDocument()
  })

  it('renders all required icons', () => {
    render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

    // Check for main icons
    const shieldIcon = document.querySelector('[data-lucide="shield"]')
    const trophyIcon = document.querySelector('[data-lucide="trophy"]')
    const starIcon = document.querySelector('[data-lucide="star"]')
    const targetIcon = document.querySelector('[data-lucide="target"]')
    const awardIcon = document.querySelector('[data-lucide="award"]')
    
    expect(shieldIcon).toBeInTheDocument()
    expect(trophyIcon).toBeInTheDocument()
    expect(starIcon).toBeInTheDocument()
    expect(targetIcon).toBeInTheDocument()
    expect(awardIcon).toBeInTheDocument()
  })

  it('handles empty quests array', () => {
    render(<ReputationScreen user={mockUser} quests={[]} achievements={mockAchievements} />)

    expect(screen.getByText('Reputation Quests')).toBeInTheDocument()
    expect(screen.queryByText('Verify Phone Number')).not.toBeInTheDocument()
  })

  it('handles empty achievements array', () => {
    render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={[]} />)

    expect(screen.getByText('Achievements')).toBeInTheDocument()
    expect(screen.queryByText('Fair Trader')).not.toBeInTheDocument()
  })

  it('shows correct gradient background', () => {
    render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

    const container = document.querySelector('.min-h-screen')
    expect(container).toHaveClass('bg-gradient-to-br', 'from-gray-900', 'via-purple-900', 'to-gray-900')
  })

  it('displays quest completion status correctly', () => {
    render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

    // Completed quest should show completed state
    const completedQuest = screen.getByText('Verify Phone Number').closest('.space-y-4')
    expect(completedQuest).toHaveClass('opacity-75') // Completed quest styling

    // In-progress quest should show active state
    const inProgressQuest = screen.getByText('Complete 10 Trades').closest('.space-y-4')
    expect(inProgressQuest).not.toHaveClass('opacity-75')
  })

  it('shows achievement unlock dates for unlocked achievements', () => {
    render(<ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />)

    // Check that unlock dates are displayed
    expect(screen.getByText('Unlocked: Jan 15, 2024')).toBeInTheDocument()
    expect(screen.getByText('Unlocked: Feb 1, 2024')).toBeInTheDocument()
  })

  it('handles quest with 100% progress but not completed', () => {
    const questAtTarget: ReputationQuest = {
      id: 'quest4',
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

  it('displays correct XP formatting for large numbers', () => {
    const highXPUser = { ...mockUser, xp: 1234567 }
    render(<ReputationScreen user={highXPUser} quests={mockQuests} achievements={mockAchievements} />)

    expect(screen.getByText('XP: 1,234,567')).toBeInTheDocument()
  })
})
