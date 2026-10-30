'use client';

import Link from 'next/link';
import { useInView } from '@/hooks/use-in-view';
import { trackEvent } from '@/lib/analytics';
import { DESIGNERS_HUB, type DesignersHubCopy } from '@/lib/hubs/designers';
import { localePrefix, type Locale } from '@/lib/i18n/locale';

/** Where each step's link goes, by index. The words live in `DESIGNERS_HUB.gettingStarted`. */
const STEP_HREFS = [undefined, '/for-designers/set-up-claude', '/for-designers'];

interface DesignerGettingStartedProps {
  locale?: Locale;
  copy?: DesignersHubCopy['gettingStarted'];
}

export function DesignerGettingStarted({
  locale = 'en',
  copy = DESIGNERS_HUB.gettingStarted,
}: DesignerGettingStartedProps) {
  const prefix = localePrefix(locale);
  const steps = copy.steps.map((step, i) => ({
    ...step,
    num: String(i + 1).padStart(2, '0'),
    href: STEP_HREFS[i] && `${prefix}${STEP_HREFS[i]}`,
  }));
  const [ref, inView] = useInView(0.1);

  return (
    <section className="px-4 py-12 sm:px-6" ref={ref}>
      <div className="glass mx-auto max-w-5xl rounded-2xl px-6 py-16 sm:px-10">
        <div
          className={`mb-16 transition-all motion-reduce:transition-none duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            {copy.heading}
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            {copy.lead}
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`flex gap-6 transition-all motion-reduce:transition-none duration-500 ${
                inView ? 'animate-slide-up-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100 + 100}ms` }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fd-border bg-[var(--glass2)] font-mono text-sm font-light text-fd-muted-foreground">
                {step.num}
              </div>
              <div className="pt-1">
                <h3 className="font-display text-lg font-semibold text-fd-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">{step.body}</p>
                {step.href && (
                  <Link
                    href={step.href}
                    onClick={() =>
                      trackEvent('designer_getting_started_click', {
                        step: step.num,
                        step_title: step.title,
                        section: 'for-designers',
                      })
                    }
                    className="mt-3 inline-flex items-center text-sm font-medium text-fd-foreground hover:underline rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
                  >
                    {'cta' in step && step.cta} &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
