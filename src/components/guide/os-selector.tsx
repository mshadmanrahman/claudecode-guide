'use client';

import { Monitor, Apple, Terminal } from 'lucide-react';

interface OsSelectorProps {
  selected: 'mac' | 'windows' | 'linux' | null;
  onSelect: (os: 'mac' | 'windows' | 'linux') => void;
}

const options = [
  { id: 'mac' as const, label: 'macOS', icon: Apple },
  { id: 'windows' as const, label: 'Windows', icon: Monitor },
  { id: 'linux' as const, label: 'Linux', icon: Terminal },
];

export function OsSelector({ selected, onSelect }: OsSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((os) => (
        <button
          key={os.id}
          type="button"
          onClick={() => onSelect(os.id)}
          className={`btn-secondary flex flex-col items-center gap-2 p-4 ${
            selected === os.id
              ? 'border-[var(--acc)] bg-[var(--chip)] text-[var(--ink)]'
              : 'text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          <os.icon className="h-6 w-6" />
          <span className="text-sm font-medium">{os.label}</span>
        </button>
      ))}
    </div>
  );
}
