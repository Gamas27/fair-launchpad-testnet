'use client'

import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Coins, 
  Rocket, 
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Zap,
  CheckCircle,
  BarChart3,
  Search,
  Wallet
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Mobile-optimized header */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                FairLaunch
              </h1>
              <p className="text-sm text-gray-300">
                Anti-bot meme coin launchpad
              </p>
            </div>
          </div>

          {/* Hero Section */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                🚀 FairLaunch - Anti-Bot Meme Coin Launchpad
              </CardTitle>
              <CardDescription className="text-center text-lg text-gray-300">
                The first meme coin launchpad protected by World ID's Proof of Personhood
              </CardDescription>
            </CardHeader>
          </Card>

        {/* Module Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Core Journey Module */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-300">
                  <Shield className="h-5 w-5" />
                  Core Journey
                </CardTitle>
                <CardDescription className="text-gray-300">
                  World ID verification and wallet creation
                </CardDescription>
              </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>World ID Verification</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Privy Wallet Creation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
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
            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-300">
                  <Coins className="h-5 w-5" />
                  Token Creation
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Create and launch tokens
                </CardDescription>
              </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Token Creation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Anti-Bot Protection</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
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

            {/* Launch Token Module */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-300">
                  <Rocket className="h-5 w-5" />
                  Launch Token
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Launch tokens with anti-bot protection
                </CardDescription>
              </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Token Launch</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Anti-Bot Protection</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
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

            {/* Trading Interface Module */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-300">
                  <BarChart3 className="h-5 w-5" />
                  Trading Interface
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Trade tokens with advanced interface
                </CardDescription>
              </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span>Token Trading</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span>Price Charts</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span>Trade History</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link href="/trading-v2-world-app" className="flex-1">
                  <Button className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    World App
                  </Button>
                </Link>
                <Link href="/trading-v2" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

                  {/* Discovery Module */}
                  <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-300">
                        <Search className="h-5 w-5" />
                        Discovery
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        Search and discover tokens
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-3 h-3 rounded-full bg-cyan-500" />
                          <span>Search & Filters</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-3 h-3 rounded-full bg-cyan-500" />
                          <span>Project Cards</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-3 h-3 rounded-full bg-cyan-500" />
                          <span>Live Updates</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link href="/discovery-world-app" className="flex-1">
                          <Button className="w-full">
                            <Search className="h-4 w-4 mr-2" />
                            World App
                          </Button>
                        </Link>
                        <Link href="/discovery-module" className="flex-1">
                          <Button variant="outline" className="w-full">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Test
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Profile Module */}
                  <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-300">
                        <Wallet className="h-5 w-5" />
                        Profile
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        User profile and wallet
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-3 h-3 rounded-full bg-cyan-500" />
                          <span>Balances & Stats</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-3 h-3 rounded-full bg-cyan-500" />
                          <span>Activity Feed</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-3 h-3 rounded-full bg-cyan-500" />
                          <span>Quick Actions</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link href="/profile-world-app" className="flex-1">
                          <Button className="w-full">
                            <Wallet className="h-4 w-4 mr-2" />
                            World App
                          </Button>
                        </Link>
                        <Link href="/profile-module" className="flex-1">
                          <Button variant="outline" className="w-full">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Test
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Navigation Module */}
                  <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-300">
                        <BarChart3 className="h-5 w-5" />
                        Navigation
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        Futuristic mobile interface
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-3 h-3 rounded-full bg-cyan-500" />
                          <span>Bottom Navigation</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-3 h-3 rounded-full bg-cyan-500" />
                          <span>Token Cards</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-3 h-3 rounded-full bg-cyan-500" />
                          <span>Mini Charts</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link href="/navigation-world-app" className="flex-1">
                          <Button className="w-full">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            World App
                          </Button>
                        </Link>
                        <Link href="/navigation-module" className="flex-1">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-sm text-purple-300">Core Journey</CardTitle>
                <CardDescription className="text-gray-300">v1.0.0</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-1 font-mono text-gray-300">
                  <div>Status: ✅ Ready</div>
                  <div>World App: ✅ Optimized</div>
                  <div>Features: World ID + Wallet</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-sm text-purple-300">Token Creation</CardTitle>
                <CardDescription className="text-gray-300">v1.0.0</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-1 font-mono text-gray-300">
                  <div>Status: ✅ Ready</div>
                  <div>World App: ✅ Optimized</div>
                  <div>Features: Creation + Launch</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-sm text-purple-300">Launch Token</CardTitle>
                <CardDescription className="text-gray-300">v1.0.0</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-1 font-mono text-gray-300">
                  <div>Status: ✅ Ready</div>
                  <div>World App: ✅ Optimized</div>
                  <div>Features: Launch + Trading</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
            <CardHeader>
                <CardTitle className="text-sm text-purple-300">Trading Interface</CardTitle>
                <CardDescription className="text-gray-300">v1.0.0</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-xs space-y-1 font-mono text-gray-300">
                  <div>Status: ✅ Ready</div>
                  <div>World App: ✅ Optimized</div>
                  <div>Features: Trading + Charts</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-sm text-purple-300">Discovery</CardTitle>
                <CardDescription className="text-gray-300">v1.0.0</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-1 font-mono text-gray-300">
                  <div>Status: ✅ Ready</div>
                  <div>World App: ✅ Optimized</div>
                  <div>Features: Search + Filters</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-sm text-purple-300">Profile</CardTitle>
                <CardDescription className="text-gray-300">v1.0.0</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-1 font-mono text-gray-300">
                  <div>Status: ✅ Ready</div>
                  <div>World App: ✅ Optimized</div>
                  <div>Features: Wallet + Stats</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-sm text-purple-300">Navigation</CardTitle>
                <CardDescription className="text-gray-300">v1.0.0</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-1 font-mono text-gray-300">
                  <div>Status: ✅ Ready</div>
                  <div>World App: ✅ Optimized</div>
                  <div>Features: Mobile + Charts</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-sm text-purple-300">Deployment</CardTitle>
                <CardDescription className="text-gray-300">Production</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-1 font-mono text-gray-300">
                  <div>Domain: ✅ Live</div>
                  <div>HTTPS: ✅ Secure</div>
                  <div>CDN: ✅ Active</div>
                </div>
              </CardContent>
            </Card>
        </div>

          {/* Quick Actions */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Quick Actions</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/world-app">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Shield className="h-5 w-5 mr-2" />
                  Start Core Journey
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="/trading-v2-world-app">
                <Button size="lg" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-900/20">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Trading Interface
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}