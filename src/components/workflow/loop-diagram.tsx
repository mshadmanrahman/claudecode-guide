interface LoopNode {
  label: string;
  body: string;
  active?: boolean;
}

const NODES: ReadonlyArray<LoopNode> = [
  { label: 'you give', body: 'Notes, a draft or a question, in plain English.' },
  { label: 'claude', body: 'Reads it and writes a first version.', active: true },
  { label: 'you get back', body: 'Something to edit, send or act on. You decide what goes out.' },
];

/** The one loop every step below repeats: input, Claude, output. */
export function LoopDiagram() {
  return (
    <figure className="m-0 mb-14">
      <figcaption className="mb-3 font-mono text-xs text-[var(--muted)]">
        every step below works the same way
      </figcaption>
      <div className="flex flex-col items-stretch sm:flex-row sm:items-center">
        {NODES.map((node, i) => (
          <div key={node.label} className="contents">
            <div
              className="glass min-w-0 flex-1 rounded-lg px-4 py-3"
              style={node.active ? { borderColor: 'var(--acc)' } : undefined}
            >
              <p
                className={`m-0 mb-1 font-mono text-xs ${
                  node.active ? 'text-[var(--acc)]' : 'text-[var(--muted)]'
                }`}
              >
                {node.label}
              </p>
              <p className="m-0 text-sm leading-relaxed text-[var(--ink)]">{node.body}</p>
            </div>
            {i < NODES.length - 1 && (
              <>
                <span aria-hidden="true" className="wf-dash-y mx-auto block h-5 w-px sm:hidden" />
                <span aria-hidden="true" className="wf-dash-x hidden h-px w-8 shrink-0 sm:block" />
              </>
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}
