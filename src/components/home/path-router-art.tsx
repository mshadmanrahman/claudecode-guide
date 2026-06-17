import type { JSX } from "react";

type ArtFn = () => JSX.Element;

export function CompareArt() {
  const lH = [44, 28, 58, 22];
  const rH = [30, 68, 26, 50];
  const bw = 12,
    g = 6,
    base = 72;
  const totalW = lH.length * bw + (lH.length - 1) * g;
  const sep = 20;
  const allW = 2 * totalW + sep;
  const lx = (240 - allW) / 2;
  const rx = lx + totalW + sep;
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {lH.map((h, i) => (
        <rect
          key={`l${i}`}
          x={lx + i * (bw + g)}
          y={base - h}
          width={bw}
          height={h}
          stroke="currentColor"
          strokeWidth={1.2}
          fill="none"
          opacity={0.5}
        />
      ))}
      {rH.map((h, i) => (
        <rect
          key={`r${i}`}
          x={rx + i * (bw + g)}
          y={base - h}
          width={bw}
          height={h}
          stroke="currentColor"
          strokeWidth={1.2}
          fill="none"
          opacity={0.5}
        />
      ))}
      <line
        x1={lx + totalW + sep / 2}
        y1={10}
        x2={lx + totalW + sep / 2}
        y2={base}
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="2 2"
        opacity={0.22}
      />
    </svg>
  );
}

export function ClaudeMdArt() {
  const layers = [
    { dx: 12, dy: 12, op: 0.18 },
    { dx: 6, dy: 6, op: 0.35 },
    { dx: 0, dy: 0, op: 0.65 },
  ];
  const bx = 52,
    by = 6,
    bw = 136,
    bh = 58;
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {layers.map(({ dx, dy, op }, i) => (
        <g key={i} opacity={op} stroke="currentColor">
          <rect
            x={bx - dx}
            y={by + dy}
            width={bw}
            height={bh}
            strokeWidth={1.2}
            rx={2}
          />
          <rect
            x={bx - dx + 12}
            y={by + dy + 16}
            width={bw * 0.52}
            height={1.5}
            fill="currentColor"
            stroke="none"
          />
          <rect
            x={bx - dx + 12}
            y={by + dy + 27}
            width={bw * 0.7}
            height={1.5}
            fill="currentColor"
            stroke="none"
          />
          <rect
            x={bx - dx + 12}
            y={by + dy + 38}
            width={bw * 0.4}
            height={1.5}
            fill="currentColor"
            stroke="none"
          />
        </g>
      ))}
    </svg>
  );
}

export function InterfaceArt() {
  const cx = 120,
    cy = 40,
    r = 28;
  const spokes = [
    { x: cx, y: cy - r },
    { x: cx + r, y: cy },
    { x: cx, y: cy + r },
    { x: cx - r, y: cy },
  ];
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.18}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.5}
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.13}
        strokeDasharray="2 2"
      />
      {spokes.map((s, i) => (
        <line
          key={`s${i}`}
          x1={cx}
          y1={cy}
          x2={s.x}
          y2={s.y}
          stroke="currentColor"
          strokeWidth={1.2}
          opacity={0.33}
        />
      ))}
      {spokes.map((s, i) => (
        <circle
          key={`d${i}`}
          cx={s.x}
          cy={s.y}
          r={3}
          fill="currentColor"
          opacity={i === 0 ? 0.72 : 0.28}
        />
      ))}
      <circle cx={cx} cy={cy} r={3.5} fill="currentColor" opacity={0.52} />
    </svg>
  );
}

export function TutorialsArt() {
  const steps = [
    { x: 44, y: 68 },
    { x: 76, y: 58 },
    { x: 108, y: 48 },
    { x: 140, y: 38 },
    { x: 172, y: 28 },
  ];
  const sw = 28,
    sh = 3;
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {steps.slice(0, -1).map((s, i) => (
        <line
          key={`r${i}`}
          x1={s.x + sw}
          y1={steps[i + 1].y}
          x2={s.x + sw}
          y2={s.y + sh}
          stroke="currentColor"
          strokeWidth={1.2}
          opacity={0.28}
        />
      ))}
      {steps.map((s, i) => (
        <rect
          key={`t${i}`}
          x={s.x}
          y={s.y}
          width={sw}
          height={sh}
          fill="currentColor"
          opacity={0.2 + i * 0.1}
        />
      ))}
      <circle
        cx={steps[4].x + sw / 2}
        cy={steps[4].y - 8}
        r={4.5}
        stroke="currentColor"
        strokeWidth={1.2}
        fill="none"
        opacity={0.55}
      />
    </svg>
  );
}

