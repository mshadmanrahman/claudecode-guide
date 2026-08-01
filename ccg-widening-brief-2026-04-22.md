---

title: CCG Widening Research Brief
date: 2026-04-22
status: draft for redline
purpose: Phase 1 input for rewriting /docs/foundations/which-interface into the canonical "Which Claude Should You Use?" page across every Claude surface.
streams: query landscape, competitor audit, Anthropic surface truth
tags:
  - reference
  - ccg
---

# CCG Widening Research Brief (2026-04-22)

## TL;DR

1. **"Which Claude should I use" literally has no owner.** The #1 page for the exact query is a solo-operator blog (Lasse Rouhiainen) with no domain authority, stale model info, and zero surface coverage. CCG can take #1 with a unified decision framework and normal SEO hygiene.
2. **No ranker unifies the full surface area.** Zapier covers models plus Cowork but misses the Office add-ins. ProductTalk covers Code only. Anthropic's own pages each cover one surface in isolation. This is the gap.
3. **Three factual landmines would torch the page if we trust LLM memory alone.** Claude in Office does NOT require Copilot (it's a standalone add-in on Claude Pro+). Cowork computer-use is still research preview, not GA. Claude for Chrome is beta, paid-only, not Free.
4. **Dispatch and M365 Connector are the early-mover plays.** Low competition, rising volume, barely any content ranks. Worth prioritizing in Phase 2.
5. **Phase 1 page should be organized around jobs, not surfaces.** "Writing a doc? Word. Analyzing a workbook? Excel. Autonomous multi-step task? Cowork. Chat and quick research? Claude.ai." That framing is absent from every top-ranking page across eight target queries.

---

## Part 1: Target query landscape

### Top 15 queries ranked by opportunity (volume × low competition)

| # | Query | Volume | Competition | Opportunity | Notes |
|---|---|---|---|---|---|
| 1 | which claude should i use | Low-Med | **Low** | **Very high** | SERP is weak, Lasse Rouhiainen holds #1 with model-only framing. Clean opening. |
| 2 | claude for non-developers | Low-Med | **Low** | High | ProductTalk ranks with a paywalled Code-only piece. Audience fit perfect. |
| 3 | claude cowork vs claude chat | Low-Med | **Very low** | High | Nobody has written the "when to use which" piece. |
| 4 | claude dispatch | Med | Low-Med | High | Ethan Mollick blessed it. Rising fast. |
| 5 | claude cowork dispatch setup | Low-Med | Low | High | Plain-language explainer absent. |
| 6 | claude tracked changes word | Low-Med | Very low | High | Legal and comms audience. Wide open. |
| 7 | claude m365 connector | Low-Med | Low | High | Only the MS marketplace listing ranks. |
| 8 | claude subagents explained | Low-Med | Low | High | Dispatch + Cowork both use subagents. No non-technical explainer. |
| 9 | claude import memory | Med | Low | Med-high | New feature, rising query. |
| 10 | claude for business users | Low-Med | Low-Med | Med | Lorphic ranks weakly. |
| 11 | claude schedule tasks | Low-Med | Low | Med | Cowork scheduled-task feature underexplained. |
| 12 | claude powerpoint corporate template | Med | Low | Med | PM/consultant query. Prezent sponsored content ranks. |
| 13 | claude for word | Med | Med | Med | Anthropic support owns #1; third-party space is small. |
| 14 | claude for excel | High | High | Med | High volume but DataCamp + Anthropic dominate. Need a sharper angle. |
| 15 | claude vs copilot excel | High | Med | Med | Finance/ops commercial intent. XDA ranks. |

### Cluster hot spots

- **Office (Excel / PowerPoint / Word)**: Excel is saturated, PowerPoint is mid, Word is the newest and lightest SERP. Opportunity ordering: Word > PowerPoint > Excel.
- **Cowork and Dispatch**: Freshest surface, thinnest content supply, Anthropic's own pages read as marketing. Biggest "early mover" play.
- **Non-developer / PM / business user**: Enough volume, modest competition, perfect audience fit for CCG.
- **Migration from ChatGPT**: High volume but highly contested (Zapier, PyCoach, NxCode). Play the "non-coder" angle, not the generic "Claude vs ChatGPT" angle.

### Queries the original scope missed

`claude vs copilot excel`, `claude import memory`, `claude powerpoint corporate template`, `claude m365 connector`, `claude tracked changes word`, `claude for finance`, `claude schedule tasks`, `claude subagents explained`, `claude plans comparison`, `claude cowork vs claude chat`.

**Confidence**: SERP domains and ranking positions verified. Volume and competition are order-of-magnitude estimates inferred from SERP depth, autocomplete density, and competing domain authority. No Ahrefs / Semrush data was accessed. GSC data in 3 to 5 days will calibrate volume estimates against the queries already reaching `/docs/foundations/which-interface`.

---

## Part 2: Competitor landscape

### What winning content looks like today

Three camps. Anthropic's own pages (claude.com, support.claude.com) own at least 5 of the 8 audited queries but are thin, marketing-first or help-desk-first, and rarely cross-reference surfaces. A handful of third-party blogs (Zapier, DataCamp, Lasse Rouhiainen, ProductTalk) do the real teaching, running 2,500 to 4,500 words with tables and screenshots, refreshed in early 2026. Vendor-sponsored content (Prezent.ai for PowerPoint) is shoehorning in with undisclosed positioning.

Winners share: long-form (2,500+ words), hybrid tutorial plus comparison, refreshed quarterly, one-surface or model-centric framing. **None** attempt a full decision framework spanning Claude.ai plus Cowork plus Office plus mobile in a single view. That absence is the opportunity.

### The three biggest gaps

1. **No ranker unifies the full Claude surface area.** Zapier's 4,500-word comparison never mentions the Office add-ins. Lasse's 2,500-word model guide has zero surface coverage. Anthropic's own pages cover one surface each in isolation. The unified decision view does not exist on page 1 of any major query.
2. **No honest "which surface for which job" decision tree for non-technical ChatGPT switchers.** The Anthropic "get started" page is 800 words and does not mention Office. ProductTalk says "you don't need to be technical" then walks into terminals, Node.js, and slash commands.
3. **Cowork content is thin and marketing-heavy.** The #1 result for "claude cowork" is Anthropic's own 1,200-word marketing page: no procedural guidance, no examples, no setup prerequisites. No one has explained when Cowork beats Claude.ai chat or when it beats the Office add-ins.

### Benchmarks to study

- **Zapier** is the bar. 4,500 words, March 2026 refresh, comparison tables, covers models plus Cowork, balanced voice. Their gap (no Office, light on mobile) is exactly where CCG differentiates.
- **Lasse Rouhiainen** holds #2 on "which claude should i use" on content alone with no domain authority. Proof that a clean decision framework can outrank bigger publishers. Study the structure, ignore the conflicting pricing data and stale model info.

---

## Part 3: Surface truth cheat sheet (2026-04-22)

Only the availability facts. Full capability matrix lives in Stream 3 output, archived below.

| Surface | Status | Availability | One-line "when to use" |
|---|---|---|---|
| Claude.ai (web) | GA | Free + all paid | Chat, quick research, Artifacts, Projects |
| Claude mobile | GA | All plans | On the go, voice, Dispatch handoff |
| Claude Desktop | GA | All plans (Cowork gated to Pro+) | Host for Cowork and Claude Code |
| Claude for Chrome | Beta | Paid plans only (not Free) | Read-along browsing, multi-tab, scheduled tasks |
| Claude Code (CLI) | GA | Pro+ or API | Agentic terminal coding |
| Claude Code on the web | Research preview | Pro, Max | Cloud sandbox coding |
| Claude Code Desktop app | GA (Apr 14 redesign) | Pro+ | Parallel coding sessions UI |
| Claude for Excel | GA | Pro+ | Formulas, pivots, modeling with cell citations |
| Claude for PowerPoint | GA | Pro+ | Template-aware slide generation |
| Claude for Word | GA (Apr 13) | Pro+ | Redlining, comments, long-doc review |
| M365 Connector | GA (Apr expansion) | All plans (incl Free) | Read-only search across Outlook, Teams, OneDrive, SharePoint |
| Cowork | GA; computer-use is preview | Pro+ | Multi-step autonomous work, connectors |
| Cowork Dispatch | Research preview | Pro, Max | Persistent phone-to-desktop task handoff |
| Claude Agent SDK | GA | API | Programmable agent loop |
| Claude API | GA | API | Custom app integration |
| Claude in Slack | GA | Paid Slack | Workspace bot, thread Q&A |

---

## Part 4: Factual landmines (do NOT write the opposite of these)

- **Office add-ins do NOT require Microsoft 365 Copilot.** They require a paid Claude plan (Pro or higher) and a compatible Office version. Confusing the two misleads enterprise buyers.
- **Cowork is released, but computer-use is still research preview** on Pro/Max only. Do not describe Cowork as "fully autonomous" or "GA for desktop control." It ships as a product with autonomous features in preview.
- **Cowork Dispatch is research preview**, Pro/Max only. Not on Team or Enterprise yet.
- **Claude for Chrome is beta, paid-only.** Not on Free tier.
- **Claude for Excel saves nothing server-side after 30 days, and chat history is not retained.** Flag for regulated workflows.
- **M365 Connector is read-only.** Claude cannot send email, create calendar events, or edit Teams through it. Personal `@outlook.com` accounts are not supported (work tenants only).
- **Microsoft's "Copilot Cowork" is a Microsoft product built on Anthropic tech.** Do not conflate with Anthropic's own Cowork.
- **Projects, Artifacts, Memory are features of Claude.ai, not standalone surfaces.** Describe them as features.
- **No standalone "Claude for Outlook" add-in exists.** Outlook access ships via the M365 Connector.
- **Pricing is exact**: Pro $17/mo annual or $20/mo monthly. Team $20/seat annual, $25/mo. Max starts $100/mo. Enterprise $20/seat + API usage. Do not round or approximate.

---

## Part 5: Recommended Phase 1 outline

### Title options (pick one for final)

- "Which Claude Should You Use? A Plain-English Guide to Every Claude Surface"
- "Which Claude? Pick the Right One for the Job"
- "A Non-Coder's Guide to Choosing Between Claude's 12+ Surfaces"

### Structure

1. **Hook (150 words)**: "Claude is no longer one thing. It's a dozen." Name the problem for a ChatGPT switcher.
2. **The job-first decision tree (the hero section)**: Seven or eight "I want to ___" entry points, each routing to a surface:
   - Chat about anything → Claude.ai
   - Analyze a spreadsheet → Claude for Excel
   - Build a deck → Claude for PowerPoint
   - Write or review a long document → Claude for Word
   - Browse the web with Claude → Claude for Chrome
   - Search my work files (email, Teams, Drive) → M365 Connector
   - Run a multi-step task while I do other things → Cowork
   - Hand off a task from phone to desktop → Cowork Dispatch
   - Build an app or write code → Claude Code
   - Integrate Claude into my own product → Agent SDK / API
3. **The surface matrix**: Availability grid (the one in Part 3 of this brief, condensed and prettified for web).
4. **"Coming from ChatGPT?"**: A section addressing the migration intent query. Mental model differences (no one-size tool, pick the surface for the job), specific feature parity notes (Memory, Artifacts, Projects vs ChatGPT's Custom GPTs).
5. **Honest caveats**: The factual landmines rewritten as reader-facing notes ("Heads up: Office add-ins do NOT require Microsoft Copilot").
6. **Where to go next**: Links to surface-specific tutorials (which become Phase 2).
7. **FAQ**: 6 to 8 "people also ask" questions pulled from Stream 1 query research.

### Target word count

2,800 to 3,500. Enough depth to beat Zapier's 4,500 on specificity without drowning the non-technical reader. The job-first decision tree should take roughly 40% of the page.

### SEO targeting

- Primary: "which Claude should I use," "which Claude," "Claude interface guide"
- Secondary: "Claude for non-developers," "Claude for business users," "Claude Cowork vs chat"
- Internal links from: `/start`, `/guide`, `/docs/foundations/claude-md`, every Phase 2 surface page

---

## Part 6: Phase 2 page priority (pending GSC validation)

Ordered by opportunity-to-effort ratio. GSC data in 3-5 days may reshuffle.

1. `/docs/claude-in-office/word`, newest, lightest SERP, `claude tracked changes word` is wide open
2. `/docs/cowork/dispatch-explained`, rising query, zero plain-English explainer exists
3. `/docs/claude-in-office/powerpoint`, PM/consultant audience, Prezent sponsored content is the only ranker
4. `/docs/cowork/getting-started`, Anthropic's own marketing page is the ceiling to clear
5. `/docs/from-chatgpt/migration-guide`, Phase 3 proper, biggest SEO prize, hardest to differentiate
6. `/docs/claude-in-office/excel`, saturated, needs a sharper angle (finance? vs Copilot?) before it ships

---

## Part 7: Open questions GSC will answer

1. **What queries actually brought the 290 sessions to `/docs/foundations/which-interface` last month?** Validates or rejects the cluster priorities in Part 1.
2. **What is the current impression vs click ratio for those queries?** Tells us whether the existing page is losing clicks to competitors.
3. **Are there queries bringing traffic that we would not have expected (long-tail we should amplify)?**
4. **Are there queries the site appears for but loses badly on (weak title tags vs intent)?**

Expected answer date: Friday Apr 24 to Monday Apr 27.

---

## Part 8: Appendix, raw stream outputs

For reference during writing. Archived from the three parallel research runs.

### Stream 1: Query landscape

(Top sources: `support.claude.com/en/articles/8114487`, `zapier.com/blog/claude-vs-chatgpt`, `datacamp.com/tutorial/claude-in-excel`, `claude.com/claude-for-powerpoint`, `support.claude.com/en/articles/14465370-use-claude-for-word`, `anthropic.com/product/claude-cowork`, `oneusefulthing.org/p/claude-dispatch-and-the-power-of`, `claude.com/import-memory`, `sachinrekhi.com/p/claude-code-for-product-managers`, `platform.claude.com/docs/en/agent-sdk/overview`, `xda-developers.com/paired-microsoft-excel-with-claude`, `lasserouhiainen.com/which-claude-model-is-best`.)

### Stream 2: Competitor audit

(Detailed page-by-page audits of the 8 target queries. Top patterns: Anthropic marketing pages own branded queries; Zapier and DataCamp own teaching queries; no one owns unified surface queries.)

### Stream 3: Surface truth

(Full capability matrix, plus Microsoft 365 Connector, Claude Code Desktop redesign Apr 14, Claude Design Apr 17 TechCrunch reference (unverified), Cowork computer-use preview status, M365 Connector read-only caveats, precise pricing.)

Full stream outputs available in chat log from 2026-04-22 research session. Re-run with `SendMessage to: a94f81bc218a642af` (query), `a2f13a79662fbd0ec` (competitor), `a9a4ddf3e3aa1c4ec` (surface truth) for deeper follow-ups.

---
[[MOC - Side Projects]]
