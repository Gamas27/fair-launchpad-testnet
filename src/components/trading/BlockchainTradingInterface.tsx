'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useWeb3 } from '@/hooks/useWeb3'
import { TradeResult, TokenInfo } from '@/lib/blockchain'
import { ArrowUpDown, TrendingUp, TrendingDown, Loader2 } from 'lucide-react'

interface BlockchainTradingInterfaceProps {
  tokenAddress: string
}

export function BlockchainTradingInterface({ tokenAddress }: BlockchainTradingInterfaceProps) {
  const {
    isConnected,
    account,
    buyTokens,
    sellTokens,
    getTokenInfo,
    getTokenBalance,
    tokenBalances,
  } = useWeb3()

  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null)
  const [tokenBalance, setTokenBalance] = useState<string>('0')
  const [ethBalance, setEthBalance] = useState<string>('0')
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState<string>('')
  const [maxSlippage, setMaxSlippage] = useState<number>(5)
  const [isLoading, setIsLoading] = useState(false)
  const [tradeResult, setTradeResult] = useState<TradeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Load token information
  useEffect(() => {
    const loadTokenInfo = async () => {
      try {
        const info = await getTokenInfo(tokenAddress)
        setTokenInfo(info)
      } catch (error) {
        console.error('Failed to load token info:', error)
        setError('Failed to load token information')
      }
    }

    if (tokenAddress) {
      loadTokenInfo()
    }
  }, [tokenAddress, getTokenInfo])

  // Load balances
  useEffect(() => {
    const loadBalances = async () => {
      if (!account) return

      try {
        const [tokenBal, ethBal] = await Promise.all([
          getTokenBalance(tokenAddress),
          getTokenBalance('ETH'), // This would need to be handled differently
        ])
        setTokenBalance(tokenBal)
        setEthBalance(ethBal)
      } catch (error) {
        console.error('Failed to load balances:', error)
      }
    }

    if (account && tokenAddress) {
      loadBalances()
    }
  }, [account, tokenAddress, getTokenBalance])

  const handleTrade = async () => {
    if (!isConnected || !account) {
      setError('Please connect your wallet first')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    setIsLoading(true)
    setError(null)
    setTradeResult(null)

    try {
      let result: TradeResult

      if (tradeType === 'buy') {
        result = await buyTokens(tokenAddress, amount, maxSlippage)
      } else {
        result = await sellTokens(tokenAddress, amount, maxSlippage)
      }

      setTradeResult(result)

      if (result.success) {
        // Refresh balances after successful trade
        const [newTokenBal, newEthBal] = await Promise.all([
          getTokenBalance(tokenAddress),
          getTokenBalance('ETH'),
        ])
        setTokenBalance(newTokenBal)
        setEthBalance(newEthBal)
      } else {
        setError(result.error || 'Trade failed')
      }
    } catch (error) {
      console.error('Trade failed:', error)
      setError(error instanceof Error ? error.message : 'Trade failed')
    } finally {
      setIsLoading(false)
    }
  }

  const formatNumber = (num: string | number) => {
    const n = typeof num === 'string' ? parseFloat(num) : num
    if (n < 0.001) return '< 0.001'
    return n.toFixed(6)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Connect Wallet to Trade</CardTitle>
          <CardDescription>
            Please connect your wallet to start trading tokens
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Token Information */}
      {tokenInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div>
                {tokenInfo.name} ({tokenInfo.symbol})
              </div>
              <Badge variant="outline">
                {formatAddress(tokenInfo.address)}
              </Badge>
            </CardTitle>
            <CardDescription>
              Current Price: {formatNumber(tokenInfo.currentPrice)} ETH
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Total Supply:</span>
                <p className="text-gray-600">{formatNumber(tokenInfo.totalSupply)}</p>
              </div>
              <div>
                <span className="font-medium">Max Supply:</span>
                <p className="text-gray-600">{formatNumber(tokenInfo.maxSupply)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trading Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Trade Tokens</CardTitle>
          <CardDescription>
            Buy or sell tokens using the bonding curve
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Trade Type Toggle */}
          <div className="flex gap-2">
            <Button
              variant={tradeType === 'buy' ? 'default' : 'outline'}
              onClick={() => setTradeType('buy')}
              className="flex-1"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Buy
            </Button>
            <Button
              variant={tradeType === 'sell' ? 'default' : 'outline'}
              onClick={() => setTradeType('sell')}
              className="flex-1"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              Sell
            </Button>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">
              {tradeType === 'buy' ? 'ETH Amount' : 'Token Amount'}
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder={tradeType === 'buy' ? '0.1' : '100'}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.000001"
            />
            <div className="text-sm text-gray-600">
              {tradeType === 'buy' 
                ? `ETH Balance: ${formatNumber(ethBalance)}`
                : `Token Balance: ${formatNumber(tokenBalance)}`
              }
            </div>
          </div>

          {/* Slippage Tolerance */}
          <div className="space-y-2">
            <Label htmlFor="slippage">Max Slippage (%)</Label>
            <Input
              id="slippage"
              type="number"
              value={maxSlippage}
              onChange={(e) => setMaxSlippage(Number(e.target.value))}
              min="0.1"
              max="50"
              step="0.1"
            />
          </div>

          {/* Trade Button */}
          <Button
            onClick={handleTrade}
            disabled={isLoading || !amount}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {tradeType === 'buy' ? 'Buying...' : 'Selling...'}
              </>
            ) : (
              <>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                {tradeType === 'buy' ? 'Buy Tokens' : 'Sell Tokens'}
              </>
            )}
          </Button>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Trade Result */}
          {tradeResult && (
            <div className={`p-3 rounded-md ${
              tradeResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  tradeResult.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {tradeResult.success ? 'Trade Successful!' : 'Trade Failed'}
                </span>
                {tradeResult.transactionHash && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://etherscan.io/tx/${tradeResult.transactionHash}`, '_blank')}
                  >
                    View on Etherscan
                  </Button>
                )}
              </div>
              {tradeResult.success && (
                <div className="mt-2 text-sm text-green-700">
                  <p>Tokens Received: {formatNumber(tradeResult.tokensReceived || '0')}</p>
                  <p>New Price: {formatNumber(tradeResult.newPrice || '0')} ETH</p>
                  <p>Gas Used: {tradeResult.gasUsed?.toLocaleString()}</p>
                </div>
              )}
              {!tradeResult.success && tradeResult.error && (
                <p className="mt-2 text-sm text-red-700">{tradeResult.error}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}



