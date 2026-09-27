'use client';

import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface ProgressiveStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  nextLabel?: string;
  showConfetti?: boolean;
}

export function ProgressiveStep({
  stepNumber,
  totalSteps,
  title,
  children,
  onNext,
  onPrev,
  nextLabel = 'Continue',
  showConfetti = false,
}: ProgressiveStepProps) {
  const progress = Math.round((stepNumber / totalSteps) * 100);

  return (
    <div className="animate-slide-up-fade w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-fd-muted-foreground">
            Step {stepNumber} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-fd-foreground">{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[var(--code)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--acc)] transition-all motion-reduce:transition-none duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step title */}
      <h2 className="font-display text-headline leading-[1.1] font-semibold tracking-[-0.035em] text-fd-foreground mb-8">
        {title}
      </h2>

      {/* Step content */}
      <div className="space-y-6">
        {children}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        {onPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className="glass inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg px-6 text-[15px] font-medium transition-colors hover:bg-[var(--glass2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <div />
        )}
        {onNext ? (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--acc)] px-6 text-[15px] font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          >
            {showConfetti ? (
              <>
                <Check className="h-4 w-4" />
                {nextLabel}
              </>
            ) : (
              <>
                {nextLabel}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
