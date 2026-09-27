import type { ReactNode } from 'react';
import type { CSSProperties } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SceneBackdrop } from '@/components/scene-backdrop';
import { source } from '@/lib/source';

// `relative isolate` keeps the fixed faded scene (z-index -1) above the body
// background and behind the header, sidebar, article and footer.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="ccg-docs-shell relative isolate flex min-h-screen flex-col">
      <SceneBackdrop variant="faded" position="fixed" />
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
      <SiteFooter />
    </div>
  );
}
