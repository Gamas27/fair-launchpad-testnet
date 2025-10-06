import { Alchemy, Network } from 'alchemy-sdk'

// Production-ready Alchemy configuration
const alchemyConfig = {
  apiKey: process.env.ALCHEMY_API_KEY || '',
  network: Network.WORLDCHAIN_MAINNET, // Using WORLDCHAIN_MAINNET for World Chain
  maxRetries: 3,
  retryDelay: 1000,
  timeout: 30000
}

// Production-ready Alchemy client with proper error handling
let alchemy: Alchemy

// Initialize Alchemy client with production configuration
if (alchemyConfig.apiKey && alchemyConfig.apiKey !== '') {
  try {
    alchemy = new Alchemy({
      apiKey: alchemyConfig.apiKey,
      network: alchemyConfig.network
    })
    console.log('✅ Alchemy client initialized successfully')
  } catch (error) {
    console.error('❌ Failed to initialize Alchemy client:', error)
    throw new Error('Alchemy client initialization failed')
  }
} else {
  console.error('❌ ALCHEMY_API_KEY is not configured')
  throw new Error('Alchemy API key is required for production')
}

export { alchemy }
export default alchemy
