import type { ReactNode } from 'react';
import { PmPilotSidebar } from '@/components/pm-pilot-docs/sidebar';

export default function PmPilotGuideLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl px-4 sm:px-6">
      <aside className="hidden lg:block w-56 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-fd-border">
        <PmPilotSidebar />
      </aside>
      <div className="min-w-0 flex-1 px-6 py-10 lg:px-10">
        {children}
      </div>
    </div>
  );
}
