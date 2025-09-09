/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    PARLANT_API_KEY: process.env.PARLANT_API_KEY,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config) => {
    // Exclude Python virtual environment from webpack processing
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/venv/**', '**/node_modules/**'],
    };
    return config;
  },
}

module.exports = nextConfig
