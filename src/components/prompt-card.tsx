'use client';

import { CopyBlock } from '@/components/guide/copy-block';
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
  return (
    <div className="not-prose my-8">
      <CopyBlock
        code={prompt}
        language="prompt"
        title={kicker}
        hint={model}
        onCopy={() =>
          trackEvent('prompt_copy_click', {
            prompt_id: id ?? 'unknown',
            variant,
            page_path: typeof window !== 'undefined' ? window.location.pathname : null,
          })
        }
      />
    </div>
  );
}
