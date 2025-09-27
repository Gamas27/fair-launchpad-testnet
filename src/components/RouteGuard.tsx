'use client'

import React from 'react'
import { useNavigation } from '@/contexts/NavigationContext'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lock, Shield, Wallet, AlertCircle } from 'lucide-react'

interface RouteGuardProps {
  children: React.ReactNode
  requiresAuth?: boolean
  requiresWorldId?: boolean
  fallback?: React.ReactNode
}

export function RouteGuard({ 
  children, 
  requiresAuth = false, 
  requiresWorldId = false,
  fallback 
}: RouteGuardProps) {
  const { isConnected, isVerified } = useAuth()

  // If no requirements, render children
  if (!requiresAuth && !requiresWorldId) {
    return <>{children}</>
  }

  // Check authentication requirement
  if (requiresAuth && !isConnected) {
    return fallback || (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-500">
              <Wallet className="h-5 w-5" />
              Wallet Required
            </CardTitle>
            <CardDescription>
              Please connect your wallet to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This page requires wallet connection for security and functionality.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check World ID requirement
  if (requiresWorldId && !isVerified) {
    return fallback || (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <Shield className="h-5 w-5" />
              World ID Verification Required
            </CardTitle>
            <CardDescription>
              Please verify with World ID to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <Lock className="h-4 w-4" />
              <AlertDescription>
                This page requires World ID verification to prevent bot manipulation and ensure fair participation.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  // All requirements met, render children
  return <>{children}</>
}
