import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Interactive Setup Guide — Claude Code Guide',
  description: '9-step guided setup for Claude Code. Install, authenticate, write your first CLAUDE.md, and build your first feature. Progress saved automatically.',
};

export default function GuideLayout({ children }: { children: ReactNode }) {
  return children;
}
