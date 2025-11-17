/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
    serverActions: {
      allowedOrigins: ["*"],
    },
  },

  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [
          { key: "Content-Type", value: "application/manifest+json" }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
