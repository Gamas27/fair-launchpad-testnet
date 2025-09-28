import React, { useState, useEffect } from 'react'
import { ScreenV2 } from '@/components/layout/screen-v2'
import { BottomNavV2 } from '@/components/navigation/bottom-nav-v2'
import { TokenCardV2, TokenData } from '@/components/tokens/token-card-v2'
import { CardV2 } from '@/components/ui/card-v2'
import { ButtonV2 } from '@/components/ui/button-v2'
import { InputV2 } from '@/components/ui/input-v2'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  TrendingUp, 
  User, 
  Settings,
  DollarSign,
  Clock,
  BarChart3
} from 'lucide-react'
import { animations, presets, staggerDelay } from '@/lib/animations'

// Mock data for demonstration
const mockTokens: TokenData[] = [
  {
    id: '1',
    name: 'MemeCoin',
    ticker: 'MEME',
    logo: '🔥',
    price: 0.0025,
    priceChange: 12.5,
    marketCap: '1.2M',
    volume: '800K',
    timeSinceLaunch: '3h',
    isLive: true,
    chartData: [10, 20, 15, 25, 20, 30, 25],
    borderColor: 'border-cyan-400/50',
    bgColor: 'bg-cyan-400/5',
    shadowColor: 'shadow-cyan-400/20'
  },
  {
    id: '2',
    name: 'DoggyCoin',
    ticker: 'DOGE',
    logo: '🐶',
    price: 0.0018,
    priceChange: -5.2,
    marketCap: '800K',
    volume: '450K',
    timeSinceLaunch: '8h',
    isLive: false,
    chartData: [5, 10, 8, 12, 10, 15, 13],
    borderColor: 'border-pink-400/50',
    bgColor: 'bg-pink-400/5',
    shadowColor: 'shadow-pink-400/20'
  },
  {
    id: '3',
    name: 'SpaceCoin',
    ticker: 'SPCE',
    logo: '🚀',
    price: 0.0042,
    priceChange: 25.8,
    marketCap: '2.5M',
    volume: '1.2M',
    timeSinceLaunch: '1d',
    isLive: true,
    chartData: [20, 25, 22, 30, 28, 35, 30],
    borderColor: 'border-purple-500/50',
    bgColor: 'bg-purple-500/5',
    shadowColor: 'shadow-purple-500/20'
  },
]

