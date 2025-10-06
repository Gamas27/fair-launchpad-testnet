'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { G8Button } from '@/components/ui/g8-button'
import { TrendingUp, TrendingDown, Users, Activity, DollarSign, BarChart3, ExternalLink, Copy, Check } from 'lucide-react'

interface WLDTokenData {
  metadata: {
    name: string
    symbol: string
    decimals: number
    price?: number
  }
  analytics: {
    holderCount: number
    transferCount: number
    tradingVolume: number
    communityActivity: number
  }
  transfers: any[]
  lastUpdated: Date
  success: boolean
  error?: string
}

export function WLDTokenPage() {
  const [data, setData] = useState<WLDTokenData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const WLD_ADDRESS = '0x163f8c2467924be0ae7b5347228cabf260318753'

  useEffect(() => {
    const fetchWLDData = async () => {
      try {
        setLoading(true)
        
        // Fetch token analytics
        const analyticsResponse = await fetch(`/api/alchemy/token-analytics?tokenAddress=${WLD_ADDRESS}`)
        const analyticsData = await analyticsResponse.json()
        
        // Fetch community metrics
        const metricsResponse = await fetch(`/api/alchemy/community-metrics?tokenAddress=${WLD_ADDRESS}`)
        const metricsData = await metricsResponse.json()
        
        if (!analyticsData.success || !metricsData.success) {
          throw new Error('Failed to fetch WLD token data')
        }
        
        setData({
          metadata: analyticsData.data.metadata,
          analytics: metricsData.data,
          transfers: analyticsData.data.transfers,
          lastUpdated: new Date(),
          success: true
        })
      } catch (error) {
        console.error('Error fetching WLD data:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchWLDData()
  }, [])

  const copyAddress = () => {
    navigator.clipboard.writeText(WLD_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toFixed(0)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`
    return `$${volume.toFixed(0)}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-g8-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-g8-secondary border-t-g8-primary mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-g8-primary mb-2">
            Loading WLD Token Data
          </h3>
          <p className="text-g8-secondary">Fetching real-time blockchain data...</p>
        </div>
      </div>
    )
  }

  if (error || !data?.success) {
    return (
      <div className="min-h-screen bg-g8-background flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-g8-border">
          <div className="text-red-500 text-8xl mb-6">⚠️</div>
          <h2 className="text-3xl font-bold text-g8-primary mb-4">Failed to Load Token Data</h2>
          <p className="text-g8-secondary mb-6 max-w-md">{error || 'Unknown error occurred'}</p>
          <G8Button onClick={() => window.location.reload()}>
            Try Again
          </G8Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-g8-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-g8-primary rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                WLD
              </div>
              <div>
                <h1 className="text-5xl font-bold text-g8-primary">
                  {data.metadata.name}
                </h1>
                <p className="text-2xl text-g8-secondary font-semibold">{data.metadata.symbol}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="default" className="bg-g8-accent text-white px-4 py-2 text-sm font-semibold shadow-md">
                🌍 World Chain
              </Badge>
              <Badge variant="outline" className="border-g8-primary text-g8-primary px-4 py-2 text-sm font-semibold">
                {data.metadata.decimals} Decimals
              </Badge>
            </div>
          </div>
          
          {/* Contract Address */}
          <div className="bg-white rounded-xl p-4 shadow-lg border border-g8-border">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-g8-secondary">Contract Address:</span>
              <code className="bg-g8-surface px-3 py-2 rounded-lg text-sm font-mono border border-g8-border">
                {WLD_ADDRESS}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={copyAddress}
                className="flex items-center space-x-2 border-g8-primary text-g8-primary hover:bg-g8-primary hover:text-white"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(`https://worldscan.org/address/${WLD_ADDRESS}`, '_blank')}
                className="flex items-center space-x-2 border-g8-accent text-g8-accent hover:bg-g8-accent hover:text-white"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View on Worldscan</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-g8-border shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-g8-secondary mb-1">Total Holders</p>
                  <p className="text-3xl font-bold text-g8-primary">
                    {formatNumber(data.analytics.holderCount)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-g8-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-g8-border shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-g8-secondary mb-1">Total Transfers</p>
                  <p className="text-3xl font-bold text-g8-accent">
                    {formatNumber(data.analytics.transferCount)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-g8-accent rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-g8-border shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-g8-secondary mb-1">Trading Volume</p>
                  <p className="text-3xl font-bold text-g8-success">
                    {formatVolume(data.analytics.tradingVolume)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-g8-success rounded-xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-g8-border shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-g8-secondary mb-1">Community Activity</p>
                  <p className="text-3xl font-bold text-g8-warning">
                    {data.analytics.communityActivity.toFixed(1)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-g8-warning rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Token Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white border-g8-border shadow-xl">
            <CardHeader className="bg-g8-primary text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-white">
                <TrendingUp className="w-6 h-6" />
                <span className="text-xl font-bold">Token Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-g8-border">
                  <span className="text-g8-secondary font-medium">Name:</span>
                  <span className="font-bold text-g8-primary">{data.metadata.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-g8-border">
                  <span className="text-g8-secondary font-medium">Symbol:</span>
                  <span className="font-bold text-g8-primary">{data.metadata.symbol}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-g8-border">
                  <span className="text-g8-secondary font-medium">Decimals:</span>
                  <span className="font-bold text-g8-primary">{data.metadata.decimals}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-g8-border">
                  <span className="text-g8-secondary font-medium">Network:</span>
                  <span className="font-bold text-g8-success">World Chain</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-g8-secondary font-medium">Last Updated:</span>
                  <span className="font-bold text-g8-primary">
                    {data.lastUpdated.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-g8-border shadow-xl">
            <CardHeader className="bg-g8-accent text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-white">
                <BarChart3 className="w-6 h-6" />
                <span className="text-xl font-bold">Community Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-g8-border">
                  <span className="text-g8-secondary font-medium">Unique Holders:</span>
                  <span className="font-bold text-g8-primary">{formatNumber(data.analytics.holderCount)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-g8-border">
                  <span className="text-g8-secondary font-medium">Total Transfers:</span>
                  <span className="font-bold text-g8-accent">{formatNumber(data.analytics.transferCount)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-g8-border">
                  <span className="text-g8-secondary font-medium">Trading Volume:</span>
                  <span className="font-bold text-g8-success">{formatVolume(data.analytics.tradingVolume)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-g8-secondary font-medium">Activity Score:</span>
                  <span className="font-bold text-g8-warning">{data.analytics.communityActivity.toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white border-g8-border shadow-xl">
          <CardHeader className="bg-g8-success text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2 text-white">
              <Activity className="w-6 h-6" />
              <span className="text-xl font-bold">Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {data.transfers.slice(0, 5).map((transfer, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-g8-surface rounded-xl border border-g8-border hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-g8-primary rounded-xl flex items-center justify-center shadow-lg">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-g8-primary">
                        Transfer #{transfer.blockNum}
                      </p>
                      <p className="text-sm text-g8-secondary">
                        {new Date(parseInt(transfer.blockNum, 16) * 1000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-g8-primary">
                      {transfer.value ? (parseFloat(transfer.value) / Math.pow(10, data.metadata.decimals)).toFixed(2) : '0.00'} WLD
                    </p>
                    <p className="text-sm text-g8-secondary font-mono">
                      {transfer.from?.slice(0, 6)}...{transfer.from?.slice(-4)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-g8-border">
            <p className="text-sm text-g8-secondary mb-2">
              <span className="font-semibold">Data powered by</span> 
              <span className="mx-2 px-2 py-1 bg-g8-primary text-white rounded-full text-xs font-bold">Alchemy</span>
              <span className="mx-2 px-2 py-1 bg-g8-accent text-white rounded-full text-xs font-bold">World Chain</span>
            </p>
            <p className="text-xs text-g8-secondary">
              Last updated: {data.lastUpdated.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}