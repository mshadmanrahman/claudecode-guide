import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Claude for Chrome: Practical Guides for Browser Users',
  description:
    'Learn how to use Claude in Chrome, from opening claude.ai for the first time to installing a Chrome extension and running Claude alongside Gmail and Google Docs. Free, beginner-friendly guides.',
  openGraph: {
    title: 'Claude for Chrome: Practical Guides for Browser Users',
    description:
      'Learn how to use Claude in Chrome: browser basics, Chrome extension setup, and Google Workspace workflows.',
    type: 'website',
  },
};

export default function ForChromeLayout({ children }: { children: ReactNode }) {
  return children;
}
