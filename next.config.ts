import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "jtku5qrsuh.ufs.sh",
        port:"",
        protocol:"https",
      },
      {
        hostname: "firebasestorage.googleapis.com",
        port:"",
        protocol:"https",
      },
    ]
  }};

export default nextConfig;
