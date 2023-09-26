/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA(
  withBundleAnalyzer({
    nextConfig,
  })
);
