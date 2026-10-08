'use client';

import type { ChatStep } from '@/components/app-chat-demo';
import type { CliStep } from '@/components/claude-code-mock';
import { ClaudeDesktopCodeMock } from '@/components/claude-desktop-code-mock';
import { ClaudeMobileMock } from '@/components/claude-mobile-mock';
import { EngravingPanel } from '@/components/engraving';
import { chatToSession } from '@/lib/chat-session';
import type { SceneName } from '@/lib/scenes';

export type Audience = 'home' | 'teachers' | 'designers' | 'marketers' | 'hr' | 'chrome' | 'microsoft' | 'pm-pilot';

interface AudienceDemo {
  scene: SceneName;
  folder: string;
  /** The task as a chat, used by the phone and, unless `session` is set, the Mac window. */
  chat: ChatStep[];
  /** A Mac session with tool rows, when the plain chat undersells the task. */
  session?: CliStep[];
}

/** One chat exchange: the reader's task in, a short useful answer out. */
function exchange(prompt: string, reply: string): ChatStep[] {
  return [
    { role: 'user', text: prompt },
    { role: 'claude', text: reply },
  ];
}

/**
 * Each audience page gets its own landscape and its own first task, run in the
 * Claude Mac app. Readers here are wary of terminals, so no demo shows one.
 */
const DEMOS: Record<Audience, AudienceDemo> = {
  home: {
    scene: 'valley',
    folder: 'Work',
    chat: exchange(
      'Turn my notes from the Tuesday sync into a follow-up email',
      '**Subject:** Tuesday sync, decisions and owners\n\n1. Launch date holds at 14 October\n2. Copy review moves to Thursday\n\nTwo decisions, two owners, one open question.',
    ),
    session: [
      { kind: 'prompt', text: 'Turn my notes from the Tuesday sync into a follow-up email' },
      { kind: 'thinking', verb: 'Reading', ms: 1400 },
      { kind: 'tool', name: 'Read', arg: 'notes/tuesday-sync.md', result: 'Read 46 lines' },
      {
        kind: 'tool',
        name: 'Write',
        arg: 'drafts/follow-up.md',
        result: 'Wrote 14 lines',
        lines: ['Subject: Tuesday sync, decisions and owners', '', '1. Launch date holds at 14 October', '2. Copy review moves to Thursday'],
      },
      { kind: 'say', text: 'Drafted in drafts/follow-up.md.\nTwo decisions, two owners, one open question.' },
    ],
  },
  teachers: {
    scene: 'schoolhouse',
    folder: 'Year 7 Science',
    chat: exchange(
      'Plan a 45-minute lesson on the water cycle for Year 7',
      '**Starter (5 min):** where did the rain on the window come from?\n**Main (25 min):** label the cycle, then act it out in four groups.\n**Check (10 min):** five quick questions, answers attached.\n**Exit (5 min):** one sentence each on evaporation.',
    ),
  },
  designers: {
    scene: 'swatches',
    folder: 'Checkout redesign',
    chat: exchange(
      'Read this brief. Who is the user, and what is it missing?',
      '**User:** first-time buyers on mid-range Android phones.\n**Missing:** a success metric, the payment methods in scope, and what happens offline.\nI drafted three questions for the PM in questions.md.',
    ),
  },
  marketers: {
    scene: 'market',
    folder: 'Autumn launch',
    chat: exchange(
      'Turn this product update into a LinkedIn post and a newsletter blurb',
      '**LinkedIn:** 120 words, opens on the customer problem, one link.\n**Newsletter:** 60 words, same claim, softer close.\nBoth saved to launch-copy.md, in your brand voice from voice.md.',
    ),
  },
  hr: {
    scene: 'green',
    folder: 'Hiring',
    chat: exchange(
      'Write a job description for a junior data analyst from my intake notes',
      '**Role:** junior data analyst, reports to the head of finance.\n**Must have:** SQL, spreadsheets, clear writing.\n**Nice to have:** Python.\nI kept the language neutral and flagged one requirement that may screen out career changers.',
    ),
  },
  chrome: {
    scene: 'signposts',
    folder: 'Vendor research',
    chat: exchange(
      'Compare the three vendor pages I have open in Chrome',
      '**Cheapest:** vendor B, but only on the annual plan.\n**Best support:** vendor A, with a named account manager.\n**Watch out:** vendor C caps exports at 1,000 rows.\nThe full table is in vendors.md.',
    ),
  },
  microsoft: {
    scene: 'lakeside',
    folder: 'Quarterly review',
    chat: exchange(
      'Turn last quarter’s sales sheet into five slides for Monday',
      '**Slide 1:** the headline number and what moved it.\n**Slides 2 to 4:** regions, products, pipeline.\n**Slide 5:** two asks for the leadership team.\nSaved as q3-review.pptx, using your company template.',
    ),
  },
  'pm-pilot': {
    scene: 'harbor',
    folder: 'PM Pilot',
    chat: exchange(
      'Prep me for my 1:1 with Sarah.',
      "I checked Jira, Slack and your calendar. Sarah has 3 open tickets, 2 unresolved threads in #product, and your last 1:1 on March 28 left 2 action items open.\n\n**Her focus:** migrating the auth service, blocked on DevOps.\n**You owe her:** the API spec review you promised on March 28.\n**She owes you:** an updated timeline for the Q2 roadmap.\n\n**Talking points**\n1. Unblock the auth migration. Offer to escalate with DevOps.\n2. API spec review. Share status or ask for more time.\n3. Q2 roadmap. Get her latest estimate.",
    ),
  },
};

interface AudienceDemoPanelProps {
  audience: Audience;
  /** Size, radius and entrance motion of the frame. */
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** A framed engraving for the audience, with Claude running their first task on top: the Mac app, or the iPhone app on small screens. */
export function AudienceDemoPanel({
  audience,
  className = 'h-[560px] rounded-3xl border border-[var(--line)] md:h-[520px]',
  sizes = '(min-width: 1024px) 1024px, 100vw',
  priority = true,
}: AudienceDemoPanelProps) {
  const demo = DEMOS[audience];
  const session = demo.session ?? chatToSession(demo.chat);
  return (
    <EngravingPanel scene={demo.scene} priority={priority} sizes={sizes} className={className}>
      {/* Phones get the iPhone app; the Mac window needs at least a tablet's width. */}
      <div className="relative flex h-full items-center justify-center p-4 md:hidden">
        <div className="shadow-[0_12px_40px_-12px_rgb(0_0_0/0.35)] rounded-[40px]">
          <ClaudeMobileMock steps={demo.chat} />
        </div>
      </div>
      <div className="relative m-8 hidden max-w-[520px] shadow-[0_12px_40px_-12px_rgb(0_0_0/0.25)] md:block">
        <ClaudeDesktopCodeMock steps={session} folder={demo.folder} loop height={320} />
      </div>
    </EngravingPanel>
  );
}
