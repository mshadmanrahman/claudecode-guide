import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

export default function PmPilotLayout({ children }: { children: ReactNode }) {
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
        { text: 'Start Here', url: '/start' },
        { text: 'Tutorials', url: '/tutorials' },
        { text: 'PM Pilot', url: '/pm-pilot' },
        { text: 'Docs', url: '/docs' },
        { text: 'Blog', url: '/blog' },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
