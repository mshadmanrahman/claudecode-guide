'use client';

import Link from 'next/link';
import { Globe, Monitor, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const JOURNEYS = [
  {
    id: 'web',
    label: 'On the web',
    icon: Globe,
    nickname: 'The Thinking Partner',
    tagline: 'Designer who never leaves the browser. Claude lives in a Project on claude.ai, open next to Figma. Nothing to install.',
    env: 'claude.ai',
    envStyle: 'bg-[var(--code)] text-[var(--ink)]',
    borderStyle: 'border-[var(--line)] ',
    headerStyle: 'bg-[var(--code)]',
    entryPath: ['Open claude.ai', 'Create a Project', 'Write your working agreement', 'Start interrogating briefs'],
    shifts: [
      {
        area: 'Brief work',
        before: 'Re-explain your users, constraints, and preferences at the start of every session.',
        after: 'A Project holds your working context. Every session starts already knowing your work.',
      },
      {
        area: 'Evaluation',
        before: 'Gut-check your designs and hope obvious issues surface in review.',
        after: 'Structured critique against all 10 heuristics, severity-rated and ready for sprint planning.',
      },
      {
        area: 'Research',
        before: '8 hours of affinity mapping. Post-its everywhere. Themes that shift when someone new joins.',
        after: '45 minutes. Paste raw notes, run the synthesis, review and challenge the themes.',
      },
    ],
    structuralShift:
      "Claude sees only what you paste or upload, and everything happens in conversation. Getting challenged in dialogue is a different experience from getting challenged in a review meeting.",
    appliesTo: [
      { slug: 'set-up-claude', short: 'Set Up' },
      { slug: 'decode-a-brief', short: 'Decode a Brief' },
      { slug: 'write-a-sharper-brief', short: 'Write a Brief' },
      { slug: 'evaluate-your-designs', short: 'Evaluate Designs' },
      { slug: 'heuristic-evaluation', short: 'Heuristic Eval' },
      { slug: 'research-synthesis', short: 'Research' },
    ],
  },
  {
    id: 'desktop',
    label: 'In the desktop app',
    icon: Monitor,
    nickname: 'The Active Collaborator',
    tagline:
      'Designer using the Claude app on Mac or Windows. Claude reads a folder of their briefs, notes and exports, and pushes back while the work is still in progress.',
    env: 'Mac or Windows',
    envStyle: 'bg-[var(--chip)] text-[var(--acc)]  ',
    borderStyle: 'border-[var(--line)] ',
    headerStyle: 'bg-[var(--chip)] ',
    entryPath: ['Open the Claude desktop app', 'Create a Project', 'Give it a folder of your files', 'Paste your working agreement'],
    shifts: [
      {
        area: 'Research',
        before: 'Manually copy-paste interview notes into a chat window, session by session.',
        after: 'Save notes as all-notes.md. Claude reads the file directly and runs synthesis on the full set.',
      },
      {
        area: 'Figma handoff',
        before: 'Export specs, open a chat, paste everything, explain the context again.',
        after: 'Save exports to your project folder. Claude reads tokens, layer names, and annotations in place.',
      },
      {
        area: 'Brief decoding',
        before: 'Explain the brief from scratch. Paste it. Add background. Re-explain the users.',
        after: 'brief.md is already in the folder. Claude reads it, asks the 20 questions before you open Figma.',
      },
    ],
    structuralShift:
      'The critique loop moves from post-design (review meetings) to in-design (working sessions). You stop defending decisions you already made.',
    appliesTo: [
      { slug: 'set-up-claude', short: 'Set Up' },
      { slug: 'decode-a-brief', short: 'Decode a Brief' },
      { slug: 'write-a-sharper-brief', short: 'Write a Brief' },
      { slug: 'evaluate-your-designs', short: 'Evaluate Designs' },
      { slug: 'heuristic-evaluation', short: 'Heuristic Eval' },
      { slug: 'figma-for-ai-handoff', short: 'Figma for AI Handoff' },
      { slug: 'research-synthesis', short: 'Research' },
    ],
  },
];

export function DesignerBeforeAfter() {
  const [ref, inView] = useInView(0.05);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all motion-reduce:transition-none duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-5xl">
            Same Claude. Two places to use it.
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            The difference is where your files live. On the web you paste them in. In the desktop app Claude reads them from a folder.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {JOURNEYS.map((journey, ji) => {
            const Icon = journey.icon;
            return (
              <div
                key={journey.id}
                className={`glass overflow-hidden rounded-xl transition-all motion-reduce:transition-none duration-500 ${
                  inView ? 'animate-slide-up-fade' : 'opacity-0'
                }`}
                style={{ animationDelay: `${ji * 120 + 100}ms` }}
              >
                {/* Header */}
                <div className={`px-5 py-4 ${journey.headerStyle} border-b ${journey.borderStyle}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-fd-muted-foreground" />
                      <span className="text-sm font-semibold text-fd-foreground">{journey.label}</span>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${journey.envStyle}`}>
                      {journey.env}
                    </span>
                  </div>
                  <p className="text-xs text-fd-muted-foreground">&quot;{journey.nickname}&quot;</p>
                </div>

                {/* Tagline */}
                <div className="px-5 py-3 border-b border-fd-border">
                  <p className="text-xs leading-relaxed text-fd-muted-foreground">{journey.tagline}</p>
                </div>

                {/* Entry path */}
                <div className="px-5 py-3 border-b border-fd-border">
                  <p className="mb-2 text-xs font-semibold text-[var(--muted)]">
                    Entry path
                  </p>
                  <div className="space-y-1">
                    {journey.entryPath.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[var(--muted)] text-xs font-mono w-4 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xs text-fd-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Behavioral shifts */}
                <div className="divide-y divide-fd-border">
                  {journey.shifts.map((shift) => (
                    <div key={shift.area} className="px-5 py-4">
                      <p className="mb-3 text-xs font-semibold text-[var(--muted)]">
                        {shift.area}
                      </p>
                      <div className="space-y-2">
                        <div className="flex gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--code)]" />
                          <p className="text-xs leading-relaxed text-fd-muted-foreground">{shift.before}</p>
                        </div>
                        <div className="flex gap-2.5">
                          <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--acc)]" />
                          <p className="text-xs leading-relaxed text-[var(--acc)] ">
                            {shift.after}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Structural shift */}
                <div className="px-5 py-4 border-t border-fd-border bg-fd-accent/40">
                  <p className="mb-2 text-xs font-semibold text-[var(--muted)]">
                    The structural shift
                  </p>
                  <p className="text-xs leading-relaxed text-[var(--muted)]">{journey.structuralShift}</p>
                </div>

                {/* Guide links */}
                <div className="px-5 py-3 border-t border-fd-border">
                  <p className="mb-2 text-xs font-semibold text-[var(--muted)]">
                    Applies to these guides
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {journey.appliesTo.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/for-designers/${guide.slug}`}
                        className="rounded-full border border-fd-border px-2.5 py-1 text-xs font-medium text-fd-muted-foreground hover:bg-fd-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
                      >
                        {guide.short}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
