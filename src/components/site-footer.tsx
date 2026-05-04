import Link from 'next/link';
import { Star, ExternalLink } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  heading: string;
  links: ReadonlyArray<FooterLink>;
}

const COLUMNS: ReadonlyArray<FooterColumn> = [
  {
    heading: 'Get started',
    links: [
      { label: 'Compare to other tools', href: '/docs/comparisons' },
      { label: 'Set up CLAUDE.md', href: '/docs/foundations/claude-md' },
      { label: 'Pick the right interface', href: '/docs/foundations/which-interface' },
      { label: 'Browse tutorials', href: '/tutorials' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'Foundations', href: '/docs/foundations' },
      { label: 'Patterns', href: '/docs/patterns' },
      { label: 'Workflows', href: '/docs/workflows' },
      { label: 'Templates', href: '/docs/templates' },
      { label: 'Comparisons', href: '/docs/comparisons' },
    ],
  },
  {
    heading: 'More',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'PM Pilot', href: '/pm-pilot' },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'Journey', href: '/journey' },
      { label: 'বাংলায় পড়ুন', href: '/bn' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-fd-border bg-fd-card/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand column (spans wider) */}
          <div className="md:col-span-4">
            <p className="font-mono text-sm text-fd-foreground">
              claudecodeguide<span className="font-bold">.dev</span>
            </p>
            <p className="mt-4 max-w-sm text-sm text-fd-muted-foreground leading-relaxed">
              The plain-English on-ramp to Claude Code. Built and updated by one person who kept
              explaining the same things to people who&apos;d never touched a terminal.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/mshadmanrahman/claudecode-guide"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="inline-flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-background px-3 py-1.5 text-xs font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
              >
                <Star className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href="https://shadmanrahman.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-background px-3 py-1.5 text-xs font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
              >
                Substack
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <p className="text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-fd-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-fd-muted-foreground">
            Built by{' '}
            <a
              href="https://github.com/mshadmanrahman"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-fd-foreground hover:underline"
            >
              Shadman Rahman
            </a>
            . With ♥️, ☕️, and a lot of Claude Code.
          </p>
          <div className="flex items-center gap-4 text-xs text-fd-muted-foreground">
            <Link href="/sitemap.xml" className="hover:text-fd-foreground transition-colors">
              Sitemap
            </Link>
            <span className="text-fd-border">·</span>
            <Link href="/llms.txt" className="hover:text-fd-foreground transition-colors">
              llms.txt
            </Link>
            <span className="text-fd-border">·</span>
            <span>Free &amp; Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
