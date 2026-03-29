import Link from 'next/link';
import { Terminal, BookOpen, Zap, Coffee, Layout, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import { TerminalCard, TerminalLine } from '@/components/terminal-card';
import { FloatingCard } from '@/components/floating-card';
import { EmailCapture } from '@/components/email-capture';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-fd-background overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-28 pb-24 text-center">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="animate-slide-up-fade mb-6 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-4 py-1.5 text-sm">
            <Sparkles className="h-3.5 w-3.5 text-fd-muted-foreground" />
            <span className="text-fd-muted-foreground">No jargon. No gatekeeping.</span>
          </div>

          <h1 className="animate-slide-up-fade delay-100 font-display tracking-tight-display max-w-3xl text-5xl font-normal text-fd-foreground sm:text-7xl leading-[1.08]">
            AI is the new fire.
            <br />
            <span className="text-fade">Don&apos;t get burned.</span>
          </h1>

          <p className="animate-slide-up-fade delay-200 mt-8 max-w-xl text-lg text-fd-muted-foreground leading-relaxed">
            Your calm, step-by-step guide to Claude Code.
            From &ldquo;what even is this?&rdquo; to &ldquo;I can&apos;t work without it.&rdquo;
          </p>

          <div className="animate-slide-up-fade delay-300 mt-10 flex gap-3">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
            >
              Start the guided setup
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/foundations/claude-md"
              className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-6 py-3 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              Jump to the docs
            </Link>
          </div>
        </div>
      </section>

      {/* ── Visual: Terminal Demo ── */}
      <section className="relative mx-auto w-full max-w-5xl px-6 pb-24">
        <div className="relative">
          {/* Floating cards around the terminal */}
          <FloatingCard className="animate-float absolute -top-4 -right-4 z-10 hidden lg:block">
            <div className="flex items-center gap-2 text-xs">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-fd-muted-foreground">Session resumed</span>
            </div>
          </FloatingCard>

          <FloatingCard className="animate-float delay-500 absolute -bottom-4 -left-4 z-10 hidden lg:block">
            <div className="flex items-center gap-2 text-xs">
              <Clock className="h-3 w-3 text-fd-muted-foreground" />
              <span className="text-fd-muted-foreground">Context loaded in 2s</span>
            </div>
          </FloatingCard>

          <TerminalCard title="claude-code" className="animate-slide-up-fade delay-300">
            <TerminalLine
              command="claude"
              output="Welcome back. Reading memory... Loading 3 projects, 12 preferences."
            />
            <TerminalLine
              prompt="claude"
              command='"Help me prepare for my 1:1 with Sarah"'
              output="Found 4 recent interactions, 2 open items, 1 decision pending review. Generating talking points..."
            />
          </TerminalCard>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto w-full max-w-5xl border-t border-dashed border-fd-border" />

      {/* ── Reassurance (Dub storytelling style) ── */}
      <section className="relative mx-auto w-full max-w-3xl px-6 py-24 text-center">
        <FloatingCard className="animate-float absolute top-16 left-4 hidden lg:block">
          <div className="flex items-center gap-2 text-xs">
            <Shield className="h-3.5 w-3.5 text-green-600" />
            <span className="font-medium text-fd-foreground">Safe to experiment</span>
          </div>
        </FloatingCard>

        <FloatingCard className="animate-float delay-300 absolute bottom-16 right-4 hidden lg:block">
          <div className="flex items-center gap-2 text-xs">
            <Coffee className="h-3.5 w-3.5 text-orange-500" />
            <span className="font-medium text-fd-foreground">10 min setup</span>
          </div>
        </FloatingCard>

        <p className="font-display text-3xl font-normal leading-snug tracking-tight-display text-fd-foreground sm:text-4xl">
          You don&apos;t need to be a developer.
          <br />
          You don&apos;t need to understand &ldquo;prompts.&rdquo;
        </p>
        <p className="mt-6 font-display text-3xl font-normal leading-snug tracking-tight-display text-fd-muted-foreground sm:text-4xl">
          If you can describe what you want in plain English,
          you can build with Claude Code.
        </p>
        <p className="mt-8 text-fd-muted-foreground leading-relaxed">
          Written by a Product Manager who taught hundreds of people to use AI tools.
          <br />
          You&apos;re in safe hands.
        </p>
      </section>

      {/* ── GIF Demo ── */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
          See it in action
        </p>
        <h2 className="mb-8 text-center font-display text-2xl font-normal tracking-tight text-fd-foreground sm:text-3xl">
          One command creates your CLAUDE.md
        </h2>
        <div className="overflow-hidden rounded-xl border border-fd-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gifs/gif-init.gif"
            alt="Running /init in Claude Code — it analyzes your project and generates a CLAUDE.md automatically"
            className="w-full"
          />
        </div>
        <p className="mt-4 text-center text-sm text-fd-muted-foreground">
          Claude Code reads your project, detects your stack, and writes the config for you.
        </p>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto w-full max-w-5xl border-t border-dashed border-fd-border" />

      {/* ── Three Steps ── */}
      <section className="mx-auto w-full max-w-5xl px-6 py-24">
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
          How it works
        </p>
        <h2 className="mb-12 text-center font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl">
          Three steps. That&apos;s it.
        </h2>

        <div className="grid gap-px overflow-hidden rounded-xl border border-fd-border bg-fd-border sm:grid-cols-3">
          {[
            {
              icon: Terminal,
              number: '01',
              title: 'Get set up',
              description: 'Install Claude Code, pick a plan, and write your first prompt. Takes about 10 minutes.',
              href: '/docs/foundations/claude-md',
            },
            {
              icon: BookOpen,
              number: '02',
              title: 'Learn the rhythm',
              description: 'How sessions work, how to talk to Claude, and why context matters more than clever prompts.',
              href: '/docs/foundations/session-lifecycle',
            },
            {
              icon: Zap,
              number: '03',
              title: 'Build your flow',
              description: 'Daily habits that make AI coding feel like second nature. No PhD required.',
              href: '/docs/workflows/daily-practice',
            },
          ].map((step, i) => (
            <Link
              key={step.number}
              href={step.href}
              className={`animate-slide-up-fade group flex flex-col bg-fd-background p-8 transition-colors hover:bg-fd-accent`}
              style={{ animationDelay: `${i * 100 + 200}ms` }}
            >
              <step.icon className="mb-4 h-5 w-5 text-fd-muted-foreground group-hover:text-fd-foreground transition-colors" />
              <span className="mb-3 font-mono text-xs text-fd-muted-foreground">{step.number}</span>
              <h3 className="mb-2 font-display text-xl font-normal text-fd-foreground tracking-tight-display">
                {step.title}
              </h3>
              <p className="mb-4 flex-1 text-sm text-fd-muted-foreground leading-relaxed">
                {step.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-fd-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                Read guide <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Feature: Terminal Mockup Section (Dub-style left text + right visual) ── */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <div className="overflow-hidden rounded-xl border border-fd-border">
          <div className="grid lg:grid-cols-2">
            {/* Left: text */}
            <div className="flex flex-col justify-center p-10 lg:p-12">
              <div className="mb-4 inline-flex items-center gap-2 text-sm text-fd-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">Memory system</span>
              </div>
              <h3 className="font-display text-2xl font-normal tracking-tight-display text-fd-foreground sm:text-3xl">
                It remembers you.
                <br />
                <span className="text-fd-muted-foreground">No re-explaining.</span>
              </h3>
              <p className="mt-4 text-fd-muted-foreground leading-relaxed">
                Claude Code remembers your projects, preferences, and past decisions.
                Every session picks up where you left off. After a week, it feels like
                working with a colleague who actually pays attention.
              </p>
              <Link
                href="/docs/foundations/session-lifecycle"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-fd-foreground hover:underline"
              >
                Learn how memory works <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {/* Right: visual */}
            <div className="border-t border-fd-border bg-fd-accent/50 p-8 lg:border-l lg:border-t-0">
              <TerminalCard title="~/.claude/memory" className="text-xs">
                <div className="space-y-3 text-fd-muted-foreground">
                  <div>
                    <span className="text-green-600 dark:text-green-400">user/</span>
                    <span className="text-fd-foreground"> role.md</span>
                    <span className="ml-2 text-fd-muted-foreground">— &quot;Senior PM, manages 5 projects&quot;</span>
                  </div>
                  <div>
                    <span className="text-amber-600 dark:text-amber-400">feedback/</span>
                    <span className="text-fd-foreground"> style.md</span>
                    <span className="ml-2 text-fd-muted-foreground">— &quot;Direct, no fluff, no em dashes&quot;</span>
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">project/</span>
                    <span className="text-fd-foreground"> heimdall.md</span>
                    <span className="ml-2 text-fd-muted-foreground">— &quot;Ad server, v0.7, 336 tests&quot;</span>
                  </div>
                </div>
              </TerminalCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── Learning Journey (Mini Roadmap) ── */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-24">
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
          Your learning journey
        </p>
        <h2 className="mb-4 text-center font-display text-3xl font-normal tracking-tight-display text-fd-foreground">
          Follow the path at your own pace
        </h2>
        <p className="mb-12 text-center text-fd-muted-foreground">
          Each stage builds on the last. Skip what you know.{' '}
          <Link href="/roadmap" className="underline hover:text-fd-foreground transition-colors">
            View full roadmap
          </Link>
        </p>

        <div className="space-y-6">
          {[
            { num: '01', label: 'Getting Started', color: 'text-green-500', items: [
              { title: 'Installation', href: '/docs/foundations/installation' },
              { title: 'CLAUDE.md Guide', href: '/docs/foundations/claude-md' },
              { title: 'Glossary', href: '/docs/foundations/glossary' },
              { title: 'Cost Optimization', href: '/docs/foundations/cost-optimization' },
            ]},
            { num: '02', label: 'Build the Foundation', color: 'text-blue-500', items: [
              { title: 'Session Lifecycle', href: '/docs/foundations/session-lifecycle' },
              { title: 'Memory System', href: '/docs/foundations/memory-system' },
              { title: 'Daily Practice', href: '/docs/workflows/daily-practice' },
            ]},
            { num: '03', label: 'Learn the Patterns', color: 'text-purple-500', items: [
              { title: 'Skills', href: '/docs/patterns/skills' },
              { title: 'Hooks', href: '/docs/patterns/hooks' },
              { title: 'Sub-Agents', href: '/docs/patterns/agents' },
              { title: 'MCP Servers', href: '/docs/patterns/mcp-servers' },
            ]},
            { num: '04', label: 'Go Deeper', color: 'text-amber-500', items: [
              { title: 'Autonomous Loops', href: '/docs/patterns/autonomous-loops' },
              { title: 'Team Adoption', href: '/docs/workflows/team-adoption' },
              { title: 'PM Workflow', href: '/docs/workflows/pm-workflow' },
            ]},
            { num: '05', label: 'Templates & Comparisons', color: 'text-rose-500', items: [
              { title: 'Template Gallery', href: '/docs/templates' },
              { title: 'vs Cursor', href: '/docs/comparisons/vs-cursor' },
              { title: 'Pro vs Max', href: '/docs/comparisons/pro-vs-max' },
            ]},
          ].map((stage) => (
            <div key={stage.num} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className={`font-mono text-sm font-bold ${stage.color}`}>{stage.num}</span>
                <div className="mt-2 flex-1 w-px bg-fd-border" />
              </div>
              <div className="flex-1 pb-4">
                <h3 className="mb-3 font-display text-lg font-normal text-fd-foreground tracking-tight-display">
                  {stage.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stage.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg border border-fd-border bg-fd-card px-3 py-1.5 text-sm text-fd-muted-foreground transition-all hover:bg-fd-accent hover:text-fd-foreground"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Email Capture ── */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-16">
        <EmailCapture />
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <div className="rounded-xl border border-fd-border bg-fd-card p-12 text-center">
          <h2 className="font-display text-3xl font-normal tracking-tight-display text-fd-foreground">
            Ready to stop watching
            <br />
            from the sidelines?
          </h2>
          <p className="mt-4 text-fd-muted-foreground max-w-md mx-auto leading-relaxed">
            Claude Pro ($20/mo) is all you need to start. Upgrade to Max when you&apos;re hooked.
          </p>
          <a
            href="https://claude.ai/upgrade"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
          >
            Get Claude Pro
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-fd-border px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-sm text-fd-muted-foreground">
            claudecodeguide<span className="font-bold text-fd-foreground">.dev</span>
          </p>
          <p className="text-sm text-fd-muted-foreground">
            Built by{' '}
            <a
              href="https://github.com/mshadmanrahman"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-fd-foreground hover:underline"
            >
              Shadman Rahman
            </a>
            {' '}with lots of ♥️, ☕️ and Claude Code, naturally! 😉
          </p>
        </div>
      </footer>
    </main>
  );
}
