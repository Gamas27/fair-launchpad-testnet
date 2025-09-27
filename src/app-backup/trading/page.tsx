'use client'

import { Navigation } from '@/components/Navigation'
import { RouteGuard } from '@/components/RouteGuard'
import { WalletButton } from '@/components/WalletConnect/WalletButton'
import { WalletInfo } from '@/components/WalletConnect/WalletInfo'
import { WorldIdButton } from '@/components/WorldId/WorldIdButton'
import { WorldIdStatus } from '@/components/WorldId/WorldIdStatus'
import DeeprInspiredTrading from '@/components/DeeprInspiredTrading'

export default function TradingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <RouteGuard requiresAuth requiresWorldId>
          <div className="space-y-6">
            {/* Mobile-optimized header */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  FairLaunch Trading
                </h1>
                <p className="text-sm text-gray-300">
                  Trade verified tokens with anti-bot protection
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <WorldIdButton />
                <WalletButton />
              </div>
            </div>
            
            {/* Mobile-optimized status cards */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <WalletInfo />
              <WorldIdStatus />
            </div>
            
            <DeeprInspiredTrading />
          </div>
        </RouteGuard>
      </main>
    </div>
  )
}
