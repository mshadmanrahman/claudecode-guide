import { createSign } from 'node:crypto';
import { unstable_cache } from 'next/cache';

// Private analytics for /stats. Reads GA4 and Search Console server-side with two
// service accounts, each JSON key base64-encoded in an env var: ga4-reader holds GA4
// access (CCG_STATS_SA_KEY), printpick-gsc holds Search Console access (CCG_STATS_GSC_KEY).

const GA4_PROPERTY = '531041965';
const GSC_SITE = 'sc-domain:claudecodeguide.dev';
const GA4_AUTH = { env: 'CCG_STATS_SA_KEY', scope: 'https://www.googleapis.com/auth/analytics.readonly' };
const GSC_AUTH = { env: 'CCG_STATS_GSC_KEY', scope: 'https://www.googleapis.com/auth/webmasters.readonly' };
type Auth = typeof GA4_AUTH;
const SIX_HOURS = 6 * 60 * 60;
// Search Console data trails by about three days.
const GSC_LAG_DAYS = 3;

// A crawler presenting as Singapore inflates raw GA4 sessions by roughly a third
// (PRODUCT.md, 2026-08-17). Every GA4 query here drops it, as the cron pullers do.
const EXCLUDED_COUNTRY = 'Singapore';

async function accessToken(auth: Auth): Promise<string> {
  const raw = process.env[auth.env];
  if (!raw) throw new Error(`${auth.env} is not set`);
  const key = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: key.client_email,
    scope: auth.scope,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(key.private_key, 'base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Google token exchange failed: ${res.status}`);
  return (await res.json()).access_token;
}

async function googlePost(auth: Auth, url: string, body: object): Promise<any> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${await accessToken(auth)}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`${new URL(url).hostname} returned ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

type Filter = Record<string, unknown>;
const notCrawler: Filter = {
  notExpression: { filter: { fieldName: 'country', stringFilter: { value: EXCLUDED_COUNTRY } } },
};
const eventIn = (names: string[]): Filter => ({
  filter: { fieldName: 'eventName', inListFilter: { values: names } },
});
const eventIs = (name: string): Filter => ({ filter: { fieldName: 'eventName', stringFilter: { value: name } } });
const linkDomainContains = (value: string): Filter => ({
  filter: { fieldName: 'linkDomain', stringFilter: { value, matchType: 'CONTAINS' } },
});
const and = (...expressions: Filter[]): Filter => ({ andGroup: { expressions } });

type Row = { dims: string[]; values: number[] };

async function ga4(opts: {
  start: string;
  end: string;
  dimensions: string[];
  metrics: string[];
  filter?: Filter;
  limit?: number;
}): Promise<Row[]> {
  const data = await googlePost(
    GA4_AUTH,
    `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY}:runReport`,
    {
      dateRanges: [{ startDate: opts.start, endDate: opts.end }],
      dimensions: opts.dimensions.map((name) => ({ name })),
      metrics: opts.metrics.map((name) => ({ name })),
      dimensionFilter: opts.filter ? and(notCrawler, opts.filter) : notCrawler,
      limit: opts.limit ?? 1000,
    },
  );
  return (data.rows ?? []).map((r: any) => ({
    dims: (r.dimensionValues ?? []).map((d: any) => d.value),
    values: r.metricValues.map((m: any) => Number(m.value)),
  }));
}

function windows(days: number) {
  return {
    current: { start: `${days}daysAgo`, end: 'yesterday' },
    prior: { start: `${days * 2}daysAgo`, end: `${days + 1}daysAgo` },
  };
}

const sum = (rows: Row[], i = 0) => rows.reduce((n, r) => n + r.values[i], 0);
// The dashboard's own visits would otherwise show up in its tables.
const notStatsPath = (path: string) => !path.startsWith('/stats');

export const SOURCE_BUCKETS = [
  'LinkedIn',
  'Substack',
  'Google',
  'Other search',
  'Reddit',
  'AI assistants',
  'Direct',
  'Other',
] as const;
export type SourceBucket = (typeof SOURCE_BUCKETS)[number];

export function sourceBucket(source: string): SourceBucket {
  const s = source.toLowerCase();
  if (s.includes('linkedin') || s.includes('lnkd.in')) return 'LinkedIn';
  if (s.includes('substack')) return 'Substack';
  if (/chatgpt|openai|perplexity|claude\.ai|gemini|copilot/.test(s)) return 'AI assistants';
  if (s === 'google' || s.includes('google.')) return 'Google';
  if (/^(bing|duckduckgo|yahoo|qwant|ecosia|yandex|baidu|brave)$|bing\.com|kagi\.com/.test(s)) return 'Other search';
  if (s.includes('reddit')) return 'Reddit';
  if (s === '(direct)') return 'Direct';
  return 'Other';
}

export const SECTIONS = ['Home', 'Docs', 'Tutorials', 'Persona guides', 'Blog', 'Other'] as const;
export type Section = (typeof SECTIONS)[number];

export function section(path: string): Section {
  if (path === '/' || path === '') return 'Home';
  if (path.startsWith('/docs')) return 'Docs';
  if (path.startsWith('/tutorials')) return 'Tutorials';
  if (path.startsWith('/for-')) return 'Persona guides';
  if (path.startsWith('/blog')) return 'Blog';
  return 'Other';
}

export type LandingRow = { page: string; total: number; bySource: Record<SourceBucket, number> };

const emptyBuckets = () => Object.fromEntries(SOURCE_BUCKETS.map((b) => [b, 0])) as Record<SourceBucket, number>;

async function landingPages(days: number) {
  const { current, prior } = windows(days);
  const [rows, priorRows] = await Promise.all(
    [current, prior].map((w) =>
      ga4({ ...w, dimensions: ['landingPage', 'sessionSource'], metrics: ['sessions'], limit: 5000 }),
    ),
  );
  const pages = new Map<string, LandingRow>();
  const totals = emptyBuckets();
  for (const { dims, values } of rows) {
    const [page, source] = dims;
    if (!notStatsPath(page)) continue;
    const bucket = sourceBucket(source);
    const row = pages.get(page) ?? { page, total: 0, bySource: emptyBuckets() };
    row.total += values[0];
    row.bySource[bucket] += values[0];
    totals[bucket] += values[0];
    pages.set(page, row);
  }
  const all = [...pages.values()].sort((a, b) => b.total - a.total);
  const sessions = all.reduce((n, r) => n + r.total, 0);
  const priorSessions = priorRows.filter((r) => notStatsPath(r.dims[0])).reduce((n, r) => n + r.values[0], 0);
  const home = pages.get('/') ?? { page: '/', total: 0, bySource: emptyBuckets() };
  const priorHome = priorRows.filter((r) => r.dims[0] === '/').reduce((n, r) => n + r.values[0], 0);
  return { sessions, priorSessions, home, priorHome, totals, top: all.slice(0, 20), pageCount: all.length };
}

async function sectionShare(days: number) {
  const { current } = windows(days);
  const rows = await ga4({ ...current, dimensions: ['pagePath'], metrics: ['screenPageViews'], limit: 5000 });
  const views = Object.fromEntries(SECTIONS.map((s) => [s, 0])) as Record<Section, number>;
  for (const { dims, values } of rows) {
    if (notStatsPath(dims[0])) views[section(dims[0])] += values[0];
  }
  return views;
}

export const FORM_EVENTS = ['form_start', 'form_submit', 'form_error', 'form_abandon_empty'] as const;

async function newsletter(days: number) {
  const { current, prior } = windows(days);
  const filter = eventIn([...FORM_EVENTS]);
  const [byPage, priorRows] = await Promise.all([
    ga4({ ...current, dimensions: ['eventName', 'pagePath'], metrics: ['eventCount'], filter }),
    ga4({ ...prior, dimensions: ['eventName'], metrics: ['eventCount'], filter }),
  ]);
  const count = (rows: Row[], name: string) => sum(rows.filter((r) => r.dims[0] === name));
  const pages = new Map<string, Record<string, number>>();
  for (const { dims, values } of byPage) {
    const [name, path] = dims;
    const row = pages.get(path) ?? {};
    row[name] = (row[name] ?? 0) + values[0];
    pages.set(path, row);
  }
  return {
    events: FORM_EVENTS.map((name) => ({ name, current: count(byPage, name), prior: count(priorRows, name) })),
    byPage: [...pages.entries()]
      .map(([path, counts]) => ({ path, counts }))
      .sort((a, b) => (b.counts.form_start ?? 0) - (a.counts.form_start ?? 0)),
  };
}

async function outbound(days: number) {
  const { current } = windows(days);
  const [byDomain, substackByPage] = await Promise.all([
    ga4({ ...current, dimensions: ['linkDomain'], metrics: ['eventCount'], filter: eventIs('click') }),
    ga4({
      ...current,
      dimensions: ['pagePath'],
      metrics: ['eventCount'],
      filter: and(eventIs('click'), linkDomainContains('substack.com')),
    }),
  ]);
  return {
    byDomain: byDomain.map((r) => ({ domain: r.dims[0], clicks: r.values[0] })).slice(0, 15),
    substackByPage: substackByPage.map((r) => ({ path: r.dims[0], clicks: r.values[0] })),
  };
}

export type WeekRow = {
  week: string;
  sessions: number;
  users: number;
  formStarts: number;
  formSubmits: number;
  substackClicks: number;
};

async function weekly(): Promise<WeekRow[]> {
  const range = { start: '84daysAgo', end: 'today' };
  const [traffic, forms, substack] = await Promise.all([
    ga4({ ...range, dimensions: ['isoYearIsoWeek'], metrics: ['sessions', 'activeUsers'] }),
    ga4({
      ...range,
      dimensions: ['isoYearIsoWeek', 'eventName'],
      metrics: ['eventCount'],
      filter: eventIn(['form_start', 'form_submit']),
    }),
    ga4({
      ...range,
      dimensions: ['isoYearIsoWeek'],
      metrics: ['eventCount'],
      filter: and(eventIs('click'), linkDomainContains('substack.com')),
    }),
  ]);
  const pick = (rows: Row[], week: string, event?: string) =>
    sum(rows.filter((r) => r.dims[0] === week && (event === undefined || r.dims[1] === event)));
  return traffic
    .map(({ dims, values }) => ({
      week: dims[0],
      sessions: values[0],
      users: values[1],
      formStarts: pick(forms, dims[0], 'form_start'),
      formSubmits: pick(forms, dims[0], 'form_submit'),
      substackClicks: pick(substack, dims[0]),
    }))
    .sort((a, b) => b.week.localeCompare(a.week));
}

function gscWindows(days: number) {
  const day = 24 * 60 * 60 * 1000;
  const iso = (t: number) => new Date(t).toISOString().slice(0, 10);
  const end = Date.now() - GSC_LAG_DAYS * day;
  return {
    current: { startDate: iso(end - (days - 1) * day), endDate: iso(end) },
    prior: { startDate: iso(end - (2 * days - 1) * day), endDate: iso(end - days * day) },
  };
}

type GscRow = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };

async function gscQuery(body: object): Promise<GscRow[]> {
  const data = await googlePost(
    GSC_AUTH,
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`,
    body,
  );
  return data.rows ?? [];
}

const emptyGsc: GscRow = { clicks: 0, impressions: 0, ctr: 0, position: 0 };

async function search(days: number) {
  const { current, prior } = gscWindows(days);
  const [queries, total, priorTotal] = await Promise.all([
    gscQuery({ ...current, dimensions: ['query'], rowLimit: 25 }),
    gscQuery(current),
    gscQuery(prior),
  ]);
  return { window: current, queries, total: total[0] ?? emptyGsc, priorTotal: priorTotal[0] ?? emptyGsc };
}

// Each section is cached on its own, so one failing API call cannot poison the rest,
// and a thrown error is never cached.
const cached = <A extends unknown[], R>(name: string, fn: (...args: A) => Promise<R>) =>
  unstable_cache(fn, ['ccg-stats', name], { revalidate: SIX_HOURS });

export const getLandingPages = cached('landing', landingPages);
export const getSectionShare = cached('sections', sectionShare);
export const getNewsletter = cached('newsletter', newsletter);
export const getOutbound = cached('outbound', outbound);
export const getWeekly = cached('weekly', weekly);
export const getSearch = cached('search', search);
