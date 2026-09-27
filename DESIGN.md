---
name: Claude Code Guide
description: The practitioner's guide to Claude Code, with docs, tutorials, and role-specific tracks at claudecodeguide.dev
colors:
  paper: "#fafaf8"
  ink: "#0f1115"
  muted: "#454b5a"
  accent: "#4f3fd0"
  accent-ink: "#ffffff"
  chip: "rgba(79, 63, 208, 0.1)"
  glass: "rgba(255, 255, 255, 0.62)"
  glass-strong: "rgba(255, 255, 255, 0.8)"
  line: "rgba(15, 17, 21, 0.12)"
  hair: "rgba(15, 17, 21, 0.06)"
  code-wash: "rgba(15, 17, 21, 0.035)"
  surface: "#ffffff"
  surface-2: "#f1f1ee"
  dark-paper: "#0b0e17"
  dark-ink: "#eef0f5"
  dark-muted: "#aeb4c3"
  dark-accent: "#aea3ff"
  dark-accent-ink: "#0b0e17"
  dark-chip: "rgba(174, 163, 255, 0.14)"
  dark-glass: "rgba(10, 13, 22, 0.55)"
  dark-glass-strong: "rgba(14, 17, 28, 0.78)"
  dark-line: "rgba(255, 255, 255, 0.12)"
  dark-hair: "rgba(255, 255, 255, 0.05)"
  dark-surface: "#11141f"
  dark-surface-2: "#171b28"
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
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(38px, 9vw, 84px)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17.5px"
    fontWeight: 400
    lineHeight: 1.7
  body-ui:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
  mono:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: "14px"
    lineHeight: 1.7
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  glass: "10px"
  card: "12px"
  xl: "14px"
  2xl: "18px"
  full: "999px"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "64px"
  section: "64px"
  stack: "22px"
  grid-gap: "14px"
  card-pad: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.lg}"
    padding: "0 24px"
    height: "48px"
  button-glass:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 24px"
    height: "48px"
  button-glass-hover:
    backgroundColor: "{colors.glass-strong}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "0 16px"
    height: "40px"
  nav-item-active:
    backgroundColor: "{colors.chip}"
    textColor: "{colors.accent}"
    rounded: "{rounded.lg}"
  card:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  card-hover:
    backgroundColor: "{colors.glass-strong}"
  pill:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  menu:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "6px"
---

# Design System: Claude Code Guide

## 1. Overview

**Creative North Star: "The Working Terminal in the Valley"**

The site sits on a landscape. Every page in the redesigned set renders a generated valley scene behind its content, a day image in light theme and a night image in dark, and the interface floats above it on frosted glass panels. The scene is the one piece of atmosphere; everything laid over it stays plain: one sans family (Geist), cool near-black ink on an off-white ground, one violet accent, and hairline borders. The terminal cards and demo output are still real Claude Code sessions rendered in the browser (animated typing, a blinking caret, the borrowed macOS chrome dots), and they now sit on the same glass as everything else instead of on opaque cards.

The voice matches the visuals. It is plain and specific, and it names a caveat instead of papering over it, because the site's premise is explaining Claude Code honestly to people who have never touched a terminal. The homepage is an author page: a first-person headline, a byline chip with a photo, then glass-panelled sections of link cards.

This system rejects the "Dub.co-inspired" warm storytelling direction once sketched in the repo's CLAUDE.md, which never shipped. It also rejects the false-accessibility move of claiming "you don't need to be technical" and then walking the reader straight into slash commands.

**Migration status.** The redesign (commits efd1cac, e1e3e7e, 0a15b94, shipped 2026-09-27) covers the homepage, header, docs, blog, tutorials, and the article treatment. The persona landing pages (`/pm-pilot` and the `/for-*` pages) have not been migrated. They receive the faded scene backdrop from their layouts and resolve the new color tokens through the Fumadocs `fd-*` aliases, but their components still use the old composition: `fd-*` utility classes, uppercase tracked section labels, and `backdrop-blur` utilities outside the `.glass` class. The old 64px `.bg-grid` background still ships on the `/pm-pilot` hero, and also on `/capabilities` and `/journey`. None of that is part of this system; do not copy from those pages.

