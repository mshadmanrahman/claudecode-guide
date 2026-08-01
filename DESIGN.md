---
name: Claude Code Guide
description: The practitioner's guide to Claude Code — docs, tutorials, and role-specific tracks at claudecodeguide.dev
colors:
  ink: "#171717"
  paper: "#ffffff"
  card-surface: "#fafafa"
  neutral-secondary: "#f5f5f5"
  muted-foreground: "#737373"
  border-hairline: "rgba(0,0,0,0.1)"
  ring: "#a3a3a3"
  dark-bg: "#181818"
  dark-foreground: "#f5f5f5"
  dark-card: "#212121"
  dark-popover: "#252525"
  dark-muted-foreground: "#a3a3a3"
  dark-border: "rgba(255,255,255,0.12)"
  signal-info: "oklch(62.3% 0.214 259.815)"
  signal-warning: "oklch(76.9% 0.188 70.08)"
  signal-error: "oklch(63.7% 0.237 25.331)"
  signal-success: "oklch(72.3% 0.219 149.579)"
  signal-idea: "oklch(70.5% 0.209 60.849)"
  chrome-red: "#ff5f57"
  chrome-yellow: "#febc2e"
  chrome-green: "#28c840"
typography:
  display:
    fontFamily: "Fraunces, serif"
    fontVariationSettings: "'opsz' 60"
    fontWeight: 700
  body:
    fontFamily: "Inter, sans-serif"
    fontWeight: 400
  mono:
    fontFamily: "'Geist Mono', monospace"
rounded:
  md: "12px"
  lg: "16px"
spacing: {}
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.card-surface}"
    rounded: "{rounded.lg}"
---

# Design System: Claude Code Guide

## 1. Overview

**Creative North Star: "The Working Terminal"**

The site earns trust by looking used, not styled. Its terminal cards and demo output are real Claude Code sessions rendered in the browser — animated typing, a blinking cursor, color-coded output — not stylized mockups pretending to be a tool. Everything around that centerpiece stays quiet: near-black ink on near-white paper, restrained neutrals, one signature texture (macOS-style traffic-light dots) borrowed wholesale from the real operating system rather than reinvented. The voice matches the visuals — plain, specific, willing to name a caveat rather than paper over it, because the site's whole premise is that it explains things honestly to people who've never touched a terminal.

This system explicitly rejects the redesign direction once sketched in this repo's own CLAUDE.md ("Dub.co-inspired," warm storytelling sections, "you're scared? we got you!" tone) — that never actually shipped, and what's live today is plainer and more confident than that brief describes. It also rejects ProductTalk-style false accessibility: claiming "you don't need to be technical" and then walking the reader straight into terminals and slash commands. CCG shows the terminal on purpose and explains it instead of hiding it.

One honest note on typography: the current pairing (Inter body, Fraunces display) sits on the more common side of today's font choices — both are frequent defaults in AI-assisted and template-driven design. Identity is preserved here since this is what's actually shipped and working, but a future `/impeccable typeset` pass could differentiate the display face further without touching the site's actual voice.

**Key Characteristics:**
- Terminal authenticity over marketing simulation — traffic-light dots, monospace output, animated typing are functional signals, not decoration
- Reversible ink/paper palette: near-black on near-white in light mode, near-white on a deliberately softened `#181818` (not true black) in dark mode
- Color is restrained everywhere except semantic terminal-output states (success/warning/error/info) and the hardcoded macOS chrome dots
- One deliberate exception to token discipline: affiliate CTA cards vary background/border by placement (emerald, indigo, neutral) — a hand-picked exception, not a pattern to extend
- Sticky header uses backdrop-blur functionally (legibility over scrolling content), not decoratively

## 2. Colors

Reversible neutral core (ink/paper flip between light and dark) plus a small, disciplined set of semantic terminal-output colors. Nothing is saturated except what's signaling state.

