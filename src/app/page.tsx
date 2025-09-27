'use client'

import { Navigation } from '@/components/Navigation'
import { WalletButton } from '@/components/WalletConnect/WalletButton'
import { WalletInfo } from '@/components/WalletConnect/WalletInfo'
import { WorldIdButton } from '@/components/WorldId/WorldIdButton'
import { WorldIdStatus } from '@/components/WorldId/WorldIdStatus'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Rocket, TrendingUp, Users, Zap, BarChart3, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Mobile-optimized header */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                FairLaunch
              </h1>
              <p className="text-sm text-gray-300">
                Anti-bot meme coin launchpad
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <WorldIdButton />
              <WalletButton />
            </div>
          </div>
          
          {/* Mobile-optimized status cards */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <WalletInfo />
            <WorldIdStatus />
          </div>

          {/* Hero Section */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                🚀 FairLaunch - Anti-Bot Meme Coin Launchpad
              </CardTitle>
              <CardDescription className="text-center text-lg">
                The first meme coin launchpad protected by World ID's Proof of Personhood
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Launch fair meme coins with human verification, preventing bot manipulation and ensuring genuine community participation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/launch">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Rocket className="h-4 w-4 mr-2" />
                    Launch Token
                  </Button>
                </Link>
                <Link href="/trading">
                  <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/10">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Start Trading
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-8 w-8 text-green-400 mb-2" />
                <CardTitle>Human Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  World ID integration ensures only verified humans can participate, blocking bots and manipulation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-blue-400 mb-2" />
                <CardTitle>Fair Launch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bonding curve mechanism ensures fair price discovery and prevents front-running.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Users className="h-8 w-8 text-purple-400 mb-2" />
                <CardTitle>Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Reputation system rewards good actors and maintains a healthy trading environment.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Live Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">12,384</div>
                  <div className="text-sm text-muted-foreground">Humans Verified</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">3,472</div>
                  <div className="text-sm text-muted-foreground">Bots Blocked</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">$2.4M</div>
                  <div className="text-sm text-muted-foreground">Volume</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}