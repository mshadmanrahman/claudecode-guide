import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Claude Code Blog: Tips, Workflows, and Guides',
  description:
    'Practical articles on Claude Code for designers, product managers, and developers. Workflows, setup guides, and real-world patterns updated regularly.',
  openGraph: {
    title: 'Claude Code Blog: Tips, Workflows, and Guides',
    description:
      'Practical articles on Claude Code for designers, product managers, and developers.',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
