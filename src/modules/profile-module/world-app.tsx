'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  Search, 
  TrendingUp,
  Plus,
  Users
} from 'lucide-react'

// Simplified mock user data for World App
const mockUser = {
  name: '@ARCadePlayer',
  avatar: '🎮',
  solBalance: 98.40,
  repBalance: 1250,
  repScore: 850,
  coinsCreated: 5,
  coinsGraduated: 2,
  followers: 1200,
  following: 150,
  totalValue: 1.40
}

// World App Profile Module
export function ProfileModuleWorldApp() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="text-lg font-bold gradient-text">PROFILE / WALLET</div>
            <Badge className="bg-green-500 text-white text-xs font-bold animate-pulse">LIVE</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* Profile Card */}
        <Card className="card-gradient border-2 border-pink-400/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-2xl border-2 border-pink-400">
                {mockUser.avatar}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">{mockUser.name}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-cyan-400 font-bold">SOL: {mockUser.solBalance}</div>
                  <div className="text-white font-bold">REP: {mockUser.repBalance.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card className="card-gradient border-2 border-pink-400/50">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-sm text-gray-400">REP Score</div>
                  <div className="text-lg font-bold text-white">{mockUser.repScore}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Total Value</div>
                  <div className="text-lg font-bold text-white">${mockUser.totalValue}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Coins Created</div>
                  <div className="text-lg font-bold text-white">{mockUser.coinsCreated}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Coins Graduated</div>
                  <div className="text-lg font-bold text-white">{mockUser.coinsGraduated}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Followers</div>
                  <div className="text-lg font-bold text-white">{mockUser.followers.toLocaleString()}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Following</div>
                  <div className="text-lg font-bold text-white">{mockUser.following}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold">
            Deposit
          </Button>
          <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400/10">
            Withdraw
          </Button>
          <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
            Create Coin
          </Button>
        </div>

        {/* Recent Activity */}
        <Card className="card-gradient border-2 border-pink-400/50">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Coin Graduated</div>
                  <div className="text-xs text-gray-400">GRT reached graduation threshold</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-400">+$1.2K</div>
                <div className="text-xs text-gray-400">2h ago</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Plus className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Coin Created</div>
                  <div className="text-xs text-gray-400">Launched NXT token</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-blue-400">-0.1 SOL</div>
                <div className="text-xs text-gray-400">5h ago</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">New Follower</div>
                  <div className="text-xs text-gray-400">@GameFiGuru started following you</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-purple-400">+1 REP</div>
                <div className="text-xs text-gray-400">1d ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const ProfileModuleWorldApp = {
  version: 'v1.0.0',
  ProfileModule: ProfileModuleWorldApp
}
