import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ekip rehberi content/ altından okunur; Vercel build'ine dahil edilmesi için:
  outputFileTracingIncludes: {
    "/ekip/rehber": ["./content/**"],
  },
};

export default nextConfig;
