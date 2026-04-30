import { FilePlus } from 'lucide-react';

export function FileWrittenIllustration() {
  return (
    <div className="w-full max-w-[240px] overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm">
      <div className="flex items-center gap-2 border-b border-fd-border bg-fd-muted/40 px-3 py-1.5">
        <FilePlus className="h-3.5 w-3.5 text-emerald-600" />
        <span className="font-mono text-[10px] text-fd-foreground">
          CLAUDE.md
        </span>
      </div>
      <div className="space-y-1.5 px-3 py-3 font-mono text-[10px] text-fd-muted-foreground">
        <div className="text-fd-foreground"># CLAUDE.md</div>
        <div className="text-fd-foreground">## Project</div>
        <div className="ml-2">Acme Dashboard. Next.js + Drizzle.</div>
        <div className="text-fd-foreground">## Stack</div>
        <div className="ml-2">- TypeScript strict</div>
        <div className="ml-2">- Tailwind v4</div>
        <div className="text-fd-foreground">## Conventions</div>
        <div className="ml-2">...</div>
      </div>
    </div>
  );
}
