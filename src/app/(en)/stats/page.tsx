import { timingSafeEqual } from 'node:crypto';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  SECTIONS,
  SOURCE_BUCKETS,
  getLandingPages,
  getNewsletter,
  getOutbound,
  getSearch,
  getSectionShare,
  getWeekly,
} from '@/lib/stats';

export const metadata: Metadata = {
  title: { absolute: 'CCG stats' },
  robots: { index: false, follow: false },
};

const DAY_OPTIONS = [7, 28, 90] as const;

function authorized(key: string | undefined): boolean {
  const secret = process.env.CCG_STATS_TOKEN;
  if (!secret || !key) return false;
  const a = Buffer.from(key);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
const pct = (part: number, whole: number) => (whole ? `${Math.round((part / whole) * 100)}%` : '–');

function Delta({ now, before }: { now: number; before: number }) {
  if (!before) return <span className="text-fd-muted-foreground">no prior data</span>;
  const change = Math.round(((now - before) / before) * 100);
  const tone = change > 0 ? 'text-emerald-600 dark:text-emerald-400' : change < 0 ? 'text-red-600 dark:text-red-400' : '';
  return (
    <span className={tone}>
      {change > 0 ? '+' : ''}
      {change}% vs {fmt(before)}
    </span>
  );
}

async function settle<T>(p: Promise<T>): Promise<T | Error> {
  try {
    return await p;
  } catch (e) {
    return e instanceof Error ? e : new Error(String(e));
  }
}

function Block({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <section className="border-t border-fd-border pt-8">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {note && <p className="mt-1 text-sm text-fd-muted-foreground">{note}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Failed({ error }: { error: Error }) {
  return <p className="text-sm text-red-600 dark:text-red-400">Could not load: {error.message}</p>;
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm tabular-nums">
        <thead>
          <tr className="border-b border-fd-border text-left text-fd-muted-foreground">
            {head.map((h, i) => (
              <th key={h} className={`py-2 pr-4 font-medium ${i > 0 ? 'text-right' : ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, r) => (
            <tr key={r} className="border-b border-fd-border/60">
              {cells.map((c, i) => (
                <td key={i} className={`py-1.5 pr-4 ${i > 0 ? 'text-right' : 'max-w-[22rem] truncate'}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Tile({ label, value, sub }: { label: string; value: string; sub?: ReactNode }) {
  return (
    <div className="rounded-lg border border-fd-border bg-fd-card p-4">
      <div className="text-sm text-fd-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
      {sub && <div className="mt-1 text-xs tabular-nums">{sub}</div>}
    </div>
  );
}

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; days?: string }>;
}) {
  const params = await searchParams;
  if (!authorized(params.key)) notFound();
  const days = DAY_OPTIONS.find((d) => String(d) === params.days) ?? 28;

  const [landing, sections, newsletter, outbound, weekly, search] = await Promise.all([
    settle(getLandingPages(days)),
    settle(getSectionShare(days)),
    settle(getNewsletter(days)),
    settle(getOutbound(days)),
    settle(getWeekly()),
    settle(getSearch(days)),
  ]);

  const link = (d: number) => `/stats?key=${encodeURIComponent(params.key!)}&days=${d}`;

  return (
    <main className="mx-auto w-full max-w-5xl space-y-10 px-4 py-10 sm:px-6">
      <header>
        <h1 className="text-headline leading-[1.1] font-semibold tracking-tight">claudecodeguide.dev stats</h1>
        <p className="mt-2 text-sm text-fd-muted-foreground">
          GA4 531041965 and Search Console. Last {days} days to yesterday, compared with the {days} days before.
          The Singapore crawler is excluded from every GA4 number. Data refreshes every 6 hours.
        </p>
        <nav className="mt-3 flex gap-3 text-sm">
          {DAY_OPTIONS.map((d) => (
            <a
              key={d}
              href={link(d)}
              className={d === days ? 'font-semibold underline' : 'text-fd-muted-foreground hover:underline'}
            >
              {d} days
            </a>
          ))}
        </nav>
      </header>

      <Block
        title="1. Who lands on the bare domain"
        note="The open Crucible objection from 2026-09-27: sessions that start on /, split by source. Read against the verdict on 2026-10-11. The LinkedIn and Substack apps strip the referrer, so their visits count as Direct unless the link carries utm_source."
      >
        {landing instanceof Error ? (
          <Failed error={landing} />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Tile label="Sessions, all landings" value={fmt(landing.sessions)} sub={<Delta now={landing.sessions} before={landing.priorSessions} />} />
              <Tile
                label="Landed on /"
                value={fmt(landing.home.total)}
                sub={<Delta now={landing.home.total} before={landing.priorHome} />}
              />
              <Tile label="/ share of landings" value={pct(landing.home.total, landing.sessions)} sub={`${fmt(landing.home.total)} of ${fmt(landing.sessions)}`} />
              <Tile label="Distinct landing pages" value={fmt(landing.pageCount)} />
            </div>
            <div className="mt-6">
              <Table
                head={['Source', 'Landed on /', 'Share of /', 'All landings', 'Share of all']}
                rows={SOURCE_BUCKETS.map((b) => [
                  b,
                  fmt(landing.home.bySource[b]),
                  pct(landing.home.bySource[b], landing.home.total),
                  fmt(landing.totals[b]),
                  pct(landing.totals[b], landing.sessions),
                ])}
              />
            </div>
            <h3 className="mt-8 font-medium">Top landing pages by source</h3>
            <div className="mt-2">
              <Table
                head={['Landing page', 'Sessions', ...SOURCE_BUCKETS]}
                rows={landing.top.map((r) => [r.page, fmt(r.total), ...SOURCE_BUCKETS.map((b) => fmt(r.bySource[b]))])}
              />
            </div>
          </>
        )}
      </Block>

      <Block title="2. Docs vs tutorials vs persona guides" note="Page views by site section.">
        {sections instanceof Error ? (
          <Failed error={sections} />
        ) : (
          (() => {
            const total = SECTIONS.reduce((n, s) => n + sections[s], 0);
            return (
              <Table
                head={['Section', 'Views', 'Share']}
                rows={[
                  ...SECTIONS.map((s) => [s, fmt(sections[s]), pct(sections[s], total)]),
                  ['Total', fmt(total), '100%'],
                ]}
              />
            );
          })()
        )}
      </Block>

      <Block
        title="3. Newsletter signups"
        note="Events from the email capture form. The placement parameter is not a registered GA4 custom dimension yet, so the page the form sat on stands in for it."
      >
        {newsletter instanceof Error ? (
          <Failed error={newsletter} />
        ) : (
          <>
            <Table
              head={['Event', `Last ${days} days`, 'Change']}
              rows={newsletter.events.map((e) => [e.name, fmt(e.current), <Delta key={e.name} now={e.current} before={e.prior} />])}
            />
            {newsletter.byPage.length > 0 && (
              <div className="mt-6">
                <Table
                  head={['Page', 'Starts', 'Submits', 'Errors']}
                  rows={newsletter.byPage.map((p) => [
                    p.path,
                    fmt(p.counts.form_start ?? 0),
                    fmt(p.counts.form_submit ?? 0),
                    fmt(p.counts.form_error ?? 0),
                  ])}
                />
              </div>
            )}
          </>
        )}
      </Block>

      <Block title="4. Outbound clicks" note="GA4 enhanced-measurement click events. Substack is Product Field Notes.">
        {outbound instanceof Error ? (
          <Failed error={outbound} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            <Table head={['Domain', 'Clicks']} rows={outbound.byDomain.map((r) => [r.domain, fmt(r.clicks)])} />
            <Table
              head={['Substack clicks from', 'Clicks']}
              rows={
                outbound.substackByPage.length
                  ? outbound.substackByPage.map((r) => [r.path, fmt(r.clicks)])
                  : [['None in this window', '0']]
              }
            />
          </div>
        )}
      </Block>

      <Block title="5. Top search queries" note={search instanceof Error ? undefined : `Search Console, ${search.window.startDate} to ${search.window.endDate} (it lags about 3 days).`}>
        {search instanceof Error ? (
          <Failed error={search} />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Tile label="Clicks" value={fmt(search.total.clicks)} sub={<Delta now={search.total.clicks} before={search.priorTotal.clicks} />} />
              <Tile label="Impressions" value={fmt(search.total.impressions)} sub={<Delta now={search.total.impressions} before={search.priorTotal.impressions} />} />
              <Tile label="CTR" value={`${(search.total.ctr * 100).toFixed(1)}%`} />
              <Tile label="Avg position" value={search.total.position.toFixed(1)} />
            </div>
            <div className="mt-6">
              <Table
                head={['Query', 'Clicks', 'Impressions', 'CTR', 'Position']}
                rows={search.queries.map((q) => [
                  q.keys?.[0] ?? '',
                  fmt(q.clicks),
                  fmt(q.impressions),
                  `${(q.ctr * 100).toFixed(1)}%`,
                  q.position.toFixed(1),
                ])}
              />
            </div>
          </>
        )}
      </Block>

      <Block title="6. Week over week" note="ISO weeks, newest first. The top row is the week in progress.">
        {weekly instanceof Error ? (
          <Failed error={weekly} />
        ) : (
          <Table
            head={['Week', 'Sessions', 'Change', 'Users', 'Form starts', 'Submits', 'Substack clicks']}
            rows={weekly.map((w, i) => {
              const prev = weekly[i + 1];
              return [
                `${w.week.slice(0, 4)}-W${w.week.slice(4)}`,
                fmt(w.sessions),
                prev ? <Delta key={w.week} now={w.sessions} before={prev.sessions} /> : '–',
                fmt(w.users),
                fmt(w.formStarts),
                fmt(w.formSubmits),
                fmt(w.substackClicks),
              ];
            })}
          />
        )}
      </Block>
    </main>
  );
}
