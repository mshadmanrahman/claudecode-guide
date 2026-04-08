'use client';

import Link from 'next/link';
import { ArrowRight, Play, Hammer, Sparkles, Briefcase, Rocket, Clock, TreePine, Network, Newspaper, Star, Lightbulb, BarChart2, BookOpen, Layout, Target, DollarSign, Monitor } from 'lucide-react';
import { DemoCard } from '@/components/demo-card';
import { EmailCapture } from '@/components/email-capture';

// metadata moved to layout or handled by page title

interface TutorialCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate';
  outcome: string;
  href: string;
  icon: React.ReactNode;
  available: boolean;
}

function TutorialCard({ title, description, duration, difficulty, outcome, href, icon, available }: TutorialCardProps) {
  const content = (
    <div className={`group relative flex flex-col gap-4 rounded-xl border border-fd-border bg-fd-card p-6 transition-all ${available ? 'hover:border-fd-muted-foreground/30 hover:bg-fd-accent cursor-pointer' : ''}`}>
      {/* Badge row */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-fd-accent px-2.5 py-1 text-[11px] font-medium text-fd-muted-foreground">
          <Clock className="h-3 w-3" />
          {duration}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${difficulty === 'beginner' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'}`}>
          {difficulty}
        </span>
        {!available && (
          <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
            coming soon
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-muted-foreground">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-fd-foreground group-hover:underline">{title}</h3>
          <p className="mt-1 text-sm text-fd-muted-foreground">{description}</p>
        </div>
        {available && (
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      {/* Outcome */}
      <div className="rounded-lg border border-fd-border bg-fd-background px-4 py-2.5">
        <p className="text-xs font-medium text-fd-muted-foreground">
          What you&apos;ll have at the end:
        </p>
        <p className="mt-0.5 text-sm text-fd-foreground">{outcome}</p>
      </div>
    </div>
  );

  if (available) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

export default function TutorialsPage() {
  return (
    <div className="flex flex-col bg-fd-background">
      {/* Hero */}
      <section className="mx-auto w-full max-w-4xl px-6 pt-16 pb-12 text-center">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-fd-accent px-3 py-1 text-xs font-medium text-fd-muted-foreground">
            <Play className="h-3 w-3" />
            Hands-on learning
          </span>
        </div>
        <h1 className="font-display text-4xl font-normal tracking-tight text-fd-foreground sm:text-5xl">
          Stop reading. Start building.
        </h1>
        <p className="mt-4 text-lg text-fd-muted-foreground max-w-2xl mx-auto">
          Each tutorial is a guided micro-project. You&apos;ll paste commands, see real output, and walk away with something that works. 5-15 minutes each.
        </p>

        <div className="mt-8 mx-auto max-w-xl text-left">
          <DemoCard title="What a tutorial feels like" loop={true} steps={[
            { type: 'cmd', text: 'claude' },
            { type: 'success', text: '✓ Claude Code ready' },
            { type: 'cmd', text: '"Create a landing page for my portfolio"', delay: 800 },
            { type: 'out', text: 'Planning: hero section, about, projects grid, contact...' },
            { type: 'success', text: '✓ Created index.html (beautiful gradient design)' },
            { type: 'success', text: '✓ Created styles.css (responsive, dark mode)' },
            { type: 'cmd', text: '"deploy it"', delay: 800 },
            { type: 'success', text: '✓ Deployed to https://your-site.vercel.app' },
            { type: 'warn', text: '→ From zero to live website. That\'s one tutorial.' },
          ]} />
        </div>
      </section>

      {/* Tutorials grid */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24">
        <div className="mb-8">
          <h2 className="font-display text-xl font-normal tracking-tight text-fd-foreground">
            Start here
          </h2>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            No experience needed. Just a terminal and a Claude subscription.
          </p>
        </div>

        <div className="grid gap-4">
          <TutorialCard
            title="Build Your First CLAUDE.md in 5 Minutes"
            description="The single most important thing you can do. Create the file that turns Claude Code from generic to personalized."
            duration="5 min"
            difficulty="beginner"
            outcome="A working CLAUDE.md that knows your project, your stack, and your preferences."
            href="/tutorials/your-first-claude-md"
            icon={<Hammer className="h-5 w-5" />}
            available={true}
          />

          <TutorialCard
            title="Ship a Landing Page in 30 Minutes"
            description="Go from empty folder to a live website on the internet. No coding experience required."
            duration="30 min"
            difficulty="beginner"
            outcome="A deployed website on Vercel that you built with Claude Code."
            href="/tutorials/ship-a-landing-page"
            icon={<Rocket className="h-5 w-5" />}
            available={true}
          />

          <TutorialCard
            title="Create Your First Skill"
            description="Turn a task you do every week into a single command. Copy, paste, done."
            duration="10 min"
            difficulty="beginner"
            outcome="A reusable /skill command that automates a real task in your workflow."
            href="/tutorials/your-first-skill"
            icon={<Sparkles className="h-5 w-5" />}
            available={true}
          />
        </div>

        <div className="mt-12 mb-8">
          <h2 className="font-display text-xl font-normal tracking-tight text-fd-foreground">
            New features
          </h2>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            The latest Claude Code capabilities. Try these if you want to see what&apos;s new.
          </p>
        </div>

        <div className="grid gap-4">
          <TutorialCard
            title="Let Claude See Your Screen in 5 Minutes"
            description="Claude can now look at your screen, click buttons, and navigate apps. No setup. The feature that makes non-coders say 'wait, WHAT?'"
            duration="5 min"
            difficulty="beginner"
            outcome="Claude seeing your screen and interacting with your apps. You'll never describe a visual bug in words again."
            href="/tutorials/computer-use"
            icon={<Monitor className="h-5 w-5" />}
            available={true}
          />
        </div>

        <div className="mt-12 mb-8">
          <h2 className="font-display text-xl font-normal tracking-tight text-fd-foreground">
            No terminal required
          </h2>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            These run entirely in the Claude.ai web app. Just open a tab and paste a prompt.
          </p>
        </div>

        <div className="grid gap-4">
          <TutorialCard
            title="Build a Stakeholder Map in 15 Minutes"
            description="Turn a messy list of names and roles into a structured stakeholder map, communication plan, and outreach messages."
            duration="15 min"
            difficulty="beginner"
            outcome="A stakeholder map, weekly communication plan, and a drafted outreach message — ready to paste into Notion."
            href="/tutorials/stakeholder-map"
            icon={<Network className="h-5 w-5" />}
            available={true}
          />

          <TutorialCard
            title="Automate Your Newsletter in 10 Minutes"
            description="Feed Claude your sources — URLs, topics, or tweets — and get a formatted newsletter draft ready to send."
            duration="10 min"
            difficulty="beginner"
            outcome="A full newsletter draft formatted for Substack or Beehiiv, plus a reusable prompt for every future issue."
            href="/tutorials/newsletter-automator"
            icon={<Newspaper className="h-5 w-5" />}
            available={true}
          />
        </div>

        <div className="mt-12 mb-8">
          <h2 className="font-display text-xl font-normal tracking-tight text-fd-foreground">
            For Product Managers
          </h2>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            You don&apos;t need to write code. These workflows are built for how PMs actually work.
          </p>
        </div>

        <div className="grid gap-4">
          <TutorialCard
            title="Product Discovery with Opportunity Solution Trees"
            description="Use Teresa Torres' OST framework to go from raw customer interviews to validated experiments. No sticky notes required."
            duration="20 min"
            difficulty="intermediate"
            outcome="A living Opportunity Solution Tree with mapped opportunities, solutions, and experiment designs — built from real interview data."
            href="/tutorials/product-discovery-ost"
            icon={<TreePine className="h-5 w-5" />}
            available={true}
          />

          <TutorialCard
            title="Turn Meeting Notes into Jira Tickets"
            description="Paste your messy meeting notes. Get structured tickets with acceptance criteria. Never transcribe by hand again."
            duration="15 min"
            difficulty="intermediate"
            outcome="A skill that converts meeting notes into formatted Jira tickets automatically."
            href="/tutorials/meeting-to-jira"
            icon={<Briefcase className="h-5 w-5" />}
            available={true}
          />

          <TutorialCard
            title="Build a Weekly Status Report Generator"
            description="Pull from your projects and generate a stakeholder-ready status report in seconds."
            duration="15 min"
            difficulty="intermediate"
            outcome="A /weekly-status skill that generates your report from real data sources."
            href="/tutorials/weekly-status"
            icon={<Briefcase className="h-5 w-5" />}
            available={true}
          />

          <TutorialCard
            title="Run a Competitive Analysis in 30 Minutes"
            description="Feed Claude your product and competitor info. Get a structured matrix and clear positioning gaps."
            duration="30 min"
            difficulty="intermediate"
            outcome="A comparison matrix, positioning gap analysis, and a strategic recommendation ready to share."
            href="/tutorials/competitive-analysis"
            icon={<BarChart2 className="h-5 w-5" />}
            available={true}
          />

          <TutorialCard
            title="Turn Any Decision into a Clear Memo"
            description="Brain dump a messy decision. Get a structured memo with options, recommendation, and risks."
            duration="15 min"
            difficulty="intermediate"
            outcome="A decision memo ready for stakeholder review — problem, options, recommendation, risk register."
            href="/tutorials/decision-memo"
            icon={<Lightbulb className="h-5 w-5" />}
            available={true}
          />
        </div>

        <div className="mt-12 mb-8">
          <h2 className="font-display text-xl font-normal tracking-tight text-fd-foreground">
            For everyone
          </h2>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            No code, no terminal. Useful for anyone who works with documents, data, and other people.
          </p>
        </div>

        <div className="grid gap-4">
          <TutorialCard
            title="Write a Performance Review in 20 Minutes"
            description="Paste your messy notes about a team member. Get a structured, balanced, specific review ready to submit."
            duration="20 min"
            difficulty="beginner"
            outcome="A complete performance review across all dimensions — ready to copy into your HR system."
            href="/tutorials/performance-review"
            icon={<Star className="h-5 w-5" />}
            available={true}
          />

          <TutorialCard
            title="Turn 5 Articles into a Research Briefing Doc"
            description="Paste your sources. Get a structured briefing with key insights, tensions, and implications."
            duration="15 min"
            difficulty="beginner"
            outcome="A one-page briefing doc ready to share with your team or leadership — sourced, synthesised, and clear."
            href="/tutorials/research-briefing"
            icon={<BookOpen className="h-5 w-5" />}
            available={true}
          />

          <TutorialCard
            title="Build a Slide Deck Outline in 15 Minutes"
            description="Tell Claude your goal and content. Get a narrative arc, slide-by-slide outline, and speaker notes."
            duration="15 min"
            difficulty="beginner"
            outcome="A complete deck outline with a clear narrative and speaker notes — before you open PowerPoint."
            href="/tutorials/slide-deck-outline"
            icon={<Layout className="h-5 w-5" />}
            available={true}
          />

          <TutorialCard
            title="Build a Job Application Assistant"
            description="Paste the job description and your background. Get a match analysis, tailored cover letter, and interview prep."
            duration="20 min"
            difficulty="beginner"
            outcome="A tailored cover letter and answers to the top 3 interview questions — specific to the role."
            href="/tutorials/job-application-assistant"
            icon={<Target className="h-5 w-5" />}
            available={true}
          />

          <TutorialCard
            title="Build a Personal Finance Manager"
            description="Paste your spending data. Get a breakdown, honest analysis, savings plan, and monthly review template."
            duration="20 min"
            difficulty="beginner"
            outcome="A realistic savings plan with specific targets and a monthly review routine you'll actually follow."
            href="/tutorials/personal-finance-manager"
            icon={<DollarSign className="h-5 w-5" />}
            available={true}
          />
        </div>

        {/* Email capture CTA */}
        <div className="mt-16 space-y-6">
          <div className="rounded-xl border border-fd-border bg-fd-card p-10 text-center">
            <h2 className="font-display text-2xl font-normal tracking-tight text-fd-foreground">
              Want more tutorials?
            </h2>
            <p className="mt-3 text-fd-muted-foreground max-w-lg mx-auto">
              New tutorials drop regularly. Subscribe to get notified when they land.
            </p>
            <div className="mt-6 mx-auto max-w-md">
              <EmailCapture />
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Or try the 9-step Interactive Guide
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
