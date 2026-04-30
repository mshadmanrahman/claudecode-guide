import { Pencil } from 'lucide-react';

export function FileEditingIllustration() {
  return (
    <div className="w-full max-w-[240px] overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm">
      <div className="flex items-center gap-2 border-b border-fd-border bg-fd-muted/40 px-3 py-1.5">
        <Pencil className="h-3.5 w-3.5 text-amber-600" />
        <span className="font-mono text-[10px] text-fd-foreground">
          CLAUDE.md (editing)
        </span>
      </div>
      <div className="space-y-1.5 px-3 py-3 font-mono text-[10px] text-fd-muted-foreground">
        <div className="text-fd-foreground">## Conventions</div>
        <div className="ml-2 text-fd-foreground">
          - TypeScript strict
          <span className="ml-0.5 inline-block h-3 w-0.5 animate-blink bg-fd-foreground/60 align-middle" />
        </div>
        <div className="ml-2">- No `any`, use `unknown`</div>
        <div className="ml-2">- Conventional commits</div>
      </div>
    </div>
  );
}
