import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, polygon, arbitrum } from 'wagmi/chains'
import { injected, walletConnect, metaMask } from 'wagmi/connectors'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

// Note: This is legacy Wagmi config - now using Privy for wallet connections

// Create wagmi config
export const config = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: projectId || 'demo-project-id',
      metadata: {
        name: 'FairLaunch UI',
        description: 'Anti-Bot Meme Coin Launchpad',
        url: 'https://fairlaunch-ui.vercel.app',
        icons: ['https://fairlaunch-ui.vercel.app/icon.png'],
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}



