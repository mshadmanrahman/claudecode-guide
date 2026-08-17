# Personas

Who actually reads claudecodeguide.dev, and who it is being written for. Those are two different questions and this document keeps them apart on purpose.

**Rebuilt 2026-08-17 on a 30-day window.** The first version of this file used 90 days, which turned out to be the wrong lens: the site's traffic mix is changing fast enough that a 90-day average described a state that no longer exists. Every figure below comes from GA4 property 531041965 for the last 30 days, with a three-window comparison so the direction is visible. Google Search Console covers 2026-07-05 to 2026-08-01.

**Re-measure monthly, not quarterly.** The composition moved by half in ninety days. A quarterly cadence would have missed it twice.

## The one chart that matters

Three consecutive 30-day windows, crawler excluded. This is the shape of the whole document.

| Window | Real sessions | Reddit | Google organic | Returning |
|---|---|---|---|---|
| 90 to 61 days ago | 1,470 | 502 | 52 | 298 |
| 60 to 31 days ago | 1,350 | 282 | 184 | 295 |
| **Last 30 days** | **1,219** | **216** | **195** | **226** |

Three things are happening at once.

**Reddit is a decaying tail from a launch spike, not a channel.** April 2026 delivered 3,632 Reddit sessions, the month Shadman posted. Then 1,003 in May, 356 in June, 272 in July, and 107 in the first seventeen days of August. No CCG post has gone to Reddit since roughly early May. Daily volume now runs at three to eleven sessions against 100 to 200 a day in April. The decay is steady at roughly a quarter per month and has not yet found a floor.

**Search is growing, from nothing, fast.** Organic search went 68, then 192, then 203 sessions across the same three windows. GSC impressions grew 9,926 to 13,364 between the two reporting periods. Search is the only acquisition channel moving up.

**They cross next month.** Reddit 216 against search 203 in the current window. On current slopes search becomes the largest identifiable source in September, and it is the only source Shadman can influence without posting.

Total traffic is down about 8% per window. The site is not growing. It is swapping one engine for another, and the new engine is smaller than the old one was at its peak.

## Read this first: the unresolved tension

CCG has two jobs and they point at different readers.

**Job A, credibility.** The site exists so the right person updates their view of Shadman. A Director or VP who is hiring, or a peer in his professional network. Traffic is not the metric; a small number of correct readers beats a large number of anonymous ones.

**Job B, owned audience.** The site exists to compound a readership that belongs to Shadman rather than to an employer. Volume and return rate are the metric, and the reader's job title is irrelevant.

The measurement forces the conflict open. LinkedIn sent 6 sessions in the last 30 days, down from 24 and 23 in the two windows before. The strategy documents name LinkedIn as the distribution channel; it is delivering half a percent of traffic and falling.

**This is Shadman's call and it is not made yet.** The personas below are ordered by measured volume, which implicitly assumes Job B. If Job A is the real goal, the honest conclusion is that CCG is not reaching the people it was built to reach, and that is a distribution problem rather than a content problem.

An earlier version of this file framed the contest as Reddit against LinkedIn and concluded that Reddit is the audience. That framing was wrong twice over: Reddit is leaving, and the live contest is Reddit against search.

## Traffic base, corrected

Raw GA4 reports 1,822 sessions in the last 30 days. **603 of those are a crawler and are excluded from every figure here**, giving a real base of 1,219.

The crawler still presents as Singapore: 574 of its sessions come from "(direct)", it spreads at eleven to thirteen sessions per page evenly across the whole site including pages nobody reads, it bounces at 86%, and it averages 14 seconds. A further 99 sessions land on `(not set)` at 99% bounce and 4 seconds and are also junk, though they are left in the base because their origin is unconfirmed.

Any number read straight off the GA4 dashboard is inflated by roughly a third.

## P1. The Reference Reader

**Roughly 500 sessions, arriving direct or from search, landing deep. Now the largest real segment and the only one growing.**

Lands on one page, reads it properly, leaves without browsing. High bounce and long dwell together, which reads as failure on a dashboard and is success:

| Landing page | Sessions | Bounce | Avg duration |
|---|---|---|---|
| `/docs/foundations/claude-md` | 107 | 68% | 497s |
| `/docs/foundations/session-lifecycle` | 25 | 88% | 107s |
| `/docs/foundations/permissions` | 24 | 58% | 161s |
| `/docs/foundations/which-interface` | 19 | 68% | 131s |

Direct traffic to `claude-md` alone is 74 sessions at 612 seconds average. Ten minutes on one page. That page has become the site's centre of gravity: it is second only to the homepage on every measure, and it is where both direct and search traffic converge.

**What they want:** one answer, correct, now. They will not click a second page and that is fine.

**What serves them:** each page standing completely on its own. No "as we covered earlier." Assume this page is the only one they will ever read.

**Where they come from:** search queries are unambiguously technical. Real examples: `claude_code_disable_1m_context`, `claude code settings json`, `claude code mcp server`, `claude md template`. Nobody arrives on beginner phrasing.

**Why this persona was ranked second before:** the 90-day window buried it under Reddit's tail. On the current window it is the franchise.

## P2. The Reddit Arrival

**216 sessions, 18% of real traffic, falling about a quarter per month.**

