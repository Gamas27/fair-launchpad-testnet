#!/usr/bin/env tsx

// Contract Integration Test Script
// Run with: npx tsx scripts/test-contracts.ts

import { testContractIntegration } from '../src/lib/contract-test'

async function main() {
  console.log('🚀 Starting Contract Integration Tests...')
  console.log('=' .repeat(50))
  
  try {
    await testContractIntegration()
    console.log('\n🎉 All contract integration tests passed!')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Contract integration tests failed:', error)
    process.exit(1)
  }
}

// Run the tests
main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