export function DesignersArt() {
  const pts = [
    [28, 58],
    [78, 8],
    [162, 72],
    [212, 32],
  ] as const;
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <path
        d={`M ${pts[0][0]} ${pts[0][1]} C ${pts[1][0]} ${pts[1][1]}, ${pts[2][0]} ${pts[2][1]}, ${pts[3][0]} ${pts[3][1]}`}
        stroke="currentColor"
        strokeWidth={1.5}
        fill="none"
        opacity={0.45}
      />
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={3.5}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          opacity={i === 0 || i === 3 ? 0.65 : 0.28}
        />
      ))}
      <line
        x1={pts[0][0]}
        y1={pts[0][1]}
        x2={pts[1][0]}
        y2={pts[1][1]}
        stroke="currentColor"
        strokeWidth={0.8}
        strokeDasharray="2 2"
        opacity={0.18}
      />
      <line
        x1={pts[2][0]}
        y1={pts[2][1]}
        x2={pts[3][0]}
        y2={pts[3][1]}
        stroke="currentColor"
        strokeWidth={0.8}
        strokeDasharray="2 2"
        opacity={0.18}
      />
    </svg>
  );
}

export function ChromeArt() {
  const bx = 30,
    by = 8,
    bw = 180,
    bh = 64;
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect
        x={bx}
        y={by}
        width={bw}
        height={bh}
        rx={4}
        stroke="currentColor"
        strokeWidth={1.2}
        opacity={0.45}
      />
      <rect
        x={bx}
        y={by}
        width={bw}
        height={18}
        rx={4}
        fill="currentColor"
        fillOpacity={0.05}
        stroke="none"
      />
      <line
        x1={bx}
        y1={by + 18}
        x2={bx + bw}
        y2={by + 18}
        stroke="currentColor"
        strokeWidth={0.8}
        opacity={0.2}
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={bx + 14 + i * 12}
          cy={by + 9}
          r={2.5}
          fill="currentColor"
          opacity={0.25}
        />
      ))}
      <rect
        x={bx + 62}
        y={by + 4}
        width={bw - 90}
        height={10}
        rx={5}
        stroke="currentColor"
        strokeWidth={0.8}
        opacity={0.2}
      />
      <circle
        cx={120}
        cy={51}
        r={18}
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        opacity={0.3}
      />
      <line
        x1={120}
        y1={33}
        x2={120}
        y2={69}
        stroke="currentColor"
        strokeWidth={0.8}
        opacity={0.16}
      />
      <line
        x1={102}
        y1={51}
        x2={138}
        y2={51}
        stroke="currentColor"
        strokeWidth={0.8}
        opacity={0.16}
      />
    </svg>
  );
}

export function MicrosoftArt() {
  const cols = 4,
    rows = 3;
  const cw = 38,
    ch = 18,
    x0 = 24,
    y0 = 11;
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect
        x={x0}
        y={y0}
        width={cols * cw}
        height={ch}
        fill="currentColor"
        fillOpacity={0.07}
      />
      {Array.from({ length: rows + 1 }, (_, r) => (
        <line
          key={`h${r}`}
          x1={x0}
          y1={y0 + r * ch}
          x2={x0 + cols * cw}
          y2={y0 + r * ch}
          stroke="currentColor"
          strokeWidth={0.8}
          opacity={0.22}
        />
      ))}
      {Array.from({ length: cols + 1 }, (_, c) => (
        <line
          key={`v${c}`}
          x1={x0 + c * cw}
          y1={y0}
          x2={x0 + c * cw}
          y2={y0 + rows * ch}
          stroke="currentColor"
          strokeWidth={0.8}
          opacity={0.22}
        />
      ))}
      {(
        [
          [1, 0, 0.52],
          [1, 1, 0.68],
          [1, 2, 0.38],
          [1, 3, 0.58],
          [2, 0, 0.72],
          [2, 1, 0.32],
          [2, 2, 0.8],
          [2, 3, 0.44],
        ] as const
      ).map(([r, c, f], i) => (
        <rect
          key={i}
          x={x0 + c * cw + 4}
          y={y0 + r * ch + 5}
          width={cw * f * 0.7}
          height={8}
          fill="currentColor"
          opacity={0.2}
        />
      ))}
    </svg>
  );
}

