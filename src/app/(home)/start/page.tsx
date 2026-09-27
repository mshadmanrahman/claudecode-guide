import { Suspense } from 'react';
import { StartFlow } from '@/components/start/start-flow';
import type { Metadata } from 'next';
import { SceneBackdrop } from '@/components/scene-backdrop';

export const metadata: Metadata = {
  title: 'Start Here : Claude Code Guide',
  description: 'Pick your first project, get set up with Claude Code in under 10 minutes. No coding experience needed.',
};

export default function StartPage() {
  return (
    <>
      <SceneBackdrop variant="faded" />
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
