'use client';

import { useState } from 'react';
import { ArrowRight, Check, Mail, Loader2 } from 'lucide-react';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      // POST directly to Substack's subscribe endpoint
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6 text-center">
        <Check className="mx-auto mb-2 h-6 w-6 text-green-500" />
        <p className="font-medium text-fd-foreground">You&apos;re subscribed!</p>
        <p className="mt-1 text-sm text-fd-muted-foreground">
          Check your inbox to confirm. Welcome aboard.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-3 text-xs text-fd-muted-foreground underline hover:text-fd-foreground"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-fd-border bg-fd-card p-6">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="h-4 w-4 text-fd-muted-foreground" />
        <p className="text-sm font-medium text-fd-foreground">Stay in the loop</p>
      </div>
      <p className="text-sm text-fd-muted-foreground mb-4">
        New guides, templates, and tips. No spam. Unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="flex-1 rounded-lg border border-fd-border bg-fd-background px-4 py-2.5 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
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
        <p className="mt-2 text-xs text-red-500">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
