# Personas

Who actually reads claudecodeguide.dev, and who it is being written for. Those are two different questions and this document keeps them apart on purpose.

**Built 2026-08-17** from GA4 property 531041965 (90 days) and Google Search Console (2026-07-05 to 2026-08-01). Every number here was counted. Nothing was inferred from intent, and where intent is all we have, it says so.

**Re-measure before trusting this after 2026-11-17.** Traffic composition moved once already: the LinkedIn assumption below held for months after it stopped being true.

## Read this first: the unresolved tension

CCG has two jobs and they currently point at different readers.

**Job A, credibility.** The site exists so the right person updates their view of Shadman. A Director or VP who is hiring, or a peer in his professional network. Under this job, traffic is not the metric and a small number of correct readers beats a large number of anonymous ones.

**Job B, owned audience.** The site exists to compound a readership that belongs to Shadman rather than to an employer. Under this job, volume and return rate are the metric, and the reader's job title is irrelevant.

The measurement forces the conflict into the open:

| | Job A reader | Job B reader |
|---|---|---|
| Where they come from | LinkedIn | Reddit |
| Sessions, 90 days | **53** | **1,009** |

The strategy documents assume Job A and name LinkedIn as the distribution channel. LinkedIn delivers under 1.5% of real traffic. Reddit delivers roughly 25% and is the single largest identifiable source. The site is currently succeeding at a job its strategy did not pick.

**This is Shadman's call to make, and it is not made yet.** The personas below are ordered by measured volume, which implicitly assumes Job B. If Job A is the real goal, P1 and P3 drop down the list and the honest conclusion is that CCG is not currently reaching the people it was built to reach, which is a distribution problem rather than a content problem.

Do not resolve this silently by writing for whoever is easiest. Both readings are defensible. Only one of them is Shadman's actual goal.

## Traffic base, corrected

Raw GA4 reports 5,610 sessions over 90 days. **1,530 of those are a crawler and are excluded from every figure in this document.**

The crawler: country Singapore, 1,479 of 1,530 sessions from "(direct)", distributed at roughly 30 sessions per page across the whole site, 88 to 100% bounce, average duration 2.6 to 6.9 seconds. That is a sitemap walk, not a reader. A further 387 sessions land on `(not set)` at 98% bounce and 7 seconds and are also suspect.

**Corrected base: roughly 4,080 real sessions.** Percentages below use that denominator, so they will not match the raw GA4 dashboard.

## P1. The Reddit Arrival

**~1,009 sessions, 25% of real traffic. The largest identifiable segment.**

Comes from a subreddit link, lands on the homepage, and is trying to get started rather than to answer a specific question. The give-away is the path: `/` (635), then `/start` (248), then `/tutorials` (165). Both `/start` and `/tutorials` over-index heavily against the site average for this source.

Homepage bounce for this traffic sits at 51% with 215 seconds average, which is the healthiest landing behaviour on the site. They read.

**What they want:** a credible-looking on-ramp, fast. They have already decided to try Claude Code; they are looking for the guide that gets them moving.

**What serves them:** `/start`, the tutorials, the foundations pages. Onboarding depth, not measurement essays.

**What this persona is not:** a beginner who has never opened a terminal. They found the site on a Claude subreddit, which is already a filter.

## P2. The Reference Reader

**Roughly 800 sessions, arriving direct or from search, landing deep.**

Lands on one foundations page, reads it properly, leaves without browsing. High bounce and long dwell together, which reads as failure on a dashboard and is actually success:

| Landing page | Bounce | Avg duration |
|---|---|---|
| `/docs/foundations/session-lifecycle` | 82% | 634s |
| `/docs/foundations/what-is-claude-code` | 83% | 740s |
| `/docs/foundations/claude-md` | 68% | 314s |
| `/docs/foundations/context-window` | 88% | 76s |

Germany is the clearest example: 74 sessions landing on `session-lifecycle` at 857 seconds average.

**What they want:** one answer, correct, now. They will not click a second page and that is fine.

**What serves them:** each foundations page standing completely on its own. No "as we covered earlier." Assume this page is the only one they will ever read.

**Where they come from:** search queries are unambiguously technical. Real examples from the last four weeks: `.claude/settings.json`, `CLAUDE_CODE_DISABLE_1M_CONTEXT`, `claude.md for developers`, `mcp claudecode`. Search is only 8.4% of sessions but it is growing (85 clicks the previous period, 127 the current one).

