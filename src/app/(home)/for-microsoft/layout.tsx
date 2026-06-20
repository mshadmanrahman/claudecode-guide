import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const ogTitle = 'Claude AI for Microsoft Office: Word, Excel, and PowerPoint Guides';
const ogDescription =
  'Practical guides for using Claude AI chat with Microsoft Word, Excel, and PowerPoint. No add-ins needed.';

export const metadata: Metadata = {
  title: 'Claude AI for Microsoft Office: Word, Excel, and PowerPoint Guides',
  description:
    'Learn how to use Claude AI chat with Microsoft Word, Excel, and PowerPoint. Practical guides for drafting documents, building formulas, analyzing data, and creating presentations. No plugins or Claude Code required.',
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

export default function ForMicrosoftLayout({ children }: { children: ReactNode }) {
  return children;
}
