import Link from "next/link";
import type { Metadata } from "next";
import { FieldNotes } from "@/components/home/field-notes";
import { getLatestPosts, SUBSTACK_NAME } from "@/lib/substack";
import { SceneBackdrop } from "@/components/scene-backdrop";
import { AuthorPhoto } from "@/components/author-photo";

const heroTagline = "The Claude Code setup I actually run.";
const heroMetaDescription =
  "The practitioner's guide to Claude Code, from the setup Shadman Rahman runs daily at work: CLAUDE.md patterns, a 966-file memory system, hooks, skills and workflows. Written so non-engineers can follow too. Free.";
const ogImage = {
  url: "https://claudecodeguide.dev/api/og",
  width: 1200,
  height: 630,
  alt: "Claude Code Guide homepage",
};

export const metadata: Metadata = {
  title: {
    absolute: "Claude Code Guide: The Setup I Actually Run",
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
      author: { "@id": "https://claudecodeguide.dev/about#person" },
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
    {
      "@type": "Person",
      "@id": "https://claudecodeguide.dev/about#person",
      name: "Shadman Rahman",
      jobTitle: "Principal Product Manager",
      url: "https://claudecodeguide.dev/about",
    },
  ],
};

const DOCS_START = "/docs/foundations/claude-md";
const JOURNEY_HREF = "/start";
const ESSAY_HREF = "/blog/claude-code-memory-at-scale-966-files";

interface LinkCard {
  href: string;
  title: string;
  blurb: string;
}

/** Foundation topics, CLAUDE.md first: it is the most-read page on the site. */
const DOCS: ReadonlyArray<LinkCard> = [
  {
    href: "/docs/foundations/claude-md",
    title: "CLAUDE.md",
    blurb: "The five things it needs, a worked example, and the mistakes that make Claude ignore half of it.",
  },
  {
    href: "/docs/foundations/memory-system",
    title: "Memory system",
    blurb: "Claude forgets everything when a session ends. This is how you make it remember.",
  },
  {
    href: "/docs/foundations/context-window",
    title: "Context window",
    blurb: "What fills it, how to read /context, and when /compact is the wrong fix.",
  },
  {
    href: "/docs/foundations/permissions",
    title: "Permissions",
    blurb: "Five minutes of config so you stop clicking Allow on every step.",
  },
  {
    href: "/docs/foundations/installation",
    title: "Installation",
    blurb: "Mac, Windows or Linux, from zero to a first real prompt.",
  },
  {
    href: "/docs/foundations/what-is-claude-code",
    title: "What is Claude Code?",
    blurb: "What it does, what it is good at, and whether it is worth your time.",
  },
];

const PRACTICE: ReadonlyArray<LinkCard> = [
  {
    href: "/tutorials",
    title: "Tutorials",
    blurb: "Step-by-step builds, picked by the job you do. Each one ends with something working.",
  },
  {
    href: "/workflow",
    title: "Claude in your day",
    blurb: "How the setup runs through a real working day, from the morning brief to the last commit.",
  },
];

const JOURNEY_STEPS = [
  { title: "Pick something you want", text: "A task from your own week, not a demo. Claude learns faster from real work." },
  { title: "Follow the setup", text: "Install, sign in and write a first CLAUDE.md, one screen at a time." },
  { title: "Paste a prompt, watch it go", text: "Start with a prompt that already works and change it once you see the result." },
] as const;

const PERSONAS: ReadonlyArray<{ href: string; label: string; title: string }> = [
  { href: "/for-teachers", label: "Teachers", title: "Plan a week of lessons in one sitting" },
  { href: "/for-designers", label: "Designers", title: "Stop getting the generic look" },
  { href: "/for-marketers", label: "Marketers", title: "Sound like you, at volume" },
  { href: "/for-hr", label: "HR teams", title: "Read every exit interview this quarter" },
  { href: "/pm-pilot", label: "Product managers", title: "Braindump first, PRD second" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]";

const h2Class = "m-0 text-[28px] font-semibold tracking-[-0.035em] md:text-4xl";

function SectionHead({ id, title, sub, more }: { id: string; title: string; sub?: string; more?: { href: string; label: string } }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="glass flex max-w-full flex-col gap-1.5 rounded-[10px] px-5 py-3.5">
        <h2 id={id} className={h2Class}>
          {title}
        </h2>
        {sub ? <p className="m-0 text-[15px] leading-normal text-[var(--muted)]">{sub}</p> : null}
      </div>
      {more ? (
        <Link
          href={more.href}
          className={`glass flex h-11 items-center rounded-lg px-4 text-[15px] font-medium transition-colors hover:bg-[var(--chip)] ${focusRing}`}
        >
          {more.label}
        </Link>
      ) : null}
    </div>
  );
}

