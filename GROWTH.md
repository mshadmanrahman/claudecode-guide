# Growth Plan

What to do with claudecodeguide.dev over the next two quarters. Written 2026-08-17 from a full measurement pass (GA4 property 531041965, Google Search Console, Ahrefs) and stress-tested by a nine-persona decision council. Transcript: `_scratch/content/crucible/2026-08-17-ccg-organic-growth-two-quarters.md`.

Read [`PERSONAS.md`](./PERSONAS.md) first for who actually reads the site. This document assumes those numbers.

## The ranking, set by Shadman on 2026-08-17

This section supersedes the open strategic question the rest of the document was written around.

**Credibility is the job.** The site exists so the right person updates their view of him: "I can point to this and say, this is what I build to contribute to the agentic world." Traffic does not measure that.

**Audience is a welcome side effect, not a target.** It is an information site, so organic traffic is worth having if it arrives. Nothing gets built to chase volume; nothing gets refused for showing up.

**Distribution: organic search, plus his own writing on LinkedIn and Substack. Nothing else.**

**Reddit is out until the site earns a post.** This is a readiness gate, not a verdict on the channel. The condition is more material that is genuinely useful, and the eventual post is about that material rather than about the site.

Two consequences worth stating plainly:

- **Where the two jobs disagree, credibility wins.** So the CLAUDE.md cluster gets the hours, because it is simultaneously the best search asset and the thing worth being judged on. Work that would only move volume does not get hours.
- **Organic search is now the whole audience engine.** With Reddit out and LinkedIn at 6 sessions a month, there is nothing else. At Domain Rating 1.2 that compounds slowly and mostly on long-tail queries, which is exactly why treating audience as a bonus is the right ranking rather than a modest one.

## The reframe, which changes what gets built

The obvious plan was "grow organic traffic." That plan does not survive contact with two facts.

**CCG's own stated success metric was never traffic.** It was recorded as "did the right person update their view of Shadman," and the affiliate revenue hypothesis died at roughly $40 lifetime. A plan whose headline number is sessions optimizes something the project already retired.

**Domain Rating is 1.2.** The head terms are gone. "claude code install" carries 80,000 global searches at difficulty 5, and its top ten is Anthropic's own docs at DR 91, YouTube at DR 99, and a Substack at DR 94. No amount of writing closes that gap inside two quarters. 506 referring domains already point here and bought nothing.

So the question is not how to grow traffic. It is: **what is the smallest amount of work that makes the site do its actual job when someone checks him out, and stops it rotting while he is busy?**

That job is credibility at the moment of lookup. A hiring Director does not subscribe; they search his name, or open a link he sent, and form a view in ninety seconds. Search hygiene serves that directly. LinkedIn was picked as the channel for the same job and measured at 10% Director-plus reach before falling to 6 sessions a month.

The honest 12-month outcome of everything below: roughly 900 to 1,100 organic sessions a month against 195 today, Domain Rating around 6 to 9, and a site that reads as maintained. Not an audience. Nobody subscribes. That is the deal being accepted.

## The budget

**10 to 14 hours, one-off, spread across two or three sittings.** Not 2 to 4 hours a week for two quarters.

This distinction is the whole plan. At 78 hours the arithmetic is negative: it costs a weekend of Wisebox launch work and interview prep, and the opportunity cost of one delayed offer runs 150K to 300K SEK. At 12 hours nothing meaningful is displaced.

If a task below cannot fit the budget, it is not in the plan. Anything that becomes recurring weekly work has failed the test.

## Status

**Tier 1 and Tier 3 shipped 2026-08-17.** Commits `68dee41` and `4579bf6`, both live and verified against the public URL. Tier 2 is deliberately unstarted; it is gated on evidence that the cheap work paid, and that evidence needs Google to recrawl.

Two items in the tiers below were dropped after checking the data rather than executing them, and both are recorded in place: the `/docs/frameworks/for-*` route collision, and the position 20 to 40 pages. One claim in an earlier draft of this document was also wrong: `which-interface` has 7 H2s and 21 H3s, not one, and its structure was never the problem. Its title was.

Next checkpoint: mid-September, reading click-through rate in Search Console. Abandon condition unchanged.

## Tier 1: Stop the rot (about 4 hours, do this first)

Mechanical, no judgment required, and every item is currently costing something measurable.

**1. Fix the sitemap. (90 min)**
`sitemap.ts` uses hardcoded slug arrays duplicated from the lib files, and they have drifted. Missing today: all 29 PM-Pilot guide pages, `/for-hr/analyze-exit-interviews-with-claude`, `/docs`, `/start`, `/journey`, `/primitives`, `/capabilities`, `/workflow`, `/bn`. That is roughly 46 routes Google is not being told about, on a site where only 152 of 239 routes earn any impression.

