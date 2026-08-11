import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // TODO: remove once real client photos replace the picsum.photos
    // placeholders in the design pages.
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
