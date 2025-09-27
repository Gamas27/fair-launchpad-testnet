'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Coins, 
  ArrowRight,
  CheckCircle,
  Zap
} from 'lucide-react'
import { WorldAppJourneyPage } from '@/modules/core-journey/world-app'
import { TokenModuleWorldApp } from '@/modules/token-module/world-app'

export default function WorldAppPage() {
  const [currentModule, setCurrentModule] = useState<'journey' | 'token'>('journey')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Module Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">Fair Launchpad</h1>
              <Badge variant="outline" className="text-xs">
                World App v1.0.0
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={currentModule === 'journey' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentModule('journey')}
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Core Journey
              </Button>
              <Button
                variant={currentModule === 'token' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentModule('token')}
                className="flex items-center gap-2"
              >
                <Coins className="h-4 w-4" />
                Token Module
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <div className="max-w-4xl mx-auto p-4">
        {currentModule === 'journey' && <WorldAppJourneyPage />}
        {currentModule === 'token' && <TokenModuleWorldApp.TokenModulePage />}
      </div>
    </div>
  )
}