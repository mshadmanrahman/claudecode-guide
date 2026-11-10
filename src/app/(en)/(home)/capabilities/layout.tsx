import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ogImage } from '@/lib/og/image';

export const metadata: Metadata = {
  title: 'Capabilities & Integrations',
  description:
    'Everything Claude Code can do and connect to: built-in capabilities, 20+ MCP integrations (GitHub, Slack, Jira, Figma, databases), skills, computer use.',
  alternates: { canonical: 'https://claudecodeguide.dev/capabilities' },
  openGraph: {
    images: [ogImage('capabilities', 'Claude Code Capabilities & Integrations')],
    title: 'Claude Code Capabilities & Integrations',
    description:
      'Browse everything Claude Code can do. File editing, web search, computer use, plus 20+ integrations with GitHub, Slack, Jira, Linear, Figma, and more.',
  },
};

export default function CapabilitiesLayout({ children }: { children: ReactNode }) {
  return children;
}
