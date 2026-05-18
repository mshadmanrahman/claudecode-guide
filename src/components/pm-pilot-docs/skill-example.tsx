'use client';

import { useState, useEffect } from 'react';

interface SkillExampleProps {
  before: string;
  after: string;
  prompt: string;
  output: string[];
}

export function SkillExample({ before, after, prompt, output }: SkillExampleProps) {
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowOutput(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="not-prose my-8 space-y-4">
      {/* Before / After */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900/30 dark:bg-red-950/20">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">Before</span>
          </div>
          <p className="text-sm leading-relaxed text-red-700 dark:text-red-300">{before}</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-900/30 dark:bg-green-950/20">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">After</span>
          </div>
          <p className="text-sm leading-relaxed text-green-700 dark:text-green-300">{after}</p>
        </div>
      </div>

      {/* Prompt + Output */}
      <div className="rounded-xl border border-fd-border bg-fd-card overflow-hidden">
        <div className="border-b border-fd-border bg-fd-muted px-4 py-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">You type</span>
        </div>
        <div className="px-4 py-3 font-mono text-sm text-fd-foreground">
          {prompt}
        </div>
      </div>

      <div
        className={`rounded-xl border border-fd-border bg-fd-card overflow-hidden transition-all duration-700 ${
          showOutput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="border-b border-fd-border bg-fd-muted px-4 py-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">PM Pilot returns</span>
        </div>
        <div className="px-4 py-4 space-y-1">
          {output.map((line, i) => (
            <p
              key={i}
              className={`text-sm ${line === '' ? 'h-2' : ''} ${
                line.startsWith('•')
                  ? 'pl-4 text-fd-muted-foreground'
                  : line.startsWith('#')
                  ? 'font-semibold text-fd-foreground'
                  : 'text-fd-muted-foreground'
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
