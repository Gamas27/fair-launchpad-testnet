import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SecurityManager } from '@/lib/utils/security'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  Object.entries(SecurityManager.getSecurityHeaders()).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    Object.entries(SecurityManager.getCorsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
  }

  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const identifier = request.ip || 'unknown'
    const isAllowed = SecurityManager.checkRateLimit(identifier, 100, 60000) // 100 requests per minute

    if (!isAllowed) {
      return new NextResponse('Rate limit exceeded', { status: 429 })
    }
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200 })
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
