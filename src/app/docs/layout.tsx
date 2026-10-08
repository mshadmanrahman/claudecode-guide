import type { ReactNode } from 'react';
import type { CSSProperties } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { RouteEngravingBand } from '@/components/route-engraving-band';
import { source } from '@/lib/source';

// `relative isolate` keeps the footer band (z-index -1) above the body
// background and anchors it to the bottom of the shell.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="ccg-docs-shell relative isolate flex min-h-screen flex-col">
      <SiteHeader />
      <DocsLayout
        tree={source.pageTree}
        nav={{ enabled: false }}
        containerProps={{
          style: { '--fd-banner-height': 'var(--site-header-h)' } as CSSProperties,
        }}
      >
        {children}
      </DocsLayout>
      <RouteEngravingBand />
      <SiteFooter />
    </div>
  );
}
