import { Folder, FilePlus, Pencil, Sparkles, Check, MessageCircle } from 'lucide-react';

export function ProjectFolderIllustration() {
  return (
    <div className="font-mono text-xs text-fd-muted-foreground">
      <div className="flex items-center gap-2 text-fd-foreground">
        <Folder className="h-4 w-4" /> your-project
      </div>
      <div className="ml-5 mt-2 space-y-1">
        <div>├ package.json</div>
        <div>├ README.md</div>
        <div>├ src/</div>
        <div>└ app/</div>
      </div>
    </div>
  );
}

export function PromptComposerIllustration() {
  return (
    <div className="w-full max-w-[280px] overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm">
      <div className="border-b border-fd-border bg-fd-muted/40 px-3 py-1.5">
        <span className="font-mono text-[10px] text-fd-muted-foreground">
          claude code
        </span>
      </div>
      <div className="px-3 py-3 font-mono text-[11px] leading-relaxed text-fd-foreground">
        I want a CLAUDE.md file for this project. Read the package.json, the
        README, and the top three folders so you understand the stack
        <span className="ml-0.5 inline-block h-3 w-1 animate-blink bg-fd-foreground/60 align-middle" />
      </div>
    </div>
  );
}

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

export function ClaudeKnowsIllustration() {
  return (
    <div className="w-full max-w-[280px] space-y-2">
      <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400">
        <Check className="h-3.5 w-3.5" />
        <span className="font-medium">Memory loaded</span>
        <span className="ml-auto font-mono text-[10px] text-emerald-700/70 dark:text-emerald-400/70">
          your-project
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-3 py-2 text-xs text-fd-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-orange-500" />
        <span>Ready when you are.</span>
      </div>
    </div>
  );
}
