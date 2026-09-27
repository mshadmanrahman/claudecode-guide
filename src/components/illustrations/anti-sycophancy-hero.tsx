import { Fig } from '@/components/docs/diagram-kit';

// Figure for the "Stop Claude From Agreeing With Everything" page: two
// before/after trend charts and the nine-step checklist. 1px strokes, the
// pushback line in accent (the thing the page is about), agreement dashed.

interface AntiSycophancyHeroProps {
  className?: string;
}

const STEPS: ReadonlyArray<string> = [
  'Float a half-baked idea',
  'Claude calls it brilliant',
  'You ship the hole anyway',
  'Add "be more direct" to CLAUDE.md',
  'Drift returns next session',
  'Drop a global rules file once',
  'Every session loads it automatically',
  'Claude names the tradeoff',
  'Bad ideas die in chat, not prod',
];

const BEFORE_COUNT = 5;

const RISING = 'M 24 132 C 90 130, 150 122, 190 86 S 240 26, 260 18';
const FLAT = 'M 24 128 C 80 126, 140 132, 190 128 S 240 130, 260 129';
const DECLINING = 'M 24 60 C 80 78, 140 112, 190 126 S 240 132, 260 134';

function Chart({ phase }: { phase: 'before' | 'after' }) {
  const before = phase === 'before';
  const agreement = before ? RISING : DECLINING;
  const pushback = before ? FLAT : RISING;
  const summary = before
    ? 'Before: agreement climbs while pushback stays flat.'
    : 'After: pushback climbs while agreement falls away.';
  return (
    <div className="il-chart">
      <p className="dv-col-head">
        <span className={before ? undefined : 'dv-acc-text'}>{phase}</span>
      </p>
      <svg viewBox="0 0 280 150" className="h-auto w-full" role="img" aria-label={summary} fill="none">
        <g stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" opacity={0.45}>
          <line x1={24} y1={8} x2={24} y2={142} vectorEffect="non-scaling-stroke" />
          <line x1={24} y1={142} x2={272} y2={142} vectorEffect="non-scaling-stroke" />
          {[42, 76, 110].map((y) => (
            <line key={y} x1={24} y1={y} x2={272} y2={y} strokeDasharray="1 5" vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        <path
          d={agreement}
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.6}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={pushback}
          stroke="var(--acc)"
          strokeWidth={1.5}
          className={before ? undefined : 'dv-flow'}
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={260} cy={before ? 129 : 18} r={3} fill="var(--acc)" />
      </svg>
      <div className="il-legend">
        <span className="il-legend-key" aria-hidden />
        <span>agreement</span>
        <span className="il-legend-key il-legend-key--acc" aria-hidden />
        <span className="dv-acc-text">pushback</span>
        <span className="il-legend-axis">y: your time</span>
      </div>
    </div>
  );
}

export function AntiSycophancyHero({ className }: AntiSycophancyHeroProps) {
  return (
    <Fig
      label="how to"
      caption="A global rules file flips which line climbs."
      className={className}
    >
      <p className="il-fig-title">Stop Claude from agreeing with everything</p>
      <div className="il-hero-grid">
        <div className="dv-stack il-charts">
          <Chart phase="before" />
          <Chart phase="after" />
        </div>
        <ol className="il-steps">
          {STEPS.map((step, i) => {
            const after = i >= BEFORE_COUNT;
            return (
              <li key={step} className={after ? 'is-acc' : undefined}>
                <span className="il-step-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="il-step-text">{step}</span>
                {i === 0 || i === BEFORE_COUNT ? (
                  <span className={`dv-tag${after ? ' dv-tag--acc' : ''}`}>{after ? 'after' : 'before'}</span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </Fig>
  );
}
