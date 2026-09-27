import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SceneBackdrop } from '@/components/scene-backdrop';

export default function PmPilotLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-x-clip">
      <SceneBackdrop variant="faded" scene="harbor" />
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
