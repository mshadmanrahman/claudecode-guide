'use client';

interface ProgressBarProps {
  percent: number;
  completed: number;
  total: number;
}

export function ProgressBar({ percent, completed, total }: ProgressBarProps) {
  return (
    <div className="sticky top-0 z-50 border-b border-fd-border bg-fd-background/95 backdrop-blur-sm px-6 py-3">
      <div className="mx-auto flex max-w-3xl items-center gap-4">
        <div className="flex-1">
          <div className="h-2 overflow-hidden rounded-full bg-fd-muted">
            <div
              className="h-full rounded-full bg-fd-foreground transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <span className="shrink-0 font-mono text-xs text-fd-muted-foreground">
          {completed}/{total} steps
        </span>
        {percent === 100 && (
          <span className="shrink-0 text-xs text-green-500 font-medium">Complete!</span>
        )}
      </div>
    </div>
  );
}
