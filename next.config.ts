import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["mapbox-gl", "gsap"],
  /** Hides the bottom-left dev “N” indicator in development (editorial pages). */
  devIndicators: false,
  /** Static assets in public/ are served separately — never bundle them into lambdas. */
  outputFileTracingExcludes: {
    "*": ["./public/images/**/*", "./public/test-images/**/*"],
  },
};

export default nextConfig;
