import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

/** [vanity path, target page, utm_campaign] */
const SHORTS_REDIRECTS: ReadonlyArray<readonly [string, string, string]> = [
  ['/quiz', '/for-teachers/create-quiz-questions-with-claude', 'quiz'],
  ['/plan', '/docs/foundations/plan-mode', 'plan'],
  ['/context', '/docs/foundations/context-window', 'context'],
  ['/rewind', '/docs/foundations/shortcuts', 'rewind'],
  ['/shorts', '/videos', 'shorts'],
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    qualities: [75, 90],
    remotePatterns: [{ protocol: 'https', hostname: 'substackcdn.com' }],
  },
  async redirects() {
    return [
      // Short vanity paths spoken in YouTube Shorts / TikTok / Reels. Temporary
      // (307) so targets can change; UTM lets GA4 count Shorts traffic.
      ...SHORTS_REDIRECTS.map(([source, target, campaign]) => ({
        source,
        destination: `${target}?utm_source=shorts&utm_medium=social&utm_campaign=${campaign}`,
        permanent: false,
      })),
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
      // No Bangla tutorials index yet; only /bn/tutorials/[slug] exists.
      {
        source: '/bn/tutorials',
        destination: '/bn',
        permanent: false,
      },
    ];
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
