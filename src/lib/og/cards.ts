import { source } from "@/lib/source";
import { pmPilotSource } from "@/lib/source-pm-pilot";
import { blogPosts } from "@/data/blog-posts";
import { CHROME_GUIDES } from "@/lib/chrome-guides";
import { DESIGNER_GUIDES } from "@/lib/designer-guides";
import { HR_GUIDES } from "@/lib/hr-guides";
import { MARKETER_GUIDES } from "@/lib/marketer-guides";
import { MICROSOFT_GUIDES } from "@/lib/microsoft-guides";
import { TEACHER_GUIDES } from "@/lib/teacher-guides";
import { TUTORIALS } from "@/lib/tutorials";
import type { SceneName } from "@/components/scene-backdrop";

/**
 * Per-page social cards. Every sitemap route resolves to one card here, from
 * the same records the pages render, so a new guide gets its own card the
 * moment it ships. The image itself is drawn by src/app/og/[[...slug]]/route.tsx.
 */
export interface OgCard {
  title: string;
  /** Breadcrumb trail shown above the title, e.g. ["Docs", "Patterns"]. */
  section: readonly string[];
  description?: string;
  /** The landscape the page itself paints behind its content. */
  scene: SceneName;
}

type GuideRecord = Record<string, { title: string; description: string }>;

const VERTICALS: ReadonlyArray<{
  path: string;
  label: string;
  scene: SceneName;
  guides: GuideRecord;
  hub: { title: string; description: string };
}> = [
  {
    path: "for-chrome",
    label: "For Chrome",
    scene: "signposts",
    guides: CHROME_GUIDES,
    hub: {
      title: "Claude for Chrome",
      description: "Browser basics, Chrome extension setup, and Google Workspace workflows.",
    },
  },
  {
    path: "for-designers",
    label: "For Designers",
    scene: "swatches",
    guides: DESIGNER_GUIDES,
    hub: {
      title: "Claude for Designers",
      description: "Working agreements, brief decoding, heuristic evaluations, research synthesis, and prototypes.",
    },
  },
  {
    path: "for-hr",
    label: "For HR",
    scene: "green",
    guides: HR_GUIDES,
    hub: {
      title: "Claude for HR teams",
      description: "Job descriptions, interview questions, onboarding plans, performance reviews, and employee communications.",
    },
  },
  {
    path: "for-marketers",
    label: "For Marketers",
    scene: "market",
    guides: MARKETER_GUIDES,
    hub: {
      title: "Claude for Marketers",
      description: "Social posts, blog drafts, email campaigns, ad copy, and market research.",
    },
  },
  {
    path: "for-microsoft",
    label: "For Office",
    scene: "lakeside",
    guides: MICROSOFT_GUIDES,
    hub: {
      title: "Claude for Microsoft Office",
      description: "Using Claude chat with Word, Excel, and PowerPoint. No add-ins needed.",
    },
  },
  {
    path: "for-teachers",
    label: "For Teachers",
    scene: "schoolhouse",
    guides: TEACHER_GUIDES,
    hub: {
      title: "Claude for Teachers",
      description: "Lesson plans, quiz questions, rubrics, student feedback, and parent emails.",
    },
  },
];

