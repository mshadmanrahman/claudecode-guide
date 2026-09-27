export function PmPilotFooter() {
  return (
    <footer className="border-t border-fd-border">
      <div className="mx-auto max-w-5xl px-6 py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-fd-muted-foreground">
          <span className="font-mono font-semibold text-fd-foreground">PM Pilot</span>
          <span className="text-fd-border" aria-hidden="true">|</span>
          <span>Built by a PM, for PMs</span>
          <span className="text-fd-border" aria-hidden="true">|</span>
          <span>MIT License</span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fd-muted-foreground">
          <a
            href="https://github.com/mshadmanrahman/pm-pilot"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm hover:text-fd-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          >
            GitHub
          </a>
          <a
            href="https://github.com/mshadmanrahman/pm-pilot/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm hover:text-fd-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          >
            Contributing
          </a>
          <a
            href="https://claudecodeguide.dev"
            className="rounded-sm hover:text-fd-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          >
            claudecodeguide.dev
          </a>
        </nav>
      </div>
    </footer>
  );
}