Comes from a link in an old thread, lands on the homepage, and is trying to get started rather than to answer a specific question. Homepage landing bounce is 44% at 187 seconds, still the healthiest landing behaviour on the site. They read.

Last 30 days, 127 of 216 land on `/`. Over 90 days the pattern was `/` then `/start` then `/tutorials`, and `/start` has largely dropped out of the recent mix.

**What they want:** a credible-looking on-ramp, fast. They have already decided to try Claude Code.

**What this persona is not:** a beginner who has never opened a terminal. Finding the site on a Claude subreddit is already a filter.

**The honest read.** This traffic is residual. Shadman posted a few times around March and April, and everything since is people finding those threads or relinking them. It is real, it converts to reading, and it is going away. Two options exist: post again and restart the decay curve from a higher point, or accept the floor and build the search engine instead. Doing neither means the site shrinks.

GA4 reports the source as `reddit.com` and nothing deeper, so which subreddit and which threads are unknown without a custom dimension.

## P3. The Returning Practitioner

**226 sessions. The loyal core, and down 23% this window.**

Reads 2.30 pages per session at 259 seconds, against 1.91 pages and 193 seconds for new visitors. Returns to `/` (36), `/docs/foundations/claude-md` (19), `/tutorials/quiz-game` (7), `/docs/foundations/which-interface` (6), `/start` (6).

**Why this persona matters most under Job B:** it is the only measured evidence of an audience that compounds. It held flat at 298 and 295 across the two earlier windows, then dropped to 226.

**The mechanism behind the drop.** Returning readers are made out of new readers, and the new-reader inflow fell with Reddit. A returning core cannot be defended directly; it is a lagging indicator of acquisition from two months ago. Expect it to keep falling until search inflow exceeds what Reddit used to deliver.

**What serves them:** updating the pages they already return to, especially `claude-md`, and giving them a reason to come back that is not an accident.

## P4. The Bangladesh Designer

**74 sessions, 6.1%. Shadman's own teaching network, and episodic.**

Down from 205 in the prior window, which tracks the Ostad teaching calendar rather than any trend. Of the `/for-*` verticals this is the only one with real session behaviour: `/for-designers` took 26 landing sessions at 42% bounce and 204 seconds.

**What they want:** design-specific application, in a register that assumes design fluency rather than engineering fluency.

**Where the surprise is.** `/bn` earns 564 search impressions at position 8.7 with 9 clicks, which is one of the best positions on the site. Bangla search demand exceeds what the single page currently captures.

## P5. The AI assistant and its reader

**33 sessions from ChatGPT, Claude.ai, Perplexity and Gemini combined, plus 36 from GitHub.**

Small, real, and nobody designed for it. ChatGPT alone sends 31, and GitHub referrals grew 8, then 20, then 36 across the three windows, which is the second-fastest-growing source on the site. An assistant citing a page is a different reader from a human clicking a link.

Promoted from a footnote to a numbered persona because it now out-sends LinkedIn by five to one.

## Who is not the audience

Naming these matters more than naming the personas, because each has been shaping decisions without evidence.

- **The professional LinkedIn network.** 6 sessions in the last 30 days, down from 24 and 23. The credibility strategy names this as the primary distribution channel. It is not a channel.
- **The non-technical ChatGPT switcher.** PRODUCT.md claimed this segment "matters most for tone and copy" until 2026-08-17. No search query, landing page or device split supports it.
- **Mobile readers.** 259 sessions against 945 desktop. Mobile is a correctness requirement, not an audience. Note that mobile share rose from 15% to 21% as the mix shifted toward search, so this is worth rechecking rather than treating as settled.

**The `/for-*` verticals need a separate ruling from the one this file gave before.** On GA4 sessions they look dead. On search they do not: `/for-microsoft/draft-outlook-emails-with-claude` holds position 7.7 with 433 impressions, and three `/for-chrome` pages rank between 8 and 17. They rank and they earn impressions; they simply get almost no clicks. That is a title and description problem, not an audience problem, and retiring them on session counts alone would throw away the site's best-positioned pages.

## Open decisions, for Shadman

1. **Job A or Job B.** Everything above is ordered by volume, which is a choice currently being made by default.
2. **Restart Reddit or let it go.** Posting again would lift the curve; not posting means P2 approaches zero over the next two quarters.
3. **Whether the `/for-*` verticals get retired, kept, or fixed.** The search evidence says fix. The session evidence said retire. The search evidence is newer and better.

## What would change this document

- **Search overtaking Reddit**, which should happen next window and would confirm the swap is complete.
- **The returning core stabilising.** 226 and falling is the Job B thesis in one number.
- **A deliberate Reddit post**, which would make every trend line above unreadable for about two months. Worth doing, worth measuring separately.
- **Total sessions stopping their slide.** Three consecutive declining windows is the fact this document exists to surface.

## Sources

- GA4 property `531041965`, three consecutive 30-day windows ending 2026-08-17. Pulled via the Data API with the service-account key; the `mcp__kevel-ga4__*` wrapper is unreliable for this property.
- Google Search Console exports, `_tools/analytics/ccg/gsc-csv/`, current window 2026-07-05 to 2026-08-01, previous 2026-06-07 to 2026-07-04. The per-query export is anonymised and sums to 6 clicks against 127 in the per-page export; trust the page and device files for totals and read query rows as directional only.
- Audience section of `PRODUCT.md`, which carries the same corrections.
