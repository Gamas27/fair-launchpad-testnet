'use client'

import { useState } from 'react'
import { AlchemyCommunityDashboard } from '@/components/community/AlchemyCommunityDashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { G8Button } from '@/components/ui/g8-button'
import { useG8User } from '@/lib/state/context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AlchemyDemoPage() {
  const { isAuthenticated, isWorldIdVerified } = useG8User()
  const router = useRouter()
  const [tokenAddress, setTokenAddress] = useState('')
  const [isDemoMode, setIsDemoMode] = useState(true)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !isWorldIdVerified) {
      router.push('/g8/onboarding')
    }
  }, [isAuthenticated, isWorldIdVerified, router])

  if (!isAuthenticated || !isWorldIdVerified) {
    return null
  }

  const handleDemoToken = () => {
    // Use a demo token address for testing
    setTokenAddress('0x1234567890123456789012345678901234567890')
    setIsDemoMode(false)
  }

  const handleCustomToken = () => {
    if (tokenAddress.trim()) {
      setIsDemoMode(false)
    }
  }

  return (
    <div className="min-h-screen bg-g8-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-g8-primary mb-4">
            🔗 Alchemy Integration Demo
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Experience real-time blockchain data, community analytics, and gas-less transactions
          </p>
          <Badge variant="default" className="mb-4">
            Powered by Alchemy
          </Badge>
        </div>

        {/* Token Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Token Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter token address (0x...)"
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleCustomToken} disabled={!tokenAddress.trim()}>
                  Analyze Token
                </Button>
              </div>
              <div className="text-center">
                <span className="text-gray-500 mr-4">or</span>
                <G8Button onClick={handleDemoToken} variant="outline">
                  Try Demo Token
                </G8Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alchemy Features Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🚀 Alchemy-Powered Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold mb-2">Real-time Data</h3>
                <p className="text-sm text-gray-600">
                  Live token prices, volume, and community activity
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🔔</div>
                <h3 className="font-semibold mb-2">Webhook Notifications</h3>
                <p className="text-sm text-gray-600">
                  Instant community event updates
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold mb-2">Gas-less Transactions</h3>
                <p className="text-sm text-gray-600">
                  Sponsored community actions
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🌐</div>
                <h3 className="font-semibold mb-2">Multi-chain Support</h3>
                <p className="text-sm text-gray-600">
                  80+ chains for future expansion
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Dashboard */}
        {tokenAddress && !isDemoMode && (
          <AlchemyCommunityDashboard 
            tokenAddress={tokenAddress}
            className="mb-8"
          />
        )}

        {/* Demo Mode */}
        {isDemoMode && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>🎮 Demo Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-4">
                  Ready to Experience Alchemy Integration?
                </h3>
                <p className="text-gray-600 mb-6">
                  Enter a token address above or try our demo token to see real-time blockchain data,
                  community analytics, and gas-less transaction features in action.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>✅ Real-time token analytics</p>
                  <p>✅ Community engagement metrics</p>
                  <p>✅ Gas-less transaction capabilities</p>
                  <p>✅ Webhook event notifications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Integration Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>💡 Why Alchemy Integration?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-g8-primary">Community Benefits</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time community activity tracking</li>
                  <li>• Instant milestone notifications</li>
                  <li>• Gas-less community actions</li>
                  <li>• Enhanced community insights</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-g8-primary">Technical Advantages</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Superior data accuracy and speed</li>
                  <li>• Webhook reliability and performance</li>
                  <li>• Multi-chain future expansion</li>
                  <li>• Advanced analytics capabilities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
