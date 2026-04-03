'use client';

import { Code2, Terminal, Laptop } from 'lucide-react';

export type IdeChoice = 'vscode' | 'cursor' | 'jetbrains' | 'terminal';

interface IdeSelectorProps {
  selected: IdeChoice | null;
  onSelect: (ide: IdeChoice) => void;
}

const options: ReadonlyArray<{
  id: IdeChoice;
  label: string;
  icon: typeof Terminal;
  desc: string;
}> = [
  { id: 'vscode', label: 'VS Code', icon: Code2, desc: 'Most popular' },
  { id: 'cursor', label: 'Cursor', icon: Laptop, desc: 'AI-first editor' },
  { id: 'jetbrains', label: 'JetBrains', icon: Code2, desc: 'IntelliJ, WebStorm...' },
  { id: 'terminal', label: 'Terminal', icon: Terminal, desc: 'CLI power user' },
];

export function IdeSelector({ selected, onSelect }: IdeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {options.map((ide) => (
        <button
          key={ide.id}
          type="button"
          onClick={() => onSelect(ide.id)}
          className={`flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 transition-all ${
            selected === ide.id
              ? 'border-fd-foreground bg-fd-accent text-fd-foreground'
              : 'border-fd-border text-fd-muted-foreground hover:border-fd-muted-foreground hover:text-fd-foreground'
          }`}
        >
          <ide.icon className="h-5 w-5" />
          <span className="text-sm font-medium">{ide.label}</span>
          <span className="text-[10px] text-fd-muted-foreground">{ide.desc}</span>
        </button>
      ))}
    </div>
  );
}
