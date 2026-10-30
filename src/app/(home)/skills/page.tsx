import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { CopyBlock } from '@/components/guide/copy-block';
import { ogImage } from '@/lib/og/image';

const title = 'Free Claude Skills: Crucible and Grill Me';
const description =
  'Two free skills for thinking before you commit. Grill Me asks one hard question at a time. Crucible runs your idea past a council of critics and returns a verdict.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://claudecodeguide.dev/skills' },
  openGraph: {
    title,
    description,
    type: 'website',
    url: 'https://claudecodeguide.dev/skills',
    images: [ogImage('skills', title)],
  },
};

interface FreeSkill {
  name: string;
  tagline: string;
  description: string;
  whenToUse: string[];
  tryIt: string;
  install: string;
  chatNote: string;
  downloads: Array<{ label: string; href: string }>;
}

const SKILLS: FreeSkill[] = [
  {
    name: 'grill-me',
    tagline: 'One hard question at a time',
    description:
      'Claude interviews you about a plan before you commit to it. Each turn is a single question with Claude\'s own suggested answer, so you confirm or correct instead of starting from a blank page. It calls out vague answers and keeps going until you can say what you are doing next and what success looks like in two weeks.',
    whenToUse: [
      'Before you write a plan, a spec or a pitch',
      'Before you start building something that will take more than a day',
      'When you suspect you are busy rather than making progress',
    ],
    tryIt: 'Grill me on my plan to rebuild our onboarding flow this quarter.',
    install:
      'Download https://claudecodeguide.dev/skills/grill-me/SKILL.md and save it as ~/.claude/skills/grill-me/SKILL.md, then tell me when it is ready.',
    chatNote:
      'Using Claude in the browser instead? Open the file and paste its contents at the start of your chat.',
    downloads: [{ label: 'Download grill-me (SKILL.md, 7 KB)', href: '/skills/grill-me/SKILL.md' }],
  },
  {
    name: 'crucible',
    tagline: 'A council of critics and a verdict',
    description:
      'Claude splits into up to 17 personas (a Contrarian, an Advocate, a Pre-mortem and more) that each attack your idea from one angle, then argue with each other without knowing who said what. A chair weighs the arguments and returns PROCEED, REFRAME or KILL, with the strongest dissent kept on the record. A quick Council mode uses five personas for everyday gut checks.',
    whenToUse: [
      'A decision where being wrong costs weeks, money or reputation',
      'A quick gut check on a new idea: ask for "council" and get five short challenges',
      'One lens on its own, for example "give me the First Principles read on this"',
    ],
    tryIt: 'Run this through the crucible: should I turn my side project into a paid product this year?',
    install:
      'Download these three files into ~/.claude/skills/crucible/, keeping the folder layout, then tell me when it is ready:\nhttps://claudecodeguide.dev/skills/crucible/SKILL.md\nhttps://claudecodeguide.dev/skills/crucible/references/personas.md\nhttps://claudecodeguide.dev/skills/crucible/references/benches.md',
    chatNote:
      'Using Claude in the browser instead? Open all three files and paste them at the start of your chat. Without the Code tab, Claude plays each persona in turn instead of running them side by side, so a full council takes longer.',
    downloads: [
      { label: 'Download crucible (SKILL.md, 16 KB)', href: '/skills/crucible/SKILL.md' },
      { label: 'personas.md (13 KB)', href: '/skills/crucible/references/personas.md' },
      { label: 'benches.md (7 KB)', href: '/skills/crucible/references/benches.md' },
    ],
  },
];

export default function SkillsPage() {
  return (
    <div className="flex flex-col">
      <article className="mx-auto w-full max-w-3xl px-6 pt-12 pb-24">
        <header className="mb-12">
          <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-fd-foreground sm:text-4xl">
            Free skills for thinking before you commit
          </h1>
          <p className="mt-4 text-lg text-fd-muted-foreground">
            A skill is a saved set of instructions Claude follows whenever the task comes up. I use
            these two before almost every plan I make. One questions you, the other argues with you.
          </p>
          <p className="mt-4 text-sm text-fd-muted-foreground">
            To install either one, open the Code tab in the Claude desktop app and paste the prompt
            under it. Claude saves the files for you, so you never touch a terminal.
          </p>
        </header>

        <div className="space-y-16">
          {SKILLS.map((skill) => (
            <section key={skill.name} id={skill.name} className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-fd-foreground">
                {skill.name}: {skill.tagline.toLowerCase()}
              </h2>
              <p className="mt-3 text-base text-fd-muted-foreground leading-relaxed">
                {skill.description}
              </p>

              <h3 className="mt-6 text-sm font-medium text-fd-foreground">Use it when</h3>
              <ul className="mt-2 space-y-2 list-disc list-outside pl-4">
                {skill.whenToUse.map((item) => (
                  <li key={item} className="text-sm text-fd-muted-foreground leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 mb-3 text-sm font-medium text-fd-foreground">Install it</h3>
              <CopyBlock code={skill.install} language="text" hint="Paste into the Code tab" />
              <p className="mt-3 text-sm text-fd-muted-foreground">{skill.chatNote}</p>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {skill.downloads.map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    download
                    className="inline-flex items-center gap-2 text-fd-foreground font-medium underline underline-offset-4"
                  >
                    {d.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>

              <h3 className="mt-8 mb-3 text-sm font-medium text-fd-foreground">Then try it</h3>
              <CopyBlock code={skill.tryIt} language="text" />
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
