'use client';

import { useInView } from '@/hooks/use-in-view';
import { Globe, Terminal, Code2, Layers } from 'lucide-react';

const tools = [
  {
    name: 'Claude.ai',
    description: 'Web and Desktop app',
    icon: Globe,
    note: 'Most guides work here',
  },
  {
    name: 'VS Code / Cursor',
    description: 'IDE extension',
    icon: Code2,
    note: 'Claude Code built in',
  },
  {
    name: 'Claude Code',
    description: 'Terminal',
    icon: Terminal,
    note: 'Full build capability',
  },
  {
    name: 'Figma',
    description: 'Via Claude Code MCP',
    icon: Layers,
    note: 'Handoff and annotation',
  },
];

export function DesignerWorksWith() {
  const [ref, inView] = useInView(0.2);

  return (
    <section className="py-10" ref={ref}>
      <div
        className={`mx-auto max-w-5xl px-6 transition-all duration-500 ${
          inView ? 'animate-slide-up-fade' : 'opacity-0'
        }`}
      >
        <p className="mb-10 text-center text-sm text-fd-muted-foreground">
          Works with the tools you already use
        </p>
        <div className="flex flex-wrap items-start justify-center gap-x-12 gap-y-8">
          {tools.map(({ name, description, icon: Icon, note }) => (
            <div key={name} className="flex flex-col items-center gap-1.5 text-center">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-fd-foreground/70" />
                <span className="text-sm font-medium text-fd-foreground/60 tracking-wide">
                  {name}
                </span>
              </div>
              <span className="text-[11px] text-fd-muted-foreground">{description}</span>
              <span className="rounded-full bg-fd-accent px-2 py-0.5 text-[10px] font-medium text-fd-muted-foreground">
                {note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
