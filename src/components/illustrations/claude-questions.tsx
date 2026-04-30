import { MessageCircle } from 'lucide-react';

export function ClaudeQuestionsIllustration() {
  return (
    <div className="w-full max-w-[280px] space-y-2">
      <div className="flex items-start gap-2">
        <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
        <div className="rounded-lg border border-fd-border bg-fd-card px-3 py-2 text-xs text-fd-foreground">
          Vitest for unit, Playwright for e2e. Right call?
        </div>
      </div>
      <div className="flex items-start gap-2">
        <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
        <div className="rounded-lg border border-fd-border bg-fd-card px-3 py-2 text-xs text-fd-foreground">
          You said no Prisma. Should I also rule out raw SQL?
        </div>
      </div>
    </div>
  );
}
