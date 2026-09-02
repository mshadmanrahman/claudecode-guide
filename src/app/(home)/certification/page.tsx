import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, ShieldCheck, Building2, BookOpen, ExternalLink } from 'lucide-react';
import { FaqSchema } from '@/components/faq-schema';
import { EmailCapture } from '@/components/email-capture';

const SOURCE_URL = 'https://claude.com/blog/four-role-based-claude-certifications';
const SOURCE_DATE = '23 July 2026';

export const metadata: Metadata = {
  title: { absolute: 'Claude Certification: The Four Credentials, and Who Can Actually Sit Them' },
  description:
    'Anthropic runs four Claude certifications, all proctored through Pearson. Here is what each one covers, how the exams work, and why there is no public sign-up page.',
  alternates: { canonical: 'https://claudecodeguide.dev/certification' },
  openGraph: {
    title: 'Claude Certification: The Four Credentials, and Who Can Actually Sit Them',
    description:
      'The four Claude credentials, how the proctored Pearson exams work, and what to do if you are not at a partner firm.',
    type: 'article',
    url: 'https://claudecodeguide.dev/certification',
  },
};

const CREDENTIALS = [
  {
    name: 'Claude Certified Associate: Foundations',
    who: 'Consultants, project leads, and anyone working on a Claude project, technical or not.',
    covers: 'Practical everyday use of Claude.',
  },
  {
    name: 'Claude Certified Developer: Foundations',
    who: 'Engineers building applications with Claude.',
    covers: 'The Claude API, tool use, and agent development.',
  },
  {
    name: 'Claude Certified Architect: Foundations',
    who: 'Solution architects who design and build agent systems with Claude.',
    covers: 'Designing and building agent systems.',
  },
  {
    name: 'Claude Certified Architect: Professional',
    who: 'Architects working at large-enterprise scale. The advanced credential.',
    covers: 'Integration architecture, governance, and evaluation.',
  },
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
      'Anthropic has not published a price. The announcement describes the credentials, the exam format, and the delivery partner, but states no fee for any of the four exams.',
  },
  {
    question: 'Can anyone take the Claude Certified Architect exam?',
    answer:
      'Anthropic describes the program entirely through the Claude Partner Network. Completed certifications are recognised with partner badges, and the free training platform named in the announcement is Anthropic Partner Academy, described as a platform for partners. There is no public self-enrolment page. If you do not work at a partner firm, the free courses at Claude Academy cover much of the same material without the credential.',
  },
  {
    question: 'How are the Claude certification exams delivered?',
    answer:
      'Through Pearson Professional Assessments. Every exam is proctored, meaning it is taken under supervision, and test takers must validate their identity before starting. People who pass receive a digital badge through Credly by Pearson.',
  },
  {
    question: 'Do I need the Foundations exam before the Professional one?',
    answer:
      'Yes. Anthropic states that every path to getting credentialed starts with a foundation-level certification and advances to the professional level.',
  },
  {
    question: 'How many people hold a Claude certification?',
    answer:
      'More than 36,000 consultants across more than 1,300 organisations had been certified as of 23 July 2026, counting from the programme launch in March 2026.',
  },
];

