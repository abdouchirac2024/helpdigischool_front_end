/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output standalone pour Docker (optimisé pour les conteneurs)
  output: 'standalone',

  // Configuration des images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    // Domaines autorisés pour les images
    domains: ['localhost', 'api.helpdigischool.com'],
  },

  // Variables d'environnement exposées au client
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
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
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirections
  async redirects() {
    return [
      // Redirection de /dashboard vers le dashboard par défaut
      // {
      //   source: '/dashboard',
      //   destination: '/dashboard/parent',
      //   permanent: false,
      // },
    ];
  },

  // Rewrites pour le proxy API en développement
  async rewrites() {
    // Proxy API seulement en développement
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/v1/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'}/:path*`,
        },
      ];
    }
    return [];
  },

  // Désactiver la télémétrie Next.js
  telemetry: {
    isEnabled: false,
  },

  // Configuration TypeScript
  typescript: {
    // Permet le build même avec des erreurs TS (à désactiver en production)
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },

  // Configuration ESLint
  eslint: {
    // Permet le build même avec des erreurs ESLint (à désactiver en production)
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },

  // Optimisation des packages
  experimental: {
    // Optimisation automatique des imports
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
