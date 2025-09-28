import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // G8-specific configuration
  
  // Optimize for G8 deployment
  output: 'standalone',
  compress: true,
  
  // G8-specific environment variables
  env: {
    NEXT_PUBLIC_G8_MODE: 'true',
    NEXT_PUBLIC_APP_NAME: 'G8',
    NEXT_PUBLIC_APP_VERSION: '2.0.0',
    NEXT_PUBLIC_WORLD_ID_APP_ID: process.env.NEXT_PUBLIC_WORLD_ID_APP_ID || '',
    NEXT_PUBLIC_WORLD_ID_ACTION_ID: process.env.NEXT_PUBLIC_WORLD_ID_ACTION_ID || '',
  },

  // G8-specific headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-G8-App',
            value: 'true',
          },
        ],
      },
    ]
  },

  // G8-specific redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/g8',
        permanent: false,
      },
    ]
  },

  // G8-specific rewrites
  async rewrites() {
    return [
      {
        source: '/api/g8/:path*',
        destination: '/api/:path*',
      },
    ]
  },

  // G8-specific images configuration
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // G8-specific webpack configuration
  webpack: (config, { isServer }) => {
    // G8-specific optimizations
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    // G8-specific bundle optimization
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          g8: {
            test: /[\\/]components[\\/]g8[\\/]/,
            name: 'g8',
            chunks: 'all',
            priority: 10,
          },
          ui: {
            test: /[\\/]components[\\/]ui[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 9,
          },
        },
      },
    }

    return config
  },

  // G8-specific TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // G8-specific ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },

  // G8-specific poweredByHeader
  poweredByHeader: false,

  // G8-specific trailingSlash
  trailingSlash: false,

  // G8-specific generateEtags
  generateEtags: true,

  // G8-specific onDemandEntries
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

export default nextConfig
