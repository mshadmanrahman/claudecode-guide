import { Suspense } from 'react';
import Link from 'next/link';
import { StartFlow } from '@/components/start/start-flow';
import { StartHero } from '@/components/start/start-hero';
import type { Metadata } from 'next';
import { ogImage } from '@/lib/og/image';

export const metadata: Metadata = {
  title: 'Start Here: First Claude Code Project',
  description: 'Pick your first project, get set up with Claude Code in under 10 minutes. No coding experience needed.',
  alternates: { canonical: 'https://claudecodeguide.dev/start' },
  openGraph: { images: [ogImage('start', 'Start here')] },
};

const PATH = [
  { href: '/journey', label: 'What it is', note: 'What Claude Code does and who it is for' },
  { href: '/guide', label: 'Set up', note: 'Install it and run your first session' },
  { href: '/tutorials', label: 'Tutorials', note: 'Build something real, one step at a time' },
] as const;

const linkFocus =
  'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]';

function StartPath() {
  return (
    <section aria-labelledby="start-path" className="mx-auto w-full max-w-2xl px-6 pb-24">
      <h2 id="start-path" className="text-lg font-semibold text-fd-foreground">
        The path from here
      </h2>
      <ol className="mt-4 flex flex-col gap-2">
        {PATH.map((step, i) => (
          <li key={step.href}>
            <Link
              href={step.href}
              className={`glass flex items-baseline gap-4 rounded-xl px-5 py-4 transition-colors hover:bg-[var(--glass2)] ${linkFocus}`}
            >
              <span className="font-mono text-sm text-fd-muted-foreground">{i + 1}</span>
              <span>
                <span className="block text-sm font-medium text-fd-foreground">{step.label}</span>
                <span className="block text-xs text-fd-muted-foreground">{step.note}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-fd-muted-foreground">
        Then:{' '}
        <Link href="/roadmap" className={`font-medium text-fd-foreground underline underline-offset-2 hover:text-[var(--acc)] ${linkFocus}`}>
          the roadmap
        </Link>
        , for everything after your first project.
      </p>
    </section>
  );
}

export default function StartPage() {
  return (
    <>
      <Suspense fallback={<StartHero />}>
      <StartFlow />
    </Suspense>
      <StartPath />
    </>
  );
}
