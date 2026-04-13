import Link from 'next/link';
import { ArrowRight, Gamepad2, ClipboardList, BarChart3, Shield, Globe, Monitor, Terminal, Code2, Star, BookOpen, Layers, GitCompare, FileCode, Workflow, ChevronRight, MousePointerClick, Rocket, Sparkles } from 'lucide-react';
import { RotatingDemo } from '@/components/rotating-demo';
import { FloatingCard } from '@/components/floating-card';
import { EmailCapture } from '@/components/email-capture';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claude Code Guide: Tell It What You Need. It Builds It.',
  description: 'Your calm, step-by-step guide to Claude. Build apps, organize notes, analyze data. All in plain English. Web, Desktop, Terminal, or VS Code.',
};

const STATS = [
  { value: '43+', label: 'Guides & Docs' },
  { value: '4', label: 'Interfaces Covered' },
  { value: '5', label: 'Learning Tracks' },
  { value: '100%', label: 'Free & Open Source' },
] as const;

const HOW_IT_WORKS = [
  {
    step: 1,
    icon: MousePointerClick,
    title: 'Pick what you want to build',
    description: 'Choose a project: a game, a document, a chart. No coding knowledge needed.',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    step: 2,
    icon: Rocket,
    title: 'Follow the guided setup',
    description: 'We walk you through choosing an interface and getting started. Under 3 minutes.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    step: 3,
    icon: Sparkles,
    title: 'Paste a prompt and watch it work',
    description: 'Type what you want in plain English. Claude does the rest. You have something real.',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-500/10',
  },
] as const;

const OUTCOME_CARDS = [
  {
    id: 'build',
    icon: Gamepad2,
    verb: 'Build',
    headline: 'Make a quiz game your friends can play',
    time: '10 min',
    href: '/start?track=build',
    color: 'text-green-600 dark:text-green-400',
    bgHover: 'hover:border-green-500/30',
  },
  {
    id: 'organize',
    icon: ClipboardList,
    verb: 'Organize',
    headline: 'Turn messy notes into a clear action plan',
    time: '5 min',
    href: '/start?track=organize',
    color: 'text-blue-600 dark:text-blue-400',
    bgHover: 'hover:border-blue-500/30',
  },
  {
    id: 'analyze',
    icon: BarChart3,
    verb: 'Analyze',
    headline: 'Give it a spreadsheet, get insights and charts',
    time: '8 min',
    href: '/start?track=analyze',
    color: 'text-purple-600 dark:text-purple-400',
    bgHover: 'hover:border-purple-500/30',
  },
] as const;

