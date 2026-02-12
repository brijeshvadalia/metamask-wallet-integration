/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Ensure all routes are statically generated
  generateBuildId: async () => {
    return 'build'
  }
}

module.exports = nextConfig
