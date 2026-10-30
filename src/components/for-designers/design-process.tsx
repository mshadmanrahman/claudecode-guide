'use client';

import { useInView } from '@/hooks/use-in-view';
import { DESIGNERS_HUB, type DesignersHubCopy } from '@/lib/hubs/designers';

/** Stage ids, in the same order as `DESIGNERS_HUB.process.stages`, which holds their labels. */
const STAGES = ['Brief', 'Research', 'Direction', 'Frames', 'Critique', 'Handoff', 'Build', 'Ship'];

/** Coverage and colors per layer. The words live in `DESIGNERS_HUB.process.layers`. */
const LAYER_STYLE: Record<
  string,
  { addedBadgeStyle: string; addedStages: string[]; allCoveredStages: string[]; newDotStyle: string; inheritedDotStyle: string }
> = {
  web: {
    addedBadgeStyle: 'bg-[var(--code)] text-[var(--ink)]',
    addedStages: ['Brief', 'Research', 'Critique'],
    allCoveredStages: ['Brief', 'Research', 'Critique'],
    newDotStyle: 'bg-[var(--muted)]',
    inheritedDotStyle: 'bg-[var(--code)]',
  },
  desktop: {
    addedBadgeStyle: 'bg-[var(--chip)] text-[var(--acc)]',
    addedStages: ['Direction', 'Handoff'],
    allCoveredStages: ['Brief', 'Research', 'Direction', 'Critique', 'Handoff'],
    newDotStyle: 'bg-[var(--acc)]',
    inheritedDotStyle: 'bg-[var(--code)]',
  },
};

interface DesignerProcessMapProps {
  copy?: DesignersHubCopy['process'];
}

export function DesignerProcessMap({ copy = DESIGNERS_HUB.process }: DesignerProcessMapProps) {
  const layers = copy.layers.map((l) => ({ ...l, ...(LAYER_STYLE[l.id] ?? LAYER_STYLE.web) }));
  const [ref, inView] = useInView(0.05);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            {copy.heading}
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            {copy.lead}
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
              <span className="text-xs text-fd-muted-foreground">{copy.legend.added}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[var(--code)] border border-fd-border" />
              <span className="text-xs text-fd-muted-foreground">{copy.legend.inherited}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-fd-border" />
              <span className="text-xs text-fd-muted-foreground">{copy.legend.none}</span>
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
                {STAGES.map((stage, si) => (
                  <div key={stage} className="text-center">
                    <span className="text-xs font-semibold text-[var(--muted)]">
                      {copy.stages[si] ?? stage}
                    </span>
                  </div>
                ))}
              </div>

              {/* Journey rows */}
              {layers.map((layer, ji) => (
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
                      <span className="text-xs font-semibold font-mono text-fd-foreground">
                        {layer.label}
                      </span>
                      <span className="text-xs text-fd-muted-foreground">{layer.sublabel}</span>
                    </div>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${layer.addedBadgeStyle}`}
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
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {layers.map((layer, ji) => (
            <div
              key={layer.id}
              className={`transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
              style={{ animationDelay: `${(ji + 4) * 80 + 100}ms` }}
            >
              <p className="mb-2 text-xs font-semibold text-[var(--muted)]">
                {layer.label} {layer.sublabel}
              </p>
              <p className="text-xs leading-relaxed text-fd-muted-foreground">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
