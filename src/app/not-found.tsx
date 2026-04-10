import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-fd-background px-6 text-center">
      <p className="font-mono text-6xl font-bold text-fd-muted-foreground/30">404</p>
      <h1 className="mt-4 font-display text-2xl font-normal tracking-tight text-fd-foreground sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-fd-muted-foreground">
        Looks like this page doesn&apos;t exist. No worries &mdash; here are some good starting points:
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/guide"
          className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
        >
          Start the guided setup
        </Link>
        <Link
          href="/docs/foundations/what-is-claude-code"
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-5 py-2.5 text-sm font-medium text-fd-foreground hover:bg-fd-accent"
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
