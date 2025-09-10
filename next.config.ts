import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: [
    "192.168.1.125:3000",
    "localhost:3000",
    "127.0.0.1:3000"
  ],
};

export default nextConfig;
