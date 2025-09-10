import React from 'react'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Rocket, 
  Trophy, 
  TrendingUp,
  Shield
} from 'lucide-react'

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'launch', label: 'Launch', icon: Rocket },
    { id: 'trading', label: 'Trading', icon: TrendingUp },
    { id: 'reputation', label: 'Reputation', icon: Trophy },
  ]

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              FairLaunch
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