Generate the sitemap from the same source the routes come from. Delete the hardcoded arrays so the drift cannot recur.

Also fix `lastModified`. It is currently `new Date()` on every entry with `dynamic = "force-dynamic"`, so every URL claims it changed today, every day. Google learns to ignore the field. Use real modification dates or omit it.

**2. Add the missing canonicals. (45 min)**
All 44 `/for-*` sub-pages and all 42 blog posts ship without `alternates.canonical`. Docs and tutorials already have them; copy that pattern.

**3. Kill the double suffix in titles. (45 min)**
The root layout applies `%s | Claude Code Guide`, and the vertical pages apply their own suffix on top. The rendered result is "Summarize Any Webpage with Claude | Claude for Chrome | Claude Code Guide", which Google truncates around 60 characters, so the brand and half the description are wasted pixels. Same shape on tutorials and blog. Pick one suffix.

**4. Resolve the route collision. (30 min)**
Six `/docs/frameworks/for-*` routes duplicate the slug names of six top-level `/for-*` hubs. Invisible at current volume. Pick a winner per pair and canonical the loser to it.

**5. Article and FAQPage schema. (30 min)**
JSON-LD exists in three places only: `WebSite` in the layout, `Organization` on the homepage, `Article` on docs. Blog posts, tutorials and vertical pages have none. Reuse the docs `Article` block.

## Tier 2: The one page that is both the best search asset and the best portfolio artifact (about 4 hours)

`/docs/foundations/claude-md` is the franchise and it is not close.

- 169 sessions in 30 days, second only to the homepage
- Direct traffic to it dwells 612 seconds. Ten minutes on one page.
- Position 14 in a cluster worth about 14,000 global searches at difficulty 6 to 17: "claude md" 8,200, "claude.md file" 3,500, "claude md file" 2,300
- It is also the page that demonstrates the judgment CCG exists to demonstrate

Position 14 is page two. Getting to page one is the single highest-value move on the board, and difficulty 6 to 17 means it is reachable at DR 1.2 in a way that "claude code install" never will be.

**What to do:** deepen it against the actual queries it already surfaces for (`claude md guide`, `claude.md guidelines`, `architecture.md claude`, `claude md template`), add the measurement material from the 2026-08-15 instruction-stack audit that already lives on the site, mark up its FAQ section as `FAQPage`, and internally link every other docs page that mentions CLAUDE.md back to it.

This is the only place in the plan where writing new words is worth the hours, because it pays twice: search position and portfolio.

## Tier 3: Recover the wasted impressions (about 3 hours)

Google is already sending 13,364 impressions a month and converting 127 clicks. That is a 0.95% click-through rate at an average position where 2 to 3% is normal. The demand has already been won and is being dropped at the title.

**1. Retitle `/docs/foundations/which-interface`. (done, biggest single item)**
It took 2,452 impressions and returned two clicks. Nearly all of those impressions come from one Anthropic certification exam question, "which claude product is best suited for navigating an unfamiliar codebase", where the page ranks 7th or 8th. Its title read "Which Claude Should You Use? A Non-Coder's Guide", which actively repels the person searching a question about codebases.

Now titled "Which Claude Should You Use? All 16 Surfaces Compared", with a description that names Claude Code as the answer for a codebase, which the page's own comparison table already said. Surface count corrected from "twelve-plus" to 16, counted off the table. The seven FAQ questions now carry `FAQPage` JSON-LD, the first on the site.

**The heading claim in the first draft of this document was wrong.** It said the page runs 2,800 words with one H2 because `SectionBreak` and friends render as styled divs. Checked against the rendered HTML: `SectionBreak` emits a real `<h2>`, the page has 7 H2s and 21 H3s, and the structure was never the problem. The error came from reading the MDX source instead of the output.

**Instrument it, and be willing to kill it.** These are exam-takers verifying a memorized answer. A better title might lift two clicks to forty, and none of those forty hires anyone. Tag the page. If ninety days produce zero inbound contact, the traffic is confirmed worthless, and no further exam-intent page ever gets written. This is the one item in the plan that carries an explicit kill condition.

**2. Sweep titles and descriptions on the pages that already rank. (done, and narrowed)**

The original list here was wrong about which pages to work. It mixed a click-through problem with a ranking problem. **Below roughly position 20 nobody sees the title, so rewriting it recovers nothing.** That rules out `/docs/patterns/mcp-servers` (549 impressions, position 40), `/docs/foundations/what-is-claude-code` (352, position 34), `/docs/foundations/context-window` (523, position 33) and `/docs/foundations/troubleshooting` (279, position 21). Those need links and topical authority, which this plan explicitly does not buy. They were left alone rather than given busywork.

What shipped instead, chosen by impressions at position 20 or better:

