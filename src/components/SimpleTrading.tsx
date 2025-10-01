import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react"
import { useState } from "react"
import { useSafeWorldId } from "@/providers/SafeWorldIdProvider"

export default function SimpleTrading() {
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { isVerified } = useSafeWorldId()

  const handleBuy = async () => {
    if (!isVerified) {
      alert("Please verify with World ID first!")
      return
    }
    
    const amount = parseFloat(buyAmount)
    if (amount <= 0) {
      alert("Invalid amount")
      return
    }
    
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`Successfully bought ${amount} WLD worth of tokens!`)
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
      alert(`Successfully sold ${amount} WLD worth of tokens!`)
      setSellAmount("")
    } catch (error) {
      alert("Sell failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="space-y-4">
      {/* Market Overview */}
      <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Total Volume</div>
              <div className="font-semibold text-lg">$2.4M</div>
            </div>
            <div>
              <div className="text-gray-400">24h Change</div>
              <div className="font-semibold text-green-400 text-lg">+12.5%</div>
            </div>
            <div>
              <div className="text-gray-400">Active Traders</div>
              <div className="font-semibold text-lg">1,247</div>
            </div>
            <div>
              <div className="text-gray-400">Fair Trades</div>
              <div className="font-semibold text-green-400 text-lg">98.2%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Trade */}
      <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            Quick Trade
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {/* Buy */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Buy Amount (WLD)</label>
            <div className="flex gap-2">
              <Input 
                type="number" 
                placeholder="0.00"
                className="flex-1"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setBuyAmount("1000")}
              >
                Max
              </Button>
            </div>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleBuy}
              disabled={isLoading || !isVerified}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              {isLoading ? "Buying..." : "Buy"}
            </Button>
          </div>

          {/* Sell */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sell Amount (WLD)</label>
            <div className="flex gap-2">
              <Input 
                type="number" 
                placeholder="0.00"
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
              className="w-full border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleSell}
              disabled={isLoading || !isVerified}
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              {isLoading ? "Selling..." : "Sell"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-400" />
            Recent Trades
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Buy</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">500 WLD</div>
                <div className="text-xs text-gray-400">2 min ago</div>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Sell</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">250 WLD</div>
                <div className="text-xs text-gray-400">5 min ago</div>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Buy</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">1,000 WLD</div>
                <div className="text-xs text-gray-400">8 min ago</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Portfolio */}
      <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Your Portfolio</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Total Value</span>
              <span className="font-semibold text-lg">$2,450</span>
            </div>
            <div className="flex justify-between">
              <span>WLD Balance</span>
              <span className="font-semibold">1,500 WLD</span>
            </div>
            <div className="flex justify-between">
              <span>Token Holdings</span>
              <span className="font-semibold">950 WLD</span>
            </div>
            <div className="flex justify-between">
              <span>24h P&L</span>
              <span className="font-semibold text-green-400">+$125</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
