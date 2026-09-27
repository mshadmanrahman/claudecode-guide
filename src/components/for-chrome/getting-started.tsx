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
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-12 transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            What you need to start
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            A Chrome browser and an email address. That is it.
          </p>
        </div>

        <div
          className={`grid gap-8 lg:grid-cols-2 transition-all motion-reduce:transition-none duration-500 delay-100 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <div>
            <p className="text-sm text-fd-muted-foreground leading-relaxed mb-6">
              Claude.ai has a free tier that is genuinely useful. No credit card, no trial period. You can start in the next 2 minutes.
            </p>
            <ul className="space-y-3">
              {REQUIREMENTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-fd-muted-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--chip)] text-[var(--acc)] text-xs font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap">
              <Link
                href="/for-chrome/get-started-with-claude-in-your-browser"
                onClick={() =>
                  trackEvent('chrome_getting_started_cta_click', {
                    section: 'for-chrome',
                    cta: 'start_guide_1',
                  })
                }
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--acc)] px-6 text-[15px] font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
              >
                Start with Guide 1
              </Link>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <p className="text-sm font-medium text-[var(--muted)] mb-4">
              Claude plan options
            </p>
            <div className="space-y-4">
              {PLAN_OPTIONS.map((item) => (
                <div key={item.plan} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
                  <span className="text-sm font-semibold text-fd-foreground sm:min-w-[100px] shrink-0">
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
