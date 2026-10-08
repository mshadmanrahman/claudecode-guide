import { Suspense } from 'react';
import { StartFlow } from '@/components/start/start-flow';
import type { Metadata } from 'next';
import { ogImage } from '@/lib/og/image';

export const metadata: Metadata = {
  title: 'Start Here : Claude Code Guide',
  description: 'Pick your first project, get set up with Claude Code in under 10 minutes. No coding experience needed.',
  openGraph: { images: [ogImage('start', 'Start here')] },
};

export default function StartPage() {
  return (
    <>
      <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-fd-muted-foreground">Loading...</p>
        </main>
      }
    >
      <StartFlow />
    </Suspense>
    </>
  );
}
