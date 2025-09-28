import { PrismaClient } from '@prisma/client'

// Database configuration
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
})

// Database connection health check
export async function checkDatabaseConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

// Graceful shutdown
export async function disconnectDatabase() {
  await prisma.$disconnect()
}