**Key Characteristics:**
- A generated day/night valley scene behind every redesigned page, full on the homepage and faded to a quiet wash on docs and blog
- Frosted glass panels (`.glass`) as the default surface, opaque surfaces only for menus and drawers
- One family, Geist, at every level; Geist Mono for code, captions, metadata, and labels
- One accent, violet, reserved for primary actions, active navigation, links, focus rings, and the emphasized node in a diagram
- No italics anywhere; emphasis reads as weight
- Real terminal output, with the borrowed macOS chrome dots, kept literal

## 2. Colors

Cool neutral ink on an off-white ground, one violet accent, and translucent glass tints between them. Every value flips between light (`:root`) and dark (`.dark`) under the same token name in `src/app/globals.css`; the Fumadocs `--color-fd-*` and shadcn variables read from these tokens, so docs pages follow automatically.

### Primary
- **Signal Violet** (accent; dark-accent in dark mode): Primary buttons, active nav items, links in prose, focus outlines, the TOC progress line, callout labels, and accent diagram nodes. The dark value lifts to a pale lavender so it holds contrast on the night ground. Its text partner is accent-ink (white in light mode, the dark ground color in dark mode).
- **Violet Chip** (chip / dark-chip): A 10% to 14% violet wash. Active nav background, hover tint on glass links, accent node fill in diagrams.

### Tertiary
- **Terminal Signal Colors** (signal-info, signal-warning, signal-error, signal-success, signal-idea): Semantic states only: demo output lines, callouts that carry a state, diff add/remove. Never decorative.
- **System Chrome** (chrome-red, chrome-yellow, chrome-green): The macOS traffic-light dots on terminal and demo cards. Hardcoded on purpose; they borrow real OS chrome, not the site palette.

### Neutral
- **Ground** (paper / dark-paper): The page background under the scene. Light is an off-white a hair short of pure white; dark is a deep blue-black, never true black.
- **Ink** (ink / dark-ink): Headings, body text, and prose headings at every level on redesigned pages.
- **Muted Slate** (muted / dark-muted): Secondary copy, card blurbs, captions, metadata, sidebar links at rest.
- **Glass** (glass / dark-glass) and **Strong Glass** (glass-strong / dark-glass-strong): The two translucent panel fills. Glass is the resting surface; Strong Glass is the hover and raised state.
- **Line** (line / dark-line): Every border, including the 1px edge on each glass panel and dividers inside cards.
- **Hair** (hair / dark-hair): A fainter line for sidebar hover fills, diagram node fills, and the vertical rules in the scene overlay.
- **Code Wash** (code-wash): The tint behind code block bodies.
- **Surface** (surface / dark-surface) and **Surface 2** (surface-2 / dark-surface-2): Opaque fills for dropdown menus, the mobile drawer, and the Fumadocs card/secondary roles when a component sits outside a docs article.

### Named Rules
**The One Accent Rule.** Violet is the only hue in the interface. It marks what is primary or current (the main call to action, the active page, a link, focus, the node a diagram is about) and nothing else. Signal colors carry state; they never stand in as a second brand color.

**The Borrowed Chrome Rule.** The macOS traffic-light dots use real system colors, not the site's own palette. A component that wants to signal "this is a real terminal" borrows OS chrome faithfully; it does not invent a stylized approximation.

## 3. Typography

**Display Font:** Geist (via `geist/font/sans`, with ui-sans-serif and system-ui fallbacks)
**Body Font:** Geist
**Label/Mono Font:** Geist Mono

**Character:** One sans family carries every heading and every paragraph, and size, weight, and tight negative tracking do the work a second face used to do. Geist Mono marks anything that is metadata or machine output (code, captions, dates, pills, diagram text), which keeps "a heading making a point" visibly apart from "real output from a real tool."

