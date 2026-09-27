'use client';

import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function OsMapLink() {
  return (
    <a
      href="https://shadman-os-map.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-[var(--ink)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
      onClick={() => trackEvent('workflow_os_map_click')}
    >
      See the full system architecture
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}
