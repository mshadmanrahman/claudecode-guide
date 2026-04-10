'use client';

import { Globe, Monitor, Terminal, Code2 } from 'lucide-react';
import type { JourneyInterface } from '@/hooks/use-journey-selections';

interface InterfaceSelectorProps {
  selected: JourneyInterface | null;
  onSelect: (iface: JourneyInterface) => void;
}

const options: ReadonlyArray<{
  id: JourneyInterface;
  label: string;
  icon: typeof Globe;
  desc: string;
}> = [
  { id: 'web', label: 'Web App', icon: Globe, desc: 'claude.ai in browser' },
  { id: 'desktop', label: 'Desktop App', icon: Monitor, desc: 'Native Mac/Windows app' },
  { id: 'cli', label: 'Terminal (CLI)', icon: Terminal, desc: 'Command line' },
  { id: 'ide', label: 'IDE Extension', icon: Code2, desc: 'VS Code, Cursor, JetBrains' },
];

export function InterfaceSelector({ selected, onSelect }: InterfaceSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onSelect(opt.id)}
          className={`flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 transition-all ${
            selected === opt.id
              ? 'border-fd-foreground bg-fd-accent text-fd-foreground'
              : 'border-fd-border text-fd-muted-foreground hover:border-fd-muted-foreground hover:text-fd-foreground'
          }`}
        >
          <opt.icon className="h-5 w-5" />
          <span className="text-sm font-medium">{opt.label}</span>
          <span className="text-[10px] text-fd-muted-foreground">{opt.desc}</span>
        </button>
      ))}
    </div>
  );
}
