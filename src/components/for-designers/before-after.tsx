'use client';

import { Globe, FolderOpen, Terminal, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const JOURNEYS = [
  {
    id: 'claude-ai',
    label: 'Claude.ai',
    icon: Globe,
    env: 'Online only',
    envStyle: 'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300',
    borderStyle: 'border-slate-200 dark:border-slate-700',
    headerStyle: 'bg-slate-50 dark:bg-slate-900/40',
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
    note: 'Works entirely in your browser. No local files, no terminal, no setup required.',
  },
  {
    id: 'co-work',
    label: 'Claude Co-Work',
    icon: FolderOpen,
    env: 'Local workspace',
    envStyle: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    borderStyle: 'border-emerald-200 dark:border-emerald-800/40',
    headerStyle: 'bg-emerald-50/50 dark:bg-emerald-950/30',
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
    note: 'Everything runs in a folder you create on your machine. Claude can read any file you put there.',
  },
  {
    id: 'claude-code',
    label: 'Claude Code',
    icon: Terminal,
    env: 'Local + terminal',
    envStyle: 'bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300',
    borderStyle: 'border-blue-200 dark:border-blue-800/40',
    headerStyle: 'bg-blue-50/50 dark:bg-blue-950/30',
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
    note: 'Git knowledge required. Start with Guide 11 before Guide 07 if you have not used Git before.',
  },
];

export function DesignerBeforeAfter() {
  const [ref, inView] = useInView(0.05);

  return (
    <section className="py-28" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`mb-16 transition-all duration-500 ${
            inView ? 'animate-slide-up-fade' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-5xl font-light text-fd-muted-foreground/30">01</span>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-fd-foreground sm:text-5xl">
            Three ways to work
          </h2>
          <p className="mt-4 max-w-lg text-fd-muted-foreground">
            Each journey has different access to your files and context. That changes what Claude can do.
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
                {/* Journey header */}
                <div className={`px-5 py-4 ${journey.headerStyle} border-b ${journey.borderStyle}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-fd-muted-foreground" />
                      <span className="text-sm font-semibold text-fd-foreground">{journey.label}</span>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${journey.envStyle}`}>
                      {journey.env}
                    </span>
                  </div>
                </div>

                {/* Workspace note */}
                <div className="px-5 py-3 border-b border-fd-border">
                  <p className="text-[11px] text-fd-muted-foreground leading-relaxed">{journey.note}</p>
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
                          <p className="text-[12px] leading-relaxed text-green-700 dark:text-green-400">{shift.after}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
