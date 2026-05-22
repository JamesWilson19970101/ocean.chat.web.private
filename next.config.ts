import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error'],
          }
        : false,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Fallback to localhost:1996 (default API gateway port) if env is missing
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1994'}/:path*`,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
