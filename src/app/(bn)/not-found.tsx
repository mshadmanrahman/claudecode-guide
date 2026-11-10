import type { Metadata } from 'next';
import { NotFoundBody } from '@/components/not-found-body';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'This page does not exist. Find Claude Code tutorials, setup guides, and workflow tips at Claude Code Guide.',
};

// The (bn) root layout already renders the header and footer around this.
export default function NotFound() {
  return <NotFoundBody />;
}
