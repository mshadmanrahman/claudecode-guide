// Hero illustration for the "Stop Claude From Agreeing With Everything" page.
// Two stacked Before/After charts (hand-drawn feel) plus a numbered checklist.
// Inspired by how-to-ai.guide infographics: serif framing, marker-highlight
// labels, dashed/solid line pairs, rough but readable.

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

interface ChartProps {
  label: 'Before' | 'After';
  labelTone: 'rose' | 'emerald';
  // The two trajectories. `risingId` decides which one climbs.
  risingId: 'agreement' | 'pushback';
}

function MarkerLabel({
  text,
  tone,
}: {
  text: string;
  tone: 'rose' | 'emerald';
}) {
  const bg =
    tone === 'rose'
      ? 'bg-rose-200/70 dark:bg-rose-400/30'
      : 'bg-emerald-200/70 dark:bg-emerald-400/30';
  return (
    <span className="relative inline-block font-display text-base sm:text-lg">
      <span
        aria-hidden
        className={`absolute inset-x-[-6px] inset-y-[2px] -rotate-2 rounded-sm ${bg}`}
      />
      <span className="relative px-1 italic">{text}</span>
    </span>
  );
}

function Chart({ label, labelTone, risingId }: ChartProps) {
  // Two trajectories. The "rising" one ends with an arrow and a coloured dot.
  // Coordinates picked by hand for a slightly organic curve. Keep stroke-linecap
  // round and use small bezier asymmetry for the hand-drawn feel.
  const agreementRising = risingId === 'agreement';
  const pushbackRising = risingId === 'pushback';

  // Path for the rising trajectory (steep curve up-right).
  const rising = 'M 38 152 C 110 150, 175 142, 215 100 S 268 32, 285 22';
  // Path for the recessed/flat trajectory.
  const flat = 'M 38 148 C 90 145, 150 152, 205 147 S 260 150, 285 149';
  // Path for the declining trajectory (after-state opposite curve).
  const declining = 'M 38 70 C 90 90, 150 130, 205 145 S 260 152, 285 154';

  const agreementPath = agreementRising ? rising : declining;
  const pushbackPath = pushbackRising ? rising : flat;

  return (
    <div className="relative">
      <div className="mb-2 flex items-center gap-2">
        <MarkerLabel text={label} tone={labelTone} />
      </div>
      <svg
        viewBox="0 0 320 180"
        className="h-auto w-full max-w-md text-fd-foreground"
        role="img"
        aria-label={`${label} chart`}
        fill="none"
      >
        {/* Y-axis */}
        <path
          d="M 30 14 L 30 162"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Y-axis arrow */}
        <path
          d="M 26 18 L 30 12 L 34 18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* X-axis */}
        <path
          d="M 28 162 L 296 162"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* X-axis arrow */}
        <path
          d="M 292 158 L 298 162 L 292 166"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Y-axis label */}
        <text
          x="-90"
          y="14"
          transform="rotate(-90)"
          className="font-display"
          fontSize="11"
          fontStyle="italic"
          fill="currentColor"
          opacity="0.75"
        >
          Your time
        </text>

        {/* Recessed trajectory: dashed */}
        <path
          d={agreementRising ? pushbackPath : agreementPath}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 4"
          opacity="0.55"
        />
        {/* Rising trajectory: solid */}
        <path
          d={rising}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Arrowhead on rising line */}
        <path
          d="M 278 28 L 287 20 L 286 32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* End dots */}
        {/* Agreement dot (red) */}
        <circle
          cx={agreementRising ? 285 : 285}
          cy={agreementRising ? 22 : 154}
          r="5"
          className="fill-rose-500"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        {/* Pushback dot (green) */}
        <circle
          cx={pushbackRising ? 285 : 285}
          cy={pushbackRising ? 22 : 149}
          r="5"
          className="fill-emerald-500"
          stroke="currentColor"
          strokeWidth="1.2"
        />

        {/* Trajectory labels: rising goes in the upper-left empty quadrant
            so the rising curve doesn't bisect the text; recessed goes near
            its low endpoint dot, since the curve is flat there. */}
        <text
          x="150"
          y="58"
          className="font-display"
          fontSize="13"
          fontWeight="600"
          fill="currentColor"
        >
          {agreementRising ? 'Agreement' : 'Pushback'}
        </text>
        <text
          x="216"
          y="138"
          className="font-display"
          fontSize="13"
          fontWeight="600"
          fill="currentColor"
        >
          {agreementRising ? 'Pushback' : 'Agreement'}
        </text>
      </svg>
    </div>
  );
}

function Checklist() {
  return (
    <ol className="space-y-2.5 text-sm">
      {STEPS.map((step, i) => (
        <li
          key={step}
          className="flex items-baseline gap-3 font-mono text-[12.5px] leading-relaxed text-fd-foreground"
        >
          <span aria-hidden className="text-fd-muted-foreground">
            •
          </span>
          <span className="flex-1">
            {step}
            <span
              aria-hidden
              className="ml-1 text-fd-muted-foreground/50 tracking-widest"
            >
              {'.'.repeat(Math.max(2, 26 - step.length))}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export function AntiSycophancyHero({ className }: AntiSycophancyHeroProps) {
  return (
    <div className={`not-prose my-8 ${className ?? ''}`}>
      <div className="rounded-2xl border border-fd-border bg-fd-card/60 p-6 sm:p-8">
        <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-fd-muted-foreground">
          How to
        </p>
        <h2 className="font-display text-2xl font-normal leading-tight tracking-tight-display text-fd-foreground sm:text-3xl">
          Stop Claude from agreeing with everything
        </h2>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <div className="space-y-6">
            <Chart label="Before" labelTone="rose" risingId="agreement" />
            <Chart label="After" labelTone="emerald" risingId="pushback" />
          </div>
          <Checklist />
        </div>
      </div>
    </div>
  );
}
