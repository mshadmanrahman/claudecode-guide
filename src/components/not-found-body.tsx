import Link from 'next/link';

/** The 404 message and its way-out links, shared by every not-found page. */
export function NotFoundBody() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="font-mono text-display leading-[1.1] font-semibold text-[var(--acc)]">404</p>
      <h1 className="mt-4 font-display text-headline leading-[1.1] font-semibold tracking-[-0.035em] text-fd-foreground">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-fd-muted-foreground">
        This page doesn&apos;t exist. Here are some places to start instead:
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/guide"
          className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium"
        >
          Start the guided setup
        </Link>
        <Link
          href="/docs/foundations/what-is-claude-code"
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-[var(--glass2)] px-5 py-2.5 text-sm font-medium text-fd-foreground hover:bg-fd-accent"
        >
          What is Claude Code?
        </Link>
        <Link
          href="/"
          className="text-sm text-fd-muted-foreground underline hover:text-fd-foreground"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
