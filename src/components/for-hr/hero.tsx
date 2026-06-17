"use client";

import Link from "next/link";
import { Users, FileText, MessageSquare } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const JOURNEYS = [
  {
    id: "recruiting",
    label: "Recruiting",
    icon: Users,
    tagline: "Job descriptions and interviews",
    note: "Write job descriptions that filter correctly, and build interview questions tied to the competencies that actually matter.",
  },
  {
    id: "people-ops",
    label: "People ops",
    icon: FileText,
    tagline: "Onboarding, reviews, retention",
    note: "Onboarding plans, performance review templates, and exit interview analysis — the recurring work that takes most of your week.",
  },
  {
    id: "communication",
    label: "Communication",
    icon: MessageSquare,
    tagline: "Policies and announcements",
    note: "Employee communications that land the right way, and policy documents people will actually read.",
  },
];

export function HrHero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <nav className="flex flex-wrap items-center gap-2 mb-10">
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">
          Structural overview
        </span>
        <span className="text-fd-muted-foreground/30 text-xs">/</span>
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">
          For HR
        </span>
        <span className="text-fd-muted-foreground/30 text-xs">/</span>
        <span className="text-xs text-fd-muted-foreground uppercase tracking-widest">
          Claude Code guide
        </span>
      </nav>

      <h1 className="font-display text-5xl font-medium tracking-tight text-fd-foreground sm:text-6xl lg:text-[5.5rem] leading-[1.05]">
        You hire. You develop. You communicate.
        <br />
        <em className="italic text-fd-muted-foreground">
          Claude handles the drafting.
        </em>
      </h1>

      <p className="mt-8 max-w-lg text-lg text-fd-muted-foreground leading-relaxed">
        HR professionals spend hours every week writing things that are not the
        job: job descriptions, onboarding plans, performance review templates,
        policy documents, all-staff emails. These guides show you how to use
        Claude for all of it, so your time goes back to the people.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {JOURNEYS.map((j) => {
          const Icon = j.icon;
          return (
            <div
              key={j.id}
              className="rounded-xl border border-fd-border bg-fd-card p-5"
            >
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                Works for
              </p>
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="h-4 w-4 text-fd-foreground/70" />
                <span className="text-sm font-semibold text-fd-foreground">
                  {j.label}
                </span>
              </div>
              <p className="text-xs font-medium text-fd-foreground/80 mb-1">
                {j.tagline}
              </p>
              <p className="text-[11px] leading-relaxed text-fd-muted-foreground">
                {j.note}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link
          href="/for-hr/write-job-descriptions-with-claude"
          onClick={() =>
            trackEvent("hr_hero_cta_click", {
              cta: "start_job_descriptions",
              section: "for-hr",
            })
          }
          className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
        >
          Start with job descriptions
        </Link>
        <Link
          href="#guides"
          onClick={() =>
            trackEvent("hr_hero_cta_click", {
              cta: "browse_guides",
              section: "for-hr",
            })
          }
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-6 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
        >
          Browse all guides
        </Link>
      </div>
    </section>
  );
}
