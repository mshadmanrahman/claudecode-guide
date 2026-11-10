import type { Metadata } from 'next';
import { RootDocument } from '@/components/root-document';
import NotFound from './(en)/not-found';

export const metadata: Metadata = {
  title: 'Page Not Found | Claude Code Guide',
  description: 'This page does not exist. Find Claude Code tutorials, setup guides, and workflow tips at Claude Code Guide.',
  robots: { index: false, follow: true },
};

// English and Bangla have separate root layouts, so unmatched URLs need a
// global 404 that brings its own <html> shell.
export default function GlobalNotFound() {
  return (
    <RootDocument lang="en">
      <NotFound />
    </RootDocument>
  );
}
