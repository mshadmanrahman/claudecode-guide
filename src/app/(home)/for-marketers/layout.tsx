import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const ogTitle =
  'Claude for Marketers: Social Media, Blog Posts, Email Campaigns, and Ad Copy';
const ogDescription =
  'Practical Claude guides for marketers. Social posts, blog drafts, email campaigns, ad copy, and market research.';

export const metadata: Metadata = {
  title: 'Claude for Marketers: Social Media, Blog Posts, Email Campaigns, and Ad Copy',
  description:
    'Practical Claude guides for marketers and content creators. Write social media posts, blog posts, email campaigns, and ad copy faster. Brand voice setup included.',
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    type: 'website',
    images: [
      {
        url: `https://claudecodeguide.dev/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}`,
        width: 1200,
        height: 630,
        alt: ogTitle,
      },
    ],
  },
};

export default function ForMarketersLayout({ children }: { children: ReactNode }) {
  return children;
}
