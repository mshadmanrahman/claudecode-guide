import type { JSX } from 'react';

type ArtFn = () => JSX.Element;

export function MorningArt(): JSX.Element {
  const cx = 120, cy = 40, r = 18;
  return (
    <svg viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <circle cx={cx} cy={cy} r={r} stroke="currentColor" strokeWidth={1.2} opacity={0.45} />
      <circle cx={cx} cy={cy} r={r * 0.42} fill="currentColor" opacity={0.1} stroke="none" />
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const x1 = cx + Math.cos(angle) * (r + 5);
        const y1 = cy + Math.sin(angle) * (r + 5);
        const len = i % 2 === 0 ? 14 : 9;
        const x2 = cx + Math.cos(angle) * (r + 5 + len);
        const y2 = cy + Math.sin(angle) * (r + 5 + len);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={i % 2 === 0 ? 1.2 : 0.8} opacity={i % 2 === 0 ? 0.42 : 0.22} />;
      })}
    </svg>
  );
}

export function ResearchArt(): JSX.Element {
  const lx = 104, ly = 36, lr = 21;
  const hAngle = Math.PI / 4;
  const hx1 = lx + Math.cos(hAngle) * lr;
  const hy1 = ly + Math.sin(hAngle) * lr;
  return (
    <svg viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <circle cx={lx} cy={ly} r={lr} stroke="currentColor" strokeWidth={1.2} opacity={0.45} />
      <line x1={hx1} y1={hy1} x2={hx1 + 22} y2={hy1 + 22} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" opacity={0.45} />
      {[0, 9, 18].map((dy, i) => (
        <line key={i} x1={lx - 12} y1={ly - 10 + dy} x2={lx + (i === 1 ? 10 : 7)} y2={ly - 10 + dy} stroke="currentColor" strokeWidth={0.9} opacity={0.22} />
      ))}
    </svg>
  );
}

export function ReviewArt(): JSX.Element {
  const bx = 78, by = 6, bw = 72, bh = 60;
  return (
    <svg viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <rect x={bx + 10} y={by + 8} width={bw} height={bh} rx={2} stroke="currentColor" strokeWidth={0.8} opacity={0.2} />
      <rect x={bx} y={by} width={bw} height={bh} rx={2} stroke="currentColor" strokeWidth={1.2} opacity={0.48} />
      {[0, 11, 22, 33].map((dy, i) => (
        <line key={i} x1={bx + 12} y1={by + 16 + dy} x2={bx + (i === 2 ? 44 : 60)} y2={by + 16 + dy} stroke="currentColor" strokeWidth={0.9} opacity={0.22} />
      ))}
      <path d={`M${bx + bw - 16} ${by + bh - 13} l5 5 8 -9`} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" opacity={0.52} />
    </svg>
  );
}

export function RecapArt(): JSX.Element {
  const items = [96, 72, 56];
  const x0 = 72, y0 = 20, gap = 18;
  return (
    <svg viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {items.map((w, i) => (
        <g key={i}>
          <circle cx={x0 - 14} cy={y0 + i * gap} r={2.5} fill="currentColor" opacity={0.30 + i * 0.08} />
          <line x1={x0} y1={y0 + i * gap} x2={x0 + w} y2={y0 + i * gap} stroke="currentColor" strokeWidth={1} opacity={0.25 + i * 0.07} />
        </g>
      ))}
      <line x1={58} y1={70} x2={182} y2={70} stroke="currentColor" strokeWidth={0.7} strokeDasharray="3 4" opacity={0.12} />
    </svg>
  );
}

export const DAY_ART: Record<string, ArtFn> = {
  '8am':  MorningArt,
  '10am': ResearchArt,
  '2pm':  ReviewArt,
  '5pm':  RecapArt,
};
