import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, TrendingUp, Users, Bot } from "lucide-react"
import { Token, User } from "@/types"
import { useState } from "react"
import { useSafeWorldId } from "@/providers/SafeWorldIdProvider"

interface SimpleTokenLaunchProps {
  token: Token
  user: User
}

export default function SimpleTokenLaunch({ token, user }: SimpleTokenLaunchProps) {
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { isVerified } = useSafeWorldId()
  
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
      // Simulate API call
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
      // Simulate API call
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
    <div className="space-y-4">
      {/* Token Header */}
      <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
                {token.symbol.charAt(0)}
              </div>
              <div>
                <CardTitle className="text-lg">{token.name}</CardTitle>
                <CardDescription className="text-sm">{token.symbol}</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-cyan-400">${token.currentPrice}</div>
              <div className="text-xs text-gray-400">Price</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Market Cap</div>
              <div className="font-semibold">${token.marketCap.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-400">Security Score</div>
              <div className="font-semibold text-green-400">{token.securityScore}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Allocation */}
      <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Your Allocation
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Available</span>
              <span className="font-semibold">{remainingAllocation} WLD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Used</span>
              <span className="font-semibold">{user.usedAllocation} WLD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Level</span>
              <span className="font-semibold text-blue-400">{user.reputationLevel}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buy/Sell Interface */}
      <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            Trade
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {/* Buy Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Buy Amount (WLD)</label>
            <Input 
              type="number" 
              placeholder="Enter amount"
              className="w-full"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              max={remainingAllocation}
            />
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleBuy}
              disabled={isLoading || !isVerified}
            >
              {isLoading ? "Buying..." : `Buy ${token.symbol}`}
            </Button>
          </div>

          {/* Sell Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sell Amount (WLD)</label>
            <Input 
              type="number" 
              placeholder="Enter amount"
              className="w-full"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
            />
            <Button 
              variant="outline" 
              className="w-full border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleSell}
              disabled={isLoading || !isVerified}
            >
              {isLoading ? "Selling..." : `Sell ${token.symbol}`}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-400" />
            Security Features
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>World ID Verified</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="flex justify-between">
              <span>Anti-Bot Protection</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="flex justify-between">
              <span>Fair Launch</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