### Hierarchy
- **Display** (600, fluid 38px to 84px, line-height 1.04, -0.045em): The homepage headline, capped near 14 characters per line. Article titles use the same weight and tracking at a smaller clamp (36px to 54px, line-height 1.06).
- **Headline** (600, 28px mobile to 36px desktop, -0.035em): Homepage section heads inside their glass panels. Article H2 runs 26px at -0.025em, H3 20px at -0.02em.
- **Title** (600, 17px to 24px, -0.015em to -0.02em): Card titles. Doc cards run 22px.
- **Body** (400, 17.5px, line-height 1.7): Article prose on docs and blog, in a 680px column; 16.5px below 640px. The article lead runs 20px at 1.55 in muted.
- **Body UI** (400, 15px, line-height 1.5): Card blurbs, section subtitles, button labels.
- **Label** (Geist Mono 400, 11px to 12.5px): Breadcrumbs, captions, pills, dates, callout labels, the persona name on homepage cards. Sidebar and TOC group headings and the mobile menu's "Paths" heading run uppercase at 11.5px with 0.06em tracking; that treatment is navigation chrome only.
- **Mono** (Geist Mono, 14px, line-height 1.7): Code block bodies.

### Named Rules
**The No Italics Rule.** Nothing on the site slants. `em`, `i`, `cite`, and `dfn` render upright at weight 500, and blockquotes and syntax themes are forced upright too. Emphasis is weight, never slant.

**The Tight Heading Rule.** Headings tighten as they grow: -0.015em on small titles, -0.02em to -0.035em on section heads, -0.045em on display. Body text keeps normal tracking.

## 4. Elevation

Depth comes from the scene and the glass, not from shadows. The generated valley sits at the back (z-index -1, drifting a 3% scale over 60 seconds); a faint vertical rule overlay (1px hair lines every 216px) sits on it; glass panels float above with a 1px line border and a 16px backdrop blur. Resting cards carry no shadow, and the docs article treatment explicitly strips `shadow-sm` from anything inside it. Cards rise on hover by moving, not by casting: a 4px lift, the border turning violet, and the fill stepping from Glass to Strong Glass over 0.4s. The only shadows left are `shadow-lg` on the opaque dropdown menu and mobile drawer, which need to separate from glass beneath them.

The scene has two variants. **Full** (homepage) shows the image at full strength. **Faded** (docs, blog, tutorials, persona pages) drops it to 26% opacity in light and 34% in dark, desaturates it, blurs it 1px, and masks the middle of the page down to 15% so long text reads on a near-plain ground. The day/night swap is a pure CSS crossfade on the `.dark` class (1.2s), so there is no hydration flash. Under `prefers-reduced-motion` the drift, the crossfade, and every homepage animation stop.

### Named Rules
**The Glass Surface Rule.** Glass is the default surface wherever content sits over the scene: header, section-head panels, cards, buttons that are not primary, code blocks, callouts, blockquotes, diagram figures, and pager cards. A glass panel is always the translucent fill plus a 1px line border plus a backdrop blur, never the blur alone. Anything that must stay legible over other glass (dropdown menus, the mobile drawer) goes opaque on Surface instead.

**The One Scene Rule.** The valley scene is the only image-based atmosphere on redesigned pages. It is rendered once per page by the scene backdrop component, full on the homepage and faded everywhere else. No page adds a second background texture, pattern, or gradient on top of it.

## 5. Components

Plain, high-contrast type on frosted panels. The terminal cards stay literal, because they are real.

### Buttons
- **Shape:** Gently rounded (lg, 10px). The radius scale is `--radius` (0.625rem) multiplied: sm 6px for tags and small controls, md 8px for diagram nodes and sidebar links, lg 10px for buttons, nav items, section-head panels, code blocks, and callouts, card 12px for the hand-written section cards and diagram figures, xl 14px for homepage cards, the header, and menus, 2xl 18px for the large feature panels, full for pills, filters, and the byline chip. Tags inside diagrams go down to 4px.
- **Primary:** Violet fill with accent-ink text, 48px tall on the homepage (44px in panels), 24px horizontal padding, 15px medium label. One per view region.
- **Glass (secondary):** The glass surface at the same size, ink text; hover steps to Strong Glass or the violet chip tint.
- **Outline:** A 1px line border on transparent, used for the essay call to action; hover fills with the chip tint.
- **Hover / Focus:** Filled buttons shift opacity only (0.9); glass buttons shift fill. Focus is a 2px violet outline at 2px offset on every interactive element.

### Chips
- **Style:** Pills in Geist Mono at 11.5px to 12px, muted text, a 1px line border, full radius, 2px by 10px padding.
- **State:** Blog filter pills sit on glass; the pressed filter inverts to an ink fill with ground-colored text.

