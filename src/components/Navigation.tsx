import React from 'react'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Rocket, 
  TrendingUp,
  Shield,
  User,
  TestTube,
  BarChart3,
  Lock,
  AlertCircle
} from 'lucide-react'
import { useNavigation } from '@/contexts/NavigationContext'
import { MAIN_ROUTES, SECONDARY_ROUTES, UTILITY_ROUTES } from '@/lib/routes'
import { cn } from '@/lib/utils'

// Icon mapping for dynamic icon rendering
const iconMap = {
  Home,
  Rocket,
  TrendingUp,
  User,
  BarChart3,
  TestTube
}

export function Navigation() {
  const { 
    currentRoute, 
    activeTab, 
    navigateTo, 
    isRouteAccessible, 
    getAccessibleRoutes,
    isMobile 
  } = useNavigation()

  const renderNavButton = (route: any, variant: 'default' | 'ghost' | 'outline' = 'ghost') => {
    const Icon = iconMap[route.icon as keyof typeof iconMap] || Home
    const isActive = activeTab === route.id
    const isAccessible = isRouteAccessible(route)
    
    return (
      <Button
        key={route.id}
        variant={isActive ? 'default' : variant}
        size="sm"
        onClick={() => navigateTo(route)}
        disabled={!isAccessible}
        className={cn(
          "flex items-center gap-1 px-2 py-1 text-xs transition-all",
          !isAccessible && "opacity-50 cursor-not-allowed",
          isActive && "bg-primary text-primary-foreground"
        )}
        title={!isAccessible ? `${route.label} requires authentication` : route.description}
      >
        <Icon className="h-3 w-3" />
        <span className="hidden sm:inline">{route.label}</span>
        {!isAccessible && (
          <Lock className="h-2 w-2 ml-1" />
        )}
      </Button>
    )
  }

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              FairLaunch
            </h1>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center gap-1">
            {/* Main Routes */}
            {MAIN_ROUTES.map(route => renderNavButton(route))}
            
            {/* Secondary Routes */}
            {SECONDARY_ROUTES.map(route => renderNavButton(route, 'outline'))}
            
            {/* Utility Routes */}
            {UTILITY_ROUTES.map(route => renderNavButton(route, 'outline'))}
          </div>
        </div>
        
        {/* Mobile Navigation Indicator */}
        {isMobile && (
          <div className="flex items-center justify-center py-2 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertCircle className="h-3 w-3" />
              <span>Mobile optimized navigation</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
