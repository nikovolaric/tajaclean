import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "jssmrsxpzkpikqcratzo.supabase.co",
      "tajaclean.s3.eu-central.amazonaws.com",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
