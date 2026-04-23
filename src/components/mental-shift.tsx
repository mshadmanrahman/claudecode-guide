import type { ReactNode } from 'react';

interface MentalShiftProps {
  number: string;
  headline: string;
  children: ReactNode;
}

export function MentalShift({ number, headline, children }: MentalShiftProps) {
  return (
    <div className="rounded-xl border border-fd-border bg-fd-card/40 p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="font-display text-3xl font-normal tracking-tight text-fd-primary">
          {number}
        </span>
        <span className="text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
          Shift
        </span>
      </div>
      <h3 className="m-0 mb-3 font-display text-lg font-normal tracking-tight text-fd-foreground">
        {headline}
      </h3>
      <div className="space-y-3 text-sm leading-relaxed text-fd-muted-foreground">
        {children}
      </div>
    </div>
  );
}

export function MentalShiftsGrid({ children }: { children: ReactNode }) {
  return <div className="my-8 grid gap-4 sm:grid-cols-2">{children}</div>;
}
