---
name: crucible
description: Stress-test an idea under pressure by convening a multi-persona council that debates, rebuts, and returns a verdict. Use for heavy-lift decisions like side-project strategy, product direction, career moves, or any question where the cost of being wrong is high. Triggers on "crucible", "/crucible", "run this through the crucible", "convene the crucible", "put X in the crucible", and Solo invocations like "give me the First Principles read on X". Not for tactical calls.
---

# Crucible

A council of specialized personas debates one idea under structured conflict. The chair synthesizes into a verdict. Transcripts are saved to disk so the thinking can be reused later.

Use this when the cost of being wrong is high enough to justify convening 5-10 subagents. For one-lens exploration without a debate, use Solo mode. For tactical questions that take under five minutes of normal thinking, don't use Crucible at all.

## Where this runs

- **Claude Code (terminal, desktop app Code tab, IDE):** full version. Personas run as parallel subagents with the Agent tool.
- **Claude in a chat (claude.ai, desktop Chat tab):** there are no subagents. The chair plays each persona in turn, in separate labeled sections, and writes each opening before reading any other. Keep the rubrics and the verdict format exactly the same. Skip the transcript file; put the full debate in the reply above the verdict instead.

## When to trigger

Trigger on explicit user invocation only. Examples:
- `/crucible <idea>` (Decision mode default)
- `/crucible --council <idea>` or `/crucible --quick <idea>` (Council mode)
- `/crucible --pm <idea>` (PM Daily mode)
- `/crucible --solo <persona> <idea>` or natural language ("give me the First Principles read on X")
- `/crucible --existential <idea>`
- "Run this through the crucible: ..."
- "Convene the crucible on ..."

Do not auto-trigger. This is an expensive skill and the user decides when it runs.

## Five modes

The chair selects the mode at intake based on the user's phrasing OR an explicit flag. Most daily use belongs in Council or Solo. Decision and Existential are for real decisions with real stakes.

### Mode 1: Solo (single-persona lens, ~10-15 seconds)

**Triggers:** `/crucible --solo <persona>`, or natural language ("give me the First Principles read on X", "what does the Expansionist think about Y", "Track Record this for me").

**Persona count:** 1. No duels. No chair verdict. The chair's only job is persona-matching and returning the rubric output unchanged.

**Use for:** Exploration, not decisions. When you want one specific lens, not a debate.

**Honesty check:** If you find yourself reaching for Solo to avoid hearing the Contrarian, that's a signal to run Council mode instead.

### Mode 2: Council (daily reflex, ~30-45 seconds)

**Triggers:** "council", "quick crucible", "gut check", "throw rocks at this", "poke holes", "sanity check", `/crucible --council`, `/crucible --quick`.

**Bench:** 5 personas, parallel openings only. No duels. No verdict beyond a one-liner.
- Contrarian (Sonnet, NOT Opus at this tier to keep cost down)
- First Principles (Sonnet at this tier)
- Expansionist (Sonnet)
- Outsider (Haiku)
- Operator (Haiku)

**Output:** Five short challenges (80-120 words each) plus a one-line "proceed / shelve / reframe" call from the chair. No transcript file unless the user asks.

**Use for:** Daily ideation, "I just thought of X, is it dumb?", quick sanity checks between meetings.

### Mode 3: PM Daily (bounded ideation, ~60-90 seconds)

**Triggers:** "pm brainstorm", "pm daily crucible", `/crucible --pm`.

**Bench:** 4 personas, parallel openings, no duels, short verdict.
- Contrarian (Sonnet)
- Operator (Haiku)
- First Principles (Sonnet at this tier)
- Expansionist (Sonnet)

**Output:** Four one-paragraph challenges plus a chair verdict (proceed / shelve / reframe + one concrete next action if proceed). Transcript optional.

**Use for:** Product work ideation, feature direction, user research design, anything that deserves more than "throw rocks" but less than a full decision council.

### Mode 4: Decision (default, 9-11 personas)

**Triggers:** `/crucible`, "convene the crucible", "run this through the crucible", or the skill's default when the user's phrasing implies a real decision.

**Bench:** Core 6 plus bench-specific specialty per `references/benches.md`, typically 9-11 personas. Full duels. Full verdict. Transcript written.

**Use for:** Real decisions with multiple weeks, money, or reputation at stake.

### Mode 5: Existential (Heavy Custom, all 17 personas)

**Triggers:** User explicitly flags "existential", "life decision", "full crucible", or the chair detects that the question implies existential scope.

**Bench:** All 17 personas. Full duels. Extended verdict.

**Use guardrail:** If invoked more than once per quarter, the chair warns: "You've convened the Existential tier N times in M days. These questions usually move slower than that. Proceed anyway?"

## Motivated-convening guardrail

Before firing any Decision or Existential council, the chair asks three questions at intake:

