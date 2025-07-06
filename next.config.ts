import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SEO und Performance Optimierungen
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Kompression aktivieren
  compress: true,

  // PoweredBy Header entfernen für Security
  poweredByHeader: false,

  // Experimental Features für bessere Performance
  experimental: {
    optimizeCss: true, // Jetzt wieder aktiviert, da critters installiert ist
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  async headers() {
    return [
      // Andere APIs mit sicherer CORS-Konfiguration
      {
        source: "/api/((?!auth).)*", // Alle APIs außer /api/auth/*
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NEXT_PUBLIC_APP_URL || "https://taskify.software",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
      // Security Headers für SEO und Sicherheit
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), bluetooth=(), usb=(), picture-in-picture=(self), fullscreen=(self)",
          },
        ],
      },
      // Cache Headers für statische Assets
      {
        source: "/:path*\\.(png|jpg|jpeg|svg|webp|avif|ico)", // Alle Bilder im /public/ root
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)", // Next.js generierte Assets
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
