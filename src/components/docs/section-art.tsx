import type { JSX } from 'react';

type ArtFn = () => JSX.Element;

export function FoundationsArt() {
  const rows = [
    { y: 102, count: 12, w: 14, gap: 5 },
    { y:  82, count:  9, w: 14, gap: 7 },
    { y:  62, count:  6, w: 14, gap: 10 },
    { y:  42, count:  3, w: 14, gap: 16 },
    { y:  22, count:  1, w: 14, gap: 0 },
  ];
  return (
    <svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {rows.map((row, ri) => {
        const total = row.count * row.w + Math.max(0, row.count - 1) * row.gap;
        const x0 = (280 - total) / 2;
        return Array.from({ length: row.count }, (_, si) => (
          <rect
            key={`${ri}-${si}`}
            x={x0 + si * (row.w + row.gap)}
            y={row.y}
            width={row.w}
            height={2}
            fill="currentColor"
            opacity={0.3 + ri * 0.13}
          />
        ));
      })}
    </svg>
  );
}

export function FrameworksArt() {
  const cx = 140, cy = 60, r = 44;
  const nodes = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  return (
    <svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % 5];
        const dx = next.x - n.x, dy = next.y - n.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len, uy = dy / len;
        return (
          <line
            key={`e-${i}`}
            x1={n.x + ux * 9} y1={n.y + uy * 9}
            x2={next.x - ux * 9} y2={next.y - uy * 9}
            stroke="currentColor" strokeWidth={1} opacity={0.25}
          />
        );
      })}
      {nodes.map((n, i) => (
        <circle key={`n-${i}`} cx={n.x} cy={n.y} r={8}
          stroke="currentColor" strokeWidth={1.5} fill="none" opacity={0.7} />
      ))}
      {nodes.map((n, i) => (
        <text key={`t-${i}`} x={n.x} y={n.y + 3.5}
          textAnchor="middle" fontSize={6.5} fill="currentColor" opacity={0.5} fontFamily="monospace">
          C
        </text>
      ))}
      <circle cx={cx} cy={cy} r={2.5} fill="currentColor" opacity={0.22} />
    </svg>
  );
}

export function PatternsArt() {
  const cols = 10, rows = 4, sp = 24, r = 5;
  const x0 = (280 - (cols - 1) * sp) / 2;
  const y0 = (120 - (rows - 1) * sp) / 2;
  return (
    <svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => {
          const filled = (row * 3 + col * 2) % 5 === 0;
          const small  = (row + col) % 7 === 3;
          return (
            <circle
              key={`${row}-${col}`}
              cx={x0 + col * sp}
              cy={y0 + row * sp}
              r={small ? r * 0.45 : r}
              fill={filled ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={1.2}
              opacity={filled ? 0.65 : small ? 0.18 : 0.32}
            />
          );
        })
      )}
    </svg>
  );
}

export function WorkflowsArt() {
  const inputs  = [{ x: 44, y: 36 }, { x: 44, y: 60 }, { x: 44, y: 84 }];
  const hub     = { x: 140, y: 60 };
  const outputs = [{ x: 236, y: 44 }, { x: 236, y: 76 }];

  function arrow(x1: number, y1: number, x2: number, y2: number, k: string) {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len, uy = dy / len;
    const ex = x2 - ux * 10, ey = y2 - uy * 10;
    return (
      <g key={k} opacity={0.33} stroke="currentColor" fill="none">
        <line x1={x1 + ux * 10} y1={y1 + uy * 10} x2={ex} y2={ey} strokeWidth={1} />
        <polyline
          points={`${ex - ux * 5 + uy * 4},${ey - uy * 5 - ux * 4} ${ex},${ey} ${ex - ux * 5 - uy * 4},${ey - uy * 5 + ux * 4}`}
          strokeWidth={1}
        />
      </g>
    );
  }

  return (
    <svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {inputs.map((n, i) => arrow(n.x, n.y, hub.x, hub.y, `i${i}`))}
      {outputs.map((n, i) => arrow(hub.x, hub.y, n.x, n.y, `o${i}`))}
      {inputs.map((n, i) => (
        <circle key={`in-${i}`} cx={n.x} cy={n.y} r={8}
          stroke="currentColor" strokeWidth={1.5} fill="none" opacity={0.55} />
      ))}
      <circle cx={hub.x} cy={hub.y} r={11}
        stroke="currentColor" strokeWidth={1.5} fill="none" opacity={0.88} />
      <circle cx={hub.x} cy={hub.y} r={3.5} fill="currentColor" opacity={0.45} />
      {outputs.map((n, i) => (
        <circle key={`out-${i}`} cx={n.x} cy={n.y} r={8}
          stroke="currentColor" strokeWidth={1.5} fill="none" opacity={0.55} />
      ))}
    </svg>
  );
}

export function TemplatesArt() {
  const layers = [
    { dx: 12, dy: 12, op: 0.2 },
    { dx:  6, dy:  6, op: 0.38 },
    { dx:  0, dy:  0, op: 0.68 },
  ];
  const bx = 60, by = 14, bw = 160, bh = 88;
  return (
    <svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {layers.map(({ dx, dy, op }, i) => (
        <g key={i} opacity={op} stroke="currentColor">
          <rect x={bx - dx} y={by + dy} width={bw} height={bh} strokeWidth={1.5} rx={3} />
          <rect x={bx - dx + 14} y={by + dy + 18} width={bw * 0.55} height={2} fill="currentColor" stroke="none" />
          <rect x={bx - dx + 14} y={by + dy + 30} width={bw * 0.75} height={2} fill="currentColor" stroke="none" />
          <rect x={bx - dx + 14} y={by + dy + 42} width={bw * 0.45} height={2} fill="currentColor" stroke="none" />
        </g>
      ))}
    </svg>
  );
}

export function ComparisonsArt() {
  const leftH  = [70, 44, 82, 36];
  const rightH = [52, 88, 38, 72];
  const bw = 16, gap = 9, base = 104;
  const leftW  = leftH.length  * bw + (leftH.length  - 1) * gap;
  const rightW = rightH.length * bw + (rightH.length - 1) * gap;
  const totalW = leftW + 28 + rightW;
  const lx = (280 - totalW) / 2;
  const rx = lx + leftW + 28;

  return (
    <svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {leftH.map((h, i) => (
        <rect key={`l${i}`} x={lx + i * (bw + gap)} y={base - h} width={bw} height={h}
          stroke="currentColor" strokeWidth={1.5} fill="none" opacity={0.58} />
      ))}
      {rightH.map((h, i) => (
        <rect key={`r${i}`} x={rx + i * (bw + gap)} y={base - h} width={bw} height={h}
          stroke="currentColor" strokeWidth={1.5} fill="none" opacity={0.58} />
      ))}
      <line x1={lx + leftW + 14} y1={12} x2={lx + leftW + 14} y2={base}
        stroke="currentColor" strokeWidth={1} strokeDasharray="3 3" opacity={0.28} />
      <line x1={lx - 4} y1={base} x2={rx + rightW + 4} y2={base}
        stroke="currentColor" strokeWidth={1} opacity={0.28} />
    </svg>
  );
}

const SECTION_ART: Record<string, ArtFn> = {
  Foundations: FoundationsArt,
  Frameworks:  FrameworksArt,
  Patterns:    PatternsArt,
  Workflows:   WorkflowsArt,
  Templates:   TemplatesArt,
  Comparisons: ComparisonsArt,
};

export function SectionArt({ section, className }: { section?: string; className?: string }) {
  if (!section) return null;
  const Art = SECTION_ART[section];
  if (!Art) return null;
  return <div className={className}><Art /></div>;
}
