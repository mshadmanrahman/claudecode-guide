import { ArrowUpRight } from 'lucide-react';

export function AuthorBio() {
  return (
    <aside className="not-prose my-12 rounded-2xl border border-fd-border bg-fd-card/50 p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fd-foreground text-base font-medium text-fd-background"
          aria-hidden
        >
          SR
        </div>
        <div className="flex-1">
          <p className="font-display text-lg text-fd-foreground">
            Shadman Rahman
          </p>
          <p className="mt-1 text-sm leading-relaxed text-fd-muted-foreground">
            Principal Product Manager at Keystone Education Group, leading
            product for Student Experience and Search. Designer by training,
            PM for fifteen years, builder by night. He writes the Claude Code
            Guide because most docs tell you what Claude Code is, not how to
            actually live with it.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <a
              href="https://www.linkedin.com/in/shadmanrahman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-fd-foreground hover:underline"
            >
              LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a
              href="https://shadmanrahman.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-fd-foreground hover:underline"
            >
              Substack <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a
              href="https://github.com/mshadmanrahman"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-fd-foreground hover:underline"
            >
              GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
