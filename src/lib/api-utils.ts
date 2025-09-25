import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { AuthService } from './auth'
import { ApiResponse, ErrorResponse } from './validation'

export class ApiError extends Error {
  public statusCode: number
  public code?: string

  constructor(message: string, statusCode = 500, code?: string) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.name = 'ApiError'
  }
}

export class ValidationError extends ApiError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR')
  }
}

export class AuthenticationError extends ApiError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR')
  }
}

export class AuthorizationError extends ApiError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR')
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND')
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'Resource already exists') {
    super(message, 409, 'CONFLICT')
  }
}

export class RateLimitError extends ApiError {
  constructor(message = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED')
  }
}

// API Response helpers
export function successResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
  })
}

export function errorResponse(
  error: string,
  statusCode = 500,
  message?: string,
  code?: string
): NextResponse<ErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      message,
      code,
    },
    { status: statusCode }
  )
}

// Error handler
export function handleApiError(error: unknown): NextResponse<ErrorResponse> {
  console.error('API Error:', error)

  if (error instanceof ApiError) {
    return errorResponse(error.message, error.statusCode, undefined, error.code)
  }

  if (error instanceof z.ZodError) {
    const message = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
    return errorResponse(`Validation error: ${message}`, 400, undefined, 'VALIDATION_ERROR')
  }

  if (error instanceof Error) {
    return errorResponse(error.message, 500)
  }

  return errorResponse('Internal server error', 500)
}

// Authentication helpers
export async function requireAuth(request: NextRequest) {
  const authService = AuthService.getInstance()
  try {
    return await authService.requireAuth(request)
  } catch (error) {
    throw new AuthenticationError()
  }
}

export async function optionalAuth(request: NextRequest) {
  const authService = AuthService.getInstance()
  return await authService.optionalAuth(request)
}

// Rate limiting helper
export async function checkRateLimit(
  userAddress: string,
  action: string,
  maxRequests = 10,
  windowMs = 60000 // 1 minute
): Promise<void> {
  const authService = AuthService.getInstance()
  const isAllowed = await authService.checkRateLimit(userAddress, action, maxRequests, windowMs)
  
  if (!isAllowed) {
    throw new RateLimitError(`Rate limit exceeded for action: ${action}`)
  }
}

// Validation helpers
export function validateRequestBody<T>(schema: z.ZodSchema<T>, body: unknown): T {
  try {
    return schema.parse(body)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
      throw new ValidationError(message)
    }
    throw error
  }
}

export function validateQueryParams<T>(schema: z.ZodSchema<T>, searchParams: URLSearchParams): T {
  const params = Object.fromEntries(searchParams.entries())
  return validateRequestBody(schema, params)
}

// Request body parsing
export async function parseRequestBody(request: NextRequest): Promise<unknown> {
  try {
    const contentType = request.headers.get('content-type')
    
    if (contentType?.includes('application/json')) {
      return await request.json()
    }
    
    if (contentType?.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData()
      return Object.fromEntries(formData.entries())
    }
    
    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData()
      return Object.fromEntries(formData.entries())
    }
    
    return {}
  } catch (error) {
    throw new ValidationError('Invalid request body')
  }
}

// CORS helpers
export function setCorsHeaders(response: NextResponse): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

// Pagination helpers
export function getPaginationParams(searchParams: URLSearchParams) {
  const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100)
  const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0)
  
  return { limit, offset }
}

export function createPaginationResponse<T>(
  data: T[],
  total: number,
  limit: number,
  offset: number
) {
  return {
    data,
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
      totalPages: Math.ceil(total / limit),
      currentPage: Math.floor(offset / limit) + 1,
    },
  }
}

// Cache helpers
export function setCacheHeaders(response: NextResponse, maxAge = 300): NextResponse {
  response.headers.set('Cache-Control', `public, max-age=${maxAge}`)
  return response
}

export function setNoCacheHeaders(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  return response
}

// Logging helpers
export function logApiRequest(request: NextRequest, userAddress?: string) {
  const { method, url } = request
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${method} ${url} - User: ${userAddress || 'Anonymous'}`)
}

export function logApiResponse(response: NextResponse, userAddress?: string) {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] Response ${response.status} - User: ${userAddress || 'Anonymous'}`)
}

// Utility functions
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'Unknown error occurred'
}

// Middleware wrapper for API routes
export function withErrorHandling<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args)
    } catch (error) {
      return handleApiError(error)
    }
  }
}

// Middleware wrapper for authenticated routes
export function withAuth(
  handler: (user: any, request: NextRequest, context?: { params: Promise<any> }) => Promise<NextResponse>
) {
  return withErrorHandling(async (request: NextRequest, context?: { params: Promise<any> }) => {
    const user = await requireAuth(request)
    return await handler(user, request, context)
  })
}

// Middleware wrapper for optional auth routes
export function withOptionalAuth(
  handler: (user: any | null, request: NextRequest, context?: { params: Promise<any> }) => Promise<NextResponse>
) {
  return withErrorHandling(async (request: NextRequest, context?: { params: Promise<any> }) => {
    const user = await optionalAuth(request)
    return await handler(user, request, context)
  })
}

