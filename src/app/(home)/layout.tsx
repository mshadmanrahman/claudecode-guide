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
        { text: 'Roadmap', url: '/roadmap' },
        { text: 'Docs', url: '/docs/foundations/claude-md' },
        { text: 'Templates', url: '/docs/templates' },
        {
          text: 'GitHub',
          url: 'https://github.com/mshadmanrahman/claudecode-guide',
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
