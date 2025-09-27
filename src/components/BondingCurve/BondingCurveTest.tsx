'use client'

import { useState, useEffect } from 'react'
import { usePrivyWallet } from '@/hooks/usePrivyWallet'
import { contractService } from '@/lib/contracts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, TrendingUp, Coins } from 'lucide-react'

interface BondingCurveTestProps {
  tokenAddress?: string
}

export function BondingCurveTest({ tokenAddress }: BondingCurveTestProps) {
  const { address, isConnected } = usePrivyWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [bondingCurveData, setBondingCurveData] = useState({
    currentPrice: '0',
    totalSupply: '0',
    name: '',
    symbol: '',
    isGraduated: false
  })
  const [purchaseAmount, setPurchaseAmount] = useState('1')
  const [estimatedTokens, setEstimatedTokens] = useState('0')

  // Load bonding curve data
  useEffect(() => {
    if (tokenAddress) {
      loadBondingCurveData()
    }
  }, [tokenAddress])

  const loadBondingCurveData = async () => {
    if (!tokenAddress) return

    setIsLoading(true)
    try {
      // Get bonding curve information
      const [currentPrice, totalSupply, name, symbol, isGraduated] = await Promise.all([
        contractService.getCurrentPrice(tokenAddress),
        contractService.getTotalSupply(tokenAddress),
        contractService.getTokenName(tokenAddress),
        contractService.getTokenSymbol(tokenAddress),
        contractService.isGraduated(tokenAddress)
      ])

      setBondingCurveData({
        currentPrice: (Number(currentPrice) / 1e18).toFixed(6),
        totalSupply: (Number(totalSupply) / 1e18).toFixed(2),
        name,
        symbol,
        isGraduated
      })

      // Calculate estimated tokens for purchase
      calculateEstimatedTokens(purchaseAmount)
    } catch (error) {
      console.error('Error loading bonding curve data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateEstimatedTokens = (amount: string) => {
    if (!amount || !bondingCurveData.currentPrice) return
    
    const tokens = parseFloat(amount) / parseFloat(bondingCurveData.currentPrice)
    setEstimatedTokens(tokens.toFixed(6))
  }

  const handlePurchase = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first')
      return
    }

    if (!tokenAddress) {
      alert('No token address provided')
      return
    }

    setIsLoading(true)
    try {
      const amountWei = (parseFloat(purchaseAmount) * 1e18).toString()
      
      // Purchase tokens using bonding curve
      const tx = await contractService.purchaseTokens(tokenAddress, amountWei)
      
      console.log('Purchase transaction:', tx)
      alert('Purchase successful! Transaction: ' + tx)
      
      // Reload data
      await loadBondingCurveData()
    } catch (error) {
      console.error('Error purchasing tokens:', error)
      alert('Failed to purchase tokens. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGraduate = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first')
      return
    }

    if (!tokenAddress) {
      alert('No token address provided')
      return
    }

    setIsLoading(true)
    try {
      // Trigger graduation
      const tx = await contractService.graduateToken(tokenAddress)
      
      console.log('Graduation transaction:', tx)
      alert('Graduation successful! Transaction: ' + tx)
      
      // Reload data
      await loadBondingCurveData()
    } catch (error) {
      console.error('Error graduating token:', error)
      alert('Failed to graduate token. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bonding Curve Test</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Please connect your wallet to interact with the bonding curve.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Bonding Curve Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tokenAddress && (
          <Alert>
            <AlertDescription>
              <strong>Token Address:</strong> {tokenAddress}
            </AlertDescription>
          </Alert>
        )}

        {bondingCurveData.name && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Token Name</Label>
              <div className="p-2 bg-gray-50 rounded">{bondingCurveData.name}</div>
            </div>
            <div className="space-y-2">
              <Label>Token Symbol</Label>
              <div className="p-2 bg-gray-50 rounded">{bondingCurveData.symbol}</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Current Price (WLD)</Label>
            <div className="p-2 bg-gray-50 rounded">
              {isLoading ? 'Loading...' : bondingCurveData.currentPrice}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Total Supply</Label>
            <div className="p-2 bg-gray-50 rounded">
              {isLoading ? 'Loading...' : bondingCurveData.totalSupply}
            </div>
          </div>
        </div>

        {bondingCurveData.isGraduated && (
          <Alert>
            <AlertDescription>
              <strong>Status:</strong> This token has graduated to Uniswap V3
            </AlertDescription>
          </Alert>
        )}

        {!bondingCurveData.isGraduated && (
          <>
            <div className="space-y-2">
              <Label htmlFor="purchaseAmount">Purchase Amount (WLD)</Label>
              <Input
                id="purchaseAmount"
                type="number"
                step="0.01"
                placeholder="1.0"
                value={purchaseAmount}
                onChange={(e) => {
                  setPurchaseAmount(e.target.value)
                  calculateEstimatedTokens(e.target.value)
                }}
              />
            </div>

            {estimatedTokens !== '0' && (
              <div className="p-2 bg-blue-50 rounded">
                <p className="text-sm">
                  <strong>Estimated Tokens:</strong> {estimatedTokens} {bondingCurveData.symbol}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={handlePurchase}
                disabled={isLoading || !purchaseAmount}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Purchasing...
                  </>
                ) : (
                  <>
                    <Coins className="h-4 w-4 mr-2" />
                    Purchase Tokens
                  </>
                )}
              </Button>

              <Button 
                onClick={handleGraduate}
                disabled={isLoading}
                variant="outline"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Graduating...
                  </>
                ) : (
                  'Graduate Token'
                )}
              </Button>
            </div>
          </>
        )}

        <Button 
          onClick={loadBondingCurveData}
          disabled={isLoading}
          variant="outline"
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Refreshing...
            </>
          ) : (
            'Refresh Data'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
