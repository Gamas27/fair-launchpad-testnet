'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AppApi } from './AppApi'
import { mockWalletConnection, getWalletInfo, TEST_WALLETS, type TestWallet } from '@/utils/mockWallet'
import { authenticateTestUser, clearTestAuth, type TestUserType } from '@/utils/testAuth'
import { Users, Shield, Trophy, TrendingUp, AlertTriangle } from 'lucide-react'

export function TestInterface() {
  const [selectedWallet, setSelectedWallet] = useState<TestWallet | null>(null)
  const [isTesting, setIsTesting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSelectWallet = async (wallet: TestWallet) => {
    if (isLoading) return // Prevent multiple clicks
    
    console.log('Selecting wallet:', wallet)
    setIsLoading(true)
    setError(null)
    
    // Map TestWallet to TestUserType
    const userTypeMap: Record<TestWallet, TestUserType> = {
      GOLD_USER: 'GOLD_USER',
      SILVER_USER: 'SILVER_USER', 
      BRONZE_USER: 'BRONZE_USER',
      HIGH_RISK_USER: 'HIGH_RISK_USER',
      UNVERIFIED_USER: 'UNVERIFIED_USER',
    }

    try {
      console.log('Setting up mock wallet...')
      // Set up mock wallet
      mockWalletConnection(wallet)
      
      console.log('Authenticating test user...')
      // Authenticate the test user
      const token = await authenticateTestUser(userTypeMap[wallet])
      if (!token) {
        const errorMsg = 'Failed to authenticate test user'
        console.error(errorMsg)
        setError(errorMsg)
        setIsLoading(false)
        return
      }

      console.log('Authentication successful, starting test mode...')
      setSelectedWallet(wallet)
      setIsTesting(true)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('Error setting up test user:', err)
      setError(errorMsg)
      setIsLoading(false)
    }
  }

  const handleStopTesting = () => {
    setSelectedWallet(null)
    setIsTesting(false)
    setIsLoading(false)
    setError(null)
    // Clear mock wallet and authentication
    if (typeof window !== 'undefined') {
      delete (window as Record<string, unknown>).ethereum
    }
    clearTestAuth()
  }

  if (isTesting && selectedWallet) {
    return (
      <div>
        {/* Test Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                🧪 Testing Mode
              </Badge>
              <div className="text-sm">
                <span className="text-gray-400">Testing as:</span>
                <span className="ml-2 font-mono text-cyan-400">
                  {getWalletInfo(selectedWallet).name}
                </span>
              </div>
            </div>
            <Button onClick={handleStopTesting} variant="outline" size="sm">
              Stop Testing
            </Button>
          </div>
        </div>
        
        {/* Main App with top padding for header */}
        <div className="pt-16">
          <AppApi />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            🧪 FairLaunch Testing Interface
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Select a test user to experience different user journeys and test all features
          </p>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">Error:</span>
                <span>{error}</span>
              </div>
            </div>
          )}
        </header>

        {/* Test Users Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(TEST_WALLETS).map(([key, address]) => {
            const wallet = key as TestWallet
            const info = getWalletInfo(wallet)
            
            return (
              <Card 
                key={wallet} 
                className="bg-card/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{info.name}</span>
                    <Badge 
                      variant={
                        info.level === 'Gold' ? 'default' : 
                        info.level === 'Silver' ? 'secondary' : 
                        'outline'
                      }
                    >
                      {info.level}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="font-mono text-xs">
                    {address.slice(0, 10)}...{address.slice(-8)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">XP</div>
                      <div className="font-semibold">{info.xp.toLocaleString('en-US')}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Trades</div>
                      <div className="font-semibold">{info.trades}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Volume</div>
                      <div className="font-semibold">{info.volume}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Risk</div>
                      <div className={`font-semibold ${
                        info.risk.includes('High') ? 'text-red-400' :
                        info.risk.includes('Low') ? 'text-green-400' :
                        'text-yellow-400'
                      }`}>
                        {info.risk}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-cyan-400" />
                    <span className="text-gray-400">Verified:</span>
                    <span className="font-semibold">{info.verified}</span>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => handleSelectWallet(wallet)}
                  >
                    {isLoading ? 'Loading...' : `Test as ${info.name}`}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Testing Scenarios */}
        <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-cyan-400" />
              Testing Scenarios
            </CardTitle>
            <CardDescription>
              Each test user represents a different user journey and experience level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-cyan-400">New User Journey</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Unverified User - Test onboarding flow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Bronze User - Test basic features</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-cyan-400">Experienced User Journey</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span>Silver User - Test intermediate features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Gold User - Test advanced features</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-cyan-400">Edge Cases</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>High Risk User - Test anti-manipulation</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-cyan-400">Features to Test</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-cyan-400" />
                    <span>World ID Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-purple-400" />
                    <span>Reputation System</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span>Trading Interface</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <span>Anti-Manipulation</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-card/50 backdrop-blur-sm border-green-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-green-400">How to Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-300">
              <p>1. <strong>Select a test user</strong> from the cards above</p>
              <p>2. <strong>Experience the app</strong> as that user would</p>
              <p>3. <strong>Test all features</strong> - verification, trading, reputation, etc.</p>
              <p>4. <strong>Check different scenarios</strong> - try different user types</p>
              <p>5. <strong>Report any issues</strong> you find during testing</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
