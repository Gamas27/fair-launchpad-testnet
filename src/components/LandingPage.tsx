import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Trophy, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold gradient-text">FairLaunch</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Security: 95%</span>
            <span className="text-sm text-gray-400">Humans: 1,247</span>
            <Button variant="outline" size="sm">Connect Wallet</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">
            The Fairest Meme Coin
            <br />
            <span className="gradient-text">Launchpad Ever Built</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Every human gets a shot. No bots. No whales. Just pure, fair launches 
            powered by Proof of Personhood and military-grade verification.
          </p>
          <Button variant="neon" size="lg" className="text-lg px-8 py-4">
            🚀 Launch Your Meme Coin Fairly
          </Button>
        </div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-cyan-500/10 rounded-full w-fit">
                <Shield className="h-8 w-8 text-cyan-400" />
              </div>
              <CardTitle className="text-cyan-400">Verify Once</CardTitle>
              <CardDescription>
                World ID ensures you&apos;re a real human with biometric verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Device Verified</span>
                  <span className="text-green-400">✅</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone Verified</span>
                  <span className="text-yellow-400">🔒</span>
                </div>
                <div className="flex justify-between">
                  <span>Orb Verified</span>
                  <span className="text-yellow-400">🔒</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-500/10 rounded-full w-fit">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <CardTitle className="text-blue-400">Fair Allocation</CardTitle>
              <CardDescription>
                Each person gets a cap based on their trust level and reputation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Bronze Human</span>
                  <span className="text-amber-600">200 WLD</span>
                </div>
                <div className="flex justify-between">
                  <span>Silver Human</span>
                  <span className="text-gray-400">500 WLD</span>
                </div>
                <div className="flex justify-between">
                  <span>Gold Human</span>
                  <span className="text-yellow-500">1,000 WLD</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-500/10 rounded-full w-fit">
                <Trophy className="h-8 w-8 text-purple-400" />
              </div>
              <CardTitle className="text-purple-400">Grow Reputation</CardTitle>
              <CardDescription>
                Trade fairly, earn reputation, unlock higher limits and exclusive access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Fair Trades</span>
                  <span className="text-green-400">+50 XP</span>
                </div>
                <div className="flex justify-between">
                  <span>Bot Reports</span>
                  <span className="text-red-400">+25 XP</span>
                </div>
                <div className="flex justify-between">
                  <span>Community Help</span>
                  <span className="text-blue-400">+100 XP</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Transparency Block */}
        <Card className="bg-card/30 backdrop-blur-sm border-green-500/20 mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-green-400 flex items-center justify-center gap-2">
              <Zap className="h-6 w-6" />
              We stop 95% of bots and manipulations — and we&apos;re honest about the rest
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">12,384</div>
                <div className="text-sm text-gray-400">Humans Onboarded</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-400">3,472</div>
                <div className="text-sm text-gray-400">Bots Blocked</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">92</div>
                <div className="text-sm text-gray-400">Suspicious Accounts Reported</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Fairly?</h2>
          <p className="text-gray-300 mb-8">
            Join thousands of humans building the future of fair meme coin launches
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="neon" size="lg">
              🚀 Start Your Fair Launch
            </Button>
            <Button variant="outline" size="lg">
              📊 View Live Stats
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
