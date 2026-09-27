import Link from "next/link";
import type { Metadata } from "next";
import { EmailCapture } from "@/components/email-capture";
import { SceneBackdrop } from "@/components/scene-backdrop";

const heroTagline = "Claude, set up for the job you do.";
const heroMetaDescription =
  "The practitioner's guide to Claude Code: CLAUDE.md patterns, persistent memory systems, agentic workflows, hooks, and real-world examples. Setup guides, honest comparisons, and daily workflows. Free.";
const ogImage = {
  url: "https://claudecodeguide.dev/api/og",
  width: 1200,
  height: 630,
  alt: "Claude Code Guide homepage",
};

export const metadata: Metadata = {
  title: {
    absolute: "Claude Code Guide: Claude, Set Up for the Job You Do",
  },
  description: heroMetaDescription,
  openGraph: {
    title: heroTagline,
    description: heroMetaDescription,
    type: "website",
    siteName: "Claude Code Guide",
    url: "https://claudecodeguide.dev",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: heroTagline,
    description: heroMetaDescription,
    images: [ogImage],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://claudecodeguide.dev/#website",
      url: "https://claudecodeguide.dev",
      name: "Claude Code Guide",
      description: heroMetaDescription,
      publisher: { "@id": "https://claudecodeguide.dev/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://claudecodeguide.dev/#organization",
      name: "Claude Code Guide",
      url: "https://claudecodeguide.dev",
      logo: {
        "@type": "ImageObject",
        url: "https://claudecodeguide.dev/logo.png",
      },
    },
  ],
};

const ESSAY_HREF = "/blog/claude-code-memory-at-scale-966-files";

/** Rotator rows: six words, then the first again so the loop resets without a jump. */
const ROTATING_WORDS = ["teachers", "designers", "marketers", "HR teams", "PMs", "beginners", "teachers"] as const;

interface PathEntry {
  href: string;
  label: string;
  slug: string;
  title: string;
  blurb: string;
}

const PATHS: ReadonlyArray<PathEntry> = [
  {
    href: "/for-teachers",
    label: "Teachers",
    slug: "teachers",
    title: "Plan a week of lessons in one sitting",
    blurb: "Reading levels, rubrics and parent emails from one plan.",
  },
  {
    href: "/for-designers",
    label: "Designers",
    slug: "designers",
    title: "Stop getting the generic look",
    blurb: "Critique first, then name the defaults you want avoided.",
  },
  {
    href: "/for-marketers",
    label: "Marketers",
    slug: "marketers",
    title: "Sound like you, at volume",
    blurb: "Five of your own posts beat any list of adjectives.",
  },
  {
    href: "/for-hr",
    label: "HR teams",
    slug: "HR teams",
    title: "Read every exit interview this quarter",
    blurb: "Strip names first, then ask for the themes.",
  },
  {
    href: "/pm-pilot",
    label: "Product managers",
    slug: "product managers",
    title: "Braindump first, PRD second",
    blurb: "Claude finds the tension you skipped before the template hides it.",
  },
  {
    href: "/start",
    label: "Brand new",
    slug: "brand new",
    title: "Which Claude should I open?",
    blurb: "Chat, Chrome, Excel or Code. One page, one answer.",
  },
];

const TIPS = [
  "ask for the critique before the fix",
  "paste examples, not adjectives",
  "new topic, new chat",
  "tell Claude who will read it",
  "strip names before you paste",
] as const;

