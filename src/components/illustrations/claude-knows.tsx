import { Status } from './kit';

export function ClaudeKnowsIllustration() {
  return (
    <div className="il-stack" style={{ maxWidth: 280 }}>
      <Status label="memory loaded" value="your-project" acc />
      <Status label="Ready when you are." />
    </div>
  );
}
