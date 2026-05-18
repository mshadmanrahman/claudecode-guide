'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sun, Search, MessageSquare, PenLine, Moon, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type Slot = {
  time: string;
  label: string;
  title: string;
  description: string;
  prompt: string;
};

type PersonaId = 'everyone' | 'designers' | 'teachers' | 'marketers' | 'pms';

const PERSONAS: { id: PersonaId; label: string }[] = [
  { id: 'everyone', label: 'Everyone' },
  { id: 'designers', label: 'Designers' },
  { id: 'teachers', label: 'Teachers' },
  { id: 'marketers', label: 'Marketers' },
  { id: 'pms', label: 'PMs' },
];

const SLOT_ICONS: LucideIcon[] = [Sun, Search, MessageSquare, PenLine, Moon];

const WORKFLOW_DATA: Record<PersonaId, Slot[]> = {
  everyone: [
    {
      time: '08:00',
      label: 'Morning',
      title: 'Set your priorities',
      description:
        'Before opening email, ask Claude what actually matters today. Two minutes before the chaos starts.',
      prompt:
        'I have [X meetings] and [Y tasks] today. Help me decide what to tackle first and what can wait.',
    },
    {
      time: '10:00',
      label: 'Deep Work',
      title: 'Get the first draft done',
      description:
        "Don't stare at a blank page. Give Claude your rough notes and get a working draft back in minutes.",
      prompt:
        'Write a first draft of [document name]. Here are my rough notes: [paste notes]',
    },
    {
      time: '12:00',
      label: 'Communication',
      title: 'Clear your inbox faster',
      description:
        'Paste an email thread, describe what you want to say, get a reply that sounds like you.',
      prompt:
        "Here's an email I need to reply to. Write a professional, friendly response that [says X].",
    },
    {
      time: '14:00',
      label: 'Create',
      title: 'Make what you have better',
      description:
        'Share your draft, design notes, or plan. Claude pushes back and makes it tighter.',
      prompt:
        "Here's a draft I wrote. Make it clearer and more direct. Keep my voice.",
    },
    {
      time: '17:00',
      label: 'Wind Down',
      title: 'Capture the day',
      description:
        'End every day with a 3-bullet summary so tomorrow-you has a clean handoff.',
      prompt: 'Summarize what I worked on today in 3 clear bullets for my notes.',
    },
  ],
  designers: [
    {
      time: '08:00',
      label: 'Brief',
      title: 'Interrogate the brief',
      description:
        "Before you open Figma, run the brief through Claude. Find the gaps before they become wasted frames.",
      prompt:
        "Here's a client brief. Challenge it. What's missing, contradictory, or assumed?",
    },
    {
      time: '10:00',
      label: 'Research',
      title: 'Synthesize your inputs',
      description:
        'Paste competitor screenshots, user quotes, and notes. Claude finds the patterns so you can design to them.',
      prompt:
        "I have 5 competitor examples and 3 user quotes. What patterns do you see? What should I design toward?",
    },
    {
      time: '12:00',
      label: 'Critique',
      title: 'Get a second opinion',
      description:
        'Describe your wireframe or share a Figma export. Claude spots what might confuse users before your client does.',
      prompt:
        "Here's my current wireframe [describe or paste Figma notes]. What might confuse users? What's missing?",
    },
    {
      time: '14:00',
      label: 'Handoff',
      title: 'Write the developer specs',
      description:
        'Tell Claude what the component does and it writes the notes. Developers actually read these.',
      prompt:
        'Write developer notes for this component. Behavior: [X]. States: [Y]. Edge cases: [Z].',
    },
    {
      time: '17:00',
      label: 'Client Prep',
      title: "Anticipate tomorrow's feedback",
      description:
        "Before a client review, ask Claude what they're likely to push back on. Walk in prepared.",
      prompt:
        "What questions might my client ask in tomorrow's design review? How should I address each?",
    },
  ],
  teachers: [
    {
      time: '08:00',
      label: 'Morning',
      title: 'Anticipate where students get stuck',
      description:
        "Ask Claude what common misconceptions your students will have before you walk into class.",
      prompt:
        'What are the 3 most common misconceptions [grade] students have about [topic]?',
    },
    {
      time: '10:00',
      label: 'Assessment',
      title: 'Create materials in minutes',
      description:
        "Quiz questions, rubrics, exit tickets. Describe what you need and it's done.",
      prompt:
        'Create 10 quiz questions on [topic] for [grade] students. Mix easy and challenging.',
    },
    {
      time: '12:00',
      label: 'Communication',
      title: 'Write compassionate parent updates',
      description:
        "Describe the situation, Claude writes the email. Warm, honest, and professional.",
      prompt:
        "Write a kind but honest parent update about [student]'s recent struggles with [topic].",
    },
    {
      time: '14:00',
      label: 'Planning',
      title: 'Differentiate for every learner',
      description:
        'Take an activity and ask Claude to adapt it for students at different levels.',
      prompt:
        'Rewrite this activity for students who finish early: [paste activity]. Same concept, deeper challenge.',
    },
    {
      time: '17:00',
      label: 'Feedback',
      title: 'Give better feedback, faster',
      description:
        'Paste a student draft. Claude gives structured feedback you can copy or personalize.',
      prompt:
        'Give constructive feedback on this student essay draft. 2 strengths, 2 areas to improve.',
    },
  ],
  marketers: [
    {
      time: '08:00',
      label: 'Strategy',
      title: 'Prioritize your content week',
      description:
        "Tell Claude your goal and current channels. It helps you decide what's worth making.",
      prompt:
        'Our goal this month is [X]. What 3 types of content should I focus on this week?',
    },
    {
      time: '10:00',
      label: 'Creation',
      title: 'Unblock the blank page',
      description:
        'Give Claude a topic and it writes 3 different angles. You pick the one that clicks.',
      prompt:
        'Write 3 different LinkedIn post angles on [topic]. Each needs a different hook.',
    },
    {
      time: '12:00',
      label: 'Analysis',
      title: 'Make your data mean something',
      description:
        "Paste last week's stats. Claude tells you what's working and what to change.",
      prompt:
        "Here are last week's email stats: [paste]. What's working? What should I adjust?",
    },
    {
      time: '14:00',
      label: 'Copywriting',
      title: 'Sharpen the words',
      description:
        'Paste your headline, subject line, or CTA. Claude rewrites it with a specific goal in mind.',
      prompt:
        'Rewrite this email subject line to improve open rates. Current: "[X]". Goal: [more curiosity / urgency / clarity].',
    },
    {
      time: '17:00',
      label: 'Planning',
      title: 'End with a clear week ahead',
      description:
        "Give Claude your topics and it builds a content calendar. Five minutes, done.",
      prompt:
        'Build a simple content calendar for next week based on these topics: [X, Y, Z].',
    },
  ],
  pms: [
    {
      time: '08:00',
      label: 'Priorities',
      title: 'Start with signal, not noise',
      description:
        'Before standup, paste your tickets and asks. Claude helps you decide what actually matters.',
      prompt:
        'I have [X sprint tickets] and [Y stakeholder asks]. Help me rank by impact this week.',
    },
    {
      time: '10:00',
      label: 'Decisions',
      title: 'Think it through out loud',
      description:
        "Paste two approaches you're weighing. Claude gives you the tradeoffs you're not seeing.",
      prompt:
        "I'm deciding between [approach A] and [approach B]. What am I missing? What's the real tradeoff?",
    },
    {
      time: '12:00',
      label: 'Comms',
      title: 'Write updates that actually land',
      description:
        'Give Claude the raw state of a feature. It writes the stakeholder update in your tone.',
      prompt:
        'Write a stakeholder update on [feature]. Status: [X]. Risks: [Y]. Next steps: [Z].',
    },
    {
      time: '14:00',
      label: 'Discovery',
      title: 'Generate sharp questions fast',
      description:
        "Tell Claude the problem you're exploring. It generates interview questions that won't lead the witness.",
      prompt:
        'Generate 10 user interview questions to explore [problem space]. No leading questions.',
    },
    {
      time: '17:00',
      label: 'Prep',
      title: 'End ready for tomorrow',
      description:
        "Before you close your laptop, ask Claude to write tomorrow's meeting agenda.",
      prompt:
        "Write an agenda for tomorrow's [meeting type]. Context: [goal / attendees / key decisions].",
    },
  ],
};

