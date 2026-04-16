import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { getSections } from '@/lib/docs-navigation';

export default function Layout({ children }: { children: ReactNode }) {
  const sections = getSections();

  return (
    <>
      <SiteHeader docsSections={sections} />
      <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
    </>
  );
}
