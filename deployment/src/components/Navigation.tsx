import React from 'react'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Rocket, 
  TrendingUp,
  Shield,
  User
} from 'lucide-react'

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'launch', label: 'Launch', icon: Rocket },
    { id: 'trading', label: 'Trade', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              FairLaunch
            </h1>
          </div>
          
          {/* Mobile-optimized navigation */}
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center gap-1 px-2 py-1 text-xs"
                >
                  <Icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
