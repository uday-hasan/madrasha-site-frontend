import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // change if your backend runs on a different port
        pathname: "/uploads/**",
      },
    ],
  },
  // Disable Turbopack to avoid panic errors
  turbopack: false,
};

export default nextConfig;
