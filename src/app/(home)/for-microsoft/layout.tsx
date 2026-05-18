import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Claude for Microsoft Office: Word, Excel, and PowerPoint Guides',
  description:
    'Learn how to use Claude with Microsoft Word, Excel, and PowerPoint. Practical guides for drafting documents, building formulas, analyzing data, and creating presentations: no plugins required.',
  openGraph: {
    title: 'Claude for Microsoft Office: Word, Excel, and PowerPoint Guides',
    description:
      'Practical guides for using Claude with Microsoft Word, Excel, and PowerPoint. No add-ins needed.',
    type: 'website',
  },
};

export default function ForMicrosoftLayout({ children }: { children: ReactNode }) {
  return children;
}
