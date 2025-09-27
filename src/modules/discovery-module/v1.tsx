'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  Users, 
  ExternalLink,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    name: 'ARC',
    fullName: 'ARCADE COIN',
    description: 'Community-driven GameFi platform for arcade enthusiasts',
    logo: '🎮',
    marketCap: '$1.2B',
    change: '+5.25%',
    age: '3h',
    repScore: 95,
    status: 'LIVE',
    volume: '550K',
    transactions: '1.2K',
    social: {
      twitter: '@ARCadePlayer',
      telegram: 't.me/arcadecoin',
      discord: 'discord.gg/arcade'
    },
    sparkline: [0, 92.59, 74.07, 100, 55.56, 37.04, 62.96, 0]
  },
  {
    id: 2,
    name: 'GRT',
    fullName: 'GAME TOKEN',
    description: 'Next-gen gaming ecosystem token',
    logo: '🎯',
    marketCap: '$800M',
    change: '+1.12%',
    age: '8h',
    repScore: 88,
    status: 'GRADUATED',
    volume: '320K',
    transactions: '890',
    social: {
      twitter: '@GameToken',
      telegram: 't.me/gametoken',
      discord: 'discord.gg/gametoken'
    },
    sparkline: [0, 100, 54.55, 81.82, 27.27, 9.09, 36.36, 0]
  },
  {
    id: 3,
    name: 'NXT',
    fullName: 'NEXUS COIN',
    description: 'Revolutionary DeFi protocol',
    logo: '⚡',
    marketCap: '$752M',
    change: '-1.50%',
    age: '12h',
    repScore: 70,
    status: 'NEW',
    volume: '180K',
    transactions: '450',
    social: {
      twitter: '@NexusCoin',
      telegram: 't.me/nexuscoin',
      discord: 'discord.gg/nexus'
    },
    sparkline: [0, 71.43, 100, 0, 42.86, 85.71, 14.29, 57.14]
  }
]

// Filter options
const filterOptions = [
  { id: 'new', label: 'New', active: false },
  { id: 'about-to-gradu8', label: 'About to Gradu8', active: false },
  { id: 'graduated', label: 'Graduated', active: true }
]

// Discovery Module Component
export function DiscoveryModule() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('graduated')
  const [projects] = useState(mockProjects)

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = activeFilter === 'graduated' ? project.status === 'GRADUATED' :
                         activeFilter === 'about-to-gradu8' ? project.status === 'LIVE' :
                         activeFilter === 'new' ? project.status === 'NEW' : true
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-green-500'
      case 'GRADUATED': return 'bg-purple-500'
      case 'NEW': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getChangeColor = (change: string) => {
    return change.startsWith('+') ? 'text-green-400' : 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="text-lg font-bold gradient-text">DISCOVERY</div>
            <Badge className="bg-green-500 text-white text-xs font-bold animate-pulse">LIVE</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
              <TrendingUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {filterOptions.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "flex-1",
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "border-pink-400 text-pink-400 hover:bg-pink-400/10"
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Projects List */}
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="token-card border-2 border-pink-400/50 bg-pink-400/5 hover:shadow-cyan-400/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-2xl">
                      {project.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs text-gray-400">REP</Badge>
                        <h3 className="text-lg font-bold text-white">{project.name}</h3>
                      </div>
                      <p className="text-sm text-gray-300">{project.fullName}</p>
                      <p className="text-xs text-gray-400">{project.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={cn("text-white text-xs font-bold", getStatusColor(project.status))}>
                      {project.status}
                    </Badge>
                    <div className="text-sm font-bold text-cyan-400 mt-1">MC: {project.marketCap}</div>
                    <div className={cn("text-xs font-medium", getChangeColor(project.change))}>
                      {project.change}
                    </div>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Age</div>
                    <div className="text-sm font-bold text-white">{project.age}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">REP</div>
                    <div className="text-sm font-bold text-white">{project.repScore}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Volume</div>
                    <div className="text-sm font-bold text-white">{project.volume}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">TX</div>
                    <div className="text-sm font-bold text-white">{project.transactions}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{project.repScore}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-pink-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.repScore}%` }}
                    />
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="mb-3">
                  <div className="w-full h-8">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <polyline
                        points={project.sparkline.map((value, index) => `${index * 14.28},${100 - value}`).join(' ')}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="opacity-80 stroke-cyan-400"
                      />
                    </svg>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400 flex items-center gap-1">
                    <span className="text-xs">Coin Profile</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pull to Refresh Hint */}
        <div className="text-center text-gray-400 text-xs py-4">
          Pull to refresh for latest updates
        </div>
      </div>
    </div>
  )
}

export const DiscoveryModuleV1 = {
  version: 'v1.0.0',
  DiscoveryModule
}
