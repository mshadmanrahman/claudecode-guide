'use client';

import { useInView } from '@/hooks/use-in-view';

const STAGES = ['Brief', 'Research', 'Direction', 'Frames', 'Critique', 'Handoff', 'Build', 'Ship'];

const LAYERS = [
  {
    id: 'claude-ai',
    label: '[AI]',
    sublabel: 'Claude.ai',
    addedLabel: 'Baseline',
    addedBadgeStyle: 'bg-[var(--code)] text-[var(--ink)]',
    addedStages: ['Brief', 'Research', 'Critique'],
    allCoveredStages: ['Brief', 'Research', 'Critique'],
    newDotStyle: 'bg-[var(--muted)]',
    inheritedDotStyle: 'bg-[var(--code)]',
    description:
      'Everything in conversation. Interrogates briefs, synthesizes research, critiques designs. No files, no code, no terminal.',
  },
  {
    id: 'co-work',
    label: '[CW]',
    sublabel: 'Co-Work',
    addedLabel: '+ Direction, Handoff',
    addedBadgeStyle: 'bg-[var(--chip)] text-[var(--acc)]  ',
    addedStages: ['Direction', 'Handoff'],
    allCoveredStages: ['Brief', 'Research', 'Direction', 'Critique', 'Handoff'],
    newDotStyle: 'bg-[var(--acc)] ',
    inheritedDotStyle: 'bg-[var(--code)]',
    description:
      'Reads files from your local folder. Challenges direction before you commit to frames. Reads Figma exports for handoff prep.',
  },
  {
    id: 'claude-code',
    label: '[CC]',
    sublabel: 'Claude Code',
    addedLabel: '+ Frames, Build, Ship',
    addedBadgeStyle: 'bg-[var(--chip)] text-[var(--acc)]  ',
    addedStages: ['Frames', 'Build', 'Ship'],
    allCoveredStages: ['Brief', 'Research', 'Direction', 'Frames', 'Critique', 'Handoff', 'Build', 'Ship'],
    newDotStyle: 'bg-[var(--acc)] ',
    inheritedDotStyle: 'bg-[var(--code)]',
    description:
      'Full coverage. Every stage from brief to ship. Adds prototype generation, working code from Figma prep, and Git-based version control.',
  },
];

export function DesignerProcessMap() {
  const [ref, inView] = useInView(0.05);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">03</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            What each journey unlocks
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Each journey covers everything the previous one does, and adds new stages on top. Pick your level and see what you gain.
          </p>
        </div>

        <div
          className={`transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
          style={{ animationDelay: '100ms' }}
        >
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-5 mb-6">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[var(--acc)]" />
              <span className="text-[10px] text-fd-muted-foreground">New at this tier</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[var(--code)] border border-fd-border" />
              <span className="text-[10px] text-fd-muted-foreground">Inherited from previous</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-fd-border" />
              <span className="text-[10px] text-fd-muted-foreground">Not covered</span>
            </div>
          </div>

          <div className="overflow-x-auto -mx-6 px-6">
            <div style={{ minWidth: '600px' }}>
              {/* Stage header row */}
              <div
                className="grid items-center border-b border-fd-border pb-3 mb-1"
                style={{ gridTemplateColumns: '180px repeat(8, 1fr)' }}
              >
                <div />
                {STAGES.map((stage) => (
                  <div key={stage} className="text-center">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-fd-muted-foreground font-mono">
                      {stage}
                    </span>
                  </div>
                ))}
              </div>

              {/* Journey rows */}
              {LAYERS.map((layer, ji) => (
                <div
                  key={layer.id}
                  className={`grid items-center border-b border-fd-border py-4 transition-all motion-reduce:transition-none duration-500 ${
                    inView ? 'animate-slide-up-fade' : 'opacity-0'
                  }`}
                  style={{
                    gridTemplateColumns: '180px repeat(8, 1fr)',
                    animationDelay: `${(ji + 1) * 80 + 100}ms`,
                  }}
                >
                  <div className="pr-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[11px] font-semibold font-mono text-fd-foreground">
                        {layer.label}
                      </span>
                      <span className="text-[11px] text-fd-muted-foreground">{layer.sublabel}</span>
                    </div>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold ${layer.addedBadgeStyle}`}
                    >
                      {layer.addedLabel}
                    </span>
                  </div>

                  {STAGES.map((stage) => {
                    const isNew = layer.addedStages.includes(stage);
                    const isCovered = layer.allCoveredStages.includes(stage);
                    return (
                      <div key={stage} className="flex items-center justify-center">
                        {isNew ? (
                          <div className={`h-3 w-3 rounded-full ${layer.newDotStyle}`} />
                        ) : isCovered ? (
                          <div
                            className={`h-3 w-3 rounded-full border border-fd-border ${layer.inheritedDotStyle}`}
                          />
                        ) : (
                          <div className="h-1.5 w-1.5 rounded-full bg-fd-border" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {LAYERS.map((layer, ji) => (
            <div
              key={layer.id}
              className={`transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
              style={{ animationDelay: `${(ji + 4) * 80 + 100}ms` }}
            >
              <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                {layer.label} {layer.sublabel}
              </p>
              <p className="text-[12px] leading-relaxed text-fd-muted-foreground">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
