import Link from 'next/link';
import { DemoCard } from '@/components/demo-card';
import { FloatingCard } from '@/components/floating-card';
import { Clock, FileText, BarChart3, ArrowRight } from 'lucide-react';
import { EmailCapture } from '@/components/email-capture';

const HERO_STEPS = [
  { type: 'cmd' as const, text: 'prep for my 1:1 with Sarah' },
  { type: 'out' as const, text: 'Checking Jira, Slack, Calendar...' },
  { type: 'out' as const, text: 'Found: 3 open tickets assigned to Sarah' },
  { type: 'out' as const, text: 'Found: 2 unresolved threads in #product' },
  { type: 'out' as const, text: 'Found: Last 1:1 was March 28 - 2 action items still open' },
  { type: 'success' as const, text: '── Meeting Brief ──' },
  { type: 'out' as const, text: "Sarah's focus: migrating auth service (blocked on DevOps)" },
  { type: 'out' as const, text: 'You owe her: API spec review (promised Mar 28)' },
  { type: 'out' as const, text: 'She owes you: Updated timeline for Q2 roadmap' },
  { type: 'success' as const, text: 'Suggested talking points:' },
  { type: 'out' as const, text: '1. Unblock auth migration - offer to escalate with DevOps' },
  { type: 'out' as const, text: '2. API spec review - share status or ask for extension' },
  { type: 'out' as const, text: '3. Q2 roadmap timeline - get her latest estimate' },
];

export function PmPilotHero() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 pt-32 pb-12">
      <div className="relative z-10">
        <h1 className="animate-slide-up-fade font-display text-5xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-6xl lg:text-7xl leading-[1.1] hover:scale-[1.01]">
          Stop drowning in
          <br />
          <span className="text-[var(--muted)]">meeting prep.</span>
        </h1>

        <p className="animate-slide-up-fade delay-100 mt-8 max-w-xl text-lg text-fd-muted-foreground leading-relaxed">
          I built this because I was spending 60% of my day on status updates instead of actual product work. Works with ChatGPT, Claude, Gemini. Gets a lot more powerful with Claude Code.
        </p>

        <div className="animate-slide-up-fade delay-200 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/mshadmanrahman/pm-pilot#quick-start"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--acc)] px-6 text-[15px] font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          >
            Try it free
          </a>
          <a
            href="https://github.com/mshadmanrahman/pm-pilot"
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-[15px] font-medium transition-colors hover:bg-[var(--glass2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Star on GitHub
          </a>
          <Link
            href="/pm-pilot/guide"
            className="inline-flex items-center gap-2 rounded-sm text-[15px] font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          >
            Browse the guide
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="animate-slide-up-fade delay-250 mt-10 max-w-md">
          <EmailCapture placement="pm-pilot-hero" />
        </div>

        <div className="animate-slide-up-fade delay-300 mt-20 relative">
          {/* Floating accent cards, half outside the terminal */}
          <FloatingCard className="animate-float absolute -top-4 -right-6 z-10 hidden lg:block motion-reduce:animate-none">
            <div className="flex items-center gap-2 text-xs">
              <Clock className="h-3 w-3 text-fd-muted-foreground" />
              <span className="text-fd-muted-foreground">Meeting with Sarah in 45 min</span>
            </div>
          </FloatingCard>

          <FloatingCard className="animate-float delay-300 absolute bottom-8 -left-8 z-10 hidden lg:block motion-reduce:animate-none">
            <div className="flex items-center gap-2 text-xs">
              <BarChart3 className="h-3 w-3 text-[var(--acc)]" />
              <span className="text-fd-muted-foreground">Sprint 42: 14/18 closed</span>
            </div>
          </FloatingCard>

          <FloatingCard className="animate-float delay-500 absolute top-1/3 -right-10 z-10 hidden xl:block motion-reduce:animate-none">
            <div className="flex items-center gap-2 text-xs">
              <FileText className="h-3 w-3 text-[var(--acc)]" />
              <span className="text-fd-muted-foreground">PRD draft ready for review</span>
            </div>
          </FloatingCard>

          <DemoCard title="pm-pilot : meeting prep" steps={HERO_STEPS} loop loopDelay={4000} maxHeight={380} />
        </div>
      </div>
    </section>
  );
}
