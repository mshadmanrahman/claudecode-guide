import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, ShieldCheck, Building2, BookOpen, ExternalLink } from 'lucide-react';
import { FaqSchema } from '@/components/faq-schema';
import { EmailCapture } from '@/components/email-capture';
import { SceneBackdrop } from '@/components/scene-backdrop';

import { KineticText } from '@/components/kinetic-text';
import { ogImage } from '@/lib/og/image';
const ANNOUNCEMENT_URL = 'https://claude.com/blog/four-role-based-claude-certifications';
const ANNOUNCEMENT_DATE = '23 July 2026';
const CATALOGUE_URL = 'https://anthropic-partners.skilljar.com/page/partner-certifications';
const FAQ_URL = 'https://anthropic-partners.skilljar.com/page/faq-certifications';
const POLICIES_URL = 'https://anthropic-partners.skilljar.com/page/policies-certifications';
const PEARSON_URL = 'https://pearsonvue.com/us/en/anthropic';
const PARTNERS_URL = 'https://claude.com/partners';
const VERIFIED_DATE = '2 September 2026';

export const metadata: Metadata = {
  title: { absolute: 'Claude Certification: Four Credentials, Prices, and Who Can Sit Them' },
  description:
    'The four Claude certifications cost $99 to $175, run 120 minutes through Pearson, and need a passing score of 720. Registration requires a partner email address.',
  alternates: { canonical: 'https://claudecodeguide.dev/certification' },
  openGraph: {
    images: [ogImage('certification', 'Claude Certification')],
    title: 'Claude Certification: Four Credentials, Prices, and Who Can Sit Them',
    description:
      'Prices, exam length, passing score, retake rules, and the partner email requirement that stops most people registering.',
    type: 'article',
    url: 'https://claudecodeguide.dev/certification',
  },
};

interface Credential {
  name: string;
  price: string;
  level: string;
  covers: string;
  who: string;
  registerUrl: string;
  prepUrl: string;
  countsToward: boolean;
}

const CREDENTIALS: Credential[] = [
  {
    name: 'Claude Certified Associate: Foundations',
    price: '$99 USD',
    level: 'Foundations',
    covers: 'Guiding customers to the right Claude use cases, and setting engagements up to succeed.',
    who: 'Consultants, sellers, and delivery leads.',
    registerUrl:
      'https://anthropic-partners.skilljar.com/claude-certified-associate-foundations-certification',
    prepUrl: 'https://anthropic-partners.skilljar.com/path/claude-certified-associate-foundations',
    countsToward: false,
  },
  {
    name: 'Claude Certified Developer: Foundations',
    price: '$125 USD',
    level: 'Foundations',
    covers: 'The Claude API, Claude Code, and Model Context Protocol, from first integration to production agents.',
    who: 'Engineers building with Claude.',
    registerUrl:
      'https://anthropic-partners.skilljar.com/claude-certified-developer-foundations-certification',
    prepUrl: 'https://anthropic-partners.skilljar.com/path/claude-certified-developer-foundations',
    countsToward: true,
  },
  {
    name: 'Claude Certified Architect: Foundations',
    price: '$125 USD',
    level: 'Foundations',
    covers: 'Designing Claude solutions end to end: deployment platforms, agentic architecture, evaluation, cost, and safety.',
    who: 'Solution architects.',
    registerUrl:
      'https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification',
    prepUrl:
      'https://anthropic-partners.skilljar.com/page/claude-certified-architect-foundations-prep-courses',
    countsToward: true,
  },
  {
    name: 'Claude Certified Architect: Professional',
    price: '$175 USD',
    level: 'Professional',
    covers: 'Designing and governing Claude solutions at enterprise scale.',
    who: 'Architects working at large-enterprise scale.',
    registerUrl:
      'https://anthropic-partners.skilljar.com/claude-certified-architect-professional-certification',
    prepUrl: 'https://anthropic-partners.skilljar.com/path/claude-certified-architect-professional',
    countsToward: true,
  },
];

