'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { ElementType } from 'react';

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

interface JourneyNode {
  id: string;
  title: string;
  description: string;
  href: string;
  duration?: string;
  icon: ElementType;
  audiences?: string[];
  badge?: string;
  isDecisionPoint?: boolean;
  affiliateLabel?: string;
  affiliateHref?: string;
}

interface Stage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  headerColor: string;
  headerBg: string;
  nodes: JourneyNode[];
}

interface LearningTreeProps {
  stages: Stage[];
}

/* ─────────────────────────────────────────────
   Stage color config
   ───────────────────────────────────────────── */

const stageColors: Record<string, {
  node: string;
  nodeBorder: string;
  label: string;
  labelBg: string;
  dot: string;
  line: string;
  badge: string;
  badgeText: string;
  glow: string;
}> = {
  understand: {
    node: 'bg-[var(--chip)]  hover:bg-[var(--chip)] ',
    nodeBorder: 'border-[var(--line)]  hover:border-[var(--acc)] ',
    label: 'text-[var(--acc)] ',
    labelBg: 'bg-[var(--chip)] ',
    dot: 'bg-[var(--acc)]',
    line: '#22c55e',
    badge: 'bg-[var(--chip)] ',
    badgeText: 'text-[var(--acc)] ',
    glow: 'shadow-green-200/60 dark:shadow-green-900/40',
  },
  setup: {
    node: 'bg-[var(--chip)]  hover:bg-[var(--chip)] ',
    nodeBorder: 'border-[var(--line)]  hover:border-[var(--acc)] ',
    label: 'text-[var(--acc)] ',
    labelBg: 'bg-[var(--chip)] ',
    dot: 'bg-[var(--acc)]',
    line: '#3b82f6',
    badge: 'bg-[var(--chip)] ',
    badgeText: 'text-[var(--acc)] ',
    glow: 'shadow-blue-200/60 dark:shadow-blue-900/40',
  },
  'first-win': {
    node: 'bg-[var(--chip)]  hover:bg-[var(--chip)] ',
    nodeBorder: 'border-[var(--line)]  hover:border-[var(--acc)] ',
    label: 'text-[var(--acc)] ',
    labelBg: 'bg-[var(--chip)] ',
    dot: 'bg-[var(--acc)]',
    line: '#f59e0b',
    badge: 'bg-[var(--chip)] ',
    badgeText: 'text-[var(--acc)] ',
    glow: 'shadow-amber-200/60 dark:shadow-amber-900/40',
  },
  'build-habits': {
    node: 'bg-[var(--chip)]  hover:bg-[var(--chip)] ',
    nodeBorder: 'border-[var(--line)]  hover:border-[var(--acc)] ',
    label: 'text-[var(--acc)] ',
    labelBg: 'bg-[var(--chip)] ',
    dot: 'bg-[var(--acc)]',
    line: '#a855f7',
    badge: 'bg-[var(--chip)] ',
    badgeText: 'text-[var(--acc)] ',
    glow: 'shadow-purple-200/60 dark:shadow-purple-900/40',
  },
  'level-up': {
    node: 'bg-[var(--code)]  hover:bg-[var(--code)] ',
    nodeBorder: 'border-[var(--line)]  hover:border-[var(--line)] ',
    label: 'text-red-700 dark:text-red-300 ',
    labelBg: 'bg-[var(--code)] ',
    dot: 'bg-[var(--code)]',
    line: '#f43f5e',
    badge: 'bg-[var(--code)] ',
    badgeText: 'text-red-700 dark:text-red-300 ',
    glow: 'shadow-rose-200/60 dark:shadow-rose-900/40',
  },
  mastery: {
    node: 'bg-[var(--chip)]  hover:bg-[var(--chip)] ',
    nodeBorder: 'border-[var(--line)]  hover:border-[var(--acc)] ',
    label: 'text-[var(--acc)] ',
    labelBg: 'bg-[var(--chip)] ',
    dot: 'bg-[var(--acc)]',
    line: '#6366f1',
    badge: 'bg-[var(--chip)] ',
    badgeText: 'text-[var(--acc)] ',
    glow: 'shadow-indigo-200/60 dark:shadow-indigo-900/40',
  },
};

function getStageColor(stageId: string) {
  return stageColors[stageId] ?? stageColors['understand'];
}

/* ─────────────────────────────────────────────
   useInView hook
   ───────────────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─────────────────────────────────────────────
   TreeNode component
   ───────────────────────────────────────────── */

interface TreeNodeProps {
  node: JourneyNode;
  stageId: string;
  isStartHere: boolean;
  animationDelay: number;
  inView: boolean;
}

