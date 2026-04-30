export function SkimOnPhoneIllustration() {
  return (
    <div className="relative h-[200px] w-[120px] overflow-hidden rounded-2xl border border-fd-border bg-fd-background shadow-sm">
      <div className="border-b border-fd-border bg-fd-muted/40 px-2 py-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] text-fd-muted-foreground">
            8:55
          </span>
          <span className="font-mono text-[8px] text-fd-muted-foreground">
            100%
          </span>
        </div>
      </div>
      <div className="space-y-1 px-2 py-2 text-[8px] text-fd-muted-foreground">
        <div className="font-medium text-fd-foreground">1:1 brief: Sarah</div>
        <div className="text-fd-foreground">Recent context</div>
        <div className="ml-1.5">Took over dashboard...</div>
        <div className="text-fd-foreground">Open items</div>
        <div className="ml-1.5">One-pager owed</div>
        <div className="text-fd-foreground">Ask</div>
        <div className="ml-1.5">Q3 headcount?</div>
        <div className="text-fd-foreground">Be ready for</div>
        <div className="ml-1.5">Match Maker scope</div>
      </div>
    </div>
  );
}
