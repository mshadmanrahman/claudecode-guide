# Product

## Register

brand

## Users

**Measured 2026-08-17 (GA4 property 531041965, 90 days, 5,610 sessions; Google Search Console, 2026-07-05 to 2026-08-01). Everything in this section is counted, not assumed. Re-measure before rewriting it.**

The reader is a technical practitioner on a desktop, reading the docs, arriving from a link rather than from search:

| Signal | Measured | What it means |
|---|---|---|
| Device | 85% desktop (4,740 vs 822 mobile); GSC agrees at 85% of impressions | Not a phone-browsing casual audience |
| Section | `/docs/*` 42.1% of sessions, `/tutorials/*` 12.7%, `/blog/*` 5.7% | The docs are the product |
| Top page | `/docs/foundations/claude-md`, 403 sessions | Operational-memory content is the franchise |
| Acquisition | Direct 62.2% + Organic Social 19.2% = 81%; Organic Search 8.4% | They clicked a link Shadman posted |
| Search intent | Real queries: `.claude/settings.json`, `CLAUDE_CODE_DISABLE_1M_CONTEXT`, `claude.md for developers`, `mcp claudecode` | Nobody arrives on beginner phrasing |
| Geo | Singapore 27.3%, US 20.6%, China 6.5%, Bangladesh 5.7%, India 4.3% | International and developer-heavy |

**The `/for-*` persona tracks are a rounding error, not a pillar.** All six combined are 8.1% of sessions (643). Breakdown: designers 261, microsoft 115, chrome 112, marketers 76, teachers 67, HR 12. Only `/for-designers` clears 3%, and that is Shadman's own specialty. Do not structure the site, or weight editorial decisions, as though the vertical tracks carry the audience. They do not.

**Correction, 2026-08-17.** This section previously claimed the non-technical segment "matters most for tone and copy," and that ChatGPT switchers who have never opened a terminal were a primary consideration. No measurement supported that, and the data above contradicts it. The claim had been influencing real editorial calls: a technical post was hedged toward beginners on the strength of it. Meanwhile the site's best-performing blog post by search impressions, in both of the last two GSC periods, is `/blog/you-dont-need-settings-json-hacks`, the longest and most technical post on the site. Write for the practitioner and stop apologising for the register.

What survives from the old framing: the site still refuses false accessibility (see Anti-references), still explains a term the first time it appears, and still serves absolute beginners who do arrive. Beginners are a real segment to serve well. They are not the segment to optimise tone for.

**Caveat, unverified.** Singapore at 27.3% outranks the US and is out of line with every other signal. It may be datacenter or VPN traffic rather than readers. Nobody has checked. If it is junk, every percentage in this section shifts and the geo row should be thrown out first.

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
