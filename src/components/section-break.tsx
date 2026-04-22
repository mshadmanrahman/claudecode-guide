import type { ReactNode } from 'react';

interface SectionBreakProps {
  number: string;
  kicker: string;
  title: string;
  children?: ReactNode;
}

export function SectionBreak({
  number,
  kicker,
  title,
  children,
}: SectionBreakProps) {
  return (
    <div className="my-16">
      <div className="mb-12 border-t border-dashed border-fd-border" />
      <div className="mb-3 flex items-baseline gap-4">
        <span className="font-display text-5xl font-normal tracking-tight text-fd-border">
          {number}
        </span>
        <span className="text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
          {kicker}
        </span>
      </div>
      <h2 className="m-0 font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-fd-muted-foreground">{children}</div>
      ) : null}
    </div>
  );
}
