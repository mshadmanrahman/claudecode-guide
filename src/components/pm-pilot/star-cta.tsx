'use client';

import { useInView } from '@/hooks/use-in-view';

export function PmPilotStarCta() {
  const [ref, inView] = useInView(0.2);

  return (
    <section className="bg-fd-muted py-32" ref={ref}>
      <div
        className={`mx-auto max-w-5xl px-6 transition-all duration-700 ${
          inView ? 'animate-slide-up-fade' : 'opacity-0'
        }`}
      >
        <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">
          04
        </span>
        <h2 className="mt-6 font-serif text-5xl font-medium tracking-tight text-fd-foreground sm:text-6xl">
          Ready?
        </h2>
        <p className="mt-6 text-lg text-fd-muted-foreground">
          Free. Open source. No account needed.
        </p>

        <div
          className={`mt-10 inline-flex items-center rounded-lg border border-fd-border bg-fd-card px-5 py-3 font-mono text-sm text-fd-foreground transition-all duration-500 ${
            inView ? 'animate-slide-up-fade delay-100' : 'opacity-0'
          }`}
        >
          <span className="text-fd-muted-foreground select-none mr-2">$</span>
          <span>git clone https://github.com/mshadmanrahman/pm-pilot.git</span>
        </div>

        <div
          className={`mt-8 transition-all duration-500 ${
            inView ? 'animate-slide-up-fade delay-200' : 'opacity-0'
          }`}
        >
          <a
            href="https://github.com/mshadmanrahman/pm-pilot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
