/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },

  images: {
    domains: ['lh3.googleusercontent.com']
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};

module.exports = nextConfig;
