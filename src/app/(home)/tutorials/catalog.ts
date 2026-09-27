/**
 * Tutorial catalog: tracks, order and who each tutorial is for.
 *
 * The step content lives in `@/lib/tutorials`. This file only decides how a
 * visitor finds a tutorial (by job and level) and what comes before and after
 * it. Both the index and the tutorial page read from here, so the order a
 * visitor sees in the list is the same order prev/next walks.
 */

export type Persona = "new" | "teachers" | "designers" | "marketers" | "hr" | "pm" | "dev";

export interface PersonaOption {
  id: Persona;
  label: string;
  /** A dedicated path elsewhere on the site, shown when this job is picked. */
  hub?: { href: string; name: string; blurb: string };
}

export const PERSONAS: ReadonlyArray<PersonaOption> = [
  {
    id: "new",
    label: "New to Claude",
    hub: { href: "/start", name: "Start page", blurb: "Chat, Chrome, Excel or Code. One page, one answer." },
  },
  {
    id: "teachers",
    label: "Teachers",
    hub: { href: "/for-teachers", name: "teachers path", blurb: "Reading levels, rubrics and parent emails from one plan." },
  },
  {
    id: "designers",
    label: "Designers",
    hub: { href: "/for-designers", name: "designers path", blurb: "Critique first, then name the defaults you want avoided." },
  },
  {
    id: "marketers",
    label: "Marketers",
    hub: { href: "/for-marketers", name: "marketers path", blurb: "Five of your own posts beat any list of adjectives." },
  },
  {
    id: "hr",
    label: "HR",
    hub: { href: "/for-hr", name: "HR path", blurb: "Strip names first, then ask for the themes." },
  },
  {
    id: "pm",
    label: "Product managers",
    hub: { href: "/pm-pilot", name: "PM Pilot", blurb: "Braindump first, PRD second." },
  },
  { id: "dev", label: "Developers" },
];

const EVERYONE: Persona[] = ["new", "teachers", "designers", "marketers", "hr", "pm", "dev"];

export interface CatalogEntry {
  slug: string;
  /** Card title. Kept from the original index; the page H1 comes from the tutorial itself. */
  title: string;
  description: string;
  outcome: string;
  personas: Persona[];
}

export interface Track {
  id: string;
  title: string;
  description: string;
  entries: CatalogEntry[];
}

