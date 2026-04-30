'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface PromptCardProps {
  prompt: string;
  id?: string;
  variant?: 'primary' | 'variation' | 'try-now';
  kicker?: string;
  model?: string;
}

export function PromptCard({
  prompt,
  id,
  variant = 'primary',
  kicker = 'Try this prompt',
  model = 'Opus 4.7 or Sonnet 4.6',
}: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      trackEvent('prompt_copy_click', {
        prompt_id: id ?? 'unknown',
        variant,
        page_path:
          typeof window !== 'undefined' ? window.location.pathname : null,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked. Reader can still select the text manually.
    }
  }

  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl border border-fd-border shadow-sm bg-fd-card">
      <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/40 px-5 py-2.5">
        <span className="text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
          {kicker}
        </span>
        <span className="text-xs text-fd-muted-foreground">{model}</span>
      </div>
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-fd-foreground">
          {prompt}
        </pre>
      </div>
      <div className="flex items-center justify-end border-t border-fd-border bg-fd-muted/40 px-5 py-3">
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy prompt to clipboard"
          className="inline-flex items-center gap-2 rounded-lg bg-fd-foreground px-3.5 py-1.5 text-xs font-medium text-fd-background shadow-sm transition-opacity hover:opacity-90"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
      </div>
    </div>
  );
}
