import type { NextConfig } from "next";
import withPWAInit from 'next-pwa'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // útil para desarrollo
  cacheOnFrontEndNav: false, // evita cacheo agresivo
  runtimeCaching: [
    {
      urlPattern: /^https?.*/, // todo lo que sea HTTP/S
      handler: "NetworkOnly", // no cachea nada
      options: {
        cacheName: "online-only",
      },
    },
  ],
});


export default nextConfig;
