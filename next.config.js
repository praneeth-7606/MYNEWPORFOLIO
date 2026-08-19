const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Portfolio imagery is effectively immutable; keep optimized variants around
    // instead of re-encoding them every 60s (the default).
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    // Keep error/warn for real diagnostics, drop the rest from production output.
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },
  experimental: {
    // framer-motion is the single largest client dependency here and every section
    // pulls from it; barrel-optimizing it keeps unused exports out of the bundle.
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion'],
  },
}

module.exports = nextConfig