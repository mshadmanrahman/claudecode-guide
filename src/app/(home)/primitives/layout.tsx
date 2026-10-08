import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ogImage } from '@/lib/og/image';

export const metadata: Metadata = {
  title: 'The Seven Primitives of Claude Code',
  description:
    'Skill, Hook, Rule, Guardrail, Workflow, Agent, MCP. What each one does, when it fires, and the kitchen analogy that makes it click. The clearest mental model for organizing your Claude Code setup.',
  openGraph: {
    images: [ogImage('primitives', 'The Seven Primitives of Claude Code')],
    title: 'The Seven Primitives of Claude Code',
    description:
      'Skill, Hook, Rule, Guardrail, Workflow, Agent, MCP. The clearest mental model for organizing your Claude Code setup.',
  },
};

export default function PrimitivesLayout({ children }: { children: ReactNode }) {
  return children;
}
