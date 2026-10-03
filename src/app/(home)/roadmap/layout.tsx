import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ogImage } from '@/lib/og/image';

export const metadata: Metadata = {
  title: 'Your Learning Path',
  description: 'From zero to power user. Each stage builds on what came before.',
  openGraph: {
    title: 'Your learning path',
    description: 'From zero to power user. Each stage builds on what came before.',
    images: [ogImage('roadmap', 'Your learning path')],
  },
};

export default function RoadmapLayout({ children }: { children: ReactNode }) {
  return children;
}
