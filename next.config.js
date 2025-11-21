/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Helps reduce bundle size for framer-motion usage
    optimizePackageImports: ["framer-motion"]
  },
  images: {
    // You are not using Next Image optimization now; this keeps things simple on Vercel
    unoptimized: true
  }
};

module.exports = nextConfig;
