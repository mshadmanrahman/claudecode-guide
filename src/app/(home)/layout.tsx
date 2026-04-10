import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      nav={{
        title: (
          <span className="font-mono text-sm font-bold tracking-tight">
            claudecodeguide<span className="text-fd-foreground">.dev</span>
          </span>
        ),
      }}
      links={[
        { text: 'Guide', url: '/guide' },
        { text: 'Journey', url: '/journey' },
        { text: 'Docs', url: '/docs/foundations/what-is-claude-code' },
        { text: 'Tutorials', url: '/tutorials' },
        { text: 'Blog', url: '/blog' },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
