import Link from 'next/link';
import type { Metadata } from 'next';
import { ogImage } from '@/lib/og/image';

export const metadata: Metadata = {
  title: 'Videos: every Short, with its guide',
  description:
    'Saw a Claude Short on TikTok, Instagram or YouTube? Find the episode here and open the free step-by-step guide behind it.',
  alternates: { canonical: 'https://claudecodeguide.dev/videos' },
  openGraph: { images: [ogImage('videos', 'Videos')] },
};

interface Episode {
  ep: string;
  title: string;
  href: string;
}

/** Titles match the YouTube titles in the CCG content calendar and captions file. */
const BUILD: ReadonlyArray<Episode> = [
  { ep: 'EP00', title: 'Build a quiz game with zero code in 10 minutes', href: '/tutorials/quiz-game' },
  { ep: 'EP01', title: 'Let Claude interview you once, then apply to any job in minutes', href: '/tutorials/job-application-assistant' },
  { ep: 'EP01 বাংলা', title: 'একবার Claude-কে ইন্টারভিউ দিন, তারপর যেকোনো চাকরিতে আবেদন করুন', href: '/bn/tutorials/job-application-assistant' },
  { ep: 'EP02', title: 'The 5C loop: stop rewriting every AI draft into your own voice', href: '/docs/frameworks/5c-loop' },
  { ep: 'EP03', title: 'Build and publish a portfolio website in 30 minutes, no code', href: '/tutorials/ship-a-landing-page' },
  { ep: 'EP04', title: 'What your playlist says about you, according to Claude', href: '/tutorials/playlist-analyzer' },
  { ep: 'EP05', title: 'Competitive analysis that actually answers a question', href: '/tutorials/competitive-analysis' },
  { ep: 'EP06', title: 'Write your weekly status report in 2 minutes with Claude', href: '/tutorials/weekly-status' },
  { ep: 'EP07', title: 'Make your own meme generator without code (15 min)', href: '/tutorials/meme-generator' },
  { ep: 'EP08', title: 'Turn messy notes into a product spec with Claude', href: '/docs/workflows/write-a-prd-from-rough-notes' },
  { ep: 'EP09', title: 'Better interview questions in minutes, with a scoring guide', href: '/for-hr/generate-interview-questions-with-claude' },
  { ep: 'EP10', title: 'Find out where your money went last month, in 20 minutes', href: '/tutorials/personal-finance-manager' },
  { ep: 'EP11', title: 'Decode a vague design brief before you open Figma', href: '/for-designers/decode-a-brief' },
  { ep: 'EP12', title: 'Write a 10-question quiz and grading guide in 5 minutes', href: '/for-teachers/create-quiz-questions-with-claude' },
];

const HABITS: ReadonlyArray<Episode> = [
  { ep: 'EP13', title: 'Why Claude Code gets worse the longer you talk to it', href: '/docs/foundations/context-window' },
  { ep: 'EP14', title: 'Claude Code going the wrong way? Press Escape', href: '/docs/foundations/shortcuts' },
  { ep: 'EP15', title: 'Stop Claude Code building the wrong thing fast: /plan', href: '/docs/foundations/plan-mode' },
  { ep: 'EP16', title: 'Stop repeating yourself to Claude Code: /init', href: '/tutorials/your-first-claude-md' },
  { ep: 'EP17', title: 'Closed Claude Code? Your chat is still there', href: '/docs/foundations/session-lifecycle' },
  { ep: 'EP18', title: 'Claude broke your page? Rewind it in two keys', href: '/docs/foundations/shortcuts' },
  { ep: 'EP19', title: 'Tired of Claude Code asking about everything?', href: '/docs/foundations/permissions' },
  { ep: 'EP20', title: "Stop running Claude's biggest engine on tiny tasks", href: '/docs/foundations/model-selection' },
  { ep: 'EP21', title: 'Claude drowning in files? Send a subagent', href: '/docs/patterns/agents' },
  { ep: 'EP22', title: 'Pasting the same how-to into Claude every week?', href: '/docs/patterns/skills' },
  { ep: 'EP23', title: 'Turn your longest Claude prompt into one word', href: '/tutorials/your-first-skill' },
  { ep: 'EP24', title: 'Claude keeps forgetting your rule? Make it a hook', href: '/docs/patterns/hooks' },
  { ep: 'EP25', title: 'Stop copying from Jira into Claude: plug it in', href: '/docs/patterns/mcp-servers' },
  { ep: 'EP26', title: 'Claude fixes it but you learn nothing? Change this', href: '/docs/foundations/shortcuts' },
  { ep: 'EP27', title: 'Two Claudes fighting over the same files?', href: '/docs/patterns/git-worktrees' },
  { ep: 'EP28', title: 'Ask Claude one question without opening a chat', href: '/docs/patterns/headless-mode' },
];

const linkFocus =
  'rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]';

function EpisodeList({ id, heading, note, episodes }: { id: string; heading: string; note: string; episodes: ReadonlyArray<Episode> }) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="text-xl font-semibold text-fd-foreground">
        {heading}
      </h2>
      <p className="mt-1 text-sm text-fd-muted-foreground">{note}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {episodes.map((e) => (
          <li key={e.ep}>
            <Link
              href={e.href}
              className={`glass flex h-full flex-col gap-1 px-5 py-4 transition-colors hover:bg-[var(--glass2)] ${linkFocus}`}
            >
              <span className="text-xs font-medium text-fd-muted-foreground">{e.ep}</span>
              <span className="text-sm font-medium leading-snug text-fd-foreground">{e.title}</span>
              <span className="mt-auto pt-1 text-xs text-fd-muted-foreground underline underline-offset-4">
                Open the guide
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function VideosPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-24 pt-12 md:px-6 md:pt-16">
      <h1 className="m-0 text-3xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-4xl">
        Saw a Short? Here&apos;s the guide.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-fd-muted-foreground">
        Every episode from TikTok, Instagram and YouTube, newest habits at the bottom. Each one opens the free,
        step-by-step page behind it. First time using Claude?{' '}
        <Link href="/start" className="font-medium text-fd-foreground underline underline-offset-4">
          Start here
        </Link>
        .
      </p>

      <EpisodeList
        id="build"
        heading="Build something, no code needed"
        note="Paste the prompts into claude.ai (free). Works in ChatGPT too."
        episodes={BUILD}
      />
      <EpisodeList
        id="habits"
        heading="Claude Code habits"
        note="Short tips for people already using Claude Code."
        episodes={HABITS}
      />
    </div>
  );
}
