import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Claude for Designers: Practical Guides for UX and UI Work',
  description:
    'Practical Claude guides for UX and UI designers. Set up your working agreement, decode briefs, run heuristic evaluations, synthesize research, and build prototypes. Free, task-oriented, beginner-friendly.',
  openGraph: {
    title: 'Claude for Designers: Practical Guides for UX and UI Work',
    description:
      'Practical Claude guides for UX and UI designers. Set up your working agreement, decode briefs, run heuristic evaluations, synthesize research, and build prototypes.',
    type: 'website',
  },
};

export default function ForDesignersLayout({ children }: { children: ReactNode }) {
  return children;
}