export default async function HomePage() {
  const posts = await getLatestPosts(3);
  const latest = posts[0];
  return (
    <div className="overflow-x-clip text-[var(--ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SceneBackdrop variant="full" />

      {/* 1. Hero */}
      <section className="hm-in flex flex-col items-center gap-6 px-4 pt-12 text-center md:gap-[26px] md:pt-[70px]">
        <h1 className="m-0 max-w-[14ch] text-[clamp(38px,9vw,84px)] font-semibold leading-[1.04] tracking-[-0.045em]">
          {heroTagline}
        </h1>

        <p className="m-0 max-w-[600px] text-[17px] leading-[1.55] text-[var(--ink)] md:text-[19px]">
          I use Claude Code every day at work as a principal PM, backed by 966 memory files. This guide is that
          setup, page by page, and it is written so non-engineers can follow it too.
        </p>

        <Link
          href="/about"
          className={`glass flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-left transition-colors hover:bg-[var(--glass2)] ${focusRing}`}
        >
          <AuthorPhoto variant="avatar" size={36} priority />
          <span className="flex flex-col leading-tight">
            <span className="text-[14.5px] font-medium">Shadman Rahman</span>
            <span className="text-[12.5px] text-[var(--muted)]">Principal PM, writes every page</span>
          </span>
        </Link>

        <div className="flex w-full max-w-[520px] flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <Link
            href={DOCS_START}
            className={`flex h-12 items-center justify-center rounded-lg bg-[var(--acc)] px-6 text-[15px] font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 ${focusRing}`}
          >
            Start with CLAUDE.md
          </Link>
          <Link
            href={JOURNEY_HREF}
            className={`glass flex h-12 items-center justify-center rounded-lg px-6 text-[15px] font-medium transition-colors hover:bg-[var(--glass2)] ${focusRing}`}
          >
            New to Claude? Start here
          </Link>
        </div>

        {latest ? (
          <a
            href={latest.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`glass max-w-[560px] rounded-lg px-4 py-2 text-[14.5px] leading-snug transition-colors hover:bg-[var(--glass2)] ${focusRing}`}
          >
            <span className="text-[var(--muted)]">New on {SUBSTACK_NAME}: </span>
            <span className="font-medium underline underline-offset-4">{latest.title}</span>
          </a>
        ) : null}
      </section>

      {/* 2. Docs entry */}
      <section
        aria-labelledby="home-docs"
        className="mx-auto mt-16 flex max-w-[1440px] flex-col gap-[22px] px-4 md:mt-[88px] md:px-16"
      >
        <SectionHead
          id="home-docs"
          title="Start with the foundations"
          sub="The pages people come back to. CLAUDE.md is the one most read."
          more={{ href: "/docs", label: "All docs" }}
        />
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {DOCS.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className={`glass hm-card flex min-h-[150px] flex-col gap-2.5 rounded-xl p-6 ${focusRing}`}
            >
              <span className="text-[22px] font-semibold leading-[1.15] tracking-[-0.02em]">{doc.title}</span>
              <span className="text-[15px] leading-normal text-[var(--muted)]">{doc.blurb}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Tutorials and workflows */}
      <section
        aria-labelledby="home-practice"
        className="mx-auto mt-16 flex max-w-[1440px] flex-col gap-[22px] px-4 md:px-16"
      >
        <SectionHead id="home-practice" title="Then learn it by doing" />
        <div className="grid gap-3.5 md:grid-cols-2">
          {PRACTICE.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`glass hm-card flex flex-col gap-2.5 rounded-xl p-6 md:p-8 ${focusRing}`}
            >
              <span className="text-2xl font-semibold leading-[1.15] tracking-[-0.02em]">{item.title}</span>
              <span className="text-[15px] leading-normal text-[var(--muted)]">{item.blurb}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Journey for newcomers */}
      <section aria-labelledby="home-journey" className="mx-auto mt-16 max-w-[1440px] px-4 md:px-16">
        <div className="glass flex flex-col gap-6 rounded-2xl px-6 py-8 md:px-9 md:py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <h2 id="home-journey" className={h2Class}>
                New to Claude? Three steps
              </h2>
              <p className="m-0 text-[15px] leading-normal text-[var(--muted)]">
                The guided setup walks you through each one.
              </p>
            </div>
            <Link
              href={JOURNEY_HREF}
              className={`flex h-11 items-center rounded-lg bg-[var(--acc)] px-5 text-[15px] font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 ${focusRing}`}
            >
              Open the guided setup
            </Link>
          </div>
          <ol className="m-0 grid list-none gap-3.5 p-0 md:grid-cols-3">
            {JOURNEY_STEPS.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-2 rounded-xl border border-[var(--line)] p-5">
                <span className="font-mono text-xs text-[var(--acc)]" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="text-lg font-semibold leading-snug tracking-[-0.015em]">{step.title}</span>
                <span className="text-[15px] leading-normal text-[var(--muted)]">{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Persona row */}
      <section
        aria-labelledby="home-desks"
        className="mx-auto mt-16 flex max-w-[1440px] flex-col gap-[22px] px-4 md:px-16"
      >
        <SectionHead id="home-desks" title="Not a developer? Pick your desk" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PERSONAS.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className={`glass hm-card flex flex-col gap-1.5 rounded-xl px-5 py-4 ${focusRing}`}
            >
              <span className="font-mono text-xs text-[var(--acc)]">{path.label}</span>
              <span className="text-[17px] font-semibold leading-snug tracking-[-0.015em]">{path.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Essay as proof */}
      <section className="mx-auto mt-16 max-w-[1440px] px-4 md:px-16">
        <div className="glass flex flex-col items-start gap-6 rounded-[14px] px-6 py-8 md:min-h-[170px] md:flex-row md:items-center md:justify-between md:px-9 md:py-0">
          <div className="flex flex-col gap-2.5">
            <h2 className="m-0 text-[24px] font-semibold leading-tight tracking-[-0.03em] md:text-[32px]">
              966 memory files later, here is what stuck.
            </h2>
            <p className="m-0 max-w-[560px] text-[15px] leading-normal text-[var(--muted)]">
              The long read on running Claude Code with a memory that size: what held up, and what I threw away.
            </p>
          </div>
          <Link
            href={ESSAY_HREF}
            className={`flex h-12 shrink-0 items-center rounded-lg border border-[var(--line)] px-5 text-[15px] font-medium transition-colors hover:bg-[var(--chip)] ${focusRing}`}
          >
            Read the essay
          </Link>
        </div>
      </section>

      {/* 7. Substack */}
      <FieldNotes posts={posts} />

      {/* 8. Author bio */}

      <section aria-labelledby="home-author" className="mx-auto mb-20 mt-16 max-w-[1440px] px-4 md:px-16">
        <div className="glass flex flex-col gap-6 rounded-2xl p-6 sm:flex-row sm:items-center md:gap-10 md:p-9">
          <AuthorPhoto variant="portrait" size={220} className="h-auto w-full max-w-[220px] shrink-0" />
          <div className="flex flex-col gap-3">
            <h2 id="home-author" className="m-0 text-[24px] font-semibold tracking-[-0.03em] md:text-[32px]">
              Who writes this
            </h2>
            <p className="m-0 max-w-[620px] text-[16px] leading-[1.6] text-[var(--ink)]">
              I&apos;m Shadman Rahman, a principal product manager. I lead product for student experience and search
              at Keystone Education Group, and I trained as a designer before moving into product. I started this guide
              because I kept explaining the same Claude Code setup to colleagues, most of whom don&apos;t write code.
            </p>
            <Link
              href="/about"
              className={`self-start rounded-sm text-[15px] font-medium text-[var(--acc)] underline underline-offset-4 ${focusRing}`}
            >
              More about me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
