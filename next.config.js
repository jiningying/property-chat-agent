/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    PARLANT_API_KEY: process.env.PARLANT_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/parlant-chat',
        destination: '/api/parlant-chat',
      },
    ];
  },
}

module.exports = nextConfig
