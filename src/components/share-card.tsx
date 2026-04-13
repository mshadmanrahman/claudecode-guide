'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

const SITE_URL = 'https://claudecodeguide.dev';

interface ShareCardProps {
  tutorialTitle: string;
  tutorialSlug: string;
  duration: string;
}

export function ShareCard({ tutorialTitle, tutorialSlug, duration }: ShareCardProps) {
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  const tutorialUrl = `${SITE_URL}/tutorials/${tutorialSlug}`;

  const shareText = name.trim()
    ? `Just completed "${tutorialTitle}" on Claude Code Guide in ${duration}, and I didn't need to write a single line of code.\n\n${name.trim()} used Claude to do the heavy lifting. You can too.\n\n👇 Free tutorial:`
    : `Just completed "${tutorialTitle}" on Claude Code Guide in ${duration}.\n\nNo coding experience needed. Claude does the work, you do the thinking.\n\n👇 Free tutorial:`;

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(tutorialUrl)}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(`${shareText}\n${tutorialUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-fd-border bg-fd-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Share2 className="h-4 w-4 text-fd-muted-foreground" />
        <p className="text-sm font-medium text-fd-foreground">Share what you built</p>
      </div>

      <p className="text-xs text-fd-muted-foreground leading-relaxed">
        Let your network know. Pre-filled post (edit before posting).
      </p>

      {/* Name input */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-fd-muted-foreground">
          Your name (optional)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Priya Sharma"
          className="w-full rounded-lg border border-fd-border bg-fd-background px-3 py-2 text-sm text-fd-foreground placeholder:text-fd-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-fd-muted-foreground/30"
        />
      </div>

      {/* Post preview */}
      <div className="rounded-lg border border-fd-border bg-fd-background px-4 py-3">
        <p className="text-xs text-fd-muted-foreground leading-relaxed whitespace-pre-line">
          {shareText}
          {'\n'}
          <span className="text-fd-foreground/50 underline">{tutorialUrl}</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {/* LinkedIn logo : not in this lucide-react version */}
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Share on LinkedIn
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-muted px-4 py-2.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
