import React from 'react'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Plus, 
  TrendingUp, 
  User, 
  Settings,
  MessageCircle,
  Search,
  BarChart3
} from 'lucide-react'

export interface BottomNavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  badge?: string | number
  disabled?: boolean
}

export interface BottomNavV2Props {
  items: BottomNavItem[]
  activeItem: string
  onItemClick: (itemId: string) => void
  className?: string
}

const defaultItems: BottomNavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
  },
  {
    id: 'discovery',
    label: 'Discovery',
    icon: Search,
  },
  {
    id: 'create',
    label: 'Create',
    icon: Plus,
  },
  {
    id: 'trading',
    label: 'Trading',
    icon: BarChart3,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
  },
]

export const BottomNavV2: React.FC<BottomNavV2Props> = ({
  items = defaultItems,
  activeItem,
  onItemClick,
  className
}) => {
  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 z-50',
      'bg-black/90 backdrop-blur-md border-t border-gray-800/50',
      className
    )}>
      <div className="flex">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => !item.disabled && onItemClick(item.id)}
              disabled={item.disabled}
              className={cn(
                'flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200',
                'relative group',
                isActive 
                  ? 'text-cyan-400' 
                  : 'text-gray-400 hover:text-white',
                item.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
              )}
              
              {/* Icon */}
              <div className="relative">
                <Icon className="h-5 w-5 mb-1" />
                
                {/* Badge */}
                {item.badge && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </div>
                )}
              </div>
              
              {/* Label */}
              <span className={cn(
                'text-xs font-medium transition-colors',
                isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'
              )}>
                {item.label}
              </span>
              
              {/* Glow effect for active item */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-t-lg" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Specialized navigation for G8 app
export const G8BottomNav: React.FC<{
  activeItem: string
  onItemClick: (itemId: string) => void
  className?: string
}> = ({ activeItem, onItemClick, className }) => {
  const g8Items: BottomNavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
    },
    {
      id: 'create',
      label: 'Create',
      icon: Plus,
    },
    {
      id: 'g8',
      label: 'G8',
      icon: TrendingUp,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
    },
  ]

  return (
    <BottomNavV2
      items={g8Items}
      activeItem={activeItem}
      onItemClick={onItemClick}
      className={className}
    />
  )
}
