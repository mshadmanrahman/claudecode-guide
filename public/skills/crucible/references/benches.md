# Benches

Maps problem type to the persona bench the chair should convene. The chair reads this at intake and picks the matching bench. Default: the Personal / Side Project / Career bench for side-project and career questions, which is the most common trigger.

**Core 6 (always convened in Decision mode):** Contrarian, Advocate, Pre-mortem, Operator, First Principles, Expansionist.

The First Principles vs Expansionist duel is mandatory in every Decision and Existential run. Strip-to-bedrock vs scale-to-100x is the central tension Crucible exists to surface.

---

## Bench: Personal / Side Project / Career

**Triggers:**
- Side-project strategy, product direction, revenue goals
- Career moves, positioning, personal brand
- "Should I keep working on X vs pivot?"
- "Is this project worth the time?"
- Identity-adjacent questions (what kind of builder am I becoming)

**Adds to Core 6:**
- Track Record (your past patterns)
- Goals Check (alignment with the user's stated goals and constraints)
- Success Vision (12-month win as a scene)
- Worst Case Cost (quantified failure)

**Total:** 10 personas + chair.

---

## Bench: Strategic / Business / Product

**Triggers:**
- Product strategy, feature prioritization
- Business model, pricing, unit economics
- Market positioning, competitive response
- Decisions with multi-month horizons and multiple stakeholders

**Adds to Core 6:**
- Economist (who pays, what behavior is rewarded)
- Competitor (market response)
- Consequences (causation chains, feedback loops)
- Historian (precedents and analogs)

**Total:** 10 personas + chair.

---

## Bench: New Idea / Reframe

**Triggers:**
- Greenfield ideas, "should I start X?"
- Anything labelled "brainstorm", "explore", "is this worth doing"
- When the user seems stuck on the framing itself

**Adds to Core 6:**
- Reframer (is this the right question)
- Historian (who has tried this)
- Success Vision (paint the default win)

**Total:** 9 personas + chair.

---

## Bench: User-Facing Product Launch

**Triggers:**
- Consumer product launches
- User-facing feature decisions where adoption is uncertain
- Anything where "will people actually use this" is an open question

**Adds to Core 6:**
- Outsider (will beginners get it)
- Economist (who pays, how)
- Competitor (market response)
- Success Vision + Worst Case Cost (paired: best case vs floor)

**Total:** 11 personas + chair.

---

## Bench: Regulated / High-Stakes

**Triggers:**
- Money, data, health, legal, platform ToS, affiliate compliance
- Decisions that touch the user's financial or ethical constraints
- Anything that could get a cease-and-desist

**Adds to Core 6:**
- Regulator (compliance specifics)
- Economist (who pays, who enforces)
- Worst Case Cost (quantified failure including legal cost)
- Historian (who got burned and how)

**Total:** 10 personas + chair.

---

## Mode: Council (daily reflex, replaces Quick Brainstorm)

**Triggers:** "council", "quick crucible", "gut check", "throw rocks at this", "poke holes", "sanity check", `/crucible --council`, `/crucible --quick`

**Five personas, all Sonnet, parallel openings only. No duels. No transcript by default.**

- Contrarian
- First Principles
- Expansionist
- Outsider
- Operator

This is the LLM Council shape (Andrej Karpathy). Use it as the daily reflex when a question deserves more than a gut reaction but less than a real council. The five lenses cover: attack the premise, strip to bedrock, scale to 100x, ignore your jargon, what ships Monday.

**Output:** Five short paragraphs (80-120 words each) plus a one-line chair call (proceed / shelve / reframe).

**Total:** ~30-45 seconds wall time, ~5K tokens.

---

## Mode: PM Daily (bounded ideation)

**Triggers:** "pm brainstorm", "pm daily crucible", `/crucible --pm`

**Personas (4):**
- Contrarian (Sonnet)
- Operator (Haiku)
- First Principles (Sonnet, not Opus at this tier to keep cost down)
- Expansionist (Sonnet)

**No duels.** Output: four paragraph challenges plus chair verdict with next action. Transcript optional.

**Total:** ~60-90 seconds wall time.

Use this when the question is PM-specific (feature direction, user research design, sprint shaping) and Council mode feels too general.

---

## Mode: Solo (single-persona lens)

**Triggers:**
- `/crucible --solo <persona>` (e.g., `--solo first-principles`, `--solo advocate`)
- Natural language: "give me the First Principles read on X", "what does the Expansionist think about Y", "Track Record this for me"

**One persona runs. No duels. No chair verdict. Just the rubric output.**

The chair's only job in Solo mode is:
1. Identify which persona the user wants (fuzzy match against the 17)
2. Spawn that single subagent with its full rubric
3. Return the output as-is, no synthesis layer on top

**Use for:** When you want one specific lens, not a debate. Quick "what would the Contrarian say about this?" or "show me the 100x version of this idea."

**Honest trade-off:** Solo skips the friction that makes Crucible valuable. Use it for exploration, not for decisions. If you find yourself reaching for Solo to avoid hearing the Contrarian, that's a signal to run Council mode instead.

**Total:** ~10-15 seconds wall time, single subagent cost.

---

## Mode: Heavy Custom (Existential, all 17 personas)

**Triggers:**
- User explicitly says "run the full crucible", "convene everyone", `/crucible --existential`
- One-off existential decisions (major career pivots, founder splits, etc.)

**Adds to Core 6:** All 11 remaining personas.

**Total:** 17 personas + chair. Use sparingly; this is the "everything" button.

**Guardrail:** If invoked more than once per quarter, chair warns: "You've convened the Existential tier N times in M days. These questions usually move slower than that. Proceed anyway?"

---

## Chair selection logic

1. Read the user's phrasing and classify the problem type using the triggers above.
2. If the user invoked Solo, skip bench selection and go straight to persona-matching.
3. If ambiguous, ask: "This looks like a {type} question. Should I use the {bench name} bench, or do you want a different mix?"
4. Never mix benches by default. If the question genuinely spans two domains (e.g., a side project that needs regulatory review), it is legitimate to add one specialist persona from a second bench. Name the reason in the intake restatement.
5. Never drop a Core 6 persona from Decision or Existential mode. They are always in.
6. Never skip the intake confirmation. One extra round trip is cheap; a mis-framed council is expensive.

---

## Mode summary table

| Mode | Personas | Duels | Verdict | Transcript | Use when |
|---|---|---|---|---|---|
| Solo | 1 | No | No | No | One lens, no debate |
| Council | 5 | No | One-liner | Optional | Daily reflex, gut check |
| PM Daily | 4 | No | Short | Optional | PM-specific ideation |
| Decision | 9-11 | Yes (incl. mandatory First Principles vs Expansionist) | Full | Yes | Real decision, multi-week stakes |
| Existential | 17 | Yes (full set) | Extended | Yes | Life-stakes, max twice per quarter |