## P3. The Returning Practitioner

**831 sessions. The loyal core.**

Reads 2.03 pages per session at 277 seconds, against 1.62 pages and 162 seconds for new visitors. Roughly twice the depth.

Returns to: `/` (256), `/start` (133), `/docs/foundations/claude-md` (114), `/tutorials` (110), then `/guide` and `/workflow`, which barely register with new visitors.

**What they want:** the site as a working reference they come back to, plus something new when they do.

**Why this persona matters most under Job B:** it is the only measured evidence of an audience that compounds. 831 sessions is small, but it is the number that would need to grow for the owned-audience thesis to be real.

**What serves them:** updating the pages they already return to, especially `claude-md`. The strategy note to "sharpen already-trafficked pages" is aimed squarely at this persona and the data supports it.

## P4. The Bangladesh Designer

**317 sessions, 7.8%. Shadman's own teaching network.**

The only persona vertical with real behaviour behind it. Of 317 Bangladesh sessions, 84 land on `/for-designers` and 23 on `/bn`. `/for-designers` is the third most-read page for this segment, against ninth for the site overall.

This is almost certainly the Ostad cohort and adjacent design network, arriving because Shadman told them to.

**What they want:** design-specific application, in a register that assumes design fluency rather than engineering fluency.

**What serves them:** `/for-designers` and the Bangla surface. `/bn` also earns 564 search impressions and 9 clicks in four weeks, which is disproportionate to its 33 GA4 sessions, so search demand there exceeds what is currently being captured.

## Who is not the audience

Naming these matters more than naming the personas, because each one has been shaping decisions without evidence.

- **The professional LinkedIn network.** 53 sessions in 90 days. The credibility strategy names this as the primary distribution channel. It is not currently a channel at all.
- **The non-technical ChatGPT switcher.** PRODUCT.md claimed this segment "matters most for tone and copy" until 2026-08-17. No search query, landing page, or device split supports it. 85% of readers are on desktop and every measurable search term is technical.
- **The HR, marketer and teacher verticals.** 12, 76 and 67 sessions respectively over 90 days. All six `/for-*` tracks combined are 8.1% of traffic, and `/for-designers` is most of that. These pages can exist. They should not shape site structure or editorial tone.
- **Mobile readers.** 822 sessions against 4,740 desktop. Mobile is a correctness requirement, not an audience.

## New and unplanned: AI assistants as a referrer

ChatGPT sends 119 sessions and Claude.ai sends 21. Small, real, and nobody designed for it. An assistant citing a page is a different reader from a human clicking a link, and no persona above covers it. Worth watching rather than acting on yet.

## What would change this document

- **Reddit drying up.** It is one quarter of traffic from a channel Shadman does not control and has not deliberately cultivated. If it stops, P1 vanishes and the site loses its largest segment overnight.
- **LinkedIn actually being used.** 53 sessions is what an unused channel looks like, not a failed one. A deliberate test would settle whether Job A is reachable.
- **The returning core growing or not.** 831 sessions is the Job B thesis in a single number. Track it.
- **Search compounding.** Impressions grew from 9,926 to 13,364 across the last two periods with position around 14 to 18. If that continues, P2 grows and the technical-query profile hardens.

## Open decisions, for Shadman

1. **Job A or Job B.** Everything above is ordered by volume. That is a choice, and it is currently being made by default rather than deliberately.
2. **Whether to cultivate Reddit on purpose** or keep treating a quarter of traffic as weather.
3. **Whether the unused `/for-*` verticals get retired**, kept as-is, or narrowed to `/for-designers` plus the Bangla surface, which are the two with measured demand.

## Sources

- GA4 property `531041965`, 90-day window ending 2026-08-17. Pulled via `_tools/analytics/ccg/ga4_pull.py` (the `mcp__kevel-ga4__*` wrapper is unreliable for this property; use the script).
- Google Search Console exports, `_tools/analytics/ccg/gsc-csv/`, current window 2026-07-05 to 2026-08-01, previous 2026-06-07 to 2026-07-04. Note that the per-query export is anonymised and sums to far fewer clicks than the device export; trust the device and page files for totals.
- Audience section of `PRODUCT.md`, corrected the same day from the same pull.
