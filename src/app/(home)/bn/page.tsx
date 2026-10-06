import type { Metadata } from 'next';
import { existsSync } from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Terminal, FileText, Zap, Globe } from 'lucide-react';
import type { ChatStep } from '@/components/app-chat-demo';
import { ClaudeDesktopCodeMock } from '@/components/claude-desktop-code-mock';
import { chatToSession } from '@/lib/chat-session';
import { SceneFooterBand } from '@/components/scene-footer-band';
import { SceneBackdrop } from '@/components/scene-backdrop';

import { KineticText } from '@/components/kinetic-text';
import { ogImage } from '@/lib/og/image';
import { BN_TUTORIALS } from '@/lib/i18n/bn/tutorials';
import { BN_DESIGNER_GUIDES } from '@/lib/i18n/bn/designer-guides';
/**
 * Search sends this page 564 impressions a month at position 8.7, its best
 * position on the site, against 9 clicks. The queries arrive in both scripts:
 * `claude bangla` and `claude code` alongside `ক্লদ` and `claude কি`. The
 * title carried no Latin-script "Bangla", so half the demand saw nothing it
 * recognised. Canonical added at the same time; the page had none.
 */
export const metadata: Metadata = {
  title: { absolute: 'Claude Code গাইড : বাংলায় | Claude Code in Bangla' },
  description:
    'Claude Code শিখুন বাংলায়। ইনস্টলেশন, সেটআপ, এবং প্রথম প্রজেক্ট তৈরি করুন। কোনো পূর্ব অভিজ্ঞতা লাগবে না। A complete Claude Code guide in Bangla.',
  alternates: { canonical: 'https://claudecodeguide.dev/bn' },
  openGraph: {
    images: [ogImage('bn', 'Claude Code in Bangla')],
    title: 'Claude Code গাইড : বাংলায় | Claude Code in Bangla',
    description: 'Claude Code শিখুন বাংলায়। ইনস্টলেশন থেকে প্রথম প্রজেক্ট পর্যন্ত।',
    type: 'article',
    url: 'https://claudecodeguide.dev/bn',
  },
};

