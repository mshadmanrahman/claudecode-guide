import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Claude for Marketers: Social Media, Blog Posts, Email Campaigns, and Ad Copy',
  description:
    'Practical Claude guides for marketers and content creators. Write social media posts, blog posts, email campaigns, and ad copy faster. Brand voice setup included.',
  openGraph: {
    title: 'Claude for Marketers: Social Media, Blog Posts, Email Campaigns, and Ad Copy',
    description:
      'Practical Claude guides for marketers. Social posts, blog drafts, email campaigns, ad copy, and market research.',
    type: 'website',
  },
};

export default function ForMarketersLayout({ children }: { children: ReactNode }) {
  return children;
}
