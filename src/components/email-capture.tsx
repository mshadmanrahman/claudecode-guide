'use client';

import { useState } from 'react';
import { ArrowRight, Check, Mail, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface EmailCaptureProps {
  placement?: string;
}

export function EmailCapture({ placement = 'unknown' }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hasStarted, setHasStarted] = useState(false);

  const handleFocus = () => {
    if (hasStarted) return;
    setHasStarted(true);
    trackEvent('form_start', { form_name: 'newsletter', placement });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        trackEvent('form_submit', { form_name: 'newsletter', placement });
      } else {
        setStatus('error');
        const body = await res.json().catch(() => ({}));
        trackEvent('form_error', {
          form_name: 'newsletter',
          placement,
          reason: 'api_error',
          upstream_status: body.upstreamStatus ?? res.status,
        });
      }
    } catch {
      setStatus('error');
      trackEvent('form_error', {
        form_name: 'newsletter',
        placement,
        reason: 'network_error',
      });
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6 text-center">
        <Check className="mx-auto mb-2 h-6 w-6 text-green-500" />
        <p className="font-medium text-fd-foreground">You&apos;re in.</p>
        <p className="mt-1 text-sm text-fd-muted-foreground">
          Confirm in your inbox (check spam if it is slow). First issue lands next Sunday.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-3 text-xs text-fd-muted-foreground underline hover:text-fd-foreground"
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-fd-border bg-fd-card p-6">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="h-4 w-4 text-fd-muted-foreground" />
        <p className="text-sm font-medium text-fd-foreground">New guides, when they ship</p>
      </div>
      <p className="text-sm text-fd-muted-foreground mb-4">
        One email, roughly weekly. CLAUDE.md templates, workflows I actually use, and the cut-for-length stuff that does not make the public guides. One-click unsubscribe.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={handleFocus}
          placeholder="you@example.com"
          required
          className="min-w-0 flex-1 rounded-lg border border-fd-border bg-fd-background px-4 py-2.5 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              Subscribe
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-500">
          That didn&apos;t go through. Try again, or{' '}
          <a
            href="https://shadmanrahman.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-red-400"
          >
            subscribe directly on Substack
          </a>
          .
        </p>
      )}
      <p className="mt-3 text-center text-xs text-fd-muted-foreground">
        Or follow on{' '}
        <a
          href="https://shadmanrahman.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-fd-foreground transition-colors"
        >
          Substack
        </a>
      </p>
    </div>
  );
}
