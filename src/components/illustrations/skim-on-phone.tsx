import { Win } from './kit';

export function SkimOnPhoneIllustration() {
  return (
    <Win title="1:1 brief" status="30s read" width={260}>
      <dl className="il-doc">
        <div>
          <dt>Recent context</dt>
          <dd>
            Took over <mark className="il-mark-text">dashboard project</mark> three weeks ago
          </dd>
        </div>
        <div>
          <dt>Ask today</dt>
          <dd>
            <mark className="il-mark-text">Q3 headcount status?</mark>
          </dd>
        </div>
        <div>
          <dt>Be ready for</dt>
          <dd>
            <mark className="il-mark-text">Match Maker scope</mark> question
          </dd>
        </div>
      </dl>
    </Win>
  );
}
