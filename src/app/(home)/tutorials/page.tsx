import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EmailCapture } from '@/components/email-capture';
import { TUTORIALS } from '@/lib/tutorials';
import { TRACKS, ROUTE_LABELS } from './catalog';
import { TutorialsBrowser, type BrowserTrack } from './_components/tutorials-browser';

import { KineticText } from '@/components/kinetic-text';
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]';

/**
 * Card data is built on the server from the catalog plus the tutorial source,
 * so duration, level and step count cannot drift from the page they link to,
 * and the 300KB of step content never ships to the browser.
 */
function buildTracks(): BrowserTrack[] {
  return TRACKS.map((track) => ({
    id: track.id,
    title: track.title,
    description: track.description,
    cards: track.entries.map((entry) => {
      const t = TUTORIALS[entry.slug];
      const routes = t.availableRoutes ?? ['terminal'];
      return {
        slug: entry.slug,
        title: entry.title,
        description: entry.description,
        outcome: entry.outcome,
        personas: entry.personas,
        duration: t.duration,
        level: t.difficulty,
        steps: t.steps.length,
        worksIn: routes.map((r) => ROUTE_LABELS[r]).join(', '),
      };
    }),
  }));
}

export default function TutorialsPage() {
  const tracks = buildTracks();
  const total = tracks.reduce((sum, t) => sum + t.cards.length, 0);

  return (
    <div className="flex flex-col text-[var(--ink)]">
      <section className="mx-auto w-full max-w-3xl px-4 pt-12 pb-8 sm:px-6 md:pt-16">
        <p className="m-0 font-mono text-xs text-[var(--muted)]">tutorials / {total} projects</p>
        <h1 className="mt-3 text-display-article font-semibold leading-[1.06] tracking-[-0.04em]">
          <KineticText>Tutorials, picked by the job you do</KineticText>
        </h1>
        <p className="hm-rise mt-4 max-w-2xl text-body leading-[1.55] text-[var(--muted)]">
          Each one is a short project. You copy a prompt, paste it into Claude, and end with something you
          can use. Most take 5 to 20 minutes, and most need nothing but a browser.
        </p>
      </section>

      <TutorialsBrowser tracks={tracks} total={total} />

      <section className="mx-auto w-full max-w-3xl space-y-4 px-4 pb-24 sm:px-6">
        <div className="glass rounded-xl p-5 sm:p-6">
          <p className="m-0 text-sm font-medium">Tip: speak your first prompt</p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
            I use Wispr Flow to voice-dump context into Claude. Voice is faster for long context, and you end
            up giving Claude more to work with. Free to try.
          </p>
          <a
            href="https://ref.wisprflow.ai/shadman-rahman"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-3 inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--chip)] ${focusRing}`}
          >
            Try Wispr Flow free
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="glass rounded-xl p-5 sm:p-6">
          <p className="m-0 text-sm font-medium">Built something and want it live?</p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
            Railway gives you one-click deploys from GitHub with a generous free tier. No config files.
          </p>
          <a
            href="https://railway.com/?referralCode=shadman"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-3 inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--chip)] ${focusRing}`}
          >
            Deploy your first app on Railway
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="pt-8">
          <h2 className="m-0 text-2xl font-semibold tracking-[-0.03em]">New tutorials by email</h2>
          <p className="mt-2 text-[var(--muted)]">I add tutorials regularly. Subscribe and I&apos;ll tell you when one lands.</p>
          <div className="mt-5">
            <EmailCapture placement="tutorials-listing" />
          </div>
          <Link
            href="/guide"
            className={`mt-6 inline-flex items-center gap-2 rounded-sm text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)] ${focusRing}`}
          >
            Or work through the 9-step Interactive Guide
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
