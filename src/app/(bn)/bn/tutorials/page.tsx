import type { Metadata } from 'next';
import Link from 'next/link';
import { TRACKS } from '@/app/(en)/(home)/tutorials/catalog';
import { CollectionSchema } from '@/components/breadcrumb-schema';
import { KineticText } from '@/components/kinetic-text';
import { BN_TRACK_TITLES, ui } from '@/lib/i18n/locale';
import { BN_TUTORIALS } from '@/lib/i18n/bn/tutorials';
import { ogImage } from '@/lib/og/image';
import { GuideCard, cardImage } from '../_components/guide-card';

/**
 * The Bangla tutorials index. Until 2026-11-16 the translated tutorials were
 * linked only from /bn and this path redirected there, so search had no
 * Bangla page to rank for "Claude Code tutorial" queries. Tracks and their
 * order come from the English catalog; a tutorial shows up here once its
 * translation exists.
 */
const tracks = TRACKS.map((track) => ({
  id: track.id,
  title: BN_TRACK_TITLES[track.id] ?? track.title,
  cards: track.entries.flatMap((entry) => {
    const t = BN_TUTORIALS[entry.slug];
    return t ? [{ ...t.content, slug: entry.slug }] : [];
  }),
})).filter((track) => track.cards.length > 0);

const total = tracks.reduce((sum, track) => sum + track.cards.length, 0);
const totalBn = total.toLocaleString('bn-BD');

const url = 'https://claudecodeguide.dev/bn/tutorials';
const title = 'Claude Code টিউটোরিয়াল, বাংলায় | Tutorials in Bangla';
const description = `বাংলায় ${totalBn}টা Claude Code টিউটোরিয়াল: প্রথম CLAUDE.md, landing page, skill আর automation। ধাপে ধাপে, ফ্রি। Hands-on Claude Code tutorials in Bangla.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: url,
    languages: {
      'x-default': 'https://claudecodeguide.dev/tutorials',
      en: 'https://claudecodeguide.dev/tutorials',
      bn: url,
    },
  },
  openGraph: {
    title,
    description,
    type: 'website',
    url,
    locale: 'bn_BD',
    images: [ogImage('tutorials', 'Claude Code Tutorials')],
  },
};

export default function BnTutorialsPage() {
  return (
    <main lang="bn" className="min-h-screen">
      <CollectionSchema
        name={title}
        description={description}
        path="/bn/tutorials"
        items={tracks.flatMap((track) => track.cards.map((c) => ({ name: c.title, path: `/bn/tutorials/${c.slug}` })))}
      />
      <section className="border-b border-fd-border px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="m-0 font-mono text-xs text-fd-muted-foreground">
            টিউটোরিয়াল / {totalBn}টা project
          </p>
          <h1 className="mt-3 font-display text-display-article leading-[1.1] font-semibold tracking-[-0.035em] text-fd-foreground">
            <KineticText>বাংলায় Claude Code টিউটোরিয়াল</KineticText>
          </h1>
          <p className="hm-rise mt-4 text-lead text-fd-muted-foreground">
            প্রতিটা টিউটোরিয়াল একটা ছোট project। একটা prompt copy করবেন, Claude-এ paste করবেন, আর শেষে কাজে
            লাগার মতো কিছু একটা হাতে পাবেন। বেশিরভাগ ৫ থেকে ২০ মিনিটের।
          </p>
          <p className="mt-3 text-sm text-fd-muted-foreground">
            <Link href="/tutorials" className="underline hover:text-fd-foreground">
              {ui('bn').switchLanguage}
            </Link>
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl space-y-12">
          {tracks.map((track) => (
            <div key={track.id} id={track.id} className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold text-fd-foreground tracking-[-0.035em]">
                {track.title}
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {track.cards.map((c) => (
                  <GuideCard
                    key={c.slug}
                    href={`/bn/tutorials/${c.slug}`}
                    image={cardImage('tutorials', c.slug)}
                    title={c.title}
                    duration={c.duration}
                    description={c.description}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
