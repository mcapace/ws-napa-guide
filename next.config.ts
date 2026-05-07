import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["mapbox-gl", "gsap"],
  /** Hides the bottom-left dev “N” indicator in development (editorial pages). */
  devIndicators: false,
};

export default nextConfig;
