import type { ReactNode } from 'react';

// Primitives for docs diagrams. Everything is HTML + CSS (styles live in the
// "docs visuals" section of globals.css), so text stays at 11 to 12px on every
// screen and the colors follow the light and dark tokens.

type Tone = 'base' | 'acc' | 'ghost';

interface FigProps {
  label: string;
  caption?: string;
  children: ReactNode;
  className?: string;
}

/** Glass figure panel with a mono caption row. */
export function Fig({ label, caption, children, className }: FigProps) {
  return (
    <figure className={`dv-fig not-prose ${className ?? ''}`} aria-label={caption ?? label}>
      <div className="dv-body">{children}</div>
      <figcaption>
        <span className="dv-fig-id">{label}</span>
        {caption ? <span>{caption}</span> : null}
      </figcaption>
    </figure>
  );
}

interface NodeProps {
  title: ReactNode;
  sub?: ReactNode;
  tag?: string;
  tone?: Tone;
  struck?: boolean;
  pulse?: boolean;
  lines?: number;
  children?: ReactNode;
  className?: string;
}

/** One box in a diagram: title, optional sub line, tag and placeholder text lines. */
export function Node({
  title,
  sub,
  tag,
  tone = 'base',
  struck,
  pulse,
  lines = 0,
  children,
  className,
}: NodeProps) {
  const cls = [
    'dv-node',
    tone !== 'base' ? `dv-node--${tone}` : '',
    struck ? 'dv-node--struck' : '',
    pulse ? 'dv-pulse' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cls}>
      <div className="dv-node-head">
        <span className="dv-node-title">{title}</span>
        {tag ? <span className="dv-tag">{tag}</span> : null}
      </div>
      {sub ? <div className="dv-node-sub">{sub}</div> : null}
      {lines > 0 ? (
        <div className="dv-lines" aria-hidden>
          {Array.from({ length: lines }, (_, i) => (
            <i key={i} style={{ width: `${[86, 64, 74, 52][i % 4]}%` }} />
          ))}
        </div>
      ) : null}
      {children}
    </div>
  );
}

/** Connector. Horizontal inside a `.dv-row` at 640px and up, vertical below. */
export function Arrow({ acc, label }: { acc?: boolean; label?: string }) {
  return (
    <span
      className={`dv-arrow${acc ? ' dv-arrow--acc' : ''}`}
      data-label={label}
      aria-hidden
    />
  );
}

interface BranchItem {
  title: ReactNode;
  sub?: ReactNode;
  tag?: string;
  tone?: Tone;
}

/** A parent node fanning out to a list of children along a rail. */
export function Branch({
  parent,
  items,
}: {
  parent: ReactNode;
  items: BranchItem[];
}) {
  return (
    <div className="dv-branch">
      <div className="dv-branch-in">
        <div className="dv-branch-parent">{parent}</div>
        <span className="dv-branch-stub" aria-hidden />
        <ul className="dv-tree">
          {items.map((item, i) => (
            <li key={i} className={item.tone === 'acc' ? 'is-acc' : undefined}>
              <Node title={item.title} sub={item.sub} tag={item.tag} tone={item.tone} pulse={item.tone === 'acc'} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