### Primary
- **Ink** (#171717): Primary text and primary-action backgrounds in light mode; becomes the light-mode `primary-foreground` role in dark mode. This is the whole identity in one color — plain black ink, not a brand hue.

### Secondary
- **Card Surface** (#fafafa): Elevated content surfaces (cards, popovers) in light mode, one step off pure white.
- **Neutral Secondary** (#f5f5f5): Secondary UI backgrounds and muted surfaces, same value used for both `secondary` and `muted` roles in light mode.

### Tertiary
- **Terminal Signal Colors** (OKLCH: info 62.3% 0.214 259.815 blue · warning 76.9% 0.188 70.08 amber · error 63.7% 0.237 25.331 red · success 72.3% 0.219 149.579 green · idea 70.5% 0.209 60.849 orange): Used exclusively for semantic states — demo output lines, callout boxes, diff add/remove. Never decorative.
- **System Chrome** (#ff5f57 red · #febc2e yellow · #28c840 green): The macOS traffic-light dots on every terminal/demo card. Hardcoded rather than tokenized on purpose — they borrow real OS chrome, not a brand palette.

### Neutral
- **Paper** (#ffffff): Page background, light mode.
- **Dark Background** (#181818): Page background, dark mode — deliberately softened off true black; a code comment in `globals.css` states this explicitly ("not cave-black").
- **Muted Foreground** (#737373 light / #a3a3a3 dark): Captions, secondary text, timestamps.
- **Border Hairline** (rgba(0,0,0,0.1) light / rgba(255,255,255,0.12) dark): Card borders, dividers — always a low-alpha overlay of the foreground color, not a separate hex.
- **Ring** (#a3a3a3 light / #525252 dark): Focus rings.

### Named Rules
**The Borrowed Chrome Rule.** The macOS traffic-light dots use real system colors, not the site's own palette. If a new component wants to signal "this is a real terminal," it borrows OS chrome faithfully — it does not invent a stylized approximation.

## 3. Typography

**Display Font:** Fraunces (variable, `opsz` axis; `opsz 60` for the `.font-display` utility, stepped 48/32/24 for prose h2/h3/h4)
**Body Font:** Inter
**Mono Font:** Geist Mono (code, terminal, technical elements)

**Character:** A serif display face against a plain sans body and a genuine monospace for anything technical — the pairing separates "this is a heading making a point" from "this is real output from a real tool," which matters on a site whose whole credibility rests on the second one being authentic.

### Hierarchy
- **Display** (700, variable `opsz`, Fraunces): Page and section headings. Forces weight 700 regardless of component-level classes.
- **Headline/Prose h2** (Fraunces, `opsz 48`, color stepped to 82% of foreground via `color-mix`): Major section breaks within long-form docs.
- **Prose h3** (Fraunces, `opsz 32`, 68% foreground): Sub-sections.
- **Prose h4** (Fraunces, `opsz 24`, 55% foreground): Minor headings, stepping further toward muted as depth increases.
- **Body** (400, Inter): Docs prose, UI copy. Line length matters here — this is a long-form reading site.
- **Mono** (Geist Mono): Terminal output, code blocks, the site's wordmark in the header.

### Named Rules
**The Descending Weight Rule.** Prose headings don't just shrink, they lighten — h2 at 82% foreground opacity down to h4 at 55% — so depth in a long docs page is legible at a glance without adding visual noise at every level.

## 4. Elevation

Mostly flat with occasional soft elevation on interactive surfaces. `shadow-sm`/`shadow-lg` appear ad hoc on cards via Tailwind utilities rather than a defined token scale — there's no custom `--shadow-*` token in `globals.css`. The sticky header uses `backdrop-blur-lg` over a translucent background (`bg-fd-background/80`) for legibility over scrolling content, which is the one sanctioned blur use on the site.

### Named Rules
**The Functional Blur Rule.** Backdrop blur exists in exactly one place — the sticky header — and exists to keep nav legible over scrolling content. It is not a decorative glass treatment and should not spread to cards or sections without the same functional justification.

## 5. Components

Plain, high-contrast, and terminal-literal where the content demands it. The site doesn't decorate; the terminal cards ARE the decoration, because they're real.

### Buttons
- **Shape:** `rounded-lg`.
- **Primary:** `bg-fd-primary` (ink in light mode, near-white in dark), `text-fd-primary-foreground`, `px-4 py-2`, `text-sm font-medium`.
- **Hover:** Opacity shift only (`hover:opacity-90`) — no color-shift, no shadow-pop. Consistent with the plain, unfussy voice.

### Terminal / Demo Cards
- **Chrome:** macOS-style traffic-light dots (hardcoded system colors), muted title bar.
- **Content:** Monospace, animated typing/scroll simulation, blinking cursor block.
- **Output coloring:** Success = green, warning = amber, error = red, command = bold foreground, plain output = muted. This is the one place in the system where color carries real-time meaning.

### Cards / Containers
- **Corner Style:** `rounded-xl` / `rounded-2xl`.
- **Background:** `bg-fd-card`, `border border-fd-border`.
- **Exception:** Affiliate CTA cards vary background/border by placement (emerald for inline, indigo for mid-banner, neutral `fd-card` for end-card) — a deliberate, hand-picked exception per context, not a token to reuse elsewhere without the same reasoning.

### Navigation
- **Header:** Sticky, `h-14`, translucent + blurred background, mono-font wordmark ("claudecodeguide" + muted ".dev"), active links tinted with `bg-fd-primary/10`.
- **Footer:** 12-column grid — brand column plus four nav columns (Get started / Learn / For your role / More), a Bangla (`/bn`) locale link, an `llms.txt` link (AI-crawler awareness), and a "Free & Open Source" badge.

## 6. Do's and Don'ts

### Do:
- **Do** render terminal and demo content as real, working sessions — animated typing, genuine output, a blinking cursor — never a static screenshot standing in for the real thing.
- **Do** keep the macOS chrome dots as literal borrowed system colors (#ff5f57 / #febc2e / #28c840), not a stylized approximation.
- **Do** reserve the five semantic OKLCH colors (info/warning/error/success/idea) strictly for state, never decoration.
- **Do** step prose heading color toward muted as depth increases (h2 82% → h3 68% → h4 55% of foreground) rather than just shrinking font size.
- **Do** name the caveat in copy rather than smoothing it over — this is the actual brand differentiator from competitors who oversimplify.

### Don't:
- **Don't** introduce a cream/sand/paper-toned background. The palette is true neutral (pure white / #181818), not warm-tinted.
- **Don't** add a second decorative gradient-text treatment beyond the existing single-hue foreground-to-muted `.text-fade` utility — that one is a monochrome fade for compositional emphasis, not the banned rainbow/dual-hue decorative kind, and it should stay the only kind on the site.
- **Don't** extend `backdrop-blur` beyond the sticky header. It's functional there (nav legibility over scroll); anywhere else it becomes decorative glassmorphism.
- **Don't** apply the affiliate-CTA's per-placement accent colors (emerald/indigo) to any other component. That's a named, contained exception, not a precedent.
- **Don't** claim the site is "for non-technical people" and then immediately require a terminal, without naming that tension the way the site's own voice already does.
- **Don't** add a tiny uppercase tracked eyebrow above every section, or numbered markers as default scaffolding — neither exists on the site today and both would clash with the plain, unornamented voice.
