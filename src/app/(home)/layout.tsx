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
        { text: 'Journey', url: '/journey' },
        { text: 'Guide', url: '/guide' },
        { text: 'Docs', url: '/docs/foundations/which-interface' },
        { text: 'Templates', url: '/docs/templates' },
        { text: 'Tutorials', url: '/tutorials' },
        { text: 'Blog', url: '/blog' },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
