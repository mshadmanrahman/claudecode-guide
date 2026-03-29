'use client';

import { useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Open Substack subscribe in background — most reliable method
    const win = window.open(
      `https://shadmanrahman.substack.com/subscribe?email=${encodeURIComponent(email)}&just_hierarchied=true`,
      'substack-subscribe',
      'width=500,height=400,left=200,top=200'
    );

    // Auto-close the popup after a short delay
    setTimeout(() => {
      try { win?.close(); } catch (_) { /* cross-origin, ignore */ }
    }, 3000);

    setStatus('success');
    setEmail('');
  };

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6 text-center">
        <Check className="mx-auto mb-2 h-6 w-6 text-green-500" />
        <p className="font-medium text-fd-foreground">You&apos;re in!</p>
        <p className="mt-1 text-sm text-fd-muted-foreground">
          Check your email to confirm the subscription.
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
          Subscribe
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
