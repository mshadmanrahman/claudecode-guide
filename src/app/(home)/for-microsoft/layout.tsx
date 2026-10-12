import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ogImage } from '@/lib/og/image';

const ogTitle = 'Claude AI for Microsoft Office: Word, Excel, and PowerPoint Guides';
const ogDescription =
  'Practical guides for using Claude AI chat with Microsoft Word, Excel, and PowerPoint. No add-ins needed.';

export const metadata: Metadata = {
  title: 'Claude for Word, Excel and PowerPoint',
  description:
    'Use Claude chat with Word, Excel and PowerPoint: draft documents, build formulas, analyze data and create presentations. No plugins or Claude Code required.',
  alternates: { canonical: 'https://claudecodeguide.dev/for-microsoft' },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    type: 'website',
    images: [ogImage('for-microsoft', ogTitle)],
  },
};

export default function ForMicrosoftLayout({ children }: { children: ReactNode }) {
  return children;
}
