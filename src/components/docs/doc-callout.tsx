import type { ReactNode } from 'react';

type CalloutType = 'info' | 'tip' | 'warn' | 'warning' | 'error' | 'success' | 'idea';

interface DocCalloutProps {
  type?: CalloutType;
  title?: ReactNode;
  children?: ReactNode;
}

const LABELS: Record<CalloutType, string> = {
  info: 'note',
  tip: 'tip',
  idea: 'tip',
  warn: 'warning',
  warning: 'warning',
  error: 'careful',
  success: 'done',
};

/**
 * Glass callout for MDX `<Callout>`: a mono accent label on the left, body on the right.
 * Replaces the Fumadocs default so docs match the Signal mock.
 */
export function DocCallout({ type = 'info', title, children }: DocCalloutProps) {
  return (
    <div className="ccg-callout" data-type={type} role="note">
      <span className="ccg-callout-label">{LABELS[type] ?? 'note'}</span>
      <div className="ccg-callout-body">
        {title ? <p className="ccg-callout-title">{title}</p> : null}
        {children}
      </div>
    </div>
  );
}