/** Standalone routes, keyed by path ("" is the homepage). */
const STANDALONE: Record<string, OgCard> = {
  "": {
    title: "The Claude Code setup I actually run.",
    section: ["Free guide"],
    description:
      "CLAUDE.md patterns, a 966-file memory system, hooks, skills and workflows. Written so non-engineers can follow too.",
    scene: "valley",
  },
  start: {
    title: "Start here",
    section: ["Brand new"],
    description: "Pick your first project and get set up with Claude Code in under 10 minutes. No coding experience needed.",
    scene: "trailhead",
  },
  guide: {
    title: "Interactive setup guide",
    section: ["Setup"],
    description: "Nine steps: install, sign in, write your first CLAUDE.md, and build your first feature.",
    scene: "gorge",
  },
  docs: {
    title: "Documentation",
    section: ["Docs"],
    description: "Everything you need to know about Claude Code, organized by topic.",
    scene: "valley",
  },
  workflow: {
    title: "Claude in your day",
    section: ["Workflow"],
    description: "Five moments in a workday where Claude saves you time, with a prompt to copy for each.",
    scene: "watermills",
  },
  certification: {
    title: "Claude certification: four credentials, prices, and who can sit them",
    section: ["Certification"],
    description: "Prices, exam length, passing score, retake rules, and the partner email requirement.",
    scene: "summit",
  },
  journey: {
    title: "Your journey to Claude Code",
    section: ["Journey"],
    description: "Pick your role, follow the steps, check off your progress.",
    scene: "steppingstones",
  },
  primitives: {
    title: "The seven primitives of Claude Code",
    section: ["Primitives"],
    description: "Skill, Hook, Rule, Guardrail, Workflow, Agent, MCP. What each one does and when it fires.",
    scene: "standingstones",
  },
  capabilities: {
    title: "Capabilities and integrations",
    section: ["Capabilities"],
    description: "Everything Claude Code can do and connect to, from file editing to 20+ MCP integrations.",
    scene: "overlook",
  },
  "pm-pilot": {
    title: "Meeting prep, PRDs, and status reports on autopilot",
    section: ["PM Pilot"],
    description: "25 skills for product managers. Works with ChatGPT, Claude, and Gemini. Free and open source.",
    scene: "harbor",
  },
  bn: {
    title: "Claude Code in Bangla",
    section: ["বাংলা"],
    description: "Installation, setup, and your first project, from zero. No prior experience needed.",
    scene: "delta",
  },
  about: {
    title: "About Shadman Rahman",
    section: ["About"],
    description: "Principal Product Manager in Stockholm, designer by training, and a daily Claude Code user.",
    scene: "archipelago",
  },
  roadmap: {
    title: "Your learning path",
    section: ["Roadmap"],
    description: "From zero to power user. Each stage builds on what came before.",
    scene: "viaduct",
  },
  tutorials: {
    title: "Step-by-step tutorials",
    section: ["Tutorials"],
    description: "From your first CLAUDE.md to shipping landing pages, building skills, and automating workflows.",
    scene: "workshop",
  },
  blog: {
    title: "Tips, workflows, and guides",
    section: ["Blog"],
    description: "Practical articles on Claude Code for designers, product managers, and developers.",
    scene: "cabin",
  },
};

const PM_PILOT_FOLDERS: Record<string, string> = {
  skills: "PM Core Skills",
  "content-writing": "Content Skills",
  dev: "Dev Skills",
  productivity: "Productivity Skills",
};

function titleCase(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
}

function normalize(path: string): string {
  return path.replace(/^\/+|\/+$/g, "");
}

let cache: Map<string, OgCard> | null = null;

function registry(): Map<string, OgCard> {
  if (cache) return cache;
  const map = new Map<string, OgCard>(Object.entries(STANDALONE));

  for (const page of source.getPages()) {
    const path = normalize(page.url);
    if (path === "docs") continue;
    const group = page.slugs[0];
    map.set(path, {
      title: page.data.title,
      section: group ? ["Docs", titleCase(group)] : ["Docs"],
      description: page.data.description,
      scene: "valley",
    });
  }

  for (const page of pmPilotSource.getPages()) {
    const folder = page.slugs.length > 1 ? PM_PILOT_FOLDERS[page.slugs[0]] : undefined;
    map.set(normalize(page.url), {
      title: page.data.title,
      section: folder ? ["PM Pilot", folder] : ["PM Pilot", "Guide"],
      description: page.data.description,
      scene: "harbor",
    });
  }

  for (const v of VERTICALS) {
    map.set(v.path, { ...v.hub, section: [v.label], scene: v.scene });
    for (const [slug, guide] of Object.entries(v.guides)) {
      map.set(`${v.path}/${slug}`, {
        title: guide.title,
        section: [v.label],
        description: guide.description,
        scene: v.scene,
      });
    }
  }

  for (const [slug, t] of Object.entries(TUTORIALS)) {
    map.set(`tutorials/${slug}`, {
      title: t.title,
      section: ["Tutorials", t.difficulty === "beginner" ? "Beginner" : "Intermediate"],
      description: t.description,
      scene: "workshop",
    });
  }

  for (const post of blogPosts) {
    map.set(`blog/${post.slug}`, {
      title: post.title,
      section: ["Blog"],
      description: post.description,
      scene: "cabin",
    });
  }

  cache = map;
  return map;
}

export function ogCardFor(path: string): OgCard | undefined {
  return registry().get(normalize(path));
}

export function allOgPaths(): string[] {
  return [...registry().keys()];
}
