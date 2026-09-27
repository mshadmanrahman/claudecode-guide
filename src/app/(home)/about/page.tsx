import type { Metadata } from 'next';
import { AuthorBio } from '@/components/author-bio';
import { SceneBackdrop } from '@/components/scene-backdrop';

import { KineticText } from '@/components/kinetic-text';
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
      <SceneBackdrop variant="faded" scene="archipelago" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section className="px-6 pt-16 pb-8 sm:pt-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-display-article leading-[1.1] font-semibold tracking-[-0.035em] text-fd-foreground">
            <KineticText>About Shadman Rahman</KineticText>
          </h1>
          <p className="hm-rise mt-5 text-lead text-fd-muted-foreground leading-relaxed">
            Principal Product Manager at Keystone Education Group, based in Stockholm. Designer by
            training, product manager for more than a decade, and he builds at night.
          </p>
        </div>
      </section>

      <section className="px-6 py-6">
        <div className="glass mx-auto max-w-3xl space-y-4 rounded-xl p-6 text-fd-muted-foreground leading-relaxed sm:p-8">
          <p>
            Before product, there was music. In 2008 he founded the band Old School with his
            original bandmates and played tabla, one of the first tabla players in the Bangladesh
            band scene.
          </p>
          <p>
            In 2013 he was a UX designer at Cellbazaar, and the request he heard most went
            something like this: &ldquo;Oh, you&apos;re the UX designer, can you make my website
            look pretty?&rdquo; People pictured the job as decoration. He wanted a say in what got
            built and why. When Cellbazaar became Ekhanei, he moved from UX design into product
            management, and he has stayed in product since.
          </p>
          <p>
            He also mentors on ADPList, where he is a Top 50 Global Mentor and has coached more
            than 250 product managers on discovery, stakeholder management and career moves. If
            you&apos;re trying to make the same jump from design into product,{' '}
            <a
              href="https://adplist.org/mentors/shadman-rahman"
              className="underline underline-offset-4 hover:text-fd-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              book a session with him on ADPList
            </a>
            .
          </p>
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
              className="underline underline-offset-4 hover:text-fd-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
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
              className="underline underline-offset-4 hover:text-fd-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            . He also writes{' '}
            <a
              href="https://shadmanrahman.substack.com/"
              className="underline underline-offset-4 hover:text-fd-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Product Field Notes
            </a>{' '}
            on Substack and posts code on{' '}
            <a
              href="https://github.com/mshadmanrahman"
              className="underline underline-offset-4 hover:text-fd-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
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
