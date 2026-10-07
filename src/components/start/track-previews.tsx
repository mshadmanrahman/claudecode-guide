import { ArrowRight, Check } from 'lucide-react';
import type { TrackId } from '@/data/start-tracks';

/**
 * Small drawn previews of what each /start track produces, so a newcomer can
 * picture the result before picking. Pure markup in the site's color tokens,
 * so they follow light and dark mode with no images to keep in sync.
 */

const frame =
  'flex h-28 w-44 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--bg)] p-3';
const bar = 'h-1.5 rounded-full bg-[var(--muted)] opacity-35';

function QuizPreview() {
  return (
    <div className={frame} aria-hidden="true">
      <div className="w-full">
        <p className="m-0 text-[10px] font-semibold leading-tight text-fd-foreground">Which planet is biggest?</p>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {['Mars', 'Jupiter', 'Venus', 'Earth'].map((a) => {
            const right = a === 'Jupiter';
            return (
              <span
                key={a}
                className={[
                  'flex items-center justify-center gap-0.5 rounded-md border px-1 py-1 text-[9px] font-medium',
                  right
                    ? 'border-[var(--acc)] bg-[var(--acc)] text-[var(--accInk)]'
                    : 'border-[var(--line)] text-fd-muted-foreground',
                ].join(' ')}
              >
                {right && <Check className="h-2.5 w-2.5" />}
                {a}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OrganizePreview() {
  return (
    <div className={frame} aria-hidden="true">
      <div className="flex w-full items-center gap-2">
        <div className="flex flex-1 flex-col gap-1.5">
          <span className={`${bar} w-full -rotate-3`} />
          <span className={`${bar} ml-2 w-3/5 rotate-2`} />
          <span className={`${bar} w-4/5 -rotate-1`} />
          <span className={`${bar} ml-1 w-2/5 rotate-3`} />
        </div>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--acc)]" />
        <div className="flex flex-1 flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex items-center gap-1">
              <span
                className={[
                  'flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-[3px] border',
                  i === 0 ? 'border-[var(--acc)] bg-[var(--acc)]' : 'border-[var(--acc)]',
                ].join(' ')}
              >
                {i === 0 && <Check className="h-2 w-2 text-[var(--accInk)]" />}
              </span>
              <span className="h-1.5 flex-1 rounded-full bg-[var(--acc)] opacity-35" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const BARS = [40, 65, 50, 90];

function AnalyzePreview() {
  return (
    <div className={frame} aria-hidden="true">
      <div className="flex w-full items-center gap-2">
        <div className="grid flex-1 grid-cols-3 gap-[3px]">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className={`h-2 rounded-[2px] ${i < 3 ? 'bg-[var(--muted)] opacity-60' : 'bg-[var(--muted)] opacity-25'}`} />
          ))}
        </div>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--acc)]" />
        <div className="flex h-14 flex-1 items-end gap-1 border-b border-l border-[var(--line)] pl-1">
          {BARS.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t-[2px] ${i === BARS.length - 1 ? 'bg-[var(--acc)]' : 'bg-[var(--acc)] opacity-40'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TrackPreview({ track }: { track: TrackId }) {
  if (track === 'build') return <QuizPreview />;
  if (track === 'organize') return <OrganizePreview />;
  return <AnalyzePreview />;
}
