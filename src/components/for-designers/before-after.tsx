'use client';

import Link from 'next/link';
import { Globe, FolderOpen, Terminal, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const JOURNEYS = [
  {
    id: 'claude-ai',
    label: 'Claude.ai',
    icon: Globe,
    nickname: 'The Thinking Partner',
    tagline: 'Designer who never leaves the browser. Claude lives in a Project tab alongside Figma. No terminal, no code.',
    env: 'Online only',
    envStyle: 'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300',
    borderStyle: 'border-slate-200 dark:border-slate-700',
    headerStyle: 'bg-slate-50 dark:bg-slate-900/40',
    entryPath: ['claude.ai', 'Create a Project', 'Write your working agreement', 'Start interrogating briefs'],
    shifts: [
      {
        area: 'Brief work',
        before: 'Re-explain your users, constraints, and preferences at the start of every session.',
        after: 'Claude.ai Projects hold your working context. Every session starts already knowing your work.',
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
      "Claude doesn't touch files. Can't build. Everything happens in conversation. Getting challenged in dialogue is a different experience from getting challenged in a review meeting.",
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
    id: 'co-work',
    label: 'Claude Co-Work',
    icon: FolderOpen,
    nickname: 'The Active Collaborator',
    tagline:
      "Designer using Claude's co-working mode in the desktop app. Claude is in the session with them, actively challenging and building alongside.",
    env: 'Local workspace',
    envStyle: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    borderStyle: 'border-emerald-200 dark:border-emerald-800/40',
    headerStyle: 'bg-emerald-50/50 dark:bg-emerald-950/30',
    entryPath: ['Claude desktop app', 'Local project folder', 'CLAUDE.md working agreement', 'Active collaborative session'],
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
      'The critique loop moves from post-design (review meetings) to in-design (co-work sessions). You stop defending decisions you already made.',
    appliesTo: [
      { slug: 'set-up-claude', short: 'Set Up' },
      { slug: 'decode-a-brief', short: 'Decode a Brief' },
      { slug: 'write-a-sharper-brief', short: 'Write a Brief' },
      { slug: 'evaluate-your-designs', short: 'Evaluate Designs' },
      { slug: 'heuristic-evaluation', short: 'Heuristic Eval' },
    ],
  },
  {
    id: 'claude-code',
    label: 'Claude Code',
    icon: Terminal,
    nickname: 'The Prototype Builder',
    tagline:
      'Designer who has crossed into the terminal. Uses Claude Code in VS Code or Cursor. Builds working HTML prototypes, not just static specs.',
    env: 'Local + terminal',
    envStyle: 'bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300',
    borderStyle: 'border-blue-200 dark:border-blue-800/40',
    headerStyle: 'bg-blue-50/50 dark:bg-blue-950/30',
    entryPath: ['Install Claude Code', 'VS Code / Cursor / Terminal', 'CLAUDE.md working agreement', 'Point Claude at files'],
    shifts: [
      {
        area: 'Everything Co-Work can do',
        before: 'Brief work, evaluation, and research synthesis still take manual setup each session.',
        after: 'All guides apply. Claude reads your files and runs every workflow Co-Work supports.',
      },
      {
        area: 'Prototyping',
        before: 'Write a brief, hand it to a dev, wait two days to see if the interaction feels right.',
        after: 'Describe the component in plain English. Claude builds and runs it in the same session.',
      },
      {
        area: 'Design handoff',
        before: 'Static screens plus annotations. Dev interprets spacing, states, and edge cases.',
        after: 'Working React component from your Figma prep. Devs review code, not specs.',
      },
    ],
    structuralShift:
      "The handoff artifact changes. Designer arrives at review with a working prototype. The lost-in-translation moment between design and code shrinks dramatically.",
    appliesTo: [
      { slug: 'set-up-claude', short: 'Set Up' },
      { slug: 'evaluate-your-designs', short: 'Evaluate Designs' },
      { slug: 'figma-for-ai-handoff', short: 'Figma for AI Handoff' },
      { slug: 'build-your-first-flow', short: 'Build First Flow' },
      { slug: 'get-started-with-claude-design', short: 'Claude Design' },
      { slug: 'automate-design-tasks', short: 'Automate Tasks' },
    ],
  },
];

export function DesignerBeforeAfter() {
  const [ref, inView] = useInView(0.05);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all duration-500 ${inView ? 'animate-slide-up-fade' : 'opacity-0'}`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">02</span>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            Same tool. Three completely different jobs.
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Each journey reflects a different mode of adoption and a different structural shift in how you work. Pick where you are today.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {JOURNEYS.map((journey, ji) => {
            const Icon = journey.icon;
            return (
              <div
                key={journey.id}
                className={`overflow-hidden rounded-xl border transition-all duration-500 ${journey.borderStyle} ${
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
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${journey.envStyle}`}>
                      {journey.env}
                    </span>
                  </div>
                  <p className="text-[11px] italic text-fd-muted-foreground">&quot;{journey.nickname}&quot;</p>
                </div>

                {/* Tagline */}
                <div className="px-5 py-3 border-b border-fd-border">
                  <p className="text-[11px] leading-relaxed text-fd-muted-foreground">{journey.tagline}</p>
                </div>

                {/* Entry path */}
                <div className="px-5 py-3 border-b border-fd-border">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                    Entry path
                  </p>
                  <div className="space-y-1">
                    {journey.entryPath.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-fd-muted-foreground/40 text-[10px] font-mono w-4 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[11px] text-fd-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Behavioral shifts */}
                <div className="divide-y divide-fd-border">
                  {journey.shifts.map((shift) => (
                    <div key={shift.area} className="px-5 py-4">
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                        {shift.area}
                      </p>
                      <div className="space-y-2">
                        <div className="flex gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60" />
                          <p className="text-[12px] leading-relaxed text-fd-muted-foreground">{shift.before}</p>
                        </div>
                        <div className="flex gap-2.5">
                          <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                          <p className="text-[12px] leading-relaxed text-green-700 dark:text-green-400">
                            {shift.after}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Structural shift */}
                <div className="px-5 py-4 border-t border-fd-border bg-fd-accent/40">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                    The structural shift
                  </p>
                  <p className="text-[11px] leading-relaxed text-fd-foreground/80">{journey.structuralShift}</p>
                </div>

                {/* Guide links */}
                <div className="px-5 py-3 border-t border-fd-border">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                    Applies to these guides
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {journey.appliesTo.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/for-designers/${guide.slug}`}
                        className="rounded-full border border-fd-border px-2.5 py-1 text-[10px] font-medium text-fd-muted-foreground hover:bg-fd-accent transition-colors"
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
