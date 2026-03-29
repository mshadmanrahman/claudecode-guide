'use client';

import Link from 'next/link';
import { ArrowRight, RotateCcw, BookOpen } from 'lucide-react';
import { useGuideProgress } from '@/components/guide/use-guide-progress';
import { ProgressBar } from '@/components/guide/progress-bar';
import { GuideStep } from '@/components/guide/guide-step';
import { OsSelector } from '@/components/guide/os-selector';
import { CopyBlock } from '@/components/guide/copy-block';
import { Collapsible } from '@/components/guide/collapsible';
import { Checkpoint } from '@/components/guide/checkpoint';

export default function GuidePage() {
  const progress = useGuideProgress();

  if (!progress.loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-fd-background">
        <div className="font-mono text-sm text-fd-muted-foreground">Loading your progress...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fd-background">
      <ProgressBar
        percent={progress.progressPercent}
        completed={progress.completedCount}
        total={progress.totalSteps}
      />

      {/* Header */}
      <header className="mx-auto max-w-3xl px-6 pt-12 pb-8">
        <div className="flex items-center justify-end gap-4">
          <Link href="/docs/foundations/claude-md" className="flex items-center gap-1.5 text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors">
            <BookOpen className="h-3.5 w-3.5" />
            Full docs
          </Link>
          <button
            type="button"
            onClick={progress.resetProgress}
            className="flex items-center gap-1.5 text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>

        <div className="mt-8 text-center">
          <h1 className="font-display text-4xl font-normal tracking-tight text-fd-foreground sm:text-5xl">
            Let&apos;s get you started.
          </h1>
          <p className="mt-4 text-lg text-fd-muted-foreground">
            9 steps. Check each one off as you go.
            <br />
            Your progress is saved automatically.
          </p>
          <p className="mt-3 text-sm text-fd-muted-foreground">
            Not ready for the terminal?{' '}
            <a href="https://lovable.link/4IOZkKK" target="_blank" rel="noopener noreferrer" className="underline hover:text-fd-foreground transition-colors">
              Try Lovable instead
            </a>{' '}
            (visual AI builder, no code needed, 20% off).
          </p>
        </div>
      </header>

      {/* Guide Content */}
      <main className="mx-auto max-w-3xl space-y-16 px-6 pb-24">

        {/* ═══════════ PHASE 1: Getting Started ═══════════ */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-green-500">Phase 1</span>
            <span className="text-sm text-fd-muted-foreground">Getting Started</span>
          </div>

          <div className="space-y-4">
            {/* Step 1: Install */}
            <GuideStep
              stepId="install"
              number="1"
              title="Install Claude Code"
              completed={progress.isCompleted('install')}
              onToggle={progress.toggleStep}
            >
              <p className="mb-4 text-sm text-fd-muted-foreground">
                First, pick your operating system. You&apos;ll see the exact commands for your machine.
              </p>

              <OsSelector selected={progress.selectedOs} onSelect={progress.setOs} />

              {progress.selectedOs === 'mac' && (
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-fd-muted-foreground">
                    Open Terminal (press <kbd className="rounded border border-fd-border bg-fd-muted px-1.5 py-0.5 font-mono text-xs">Cmd + Space</kbd>, type &quot;Terminal&quot;, hit Enter).
                  </p>
                  <CopyBlock code="npm install -g @anthropic-ai/claude-code" />
                  <p className="text-sm text-fd-muted-foreground">
                    If you don&apos;t have npm, install Node.js first from <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-fd-foreground">nodejs.org</a>.
                  </p>
                  <Collapsible title="Stuck? npm not found?">
                    <p>If you see &quot;npm: command not found&quot;, you need Node.js:</p>
                    <div className="mt-2">
                      <CopyBlock code="brew install node" />
                    </div>
                    <p className="mt-2">No Homebrew? Install it first:</p>
                    <div className="mt-2">
                      <CopyBlock code='/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' />
                    </div>
                  </Collapsible>
                </div>
              )}

              {progress.selectedOs === 'windows' && (
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-fd-muted-foreground">
                    Open PowerShell (press <kbd className="rounded border border-fd-border bg-fd-muted px-1.5 py-0.5 font-mono text-xs">Win + X</kbd>, select &quot;Terminal&quot;).
                  </p>
                  <CopyBlock code="npm install -g @anthropic-ai/claude-code" language="powershell" />
                  <p className="text-sm text-fd-muted-foreground">
                    If you don&apos;t have npm, install Node.js from <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-fd-foreground">nodejs.org</a> (download the LTS version).
                  </p>
                  <Collapsible title="Stuck? Permission errors?">
                    <p>Run PowerShell as Administrator (right-click &gt; Run as Administrator), then try the install command again.</p>
                  </Collapsible>
                </div>
              )}

              {progress.selectedOs === 'linux' && (
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-fd-muted-foreground">Open your terminal and run:</p>
                  <CopyBlock code="npm install -g @anthropic-ai/claude-code" />
                  <Collapsible title="Stuck? Permission denied?">
                    <p>If you get EACCES errors, fix npm permissions:</p>
                    <div className="mt-2">
                      <CopyBlock code={'mkdir -p ~/.npm-global\nnpm config set prefix \'~/.npm-global\'\nexport PATH=~/.npm-global/bin:$PATH'} />
                    </div>
                    <p className="mt-2">Add the export line to your ~/.bashrc or ~/.zshrc to make it permanent.</p>
                  </Collapsible>
                </div>
              )}

              {!progress.selectedOs && (
                <p className="mt-4 text-center text-sm text-fd-muted-foreground">
                  👆 Pick your OS to see install instructions
                </p>
              )}
            </GuideStep>

            {/* Step 2: Choose a plan */}
            <GuideStep
              stepId="plan"
              number="2"
              title="Choose a plan"
              completed={progress.isCompleted('plan')}
              onToggle={progress.toggleStep}
            >
              <p className="mb-4 text-sm text-fd-muted-foreground">
                Claude Code requires a paid plan. Pick one:
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => progress.setPlan('pro')}
                  className={`rounded-lg border-2 p-4 text-left transition-all ${
                    progress.selectedPlan === 'pro'
                      ? 'border-fd-foreground bg-fd-accent'
                      : 'border-fd-border hover:border-fd-muted-foreground'
                  }`}
                >
                  <div className="font-medium text-fd-foreground">Pro</div>
                  <div className="font-mono text-lg font-bold text-fd-foreground">$20/mo</div>
                  <div className="mt-1 text-xs text-fd-muted-foreground">Perfect for getting started</div>
                </button>
                <button
                  type="button"
                  onClick={() => progress.setPlan('max')}
                  className={`rounded-lg border-2 p-4 text-left transition-all ${
                    progress.selectedPlan === 'max'
                      ? 'border-fd-foreground bg-fd-accent'
                      : 'border-fd-border hover:border-fd-muted-foreground'
                  }`}
                >
                  <div className="font-medium text-fd-foreground">Max</div>
                  <div className="font-mono text-lg font-bold text-fd-foreground">$100/mo</div>
                  <div className="mt-1 text-xs text-fd-muted-foreground">For heavy daily use</div>
                </button>
              </div>

              <p className="mt-4 text-sm text-fd-muted-foreground">
                Our recommendation: <strong className="text-fd-foreground">start with Pro</strong>. Upgrade later if you hit rate limits.{' '}
                <Link href="/docs/comparisons/pro-vs-max" className="underline hover:text-fd-foreground">Read the full comparison</Link>.
              </p>

              <a
                href="https://claude.ai/upgrade"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
              >
                Get Claude {progress.selectedPlan === 'max' ? 'Max' : 'Pro'}
                <ArrowRight className="h-4 w-4" />
              </a>
            </GuideStep>

            {/* Step 3: First prompt */}
            <GuideStep
              stepId="first-prompt"
              number="3"
              title="Write your first prompt"
              completed={progress.isCompleted('first-prompt')}
              onToggle={progress.toggleStep}
            >
              <p className="mb-4 text-sm text-fd-muted-foreground">
                Navigate to any project folder (or create one), then start Claude Code:
              </p>
              <CopyBlock code={'mkdir my-first-project && cd my-first-project\nclaude'} />
              <p className="my-4 text-sm text-fd-muted-foreground">
                Claude Code will start. Try your first prompt:
              </p>
              <CopyBlock code='"Create a simple HTML page that says Hello World with a nice design"' language="prompt" />
              <p className="mt-4 text-sm text-fd-muted-foreground">
                Watch it work. It will create the file, write the code, and you can open it in your browser. That&apos;s it. You just built something with AI.
              </p>

              <Collapsible title="Stuck? Claude Code won't start?">
                <p>Make sure you&apos;re logged in. Run <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-xs">claude auth login</code> and follow the prompts to connect your Anthropic account.</p>
              </Collapsible>
            </GuideStep>
          </div>

          {progress.isCompleted('install') && progress.isCompleted('plan') && progress.isCompleted('first-prompt') && (
            <div className="mt-6">
              <Checkpoint
                title="Phase 1 complete!"
                description="You've installed Claude Code, picked a plan, and written your first prompt. You're officially in the game."
              />
            </div>
          )}
        </section>

        {/* ═══════════ PHASE 2: Set Up Your Workspace ═══════════ */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-blue-500">Phase 2</span>
            <span className="text-sm text-fd-muted-foreground">Set Up Your Workspace</span>
          </div>

          <div className="space-y-4">
            {/* Step 4: CLAUDE.md */}
            <GuideStep
              stepId="claude-md"
              number="4"
              title="Create your CLAUDE.md"
              completed={progress.isCompleted('claude-md')}
              onToggle={progress.toggleStep}
            >
              <p className="mb-4 text-sm text-fd-muted-foreground">
                CLAUDE.md is the most important file in your project. It tells Claude Code how to behave. Create one in your project root:
              </p>
              <CopyBlock code={`# CLAUDE.md

## Project Overview
Describe your project here. What is it? What tech stack?

## Build Commands
\`\`\`bash
npm run dev    # Start dev server
npm run build  # Production build
npm run test   # Run tests
\`\`\`

## Code Style
- TypeScript strict mode
- Prefer immutable patterns
- Functions under 50 lines

## Communication
- Be direct. Show code, not explanations.
- When suggesting changes, edit the file directly.`} language="markdown" />
              <p className="mt-4 text-sm text-fd-muted-foreground">
                This is a starter. You&apos;ll customize it over time.{' '}
                <Link href="/docs/foundations/claude-md" className="underline hover:text-fd-foreground">Read the full CLAUDE.md guide</Link>.
              </p>
            </GuideStep>

            {/* Step 5: Memory */}
            <GuideStep
              stepId="memory"
              number="5"
              title="Set up memory"
              completed={progress.isCompleted('memory')}
              onToggle={progress.toggleStep}
            >
              <p className="mb-4 text-sm text-fd-muted-foreground">
                Memory lets Claude Code remember you across sessions. Create a memory index:
              </p>
              <CopyBlock code={'mkdir -p .claude/memory\ntouch .claude/memory/MEMORY.md'} />
              <p className="my-4 text-sm text-fd-muted-foreground">
                Now tell Claude Code about yourself. Start a session and say:
              </p>
              <CopyBlock code={'"Remember that I\'m a [your role] working on [your project]. I prefer [your communication style]."'} language="prompt" />
              <p className="mt-4 text-sm text-fd-muted-foreground">
                Claude Code will save this to memory. Next session, it already knows who you are.{' '}
                <Link href="/docs/foundations/memory-system" className="underline hover:text-fd-foreground">Learn more about memory</Link>.
              </p>
            </GuideStep>

            {/* Step 6: Handoff */}
            <GuideStep
              stepId="handoff"
              number="6"
              title="Write your first handoff"
              completed={progress.isCompleted('handoff')}
              onToggle={progress.toggleStep}
            >
              <p className="mb-4 text-sm text-fd-muted-foreground">
                At the end of each session, write a short handoff so the next session picks up where you left off. Just tell Claude Code:
              </p>
              <CopyBlock code={'"Write a handoff for this session. What did we do, what\'s next, and any key decisions."'} language="prompt" />
              <p className="mt-4 text-sm text-fd-muted-foreground">
                This 30-second habit saves 10 minutes of re-explaining next time.{' '}
                <Link href="/docs/foundations/session-lifecycle" className="underline hover:text-fd-foreground">Learn about session lifecycle</Link>.
              </p>
            </GuideStep>
          </div>

          {progress.isCompleted('claude-md') && progress.isCompleted('memory') && progress.isCompleted('handoff') && (
            <div className="mt-6">
              <Checkpoint
                title="Phase 2 complete!"
                description="You have a configured workspace with memory and handoffs. Sessions now compound over time instead of starting from scratch."
              />
            </div>
          )}
        </section>

        {/* ═══════════ PHASE 3: Build Your Flow ═══════════ */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-purple-500">Phase 3</span>
            <span className="text-sm text-fd-muted-foreground">Build Your Flow</span>
          </div>

          <div className="space-y-4">
            {/* Step 7: Daily practice */}
            <GuideStep
              stepId="daily-practice"
              number="7"
              title="Establish your daily practice"
              completed={progress.isCompleted('daily-practice')}
              onToggle={progress.toggleStep}
            >
              <p className="mb-4 text-sm text-fd-muted-foreground">
                The difference between &quot;I use Claude Code sometimes&quot; and &quot;I can&apos;t work without it&quot; comes down to daily habits:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 rounded-lg bg-fd-muted/50 p-3">
                  <span className="shrink-0 text-green-500">AM</span>
                  <p className="text-fd-muted-foreground">Start session. Memory loads automatically. Check what&apos;s next from your last handoff.</p>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-fd-muted/50 p-3">
                  <span className="shrink-0 text-blue-500">Work</span>
                  <p className="text-fd-muted-foreground">Use Claude Code for tasks. When it makes a mistake, correct it (the correction gets saved).</p>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-fd-muted/50 p-3">
                  <span className="shrink-0 text-amber-500">PM</span>
                  <p className="text-fd-muted-foreground">Write a handoff before closing. 30 seconds. Tomorrow starts warm.</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-fd-muted-foreground">
                <Link href="/docs/workflows/daily-practice" className="underline hover:text-fd-foreground">Read the full daily practice guide</Link>.
              </p>
            </GuideStep>

            {/* Step 8: First skill */}
            <GuideStep
              stepId="first-skill"
              number="8"
              title="Create your first skill"
              completed={progress.isCompleted('first-skill')}
              onToggle={progress.toggleStep}
            >
              <p className="mb-4 text-sm text-fd-muted-foreground">
                A skill turns a multi-step task into a single command. Think of something you explain to Claude Code repeatedly, then encode it:
              </p>
              <CopyBlock code={'mkdir -p .claude/skills'} />
              <p className="my-4 text-sm text-fd-muted-foreground">
                Create a simple skill file. Here&apos;s an example &quot;code review&quot; skill:
              </p>
              <CopyBlock code={`# Code Review

Review the code I just changed for quality, bugs, and style.

## Steps
1. Run \`git diff\` to see what changed
2. Read each modified file
3. Check for: bugs, security issues, style violations, missing tests
4. Report findings as: Critical / Warning / Suggestion

## Output Format
List each finding with the file, line, severity, and a one-line fix.`} language="markdown" />
              <p className="mt-4 text-sm text-fd-muted-foreground">
                Save this as <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-xs">.claude/skills/code-review.md</code>.{' '}
                <Link href="/docs/patterns/skills" className="underline hover:text-fd-foreground">Learn more about skills</Link>.
              </p>
            </GuideStep>

            {/* Step 9: Connect a tool */}
            <GuideStep
              stepId="connect-tool"
              number="9"
              title="Connect an external tool"
              completed={progress.isCompleted('connect-tool')}
              onToggle={progress.toggleStep}
            >
              <p className="mb-4 text-sm text-fd-muted-foreground">
                MCP servers let Claude Code talk to your other tools. The easiest first connection is GitHub:
              </p>
              <CopyBlock code={`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "$GITHUB_TOKEN"
      }
    }
  }
}`} language="json" />
              <p className="my-4 text-sm text-fd-muted-foreground">
                Save this as <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-xs">.mcp.json</code> in your project root. Set your <code className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-xs">GITHUB_TOKEN</code> environment variable. Then try:
              </p>
              <CopyBlock code={'"List my open pull requests"'} language="prompt" />

              <Collapsible title="Don't use GitHub? Skip this step.">
                <p>MCP is optional. You can always add it later. The guide continues without it. Just check the box above to move on.</p>
              </Collapsible>

              <p className="mt-4 text-sm text-fd-muted-foreground">
                <Link href="/docs/patterns/mcp-servers" className="underline hover:text-fd-foreground">See all available MCP servers</Link>.
              </p>
            </GuideStep>
          </div>

          {progress.isCompleted('daily-practice') && progress.isCompleted('first-skill') && progress.isCompleted('connect-tool') && (
            <div className="mt-6">
              <Checkpoint
                title="You're a practitioner now. 🎉"
                description="You have a configured workspace, daily habits, custom skills, and connected tools. You're no longer a beginner."
                nextLabel="Explore the full docs"
                nextHref="/docs/foundations/claude-md"
              />
            </div>
          )}
        </section>

        {/* ═══════════ What's Next ═══════════ */}
        <section className="rounded-xl border border-fd-border bg-fd-card p-8">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            What comes next
          </h2>
          <p className="mt-2 mb-6 text-sm text-fd-muted-foreground">
            You&apos;ve completed the guided setup. Here&apos;s where to go deeper:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: 'Hooks', desc: 'Automate quality checks', href: '/docs/patterns/hooks' },
              { title: 'Sub-Agents', desc: 'Delegate focused tasks', href: '/docs/patterns/agents' },
              { title: 'Team Adoption', desc: 'Roll out to your team', href: '/docs/workflows/team-adoption' },
              { title: 'Templates', desc: 'Copy-paste configs', href: '/docs/templates' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 rounded-lg border border-fd-border p-4 transition-colors hover:bg-fd-accent"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-fd-foreground group-hover:underline">{item.title}</div>
                  <div className="text-xs text-fd-muted-foreground">{item.desc}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Spacer for HomeLayout footer */}
      <div className="pb-12" />
    </div>
  );
}
