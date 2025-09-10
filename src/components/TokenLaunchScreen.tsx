import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatCurrency, calculateAllocationCap } from "@/lib/utils"
import { Shield, TrendingUp, Users, Bot, AlertTriangle, BarChart3, MessageCircle } from "lucide-react"
import { Token, User } from "@/types"

interface TokenLaunchScreenProps {
  token: Token
  user: User
}

export default function TokenLaunchScreen({ token, user }: TokenLaunchScreenProps) {
  const remainingAllocation = user.allocationCap - user.usedAllocation
  const allocationProgress = (user.usedAllocation / user.allocationCap) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold gradient-text">FairLaunch</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Your Level: {user.reputationLevel} {user.reputationLevel === 'Bronze' ? '🥉' : user.reputationLevel === 'Silver' ? '🥈' : user.reputationLevel === 'Gold' ? '🥇' : '💎'}</span>
            <span className="text-sm text-green-400">Security: {token.securityScore}%</span>
          </div>
        </header>

        {/* Token Info Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">
                  {token.symbol.charAt(0)}
                </div>
                <div>
                  <CardTitle className="text-2xl">{token.name} ({token.symbol})</CardTitle>
                  <CardDescription>Fair Human-Only Launch</CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-cyan-400">{formatCurrency(token.currentPrice)}</div>
                <div className="text-sm text-gray-400">Current Price</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold">{formatCurrency(token.marketCap)}</div>
                <div className="text-sm text-gray-400">Market Cap</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{token.progress}%</div>
                <div className="text-sm text-gray-400">Progress</div>
                <Progress value={token.progress} className="mt-2" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{token.securityScore}%</div>
                <div className="text-sm text-gray-400">Security Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Allocation Cap Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-400" />
              Your Allocation Cap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Available</span>
                    <span className="text-2xl font-bold text-green-400">{formatCurrency(remainingAllocation)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Used</span>
                    <span className="text-2xl font-bold text-yellow-400">{formatCurrency(user.usedAllocation)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Total Cap</span>
                    <span className="text-2xl font-bold text-cyan-400">{formatCurrency(user.allocationCap)}</span>
                  </div>
                </div>
                <Progress value={allocationProgress} className="mt-4" />
              </div>
              <div className="space-y-4">
                <Button variant="neon" size="lg" className="w-full">
                  ⚡ Buy Now - 50 WLD
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  📊 View Chart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fairness Metrics */}
        <Card className="bg-card/50 backdrop-blur-sm border-green-500/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-green-400" />
              Fairness Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-green-400">{token.humanCount.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Humans Verified</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Bot className="h-8 w-8 text-red-400" />
                </div>
                <div className="text-2xl font-bold text-red-400">{token.botCount}</div>
                <div className="text-sm text-gray-400">Bots Blocked</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-400">{formatCurrency(token.avgBuy)}</div>
                <div className="text-sm text-gray-400">Avg Buy</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-8 w-8 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-purple-400">Fair</div>
                <div className="text-sm text-gray-400">Distribution</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg">
            <BarChart3 className="h-5 w-5 mr-2" />
            Trading History
          </Button>
          <Button variant="outline" size="lg">
            <Users className="h-5 w-5 mr-2" />
            Community
          </Button>
          <Button variant="outline" size="lg">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Report Issue
          </Button>
        </div>
      </div>
    </div>
  )
}
