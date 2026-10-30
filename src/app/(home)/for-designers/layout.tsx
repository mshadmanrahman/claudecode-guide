import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ogImage } from '@/lib/og/image';

const ogTitle = 'Claude for Designers: Practical Guides for UX and UI Work';
const ogDescription =
  'Practical Claude guides for UX and UI designers. Set up your working agreement, decode briefs, run heuristic evaluations, synthesize research, and build prototypes.';

export const metadata: Metadata = {
  title: 'Claude for Designers: UX and UI Guides',
  description:
    'Practical Claude guides for UX and UI designers: decode briefs, run heuristic evaluations, synthesize research and build prototypes. Free, task-oriented.',
  alternates: {
    canonical: 'https://claudecodeguide.dev/for-designers',
    languages: { en: 'https://claudecodeguide.dev/for-designers', bn: 'https://claudecodeguide.dev/bn/for-designers' },
  },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    type: 'website',
    images: [ogImage('for-designers', ogTitle)],
  },
};

export default function ForDesignersLayout({ children }: { children: ReactNode }) {
  return children;
}
