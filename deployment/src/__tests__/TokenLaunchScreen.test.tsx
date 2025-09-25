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
    expect(screen.getByText('Available')).toBeInTheDocument()
    expect(screen.getByText('100 WLD')).toBeInTheDocument() // usedAllocation
    expect(screen.getByText('Used')).toBeInTheDocument()
  })

  it('shows progress bar with correct percentage', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    const progressBars = screen.getAllByRole('progressbar')
    const allocationProgressBar = progressBars.find(bar => bar.getAttribute('data-value') === '20')
    expect(allocationProgressBar).toBeInTheDocument()
  })

  it('displays token statistics correctly', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    expect(screen.getByText('1,000,000 WLD')).toBeInTheDocument() // marketCap
    expect(screen.getByText('Market Cap')).toBeInTheDocument()
    expect(screen.getByText('45%')).toBeInTheDocument() // progress
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('150')).toBeInTheDocument() // humanCount
    expect(screen.getByText('Humans Verified')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument() // botCount
    expect(screen.getByText('Bots Blocked')).toBeInTheDocument()
  })

  it('shows security metrics', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    expect(screen.getByText('85%')).toBeInTheDocument() // securityScore
    expect(screen.getByText('Security Score')).toBeInTheDocument()
    expect(screen.getByText('50 WLD')).toBeInTheDocument() // avgBuy
    expect(screen.getByText('Avg Buy')).toBeInTheDocument()
  })

  it('renders buy button with correct text', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    const buyButton = screen.getByRole('button', { name: /buy now/i })
    expect(buyButton).toBeInTheDocument()
    expect(buyButton).toHaveClass('bg-gradient-to-r', 'from-cyan-400', 'to-blue-500')
  })

  it('renders view chart button', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    const chartButton = screen.getByRole('button', { name: /view chart/i })
    expect(chartButton).toBeInTheDocument()
    expect(chartButton).toHaveClass('border', 'border-input')
  })

  it('displays anti-manipulation features', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    expect(screen.getByText('Fairness Metrics')).toBeInTheDocument()
    expect(screen.getByText('Humans Verified')).toBeInTheDocument()
    expect(screen.getByText('Bots Blocked')).toBeInTheDocument()
    expect(screen.getByText('Avg Buy')).toBeInTheDocument()
    expect(screen.getByText('Distribution')).toBeInTheDocument()
  })

  it('shows fair launch guarantee', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    expect(screen.getByText('Fair Human-Only Launch')).toBeInTheDocument()
    expect(screen.getByText('Trading History')).toBeInTheDocument()
    expect(screen.getByText('Community')).toBeInTheDocument()
    expect(screen.getByText('Report Issue')).toBeInTheDocument()
  })

  it('handles zero used allocation', () => {
    const userWithNoAllocation = { ...mockUser, usedAllocation: 0 }
    render(<TokenLaunchScreen token={mockToken} user={userWithNoAllocation} />)

    // Check for specific allocation values in the allocation section
    expect(screen.getByText('Available')).toBeInTheDocument()
    expect(screen.getByText('Used')).toBeInTheDocument()
    expect(screen.getByText('Total Cap')).toBeInTheDocument()
    
    // Check that the values are displayed (using getAllByText since there might be multiple)
    const availableElements = screen.getAllByText('500 WLD')
    const usedElements = screen.getAllByText('0 WLD')
    expect(availableElements.length).toBeGreaterThan(0)
    expect(usedElements.length).toBeGreaterThan(0)
    
    const progressBars = screen.getAllByRole('progressbar')
    const allocationProgressBar = progressBars.find(bar => bar.getAttribute('data-value') === '0')
    expect(allocationProgressBar).toBeInTheDocument()
  })

  it('handles full allocation usage', () => {
    const userWithFullAllocation = { ...mockUser, usedAllocation: 500 }
    render(<TokenLaunchScreen token={mockToken} user={userWithFullAllocation} />)

    // Check that the values are displayed (using getAllByText since there might be multiple)
    const availableElements = screen.getAllByText('0 WLD')
    const usedElements = screen.getAllByText('500 WLD')
    expect(availableElements.length).toBeGreaterThan(0)
    expect(usedElements.length).toBeGreaterThan(0)
    
    const progressBars = screen.getAllByRole('progressbar')
    const allocationProgressBar = progressBars.find(bar => bar.getAttribute('data-value') === '100')
    expect(allocationProgressBar).toBeInTheDocument()
  })

  it('displays correct token symbol in header', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    const tokenSymbol = screen.getByText('T') // First character of symbol
    expect(tokenSymbol).toBeInTheDocument()
    expect(tokenSymbol).toHaveClass('w-16', 'h-16', 'bg-gradient-to-br', 'from-cyan-400', 'to-blue-500')
  })

  it('shows proper gradient background', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    const container = document.querySelector('.min-h-screen')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('bg-gradient-to-br', 'from-gray-900', 'via-blue-900', 'to-gray-900')
  })

  it('renders all required icons', () => {
    render(<TokenLaunchScreen token={mockToken} user={mockUser} />)

    // Check for icons by looking for SVG elements (Lucide icons render as SVG)
    const svgElements = document.querySelectorAll('svg')
    expect(svgElements.length).toBeGreaterThan(0)

    // Check for specific icon classes or attributes that might be present
    const shieldIcon = document.querySelector('svg[class*="h-8"][class*="w-8"]')
    expect(shieldIcon).toBeInTheDocument()
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

    expect(screen.getByText('1,000,000,000 WLD')).toBeInTheDocument()
  })

  it('shows correct progress percentage', () => {
    const highProgressToken = { ...mockToken, progress: 99 }
    render(<TokenLaunchScreen token={highProgressToken} user={mockUser} />)

    expect(screen.getByText('99%')).toBeInTheDocument()
  })
})



