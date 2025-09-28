import { NextResponse } from 'next/server'
import { checkDatabaseConnection } from '@/lib/config/database'
import { PerformanceMonitor } from '@/lib/utils/performance'

export async function GET() {
  try {
    const perf = PerformanceMonitor.getInstance()
    const startTime = performance.now()

    // Check database connection
    const dbHealthy = await checkDatabaseConnection()
    
    const responseTime = performance.now() - startTime

    const health = {
      status: dbHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealthy ? 'connected' : 'disconnected',
        api: 'operational',
      },
      performance: {
        responseTime: `${responseTime.toFixed(2)}ms`,
        uptime: process.uptime(),
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        version: process.env.npm_package_version || '1.0.0',
      }
    }

    return NextResponse.json(health, { 
      status: dbHealthy ? 200 : 503 
    })

  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { 
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        services: {
          database: 'error',
          api: 'error',
        }
      },
      { status: 503 }
    )
  }
}