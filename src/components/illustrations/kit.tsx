import type { ReactNode } from 'react';

// Shared chrome for the walkthrough mini-scenes. Styles live in the
// "docs visuals" section of globals.css (il-* classes): 1px line borders,
// 8px radii, Geist Mono at 11 to 12px, accent only on the thing that matters.

export function Win({
  title,
  status,
  width = 260,
  children,
}: {
  title: string;
  status?: ReactNode;
  width?: number;
  children: ReactNode;
}) {
  return (
    <div className="il-win" style={{ maxWidth: width }}>
      <div className="il-bar">
        <span className="il-bar-title">{title}</span>
        {status ? <span className="il-bar-status">{status}</span> : null}
      </div>
      <div className="il-body">{children}</div>
    </div>
  );
}

/** A status line: a small square marker, a label and an optional right-hand value. */
export function Status({ label, value, acc }: { label: string; value?: string; acc?: boolean }) {
  return (
    <div className={`il-status${acc ? ' il-status--acc' : ''}`}>
      <span className="il-mark" aria-hidden />
      <span>{label}</span>
      {value ? <span className="il-status-value">{value}</span> : null}
    </div>
  );
}

export function Caret() {
  return <span className="il-caret" aria-hidden />;
}
