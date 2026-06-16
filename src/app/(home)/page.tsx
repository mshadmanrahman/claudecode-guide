import Link from 'next/link';
import { ArrowRight, Gamepad2, ClipboardList, BarChart3, Shield, Star, MousePointerClick, Rocket, Sparkles } from 'lucide-react';
import { EmailCapture } from '@/components/email-capture';
import { PathRouter } from '@/components/home/path-router';
import { PersonaStrip } from '@/components/home/persona-strip';
import { ClaudeInYourDay } from '@/components/home/claude-in-your-day';
import { SiteFooter } from '@/components/site-footer';
import type { Metadata } from 'next';

const heroTagline = 'Tell it what you need. It builds it.';
const heroDescription =
  "The practical guide to Claude: Code, Chrome, Word, Excel, PowerPoint, and more. Calm, beginner-friendly, and free.";
const ogImage = {
  url: 'https://claudecodeguide.dev/og-home-v4.png',
  width: 1200,
  height: 630,
  alt: 'Claude Code Guide homepage: Tell it what you need. It builds it.',
};

export const metadata: Metadata = {
  title: {
    absolute: 'Claude Code Guide: Tell It What You Need. It Builds It.',
  },
  description: heroDescription,
  openGraph: {
    title: heroTagline,
    description: heroDescription,
    type: 'website',
    siteName: 'Claude Code Guide',
    url: 'https://claudecodeguide.dev',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: heroTagline,
    description: heroDescription,
    images: [ogImage],
  },
};

const STATS = [
  { value: '90+', label: 'Guides & Docs' },
  { value: '8', label: 'Platforms Covered' },
  { value: '9', label: 'Learning Tracks' },
  { value: '100%', label: 'Free & Open Source' },
] as const;

