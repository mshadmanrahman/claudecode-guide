"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { CARD_ART } from "./path-router-art";

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
    | "marketers";
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
];

export function PathRouter() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-24">
      <p className="mb-2 text-center text-[10px] tracking-[0.22em] uppercase font-medium text-fd-muted-foreground">
        Find what you need
      </p>
      <h2 className="mb-4 text-center font-display text-3xl font-bold tracking-tight-display text-fd-foreground sm:text-4xl">
        What brought you here?
      </h2>
      <p className="mb-12 text-center text-fd-muted-foreground max-w-lg mx-auto text-sm">
        Nine shortcuts to the guides that match where you are.
      </p>

      <div className="grid grid-cols-1 gap-px bg-fd-border border border-fd-border rounded-xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card, i) => {
          const Art = CARD_ART[card.id];
          return (
            <Link
              key={card.id}
              href={card.href}
              onClick={() => {
                trackEvent("router_card_click", {
                  card_id: card.id,
                  card_audience: card.audience,
                });
              }}
              className="group flex flex-col bg-fd-background p-6 transition-colors duration-200 hover:bg-fd-accent/40 animate-slide-up-fade"
              style={{ animationDelay: `${80 + i * 50}ms` }}
            >
              {Art && (
                <div className="mb-5 h-[72px] text-fd-foreground/55">
                  <Art />
                </div>
              )}
              <span className="mb-2 text-[10px] tracking-[0.18em] uppercase font-medium text-fd-muted-foreground">
                {card.audience}
              </span>
              <h3 className="mb-2 font-display text-base font-bold tracking-tight-display text-fd-foreground leading-snug">
                {card.title}
              </h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed flex-1">
                {card.blurb}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-fd-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                Open <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
