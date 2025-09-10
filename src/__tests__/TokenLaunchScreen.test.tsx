import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TokenLaunchScreen from '@/components/TokenLaunchScreen'
import { Token, User } from '@/types'

// Mock the utils functions
jest.mock('@/lib/utils', () => ({
  formatCurrency: jest.fn((amount: number, currency: string = 'WLD') => `${amount.toLocaleString()} ${currency}`),
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

describe('TokenLaunchScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders token information correctly', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    expect(screen.getByText('Test Token (TEST)')).toBeInTheDocument()
    expect(screen.getByText('Fair Human-Only Launch')).toBeInTheDocument()
    expect(screen.getByText('0.001 WLD')).toBeInTheDocument()
    expect(screen.getByText('Current Price')).toBeInTheDocument()
  })

  it('displays user reputation level with correct icon', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    expect(screen.getByText('Your Level: Silver 🥈')).toBeInTheDocument()
    expect(screen.getByText('Security: 85%')).toBeInTheDocument()
  })

  it('shows different reputation icons for different levels', () => {
    const bronzeUser = { ...mockUser, reputationLevel: 'Bronze' as const }
    const goldUser = { ...mockUser, reputationLevel: 'Gold' as const }
    const diamondUser = { ...mockUser, reputationLevel: 'Diamond' as const }

    const { rerender } = render(<TokenLaunchScreen token={mockToken} user={bronzeUser} />)
    expect(screen.getByText('Your Level: Bronze 🥉')).toBeInTheDocument()

    rerender(<TokenLaunchScreen token={mockToken} user={goldUser} />)
    expect(screen.getByText('Your Level: Gold 🥇')).toBeInTheDocument()

    rerender(<TokenLaunchScreen token={mockToken} user={diamondUser} />)
    expect(screen.getByText('Your Level: Diamond 💎')).toBeInTheDocument()
  })

  it('displays allocation information correctly', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    expect(screen.getByText('400 WLD')).toBeInTheDocument() // remainingAllocation = 500 - 100
    expect(screen.getByText('Remaining Allocation')).toBeInTheDocument()
    expect(screen.getByText('100 WLD')).toBeInTheDocument() // usedAllocation
    expect(screen.getByText('Used Allocation')).toBeInTheDocument()
  })

  it('shows progress bar with correct percentage', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    // allocationProgress = (100 / 500) * 100 = 20%
    expect(progressBar).toHaveAttribute('aria-valuenow', '20')
  })

  it('displays token statistics correctly', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    expect(screen.getByText('$1,000,000')).toBeInTheDocument() // marketCap
    expect(screen.getByText('Market Cap')).toBeInTheDocument()
    expect(screen.getByText('45%')).toBeInTheDocument() // progress
    expect(screen.getByText('Launch Progress')).toBeInTheDocument()
    expect(screen.getByText('150')).toBeInTheDocument() // humanCount
    expect(screen.getByText('Humans Verified')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument() // botCount
    expect(screen.getByText('Bots Blocked')).toBeInTheDocument()
  })

  it('shows security metrics', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    expect(screen.getByText('85%')).toBeInTheDocument() // securityScore
    expect(screen.getByText('Security Score')).toBeInTheDocument()
    expect(screen.getByText('$50')).toBeInTheDocument() // avgBuy
    expect(screen.getByText('Avg Buy Size')).toBeInTheDocument()
  })

  it('renders buy button with correct text', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    const buyButton = screen.getByRole('button', { name: /buy test tokens/i })
    expect(buyButton).toBeInTheDocument()
    expect(buyButton).toHaveClass('bg-gradient-to-r', 'from-cyan-500', 'to-blue-500')
  })

  it('renders view chart button', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    const chartButton = screen.getByRole('button', { name: /view chart/i })
    expect(chartButton).toBeInTheDocument()
    expect(chartButton).toHaveClass('border-cyan-500/50')
  })

  it('displays anti-manipulation features', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    expect(screen.getByText('Anti-Manipulation Features')).toBeInTheDocument()
    expect(screen.getByText('World ID Verification')).toBeInTheDocument()
    expect(screen.getByText('Reputation System')).toBeInTheDocument()
    expect(screen.getByText('Trading Limits')).toBeInTheDocument()
    expect(screen.getByText('Community Reporting')).toBeInTheDocument()
  })

  it('shows fair launch guarantee', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    expect(screen.getByText('Fair Launch Guarantee')).toBeInTheDocument()
    expect(screen.getByText('100% Human-Only Trading')).toBeInTheDocument()
    expect(screen.getByText('No Bot Manipulation')).toBeInTheDocument()
    expect(screen.getByText('Transparent Process')).toBeInTheDocument()
  })

  it('handles zero used allocation', () => {
    const userWithNoAllocation = { ...mockUser, usedAllocation: 0 }
    render(<TokenLaunchScreen token={mockToken} user={userWithNoAllocation} />)

    expect(screen.getByText('500 WLD')).toBeInTheDocument() // remainingAllocation = 500 - 0
    expect(screen.getByText('0 WLD')).toBeInTheDocument() // usedAllocation = 0
    
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '0') // 0% progress
  })

  it('handles full allocation usage', () => {
    const userWithFullAllocation = { ...mockUser, usedAllocation: 500 }
    render(<TokenLaunchScreen token={mockToken} user={userWithFullAllocation} />)

    expect(screen.getByText('0 WLD')).toBeInTheDocument() // remainingAllocation = 500 - 500
    expect(screen.getByText('500 WLD')).toBeInTheDocument() // usedAllocation = 500
    
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '100') // 100% progress
  })

  it('displays correct token symbol in header', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    const tokenSymbol = screen.getByText('T') // First character of symbol
    expect(tokenSymbol).toBeInTheDocument()
    expect(tokenSymbol).toHaveClass('w-16', 'h-16', 'bg-gradient-to-br', 'from-cyan-400', 'to-blue-500')
  })

  it('shows proper gradient background', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    const container = screen.getByRole('main') || document.querySelector('.min-h-screen')
    expect(container).toHaveClass('bg-gradient-to-br', 'from-gray-900', 'via-blue-900', 'to-gray-900')
  })

  it('renders all required icons', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    // Check for Shield icon in header
    const shieldIcon = document.querySelector('[data-lucide="shield"]')
    expect(shieldIcon).toBeInTheDocument()

    // Check for other icons
    const trendingUpIcon = document.querySelector('[data-lucide="trending-up"]')
    const usersIcon = document.querySelector('[data-lucide="users"]')
    const botIcon = document.querySelector('[data-lucide="bot"]')
    
    expect(trendingUpIcon).toBeInTheDocument()
    expect(usersIcon).toBeInTheDocument()
    expect(botIcon).toBeInTheDocument()
  })

  it('handles edge case with very high security score', () => {
    const highSecurityToken = { ...mockToken, securityScore: 100 }
    render(<TokenLaunchScreen token={highSecurityToken} user={mockUser} />)

    expect(screen.getByText('Security: 100%')).toBeInTheDocument()
  })

  it('handles edge case with zero security score', () => {
    const lowSecurityToken = { ...mockToken, securityScore: 0 }
    render(<TokenLaunchScreen token={lowSecurityToken} user={mockUser} />)

    expect(screen.getByText('Security: 0%')).toBeInTheDocument()
  })

  it('displays correct market cap formatting', () => {
    const highCapToken = { ...mockToken, marketCap: 1000000000 }
    render(<TokenLaunchScreen token={highCapToken} user={mockUser} />)

    expect(screen.getByText('$1,000,000,000')).toBeInTheDocument()
  })

  it('shows correct progress percentage', () => {
    const highProgressToken = { ...mockToken, progress: 99 }
    render(<TokenLaunchScreen token={highProgressToken} user={mockUser} />)

    expect(screen.getByText('99%')).toBeInTheDocument()
  })
})


