import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    useLightningcss: false,
    webpackBuildWorker: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "motion-utils": require.resolve("motion-utils"),
    };
    return config;
  },
};

export default nextConfig;
