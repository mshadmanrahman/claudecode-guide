import { ArrowRight, Mail } from 'lucide-react';
import { SOCIAL } from '@/lib/site';

interface EmailCaptureProps {
  placement?: string;
}

/**
 * A plain link to the Substack subscribe page. The form it replaced posted to
 * an unofficial Substack endpoint and errored 12 times against 22 starts in 28
 * days, so signup now happens on Substack itself. The click is counted by the
 * `profile_click` event (see profile-click-tracker.tsx); `placement` rides in
 * the link as `utm_campaign`, so both GA4 and Substack can tell slots apart.
 */
export function EmailCapture({ placement = 'unknown' }: EmailCaptureProps) {
  const href = `${SOCIAL.substack}subscribe?utm_source=claudecodeguide&utm_medium=site&utm_campaign=${encodeURIComponent(placement)}`;

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="h-4 w-4 text-fd-muted-foreground" aria-hidden="true" />
        <p className="text-sm font-medium text-fd-foreground">New guides, when they ship</p>
      </div>
      <p className="text-sm text-fd-muted-foreground mb-4">
        One email, roughly weekly. CLAUDE.md templates, workflows I actually use, and the cut-for-length stuff that does not make the public guides. One-click unsubscribe.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary inline-flex h-12 items-center justify-center gap-2 px-6 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
      >
        Subscribe on Substack
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
      <p className="mt-3 text-xs text-fd-muted-foreground">
        Opens Product Field Notes, my Substack, in a new tab. You enter your email there.
      </p>
    </div>
  );
}
