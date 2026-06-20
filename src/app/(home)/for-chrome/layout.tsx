import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const ogTitle = 'Claude for Chrome: Practical Guides for Browser Users';
const ogDescription =
  'Learn how to use Claude in Chrome: browser basics, Chrome extension setup, and Google Workspace workflows.';

export const metadata: Metadata = {
  title: 'Claude for Chrome: Practical Guides for Browser Users',
  description:
    'Learn how to use Claude in Chrome, from opening claude.ai for the first time to installing a Chrome extension and running Claude alongside Gmail and Google Docs. Free, beginner-friendly guides.',
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    type: 'website',
    images: [
      {
        url: `https://claudecodeguide.dev/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}`,
        width: 1200,
        height: 630,
        alt: ogTitle,
      },
    ],
  },
};

export default function ForChromeLayout({ children }: { children: ReactNode }) {
  return children;
}