export const G8AppV2Animated: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Animation trigger on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleTokenClick = (token: TokenData) => {
    setSelectedToken(token)
  }

  const renderHomeScreen = () => (
    <div className="space-y-6">
      {/* Welcome Section with Animation */}
      <CardV2 
        variant="gradient" 
        glow 
        className={`bg-gradient-to-br from-purple-900/20 to-cyan-900/20 transition-all duration-500 ${
          isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent animate-pulse-glow">
            Welcome to G8
          </h1>
          <p className="text-gray-300 animate-fade-in">
            Explore the decentralized future, connect, create, and transact securely.
          </p>
          <ButtonV2 
            gradient="neon" 
            size="lg" 
            className="w-full animate-bounce-in hover:animate-pulse-glow"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Token
          </ButtonV2>
        </div>
      </CardV2>

      {/* Stats Overview with Staggered Animation */}
      <div className="grid grid-cols-2 gap-4">
        <CardV2 
          variant="elevated" 
          className={`text-center transition-all duration-500 ${
            isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
          }`}
          style={{ animationDelay: '100ms' }}
        >
          <div className="space-y-2">
            <DollarSign className="h-8 w-8 text-cyan-400 mx-auto animate-float" />
            <div className="text-2xl font-bold text-white animate-count-up">$2.5M</div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </div>
        </CardV2>
        <CardV2 
          variant="elevated" 
          className={`text-center transition-all duration-500 ${
            isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
          }`}
          style={{ animationDelay: '200ms' }}
        >
          <div className="space-y-2">
            <TrendingUp className="h-8 w-8 text-green-400 mx-auto animate-float" />
            <div className="text-2xl font-bold text-white animate-count-up">+12.5%</div>
            <div className="text-sm text-gray-400">24h Change</div>
          </div>
        </CardV2>
      </div>

      {/* Trending Tokens with Staggered Animation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-xl font-semibold text-white transition-all duration-500 ${
            isLoaded ? 'animate-fade-in-left' : 'opacity-0 -translate-x-4'
          }`}>
            Trending Tokens
          </h2>
          <ButtonV2 
            variant="ghost" 
            size="sm"
            className={`transition-all duration-500 ${
              isLoaded ? 'animate-fade-in-right' : 'opacity-0 translate-x-4'
            }`}
          >
            View All
          </ButtonV2>
        </div>
        
        <div className="space-y-3">
          {mockTokens.map((token, index) => (
            <div
              key={token.id}
              className={`transition-all duration-500 ${
                isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
              }`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <TokenCardV2
                token={token}
                onClick={handleTokenClick}
                variant="default"
                className="hover:animate-pulse-glow"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCreateScreen = () => (
    <div className="space-y-6">
      <CardV2 
        variant="gradient" 
        glow 
        className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 animate-fade-in"
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white animate-bounce-in">Create Your Token</h2>
          <p className="text-gray-300 animate-fade-in">
            Launch your token with G8's fair launch mechanism
          </p>
        </div>
      </CardV2>

      <div className="space-y-4">
        <InputV2
          label="Token Name"
          placeholder="Enter token name"
          icon={<User className="h-4 w-4" />}
          className="animate-fade-in-up"
        />
        <InputV2
          label="Token Symbol"
          placeholder="Enter token symbol"
          icon={<TrendingUp className="h-4 w-4" />}
          className="animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        />
        <InputV2
          label="Description"
          placeholder="Describe your token"
          icon={<BarChart3 className="h-4 w-4" />}
          className="animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        />
        
        <ButtonV2 
          gradient="primary" 
          size="lg" 
          className="w-full animate-bounce-in hover:animate-pulse-glow"
          style={{ animationDelay: '300ms' }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Launch Token
        </ButtonV2>
      </div>
    </div>
  )

  const renderG8Screen = () => (
    <div className="space-y-6">
      <CardV2 
        variant="gradient" 
        glow 
        className="bg-gradient-to-br from-green-900/20 to-cyan-900/20 animate-fade-in"
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white animate-bounce-in">G8 Graduation Zone</h2>
          <p className="text-gray-300 animate-fade-in">
            Create & Win, Graduate & Hold
          </p>
        </div>
      </CardV2>

      <div className="grid grid-cols-1 gap-4">
        <CardV2 
          variant="elevated" 
          hover 
          className="cursor-pointer animate-fade-in-up hover:animate-pulse-glow"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full flex items-center justify-center animate-float">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Create & Win</h3>
              <p className="text-sm text-gray-400">Launch your token and compete for rewards</p>
            </div>
          </div>
        </CardV2>

        <CardV2 
          variant="elevated" 
          hover 
          className="cursor-pointer animate-fade-in-up hover:animate-pulse-glow"
          style={{ animationDelay: '100ms' }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-400 rounded-full flex items-center justify-center animate-float">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Graduate & Hold</h3>
              <p className="text-sm text-gray-400">Tokens that have graduated to major exchanges</p>
            </div>
          </div>
        </CardV2>
      </div>
    </div>
  )

  const renderProfileScreen = () => (
    <div className="space-y-6">
      {/* Profile Header with Animation */}
      <CardV2 
        variant="gradient" 
        glow 
        className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 animate-fade-in"
      >
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto animate-float">
            <User className="h-10 w-10 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white animate-bounce-in">@SatoshiNakamoto</h2>
            <p className="text-gray-400 animate-fade-in">Verified Creator</p>
          </div>
        </div>
      </CardV2>

      {/* Stats with Staggered Animation */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Portfolio', value: '2520', delay: '0ms' },
          { label: 'Earned', value: '3590', delay: '100ms' },
          { label: 'Rep Score', value: '3590', delay: '200ms' },
        ].map((stat, index) => (
          <CardV2 
            key={stat.label}
            variant="elevated" 
            className={`text-center animate-fade-in-up`}
            style={{ animationDelay: stat.delay }}
          >
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white animate-count-up">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          </CardV2>
        ))}
      </div>

      {/* Activity with Animation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white animate-fade-in-left">Recent Activity</h3>
        <div className="space-y-3">
          {mockTokens.slice(0, 3).map((token, index) => (
            <div
              key={token.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <TokenCardV2
                token={token}
                onClick={handleTokenClick}
                variant="compact"
                className="hover:animate-pulse-glow"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeScreen()
      case 'create':
        return renderCreateScreen()
      case 'g8':
        return renderG8Screen()
      case 'profile':
        return renderProfileScreen()
      default:
        return renderHomeScreen()
    }
  }

  return (
    <ScreenV2
      title="G8"
      background="pattern"
      footer={
        <BottomNavV2
          items={[
            { id: 'home', label: 'Home', icon: TrendingUp },
            { id: 'create', label: 'Create', icon: Plus },
            { id: 'g8', label: 'G8', icon: BarChart3 },
            { id: 'profile', label: 'Profile', icon: User },
          ]}
          activeItem={activeTab}
          onItemClick={setActiveTab}
        />
      }
    >
      <div className={`transition-all duration-500 ${
        isLoaded ? 'animate-fade-in' : 'opacity-0'
      }`}>
        {renderContent()}
      </div>
    </ScreenV2>
  )
}
