'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Zap, AlertTriangle, CheckCircle } from 'lucide-react'

interface MonitoringStats {
  apiCalls: number
  successRate: number
  averageResponseTime: number
  rateLimitRemaining: number
  rateLimitMax: number
  lastError?: string
  uptime: number
}

export function AlchemyMonitoringDashboard() {
  const [stats, setStats] = useState<MonitoringStats>({
    apiCalls: 0,
    successRate: 100,
    averageResponseTime: 0,
    rateLimitRemaining: 100,
    rateLimitMax: 100,
    uptime: 0
  })
  const [isHealthy, setIsHealthy] = useState(true)

  useEffect(() => {
    // Simulate monitoring data - in production, this would come from your monitoring service
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 5),
        successRate: Math.max(95, Math.min(100, prev.successRate + (Math.random() - 0.5) * 2)),
        averageResponseTime: Math.max(100, Math.min(2000, prev.averageResponseTime + (Math.random() - 0.5) * 100)),
        rateLimitRemaining: Math.max(0, prev.rateLimitRemaining - Math.floor(Math.random() * 3)),
        uptime: prev.uptime + 1
      }))
      
      setIsHealthy(prev => prev.successRate > 90 && prev.rateLimitRemaining > 10)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-green-500'
    if (value >= thresholds.warning) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getStatusIcon = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return <CheckCircle className="h-4 w-4 text-green-500" />
    if (value >= thresholds.warning) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    return <AlertTriangle className="h-4 w-4 text-red-500" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-g8-primary">Alchemy Monitoring</h2>
          <p className="text-gray-600">Real-time API performance and health metrics</p>
        </div>
        <Badge variant={isHealthy ? 'default' : 'destructive'} className="flex items-center gap-2">
          {isHealthy ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          {isHealthy ? 'Healthy' : 'Issues Detected'}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              API Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.apiCalls}</div>
            <p className="text-xs text-gray-600">Total requests made</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {getStatusIcon(stats.successRate, { good: 95, warning: 90 })}
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getStatusColor(stats.successRate, { good: 95, warning: 90 })}`}>
              {stats.successRate.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-600">Request success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getStatusColor(stats.averageResponseTime, { good: 500, warning: 1000 })}`}>
              {stats.averageResponseTime.toFixed(0)}ms
            </div>
            <p className="text-xs text-gray-600">Average response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {getStatusIcon(stats.rateLimitRemaining, { good: 20, warning: 10 })}
              Rate Limit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getStatusColor(stats.rateLimitRemaining, { good: 20, warning: 10 })}`}>
              {stats.rateLimitRemaining}/{stats.rateLimitMax}
            </div>
            <p className="text-xs text-gray-600">Requests remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="font-medium">{Math.floor(stats.uptime / 60)}m {stats.uptime % 60}s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Error Rate</span>
                <span className="font-medium text-red-500">{(100 - stats.successRate).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rate Limit Usage</span>
                <span className="font-medium">
                  {((stats.rateLimitMax - stats.rateLimitRemaining) / stats.rateLimitMax * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Status</span>
                <Badge variant={isHealthy ? 'default' : 'destructive'}>
                  {isHealthy ? 'Operational' : 'Degraded'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rate Limiting</span>
                <Badge variant={stats.rateLimitRemaining > 10 ? 'default' : 'destructive'}>
                  {stats.rateLimitRemaining > 10 ? 'Normal' : 'Limited'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Response Quality</span>
                <Badge variant={stats.averageResponseTime < 1000 ? 'default' : 'destructive'}>
                  {stats.averageResponseTime < 1000 ? 'Good' : 'Slow'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {!isHealthy && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-red-700">
              {stats.successRate < 90 && (
                <p>• High error rate detected: {stats.successRate.toFixed(1)}%</p>
              )}
              {stats.rateLimitRemaining < 10 && (
                <p>• Rate limit approaching: {stats.rateLimitRemaining} requests remaining</p>
              )}
              {stats.averageResponseTime > 1000 && (
                <p>• Slow response times: {stats.averageResponseTime.toFixed(0)}ms average</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

