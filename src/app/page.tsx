'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Coins, 
  Rocket, 
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Zap,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Fair Launchpad
          </h1>
          <p className="text-xl text-gray-600">
            Anti-bot meme coin launchpad with World ID verification
          </p>
        </div>

        {/* Module Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Core Journey Module */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Core Journey
              </CardTitle>
              <CardDescription>
                World ID verification and wallet creation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>World ID Verification</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Privy Wallet Creation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Journey Completion</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link href="/world-app" className="flex-1">
                  <Button className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    World App
                  </Button>
                </Link>
                <Link href="/test-journey" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Token Creation Module */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Token Creation
              </CardTitle>
              <CardDescription>
                Create and launch tokens
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Token Creation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Anti-Bot Protection</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Bonding Curve</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link href="/token-world-app" className="flex-1">
                  <Button className="w-full">
                    <Coins className="h-4 w-4 mr-2" />
                    World App
                  </Button>
                </Link>
                <Link href="/token-module" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Trading Module */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Launch Token
              </CardTitle>
              <CardDescription>
                Launch tokens with anti-bot protection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Token Launch</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Anti-Bot Protection</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Bonding Curve</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link href="/trading-world-app" className="flex-1">
                  <Button className="w-full">
                    <Rocket className="h-4 w-4 mr-2" />
                    World App
                  </Button>
                </Link>
                <Link href="/trading" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Core Journey</CardTitle>
              <CardDescription>v1.0.0</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs space-y-1 font-mono">
                <div>Status: ✅ Ready</div>
                <div>World App: ✅ Optimized</div>
                <div>Features: World ID + Wallet</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Token Creation</CardTitle>
              <CardDescription>v1.0.0</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs space-y-1 font-mono">
                <div>Status: ✅ Ready</div>
                <div>World App: ✅ Optimized</div>
                <div>Features: Creation + Launch</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Launch Token</CardTitle>
              <CardDescription>v1.0.0</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs space-y-1 font-mono">
                <div>Status: ✅ Ready</div>
                <div>World App: ✅ Optimized</div>
                <div>Features: Launch + Trading</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Deployment</CardTitle>
              <CardDescription>Production</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs space-y-1 font-mono">
                <div>Domain: ✅ Live</div>
                <div>HTTPS: ✅ Secure</div>
                <div>CDN: ✅ Active</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/world-app">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Shield className="h-5 w-5 mr-2" />
                Start Core Journey
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/trading-world-app">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Rocket className="h-5 w-5 mr-2" />
                Launch Token
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}