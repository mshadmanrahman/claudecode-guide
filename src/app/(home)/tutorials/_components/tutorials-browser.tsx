'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PERSONAS, pad2, type Persona } from '../catalog';

export interface BrowserCard {
  slug: string;
  title: string;
  description: string;
  outcome: string;
  personas: Persona[];
  duration: string;
  level: 'beginner' | 'intermediate';
  steps: number;
  worksIn: string;
}

export interface BrowserTrack {
  id: string;
  title: string;
  description: string;
  cards: BrowserCard[];
}

type LevelFilter = 'all' | 'beginner' | 'intermediate';
type JobFilter = 'all' | Persona;

const LEVELS: ReadonlyArray<{ id: LevelFilter; label: string }> = [
  { id: 'all', label: 'Any level' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
];

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]';

function isPersona(v: string | null): v is Persona {
  return PERSONAS.some((p) => p.id === v);
}

function isLevel(v: string | null): v is LevelFilter {
  return v === 'beginner' || v === 'intermediate';
}

function Pill({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${focusRing} ${
        pressed
          ? 'border-[var(--acc)] bg-[var(--acc)] text-[var(--accInk)]'
          : 'border-[var(--line)] bg-[var(--glass2)] text-[var(--ink)] hover:bg-[var(--chip)]'
      }`}
    >
      {children}
    </button>
  );
}

function Card({ card }: { card: BrowserCard }) {
  return (
    <Link
      href={`/tutorials/${card.slug}`}
      className={`glass group flex flex-col gap-2.5 rounded-xl p-5 transition-colors hover:border-[var(--acc)] sm:p-6 ${focusRing}`}
    >
      <span className="font-mono text-xs text-[var(--muted)]">
        {card.duration} / {card.level} / {card.steps} steps
      </span>
      <span className="flex items-start justify-between gap-3">
        <span className="text-lg font-semibold leading-snug tracking-[-0.02em] group-hover:text-[var(--acc)]">
          {card.title}
        </span>
        <ArrowRight
          className="mt-1.5 h-4 w-4 shrink-0 text-[var(--muted)] group-hover:text-[var(--acc)]"
          aria-hidden="true"
        />
      </span>
      <span className="text-[15px] leading-normal text-[var(--muted)]">{card.description}</span>
      <span className="text-sm leading-normal">
        <span className="text-[var(--muted)]">You end with: </span>
        {card.outcome}
      </span>
      <span className="font-mono text-xs text-[var(--muted)]">works in: {card.worksIn}</span>
    </Link>
  );
}

export function TutorialsBrowser({ tracks, total }: { tracks: BrowserTrack[]; total: number }) {
  const [job, setJob] = useState<JobFilter>('all');
  const [level, setLevel] = useState<LevelFilter>('all');

  // Read ?for= and ?level= once, so a persona page or a shared link can open a filtered list.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const f = params.get('for');
    const l = params.get('level');
    if (isPersona(f)) setJob(f);
    if (isLevel(l)) setLevel(l);
  }, []);

  function sync(nextJob: JobFilter, nextLevel: LevelFilter) {
    setJob(nextJob);
    setLevel(nextLevel);
    const params = new URLSearchParams();
    if (nextJob !== 'all') params.set('for', nextJob);
    if (nextLevel !== 'all') params.set('level', nextLevel);
    const qs = params.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  }

  const filtered = tracks
    .map((track) => ({
      ...track,
      cards: track.cards.filter(
        (c) => (job === 'all' || c.personas.includes(job)) && (level === 'all' || c.level === level),
      ),
    }))
    .filter((track) => track.cards.length > 0);

  const shown = filtered.reduce((sum, t) => sum + t.cards.length, 0);
  const active = job !== 'all' || level !== 'all';
  const hub = job === 'all' ? undefined : PERSONAS.find((p) => p.id === job)?.hub;

  return (
    <>
      <section aria-label="Filter tutorials" className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="glass flex flex-col gap-4 rounded-xl p-4 sm:p-5">
          <div className="flex flex-col gap-2">
            <span id="job-label" className="font-mono text-xs text-[var(--muted)]">
              your job
            </span>
            <div role="group" aria-labelledby="job-label" className="flex flex-wrap gap-1.5">
              <Pill pressed={job === 'all'} onClick={() => sync('all', level)}>
                All
              </Pill>
              {PERSONAS.map((p) => (
                <Pill key={p.id} pressed={job === p.id} onClick={() => sync(p.id, level)}>
                  {p.label}
                </Pill>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span id="level-label" className="font-mono text-xs text-[var(--muted)]">
              level
            </span>
            <div role="group" aria-labelledby="level-label" className="flex flex-wrap gap-1.5">
              {LEVELS.map((l) => (
                <Pill key={l.id} pressed={level === l.id} onClick={() => sync(job, l.id)}>
                  {l.label}
                </Pill>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-[var(--line)] pt-3">
            <p aria-live="polite" className="m-0 font-mono text-xs text-[var(--muted)]">
              {active ? `showing ${shown} of ${total}` : `${total} tutorials in ${tracks.length} tracks`}
            </p>
            {active && (
              <button
                type="button"
                onClick={() => sync('all', 'all')}
                className={`rounded-sm text-[13px] text-[var(--muted)] underline underline-offset-4 hover:text-[var(--ink)] ${focusRing}`}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {!active && (
          <nav aria-label="Tracks" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px]">
            {tracks.map((t, i) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className={`rounded-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)] ${focusRing}`}
              >
                <span className="text-[var(--acc)]">{pad2(i + 1)}</span> {t.title}
              </a>
            ))}
          </nav>
        )}
      </section>

      <section aria-label="Tutorials" className="mx-auto w-full max-w-3xl px-4 pt-10 pb-12 sm:px-6">
        {hub && (
          <Link
            href={hub.href}
            className={`mb-10 flex flex-col gap-1.5 rounded-xl border border-[var(--acc)] bg-[var(--chip)] p-5 sm:p-6 ${focusRing}`}
          >
            <span className="font-mono text-xs text-[var(--acc)]">also for you</span>
            <span className="text-lg font-semibold tracking-[-0.02em]">Open the {hub.name}</span>
            <span className="text-[15px] text-[var(--muted)]">{hub.blurb}</span>
          </Link>
        )}

        {filtered.map((track) => {
          const number = tracks.findIndex((t) => t.id === track.id) + 1;
          return (
            <div
              key={track.id}
              id={track.id}
              className="mb-14 scroll-mt-[calc(var(--site-header-h)+1rem)] last:mb-0"
            >
              <div className="mb-5">
                <p className="m-0 font-mono text-xs text-[var(--acc)]">
                  track {pad2(number)} / {track.cards.length}{' '}
                  {track.cards.length === 1 ? 'tutorial' : 'tutorials'}
                </p>
                <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.03em]">{track.title}</h2>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--muted)]">{track.description}</p>
              </div>
              <div className="grid gap-3">
                {track.cards.map((card) => (
                  <Card key={card.slug} card={card} />
                ))}
              </div>
            </div>
          );
        })}

        {shown === 0 && (
          <div className="glass rounded-xl p-8 text-center">
            <p className="m-0 text-[var(--muted)]">No tutorials match both filters.</p>
            <button
              type="button"
              onClick={() => sync(job, 'all')}
              className={`mt-3 rounded-sm text-sm underline underline-offset-4 ${focusRing}`}
            >
              Show every level
            </button>
          </div>
        )}
      </section>
    </>
  );
}