### Cards / Containers
- **Corner Style:** xl (14px) on homepage link cards, card (12px) on docs section cards and diagram figures, 2xl (18px) on large panels such as the three-step journey and the author block.
- **Background:** Glass, with a 1px line border.
- **Shadow Strategy:** None at rest; see Elevation for the hover lift.
- **Internal Padding:** 24px standard, 32px on the two-up practice cards at desktop, 16px by 20px on compact persona cards.
- **Section heads:** Each homepage section title sits in its own small glass panel (10px radius, 20px by 14px padding) with an optional muted subtitle, and an optional glass "more" link aligned to its right.

### Navigation
- **Header:** A floating glass bar, sticky with an 8px top gap on mobile and 20px on desktop, 56px tall (60px desktop), xl radius, capped at 1312px wide. The wordmark is an SVG valley-line logo plus "Claude Code Guide" in 16px semibold. Nav items are 14px medium; active items take the violet chip fill with violet text. A "Paths" dropdown and the mobile drawer open as opaque Surface menus with `shadow-lg`.
- **Header action:** "Start free" is an ink-filled button (ink background, ground-colored text, 40px tall).
- **Docs sidebar:** Transparent over the faded scene. Links are 14px muted with a 6px radius and a hair fill on hover; the active link is violet on the chip tint. The right TOC uses a 2px line rail that fills violet from the top down to the active heading.

### Terminal / Demo Cards
- **Chrome:** macOS traffic-light dots in the borrowed system colors, on a code-wash title bar.
- **Surface:** Glass with a 16px blur and 1.2 saturation, xl radius.
- **Content:** Monospace, animated typing, blinking caret block. Success is green, warning amber, error red, commands bold ink, plain output muted.

### Code Blocks and Callouts
- **Code blocks:** A glass figure (10px radius, 1px line border, 14px blur) with a 40px mono filename bar and a copy control, then a code-wash body at 14px / 1.7.
- **Callouts:** The same glass box with 16px by 18px padding and a 12px mono label in violet on the left.

### Diagrams
- **Figure:** A glass panel (12px radius, 24px padding) in 12px Geist Mono, with a caption row under a 1px line divider; the figure ID renders in violet.
- **Nodes:** 8px-radius boxes with a 24% ink stroke on a hair fill. Tones are base, accent (violet stroke and chip fill), and ghost (dashed, muted). Connectors switch from vertical to horizontal at a 640px container width, so a diagram reflows the same way in the article column as on a phone.

## 6. Do's and Don'ts

### Do:
- **Do** put content that sits over the scene on a glass panel: translucent fill, 1px line border, and backdrop blur together.
- **Do** keep violet for the single primary action, the current page, links, focus, and the emphasized diagram node.
- **Do** set every heading in Geist semibold with negative tracking, tightening as the size grows (-0.015em to -0.045em).
- **Do** use Geist Mono for metadata and machine output: dates, captions, pills, code, diagram text.
- **Do** render terminal and demo content as real, working sessions (animated typing, genuine output, a blinking caret), never a static screenshot standing in for the real thing.
- **Do** keep the macOS chrome dots as the literal system colors, not a stylized approximation.
- **Do** reserve the five semantic OKLCH signal colors for state.
- **Do** give every interactive element the 2px violet focus outline at 2px offset.
- **Do** name the caveat in copy rather than smoothing it over.

### Don't:
- **Don't** set anything in italics. Emphasis is weight 500.
- **Don't** add a second background (grid, pattern, gradient, or image) on a page that renders the valley scene. The old `.bg-grid` is legacy on unmigrated pages, not a pattern.
- **Don't** put shadows on resting cards. Hover is a lift, a violet border, and a stronger glass fill.
- **Don't** introduce a second display face or a second accent hue.
- **Don't** make dropdowns or drawers glass; they sit over other glass and need the opaque Surface.
- **Don't** add gradient text. The `.text-fade` class survives only as a name on old markup and renders plain ink.
- **Don't** put an uppercase tracked label above a section heading. Uppercase mono is reserved for navigation group labels in the sidebar, TOC, and mobile menu.
- **Don't** claim the site is "for non-technical people" and then require a terminal without naming that tension.
- **Don't** copy styling from `/pm-pilot` or the `/for-*` pages until they are migrated.
