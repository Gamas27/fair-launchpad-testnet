import { Alchemy, Network } from 'alchemy-sdk'

// Alchemy configuration
const alchemyConfig = {
  apiKey: process.env.ALCHEMY_API_KEY || '',
  network: Network.WORLDCHAIN_SEPOLIA,
  webhooks: true,
  gasless: true
}

// Initialize Alchemy client with fallback
let alchemy: Alchemy

try {
  if (alchemyConfig.apiKey) {
    alchemy = new Alchemy({
      apiKey: alchemyConfig.apiKey,
      network: alchemyConfig.network
    })
  } else {
    // Create a mock client for development
    alchemy = new Alchemy({
      apiKey: 'demo-key',
      network: Network.WORLDCHAIN_SEPOLIA
    })
    console.warn('Alchemy API key not configured. Using demo mode.')
  }
} catch (error) {
  console.error('Failed to initialize Alchemy client:', error)
  // Create a fallback mock client
  alchemy = new Alchemy({
    apiKey: 'demo-key',
    network: Network.WORLDCHAIN_SEPOLIA
  })
}

export { alchemy }
export default alchemy
