'use client'

import { Navigation } from '@/components/Navigation'
import { RouteGuard } from '@/components/RouteGuard'
import { TokenCreationForm } from '@/components/TokenCreation/TokenCreationForm'
import { NetworkSwitcher } from '@/components/NetworkSwitcher'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Rocket, Shield, AlertCircle } from 'lucide-react'

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <RouteGuard requiresAuth requiresWorldId>
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Launch New Token
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Create a new meme coin with anti-bot protection using World ID verification
              </p>
            </div>

            {/* Network Switcher */}
            <NetworkSwitcher />

            {/* Launch Form */}
            <TokenCreationForm />
          </div>
        </RouteGuard>
      </main>
    </div>
  )
}
