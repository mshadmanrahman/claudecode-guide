'use client';

import { useInView } from '@/hooks/use-in-view';

const MEETING_PREP_SKILL =
  'https://github.com/mshadmanrahman/pm-pilot/blob/main/skills/pm-core/meeting-prep/SKILL.md';
const CLAUDE_DESKTOP_URL = 'https://claude.ai/download';
const GUIDE_URL = 'https://claudecodeguide.dev';
const GIT_DOWNLOAD_URL = 'https://git-scm.com/downloads';

const installCommands = `git clone https://github.com/mshadmanrahman/pm-pilot.git
cd pm-pilot
mkdir -p ~/.claude/skills ~/.claude/rules ~/.claude/agents ~/.claude/commands ~/.claude/memory
cp -r skills/* ~/.claude/skills/
cp -r rules/* ~/.claude/rules/
cp -r agents/* ~/.claude/agents/
cp -r commands/* ~/.claude/commands/
cp memory/MEMORY-TEMPLATE.md ~/.claude/memory/MEMORY.md`;

interface LevelCardProps {
  num: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  inView: boolean;
  delay: number;
}

function LevelCard({ num, title, subtitle, children, inView, delay }: LevelCardProps) {
  return (
    <div
      className={`rounded-xl border border-fd-border bg-fd-card p-8 transition-all duration-500 ${
        inView ? 'animate-slide-up-fade' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="font-mono text-6xl font-light text-fd-border">{num}</span>
      <div className="mt-6 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-fd-foreground">{title}</h3>
        <p className="text-xs font-medium uppercase tracking-widest text-green-600 dark:text-green-400">
          {subtitle}
        </p>
      </div>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-fd-muted-foreground">
        {children}
      </div>
    </div>
  );
}

export function PmPilotGettingStarted() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="bg-fd-muted py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">05</span>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            Three ways to get started
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Pick the level that matches your comfort. You can always upgrade later.
          </p>
        </div>

        <div className="space-y-6">
          {/* Level 1 */}
          <LevelCard num="01" title="Zero install" subtitle="ChatGPT, Gemini, claude.ai" inView={inView} delay={100}>
            <p>
              Go to{' '}
              <span className="font-medium text-fd-foreground">claude.ai</span>,{' '}
              <span className="font-medium text-fd-foreground">ChatGPT</span>, or{' '}
              <span className="font-medium text-fd-foreground">Gemini</span>. Paste the contents
              of any skill file into your conversation. That&apos;s it.
            </p>
            <p>
              You won&apos;t get Jira or Slack integrations, but you&apos;ll instantly see the
              structured thinking PM Pilot brings to every task.
            </p>
            <a
              href={MEETING_PREP_SKILL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-fd-foreground underline underline-offset-2 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Try the meeting-prep skill file
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </LevelCard>

          {/* Level 2 */}
          <LevelCard num="02" title="Claude Desktop" subtitle="5 minute setup" inView={inView} delay={200}>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Download the{' '}
                <a
                  href={CLAUDE_DESKTOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-fd-foreground underline underline-offset-2 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Claude Desktop app
                </a>
              </li>
              <li>
                Open it and go to{' '}
                <span className="font-medium text-fd-foreground">Settings &rarr; Projects</span>
              </li>
              <li>
                Create a new project (e.g. &quot;PM Pilot&quot;)
              </li>
              <li>
                Copy-paste any{' '}
                <a
                  href="https://github.com/mshadmanrahman/pm-pilot/tree/main/skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-fd-foreground underline underline-offset-2 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  skill file
                </a>
                {' '}contents into the project instructions
              </li>
            </ol>
            <p>
              That&apos;s it. Claude Desktop remembers your skills between sessions. No terminal, no command line.
            </p>
          </LevelCard>

          {/* Level 3 */}
          <LevelCard num="03" title="Full CLI with Claude Code" subtitle="Maximum power" inView={inView} delay={300}>
            <p>
              This is the full setup. Live Jira data, Slack threads, calendar context, meeting
              transcripts. Everything PM Pilot was designed for.
            </p>
            <p>
              Follow the{' '}
              <a
                href={GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-fd-foreground underline underline-offset-2 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Claude Code setup guide
              </a>
              , then run:
            </p>
            <div className="overflow-x-auto rounded-lg border border-fd-border bg-fd-background p-4 font-mono text-xs leading-relaxed">
              <pre className="text-fd-foreground">{installCommands}</pre>
            </div>
            <p>
              Then run{' '}
              <code className="rounded bg-fd-background px-1.5 py-0.5 font-mono text-xs text-green-600 dark:text-green-400">
                /configure-pm-pilot
              </code>{' '}
              inside Claude Code to complete setup.
            </p>
            <p className="text-xs text-fd-muted-foreground/70">
              Don&apos;t have git?{' '}
              <a
                href={GIT_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-fd-foreground transition-colors"
              >
                Download it here.
              </a>
            </p>
          </LevelCard>
        </div>
      </div>
    </section>
  );
}
