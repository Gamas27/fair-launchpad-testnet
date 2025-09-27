const { PrismaClient } = require('./src/generated/prisma')

async function testDatabase() {
  const prisma = new PrismaClient()
  
  try {
    console.log('Testing database connection...')
    
    // Test basic connection
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection successful')
    
    // Test if tables exist
    const tables = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table'`
    console.log('📋 Tables found:', tables)
    
    // Test token table specifically
    const tokenCount = await prisma.token.count()
    console.log('🪙 Token count:', tokenCount)
    
  } catch (error) {
    console.error('❌ Database error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()
