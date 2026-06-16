import type { JSX } from 'react';

export function HeroVisual(): JSX.Element {
  const cx = 380, cy = 190;
  const lx = 58, rx = 702;
  const ys = [105, 190, 275] as const;

  return (
    <svg
      viewBox="0 0 760 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <style>{`
          @keyframes dot-in-1 {
            0%    { stroke-dashoffset: 0;    opacity: 0;   }
            0.5%  { stroke-dashoffset: 0;    opacity: 0.9; }
            11%   { stroke-dashoffset: -350; opacity: 0.9; }
            12%   { stroke-dashoffset: -350; opacity: 0;   }
            100%  { stroke-dashoffset: -350; opacity: 0;   }
          }
          @keyframes dot-in-2 {
            0%,   33%  { stroke-dashoffset: 0;    opacity: 0;   }
            33.5%      { stroke-dashoffset: 0;    opacity: 0.9; }
            44%        { stroke-dashoffset: -350; opacity: 0.9; }
            45%        { stroke-dashoffset: -350; opacity: 0;   }
            100%       { stroke-dashoffset: -350; opacity: 0;   }
          }
          @keyframes dot-in-3 {
            0%,   66%  { stroke-dashoffset: 0;    opacity: 0;   }
            66.5%      { stroke-dashoffset: 0;    opacity: 0.9; }
            77%        { stroke-dashoffset: -350; opacity: 0.9; }
            78%        { stroke-dashoffset: -350; opacity: 0;   }
            100%       { stroke-dashoffset: -350; opacity: 0;   }
          }
          @keyframes dot-out-1 {
            0%,   17%  { stroke-dashoffset: 0;    opacity: 0;    }
            17.5%      { stroke-dashoffset: 0;    opacity: 0.68; }
            29%        { stroke-dashoffset: -350; opacity: 0.68; }
            30%        { stroke-dashoffset: -350; opacity: 0;    }
            100%       { stroke-dashoffset: -350; opacity: 0;    }
          }
          @keyframes dot-out-2 {
            0%,   50%  { stroke-dashoffset: 0;    opacity: 0;    }
            50.5%      { stroke-dashoffset: 0;    opacity: 0.68; }
            62%        { stroke-dashoffset: -350; opacity: 0.68; }
            63%        { stroke-dashoffset: -350; opacity: 0;    }
            100%       { stroke-dashoffset: -350; opacity: 0;    }
          }
          @keyframes dot-out-3 {
            0%,   83%  { stroke-dashoffset: 0;    opacity: 0;    }
            83.5%      { stroke-dashoffset: 0;    opacity: 0.68; }
            95%        { stroke-dashoffset: -350; opacity: 0.68; }
            96%        { stroke-dashoffset: -350; opacity: 0;    }
            100%       { stroke-dashoffset: -350; opacity: 0;    }
          }
          @keyframes hub-pulse {
            0%,  10%, 18%, 43%, 51%, 76%, 84%, 100% { opacity: 0.42; }
            13%, 16% { opacity: 0.92; }
            46%, 49% { opacity: 0.92; }
            79%, 82% { opacity: 0.92; }
          }
          @keyframes hub-inner {
            0%,  10%, 18%, 43%, 51%, 76%, 84%, 100% { opacity: 0.22; }
            13%, 16% { opacity: 0.55; }
            46%, 49% { opacity: 0.55; }
            79%, 82% { opacity: 0.55; }
          }
        `}</style>
      </defs>

      {/* Faint base lines: incoming dashed, outgoing solid */}
      {ys.map((y, i) => (
        <line key={`bi${i}`}
          x1={lx} y1={y} x2={cx} y2={cy}
          stroke="currentColor" strokeWidth={0.55}
          strokeDasharray="3 7" opacity={0.1}
        />
      ))}
      {ys.map((y, i) => (
        <line key={`bo${i}`}
          x1={cx} y1={cy} x2={rx} y2={y}
          stroke="currentColor" strokeWidth={0.55}
          opacity={0.1}
        />
      ))}

      {/* Left input nodes */}
      {ys.map((y, i) => (
        <g key={`ln${i}`}>
          <circle cx={lx} cy={y} r={13} stroke="currentColor" strokeWidth={0.8} opacity={0.22} />
          <circle cx={lx} cy={y} r={4.5} fill="currentColor" opacity={0.18} />
        </g>
      ))}

      {/* Right output nodes */}
      {ys.map((y, i) => (
        <circle key={`rn${i}`}
          cx={rx} cy={y} r={13}
          stroke="currentColor" strokeWidth={0.8} opacity={0.18}
        />
      ))}

      {/* Center hub */}
      <circle cx={cx} cy={cy} r={26}
        stroke="currentColor" strokeWidth={1.4}
        style={{ animation: 'hub-pulse 6s ease-in-out infinite' }}
      />
      <circle cx={cx} cy={cy} r={15}
        stroke="currentColor" strokeWidth={0.8}
        style={{ animation: 'hub-inner 6s ease-in-out infinite' }}
      />
      <circle cx={cx} cy={cy} r={5} fill="currentColor" opacity={0.72} />

      {/* Traveling dots: incoming top, middle, bottom in sequence */}
      <line x1={lx} y1={ys[0]} x2={cx} y2={cy}
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
        strokeDasharray="10 350"
        style={{ animation: 'dot-in-1 6s linear infinite' }}
      />
      <line x1={lx} y1={ys[1]} x2={cx} y2={cy}
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
        strokeDasharray="10 350"
        style={{ animation: 'dot-in-2 6s linear infinite' }}
      />
      <line x1={lx} y1={ys[2]} x2={cx} y2={cy}
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
        strokeDasharray="10 350"
        style={{ animation: 'dot-in-3 6s linear infinite' }}
      />

      {/* Traveling dots: outgoing top, middle, bottom in sequence */}
      <line x1={cx} y1={cy} x2={rx} y2={ys[0]}
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
        strokeDasharray="10 350"
        style={{ animation: 'dot-out-1 6s linear infinite' }}
      />
      <line x1={cx} y1={cy} x2={rx} y2={ys[1]}
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
        strokeDasharray="10 350"
        style={{ animation: 'dot-out-2 6s linear infinite' }}
      />
      <line x1={cx} y1={cy} x2={rx} y2={ys[2]}
        stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
        strokeDasharray="10 350"
        style={{ animation: 'dot-out-3 6s linear infinite' }}
      />
    </svg>
  );
}
