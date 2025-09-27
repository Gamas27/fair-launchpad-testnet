'use client'

import { useState } from 'react'
import { TokenCreationForm } from '@/components/TokenCreation/TokenCreationForm'
import { BondingCurveTest } from '@/components/BondingCurve/BondingCurveTest'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { CONTRACT_ADDRESSES } from '@/lib/contracts'

export default function TestContractsPage() {
  const [createdTokenAddress, setCreatedTokenAddress] = useState<string | null>(null)

  const handleTokenCreated = (tokenAddress: string) => {
    setCreatedTokenAddress(tokenAddress)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Contract Integration Test</h1>
        <p className="text-gray-600">
          Test the deployed smart contracts with real blockchain interactions
        </p>
      </div>

      {/* Contract Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Deployed Contract Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">TokenFactory</span>
              </div>
              <div className="text-sm font-mono text-gray-600 break-all">
                {CONTRACT_ADDRESSES.TOKEN_FACTORY}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">BondingCurve</span>
              </div>
              <div className="text-sm font-mono text-gray-600 break-all">
                {CONTRACT_ADDRESSES.BONDING_CURVE}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">GraduationHandler</span>
              </div>
              <div className="text-sm font-mono text-gray-600 break-all">
                {CONTRACT_ADDRESSES.GRADUATION_HANDLER}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Interface */}
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create Token</TabsTrigger>
          <TabsTrigger value="test">Test Bonding Curve</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-4">
          <TokenCreationForm onTokenCreated={handleTokenCreated} />
        </TabsContent>
        
        <TabsContent value="test" className="space-y-4">
          {createdTokenAddress ? (
            <BondingCurveTest tokenAddress={createdTokenAddress} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Please create a token first to test the bonding curve functionality.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Testing Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">1. Create a Token</h4>
            <p className="text-sm text-gray-600">
              Use the &quot;Create Token&quot; tab to deploy a new token using the deployed TokenFactory contract.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">2. Test Bonding Curve</h4>
            <p className="text-sm text-gray-600">
              After creating a token, use the &quot;Test Bonding Curve&quot; tab to interact with the bonding curve,
              purchase tokens, and test the graduation mechanism.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">3. Monitor Transactions</h4>
            <p className="text-sm text-gray-600">
              Check your wallet and the blockchain explorer for transaction confirmations.
              All interactions are with real deployed contracts on World Chain.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
