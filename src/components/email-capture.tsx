'use client';

import { Mail } from 'lucide-react';

export function EmailCapture() {
  return (
    <div className="rounded-xl border border-fd-border bg-fd-card p-6">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="h-4 w-4 text-fd-muted-foreground" />
        <p className="text-sm font-medium text-fd-foreground">Stay in the loop</p>
      </div>
      <p className="text-sm text-fd-muted-foreground mb-4">
        New guides, templates, and tips delivered to your inbox. No spam. Unsubscribe anytime.
      </p>
      <iframe
        src="https://shadmanrahman.substack.com/embed"
        width="100%"
        height="80"
        className="rounded-lg border-0 bg-transparent"
        style={{ background: 'transparent' }}
        title="Subscribe to Claude Code Guide newsletter"
      />
    </div>
  );
}
