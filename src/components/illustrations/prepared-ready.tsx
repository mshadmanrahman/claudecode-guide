import { Check, Sparkles } from 'lucide-react';

export function PreparedReadyIllustration() {
  return (
    <div className="w-full max-w-[280px] space-y-2">
      <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400">
        <Check className="h-3.5 w-3.5" />
        <span className="font-medium">Brief ready</span>
        <span className="ml-auto font-mono text-[10px] text-emerald-700/70 dark:text-emerald-400/70">
          2 min
        </span>
      </div>
      <div className="flex items-start gap-2 rounded-lg border border-fd-border bg-fd-card px-3 py-2 text-xs text-fd-muted-foreground">
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" />
        <span>
          &ldquo;I saw the dashboard handover landed. Want to talk about scope
          today?&rdquo;
        </span>
      </div>
    </div>
  );
}
