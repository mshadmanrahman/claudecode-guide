'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyBlockProps {
  code: string;
  language?: string;
}

export function CopyBlock({ code, language = 'bash' }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-fd-border bg-fd-card">
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted px-4 py-2">
        <span className="font-mono text-xs text-fd-muted-foreground">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-fd-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
