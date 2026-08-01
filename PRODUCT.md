# Product

## Register

brand

## Users

Claudecodeguide.dev serves a wide spread of people trying to actually use Claude Code, ranging from absolute beginners who've never touched a terminal to daily-use developers, plus dedicated PM, founder, team-lead, designer, marketer, HR, and teacher tracks (each with its own `/for-*` entry point). The unifying job to be done is going from "what even is this?" to "I can't work without it" — the README's own framing. Skeptics giving Claude Code a second look are an explicit segment too.

The non-technical segment matters most for tone and copy: many arrive as "ChatGPT switchers" who've never opened a terminal, and the site has to earn their trust without either dumbing down or performing a fake simplicity it can't deliver (see Anti-references).

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
