'use client';

import type { ReactNode } from 'react';
import { useInView } from '@/hooks/use-in-view';

type Tone = 'lavender' | 'peach' | 'mint' | 'sky' | 'neutral';

interface WalkthroughStep {
  kicker?: string;
  headline: string;
  caption?: string;
  illustration: ReactNode;
  tone?: Tone;
}

interface UseCaseWalkthroughProps {
  steps: WalkthroughStep[];
  title?: string;
}

const TONE_CLASSES: Record<Tone, string> = {
  lavender: 'bg-violet-500/[0.06]',
  peach: 'bg-orange-500/[0.06]',
  mint: 'bg-emerald-500/[0.06]',
  sky: 'bg-sky-500/[0.06]',
  neutral: 'bg-fd-card/60',
};

const DEFAULT_TONES: Tone[] = ['lavender', 'peach', 'mint', 'sky'];

export function UseCaseWalkthrough({
  steps,
  title = 'How it works',
}: UseCaseWalkthroughProps) {
  return (
    <section aria-label={title} className="not-prose my-10">
      <p className="mb-5 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
        {title}
      </p>
      <ol className="space-y-5">
        {steps.map((step, i) => (
          <WalkthroughFrame
            key={i}
            step={step}
            index={i}
            total={steps.length}
          />
        ))}
      </ol>
    </section>
  );
}

interface FrameProps {
  step: WalkthroughStep;
  index: number;
  total: number;
}

function WalkthroughFrame({ step, index, total }: FrameProps) {
  const [containerRef, isInView] = useInView(0.25);
  const tone = step.tone ?? DEFAULT_TONES[index % DEFAULT_TONES.length];
  const groundClass = TONE_CLASSES[tone];
  const kicker = step.kicker ?? `Step ${index + 1} of ${total}`;

  return (
    <li>
      <div
        ref={containerRef}
        className={`overflow-hidden rounded-2xl border border-fd-border ${groundClass} transition-opacity duration-700 motion-reduce:transition-none ${
          isInView ? 'opacity-100' : 'opacity-60'
        }`}
      >
        <div className="grid items-center gap-6 p-6 sm:grid-cols-2 sm:p-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
              {kicker}
            </p>
            <h3 className="mt-2 font-display text-2xl font-normal text-fd-foreground sm:text-[28px] sm:leading-tight">
              {step.headline}
            </h3>
            {step.caption ? (
              <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
                {step.caption}
              </p>
            ) : null}
          </div>
          <div
            className={`flex min-h-[180px] items-center justify-center rounded-xl bg-fd-background/70 p-5 transition-all duration-700 motion-reduce:transition-none ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'
            }`}
            aria-hidden
          >
            {step.illustration}
          </div>
        </div>
      </div>
    </li>
  );
}
