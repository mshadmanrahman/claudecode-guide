'use client';

import { useInView } from '@/hooks/use-in-view';

export function DesignerWhyExists() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-3xl px-6">
        <div
          className={`transition-all duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">04</span>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            Made for the work designers actually do
          </h2>

          <div className="mt-8 space-y-5 text-fd-muted-foreground leading-relaxed">
            <p>
              Most Claude guides are written for developers. They assume you want to write code, run tests, or build infrastructure. Useful if that is your job. Frustrating if it is not.
            </p>
            <p>
              Designers use Claude every day: summarising research, wrestling with briefs, trying to get feedback that is not just &ldquo;looks good.&rdquo; But the default output is generic because Claude does not know you design for first-time mobile users on low-end Android in a price-sensitive market. It knows you are a person with a question.
            </p>
            <p>
              These guides fix that. They are built around what UX and UI designers actually do at work: the brief that arrives too vague, the evaluation that needs to happen before the sprint, the research synthesis that is due Friday, the Figma file that needs to survive a handoff.
            </p>
            <p>
              Start with Guide 1 to write your working agreement. After that, pick whichever guide matches today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