const CONTENT_SECTIONS = [
  {
    icon: BookOpen,
    title: 'Foundations',
    description: 'What Claude is, how it works, and which interface is right for you.',
    count: 15,
    href: '/docs/foundations',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: Workflow,
    title: 'Workflows',
    description: 'Real patterns for daily work: writing, research, code review, project management.',
    count: 5,
    href: '/docs/workflows',
    color: 'text-green-600 dark:text-green-400',
  },
  {
    icon: Layers,
    title: 'Patterns',
    description: 'Prompting techniques, memory setup, and CLAUDE.md configuration.',
    count: 8,
    href: '/docs/patterns',
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: FileCode,
    title: 'Templates',
    description: 'Copy-paste starter configs for Python, React, Node.js, and more.',
    count: 5,
    href: '/docs/templates',
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: GitCompare,
    title: 'Comparisons',
    description: 'Claude vs ChatGPT, Cursor, Copilot, and others. Honest, side-by-side.',
    count: 10,
    href: '/docs/comparisons',
    color: 'text-rose-600 dark:text-rose-400',
  },
] as const;

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-fd-background overflow-x-clip">
      {/* ── Hero ── */}
      <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-28 pb-12 text-center">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="animate-slide-up-fade font-display tracking-tight-display max-w-3xl text-5xl font-normal text-fd-foreground sm:text-7xl leading-[1.08]">
            Tell it what you need.
            <br />
            <span className="text-fade">It builds it.</span>
          </h1>

          <p className="animate-slide-up-fade delay-100 mt-8 max-w-xl text-lg text-fd-muted-foreground leading-relaxed">
            Your calm, step-by-step guide to Claude.
            Build apps, organize notes, analyze data. All in plain English.
          </p>

          {/* Interface badges */}
          <div className="animate-slide-up-fade delay-150 mt-5 flex flex-wrap justify-center gap-2">
            {[
              { icon: Globe, label: 'claude.ai' },
              { icon: Monitor, label: 'Desktop App' },
              { icon: Terminal, label: 'Terminal' },
              { icon: Code2, label: 'VS Code' },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-xs text-fd-muted-foreground"
              >
                <item.icon className="h-3 w-3" />
                {item.label}
              </span>
            ))}
          </div>

          <div className="animate-slide-up-fade delay-200 mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/start"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
            >
              Start building
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/mshadmanrahman/claudecode-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-6 py-3 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              <Star className="h-4 w-4" />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-16">
        <div className="animate-slide-up-fade delay-250 flex items-baseline justify-center gap-x-3 sm:gap-x-5">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="font-display text-2xl sm:text-4xl font-normal tracking-tight text-fd-foreground">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-fd-muted-foreground whitespace-nowrap">
                {stat.label}
              </span>
              {i < STATS.length - 1 && (
                <span className="ml-3 sm:ml-5 h-5 w-px bg-fd-border" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Rotating Demo with Floating Cards ── */}
      <section className="relative mx-auto w-full max-w-5xl px-6 pb-24 overflow-visible">
        <div className="relative overflow-visible">
          {/* Floating cards in the gap beside the terminal */}
          <FloatingCard className="animate-slide-up-fade delay-500 absolute left-0 top-10 hidden rotate-[-2deg] xl:block max-w-[160px] z-10">
            <p className="text-xs font-medium text-fd-foreground">Session resumed</p>
            <p className="mt-1 text-[11px] text-fd-muted-foreground">Help me prepare for my 1:1 with Sarah</p>
          </FloatingCard>
          <FloatingCard className="animate-slide-up-fade delay-700 absolute right-0 top-16 hidden rotate-[2deg] xl:block max-w-[160px] z-10">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <p className="text-xs font-medium text-fd-foreground">5 action items extracted</p>
            </div>
            <p className="mt-1 text-[11px] text-fd-muted-foreground">Saved to meeting-summary.md</p>
          </FloatingCard>
          <FloatingCard className="animate-slide-up-fade delay-900 absolute left-2 bottom-16 hidden rotate-[1.5deg] xl:block max-w-[150px] z-10">
            <p className="text-[11px] text-fd-foreground font-medium">Revenue up 23% since October</p>
            <p className="mt-0.5 text-[11px] text-green-600 dark:text-green-400 font-medium">chart saved</p>
          </FloatingCard>

          {/* Terminal demo - centered with max-w constraint */}
          <div className="mx-auto max-w-3xl animate-slide-up-fade delay-300">
            <RotatingDemo />
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto w-full max-w-5xl border-t border-dashed border-fd-border" />

      {/* ── How It Works ── */}
      <section className="mx-auto w-full max-w-5xl px-6 py-24">
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
          Three steps. That&apos;s it.
        </p>
        <h2 className="mb-4 text-center font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl">
          How it works
        </h2>
        <p className="mb-14 text-center text-fd-muted-foreground max-w-lg mx-auto">
          No installs, no config files, no coding bootcamp. Just pick, set up, and go.
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          {HOW_IT_WORKS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="flex flex-col items-center text-center">
                {/* Step number */}
                <span className="mb-3 font-display text-5xl font-normal tracking-tight text-fd-border">
                  {item.step}
                </span>
                {/* Icon */}
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <h3 className="mb-2 font-display text-lg font-normal tracking-tight text-fd-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-fd-muted-foreground leading-relaxed max-w-[260px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/start"
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
          >
            Try it now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto w-full max-w-5xl border-t border-dashed border-fd-border" />

      {/* ── Reassurance ── */}
      <section className="relative mx-auto w-full max-w-3xl px-6 py-24 text-center">
        <p className="font-display text-3xl font-normal leading-snug tracking-tight-display text-fd-foreground sm:text-4xl">
          You don&apos;t need to be a developer.
          <br />
          You don&apos;t need to understand &ldquo;prompts.&rdquo;
        </p>
        <p className="mt-6 font-display text-3xl font-normal leading-snug tracking-tight-display text-fd-muted-foreground sm:text-4xl">
          If you can describe what you want in plain English,
          you can use Claude.
        </p>
        <p className="mt-8 text-fd-muted-foreground leading-relaxed">
          Written by a Product Manager who taught hundreds of people to use AI tools.
          <br />
          You&apos;re in safe hands.
        </p>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto w-full max-w-5xl border-t border-dashed border-fd-border" />

      {/* ── Three Outcome Cards ── */}
      <section className="mx-auto w-full max-w-5xl px-6 py-24">
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
          Pick your first project
        </p>
        <h2 className="mb-4 text-center font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl">
          What do you want to make?
        </h2>
        <p className="mb-12 text-center text-fd-muted-foreground max-w-lg mx-auto">
          Choose one. We&apos;ll walk you through setup and have you building in under 10 minutes.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {OUTCOME_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                href={card.href}
                className={`animate-slide-up-fade group flex flex-col rounded-xl border border-fd-border bg-fd-card p-8 transition-all duration-200 hover:shadow-md ${card.bgHover}`}
                style={{ animationDelay: `${i * 100 + 200}ms` }}
              >
                <Icon className={`mb-4 h-6 w-6 ${card.color}`} />
                <span className="mb-1 text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
                  {card.verb}
                </span>
                <h3 className="mb-3 font-display text-xl font-normal text-fd-foreground tracking-tight-display leading-snug">
                  {card.headline}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-sm text-fd-muted-foreground">{card.time}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-fd-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    Let&apos;s go <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto w-full max-w-5xl border-t border-dashed border-fd-border" />

      {/* ── What's Inside (Feature Grid) ── */}
      <section className="mx-auto w-full max-w-5xl px-6 py-24">
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
          Everything you need
        </p>
        <h2 className="mb-4 text-center font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl">
          What&apos;s inside the guide
        </h2>
        <p className="mb-14 text-center text-fd-muted-foreground max-w-lg mx-auto">
          From first-time setup to advanced workflows. Each section is written for humans, not robots.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.title}
                href={section.href}
                className="group flex flex-col rounded-xl border border-fd-border bg-fd-card p-6 transition-all duration-200 hover:shadow-md hover:border-fd-muted-foreground/30"
              >
                <div className="mb-4 flex items-center justify-between">
                  <Icon className={`h-5 w-5 ${section.color}`} />
                  <span className="rounded-full bg-fd-accent px-2.5 py-0.5 text-[11px] font-medium text-fd-muted-foreground">
                    {section.count} pages
                  </span>
                </div>
                <h3 className="mb-1.5 font-display text-lg font-normal tracking-tight text-fd-foreground">
                  {section.title}
                </h3>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">
                  {section.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-fd-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  Browse <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Not Just for Coding ── */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <div className="overflow-hidden rounded-xl border border-fd-border">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-10 lg:p-12">
              <div className="mb-4 inline-flex items-center gap-2 text-sm text-fd-muted-foreground">
                <Shield className="h-4 w-4" />
                <span className="font-medium">General purpose</span>
              </div>
              <h3 className="font-display text-2xl font-normal tracking-tight-display text-fd-foreground sm:text-3xl">
                Not just for coding.
                <br />
                <span className="text-fd-muted-foreground">For doing.</span>
              </h3>
              <p className="mt-4 text-fd-muted-foreground leading-relaxed">
                Claude builds apps, writes documents, analyzes data,
                organizes your work, and automates the boring stuff.
                Use it on the web, desktop, terminal, or your editor.
              </p>
              <Link
                href="/tutorials"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-fd-foreground hover:underline"
              >
                See what people build <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="border-t border-fd-border bg-fd-accent/50 p-8 lg:border-l lg:border-t-0">
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Build websites',
                  'Analyze data',
                  'Write documents',
                  'Automate tasks',
                  'Create apps',
                  'Organize notes',
                  'Generate charts',
                  'Debug code',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-fd-border bg-fd-background px-3 py-2.5 text-sm text-fd-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Email Capture ── */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-16">
        <EmailCapture />
      </section>

      {/* ── Final CTA ── */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <div className="rounded-xl border border-fd-border bg-fd-card p-12 text-center">
          <h2 className="font-display text-3xl font-normal tracking-tight-display text-fd-foreground">
            Ready to try it?
          </h2>
          <p className="mt-4 text-fd-muted-foreground max-w-md mx-auto leading-relaxed">
            Pick a project, choose your interface, and follow the guided setup.
            You&apos;ll have something real in 10 minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/start"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
            >
              Start building
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/mshadmanrahman/claudecode-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-6 py-3 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              <Star className="h-4 w-4" />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-fd-border px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <p className="font-mono text-sm text-fd-muted-foreground">
              claudecodeguide<span className="font-bold text-fd-foreground">.dev</span>
            </p>
            <span className="text-fd-border">|</span>
            <Link href="/bn" className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors">
              বাংলায় পড়ুন
            </Link>
            <span className="text-fd-border">|</span>
            <Link href="/pm-pilot" className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors">
              PM Pilot
            </Link>
            <a
              href="https://shadmanrahman.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Substack
            </a>
          </div>
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
