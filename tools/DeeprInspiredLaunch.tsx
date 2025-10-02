import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, TrendingUp, Users, BarChart3, Lock, CheckCircle, Zap } from "lucide-react"
import { Token, User } from "@/types"
import { useState } from "react"
import { useSafeWorldId } from "@/providers/SafeWorldIdProvider"

interface DeeprInspiredLaunchProps {
  token: Token
  user: User
}

export default function DeeprInspiredLaunch({ token, user }: DeeprInspiredLaunchProps) {
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { isVerified, verificationLevel } = useSafeWorldId()
  
  const remainingAllocation = user.allocationCap - user.usedAllocation

  const handleBuy = async () => {
    if (!isVerified) {
      alert("Please verify with World ID first!")
      return
    }
    
    const amount = parseFloat(buyAmount)
    if (amount <= 0 || amount > remainingAllocation) {
      alert(`Invalid amount. You can buy up to ${remainingAllocation} WLD`)
      return
    }
    
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`Successfully bought ${amount} ${token.symbol} tokens!`)
      setBuyAmount("")
    } catch (error) {
      alert("Buy failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSell = async () => {
    if (!isVerified) {
      alert("Please verify with World ID first!")
      return
    }
    
    const amount = parseFloat(sellAmount)
    if (amount <= 0) {
      alert("Invalid amount")
      return
    }
    
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`Successfully sold ${amount} ${token.symbol} tokens!`)
      setSellAmount("")
    } catch (error) {
      alert("Sell failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Token Header with Deepr.fun style */}
      <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">
                {token.symbol.charAt(0)}
              </div>
              <div>
                <CardTitle className="text-2xl">{token.name}</CardTitle>
                <CardDescription className="text-lg">Fair Human-Only Launch</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-cyan-400">${token.currentPrice}</div>
              <div className="text-sm text-gray-400">Current Price</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Market Cap</div>
              <div className="font-semibold text-lg">${token.marketCap.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-400">Security Score</div>
              <div className="font-semibold text-green-400 text-lg">{token.securityScore}%</div>
            </div>
            <div>
              <div className="text-gray-400">Total Supply</div>
              <div className="font-semibold text-lg">1M {token.symbol}</div>
            </div>
            <div>
              <div className="text-gray-400">Your Level</div>
              <div className="font-semibold text-blue-400 text-lg">{user.reputationLevel}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fair Distribution - Deepr.fun style layout */}
      <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-400" />
            Fair Distribution
          </CardTitle>
          <CardDescription>
            Equal opportunities for all verified humans, preventing whale concentration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="font-semibold">Per Person Limit</span>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold">500 WLD</div>
                <div className="text-xs text-gray-400">Maximum per human</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="font-semibold">World ID Required</span>
              </div>
              <div className="text-right">
                <div className="text-blue-400 font-bold">Verified Only</div>
                <div className="text-xs text-gray-400">No bots allowed</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                <span className="font-semibold">Total Supply</span>
              </div>
              <div className="text-right">
                <div className="text-purple-400 font-bold">1M {token.symbol}</div>
                <div className="text-xs text-gray-400">Fair distribution</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anti-Bot Protection - Deepr.fun style layout */}
      <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-400" />
            Anti-Bot Protection
          </CardTitle>
          <CardDescription>
            Advanced protection mechanisms to ensure only humans can participate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-sm text-gray-400">Bot Detection Rate</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-400 mb-2">World ID</div>
              <div className="text-sm text-gray-400">Human Verification</div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg">
              <div className="text-2xl font-bold text-purple-400 mb-2">3,472</div>
              <div className="text-sm text-gray-400">Bots Blocked</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Interface - Deepr.fun style */}
      <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-400" />
            Fair Trading Interface
          </CardTitle>
          <CardDescription>
            Trade with confidence knowing only verified humans can participate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Buy Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Buy Amount (WLD)</label>
            <div className="flex gap-2">
              <Input 
                type="number" 
                placeholder="Enter amount"
                className="flex-1"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                max={remainingAllocation}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setBuyAmount(remainingAllocation.toString())}
              >
                Max
              </Button>
            </div>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 h-12"
              onClick={handleBuy}
              disabled={isLoading || !isVerified}
            >
              {isLoading ? "Buying..." : `Buy ${token.symbol}`}
            </Button>
          </div>

          {/* Sell Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Sell Amount (WLD)</label>
            <div className="flex gap-2">
              <Input 
                type="number" 
                placeholder="Enter amount"
                className="flex-1"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSellAmount("500")}
              >
                Max
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="w-full border-red-500 text-red-500 hover:bg-red-50 h-12"
              onClick={handleSell}
              disabled={isLoading || !isVerified}
            >
              {isLoading ? "Selling..." : `Sell ${token.symbol}`}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Anti-Manipulation Features - Deepr.fun style */}
      <Card className="bg-card/50 backdrop-blur-sm border-red-500/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-400" />
            Anti-Manipulation Protections
          </CardTitle>
          <CardDescription>
            Built-in protections against bots, MEV, and manipulation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <div className="font-semibold">World ID Verification</div>
                  <div className="text-sm text-gray-400">Only verified humans can trade</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg">
                <Lock className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="font-semibold">Priority Fee Caps</div>
                  <div className="text-sm text-gray-400">Prevents MEV exploitation</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg">
                <Users className="h-5 w-5 text-purple-400" />
                <div>
                  <div className="font-semibold">Purchase Limits</div>
                  <div className="text-sm text-gray-400">Per-wallet limits prevent whale concentration</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-500/10 rounded-lg">
                <Zap className="h-5 w-5 text-orange-400" />
                <div>
                  <div className="font-semibold">Smart Liquidity</div>
                  <div className="text-sm text-gray-400">Auto-scaling reduces price impact</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Allocation - Deepr.fun style */}
      <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="h-6 w-6 text-cyan-400" />
            Your Fair Allocation
          </CardTitle>
          <CardDescription>
            Based on your World ID verification level: {verificationLevel}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-400 mb-2">{remainingAllocation}</div>
              <div className="text-sm text-gray-400">Available WLD</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-400 mb-2">{user.usedAllocation}</div>
              <div className="text-sm text-gray-400">Used Allocation</div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg">
              <div className="text-2xl font-bold text-purple-400 mb-2">{user.allocationCap}</div>
              <div className="text-sm text-gray-400">Total Cap</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
