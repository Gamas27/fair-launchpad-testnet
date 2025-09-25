import { z } from 'zod'

// User validation schemas
export const createUserSchema = z.object({
  walletAddress: z.string().min(42).max(42), // Ethereum address length
  worldIdHash: z.string().optional(),
  verificationLevel: z.enum(['device', 'document', 'orb']).default('device'),
})

export const updateUserSchema = z.object({
  worldIdHash: z.string().optional(),
  verificationLevel: z.enum(['device', 'document', 'orb']).optional(),
  reputationScore: z.number().min(0).optional(),
  reputationLevel: z.string().optional(),
  totalTrades: z.number().min(0).optional(),
  totalVolume: z.number().min(0).optional(),
  riskScore: z.number().min(0).max(100).optional(),
  isBanned: z.boolean().optional(),
})

// Token validation schemas
export const createTokenSchema = z.object({
  address: z.string().min(42).max(42), // Ethereum address length
  name: z.string().min(1).max(100),
  symbol: z.string().min(1).max(10).toUpperCase(),
  description: z.string().min(1).max(1000),
  imageUrl: z.string().url().optional(),
  creatorAddress: z.string().min(42).max(42),
  initialPrice: z.number().positive(),
  priceIncrement: z.number().positive(),
  maxSupply: z.string().transform(val => BigInt(val)), // Convert string to BigInt
})

export const updateTokenSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(1000).optional(),
  imageUrl: z.string().url().optional(),
  currentPrice: z.number().positive().optional(),
  currentSupply: z.string().transform(val => BigInt(val)).optional(),
  totalVolume: z.number().min(0).optional(),
  totalTrades: z.number().min(0).optional(),
  status: z.enum(['launching', 'active', 'completed', 'failed']).optional(),
})

// Trade validation schemas
export const createTradeSchema = z.object({
  userAddress: z.string().min(42).max(42),
  tokenAddress: z.string().min(42).max(42),
  type: z.enum(['buy', 'sell']),
  amount: z.number().positive(),
  price: z.number().positive(),
  totalValue: z.number().positive(),
  blockNumber: z.string().transform(val => BigInt(val)).optional(),
  transactionHash: z.string().optional(),
  riskScore: z.number().min(0).max(100).default(0),
  isSuspicious: z.boolean().default(false),
  manipulationFlags: z.string().optional(),
})

export const simulateTradeSchema = z.object({
  tokenAddress: z.string().min(42).max(42),
  type: z.enum(['buy', 'sell']),
  amount: z.number().positive(),
})

// Reputation validation schemas
export const createReputationQuestSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  type: z.enum(['trade', 'volume', 'time', 'social']),
  targetValue: z.number().positive(),
  reward: z.number().positive(),
  isActive: z.boolean().default(true),
})

export const updateUserReputationQuestSchema = z.object({
  questId: z.string(),
  progress: z.number().min(0),
  isCompleted: z.boolean().default(false),
})

// Achievement validation schemas
export const createAchievementSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  icon: z.string().min(1).max(50),
  rarity: z.enum(['common', 'rare', 'epic', 'legendary']),
  requirements: z.string(), // JSON string
  reward: z.number().positive(),
  isActive: z.boolean().default(true),
})

// Anti-manipulation validation schemas
export const createAntiManipulationLogSchema = z.object({
  userAddress: z.string().min(42).max(42),
  activityType: z.enum(['trade', 'login', 'verification']),
  riskScore: z.number().min(0).max(100),
  flags: z.string(), // JSON string
  details: z.string().optional(),
})

// Session validation schemas
export const createSessionSchema = z.object({
  userAddress: z.string().min(42).max(42),
  sessionToken: z.string().min(1),
  expiresAt: z.date(),
})

// Query parameter validation schemas
export const paginationSchema = z.object({
  limit: z.string().transform(val => parseInt(val, 10)).pipe(z.number().min(1).max(100)).default(20),
  offset: z.string().transform(val => parseInt(val, 10)).pipe(z.number().min(0)).default(0),
})

export const tokenQuerySchema = z.object({
  status: z.enum(['launching', 'active', 'completed', 'failed']).optional(),
  creator: z.string().min(42).max(42).optional(),
  ...paginationSchema.shape,
})

export const tradeQuerySchema = z.object({
  userAddress: z.string().min(42).max(42).optional(),
  tokenAddress: z.string().min(42).max(42).optional(),
  type: z.enum(['buy', 'sell']).optional(),
  ...paginationSchema.shape,
})

// World ID validation schemas
export const worldIdVerificationSchema = z.object({
  walletAddress: z.string().min(42).max(42),
  worldIdHash: z.string().min(1),
  verificationLevel: z.enum(['device', 'document', 'orb']),
  proof: z.object({
    merkle_root: z.string(),
    nullifier_hash: z.string(),
    proof: z.string(),
    verification_level: z.enum(['device', 'document', 'orb']),
  }).optional(),
})

// API response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
})

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  message: z.string().optional(),
  code: z.string().optional(),
})

// Type exports
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type CreateTokenInput = z.infer<typeof createTokenSchema>
export type UpdateTokenInput = z.infer<typeof updateTokenSchema>
export type CreateTradeInput = z.infer<typeof createTradeSchema>
export type SimulateTradeInput = z.infer<typeof simulateTradeSchema>
export type CreateReputationQuestInput = z.infer<typeof createReputationQuestSchema>
export type UpdateUserReputationQuestInput = z.infer<typeof updateUserReputationQuestSchema>
export type CreateAchievementInput = z.infer<typeof createAchievementSchema>
export type CreateAntiManipulationLogInput = z.infer<typeof createAntiManipulationLogSchema>
export type CreateSessionInput = z.infer<typeof createSessionSchema>
export type PaginationInput = z.infer<typeof paginationSchema>
export type TokenQueryInput = z.infer<typeof tokenQuerySchema>
export type TradeQueryInput = z.infer<typeof tradeQuerySchema>
export type WorldIdVerificationInput = z.infer<typeof worldIdVerificationSchema>
export type ApiResponse<T = any> = z.infer<typeof apiResponseSchema> & { data?: T }
export type ErrorResponse = z.infer<typeof errorResponseSchema>

// Validation helper functions
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
      throw new Error(`Validation error: ${errorMessage}`)
    }
    throw error
  }
}

export function validateQueryParams<T>(schema: z.ZodSchema<T>, searchParams: URLSearchParams): T {
  const params = Object.fromEntries(searchParams.entries())
  return validateInput(schema, params)
}

// Common validation patterns
export const ethereumAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address')
export const positiveNumberSchema = z.number().positive('Must be a positive number')
export const nonNegativeNumberSchema = z.number().min(0, 'Must be non-negative')
export const urlSchema = z.string().url('Must be a valid URL')
export const cuidSchema = z.string().regex(/^c[a-z0-9]{24}$/, 'Invalid CUID format')

