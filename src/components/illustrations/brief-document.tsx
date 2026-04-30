import { FileText } from 'lucide-react';

export function BriefDocumentIllustration() {
  return (
    <div className="w-full max-w-[240px] overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm">
      <div className="flex items-center gap-2 border-b border-fd-border bg-fd-muted/40 px-3 py-1.5">
        <FileText className="h-3.5 w-3.5 text-fd-muted-foreground" />
        <span className="font-mono text-[10px] text-fd-foreground">
          1:1 brief · Sarah
        </span>
      </div>
      <div className="space-y-2 px-3 py-3 text-[10px] text-fd-muted-foreground">
        <div>
          <div className="font-medium text-fd-foreground">Recent context</div>
          <div className="ml-2 mt-0.5">Took over dashboard project</div>
        </div>
        <div>
          <div className="font-medium text-fd-foreground">Open items</div>
          <div className="ml-2 mt-0.5">Match Maker one-pager owed</div>
        </div>
        <div>
          <div className="font-medium text-fd-foreground">Ask</div>
          <div className="ml-2 mt-0.5">Q3 headcount status?</div>
        </div>
      </div>
    </div>
  );
}
