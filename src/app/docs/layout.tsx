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
        url: '/',
      }}
      links={[
        { text: 'Guide', url: '/guide' },
        { text: 'Roadmap', url: '/roadmap' },
        { text: 'Templates', url: '/docs/templates' },
        { text: 'Tutorials', url: '/tutorials' },
        { text: 'Blog', url: '/blog' },
      ]}
      sidebar={{
        defaultOpenLevel: 1,
      }}
    >
      {children}
    </DocsLayout>
  );
}
