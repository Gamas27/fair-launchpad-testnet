'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle,
  Users,
  Hash,
  Send,
  Smile,
  Image,
  MoreVertical,
  Star,
  Shield,
  Zap,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock chat data
const mockChats = {
  all: [
    {
      id: 1,
      type: 'group',
      name: 'ARC Community',
      icon: '🎮',
      lastMessage: 'The new game update is amazing!',
      timestamp: '2m ago',
      unread: 3,
      repRequired: 50,
      members: 1250,
      isOnline: true
    },
    {
      id: 2,
      type: 'dm',
      name: '@GameFiGuru',
      icon: '👨‍💻',
      lastMessage: 'Thanks for the tip about ARC!',
      timestamp: '5m ago',
      unread: 1,
      repRequired: 0,
      members: 1,
      isOnline: true
    },
    {
      id: 3,
      type: 'group',
      name: 'GRT Traders',
      icon: '🎯',
      lastMessage: 'Price is looking good today',
      timestamp: '10m ago',
      unread: 0,
      repRequired: 100,
      members: 890,
      isOnline: false
    }
  ],
  unread: [
    {
      id: 1,
      type: 'group',
      name: 'ARC Community',
      icon: '🎮',
      lastMessage: 'The new game update is amazing!',
      timestamp: '2m ago',
      unread: 3,
      repRequired: 50,
      members: 1250,
      isOnline: true
    },
    {
      id: 2,
      type: 'dm',
      name: '@GameFiGuru',
      icon: '👨‍💻',
      lastMessage: 'Thanks for the tip about ARC!',
      timestamp: '5m ago',
      unread: 1,
      repRequired: 0,
      members: 1,
      isOnline: true
    }
  ],
  groups: [
    {
      id: 1,
      type: 'group',
      name: 'ARC Community',
      icon: '🎮',
      lastMessage: 'The new game update is amazing!',
      timestamp: '2m ago',
      unread: 3,
      repRequired: 50,
      members: 1250,
      isOnline: true
    },
    {
      id: 3,
      type: 'group',
      name: 'GRT Traders',
      icon: '🎯',
      lastMessage: 'Price is looking good today',
      timestamp: '10m ago',
      unread: 0,
      repRequired: 100,
      members: 890,
      isOnline: false
    }
  ],
  dms: [
    {
      id: 2,
      type: 'dm',
      name: '@GameFiGuru',
      icon: '👨‍💻',
      lastMessage: 'Thanks for the tip about ARC!',
      timestamp: '5m ago',
      unread: 1,
      repRequired: 0,
      members: 1,
      isOnline: true
    }
  ],
  coins: [
    {
      id: 4,
      type: 'coin',
      name: 'ARC Token Chat',
      icon: '🎮',
      lastMessage: 'New holder joined the community!',
      timestamp: '15m ago',
      unread: 0,
      repRequired: 25,
      members: 450,
      isOnline: true
    }
  ]
}

// Mock messages for a specific chat
const mockMessages = [
  {
    id: 1,
    user: '@ARCadePlayer',
    avatar: '🎮',
    message: 'The new game update is amazing! Can\'t wait to see what\'s next.',
    timestamp: '2m ago',
    repScore: 850,
    isVerified: true,
    glowColor: 'cyan'
  },
  {
    id: 2,
    user: '@GameFiGuru',
    avatar: '👨‍💻',
    message: 'I agree! The graphics are incredible. This is going to be huge.',
    timestamp: '1m ago',
    repScore: 1200,
    isVerified: true,
    glowColor: 'purple'
  },
  {
    id: 3,
    user: '@CryptoNewbie',
    avatar: '🆕',
    message: 'First time here, excited to be part of the community!',
    timestamp: '30s ago',
    repScore: 150,
    isVerified: false,
    glowColor: 'green'
  }
]

