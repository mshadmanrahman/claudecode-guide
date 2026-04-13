import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return [
      // Section-level redirects: send bare folder URLs to first page in section
      {
        source: '/docs/foundations',
        destination: '/docs/foundations/what-is-claude-code',
        permanent: false,
      },
      {
        source: '/docs/patterns',
        destination: '/docs/patterns/skills',
        permanent: false,
      },
      {
        source: '/docs/workflows',
        destination: '/docs/workflows/daily-practice',
        permanent: false,
      },
      {
        source: '/docs/comparisons',
        destination: '/docs/comparisons/vs-cursor',
        permanent: false,
      },
    ];
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
