import type { JSX } from 'react';

export function HeroVisual(): JSX.Element {
  const cx = 380, cy = 190;
  const orbits = [
    { r: 74,  dur: '7s',  delay: '0s',  cw: true,  dotR: 5,   op: 0.62 },
    { r: 144, dur: '12s', delay: '-5s', cw: false, dotR: 4,   op: 0.48 },
    { r: 185, dur: '18s', delay: '-8s', cw: true,  dotR: 3.5, op: 0.36 },
  ];

  return (
    <svg viewBox="0 0 760 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <style>{`
          @keyframes orbit-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes orbit-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
          @keyframes orbit-breathe { 0%, 100% { opacity: 0.04; } 50% { opacity: 0.11; } }
        `}</style>
      </defs>

      {/* Orbit rings */}
      {orbits.map((o, i) => (
        <circle key={`ring-${i}`} cx={cx} cy={cy} r={o.r} stroke="currentColor" strokeWidth={0.6} opacity={0.08} />
      ))}

      {/* Center: breathing glow */}
      <circle cx={cx} cy={cy} r={38} fill="currentColor" stroke="none" style={{ animation: 'orbit-breathe 4s ease-in-out infinite' }} />
      {/* Center: dashed outer */}
      <circle cx={cx} cy={cy} r={27} stroke="currentColor" strokeWidth={0.8} strokeDasharray="2 3" opacity={0.18} />
      {/* Center: solid ring */}
      <circle cx={cx} cy={cy} r={14} stroke="currentColor" strokeWidth={1.5} opacity={0.45} />
      {/* Center: core */}
      <circle cx={cx} cy={cy} r={5.5} fill="currentColor" opacity={0.58} />

      {/* Orbiting dots */}
      {orbits.map((o, i) => (
        <g key={`dot-${i}`} transform={`translate(${cx}, ${cy})`}>
          <g style={{
            transformOrigin: '0 0',
            animation: `${o.cw ? 'orbit-cw' : 'orbit-ccw'} ${o.dur} linear ${o.delay} infinite`,
          }}>
            <circle cx={o.r} cy={0} r={o.dotR} fill="currentColor" opacity={o.op} />
          </g>
        </g>
      ))}
    </svg>
  );
}