const EXAM_FACTS: { label: string; value: string }[] = [
  { label: 'Format', value: 'Multiple choice and scenario-based multiple response' },
  { label: 'Time limit', value: '120 minutes, around 135 minutes of total seat time' },
  { label: 'Scoring', value: 'Scaled score from 100 to 1,000' },
  { label: 'Passing score', value: '720, the same bar for all four exams' },
  { label: 'Delivery', value: 'Pearson, online proctored or at a test center' },
  { label: 'Open book', value: 'No. Notes, documentation, translation tools and AI assistants are all barred' },
  { label: 'Minimum age', value: '18, verified against government-issued ID at check-in' },
  { label: 'Certification validity', value: '12 months from the date you earn it' },
  { label: 'Registration validity', value: '5 years, so you can register now and sit it later' },
  { label: 'Retake waits', value: '14 days after a first fail, 30 after a second, 90 after a third' },
  { label: 'Retake limit', value: '4 attempts per exam per rolling 12 months' },
];

const FAQ = [
  {
    question: 'Is there an official Claude certification?',
    answer:
      'Yes. Anthropic runs the Claude Certification Program with four role-based credentials: Claude Certified Associate: Foundations, Claude Certified Developer: Foundations, Claude Certified Architect: Foundations, and Claude Certified Architect: Professional. The program launched in March 2026 and expanded to four credentials on 23 July 2026.',
  },
  {
    question: 'How much does the Claude certification exam cost?',
    answer:
      'Claude Certified Associate: Foundations costs $99 USD. Developer: Foundations and Architect: Foundations cost $125 USD each. Architect: Professional costs $175 USD. Those are list prices before any partner-tier discount. Select, Preferred and Global Premier partners get 50% off automatically at checkout, and Global Premier partners pay nothing at all until 31 December 2026.',
  },
  {
    question: 'How long is the Claude certification exam and what score do I need to pass?',
    answer:
      'You get 120 minutes, and should plan for around 135 minutes of seat time including check-in and a post-exam survey. Results come back as a scaled score from 100 to 1,000. The minimum passing score is 720, and it is the same for all four certifications.',
  },
  {
    question: 'Can anyone take the Claude Certified Architect exam?',
    answer:
      'No. Certification is available only to people at Claude Partner Network organizations, and registration requires a partner email address on a recognized company domain. Personal email addresses will not work. If you do not work at a partner firm, the free courses at Claude Academy cover much of the same material without the credential.',
  },
  {
    question: 'How are the Claude certification exams delivered?',
    answer:
      'Through Pearson, either online proctored or at a Pearson test center. Every exam is supervised, closed book, and identity-verified against government-issued ID before you start. People who pass receive a digital badge through Credly.',
  },
  {
    question: 'Do I need the Foundations exam before the Professional one?',
    answer:
      'No. Architect: Foundations and Architect: Professional are separate certifications with separate exams, and there is no formal prerequisite, so you can sit Professional without holding Foundations. Anthropic recommends starting at Foundations. Passing Foundations does not upgrade to Professional automatically.',
  },
  {
    question: 'What happens if I fail a Claude certification exam?',
    answer:
      'Your score report shows the overall scaled score, the pass or fail result, and the percentage you answered correctly in each section, so you can see what to review. You wait 14 days before a first retake, 30 days after a second fail, and 90 days after a third. You can attempt any one exam up to four times per rolling 12 months, and a retake costs the full fee.',
  },
  {
    question: 'How long does a Claude certification last?',
    answer:
      'Twelve months from the date you earn it. Renewing on time is free and involves a non-proctored assessment covering what has changed. If the certification lapses, you retake the full exam at full price.',
  },
  {
    question: 'How many people hold a Claude certification?',
    answer:
      'More than 36,000 consultants across more than 1,300 organizations had been certified as of 23 July 2026, counting from the program launch in March 2026.',
  },
];

