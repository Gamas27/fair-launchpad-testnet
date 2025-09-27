'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Coins, 
  TrendingUp,
  Menu,
  X,
  Home,
  Zap,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      description: 'Main dashboard'
    },
    {
      name: 'Core Journey',
      href: '/world-app',
      icon: Shield,
      description: 'World ID + Wallet'
    },
    {
      name: 'Token Creation',
      href: '/token-world-app',
      icon: Coins,
      description: 'Create tokens'
    },
    {
      name: 'Launch Token',
      href: '/trading-world-app',
      icon: TrendingUp,
      description: 'Launch tokens'
    },
    {
      name: 'Trading',
      href: '/trading-v2-world-app',
      icon: TrendingUp,
      description: 'Trade tokens'
    }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className={cn("bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-sm border-b border-purple-500/20", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">FairLaunch</h1>
                <p className="text-xs text-gray-300">Anti-bot meme coin launchpad</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs border-purple-500/50 text-purple-300">
              v1.0.0
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                      "flex items-center gap-2 transition-colors",
                      isActive(item.href) 
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                        : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-purple-500/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive(item.href) ? 'default' : 'ghost'}
                      className={cn(
                        "w-full justify-start flex items-center gap-3 p-3",
                        isActive(item.href) 
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                          : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs opacity-75">{item.description}</div>
                      </div>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
