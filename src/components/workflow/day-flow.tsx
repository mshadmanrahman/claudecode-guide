'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface Step {
  time: string;
  label: string;
  title: string;
  give: string;
  get: string;
  prompt: string;
}

type PersonaId = 'everyone' | 'designers' | 'teachers' | 'marketers' | 'hr' | 'pms';

interface Persona {
  id: PersonaId;
  label: string;
  pathHref: string;
  pathLabel: string;
}

const PERSONAS: ReadonlyArray<Persona> = [
  { id: 'everyone', label: 'Everyone', pathHref: '/start', pathLabel: 'Which Claude should I open?' },
  { id: 'designers', label: 'Designers', pathHref: '/for-designers', pathLabel: 'The designers path' },
  { id: 'teachers', label: 'Teachers', pathHref: '/for-teachers', pathLabel: 'The teachers path' },
  { id: 'marketers', label: 'Marketers', pathHref: '/for-marketers', pathLabel: 'The marketers path' },
  { id: 'hr', label: 'HR teams', pathHref: '/for-hr', pathLabel: 'The HR path' },
  { id: 'pms', label: 'PMs', pathHref: '/pm-pilot', pathLabel: 'The PM path' },
];

const WORKFLOW_DATA: Record<PersonaId, ReadonlyArray<Step>> = {
  everyone: [
    {
      time: '08:00',
      label: 'plan',
      title: 'Pick what matters today',
      give: 'Your meetings and your to-do list, as messy as they are.',
      get: 'A ranked list, with the things that can wait marked as such.',
      prompt:
        'I have [X meetings] and [Y tasks] today. Help me decide what to tackle first and what can wait.',
    },
    {
      time: '10:00',
      label: 'draft',
      title: 'Turn rough notes into a first draft',
      give: 'Bullet points, half sentences, whatever you jotted down.',
      get: 'A working draft you can edit, instead of a blank page.',
      prompt: 'Write a first draft of [document name]. Here are my rough notes: [paste notes]',
    },
    {
      time: '12:00',
      label: 'reply',
      title: 'Answer the email you keep putting off',
      give: 'The email thread, plus one line on what you want to say.',
      get: 'A reply in a friendly, professional tone, ready for you to edit.',
      prompt:
        "Here's an email I need to reply to. Write a professional, friendly response that [says X].",
    },
    {
      time: '14:00',
      label: 'review',
      title: 'Tighten something you already wrote',
      give: 'Your draft, plan or design notes.',
      get: 'A clearer, more direct version that still sounds like you.',
      prompt: "Here's a draft I wrote. Make it clearer and more direct. Keep my voice.",
    },
    {
      time: '17:00',
      label: 'wrap up',
      title: "Leave notes for tomorrow's you",
      give: 'What you worked on today, in any order.',
      get: 'Three bullets you can paste into your notes.',
      prompt: 'Summarize what I worked on today in 3 clear bullets for my notes.',
    },
  ],
  designers: [
    {
      time: '08:00',
      label: 'brief',
      title: 'Question the brief before you open Figma',
      give: 'The client brief, pasted in full.',
      get: 'The gaps, contradictions and assumptions to raise with the client.',
      prompt: "Here's a client brief. Challenge it. What's missing, contradictory, or assumed?",
    },
    {
      time: '10:00',
      label: 'research',
      title: 'Find the patterns in your research',
      give: 'Competitor examples and a few user quotes.',
      get: 'The patterns across them, and what to design toward.',
      prompt:
        'I have 5 competitor examples and 3 user quotes. What patterns do you see? What should I design toward?',
    },
    {
      time: '12:00',
      label: 'critique',
      title: 'Get a second opinion on the wireframe',
      give: 'Your wireframe, described in words or pasted from your Figma notes.',
      get: 'What might confuse users, and what is missing.',
      prompt:
        "Here's my current wireframe [describe or paste Figma notes]. What might confuse users? What's missing?",
    },
    {
      time: '14:00',
      label: 'handoff',
      title: 'Write the developer notes',
      give: "The component's behavior, its states and its edge cases.",
      get: 'Handoff notes a developer can build from.',
      prompt:
        'Write developer notes for this component. Behavior: [X]. States: [Y]. Edge cases: [Z].',
    },
    {
      time: '17:00',
      label: 'review prep',
      title: "Prepare for tomorrow's client review",
      give: 'What you are presenting and what the client asked for.',
      get: 'The questions they are likely to ask, with an answer for each.',
      prompt:
        "What questions might my client ask in tomorrow's design review? How should I address each?",
    },
  ],
  teachers: [
    {
      time: '08:00',
      label: 'prep',
      title: 'Know where students will get stuck',
      give: 'The grade and the topic you are teaching today.',
      get: 'The common misconceptions to plan your lesson around.',
      prompt: 'What are the 3 most common misconceptions [grade] students have about [topic]?',
    },
    {
      time: '10:00',
      label: 'assess',
      title: 'Write the quiz',
      give: 'The topic, the grade and how hard it should be.',
      get: 'Ten questions you review and adjust before class.',
      prompt:
        'Create 10 quiz questions on [topic] for [grade] students. Mix easy and challenging.',
    },
    {
      time: '12:00',
      label: 'parents',
      title: 'Write a hard parent update',
      give: 'What you have noticed and what you are doing about it. Leave the student unnamed.',
      get: 'A kind, honest email you add the name to and send.',
      prompt:
        "Write a kind but honest parent update about a student's recent struggles with [topic]. Here's what I've noticed: [notes]",
    },
    {
      time: '14:00',
      label: 'differentiate',
      title: 'Adapt one activity for early finishers',
      give: 'The activity you already planned.',
      get: 'The same concept with a deeper challenge.',
      prompt:
        'Rewrite this activity for students who finish early: [paste activity]. Same concept, deeper challenge.',
    },
    {
      time: '17:00',
      label: 'feedback',
      title: 'Draft feedback on student work',
      give: 'A student draft, with the name removed.',
      get: 'Two strengths and two things to improve, ready to personalize.',
      prompt:
        'Give constructive feedback on this student essay draft. 2 strengths, 2 areas to improve.',
    },
  ],
  marketers: [
    {
      time: '08:00',
      label: 'plan',
      title: "Choose this week's content",
      give: "This month's goal and the channels you use.",
      get: 'The three types of content worth making this week.',
      prompt: 'Our goal this month is [X]. What 3 types of content should I focus on this week?',
    },
    {
      time: '10:00',
      label: 'draft',
      title: 'Get three angles on one topic',
      give: 'The topic you need to post about.',
      get: 'Three post angles, each with a different hook. You pick one.',
      prompt: 'Write 3 different LinkedIn post angles on [topic]. Each needs a different hook.',
    },
    {
      time: '12:00',
      label: 'analyze',
      title: "Read last week's numbers",
      give: 'Your email stats, pasted as they are.',
      get: 'What worked, and what to change next week.',
      prompt:
        "Here are last week's email stats: [paste]. What's working? What should I adjust?",
    },
    {
      time: '14:00',
      label: 'rewrite',
      title: 'Sharpen a subject line',
      give: 'The current line and what you want it to do.',
      get: 'Rewrites aimed at that one goal.',
      prompt:
        'Rewrite this email subject line to improve open rates. Current: "[X]". Goal: [more curiosity / urgency / clarity].',
    },
    {
      time: '17:00',
      label: 'schedule',
      title: "Plan next week's calendar",
      give: 'The topics you want to cover.',
      get: 'A simple content calendar for the week.',
      prompt: 'Build a simple content calendar for next week based on these topics: [X, Y, Z].',
    },
  ],
  hr: [
    {
      time: '08:00',
      label: 'triage',
      title: "Sort the day's requests",
      give: 'Your open requests, with names removed.',
      get: 'An order by urgency, with the ones that need a conversation flagged.',
      prompt:
        "Here are today's open HR requests, names removed: [paste]. Order them by urgency and flag the ones that need a conversation, not an email.",
    },
    {
      time: '10:00',
      label: 'hiring',
      title: 'Write a clearer job post',
      give: 'The role, the team and what the person must be able to do.',
      get: 'A plain job post with must-haves split from nice-to-haves.',
      prompt:
        'Write a job post for [role] on the [team] team. Must be able to: [X]. Split requirements into must-have and nice-to-have. Plain language.',
    },
    {
      time: '12:00',
      label: 'policy',
      title: 'Explain a policy in plain words',
      give: 'The policy text as it is written today.',
      get: 'A short summary employees can read, plus the questions they will ask.',
      prompt:
        'Rewrite this policy as a short summary for employees, then list the 5 questions they are most likely to ask: [paste policy]',
    },
    {
      time: '14:00',
      label: 'listen',
      title: 'Find the themes in exit interviews',
      give: 'Interview notes with every name stripped out first.',
      get: 'The recurring themes, and how many interviews mention each.',
      prompt:
        'Here are exit interview notes with names removed: [paste]. What themes come up more than once? Count how many interviews mention each.',
    },
    {
      time: '17:00',
      label: 'prep',
      title: "Prepare for tomorrow's hard conversation",
      give: 'The situation and what you need to say.',
      get: 'An opening line, the likely reactions and how to respond to each.',
      prompt:
        "I have a difficult conversation tomorrow about [situation]. I need to say [X]. Suggest an opening, the likely reactions, and how to respond to each.",
    },
  ],
  pms: [
    {
      time: '08:00',
      label: 'rank',
      title: "Rank this week's work",
      give: 'Your sprint tickets and the stakeholder asks.',
      get: 'One list ranked by impact for this week.',
      prompt: 'I have [X sprint tickets] and [Y stakeholder asks]. Help me rank by impact this week.',
    },
    {
      time: '10:00',
      label: 'decide',
      title: 'Test a decision before you make it',
      give: 'The two approaches you are weighing.',
      get: 'The tradeoffs you have not named yet.',
      prompt:
        "I'm deciding between [approach A] and [approach B]. What am I missing? What's the real tradeoff?",
    },
    {
      time: '12:00',
      label: 'update',
      title: 'Write the stakeholder update',
      give: 'The raw status, the risks and the next steps.',
      get: 'An update written in your tone.',
      prompt:
        'Write a stakeholder update on [feature]. Status: [X]. Risks: [Y]. Next steps: [Z].',
    },
    {
      time: '14:00',
      label: 'discovery',
      title: 'Write interview questions that do not lead',
      give: 'The problem you are exploring.',
      get: 'Ten open questions for user interviews.',
      prompt: 'Generate 10 user interview questions to explore [problem space]. No leading questions.',
    },
    {
      time: '17:00',
      label: 'prep',
      title: "Set up tomorrow's meeting",
      give: 'The meeting type, its goal and who is coming.',
      get: 'An agenda you can send tonight.',
      prompt:
        "Write an agenda for tomorrow's [meeting type]. Context: [goal / attendees / key decisions].",
    },
  ],
};

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]';

