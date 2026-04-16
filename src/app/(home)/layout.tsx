import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
    </>
  );
}
