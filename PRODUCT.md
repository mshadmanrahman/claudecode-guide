# Product

## Register

brand

## Users

**Measured 2026-08-17 (GA4 property 531041965, last 30 days, 1,219 real sessions after excluding a crawler; Google Search Console, 2026-07-05 to 2026-08-01). Everything in this section is counted, not assumed. Re-measure monthly.**

**Window changed from 90 days to 30 on 2026-08-17.** The traffic mix is moving fast enough that a 90-day average described a state that had already passed. Figures below will not match an earlier version of this section, and the earlier version was the less accurate of the two.

The reader is a technical practitioner on a desktop, reading the docs, arriving from a link or increasingly from search:

| Signal | Measured | What it means |
|---|---|---|
| Device | 77.5% desktop (945 vs 259 mobile); GSC agrees at 85% of impressions | Not a phone-browsing casual audience |
| Section | `/docs/*` 45.9% of page-sessions, `/tutorials/*` 14.2%, `/for-*` 8.0%, `/blog/*` 2.8% | The docs are the product |
| Top page | `/docs/foundations/claude-md`, 169 sessions, 497s on landing | Operational-memory content is the franchise |
| Acquisition | Direct 52.9%, Organic Social 18.2%, Organic Search 16.7% | Half a link click, and search closing |
| Largest single source | **Reddit, 216 sessions and falling. Google, 195 and rising. LinkedIn, 6.** | See the corrections below |
| Search intent | Real queries: `claude_code_disable_1m_context`, `claude code settings json`, `claude code mcp server`, `claude md template` | Nobody arrives on beginner phrasing |
| Geo | US 34%, China 12%, Bangladesh 6%, UK 5%, India 5%, Germany 4% | International and developer-heavy |

**The `/for-*` tracks are 8.0% of page-sessions (159): designers 60, microsoft 34, chrome 27, teachers 17, marketers 13, HR 8.** Do not structure the site as though the vertical tracks carry the audience. But do not retire them on that number either, because search tells a different story: `/for-microsoft/draft-outlook-emails-with-claude` sits at position 7.7 with 433 impressions, and three `/for-chrome` pages rank between 8 and 17. They rank; they just do not get clicked. That is a title and description problem.

**Correction, 2026-08-17.** This section previously claimed the non-technical segment "matters most for tone and copy," and that ChatGPT switchers who have never opened a terminal were a primary consideration. No measurement supported that, and the data above contradicts it. The claim had been influencing real editorial calls: a technical post was hedged toward beginners on the strength of it. Meanwhile the site's best-performing blog post by search impressions, in both of the last two GSC periods, is `/blog/you-dont-need-settings-json-hacks`, the longest and most technical post on the site. Write for the practitioner and stop apologising for the register.

What survives from the old framing: the site still refuses false accessibility (see Anti-references), still explains a term the first time it appears, and still serves absolute beginners who do arrive. Beginners are a real segment to serve well. They are not the segment to optimise tone for.

**Second correction, same day: the acquisition engine is being swapped, and neither Reddit nor LinkedIn is the answer.** An earlier version of this section said "Reddit is the audience, not LinkedIn." Reddit is leaving. It was a launch spike from a handful of posts in March and April (3,632 sessions that April), and no CCG post has gone to Reddit since. Across three consecutive 30-day windows: Reddit 502, 282, 216; Google organic 52, 184, 195. They cross next month. Search is the only channel going up and the only one Shadman can influence without posting. LinkedIn went 23, 24, 6 and is not a channel at all. Full trend and the strategic fork are in [`PERSONAS.md`](./PERSONAS.md).

**Total sessions are declining: 1,470, then 1,350, then 1,219 across those same windows.** The site is swapping engines, and the new engine is smaller than the old one was at its peak. Growth has to come from search, and that is a content and metadata problem rather than a distribution one.

**Crawler excluded from all figures above.** Raw GA4 reports 1,822 sessions in the last 30 days; 603 are a crawler, giving a real base of 1,219. It presents as Singapore, 574 sessions from "(direct)", eleven to thirteen sessions per page spread evenly across the whole site including pages nobody reads, 86% bounce, 14-second average. Any number read straight off the GA4 dashboard is inflated by roughly a third.

**Reader segments and the open strategic question live in [`PERSONAS.md`](./PERSONAS.md).** That document keeps "who reads the site" and "who the site is written for" separate, because on current evidence they are different people.

## Product Purpose

The practitioner's guide to Claude Code: 34+ doc pages across foundations/patterns/workflows/comparisons/templates, 15+ hands-on tutorials, interactive terminal demos on every page, a 9-step interactive setup guide, and role-specific verticals. Built and maintained by one person (Shadman Rahman) who kept explaining the same things to people who'd never touched a terminal, and turned that into a site instead of repeating himself. It's part of a broader "PM Toolkit Family" (pm-pilot, bug-shepherd, ceremonies, morning-digest, root-kg), so it's authored from a PM/builder perspective, not a pure dev-tool vendor's.

## Brand Personality

Plain-spoken and matter-of-fact, not cutesy. The site's actual shipped voice ("built by one person who kept explaining the same things to people who'd never touched a terminal") is warm through honesty and specificity, not through forced friendliness, puns, or hand-holding language. It calls out its own caveats rather than oversimplifying. The terminal aesthetic (macOS-style traffic-light cards, monospace demo output) signals "this is the real tool," not a marketing simulation of it.

A prior redesign direction in this repo (removed from `.claude/CLAUDE.md`, recoverable from git history) ("Dub.co-inspired," Spectral font, "you're scared? we got you!" tone, absolute-novice-only framing) does not match what's actually shipped and should be treated as superseded planning, not current brand direction — the site widened past pure novices and settled on a plainer, less performed voice than that brief describes.

## Anti-references

Generic fintech/SaaS cliches: cream/sand backgrounds, hero-metric tiles, gradient text, tiny uppercase eyebrows, numbered-step scaffolding by reflex. Specific to this brand: ProductTalk-style false accessibility — sites that claim "you don't need to be technical" and then immediately walk the reader into terminals, Node.js, and slash commands. CCG's own credibility depends on not making that same promise it can't keep; caveats get named, not hidden.

## Design Principles

- Show the real tool, don't simulate it. Terminal cards and demo output should read as authentic Claude Code sessions, not stylized marketing mockups.
- Plain English earns trust faster than reassurance language. Explain the actual thing simply rather than wrapping it in "don't worry" framing.
- One voice across a wide audience spread. The same site serves absolute beginners and daily-use developers; don't fork the tone by audience segment, fork the content depth.
- Name the caveat. If something doesn't work the way a beginner would hope, say so directly rather than glossing over it — this is the site's actual point of differentiation from competitors who oversimplify.
- Neutral palette, terminal signature. Color is restrained everywhere except the deliberate macOS traffic-light dots and semantic demo-output colors (success/warn/error), which are the one place saturation is earned.

## Accessibility & Inclusion

WCAG AA minimum. Public content site with a broad audience including non-technical first-time visitors and a Bangla-locale translation (`/bn`) — body text contrast, keyboard navigation, and semantic heading structure across docs/tutorials are load-bearing, not optional, given how much of the site is prose-driven.
