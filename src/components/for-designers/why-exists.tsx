'use client';

import { useInView } from '@/hooks/use-in-view';
import { DESIGNERS_HUB, type DesignersHubCopy } from '@/lib/hubs/designers';

interface DesignerWhyExistsProps {
  copy?: DesignersHubCopy['why'];
}

export function DesignerWhyExists({ copy = DESIGNERS_HUB.why }: DesignerWhyExistsProps) {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-3xl px-6">
        <div
          className={`transition-all motion-reduce:transition-none duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            {copy.heading}
          </h2>

          <div className="mt-8 space-y-5 text-fd-muted-foreground leading-relaxed">
            {copy.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
