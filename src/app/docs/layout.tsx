import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span className="font-mono text-sm font-bold tracking-tight">
            claudecodeguide<span className="text-fd-foreground">.dev</span>
          </span>
        ),
      }}
      links={[
        { text: 'Start Here', url: '/start' },
        { text: 'Tutorials', url: '/tutorials' },
        { text: 'PM Pilot', url: '/pm-pilot' },
        { text: 'Blog', url: '/blog' },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
