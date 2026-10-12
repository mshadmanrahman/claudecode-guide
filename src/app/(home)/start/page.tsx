import { Suspense } from 'react';
import { StartFlow } from '@/components/start/start-flow';
import { StartHero } from '@/components/start/start-hero';
import type { Metadata } from 'next';
import { ogImage } from '@/lib/og/image';

export const metadata: Metadata = {
  title: 'Start Here: First Claude Code Project',
  description: 'Pick your first project, get set up with Claude Code in under 10 minutes. No coding experience needed.',
  alternates: { canonical: 'https://claudecodeguide.dev/start' },
  openGraph: { images: [ogImage('start', 'Start here')] },
};

export default function StartPage() {
  return (
    <>
      <Suspense fallback={<StartHero />}>
      <StartFlow />
    </Suspense>
    </>
  );
}