// Chat Module Component
export function ChatModule() {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'groups' | 'dms' | 'coins'>('all')
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [userRep] = useState(750) // Mock user REP score

  const currentChats = mockChats[activeTab]
  const selectedChatData = currentChats.find(chat => chat.id === selectedChat)

  const canAccessChat = (repRequired: number) => {
    return userRep >= repRequired
  }

  const getRepColor = (repScore: number) => {
    if (repScore >= 1000) return 'text-purple-400'
    if (repScore >= 500) return 'text-cyan-400'
    if (repScore >= 200) return 'text-green-400'
    return 'text-gray-400'
  }

  const getGlowClass = (glowColor: string) => {
    switch (glowColor) {
      case 'cyan': return 'shadow-cyan-400/20'
      case 'purple': return 'shadow-purple-400/20'
      case 'green': return 'shadow-green-400/20'
      default: return 'shadow-gray-400/20'
    }
  }

  if (selectedChat) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Chat Header */}
        <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white p-1"
                onClick={() => setSelectedChat(null)}
              >
                ←
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-xl">
                {selectedChatData?.icon}
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">{selectedChatData?.name}</h1>
                <p className="text-sm text-gray-400">{selectedChatData?.members} members</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-4 pb-20">
          {mockMessages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-sm flex-shrink-0">
                {message.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-white">{message.user}</span>
                  {message.isVerified && (
                    <Badge className="bg-blue-500 text-white text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <span className={cn("text-xs font-bold", getRepColor(message.repScore))}>
                    REP: {message.repScore}
                  </span>
                  <span className="text-xs text-gray-400">{message.timestamp}</span>
                </div>
                <div className={cn(
                  "p-3 rounded-lg bg-gray-900/50 border border-gray-800/50",
                  getGlowClass(message.glowColor)
                )}>
                  <p className="text-gray-100">{message.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800/50 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
              <Smile className="h-4 w-4" />
            </Button>
            <Button 
              className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white p-2"
              disabled={!messageInput.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="text-lg font-bold gradient-text">CHAT</div>
            <Badge className="bg-green-500 text-white text-xs font-bold animate-pulse">LIVE</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Tab Navigation */}
        <div className="flex gap-1 overflow-x-auto">
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('all')}
            className={cn(
              "flex-shrink-0",
              activeTab === 'all'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-pink-400 text-pink-400 hover:bg-pink-400/10"
            )}
          >
            All
          </Button>
          <Button
            variant={activeTab === 'unread' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('unread')}
            className={cn(
              "flex-shrink-0",
              activeTab === 'unread'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
            )}
          >
            Unread
          </Button>
          <Button
            variant={activeTab === 'groups' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('groups')}
            className={cn(
              "flex-shrink-0",
              activeTab === 'groups'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-green-400 text-green-400 hover:bg-green-400/10"
            )}
          >
            Groups
          </Button>
          <Button
            variant={activeTab === 'dms' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('dms')}
            className={cn(
              "flex-shrink-0",
              activeTab === 'dms'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
            )}
          >
            DMs
          </Button>
          <Button
            variant={activeTab === 'coins' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('coins')}
            className={cn(
              "flex-shrink-0",
              activeTab === 'coins'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-orange-400 text-orange-400 hover:bg-orange-400/10"
            )}
          >
            Coins
          </Button>
        </div>

        {/* Chat List */}
        <div className="space-y-2">
          {currentChats.map((chat) => (
            <Card 
              key={chat.id} 
              className={cn(
                "cursor-pointer transition-all hover:shadow-lg",
                canAccessChat(chat.repRequired)
                  ? "card-gradient border-2 border-pink-400/50 hover:border-cyan-400/50"
                  : "card-gradient border-2 border-gray-600/50 opacity-60"
              )}
              onClick={() => canAccessChat(chat.repRequired) && setSelectedChat(chat.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-xl">
                      {chat.icon}
                    </div>
                    {chat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white font-bold truncate">{chat.name}</h3>
                      <div className="flex items-center gap-2">
                        {chat.unread > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-400">{chat.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 truncate mb-2">{chat.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{chat.members} members</span>
                        {chat.repRequired > 0 && (
                          <Badge variant="outline" className="text-xs border-purple-500 text-purple-300">
                            REP {chat.repRequired}+
                          </Badge>
                        )}
                      </div>
                      {!canAccessChat(chat.repRequired) && (
                        <div className="flex items-center gap-1 text-red-400 text-xs">
                          <AlertCircle className="h-3 w-3" />
                          <span>REP Required</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* REP Status */}
        <Card className="card-gradient border-2 border-cyan-400/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Your REP Score</div>
                <div className="text-lg font-bold text-cyan-400">{userRep}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Access Level</div>
                <div className="text-sm font-bold text-white">
                  {userRep >= 1000 ? 'Elite' : userRep >= 500 ? 'Advanced' : userRep >= 200 ? 'Intermediate' : 'Beginner'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Unlocking Hint */}
        <Card className="card-gradient border-2 border-purple-400/50">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <h3 className="text-white font-bold mb-2">Chat Unlocking Soon</h3>
            <p className="text-sm text-gray-400 mb-3">
              REP required for advanced community features
            </p>
            <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10">
              <Star className="h-4 w-4 mr-2" />
              Earn REP
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const ChatModuleV1 = {
  version: 'v1.0.0',
  ChatModule
}
