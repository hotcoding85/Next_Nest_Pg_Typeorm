import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/profile',
        permanent: true, // Set to true for 301 permanent redirect, false for 302 temporary redirect
      },
    ];
  },
};

export default nextConfig;
