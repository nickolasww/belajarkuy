import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'evzgyiqehvgcoaodvnmw.supabase.co',  // wildcard untuk semua project supabase
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
