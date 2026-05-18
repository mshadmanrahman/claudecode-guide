'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type PersonaKey = 'designers' | 'chrome' | 'teachers' | 'marketers' | 'microsoft';

type SlotData = {
  time: string;
  label: string;
  title: string;
};

const PERSONA_STRIPS: Record<PersonaKey, { heading: string; slots: SlotData[] }> = {
  designers: {
    heading: "A designer's day with Claude",
    slots: [
      { time: '08:00', label: 'Brief', title: 'Interrogate the brief before touching Figma' },
      { time: '10:00', label: 'Research', title: 'Synthesize competitors and user quotes into patterns' },
      { time: '12:00', label: 'Critique', title: 'Get a second opinion on your wireframes' },
      { time: '14:00', label: 'Handoff', title: 'Write the developer specs in minutes' },
      { time: '17:00', label: 'Prep', title: "Anticipate tomorrow's client feedback" },
    ],
  },
  chrome: {
    heading: "A browser user's day with Claude",
    slots: [
      { time: '08:00', label: 'Morning', title: 'Summarize overnight news and emails at a glance' },
      { time: '10:00', label: 'Research', title: 'Summarize any article or webpage in seconds' },
      { time: '12:00', label: 'Writing', title: 'Draft emails and documents directly in your browser' },
      { time: '14:00', label: 'Review', title: 'Check your writing before you send it' },
      { time: '17:00', label: 'Wrap-up', title: 'Capture key ideas before closing your tabs' },
    ],
  },
  microsoft: {
    heading: "An Office user's day with Claude",
    slots: [
      { time: '08:00', label: 'Morning', title: "Draft today's document outline in Word" },
      { time: '10:00', label: 'Data', title: 'Get Excel formulas and analysis without the struggle' },
      { time: '12:00', label: 'Comms', title: "Write the Outlook email you've been putting off" },
      { time: '14:00', label: 'Slides', title: 'Build a PowerPoint structure from scratch' },
      { time: '17:00', label: 'Polish', title: 'Clean up the document before it goes out' },
    ],
  },
  teachers: {
    heading: "A teacher's day with Claude",
    slots: [
      { time: '08:00', label: 'Morning', title: 'Anticipate where students will get stuck today' },
      { time: '10:00', label: 'Assessment', title: 'Create quiz questions and rubrics in minutes' },
      { time: '12:00', label: 'Comms', title: 'Write compassionate, clear parent updates' },
      { time: '14:00', label: 'Planning', title: 'Differentiate activities for every learner' },
      { time: '17:00', label: 'Feedback', title: 'Give better essay feedback, faster' },
    ],
  },
  marketers: {
    heading: "A marketer's day with Claude",
    slots: [
      { time: '08:00', label: 'Strategy', title: "Decide what content is worth making this week" },
      { time: '10:00', label: 'Creation', title: 'Generate 3 content angles and pick the best one' },
      { time: '12:00', label: 'Analysis', title: "Make last week's data tell a clear story" },
      { time: '14:00', label: 'Copy', title: 'Sharpen headlines, subject lines, and CTAs' },
      { time: '17:00', label: 'Planning', title: "Build next week's content calendar in 5 minutes" },
    ],
  },
};

interface PersonaWorkflowStripProps {
  persona: PersonaKey;
}

export function PersonaWorkflowStrip({ persona }: PersonaWorkflowStripProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewFired = useRef(false);
  const data = PERSONA_STRIPS[persona];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewFired.current) {
          viewFired.current = true;
          trackEvent('workflow_strip_view', { persona });
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [persona]);

  if (!data) return null;

  return (
    <section ref={sectionRef} className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
              Daily Workflow
            </p>
            <h2 className="font-display text-3xl font-normal tracking-tight text-fd-foreground sm:text-4xl">
              {data.heading}
            </h2>
          </div>
          <Link
            href="/workflow"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors whitespace-nowrap"
            onClick={() => trackEvent('workflow_strip_cta_click', { persona, position: 'header' })}
          >
            See prompts
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="rounded-xl border border-fd-border overflow-hidden">
          {data.slots.map((slot) => (
            <div
              key={slot.time}
              className="flex items-center gap-4 sm:gap-6 bg-fd-card px-5 py-4 border-b border-fd-border last:border-0 hover:bg-fd-accent/50 transition-colors"
            >
              <span className="font-mono text-[11px] text-fd-muted-foreground w-10 shrink-0">
                {slot.time}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground w-20 shrink-0 hidden sm:block">
                {slot.label}
              </span>
              <p className="text-sm text-fd-foreground">{slot.title}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-fd-muted-foreground">
          One habit at a time.{' '}
          <Link
            href="/workflow"
            className="underline underline-offset-2 hover:text-fd-foreground"
            onClick={() => trackEvent('workflow_strip_cta_click', { persona, position: 'footer' })}
          >
            See the full workflow with prompts you can copy
          </Link>
        </p>
      </div>
    </section>
  );
}
