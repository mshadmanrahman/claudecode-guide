import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { RouteEngravingBand } from '@/components/route-engraving-band';

export default function PmPilotLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-x-clip">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <RouteEngravingBand />
    </div>
  );
}
