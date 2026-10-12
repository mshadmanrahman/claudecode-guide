'use client';

import type { ReactNode } from 'react';
import { useInView } from '@/hooks/use-in-view';

// `tone` is kept for the MDX that still passes it; every frame now renders
// the same glass panel so the steps read as one sequence.
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

export function UseCaseWalkthrough({
  steps,
  title = 'How it works',
}: UseCaseWalkthroughProps) {
  return (
    <section aria-label={title} className="not-prose my-10">
      {/* h2 so the step h3s don't skip a level; `!` beats the .prose.ccg-prose h2 rule */}
      <h2 className="!mt-0 !mb-4 !font-mono !text-xs !font-normal !tracking-normal !text-fd-muted-foreground">
        {title.toLowerCase()}
      </h2>
      <ol className="space-y-4">
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
  const n = String(index + 1).padStart(2, '0');
  const kicker = step.kicker ?? `${n} / ${String(total).padStart(2, '0')}`;

  return (
    <li>
      <div
        ref={containerRef}
        className={`glass rounded-xl transition-opacity duration-700 motion-reduce:transition-none ${
          isInView ? 'opacity-100' : 'opacity-60'
        }`}
      >
        <div className="grid items-center gap-6 p-5 sm:grid-cols-2 sm:p-7">
          <div className="min-w-0">
            <p className="font-mono text-xs text-[var(--acc)]">{kicker}</p>
            <h3 className="mt-2 text-xl font-semibold leading-snug text-fd-foreground sm:text-2xl">
              {step.headline}
            </h3>
            {step.caption ? (
              <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
                {step.caption}
              </p>
            ) : null}
          </div>
          <div
            className={`il-stage transition-[transform,opacity] duration-700 motion-reduce:transition-none ${
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
