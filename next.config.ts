import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep generated output separate from the earlier preview cache. This also
  // avoids Windows/OneDrive file locks when a preview and production build run.
  distDir: ".next-build",
};

export default nextConfig;
