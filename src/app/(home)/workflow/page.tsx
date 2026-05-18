import Link from 'next/link';
import { DayFlow } from '@/components/workflow/day-flow';
import { WorkflowTracker } from '@/components/workflow/workflow-tracker';
import { OsMapLink } from '@/components/workflow/os-map-link';
import { SiteFooter } from '@/components/site-footer';
import { MessageSquare, Cpu, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claude in Your Day | Claude Code Guide',
  description:
    'How to wire Claude into your whole day, not just one task. Real workflows for designers, teachers, marketers, and PMs.',
  openGraph: {
    title: 'Claude in Your Day',
    description:
      'How to wire Claude into your whole day, not just one task. Real workflows for designers, teachers, marketers, and PMs.',
    type: 'website',
  },
};

export default function WorkflowPage() {
  return (
    <>
      <WorkflowTracker />
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-16" data-workflow-intro>
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
            Your Claude Workflow
          </p>
          <h1 className="font-display text-4xl font-normal tracking-tight text-fd-foreground sm:text-5xl mb-6">
            Claude, quietly working through your day.
          </h1>
          <p className="max-w-xl text-lg text-fd-muted-foreground leading-relaxed">
            Most people use Claude for one task. Here&apos;s what it looks like when you wire
            it into your whole workflow, morning to wind down.
          </p>
          <p className="mt-3 text-sm text-fd-muted-foreground">
            Pick your role below. Five moments. One day. Start wherever feels easy.
          </p>
        </div>

        {/* How it works */}
        <div className="mb-16 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: MessageSquare,
              step: '01',
              title: 'You describe what you need',
              description:
                'One sentence. Plain English. No special syntax. Just tell Claude what you want to get done.',
            },
            {
              icon: Cpu,
              step: '02',
              title: 'Claude does the thinking',
              description:
                'It reads what you gave it, pulls it together, and produces something — a draft, a plan, a set of questions, a summary.',
            },
            {
              icon: FileText,
              step: '03',
              title: 'You get something to work with',
              description:
                "Not a search result. Not a link. An actual output you can edit, send, or act on.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="rounded-xl border border-fd-border bg-fd-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fd-background border border-fd-border">
                    <Icon className="h-4 w-4 text-fd-muted-foreground" />
                  </div>
                  <span className="font-mono text-xs text-fd-muted-foreground/40">{item.step}</span>
                </div>
                <h3 className="mb-2 font-display text-base font-normal tracking-tight text-fd-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        <DayFlow />

        {/* Origin note */}
        <div className="mt-16 rounded-xl border border-fd-border bg-fd-card/50 p-6 sm:p-8" data-workflow-complete>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground mb-3">
            Where this came from
          </p>
          <p className="text-sm text-fd-muted-foreground leading-relaxed max-w-2xl">
            This page is a simplified version of an AI operating system I actually run. Four agents, 25+
            automated workflows, morning brief to evening recap. The prompts above are drawn from what
            I use daily as a PM and builder.
          </p>
          <OsMapLink />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
