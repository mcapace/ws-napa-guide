import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["mapbox-gl", "gsap"],
  /** Hides the bottom-left dev “N” indicator in development (editorial pages). */
  devIndicators: false,
  /** Static assets in public/ are served separately — never bundle them into lambdas. */
  outputFileTracingExcludes: {
    "*": ["./public/images/**/*", "./public/test-images/**/*"],
  },
  async redirects() {
    return [
      {
        source: '/features/taco-truck-tour',
        destination: '/features/napa-taco-tour',
        permanent: true,
      },
      {
        source: '/features/essential-st-helena-tastings',
        destination: '/regions/st-helena',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
