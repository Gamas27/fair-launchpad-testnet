'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  TrendingUp, 
  Trophy, 
  Users, 
  Activity,
  Menu,
  X
} from 'lucide-react'
import { useWorldIdApi } from '@/hooks/useWorldIdApi'
import { useTokens } from '@/hooks/useTokens'
import { WorldIdButtonApi } from '@/components/WorldId/WorldIdButtonApi'
import ReputationScreenApi from '@/components/ReputationScreenApi'
import { TradingInterfaceApi } from '@/components/trading/TradingInterfaceApi'

type AppView = 'home' | 'trading' | 'reputation' | 'tokens'

export function AppApi() {
  const [currentView, setCurrentView] = useState<AppView>('home')
  const [selectedToken, setSelectedToken] = useState<string | undefined>()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { user, isVerified, verificationLevel, isLoading: userLoading } = useWorldIdApi()
  const { tokens, isLoading: tokensLoading } = useTokens()

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Shield },
    { id: 'trading', label: 'Trading', icon: TrendingUp },
    { id: 'reputation', label: 'Reputation', icon: Trophy },
    { id: 'tokens', label: 'Tokens', icon: Activity },
  ] as const

  const renderCurrentView = () => {
    switch (currentView) {
      case 'trading':
        return <TradingInterfaceApi tokenAddress={selectedToken} />
      case 'reputation':
        return <ReputationScreenApi />
      case 'tokens':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 p-4">
            <div className="container mx-auto max-w-6xl">
              <header className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <Activity className="h-8 w-8 text-green-400" />
                  <span className="text-2xl font-bold gradient-text">Token Marketplace</span>
                </div>
              </header>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tokens.map((token) => (
                  <Card 
                    key={token.address} 
                    className="bg-card/50 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedToken(token.address)
                      setCurrentView('trading')
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{token.name}</span>
                        <Badge variant={token.status === 'active' ? 'default' : 'secondary'}>
                          {token.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{token.symbol}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Price:</span>
                          <span className="font-semibold">${token.currentPrice.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Market Cap:</span>
                          <span className="font-semibold">${token.marketCap.toLocaleString('en-US')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Trades:</span>
                          <span className="font-semibold">{token.totalTrades}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Volume:</span>
                          <span className="font-semibold">${token.totalVolume.toLocaleString('en-US')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
            <div className="container mx-auto max-w-4xl">
              <header className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <Shield className="h-8 w-8 text-cyan-400" />
                  <span className="text-2xl font-bold gradient-text">FairLaunch</span>
                </div>
                <div className="flex items-center space-x-4">
                  {isVerified && (
                    <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified Human
                    </Badge>
                  )}
                </div>
              </header>

              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 gradient-text">
                  Fair Human-Only Token Launches
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Trade tokens with confidence knowing every participant is a verified human
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-6 w-6 text-cyan-400" />
                      World ID Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Every user is verified through World ID to ensure human-only participation.
                    </p>
                    <WorldIdButtonApi />
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-6 w-6 text-purple-400" />
                      Reputation System
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Build your reputation through fair trading and unlock exclusive benefits.
                    </p>
                    <Button 
                      onClick={() => setCurrentView('reputation')}
                      variant="outline"
                      className="w-full"
                    >
                      View Reputation
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-green-400" />
                      Fair Trading
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Trade with confidence using our anti-manipulation algorithms.
                    </p>
                    <Button 
                      onClick={() => setCurrentView('trading')}
                      variant="outline"
                      className="w-full"
                    >
                      Start Trading
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* User Stats */}
              {user && (
                <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-6 w-6 text-blue-400" />
                      Your Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">{user.reputationLevel}</div>
                        <div className="text-sm text-gray-400">Reputation Level</div>
                      </div>
                      <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">{user.reputationScore}</div>
                        <div className="text-sm text-gray-400">Reputation Score</div>
                      </div>
                      <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">{user.totalTrades}</div>
                        <div className="text-sm text-gray-400">Total Trades</div>
                      </div>
                      <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">${user.totalVolume.toLocaleString('en-US')}</div>
                        <div className="text-sm text-gray-400">Total Volume</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-card/95 backdrop-blur-sm border-r border-border/50 p-4">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold">FairLaunch</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                      setCurrentView(item.id)
                      setSidebarOpen(false)
                    }}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-card/50 backdrop-blur-sm border-r border-border/50 p-4">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-6 w-6 text-cyan-400" />
          <span className="text-lg font-bold">FairLaunch</span>
        </div>
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setCurrentView(item.id)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm border-b border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <span className="font-bold">FairLaunch</span>
          <div className="w-8" /> {/* Spacer */}
        </div>

        {/* Content */}
        {renderCurrentView()}
      </div>
    </div>
  )
}
