'use client'

import { PrivyProvider as PrivyProviderBase } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, goerli, polygon, arbitrum } from 'wagmi/chains'
import { ReactNode, useState } from 'react'

// Create a Wagmi config for Privy with testnet support
const wagmiConfig = createConfig({
  chains: [sepolia, goerli, mainnet, polygon, arbitrum], // Sepolia first for testing
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [goerli.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
})

interface PrivyProviderProps {
  children: ReactNode
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <PrivyProviderBase
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'cmg1jgvhy00j6l50cpsv0yt3e'}
      config={{
        // Customize the appearance of the login modal
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-domain.com/logo.png',
        },
        // Configure login methods
        loginMethods: ['email', 'wallet', 'google', 'twitter', 'discord'],
        // Configure embedded wallets
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          noPromptOnSignature: false,
        },
        // Configure external wallets
        externalWallets: {
          coinbaseWallet: {
            connectionOptions: 'smartWalletOnly',
          },
        },
        // Configure MFA
        mfa: {
          noPromptOnMfaRequired: false,
        },
        // Configure legal
        legal: {
          termsAndConditionsUrl: 'https://your-domain.com/terms',
          privacyPolicyUrl: 'https://your-domain.com/privacy',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProviderBase>
  )
}
