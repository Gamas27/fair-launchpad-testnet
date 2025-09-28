'use client'

import React, { useState } from 'react'
import { ButtonV2 } from '@/components/ui/button-v2'
import { CardV2 } from '@/components/ui/card-v2'

export default function UIV2Minimal() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-bold text-white">G8 Minimal</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-16">
        <div className="space-y-6">
          {/* Welcome Card */}
          <CardV2 variant="gradient" glow className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Welcome to G8
              </h1>
              <p className="text-gray-300">
                Minimal test version
              </p>
              <ButtonV2 gradient="neon" size="lg" className="w-full">
                Test Button
              </ButtonV2>
            </div>
          </CardV2>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <CardV2 variant="elevated" className="text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">$2.5M</div>
                <div className="text-sm text-gray-400">Total Volume</div>
              </div>
            </CardV2>
            <CardV2 variant="elevated" className="text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">+12.5%</div>
                <div className="text-sm text-gray-400">24h Change</div>
              </div>
            </CardV2>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800/50">
        <div className="flex">
          {['home', 'create', 'g8', 'profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex flex-col items-center py-3 px-2 transition-all duration-200 ${
                activeTab === tab ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-xs font-medium capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
