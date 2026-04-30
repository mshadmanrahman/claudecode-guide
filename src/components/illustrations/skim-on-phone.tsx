import { Eye } from 'lucide-react';

export function SkimOnPhoneIllustration() {
  return (
    <div className="w-full max-w-[260px] overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm">
      <div className="flex items-center gap-2 border-b border-fd-border bg-fd-muted/40 px-3 py-1.5">
        <Eye className="h-3.5 w-3.5 text-fd-muted-foreground" />
        <span className="font-mono text-[10px] text-fd-foreground">
          1:1 brief · 30s read
        </span>
      </div>
      <div className="space-y-2 px-3 py-3 text-[10px] text-fd-muted-foreground">
        <div>
          <div className="font-medium text-fd-foreground">Recent context</div>
          <div className="ml-2 mt-0.5">
            Took over{' '}
            <span className="rounded bg-amber-300/40 px-0.5 text-fd-foreground dark:bg-amber-500/20">
              dashboard project
            </span>{' '}
            three weeks ago
          </div>
        </div>
        <div>
          <div className="font-medium text-fd-foreground">Ask today</div>
          <div className="ml-2 mt-0.5">
            <span className="rounded bg-amber-300/40 px-0.5 text-fd-foreground dark:bg-amber-500/20">
              Q3 headcount status?
            </span>
          </div>
        </div>
        <div>
          <div className="font-medium text-fd-foreground">Be ready for</div>
          <div className="ml-2 mt-0.5">
            <span className="rounded bg-amber-300/40 px-0.5 text-fd-foreground dark:bg-amber-500/20">
              Match Maker scope
            </span>{' '}
            question
          </div>
        </div>
      </div>
    </div>
  );
}
