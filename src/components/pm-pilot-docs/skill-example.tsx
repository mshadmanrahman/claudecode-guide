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
        <div className="rounded-xl border border-[var(--line)] bg-[var(--code)] p-5 ">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--code)]" />
            <span className="text-xs font-semibold uppercase tracking-wide text-red-700 dark:text-red-300  font-mono">Before</span>
          </div>
          <p className="text-sm leading-relaxed text-red-700 dark:text-red-300 ">{before}</p>
        </div>
        <div className="rounded-xl border border-[var(--line)] bg-[var(--chip)] p-5 ">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--acc)]" />
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--acc)]  font-mono">After</span>
          </div>
          <p className="text-sm leading-relaxed text-[var(--acc)] ">{after}</p>
        </div>
      </div>

      {/* Prompt + Output */}
      <div className="rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] overflow-hidden">
        <div className="border-b border-fd-border bg-[var(--code)] px-4 py-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground font-mono">You type</span>
        </div>
        <div className="px-4 py-3 font-mono text-sm text-fd-foreground">
          {prompt}
        </div>
      </div>

      <div
        className={`rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] overflow-hidden transition-all motion-reduce:transition-none duration-700 ${
          showOutput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="border-b border-fd-border bg-[var(--code)] px-4 py-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--acc)] animate-pulse motion-reduce:animate-none" />
          <span className="text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground font-mono">PM Pilot returns</span>
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