- **`/blog/you-dont-need-settings-json-hacks`**: 1,320 impressions, 5 clicks, position 14.5. About 116 of those impressions are the literal string `CLAUDE_CODE_DISABLE_1M_CONTEXT` at position 7.7, and the authored headline names none of what was searched. Rather than rewrite a published headline, `BlogPost` gained optional `seoTitle` and `seoDescription`, used only in `<title>` and the meta description. The visible H1 is untouched. Reach for this pattern whenever the right headline for a reader who has arrived is the wrong one for someone scanning a search result.
- **`/bn`**: 564 impressions at position 8.7, its best position on the site, against 9 clicks. Queries arrive in both scripts, `claude bangla` and `claude code` alongside `ক্লদ` and `claude কি`, and the title carried no Latin-script "Bangla". It does now. The page also had no canonical.

Still unworked, and worth a look next time: `/docs/patterns/thinking-modes` takes 553 impressions at position 16.2 and converts zero. Its per-query data is anonymised by Search Console, so there is no evidence for what to retitle it to. Guessing was not worth it.

The vertical pages are the surprise here. `/for-microsoft/draft-outlook-emails-with-claude` sits at position 7.7 with 433 impressions, and three `/for-chrome` pages rank between 8 and 17. On session counts these tracks look dead and an earlier draft of `PERSONAS.md` recommended retiring them. On search they are the best-positioned pages on the site and simply are not being clicked. Fix the titles before deciding anything about them.

## What this plan explicitly refuses

Each of these is defensible in isolation and each fails the hour budget or the reframe.

- **A content treadmill.** 239 routes already exist and only 152 earn an impression. Coverage is not the gap. Writing page 240 before fixing the 87 dead ones is motion, not progress.
- **Chasing the install and "free" clusters.** "claude code install" at 80,000 volume is owned by DR 91 to 99. "is claude code free" at 15,000 and "claude code changelog" at 14,000 are winnable on difficulty but need permanent maintenance and demonstrate nothing about his judgment.
- **A backlink campaign.** It is the only thing that moves position at DR 1.2, and there is no version of it that fits 12 hours. This is the strongest unresolved objection to the whole plan and it is being accepted knowingly, not overlooked.
- **Restarting Reddit.** Ruled out by Shadman on 2026-08-17 as a readiness gate: not until the site carries more genuinely useful material, and the post is about the material rather than the site. Note for the record that the channel itself works. CCG's r/ClaudeAI post did 165 to 192 upvotes and 62K views and produced the entire April spike. The hostile receptions on file belong to other projects and other subreddits, including a permanent r/learnprogramming ban. When this restarts, study the r/ClaudeAI post and read `feedback_reddit_rules_check` first.
- **LinkedIn as a traffic channel.** Measured at 10% Director-plus reach, now 6 sessions a month. It does not deliver traffic and is not treated as a traffic play. It stays in scope only as one of the two places he writes about the work, alongside Substack, which serves the credibility job rather than the volume one.
- **Retiring the `/for-*` verticals.** Deferred, not decided. The search data contradicts the session data and the cheap fix has not been tried yet.

## What to watch, and when to abandon this

Four numbers, checked monthly, ten minutes each time.

| Number | Today | What it would mean |
|---|---|---|
| Organic sessions | 195/month | The thesis. Should pass Reddit next window and keep climbing. |
| GSC click-through rate | 0.95% | Tier 1 and Tier 3 move this within one to three weeks. If it has not moved by mid-October, the on-page work does not do what the plan claims. |
| `claude-md` position | 14 | The only position worth tracking. Page one or the Tier 2 hours were wasted. |
| Inbound contacts | unmeasured | The actual metric. Everything above is a proxy. |

That last row is the point and it has never been measured. The council's Archivist found the site's success criterion has gone untracked for over a year while three separate proxies were watched instead. Track it, even crudely: a note every time someone mentions the site unprompted.

**Under the credibility-first ranking set on 2026-08-17, that row is the only one that measures the actual goal.** The other three are diagnostics for whether the machinery works. Do not let a good click-through number stand in for the thing it is a proxy for.

**Abandon condition.** If Tier 1 and Tier 3 are done and click-through has not moved by mid-October, stop. Freeze the site as a portfolio artifact, keep it deployed, and put the hours into Wisebox and the job search. That is a legitimate outcome, not a failure.

## Order of operations

1. Tier 1, one sitting, about 4 hours. Nothing here needs thought and all of it compounds.
2. Wait two weeks. Let Google recrawl. Do not touch anything.
3. Tier 3, about 3 hours. Titles and descriptions on pages that already rank.
4. Wait two weeks. Read Search Console once.
5. Tier 2, about 4 hours, only if steps 1 to 3 moved click-through. If they did not, the abandon condition applies and Tier 2 does not happen.

Tier 2 is last deliberately. It is the only tier that requires real writing time, so it should be earned by evidence that the cheap work paid.
