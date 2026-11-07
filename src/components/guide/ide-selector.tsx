'use client';

import { AppWindow, Code2, Terminal, Laptop } from 'lucide-react';

export type IdeChoice = 'app' | 'vscode' | 'cursor' | 'jetbrains' | 'terminal';

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
  { id: 'app', label: 'Claude app', icon: AppWindow, desc: 'No coding needed' },
  { id: 'vscode', label: 'VS Code', icon: Code2, desc: 'Code editor' },
  { id: 'cursor', label: 'Cursor', icon: Laptop, desc: 'AI-first editor' },
  { id: 'jetbrains', label: 'JetBrains', icon: Code2, desc: 'IntelliJ, WebStorm...' },
  { id: 'terminal', label: 'Terminal', icon: Terminal, desc: 'CLI power user' },
];

export function IdeSelector({ selected, onSelect }: IdeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {options.map((ide) => (
        <button
          key={ide.id}
          type="button"
          onClick={() => onSelect(ide.id)}
          className={`btn-secondary flex flex-col items-center gap-1.5 p-3 ${
            selected === ide.id
              ? 'border-[var(--acc)] bg-[var(--chip)] text-[var(--ink)]'
              : 'text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          <ide.icon className="h-5 w-5" />
          <span className="text-sm font-medium">{ide.label}</span>
          <span className="text-label text-fd-muted-foreground">{ide.desc}</span>
        </button>
      ))}
    </div>
  );
}
