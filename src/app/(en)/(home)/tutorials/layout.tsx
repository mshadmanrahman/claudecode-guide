import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ogImage } from '@/lib/og/image';

export const metadata: Metadata = {
  title: 'Claude Code Tutorials, Step by Step',
  description:
    'Hands-on Claude Code tutorials: write your first CLAUDE.md, ship a landing page, build skills and automate workflows. Free, beginner-friendly.',
  alternates: { canonical: 'https://claudecodeguide.dev/tutorials' },
  openGraph: {
    images: [ogImage('tutorials', 'Claude Code Tutorials')],
    title: 'Claude Code Tutorials: Step-by-Step Guides for Every Skill Level',
    description:
      'Learn Claude Code through hands-on tutorials. From your first CLAUDE.md to shipping landing pages, building skills, and automating workflows.',
    type: 'website',
  },
};

export default function TutorialsLayout({ children }: { children: ReactNode }) {
  return children;
}
