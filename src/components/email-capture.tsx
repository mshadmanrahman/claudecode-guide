'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    const reason = e.currentTarget.validity.valueMissing
      ? 'empty'
      : e.currentTarget.validity.typeMismatch
        ? 'malformed'
        : 'other';
    trackEvent('form_invalid_attempt', {
      form_name: 'newsletter',
      placement,
      reason,
    });
  };

  const handleBlur = () => {
    if (!hasStarted || status !== 'idle') return;
    if (!email) {
      trackEvent('form_abandon_empty', { form_name: 'newsletter', placement });
    } else if (!email.includes('@')) {
      trackEvent('form_abandon_typed', {
        form_name: 'newsletter',
        placement,
        reason: 'no_at_symbol',
      });
    }
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
      <div className="glass rounded-xl p-6 text-center">
        <Check className="mx-auto mb-2 h-6 w-6 text-[var(--acc)]" />
        <p className="font-medium text-fd-foreground">You&apos;re in.</p>
        <p className="mt-1 text-sm text-fd-muted-foreground">
          Confirm in your inbox (check spam if it is slow). First issue lands next Sunday.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-3 rounded-sm text-xs text-fd-muted-foreground underline hover:text-fd-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6">
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
          onBlur={handleBlur}
          onInvalid={handleInvalid}
          placeholder="you@example.com"
          required
          className="h-12 min-w-0 flex-1 rounded-lg border border-[var(--line)] bg-[var(--glass2)] px-4 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--acc)] px-6 text-sm font-medium text-[var(--accInk)] transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === 'loading' ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.18 }}
                className="inline-flex"
              >
                <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-2"
              >
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-700 dark:text-red-300">
          That didn&apos;t go through. Try again, or{' '}
          <a
            href="https://shadmanrahman.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-red-700"
          >
            subscribe on Product Field Notes
          </a>
          .
        </p>
      )}
      <p className="mt-3 text-center text-xs text-fd-muted-foreground">
        Or read{' '}
        <a
          href="https://shadmanrahman.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-fd-foreground transition-colors"
        >
          Product Field Notes
        </a>
        , the Substack
      </p>
    </div>
  );
}
