import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ogImage } from '@/lib/og/image';

const ogTitle =
  'Claude for Marketers: Social Media, Blog Posts, Email Campaigns, and Ad Copy';
const ogDescription =
  'Practical Claude guides for marketers. Social posts, blog drafts, email campaigns, ad copy, and market research.';

export const metadata: Metadata = {
  title: 'Claude for Marketers: Practical Guides',
  description:
    'Practical Claude guides for marketers: social media posts, blog posts, email campaigns and ad copy, written faster. Brand voice setup included.',
  alternates: { canonical: 'https://claudecodeguide.dev/for-marketers' },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    type: 'website',
    images: [ogImage('for-marketers', ogTitle)],
  },
};

export default function ForMarketersLayout({ children }: { children: ReactNode }) {
  return children;
}