export default function CertificationPage() {
  return (
    <main className="min-h-screen">
      <SceneBackdrop variant="faded" scene="summit" />
      <FaqSchema items={FAQ} />

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 flex items-center gap-2 text-sm text-[var(--muted)]">
            <Award className="h-4 w-4" />
            Checked against Anthropic&rsquo;s own pages on {VERIFIED_DATE}
          </div>
          <h1 className="font-display text-display-article leading-[1.1] font-semibold tracking-[-0.035em] text-fd-foreground">
            <KineticText>Claude certification, and who can actually sit one</KineticText>
          </h1>
          <p className="hm-rise mt-5 text-lead text-fd-muted-foreground leading-relaxed">
            Four credentials, $99 to $175, 120 minutes each, pass at 720 out of 1,000. The catch
            sits in the registration form rather than the exam: you need a partner email address on
            a recognized company domain, and a personal address will not work.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg glass">
              <Award className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-fd-foreground tracking-[-0.035em]">The four credentials</h2>
          </div>
          <p className="mb-6 text-fd-muted-foreground leading-relaxed">
            Three roles, four exams. Each links straight to its own registration page and its free
            prep track on Anthropic Partner Academy.
          </p>

          <div className="space-y-3">
            {CREDENTIALS.map((c) => (
              <div key={c.name} className="glass rounded-xl p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-body font-semibold text-fd-foreground">
                    {c.name}
                  </h3>
                  <span className="font-mono text-sm text-fd-foreground">{c.price}</span>
                </div>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 font-medium text-fd-foreground">Covers</dt>
                    <dd className="text-fd-muted-foreground">{c.covers}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 font-medium text-fd-foreground">Built for</dt>
                    <dd className="text-fd-muted-foreground">{c.who}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 font-medium text-fd-foreground">Partner tier</dt>
                    <dd className="text-fd-muted-foreground">
                      {c.countsToward
                        ? 'Counts toward Claude Partner Network tier eligibility.'
                        : 'Does not count toward Claude Partner Network tier eligibility.'}
                    </dd>
                  </div>
                </dl>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <a
                    href={c.registerUrl}
                    className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] inline-flex items-center gap-1 font-medium text-fd-foreground underline underline-offset-4 hover:text-fd-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                  <a
                    href={c.prepUrl}
                    className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] inline-flex items-center gap-1 text-fd-muted-foreground underline underline-offset-4 hover:text-fd-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Free prep courses <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-fd-muted-foreground">
            Both registration and prep links sit behind a partner sign-in. The official exam guide
            for each credential is a PDF linked from the{' '}
            <a
              href={CATALOGUE_URL}
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] underline underline-offset-4 hover:text-fd-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              certification catalog
            </a>
            ; those file links change, so go through the catalog rather than bookmarking one.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg glass">
              <ShieldCheck className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-fd-foreground tracking-[-0.035em]">What the exam is like</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <tbody>
                {EXAM_FACTS.map((f) => (
                  <tr key={f.label} className="border-b border-fd-border last:border-0">
                    <th
                      scope="row"
                      className="w-48 py-2.5 pr-4 text-left align-top font-medium text-fd-foreground"
                    >
                      {f.label}
                    </th>
                    <td className="py-2.5 align-top text-fd-muted-foreground">{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-fd-muted-foreground leading-relaxed">
            Scaled scoring exists so that two people sitting slightly different versions of the same
            exam face the same bar. A fail report breaks your result down by section, which is the
            part worth reading before you pay for a retake.
          </p>
          <p className="mt-5 text-fd-muted-foreground leading-relaxed">
            Anthropic&rsquo;s framing is that certification represents validated capability rather
            than course attendance. That is the reason for the proctoring, and it is what separates
            these exams from the free course quizzes on Claude Academy.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg glass">
              <Building2 className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-fd-foreground tracking-[-0.035em]">
              The part that is hard to find out
            </h2>
          </div>
          <div className="space-y-4 text-fd-muted-foreground leading-relaxed">
            <p>
              Certification is open only to people at Claude Partner Network organizations.
              Registration checks your email domain against your firm&rsquo;s partner record, and a
              personal address is rejected. If your company is a partner but your domain is not on
              the record yet, adding it takes 7 to 10 working days, so start that before you book a
              date.
            </p>
            <p>
              Price follows the same record. Registered-tier partners pay list price. Select,
              Preferred and Global Premier partners get 50% off automatically, and Global Premier
              partners pay nothing on any exam until 31 December 2026. A discount that fails to show
              at checkout usually means the domain is not linked.
            </p>
            <p>
              The demand is coming from firms rather than individuals. Accenture has committed to
              50,000 certified professionals, PwC to 30,000, Capgemini, DXC and UST to 20,000 each,
              Deloitte and KPMG to 15,000 each. Ascendion plans to certify its entire 8,000-person
              engineering team before 2027.
            </p>
            <p>
              So if you went looking for a sign-up button as an individual and could not find one,
              nothing is wrong with your search. There is no public self-enrolment route, and
              Anthropic has not said whether one is planned. Bulk voucher purchasing for partner
              teams is described as in progress with no date.
            </p>
            <p className="text-fd-foreground">
              If you work at a partner firm, your enablement or practice lead owns the enrolment
              path. Ask them before you email support. If your firm is not a partner,{' '}
              <a
                href={PARTNERS_URL}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] underline underline-offset-4 hover:text-fd-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                applications are open
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg glass">
              <BookOpen className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-fd-foreground tracking-[-0.035em]">
              Learning the material without the badge
            </h2>
          </div>
          <p className="mb-5 text-fd-muted-foreground leading-relaxed">
            The credential is gated. The material largely is not. Anthropic&rsquo;s own free courses
            sit at{' '}
            <a
              href="https://academy.claude.com"
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] inline-flex items-center gap-1 underline underline-offset-4 hover:text-fd-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claude Academy <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
            , and cover AI fluency, the Claude API, and each product surface. For the areas the
            Developer and Architect tracks name, these pages go deeper:
          </p>
          <ul className="space-y-2 text-fd-muted-foreground">
            <li>
              <Link
                href="/docs/foundations/which-interface"
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] underline underline-offset-4 hover:text-fd-foreground"
              >
                Which Claude surface for which job
              </Link>{' '}
              covers the ground the Associate credential calls guiding customers to the right use
              case.
            </li>
            <li>
              <Link
                href="/docs/patterns/mcp-servers"
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] underline underline-offset-4 hover:text-fd-foreground"
              >
                MCP servers
              </Link>{' '}
              and{' '}
              <Link
                href="/docs/foundations/claude-md"
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] underline underline-offset-4 hover:text-fd-foreground"
              >
                CLAUDE.md
              </Link>{' '}
              cover Model Context Protocol and agent context, both named under the Developer track.
            </li>
            <li>
              <Link
                href="/docs/patterns/skills"
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] underline underline-offset-4 hover:text-fd-foreground"
              >
                Skills
              </Link>{' '}
              and{' '}
              <Link href="/workflow" className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] underline underline-offset-4 hover:text-fd-foreground">
                agent workflows
              </Link>{' '}
              cover agentic architecture, named under the Architect track.
            </li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-fd-foreground tracking-[-0.035em]">Common questions</h2>
          <dl className="mt-6 space-y-6">
            {FAQ.map((f) => (
              <div key={f.question}>
                <dt className="font-display text-body font-semibold text-fd-foreground">
                  {f.question}
                </dt>
                <dd className="mt-2 text-fd-muted-foreground leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-3xl space-y-3 text-sm text-fd-muted-foreground">
          <p>Every figure on this page comes from one of Anthropic&rsquo;s own pages:</p>
          <ul className="space-y-1.5">
            <li>
              <a
                href={ANNOUNCEMENT_URL}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] inline-flex items-center gap-1 underline underline-offset-4 hover:text-fd-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                The program announcement <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>{' '}
              of {ANNOUNCEMENT_DATE}, for the roles and the adoption numbers.
            </li>
            <li>
              <a
                href={CATALOGUE_URL}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] inline-flex items-center gap-1 underline underline-offset-4 hover:text-fd-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                The certification catalog <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>{' '}
              for prices and tier eligibility.
            </li>
            <li>
              <a
                href={FAQ_URL}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] inline-flex items-center gap-1 underline underline-offset-4 hover:text-fd-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                The certification FAQ <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>{' '}
              and{' '}
              <a
                href={POLICIES_URL}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] inline-flex items-center gap-1 underline underline-offset-4 hover:text-fd-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                policies <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>{' '}
              for exam length, scoring, retakes, and eligibility.
            </li>
            <li>
              <a
                href={PEARSON_URL}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] inline-flex items-center gap-1 underline underline-offset-4 hover:text-fd-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pearson&rsquo;s Anthropic page <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>{' '}
              for scheduling, ID requirements, and system checks.
            </li>
          </ul>
          <p>
            Checked {VERIFIED_DATE}. Prices and rules have changed once already: Architect:
            Foundations went from $99 to $125 on 30 June 2026, the same day delivery moved to
            Pearson. Confirm against the catalog before you pay.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-20">
        <EmailCapture placement="certification-footer" />
      </div>
    </main>
  );
}
