interface TerminalCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalCard({ title = 'Terminal', children, className = '' }: TerminalCardProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-fd-border shadow-lg bg-fd-card ${className}`}>
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-fd-border bg-fd-muted px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 font-mono text-xs text-fd-muted-foreground">{title}</span>
      </div>
      {/* Content */}
      <div className="p-5 font-mono text-sm leading-relaxed text-fd-foreground">
        {children}
      </div>
    </div>
  );
}

export function TerminalLine({ prompt, command, output }: { prompt?: string; command: string; output?: string }) {
  return (
    <div className="mb-3 last:mb-0">
      <div>
        <span className="text-green-600 dark:text-green-400">{prompt ?? '~'}</span>
        <span className="text-fd-muted-foreground"> $ </span>
        <span className="text-fd-foreground font-medium">{command}</span>
      </div>
      {output && (
        <div className="mt-1 text-fd-muted-foreground text-xs leading-relaxed">{output}</div>
      )}
    </div>
  );
}
