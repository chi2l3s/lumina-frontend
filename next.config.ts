import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '347bd035-d047-44a8-ad72-3b93f0fb8dc5.selstorage.ru',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 's3.twcstorage.ru',
        port: ''
      }
    ]
  }
};

export default nextConfig;
