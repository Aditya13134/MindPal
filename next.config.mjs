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
  ...(process.env.BUILD_MODE === 'extension' && {
    output: 'export',
    trailingSlash: true,
    distDir: 'out',
  }),
}

export default nextConfig
