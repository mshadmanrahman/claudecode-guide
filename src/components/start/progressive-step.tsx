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
        <div className="h-2 w-full rounded-full bg-fd-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-fd-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step title */}
      <h2 className="font-display text-3xl font-normal tracking-tight-display text-fd-foreground sm:text-4xl mb-8">
        {showConfetti && <span className="mr-2">&#127881;</span>}
        {title}
      </h2>

      {/* Step content */}
      <div className="space-y-6">
        {children}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        {onPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-fd-border bg-fd-background px-4 py-2.5 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
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
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
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
