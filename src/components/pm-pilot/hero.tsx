'use client';

import { useCallback, useRef, useState } from 'react';
import { DemoCard } from '@/components/demo-card';
import { FloatingCard } from '@/components/floating-card';
import { Clock, FileText, BarChart3 } from 'lucide-react';

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
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
  }, []);

  return (
    <section
      className="relative mx-auto max-w-5xl px-6 pt-32 pb-12"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Grid background with fade */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40 pointer-events-none" />

      {/* Membrane glow - follows cursor */}
      <div
        ref={glowRef}
        className={`pointer-events-none absolute h-[400px] w-[400px] rounded-full transition-opacity duration-700 blur-[120px] ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(120,120,120,0.12) 0%, rgba(120,120,120,0.04) 40%, transparent 70%)',
          top: 0,
          left: 0,
        }}
      />

      <div className="relative z-10">
        <h1 className="animate-slide-up-fade animate-breathe font-serif text-5xl font-medium tracking-tight text-fd-foreground sm:text-6xl lg:text-7xl leading-[1.1] hover:scale-[1.01] transition-transform duration-500 cursor-default">
          Stop drowning in
          <br />
          <span className="text-fade">meeting prep.</span>
        </h1>

        <p className="animate-slide-up-fade delay-100 mt-8 max-w-xl text-lg text-fd-muted-foreground leading-relaxed">
          AI-powered meeting prep, PRDs, and status reports. Works with ChatGPT, Claude, Gemini - and gets even more powerful with Claude Code.
        </p>

        <div className="animate-slide-up-fade delay-200 mt-10 flex items-center gap-4">
          <a
            href="https://github.com/mshadmanrahman/pm-pilot#quick-start"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            Get started
          </a>
          <a
            href="https://github.com/mshadmanrahman/pm-pilot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-6 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Star on GitHub
          </a>
        </div>

        <div className="animate-slide-up-fade delay-300 mt-20 relative">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
            See it work
          </p>

          {/* Floating accent cards, half outside the terminal */}
          <FloatingCard className="animate-float absolute -top-4 -right-6 z-10 hidden lg:block">
            <div className="flex items-center gap-2 text-xs">
              <Clock className="h-3 w-3 text-fd-muted-foreground" />
              <span className="text-fd-muted-foreground">Meeting with Sarah in 45 min</span>
            </div>
          </FloatingCard>

          <FloatingCard className="animate-float delay-300 absolute bottom-8 -left-8 z-10 hidden lg:block">
            <div className="flex items-center gap-2 text-xs">
              <BarChart3 className="h-3 w-3 text-green-500" />
              <span className="text-fd-muted-foreground">Sprint 42: 14/18 closed</span>
            </div>
          </FloatingCard>

          <FloatingCard className="animate-float delay-500 absolute top-1/3 -right-10 z-10 hidden xl:block">
            <div className="flex items-center gap-2 text-xs">
              <FileText className="h-3 w-3 text-blue-500" />
              <span className="text-fd-muted-foreground">PRD draft ready for review</span>
            </div>
          </FloatingCard>

          <DemoCard title="pm-pilot : meeting prep" steps={HERO_STEPS} loop loopDelay={4000} maxHeight={380} />
        </div>
      </div>
    </section>
  );
}