1. **Has a structurally similar question been convened in the last 30 days?** Glob `crucible-transcripts/` in the current project for recent transcripts and compare topic proximity. If a near-duplicate exists, show its verdict and ask: "Is this a re-run of that, or genuinely new?"
2. **What decision does a verdict produce that you will act on in the next 14 days?** If the user cannot name a concrete action, say: "This looks like a discussion, not a decision. Use Council mode instead."
3. **What new information has arrived since you last thought seriously about this?** If the honest answer is "none, just renewed energy," say: "Re-running a decision with no new information is often appetite dressed up as rigor. Proceed anyway, or reframe?"

The chair never REFUSES to run. It names what it sees and lets the user decide. This is the skill's main defense against becoming a procrastination ritual.

## Core design

**17 personas, 1 chair.** The chair selects 1-17 personas per run based on mode and problem type (see `references/benches.md`). The Core 6 are always convened in Decision and Existential modes. The rest are activated by bench.

**Four phases.** Intake, opening takes, pair duels, verdict.

**Model routing per persona.** Haiku for rubric-driven checks, Sonnet for judgment, Opus for Contrarian, First Principles, Consequences, and Chair.

**Transcripts persist.** The full debate is written to `crucible-transcripts/YYYY-MM-DD-{slug}.md` in the current project folder (create the folder if it doesn't exist). The main thread sees only the verdict and a link. Thinking is preserved, context stays clean.

**Rubrics prevent theater.** Each persona has concrete deliverables (cite an analog, estimate a number, name a mechanism), not just "give your take". See `references/personas.md`.

## Phase 1: Intake

The chair (main thread) does four things:

1. **Classify the input.** Is this a *problem statement* ("should I do X?") or a *proposed solution* ("here's my plan, tear it apart")? Frame the persona prompts differently for each.

2. **Collect the user's goals.** Track Record and Goals Check need them. Read the project's CLAUDE.md and any notes the user points to. If the goals aren't written down anywhere, ask in one line: "What are you trying to achieve overall, and what constraints are non-negotiable (money, time, values)?"

3. **Select the bench.** In Decision and Existential modes, always convene the Core 6: Contrarian, Advocate, Pre-mortem, Operator, First Principles, Expansionist. Add specialty personas based on problem type per `references/benches.md`.

4. **Restate and confirm.** Before spinning up subagents, restate the question in one sentence and ask the user to confirm or correct the framing. Do not skip this. Mis-framed questions produce sharp answers to the wrong thing.

## Phase 2: Opening takes (parallel subagents)

Spawn one subagent per selected persona **in parallel** (single message, multiple Agent tool calls). Each subagent:

- Uses the `general-purpose` subagent_type
- Uses the model tier specified in `references/personas.md`
- Receives a self-contained prompt containing: the persona's full rubric, the user's idea, the framing mode (problem vs solution), the user's goals where the persona needs them, and the output length constraint
- Writes a direct response back; no file writes at this phase

Personas cannot see each other's openings. This is deliberate; it prevents contamination and produces honest independent takes.

Collect all opening takes before moving to Phase 3. Store them internally as labeled blocks (`{persona_name}_opening`).

## Phase 3: Pair duels (serial subagents, anonymized rebuttals)

**Central duel (MANDATORY in Decision and Existential modes):**
- **First Principles vs Expansionist** is the spine of Crucible. Strip-to-bedrock vs scale-to-100x is the highest-value tension this council generates. It always fires when both personas are in the bench (always true in Decision and Existential modes). The chair must address its resolution in the verdict.

**Other duels (activated only if both personas are in the current bench):**
- **Advocate vs Contrarian:** is the premise valid?
- **Operator vs Historian:** can we ship it, has anyone shipped it?
- **Economist vs Consequences:** who pays, and then what?
- **Success Vision vs Worst Case Cost:** best case vs worst case, in concrete numbers
- **Track Record vs Reframer:** your past patterns vs the meta-question: are you pattern-matching correctly or asking the wrong thing?

**Anonymized rebuttals:** When persona A rebuts persona B's opening, the prompt strips B's name and persona label. A sees the opening's content only, not who wrote it. The rebuttal prompt instructs: "Attack the argument, not the persona. You don't know who wrote this." This prevents deference to dramatic framings (Pre-mortem's 12-month failure scene tends to win on tone, not substance) and forces argumentative honesty.

For each active duel, spawn **two subagents**:
1. Persona A reads Persona B's opening (anonymized), writes a rebuttal (100-150 words)
2. Persona B reads Persona A's opening (anonymized), writes a rebuttal (100-150 words)

Unpaired personas in the bench (Goals Check, Outsider, Regulator, Pre-mortem when its partner is absent) skip the duel phase and weigh in at the verdict.

## Phase 4: Chair verdict (main thread)

The chair reads all openings and rebuttals, writes the transcript file, and issues a verdict.

**Transcript file.** Write to `crucible-transcripts/YYYY-MM-DD-{slug}.md` with sections:
- Question (as restated and confirmed at intake)
- Bench convened (list of personas, model used)
- Opening takes (one section per persona)
- Duels (one section per active duel, both rebuttals)
- Unpaired voices (Goals Check, Outsider, Regulator if present)
- Verdict (the chair's output, duplicated here)

Use today's real date for the filename (for example `date -u +"%Y-%m-%d"`).

**Inline verdict format** (this is what the user sees in the chat):

```
## Crucible Verdict

**Question:** {restated question}
**Bench:** {n} personas convened

**Verdict:** PROCEED | REFRAME | KILL
**Reasoning:** {2-3 sentences tying to the strongest arguments}

**First Principles vs Expansionist:** {1-2 sentences naming where bedrock and 100x landed; mandatory in Decision and Existential modes}

**Strongest unresolved objection:** {one sentence}, from {Persona name}

**If PROCEED:** Next action: {one concrete step}
**If REFRAME:** New framing: {one sentence}
**If KILL:** Failure mechanism: {one sentence}

**Goals check:** {Goals Check finding, one line, if activated}

**Minority report:** {named persona}: "{one sentence quoted dissent}"

**Full transcript:** `crucible-transcripts/YYYY-MM-DD-{slug}.md`
```

The minority report is mandatory. Even on a unanimous PROCEED, surface the strongest cautionary voice. This prevents false consensus.

The First Principles vs Expansionist resolution line is also mandatory in Decision and Existential modes. If the chair cannot name where the two landed, the chair has not done its job.

## Orchestration rules

- **Parallelize Phase 2.** All opening takes fire in a single message with multiple Agent tool calls. Do not serialize.
- **Run duels one at a time.** Within a duel, fire the two rebuttals in parallel (each reads the opposing opening, not the opposing rebuttal).
- **Anonymize rebuttal prompts.** Strip persona names and labels from the opening being rebutted. Tell the rebuttal subagent: "Attack the argument, not the persona."
- **Never skip intake confirmation in Decision or Existential modes.** If the user's input is ambiguous, restate and ask. One extra round trip costs nothing; a mis-framed council costs 10 subagents.
- **Solo mode skips intake confirmation.** Match the persona and spawn the subagent. The user already named what they want.
- **Respect the roster.** Do not invent new personas mid-run. If the problem needs a persona not in the roster, flag it in the verdict as a "council gap".
- **Track Record needs file access.** When Track Record is in the bench, its subagent prompt must include the reading list described in `references/personas.md`.

## Cost expectations

A typical strategy run: 10 personas (Core 6 + a specialty bench of 4) plus chair. Roughly:
- 2-3 Haiku subagents (Operator, Goals Check, Worst Case Cost): cheap
- 5-6 Sonnet subagents: moderate
- 2 Opus subagents (Contrarian, First Principles) plus Chair: the expensive ones, justified by their leverage

Ten subagents take 30-60 seconds and use a real share of a usage limit, so save Decision mode for decisions that deserve it. The main thread only keeps the verdict and minority report; the transcript lives on disk.

Council mode (5 personas, all Sonnet or Haiku) is the cheap daily reflex.
Solo mode (1 persona) is near-free.

## Files in this skill

- `SKILL.md`, this file, the orchestration spec
- `references/personas.md`, all 17 persona rubrics with model tier and output format
- `references/benches.md`, problem-type to bench mapping plus all 5 modes

Load `references/personas.md` and `references/benches.md` at intake. They are the runtime data the chair needs.

## Anti-patterns to avoid

- **Council theater.** Personas that give vibes instead of concrete deliverables. Enforce the rubric.
- **Mediator mush.** A chair that summarizes instead of deciding. Always issue a verdict.
- **False consensus.** A verdict that hides dissent. The minority report is not optional.
- **Bench creep.** Convening all 17 personas "to be thorough". Thorough means the *right* personas for *this* problem, not all of them. Exception: Existential mode, when the user explicitly flags an existential decision.
- **Auto-triggering.** Firing the crucible on questions that don't warrant it. Explicit invocation only.
- **Solo as Contrarian-avoidance.** Reaching for Solo mode to hear only the lens that will validate you. If you notice this, escalate to Council.
- **Volitional inference.** Drawing claims about the user's choices ("walked away from", "gave up on", "doesn't want to own", "rejected as a model") from evidence that doesn't support a choice. Especially dangerous when mixing personal projects with client or contract work. A project ending under someone else's ownership is not the user choosing to exit. See the Track Record guardrails in `references/personas.md`.
- **Skipping the central duel.** In Decision and Existential modes, First Principles vs Expansionist is mandatory. If the chair skips it or fails to address its resolution in the verdict, the run is incomplete.