function TreeNode({ node, stageId, isStartHere, animationDelay, inView }: TreeNodeProps) {
  const colors = getStageColor(stageId);
  const Icon = node.icon;

  return (
    <Link
      href={node.href}
      className={[ 'group/node relative flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all duration-200',
        'cursor-pointer no-underline',
        'h-[120px] w-full min-w-0',
        colors.node,
        colors.nodeBorder,
        'hover:scale-[1.03] ',
        colors.glow,
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        'transition-all motion-reduce:transition-none duration-500',
        isStartHere ? 'ring-2 ring-offset-1 ring-[var(--acc)] ' : '',
      ].join(' ')}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      {/* Icon */}
      <span className={[ 'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
        colors.labelBg,
      ].join(' ')}>
        <Icon className={`h-4 w-4 ${colors.label}`} />
      </span>

      {/* Title */}
      <span className={`text-[11px] font-semibold leading-snug text-center ${colors.label} line-clamp-3`}>
        {node.title}
      </span>

      {/* Badge or duration (pick one to keep it clean) */}
      <div className="flex items-center gap-1 mt-auto">
        {isStartHere ? (
          <span className="rounded-full bg-[var(--acc)] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[var(--accInk)] animate-pulse font-mono motion-reduce:animate-none">
            start
          </span>
        ) : node.badge ? (
          <span className={[ 'rounded-full px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide font-mono',
            colors.badge,
            colors.badgeText,
          ].join(' ')}>
            {node.badge}
          </span>
        ) : node.duration ? (
          <span className="text-[9px] text-fd-muted-foreground">
            {node.duration}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   MobileTimeline (shown on small screens)
   ───────────────────────────────────────────── */

function MobileTimeline({ stages }: { stages: Stage[] }) {
  return (
    <div className="flex flex-col gap-0 md:hidden">
      {stages.map((stage, stageIdx) => {
        const colors = getStageColor(stage.id);
        const { ref, inView } = useInView(0.1);

        return (
          <div key={stage.id} ref={ref} className="relative flex gap-4">
            {/* Left: dot + line */}
            <div className="flex flex-col items-center shrink-0 w-8">
              <div className={[ 'h-3 w-3 rounded-full shrink-0 mt-5 z-10 transition-all motion-reduce:transition-none duration-500',
                colors.dot,
                inView ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
              ].join(' ')}
                style={{ transitionDelay: '100ms' }}
              />
              {stageIdx < stages.length - 1 && (
                <div className="w-px flex-1 bg-fd-border mt-1" />
              )}
            </div>

            {/* Right: stage content */}
            <div className={[ 'flex-1 pb-6 transition-all motion-reduce:transition-none duration-500',
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4',
            ].join(' ')}
              style={{ transitionDelay: '150ms' }}
            >
              {/* Stage label */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`font-mono text-xs font-bold ${colors.label}`}>
                  {stage.number}
                </span>
                <span className={`text-sm font-semibold ${colors.label}`}>
                  {stage.title}
                </span>
                <span className="text-xs text-fd-muted-foreground">{stage.subtitle}</span>
              </div>

              {/* Nodes in a 2-col grid */}
              <div className="grid grid-cols-2 gap-2">
                {stage.nodes.map((node, nodeIdx) => (
                  <TreeNode
                    key={node.id}
                    node={node}
                    stageId={stage.id}
                    isStartHere={node.badge === 'start here'}
                    animationDelay={200 + nodeIdx * 60}
                    inView={inView}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DesktopTree (shown on md+ screens)
   Pure CSS connectors, no SVG measurement.
   ───────────────────────────────────────────── */

function DesktopTree({ stages }: { stages: Stage[] }) {
  return (
    <div className="relative hidden md:block">
      <div className="flex flex-col gap-0">
        {stages.map((stage, stageIdx) => {
          const colors = getStageColor(stage.id);
          const { ref: stageRef, inView } = useInView(0.15);

          return (
            <div key={stage.id} ref={stageRef}>
              {/* Vertical connector line between stages */}
              {stageIdx > 0 && (
                <div className="flex justify-center py-1">
                  <div
                    className="w-px h-8"
                    style={{ backgroundColor: colors.line, opacity: 0.35 }}
                  />
                </div>
              )}

              {/* Stage label row */}
              <div className={[ 'flex items-center gap-3 mb-3 transition-all motion-reduce:transition-none duration-500',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
              ].join(' ')}>
                <span className={[ 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold font-mono',
                  colors.labelBg,
                  colors.label,
                ].join(' ')}>
                  {stage.number}
                </span>
                <div>
                  <span className={`text-sm font-bold ${colors.label}`}>
                    {stage.title}
                  </span>
                  <span className="ml-2 text-xs text-fd-muted-foreground">
                    {stage.subtitle}
                  </span>
                </div>
                <div className="flex-1 h-px bg-fd-border/60" />
              </div>

              {/* Node grid: fixed columns based on count, all same size */}
              <div
                className={[ 'grid gap-2.5',
                  stage.nodes.length <= 3 ? 'grid-cols-3' :
                  stage.nodes.length === 4 ? 'grid-cols-4' :
                  stage.nodes.length === 5 ? 'grid-cols-5' :
                  'grid-cols-3 lg:grid-cols-6',
                ].join(' ')}
              >
                {stage.nodes.map((node, nodeIdx) => (
                  <TreeNode
                    key={node.id}
                    node={node}
                    stageId={stage.id}
                    isStartHere={node.badge === 'start here'}
                    animationDelay={stageIdx * 80 + nodeIdx * 60}
                    inView={inView}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main export
   ───────────────────────────────────────────── */

export function LearningTree({ stages }: LearningTreeProps) {
  return (
    <div className="w-full">
      <MobileTimeline stages={stages} />
      <DesktopTree stages={stages} />
    </div>
  );
}
