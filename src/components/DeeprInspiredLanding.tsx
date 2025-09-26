import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Zap, TrendingUp, BarChart3, Lock, CheckCircle } from "lucide-react"
import { useSafeWorldId } from "@/providers/SafeWorldIdProvider"

interface DeeprInspiredLandingProps {
  onNavigateToLaunch?: () => void
}

export default function DeeprInspiredLanding({ onNavigateToLaunch }: DeeprInspiredLandingProps) {
  const { isVerified, verificationLevel } = useSafeWorldId()

  const handleLaunchToken = async () => {
    if (!isVerified) {
      alert("Please verify with World ID first to launch tokens!")
      return
    }
    
    // Navigate to launch form
    if (onNavigateToLaunch) {
      onNavigateToLaunch()
    } else {
      // Fallback to alert if no navigation function provided
      alert("🚀 Redirecting to token launch form...")
    }
  }

  const handleViewStats = () => {
    alert("📊 Live stats: 12,384 humans verified, 3,472 bots blocked, 95% success rate!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Hero Section with Deepr.fun inspired layout */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Fair Meme Coin
            <br />
            <span className="gradient-text">Launchpad</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            No bots. No whales. Just fair launches powered by World ID verification.
          </p>
          <Button 
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 h-14 rounded-lg text-lg px-8"
            onClick={handleLaunchToken}
          >
            🚀 Launch Your Token
          </Button>
        </div>

        {/* Deepr.fun inspired feature grid - FairLaunch concept */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* World ID Verification */}
          <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-cyan-500/10 rounded-full w-fit">
                <Shield className="h-8 w-8 text-cyan-400" />
              </div>
              <CardTitle className="text-cyan-400 text-xl">World ID Verification</CardTitle>
              <CardDescription className="text-base">
                Prove you&apos;re human with biometric verification to prevent bot manipulation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Device Verified</span>
                  <span className="text-green-400 font-semibold">✅</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Phone Verified</span>
                  <span className="text-yellow-400 font-semibold">🔒</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Orb Verified</span>
                  <span className="text-purple-400 font-semibold">🌟</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fair Distribution */}
          <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-500/10 rounded-full w-fit">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <CardTitle className="text-blue-400 text-xl">Fair Distribution</CardTitle>
              <CardDescription className="text-base">
                Equal opportunities for all verified humans, no whale concentration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Per Person Limit</span>
                  <span className="text-green-400 font-semibold">500 WLD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Supply</span>
                  <span className="text-blue-400 font-semibold">1M WLD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Max Holders</span>
                  <span className="text-purple-400 font-semibold">2,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Anti-Bot Protection */}
          <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-500/10 rounded-full w-fit">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <CardTitle className="text-purple-400 text-xl">Anti-Bot Protection</CardTitle>
              <CardDescription className="text-base">
                Advanced bot detection and prevention mechanisms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bot Detection</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">MEV Protection</span>
                  <Lock className="h-4 w-4 text-blue-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="text-purple-400 font-semibold">95%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparative Analysis Section - Deepr.fun style */}
        <Card className="bg-card/30 backdrop-blur-sm border-green-500/20 mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-green-400 text-2xl mb-4">
              Why FairLaunch is Superior to Traditional Launchpads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-4">Traditional Launchpads</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">❌</span>
                    <span>Bot manipulation and whale concentration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">❌</span>
                    <span>No human verification required</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">❌</span>
                    <span>Unfair token distribution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">❌</span>
                    <span>Early dumps and rug pulls</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-4">FairLaunch</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    <span>World ID verification prevents bots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Fair distribution per person</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Anti-bot protection mechanisms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Human-only token launches</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Launch Process - Deepr.fun style */}
        <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20 mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-cyan-400 text-2xl mb-4">
              How to Launch Your Fair Token
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="mx-auto mb-3 w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <span className="text-cyan-400 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Verify Identity</h3>
                <p className="text-sm text-gray-400">Connect World ID to prove you&apos;re human</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Set Parameters</h3>
                <p className="text-sm text-gray-400">Configure token details and allocation limits</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-400 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Launch Token</h3>
                <p className="text-sm text-gray-400">Deploy with anti-bot protection</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Fair Trading</h3>
                <p className="text-sm text-gray-400">Only verified humans can trade</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Stats - Deepr.fun style */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Live Platform Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">12,384</div>
              <div className="text-sm text-gray-400">Verified Humans</div>
            </div>
            <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-red-400 mb-2">3,472</div>
              <div className="text-sm text-gray-400">Bots Blocked</div>
            </div>
            <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
            <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">$2.4M</div>
              <div className="text-sm text-gray-400">Total Volume</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 h-12 rounded-lg px-8"
              onClick={handleLaunchToken}
            >
              🚀 Start Your Fair Launch
            </Button>
            <Button 
              variant="outline" 
              className="h-12 px-8"
              onClick={handleViewStats}
            >
              📊 View Detailed Stats
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
