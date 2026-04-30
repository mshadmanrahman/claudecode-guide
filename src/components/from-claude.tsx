import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface FromClaudeProps {
  children: ReactNode;
  label?: string;
}

export function FromClaude({ children, label = 'From Claude' }: FromClaudeProps) {
  return (
    <div className="not-prose my-8 rounded-2xl border border-fd-border bg-fd-card/50 p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-orange-500" />
        <span className="text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
          {label}
        </span>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-fd-foreground [&>p]:my-2 [&>pre]:my-3 [&>ul]:my-2 [&>ol]:my-2 [&>h3]:mt-4 [&>h3]:mb-2 [&>h3]:font-display [&>h3]:text-base">
        {children}
      </div>
    </div>
  );
}
