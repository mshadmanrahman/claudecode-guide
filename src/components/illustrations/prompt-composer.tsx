interface PromptComposerIllustrationProps {
  text?: string;
}

const DEFAULT_TEXT =
  'I want a CLAUDE.md file for this project. Read the package.json, the README, and the top three folders so you understand the stack';

export function PromptComposerIllustration({
  text = DEFAULT_TEXT,
}: PromptComposerIllustrationProps) {
  return (
    <div className="w-full max-w-[280px] overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm">
      <div className="border-b border-fd-border bg-fd-muted/40 px-3 py-1.5">
        <span className="font-mono text-[10px] text-fd-muted-foreground">
          claude code
        </span>
      </div>
      <div className="px-3 py-3 font-mono text-[11px] leading-relaxed text-fd-foreground">
        {text}
        <span className="ml-0.5 inline-block h-3 w-1 animate-blink bg-fd-foreground/60 align-middle" />
      </div>
    </div>
  );
}
