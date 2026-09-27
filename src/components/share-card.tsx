'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const SITE_URL = 'https://claudecodeguide.dev';

interface ShareCardProps {
  tutorialTitle: string;
  tutorialSlug: string;
  duration: string;
}

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]';

export function ShareCard({ tutorialTitle, tutorialSlug, duration }: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  const tutorialUrl = `${SITE_URL}/tutorials/${tutorialSlug}`;
  const shareText = `Just finished "${tutorialTitle}" on Claude Code Guide. Took about ${duration}, and it's free:`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(tutorialUrl)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${tutorialUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackEvent('share_card_copy_click', { tutorial_slug: tutorialSlug });
    } catch {
      // Clipboard blocked: the preview text stays selectable.
    }
  }

  return (
    <div className="glass space-y-4 rounded-xl p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Share2 className="h-4 w-4 text-[var(--muted)]" aria-hidden="true" />
        <p className="m-0 text-sm font-medium">Tell someone what you built</p>
      </div>

      <div className="rounded-lg border border-[var(--line)] bg-[var(--glass2)] px-4 py-3">
        <p className="m-0 break-words text-sm leading-relaxed text-[var(--muted)]">
          {shareText} <span className="text-[var(--ink)] underline">{tutorialUrl}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('share_card_linkedin_click', { tutorial_slug: tutorialSlug })}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 ${focusRing}`}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Share on LinkedIn
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--code)] px-4 py-2.5 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)] ${focusRing}`}
        >
          {copied ? (
            <Check className="h-4 w-4 text-[var(--acc)]" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy post'}</span>
        </button>
      </div>
    </div>
  );
}