export default function CertificationPage() {
  return (
    <main className="min-h-screen">
      <FaqSchema items={FAQ} />

      <section className="border-b border-fd-border bg-fd-background px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-4 py-1.5 text-sm text-fd-muted-foreground">
            <Award className="h-4 w-4" />
            Verified against Anthropic&rsquo;s announcement of {SOURCE_DATE}
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
            Claude certification, and who can actually sit one
          </h1>
          <p className="mt-5 text-lg text-fd-muted-foreground leading-relaxed">
            Anthropic runs four Claude credentials. Every exam is proctored, delivered through
            Pearson, and identity-verified before you start. The part most write-ups skip: the
            whole programme is built around the Claude Partner Network, and there is no public
            page where you sign up and pay.
          </p>
        </div>
      </section>

      <section className="border-b border-fd-border px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fd-border bg-fd-card">
              <Award className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-fd-foreground">The four credentials</h2>
          </div>
          <p className="mb-6 text-fd-muted-foreground leading-relaxed">
            Three of these were announced on {SOURCE_DATE}. Claude Certified Architect: Foundations
            already existed. Each maps to one of the four roles Anthropic says put Claude into
            production.
          </p>

          <div className="space-y-3">
            {CREDENTIALS.map((c) => (
              <div key={c.name} className="rounded-xl border border-fd-border bg-fd-card p-5">
                <h3 className="font-display text-base font-semibold text-fd-foreground">{c.name}</h3>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div className="flex gap-2">
                    <dt className="shrink-0 font-medium text-fd-foreground">Covers</dt>
                    <dd className="text-fd-muted-foreground">{c.covers}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="shrink-0 font-medium text-fd-foreground">Built for</dt>
                    <dd className="text-fd-muted-foreground">{c.who}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-fd-muted-foreground">
            Every path starts at foundation level and advances to professional. You cannot begin at
            the Professional tier.
          </p>
        </div>
      </section>

      <section className="border-b border-fd-border px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fd-border bg-fd-card">
              <ShieldCheck className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-fd-foreground">How the exams work</h2>
          </div>
          <ul className="space-y-3 text-fd-muted-foreground leading-relaxed">
            <li>
              Exams run through <strong className="text-fd-foreground">Pearson Professional
              Assessments</strong>, the same infrastructure Pearson uses for professional licensure.
            </li>
            <li>
              Every exam is <strong className="text-fd-foreground">proctored</strong>. You sit it
              under supervision.
            </li>
            <li>
              You <strong className="text-fd-foreground">validate your identity</strong> before the
              exam begins.
            </li>
            <li>
              Pass and you get a digital badge through{' '}
              <strong className="text-fd-foreground">Credly by Pearson</strong>.
            </li>
          </ul>
          <p className="mt-5 text-fd-muted-foreground leading-relaxed">
            Anthropic&rsquo;s framing is that certification represents validated capability rather
            than course attendance. That is the reason for the proctoring, and it is what separates
            these from the free course quizzes on Claude Academy.
          </p>
          <p className="mt-5 rounded-lg border border-fd-border bg-fd-muted/30 p-4 text-sm text-fd-muted-foreground">
            Anthropic has published no exam fee, no question count, no time limit, and no passing
            score for any of the four exams. If you read a specific number for those anywhere, it did
            not come from Anthropic.
          </p>
        </div>
      </section>

      <section className="border-b border-fd-border px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fd-border bg-fd-card">
              <Building2 className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-fd-foreground">
              The part that is hard to find out
            </h2>
          </div>
          <div className="space-y-4 text-fd-muted-foreground leading-relaxed">
            <p>
              Anthropic describes this programme entirely through the Claude Partner Network. Passing
              earns a <em>partner badge</em>. The free training platform named in the announcement is
              Anthropic Partner Academy, described as a platform for partners. Partner tier standing
              is calculated partly from how many certified practitioners a firm has.
            </p>
            <p>
              The demand is coming from firms, not individuals. Accenture has committed to 50,000
              certified professionals, PwC to 30,000, Capgemini, DXC and UST to 20,000 each, Deloitte
              and KPMG to 15,000 each. Ascendion plans to certify its entire 8,000-person engineering
              team before 2027.
            </p>
            <p>
              So if you searched for a price and a sign-up button and found neither, nothing is wrong
              with your search. As of this writing there is no public self-enrolment route, and
              Anthropic has not said whether one is planned.
            </p>
            <p className="text-fd-foreground">
              If you work at a partner firm, your enablement or practice lead owns the enrolment
              path. Ask them, not Anthropic support.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-fd-border px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fd-border bg-fd-card">
              <BookOpen className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-fd-foreground">
              Learning the material without the badge
            </h2>
          </div>
          <p className="mb-5 text-fd-muted-foreground leading-relaxed">
            The credential is gated. The material largely is not. Anthropic&rsquo;s own free courses
            sit at{' '}
            <a
              href="https://academy.claude.com"
              className="inline-flex items-center gap-1 underline hover:text-fd-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claude Academy <ExternalLink className="h-3 w-3" />
            </a>
            , and cover AI fluency, the Claude API, and each product surface. For the areas the
            Developer and Architect tracks name, these pages go deeper:
          </p>
          <ul className="space-y-2 text-fd-muted-foreground">
            <li>
              <Link href="/docs/foundations/which-interface" className="underline hover:text-fd-foreground">
                Which Claude surface for which job
              </Link>{' '}
              covers the ground the Associate credential calls everyday practical use.
            </li>
            <li>
              <Link href="/docs/patterns/mcp-servers" className="underline hover:text-fd-foreground">
                MCP servers
              </Link>{' '}
              and{' '}
              <Link href="/docs/foundations/claude-md" className="underline hover:text-fd-foreground">
                CLAUDE.md
              </Link>{' '}
              cover tool use and agent context, named under the Developer track.
            </li>
            <li>
              <Link href="/docs/patterns/skills" className="underline hover:text-fd-foreground">
                Skills
              </Link>{' '}
              and{' '}
              <Link href="/workflow" className="underline hover:text-fd-foreground">
                agent workflows
              </Link>{' '}
              cover agent system design, named under the Architect track.
            </li>
          </ul>
        </div>
      </section>

      <section className="border-b border-fd-border px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-fd-foreground">Common questions</h2>
          <dl className="mt-6 space-y-6">
            {FAQ.map((f) => (
              <div key={f.question}>
                <dt className="font-display text-base font-semibold text-fd-foreground">
                  {f.question}
                </dt>
                <dd className="mt-2 text-fd-muted-foreground leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-fd-border px-6 py-10">
        <div className="mx-auto max-w-3xl text-sm text-fd-muted-foreground">
          <p>
            Every fact on this page comes from Anthropic&rsquo;s announcement,{' '}
            <a
              href={SOURCE_URL}
              className="inline-flex items-center gap-1 underline hover:text-fd-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Four role-based certifications for the people who put Claude to work for customers
              <ExternalLink className="h-3 w-3" />
            </a>
            , published {SOURCE_DATE}, read in full. Where Anthropic has not stated something, this
            page says so rather than filling the gap.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-20">
        <EmailCapture placement="certification-footer" />
      </div>
    </main>
  );
}
