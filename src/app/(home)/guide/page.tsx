'use client';

import Link from 'next/link';
import { ArrowRight, RotateCcw, BookOpen, Bug, Lightbulb, MessageSquare } from 'lucide-react';
import { useGuideProgress } from '@/components/guide/use-guide-progress';
import { ProgressBar } from '@/components/guide/progress-bar';
import { GuideStep } from '@/components/guide/guide-step';
import { OsSelector } from '@/components/guide/os-selector';
import { IdeSelector } from '@/components/guide/ide-selector';
import { CopyBlock } from '@/components/guide/copy-block';
import { Collapsible } from '@/components/guide/collapsible';
import { Checkpoint } from '@/components/guide/checkpoint';
import { ClaudeDesktopCodeMock } from '@/components/claude-desktop-code-mock';
import { ClaudeCodeMock, type CliStep } from '@/components/claude-code-mock';
import { AffiliateCTA } from '@/components/affiliate-cta';
import { DeprecationBanner } from '@/components/deprecation-banner';
import { getAffiliateCtasForPage } from '@/lib/affiliate-cta-config';

import { KineticText } from '@/components/kinetic-text';

export default function GuidePage() {
  const progress = useGuideProgress();
  // Most readers never open a terminal, so the Claude app is the default path.
  const ide = progress.selectedIde ?? 'app';
  const usesTerminal = ide === 'terminal' || ide === 'cursor';
  // One script per step: the app's Code tab by default, the CLI only for readers who chose it.
  const session = (steps: CliStep[], title: string) =>
    usesTerminal ? <ClaudeCodeMock steps={steps} cwd="~/my-first-project" /> : <ClaudeDesktopCodeMock steps={steps} title={title} folder="my-first-project" />;
  const ctas = getAffiliateCtasForPage('guide');
  const inlineCta = ctas.find((cta) => cta.placement === 'inline');
  const midBannerCta = ctas.find((cta) => cta.placement === 'mid-banner');
  const endCardCta = ctas.find((cta) => cta.placement === 'end-card');

  // Banner and header render before progress loads so the server HTML has the h1.
  const banner = (
    <DeprecationBanner
      message="There's a better way to start now. The new guided setup walks you through everything, step by step, in under 5 minutes."
      linkText="Try the new Start Here"
      linkHref="/start"
    />
  );

  const header = (
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
        <h1 className="font-display text-display-article leading-[1.1] font-semibold tracking-[-0.035em] text-fd-foreground">
          <KineticText>Let&apos;s get you running.</KineticText>
        </h1>
        <p className="hm-rise mt-4 text-lead text-fd-muted-foreground">
          9 steps. Check each one off as you go.
          <br />
          Progress saves automatically so you can come back anytime.
        </p>
        <p className="mt-3 text-sm text-fd-muted-foreground">
          Works in the Claude app, VS Code, Cursor, JetBrains, or the terminal.
          <br />
          Not ready for any of that?{' '}
          <a href="https://lovable.link/4IOZkKK" target="_blank" rel="noopener noreferrer" className="underline hover:text-fd-foreground transition-colors">
            Start without a terminal
          </a>{' '}
          (visual AI builder, no code needed, 20% off).
        </p>
      </div>
    </header>
  );

  if (!progress.loaded) {
    return (
      <div className="min-h-screen">
        {banner}
        {null /* progress bar slot: keeps header mounted once progress loads */}
        {header}
        <div className="flex min-h-screen items-center justify-center">
          <div className="font-mono text-sm text-fd-muted-foreground">Loading your progress...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {banner}
      {progress.completedCount > 0 && (
        <ProgressBar
          percent={progress.progressPercent}
          completed={progress.completedCount}
          total={progress.totalSteps}
        />
      )}

      {/* Header */}
      {header}

      {/* Guide Content */}
      <main className="mx-auto max-w-3xl space-y-16 px-6 pb-24">
        {inlineCta ? <AffiliateCTA {...inlineCta} /> : null}

        {/* ═══════════ PHASE 1: Getting Started ═══════════ */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-[var(--acc)]">Phase 1</span>
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
                How do you write code? Pick your setup and I&apos;ll show you the fastest path.
              </p>

              <IdeSelector selected={ide} onSelect={progress.setIde} />

              {/* Claude app path, the default: download, sign in, open the Code tab */}
              {ide === 'app' && (
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg border-2 border-[var(--line)] bg-[var(--chip)] p-4">
                    <p className="text-sm font-medium text-fd-foreground">
                      The easiest way in. No terminal, nothing to type into a black window.
                    </p>
                    <p className="mt-1 text-xs text-fd-muted-foreground">
                      Claude Code lives in the Code tab of the Claude desktop app, on Mac and Windows.
                    </p>
                  </div>
                  <ol className="list-decimal space-y-2 pl-5 text-sm text-fd-muted-foreground">
                    <li>
                      Go to{' '}
                      <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" className="underline hover:text-fd-foreground">claude.ai/download</a>{' '}
                      and download the app for Mac or Windows.
                    </li>
                    <li>Install it, open it and sign in.</li>
                    <li>Click the <strong>Code</strong> tab at the top of the window.</li>
                  </ol>
                </div>
              )}

              {/* VS Code path, extension install, no terminal needed */}
              {ide === 'vscode' && (
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg border-2 border-[var(--line)] bg-[var(--chip)] p-4">
                    <p className="text-sm font-medium text-fd-foreground">
                      Good news. VS Code has a one-click extension.
                    </p>
                    <p className="mt-1 text-xs text-fd-muted-foreground">
                      No terminal commands needed. The extension does the whole setup.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-fd-muted-foreground">
                      <strong>Option A:</strong> Open VS Code, press <kbd className="rounded border border-fd-border bg-[var(--code)] px-1.5 py-0.5 font-mono text-xs">Cmd/Ctrl + Shift + X</kbd>, search &quot;Claude Code&quot;, click Install.
                    </p>
                    <p className="text-sm text-fd-muted-foreground">
                      <strong>Option B:</strong> Or install from the{' '}
                      <a href="https://marketplace.visualstudio.com/items?itemName=anthropics.claude-code" target="_blank" rel="noopener noreferrer" className="underline hover:text-fd-foreground">VS Code Marketplace</a>.
                    </p>
                  </div>
                  <Collapsible title="Also want the terminal version?">
                    <p className="mb-2">The extension is enough to get started. But if you also want Claude Code in your terminal:</p>
                    <CopyBlock code="npm install -g @anthropic-ai/claude-code" />
                    <p className="mt-2">Need npm? Install Node.js from <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-fd-foreground">nodejs.org</a> first.</p>
                  </Collapsible>
                </div>
              )}

              {/* Cursor path */}
              {ide === 'cursor' && (
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg border-2 border-[var(--line)] bg-[var(--chip)] p-4">
                    <p className="text-sm font-medium text-fd-foreground">
                      Cursor already has Claude baked in, but Claude Code adds real agent mode.
                    </p>
                    <p className="mt-1 text-xs text-fd-muted-foreground">
                      Install the CLI to unlock skills, memory, MCP, and everything else.
                    </p>
                  </div>
                  <p className="text-sm text-fd-muted-foreground">
                    Open Cursor&apos;s integrated terminal (<kbd className="rounded border border-fd-border bg-[var(--code)] px-1.5 py-0.5 font-mono text-xs">Ctrl + `</kbd>) and run:
                  </p>
                  <CopyBlock code="npm install -g @anthropic-ai/claude-code" />
                  <p className="text-sm text-fd-muted-foreground">
                    If you don&apos;t have npm, install Node.js first from <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-fd-foreground">nodejs.org</a>.
                  </p>
                  <Collapsible title="Stuck? npm not found in Cursor?">
                    <p>Close and reopen Cursor after installing Node.js. The terminal needs to refresh its PATH.</p>
                  </Collapsible>
                </div>
              )}

              {/* JetBrains path */}
              {ide === 'jetbrains' && (
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg border-2 border-[var(--line)] bg-[var(--chip)] p-4">
                    <p className="text-sm font-medium text-fd-foreground">
                      JetBrains IDEs have a Claude Code plugin.
                    </p>
                    <p className="mt-1 text-xs text-fd-muted-foreground">
                      Works with IntelliJ IDEA, WebStorm, PyCharm, and all other JetBrains IDEs.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-fd-muted-foreground">
                      <strong>Option A:</strong> In your JetBrains IDE, go to Settings → Plugins → Marketplace, search &quot;Claude Code&quot;, click Install.
                    </p>
                    <p className="text-sm text-fd-muted-foreground">
                      <strong>Option B:</strong> Or install from the{' '}
                      <a href="https://plugins.jetbrains.com/plugin/claude-code" target="_blank" rel="noopener noreferrer" className="underline hover:text-fd-foreground">JetBrains Marketplace</a>.
                    </p>
                  </div>
                  <Collapsible title="Also want the terminal version?">
                    <p className="mb-2">The plugin is enough to get started. For the CLI version too:</p>
                    <CopyBlock code="npm install -g @anthropic-ai/claude-code" />
                  </Collapsible>
                </div>
              )}

              {/* Terminal path, the original flow with OS selector */}
              {ide === 'terminal' && (
                <div className="mt-6 space-y-4">
                  <p className="text-sm text-fd-muted-foreground">
                    Pick your operating system:
                  </p>
                  <OsSelector selected={progress.selectedOs} onSelect={progress.setOs} />

                  {progress.selectedOs === 'mac' && (
                    <div className="space-y-4">
                      <p className="text-sm text-fd-muted-foreground">
                        Open Terminal (press <kbd className="rounded border border-fd-border bg-[var(--code)] px-1.5 py-0.5 font-mono text-xs">Cmd + Space</kbd>, type &quot;Terminal&quot;, hit Enter).
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
                    <div className="space-y-4">
                      <p className="text-sm text-fd-muted-foreground">
                        Open PowerShell (press <kbd className="rounded border border-fd-border bg-[var(--code)] px-1.5 py-0.5 font-mono text-xs">Win + X</kbd>, select &quot;Terminal&quot;).
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
                    <div className="space-y-4">
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
                    <p className="text-center text-sm text-fd-muted-foreground">
                      Pick your OS above to see install instructions
                    </p>
                  )}
                </div>
              )}

              {session(
                [
                  { kind: 'prompt', text: 'Hi! Are you working?' },
                  { kind: 'thinking', ms: 900 },
                  { kind: 'say', text: "Yes, I'm ready. I can see the my-first-project folder.\nWhat would you like to build?" },
                ],
                'First hello',
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
                Claude Code needs a paid plan. Here&apos;s what each gets you:
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
                  <div className="font-mono text-lead font-bold text-fd-foreground">$20/mo</div>
                  <div className="mt-1 text-xs text-fd-muted-foreground">Good starting point</div>
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
                  <div className="font-mono text-lead font-bold text-fd-foreground">$100/mo</div>
                  <div className="mt-1 text-xs text-fd-muted-foreground">For heavy daily use</div>
                </button>
              </div>

              <p className="mt-4 text-sm text-fd-muted-foreground">
                I started with Pro. Upgraded to Max after a few weeks when I kept hitting limits.{' '}
                <Link href="/docs/comparisons/pro-vs-max" className="underline hover:text-fd-foreground">Read the full comparison</Link>.
              </p>

              <a
                href="/docs/comparisons/pro-vs-max"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
              >
                Compare Pro vs Max
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
              {ide === 'app' ? (
                <div className="mb-4 space-y-3">
                  <p className="text-sm text-fd-muted-foreground">
                    Make an empty folder called <strong>my-first-project</strong> anywhere you like. In the Code tab, choose that folder, then type your first prompt:
                  </p>
                </div>
              ) : (ide === 'vscode' || ide === 'jetbrains') ? (
                <div className="mb-4 space-y-3">
                  <p className="text-sm text-fd-muted-foreground">
                    Open any project folder in {ide === 'vscode' ? 'VS Code' : 'your JetBrains IDE'}, then open the Claude Code panel from the sidebar.
                  </p>
                  <p className="text-sm text-fd-muted-foreground">
                    Type your first prompt:
                  </p>
                </div>
              ) : (
                <div className="mb-4 space-y-3">
                  <p className="text-sm text-fd-muted-foreground">
                    Navigate to any project folder (or create one), then start Claude Code:
                  </p>
                  <CopyBlock code={'mkdir my-first-project && cd my-first-project\nclaude'} />
                  <p className="text-sm text-fd-muted-foreground">
                    Claude Code will start. Try your first prompt:
                  </p>
                </div>
              )}
              <CopyBlock code='"Create a simple HTML page that says Hello World with a nice design"' language="prompt" />
              {session(
                [
                  { kind: 'prompt', text: 'Create a simple HTML page that says Hello World with a nice design' },
                  { kind: 'thinking', ms: 1200 },
                  { kind: 'tool', name: 'Write', arg: 'index.html', result: 'Wrote 42 lines to index.html' },
                  { kind: 'say', text: 'Done. index.html has a soft gradient background and centered text.\nOpen it in your browser to see it.' },
                ],
                'Hello World page',
              )}

              <Collapsible title="Stuck? Claude Code won't start?">
                {usesTerminal ? (
                  <p>Make sure you&apos;re logged in. Run <code className="rounded bg-[var(--code)] px-1.5 py-0.5 font-mono text-xs">claude auth login</code> and follow the prompts to connect your Anthropic account.</p>
                ) : (
                  <p>Make sure you&apos;re signed in with a Pro or Max account. The Code tab needs a paid plan (step 2), and it only works once you&apos;ve picked a folder.</p>
                )}
              </Collapsible>

              <Collapsible title="Claude suggested a command I don't understand. Is it safe?">
                <p className="mb-2">This will happen a lot, and it&apos;s normal. Here&apos;s your framework:</p>
                <ul className="list-disc space-y-1 pl-4">
                  <li><strong>Read before you approve.</strong> Claude Code always asks permission before running commands. Don&apos;t click &quot;Yes&quot; on autopilot.</li>
                  <li><strong>Look for red flags.</strong> Anything with <code className="rounded bg-[var(--code)] px-1.5 py-0.5 font-mono text-xs">rm</code> (delete), <code className="rounded bg-[var(--code)] px-1.5 py-0.5 font-mono text-xs">sudo</code> (admin access), or <code className="rounded bg-[var(--code)] px-1.5 py-0.5 font-mono text-xs">--force</code> deserves a pause.</li>
                  <li><strong>Ask Claude to explain it.</strong> Just type: &quot;What does that command do? Explain it simply.&quot; It will break it down for you.</li>
                  <li><strong>When in doubt, say no.</strong> You can always deny a command and ask Claude to try a different approach.</li>
                </ul>
              </Collapsible>
            </GuideStep>
          </div>

          {progress.isCompleted('install') && progress.isCompleted('plan') && progress.isCompleted('first-prompt') && (
            <div className="mt-6">
              <Checkpoint
                title="Phase 1 done."
                description="Installed, plan picked, first prompt sent. You're in the game now."
              />
            </div>
          )}
        </section>

        {midBannerCta ? <AffiliateCTA {...midBannerCta} /> : null}

        {/* ═══════════ PHASE 2: Set Up Your Workspace ═══════════ */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-[var(--acc)]">Phase 2</span>
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
                Think of CLAUDE.md as <strong>a letter to Claude</strong>. It tells Claude who you are, what your project is, and how you want it to work. Without it, Claude guesses. With it, Claude just knows. Paste this into Claude and ask it to save the file as <strong>CLAUDE.md</strong> in your project folder:
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
              {session(
                [
                  { kind: 'prompt', text: 'Add a login form' },
                  { kind: 'thinking', ms: 1100 },
                  { kind: 'tool', name: 'Write', arg: 'LoginForm.tsx', result: 'Wrote 58 lines to LoginForm.tsx' },
                  { kind: 'say', text: 'Followed your CLAUDE.md: TypeScript, Tailwind classes, and a "use client" directive.\nWithout it, I would have guessed .jsx and inline styles.' },
                ],
                'The difference CLAUDE.md makes',
              )}

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
                Memory lets Claude Code remember you between sessions. Without it, you start from scratch every time. Ask Claude to create a memory index:
              </p>
              <CopyBlock code={'"Create a .claude/memory folder with an empty MEMORY.md index file in it."'} language="prompt" />
              <p className="my-4 text-sm text-fd-muted-foreground">
                Now tell Claude Code about yourself:
              </p>
              <CopyBlock code={'"Remember that I\'m a [your role] working on [your project]. I prefer [your communication style]."'} language="prompt" />
              {session(
                [
                  { kind: 'prompt', text: "Remember that I'm a PM who prefers direct, short answers" },
                  { kind: 'thinking', ms: 900 },
                  { kind: 'tool', name: 'Write', arg: '.claude/memory/user_role.md', result: 'Wrote 4 lines to .claude/memory/user_role.md' },
                  { kind: 'say', text: 'Saved. Next session, I will already know this.' },
                  { kind: 'prompt', text: 'What do you know about me?' },
                  { kind: 'thinking', ms: 800 },
                  { kind: 'say', text: "You're a PM, and you want direct, short answers." },
                ],
                'Memory in action',
              )}

              <p className="mt-2 text-sm text-fd-muted-foreground">
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
                At the end of each session, write a short handoff. That way the next session picks up exactly where you left off instead of starting cold. Just tell Claude Code:
              </p>
              <CopyBlock code={'"Write a handoff for this session. What did we do, what\'s next, and any key decisions."'} language="prompt" />
              {session(
                [
                  { kind: 'prompt', text: 'Write a handoff for this session' },
                  { kind: 'thinking', ms: 900 },
                  { kind: 'tool', name: 'Write', arg: 'handoffs/2026-03-29.md', result: 'Wrote 6 lines to handoffs/2026-03-29.md', lines: ['- Built login form with validation', '- Next: connect to auth API'] },
                  { kind: 'say', text: 'Saved. Tomorrow, ask me to pick up where we left off.' },
                  { kind: 'prompt', text: 'Pick up where we left off' },
                  { kind: 'thinking', ms: 900 },
                  { kind: 'say', text: 'Read your handoff. Next up: connect the login form to the auth API.' },
                ],
                'Handoff to warm start',
              )}

              <p className="mt-2 text-sm text-fd-muted-foreground">
                <Link href="/docs/foundations/session-lifecycle" className="underline hover:text-fd-foreground">Learn about session lifecycle</Link>.
              </p>
            </GuideStep>
          </div>

          {progress.isCompleted('claude-md') && progress.isCompleted('memory') && progress.isCompleted('handoff') && (
            <div className="mt-6">
              <Checkpoint
                title="Phase 2 done."
                description="Workspace configured, memory running, handoffs set up. Sessions now build on each other instead of starting cold every time."
              />
            </div>
          )}
        </section>

        {/* ═══════════ PHASE 3: Build Your Flow ═══════════ */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-[var(--acc)]">Phase 3</span>
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
                The gap between &quot;I use Claude Code sometimes&quot; and &quot;I literally can&apos;t work without it&quot; is daily habits. Here&apos;s the rhythm I use:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 rounded-lg bg-[var(--code)] p-3">
                  <span className="shrink-0 text-[var(--acc)]">AM</span>
                  <p className="text-fd-muted-foreground">Start session. Memory loads automatically. Check what&apos;s next from your last handoff.</p>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-[var(--code)] p-3">
                  <span className="shrink-0 text-[var(--acc)]">Work</span>
                  <p className="text-fd-muted-foreground">Use Claude Code for tasks. When it makes a mistake, correct it (the correction gets saved).</p>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-[var(--code)] p-3">
                  <span className="shrink-0 text-[var(--acc)]">PM</span>
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
                A skill turns a multi-step task into a single command. Think about something you explain to Claude Code over and over. That&apos;s your first skill. Encode it once, run it forever. Here&apos;s an example &quot;code review&quot; skill:
              </p>
              <CopyBlock code={`---
name: code-review
description: Review the code I just changed for bugs, security and style. Use when I ask for a code review.
---

# Code Review

Review the code I just changed for quality, bugs, and style.

## Steps
1. Run \`git diff\` to see what changed
2. Read each modified file
3. Check for: bugs, security issues, style violations, missing tests
4. Report findings as: Critical / Warning / Suggestion

## Output Format
List each finding with the file, line, severity, and a one-line fix.`} language="markdown" />
              <p className="mb-4 text-sm text-fd-muted-foreground">
                Paste it into Claude and ask it to save the file as <code className="rounded bg-[var(--code)] px-1.5 py-0.5 font-mono text-xs">.claude/skills/code-review/SKILL.md</code>. Then try it:
              </p>

              {session(
                [
                  { kind: 'prompt', text: 'Review my recent changes' },
                  { kind: 'thinking', ms: 900 },
                  { kind: 'say', text: 'Using the code-review skill.' },
                  { kind: 'tool', name: 'Bash', arg: 'git diff', result: '3 files changed' },
                  { kind: 'say', text: 'Critical: SQL injection in query.ts:23\nWarning: missing null check in user.ts:41\nSuggestion: extract a helper in utils.ts:15' },
                ],
                'Your skill in action',
              )}

              <p className="mt-2 text-sm text-fd-muted-foreground">
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
                MCP servers let Claude Code talk to your other tools. Think: Claude asks GitHub a question and gets a real answer. The easiest first connection is GitHub:
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
                Ask Claude to save this as <code className="rounded bg-[var(--code)] px-1.5 py-0.5 font-mono text-xs">.mcp.json</code> in your project folder. Set your <code className="rounded bg-[var(--code)] px-1.5 py-0.5 font-mono text-xs">GITHUB_TOKEN</code> environment variable (think of it as <strong>saving a password your computer remembers</strong>, so Claude Code can use it without you typing it every time). Then try:
              </p>
              {session(
                [
                  { kind: 'prompt', text: 'List my open pull requests' },
                  { kind: 'thinking', ms: 900 },
                  { kind: 'tool', name: 'github', arg: 'list_pull_requests', result: '2 open pull requests' },
                  { kind: 'say', text: '#12: Add user dashboard (you, 2 days ago)\n#14: Fix login redirect (you, today)' },
                ],
                'Talking to GitHub',
              )}

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
        <section className="rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] p-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.035em] text-fd-foreground">
            What comes next
          </h2>
          <p className="mt-2 mb-6 text-sm text-fd-muted-foreground">
            Setup done. Here&apos;s where the real power starts:
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
                <ArrowRight className="h-4 w-4 text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:transition-none" />
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════ Feedback ═══════════ */}
        <section className="rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] p-8">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.035em] text-fd-foreground">
            Help me make this better
          </h2>
          <p className="mt-2 mb-6 text-sm text-fd-muted-foreground">
            I update this based on real feedback. If something was confusing, missing, or just plain wrong, tell me. Takes 30 seconds.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: Bug,
                title: 'Report a bug',
                desc: 'Something broken or looks wrong',
                href: 'https://github.com/mshadmanrahman/claudecode-guide/issues/new?template=bug-report.md',
              },
              {
                icon: Lightbulb,
                title: 'Request a guide',
                desc: 'Topic you want covered next',
                href: 'https://github.com/mshadmanrahman/claudecode-guide/issues/new?template=content-request.md',
              },
              {
                icon: MessageSquare,
                title: 'General feedback',
                desc: 'Anything else on your mind',
                href: 'https://github.com/mshadmanrahman/claudecode-guide/issues/new',
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-fd-border p-4 transition-colors hover:bg-fd-accent"
              >
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-fd-muted-foreground group-hover:text-fd-foreground transition-colors" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-fd-foreground group-hover:underline">{item.title}</div>
                  <div className="text-xs text-fd-muted-foreground">{item.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {endCardCta ? <AffiliateCTA {...endCardCta} /> : null}
      </main>

      {/* Spacer for HomeLayout footer */}
      <div className="pb-12" />
    </div>
  );
}
