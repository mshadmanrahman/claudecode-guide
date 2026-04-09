import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Terminal, FileText, Zap, Globe } from 'lucide-react';
import { DemoCard } from '@/components/demo-card';

export const metadata: Metadata = {
  title: 'Claude Code গাইড — বাংলায়',
  description:
    'Claude Code শিখুন বাংলায়। ইনস্টলেশন, সেটআপ, এবং প্রথম প্রজেক্ট তৈরি করুন। কোনো পূর্ব অভিজ্ঞতা লাগবে না।',
  openGraph: {
    title: 'Claude Code গাইড — বাংলায়',
    description: 'Claude Code শিখুন বাংলায়। ইনস্টলেশন থেকে প্রথম প্রজেক্ট পর্যন্ত।',
  },
};

export default function BengaliGuidePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-fd-border bg-fd-background px-6 py-16 text-center sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-4 py-1.5 text-sm text-fd-muted-foreground">
            <Globe className="h-4 w-4" />
            বাংলায় পড়ুন
          </div>
          <h1 className="font-newsreader text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
            Claude Code কী এবং কীভাবে শুরু করবেন
          </h1>
          <p className="mt-4 text-lg text-fd-muted-foreground">
            আপনি যদি ChatGPT ব্যবহার করে থাকেন, তাহলে Claude Code বুঝতে পারবেন।
            এটি আপনার কম্পিউটারে বসে কাজ করে — ফাইল পড়ে, কোড লেখে, কমান্ড চালায়।
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fd-card border border-fd-border">
              <Terminal className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-newsreader text-2xl font-bold text-fd-foreground">
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

          <DemoCard
            title="Claude Code ব্যবহারের উদাহরণ"
            steps={[
              { type: 'cmd', text: '"আমার রেজুমে দিয়ে একটি ওয়েবসাইট বানাও"' },
              { type: 'out', text: 'আপনার প্রজেক্ট ফোল্ডার পড়ছে...' },
              { type: 'out', text: 'index.html, styles.css তৈরি করছে...', delay: 400 },
              { type: 'success', text: 'ওয়েবসাইট তৈরি হয়ে গেছে! index.html খুলুন।', delay: 600 },
              {
                type: 'warn',
                text: 'এটি আপনার কম্পিউটারে সত্যিকারের ফাইল তৈরি করেছে।',
              },
            ]}
          />

          <div className="mt-8 overflow-hidden rounded-xl border border-fd-border bg-fd-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fd-border bg-fd-muted/30">
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fd-card border border-fd-border">
              <Zap className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-newsreader text-2xl font-bold text-fd-foreground">
              কীভাবে ইনস্টল করবেন
            </h2>
          </div>

          <div className="space-y-4 text-fd-muted-foreground leading-relaxed">
            <p>
              <strong className="text-fd-foreground">যা লাগবে:</strong> একটি কম্পিউটার (Mac, Windows, বা Linux),
              ইন্টারনেট সংযোগ, এবং একটি পেইড Anthropic অ্যাকাউন্ট।
            </p>
            <p>
              <strong className="text-fd-foreground">VS Code বা JetBrains ব্যবহার করেন?</strong>{' '}
              Extension marketplace এ &ldquo;Claude Code&rdquo; সার্চ করুন। টার্মিনাল লাগবে না।
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-fd-foreground">ধাপ ১: Node.js ইনস্টল করুন</h3>
            <p className="text-fd-muted-foreground">
              <a
                href="https://nodejs.org"
                className="underline hover:text-fd-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                nodejs.org
              </a>{' '}
              থেকে LTS ভার্সন ডাউনলোড করুন। ইনস্টলারে সব ডিফল্ট রাখুন, শুধু &ldquo;Next&rdquo; চাপতে থাকুন।
            </p>

            <h3 className="text-lg font-semibold text-fd-foreground">ধাপ ২: Claude Code ইনস্টল করুন</h3>
            <DemoCard
              title="ইনস্টলেশন কমান্ড"
              steps={[
                { type: 'cmd', text: 'npm install -g @anthropic-ai/claude-code' },
                { type: 'out', text: 'added 1 package in 4s' },
                { type: 'success', text: 'Claude Code ইনস্টল হয়ে গেছে!' },
              ]}
            />

            <h3 className="text-lg font-semibold text-fd-foreground">ধাপ ৩: প্রথমবার চালান</h3>
            <DemoCard
              title="প্রথম রান"
              steps={[
                { type: 'cmd', text: 'cd my-project' },
                { type: 'cmd', text: 'claude' },
                { type: 'out', text: 'Welcome to Claude Code!' },
                { type: 'out', text: '? How would you like to authenticate?' },
                {
                  type: 'success',
                  text: 'Log in with your Claude subscription  এটি বেছে নিন',
                },
                { type: 'out', text: 'ব্রাউজারে লগইন পেজ খুলবে...', delay: 500 },
                { type: 'success', text: 'লগইন সফল! Claude Code ব্যবহারের জন্য প্রস্তুত।' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Section 3: CLAUDE.md */}
      <section className="border-b border-fd-border px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fd-card border border-fd-border">
              <FileText className="h-5 w-5 text-fd-foreground" />
            </div>
            <h2 className="font-newsreader text-2xl font-bold text-fd-foreground">
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
              <code className="rounded bg-fd-muted px-1.5 py-0.5 text-sm font-mono">claude /init</code>{' '}
              কমান্ড চালান। Claude Code আপনার প্রজেক্ট স্ক্যান করে নিজেই CLAUDE.md তৈরি করে দেবে।
            </p>
          </div>

          <DemoCard
            title="CLAUDE.md তৈরি করুন"
            steps={[
              { type: 'cmd', text: 'claude /init' },
              { type: 'out', text: 'প্রজেক্ট স্ক্যান করছে...' },
              { type: 'out', text: 'Next.js, TypeScript, Tailwind CSS সনাক্ত করেছে', delay: 400 },
              { type: 'success', text: 'CLAUDE.md তৈরি হয়ে গেছে!', delay: 600 },
              { type: 'warn', text: 'এখন থেকে প্রতিটি সেশন এই ফাইল পড়ে শুরু হবে।' },
            ]}
          />

          <div className="mt-8 rounded-xl border border-fd-border bg-fd-card p-6">
            <h3 className="mb-3 text-lg font-semibold text-fd-foreground">
              CLAUDE.md এ কী থাকে?
            </h3>
            <ul className="space-y-2 text-fd-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fd-foreground" />
                <span><strong className="text-fd-foreground">প্রজেক্টের তথ্য:</strong> কোন ভাষা, কোন ফ্রেমওয়ার্ক, কোথায় ডিপ্লয় হয়</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fd-foreground" />
                <span><strong className="text-fd-foreground">আপনার পছন্দ:</strong> কোডিং স্টাইল, আউটপুট ফরম্যাট, যোগাযোগের ধরন</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fd-foreground" />
                <span><strong className="text-fd-foreground">নিয়ম:</strong> কোন ভুলগুলো এড়াতে হবে, কীভাবে টেস্ট করতে হবে</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fd-foreground" />
                <span><strong className="text-fd-foreground">সেশন লাইফসাইকেল:</strong> কীভাবে শুরু এবং শেষ করতে হবে</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-newsreader text-2xl font-bold text-fd-foreground">
            এরপর কী করবেন?
          </h2>
          <p className="mt-3 text-fd-muted-foreground">
            বাকি গাইড ইংরেজিতে আছে। আমরা ধীরে ধীরে আরও বাংলা কন্টেন্ট যোগ করছি।
            নিচের লিংকগুলো দিয়ে শুরু করুন:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/guide"
              className="group flex items-center justify-between rounded-xl border border-fd-border bg-fd-card p-4 transition-colors hover:bg-fd-muted/50"
            >
              <div>
                <p className="font-medium text-fd-foreground">Interactive Guide</p>
                <p className="text-sm text-fd-muted-foreground">ধাপে ধাপে সেটআপ গাইড</p>
              </div>
              <ArrowRight className="h-4 w-4 text-fd-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/tutorials"
              className="group flex items-center justify-between rounded-xl border border-fd-border bg-fd-card p-4 transition-colors hover:bg-fd-muted/50"
            >
              <div>
                <p className="font-medium text-fd-foreground">Tutorials</p>
                <p className="text-sm text-fd-muted-foreground">১৫টি হাতে-কলমে টিউটোরিয়াল</p>
              </div>
              <ArrowRight className="h-4 w-4 text-fd-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/docs/foundations/what-is-claude-code"
              className="group flex items-center justify-between rounded-xl border border-fd-border bg-fd-card p-4 transition-colors hover:bg-fd-muted/50"
            >
              <div>
                <p className="font-medium text-fd-foreground">What is Claude Code?</p>
                <p className="text-sm text-fd-muted-foreground">বিস্তারিত ইংরেজি ভার্সন</p>
              </div>
              <ArrowRight className="h-4 w-4 text-fd-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/docs/foundations/claude-md"
              className="group flex items-center justify-between rounded-xl border border-fd-border bg-fd-card p-4 transition-colors hover:bg-fd-muted/50"
            >
              <div>
                <p className="font-medium text-fd-foreground">CLAUDE.md Guide</p>
                <p className="text-sm text-fd-muted-foreground">বিস্তারিত CLAUDE.md গাইড</p>
              </div>
              <ArrowRight className="h-4 w-4 text-fd-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 rounded-xl border border-fd-border bg-fd-muted/30 p-6 text-center">
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
    </main>
  );
}