export function DayFlow() {
  const [active, setActive] = useState<PersonaId>('everyone');
  const slots = WORKFLOW_DATA[active];

  return (
    <div>
      {/* Persona tab bar */}
      <div className="mb-12 flex flex-wrap gap-2">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActive(p.id);
              trackEvent('workflow_persona_switch', { persona: p.id });
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              active === p.id
                ? 'bg-fd-foreground text-fd-background'
                : 'border border-fd-border text-fd-muted-foreground hover:border-fd-foreground/30 hover:text-fd-foreground'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[52px] top-5 bottom-5 w-px bg-fd-border hidden sm:block" />

        <div className="space-y-4">
          {slots.map((slot, i) => {
            const Icon = SLOT_ICONS[i];
            return (
              <div key={`${active}-${slot.time}`} className="relative flex gap-4 sm:gap-8">
                {/* Time + icon column */}
                <div className="flex flex-col items-center gap-1.5 w-[52px] shrink-0 pt-5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-fd-card border border-fd-border z-10">
                    <Icon className="h-3.5 w-3.5 text-fd-muted-foreground" />
                  </div>
                  <span className="font-mono text-[10px] text-fd-muted-foreground/60">
                    {slot.time}
                  </span>
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0 rounded-xl border border-fd-border bg-fd-card p-6">
                  <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                    {slot.label}
                  </p>
                  <h3 className="font-display text-lg font-normal tracking-tight text-fd-foreground mb-2">
                    {slot.title}
                  </h3>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed mb-4">
                    {slot.description}
                  </p>
                  <div className="rounded-lg bg-fd-background border border-fd-border px-4 py-3">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground mb-1.5">
                      Try saying:
                    </p>
                    <p className="text-sm text-fd-foreground leading-relaxed italic">
                      &ldquo;{slot.prompt}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 pt-8 border-t border-fd-border flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <p className="text-sm text-fd-muted-foreground">
          Pick one slot. Try it today. Add another next week.
        </p>
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90"
          onClick={() => trackEvent('workflow_cta_click', { persona: active })}
        >
          Start with a tutorial
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
