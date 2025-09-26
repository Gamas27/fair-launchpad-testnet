import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Zap } from "lucide-react"
import { useSafeWorldId } from "@/providers/SafeWorldIdProvider"

export default function LandingPage() {
  const { isVerified } = useSafeWorldId()

  const handleLaunchToken = async () => {
    if (!isVerified) {
      alert("Please verify with World ID first to launch tokens!")
      return
    }
    alert("🚀 Token launch feature coming soon! This will create a new fair token.")
  }

  const handleViewStats = () => {
    alert("📊 Live stats: 12,384 humans verified, 3,472 bots blocked, 95% success rate!")
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Mobile-First Hero Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Fair Meme Coin
            <br />
            <span className="gradient-text">Launchpad</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            No bots. No whales. Just fair launches powered by World ID verification.
          </p>
          <Button 
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 h-12 rounded-md text-lg px-8"
            onClick={handleLaunchToken}
          >
            🚀 Launch Your Token
          </Button>
        </div>

        {/* Mobile-Optimized Features */}
        <div className="space-y-4 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-3 p-2 bg-cyan-500/10 rounded-full w-fit">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
              <CardTitle className="text-cyan-400 text-lg">World ID Verification</CardTitle>
              <CardDescription className="text-sm">
                Prove you&apos;re human with biometric verification
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Device Verified</span>
                  <span className="text-green-400">✅</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone Verified</span>
                  <span className="text-yellow-400">🔒</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-3 p-2 bg-blue-500/10 rounded-full w-fit">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-blue-400 text-lg">Fair Allocation</CardTitle>
              <CardDescription className="text-sm">
                Equal opportunities for all verified humans
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Per Person Limit</span>
                  <span className="text-green-400">500 WLD</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Supply</span>
                  <span className="text-blue-400">1M WLD</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Stats */}
        <Card className="bg-card/30 backdrop-blur-sm border-green-500/20 mb-8">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-green-400 flex items-center justify-center gap-2 text-lg">
              <Zap className="h-5 w-5" />
              Anti-Bot Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">12,384</div>
                <div className="text-xs text-gray-400">Humans</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">3,472</div>
                <div className="text-xs text-gray-400">Bots Blocked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">95%</div>
                <div className="text-xs text-gray-400">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to Launch?</h2>
          <p className="text-gray-300 text-sm">
            Join the fair launch revolution
          </p>
          <div className="flex flex-col gap-3">
            <Button 
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 h-12 rounded-md"
              onClick={handleLaunchToken}
            >
              🚀 Start Fair Launch
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-10"
              onClick={handleViewStats}
            >
              📊 View Stats
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
