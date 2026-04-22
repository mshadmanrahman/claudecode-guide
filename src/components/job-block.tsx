import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface JobBlockProps {
  icon: LucideIcon;
  question: string;
  pickLabel: string;
  pickHref?: string;
  children: ReactNode;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function JobBlock({
  icon: Icon,
  question,
  pickLabel,
  pickHref,
  children,
}: JobBlockProps) {
  const id = slugify(question);

  return (
    <div className="my-6 rounded-xl border border-fd-border bg-fd-card/40 p-5">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3
          id={id}
          className="m-0 scroll-mt-20 text-base font-semibold text-fd-foreground"
        >
          {question}
        </h3>
      </div>
      <p className="mb-3 text-sm font-semibold text-fd-primary">
        →{' '}
        {pickHref ? (
          <a href={pickHref} className="underline hover:opacity-80">
            {pickLabel}
          </a>
        ) : (
          pickLabel
        )}
      </p>
      <div className="space-y-3 text-sm leading-relaxed text-fd-muted-foreground">
        {children}
      </div>
    </div>
  );
}
