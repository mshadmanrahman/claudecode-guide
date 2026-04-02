import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/foundations/which-interface',
        permanent: true,
      },
      {
        source: '/docs/foundations',
        destination: '/docs/foundations/which-interface',
        permanent: true,
      },
      {
        source: '/docs/patterns',
        destination: '/docs/patterns/skills',
        permanent: true,
      },
      {
        source: '/docs/workflows',
        destination: '/docs/workflows/daily-practice',
        permanent: true,
      },
      {
        source: '/docs/comparisons',
        destination: '/docs/comparisons/vs-cursor',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
