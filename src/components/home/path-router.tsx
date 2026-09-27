"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface RouterCard {
  id:
    | "compare"
    | "claude-md"
    | "interface"
    | "tutorials"
    | "designers"
    | "chrome"
    | "microsoft"
    | "teachers"
    | "marketers"
    | "hr";
  title: string;
  blurb: string;
  href: string;
  audience: string;
}

const CARDS: ReadonlyArray<RouterCard> = [
  {
    id: "compare",
    title: "Compare Claude Code to other tools",
    blurb:
      "Honest takes on Cursor, Copilot, Aider, ChatGPT, and Gemini CLI. Pick what fits.",
    href: "/docs/comparisons",
    audience: "Evaluating",
  },
  {
    id: "claude-md",
    title: "Set up your CLAUDE.md",
    blurb:
      "The one file that makes Claude understand your project. Templates and patterns inside.",
    href: "/docs/foundations/claude-md",
    audience: "Setting up",
  },
  {
    id: "interface",
    title: "Pick the right interface",
    blurb:
      "Web, Desktop, Terminal, or VS Code. Decide based on what you actually want to do.",
    href: "/docs/foundations/which-interface",
    audience: "Starting out",
  },
  {
    id: "tutorials",
    title: "Browse 50+ tutorials",
    blurb:
      "Hands-on projects from quiz games to PM workflows. Filter by skill and time.",
    href: "/tutorials",
    audience: "Learning by doing",
  },
  {
    id: "designers",
    title: "Claude for UX and UI designers",
    blurb:
      "11 task-oriented guides: decode briefs, run heuristic evaluations, synthesize research, hand off to code.",
    href: "/for-designers",
    audience: "Designer",
  },
  {
    id: "chrome",
    title: "Claude for Chrome users",
    blurb:
      "6 guides: browser basics, Chrome extension setup, Gmail, and Google Docs. No installs needed to start.",
    href: "/for-chrome",
    audience: "Chrome user",
  },
  {
    id: "microsoft",
    title: "Claude for Word, Excel, and PowerPoint",
    blurb:
      "7 practical guides covering document drafting, Excel formulas, data analysis, and slide decks.",
    href: "/for-microsoft",
    audience: "Office user",
  },
  {
    id: "teachers",
    title: "Claude for Teachers",
    blurb:
      "6 guides: lesson plans, quiz questions, grading rubrics, student feedback, and parent emails.",
    href: "/for-teachers",
    audience: "Teacher",
  },
  {
    id: "marketers",
    title: "Claude for Marketers",
    blurb:
      "7 guides: brand voice, social posts, blog drafts, email campaigns, ad copy, and market research.",
    href: "/for-marketers",
    audience: "Marketer",
  },
  {
    id: "hr",
    title: "Claude for HR Professionals",
    blurb:
      "6 guides: job descriptions, interview questions, onboarding plans, performance reviews, policies, and employee communications.",
    href: "/for-hr",
    audience: "HR professional",
  },
];

export function PathRouter() {
  const foundations = CARDS.slice(0, 4);
  const roleGuides = CARDS.slice(4);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="max-w-[12ch] text-balance font-display text-4xl font-medium leading-[0.98] tracking-tight-display text-fd-foreground sm:text-6xl">
            Find the part that is slowing you down.
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-fd-muted-foreground">
            Start with the system, then go as deep as the work requires. Every
            guide is free and written to be used, not admired.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {[
            { label: "Core field guide", cards: foundations },
            { label: "Guides by role", cards: roleGuides },
          ].map((group) => (
            <div key={group.label}>
              <h3 className="border-b border-fd-foreground pb-3 font-mono text-label uppercase tracking-[0.16em] text-fd-muted-foreground">
                {group.label}
              </h3>
              <div>
                {group.cards.map((card) => (
                  <Link
                    key={card.id}
                    href={card.href}
                    onClick={() => {
                      trackEvent("router_card_click", {
                        card_id: card.id,
                        card_audience: card.audience,
                      });
                    }}
                    className="group flex items-center justify-between gap-5 border-b border-fd-border py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-4"
                  >
                    <div>
                      <span className="text-xs text-fd-muted-foreground">
                        {card.audience}
                      </span>
                      <p className="mt-1 text-sm font-medium leading-snug text-fd-foreground sm:text-base">
                        {card.title}
                      </p>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-fd-muted-foreground transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-fd-foreground"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
