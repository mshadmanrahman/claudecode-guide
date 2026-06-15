import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { DocPageInfo } from '@/lib/docs-navigation';

interface SectionIndexProps {
  sections: { name: string; pages: DocPageInfo[] }[];
}

// --- Generative SVG illustrations ---
// Each one is conceptually tied to its section topic.
// Monochromatic, uses currentColor so they adapt to light and dark mode.

function FoundationsArt() {
  // Horizontal segments that grow denser toward the base, like geological strata.
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

function FrameworksArt() {
  // Five nodes in a pentagon, connected in a cycle: the 5C Loop.
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

function PatternsArt() {
  // A dot grid where some dots are filled and others are outlines, forming a repeating pattern.
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

function WorkflowsArt() {
  // A directed flow: three inputs converge to a hub, then branch to two outputs.
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

function TemplatesArt() {
  // Three document rectangles stacked with a slight offset, representing ready-to-use templates.
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

function ComparisonsArt() {
  // Two groups of bars separated by a dashed divider, representing side-by-side comparison.
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

type IllustrationFn = () => React.JSX.Element;

const ILLUSTRATIONS: Record<string, IllustrationFn> = {
  Foundations: FoundationsArt,
  Frameworks:  FrameworksArt,
  Patterns:    PatternsArt,
  Workflows:   WorkflowsArt,
  Templates:   TemplatesArt,
  Comparisons: ComparisonsArt,
};

const DESCRIPTIONS: Record<string, string> = {
  Foundations: "The vocabulary, mental models, and comparisons you need before anything else makes sense.",
  Frameworks:  "Structured operating systems for working with Claude Code consistently, every session.",
  Patterns:    "Advanced techniques: hooks, skills, agents, and thinking modes that multiply your output.",
  Workflows:   "Step-by-step playbooks for developers, PMs, and designers. Real tasks, real outputs.",
  Templates:   "Drop-in CLAUDE.md starters for any project type, ready to customize and commit.",
  Comparisons: "How Claude Code stacks up against every major AI coding tool, side by side.",
};

const FEATURED_COUNT: Record<string, number> = {
  Foundations: 5,
  Frameworks:  4,
  Patterns:    4,
  Workflows:   4,
  Templates:   4,
  Comparisons: 4,
};

export function SectionIndex({ sections }: SectionIndexProps) {
  return (
    <div className="w-full">
      {/* Always-dark editorial hero, inspired by linear.app/method */}
      <section className="bg-[#0c0c0c] px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center animate-slide-up-fade">
        <p className="text-[10px] tracking-[0.22em] uppercase text-white/30 mb-7 font-medium">
          Claude Code Guide
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-[5rem] font-normal tracking-tight-display text-white leading-[0.95] max-w-2xl mx-auto">
          A guide for every kind of builder.
        </h1>
        <p className="mt-8 text-sm text-white/40 max-w-[22rem] mx-auto leading-relaxed">
          Six sections. One mental model. Start wherever it makes sense for you.
        </p>
      </section>

      {/* Section grid */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 gap-px bg-fd-border border border-fd-border rounded-xl overflow-hidden sm:grid-cols-2">
          {sections.map((section, i) => {
            const Illustration = ILLUSTRATIONS[section.name];
            const description  = DESCRIPTIONS[section.name];
            const featuredCount = FEATURED_COUNT[section.name] ?? 4;
            const featured  = section.pages.slice(0, featuredCount);
            const remaining = section.pages.length - featured.length;
            const firstPage = section.pages[0];

            return (
              <div
                key={section.name}
                className="bg-fd-background p-6 animate-slide-up-fade"
                style={{ animationDelay: `${80 + i * 55}ms` }}
              >
                {/* Generative SVG art */}
                <div className="mb-5 h-[110px] text-fd-foreground/40">
                  {Illustration && <Illustration />}
                </div>

                {/* Ordinal + section name */}
                <div className="flex items-baseline gap-3 mb-1">
                  <span
                    className="font-display text-3xl font-normal leading-none select-none shrink-0"
                    style={{ color: 'var(--color-fd-border)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-base font-semibold text-fd-foreground leading-tight">
                    {section.name}
                  </h2>
                </div>

                {description && (
                  <p className="mt-1 text-sm text-fd-muted-foreground leading-snug pl-[2.6rem]">
                    {description}
                  </p>
                )}

                <ul className="mt-4 space-y-0.5 border-t border-fd-border pt-4">
                  {featured.map((page) => (
                    <li key={page.slug}>
                      <Link
                        href={page.url}
                        className="group/link flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
                      >
                        <span className="flex-1 truncate">{page.title}</span>
                        <ArrowRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/link:opacity-50" />
                      </Link>
                    </li>
                  ))}
                </ul>

                {remaining > 0 && firstPage && (
                  <div className="mt-3 border-t border-fd-border pt-3">
                    <Link
                      href={firstPage.url}
                      className="flex items-center gap-1.5 text-xs text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                    >
                      <span>{remaining} more {remaining === 1 ? 'page' : 'pages'} in this section</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
