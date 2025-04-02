/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
      unoptimized: true, // Disable Image Optimization for static export
  },
  reactStrictMode: true,
}

module.exports = nextConfig
