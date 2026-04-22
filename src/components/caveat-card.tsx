import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface CaveatCardProps {
  headline: string;
  children: ReactNode;
}

export function CaveatCard({ headline, children }: CaveatCardProps) {
  return (
    <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.04] p-5">
      <div className="mb-2 flex items-start gap-2">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-500" />
        <p className="m-0 text-sm font-semibold text-fd-foreground">
          {headline}
        </p>
      </div>
      <div className="pl-6 text-sm leading-relaxed text-fd-muted-foreground">
        {children}
      </div>
    </div>
  );
}

export function CaveatList({ children }: { children: ReactNode }) {
  return <div className="my-6 grid gap-3 sm:grid-cols-2">{children}</div>;
}
