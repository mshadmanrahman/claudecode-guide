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
      className={`glass rounded-xl p-8 transition-all motion-reduce:transition-none duration-500 ${
        inView ? 'animate-slide-up-fade' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="font-mono text-xs text-[var(--acc)]" aria-hidden="true">{num}</span>
      <div className="mt-3 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-fd-foreground">{title}</h3>
        <p className="text-sm text-[var(--muted)]">
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
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all motion-reduce:transition-none duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            Three ways in
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Pick what fits where you are right now. You can always go deeper later.
          </p>
        </div>

        <div className="space-y-6">
          {/* Level 1 */}
          <LevelCard num="01" title="Zero install" subtitle="ChatGPT, Gemini, claude.ai" inView={inView} delay={100}>
            <p>
              Open{' '}
              <span className="font-medium text-fd-foreground">claude.ai</span>,{' '}
              <span className="font-medium text-fd-foreground">ChatGPT</span>, or{' '}
              <span className="font-medium text-fd-foreground">Gemini</span>. Copy any skill file
              and paste it straight into the chat. That&apos;s it.
            </p>
            <p>
              No Jira or Slack yet, but you&apos;ll immediately see how structured the output is. Worth 2 minutes to try.
            </p>
            <a
              href={MEETING_PREP_SKILL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm font-medium text-fd-foreground underline underline-offset-2 hover:text-[var(--acc)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
            >
              Open the meeting-prep skill file
              <svg
                className="h-3.5 w-3.5"
                aria-hidden="true"
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
                  className="rounded-sm font-medium text-fd-foreground underline underline-offset-2 hover:text-[var(--acc)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
                >
                  Claude Desktop app
                </a>
              </li>
              <li>
                Open it. Go to{' '}
                <span className="font-medium text-fd-foreground">Settings &rarr; Projects</span>
              </li>
              <li>
                Create a project. Call it &quot;PM Pilot&quot; or whatever you like.
              </li>
              <li>
                Paste any{' '}
                <a
                  href="https://github.com/mshadmanrahman/pm-pilot/tree/main/skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm font-medium text-fd-foreground underline underline-offset-2 hover:text-[var(--acc)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
                >
                  skill file
                </a>
                {' '}into the project instructions
              </li>
            </ol>
            <p>
              Done. Skills persist between sessions. No terminal, ever.
            </p>
          </LevelCard>

          {/* Level 3 */}
          <LevelCard num="03" title="Claude Code CLI" subtitle="Full power" inView={inView} delay={300}>
            <p>
              This is the real thing. Live Jira, Slack threads, calendar, meeting transcripts. I built PM Pilot for this setup; it&apos;s what I actually use.
            </p>
            <p>
              Follow the{' '}
              <a
                href={GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-medium text-fd-foreground underline underline-offset-2 hover:text-[var(--acc)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
              >
                Claude Code setup guide
              </a>
              {' '}to get started, then run:
            </p>
            <div className="overflow-x-auto rounded-lg border border-fd-border bg-[var(--glass2)] p-4 font-mono text-xs leading-relaxed">
              <pre className="text-fd-foreground">{installCommands}</pre>
            </div>
            <p>
              Then run{' '}
              <code className="rounded bg-[var(--glass2)] px-1.5 py-0.5 font-mono text-xs text-[var(--acc)] ">
                /configure-pm-pilot
              </code>{' '}
              inside Claude Code and you&apos;re set.
            </p>
            <p className="text-xs text-[var(--muted)]">
              No git installed?{' '}
              <a
                href={GIT_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm underline underline-offset-2 hover:text-fd-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
              >
                Get it here first.
              </a>
            </p>
          </LevelCard>
        </div>
      </div>
    </section>
  );
}
