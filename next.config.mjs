/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable static export for extension compatibility
  output: process.env.NODE_ENV === 'production' && process.env.BUILD_MODE === 'extension' ? 'export' : undefined,
  trailingSlash: true,
  // Disable server-side features for extension build
  ...(process.env.BUILD_MODE === 'extension' && {
    experimental: {
      appDir: true,
    },
  }),
}

export default nextConfig
