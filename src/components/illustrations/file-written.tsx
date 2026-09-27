import { Win } from './kit';

export function FileWrittenIllustration() {
  return (
    <Win title="CLAUDE.md" status={<span className="il-acc">+ new file</span>} width={240}>
      <div className="il-code">
        <div className="il-h"># CLAUDE.md</div>
        <div className="il-h">## Project</div>
        <div className="il-i">Acme Dashboard. Next.js + Drizzle.</div>
        <div className="il-h">## Stack</div>
        <div className="il-i">- TypeScript strict</div>
        <div className="il-i">- Tailwind v4</div>
        <div className="il-h">## Conventions</div>
        <div className="il-i">...</div>
      </div>
    </Win>
  );
}
