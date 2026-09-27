'use client';

import { useInView } from '@/hooks/use-in-view';

const GRANOLA_AFFILIATE = 'https://www.granola.ai?via=shadman-rahman';

interface Integration {
  name: string;
  skills: string;
  link: string;
  linkLabel: string;
}

const integrations: Integration[] = [
  {
    name: 'Jira / Confluence',
    skills: 'meeting-prep, weekly-status, deep-context',
    link: 'https://www.npmjs.com/package/@anthropic-ai/claude-code-mcp-atlassian',
    linkLabel: 'Atlassian MCP',
  },
  {
    name: 'Slack',
    skills: 'meeting-prep, weekly-status, deep-context',
    link: 'https://www.npmjs.com/package/@anthropic-ai/claude-code-mcp-slack',
    linkLabel: 'Slack MCP',
  },
  {
    name: 'Google Calendar',
    skills: 'meeting-prep (knows your schedule)',
    link: 'https://www.npmjs.com/package/@anthropic-ai/claude-code-mcp-google-calendar',
    linkLabel: 'Google Calendar MCP',
  },
  {
    name: 'GitHub',
    skills: 'weekly-status, code context',
    link: 'https://github.com/github/github-mcp-server',
    linkLabel: 'GitHub MCP',
  },
  {
    name: 'Granola',
    skills: 'people-sync (meeting transcripts)',
    link: GRANOLA_AFFILIATE,
    linkLabel: 'Get Granola',
  },
];

export function PmPilotIntegrations() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all motion-reduce:transition-none duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            Connect your work tools
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Claude Code CLI only. This is where PM Pilot goes from &quot;useful&quot; to &quot;I can&apos;t work without it.&quot;
          </p>
        </div>

        <div className="space-y-4">
          {integrations.map((item, i) => (
            <div
              key={item.name}
              className={`flex flex-col gap-3 glass rounded-xl p-6 sm:flex-row sm:items-center sm:justify-between transition-all motion-reduce:transition-none duration-500 ${
                inView ? 'animate-slide-up-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 80 + 100}ms` }}
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-fd-foreground">{item.name}</h3>
                <p className="text-xs text-fd-muted-foreground">{item.skills}</p>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 self-start rounded-sm text-xs font-medium text-fd-foreground underline underline-offset-2 hover:text-[var(--acc)] transition-colors sm:self-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
              >
                {item.linkLabel} &rarr;
              </a>
            </div>
          ))}
        </div>

        <div
          className={`mt-10 glass rounded-xl p-6 transition-all motion-reduce:transition-none duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
          style={{ animationDelay: '600ms' }}
        >
          <p className="text-sm text-fd-muted-foreground leading-relaxed">
            <span className="font-medium text-fd-foreground">No integrations yet?</span>{' '}
            Skills like market-sizing, prd, prioritize, and critique don&apos;t need any of this. They work the moment you install PM Pilot.
          </p>
        </div>
      </div>
    </section>
  );
}
