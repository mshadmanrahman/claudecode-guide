import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ogImage } from '@/lib/og/image';

export const metadata: Metadata = {
  title: 'Claude Code Roadmap: Your Learning Path',
  description:
    'A Claude Code roadmap in five stages: install and first prompt, memory and sessions, skills and hooks, team workflows, then templates to ship.',
  alternates: { canonical: 'https://claudecodeguide.dev/roadmap' },
  openGraph: {
    title: 'Your learning path',
    description: 'From zero to power user. Each stage builds on what came before.',
    images: [ogImage('roadmap', 'Your learning path')],
  },
};

export default function RoadmapLayout({ children }: { children: ReactNode }) {
  return children;
}
