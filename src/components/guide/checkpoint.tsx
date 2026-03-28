'use client';

import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CheckpointProps {
  title: string;
  description: string;
  nextLabel?: string;
  nextHref?: string;
}

export function Checkpoint({ title, description, nextLabel, nextHref }: CheckpointProps) {
  return (
    <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6 text-center">
      <CheckCircle className="mx-auto mb-3 h-8 w-8 text-green-500" />
      <h3 className="font-display text-xl font-normal text-fd-foreground">{title}</h3>
      <p className="mt-2 text-sm text-fd-muted-foreground">{description}</p>
      {nextLabel && nextHref && (
        <Link
          href={nextHref}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
        >
          {nextLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
