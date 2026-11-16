import { createSecureHeaders } from "next-secure-headers";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so a stray lockfile in a parent folder (and the middleware next to it)
  // is not picked up by local builds.
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**"
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: createSecureHeaders()
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
