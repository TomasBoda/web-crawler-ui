/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  skipTypescriptChecking: true,
  typescript: {
    transpileOnly: true,
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
