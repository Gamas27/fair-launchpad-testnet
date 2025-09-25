// Test authentication utility for testing with seeded users
import { apiService } from '@/services/apiService'

export const TEST_USERS = {
  GOLD_USER: {
    address: '0x1234567890123456789012345678901234567890',
    worldIdHash: 'world_id_hash_1',
    verificationLevel: 'orb' as const,
  },
  SILVER_USER: {
    address: '0x2345678901234567890123456789012345678901',
    worldIdHash: 'world_id_hash_2',
    verificationLevel: 'document' as const,
  },
  BRONZE_USER: {
    address: '0x3456789012345678901234567890123456789012',
    worldIdHash: 'world_id_hash_3',
    verificationLevel: 'device' as const,
  },
  HIGH_RISK_USER: {
    address: '0x4567890123456789012345678901234567890123',
    worldIdHash: 'world_id_hash_4',
    verificationLevel: 'orb' as const,
  },
  UNVERIFIED_USER: {
    address: '0x5678901234567890123456789012345678901234',
    worldIdHash: null,
    verificationLevel: 'device' as const,
  },
} as const

export type TestUserType = keyof typeof TEST_USERS

// Authenticate a test user and return session token
export async function authenticateTestUser(userType: TestUserType): Promise<string | null> {
  try {
    console.log('Authenticating test user:', userType)
    const user = TEST_USERS[userType]
    console.log('User data:', user)
    
    // For unverified user, we need to create a basic session
    if (userType === 'UNVERIFIED_USER') {
      console.log('Creating mock session for unverified user')
      // Create a mock session token for unverified user
      const mockToken = `test_token_${user.address}_${Date.now()}`
      localStorage.setItem('sessionToken', mockToken)
      return mockToken
    }

    console.log('Verifying World ID for user:', user.address)
    // For verified users, simulate World ID verification
    const response = await apiService.verifyWorldId({
      walletAddress: user.address,
      worldIdHash: user.worldIdHash!,
      verificationLevel: user.verificationLevel,
      proof: {
        merkle_root: '0x1234567890abcdef',
        nullifier_hash: user.worldIdHash,
        proof: '0xabcdef1234567890',
        verification_level: user.verificationLevel,
      }
    })

    console.log('World ID verification successful')
    // Store the session token
    localStorage.setItem('sessionToken', response.sessionToken)
    return response.sessionToken
  } catch (error) {
    console.error('Failed to authenticate test user:', error)
    return null
  }
}

// Clear authentication
export function clearTestAuth(): void {
  localStorage.removeItem('sessionToken')
}

// Check if user is authenticated
export function isTestUserAuthenticated(): boolean {
  return !!localStorage.getItem('sessionToken')
}

// Get current test user address from token
export function getCurrentTestUserAddress(): string | null {
  const token = localStorage.getItem('sessionToken')
  if (!token) return null
  
  // Extract address from token (this is a simple implementation)
  // In a real app, you'd decode the JWT token
  for (const [userType, user] of Object.entries(TEST_USERS)) {
    if (token.includes(user.address.slice(-8))) {
      return user.address
    }
  }
  return null
}
