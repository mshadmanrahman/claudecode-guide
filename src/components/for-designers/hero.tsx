'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { DemoCard } from '@/components/demo-card';
import { FloatingCard } from '@/components/floating-card';
import { Paintbrush, Clock, CheckCircle2 } from 'lucide-react';
import { EmailCapture } from '@/components/email-capture';
import { trackEvent } from '@/lib/analytics';

const HERO_STEPS = [
  { type: 'cmd' as const, text: 'I just received a brief: "redesign the checkout flow to be more modern"' },
  { type: 'out' as const, text: 'Reading your working agreement...' },
  { type: 'out' as const, text: 'You design for first-time mobile users on low-end Android.' },
  { type: 'out' as const, text: 'Handing off to a React team. Mobile-first. Low bandwidth context.' },
  { type: 'success' as const, text: '── 8 questions before you open Figma ──' },
  { type: 'out' as const, text: '1. What is "modern" trying to solve -- conversion rate, trust, or something else?' },
  { type: 'out' as const, text: '2. What does the current drop-off data show? Where are users leaving?' },
  { type: 'out' as const, text: '3. Are there payment methods specific to this market (bKash, mobile money)?' },
  { type: 'out' as const, text: '4. What is the minimum data needed at each step on a 3G connection?' },
  { type: 'out' as const, text: '5. Is "modern" a visual ask or an experience ask? Who said it and why?' },
  { type: 'success' as const, text: 'Get answers to these before sketching anything.' },
];

export function DesignerHero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
  }, []);

  return (
    <section
      className="relative mx-auto max-w-5xl px-6 pt-32 pb-12"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40 pointer-events-none" />

      <div
        ref={glowRef}
        className={`pointer-events-none absolute h-[400px] w-[400px] rounded-full transition-opacity duration-700 blur-[120px] ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(120,120,120,0.12) 0%, rgba(120,120,120,0.04) 40%, transparent 70%)',
          top: 0,
          left: 0,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Paintbrush className="h-4 w-4 text-fd-muted-foreground" />
          <span className="text-sm font-medium text-fd-muted-foreground uppercase tracking-widest">
            For designers
          </span>
        </div>

        <h1 className="animate-slide-up-fade font-serif text-5xl font-medium tracking-tight text-fd-foreground sm:text-6xl lg:text-7xl leading-[1.1]">
          AI for UX.
          <br />
          <span className="text-fade">Not for developers.</span>
        </h1>

        <p className="animate-slide-up-fade delay-100 mt-8 max-w-xl text-lg text-fd-muted-foreground leading-relaxed">
          Task-oriented guides built around what designers actually do. Decode briefs, run evaluations, synthesize research, and hand off to code. Eight guides for Claude.ai and Co-Work. Eleven with Claude Code.
        </p>

        <div className="animate-slide-up-fade delay-200 mt-10 flex items-center gap-4">
          <Link
            href="/for-designers/set-up-claude"
            onClick={() => trackEvent('designer_hero_cta_click', { cta: 'start_guide_1', section: 'for-designers' })}
            className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            Start with Guide 1
          </Link>
          <Link
            href="#guides"
            onClick={() => trackEvent('designer_hero_cta_click', { cta: 'browse_guides', section: 'for-designers' })}
            className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-6 py-3 text-sm font-medium text-fd-foreground hover:bg-fd-accent transition-colors"
          >
            Browse guides by path
          </Link>
        </div>

        <div className="animate-slide-up-fade delay-250 mt-10 max-w-md">
          <EmailCapture placement="for-designers-hero" />
        </div>

        <div className="animate-slide-up-fade delay-300 mt-20 relative">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
            Live example
          </p>

          <FloatingCard className="animate-float absolute -top-4 -right-6 z-10 hidden lg:block">
            <div className="flex items-center gap-2 text-xs">
              <Clock className="h-3 w-3 text-fd-muted-foreground" />
              <span className="text-fd-muted-foreground">Brief kickoff in 45 min</span>
            </div>
          </FloatingCard>

          <FloatingCard className="animate-float delay-300 absolute bottom-8 -left-8 z-10 hidden lg:block">
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              <span className="text-fd-muted-foreground">Working agreement loaded</span>
            </div>
          </FloatingCard>

          <DemoCard
            title="for-designers : decode-a-brief"
            steps={HERO_STEPS}
            loop
            loopDelay={4000}
            maxHeight={380}
          />
        </div>
      </div>
    </section>
  );
}
