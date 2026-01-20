/** @type {import('next').NextConfig} */
const nextConfig = {
  // SEO-optimierte Einstellungen
  poweredByHeader: false,

  // Statische Generierung für Stadt- und Service-Seiten
  output: 'standalone',

  // Bildoptimierung
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.shinytouchgebaeudereinigung.de',
      },
    ],
  },

  // Redirects für alte URLs (falls Migration von Framer)
  async redirects() {
    return [
      // Beispiel: /gebaeudereinigung-berlin -> /berlin
      // {
      //   source: '/gebaeudereinigung-:city',
      //   destination: '/:city',
      //   permanent: true,
      // },
    ]
  },

  // Headers für Sicherheit und Caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
