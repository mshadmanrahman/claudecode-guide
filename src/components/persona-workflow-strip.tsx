"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { DESIGNERS_HUB } from "@/lib/hubs/designers";
import { TEACHERS_HUB } from "@/lib/hubs/teachers";
import { ui, type Locale } from "@/lib/i18n/locale";

type PersonaKey =
  | "designers"
  | "chrome"
  | "teachers"
  | "marketers"
  | "microsoft"
  | "hr";

export type SlotData = {
  time: string;
  label: string;
  title: string;
};

const PERSONA_STRIPS: Record<
  PersonaKey,
  { heading: string; slots: SlotData[] }
> = {
  designers: DESIGNERS_HUB.strip,
  chrome: {
    heading: "A browser user's day with Claude",
    slots: [
      {
        time: "08:00",
        label: "Morning",
        title: "Summarize overnight news and emails at a glance",
      },
      {
        time: "10:00",
        label: "Research",
        title: "Summarize any article or webpage in seconds",
      },
      {
        time: "12:00",
        label: "Writing",
        title: "Draft emails and documents directly in your browser",
      },
      {
        time: "14:00",
        label: "Review",
        title: "Check your writing before you send it",
      },
      {
        time: "17:00",
        label: "Wrap-up",
        title: "Capture key ideas before closing your tabs",
      },
    ],
  },
  microsoft: {
    heading: "An Office user's day with Claude",
    slots: [
      {
        time: "08:00",
        label: "Morning",
        title: "Draft today's document outline in Word",
      },
      {
        time: "10:00",
        label: "Data",
        title: "Get Excel formulas and analysis without the struggle",
      },
      {
        time: "12:00",
        label: "Comms",
        title: "Write the Outlook email you've been putting off",
      },
      {
        time: "14:00",
        label: "Slides",
        title: "Build a PowerPoint structure from scratch",
      },
      {
        time: "17:00",
        label: "Polish",
        title: "Clean up the document before it goes out",
      },
    ],
  },
  teachers: TEACHERS_HUB.strip,
  marketers: {
    heading: "A marketer's day with Claude",
    slots: [
      {
        time: "08:00",
        label: "Strategy",
        title: "Decide what content is worth making this week",
      },
      {
        time: "10:00",
        label: "Creation",
        title: "Generate 3 content angles and pick the best one",
      },
      {
        time: "12:00",
        label: "Analysis",
        title: "Make last week's data tell a clear story",
      },
      {
        time: "14:00",
        label: "Copy",
        title: "Sharpen headlines, subject lines, and CTAs",
      },
      {
        time: "17:00",
        label: "Planning",
        title: "Build next week's content calendar in 5 minutes",
      },
    ],
  },
  hr: {
    heading: "An HR professional's day with Claude",
    slots: [
      {
        time: "08:00",
        label: "Recruiting",
        title: "Write a job description that filters in the right candidates",
      },
      {
        time: "10:00",
        label: "Interviews",
        title: "Build role-specific questions tied to real competencies",
      },
      {
        time: "12:00",
        label: "Onboarding",
        title: "Draft a 30-60-90 plan for the new joiner starting Monday",
      },
      {
        time: "14:00",
        label: "Reviews",
        title: "Turn your bullet-point notes into written feedback",
      },
      {
        time: "17:00",
        label: "Comms",
        title: "Draft the all-staff email you've been putting off",
      },
    ],
  },
};

interface PersonaWorkflowStripProps {
  persona: PersonaKey;
  locale?: Locale;
  /** Translated heading and slots; defaults to the English strip for the persona. */
  copy?: { heading: string; slots: SlotData[] };
}

export function PersonaWorkflowStrip({ persona, locale = "en", copy }: PersonaWorkflowStripProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewFired = useRef(false);
  const data = copy ?? PERSONA_STRIPS[persona];
  const t = ui(locale);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewFired.current) {
          viewFired.current = true;
          trackEvent("workflow_strip_view", { persona });
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
            <h2 className="font-display text-headline leading-[1.1] font-semibold tracking-[-0.035em] text-fd-foreground">
              {data.heading}
            </h2>
          </div>
          <Link
            href="/workflow"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors whitespace-nowrap rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
            onClick={() =>
              trackEvent("workflow_strip_cta_click", {
                persona,
                position: "header",
              })
            }
          >
            {t.seePrompts}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="glass overflow-hidden rounded-xl">
          {data.slots.map((slot) => (
            <div
              key={slot.time}
              className="flex items-center gap-4 sm:gap-6 px-5 py-4 border-b border-[var(--line)] last:border-0 hover:bg-[var(--glass2)] transition-colors"
            >
              <span className="font-mono text-caption text-fd-muted-foreground w-10 shrink-0">
                {slot.time}
              </span>
              <span className="text-caption font-semibold text-[var(--muted)] w-20 shrink-0 hidden sm:block">
                {slot.label}
              </span>
              <p className="text-sm text-fd-foreground">{slot.title}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-fd-muted-foreground">
          {t.oneHabit}{" "}
          <Link
            href="/workflow"
            className="rounded-sm underline underline-offset-2 hover:text-fd-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
            onClick={() =>
              trackEvent("workflow_strip_cta_click", {
                persona,
                position: "footer",
              })
            }
          >
            {t.fullWorkflow}
          </Link>
        </p>
      </div>
    </section>
  );
}
