'use client';

interface ProgressBarProps {
  percent: number;
  completed: number;
  total: number;
}

export function ProgressBar({ percent, completed, total }: ProgressBarProps) {
  return (
    <div className="sticky top-[68px] z-40 px-4 md:top-[88px] md:px-6">
      <div className="mx-auto flex max-w-3xl items-center gap-4 rounded-full border border-fd-border bg-[var(--glass2)] px-4 py-2 backdrop-blur-sm">
        <div className="flex-1">
          <div className="h-2 overflow-hidden rounded-full bg-[var(--code)]">
            <div
              className="h-full rounded-full bg-[var(--acc)] transition-all motion-reduce:transition-none duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <span className="shrink-0 font-mono text-xs text-fd-muted-foreground">
          {completed}/{total} steps
        </span>
        {percent === 100 && (
          <span className="shrink-0 text-xs text-[var(--acc)] font-medium">Complete!</span>
        )}
      </div>
    </div>
  );
}
