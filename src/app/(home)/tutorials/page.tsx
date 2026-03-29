import Link from 'next/link';
import { ArrowRight, Play, Hammer, Sparkles, Briefcase, Rocket, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tutorials — Hands-On Micro-Projects',
  description: 'Stop reading, start doing. Guided micro-projects that teach Claude Code by building real things. 5-15 minutes each.',
};

interface TutorialCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate';
  outcome: string;
  href: string;
  icon: React.ReactNode;
  available: boolean;
}

function TutorialCard({ title, description, duration, difficulty, outcome, href, icon, available }: TutorialCardProps) {
  const content = (
    <div className={`group relative flex flex-col gap-4 rounded-xl border border-fd-border bg-fd-card p-6 transition-all ${available ? 'hover:border-fd-muted-foreground/30 hover:bg-fd-accent cursor-pointer' : ''}`}>
      {/* Badge row */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-fd-accent px-2.5 py-1 text-[11px] font-medium text-fd-muted-foreground">
          <Clock className="h-3 w-3" />
          {duration}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${difficulty === 'beginner' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'}`}>
          {difficulty}
        </span>
        {!available && (
          <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
            coming soon
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-muted-foreground">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-fd-foreground group-hover:underline">{title}</h3>
          <p className="mt-1 text-sm text-fd-muted-foreground">{description}</p>
        </div>
        {available && (
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      {/* Outcome */}
      <div className="rounded-lg border border-fd-border bg-fd-background px-4 py-2.5">
        <p className="text-xs font-medium text-fd-muted-foreground">
          What you&apos;ll have at the end:
        </p>
        <p className="mt-0.5 text-sm text-fd-foreground">{outcome}</p>
      </div>
    </div>
  );

  if (available) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

export default function TutorialsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-fd-background">
      {/* Header */}
      <nav className="border-b border-fd-border px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="font-mono text-sm font-bold tracking-tight text-fd-muted-foreground hover:text-fd-foreground transition-colors">
            claudecodeguide<span className="text-fd-foreground">.dev</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-fd-muted-foreground hover:text-fd-foreground transition-colors">Home</Link>
            <Link href="/roadmap" className="text-fd-muted-foreground hover:text-fd-foreground transition-colors">Roadmap</Link>
            <Link href="/docs/foundations/glossary" className="text-fd-muted-foreground hover:text-fd-foreground transition-colors">Glossary</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto w-full max-w-4xl px-6 pt-16 pb-12 text-center">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-fd-accent px-3 py-1 text-xs font-medium text-fd-muted-foreground">
            <Play className="h-3 w-3" />
            Hands-on learning
          </span>
        </div>
        <h1 className="font-display text-4xl font-normal tracking-tight text-fd-foreground sm:text-5xl">
          Stop reading. Start building.
        </h1>
        <p className="mt-4 text-lg text-fd-muted-foreground max-w-2xl mx-auto">
          Each tutorial is a guided micro-project. You&apos;ll paste commands, see real output, and walk away with something that works. 5-15 minutes each.
        </p>
      </section>

      {/* Tutorials grid */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24">
        <div className="mb-8">
          <h2 className="font-display text-xl font-normal tracking-tight text-fd-foreground">
            Start here
          </h2>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            No experience needed. Just a terminal and a Claude subscription.
          </p>
        </div>

        <div className="grid gap-4">
          <TutorialCard
            title="Build Your First CLAUDE.md in 5 Minutes"
            description="The single most important thing you can do. Create the file that turns Claude Code from generic to personalized."
            duration="5 min"
            difficulty="beginner"
            outcome="A working CLAUDE.md that knows your project, your stack, and your preferences."
            href="/tutorials/your-first-claude-md"
            icon={<Hammer className="h-5 w-5" />}
            available={false}
          />

          <TutorialCard
            title="Ship a Landing Page in 30 Minutes"
            description="Go from empty folder to a live website on the internet. No coding experience required."
            duration="30 min"
            difficulty="beginner"
            outcome="A deployed website on Vercel that you built with Claude Code."
            href="/tutorials/ship-a-landing-page"
            icon={<Rocket className="h-5 w-5" />}
            available={false}
          />

          <TutorialCard
            title="Create Your First Skill"
            description="Turn a task you do every week into a single command. Copy, paste, done."
            duration="10 min"
            difficulty="beginner"
            outcome="A reusable /skill command that automates a real task in your workflow."
            href="/tutorials/your-first-skill"
            icon={<Sparkles className="h-5 w-5" />}
            available={false}
          />
        </div>

        <div className="mt-12 mb-8">
          <h2 className="font-display text-xl font-normal tracking-tight text-fd-foreground">
            For Product Managers
          </h2>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            You don&apos;t need to write code. These workflows are built for how PMs actually work.
          </p>
        </div>

        <div className="grid gap-4">
          <TutorialCard
            title="Turn Meeting Notes into Jira Tickets"
            description="Paste your messy meeting notes. Get structured tickets with acceptance criteria. Never transcribe by hand again."
            duration="15 min"
            difficulty="intermediate"
            outcome="A skill that converts meeting notes into formatted Jira tickets automatically."
            href="/tutorials/meeting-to-jira"
            icon={<Briefcase className="h-5 w-5" />}
            available={false}
          />

          <TutorialCard
            title="Build a Weekly Status Report Generator"
            description="Pull from Jira, GitHub, and Slack. Generate a stakeholder-ready status report in seconds."
            duration="15 min"
            difficulty="intermediate"
            outcome="A /weekly-status skill that generates your report from real data sources."
            href="/tutorials/weekly-status"
            icon={<Briefcase className="h-5 w-5" />}
            available={false}
          />
        </div>

        {/* Email capture CTA */}
        <div className="mt-16 rounded-xl border border-fd-border bg-fd-card p-10 text-center">
          <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
            Tutorials are launching soon
          </h2>
          <p className="mt-3 text-fd-muted-foreground max-w-lg mx-auto">
            Each tutorial comes with a video walkthrough (no talking heads, just terminal magic) and copy-paste steps.
            While we build them, start with the basics.
          </p>
          <Link
            href="/guide"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
          >
            Start the Interactive Guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-fd-border px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-sm text-fd-muted-foreground">
            claudecodeguide<span className="font-bold text-fd-foreground">.dev</span>
          </p>
          <p className="text-sm text-fd-muted-foreground">
            Built by{' '}
            <a href="https://github.com/mshadmanrahman" target="_blank" rel="noopener noreferrer" className="font-medium text-fd-foreground hover:underline">
              Shadman Rahman
            </a>
            {' '}with lots of ♥️, ☕️ and Claude Code, naturally! 😉
          </p>
        </div>
      </footer>
    </main>
  );
}
