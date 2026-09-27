import type { Metadata } from 'next';
import { AuthorBio } from '@/components/author-bio';
import { SceneBackdrop } from '@/components/scene-backdrop';

export const metadata: Metadata = {
  title: { absolute: 'About Shadman Rahman' },
  description:
    'Shadman Rahman writes the Claude Code Guide. Principal Product Manager at Keystone Education Group in Stockholm, designer by training, and a daily Claude Code user.',
  alternates: { canonical: 'https://claudecodeguide.dev/about' },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shadman Rahman',
  jobTitle: 'Principal Product Manager',
  url: 'https://claudecodeguide.dev/about',
  sameAs: [
    'https://www.linkedin.com/in/shadmanrahman',
    'https://shadmanrahman.substack.com/',
    'https://github.com/mshadmanrahman',
  ],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <SceneBackdrop variant="faded" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section className="border-b border-fd-border px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            About Shadman Rahman
          </h1>
          <p className="mt-5 text-lg text-fd-muted-foreground leading-relaxed">
            Principal Product Manager at Keystone Education Group, based in Stockholm. Designer by
            training, product manager for fifteen years, and he builds at night.
          </p>
        </div>
      </section>

      <section className="border-b border-fd-border px-6 py-14">
        <div className="mx-auto max-w-3xl space-y-4 text-fd-muted-foreground leading-relaxed">
          <p>
            He runs Claude Code every day across a large personal workspace: memory systems, agent
            crons, and dozens of small tools built to keep it all working. This site writes down
            what actually holds up once the novelty wears off, not what looks good in a demo.
          </p>
          <p>
            The Claude Code Guide is open source. Every page on this site, including this one, is
            on{' '}
            <a
              href="https://github.com/mshadmanrahman/claudecode-guide"
              className="underline underline-offset-4 hover:text-fd-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
          <p className="text-fd-foreground">
            The fastest way to reach him is{' '}
            <a
              href="https://www.linkedin.com/in/shadmanrahman"
              className="underline underline-offset-4 hover:text-fd-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            . He also writes{' '}
            <a
              href="https://shadmanrahman.substack.com/"
              className="underline underline-offset-4 hover:text-fd-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Product Field Notes
            </a>{' '}
            on Substack and posts code on{' '}
            <a
              href="https://github.com/mshadmanrahman"
              className="underline underline-offset-4 hover:text-fd-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-14">
        <AuthorBio />
      </div>
    </main>
  );
}
