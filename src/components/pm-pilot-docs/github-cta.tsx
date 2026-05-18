'use client';

import { ExternalLink } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface GitHubCtaProps {
  skill: string;
}

export function GitHubCta({ skill }: GitHubCtaProps) {
  const href = `https://github.com/mshadmanrahman/pm-pilot/blob/main/skills/pm-core/${skill}/SKILL.md`;
  return (
    <div className="not-prose mt-10 rounded-xl border border-fd-border bg-fd-card p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground mb-2">Ready to install?</p>
      <p className="text-sm text-fd-muted-foreground mb-4">
        PM Pilot lives on GitHub. Every skill is a plain markdown file you can read, edit, and install in under 5 minutes.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="https://github.com/mshadmanrahman/pm-pilot"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('pm_pilot_github_click', { source: 'skill_page', skill })}
          className="inline-flex items-center gap-2 rounded-lg bg-fd-foreground px-4 py-2.5 text-sm font-semibold text-fd-background hover:opacity-80 transition-opacity"
        >
          Star PM Pilot on GitHub
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('pm_pilot_skill_file_click', { skill })}
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-4 py-2.5 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          View /{skill} skill file
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
