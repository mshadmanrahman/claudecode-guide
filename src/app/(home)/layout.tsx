import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { RouteEngravingBand } from '@/components/route-engraving-band';

// `relative isolate` makes this wrapper the box the footer band is anchored to,
// so the band runs on behind the footer whatever height it wraps to.
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-screen flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <RouteEngravingBand />
      <SiteFooter />
    </div>
  );
}
