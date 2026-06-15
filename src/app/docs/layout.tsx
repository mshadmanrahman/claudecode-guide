import type { ReactNode } from 'react';
import type { CSSProperties } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { SiteHeader } from '@/components/site-header';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <DocsLayout
        tree={source.pageTree}
        nav={{ enabled: false }}
        sidebar={{ collapsible: false }}
        containerProps={{
          style: { '--fd-banner-height': '3.5rem' } as CSSProperties,
        }}
      >
        {children}
      </DocsLayout>
    </>
  );
}
