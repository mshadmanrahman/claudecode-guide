import { Caret, Win } from './kit';

export function FileEditingIllustration() {
  return (
    <Win title="CLAUDE.md" status={<span className="il-acc">editing</span>} width={240}>
      <div className="il-code">
        <div className="il-h">## Conventions</div>
        <div className="il-i il-line-acc">
          - TypeScript strict
          <Caret />
        </div>
        <div className="il-i">- No `any`, use `unknown`</div>
        <div className="il-i">- Conventional commits</div>
      </div>
    </Win>
  );
}
