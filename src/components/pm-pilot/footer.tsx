export function PmPilotFooter() {
  return (
    <footer className="border-t border-fd-border">
      <div className="mx-auto max-w-5xl px-6 py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-fd-muted-foreground">
          <span className="font-mono font-semibold text-fd-foreground">PM Pilot</span>
          <span className="text-fd-border">|</span>
          <span>Built by a PM with 14 years of experience</span>
          <span className="text-fd-border">|</span>
          <span>MIT License</span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-fd-muted-foreground">
          <a
            href="https://github.com/mshadmanrahman/pm-pilot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fd-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/mshadmanrahman/pm-pilot/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fd-foreground transition-colors"
          >
            Contributing
          </a>
          <a
            href="https://claudecodeguide.dev"
            className="hover:text-fd-foreground transition-colors"
          >
            claudecodeguide.dev
          </a>
        </nav>
      </div>
    </footer>
  );
}