/** Renders a prompt with each [placeholder] tinted, so the reader sees what to replace. */
function PromptText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[') && part.endsWith(']') ? (
          <span key={i} className="rounded-[4px] bg-[var(--chip)] px-1 text-[var(--ink)]">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function CopyPrompt({ prompt, persona, time }: { prompt: string; persona: PersonaId; time: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      trackEvent('workflow_prompt_copy', { persona, time });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`flex shrink-0 items-center gap-1.5 rounded-md border border-[var(--line)] px-2 py-1 font-mono text-xs text-[var(--muted)] transition-colors hover:text-[var(--ink)] ${focusRing}`}
    >
      {copied ? <Check className="h-3 w-3" aria-hidden="true" /> : <Copy className="h-3 w-3" aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'copied' : 'copy'}</span>
      <span className="sr-only"> prompt</span>
    </button>
  );
}

export function DayFlow() {
  const [active, setActive] = useState<PersonaId>('everyone');
  const steps = WORKFLOW_DATA[active];
  const persona = PERSONAS.find((p) => p.id === active) ?? PERSONAS[0];

  return (
    <div>
      <div
        role="group"
        aria-label="Pick your role"
        className="mb-10 flex flex-wrap gap-2"
      >
        {PERSONAS.map((p) => {
          const current = active === p.id;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={current}
              onClick={() => {
                setActive(p.id);
                trackEvent('workflow_persona_switch', { persona: p.id });
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${focusRing} ${
                current
                  ? 'bg-[var(--acc)] text-[var(--accInk)]'
                  : 'glass text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <ol aria-label={`A workday with Claude: ${persona.label}`} className="m-0 list-none p-0">
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={`${active}-${step.time}`} className="grid grid-cols-[44px_1fr] gap-3 sm:grid-cols-[64px_1fr] sm:gap-6">
              {/* Rail: time, node, connector to the next step */}
              <div className="flex flex-col items-center pt-5">
                <span className="font-mono text-xs text-[var(--muted)]">{step.time}</span>
                <span aria-hidden="true" className="mt-2 block h-2 w-2 rounded-full border border-[var(--muted)] bg-[var(--bg)]" />
                {!last && <span aria-hidden="true" className="wf-dash-y mt-2 w-px flex-1" />}
              </div>

              <article className={`glass min-w-0 rounded-xl ${last ? '' : 'mb-4'}`}>
                <header className="flex items-baseline gap-3 border-b border-[var(--line)] px-4 py-3 sm:px-5">
                  <span className="font-mono text-xs text-[var(--muted)]">{step.label}</span>
                  <h3 className="m-0 text-base font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-[17px]">
                    {step.title}
                  </h3>
                </header>

                <dl className="m-0 grid sm:grid-cols-2">
                  <div className="border-b border-[var(--line)] px-4 py-3 sm:border-r sm:px-5">
                    <dt className="mb-1 font-mono text-xs text-[var(--muted)]">you give</dt>
                    <dd className="m-0 text-sm leading-relaxed text-[var(--ink)]">{step.give}</dd>
                  </div>
                  <div className="border-b border-[var(--line)] px-4 py-3 sm:px-5">
                    <dt className="mb-1 font-mono text-xs text-[var(--muted)]">you get back</dt>
                    <dd className="m-0 text-sm leading-relaxed text-[var(--ink)]">{step.get}</dd>
                  </div>
                </dl>

                <div className="px-4 py-3 sm:px-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-[var(--muted)]">prompt</span>
                    <CopyPrompt prompt={step.prompt} persona={active} time={step.time} />
                  </div>
                  <p className="m-0 break-words rounded-lg bg-[var(--code)] px-3 py-2.5 font-mono text-[13px] leading-relaxed text-[var(--ink)]">
                    <PromptText text={step.prompt} />
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center">
        <p className="m-0 text-sm text-[var(--muted)]">
          Pick one step and try it today. Replace the tinted parts with your own details.
        </p>
        <Link
          href={persona.pathHref}
          className={`inline-flex shrink-0 items-center gap-2 rounded-lg bg-[var(--acc)] px-5 py-2.5 text-sm font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 ${focusRing}`}
          onClick={() => trackEvent('workflow_cta_click', { persona: active, href: persona.pathHref })}
        >
          {persona.pathLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