const LEVELS = [
  { label: "level 1", text: "Short sentences, one idea each, with a picture prompt per fact." },
  { label: "level 2", text: "The standard version, with two new vocabulary words defined inline." },
  { label: "level 3", text: "Adds a why question after each fact, for students who finish early." },
] as const;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export default function HomePage() {
  return (
    <div className="overflow-x-clip text-[var(--ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SceneBackdrop variant="full" />

      {/* Hero */}
      <section className="hm-in flex flex-col items-center gap-6 px-4 pt-12 text-center md:gap-[26px] md:pt-[70px]">
        <Link
          href={ESSAY_HREF}
          className={`glass flex max-w-full items-center gap-2.5 rounded-full py-[7px] pl-2 pr-3.5 font-mono text-[12.5px] ${focusRing}`}
        >
          <span className="rounded-full bg-[var(--acc)] px-2 py-[3px] text-[var(--accInk)]">new</span>
          <span className="truncate">What 966 memory files taught me</span>
          <span className="text-[var(--muted)]">read</span>
        </Link>

        <h1 className="m-0 flex flex-col items-center text-[clamp(36px,10vw,88px)] font-semibold leading-[1.04] tracking-[-0.045em]">
          <span className="sr-only">Claude, set up for teachers, designers, marketers, HR teams, PMs and beginners</span>
          <span aria-hidden="true">Claude, set up for</span>
          <span aria-hidden="true" className="mt-2 flex items-center gap-[0.16em]">
            <span className="glass block h-[1.09em] w-[5.35em] overflow-hidden rounded-[14px] px-[0.3em] text-left">
              <span className="hm-rot flex flex-col text-[var(--acc)]">
                {ROTATING_WORDS.map((word, i) => (
                  <span key={`${word}-${i}`} className="block h-[1.09em] leading-[1.09em]">
                    {word}
                  </span>
                ))}
              </span>
            </span>
            <span className="hm-caret block h-[0.8em] w-[0.07em] min-w-1 bg-[var(--acc)]" />
          </span>
        </h1>

        <p className="m-0 max-w-[560px] text-[17px] leading-[1.55] text-[var(--muted)] md:text-[19px]">
          Prompts and small habits, picked by the job you do. Tested in real work by{" "}
          <Link href="/about" className={`rounded-sm text-[var(--ink)] underline-offset-4 hover:underline ${focusRing}`}>
            Shadman Rahman
          </Link>
          , Principal PM.
        </p>

        <div className="glass relative flex w-full max-w-[620px] flex-col items-stretch gap-3 rounded-xl p-3 text-left font-mono text-[13px] sm:h-16 sm:flex-row sm:items-center sm:py-0 sm:pl-5 sm:pr-2 sm:text-[14.5px]">
          <span className="hm-glow" aria-hidden="true" />
          <p className="m-0 flex min-w-0 items-baseline gap-3 px-1 sm:px-0">
            <span className="text-[var(--muted)]" aria-hidden="true">&gt;</span>
            <span>
              <span className="hm-type">I teach 7th grade and have 20 minutes a day</span>
              <span
                aria-hidden="true"
                className="hm-caret ml-1 inline-block h-[17px] w-2 bg-[var(--acc)] align-[-3px]"
              />
            </span>
          </p>
          <Link
            href="/for-teachers"
            className={`flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--acc)] px-[18px] font-sans text-sm font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 sm:ml-auto ${focusRing}`}
          >
            Show my path
            <span className="font-mono text-xs opacity-75" aria-hidden="true">enter</span>
          </Link>
        </div>
      </section>

      {/* Product panel: path list + chat demo */}
      <div className="mt-16 px-4 md:mt-[88px] md:px-16">
      <section
        aria-label="A tip from the teachers path"
        className="glass mx-auto grid max-w-[1072px] overflow-hidden rounded-2xl md:h-[400px] md:grid-cols-[260px_1fr]"
      >
        <nav
          aria-label="Paths"
          className="flex flex-col gap-1 border-b border-[var(--line)] px-3 py-[18px] text-[14.5px] md:border-b-0 md:border-r"
        >
          <span className="px-2.5 pb-3 pt-1.5 font-mono text-[11.5px] text-[var(--muted)]">PATHS</span>
          <div className="grid grid-cols-2 gap-1 md:grid-cols-1">
            {PATHS.map((path, i) => {
              const current = i === 0;
              return (
                <Link
                  key={path.href}
                  href={path.href}
                  aria-current={current ? "true" : undefined}
                  className={`flex justify-between rounded-lg p-2.5 transition-colors ${focusRing} ${
                    current ? "bg-[var(--chip)] font-medium text-[var(--acc)]" : "hover:bg-[var(--chip)]"
                  }`}
                >
                  {path.label}
                  <span className={`font-mono text-xs ${current ? "" : "text-[var(--muted)]"}`}>{pad(i + 1)}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex min-w-0 flex-col">
          <div className="flex h-12 items-center justify-between gap-4 border-b border-[var(--line)] px-4 font-mono text-xs text-[var(--muted)] md:px-[22px]">
            <span className="truncate">teachers / tip-01 / differentiate-a-lesson</span>
            <span aria-hidden="true" className="block h-0.5 w-[120px] shrink-0 overflow-hidden rounded-sm bg-[var(--line)]">
              <span className="hm-bar block h-0.5 bg-[var(--acc)]" />
            </span>
          </div>
          <div className="flex flex-col gap-4 px-4 py-6 text-[15px] leading-[1.55] md:px-7 md:text-[15.5px]">
            <p
              className="hm-msg m-0 max-w-[520px] self-end rounded-[10px] border border-[var(--line)] bg-[var(--chip)] px-4 py-3"
              style={{ animationDelay: "0s" }}
            >
              Here is my lesson on the water cycle. Rewrite it at three reading levels, and keep the same five facts in each.
            </p>
            {LEVELS.map((level, i) => (
              <p
                key={level.label}
                className="hm-msg m-0 flex items-baseline gap-3"
                style={{ animationDelay: `${0.9 + i * 0.7}s` }}
              >
                <span className="w-16 shrink-0 font-mono text-xs text-[var(--acc)]">{level.label}</span>
                <span>{level.text}</span>
              </p>
            ))}
            <p
              className="hm-msg m-0 mt-1.5 border-t border-dashed border-[var(--line)] pt-3.5 text-sm text-[var(--muted)]"
              style={{ animationDelay: "3s" }}
            >
              You named the facts to keep fixed, so only the wording changes.
            </p>
          </div>
        </div>
      </section>
      </div>

      {/* Tips marquee */}
      <div className="glass mt-12 flex h-[52px] items-center overflow-hidden border-x-0">
        <p className="sr-only">Tips: {TIPS.join("; ")}.</p>
        <div
          aria-hidden="true"
          className="hm-marquee flex w-max gap-12 whitespace-nowrap font-mono text-[13.5px] text-[var(--muted)]"
        >
          {[...TIPS, ...TIPS].map((tip, i) => (
            <span key={i} className="flex gap-12">
              <span>{tip}</span>
              <span className="text-[var(--acc)]">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Persona cards */}
      <section className="mx-auto mt-16 flex max-w-[1440px] flex-col gap-[22px] px-4 md:px-16">
        <div className="glass flex flex-wrap items-baseline gap-x-4 gap-y-1 self-start rounded-[10px] px-5 py-3.5">
          <h2 className="m-0 text-[28px] font-semibold tracking-[-0.035em] md:text-4xl">Pick your desk</h2>
          <span className="font-mono text-[12.5px] text-[var(--muted)]">six paths, three tips each to start</span>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {PATHS.map((path, i) => (
            <Link
              key={path.href}
              href={path.href}
              className={`glass hm-card flex min-h-[196px] flex-col gap-3 rounded-xl p-6 ${focusRing}`}
            >
              <span className="font-mono text-xs text-[var(--acc)]">
                {pad(i + 1)} / {path.slug}
              </span>
              <span className="text-2xl font-semibold leading-[1.15] tracking-[-0.02em]">{path.title}</span>
              <span className="text-[15px] leading-normal text-[var(--muted)]">{path.blurb}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto mt-16 max-w-2xl px-4">
        <EmailCapture placement="homepage-primary" />
      </section>

      {/* Essay strip */}
      <section className="mx-auto mt-16 max-w-[1440px] px-4 md:px-16">
        <div className="glass flex flex-col items-start gap-6 rounded-[14px] px-6 py-8 md:min-h-[170px] md:flex-row md:items-center md:justify-between md:px-9 md:py-0">
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs text-[var(--muted)]">the long read</span>
            <h2 className="m-0 text-[24px] font-semibold leading-tight tracking-[-0.03em] md:text-[32px]">
              966 memory files later, here is what stuck.
            </h2>
          </div>
          <Link
            href={ESSAY_HREF}
            className={`flex h-12 shrink-0 items-center rounded-lg border border-[var(--line)] px-5 text-[15px] font-medium transition-colors hover:bg-[var(--chip)] ${focusRing}`}
          >
            Read the essay
          </Link>
        </div>
      </section>
    </div>
  );
}
