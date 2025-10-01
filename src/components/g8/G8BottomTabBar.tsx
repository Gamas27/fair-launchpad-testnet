'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface TabBarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export const G8BottomTabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      path: '/g8/home'
    },
    {
      id: 'create',
      label: 'Create',
      icon: '➕',
      path: '/g8/create'
    },
    {
      id: 'discovery',
      label: 'Discovery',
      icon: '🔍',
      path: '/g8/discovery'
    }
  ]

  const handleTabClick = (tab: { id: string, path: string }) => {
    onTabChange(tab.id)
    router.push(tab.path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-g8-surface border-t border-g8-stroke">
      <div className="flex items-center justify-around py-2 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`flex flex-col items-center py-2 px-3 rounded-g8-md transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-g8-text-primary bg-g8-surface2'
                : 'text-g8-text-secondary hover:text-g8-text-primary'
            }`}
          >
            <span className="text-lg mb-1">{tab.icon}</span>
            <span className="text-g8-caption font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default G8BottomTabBar

