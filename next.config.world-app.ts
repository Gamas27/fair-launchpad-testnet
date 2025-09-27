import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['static.usernames.app-backend.toolsforhumanity.com'],
  },
  allowedDevOrigins: ['*'], // Add your dev origin here
  reactStrictMode: false,
  // World App specific optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Simplified for World App deployment
  output: 'standalone',
  trailingSlash: false,
  // Disable features not needed for World App
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

