import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Capabilities & Integrations',
  description:
    'Everything Claude Code can do and connect to. Built-in capabilities, 20+ MCP integrations (GitHub, Slack, Jira, Figma, databases), custom skills, and computer use. The full picture.',
  openGraph: {
    title: 'Claude Code Capabilities & Integrations',
    description:
      'Browse everything Claude Code can do. File editing, web search, computer use, plus 20+ integrations with GitHub, Slack, Jira, Linear, Figma, and more.',
  },
};

export default function CapabilitiesLayout({ children }: { children: ReactNode }) {
  return children;
}