const HOW_IT_WORKS = [
  {
    step: 1,
    icon: MousePointerClick,
    title: 'Pick something you want',
    description: 'A game, a document, a chart. No coding knowledge needed. Really.',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    step: 2,
    icon: Rocket,
    title: 'Follow the setup',
    description: 'I walk you through picking an interface and getting running. Under 3 minutes.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    step: 3,
    icon: Sparkles,
    title: 'Paste a prompt, watch it go',
    description: 'Plain English. Claude does the rest. You end up with something real.',
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

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-fd-background overflow-x-clip">
      <PersonaStrip />
      {/* ── Hero ── */}
      <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-28 pb-12 text-center">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="animate-slide-up-fade font-display tracking-tight-display max-w-3xl text-5xl font-bold text-fd-foreground sm:text-7xl leading-[1.08]">
            Tell it what you need.
            <br />
            <span className="text-fade">It builds it.</span>
          </h1>

          <p className="animate-slide-up-fade delay-100 mt-6 max-w-xl text-lg text-fd-muted-foreground leading-relaxed">
            The practical guide to Claude: Code, Chrome, Word, Excel, PowerPoint, and more. Calm, beginner-friendly, and free.
          </p>

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

      {/* ── Static Terminal ── */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24 animate-slide-up-fade delay-300">
        <div className="overflow-hidden rounded-xl border border-fd-border shadow-lg bg-fd-card">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-fd-border bg-fd-muted px-4 py-2.5">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-2 font-mono text-[11px] text-fd-muted-foreground">claude-code</span>
          </div>
          {/* Session */}
          <div className="p-6 font-mono text-[13px] leading-loose sm:text-sm">
            <div>
              <span className="text-green-600 dark:text-green-400">~</span>
              <span className="text-fd-muted-foreground"> $ </span>
              <span className="text-fd-foreground font-medium">&ldquo;read sales.csv and chart revenue by month&rdquo;</span>
            </div>
            <div className="mt-0.5 pl-4 text-xs text-fd-muted-foreground">Analyzing 2,847 rows across 14 months...</div>
            <div className="mt-0.5 pl-4 text-xs text-fd-muted-foreground">Generating interactive chart...</div>
            <div className="mt-0.5 pl-4 text-xs text-green-600 dark:text-green-400">✓ Chart saved to revenue-by-month.html</div>
            <div className="mt-0.5 pl-4 text-xs text-amber-600 dark:text-amber-400">→ Revenue up 23% since October</div>

            <div className="mt-5">
              <span className="text-green-600 dark:text-green-400">~</span>
              <span className="text-fd-muted-foreground"> $ </span>
              <span className="text-fd-foreground font-medium">&ldquo;summarize my meeting notes, list the action items&rdquo;</span>
            </div>
            <div className="mt-0.5 pl-4 text-xs text-fd-muted-foreground">Reading meeting-notes-jun-11.md...</div>
            <div className="mt-0.5 pl-4 text-xs text-fd-muted-foreground">Extracting decisions and action items...</div>
            <div className="mt-0.5 pl-4 text-xs text-green-600 dark:text-green-400">✓ 3 decisions captured, 5 action items extracted</div>
            <div className="mt-0.5 pl-4 text-xs text-amber-600 dark:text-amber-400">→ Saved to action-items.md</div>

            <div className="mt-5">
              <span className="text-green-600 dark:text-green-400">~</span>
              <span className="text-fd-muted-foreground"> $ </span>
              <span className="text-fd-foreground font-medium">&ldquo;build me a quiz game about world history&rdquo;</span>
            </div>
            <div className="mt-0.5 pl-4 text-xs text-fd-muted-foreground">Creating project structure...</div>
            <div className="mt-0.5 pl-4 text-xs text-fd-muted-foreground">Writing game logic and UI...</div>
            <div className="mt-0.5 pl-4 text-xs text-green-600 dark:text-green-400">✓ Quiz game ready. Run npm start to play</div>

            <div className="mt-5 flex items-center">
              <span className="text-green-600 dark:text-green-400">~</span>
              <span className="text-fd-muted-foreground"> $ </span>
              <span className="inline-block h-4 w-1.5 bg-fd-foreground/50 align-middle" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Path Router (data-driven, post-Crucible 2026-05-04) ── */}
      <PathRouter />

      {/* ── Email Capture (primary, above-fold once demo is seen) ── */}
      <section className="mx-auto w-full max-w-2xl px-6 pb-20">
        <EmailCapture placement="homepage-primary" />
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
          No coding bootcamp. No config files you don&apos;t understand. Just pick something, set it up, and go make it.
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
          you can use Claude. That&apos;s genuinely it.
        </p>
        <p className="mt-8 text-fd-muted-foreground leading-relaxed">
          I built this because I kept explaining the same things to people who&apos;d never touched a terminal.
          The official docs are solid if you already know the territory. This guide is for everyone who doesn&apos;t.
          I&apos;m a PM who&apos;s used AI tools with hundreds of people across different roles. I know where people get stuck. This guide skips those parts.
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
          Pick one. I&apos;ll walk you through setup and you&apos;ll have something real in under 10 minutes.
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

      {/* ── Claude In Your Day ── */}
      <div className="mx-auto w-full max-w-5xl border-t border-dashed border-fd-border" />
      <ClaudeInYourDay />

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
                Claude builds apps, writes documents, analyzes spreadsheets, and automates the stuff that takes you forever.
                It works on the web, desktop, terminal, or inside your editor. You pick.
              </p>
              <Link
                href="/tutorials"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-fd-foreground hover:underline"
              >
                See what people actually build <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="border-t border-fd-border bg-fd-accent/50 p-8 lg:border-l lg:border-t-0">
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Build websites',
                  'Analyze data',
                  'Write in Word',
                  'Excel formulas',
                  'Create PowerPoint decks',
                  'Draft emails',
                  'Summarize webpages',
                  'Research any topic',
                  'Create apps',
                  'Generate charts',
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

      {/* ── Email Capture (footer backup) ── */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-16">
        <EmailCapture placement="homepage-footer" />
      </section>

      {/* ── Final CTA ── */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <div className="rounded-xl border border-fd-border bg-fd-card p-12 text-center">
          <h2 className="font-display text-3xl font-normal tracking-tight-display text-fd-foreground">
            Ready to try it?
          </h2>
          <p className="mt-4 text-fd-muted-foreground max-w-md mx-auto leading-relaxed">
            Pick a project, choose your interface, follow the steps.
            Ten minutes from now you&apos;ll have something that actually works.
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
          <p className="mt-5 text-sm text-fd-muted-foreground">
            Need a Claude plan first?{' '}
            <a
              href="https://claude.ai/upgrade"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-fd-foreground underline underline-offset-2 hover:no-underline"
            >
              Get Claude Pro
            </a>
            {' '}to unlock Claude Code.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
