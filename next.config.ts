import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb", // Example limit, adjust as needed
      allowedOrigins: ["*"], // Example allowed origin, customize as necessary
    }
  },
  serverExternalPackages: ['mongoose'],
  images: {
    domains: ['m.media-amazon.com']
  }
};

export default nextConfig;

