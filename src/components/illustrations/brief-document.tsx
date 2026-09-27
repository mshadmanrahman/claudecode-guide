import { Win } from './kit';

const SECTIONS = [
  { head: 'Recent context', body: 'Took over dashboard project' },
  { head: 'Open items', body: 'Match Maker one-pager owed' },
  { head: 'Ask', body: 'Q3 headcount status?' },
];

export function BriefDocumentIllustration() {
  return (
    <Win title="1:1 brief / Sarah" width={240}>
      <dl className="il-doc">
        {SECTIONS.map((s) => (
          <div key={s.head}>
            <dt>{s.head}</dt>
            <dd>{s.body}</dd>
          </div>
        ))}
      </dl>
    </Win>
  );
}