export const TRACKS: ReadonlyArray<Track> = [
  {
    id: "start-here",
    title: "Start here",
    description:
      "Do these first. Each takes ten minutes or less, and most of them set Claude up to know who you are before you type.",
    entries: [
      {
        slug: "coming-from-chatgpt",
        title: "Coming from ChatGPT? Here's What's Different",
        description:
          "Claude feels different from ChatGPT. Here is why that happens, and how to fix it in five minutes so your preferences actually stick.",
        outcome:
          "A CLAUDE.md that loads your preferences automatically, so Claude knows who you are before you type your first message.",
        personas: EVERYONE,
      },
      {
        slug: "your-first-claude-md",
        title: "Build Your First CLAUDE.md in 5 Minutes",
        description:
          "The single most important thing you can do. Create the file that turns Claude Code from generic to personalized.",
        outcome: "A working CLAUDE.md that knows your project, your stack, and your preferences.",
        personas: EVERYONE,
      },
      {
        slug: "your-first-skill",
        title: "Create Your First Skill",
        description: "Turn a task you do every week into a single command. Copy, paste, done.",
        outcome: "A reusable /skill command that automates a real task in your workflow.",
        personas: EVERYONE,
      },
      {
        slug: "computer-use",
        title: "Let Claude See Your Screen in 5 Minutes",
        description: "Claude can look at your screen, click buttons, and navigate apps. No setup.",
        outcome: "Claude seeing your screen and working in your apps, so you can show it a visual bug instead of describing it.",
        personas: EVERYONE,
      },
    ],
  },
  {
    id: "everyday-work",
    title: "Everyday work, no install",
    description:
      "Documents, reviews and plans, done in the Claude app in a browser tab. Paste the prompt, add your own notes, and edit what comes back.",
    entries: [
      {
        slug: "research-briefing",
        title: "Turn 5 Articles into a Research Briefing Doc",
        description: "Paste your sources. Get a structured briefing with key insights, tensions, and implications.",
        outcome: "A one-page briefing doc ready to share with your team or leadership, with every point traced to a source.",
        personas: ["new", "teachers", "marketers", "hr", "pm"],
      },
      {
        slug: "slide-deck-outline",
        title: "Build a Slide Deck Outline in 15 Minutes",
        description: "Tell Claude your goal and content. Get a narrative arc, slide-by-slide outline, and speaker notes.",
        outcome: "A complete deck outline with a clear narrative and speaker notes, before you open PowerPoint.",
        personas: ["new", "teachers", "designers", "marketers", "hr", "pm"],
      },
      {
        slug: "newsletter-automator",
        title: "Automate Your Newsletter in 10 Minutes",
        description: "Feed Claude your sources (URLs, topics, or tweets) and get a formatted newsletter draft ready to send.",
        outcome:
          "A full newsletter draft formatted for Substack or Beehiiv, plus a reusable prompt for every future issue.",
        personas: ["new", "teachers", "marketers"],
      },
      {
        slug: "stakeholder-map",
        title: "Build a Stakeholder Map in 15 Minutes",
        description:
          "Turn a messy list of names and roles into a structured stakeholder map, communication plan, and outreach messages.",
        outcome:
          "A stakeholder map, weekly communication plan, and a drafted outreach message, ready to paste into Notion.",
        personas: ["new", "hr", "pm"],
      },
      {
        slug: "performance-review",
        title: "Write a Performance Review in 20 Minutes",
        description: "Paste your messy notes about a team member. Get a structured, balanced, specific review ready to submit.",
        outcome: "A complete performance review across all dimensions, ready to copy into your HR system.",
        personas: ["new", "hr", "pm"],
      },
      {
        slug: "job-application-assistant",
        title: "Build a Job Application Assistant",
        description:
          "Paste the job description and your background. Get a match analysis, tailored cover letter, and interview prep.",
        outcome: "A tailored cover letter and answers to the top 3 interview questions, specific to the role.",
        personas: ["new"],
      },
      {
        slug: "personal-finance-manager",
        title: "Build a Personal Finance Manager",
        description: "Paste your spending data. Get a breakdown, honest analysis, savings plan, and monthly review template.",
        outcome: "A realistic savings plan with specific targets and a monthly review routine you will actually follow.",
        personas: ["new"],
      },
    ],
  },
  {
    id: "build-something",
    title: "Build something you can share",
    description: "Small projects that open in a browser, so you can send the link to a friend. No coding experience needed.",
    entries: [
      {
        slug: "quiz-game",
        title: "Build a Quiz Game About Anything",
        description: "Tell Claude a topic. Get a playable quiz with scoring, hints, and a leaderboard. Share it with friends.",
        outcome: "A working quiz game you can play in your browser and share with a link.",
        personas: ["new", "teachers"],
      },
      {
        slug: "meme-generator",
        title: "Make a Meme Generator",
        description: "Describe the meme you want. Claude builds a page that creates memes with custom text on any image.",
        outcome: "A meme generator that runs locally. Upload any image, add text, download the result.",
        personas: ["new", "marketers"],
      },
      {
        slug: "playlist-analyzer",
        title: "Build a Spotify Playlist Analyzer",
        description: "Paste your playlist. Get stats on mood, energy, tempo patterns, and a vibe summary you can share.",
        outcome: "A visual breakdown of your playlist's vibe with shareable stats and recommendations.",
        personas: ["new"],
      },
      {
        slug: "ship-a-landing-page",
        title: "Ship a Landing Page in 30 Minutes",
        description: "Go from empty folder to a live website on the internet. No coding experience required.",
        outcome: "A deployed website on Vercel that you built with Claude Code.",
        personas: ["new", "designers", "marketers", "dev"],
      },
    ],
  },
  {
    id: "product-managers",
    title: "For product managers",
    description:
      "You don't need to write a single line of code. These are built around how PMs actually spend their time.",
    entries: [
      {
        slug: "decision-memo",
        title: "Turn Any Decision into a Clear Memo",
        description: "Brain dump a messy decision. Get a structured memo with options, recommendation, and risks.",
        outcome: "A decision memo ready for stakeholder review. Problem, options, recommendation, risk register.",
        personas: ["pm", "hr"],
      },
      {
        slug: "competitive-analysis",
        title: "Run a Competitive Analysis in 30 Minutes",
        description: "Feed Claude your product and competitor info. Get a structured matrix and clear positioning gaps.",
        outcome: "A comparison matrix, positioning gap analysis, and a strategic recommendation ready to share.",
        personas: ["pm", "marketers", "designers"],
      },
      {
        slug: "meeting-to-jira",
        title: "Turn Meeting Notes into Jira Tickets",
        description: "Paste your messy meeting notes. Get structured tickets with acceptance criteria.",
        outcome: "A skill that converts meeting notes into formatted Jira tickets automatically.",
        personas: ["pm"],
      },
      {
        slug: "weekly-status",
        title: "Build a Weekly Status Report Generator",
        description: "Pull from your projects and generate a stakeholder-ready status report in seconds.",
        outcome: "A /weekly-status skill that generates your report from real data sources.",
        personas: ["pm"],
      },
      {
        slug: "product-discovery-ost",
        title: "Product Discovery with Opportunity Solution Trees",
        description:
          "Use Teresa Torres' OST framework to go from raw customer interviews to validated experiments. No sticky notes required.",
        outcome:
          "A living Opportunity Solution Tree with mapped opportunities, solutions, and experiment designs, built from real interview data.",
        personas: ["pm", "designers"],
      },
    ],
  },
  {
    id: "developers",
    title: "For developers",
    description:
      "You already know the stack. These show how senior engineers use Claude Code day to day: real stack traces, real diffs, tests kept green.",
    entries: [
      {
        slug: "nextjs-with-claude",
        title: "Start a Next.js Project with Claude Code",
        description:
          "Scaffold, configure, build, test, and deploy a production-ready Next.js 16 App Router project. TypeScript strict mode, Tailwind CSS 4, Vitest, and Vercel in one session.",
        outcome: "A live Next.js 16 app on Vercel with a CLAUDE.md, passing tests, and zero TypeScript errors.",
        personas: ["dev"],
      },
      {
        slug: "debug-and-refactor",
        title: "Debug and Refactor Like a Senior Dev",
        description:
          "Feed Claude a real stack trace and watch it trace through your codebase. Refactor components with tests staying green.",
        outcome:
          "A CLAUDE.md with project-specific debugging rules, a refactored component, and a repeatable workflow for any bug.",
        personas: ["dev"],
      },
      {
        slug: "pr-review-workflow",
        title: "PR Reviews That Actually Find Bugs",
        description:
          "Stop rubber-stamping PRs. Use Claude to catch real bugs, identify untested code paths, and write review comments that help.",
        outcome:
          "A repeatable PR review workflow using gh CLI and Claude: diff analysis, missing test identification, and drafted review comments ready to post.",
        personas: ["dev"],
      },
    ],
  },
];

export interface TrackPosition {
  track: Track;
  index: number;
  prev?: CatalogEntry;
  next?: CatalogEntry;
}

/** Where a tutorial sits in its track, for the breadcrumb and prev/next. */
export function findTrackPosition(slug: string): TrackPosition | undefined {
  for (const track of TRACKS) {
    const index = track.entries.findIndex((e) => e.slug === slug);
    if (index !== -1) {
      return {
        track,
        index,
        prev: track.entries[index - 1],
        next: track.entries[index + 1],
      };
    }
  }
  return undefined;
}

export const ROUTE_LABELS = {
  app: "Claude app",
  terminal: "Terminal",
  ide: "VS Code / Cursor",
} as const;

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
