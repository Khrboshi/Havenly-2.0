/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
