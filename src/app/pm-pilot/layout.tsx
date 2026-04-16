import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';

export default function PmPilotLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
    </>
  );
}
