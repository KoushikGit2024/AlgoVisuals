import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Webpack rules (for production builds)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //       "fs/promises": false,
  //       path: false,
  //       crypto: false,
  //       module: false
  //     };
  //   }
  //   return config;
  // },
  
  // // 2. Turbopack rules (for local dev server)
  // turbopack: {
  //   resolveAlias: {
  //     fs: "./empty.js",
  //     "fs/promises": "./empty.js",
  //     path: "./empty.js",
  //     crypto: "./empty.js",
  //     module:"./empty.js"
  //   },
  // },
};

export default nextConfig;