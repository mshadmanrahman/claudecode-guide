'use client';

import { useInView } from '@/hooks/use-in-view';

const REQUIREMENTS = [
  'Microsoft Word, Excel, or PowerPoint (desktop or Microsoft 365 online)',
  'A free Claude account at claude.ai',
  'A browser tab open alongside your Office app',
];

const WORKFLOW_STEPS = [
  { num: '01', text: 'Open Claude.ai in your browser.' },
  { num: '02', text: 'Describe what you need or paste your content.' },
  { num: '03', text: "Copy Claude's output." },
  { num: '04', text: 'Paste into Word, Excel, or PowerPoint.' },
];

export function MicrosoftGettingStarted() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="py-28 bg-fd-card" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">03</span>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            What you need
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            No plugins. No integrations. Just a tab and a copy-paste workflow.
          </p>
        </div>

        <div
          className={`grid gap-8 sm:grid-cols-2 transition-all duration-500 delay-100 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          {/* Left: requirements */}
          <div className="rounded-xl border border-fd-border bg-fd-background p-6">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
              What you need
            </p>
            <ul className="space-y-3">
              {REQUIREMENTS.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fd-accent font-mono text-[10px] font-medium text-fd-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm text-fd-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: workflow */}
          <div className="rounded-xl border border-fd-border bg-fd-background p-6">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
              The workflow in 30 seconds
            </p>
            <div className="space-y-4">
              {WORKFLOW_STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className={`flex items-start gap-3 transition-all duration-500 ${
                    inView ? 'animate-slide-up-fade' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${i * 80 + 200}ms` }}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-fd-border bg-fd-muted font-mono text-xs font-light text-fd-muted-foreground">
                    {step.num}
                  </div>
                  <p className="pt-0.5 text-sm text-fd-foreground leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
