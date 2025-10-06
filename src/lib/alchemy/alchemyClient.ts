import { Alchemy, Network } from 'alchemy-sdk'

// Alchemy configuration
const alchemyConfig = {
  apiKey: process.env.ALCHEMY_API_KEY || '',
  network: Network.WORLDCHAIN_SEPOLIA,
  webhooks: true,
  gasless: true
}

// Initialize Alchemy client
export const alchemy = new Alchemy({
  apiKey: alchemyConfig.apiKey,
  network: alchemyConfig.network
})

// Export Alchemy instance
export default alchemy
