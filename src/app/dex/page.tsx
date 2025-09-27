'use client'

import { Navigation } from '@/components/Navigation'
import { RouteGuard } from '@/components/RouteGuard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Activity, ExternalLink } from 'lucide-react'

export default function DexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <RouteGuard requiresAuth>
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                DEX Explorer
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Explore graduated tokens and their Uniswap V3 pools
              </p>
            </div>

            {/* Market Overview */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Pools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-xs text-muted-foreground">+3 this week</div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2.4M</div>
                  <div className="text-xs text-muted-foreground">+12% today</div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Active Traders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-xs text-muted-foreground">+8% this week</div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">94%</div>
                  <div className="text-xs text-muted-foreground">Graduation rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Top Pools */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Top Performing Pools
                </CardTitle>
                <CardDescription>
                  Most active pools by volume and liquidity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'MEME/WETH', volume: '$847K', liquidity: '$234K', change: '+15.2%', status: 'Active' },
                    { name: 'DOGE/WETH', volume: '$623K', liquidity: '$189K', change: '+8.7%', status: 'Active' },
                    { name: 'SHIB/WETH', volume: '$445K', liquidity: '$156K', change: '-2.1%', status: 'Active' },
                    { name: 'PEPE/WETH', volume: '$312K', liquidity: '$98K', change: '+22.3%', status: 'Active' },
                    { name: 'FLOKI/WETH', volume: '$198K', liquidity: '$67K', change: '+5.4%', status: 'Active' }
                  ].map((pool, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-card/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{pool.name}</div>
                          <div className="text-sm text-muted-foreground">Volume: {pool.volume}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-semibold">{pool.liquidity}</div>
                          <div className="text-xs text-muted-foreground">Liquidity</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-semibold ${pool.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {pool.change}
                          </div>
                          <div className="text-xs text-muted-foreground">24h</div>
                        </div>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {pool.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest pool creations and graduations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'Pool Created', token: 'MEME', time: '2 minutes ago', type: 'success' },
                    { action: 'Token Graduated', token: 'DOGE', time: '15 minutes ago', type: 'info' },
                    { action: 'Liquidity Added', token: 'SHIB', time: '1 hour ago', type: 'success' },
                    { action: 'Pool Created', token: 'PEPE', time: '2 hours ago', type: 'success' },
                    { action: 'Token Graduated', token: 'FLOKI', time: '3 hours ago', type: 'info' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                      }`} />
                      <div className="flex-1">
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-muted-foreground">{activity.token} • {activity.time}</div>
                      </div>
                      <Badge variant={activity.type === 'success' ? 'default' : 'secondary'}>
                        {activity.type === 'success' ? 'Success' : 'Info'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </RouteGuard>
      </main>
    </div>
  )
}