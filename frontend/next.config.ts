import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // O '**' libera TODOS os sites do mundo. 
      },
    ],
  },
};

export default nextConfig;