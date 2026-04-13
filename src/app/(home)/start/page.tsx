import { Suspense } from 'react';
import { StartFlow } from '@/components/start/start-flow';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start Here : Claude Code Guide',
  description: 'Pick your first project and get set up with Claude Code in under 10 minutes. No coding experience required.',
};

export default function StartPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-fd-background">
          <p className="text-fd-muted-foreground">Loading...</p>
        </main>
      }
    >
      <StartFlow />
    </Suspense>
  );
}
