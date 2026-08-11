import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // TODO: remove once real client photos replace the stock placeholders
    // in the design pages.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
