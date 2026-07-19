import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return ["/qr-code-generator", "/qr-code-maker", "/create-qr-code"].map(
      (source) => ({ source, destination: "/generator", permanent: true }),
    );
  },
};

export default nextConfig;
