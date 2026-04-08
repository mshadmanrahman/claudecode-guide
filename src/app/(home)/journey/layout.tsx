import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Your Journey to Claude Code',
  description:
    'Interactive, persona-based learning path for Claude Code. Pick your role, follow the steps, check off your progress. From ChatGPT user to Claude Code power user.',
  openGraph: {
    title: 'Your Journey to Claude Code',
    description:
      'Pick your persona. Follow the path. Go from "what is this?" to "I can\'t work without it." Interactive journey map with tutorials, guides, and progress tracking.',
  },
};

export default function JourneyLayout({ children }: { children: ReactNode }) {
  return children;
}
