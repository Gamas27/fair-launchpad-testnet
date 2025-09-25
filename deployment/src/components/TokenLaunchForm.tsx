import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Rocket, Users, Zap } from "lucide-react"
import { useState } from "react"
import { useSafeWorldId } from "@/providers/SafeWorldIdProvider"

export default function TokenLaunchForm() {
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenDescription, setTokenDescription] = useState("")
  const [totalSupply, setTotalSupply] = useState("1000000")
  const [maxPerPerson, setMaxPerPerson] = useState("500")
  const [isLaunching, setIsLaunching] = useState(false)
  const { isVerified, verificationLevel } = useSafeWorldId()

  const handleLaunch = async () => {
    if (!isVerified) {
      alert("Please verify with World ID first!")
      return
    }

    if (!tokenName || !tokenSymbol) {
      alert("Please fill in token name and symbol!")
      return
    }

    setIsLaunching(true)
    
    try {
      // Create token via API
      const response = await fetch('/api/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: `0x${Math.random().toString(16).substr(2, 40)}`, // Generate mock address
          name: tokenName,
          symbol: tokenSymbol,
          description: tokenDescription,
          imageUrl: `https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=${tokenSymbol}`,
          initialPrice: 0.01,
          priceIncrement: 0.001,
          maxSupply: parseInt(totalSupply),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create token')
      }

      const result = await response.json()
      
      // Redirect to the new token's DEX page
      const tokenAddress = result.data.token.address
      window.location.href = `/token/${tokenAddress}`
    } catch (error) {
      alert("Launch failed. Please try again.")
    } finally {
      setIsLaunching(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Launch Header */}
      <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Rocket className="h-6 w-6 text-cyan-400" />
            Launch Your Fair Token
          </CardTitle>
          <CardDescription>
            Create a new token with World ID verification and anti-bot protection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span>World ID Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span>Fair Distribution</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Anti-Bot Protection</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Token Configuration Form */}
      <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-xl">Token Configuration</CardTitle>
          <CardDescription>
            Configure your token parameters for fair distribution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tokenName">Token Name</Label>
              <Input
                id="tokenName"
                placeholder="e.g., FairLaunch Token"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokenSymbol">Token Symbol</Label>
              <Input
                id="tokenSymbol"
                placeholder="e.g., FLT"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your token and its purpose..."
              value={tokenDescription}
              onChange={(e) => setTokenDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalSupply">Total Supply</Label>
              <Input
                id="totalSupply"
                type="number"
                placeholder="1000000"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxPerPerson">Max Per Person (WLD)</Label>
              <Input
                id="maxPerPerson"
                type="number"
                placeholder="500"
                value={maxPerPerson}
                onChange={(e) => setMaxPerPerson(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Launch Summary */}
      <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
        <CardHeader>
          <CardTitle className="text-xl">Launch Summary</CardTitle>
          <CardDescription>
            Review your token configuration before launching
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Token Name:</span>
              <span className="font-semibold">{tokenName || "Not set"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Symbol:</span>
              <span className="font-semibold">{tokenSymbol || "Not set"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Total Supply:</span>
              <span className="font-semibold">{totalSupply} tokens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Max Per Person:</span>
              <span className="font-semibold">{maxPerPerson} WLD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">World ID Required:</span>
              <span className="text-green-400 font-semibold">✅ Yes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Anti-Bot Protection:</span>
              <span className="text-green-400 font-semibold">✅ Enabled</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Launch Button */}
      <div className="text-center">
        <Button
          className="w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 h-14 rounded-lg text-lg px-8"
          onClick={handleLaunch}
          disabled={isLaunching || !isVerified}
        >
          {isLaunching ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Launching Token...
            </>
          ) : (
            <>
              <Rocket className="h-5 w-5 mr-2" />
              Launch Fair Token
            </>
          )}
        </Button>
        
        {!isVerified && (
          <p className="text-sm text-red-400 mt-2">
            Please verify with World ID first to launch tokens
          </p>
        )}
      </div>
    </div>
  )
}
