import { Calendar } from 'lucide-react';

export function CalendarEventIllustration() {
  return (
    <div className="w-full max-w-[260px] overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm">
      <div className="flex items-center gap-2 border-b border-fd-border bg-fd-muted/40 px-3 py-1.5">
        <Calendar className="h-3.5 w-3.5 text-fd-muted-foreground" />
        <span className="text-[10px] font-medium text-fd-foreground">
          Friday
        </span>
      </div>
      <div className="space-y-1 p-2">
        <div className="rounded bg-fd-muted/40 px-2 py-1 text-[10px] text-fd-muted-foreground">
          8:30 · Standup
        </div>
        <div className="rounded border border-orange-500/30 bg-orange-500/15 px-2 py-1 text-[10px] font-medium text-fd-foreground">
          9:00 · 1:1 with Sarah
        </div>
        <div className="rounded bg-fd-muted/40 px-2 py-1 text-[10px] text-fd-muted-foreground">
          10:00 · Product sync
        </div>
      </div>
    </div>
  );
}