export function TeachersArt() {
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Blackboard frame */}
      <rect
        x={28}
        y={8}
        width={184}
        height={52}
        rx={3}
        stroke="currentColor"
        strokeWidth={1.5}
        opacity={0.55}
      />
      {/* Chalk text lines */}
      <line
        x1={50}
        y1={26}
        x2={136}
        y2={26}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.55}
      />
      <line
        x1={50}
        y1={36}
        x2={118}
        y2={36}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.38}
      />
      <line
        x1={50}
        y1={46}
        x2={100}
        y2={46}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.25}
      />
      {/* Check mark (graded item) */}
      <polyline
        points="148,29 156,38 172,22"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.6}
      />
      {/* Chalk tray */}
      <rect
        x={28}
        y={60}
        width={184}
        height={6}
        rx={1}
        fill="currentColor"
        opacity={0.12}
        stroke="currentColor"
        strokeWidth={0.8}
      />
      {/* Chalk pieces on tray */}
      <rect
        x={44}
        y={61.5}
        width={14}
        height={3}
        rx={1.5}
        fill="currentColor"
        opacity={0.35}
      />
      <rect
        x={64}
        y={61.5}
        width={10}
        height={3}
        rx={1.5}
        fill="currentColor"
        opacity={0.25}
      />
    </svg>
  );
}

export function MarketersArt() {
  const cx = 40,
    cy = 40;
  const radii = [12, 22, 32, 40];
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {radii.map((r, i) => (
        <path
          key={i}
          d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r}`}
          stroke="currentColor"
          strokeWidth={1.2}
          fill="none"
          opacity={0.1 + i * 0.1}
        />
      ))}
      <circle cx={cx} cy={cy} r={4} fill="currentColor" opacity={0.6} />
    </svg>
  );
}

export function HrArt() {
  const rows = [
    { label: "JD", w: 0.72 },
    { label: "IQ", w: 0.55 },
    { label: "30-60-90", w: 0.88 },
    { label: "Review", w: 0.6 },
  ];
  const x0 = 28,
    y0 = 10,
    rw = 184,
    rh = 14,
    gap = 5;
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Document rows */}
      {rows.map(({ w }, i) => (
        <g key={i}>
          <rect
            x={x0}
            y={y0 + i * (rh + gap)}
            width={rw}
            height={rh}
            rx={2}
            stroke="currentColor"
            strokeWidth={0.8}
            opacity={0.22}
          />
          <rect
            x={x0 + 8}
            y={y0 + i * (rh + gap) + 5}
            width={rw * w * 0.7}
            height={4}
            rx={2}
            fill="currentColor"
            opacity={0.18 + i * 0.06}
          />
        </g>
      ))}
      {/* People dots cluster */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={194 + i * 12}
          cy={58}
          r={5}
          stroke="currentColor"
          strokeWidth={1}
          fill="none"
          opacity={0.3 + i * 0.1}
        />
      ))}
      {/* Connector */}
      <line
        x1={x0 + rw}
        y1={y0 + 3 * (rh + gap) + rh / 2}
        x2={188}
        y2={58}
        stroke="currentColor"
        strokeWidth={0.8}
        strokeDasharray="2 2"
        opacity={0.2}
      />
    </svg>
  );
}

export const CARD_ART: Record<string, ArtFn> = {
  compare: CompareArt,
  "claude-md": ClaudeMdArt,
  interface: InterfaceArt,
  tutorials: TutorialsArt,
  designers: DesignersArt,
  chrome: ChromeArt,
  microsoft: MicrosoftArt,
  teachers: TeachersArt,
  marketers: MarketersArt,
  hr: HrArt,
};
