import {
  MessageCircle,
  Terminal,
  Workflow,
  FileText,
  FileSpreadsheet,
  Presentation,
  Globe,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

type FlowKind = 'chassis' | 'sidecar';

interface FlowConfig {
  steps: string[];
  sideNode?: { label: string; afterStep: number };
  branch?: { left: string; right: string; afterStep: number; mergeStep: number };
  loop?: boolean;
}

interface SurfaceCardData {
  icon: LucideIcon;
  name: string;
  job: string;
  whatItIs: string;
  whereToUse: string[];
  pros: string[];
  cons: string[];
  flow: FlowConfig;
  flowKind: FlowKind;
  primaryHref: string;
  primaryLabel: string;
  tutorialHref?: string;
  tutorialLabel?: string;
}

const TIER_1: SurfaceCardData[] = [
  {
    icon: MessageCircle,
    name: 'Claude',
    job: 'Web & mobile',
    whatItIs:
      "Just like ChatGPT, it's a chatbot you talk to. Use it in a browser at claude.ai, or in the desktop and mobile apps. Free tier covers most of what you'd start with.",
    whereToUse: [
      'Talk through a half-formed idea until it makes sense',
      'Draft an email, a report, a tricky Slack reply',
      'Read a long thing and ask questions about it',
    ],
    pros: ['Free tier works fine to start', 'Remembers past chats on Pro'],
    cons: ["Can't touch files on your computer", "Doesn't make images for you"],
    flow: {
      steps: ['Prompt', 'Chat UI', 'Claude', 'Explore ideas', 'Response'],
      sideNode: { label: 'Memory', afterStep: 3 },
      loop: true,
    },
    flowKind: 'chassis',
    primaryHref: '#i-want-to-chat-or-do-quick-research',
    primaryLabel: 'Read the deep dive',
    tutorialHref: '/tutorials/coming-from-chatgpt',
    tutorialLabel: 'See it used: Coming from ChatGPT',
  },
  {
    icon: Terminal,
    name: 'Claude Code',
    job: 'Terminal',
    whatItIs:
      "You use this through your terminal, or inside Cursor or VS Code if you'd rather work in an editor. Tell it what to build, it reads the codebase, writes the code, runs tests, commits.",
    whereToUse: [
      'Build a feature that touches many files at once',
      'Get tests written and fixed for you',
      'Hand off long jobs and check back later (Dispatch)',
    ],
    pros: ['Holds a huge codebase in context (Max plan)', 'Goes from prompt to shipped commit'],
    cons: ["You need to be OK with a terminal", "Bills climb if you're not watching"],
    flow: {
      steps: ['Prompt', 'CLI', 'Claude', 'Read & write code', 'Run & fix tests', 'Ship'],
      sideNode: { label: 'Files', afterStep: 4 },
      loop: true,
    },
    flowKind: 'chassis',
    primaryHref: '#i-want-to-build-software-or-write-code',
    primaryLabel: 'Read the deep dive',
    tutorialHref: '/tutorials/your-first-claude-md',
    tutorialLabel: 'See it used: Your first CLAUDE.md',
  },
  {
    icon: Workflow,
    name: 'Cowork',
    job: 'Desktop, Pro+',
    whatItIs:
      "You need the Claude desktop app installed first. Cowork lives inside it as a mode that can use your computer, drive your apps, and connect to services like Gmail and Drive.",
    whereToUse: [
      'Cross-reference one export with another report',
      'Run a long task while you do something else',
      'Drive apps the chat can\'t reach on its own',
    ],
    pros: ['No code, no terminal needed', 'Connects to Gmail, Drive, more'],
    cons: ['Pro plan or higher required', 'Computer-use piece still in preview'],
    flow: {
      steps: ['Prompt', 'Chat UI', 'Claude', 'Output'],
      branch: {
        left: 'Read / edit files',
        right: 'Cross-app tasks',
        afterStep: 3,
        mergeStep: 4,
      },
      loop: true,
    },
    flowKind: 'chassis',
    primaryHref: '#i-want-claude-to-run-a-multi-step-task-on-its-own',
    primaryLabel: 'Read the deep dive',
  },
];

const TIER_2: SurfaceCardData[] = [
  {
    icon: FileText,
    name: 'Claude for Word',
    job: 'Office add-in',
    whatItIs:
      'A sidebar add-in you install inside Microsoft Word. Open any document, the sidebar sits next to your text and you ask it questions or hand it edits.',
    whereToUse: [
      'Comb through a 40-page contract or spec',
      'Find where Section 7 contradicts Section 2',
      'Get redlines you can accept or reject one by one',
    ],
    pros: ['You never leave Word', 'Edits show up as proper Word edits'],
    cons: ['Newest of the Office add-ins', 'Expect a glitch here and there'],
    flow: {
      steps: ['Open Word doc', 'Open sidebar', 'Ask a question', 'Inline edits surface', 'Accept or reject'],
    },
    flowKind: 'sidecar',
    primaryHref: '#i-want-to-write-or-review-a-long-document',
    primaryLabel: 'Read the deep dive',
  },
  {
    icon: FileSpreadsheet,
    name: 'Claude for Excel',
    job: 'Office add-in',
    whatItIs:
      'A side pane add-in you install inside Microsoft Excel. Open a sheet, the pane sits next to your cells and you ask it about anything in the workbook.',
    whereToUse: [
      'Trace a number back to the cells that made it',
      "Make sense of someone else's spreadsheet",
      'Turn a flat table into a pivot in one go',
    ],
    pros: ['Points at the cell, not just an answer', 'Does NOT need M365 Copilot'],
    cons: ["Conversations don't stick around", 'Whatever you did is gone in 30 days'],
    flow: {
      steps: ['Open spreadsheet', 'Open side pane', 'Ask about cells', 'Cited answer', 'Apply to sheet'],
      sideNode: { label: 'Cells', afterStep: 3 },
    },
    flowKind: 'sidecar',
    primaryHref: '#i-want-to-analyze-or-build-a-spreadsheet',
    primaryLabel: 'Read the deep dive',
  },
  {
    icon: Presentation,
    name: 'Claude for PowerPoint',
    job: 'Office add-in',
    whatItIs:
      'An add-in you install inside Microsoft PowerPoint. Open a deck, the side pane sits next to your slides and turns a messy outline into a first-draft deck using your real template.',
    whereToUse: [
      'Bullets to slides in one pass',
      'Drafts that follow your real template',
      'Tighten the words on every slide',
    ],
    pros: ['Uses your real .pptx template', 'Picks up the brand palette'],
    cons: ['Spacing is rarely perfect first try', 'Fonts swap on you sometimes'],
    flow: {
      steps: ['Outline', 'Reads template', 'Generates deck', 'Refine slides', 'Export'],
      sideNode: { label: '.pptx', afterStep: 2 },
    },
    flowKind: 'sidecar',
    primaryHref: '#i-want-to-build-a-slide-deck',
    primaryLabel: 'Read the deep dive',
    tutorialHref: '/tutorials/slide-deck-outline',
    tutorialLabel: 'See it used: Slide deck outline',
  },
  {
    icon: Globe,
    name: 'Claude for Chrome',
    job: 'Browser extension',
    whatItIs:
      'A Chrome browser extension. Once you install it, it opens as a side panel next to whatever website you\'re on, and it can read across all your open tabs.',
    whereToUse: [
      'Get the gist of a long article without scrolling',
      'Pull patterns from five tabs at once',
      'Have it check the same site every day',
    ],
    pros: ["Reads exactly what's on your screen", 'Knows about your other tabs'],
    cons: ['Beta, paid plans only', 'The panel is narrow'],
    flow: {
      steps: ['Open page', 'Open side panel', 'Ask about content', 'Summary or action', 'Continue browsing'],
      sideNode: { label: 'Tabs', afterStep: 3 },
    },
    flowKind: 'sidecar',
    primaryHref: '#i-want-claude-to-help-me-while-i-browse-the-web',
    primaryLabel: 'Read the deep dive',
  },
];

function FlowDiagram({ flow, idPrefix }: { flow: FlowConfig; idPrefix: string }) {
  const { steps, sideNode, branch, loop } = flow;
  const NODE_W = 160;
  const NODE_H = 30;
  const STEP = 50;
  const CX = 160;
  const VBW = 320;

  const lastStepIndex = steps.length - 1;
  const lastY = lastStepIndex * STEP + NODE_H / 2;
  const branchExtra = branch ? STEP : 0;
  const totalH = (steps.length - 1) * STEP + NODE_H + branchExtra + 8;
  const arrowMarkerId = `${idPrefix}-arr`;
  const loopMarkerId = `${idPrefix}-arr-loop`;

  const branchAfterY = branch ? branch.afterStep * STEP + NODE_H : 0;
  const branchTopY = branchAfterY + 20;
  const branchMergeY = (branch?.mergeStep ?? 0) * STEP + branchExtra;

  return (
    <svg
      viewBox={`0 0 ${VBW} ${totalH}`}
      xmlns="http://www.w3.org/2000/svg"
      className="block w-full max-w-[340px] mx-auto"
      role="img"
      aria-label={`Flow diagram: ${steps.join(' to ')}`}
    >
      <defs>
        <marker id={arrowMarkerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-fd-border" />
        </marker>
        <marker id={loopMarkerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-fd-muted-foreground/60" />
        </marker>
      </defs>

      {/* Main column nodes */}
      {steps.map((label, i) => {
        const yOffset = branch && i > branch.afterStep ? branchExtra : 0;
        const y = i * STEP + yOffset;
        return (
          <g key={i}>
            <rect
              x={CX - NODE_W / 2}
              y={y}
              width={NODE_W}
              height={NODE_H}
              rx={6}
              className="fill-fd-card stroke-fd-border"
              strokeWidth={1}
            />
            <text
              x={CX}
              y={y + NODE_H / 2}
              dominantBaseline="middle"
              textAnchor="middle"
              className="fill-fd-foreground font-mono text-[10.5px]"
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Vertical arrows between adjacent nodes (skipping branch positions) */}
      {steps.slice(0, -1).map((_, i) => {
        if (branch && i === branch.afterStep) return null;
        const yStartOffset = branch && i > branch.afterStep ? branchExtra : 0;
        const yEndOffset = branch && i + 1 > branch.afterStep ? branchExtra : 0;
        const y1 = i * STEP + NODE_H + yStartOffset;
        const y2 = (i + 1) * STEP + yEndOffset;
        return (
          <line
            key={`arr-${i}`}
            x1={CX}
            y1={y1}
            x2={CX}
            y2={y2}
            className="stroke-fd-border"
            strokeWidth={1}
            markerEnd={`url(#${arrowMarkerId})`}
          />
        );
      })}

      {/* Side node */}
      {sideNode && (
        <g>
          <rect
            x={250}
            y={sideNode.afterStep * STEP - 1 + NODE_H / 2 - 12}
            width={56}
            height={24}
            rx={4}
            className="fill-fd-background stroke-fd-border"
            strokeWidth={1}
            strokeDasharray="3 2"
          />
          <text
            x={278}
            y={sideNode.afterStep * STEP + NODE_H / 2 - 1}
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-fd-muted-foreground font-mono text-[9.5px]"
          >
            {sideNode.label}
          </text>
          <line
            x1={CX + NODE_W / 2}
            y1={sideNode.afterStep * STEP + NODE_H / 2}
            x2={250}
            y2={sideNode.afterStep * STEP + NODE_H / 2}
            className="stroke-fd-border"
            strokeWidth={1}
            strokeDasharray="3 2"
          />
        </g>
      )}

      {/* Branch (parallel sub-nodes) */}
      {branch && (
        <g>
          {/* Left branch node */}
          <rect
            x={50}
            y={branchTopY}
            width={98}
            height={NODE_H}
            rx={6}
            className="fill-fd-card stroke-fd-border"
            strokeWidth={1}
          />
          <text
            x={99}
            y={branchTopY + NODE_H / 2}
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-fd-foreground font-mono text-[9px]"
          >
            {branch.left}
          </text>
          {/* Right branch node */}
          <rect
            x={170}
            y={branchTopY}
            width={98}
            height={NODE_H}
            rx={6}
            className="fill-fd-card stroke-fd-border"
            strokeWidth={1}
          />
          <text
            x={219}
            y={branchTopY + NODE_H / 2}
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-fd-foreground font-mono text-[9px]"
          >
            {branch.right}
          </text>
          {/* Down then split */}
          <path
            d={`M ${CX} ${branchAfterY} V ${branchTopY - 10} H 99 V ${branchTopY}`}
            className="stroke-fd-border fill-none"
            strokeWidth={1}
            markerEnd={`url(#${arrowMarkerId})`}
          />
          <path
            d={`M ${CX} ${branchAfterY} V ${branchTopY - 10} H 219 V ${branchTopY}`}
            className="stroke-fd-border fill-none"
            strokeWidth={1}
            markerEnd={`url(#${arrowMarkerId})`}
          />
          {/* Merge */}
          <path
            d={`M 99 ${branchTopY + NODE_H} V ${branchMergeY - 10} H ${CX} V ${branchMergeY}`}
            className="stroke-fd-border fill-none"
            strokeWidth={1}
            markerEnd={`url(#${arrowMarkerId})`}
          />
          <path
            d={`M 219 ${branchTopY + NODE_H} V ${branchMergeY - 10} H ${CX}`}
            className="stroke-fd-border fill-none"
            strokeWidth={1}
          />
        </g>
      )}

      {/* Iterate loop on left margin */}
      {loop && (
        <g>
          <path
            d={`M 100 ${lastY + branchExtra} H 50 Q 40 ${lastY + branchExtra} 40 ${lastY + branchExtra - 10} V 25 Q 40 15 50 15 H 100`}
            className="stroke-fd-muted-foreground/60 fill-none"
            strokeWidth={1}
            strokeDasharray="4 3"
            markerEnd={`url(#${loopMarkerId})`}
          />
          <text
            x={40}
            y={(lastY + branchExtra) / 2 + 10}
            transform={`rotate(-90 40 ${(lastY + branchExtra) / 2 + 10})`}
            textAnchor="middle"
            className="fill-fd-muted-foreground/60 font-mono text-[9.5px] tracking-wider"
          >
            ↻ Iterate
          </text>
        </g>
      )}
    </svg>
  );
}

function SurfaceCard({ data, index }: { data: SurfaceCardData; index: number }) {
  const Icon = data.icon;
  return (
    <article className="flex flex-col gap-0 p-7 bg-fd-background hover:bg-fd-card/40 transition-colors duration-200">
      {/* Header */}
      <header className="flex items-start gap-3.5 mb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fd-card border border-fd-border text-fd-foreground">
          <Icon className="h-[18px] w-[18px]" />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <h3 className="m-0 font-display text-[22px] font-semibold leading-tight tracking-tight text-fd-foreground">
            {data.name}
          </h3>
          <p className="m-0 font-mono text-[11px] uppercase tracking-wider text-fd-muted-foreground/80">
            {data.job}
          </p>
        </div>
      </header>

      <SectionLabel first>What it is</SectionLabel>
      <p className="m-0 mb-4 text-[14px] leading-[1.55] text-fd-foreground">{data.whatItIs}</p>

      <SectionLabel>Where to use</SectionLabel>
      <ul className="m-0 mb-4 flex list-none flex-col gap-1.5 p-0">
        {data.whereToUse.map((item, i) => (
          <li key={i} className="relative pl-[18px] text-[13.5px] leading-[1.5] text-fd-foreground before:absolute before:left-[4px] before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-fd-muted-foreground/70 before:content-['']">
            {item}
          </li>
        ))}
      </ul>

      <div className="mb-4 grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">
        <div className="min-w-0">
          <SectionLabel inline>Pros</SectionLabel>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {data.pros.map((item, i) => (
              <li key={i} className="relative pl-[18px] text-[13.5px] leading-[1.5] text-fd-foreground before:absolute before:left-[4px] before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-emerald-600 dark:before:bg-emerald-500 before:content-['']">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <SectionLabel inline>Cons</SectionLabel>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {data.cons.map((item, i) => (
              <li key={i} className="relative pl-[18px] text-[13.5px] leading-[1.5] text-fd-foreground before:absolute before:left-[4px] before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-amber-600 dark:before:bg-amber-500 before:content-['']">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Flow diagram */}
      <div className="mt-auto pt-4 border-t border-dashed border-fd-border">
        <p className="m-0 mb-3 font-mono text-[10.5px] uppercase tracking-wider text-fd-muted-foreground/80">
          How the work flows
        </p>
        <FlowDiagram flow={data.flow} idPrefix={`flow-${index}`} />
      </div>

      {/* Footer links */}
      <footer className="mt-5 flex flex-col gap-1.5">
        <a
          href={data.primaryHref}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-fd-foreground no-underline hover:text-fd-primary transition-colors"
        >
          {data.primaryLabel}
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </a>
        {data.tutorialHref && data.tutorialLabel && (
          <a
            href={data.tutorialHref}
            className="inline-flex items-center gap-1.5 text-[12.5px] text-fd-muted-foreground no-underline hover:text-fd-foreground transition-colors"
          >
            {data.tutorialLabel}
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </a>
        )}
      </footer>
    </article>
  );
}

function SectionLabel({
  children,
  first,
  inline,
}: {
  children: ReactNode;
  first?: boolean;
  inline?: boolean;
}) {
  const baseClasses =
    'm-0 mb-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-fd-muted-foreground/80';
  if (first || inline) return <p className={baseClasses}>{children}</p>;
  return <p className={`${baseClasses} pt-4 border-t border-dashed border-fd-border`}>{children}</p>;
}

function TierLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="font-mono text-[12px] font-medium tracking-wider text-fd-muted-foreground/60">
        {num}
      </span>
      <h2 className="m-0 font-display text-[22px] font-medium tracking-tight text-fd-foreground">
        {title}
      </h2>
      <hr className="m-0 flex-1 border-0 border-t border-dashed border-fd-border" />
    </div>
  );
}

export function ClaudeEcosystem() {
  return (
    <section
      className="my-10 not-prose @container/eco"
      style={{
        width: 'min(1280px, calc(100vw - 32px))',
        marginInline: 'calc((100% - min(1280px, 100vw - 32px)) / 2)',
      }}
      aria-label="Claude ecosystem at a glance"
    >
      {/* Tier 1: chassis */}
      <TierLabel num="01" title="The chassis" />
      <div className="overflow-hidden rounded-xl border border-fd-border shadow-md">
        <div className="grid grid-cols-1 @4xl/eco:grid-cols-3">
          {TIER_1.map((card, i) => (
            <div
              key={card.name}
              className={[
                'border-fd-border',
                'border-b @4xl/eco:border-b-0',
                i < TIER_1.length - 1 ? '@4xl/eco:border-r' : '',
                i === TIER_1.length - 1 ? 'border-b-0' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <SurfaceCard data={card} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Tier 2: Claude inside your tools */}
      <div className="mt-12">
        <TierLabel num="02" title="Claude inside your tools" />
        <div className="overflow-hidden rounded-xl border border-fd-border shadow-md">
          <div className="grid grid-cols-1 @2xl/eco:grid-cols-2">
            {TIER_2.map((card, i) => {
              const isLastRow = i >= TIER_2.length - 2;
              const isRightCol = i % 2 === 1;
              return (
                <div
                  key={card.name}
                  className={[
                    'border-fd-border',
                    !isLastRow ? 'border-b' : '',
                    !isRightCol ? '@2xl/eco:border-r' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <SurfaceCard data={card} index={TIER_1.length + i} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