/** The Code tab of the Claude desktop app, the same mock the tutorials use. Its transcript is plain text, so backticks are dropped. */
function AppDemo({ folder, steps }: { folder: string; steps: ChatStep[] }) {
  const first = steps.find((s) => s.role === 'user')?.text ?? '';
  const title = first.length > 42 ? `${first.slice(0, 40).trimEnd()}…` : first;
  return (
    <div className="mt-8">
      <ClaudeDesktopCodeMock
        steps={chatToSession(steps.map((s) => ({ ...s, text: s.text.replace(/`/g, '') })))}
        title={title}
        folder={folder}
      />
    </div>
  );
}

/** A card gets the painted scene only when public/<dir>/<slug>.jpg exists, same rule as /tutorials. */
function cardImage(dir: 'tutorials' | 'for-designers', slug: string): string | undefined {
  const file = path.join(process.cwd(), 'public', dir, `${slug}.jpg`);
  return existsSync(file) ? `/${dir}/${slug}.jpg` : undefined;
}

function GuideCard({
  href,
  image,
  title,
  duration,
  description,
}: {
  href: string;
  image?: string;
  title: string;
  duration: string;
  description: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] transition-colors hover:border-[var(--acc)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
      >
        {image && (
          <span className="relative block aspect-[2/1] overflow-hidden">
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 640px) 370px, 100vw"
              className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
            />
          </span>
        )}
        <span className="flex flex-1 flex-col gap-1.5 p-4">
          <span className="font-mono text-xs text-fd-muted-foreground">{duration}</span>
          <span className="font-medium leading-snug text-fd-foreground group-hover:text-[var(--acc)]">{title}</span>
          <span className="line-clamp-2 text-sm leading-relaxed text-fd-muted-foreground">{description}</span>
        </span>
      </Link>
    </li>
  );
}

export default function BengaliGuidePage() {
  return (
    <main lang="bn" className="min-h-screen">
      <SceneBackdrop variant="faded" scene="delta" className="scene--reading" />
      {/* Hero */}
      <section className="border-b border-fd-border px-6 py-16 text-center sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] px-4 py-2 text-base text-fd-muted-foreground">
            <Globe className="h-4 w-4" />
            বাংলায় পড়ুন
          </div>
          <h1 className="font-display text-display-article leading-[1.1] font-semibold tracking-[-0.035em] text-fd-foreground">
            <KineticText>Claude Code কী এবং কীভাবে শুরু করবেন</KineticText>
          </h1>
          <p className="hm-rise mt-4 text-lead text-fd-muted-foreground">
            আপনি যদি ChatGPT ব্যবহার করে থাকেন, তাহলে Claude Code বুঝতে পারবেন।
            এটি আপনার কম্পিউটারে বসে কাজ করে, ফাইল পড়ে, কোড লেখে, কমান্ড চালায়।
          </p>
          <p className="mt-2 text-sm text-fd-muted-foreground">
            <Link href="/" className="underline hover:text-fd-foreground">
              English version
            </Link>{' '}
            | এই পৃষ্ঠাটি বাংলায় অনুবাদ করা হয়েছে
          </p>
        </div>
      </section>

      {/* Section 1: What is Claude Code */}
      <section className="border-b border-fd-border px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] border border-fd-border">
              <Terminal className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-fd-foreground tracking-[-0.035em]">
              Claude Code কী?
            </h2>
          </div>

          <div className="space-y-4 text-fd-muted-foreground leading-relaxed">
            <p>
              <strong className="text-fd-foreground">Claude Code হলো একটি AI যেটি আপনার কম্পিউটারে থাকে।</strong>{' '}
              এটি আপনার ফাইল পড়তে পারে, কোড লিখতে পারে, কমান্ড চালাতে পারে, এবং ওয়েব ব্রাউজ করতে পারে।
              আপনি সাধারণ বাংলা বা ইংরেজিতে বলবেন, এটি কাজ করবে।
            </p>
            <p>
              ChatGPT যদি এমন কেউ হয় যাকে আপনি মেসেজ করে পরামর্শ নেন, তাহলে Claude Code হলো
              এমন একজন সহকর্মী যে আপনার পাশে বসে আপনার আসল প্রজেক্টে কাজ করতে পারে।
            </p>
          </div>

          <AppDemo
            folder="my-resume"
            steps={[
              { role: 'user', text: 'আমার resume দিয়ে একটা website বানিয়ে দিন।' },
              {
                role: 'claude',
                text: 'ঠিক আছে, আপনার folder-এর resume পড়ে নিলাম। দুটা file বানিয়েছি:\n\n- `index.html`\n- `styles.css`\n\nWebsite তৈরি হয়ে গেছে। `index.html` খুলে দেখুন। এগুলো আপনার computer-এ আসল file হিসেবে save হয়েছে।',
              },
            ]}
          />

          <div className="mt-8 overflow-hidden rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fd-border bg-[var(--code)]">
                  <th className="px-4 py-3 text-left font-medium text-fd-foreground"></th>
                  <th className="px-4 py-3 text-left font-medium text-fd-foreground">ChatGPT</th>
                  <th className="px-4 py-3 text-left font-medium text-fd-foreground">Claude Code</th>
                </tr>
              </thead>
              <tbody className="text-fd-muted-foreground">
                <tr className="border-b border-fd-border">
                  <td className="px-4 py-3 font-medium text-fd-foreground">কোথায় চলে</td>
                  <td className="px-4 py-3">ব্রাউজারে</td>
                  <td className="px-4 py-3">আপনার কম্পিউটারে</td>
                </tr>
                <tr className="border-b border-fd-border">
                  <td className="px-4 py-3 font-medium text-fd-foreground">কী দেখতে পায়</td>
                  <td className="px-4 py-3">শুধু যা পেস্ট করেন</td>
                  <td className="px-4 py-3">পুরো প্রজেক্ট ফোল্ডার</td>
                </tr>
                <tr className="border-b border-fd-border">
                  <td className="px-4 py-3 font-medium text-fd-foreground">কী করতে পারে</td>
                  <td className="px-4 py-3">টেক্সট উত্তর দেয়</td>
                  <td className="px-4 py-3">ফাইল পড়ে, লেখে, কমান্ড চালায়</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-fd-foreground">সেরা যেটির জন্য</td>
                  <td className="px-4 py-3">প্রশ্ন ও ব্রেইনস্টর্মিং</td>
                  <td className="px-4 py-3">আসল জিনিস তৈরি করা</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 2: Installation */}
      <section className="border-b border-fd-border px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] border border-fd-border">
              <Zap className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-fd-foreground tracking-[-0.035em]">
              কীভাবে ইনস্টল করবেন
            </h2>
          </div>

          <div className="space-y-4 text-fd-muted-foreground leading-relaxed">
            <p>
              <strong className="text-fd-foreground">যা লাগবে:</strong> একটি কম্পিউটার (Mac বা Windows),
              ইন্টারনেট সংযোগ, এবং একটি paid Claude account। কোনো terminal বা command লাগবে না।
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lead font-semibold text-fd-foreground">ধাপ ১: Claude app download করুন</h3>
            <p className="text-fd-muted-foreground">
              <a
                href="https://claude.ai/download"
                className="underline hover:text-fd-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                claude.ai/download
              </a>{' '}
              এ যান। Mac হলে &ldquo;Download for Mac&rdquo; চাপুন, তারপর .dmg file খুলে Claude-কে Applications folder-এ drag করুন।
              Windows হলে &ldquo;Download for Windows&rdquo; চাপুন, তারপর .exe installer চালিয়ে screen-এর কথামতো এগোন।
            </p>

            <h3 className="text-lead font-semibold text-fd-foreground">ধাপ ২: app খুলে sign in করুন</h3>
            <p className="text-fd-muted-foreground">
              Mac-এ Applications থেকে, Windows-এ Start menu থেকে Claude খুলুন। তারপর আপনার account দিয়ে sign in করুন।
            </p>

            <h3 className="text-lead font-semibold text-fd-foreground">ধাপ ৩: Code tab-এ একটা folder দিন</h3>
            <p className="text-fd-muted-foreground">
              app-এর ভেতরে Code tab খুলুন, আর যে folder-এ কাজ করতে চান সেটা বেছে নিন। তারপর সাধারণ বাংলায় বলুন আপনি কী চান।
            </p>
            <AppDemo
              folder="my-project"
              steps={[
                { role: 'user', text: 'এই folder-এ কী কী আছে, short করে বুঝিয়ে দিন।' },
                {
                  role: 'claude',
                  text: 'আপনার folder-এ তিনটা জিনিস আছে:\n\n- `resume.pdf`: আপনার resume\n- `notes.txt`: কিছু ছোট note\n- `photos`: ১২টা ছবি\n\nএরপর কী করব?',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Section 3: CLAUDE.md */}
      <section className="border-b border-fd-border px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] border border-fd-border">
              <FileText className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-fd-foreground tracking-[-0.035em]">
              CLAUDE.md: সবচেয়ে গুরুত্বপূর্ণ ফাইল
            </h2>
          </div>

          <div className="space-y-4 text-fd-muted-foreground leading-relaxed">
            <p>
              CLAUDE.md হলো একটি সাধারণ টেক্সট ফাইল যা Claude Code কে বলে দেয় কীভাবে কাজ করতে হবে।
              এটি ছাড়া, Claude Code অনুমান করে। এটি থাকলে, Claude Code জানে আপনার প্রজেক্ট কী,
              আপনি কী চান, এবং কোন ভুলগুলো এড়াতে হবে।
            </p>
            <p>
              <strong className="text-fd-foreground">সবচেয়ে সহজ উপায়:</strong>{' '}
              Claude-কে বলুন আপনার project দেখে একটা CLAUDE.md বানিয়ে দিতে। Claude আপনার project পড়ে নিজেই file-টা তৈরি করে দেবে।
            </p>
          </div>

          <AppDemo
            folder="my-project"
            steps={[
              { role: 'user', text: 'আমার project-এর জন্য একটা CLAUDE.md বানিয়ে দিন।' },
              {
                role: 'claude',
                text: 'আপনার project দেখে নিলাম। এটা Next.js, TypeScript আর Tailwind CSS দিয়ে বানানো। `CLAUDE.md` বানিয়ে দিয়েছি।\n\nএখন থেকে প্রতিটা session-এর শুরুতে Claude এই file পড়ে নেবে।',
              },
            ]}
          />

          <div className="mt-8 rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] p-6">
            <h3 className="mb-3 text-lead font-semibold text-fd-foreground">
              CLAUDE.md এ কী থাকে?
            </h3>
            <ul className="space-y-2 text-fd-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--acc)]" />
                <span><strong className="text-fd-foreground">প্রজেক্টের তথ্য:</strong> কোন ভাষা, কোন ফ্রেমওয়ার্ক, কোথায় ডিপ্লয় হয়</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--acc)]" />
                <span><strong className="text-fd-foreground">আপনার পছন্দ:</strong> কোডিং স্টাইল, আউটপুট ফরম্যাট, যোগাযোগের ধরন</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--acc)]" />
                <span><strong className="text-fd-foreground">নিয়ম:</strong> কোন ভুলগুলো এড়াতে হবে, কীভাবে টেস্ট করতে হবে</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--acc)]" />
                <span><strong className="text-fd-foreground">সেশন লাইফসাইকেল:</strong> কীভাবে শুরু এবং শেষ করতে হবে</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="border-b border-fd-border px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-fd-foreground tracking-[-0.035em]">
            বাংলা টিউটোরিয়াল
          </h2>
          <p className="mt-3 text-fd-muted-foreground">
            প্রতিটা টিউটোরিয়াল বাংলায় পড়তে পারবেন। প্রতিটা পেজের উপরে English-এ যাওয়ার switch আছে।
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {Object.entries(BN_TUTORIALS).map(([slug, t]) =>
              t ? (
                <GuideCard
                  key={slug}
                  href={`/bn/tutorials/${slug}`}
                  image={cardImage('tutorials', slug)}
                  title={t.content.title}
                  duration={t.content.duration}
                  description={t.content.description}
                />
              ) : null,
            )}
          </ul>

          <h2 className="mt-12 font-display text-2xl font-semibold text-fd-foreground tracking-[-0.035em]">
            Designer-দের জন্য গাইড
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {Object.entries(BN_DESIGNER_GUIDES).map(([slug, g]) =>
              g ? (
                <GuideCard
                  key={slug}
                  href={`/bn/for-designers/${slug}`}
                  image={cardImage('for-designers', slug)}
                  title={g.content.title}
                  duration={g.content.duration}
                  description={g.content.description}
                />
              ) : null,
            )}
          </ul>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-fd-foreground tracking-[-0.035em]">
            এরপর কী করবেন?
          </h2>
          <p className="mt-3 text-fd-muted-foreground">
            গাইডের বাকি অংশ এখনও ইংরেজিতে আছে। আমরা ধীরে ধীরে আরও বাংলা কন্টেন্ট যোগ করছি।
            নিচের লিংকগুলো দিয়ে শুরু করুন:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/guide"
              className="group flex items-center justify-between rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] p-4 transition-colors hover:bg-[var(--code)]"
            >
              <div>
                <p className="font-medium text-fd-foreground">Interactive Guide</p>
                <p className="text-sm text-fd-muted-foreground">ধাপে ধাপে সেটআপ গাইড</p>
              </div>
              <ArrowRight className="h-4 w-4 text-fd-muted-foreground transition-transform motion-reduce:transition-none group-hover:translate-x-1" />
            </Link>
            <Link
              href="/tutorials"
              className="group flex items-center justify-between rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] p-4 transition-colors hover:bg-[var(--code)]"
            >
              <div>
                <p className="font-medium text-fd-foreground">Tutorials</p>
                <p className="text-sm text-fd-muted-foreground">হাতে-কলমে টিউটোরিয়াল (English)</p>
              </div>
              <ArrowRight className="h-4 w-4 text-fd-muted-foreground transition-transform motion-reduce:transition-none group-hover:translate-x-1" />
            </Link>
            <Link
              href="/docs/foundations/what-is-claude-code"
              className="group flex items-center justify-between rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] p-4 transition-colors hover:bg-[var(--code)]"
            >
              <div>
                <p className="font-medium text-fd-foreground">What is Claude Code?</p>
                <p className="text-sm text-fd-muted-foreground">বিস্তারিত ইংরেজি ভার্সন</p>
              </div>
              <ArrowRight className="h-4 w-4 text-fd-muted-foreground transition-transform motion-reduce:transition-none group-hover:translate-x-1" />
            </Link>
            <Link
              href="/docs/foundations/claude-md"
              className="group flex items-center justify-between rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] p-4 transition-colors hover:bg-[var(--code)]"
            >
              <div>
                <p className="font-medium text-fd-foreground">CLAUDE.md Guide</p>
                <p className="text-sm text-fd-muted-foreground">বিস্তারিত CLAUDE.md গাইড</p>
              </div>
              <ArrowRight className="h-4 w-4 text-fd-muted-foreground transition-transform motion-reduce:transition-none group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 rounded-xl border border-fd-border bg-[var(--code)] p-6 text-center">
            <p className="text-fd-muted-foreground">
              আরও বাংলা কন্টেন্ট চান?{' '}
              <a
                href="https://github.com/mshadmanrahman/claudecode-guide/issues"
                className="underline hover:text-fd-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub এ জানান
              </a>{' '}
              কোন পেজগুলো বাংলায় চান।
            </p>
          </div>
        </div>
      </section>
      <SceneFooterBand scene="delta" />
    </main>
  );
}
