/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'distribution.faceit-cdn.net',
      'localhost',
      'avatars.githubusercontent.com',
      'assets.faceit-cdn.net',
    ],
  },
}

module.exports = nextConfig
