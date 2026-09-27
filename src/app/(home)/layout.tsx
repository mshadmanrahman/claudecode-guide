import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

// `relative isolate` makes this wrapper the box a page's <SceneBackdrop /> fills,
// so the scene runs behind the header and footer as well as the page.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-screen flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
