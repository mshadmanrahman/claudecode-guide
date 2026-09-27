import type { JSX, ReactNode } from 'react';

// Line art for the /docs section cards. 1px non-scaling strokes in
// currentColor, one element per drawing in var(--acc). The `.dv-flow` class
// (globals.css, docs visuals) animates a dash along the accent path and turns
// off under prefers-reduced-motion.

type ArtFn = () => JSX.Element;

const ACC = 'var(--acc)';

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 280 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke">
        {children}
      </g>
    </svg>
  );
}

/** Stacked layers, the base one in accent: everything else builds on it. */
export function FoundationsArt() {
  const layers = [0, 1, 2, 3];
  return (
    <Frame>
      {layers.map((i) => {
        const w = 120 + i * 28;
        const x = (280 - w) / 2;
        const y = 14 + i * 24;
        const base = i === layers.length - 1;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={16}
            rx={4}
            stroke={base ? ACC : 'currentColor'}
            fill={base ? 'var(--chip)' : 'none'}
            opacity={base ? 1 : 0.35 + i * 0.12}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </Frame>
  );
}

/** Five steps on a ring, one step lit and the edge into it flowing. */
export function FrameworksArt() {
  const cx = 140;
  const cy = 60;
  const r = 42;
  const nodes = Array.from({ length: 5 }, (_, i) => {
    const a = ((i * 72 - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
  const lit = 4;
  return (
    <Frame>
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % 5];
        const into = (i + 1) % 5 === lit;
        return (
          <line
            key={`e${i}`}
            x1={n.x}
            y1={n.y}
            x2={next.x}
            y2={next.y}
            stroke={into ? ACC : 'currentColor'}
            opacity={into ? 1 : 0.3}
            className={into ? 'dv-flow' : undefined}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
      {nodes.map((n, i) => (
        <rect
          key={`n${i}`}
          x={n.x - 9}
          y={n.y - 9}
          width={18}
          height={18}
          rx={4}
          fill="var(--bg)"
          stroke={i === lit ? ACC : 'currentColor'}
          opacity={i === lit ? 1 : 0.6}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </Frame>
  );
}

/** An event timeline with three hooks tapping off it, one of them firing. */
export function PatternsArt() {
  const taps = [70, 140, 210];
  return (
    <Frame>
      <line x1={24} y1={40} x2={256} y2={40} opacity={0.45} vectorEffect="non-scaling-stroke" />
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={`t${i}`}
          x1={24 + i * 21}
          y1={37}
          x2={24 + i * 21}
          y2={43}
          opacity={0.3}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {taps.map((x, i) => {
        const acc = i === 1;
        return (
          <g key={x}>
            <line
              x1={x}
              y1={40}
              x2={x}
              y2={78}
              stroke={acc ? ACC : 'currentColor'}
              opacity={acc ? 1 : 0.35}
              className={acc ? 'dv-flow' : undefined}
              vectorEffect="non-scaling-stroke"
            />
            <rect
              x={x - 26}
              y={78}
              width={52}
              height={24}
              rx={4}
              stroke={acc ? ACC : 'currentColor'}
              fill={acc ? 'var(--chip)' : 'none'}
              opacity={acc ? 1 : 0.45}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </Frame>
  );
}

/** Three inputs into one hub, two outputs out, one route traced in accent. */
export function WorkflowsArt() {
  const inputs = [30, 60, 90];
  const outputs = [44, 76];
  return (
    <Frame>
      {inputs.map((y, i) => (
        <path
          key={`i${i}`}
          d={`M62 ${y} C 96 ${y}, 100 60, 122 60`}
          stroke={i === 0 ? ACC : 'currentColor'}
          opacity={i === 0 ? 1 : 0.3}
          className={i === 0 ? 'dv-flow' : undefined}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {outputs.map((y, i) => (
        <path
          key={`o${i}`}
          d={`M158 60 C 180 60, 184 ${y}, 218 ${y}`}
          stroke={i === 1 ? ACC : 'currentColor'}
          opacity={i === 1 ? 1 : 0.3}
          className={i === 1 ? 'dv-flow' : undefined}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {inputs.map((y, i) => (
        <rect
          key={`in${i}`}
          x={22}
          y={y - 8}
          width={40}
          height={16}
          rx={4}
          stroke={i === 0 ? ACC : 'currentColor'}
          opacity={i === 0 ? 1 : 0.5}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <rect x={122} y={44} width={36} height={32} rx={6} stroke="currentColor" opacity={0.85} vectorEffect="non-scaling-stroke" />
      {outputs.map((y, i) => (
        <rect
          key={`out${i}`}
          x={218}
          y={y - 8}
          width={40}
          height={16}
          rx={4}
          stroke={i === 1 ? ACC : 'currentColor'}
          fill={i === 1 ? 'var(--chip)' : 'none'}
          opacity={i === 1 ? 1 : 0.5}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </Frame>
  );
}

/** A stack of files with the front one, the one you copy, in accent. */
export function TemplatesArt() {
  const layers = [
    { d: 16, op: 0.25 },
    { d: 8, op: 0.45 },
    { d: 0, op: 1 },
  ];
  const bx = 76;
  const by = 12;
  const bw = 128;
  const bh = 84;
  return (
    <Frame>
      {layers.map(({ d, op }, i) => {
        const front = i === layers.length - 1;
        const x = bx + d;
        const y = by + (16 - d);
        return (
          <g key={i} opacity={op} stroke={front ? ACC : 'currentColor'}>
            <rect x={x} y={y} width={bw} height={bh} rx={6} fill="var(--bg)" vectorEffect="non-scaling-stroke" />
            {front
              ? [0.5, 0.78, 0.62, 0.4].map((w, j) => (
                  <line
                    key={j}
                    x1={x + 14}
                    y1={y + 20 + j * 14}
                    x2={x + 14 + (bw - 28) * w}
                    y2={y + 20 + j * 14}
                    opacity={j === 0 ? 1 : 0.55}
                    vectorEffect="non-scaling-stroke"
                  />
                ))
              : null}
          </g>
        );
      })}
    </Frame>
  );
}

/** Two columns of rows side by side, one row highlighted across both. */
export function ComparisonsArt() {
  const rows = [0, 1, 2, 3, 4];
  const cols = [60, 150];
  const w = 72;
  const hl = 2;
  return (
    <Frame>
      {cols.map((x) => (
        <rect key={`c${x}`} x={x} y={10} width={w} height={100} rx={6} opacity={0.4} vectorEffect="non-scaling-stroke" />
      ))}
      {rows.map((r) =>
        cols.map((x) => (
          <line
            key={`${r}-${x}`}
            x1={x + 12}
            y1={28 + r * 17}
            x2={x + w - 12 - ((r + x) % 3) * 10}
            y2={28 + r * 17}
            opacity={r === hl ? 0 : 0.35}
            vectorEffect="non-scaling-stroke"
          />
        )),
      )}
      <rect
        x={54}
        y={28 + hl * 17 - 7}
        width={174}
        height={14}
        rx={4}
        stroke={ACC}
        fill="var(--chip)"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={132}
        y1={28 + hl * 17}
        x2={150}
        y2={28 + hl * 17}
        stroke={ACC}
        className="dv-flow"
        vectorEffect="non-scaling-stroke"
      />
    </Frame>
  );
}

const SECTION_ART: Record<string, ArtFn> = {
  Foundations: FoundationsArt,
  Frameworks: FrameworksArt,
  Patterns: PatternsArt,
  Workflows: WorkflowsArt,
  Templates: TemplatesArt,
  Comparisons: ComparisonsArt,
};

export function SectionArt({ section, className }: { section?: string; className?: string }) {
  if (!section) return null;
  const Art = SECTION_ART[section];
  if (!Art) return null;
  return (
    <div className={className}>
      <Art />
    </div>
  );
}
