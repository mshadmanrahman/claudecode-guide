'use client';

import Link from 'next/link';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';

const PLAN_OPTIONS = [
  { plan: 'Free', note: 'Enough to follow all guides here. Some rate limits on daily messages.' },
  { plan: 'Pro ($20/mo)', note: 'More messages per day, priority access. Worth it if you use Claude daily.' },
  { plan: 'Max ($100/mo)', note: 'For power users with much higher limits. Skip this for now.' },
];

const REQUIREMENTS = [
  'Google Chrome (any recent version)',
  'A free account at claude.ai',
  'No coding knowledge required',
];

export function ChromeGettingStarted() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="py-28 bg-fd-card" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-12 transition-all duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">03</span>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            What you need to start
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            A Chrome browser and an email address. That is it.
          </p>
        </div>

        <div
          className={`grid gap-8 lg:grid-cols-2 transition-all duration-500 delay-100 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <div>
            <p className="text-sm text-fd-muted-foreground leading-relaxed mb-6">
              Claude.ai has a free tier that is genuinely useful. No credit card, no trial period. You can start in the next 2 minutes.
            </p>
            <ul className="space-y-3">
              {REQUIREMENTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-fd-muted-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/for-chrome/get-started-with-claude-in-your-browser"
                onClick={() =>
                  trackEvent('chrome_getting_started_cta_click', {
                    section: 'for-chrome',
                    cta: 'start_guide_1',
                  })
                }
                className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
              >
                Start with Guide 1
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-fd-border bg-fd-background p-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground mb-4">
              Claude plan options
            </p>
            <div className="space-y-4">
              {PLAN_OPTIONS.map((item) => (
                <div key={item.plan} className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-fd-foreground min-w-[100px] shrink-0">
                    {item.plan}
                  </span>
                  <span className="text-sm text-fd-muted-foreground leading-relaxed">
                    {item.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
