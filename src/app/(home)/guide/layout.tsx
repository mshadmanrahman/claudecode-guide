import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SceneBackdrop } from '@/components/scene-backdrop';
import { ogImage } from '@/lib/og/image';

export const metadata: Metadata = {
  title: 'Interactive Setup Guide : Claude Code Guide',
  description: '9-step guided setup for Claude Code. Install, authenticate, write your first CLAUDE.md, and build your first feature. Progress saved automatically.',
  openGraph: { images: [ogImage('guide', 'Interactive setup guide')] },
};

export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SceneBackdrop variant="faded" scene="gorge" />
      {children}
    </>
  );
}
