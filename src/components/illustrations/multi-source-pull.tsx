import { Mail, Calendar, FileText, ArrowRight, Sparkles } from 'lucide-react';

export function MultiSourcePullIllustration() {
  return (
    <div className="flex items-center gap-3">
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-card px-2 py-1 text-[10px] text-fd-foreground">
          <Mail className="h-3 w-3 text-fd-muted-foreground" /> Recent emails
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-card px-2 py-1 text-[10px] text-fd-foreground">
          <Calendar className="h-3 w-3 text-fd-muted-foreground" /> Last 4 syncs
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-card px-2 py-1 text-[10px] text-fd-foreground">
          <FileText className="h-3 w-3 text-fd-muted-foreground" /> Project notes
        </div>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-fd-muted-foreground" />
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
        <Sparkles className="h-5 w-5 text-orange-500" />
      </div>
    </div>
  );
}
