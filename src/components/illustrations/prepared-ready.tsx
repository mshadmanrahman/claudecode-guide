import { Status } from './kit';

export function PreparedReadyIllustration() {
  return (
    <div className="il-stack" style={{ maxWidth: 280 }}>
      <Status label="brief ready" value="2 min" acc />
      <div className="il-msg">
        &quot;I saw the dashboard handover landed. Want to talk about scope today?&quot;
      </div>
    </div>
  );
}
