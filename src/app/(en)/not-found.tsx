import type { Metadata } from 'next';
import { NotFoundBody } from '@/components/not-found-body';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'This page does not exist. Find Claude Code tutorials, setup guides, and workflow tips at Claude Code Guide.',
};

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-screen flex-col">
      <NotFoundBody />
      <SiteFooter />
    </div>
  );
}
