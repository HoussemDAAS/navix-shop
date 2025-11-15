import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trae-api-sg.mchost.guru',
        pathname: '/api/ide/v1/text_to_image/**',
      },
    ],
  },
};

export default nextConfig;
