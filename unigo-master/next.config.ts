import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  // @ts-ignore: type override for property that may not be in NextConfig type
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
